import React, {
  createContext,
  ReactNode,
  useCallback,
  useMemo,
  useState,
} from 'react'
import Alert from '../components/Alert'
import Constants from '../utils/Constants'

type TAPCProps = { children: ReactNode }
type TUserInfo = { name: string; email: string }
type TSession = {
  session: { uid: string }
  user: TUserInfo
}

interface IApolloContext {
  sessionUid: string
  userInfo?: TUserInfo
  alertVisibled: boolean
  setAlertVisibled: (value: boolean) => void //eslint-disable-line
  setAlertTitle: (value: string) => void //eslint-disable-line
  setAlertMessage: (value: string) => void //eslint-disable-line
  handleAlert: (title: string, message: string) => void //eslint-disable-line
  handleStorageSignIn: (session: TSession, remember: boolean) => void //eslint-disable-line
}

export const ApolloContext = createContext<IApolloContext>({} as IApolloContext)

function ApolloContextProvider({ children }: TAPCProps) {
  // Session
  const [sessionUid, setSession] = useState<string>('')
  const [userInfo, setUserInfo] = useState<TUserInfo>()

  // Alert
  const [alertVisibled, setAlertVisibled] = useState<boolean>(false)
  const [alertTitle, setAlertTitle] = useState<string>('')
  const [alertMessage, setAlertMessage] = useState<string>('')

  const handleAlert = useCallback((title: string, message: string) => {
    setAlertTitle(title)
    setAlertMessage(message)
    setAlertVisibled(true)
  }, [])

  const handleStorageSignIn = useCallback(
    (session: TSession, remember: boolean) => {
      setSession(session.session.uid as string)
      setUserInfo({ name: session.user.name, email: session.user.email })
      if (remember) {
        localStorage.setItem(Constants.sessionKey, session.session.uid)
        localStorage.setItem(
          Constants.userSessionKey,
          JSON.stringify(session.user)
        )
      }
    },
    []
  )

  const context = useMemo(
    () => ({
      sessionUid,
      userInfo,
      alertVisibled,
      setAlertVisibled,
      setAlertTitle,
      setAlertMessage,
      handleAlert,
      handleStorageSignIn,
    }),
    [
      sessionUid,
      userInfo,
      alertVisibled,
      setAlertVisibled,
      handleStorageSignIn,
      setAlertTitle,
      handleAlert,
      setAlertMessage,
    ]
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
