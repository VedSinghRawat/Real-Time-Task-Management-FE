import { FC, memo } from 'react'
import { Heading, SubHeading } from '../../component/UI/Headings'
import useHomePage from '../../hooks/useHomePage'

const Home: FC = () => {
  const { projectsByRole } = useHomePage()

  console.log(projectsByRole)

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
export default memo(Home)
