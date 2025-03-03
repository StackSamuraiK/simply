import { BrowserRouter, Route, Routes } from "react-router-dom"
import { SignUp } from "./pages/SignUp"
import { SignIn } from "./pages/SignIn"
import { Dashboard } from "./pages/Dashboard"


function App() {
  return (
    <>
    <BrowserRouter>
     <Routes>
      <Route path="/" element={<SignUp/>}/>
      <Route path="/signin" element={<SignIn/>}/>
      <Route path="/dashboard" element={<Dashboard/>}/>
     </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
