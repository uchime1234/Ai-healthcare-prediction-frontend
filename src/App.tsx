// filepath: src/App.jsx
import { Routes, Route } from 'react-router-dom';
import AuthPage from './Authpage'
import Dashboard from './Dashboards'
import LandingPage from './Landingpage'
import Apps from './ai_predictor'
import PredictionPage from './predictionpage'



function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/authpage" element={<AuthPage/>} />
      <Route path="/landingpage" element={<Dashboard />} />
      <Route path="/home" element={<Apps />} />
      <Route path="/predict" element={<PredictionPage />} />
    </Routes>
  )
}

export default App