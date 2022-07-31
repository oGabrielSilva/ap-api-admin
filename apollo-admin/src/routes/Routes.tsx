import React from 'react'
import { Route, Routes } from 'react-router-dom'
import ApolloContextProvider from '../context/Apollo'
import SignIn from '../pages/SignIn'
import SignUp from '../pages/SignUp'

function Router() {
  return (
    <div className="App">
      <ApolloContextProvider>
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </ApolloContextProvider>
    </div>
  )
}

export default Router
