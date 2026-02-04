const TRANSLATIONS = {
    'en': {
        'app_title': 'Elder Care Companion',
        'login_title': 'Login',
        'username': 'Username',
        'password': 'Password',
        'login_btn': 'Login',
        'logout': 'Logout',
        'welcome': 'Welcome',
        'dashboard': 'Dashboard',
        'settings': 'Settings',
        'chat': 'Companion Chat',
        'object_detection': 'Object Detection',
        'fall_detection': 'Fall Detection',
        'medicine': 'Medicines',
        'sos': 'SOS Emergency',
        'health': 'Health Tracker',
        'profile': 'My Profile',
        'notifications': 'Notifications',
        'help': 'Help & Guide',
        'language': 'Language',
        'theme': 'Color Theme',
        'font_size': 'Font Size',
        'back': 'Back',
        'save': 'Save',
        'exit': 'Exit',
        'theme_green': 'Green',
        'theme_blue': 'Blue',
        'size_normal': 'Normal',
        'size_large': 'Large',
        'size_xl': 'Extra Large',
        'sos_alert_sent': 'SOS Alert Sent!',
        'fall_detected': 'Fall Detected! Help is on the way.',
        'detecting': 'Detecting...',
        'no_objects': 'No objects detected',
        'api_settings': 'AI API Settings',
        'api_key': 'Google Gemini API Key',
        'api_placeholder': 'Enter your API Key here',
        'test_api': 'Test API Key',
        'api_valid': 'API Key is valid!',
        'api_invalid': 'Invalid API Key',
        'api_saved': 'API Key Saved Securely',
        'sys_bp': 'Systolic BP',
        'dia_bp': 'Diastolic BP',
        'sugar': 'Blood Sugar (mg/dL)',
        'heart_rate': 'Heart Rate (BPM)',
        'log_vitals': 'Log Vitals',
        'delete_health': 'Delete Health Data',
        'recent_logs': 'Recent Logs',
        'delete_profile': 'Delete Profile',
        'delete_all_meds': 'Delete All Medicines',
        'add_reminder': 'Add Reminder',
        'test_sound': 'Test Sound',
        'med_name_ph': 'Medicine Name (e.g. Metformin)',
        'med_dosage_ph': 'Dosage (e.g. 1 tablet)',
        'full_name': 'Full Name',
        'age': 'Age',
        'med_conditions': 'Medical Conditions',
        'emergency_contact': 'Emergency Contact',
        'contact_name': 'Contact Name',
        'contact_phone': 'Contact Phone',
        'save_profile': 'Save Profile',
        'delete_email': 'Delete Email Data',
        'save_settings': 'Save Settings',
        'no_data': 'No data recorded yet.',
        'no_reminders': 'No reminders set.',
        'help_chat_title': 'How to use Chat?',
        'help_chat_content': "Click on 'Companion Chat'. Type or speak to the AI assistant.",
        'help_med_title': 'Setting Medicine Reminders',
        'help_med_content': "Go to 'Medicines'. Enter details and Save. You will be alerted at the time.",
        'help_sos_title': 'Using SOS',
        'help_sos_content': "Tap the red SOS button. It sounds an alarm and notifies emergency contacts.",
        'help_lang_title': 'Changing Language',
        'help_lang_content': "Go to Settings. Select Tamil/English. Save Settings.",
    },
    'ta': {
        'app_title': 'முதியோர் பராமரிப்பு உதவியாளர்',
        'login_title': 'உள்நுழைய',
        'username': 'பயனர்பெயர்',
        'password': 'கடவுச்சொல்',
        'login_btn': 'உள்நுழைய',
        'logout': 'வெளியேறு',
        'welcome': 'நல்வரவு',
        'dashboard': 'முகப்பு',
        'settings': 'அமைப்புகள்',
        'chat': 'தோழமை அரட்டை',
        'object_detection': 'பொருள் அறிதல்',
        'fall_detection': 'வீழ்ச்சி கண்டறிதல்',
        'medicine': 'மருந்துகள்',
        'sos': 'அவசர உதவி',
        'health': 'சுகாதார கண்காணிப்பு',
        'profile': 'என் சுயவிவரம்',
        'notifications': 'அறிவிப்புகள்',
        'help': 'உதவி',
        'language': 'மொழி',
        'theme': 'வண்ணத் தலைப்பு',
        'font_size': 'எழுத்து அளவு',
        'back': 'பின்செல்',
        'save': 'சேமி',
        'exit': 'வெளியேறவும்',
        'theme_green': 'பச்சை',
        'theme_blue': 'நீலம்',
        'size_normal': 'சாதாரணம்',
        'size_large': 'பெரியது',
        'size_xl': 'மிகப் பெரியது',
        'sos_alert_sent': 'SOS எச்சரிக்கை அனுப்பப்பட்டது!',
        'fall_detected': 'வீழ்ச்சி கண்டறியப்பட்டது! உதவி வருகிறது.',
        'detecting': 'கண்டறிகிறது...',
        'no_objects': 'பொருட்கள் எதுவும் இல்லை',
        'api_settings': 'AI API அமைப்புகள்',
        'api_key': 'Google Gemini API திறவுகோல்',
        'api_placeholder': 'உங்கள் API திறவுகோலை இங்கே உள்ளிடவும்',
        'test_api': 'API சோதிக்கவும்',
        'api_valid': 'API திறவுகோல் சரியானது!',
        'api_invalid': 'API தவறானது அல்லது காலாவதியானது',
        'api_saved': 'API பாதுகாப்பாக சேமிக்கப்பட்டது',
        'sys_bp': 'சிஸ்டாலிக் அழுத்தம்',
        'dia_bp': 'டயஸ்டாலிக் அழுத்தம்',
        'sugar': 'இரத்த சர்க்கரை (mg/dL)',
        'heart_rate': 'இதய துடிப்பு (BPM)',
        'log_vitals': 'உடல் அளவீடுகள் பதிவு',
        'delete_health': 'சுகாதார தரவை அழிக்கவும்',
        'recent_logs': 'சமீபத்திய பதிவுகள்',
        'delete_profile': 'சுயவிவரத்தை அழிக்கவும்',
        'delete_all_meds': 'அனைத்து மருந்து தகவல்களையும் அழிக்கவும்',
        'add_reminder': 'நினைவூட்டலைச் சேர்',
        'test_sound': 'ஒலியை சோதி',
        'med_name_ph': 'மருந்தின் பெயர்',
        'med_dosage_ph': 'அளவு (எ.கா: 1 மாத்திரை)',
        'full_name': 'முழு பெயர்',
        'age': 'வயது',
        'med_conditions': 'மருத்துவ நிலைமைகள்',
        'emergency_contact': 'அவசர தொடர்பு',
        'contact_name': 'தொடர்பு பெயர்',
        'contact_phone': 'தொடர்பு எண்',
        'save_profile': 'சுயவிவரத்தை சேமி',
        'delete_email': 'மின்னஞ்சல் தரவை அழிக்கவும்',
        'save_settings': 'அமைப்புகளைச் சேமி',
        'no_data': 'தரவு எதுவும் பதிவு செய்யப்படவில்லை.',
        'no_reminders': 'நினைவூட்டல்கள் இல்லை.',
        'help_chat_title': 'அரட்டையைப் பயன்படுத்துவது எப்படி?',
        'help_chat_content': "'தோழமை அரட்டை'யைக் கிளிக் செய்யவும். AI உதவியாளரிடம் தட்டச்சு செய்யவும் அல்லது பேசவும்.",
        'help_med_title': 'மருந்து நினைவூட்டல்களை அமைத்தல்',
        'help_med_content': "'மருந்துகள்' செல்லவும். விவரங்களை உள்ளிட்டு சேமிக்கவும். சரியான நேரத்தில் அலாரம் ஒலிக்கும்.",
        'help_sos_title': 'அவசர உதவியை (SOS) பயன்படுத்துதல்',
        'help_sos_content': "சிவப்பு SOS பொத்தானைத் தட்டவும். இது அலாரத்தை ஒலிக்கும் மற்றும் உறவினர்களுக்கு தெரிவிக்கும்.",
        'help_lang_title': 'மொழியை மாற்றுதல்',
        'help_lang_content': "அமைப்புகளுக்குச் செல்லவும். தமிழ் அல்லது ஆங்கிலத்தைத் தேர்ந்தெடுக்கவும். சேமிக்கவும்.",
    }
};

const DEFAULTS = {
    lang: 'en',
    theme: 'green',
    fontSize: 'normal'
};

// State Management
function getSettings() {
    return JSON.parse(localStorage.getItem('elderWithSettings')) || DEFAULTS;
}

function saveSettings(settings) {
    localStorage.setItem('elderWithSettings', JSON.stringify(settings));
    applySettings();
}


function updateText(lang) {
    const textElements = document.querySelectorAll('[data-i18n]');
    textElements.forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (TRANSLATIONS[lang] && TRANSLATIONS[lang][key]) {
            el.innerText = TRANSLATIONS[lang][key];
        }
    });

    const inputs = document.querySelectorAll('[data-i18n-placeholder]');
    inputs.forEach(input => {
        const key = input.getAttribute('data-i18n-placeholder');
        if (TRANSLATIONS[lang] && TRANSLATIONS[lang][key]) {
            input.placeholder = TRANSLATIONS[lang][key];
        }
    });
}

const COCO_TRANSLATIONS = {
    'person': 'நபர்',
    'bicycle': 'மிதிவண்டி',
    'car': 'கார்',
    'motorcycle': 'மோட்டார் சைக்கிள்',
    'airplane': 'விமானம்',
    'bus': 'பேருந்து',
    'train': 'ரயில்',
    'truck': 'சரக்கு வண்டி',
    'boat': 'படகு',
    'traffic light': 'போக்குவரத்து விளக்கு',
    'fire hydrant': 'தீயணைப்பு குழாய்',
    'stop sign': 'நிறுத்து குறி',
    'parking meter': 'வாகன நிறுத்து கருவி',
    'bench': 'பெஞ்ச்',
    'bird': 'பறவை',
    'cat': 'பூனை',
    'dog': 'நாய்',
    'horse': 'குதிரை',
    'sheep': 'செம்மறி ஆடு',
    'cow': 'பசு',
    'elephant': 'யானை',
    'bear': 'கரடி',
    'zebra': 'வரிக்குதிரை',
    'giraffe': 'ஒட்டகச்சிவிங்கி',
    'backpack': 'முதுகுப்பை',
    'umbrella': 'குடை',
    'handbag': 'கைப்பை',
    'tie': 'டை',
    'suitcase': 'பெட்டி',
    'frisbee': 'பறக்கும் தட்டு',
    'skis': 'பனிச்சறுக்கு',
    'snowboard': 'பனிச்சறுக்கு பலகை',
    'sports ball': 'விளையாட்டு பந்து',
    'kite': 'பட்டம்',
    'baseball bat': 'பேஸ்பால் மட்டை',
    'baseball glove': 'பேஸ்பால் கையுறை',
    'skateboard': 'சறுக்கு பலகை',
    'surfboard': 'அலைச்சறுக்கு பலகை',
    'tennis racket': 'டென்னிஸ் மட்டை',
    'bottle': 'பாட்டில்',
    'wine glass': 'மது குவளை',
    'cup': 'கோப்பை',
    'fork': 'முள் கரண்டி',
    'knife': 'கத்தி',
    'spoon': 'கரண்டி',
    'bowl': 'கிண்ணம்',
    'banana': 'வாழைப்பழம்',
    'apple': 'ஆப்பிள்',
    'sandwich': 'சாண்ட்விச்',
    'orange': 'ஆரஞ்சு',
    'broccoli': 'ப்ரோக்கோலி',
    'carrot': 'கேரட்',
    'hot dog': 'ஹாட் டாக்',
    'pizza': 'பீட்சா',
    'donut': 'டோனட்',
    'cake': 'கேக்',
    'chair': 'நாற்காலி',
    'couch': 'சோபா',
    'potted plant': 'தொட்டி செடி',
    'bed': 'படுக்கை',
    'dining table': 'சாப்பாட்டு மேசை',
    'toilet': 'கழிப்பறை',
    'tv': 'தொலைக்காட்சி',
    'laptop': 'மடிக்கணினி',
    'mouse': 'சுட்டி',
    'remote': 'ரிமோட்',
    'keyboard': 'விசைப்பலகை',
    'cell phone': 'கையடக்கத் தொலைபேசி',
    'microwave': 'மைக்ரோவேவ்',
    'oven': 'அடுப்பு',
    'toaster': 'டோஸ்டர்',
    'sink': 'கழுவும் தொட்டி',
    'refrigerator': 'குளிரூட்டி',
    'book': 'புத்தகம்',
    'clock': 'கடிகாரம்',
    'vase': 'பூ சாடி',
    'scissors': 'கத்திரிக்கோல்',
    'teddy bear': 'டெட்டி கரடி',
    'hair drier': 'முடி உலர்த்தி',
    'toothbrush': 'பல் துலக்கி'
};

// Speech Helpers
function startSpeechRecognition(callback) {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
        alert("Voice input not supported in this browser. Try Chrome/Edge.");
        return null;
    }

    const recognition = new SpeechRecognition();
    const settings = getSettings();
    recognition.lang = settings.lang === 'ta' ? 'ta-IN' : 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onresult = (event) => {
        const text = event.results[0][0].transcript;
        callback(text);
    };

    recognition.onerror = (event) => {
        console.error("Speech error", event.error);
    };

    recognition.start();
    return recognition;
}

// Updated Speak to force language match
function speak(text, forceLang = null) {
    // Stop any existing speech
    window.speechSynthesis.cancel();

    // Ensure we have voices loaded (sometimes happens async)
    let voices = window.speechSynthesis.getVoices();
    if (voices.length === 0) {
        // Retry once after a delay if empty, though outside robust event handling, this is a best effort
        setTimeout(() => speak(text, forceLang), 100);
        return;
    }

    const settings = getSettings();
    const targetLang = forceLang || (settings.lang === 'ta' ? 'ta-IN' : 'en-US');

    const msg = new SpeechSynthesisUtterance(text);
    msg.lang = targetLang;

    // Adjust for Tamil - slower rate for better clarity
    if (targetLang.includes('ta')) {
        msg.rate = 0.9; // Slightly slower
        msg.pitch = 1.0;
    } else {
        msg.rate = 1.0;
        msg.pitch = 1.0;
    }

    // Try to find a matching voice
    const voice = voices.find(v => v.lang.includes(targetLang));
    if (voice) msg.voice = voice;

    window.speechSynthesis.speak(msg);
}

// Initialize on Load
document.addEventListener('DOMContentLoaded', () => {
    applySettings();
    // Pre-load voices
    window.speechSynthesis.getVoices();
});

function applySettings() {
    const settings = getSettings();
    const root = document.documentElement;

    // Apply Theme
    root.classList.remove('blue-theme');
    if (settings.theme === 'blue') root.classList.add('blue-theme');

    // Apply Font Size
    root.classList.remove('font-large', 'font-xl');
    if (settings.fontSize === 'large') root.classList.add('font-large');
    if (settings.fontSize === 'xl') root.classList.add('font-xl');

    // Apply Language
    updateText(settings.lang);
}

function checkAuth(restricted = true) {
    const user = localStorage.getItem('elderUser');
    if (restricted && !user) {
        window.location.href = 'index.html';
    } else if (!restricted && user) {
        window.location.href = 'dashboard.html';
    }
    return JSON.parse(user || '{}');
}
