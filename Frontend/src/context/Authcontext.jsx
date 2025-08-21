import { createContext,useState,useEffect } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [auth, setAuth] = useState({
        token: localStorage.getItem("token"),
        userId: localStorage.getItem("userId"),
        username: localStorage.getItem("username")
    })

useEffect(() => {
    if (auth.token && auth.userId) {
        localStorage.setItem("token", auth.token);
        localStorage.setItem("userId", auth.userId);
        localStorage.setItem("username", auth.username);
    } else {
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        localStorage.removeItem("username");
    }
}, [auth]);

return(
    <AuthContext.Provider value ={{ auth,setAuth }}>
        {children}
    </AuthContext.Provider>
);
}