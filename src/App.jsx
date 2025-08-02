import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CalculatorPage from "./pages/CalculatorPage";
import SummeryPage from "./pages/SummeryPage";

function App() {
  return (
    <Router>
      <div className="min-h-screen max-w-[450px] mx-auto relative overflow-x-hidden">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/calculator/:id" element={<CalculatorPage />} />
        <Route path="/result/:id" element={<SummeryPage />} />
      </Routes>
      </div>
    </Router>
  );
}

export default App;
