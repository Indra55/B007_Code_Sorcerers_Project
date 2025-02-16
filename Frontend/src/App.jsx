import { Routes, Route } from "react-router-dom"; // Import Routes and Route
import Home from "./pages/Home"; // Import Home component
import ChatBot from "./pages/ChatBot"; // Import ChatBot component

function App() {
  return (
    <Routes>
      {/* Define routes for different components */}
      <Route path="/" element={<Home />} />
      <Route path="/BOT" element={<ChatBot />} />
    </Routes>
  );
}

export default App;
