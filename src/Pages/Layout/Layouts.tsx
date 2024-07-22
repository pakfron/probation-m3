import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './Header'

type Props = {}

const Layout = (props: Props) => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  )
}

export default Layout
