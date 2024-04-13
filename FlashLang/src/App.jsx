import { motion } from "framer-motion"
import { BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import Signin from './pages/Signin'


const App = () => {

  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route index element={<Signin />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/home" element={<Home />} />
      </Routes>
      </BrowserRouter>
    </div>
  )

}

export default App