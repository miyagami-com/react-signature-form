import React, { useCallback, useEffect, useRef, useState } from 'react'

interface signatureFormProps {
  signature: string
  setSignature: React.Dispatch<React.SetStateAction<string>>
  width?: number
  height?: number
  canvasStyle?: React.CSSProperties
  markerStyle?: {
    strokeStyle?: string
    lineJoin?: CanvasLineJoin
    lineWidth?: number
  }
  saveButtonStyle?: React.CSSProperties
  clearButtonStyle?: React.CSSProperties
  redrawButtonStyle?: React.CSSProperties
  saveButtonText?: string
  clearButtonText?: string
  redrawButtonText?: string
}

interface Coordinate {
  x: number
  y: number
}

// Form with a HTML canvas to draw signatures. It is based on this:
export const SignatureForm = (props: signatureFormProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isPainting, setIsPainting] = useState<Boolean>(false)
  const [mousePosition, setMousePosition] = useState<Coordinate>({ x: 0, y: 0 })
  const [empty, setEmpty] = useState<Boolean>(true)

  const defaultProps = {
    width: 400,
    height: 200,
    markerStyle: {
      lineWidth: 4,
      lineJoin: 'round' as CanvasLineJoin,
      strokeStyle: '#000'
    },
    canvasStyle: {
      marginBottom: 14,
      backgroundColor: '#fff',
      borderRadius: 4,
      border: '1px solid #f0f0f0',
      // boxShadow: ' 0 5px 10px 0 rgba(0,0,0,0.2)'
    },
    saveButtonStyle: {
      backgroundColor: '#1890ff',
      color: 'white',
      cursor: 'pointer',
      borderRadius: '4px',
      height: 32,
      padding: '4px 15px',
      fontSize: 14,
      border: 'none',
      margin: '4px'
    },
    clearButtonStyle: {
      color: 'rgba(0,0,0,.85)',
      cursor: 'pointer',
      borderRadius: '4px',
      height: 32,
      padding: '4px 15px',
      fontSize: 14,
      border: '1px solid #f0f0f0',
      margin: '4px'
    },
    redrawButtonStyle: {
      color: 'rgba(0,0,0,.85)',
      cursor: 'pointer',
      borderRadius: '4px',
      height: 32,
      padding: '4px 15px',
      fontSize: 14,
      border: '1px solid #f0f0f0',
      margin: '4px'
    },
    saveButtonText: 'Save',
    clearButtonText: 'Clear',
    redrawButtonText: 'Redraw'
  }

  const {
    signature,
    setSignature,
    width,
    height,
    canvasStyle,
    markerStyle,
    saveButtonStyle,
    clearButtonStyle,
    redrawButtonStyle,
    saveButtonText,
    clearButtonText,
    redrawButtonText
  } = props

  // Set canvas to image of signature if signature exists.
  useEffect(() => {
    if (signature) {
      const canvas = canvasRef.current
      const context = canvas?.getContext('2d')
      if (context) {
        const img = new Image()
        img.onload = () => {
          context.drawImage(img, 0, 0)
        }
        img.src = signature
      }
    }
  }, [])

  const getCoordinates = (event: MouseEvent): Coordinate | void => {
    if (!canvasRef.current) {
      return
    }

    const canvas = canvasRef.current

    const rect = canvas.getBoundingClientRect()
    const scaleX = canvas.width / rect.width
    const scaleY = canvas.height / rect.height

    return {
      x: (event.clientX - rect.left) * scaleX,
      y: (event.clientY - rect.top) * scaleY
    }
  }

  const drawLine = (
    originalMousePosition: Coordinate,
    newMousePosition: Coordinate
  ) => {
    if (!canvasRef.current || signature) {
      return
    }

    const canvas = canvasRef.current
    const context = canvas?.getContext('2d')

    if (context) {
      context.strokeStyle =
        markerStyle?.strokeStyle || defaultProps.markerStyle.strokeStyle
      context.lineJoin =
        markerStyle?.lineJoin || defaultProps.markerStyle.lineJoin
      context.lineWidth =
        markerStyle?.lineWidth || defaultProps.markerStyle.lineWidth

      context.beginPath()
      context.moveTo(originalMousePosition.x, originalMousePosition.y)
      context.lineTo(newMousePosition.x, newMousePosition.y)
      context.closePath()
      context.stroke()
    }
  }

  const startPaint = useCallback((event) => {
    const coordinates = getCoordinates(event)
    if (coordinates) {
      setMousePosition(coordinates)
      setIsPainting(true)
      setEmpty(false)
    }
  }, [])

  useEffect(() => {
    if (!canvasRef.current || signature) {
      return
    }
    const canvas = canvasRef.current
    canvas.addEventListener('mousedown', startPaint)
    return () => {
      canvas.removeEventListener('mousedown', startPaint)
    }
  }, [startPaint, signature])

  const paint = useCallback(
    (event) => {
      if (isPainting) {
        const newMousePosition = getCoordinates(event)
        if (mousePosition && newMousePosition) {
          drawLine(mousePosition, newMousePosition)
          setMousePosition(newMousePosition)
        }
      }
    },
    [isPainting, mousePosition] // eslint-disable-line
  )

  useEffect(() => {
    if (!canvasRef.current || signature) {
      return
    }
    const canvas = canvasRef.current
    canvas.addEventListener('mousemove', paint)
    return () => {
      canvas.removeEventListener('mousemove', paint)
    }
  }, [paint, signature])

  const exitPaint = useCallback(() => {
    setIsPainting(false)
    setMousePosition({ x: 0, y: 0 })
  }, [])

  useEffect(() => {
    if (!canvasRef.current || signature) {
      return
    }
    const canvas = canvasRef.current
    canvas.addEventListener('mouseup', exitPaint)
    canvas.addEventListener('mouseleave', exitPaint)
    return () => {
      canvas.removeEventListener('mouseup', exitPaint)
      canvas.removeEventListener('mouseleave', exitPaint)
    }
  }, [exitPaint, signature])

  const clearCanvas = () => {
    setEmpty(true)
    if (signature) {
      setSignature('')
    }
    if (!canvasRef.current) {
      return
    }
    const canvas = canvasRef.current
    const context = canvas?.getContext('2d')
    if (context) {
      context.clearRect(0, 0, canvas.width, canvas.height)
    }
  }

  const saveCanvas = () => {
    if (!canvasRef.current || empty) {
      return
    }
    const canvas = canvasRef.current
    const context = canvas?.getContext('2d')
    if (context) {
      setSignature(
        canvas
          ?.toDataURL('image/png')
          .replace('image/png', 'image/octet-stream')
      )
    }
  }

  return (
    <div>
      <div
        style={{ ...defaultProps.canvasStyle, ...canvasStyle, width, height }}
      >
        <canvas
          ref={canvasRef}
          height={height || defaultProps.height}
          width={width || defaultProps.width}
        />
      </div>
      <button
        style={
          signature
            ? { ...defaultProps.redrawButtonStyle, ...redrawButtonStyle }
            : { ...defaultProps.clearButtonStyle, ...clearButtonStyle }
        }
        onClick={() => clearCanvas()}
      >
        {signature
          ? redrawButtonText || defaultProps.redrawButtonText
          : clearButtonText || defaultProps.clearButtonText}
      </button>
      {!signature && (
        <button
          style={{ ...defaultProps.saveButtonStyle, ...saveButtonStyle }}
          onClick={() => saveCanvas()}
        >
          {saveButtonText || defaultProps.saveButtonText}
        </button>
      )}
    </div>
  )
}
