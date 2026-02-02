# Elder Care Companion Chatbot System

## 🤖 Intelligent Context-Aware Chatbot

The Elder Care Companion now features an **advanced AI chatbot** designed specifically for elderly users living alone. The chatbot is **NOT a medical professional** and follows strict safety guidelines.

---

## ✨ Key Features

### 1. **Context-Aware Intelligence**
The chatbot continuously monitors and responds based on real-time system context:

- **Object Detection Status** - Warns about nearby obstacles (chair, table, etc.)
- **Fall Detection** - Provides calm reassurance if fall is detected
- **SOS Status** - Explains emergency alerts and reassures the user
- **Medicine Reminders** - Politely reminds to take medications on time
- **Inactivity Monitoring** - Checks on user if inactive for extended periods
- **User Profile** - Personalizes responses with name and medical history
- **Time of Day** - Adjusts greetings based on morning/afternoon/evening/night

### 2. **Behavioral Guidelines**

#### Core Principles:
✅ **Always calm, friendly, and elderly-appropriate tone**
✅ **Simple language (2-3 sentences max)**
✅ **Never panic the user**
✅ **Never give medical diagnosis or treatment advice**
✅ **Always recommend seeing a doctor for medical questions**

#### Safety Rules:
- Assistive guidance only
- No emergency medical decisions
- No diagnosis capabilities
- Gentle warnings about detected objects
- Reassurance during fall or SOS events

### 3. **Multi-Language Support**
- **English** - Full conversational support
- **Tamil (தமிழ்)** - Complete translation with cultural sensitivity

---

## 📋 How It Works

### System Context Gathering

Every time the user sends a message, the chatbot:

1. **Gathers real-time data**:
   ```javascript
   - User profile (name, age, medical conditions)
   - Detected objects from camera
   - Fall detection status
   - SOS alert status
   - Medicine schedule (due now, upcoming)
   - Last user activity timestamp
   - Current time and time of day
   ```

2. **Builds intelligent system prompt**:
   - Injects all relevant context
   - Provides specific response guidelines
   - Sets behavioral rules

3. **Generates context-aware response**:
   - Uses Google Gemini AI API
   - Follows strict elderly-friendly guidelines
   - Keeps responses short and clear

---

## 🚨 Context-Specific Behavior Examples

### Object Detection Context
**Scenario**: Camera detects a chair near user

**English Response**:
> "I notice there is a chair in front of you. Please walk carefully."

**Tamil Response**:
> "உங்களுக்கு முன்னால் ஒரு நாற்காலி உள்ளது. கவனமாக நடக்கவும்."

---

### Fall Detection Context
**Scenario**: Fall detected but SOS not triggered

**English Response**:
> "I noticed a sudden movement. Are you feeling okay?"

**Tamil Response**:
> "திடீரான இயக்கத்தை நான் கவனித்தேன். நீங்கள் நலமாக உள்ளீர்களா?"

---

### SOS Active Context
**Scenario**: Emergency alert is active

**English Response**:
> "An emergency alert is active. If you are safe, you may cancel it. Otherwise, help is being notified."

**Tamil Response**:
> "அவசர எச்சரிக்கை செயலில் உள்ளது. நீங்கள் பாதுகாப்பாக இருந்தால், அதை ரத்து செய்யலாம்."

---

### Medicine Reminder Context
**Scenario**: Medicine is due now (e.g., Blood Pressure tablet at 9:00 AM)

**English Response**:
> "It is time to take your Blood Pressure tablet. Please take it with water."

**Tamil Response**:
> "உங்கள் இரத்த அழுத்த மாத்திரை எடுக்க வேண்டிய நேரம். தயவுசெய்து தண்ணீருடன் எடுத்துக்கொள்ளுங்கள்."

---

### Inactivity Context
**Scenario**: No activity detected for 2+ hours

**English Response**:
> "I have not noticed movement for a while. Are you okay?"

**Tamil Response**:
> "சிறிது நேரமாக உங்கள் இயக்கத்தை நான் கவனிக்கவில்லை. நீங்கள் நலமாக இருக்கிறீர்களா?"

---

## 🔄 Proactive Alert System

The chatbot actively monitors for important events and proactively alerts the user:

### Automatic Checks (Every 60 seconds):
- ⏰ **Medicine Due** - Alerts immediately when medicine time arrives
- 🚨 **Fall Detected** - Calmly checks if user is okay
- 😴 **Long Inactivity** - Wellness check after 2 hours of no activity

### Alert Throttling:
- Prevents spam - same alert not repeated within 5 minutes
- Smart timing - only critical alerts shown proactively

---

## 🛠️ Technical Implementation

### Files Structure:
```
js/
├── chatbot-engine.js     # Core intelligent chatbot engine
├── utils.js              # Utility functions (speak, settings, etc.)
└── config.js             # API configuration

chat.html                 # Chat interface
object-detection.html     # Stores detected objects to localStorage
fall-detection.html       # Stores fall status to localStorage
sos.html                  # Stores SOS status to localStorage
medicine.html             # Medicine reminders (read by chatbot)
profile.html              # User profile (read by chatbot)
```

### Data Storage (localStorage):
```javascript
elderProfile              // User name, age, medical conditions
elderDetectedObjects      // Array of currently detected objects
elderLastDetectionTime    // Timestamp of last object detection
elderFallStatus           // 'detected' or 'not_detected'
elderLastFallTime         // Timestamp of last fall
elderSOSActive            // 'true' or 'false'
elderSOSCancelled         // 'true' if recently cancelled
elderReminders            // Medicine schedule array
elderLastActivity         // Last user interaction timestamp
elderWithSettings         // Language, theme preferences
```

---

## 🎯 Usage Instructions

### For Users:

1. **Start Chat**:
   - Click "Companion Chat" from Dashboard
   - Chatbot greets you based on time of day

2. **Text or Voice**:
   - Type message in text box
   - Or click microphone button to speak

3. **Automatic Alerts**:
   - Chatbot will proactively remind about medicines
   - Will check on you if inactive
   - Will reassure during falls or SOS

### For Developers:

1. **Set up API Key**:
   - Go to Settings
   - Enter Google Gemini API Key
   - Save settings

2. **Customize Prompts**:
   - Edit `js/chatbot-engine.js`
   - Modify `buildEnglishPrompt()` or `buildTamilPrompt()`
   - Adjust response length, tone, or safety rules

3. **Add New Context**:
   ```javascript
   // In chatbot-engine.js, add to gatherSystemContext()
   myNewContext: this.getMyNewData()
   
   // Then include in buildSystemPrompt()
   if (context.myNewContext) {
       prompt += `\nNEW DATA: ${context.myNewContext}`;
   }
   ```

---

## ⚙️ Configuration

### Response Parameters:
```javascript
generationConfig: {
    temperature: 0.7,        // Creativity balance
    maxOutputTokens: 200,    // Max response length
    topP: 0.9,               // Nucleus sampling
    topK: 40                 // Top-k sampling
}
```

**Temperature**: 0.7 for balanced, consistent responses
**Max Tokens**: 200 (approx 2-3 sentences in English, Tamil slightly longer)

---

## 🔒 Privacy & Safety

- ✅ All data stored **locally** in browser (localStorage)
- ✅ No data sent to external servers except AI API
- ✅ **No medical diagnosis** - always recommends doctor
- ✅ **No emergency decisions** - user must approve SOS
- ✅ Gentle, reassuring language to avoid panic

---

## 🧪 Testing the Chatbot

### Test Scenarios:

1. **Object Detection Warning**:
   - Enable object detection camera
   - Place objects in view (chair, cup, etc.)
   - Open chat - chatbot should warn about objects

2. **Fall Detection Response**:
   - Simulate fall in fall detection page
   - Open chat - chatbot should ask if you're okay

3. **Medicine Reminder**:
   - Set a medicine reminder for current time
   - Wait for reminder to trigger
   - Chat should proactively alert

4. **SOS Guidance**:
   - Trigger SOS alert
   - Open chat - chatbot should explain status

5. **General Conversation**:
   - Ask: "How are you?"
   - Ask: "What should I eat for diabetes?"
   - Ask: "Tell me a joke"

### Expected Behaviors:
- ✅ Short 2-3 sentence responses
- ✅ Elderly-friendly simple language
- ✅ Medical questions → helpful answer + "see doctor"
- ✅ Context-aware (mentions detected objects, medicines, etc.)

---

## 📞 Support

For issues or questions:
1. Check Settings → API Key is correctly set
2. Check browser console for errors
3. Ensure internet connection for AI responses
4. Clear localStorage if behavior is unexpected

---

## 🚀 Future Enhancements

Potential improvements:
- 🎯 Voice-only mode for hands-free operation
- 🧠 Long-term memory of conversations
- 📊 Health trend analysis and insights
- 🌐 More language support (Hindi, Telugu, etc.)
- 📱 Mobile app with push notifications
- 👨‍⚕️ Integration with health monitoring devices

---

## 📄 License

Part of the Elder Care Companion Project - Designed with ❤️ for elderly care and safety.

**Remember**: This chatbot is a **companion and assistant**, NOT a replacement for medical professionals or emergency services. Always consult qualified medical personnel for health concerns.
