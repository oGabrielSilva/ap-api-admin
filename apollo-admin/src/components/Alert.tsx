import React, { useContext, useEffect, useState } from 'react'
import { ApolloContext } from '../context/Apollo'
import Colors from '../utils/Colors'
import Device from '../utils/Device'
import Margins from '../utils/Margins'

interface IAlertProps {
  title: string
  message: string
}

function Alert({ title, message }: IAlertProps) {
  const { setAlertVisibled } = useContext(ApolloContext)
  const [alertClose, setAlertClose] = useState(false)
  const [inCanvas, setInCanvas] = useState(false)

  useEffect(() => {
    setTimeout(() => setInCanvas(true), 100)
  }, [])

  const handleCloseAlert = () => {
    setTimeout(() => setAlertVisibled(false), 1000)
    setAlertClose(true)
  }

  return (
    <div
      style={{
        position: 'fixed',
        width: (Device.isMobile() && '80vw') || 550,
        minHeight: 100,
        background: Colors.variantAlpha,
        borderRadius: Margins.radius.small,
        padding: Margins.padding,
        paddingTop: Margins.padding / 2,
        userSelect: 'none',
        transition: '1s ease',
        ...((Device.isMobile() && {
          top: '50%',
          left: (!inCanvas && '150%') || (!alertClose && '50%') || '100%',
          transform:
            (!alertClose && 'translate(-50%, -50%)') || 'translateY(-50%)',
        }) || {
          bottom: !inCanvas
            ? '-100px'
            : (!alertClose && Margins.margin) || '-100px',
          right: Margins.margin,
        }),
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
          borderBottom: `1px solid ${Colors.text}`,
          paddingBottom: Margins.padding / 2,
        }}
      >
        <h2
          style={{
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            ...((Device.isMobile() && { fontSize: 14 }) || { fontSize: 16 }),
          }}
        >
          {title || 'Lorem ipsum dolor sit amet ipsum dolor sit amet'}
        </h2>
        <button
          type="button"
          style={{
            background: Colors.variantAlpha,
            cursor: 'pointer',
            marginLeft: Margins.margin,
          }}
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
      <div>{message}</div>
    </div>
  )
}

export default Alert
