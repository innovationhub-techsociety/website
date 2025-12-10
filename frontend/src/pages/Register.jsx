import Form from "../components/Form"

import SocialLogin from "../components/SocialLogin"

function Register() {
    return (
        <Form route="/api/user/register/" method="register">
            <SocialLogin />
        </Form>
    )
}

export default Register