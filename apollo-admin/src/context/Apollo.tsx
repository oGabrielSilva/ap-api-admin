import React, { createContext, ReactNode, useMemo, useState } from 'react'
import Constants from '../utils/Constants'

type TAPCProps = { children: ReactNode }
type TSession = { uid: string }

interface IApolloContext {
  sessionUid: string
  handleStorageSignIn: (session: TSession) => void //eslint-disable-line
}

export const ApolloContext = createContext<IApolloContext>({} as IApolloContext)

function ApolloContextProvider({ children }: TAPCProps) {
  const [sessionUid, setSession] = useState<string>('')

  const handleStorageSignIn = (session: TSession) => {
    setSession(session.uid as string)
    localStorage.setItem(Constants.sessionKey, session.uid)
  }

  const context = useMemo(() => ({ sessionUid, handleStorageSignIn }), [])

  return (
    <ApolloContext.Provider value={context}>{children}</ApolloContext.Provider>
  )
}

export default ApolloContextProvider
