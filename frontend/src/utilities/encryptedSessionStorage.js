export class EncryptedSessionStorage {
    constructor(key, data = null) {
        this.key = key;
        this.data = data;
    }

    encryptData() {
        return btoa(JSON.stringify(this.data));
    }

    save() {
        try {
            const encrypted = this.encryptData(); 
            sessionStorage.setItem(this.key, encrypted);
            
            if (sessionStorage.getItem(this.key) === encrypted) {
                return { success: true };
            } else {
                return {
                    success: false,
                    message: 'Failed to add item to session storage'
                };
            }
        } catch (error) {
            return {
                success: false,
                message: `Storage error: ${error.message}`
            };
        }
    }

    sessionData() {
        if (typeof window === 'undefined') return null;

        const sessionData = sessionStorage.getItem(this.key);

        if (!sessionData) {
            return null;
        }

        try {
            return JSON.parse(atob(sessionData));
        } catch (error) {
            console.error("Failed to decode auth session:", error);
            return null;
        }
    }
}