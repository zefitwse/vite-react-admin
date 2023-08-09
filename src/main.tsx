import React from 'react'
import ReactDOM from 'react-dom/client'
import { myRoutes } from './router/router';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Routes>
      {myRoutes.map((item: any, index: number) => {
        return (
          <Route>
            
          </Route>
        )
      })}
    </Routes>
  </BrowserRouter>,
)
