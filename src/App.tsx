
// import { useState } from "react";
// import LoginPage from "./components/LoginPage";

// function App() {
//   const [name, setName] = useState<string>("");
//   const [password, setPassword] = useState<string>("");

//   const handleLogin = (userName: string, userPassword: string) => {
//     setName(userName);
//     setPassword(userPassword);
//     console.log("Logged in:", { userName, userPassword });
//   };

//   return <LoginPage onLogin={handleLogin} />;
// }

// export default App;
import { useState } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import RewardsShop from "./components/RewardsShop";

function LoginWrapper() {
  const navigate = useNavigate();

  const handleLogin = (userName: string, userPassword: string) => {
    console.log("Logged in:", { userName, userPassword });
    // Navigate to rewards shop after login
    navigate("/rewards");
  };

  return <LoginPage onLogin={handleLogin} />;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginWrapper />} />
        <Route path="/rewards" element={<RewardsShop />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;