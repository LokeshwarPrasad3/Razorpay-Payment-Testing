import { Routes, Route } from "react-router-dom";
import './App.css'
import Home from "./Pages/Home";
import PaymentSuccess from "./components/PaymentSuccess";

function App() {

  return (
    <>
      <Routes>
        
        <Route path="/" element={<Home />} />
        <Route path="/paymentsuccess" element={<PaymentSuccess/>} />

        </Routes>
    </>
  )
}

export default App
