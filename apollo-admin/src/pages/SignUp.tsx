import React, { CSSProperties, useContext } from 'react'
import Footer from '../components/Footer'
import SignUpForm from '../components/SignUpForm'
import { ApolloContext } from '../context/Apollo'
import Colors from '../utils/Colors'
import Device from '../utils/Device'
import Margins from '../utils/Margins'

interface IStyle {
  container: CSSProperties
  main: CSSProperties
}

const styles: IStyle = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '90vh',
  },
  main: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: (Device.isMobile() && '90vw') || '50vw',
    background: Colors.secundary,
    flexDirection: 'column',
    borderRadius: Margins.radius.small,
    padding: Margins.padding,
  },
}

function SignUp() {
  const { isMobile } = useContext(ApolloContext)

  return (
    <div>
      <div style={styles.container}>
        <main style={{ ...styles.main, width: (isMobile && '90vw') || '50vw' }}>
          <h2 style={{ textAlign: 'center' }}>
            <span style={{ color: Colors.variant }}>Apollo </span>
            <span style={{ fontWeight: 400 }}>AdminDashboard</span>
          </h2>
          <h3 style={{ margin: Margins.margin, textAlign: 'center' }}>
            Sign up to gain access to the system
          </h3>
          <SignUpForm />
        </main>
      </div>
      <Footer />
    </div>
  )
}

export default SignUp
