import { FC } from 'react'

interface LoadingProps {}

export const Loading: FC<LoadingProps> = () => {
  return (
    <div className="p-4 text-center text-white">
      <h1 className={`text-3xl animate-bounce text-secondary-11`}>Loading</h1>

      <div className={`overflow-hidden relative mx-auto mt-3 h-8 rounded-sm border sm:w-[25vw] w-[75vw] border-primary-6 bg-primary-2`}>
        <div
          className={`w-24 h-[70%] bg-secondary-11 rounded-sm absolute top-1/2 -translate-y-1/2 animate-slide`}
          style={{
            animationDuration: `800ms`,
          }}
        ></div>
      </div>
    </div>
  )
}
