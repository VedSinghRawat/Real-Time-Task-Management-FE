import { useState, useRef, useEffect } from 'react'
import { useShallow } from 'zustand/shallow'
import { Store, useAppStore } from '../state/store'
import { Project } from '../entities/project.entity'

const selectors = (state: Store) => ({
  editId: state.project.editId,
  setEditId: state.project.setEditId,
})

export default function useProjectCard(project: Project) {
  const { editId, setEditId } = useAppStore(useShallow(selectors))

  const [isExpanded, setIsExpanded] = useState(project.description.length < 100)
  const [contentHeight, setContentHeight] = useState<number | undefined>()
  const contentRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    if (!(contentRef.current && contentRef.current.innerText.length > 100)) return

    const scrollHeight = contentRef.current.scrollHeight
    setContentHeight(isExpanded ? scrollHeight : scrollHeight * 0.3)
  }, [isExpanded])

  const image = project.image || `/assets/img/default-proj-backgorund-${(project.id % 6) + 1}.jpg`

  return { editId, image, contentHeight, contentRef, setIsExpanded, isExpanded, setEditId }
}