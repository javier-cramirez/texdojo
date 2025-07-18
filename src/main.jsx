import 'katex/dist/katex.min.css'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'

import LandingPage from './pages/LandingPage.jsx'
import GameScreen from './pages/GameScreen.jsx'
import GameCategories from './pages/GameCategories.jsx'
import LeaderboardScreen from './pages/LeaderboardScreen.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<LandingPage/>} />
      <Route path="/gameCategories" element={<GameCategories/>} />
      <Route path="/game" element={<GameScreen/>} />
      <Route path="/leaderboard" element={<LeaderboardScreen/>} />

    </Routes>
  </BrowserRouter>
)
