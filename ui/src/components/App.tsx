import { BrowserRouter, Routes, Route } from 'react-router-dom'

import './App.css'
import PDFViewer from './PDFViewer'
import Waitlist from './Waitlist'

function App() {
  

  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Waitlist />} />
          <Route path={`/view`} element={<PDFViewer />} />
        </Routes>
    </BrowserRouter>
  )
}

export default App
