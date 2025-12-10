import { useEffect } from "react"
import { useSearchParams, useNavigate } from "react-router-dom"
import Form from "../components/Form"
import SocialLogin from "../components/SocialLogin"
import api from "../api"

function Login() {
    const [searchParams] = useSearchParams()
    const navigate = useNavigate()

    useEffect(() => {
        const code = searchParams.get("code")
        // Simple heuristic: if code is present, we need to know which provider.
        // Ideally we pass 'state' or 'provider' in the redirect.
        // For now, if we assume only GH/MS use redirect flow here.
        // We can try one then the other or require a param.
        // Let's assume we rely on the user to click connection again? No that's bad.
        // Let's add 'provider' param to our redirectUrl?
        // E.g. redirect_uri = window.location.origin + "/login?provider=github"
        // But some providers strictly match redirect_uri.
        // GitHub allows matching. Microsoft too.

        // Actually, let's just use a separate route for callback if needed, but Login is easiest.
        // Let's check if we can store provider in localStorage before redirect.
        const pendingProvider = localStorage.getItem("pending_social_provider")

        if (code && pendingProvider) {
            const handleCallback = async () => {
                try {
                    const res = await api.post(`/auth/${pendingProvider}/`, { code })
                    localStorage.setItem("access", res.data.access)
                    localStorage.setItem("refresh", res.data.refresh)
                    localStorage.removeItem("pending_social_provider")
                    navigate("/")
                } catch (error) {
                    console.error("Social login callback failed", error)
                    alert("Social login failed. Please try again.")
                }
            }
            handleCallback()
        }
    }, [searchParams, navigate])

    return (
        <Form route="/api/token/" method="login">
            <SocialLogin />
        </Form>
    )
}

export default Login