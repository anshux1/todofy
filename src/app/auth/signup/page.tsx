import { Auth0Form } from "@/components/auth/Auth0Form"
import { AuthLayout } from "@/components/auth/AuthLayout"
import { AuthSignUpForm } from "@/components/auth/AuthSignUpForm"

export default function LoginPage() {
  return (
    <AuthLayout
      title="Welcome"
      description="Sign up with your Apple or Google account"
      type="signup"
      imagePath="/svg/signup-banner.svg"
    >
      <Auth0Form />
      <AuthSignUpForm />
    </AuthLayout>
  )
}
