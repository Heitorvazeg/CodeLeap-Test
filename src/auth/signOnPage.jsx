import { useState } from "react";
import Modal from "react-modal";
import toast from "react-hot-toast";
import AuthService from "./authService";
import { useNavigate } from "react-router-dom";
import "./signOnPage.css";

function SignOnPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [emailSignUp, setEmailSignUp] = useState("");
    const [usernameSignUp, setUsernameSignUp] = useState("");
    const [passwordSignUp, setPasswordSignUp] = useState("");

    const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);

    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const { data, error } = await AuthService.login(email, password);

            if (error) {
                toast.error(error.message || "Login failed");
                return;
            }

            toast.success("Login successful");

            navigate("/main");

        } catch (err) {
            console.error(err);
            toast.error("Unexpected error during login");
        }
    };

    const handleSignUp = async () => {
        if (!isValidCredentials(emailSignUp, passwordSignUp)) return;

        try {
            const { data, error } = await AuthService.register(
                usernameSignUp,
                emailSignUp,
                passwordSignUp
            );

            if (error) {
                toast.error(error.message || "Sign up failed");
                return;
            }

            toast.success("User created successfully");

        } catch (err) {
            console.error(err);
            toast.error("Unexpected error during sign up");
        }
    };

    return (
        <div className="signOnModal">
            <h1>Welcome to CodeLeap network!</h1>
            <div className="inputsDiv">
                <label htmlFor="usernameInput">Please enter your email</label>
                <input type="text" id="usernameInput" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email: "/>
                <label htmlFor="passwordInput">Please enter your password</label>
                <input type="password" id="passwordInput" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password: "/>
            </div>

            <div className="btns">
                <button className="singOnBtn" onClick={() => {setIsSignUpModalOpen(true)}}>Sign Up</button>
                <button className="enterBtn" onClick={handleLogin} disabled={!isValidCredentials(email, password)}>Enter</button>
            </div>

            {isSignUpModalOpen && (
                <Modal
                    isOpen={isSignUpModalOpen}
                    onRequestClose={() => setIsSignUpModalOpen(false)}
                    className="Modal"
                    overlayClassName="modalOverlay"
                >
                    <h2>Sign Up</h2>

                    <label>Username</label>
                    <input
                        value={usernameSignUp}
                        onChange={(e) => setUsernameSignUp(e.target.value)}
                    />

                    <label>Email</label>
                    <input
                        value={emailSignUp}
                        onChange={(e) => setEmailSignUp(e.target.value)}
                        type="email"
                    />

                    <label>Password</label>
                    <input
                        value={passwordSignUp}
                        onChange={(e) => setPasswordSignUp(e.target.value)}
                        type="password"
                    />

                    <div className="modalButtons">
                        <button onClick={() => setIsSignUpModalOpen(false)}>
                            Cancel
                        </button>

                        <button
                            disabled={!isValidCredentials(emailSignUp, passwordSignUp)}
                            onClick={handleSignUp}
                        >
                            Sign Up
                        </button>
                    </div>
                </Modal>
            )}
        </div>
    )
}

function isValidCredentials(emailCred, passwordCred) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const isNotEmpty = passwordCred.trim() !== "" && emailCred.trim() !== "";
    const isGreaterThanFiveChars = passwordCred.length > 5;
    const isEmail = emailRegex.test(emailCred);

    if (isNotEmpty && isGreaterThanFiveChars && isEmail) return true;
    return false;
}

export default SignOnPage;