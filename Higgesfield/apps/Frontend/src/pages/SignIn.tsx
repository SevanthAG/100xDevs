import { AuthLeft } from "@/components/AuthLeft";
import { AuthRight } from "@/components/AuthRight";

export function SignIn() {
  return (
    <div className="container mx-auto flex min-h-[calc(100vh-4rem)] max-w-6xl flex-col items-center justify-center px-4 py-8 lg:flex-row lg:gap-12">
      {/* Left side div */}
      <div className="flex w-full flex-1 items-center justify-center p-4 lg:p-8">
        <AuthLeft
          badge="Welcome Back"
          title="Continue crafting your stories."
          description="Log in to access your generation history, saved workflows, and custom fine-tuned styles."
        />
      </div>

      {/* Right side div */}
      <div className="flex w-full flex-1 items-center justify-center p-4 lg:p-8">
        <AuthRight mode="signin" />
      </div>
    </div>
  );
}
