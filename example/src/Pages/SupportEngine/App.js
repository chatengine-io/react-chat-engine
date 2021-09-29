// import './App.css'

import Home from './Home'
import SupportDashboard from './SupportDashboard'


function App() {
  const path = window.location.pathname
  if (path.indexOf('/support') === -1) {
    return <Home />
  } else {
    return <SupportDashboard />
  }
}

export default App;
