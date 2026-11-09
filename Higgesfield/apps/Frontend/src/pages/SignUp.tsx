import { AuthLeft } from "@/components/AuthLeft";
import { AuthRight } from "@/components/AuthRight";

export function SignUp() {
  return (
    <div className="container mx-auto flex min-h-[calc(100vh-4rem)] max-w-6xl flex-col items-center justify-center px-4 py-8 lg:flex-row lg:gap-12">
      {/* Left side div */}
      <div className="flex w-full flex-1 items-center justify-center p-4 lg:p-8">
        <AuthLeft
          badge="Join Higgfield"
          title="Turn your imagination into cinematic videos."
          description="Sign up today to explore cutting-edge generative AI video models, ultra-realistic motions, and limitless creative freedom."
        />
      </div>

      {/* Right side div */}
      <div className="flex w-full flex-1 items-center justify-center p-4 lg:p-8">
        <AuthRight mode="signup" />
      </div>
    </div>
  );
}
