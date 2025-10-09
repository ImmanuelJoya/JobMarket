import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

export default function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            alert("Account created successfully!");
        } catch (error: any) {
            alert(error.message);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <form onSubmit={handleSignup} className="bg-white shadow-md rounded p-6 w-80">
                <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>
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
                <button className="bg-green-500 text-white py-2 w-full rounded hover:bg-green-600">
                    Register
                </button>
            </form>
        </div>
    );
}
