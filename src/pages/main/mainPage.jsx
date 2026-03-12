import Feed from "../../components/feed/feed";
import CreatePostComponent from "../../components/createPostComponent/createPostComponent";
import AuthService from "../../auth/authService";
import { supabase } from "../../services/supabaseService/supabaseClient";
import { useState, useEffect } from "react";
import "./mainPage.css";

function MainPage() {
    const [posts, setPosts] = useState([]);
    const [usernameSession, setUsernameSession] = useState("");

    // Get the current user in session
    useEffect(() => {
        const getUser = async () => {
            try {
                const { data: { user }, error } = await supabase.auth.getUser();
                if (error) throw new Error("Error: "+error);
                setUsernameSession(user.user_metadata?.name);

            } catch (err) {
                toast.error("Error getting user");
                console.error(err);
            }
        }

        getUser();

    }, []);

    return (
        <section className="mainPage">
            <div className="headerContainer">
                <h1>CodeLeap Network</h1>
            </div>
            <button className="logout" onClick={AuthService.logout}><i className="fa-solid fa-outdent"></i></button>
            <div className="columnDiv">
                <CreatePostComponent setPosts={setPosts} usernameSession={usernameSession}></CreatePostComponent>
                <Feed posts={posts} setPosts={setPosts} usernameSession={usernameSession}></Feed>
            </div>
        </section>
    )
}

export default MainPage;