import { Routes, Route, BrowserRouter } from "react-router-dom";
import SignOnPage from "./auth/signOnPage";
import MainPage from "./pages/main/mainPage";
import AuthGuard from "./auth/authGuard";
import Modal from "react-modal";
import { Toaster } from "react-hot-toast";
import { Navigate } from "react-router-dom";
import './App.css';

function App() {
  Modal.setAppElement("#root");

  return (
      <BrowserRouter>
            <Toaster/>
            <Routes>
                <Route path="/auth" element={<SignOnPage/>}></Route>
                <Route path="/main" element={
                      <AuthGuard><MainPage/></AuthGuard>
                  }></Route>
                <Route path="*" element={<Navigate to="/main" replace/>}></Route>
            </Routes>
      </BrowserRouter>
  )
}

export default App;
