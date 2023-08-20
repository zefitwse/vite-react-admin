import React from 'react';
import { Navigate } from 'react-router-dom';

export const sleepTime = (ms: number) => {
  return new Promise(resolve => setTimeout(resolve, ms))
}


export function routeGuard(el: JSX.Element) {

  const token = sessionStorage.getItem("token")

  if (token) {
    return el
  } else {
    console.log(token, 'woshitoem ')
    return <Navigate to="/login" />
  }

}



