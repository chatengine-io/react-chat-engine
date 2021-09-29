import React from 'react'

import Home from './Home'
import SupportDashboard from './SupportDashboard'


const App = () => {
  const path = window.location.pathname
  if (path.indexOf('/support') === -1) {
    return <Home />
  } else {
    return <SupportDashboard />
  }
}

export default App;
