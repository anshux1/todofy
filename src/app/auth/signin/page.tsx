import { Auth0Form } from "@/components/auth/Auth0Form"
import { AuthLayout } from "@/components/auth/AuthLayout"
import { AuthSignInForm } from "@/components/auth/AuthSignInForm"

export default function page() {
  return (
    <AuthLayout
      title="Welcome back"
      description="Sign in with your Apple or Google account"
      type="signin"
      imagePath="/svg/signin-banner.svg"
    >
      <Auth0Form />
      <AuthSignInForm />
    </AuthLayout>
  )
}
