import { useState } from "react";
import Home from "./pages/home"; // Importing the Home component
import LoginSignup from "./components/LoginSignup";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      {/* <LoginSignup /> */}
      <Home></Home>
    </>
  );
}

export default App;
