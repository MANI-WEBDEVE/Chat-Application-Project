import React, {  useState,useEffect } from "react";
import Chat from "./pages/chat/Chat";
import Auth from "@/pages/auth/Auth.jsx";
import Profile from "./pages/profile/Profile";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAppStore } from "./store";
import apiClient from "./lib/api-client";
import { GET_USER_INFO } from "./utils/constant";

const PrivateRoute = ({ children }) => {
  const { userInfo } = useAppStore();
  const isAuthenticated = !!userInfo;
  return isAuthenticated ? children : <Navigate to="/auth" />;
};
const AuthRoute = ({ children }) => {
  const { userInfo } = useAppStore();
  const isAuthenticated = !!userInfo;
  return isAuthenticated ? <Navigate to="/chat" /> : children;
};

function App() {
  const {userInfo, setUserInfo} = useAppStore()
  const [loading, setLoading] = useState(true)


 useEffect(() => {
  const gateUserInfo = async () => {
    try {
      const response = await apiClient.get(GET_USER_INFO, {withCredentials:true});
      if (response.status === 200 && response.data.Id) {
        setUserInfo(response.data)
      } else {
        setUserInfo(undefined)
      }
    } catch (error) {
      setUserInfo(undefined)
    } finally {
      setLoading(false)
    }
  };

  if (!userInfo){
    gateUserInfo()
  }else {
    setLoading(false)
  }  

 }, [userInfo, setUserInfo])

 if (loading) {
  return <div>Loading...</div>
 }


  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/auth"
          element={
            <AuthRoute>
              <Auth />
            </AuthRoute>
          }
        />
        <Route
          path="/chat"
          element={
            <PrivateRoute>
              <Chat />
            </PrivateRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />

        <Route path="*" element={<Navigate to="/auth" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
