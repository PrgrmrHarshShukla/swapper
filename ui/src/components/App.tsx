import { BrowserRouter, Routes, Route } from 'react-router-dom'

import './App.css'
import PDFViewer from './PDFViewer'
import Waitlist from './Waitlist'
import Unaccessible from './Unaccessible'

function App() {

  const protectedPath = localStorage.getItem("dark-mode-pdf-email") ? <PDFViewer /> : <Unaccessible />
  

  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Waitlist />} />
          <Route path={`/view`} element={protectedPath} />
        </Routes>
    </BrowserRouter>
  )
}

export default App
