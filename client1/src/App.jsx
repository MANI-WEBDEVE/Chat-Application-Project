import { BrowserRouter } from "react-router-dom";
import { Route } from "react-router-dom";
import { Routes } from "react-router-dom";
import Auth from "./pages/auth/Auth";
import Profile from "./pages/profiles/Profiles";
import Chat from "./pages/chat/Chat";


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/auth" element={<Auth />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/chat" element={<Chat />} />
        </Routes>
      </BrowserRouter>

    </>
  );
}

export default App;
