import { FC, memo } from 'react'

interface TestProps {}

const Test: FC<TestProps> = () => {
  return (
    <div className={`flex `}>
      <div className={`bg-300 h-10 grow`}>8</div>
      <div className={` bg-400 grow`}>8</div>
      <div className={`bg-500 grow`}>8</div>
      <div className={`bg-600 grow`}>8</div>
      <div className={`bg-700 grow`}>8</div>
      <div className={`bg-800 grow`}>8</div>
      <div className={`bg-900 grow`}>8</div>
    </div>
  )
}

export default memo(Test)
