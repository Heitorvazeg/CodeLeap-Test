import { useEffect, useState } from "react";
import { supabase } from "../services/supabaseService/supabaseClient";
import { useNavigate } from "react-router-dom";

function AuthGuard({ children }) {
    const [session, setSession] = useState(null);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
        const handleAuth = async () => {
            const { data } = await supabase.auth.getSession();
            setSession(data.session);
            setLoading(false);
        }
        
        handleAuth();

        const { data: listener } = supabase.auth.onAuthStateChange(
            (_event, session) => {
                setSession(session);
            }
        );

        return () => {
            listener.subscription.unsubscribe();
        };
    }, [])

    if (loading) {
        return <div>Loading...</div>
    }

    if (!session) {
        navigate("/auth");
    }

    return children;
}

export default AuthGuard;