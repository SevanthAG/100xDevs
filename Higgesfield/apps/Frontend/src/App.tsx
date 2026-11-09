import { BrowserRouter, Route, Routes } from "react-router";
import "./index.css";
import { Appbar } from "./components/Appbar";
import { LandingPage } from "./pages/LandingPage";
import { SignIn } from "./pages/SignIn";
import { SignUp } from "./pages/SignUp";
import { Dashboard } from "./pages/Dashboard";
import { VideoCreator } from "./pages/VideoCreator";

export function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-background text-foreground flex flex-col">
        <Appbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/videocreator" element={<VideoCreator />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}
