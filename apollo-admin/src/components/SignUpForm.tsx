import React, {
  ChangeEvent,
  CSSProperties,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react'
import { Link } from 'react-router-dom'
import Account from '../api/Account'
import { ApolloContext } from '../context/Apollo'
import Colors from '../utils/Colors'
import Margins from '../utils/Margins'
import Validation from '../utils/Validation'

interface IStyle {
  input: CSSProperties
  btnCheckbox: CSSProperties
  checkbox: CSSProperties
  checkboxCheck: CSSProperties
  submitBtn: CSSProperties
  image: CSSProperties
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
  image: {
    borderRadius: '100%',
    margin: '0 auto',
    cursor: 'pointer',
    width: 100,
    height: 100,
  },
}

function SignUpForm() {
  const { isMobile, handleStorageSignUp, handleAlert } =
    useContext(ApolloContext)
  const [avatar, setAvatar] = useState<File>()
  const [name, setName] = useState<string>()
  const [lastName, setLastName] = useState<string>()
  const [email, setEmail] = useState<string>()
  const [password, setPassword] = useState<string>()
  const [buttonDisabled, setButtonDisabled] = useState(true)

  const avatarRef = useRef<HTMLInputElement>(null)
  const nameRef = useRef<HTMLInputElement>(null)
  const lastnameRef = useRef<HTMLInputElement>(null)
  const emailRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (email && password && name && lastName) {
      const emailValid = Validation.email(email)
      const passValid = Validation.password(password)
      const nameValid = name.length > 3
      const lastNameValid = lastName.length > 3
      setButtonDisabled(
        !(emailValid && passValid && nameValid && lastNameValid)
      )
    } else setButtonDisabled(true)
  }, [email, password, name, lastName])

  const handleAvatar = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target && event.target.files) setAvatar(event.target.files[0])
  }

  const handleSignUp = useCallback(() => {
    if (!email || !password || !name || !lastName) {
      handleAlert('Oopss...', 'Check all fields')
      return
    }
    Account.signUp({ email, password, name, lastName, avatar })
      .then((response) => {
        if (response.data && response.data.session) {
          handleStorageSignUp(response.data)
          handleAlert(
            'Success',
            `Welcome to the Apollo Admin, ${response.data.user.name as string}`
          )
        }
      })
      .catch((error) => {
        if (error.response && error.response.data) {
          handleAlert(
            'Oopss... some error happened',
            error.response.data.message as string
          )
        }
      })
  }, [email, password, name, lastName])

  return (
    <div
      style={{
        width: (isMobile && '100%') || '70%',
        marginTop: Margins.margin,
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <label htmlFor="avatar" id="label-avatar">
          <input
            id="avatar"
            style={{ display: 'none' }}
            type="file"
            onChange={handleAvatar}
            accept="image/png, image/jpeg"
            ref={avatarRef}
          />
          <img
            src={
              (avatar && avatar.name && URL.createObjectURL(avatar)) ||
              '/avatar.png'
            }
            alt="Profile"
            style={styles.image}
            width="100px"
            height="100px"
          />
        </label>
      </div>
      <input
        style={styles.input}
        type="text"
        ref={nameRef}
        onChange={() => setName(nameRef.current?.value)}
        placeholder="Name"
      />
      <input
        style={styles.input}
        type="text"
        ref={lastnameRef}
        onChange={() => setLastName(lastnameRef.current?.value)}
        placeholder="Lastname"
      />
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
      <button
        disabled={buttonDisabled}
        type="button"
        style={styles.submitBtn}
        onClick={() => handleSignUp()}
      >
        <span style={{ fontWeight: 700, color: Colors.dark }}>Sign up</span>
      </button>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          marginTop: Margins.margin,
        }}
      >
        <p>Already have an account?</p>
        <Link
          to="/"
          style={{
            color: Colors.link,
            textDecoration: 'none',
            marginLeft: Margins.margin / 4,
          }}
        >
          Sign in
        </Link>
      </div>
    </div>
  )
}

export default SignUpForm
