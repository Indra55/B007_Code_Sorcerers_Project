import { useState } from "react";
import Home from "./pages/home"; // Importing the Home component

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Home></Home>
    </>
  );
}

export default App;
