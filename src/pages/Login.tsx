import { useState } from "react";
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../firebase";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const provider = new GoogleAuthProvider();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, email, password);
            alert("Logged in successfully!");
        } catch (error: any) {
            alert(error.message);
        }
    };

    const handleGoogleLogin = async () => {
        try {
            await signInWithPopup(auth, provider);
            alert("Google sign-in successful!");
        } catch (error: any) {
            alert(error.message);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <form onSubmit={handleLogin} className="bg-white shadow-md rounded p-6 w-80">
                <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
                <input
                    type="email"
                    placeholder="Email"
                    className="border p-2 w-full mb-3"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    className="border p-2 w-full mb-3"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button className="bg-blue-500 text-white py-2 w-full rounded hover:bg-blue-600">
                    Login
                </button>
                <button
                    type="button"
                    onClick={handleGoogleLogin}
                    className="bg-red-500 text-white mt-3 py-2 w-full rounded hover:bg-red-600"
                >
                    Sign in with Google
                </button>
            </form>
        </div>
    );
}
