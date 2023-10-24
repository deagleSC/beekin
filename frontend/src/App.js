import './App.css'
import Home from './pages/Home';
import { theme } from './themes/theme'
import { ThemeProvider } from '@mui/material'
import Navbar from './components/Navbar'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import JobDetails from './pages/JobDetails';

const App = () => {
  return (
    <div className="app">
      <ThemeProvider theme={theme}>
      <Navbar />

      <Router>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/:id" element={<JobDetails />}></Route>
      </Routes>
      </Router>

      </ThemeProvider>
    </div>
  );
}

export default App;
