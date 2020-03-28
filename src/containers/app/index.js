import React from 'react'
import { Route, Link } from 'react-router-dom'
import Home from '../home'
import AboutLogin from '../paitent-auth'
import DoctorLogin from '../doctor-auth'
import PaitentSignup from '../paitent-auth/signup'
import PaitentHome from '../paitent'

const App = () => (
  <div>
    <main>
      <Route exact path="/" component={Home} />
      <Route exact path="/doctor/login" component={DoctorLogin} />   
      <Route exact path="/paitent/login" component={AboutLogin} />
      <Route exact path="/paitent/signup" component={PaitentSignup} />
      <Route exact path="/paitent/home" component={PaitentHome} />
    </main>
  </div>
)

export default App
