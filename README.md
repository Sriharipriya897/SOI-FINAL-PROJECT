# 📌 Project Overview

**Elder Care Companion** is a browser-based PoC / MVP that uses existing consumer devices such as mobile phones, webcams, or fixed indoor IP cameras to assist elderly users with:

- Fall-like event detection
- Emergency SOS alerts
- Daily assistance through an AI companion chatbot
- Medicine reminders and notifications

All processing is done locally in the browser, making the system privacy-friendly and easy to deploy.

---

## 🎯 Target Users

- Elderly individuals living alone
- Family members and caregivers
- NGOs and old-age homes with limited budgets

---

## 🧠 Core Philosophy

- Software-first approach
- Uses existing consumer hardware
- No mandatory wearables
- No expensive proprietary sensors
- No forced subscriptions
- Privacy-friendly (no cloud video storage)

---

## ✨ Key Features

### 🏥 **NEW: Hospital & Healthcare Integration**
- **KG Hospital Module** - Dedicated interface for managing appointments at KG Hospital.
- **Nurse Portal** - Secure entrance for healthcare providers to sync authoritative prescriptions and vitals.
- **Medicine Sync** - Instant synchronization between Nurse Portal and Elder Reminders.
- **Health Report Generation** - Downloadable PDF-style text reports for medical review.

### 🤖 **NEW: Intelligent Context-Aware Chatbot**
- **Real-time context gathering** from all app modules (objects, falls, SOS, medicines, appointments)
- **ChatGPT-level Intelligence** - Reason across multiple systems (e.g., reminding about meds while checking fall safety)
- **Permanent Companion Mode** - Strictly for elder safety; suppresses technical errors and API failures.
- **Voice-First Navigation** - Voice command support for opening pages and booking appointments.

### 🚨 Safety & Monitoring
- **Camera-based Fall Detection** - Logic-based motion analysis (no ML training required)
- **Object Detection** - TensorFlow.js with COCO-SSD for obstacle identification
- **SOS Emergency Alerts** - Automatic contact notification via email and WhatsApp
- **Proactive wellness checks** - Monitors user activity and checks if inactive

### 💊 Health & Wellness
- **Medicine Reminders** - Voice and visual alerts with customizable schedules
- **Health Vitals Tracking** - Record BP, heart rate, blood sugar
- **Notifications System** - Important events and alerts history

### 🌐 Accessibility
- **Multilingual Support** - English and Tamil (தமிழ்) with text-to-speech
- **Customizable themes** - Blue, Dark Mode, High Contrast
- **Large font sizes** - Normal, Large, Extra Large options
- **Voice input** - Speech recognition for hands-free operation

---

## 🛠️ Technical Architecture

### Frontend Only
- **HTML, CSS, JavaScript** - No backend required
- **Runs entirely in the browser** - Privacy-first approach
- **No backend dependency** - Easy deployment, no server costs

### Camera Input
- Mobile phone camera
- Laptop webcam
- Optional fixed indoor IP camera (RTSP/MJPEG)

### AI & Detection
- **Object Detection**: TensorFlow.js + COCO-SSD
- **Fall Detection**: Frame difference + motion intensity logic
- **Chatbot**: Google Gemini API (gemini-1.5-flash) with advanced context awareness

### Data Storage
- **localStorage** - All data stored locally in browser
- **No cloud storage** - Complete privacy
- **No user tracking** - Data never leaves the device

---

## ⚠️ Important Limitations (Honest Disclosure)

- **Not a medical-grade system** - For assistance only, not diagnosis
- **Bathroom areas excluded** - Video monitoring respects privacy
- **Fall detection is logic-based** - May produce false alerts
- **Designed as risk-reduction** - Not a replacement for human care or medical professionals

---

## 🧪 Current Status

✅ **Proof of Concept completed**

✅ **Intelligent chatbot system implemented** with full context awareness

✅ **Demo-ready UI** with comprehensive features

✅ **Multi-language support** (English + Tamil)

🔄 **Fall detection logic** under continuous refinement

🔄 **Usability testing** planned with elderly users

---

## 🚀 Quick Start

1. **Open `index.html`** in a modern browser (Chrome/Edge recommended)
2. **Login/Register** with any username and password
3. **Go to Settings** → Enter your Google Gemini API Key ([Get one free](https://makersuite.google.com/app/apikey))
4. **Go to Profile** → Fill in your name, age, and medical conditions
5. **Try Chatbot Demo** → Test different scenarios and see context-aware responses
6. **Open Chat** → Experience the intelligent companion chatbot!

---

## 📂 Project Structure

```
.
├── index.html                    # Login page
├── dashboard.html                # Main dashboard
├── hospital.html                 # 🆕 KG Hospital appointments
├── nurse-portal.html             # 🆕 Healthcare provider interface
├── chat.html                     # Intelligent chatbot interface
├── chatbot-demo.html            # Interactive demo for testing
├── fall-detection.html          # Fall detection with camera
├── object-detection.html        # Object detection with warnings
├── sos.html                     # Emergency SOS alerts
├── medicine.html                # Medicine reminders
├── health.html                  # Health vitals tracking
├── profile.html                 # User profile
├── notifications.html           # Notifications history
├── settings.html                # App settings
├── help.html                    # User guide
├── css/
│   └── style.css               # Styling
├── js/
│   ├── auth.js                 # Authentication
│   ├── config.js               # API configuration
│   ├── chatbot-engine.js       # 🆕 Intelligent chatbot engine
│   └── utils.js                # Utility functions
├── CHATBOT_DOCUMENTATION.md     # 🆕 Chatbot feature docs
└── IMPLEMENTATION_SUMMARY.md    # 🆕 Implementation details
```

---

## 🔐 Privacy & Ethics

- **No video or personal data stored on servers** - Everything stays on your device
- **All processing is local** - No cloud uploads
- **Designed with dignity** - Respects elderly users' autonomy
- **Consent and transparency** - Clear about what the system does and doesn't do
- **No tracking or analytics** - Your data is yours

---

## 📚 Documentation

- **[CHATBOT_DOCUMENTATION.md](CHATBOT_DOCUMENTATION.md)** - Complete chatbot feature guide
- **[IMPLEMENTATION_SUMMARY.md](IMPLEMENTATION_SUMMARY.md)** - Technical implementation details
- **[chatbot-demo.html](chatbot-demo.html)** - Interactive testing interface

---

## 🚀 Future Enhancements

- Improved fall detection accuracy with ML models
- Alert escalation workflow to caregivers
- Optional hybrid sensors (non-camera based)
- UX improvements for elderly accessibility
- Caregiver dashboard (future phase)
- Voice-only mode for hands-free operation
- Integration with health monitoring devices
- More language support (Hindi, Telugu, etc.)

---

## 📎 Disclaimer

This project is a **Proof of Concept / academic MVP** and is **not intended for medical diagnosis or emergency medical decision-making**. The chatbot is **NOT a medical professional** and cannot replace doctors or healthcare providers. Users are advised to consult qualified healthcare professionals for medical concerns and emergencies.

Always call emergency services (911, 108, etc.) for life-threatening situations.

---

## 👩‍💻 Authors

Developed as part of an academic project focused on **accessible elder care through software-first design**.

**Goal**: Demonstrate that meaningful elderly assistance can be achieved using:
- Existing consumer hardware
- Open web technologies
- Privacy-respecting local processing
- No expensive proprietary systems

---

## 🙏 Acknowledgments

- **TensorFlow.js** for object detection
- **Google Gemini AI** for intelligent conversation
- **Font Awesome** for icons
- **EmailJS** for emergency notifications
- **Web Speech API** for voice features

---

## 📄 License

This project is developed for educational and research purposes.

---

**Made with ❤️ for elderly care and digital accessibility**
