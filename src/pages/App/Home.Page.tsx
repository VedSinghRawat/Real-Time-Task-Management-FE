import { FC, memo, useState } from 'react'
import { Heading, SubHeading } from '../../component/UI/Headings'
import useHomePage from '../../hooks/useHomePage'
import ProjectCardList from '../../component/Pages/Home/ProjectCardList'
import Divider from '../../component/UI/Divider'
import Button from '../../component/UI/Button'
import CreateProjectForm from '../../component/CreateProjectForm'

const CreateProjectButton: FC = () => {
  const [formOpen, setFormOpen] = useState(false)

  if (formOpen)
    return (
      <div className="mx-4">
        <CreateProjectForm onClose={() => setFormOpen(false)} />
      </div>
    )

  return (
    <Button className="mx-auto text-lg md:text-xl" variant="transparent" onClick={() => setFormOpen(true)}>
      Create Project +
    </Button>
  )
}

const Home: FC = () => {
  const { projectsByRole } = useHomePage()

  return (
    <div className="container px-4 py-8 mx-auto lg:px-8 lg:py-10">
      <Heading>Projects</Heading>

      <div className="space-y-8">
        <section>
          <SubHeading>Your Projects</SubHeading>

          <ProjectCardList projects={projectsByRole.owner} emptyMessage="You don't own any projects yet" />

          <div className="mt-4">
            <CreateProjectButton />
          </div>
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
