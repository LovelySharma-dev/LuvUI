import { Routes, Route} from "react-router-dom"
import Landing from "../pages/Landing"
import Login from "../pages/Login"
import Signup from "../pages/Signup"
import Dashboard from "../pages/Dashboard"
import Components from "../pages/Components"
import ComponentDetail from "../pages/ComponentDetails"
import Generate from "../pages/Generate"
import History from "../pages/History"
import Pricing from "../pages/Pricing"
import Profile from "../pages/Profile"
import NotFound from "../pages/NotFound"

import React from 'react'

const AppRoutes = () => {
  return (
  
    <Routes>
        <Route path="/" element={<Landing/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="/components" element={<Components/>}/>

        <Route path="/components/:slug" element={<ComponentDetail/>}/>
        <Route path="/generate" element={<Generate/>}/>
        <Route path="/history"element={<History/>}/>
        <Route path="/pricing" element={<Pricing/>}/>
        <Route path="/profile" element={<Profile/>}/>

        <Route path="*" element={<NotFound/>}/>
        
    </Routes>

  )
}

export default AppRoutes