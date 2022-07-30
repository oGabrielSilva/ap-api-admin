import React, {
  CSSProperties,
  useCallback,
  useContext,
  useRef,
  useState,
} from 'react'
import { Link } from 'react-router-dom'
import { ApolloContext } from '../context/Apollo'
import Colors from '../utils/Colors'
import Device from '../utils/Device'
import Margins from '../utils/Margins'

interface IStyle {
  input: CSSProperties
  btnCheckbox: CSSProperties
  checkbox: CSSProperties
  checkboxCheck: CSSProperties
  submitBtn: CSSProperties
}

const styles: IStyle = {
  input: {
    borderBottom: `1px solid ${Colors.variant}`,
    background: 'transparent',
    padding: Margins.inputPadding,
    width: '100%',
    marginTop: Margins.margin,
  },
  btnCheckbox: {
    background: Colors.bg,
    cursor: 'pointer',
  },
  checkbox: {
    width: Margins.margin / 1.5,
    height: Margins.margin / 1.5,
    border: `1px solid ${Colors.variant}`,
    color: Colors.dark,
    transition: '0.4s ease',
  },
  checkboxCheck: {
    background: Colors.variant,
  },
  submitBtn: {
    background: Colors.variant,
    width: '100%',
    padding: Margins.buttonPadding[0],
    borderRadius: Margins.radius.long,
    marginTop: Margins.margin * 2,
    cursor: 'pointer',
    transition: '0.5s ease',
  },
}

function SignIn() {
  const { handleSignIn } = useContext(ApolloContext)
  const [remember, setRemember] = useState(false)
  const [email, setEmail] = useState<string>()
  const [password, setPassword] = useState<string>()

  const [emailIsOk, setEmailIsOk] = useState(false)
  const [passwordIsOk, setPasswordIsOk] = useState(false)

  const emailRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)

  const handleValidSignIn = useCallback(() => {
    if (email) {
      const errors: Array<boolean> = []
      const arr: Array<string> = email.split('')
      const obj = { at: arr.includes('@'), dot: arr.includes('.') }
      const afterAt = email.split('@')[1]
      const beforeAt = email.split('@')[0]

      if (!afterAt || (afterAt !== undefined && afterAt.length < 4)) {
        errors.push(true)
      }
      if (!beforeAt || (beforeAt !== undefined && beforeAt.length < 2)) {
        errors.push(true)
      }
      if (!obj.at) errors.push(true)

      if (!obj.dot) errors.push(true)

      if (email.split(' ').length > 1) errors.push(true)

      if (errors.length <= 0) setEmailIsOk(true)
    } else setEmailIsOk(false)
    if (password && password.length >= 8) {
      setPasswordIsOk(true)
    } else setPasswordIsOk(false)
  }, [email, password])

  return (
    <div
      style={{
        width: (Device.isMobile() && '100%') || '70%',
        marginTop: Margins.margin,
      }}
    >
      <input
        style={styles.input}
        type="email"
        ref={emailRef}
        onChange={() => setEmail(emailRef.current?.value)}
        placeholder="E-mail"
      />
      <input
        style={styles.input}
        type="password"
        ref={passwordRef}
        onChange={() => setPassword(passwordRef.current?.value)}
        placeholder="Senha"
      />
      <div
        style={{
          display: 'flex',
          marginTop: Margins.margin,
          justifyContent: 'space-between',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <button
            type="button"
            style={styles.btnCheckbox}
            onClick={() => setRemember((v) => !v)}
          >
            {(remember && (
              <div style={{ ...styles.checkbox, ...styles.checkboxCheck }}>
                &#10004;
              </div>
            )) || <div style={styles.checkbox} />}
          </button>
          <span style={{ marginLeft: Margins.margin / 3 }}>
            Manter conectado
          </span>
        </div>
        <Link to="/forgot-password" style={{ color: Colors.link }}>
          Esqueceu a senha?
        </Link>
      </div>
      <button
        type="button"
        style={styles.submitBtn}
        onClick={handleValidSignIn}
      >
        <span style={{ fontWeight: 700, color: Colors.dark }}>Entrar</span>
      </button>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          marginTop: Margins.margin,
        }}
      >
        <p>Não possui uma conta?</p>
        <Link
          to="/signup"
          style={{
            color: Colors.link,
            textDecoration: 'none',
            marginLeft: Margins.margin / 4,
          }}
        >
          Cadastre-se
        </Link>
      </div>
    </div>
  )
}

export default SignIn
