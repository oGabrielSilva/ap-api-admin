import React, {
  createContext,
  ReactNode,
  useEffect,
  useMemo,
  useState,
} from 'react'
import Alert from '../components/Alert'
import Constants from '../utils/Constants'

type TAPCProps = { children: ReactNode }
type TSession = { uid: string }

interface IApolloContext {
  sessionUid: string
  alertVisibled: boolean
  setAlertVisibled: (value: boolean) => void //eslint-disable-line
  setAlertTitle: (value: string) => void //eslint-disable-line
  setAlertMessage: (value: string) => void //eslint-disable-line
  handleStorageSignIn: (session: TSession) => void //eslint-disable-line
}

export const ApolloContext = createContext<IApolloContext>({} as IApolloContext)

function ApolloContextProvider({ children }: TAPCProps) {
  const [sessionUid, setSession] = useState<string>('')

  // Alert
  const [alertVisibled, setAlertVisibled] = useState<boolean>(false)
  const [alertTitle, setAlertTitle] = useState<string>('')
  const [alertMessage, setAlertMessage] = useState<string>('')

  useEffect(() => {
    setTimeout(() => setAlertVisibled(true), 1500)
  }, [])

  const handleStorageSignIn = (session: TSession) => {
    setSession(session.uid as string)
    localStorage.setItem(Constants.sessionKey, session.uid)
  }

  const context = useMemo(
    () => ({
      sessionUid,
      alertVisibled,
      setAlertVisibled,
      setAlertTitle,
      setAlertMessage,
      handleStorageSignIn,
    }),
    [sessionUid, alertVisibled, setAlertVisibled, handleStorageSignIn]
  )

  return (
    <ApolloContext.Provider value={context}>
      <>
        {alertVisibled && <Alert title={alertTitle} message={alertMessage} />}
        {children}
      </>
    </ApolloContext.Provider>
  )
}

export default ApolloContextProvider
