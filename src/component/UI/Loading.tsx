import { FC, useEffect, useState } from 'react'

interface LoadingProps {}

const ROUND_DURATION = 500

export const Loading: FC<LoadingProps> = () => {
  const [progress, setProgress] = useState(0)
  const [delay, setDelay] = useState(ROUND_DURATION)

  useEffect(() => {
    const int = setInterval(() => {
      setProgress((curr) => {
        return curr ? 0 : 140
      })
      console.log({ progress })
      if (progress === 140) setDelay(100)
      else setDelay(ROUND_DURATION)
    }, delay)

    return () => clearInterval(int)
  }, [delay, progress])

  return (
    <div className="p-4 text-center text-white">
      <h1 className={`text-3xl text-secondary-11 animate-bounce`}>Loading</h1>

      <div className={`border h-8 w-[25vw] border-primary-6 bg-primary-2 rounded-sm mt-3 relative overflow-hidden`}>
        <div
          className={`h-full flex gap-1 items-center absolute w-full ease-linear ${progress ? 'transition-all duration-500' : ''}`}
          style={{ translate: `calc(${progress}% - 6rem)` }}
        >
          <div className={`w-24 h-[70%] transition-[right] bg-secondary-11 rounded-sm`}></div>
        </div>
      </div>
    </div>
  )
}
