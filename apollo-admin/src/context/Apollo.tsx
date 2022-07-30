import React, { createContext, ReactNode, useMemo, useState } from 'react'

type TAPCProps = { children: ReactNode }
type TSession = { uid: string }

interface IApolloContext {
  session?: TSession
  handleSignIn: (email: string, password: string) => void //eslint-disable-line
}

export const ApolloContext = createContext<IApolloContext>({} as IApolloContext)

function ApolloContextProvider({ children }: TAPCProps) {
  const [session, setSession] = useState<TSession>()

  const handleSignIn = (email: string, password: string) => {
    console.log(email, password)
  }

  const context = useMemo(() => ({ session, handleSignIn }), [])

  return (
    <ApolloContext.Provider value={context}>{children}</ApolloContext.Provider>
  )
}

export default ApolloContextProvider
