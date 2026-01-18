import { Container } from 'react-bootstrap'
import { Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/Home'

function App() {
  return (
    <Container fluid style={{minHeight: '100vh',padding: '24px', backgroundColor: '#f7f9fc',}}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Container>
  )
}

export default App
