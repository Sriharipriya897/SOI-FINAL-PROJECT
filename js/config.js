const CONFIG = {
    GEMINI_API_KEY_KEY: 'elder_chat_api_key',
    GEMINI_MODEL_KEY: 'elder_chat_model_id',

    getApiKey: function () {
        return localStorage.getItem(this.GEMINI_API_KEY_KEY) || '';
    },

    setApiKey: function (key) {
        if (!key) return;
        localStorage.setItem(this.GEMINI_API_KEY_KEY, key.trim());
    },

    getModel: function () {
        return localStorage.getItem(this.GEMINI_MODEL_KEY) || 'gemini-1.5-flash';
    },

    setModel: function (model) {
        localStorage.setItem(this.GEMINI_MODEL_KEY, model);
    },

    // Dynamic Model Discovery
    findBestModel: async function (key) {
        try {
            const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${key}`);
            const data = await response.json();

            if (!data.models) return null;

            // Priority list of models we want to use
            const preferred = ['gemini-1.5-flash', 'gemini-1.5-pro', 'gemini-pro', 'gemini-1.0-pro'];

            // Filter for models that support generateContent
            const available = data.models
                .filter(m => m.supportedGenerationMethods && m.supportedGenerationMethods.includes('generateContent'))
                .map(m => m.name.replace('models/', '')); // remove prefix

            // Find best match
            for (const p of preferred) {
                if (available.includes(p)) return p;
            }

            // Fallback to any gemini model
            const anyGemini = available.find(m => m.includes('gemini'));
            return anyGemini || available[0];
        } catch (e) {
            console.error("Model discovery failed", e);
            return null;
        }
    },

    testApiKey: async function () {
        const key = this.getApiKey();
        if (!key) return { success: false, message: 'No API Key found' };

        // 1. Try to discover best model for this key
        const bestModel = await this.findBestModel(key) || 'gemini-1.5-flash';
        this.setModel(bestModel);

        const url = `https://generativelanguage.googleapis.com/v1beta/models/${bestModel}:generateContent?key=${key}`;

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    contents: [{ parts: [{ text: "Hello" }] }]
                })
            });
            const data = await response.json();

            if (response.ok && data.candidates) {
                return { success: true, message: `Key valid! Using model: ${bestModel}` };
            } else {
                const errorMsg = data.error ? data.error.message : 'Invalid API Key';
                return { success: false, message: `Error: ${errorMsg}` };
            }
        } catch (error) {
            console.error(error);
            return { success: false, message: 'Connection Failed' };
        }
    }
};
            