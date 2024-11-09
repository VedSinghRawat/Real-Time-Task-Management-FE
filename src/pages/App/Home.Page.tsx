import { FC, memo, useEffect } from 'react'
import { Heading, SubHeading } from '../../component/UI/Headings'
import { Store } from '../../state/store'
import { useAppStore } from '../../state/store'
import ProjectSelectors from '../../state/selector/project.selector'

const selectors = (state: Store) => ({
  list: ProjectSelectors.list(state),
  listMine: ProjectSelectors.base.listMine(state),
})

const Project: FC = () => {
  const { list, listMine } = useAppStore(selectors)

  useEffect(() => {
    void listMine()
  }, [listMine])

  const myProjects = []
  const ledProjects = []
  const joinedProjects = []

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
