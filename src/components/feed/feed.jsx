import  CodeLeapBackendService  from "../../services/codeLeapBackendService/codeLeapBackendService";
import { useState, useEffect } from "react";
import Modal from "react-modal";
import { toast } from "react-hot-toast";
import "./feed.css";

function Feed({ posts, setPosts, usernameSession }) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const [hasMore, setHasMore] = useState(true);

    const [page, setPage] = useState(1);
    const limit = 10;

    const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);
    const [editModalIsOpen, setEditModalIsOpen] = useState(false);
    const [selectedPost, setSelectedPost] = useState(null);

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const handleDelete = async () => {
        try {
            await CodeLeapBackendService.DeletePosts(selectedPost.id);

            setPosts((prev) => {
                return prev.filter((post) => post.id !== selectedPost.id);
            })

            setDeleteModalIsOpen(false);

            toast.success("Post deleted");

        } catch (err) {
            console.error(err);
            toast.error("Error deleting post");
        }
    }

    const handleEdit = async () => {
        if (!selectedPost) return;

        try {
            const updatedPost = {
                title: title,
                content: content,
            };

            await CodeLeapBackendService.PatchPosts(selectedPost.id, updatedPost);

            setPosts((prev) => {
                return prev.map((post) => {
                    if (post.id === selectedPost.id) {
                        return { ...post, title, content };
                    }
                    return post;
                });
            });

            setEditModalIsOpen(false);

            toast.success("Post updated");

        } catch (err) {
            console.error(err);
            toast.error("Error updating post");
        }
    }

    // Fetch CodeLeapBackendService with scroll pagination
    useEffect(() => {
        const fetchPosts = async () => {
            if (loading) return;
            if (!hasMore) return;

            try {
                setLoading(true);
                
                const data  = await CodeLeapBackendService.GetPaginatedPosts(page, limit);

                if (!data.next) setHasMore(false);
                
                setPosts((prev) => [...prev, ...(data?.results || [])])

            } catch (err) {
                setError(err);

            } finally {
                setLoading(false);
            }
        };

        fetchPosts();

    }, [page]);


    const handleScroll = () => {
        if (loading) return;

        const scrollTop = document.documentElement.scrollTop;
        const windowHeight = window.innerHeight;
        const fullHeight = document.documentElement.offsetHeight;

        // Sees if we are in the end of the page, which means end of posts
        const reachedBottom = scrollTop + windowHeight >= fullHeight - 50;

        if (reachedBottom && !loading) {
            setPage((prev) => prev + 1);
        }
    };

    // handleScroll listener
    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        
        return () => window.removeEventListener("scroll", handleScroll);
    }, [])

    if (error) {
        return <div>
            Error fetching posts: {error.message}
            <p>Have a poem: The syntax fails, the screen turns red,
            A thousand logs I haven't read.
            The null is found where data grows,
            And only God or Stack knows.</p>
        </div>
    }


    function isOwnPost(usernamePost) {
        return usernameSession?.trim().toLowerCase() === usernamePost?.trim().toLowerCase();
    }   

    function isValid(postTitle, postContent) {
        const isEmpty = postTitle.trim() === "" && postContent.trim() === "";
        const isPreviousValue = title.trim() === postTitle.trim() && content.trim() === postContent.trim();

        if (isEmpty || isPreviousValue) return false;
        return true;
    }


    return (
        <div>
            {posts?.map((post) => {
                return (
                    <div key={post.id} className="postDiv">
                        <div className="titlePostDiv">
                            <h1>{post.title}</h1>
                            {isOwnPost(post.username) && (
                                <div className="buttonsOwnPost">
                                    <button className="deleteEditBtns" onClick={() => {
                                        setDeleteModalIsOpen(true);
                                        setSelectedPost(post);
                                        }}><i className="fa-solid fa-delete-left"></i></button>
                                    <button className="deleteEditBtns" onClick={() => {
                                        setEditModalIsOpen(true);
                                        setSelectedPost(post);
                                        setTitle(post.title);
                                        setContent(post.content);
                                        }}><i className="fa-solid fa-pen-to-square"></i></button>
                                </div>
                            )}
                        </div>
                        
                        <div className="usernameDatetime">
                            <h2>@{post.username}</h2>
                            <h2>{formatTimeAgo(post.created_datetime)}</h2>
                        </div>

                        <p>{post.content}</p>
                    </div>
                )
            })}

            {loading && (
                <div className="postDiv loadingState">
                    <p>Loading posts...</p>
                    <p>Have a poem: A blank white screen, a flashing line,
                        A world of rules and strict design.
                        Through blocks of code and flexbox flow,
                        You watch the hidden structures grow.</p>
                </div>
            )}

            {deleteModalIsOpen && (
                <Modal
                    isOpen={deleteModalIsOpen}
                    onRequestClose={() => setDeleteModalIsOpen(false)}
                    className="Modal"
                    overlayClassName="modalOverlay"
                >
                    <h2>Are you sure you want to delete this post?</h2>

                    <div className="modalButtons">

                        <button onClick={() => setDeleteModalIsOpen(false)}>
                            Cancel
                        </button>

                        <button onClick={handleDelete} className="delete">
                            Delete
                        </button>

                    </div>
                </Modal>
            )}

            {editModalIsOpen && (
                <Modal
                    isOpen={editModalIsOpen}
                    onRequestClose={() => setEditModalIsOpen(false)}
                    className="Modal"
                    overlayClassName="modalOverlay"
                >

                    <h2>Edit item</h2>

                    <label>Title</label>
                    <input
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />

                    <label>Content</label>
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    />

                    <div className="modalButtons">

                        <button onClick={() => setEditModalIsOpen(false)}>
                            Cancel
                        </button>

                        <button
                            disabled={!selectedPost || !isValid(selectedPost.title, selectedPost.content)}
                            onClick={handleEdit}
                            className="edit"
                        >
                            Save
                        </button>

                    </div>

                </Modal>
            )}
        </div>
    )
}

const formatTimeAgo = (dateString) => {
    const now = new Date();
    const postDate = new Date(dateString);
    const diffInSeconds = Math.floor((now - postDate) / 1000);

    if (diffInSeconds < 60) return "just now";

    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) return `${diffInMinutes} minute${diffInMinutes > 1 ? 's' : ''} ago`;

    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;

    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 30) return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;

    return postDate.toLocaleDateString();
};

export default Feed;