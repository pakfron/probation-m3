import React, { FC, lazy, Suspense } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import Layout from '../Pages/Layout/Layouts'
import LoginPage from '../Pages/LoginPage/LoginPage'
const RegisterPage = lazy(() => import('../Pages/RegisterPage/RegisterPage'))

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { path: '/register', element: <RegisterPage /> },
      { path: '/login', element: <LoginPage /> }
    ]
  }
])

export const Router: FC = () => {
  return (
    <Suspense fallback={<div>loading.........</div>}>
      <RouterProvider router={router} />
    </Suspense>
  )
}
