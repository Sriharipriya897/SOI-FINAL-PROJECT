# 💬 Chatbot Context Examples - Quick Reference

## Real Examples of Context-Aware Responses

This cheatsheet shows exactly how the chatbot responds in different situations.

---

## 🕐 Time-Based Greetings

### Morning (5 AM - 12 PM)
```
ENGLISH: "Good morning, Mary! I am your care companion. How can I help you today?"
TAMIL: "காலை வணக்கம், Mary! நான் உங்கள் பராமரிப்பு உதவியாளர். உங்களுக்கு என்ன உதவி தேவை?"
```

### Afternoon (12 PM - 5 PM)
```
ENGLISH: "Good afternoon, Mary! I am your care companion. How can I help you today?"
TAMIL: "மதிய வணக்கம், Mary! நான் உங்கள் பராமரிப்பு உதவியாளர். உங்களுக்கு என்ன உதவி தேவை?"
```

### Evening (5 PM - 9 PM)
```
ENGLISH: "Good evening, Mary! I am your care companion. How can I help you today?"
TAMIL: "மாலை வணக்கம், Mary! நான் உங்கள் பராமரிப்பு உதவியாளர். உங்களுக்கு என்ன உதவி தேவை?"
```

### Night (9 PM - 5 AM)
```
ENGLISH: "Good evening, Mary! I am your care companion. How can I help you today?"
TAMIL: "இரவு வணக்கம், Mary! நான் உங்கள் பராமரிப்பு உதவியாளர். உங்களுக்கு என்ன உதவி தேவை?"
```

---

## 👁️ Object Detection Context

### Single Object Detected
**Context**: Camera sees a chair

**User**: "Hello"

**Response (EN)**: 
> "Hello! I notice there is a chair nearby. Please walk carefully. How can I help you?"

**Response (TA)**: 
> "வணக்கம்! உங்களுக்கு அருகில் ஒரு நாற்காலி உள்ளது. கவனமாக நடக்கவும். உங்களுக்கு என்ன உதவி தேவை?"

---

### Multiple Objects Detected
**Context**: Camera sees chair, table, cup

**User**: "Hello"

**Response (EN)**: 
> "Hello! I notice there are objects nearby including a chair, table, and cup. Please move carefully. How may I assist you?"

**Response (TA)**: 
> "வணக்கம்! உங்களுக்கு அருகில் நாற்காலி, மேசை மற்றும் கோப்பை உள்ளன. கவனமாக நகருங்கள். உங்களுக்கு என்ன உதவி?"

---

## 🚑 Fall Detection Context

### Fall Just Detected
**Context**: Fall detected, SOS not active

**User**: "Hello" (or chatbot checks proactively)

**Response (EN)**: 
> "I noticed a sudden movement. Are you feeling okay? Do you need help?"

**Response (TA)**: 
> "திடீரான இயக்கத்தை நான் கவனித்தேன். நீங்கள் நலமாக உள்ளீர்களா? உதவி தேவையா?"

---

### Asking About Fall
**Context**: Fall detected

**User**: "What happened?"

**Response (EN)**: 
> "I detected a sudden movement that looked like a fall. Are you hurt? Please let me know if you need emergency help."

---

## 🚨 SOS Context

### SOS Active
**Context**: Emergency alert is currently active

**User**: "What's going on?"

**Response (EN)**: 
> "An emergency alert is active. If you are safe, you may cancel it from the SOS page. Otherwise, help is being notified."

**Response (TA)**: 
> "அவசர எச்சரிக்கை செயலில் உள்ளது. நீங்கள் பாதுகாப்பாக இருந்தால், SOS பக்கத்தில் அதை ரத்து செய்யலாம்."

---

### SOS Recently Cancelled
**Context**: SOS was cancelled 2 minutes ago

**User**: "Hello"

**Response (EN)**: 
> "Hello. The emergency alert has been cancelled. I'm glad you're safe. Please move carefully."

**Response (TA)**: 
> "வணக்கம். அவசர எச்சரிக்கை ரத்து செய்யப்பட்டது. நீங்கள் பாதுகாப்பாக இருப்பது மகிழ்ச்சி. கவனமாக நகருங்கள்."

---

## 💊 Medicine Reminder Context

### Medicine Due Now
**Context**: Blood Pressure tablet scheduled for current time

**Proactive Alert** (chatbot speaks first):
> "It is time to take your Blood Pressure tablet. Please take 1 tablet with water."

**Response (TA)**:
> "உங்கள் இரத்த அழுத்த மாத்திரை எடுக்க வேண்டிய நேரம். தயவுசெய்து தண்ணீருடன் 1 மாத்திரை எடுத்துக்கொள்ளுங்கள்."

---

### Upcoming Medicine
**Context**: Next medicine in 30 minutes

**User**: "Do I have any medicines today?"

**Response (EN)**: 
> "Yes, you have Blood Pressure tablet coming up at 2:30 PM. I'll remind you when it's time."

---

### Asking About Medicines
**Context**: 3 medicines scheduled today

**User**: "What medicines do I take?"

**Response (EN)**: 
> "You have 3 medicine reminders set for today. Check the Medicine page for the full schedule. Would you like me to remind you?"

---

## 😴 Inactivity Context

### Long Inactivity (2+ hours)
**Context**: No activity detected for 3 hours

**Proactive Alert**:
> "I have not noticed movement for a while. Are you okay? Please let me know if you need anything."

**Response (TA)**:
> "நீண்ட நேரமாக உங்கள் இயக்கத்தை நான் கவனிக்கவில்லை. நீங்கள் நலமாக இருக்கிறீர்களா? உதவி தேவையா?"

---

## 🏥 Medical Questions

### Asking for Diagnosis
**User**: "I have headache and fever. What disease do I have?"

**Response (EN)**: 
> "Headache and fever can have many causes. I cannot diagnose medical conditions. Please see a doctor for proper evaluation and treatment."

**Response (TA)**: 
> "தலைவலி மற்றும் காய்ச்சல் பல காரணங்களால் வரலாம். நான் நோயைக் கண்டறிய முடியாது. மருத்துவரை அணுகவும்."

---

### Asking for Treatment
**User**: "What medicine should I take for diabetes?"

**Response (EN)**: 
> "Diabetes medications must be prescribed by a doctor. Please consult your doctor for the right medicine and dosage. Never self-medicate."

---

### Serious Symptoms
**User**: "I have chest pain"

**Response (EN)**: 
> "Chest pain can be serious. Please see a doctor immediately or call emergency services (911/108). Don't ignore it."

**Response (TA)**: 
> "மார்பு வலி தீவிரமானதாக இருக்கலாம். உடனடியாக மருத்துவரை அணுகவும் அல்லது அவசர சேவைகளை (108) அழைக்கவும்."

---

## 💬 General Conversation

### Simple Greeting
**User**: "Hi"

**Response (EN)**: 
> "Hello! I'm here to help. How are you feeling today?"

---

### How Are You
**User**: "How are you?"

**Response (EN)**: 
> "I'm here and ready to help you! How are you feeling? Is there anything you need?"

---

### Feeling Lonely
**User**: "I feel lonely"

**Response (EN)**: 
> "I'm here to keep you company. Would you like to chat or do you need me to call someone? Remember, you're not alone."

**Response (TA)**: 
> "நான் உங்களுக்கு தோழமை வழங்க இங்கே இருக்கிறேன். உரையாடலாமா அல்லது யாரையாவது அழைக்கட்டுமா? நீங்கள் தனியாக இல்லை."

---

### Thank You
**User**: "Thank you"

**Response (EN)**: 
> "You're welcome! I'm here anytime you need me. Take care!"

**Response (TA)**: 
> "உங்களுக்கு வரவேற்பு! நான் எப்போதும் இங்கே இருக்கிறேன். கவனமாக இருங்கள்!"

---

### Asking for Help
**User**: "I need help"

**Response (EN)**: 
> "I'm here to help. Please tell me what you need. If it's an emergency, use the SOS button."

---

## 🍽️ Health & Lifestyle Questions

### Diabetes Diet
**User**: "What should I eat for diabetes?"

**Response (EN)**: 
> "For diabetes, focus on vegetables, whole grains, and lean proteins. However, please consult your doctor for a personalized diet plan."

**Response (TA)**: 
> "நீரிழிவுக்கு காய்கறிகள், முழு தானியங்கள் மற்றும் புரத உணவுகள் நல்லது. ஆனால் உங்கள் மருத்துவரிடம் ஆலோசனை பெறவும்."

---

### High BP Diet
**User**: "What foods are good for high blood pressure?"

**Response (EN)**: 
> "Low-salt foods, fruits, vegetables, and whole grains help with blood pressure. Please consult your doctor for a specific diet plan."

---

### Exercise
**User**: "Should I exercise?"

**Response (EN)**: 
> "Gentle exercise like walking can be beneficial. However, please consult your doctor before starting any new exercise routine."

---

## 🎭 Emotional Support

### Feeling Scared
**User**: "I'm scared"

**Response (EN)**: 
> "It's okay to feel scared. I'm here with you. Would you like to talk about it or call someone? You're safe."

---

### Feeling Sick
**User**: "I don't feel well"

**Response (EN)**: 
> "I'm sorry you're not feeling well. Can you tell me what's bothering you? If it's serious, please see a doctor."

---

### Can't Sleep
**User**: "I can't sleep"

**Response (EN)**: 
> "Try relaxing before bed - avoid screens, keep the room cool and dark. If sleep problems continue, please see a doctor."

---

## 📊 Multiple Context Example

### Complex Scenario
**Context**: 
- Morning (9 AM)
- Chair detected nearby
- Medicine due at 9:00 AM
- User is 72 years old with Diabetes

**User**: "Good morning"

**Response (EN)**: 
> "Good morning, Mary! I notice there's a chair nearby - please walk carefully. Also, it's time to take your Diabetes medication (1 tablet with breakfast). How are you feeling today?"

---

## 🎯 Key Response Patterns

### Always Short
✅ Maximum 2-3 sentences
✅ Clear and simple language
✅ One point at a time

### Always Safe
✅ Never diagnose
✅ Always recommend doctor for medical issues
✅ Prioritize user safety

### Always Contextual
✅ Mentions relevant detected objects
✅ Acknowledges fall/SOS status
✅ Reminds about medicines
✅ Checks on inactivity

### Always Respectful
✅ Addresses user by name
✅ Calm, gentle tone
✅ Never panics or alarms
✅ Supportive and encouraging

---

## 💡 Pro Tips

1. **Chatbot learns context but not conversation history** - Each message is independent

2. **Context updates in real-time** - Turn on camera, objects appear in next response

3. **Proactive alerts are throttled** - Won't spam same alert within 5 minutes

4. **Language is consistent** - If Tamil is selected, all responses are in Tamil

5. **Medical questions always suggest doctor** - This is correct and safe behavior!

---

## 🧪 Testing Checklist

Use these exact phrases to test:

- [x] "Hello" (basic greeting)
- [x] "How are you?" (companionship)
- [x] "I have diabetes" (acknowledges but doesn't diagnose)
- [x] "What medicine should I take?" (refuses, suggests doctor)
- [x] "I feel lonely" (emotional support)
- [x] "I'm scared" (reassurance)
- [x] "Thank you" (polite response)
- [x] "வணக்கம்" (Tamil test)

---

**Your chatbot is intelligent, context-aware, and always prioritizes your safety!** 🤖💙
