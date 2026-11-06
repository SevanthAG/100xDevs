import { Button } from "@base-ui/react/button";
import { Input } from "@base-ui/react/input";
import Center from "./Center";

const AuthCredentials = () => {
  return (
    <div>
      <div className="min-h-screen bg-gray-400 flex flex-col items-center justify-center">
        <Center>
          <Input type="text" placeholder="email" />
          <Input type="text" placeholder="password" />
          <Button>Login</Button>
        </Center>
      </div>
    </div>
  );
};

export default AuthCredentials;
