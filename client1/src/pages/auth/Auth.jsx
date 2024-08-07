import { useState } from "react";
import victory from "../../assets/victory.svg";
import Background from "../../assets/login2.png";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@radix-ui/react-tabs";
import apiClient from "../../lib/api-client";
import { LOGIN_ROUTE, SIGNUP_ROUTE } from "../../utils/constant";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
// // import { LOGIN_ROUTE, SIGNUP_ROUTE } from "@/utils/constant";
// // import { useNavigate } from "react-router-dom";
// // import { useAppStore } from "@/store";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const navigate = useNavigate();

  //* sign up validator
  const validatorSignUp = () => {
    if (!email.length) {
      toast.error("Email sre is required.");

      return false;
    }
    if (!password.length ) {
      toast.error("Password is required");
      return false;
    }
    if (password !== confirmPass) {
      toast("Password does not match");
      console.log(toast);
      return false;
    }
    return true;
  };

  //* signup logic for client side 
  const handleSignUp = async () => {
    if (validatorSignUp()) {
      const response = await apiClient.post(
        SIGNUP_ROUTE,
        { email, password },
        { withCredentials: true }
      );
      console.log({ response });

      if (response.status === 201) {
        toast.success("User created successfully");
        navigate("/profile");
      }
    }
  };

  const validatorLogin = () => {
    if (!email.length) {
      toast.error("Email is required.");

      return false;
    }
    if (!password.length) {
      toast.error("Password is required");
      return false;
    }
    return true;
  };

  const handleLogin = async () => {
    if (validatorLogin()) {
      const response = await apiClient.post(LOGIN_ROUTE, {email, password}, {withCredentials:true})
      if (response.data.user.id) {
        navigate("/profile");
      } else {
        navigate("/auth");
      }
      console.log({response})
    }
  }
    
    
  return (
    <div className="h-[100vh] w-[100vw] flex justify-center items-center">
      <div className="h-[90vh] bg-white border-2 border-white text-opacity-90 shadow-2xl w-[100vw] md:w-[90vw] lg:w-[70vw] xl:w-[90vw] xl:h-[90vh] rounded-3xl grid xl:grid-cols-2">
        <div className="flex flex-col gap-10 items-center justify-center">
          <div className="flex justify-center items-center flex-col">
            <div className="flex justify-center items-center">
              <h1 className="text-5xl font-bold md:text-6xl">Welcome</h1>
              <img src={victory} alt="victory-image" className="h-[100px]" />
            </div>
            <p className="font-medium text-center">
              Fill in the form to get started with the best chat App
            </p>
          </div>
          <div className="flex items-center justify-center w-full">
            <Tabs className="w-3/4" defaultValue="login">
              <TabsList className="bg-transparent rounded-none ">
                <TabsTrigger
                  value="login"
                  className="data-[state=active]:bg-transparent text-black text-opacity-90 border-b-2 rounded-none w-full
            data-[state=active]:text-black data-[state=active]:font-semibold data-[state=active]:border-b-purple-500 p-3 transition-all duration-300 "
                >
                  Login
                </TabsTrigger>
                <TabsTrigger
                  value="signup"
                  className="data-[state=active]:bg-transparent text-black text-opacity-90 border-b-2 rounded-none w-full
            data-[state=active]:text-black data-[state=active]:font-semibold data-[state=active]:border-b-purple-500 p-3 transition-all duration-300 "
                >
                  SignUp
                </TabsTrigger>
              </TabsList>
              <TabsContent className=" flex flex-col gap-5 mt-5" value="login">
                <Input
                  placeholder="Email"
                  type="email"
                  className="rounded-full p-6"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Input
                  placeholder="Password"
                  type="Password"
                  className="rounded-full p-6"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Button
                  className="w-full rounded-full p-6 bg-slate-950 text-white hover:text-black hover:bg-white"
                  onClick={handleLogin}
                >
                  Login
                </Button>
              </TabsContent>
              <TabsContent className="flex flex-col gap-5 mt-" value="signup">
                <Input
                  placeholder="Email"
                  type="email"
                  className="rounded-full p-6"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Input
                  placeholder="Password"
                  type="Password"
                  className="rounded-full p-6"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Input
                  placeholder="Confirm Password"
                  type="Password"
                  className="rounded-full p-6"
                  value={confirmPass}
                  onChange={(e) => setConfirmPass(e.target.value)}
                />
                <Button
                  className="w-full rounded-full p-6 bg-slate-950 text-white hover:text-black hover:bg-white"
                  onClick={handleSignUp}
                >
                  Sign Up
                </Button>
              </TabsContent>
            </Tabs>
          </div>
        </div>
        <div className="hidden xl:flex justify-center items-center">
          <img src={Background} alt="Background-Image" className="h-[570px]" />
        </div>
      </div>
    </div>
  );
};

export default Auth;