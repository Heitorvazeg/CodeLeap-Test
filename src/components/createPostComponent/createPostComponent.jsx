import { useState } from "react";
import "./createPostComponent.css";
import { supabase } from "../../services/supabaseService/supabaseClient";
import  CodeLeapBackendService  from "../../services/codeLeapBackendService/codeLeapBackendService";
import toast from "react-hot-toast";

function CreatePostComponent({ setPosts, usernameSession }) {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const isValid = title.trim() !== "" && content.trim() !== "";

    const handleCreatePost = async () => {
        if (!isValid) return;

        const {data: { user }, error } = await supabase.auth.getUser();

        if (error || !user) {
            toast.error(error.message || "Error creating post");
            return;
        }

        const username = user.user_metadata.name;

        const newPost = {
            username: username,
            title: title,
            content: content,
        }

        try {
            const response = await CodeLeapBackendService.PostPosts(newPost);


            setPosts((prev) => [response, ...prev]);

            toast.success("Post created successfully")
            setContent("");
            setTitle("");

        } catch (err) {
            toast.error(err.message || "Error creating post");
            console.error(err);
        }
    }

    return (
        <div className="createPostComponent">
            <h1>What's on your mind {usernameSession}?</h1>
            <div className="postContent">
                <label htmlFor="title">Title</label>
                <input type="text" id="title" placeholder="Title here" value={title} onChange={e => {setTitle(e.target.value)}}/>

                <label htmlFor="contet">Content</label>
                <textarea type="text" id="content" placeholder="Content here" value={content} onChange={e => {setContent(e.target.value)}}/>
            </div>

            <button className="createPostBtn" disabled={!isValid} onClick={handleCreatePost}>Create</button>
        </div>
    )
}

export default CreatePostComponent;