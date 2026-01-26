📌 Project Overview

Elder Care Companion is a browser-based PoC / MVP that uses existing consumer devices such as mobile phones, webcams, or fixed indoor IP cameras to assist elderly users with:

Fall-like event detection

Emergency SOS alerts

Daily assistance through an AI companion chatbot

Medicine reminders and notifications

All processing is done locally in the browser, making the system privacy-friendly and easy to deploy.

🎯 Target Users

Elderly individuals living alone

Family members and caregivers

NGOs and old-age homes with limited budgets

🧠 Core Philosophy

Software-first approach

Uses existing consumer hardware

No mandatory wearables

No expensive proprietary sensors

No forced subscriptions

Privacy-friendly (no cloud video storage)

✨ Key Features

Camera-based Fall Detection (logic-based, no ML training)

Object Detection using TensorFlow.js (COCO-SSD)

SOS Emergency Alerts

AI Companion Chatbot (Google Gemini API)

Medicine Reminders

Notifications

Multilingual Support (English + Tamil)

🛠️ Technical Architecture
Frontend Only

HTML, CSS, JavaScript

Runs entirely in the browser

No backend dependency

Camera Input

Mobile phone camera

Laptop webcam

Optional fixed indoor IP camera (RTSP/MJPEG)

AI & Detection

Object Detection: TensorFlow.js + COCO-SSD

Fall Detection: Frame difference + motion intensity logic

Chatbot: Google Gemini (gemini-1.5-flash)

⚠️ Important Limitations (Honest Disclosure)

Not a medical-grade system

Bathroom areas are excluded from video monitoring due to privacy

Fall detection is logic-based and may produce false alerts

Designed as a risk-reduction system, not a replacement for human care

🧪 Current Status

✅ Proof of Concept completed

✅ Demo-ready UI

🔄 Fall detection logic under refinement

🔄 Usability testing planned

🚀 Future Enhancements

Improved fall detection accuracy

Alert escalation to caregivers

Optional hybrid sensors (non-camera)

UX improvements for elderly accessibility

Caregiver dashboard (future phase)

📂 Project Structure
.
├── index.html
├── dashboard.html
├── chat.html
├── fall-detection.html
├── object-detection.html
├── sos.html
├── medicine.html
├── notifications.html
├── settings.html
├── css/
│   └── style.css
└── js/
    ├── auth.js
    ├── config.js
    └── utils.js

🔐 Privacy & Ethics

No video or personal data stored on servers

All processing is local to the device

Designed with dignity, consent, and transparency in mind

📎 Disclaimer

This project is a Proof of Concept / academic MVP and is not intended for medical diagnosis or emergency medical decision-making. Users are advised to consult healthcare professionals for medical concerns.

👩‍💻 Authors

Developed as part of an academic project focused on accessible elder care through software-first design.
