import { Navigate } from 'react-router-dom';

export function routeGuard(el: JSX.Element, from?: string) {
  const token = sessionStorage.getItem('token')
  if (from === 'login') {
    if (token) {
      return <Navigate to="/dashboard/work-1" />
    } else {
      return el
    }
  } else {
    if (token) {
      return el
    } else {
      return <Navigate to="/login" />
    }
  }
}




