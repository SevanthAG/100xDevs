import AuthBanner from "../components/AuthBanner";
import AuthCredentials from "../components/AuthCredentials";

const Auth = () => {
  return (
    <div className="flex">
      <div className="flex-1">
        <AuthBanner />
      </div>
      <div className="flex-1">
        <AuthCredentials />
      </div>
    </div>
  );
};

export default Auth;
