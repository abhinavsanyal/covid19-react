import React from 'react'
import { Route, Link } from 'react-router-dom'
import Home from '../home'
import PatientAuth from '../patient-auth'
import DoctorAuth from '../doctor-auth'
import PatientSignup from '../patient-auth/signup'
import PatientHome from '../patient-home'

const App = () => (
  <div>
    <main>
      <Route exact path="/" component={Home} />
      <Route exact path="/doctor/auth" component={DoctorAuth} />   
      <Route exact path="/patient/auth" component={PatientAuth} />
      <Route exact path="/patient/home" component={PatientHome} />
    </main>
  </div>
)

export default App
