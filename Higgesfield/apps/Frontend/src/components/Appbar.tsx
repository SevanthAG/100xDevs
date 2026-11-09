import { useNavigate } from "react-router";
import { Button } from "@/components/ui/button";

export function Appbar() {
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center">
          <span
            onClick={() => navigate("/")}
            className="text-xl font-bold tracking-tight text-foreground select-none cursor-pointer"
          >
            Higgfield
          </span>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="ghost" onClick={() => navigate("/signin")}>
            Sign In
          </Button>
          <Button onClick={() => navigate("/signup")}>
            Sign Up
          </Button>
        </div>
      </div>
    </header>
  );
}

export default Appbar;
