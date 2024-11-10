import { FC, memo } from 'react'
import { Heading, SubHeading } from '../../component/UI/Headings'
import useHomePage from '../../hooks/useHomePage'
import ProjectCardList from '../../component/Pages/Home/ProjectCardList'
import Divider from '../../component/UI/Divider'

const Home: FC = () => {
  const { projectsByRole } = useHomePage()

  return (
    <div className="container px-4 py-8 mx-auto lg:px-8 lg:py-10">
      <Heading>Projects</Heading>

      <div className="space-y-8">
        <section>
          <SubHeading>Your Projects</SubHeading>

          <ProjectCardList projects={projectsByRole.owner} emptyMessage="You don't own any projects yet" />
        </section>

        <Divider className="-mx-4" />

        <section>
          <SubHeading>Projects You Lead</SubHeading>

          <ProjectCardList projects={projectsByRole.team_leader} emptyMessage="You're not leading any projects" />
        </section>

        <Divider className="-mx-4" />

        <section>
          <SubHeading>Projects You Work In</SubHeading>

          <ProjectCardList projects={projectsByRole.member} emptyMessage="You're not a member of any projects" />
        </section>
      </div>
    </div>
  )
}

export default memo(Home)
