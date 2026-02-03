/**
 * Elder Care Companion AI - Unified Intelligence Engine (Single Intelligence, Three Roles)
 * Features: State-based triggering, anti-spam throttling, and role-based logic.
 */

class ElderCareChatbot {
    constructor() {
        this.systemContext = null;
        this.currentUserRole = localStorage.getItem('currentUserRole') || 'elder';
        this.activeSessionId = localStorage.getItem(`activeSessionId_${this.currentUserRole}`) || 'default';

        // Load all sessions for this role
        const sessionsKey = `elderSessions_${this.currentUserRole}`;
        this.sessions = JSON.parse(localStorage.getItem(sessionsKey) || '[]');

        // Ensure at least one session exists
        if (this.sessions.length === 0) {
            this.sessions.push({
                id: 'default',
                title: 'New Chat',
                messages: [],
                timestamp: new Date().toISOString()
            });
            this.saveSessions();
        }

        // Initialize current history
        const activeSession = this.sessions.find(s => s.id === this.activeSessionId) || this.sessions[0];
        this.activeSessionId = activeSession.id;
        this.conversationHistory = activeSession.messages;

        this.lastAlertTime = {};
        this.activeStates = {
            sos: false,
            fall: false,
            meds: [],
            lastObject: null
        };

        this.globalProactiveCooldown = 0;
        this.responseTimeout = null;
    }

    saveSessions() {
        localStorage.setItem(`elderSessions_${this.currentUserRole}`, JSON.stringify(this.sessions));
        localStorage.setItem(`activeSessionId_${this.currentUserRole}`, this.activeSessionId);
    }

    startNewSession() {
        const newId = 'session_' + Date.now();
        const newSession = {
            id: newId,
            title: 'New Chat',
            messages: [],
            timestamp: new Date().toISOString()
        };
        this.sessions.unshift(newSession); // Newest on top
        this.activeSessionId = newId;
        this.conversationHistory = [];
        this.saveSessions();
        return newId;
    }

    loadSession(id) {
        const session = this.sessions.find(s => s.id === id);
        if (session) {
            this.activeSessionId = id;
            this.conversationHistory = session.messages;
            this.saveSessions();
            return true;
        }
        return false;
    }

    deleteSession(id) {
        this.sessions = this.sessions.filter(s => s.id !== id);
        if (this.sessions.length === 0) {
            this.startNewSession();
        } else if (this.activeSessionId === id) {
            this.loadSession(this.sessions[0].id);
        } else {
            this.saveSessions();
        }
    }

    startSafetyResponseTimer(delay = 10000) {
        if (this.responseTimeout) clearTimeout(this.responseTimeout);

        this.responseTimeout = setTimeout(() => {
            if (this.currentUserRole === 'elder') {
                console.log("[Intelligence] SOS triggered due to no response.");
                this.executeCommands([{ type: 'TRIGGER_SOS', payload: { reason: 'No response to safety check' } }]);
            }
        }, delay);
    }

    clearSafetyResponseTimer() {
        if (this.responseTimeout) {
            clearTimeout(this.responseTimeout);
            this.responseTimeout = null;
            console.log("[Intelligence] Safety response received, timer cleared.");
        }
    }

    saveHistory() {
        // Update title from first user message if still "New Chat"
        const currentSession = this.sessions.find(s => s.id === this.activeSessionId);
        if (currentSession) {
            currentSession.messages = this.conversationHistory.slice(-50);
            currentSession.timestamp = new Date().toISOString();

            if (currentSession.title === 'New Chat' && this.conversationHistory.length > 0) {
                const firstMsg = this.conversationHistory.find(m => m.user);
                if (firstMsg) {
                    currentSession.title = firstMsg.user.substring(0, 30) + (firstMsg.user.length > 30 ? '...' : '');
                }
            }
            this.saveSessions();
        }
    }

    clearHistory() {
        const currentSession = this.sessions.find(s => s.id === this.activeSessionId);
        if (currentSession) {
            currentSession.messages = [];
            currentSession.title = 'New Chat';
            this.conversationHistory = [];
            this.saveSessions();
        }
        console.log(`[Intelligence] History cleared for role: ${this.currentUserRole}`);
    }

    setRole(role) {
        if (['elder', 'caregiver', 'hospital'].includes(role)) {
            this.currentUserRole = role;
            localStorage.setItem('currentUserRole', role);

            // Reload sessions for the new role
            this.activeSessionId = localStorage.getItem(`activeSessionId_${role}`) || 'default';
            this.sessions = JSON.parse(localStorage.getItem(`elderSessions_${role}`) || '[]');

            if (this.sessions.length === 0) {
                this.sessions.push({
                    id: 'default',
                    title: 'New Chat',
                    messages: [],
                    timestamp: new Date().toISOString()
                });
            }

            const activeSession = this.sessions.find(s => s.id === this.activeSessionId) || this.sessions[0];
            this.activeSessionId = activeSession.id;
            this.conversationHistory = activeSession.messages;
            this.saveSessions();
        }
    }

    getRole() {
        return this.currentUserRole;
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
            settings: typeof getSettings !== 'undefined' ? getSettings() : { lang: 'en' },
            currentUserRole: this.currentUserRole
        };
        this.systemContext = context;
        return context;
    }

    buildEnglishPrompt(context, isProactive = false) {
        let roleSection = "";

        if (context.currentUserRole === 'elder') {
            roleSection = `
ROLE: ELDER COMPANION
- Focus: Safety, reassurance, and simple companionship.
- TONE: Warm, slow, simplified. Assume you are talking to an elderly person who needs comfort.
- SPECIAL: Proactively warn about obstacles. If they are silent or say "Help", trigger SOS. Use their name often.`;
        } else if (context.currentUserRole === 'caregiver') {
            roleSection = `
ROLE: CAREGIVER ASSISTANT
- Focus: Reporting, data analysis, and elder safety status.
- TONE: Professional, supportive, fact-based. 
- SPECIAL: Your job is to answer the caregiver's questions about the elder's wellbeing. Report on meds, falls, and current activity status clearly.`;
        } else if (context.currentUserRole === 'hospital') {
            roleSection = `
ROLE: CLINICAL INTELLIGENCE (Doctor/Nurse)
- Focus: Medical data, adherence trends, and clinical summaries.
- TONE: Professional, efficient, clinical, and data-driven.
- SPECIAL: Provide concise medical summaries. Avoid fluff. Focus on fall history and medication adherence percentages if asked.`;
        }

        const prompt = `You are the ONE Unified Elder Care Companion AI serving three roles with SHARED memory.
Current User Role: ${context.currentUserRole.toUpperCase()}
Linked Elder: ${context.profile.name} (Age: ${context.profile.age}, Conditions: ${context.profile.conditions}).

${roleSection}

GLOBAL RULES:
- NEVER show technical terms, errors, or system failures. 
- If uncertain, say: "Please wait, I am checking."
- TONE: Always reassuring (except more clinical for Hospital).
- SHARED STATE: All medicines, SOS events, and falls are shared across all roles immediately.

CURRENT SYSTEM CONTEXT (ELDER'S STATUS):
- SOS Status: ${context.sosStatus}
- Fall Status: ${context.fallDetection.status}
- Detected Objects: ${context.objectDetection.objects.join(', ') || 'None'}
- Medicines Scheduled: ${context.medicineSchedule.allToday.map(m => `${m.name} (${m.time})`).join(', ') || 'None'}
- Appointments: ${context.appointments.length > 0 ? context.appointments[0].time + ' at ' + context.appointments[0].hospital : 'None'}

COMMANDS:
COMMAND:[{"type": "ACTION", "payload": {}}]
Actions: OPEN_PAGE, ADD_MEDICINE, TRIGGER_SOS, BOOK_APPOINTMENT, GENERATE_REPORT.

${isProactive ? "INSTRUCTION: You are initiating a proactive check. Keep it role-appropriate." : "INSTRUCTION: Respond to the current user's request."}`;

        return prompt;
    }

    async getInstantResponse(userMessage, language = 'en') {
        try {
            const text = (userMessage || "").toLowerCase().trim();
            const role = this.currentUserRole;

            // --- 0. SUPER PRIORITY: EMERGENCY CANCELLATION (Zero Dependency) ---
            const isStopWord = /(cancel|stop|back|no|off|clear|exit|ரத்து|நிறுத்து|வேண்டாம்|அலாரம்)/i.test(text);
            const isEmergencyTheme = /(sos|alert|emergency|help|alarm|எச்சரிக்கை|உதவி|அவசரம்|அலாரம்)/i.test(text);

            if (isStopWord && isEmergencyTheme) {
                localStorage.setItem('elderSOSActive', 'false');
                localStorage.setItem('elderSOSCancelled', 'true');
                localStorage.setItem('elderFallStatus', 'not_detected');
                localStorage.setItem('elderDetectedObjects', '[]');

                return language === 'ta' ?
                    "சரி, அவசர எச்சரிக்கை ரத்து செய்யப்பட்டது. இப்போது எல்லாம் பாதுகாப்பாக உள்ளது." :
                    "Understood. I have cancelled the SOS alert and turned off the alarm locally. You are safe now.";
            }

            const context = this.gatherSystemContext();

            // --- 1. ROLE-BASED STATUS CHECKS ---
            if (role === 'caregiver' || role === 'hospital') {
                const isSafetyCheck = /(safe|okay|status|condition|நிலைமை|பாதுகாப்பான)/i.test(text);
                const isMedCheck = /(upcoming|next|what|when|is|any)/i.test(text) && /(medicine|pill|meds|மருந்து)/i.test(text);
                const isObjectCheck = /(object|thing|see|camera|பொருள்)/i.test(text);
                const isFallCheck = /(fall|fell|drop|விழுந்த)/i.test(text);

                if (isSafetyCheck) {
                    const status = context.sosStatus === 'active' ? "EMERGENCY ACTIVE" :
                        context.fallDetection.status === 'detected' ? "FALL DETECTED" : "Safe and stable";
                    return `Real-time Status of ${context.profile.name}: ${status}. No active emergencies detected at this moment.`;
                }

                if (isMedCheck) {
                    const now = new Date();
                    const currentTime = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
                    const upcoming = context.medicineSchedule.allToday.find(m => m.time >= currentTime);

                    if (upcoming) {
                        return `The upcoming medicine for ${context.profile.name} is ${upcoming.name} at ${upcoming.time}.`;
                    }
                    return `There are no further medicines scheduled for ${context.profile.name} today.`;
                }

                if (isObjectCheck) {
                    const objects = context.objectDetection.objects;
                    if (objects.length > 0) {
                        return `I currently detect these objects near the elder: ${objects.join(', ')}.`;
                    }
                    return `I don't see any specific obstacles or objects near ${context.profile.name} right now.`;
                }

                if (isFallCheck) {
                    const fallStatus = context.fallDetection.status;
                    if (fallStatus === 'detected') {
                        return `WARNING: A fall was recently detected for ${context.profile.name}. SOS procedures may be active.`;
                    }
                    return `No falls has been detected. ${context.profile.name} is currently upright and stable.`;
                }
            }

            // Standard SOS / Help check
            const sosKeywords = ['sos', 'alert', 'emergency', 'help', 'எச்சரிக்கை', 'உதவி', 'அவசரம்'];
            if (sosKeywords.some(k => text.includes(k)) || text.includes('alarm')) {
                const isTriggerIntent = /(trigger|send|give|activate|start|உருவாக்கு|அனுப்பு)/i.test(text);
                if (isTriggerIntent) {
                    this.executeCommands([{ type: 'TRIGGER_SOS', payload: { reason: 'User voice command' } }]);
                    return language === 'ta' ?
                        "சரி, நான் உடனடியாக அவசர எச்சரிக்கையைத் தூண்டுகிறேன். உதவி வந்து கொண்டிருக்கிறது." :
                        "Understood. I am triggering the SOS alert immediately. Help is on the way.";
                }
            }

            // 2. TOOL NAVIGATION DETECTION
            const isNavQuery = /(open|go to|show|tira|sel|திற|செல்)/i.test(text);
            const isObjectQuery = /(object|thing|camera|பொருள்)/i.test(text);
            const isFallQuery = /(fall|fell|dropped|வீழ்ச்சி|விழுந்த)/i.test(text);
            const isMedicineQuery = /(medicine|pill|meds|tablet|dose|into|மருந்து)/i.test(text);

            if (isNavQuery || isObjectQuery || isFallQuery || isMedicineQuery) {
                if (isObjectQuery && (isNavQuery || text.includes('detection'))) {
                    this.executeCommands([{ type: 'OPEN_PAGE', payload: { page: 'object-detection' } }]);
                    return language === 'ta' ? "பொருள் அறிதல் பக்கத்தைத் திறக்கிறேன்." : "Opening Object Detection page now.";
                }
                if (isFallQuery && (isNavQuery || text.includes('detection'))) {
                    this.executeCommands([{ type: 'OPEN_PAGE', payload: { page: 'fall-detection' } }]);
                    return language === 'ta' ? "வீழ்ச்சி கண்டறிதல் பக்கத்தைத் திறக்கிறேன்." : "Opening Fall Detection page now.";
                }
                if (isMedicineQuery && (isNavQuery || text.includes('list') || text.includes('schedule'))) {
                    this.executeCommands([{ type: 'OPEN_PAGE', payload: { page: 'medicine' } }]);
                    return language === 'ta' ? "மருந்து பக்கத்தைத் திறக்கிறேன்." : "Opening Medicine page for you.";
                }
            }

            return null;
        } catch (e) {
            console.error("Instant Response Error:", e);
            return null;
        }
    }


    async generateResponse(userMessage, apiKey, language = 'en', isProactive = false) {
        try {
            // Any user message clears the non-response timer
            if (!isProactive) this.clearSafetyResponseTimer();

            // 0. QUICK NAVIGATION FAIL-SAFE
            if (!isProactive && userMessage) {
                const instant = await this.getInstantResponse(userMessage, language);
                if (instant) {
                    if (!isProactive) this.conversationHistory.push({ user: userMessage, bot: instant });
                    return instant;
                }
            }

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

            const model = (typeof CONFIG !== 'undefined' && CONFIG.getModel) ? CONFIG.getModel() : 'gemini-1.5-flash';
            const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

            const response = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    contents: [{ parts: [{ text: promptInput }] }],
                    generationConfig: { temperature: 0.7, maxOutputTokens: 500 }
                })
            });

            const data = await response.json();
            if (data.error) throw new Error(data.error.message);

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

            if (!aiResponse && commandMatch) aiResponse = "I have processed your request.";

            if (!isProactive) {
                this.conversationHistory.push({ user: userMessage, bot: aiResponse });
                this.saveHistory();
            } else {
                this.lastProactiveMessage = aiResponse;
            }

            return aiResponse;
        } catch (error) {
            console.error('Chatbot Error:', error);
            if (isProactive) return null; // Don't speak errors in background checks
            const context = this.gatherSystemContext();
            return (language === 'ta') ? "மன்னிக்கவும், என்னால் இப்போது பதில் அளிக்க முடியவில்லை. ஆனால் நான் உங்களைக் கண்காணித்துக் கொண்டிருக்கிறேன்." : "I'm having a bit of trouble, but I am still watching over you.";
        }
    }


    executeCommands(commands) {
        commands.forEach(cmd => {
            console.log("Executing Command:", cmd);
            switch (cmd.type) {
                case 'OPEN_PAGE':
                    const pageMap = {
                        'object-detection': 'object-detection.html',
                        'fall-detection': 'fall-detection.html',
                        'medicine': 'medicine.html',
                        'profile': 'profile.html',
                        'sos': 'sos.html',
                        'health': 'health.html',
                        'hospital': 'hospital.html'
                    };
                    if (pageMap[cmd.payload.page]) {
                        setTimeout(() => window.location.href = pageMap[cmd.payload.page], 1000);
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
        const context = this.gatherSystemContext();

        let shouldTrigger = false;
        let priorityReason = "";

        // 1. SOS (State Change) - Emergencies bypass normal cooldown
        const isSos = context.sosStatus === 'active';
        if (isSos && !this.activeStates.sos) {
            shouldTrigger = true;
            this.activeStates.sos = true;
            priorityReason = "SOS ACTIVE";
        } else if (!isSos) {
            this.activeStates.sos = false;
        }

        // 2. Fall (State Change) - Emergencies bypass normal cooldown
        const isFall = context.fallDetection.status === 'detected';
        if (isFall && !this.activeStates.fall) {
            shouldTrigger = true;
            this.activeStates.fall = true;
            priorityReason = "FALL DETECTED";
        } else if (!isFall) {
            this.activeStates.fall = false;
        }

        // 3. Objects
        if (context.objectDetection.detected) {
            const currentObj = context.objectDetection.objects[0];
            if (currentObj !== this.activeStates.lastObject) {
                shouldTrigger = true;
                this.activeStates.lastObject = currentObj;
                priorityReason = `NEW OBJECT: ${currentObj}`;
            }
        } else {
            this.activeStates.lastObject = null;
        }

        // 4. Medicine Due Now
        if (context.medicineSchedule.dueNow.length > 0) {
            const medId = context.medicineSchedule.dueNow[0].id;
            if (!this.lastAlertTime[medId] || (now - this.lastAlertTime[medId] > 300000)) {
                shouldTrigger = true;
                this.lastAlertTime[medId] = now;
                priorityReason = "MEDICINE DUE";
            }
        }

        if (now < this.globalProactiveCooldown && !priorityReason.includes("FALL") && !priorityReason.includes("SOS")) return;

        const apiKey = CONFIG.getApiKey();
        if (!apiKey) return;

        if (shouldTrigger) {
            console.log(`[Intelligence] Triggering proactive alert. Reason: ${priorityReason}`);

            // Only update cooldown for non-emergencies
            if (!priorityReason.includes("FALL") && !priorityReason.includes("SOS")) {
                this.globalProactiveCooldown = now + 45000;
            } else {
                this.globalProactiveCooldown = now + 10000; // Shorter cooldown for emergencies to allow follow-ups
            }

            let alertMessage = await this.generateResponse("", apiKey, context.settings.lang || 'en', true);

            // Override with mandatory phrases for critical alerts if AI is too slow or wordy
            if (priorityReason === "FALL DETECTED") {
                alertMessage = (context.settings.lang === 'ta') ? "வீழ்ச்சி கண்டறியப்பட்டது! நீங்கள் நலமாக இருக்கிறீர்களா?" : "A fall was detected! Are you okay? Help is standing by.";
            } else if (priorityReason === "SOS ACTIVE") {
                alertMessage = (context.settings.lang === 'ta') ? "அவசர எச்சரிக்கை செயல்படுத்தப்பட்டது. உதவி வந்து கொண்டிருக்கிறது." : "SOS Alert activated. Help is on the way.";
            } else if (priorityReason === "MEDICINE DUE") {
                alertMessage = (context.settings.lang === 'ta') ? "மருந்து எடுத்துக்கொள்ள வேண்டிய நேரம் இது." : "It is time to take your medicine.";
            }

            // Start 15s non-response timer for safety situations
            if (priorityReason.includes("FALL") || priorityReason.includes("OBJECT") || priorityReason.includes("SOS")) {
                this.startSafetyResponseTimer(15000);
            }

            if (callback) callback(alertMessage);
        }
    }

    startSafetyGuardian() {
        console.log("🛡️ Safety Guardian initialized in background.");
        window.addEventListener('storage', (e) => {
            const keysToWatch = ['elderFallStatus', 'elderDetectedObjects', 'elderSOSActive'];
            if (keysToWatch.includes(e.key)) {
                this.checkForProactiveAlerts((message) => {
                    if (typeof speak !== 'undefined') speak(message);
                });
            }
        });

        setInterval(() => {
            this.checkForProactiveAlerts((message) => {
                if (typeof speak !== 'undefined') speak(message);
            });
        }, 15000);
    }
}

const elderCareChatbot = new ElderCareChatbot();

if (!window.location.pathname.includes('chat.html')) {
    document.addEventListener('DOMContentLoaded', () => {
        elderCareChatbot.startSafetyGuardian();
    });
}
