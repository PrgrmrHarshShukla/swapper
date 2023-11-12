import { BrowserRouter, Routes, Route } from 'react-router-dom'

import './App.css'
import PDFViewer from './PDFViewer'

function App() {
  

  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<PDFViewer />} />
        </Routes>
    </BrowserRouter>
  )
}

export default App
