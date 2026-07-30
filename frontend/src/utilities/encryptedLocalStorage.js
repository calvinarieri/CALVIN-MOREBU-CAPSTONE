import { EncryptedSessionStorage } from "./encryptedSessionStorage";

export class EncryptedLocalStorage extends EncryptedSessionStorage {
    save() {
        try {
            const encrypted = this.encryptData(); 
            localStorage.setItem(this.key, encrypted);
            
            if (localStorage.getItem(this.key) === encrypted) {
                return { success: true };
            } else {
                return {
                    success: false,
                    message: 'Failed to add item to local storage'
                };
            }
        } catch (error) {
            return {
                success: false,
                message: `Storage error: ${error.message}`
            };
        }
    }

    localData() {
        if (typeof window === 'undefined') return null;

        const localStorageData = localStorage.getItem(this.key);

        if (!localStorageData) {
            return null;
        }

        try {
            return JSON.parse(atob(localStorageData));
        } catch (error) {
            console.error("Failed to decode auth sexxion:", error);
            return null;
        }
    }
}