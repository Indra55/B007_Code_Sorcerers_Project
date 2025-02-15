import { useState } from "react";
import Home from "./pages/home"; // Importing the Home component
import LoginSignup from "./components/LoginSignup";
import Ideation from "./pages/Ideation";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="">
      {/* <LoginSignup /> */}
      {/* <Home></Home> */}
      <Ideation></Ideation>
    </div>
  );
}

export default App;
