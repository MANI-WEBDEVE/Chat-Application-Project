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
      if (response.status === 200 && response.data.id) {
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
  return  <div className="flex items-center justify-center h-screen bg-gray-100">
  <div className="flex flex-col items-center">
    <div className="loader mb-4"></div>
    <h2 className="text-lg font-semibold text-gray-700">Loading...</h2>
  </div>
  <style jsx>{`
    .loader {
      border: 8px solid #f3f3f3; /* Light grey */
      border-top: 8px solid #3498db; /* Blue */
      border-radius: 50%;
      width: 50px;
      height: 50px;
      animation: spin 1s linear infinite;
    }

    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  `}</style>
</div>
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
