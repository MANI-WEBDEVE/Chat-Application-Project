import victory from "@/assets/victory.svg";
import Background from "@/assets/login2.png";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@radix-ui/react-tabs";
import { useState } from "react";
import { toast } from "sonner";
import apiClient from "@/lib/api-client";
import { LOGIN_ROUTE, SIGNUP_ROUTE } from "@/utils/constant";
import { useNavigate } from "react-router-dom";
import { useAppStore } from "@/store";

const Auth = () => {
  const navigate = useNavigate();
  const {setUserInfo} = useAppStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");

  //* validation sign up form
  const validateSignUp = () => {
    if (!email.length) {
      toast.error("Email is required");
      return false;
    }
    if (!password.length) {
      toast.error("Password Must Required");
      return false;
    }
    if (password !== confirmPass) {
      toast.error("Password must match");
      return false;
    }
    return true;
  };

  //* validation login form
  const validationLogin = () => {
    if (!email.length) {
      toast.error("Email is required");
      return false;
    }
    if (!password.length) {
      toast.error("Password Must Required");
      return false;
    }
    return true;
  };

  //? handle button Event login and signUp
  const handleLogin = async () => {
    if (validationLogin()) {
      const response = await apiClient.post(
        LOGIN_ROUTE,
        { email, password },
        { withCredentials: true }
      );

      if (response.data.user.id) {
        setUserInfo(response.data.user)
        if (response.data.user.profileSetup) navigate("/chat");
        else navigate("/profile"); 
      }
      console.log({ response });
    }
  };

  const handleSignUp = async () => {
    if (validateSignUp()) {
      const response = await apiClient.post(
        SIGNUP_ROUTE,
        {
          email,
          password,
        },
        { withCredentials: true }
      );
      console.log({ response });

      if (response.status === 201) {
        setUserInfo(response.data.user)
        navigate("/profile");
      }
    }
  };

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
                  className="w-full rounded-full p-6 bg-slate-950 text-white hover:text-black"
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
                  className="w-full rounded-full p-6 bg-slate-950 text-white hover:text-black"
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
