import { FC, memo } from 'react'

const Project: FC = () => {
  return (
    <div className="">
      <h1>Projects</h1>

      <h2>Projects You Own</h2>

      <h2>Project You Are Leading</h2>

      <h2>Projects You Work In</h2>
    </div>
  )
}

export default memo(Project)
