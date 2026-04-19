import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import type ProtectedRoute from './components/ProtectedRoute';

function App() {
  // const [count, setCount] = useState(0);

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<Login />} />

          {/* Protected Route */}
          <Route
            path='/dashboard'
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
