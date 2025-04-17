import { useAuth0 } from "@auth0/auth0-react";

const LoginButton = () => {
    const { loginWithRedirect, isAuthenticated, user } = useAuth0();

    if (isAuthenticated) {
        // Save user locally
        if (user) {
            localStorage.setItem("user", JSON.stringify(user));
        }
        return null;
    }

    return (
        <button
            onClick={() => loginWithRedirect()}
            className="bg-white text-gray-800 px-4 py-2 rounded-lg shadow hover:bg-gray-100 transition-colors"
        >
            Sign in
        </button>
    );
}

export default LoginButton;
