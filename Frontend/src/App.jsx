import { useState } from "react";
import Home from "./pages/home"; // Importing the Home component
import Ideation from "./pages/Ideation";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="">
       <Home></Home> 
    </div>
  );
}

export default App;
