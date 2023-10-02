import { Route, Routes } from 'react-router-dom'

import Home from './Home'
import './index.css'

export default function App() {
  return (
    <Routes>
      <Route path="/" index element={<Home />} />

      <Route path="Lista-de-Nomes/" element={<Home />} />
    </Routes>
  )
}
