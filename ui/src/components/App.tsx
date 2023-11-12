import { BrowserRouter, Routes, Route } from 'react-router-dom'

import './App.css'
import PDFViewer from './PDFViewer'
import Home from './Home'

function App() {
  

  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pdfViewer" element={<PDFViewer />} />
        </Routes>
    </BrowserRouter>
  )
}

export default App
