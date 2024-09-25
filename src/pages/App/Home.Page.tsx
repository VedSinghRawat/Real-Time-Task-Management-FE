import { FC, memo } from 'react'
import { Heading, SubHeading } from '../../component/UI/Headings'

const Project: FC = () => {
  return (
    <div className="container mx-auto">
      <Heading>Projects</Heading>

      <SubHeading>Your Projects</SubHeading>
      {/* Add content for owned projects */}

      <SubHeading>Projects You Lead</SubHeading>
      {/* Add content for led projects */}

      <SubHeading>Projects You Work In</SubHeading>
      {/* Add content for projects you work in */}
    </div>
  )
}

export default memo(Project)
