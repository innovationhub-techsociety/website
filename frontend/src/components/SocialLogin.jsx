import React from "react";
import { GoogleOAuthProvider, useGoogleLogin } from "@react-oauth/google";
import { Github, Mail } from "lucide-react"; // Using Mail as placeholder if Microsoft icon missing, or just text
import api from "../api";

// Helper hook for handling the API calls
const useSocialAuth = () => {
    const handleGoogleSuccess = async (tokenResponse) => {
        try {
            // If we use 'implicit' flow resulting in access_token (default for useGoogleLogin check), 
            // we send access_token to backend.
            // If 'flow: auth-code', we get code.
            // dj-rest-auth GoogleLogin with OAuth2Client expects 'code'.
            // If we didn't set client_class, it expects 'access_token'.
            // My backend setup included client_class, so I should use code flow.
            console.log("Google response:", tokenResponse);
            const res = await api.post("/api/auth/google/", {
                code: tokenResponse.code,
                callback_url: window.location.origin
            });
            localStorage.setItem("access", res.data.access);
            localStorage.setItem("refresh", res.data.refresh);
            window.location.href = "/";
        } catch (error) {
            console.error("Google Login Error:", error);
            const msg = error.response?.data?.non_field_errors?.[0] || error.response?.data?.detail || JSON.stringify(error.response?.data) || error.message || "Google Login Failed";
            alert(`Google Login Failed: ${msg}`);
        }
    };

    const handleSocialLogin = async (provider, code) => {
        try {
            const res = await api.post(`/api/auth/${provider}/`, {
                code: code,
                callback_url: window.location.origin + "/login"
            });
            localStorage.setItem("access", res.data.access);
            localStorage.setItem("refresh", res.data.refresh);
            window.location.href = "/";
        } catch (error) {
            console.error(`${provider} Login Error:`, error);
            const msg = error.response?.data?.non_field_errors?.[0] || error.response?.data?.detail || JSON.stringify(error.response?.data) || error.message || "Login Failed";
            alert(`${provider} Login Failed: ${msg}`);
        }
    };

    return { handleGoogleSuccess, handleSocialLogin };
};

const GoogleLoginButton = ({ onSuccess }) => {
    const login = useGoogleLogin({
        onSuccess: onSuccess,
        flow: "auth-code",
        onError: () => console.log("Login Failed"),
    });

    return (
        <button
            onClick={() => login()}
            className="w-full flex items-center justify-center gap-2 bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 font-medium py-2 px-4 rounded-lg transition-colors"
            type="button"
        >
            <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-5 h-5" alt="Google" />
            Continue with Google
        </button>
    );
};

// Simplified GitHub/Microsoft buttons that redirect
const RedirectButton = ({ provider, clientId, authUrl, scope, redirectUri, icon: Icon, label, colorClass }) => {
    const handleClick = () => {
        localStorage.setItem("pending_social_provider", provider);
        const params = new URLSearchParams({
            client_id: clientId,
            redirect_uri: redirectUri,
            scope: scope,
            response_type: "code",
            prompt: "consent",
        });
        window.location.href = `${authUrl}?${params.toString()}`;
    };

    return (
        <button
            onClick={handleClick}
            className={`w-full flex items-center justify-center gap-2 ${colorClass} text-white font-medium py-2 px-4 rounded-lg transition-colors hover:opacity-90`}
            type="button"
        >
            {Icon && <Icon className="w-5 h-5" />}
            {label}
        </button>
    );
};

const SocialLogin = () => {
    const { handleGoogleSuccess } = useSocialAuth();

    // Replace with env vars
    const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;
    const GITHUB_CLIENT_ID = import.meta.env.VITE_GITHUB_CLIENT_ID;
    const MICROSOFT_CLIENT_ID = import.meta.env.VITE_MICROSOFT_CLIENT_ID;
    const REDIRECT_URI = window.location.origin + "/login";

    return (
        <div className="flex flex-col gap-3 mt-4">
            <div className="relative flex py-2 items-center">
                <div className="flex-grow border-t border-gray-300"></div>
                <span className="flex-shrink mx-4 text-gray-400 text-sm">Or continue with</span>
                <div className="flex-grow border-t border-gray-300"></div>
            </div>

            {GOOGLE_CLIENT_ID ? (
                <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
                    <GoogleLoginButton onSuccess={handleGoogleSuccess} />
                </GoogleOAuthProvider>
            ) : (
                <div className="text-red-500 text-xs text-center">
                    Google Client ID missing in frontend/.env
                </div>
            )}

            <RedirectButton
                provider="github"
                clientId={GITHUB_CLIENT_ID}
                authUrl="https://github.com/login/oauth/authorize"
                scope="user:email" // 'user:email' is usually enough, backend used 'user repo'
                redirectUri={REDIRECT_URI}
                icon={Github}
                label="Continue with GitHub"
                colorClass="bg-[#24292F]"
            />

            <RedirectButton
                provider="microsoft"
                clientId={MICROSOFT_CLIENT_ID}
                authUrl="https://login.microsoftonline.com/common/oauth2/v2.0/authorize"
                scope="User.Read" // Microsoft Graph scope
                redirectUri={REDIRECT_URI}
                icon={Mail} // Using Mail as generic or find a Microsoft SVG
                label="Continue with Microsoft"
                colorClass="bg-[#0078D4]"
            />
        </div>
    );
};

export default SocialLogin;
