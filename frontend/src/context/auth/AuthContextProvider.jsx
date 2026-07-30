import React from "react";
import { AuthContext } from "./AuthContext";
import { EncryptedLocalStorage } from "../../utilities/encryptedLocalStorage";
import { handleLogout } from "../../api/auth";

export default function AuthContextProvider({ children }) {
    const [user, setUser] = React.useState(() => {
        const localUserData = new EncryptedLocalStorage('wb_lg_user').localData();
        return localUserData || null; 
    });

    React.useEffect(() => {
        const syncAuth = async () => {
            if (user) {
                const updateUser = new EncryptedLocalStorage('wb_lg_user', user);
                updateUser.save();
            } else {
                try {
                    const result = handleLogout();
                    
                    if (result?.success) {
                        localStorage.removeItem('wb_lg_user');
                        window.location.href = "/";
                    }
                } catch (error) {
                    
                    localStorage.removeItem('wb_lg_user');
                    window.location.href = "/";
                }
            }
        };

        syncAuth();
    }, [user]);

    return (
        <AuthContext.Provider value={{ user, setUser }}>
            {children}
        </AuthContext.Provider>
    );
}