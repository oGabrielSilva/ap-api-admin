import React from 'react'
import { Route, Routes } from 'react-router-dom'
import ApolloContextProvider from '../context/Apollo'
import Home from '../pages/Home'

function Router() {
  return (
    <div className="App">
      <ApolloContextProvider>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </ApolloContextProvider>
    </div>
  )
}

export default Router
