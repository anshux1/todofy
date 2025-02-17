import * as React from "react"
import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Preview,
  Section,
  Tailwind,
  Text,
} from "@react-email/components"

interface VercelInviteUserEmailProps {
  name: string
  verifycationUrl: string
}

export const VerificationEmail = ({
  name,
  verifycationUrl,
}: VercelInviteUserEmailProps) => {
  return (
    <Html>
      <Head />
      <Tailwind>
        <Body className="m-auto bg-white px-2 font-sans">
          <Preview>Verify Your Email Address for Appname</Preview>
          <Container className="mx-auto my-[40px] max-w-[465px] rounded border border-solid border-[#eaeaea] p-[20px]">
            <Section className="mt-[32px]">
              <Img
                src={""}
                width="40"
                height="37"
                alt="Vercel"
                className="mx-auto my-0"
              />
            </Section>
            <Heading className="mx-0 my-[30px] p-0 text-center text-[24px] font-normal text-black">
              Verify Your Email Address for <strong>Appname</strong>
            </Heading>
            <Text className="text-[14px] leading-[24px] text-black">
              Hello {name},
            </Text>
            <Text className="text-[14px] leading-[24px] text-black">
              Thank you for signing up with Appname! To complete your
              registration, please verify your email address by clicking the
              button below:
            </Text>
            <Section className="my-[32px] text-center">
              <Button
                className="rounded bg-[#000000] px-5 py-3 text-center text-[12px] font-semibold text-white no-underline"
                href={verifycationUrl}
              >
                Verify Your Email
              </Button>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  )
}

VerificationEmail.PreviewProps = {
  name: "Alan Turing",
  verifycationUrl: "",
  userImage: "https://avatars.githubusercontent.com/u/18133?v=4",
} as VercelInviteUserEmailProps

export default VerificationEmail
