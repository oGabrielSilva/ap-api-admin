import React, {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react'
import Alert from '../components/Alert'
import Constants from '../utils/Constants'
import Device from '../utils/Device'

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
  isMobile: boolean
  setAlertVisibled: (value: boolean) => void //eslint-disable-line
  setAlertTitle: (value: string) => void //eslint-disable-line
  setAlertMessage: (value: string) => void //eslint-disable-line
  handleAlert: (title: string, message: string) => void //eslint-disable-line
  handleStorageSignIn: (session: TSession, remember: boolean) => void //eslint-disable-line
  handleStorageSignUp: (session: TSession) => void //eslint-disable-line
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

  // System
  const [isMobile, setIsMobile] = useState<boolean>(false)

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

  const handleStorageSignUp = useCallback((session: TSession) => {
    setSession(session.session.uid as string)
    setUserInfo({ name: session.user.name, email: session.user.email })
    localStorage.setItem(Constants.sessionKey, session.session.uid)
    localStorage.setItem(Constants.userSessionKey, JSON.stringify(session.user))
  }, [])

  const handleResizeScreen = useCallback(() => {
    setIsMobile(Device.isMobile())
  }, [])

  const context = useMemo(
    () => ({
      sessionUid,
      userInfo,
      alertVisibled,
      isMobile,
      setAlertVisibled,
      setAlertTitle,
      setAlertMessage,
      handleAlert,
      handleStorageSignIn,
      handleStorageSignUp,
    }),
    [
      sessionUid,
      isMobile,
      userInfo,
      alertVisibled,
      setAlertVisibled,
      handleStorageSignIn,
      setAlertTitle,
      handleAlert,
      setAlertMessage,
      handleStorageSignUp,
    ]
  )

  useEffect(() => {
    handleResizeScreen()
    window.addEventListener('resize', handleResizeScreen)
    return () => {
      window.removeEventListener('resize', handleResizeScreen)
    }
  }, [])

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
