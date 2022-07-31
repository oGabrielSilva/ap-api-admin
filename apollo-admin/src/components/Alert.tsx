import React, {
  CSSProperties,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { ApolloContext } from '../context/Apollo'
import Colors from '../utils/Colors'
import Margins from '../utils/Margins'

interface IAlertProps {
  title: string
  message: string
}

type TStyles = { [key: string]: CSSProperties }

function Alert({ title, message }: IAlertProps) {
  const { isMobile, setAlertVisibled } = useContext(ApolloContext)
  const [alertClose, setAlertClose] = useState(false)
  const [inCanvas, setInCanvas] = useState(false)

  useEffect(() => {
    setTimeout(() => setInCanvas(true), 100)
  }, [])

  const handleCloseAlert = () => {
    setTimeout(() => setAlertVisibled(false), 1000)
    setAlertClose(true)
  }

  const styles: TStyles = useMemo(
    () => ({
      main: {
        position: 'fixed',
        width: (isMobile && '80vw') || 550,
        background: Colors.variantAlpha,
        borderRadius: Margins.radius.small,
        padding: Margins.padding / 2,
        paddingRight: Margins.margin,
        userSelect: 'none',
        transition: '1s ease',
        boxShadow: `1px 1px 5px -1px ${Colors.variantAlpha}`,
        ...((isMobile && {
          top: Margins.margin,
          right:
            (!inCanvas && '-150%') ||
            (!alertClose && Margins.margin) ||
            '-150%',
        }) || {
          bottom: !inCanvas
            ? '-100px'
            : (!alertClose && Margins.margin) || '-100px',
          right: Margins.margin,
        }),
      },
      titleContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        borderBottom: `1px solid ${Colors.text}`,
        paddingBottom: Margins.padding / 2,
      },
      title: {
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        ...((isMobile && { fontSize: 14 }) || { fontSize: 16 }),
      },
      button: {
        background: Colors.variantAlpha,
        cursor: 'pointer',
        marginLeft: Margins.margin,
      },
    }),
    [inCanvas, alertClose]
  )

  return (
    <div style={styles.main}>
      <div style={styles.titleContainer}>
        <h2 style={styles.title}>
          {title || 'Lorem ipsum dolor sit amet ipsum dolor sit amet'}
        </h2>
        <button
          type="button"
          style={styles.button}
          onClick={() => handleCloseAlert()}
        >
          <h2
            style={{
              fontWeight: 700,
              fontFamily: "'Open Sans', sans-serif",
            }}
          >
            X
          </h2>
        </button>
      </div>
      <div>
        <p style={{ marginTop: Margins.margin / 2 }}>
          {message || 'Lorem ipsum dolor sit amet ipsum dolor sit amet'}
        </p>
      </div>
    </div>
  )
}

export default Alert
