import { createContext, useContext, ReactNode, useState } from "react";

// Mocking Better-Auth for Demo/Competition
const mockUser = {
    id: "demo-user-123",
    name: "Demo User",
    email: "demo@interx.com",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"
};

interface AuthContextValue {
    session: any;
    user: any;
    loading: boolean;
    authModalOpen: boolean;
    setAuthModalOpen: (open: boolean) => void;
    signIn: any;
    signUp: any;
    signOut: any;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<any>(null);
    const [authModalOpen, setAuthModalOpen] = useState(false);

    const signIn = {
        email: async () => { setUser(mockUser); return { data: { user: mockUser }, error: null }; }
    };
    const signUp = {
        email: async () => { setUser(mockUser); return { data: { user: mockUser }, error: null }; }
    };
    const signOut = async () => { setUser(null); return { error: null }; };

    return (
        <AuthContext.Provider value={{ 
            session: user ? { user } : null, 
            user, 
            loading: false,
            authModalOpen,
            setAuthModalOpen,
            signIn,
            signUp,
            signOut
        }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used within an AuthProvider");
    return context;
}
