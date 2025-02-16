import { useState } from "react";
import Home from "./pages/home"; // Importing the Home component
import LoginSignup from "./components/LoginSignup";
import Ideation from "./pages/Ideation";
import ChatBot from "./pages/ChatBot";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="">
      {/* <LoginSignup /> */}
      {/* <Home></Home> */}
      {/* <Ideation></Ideation> */}
      <ChatBot> </ChatBot>
    </div>
  );
}

export default App;
