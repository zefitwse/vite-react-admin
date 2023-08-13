
import { BrowserRouter, useRoutes, } from 'react-router-dom'
import myRoutes from '../router'

function GetRoutes() {
  const allRoutePage = useRoutes(myRoutes)
  return allRoutePage
}

function App() {
  return (
    <BrowserRouter>
      <GetRoutes />
    </BrowserRouter>
  );
}

export default App
