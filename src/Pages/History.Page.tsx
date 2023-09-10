import { FC, memo } from 'react'
import { useParams } from 'react-router-dom'

interface HistoryProps {}

const History: FC<HistoryProps> = () => {
  const { history } = useParams()

  return <div>{history}</div>
}

export default memo(History)
