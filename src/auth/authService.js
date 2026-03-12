import { supabase } from "../services/supabaseService/supabaseClient"

class AuthServiceClass {
    login = async (email, password) => {
        const {data, error} = await supabase.auth.signInWithPassword({email, password});

        if (error) throw new Error("Erro: "+error.message);

        return data;
    }

    register = async (username, email, password) => {
        const newUser = {
            email: email,
            password: password,
            options: {
                data: {
                    name: username,
                }
            }
        }

        const {data, error} = await supabase.auth.signUp(newUser);

        if (error) throw new Error("Erro: "+error.message);

        return data;
    }

    logout = async () => {
        await supabase.auth.signOut();
        localStorage.removeItem("token");
    }
}

const AuthService = new AuthServiceClass();

export default AuthService;