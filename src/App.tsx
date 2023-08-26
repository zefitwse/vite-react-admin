
import { BrowserRouter } from 'react-router-dom'
import { renderRoutes } from '../router'

import { useRoutes } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { getAuth } from '@/api/auth'
import { useCallback, useEffect } from 'react';

const GetRoutes = () => {
  return useRoutes(renderRoutes())
}



function App() {
  const token = sessionStorage.getItem('token')
  const dispatch = useDispatch()
  const getCurrentAuth = useCallback(async () => {
    if (token) {
      const auth: any = await getAuth({ auth: token })
      sessionStorage.setItem('auth', auth.ownerAuth)
      dispatch({
        type: "role",
        payload: auth.info
      })
    }


  }, [])

  useEffect(() => {
    getCurrentAuth()
  }, [token])

  return (
    <BrowserRouter>
      <GetRoutes />
    </BrowserRouter>
  );
}

export default App
