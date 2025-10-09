import { signOut } from "firebase/auth";
import { auth } from "../firebase";

export function LogoutButton() {
    return (
        <button
            onClick={() => signOut(auth)}
            className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700"
        >
            Sign Out
        </button>
    );
}
