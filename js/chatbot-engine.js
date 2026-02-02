/**
 * Elder Care Companion AI - High Accuracy Engine
 * Features: State-based triggering, anti-spam throttling, and natural dialogue.
 */

class ElderCareChatbot {
    constructor() {
        this.systemContext = null;
        this.conversationHistory = [];
        this.lastAlertTime = {};
        this.lastProactiveMessage = ""; // Track what we last said to avoid repetition

        this.activeStates = {
            sos: false,
            fall: false,
            meds: [],
            lastObject: null
        };

        // Global cooldown for any proactive speech (prevent rapid-fire)
        this.globalProactiveCooldown = 0;
    }

    getTimeOfDay() {
        const hour = new Date().getHours();
        if (hour < 12) return 'morning';
        if (hour < 17) return 'afternoon';
        if (hour < 21) return 'evening';
        return 'night';
    }

    getUserProfile() {
        const profile = JSON.parse(localStorage.getItem('elderProfile') || '{}');
        return {
            name: profile.name || 'User',
            age: profile.age || 'Not set',
            conditions: profile.conditions || 'None'
        };
    }

    getObjectDetectionStatus() {
        let objects = JSON.parse(localStorage.getItem('elderDetectedObjects') || '[]');
        let lastDetection = localStorage.getItem('elderLastDetectionTime');
        let isRecent = false;

        if (objects.length === 0) {
            const recent = JSON.parse(localStorage.getItem('elderRecentObjects') || '[]');
            const recentTime = localStorage.getItem('elderRecentTime');
            if (recent.length > 0 && recentTime) {
                const diff = (new Date() - new Date(recentTime)) / 60000;
                if (diff < 2) {
                    objects = recent;
                    lastDetection = recentTime;
                    isRecent = true;
                }
            }
        }

        return {
            detected: objects.length > 0,
            objects: objects,
            lastDetectionTime: lastDetection,
            isRecent: isRecent
        };
    }

    getFallDetectionStatus() {
        return {
            status: localStorage.getItem('elderFallStatus') || 'not_detected',
            lastFallTime: localStorage.getItem('elderLastFallTime')
        };
    }

    getSOSStatus() {
        if (localStorage.getItem('elderSOSActive') === 'true') return 'active';
        if (localStorage.getItem('elderSOSCancelled') === 'true') return 'cancelled';
        return 'inactive';
    }

    getMedicineSchedule() {
        const reminders = JSON.parse(localStorage.getItem('elderReminders') || '[]');
        const now = new Date();
        const currentTime = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
        const dueNow = reminders.filter(r => r.time.substring(0, 5) === currentTime);

        return {
            dueNow: dueNow,
            allToday: reminders.sort((a, b) => a.time.localeCompare(b.time))
        };
    }

    gatherSystemContext() {
        const context = {
            timestamp: new Date().toLocaleString(),
            profile: this.getUserProfile(),
            objectDetection: this.getObjectDetectionStatus(),
            fallDetection: this.getFallDetectionStatus(),
            sosStatus: this.getSOSStatus(),
            medicineSchedule: this.getMedicineSchedule(),
            appointments: JSON.parse(localStorage.getItem('elderAppointments') || '[]'),
            settings: typeof getSettings !== 'undefined' ? getSettings() : { lang: 'en' }
        };
        this.systemContext = context;
        return context;
    }

    buildEnglishPrompt(context, isProactive = false) {
        const prompt = `You are a permanent Elder Care Companion AI embedded inside an existing application.
User: ${context.profile.name} (Age: ${context.profile.age}).
Medical History: ${context.profile.conditions}.
Current Time: ${new Date().toLocaleTimeString()} on ${new Date().toLocaleDateString()}.

PRIMARY GOAL:
Ensure elderly safety, clarity, reassurance, and zero technical confusion.

GLOBAL BEHAVIOR RULES:
- Always respond calmly, slowly, and clearly. Assume the user is elderly.
- Never expose technical terms, errors, or system failures. 
- If you lack information, say: "Please wait, I am checking."
- TONE: Warm, supportive, and trusted. Maximum 2-3 short sentences for speech.

CURRENT SYSTEM CONTEXT:
- SOS Status: ${context.sosStatus}
- Fall Status: ${context.fallDetection.status}
- Detected Objects: ${context.objectDetection.objects.join(', ') || 'None'}
- Medicines Scheduled Today: ${context.medicineSchedule.allToday.map(m => `${m.name} (${m.time})`).join(', ') || 'None'}
- Medicines Due Now: ${context.medicineSchedule.dueNow.map(m => m.name).join(', ') || 'None'}
- KG Hospital Appointments: ${context.appointments.length > 0 ? context.appointments[0].time + ' at ' + context.appointments[0].hospital : 'None'}

COMMAND CAPABILITIES:
Trigger actions by appending: COMMAND:[{"type": "ACTION", "payload": {}}]
Actions:
1. OPEN_PAGE: { page: "object-detection" | "medicine" | "profile" | "sos" | "health" | "hospital" }
2. ADD_MEDICINE: { name: string, time: "HH:mm", dosage: string }
3. TRIGGER_SOS: { reason: string }
4. BOOK_APPOINTMENT: { hospital: "KG Hospital", time: string }

CRITICAL INTEGRATION RULES:
1. OBJECTS: If objects are detected, speak: "A ${context.objectDetection.objects[0]} is in front of you. Please walk carefully. Are you okay?" If they say "No" or "Help", trigger SOS.
2. FALLS: If fall status is "detected", speak: "I noticed a sudden movement. Are you okay?" Trigger SOS immediately if they sound distressed.
3. MEDICINE: If asked to add meds, extract Name, Time, and Dosage. Trigger ADD_MEDICINE and confirm: "I have added your [Name] for [Time]. I will remind you."
4. HOSPITAL: If asked about KG Hospital, check context. If none, offer 10:00 AM or 02:00 PM. Trigger BOOK_APPOINTMENT on agreement.
5. NURSE PORTAL: Acknowledge nurse/hospital updates as authoritative and inform the user gently.

${isProactive ? "INSTRUCTION: You are initiating a proactive safety check. Keep it gentle." : "INSTRUCTION: Respond to the user's message as their companion."}`;

        return prompt;
    }

    async generateResponse(userMessage, apiKey, language = 'en', isProactive = false) {
        try {
            const context = this.gatherSystemContext();
            const systemPrompt = this.buildEnglishPrompt(context, isProactive);

            // Integrate History
            let historyText = "";
            const recentHistory = this.conversationHistory.slice(-5);
            recentHistory.forEach(h => {
                historyText += `User: ${h.user}\nAssistant: ${h.bot}\n`;
            });

            const promptInput = isProactive
                ? `${systemPrompt}\n\nACTION: Generate proactive safety message. If command needed, append tag.`
                : `${systemPrompt}\n\nCONVERSATION HISTORY:\n${historyText}\nUser: ${userMessage}\n\nAssistant:`;

            // Use model from CONFIG if available, fallback to flash
            const model = (typeof CONFIG !== 'undefined' && CONFIG.getModel) ? CONFIG.getModel() : 'gemini-1.5-flash';
            const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

            const response = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    contents: [{ parts: [{ text: promptInput }] }],
                    generationConfig: {
                        temperature: 0.7,
                        maxOutputTokens: 500,
                        topP: 0.95
                    }
                })
            });

            const data = await response.json();

            if (data.error) {
                console.error("Gemini API Error:", data.error);
                throw new Error(data.error.message);
            }

            if (!data.candidates || !data.candidates[0] || !data.candidates[0].content) {
                console.error("Malformed AI Response:", data);
                throw new Error("No response from AI");
            }

            let aiResponse = data.candidates[0].content.parts[0].text.trim();

            // Extract and Execute Commands
            const commandMatch = aiResponse.match(/COMMAND:\[(.*?)\]/);
            if (commandMatch) {
                try {
                    const commandJson = JSON.parse(`[${commandMatch[1]}]`);
                    this.executeCommands(commandJson);
                    aiResponse = aiResponse.replace(/COMMAND:\[.*?\]/g, '').trim();
                } catch (e) {
                    console.error("Command parsing error", e);
                }
            }

            // Safety fallback for empty verbal response
            if (!aiResponse && commandMatch) {
                aiResponse = "I have processed your request.";
            }

            // Store history
            if (!isProactive) {
                this.conversationHistory.push({ user: userMessage, bot: aiResponse });
            } else {
                this.lastProactiveMessage = aiResponse;
            }

            return aiResponse;
        } catch (error) {
            console.error('Chatbot Error:', error);
            return language === 'ta'
                ? "தயவுசெய்து காத்திருங்கள், நான் சரிபார்க்கிறேன்."
                : "Please wait, I am checking.";
        }
    }

    executeCommands(commands) {
        commands.forEach(cmd => {
            console.log("Executing Command:", cmd);
            switch (cmd.type) {
                case 'OPEN_PAGE':
                    const pageMap = {
                        'object-detection': 'object-detection.html',
                        'medicine': 'medicine.html',
                        'profile': 'profile.html',
                        'sos': 'sos.html',
                        'health': 'health.html',
                        'hospital': 'hospital.html'
                    };
                    if (pageMap[cmd.payload.page]) {
                        setTimeout(() => window.location.href = pageMap[cmd.payload.page], 2000);
                    }
                    break;

                case 'ADD_MEDICINE':
                    const reminders = JSON.parse(localStorage.getItem('elderReminders') || '[]');
                    reminders.push({
                        id: Date.now(),
                        name: cmd.payload.name,
                        time: cmd.payload.time,
                        dosage: cmd.payload.dosage || '1 tablet'
                    });
                    localStorage.setItem('elderReminders', JSON.stringify(reminders));
                    break;

                case 'TRIGGER_SOS':
                    localStorage.setItem('elderSOSActive', 'true');
                    localStorage.removeItem('elderSOSCancelled');
                    localStorage.setItem('elderLastSOSTime', new Date().toISOString());
                    // If we are on chat page, we might want to stay but show SOS UI
                    // Redirecting is safer to trigger all logic
                    setTimeout(() => window.location.href = 'sos.html?auto=true', 1000);
                    break;

                case 'BOOK_APPOINTMENT':
                    const appointments = JSON.parse(localStorage.getItem('elderAppointments') || '[]');
                    appointments.push({
                        id: Date.now(),
                        hospital: cmd.payload.hospital,
                        time: cmd.payload.time,
                        status: 'Booked'
                    });
                    localStorage.setItem('elderAppointments', JSON.stringify(appointments));
                    break;
            }
        });
    }

    async checkForProactiveAlerts(callback) {
        const now = Date.now();

        // Anti-spam: No proactive alerts within 60 seconds of EACH OTHER
        if (now < this.globalProactiveCooldown) return;

        const context = this.gatherSystemContext();
        const apiKey = CONFIG.getApiKey();
        if (!apiKey) return;

        let shouldTrigger = false;

        // 1. SOS (State Change)
        const isSos = context.sosStatus === 'active';
        if (isSos && !this.activeStates.sos) {
            shouldTrigger = true;
            this.activeStates.sos = true;
        } else if (!isSos) {
            this.activeStates.sos = false;
        }

        // 2. Fall (State Change)
        const isFall = context.fallDetection.status === 'detected';
        if (isFall && !this.activeStates.fall) {
            shouldTrigger = true;
            this.activeStates.fall = true;
        } else if (!isFall) {
            this.activeStates.fall = false;
        }

        // 3. Objects (New Object Only)
        if (context.objectDetection.detected && !context.objectDetection.isRecent) {
            const currentObj = context.objectDetection.objects[0];
            if (currentObj !== this.activeStates.lastObject) {
                shouldTrigger = true;
                this.activeStates.lastObject = currentObj;
            }
        } else if (!context.objectDetection.detected) {
            this.activeStates.lastObject = null;
        }

        // 4. Medicine Due
        if (context.medicineSchedule.dueNow.length > 0) {
            const medId = context.medicineSchedule.dueNow[0].id;
            if (!this.lastAlertTime[medId] || (now - this.lastAlertTime[medId] > 300000)) {
                shouldTrigger = true;
                this.lastAlertTime[medId] = now;
            }
        }

        if (shouldTrigger) {
            // Set cooldown for 60 seconds
            this.globalProactiveCooldown = now + 60000;

            const alertMessage = await this.generateResponse("", apiKey, context.settings.lang || 'en', true);
            if (callback) callback(alertMessage);
        }
    }
}

const elderCareChatbot = new ElderCareChatbot();
