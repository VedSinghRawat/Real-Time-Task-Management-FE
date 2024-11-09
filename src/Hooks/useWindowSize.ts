import { useState, useEffect } from 'react'

export const useWindowSize = (onResize?: (data: { width: number; height: number }) => void) => {
  const [windowSize, setWindowSize] = useState({
    width: 0,
    height: 0,
  })

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight })
    }

    window.addEventListener('resize', handleResize)

    handleResize()

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [onResize])

  useEffect(() => {
    onResize && onResize(windowSize)
  }, [onResize, windowSize])

  return windowSize
}
