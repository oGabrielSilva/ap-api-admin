import React, { CSSProperties, useContext } from 'react'
import Footer from '../components/Footer'
import SignIn from '../components/SignIn'
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

function Home() {
  const { isMobile } = useContext(ApolloContext)
  console.log((isMobile && '90vw') || '50vw')

  return (
    <div>
      <div style={styles.container}>
        <main style={{ ...styles.main, width: (isMobile && '90vw') || '50vw' }}>
          <h2 style={{ textAlign: 'center' }}>
            <span style={{ color: Colors.variant }}>Apollo </span>
            <span style={{ fontWeight: 400 }}>AdminDashboard</span>
          </h2>
          <h3 style={{ margin: Margins.margin, textAlign: 'center' }}>
            Sign in to your account
          </h3>
          <SignIn />
        </main>
      </div>
      <Footer />
    </div>
  )
}

export default Home
