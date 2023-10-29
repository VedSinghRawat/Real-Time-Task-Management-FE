import { faker } from '@faker-js/faker'
import { subDays } from 'date-fns'
import { Keys } from './Store/task.store'
import { getRandomInt, generateToken } from './utils'

export const COLORS = {
  done: '#0FFF95',
  doing: '#FEE12B',
  todo: '#F03C3D',
}

export const RADIAN = Math.PI / 180

export const LOCAL_STORAGE_LEFTOVER_DATE = 'leftover_date'

export const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'] as const

export const DUMMY_TASKS = () =>
  Array.from({ length: 10000 }).reduce<Keys['taskMap']>((curr, _, i) => {
    if (i === 0) return curr

    const doneCount = getRandomInt(5, 8)
    const doingCount = getRandomInt(1, 3)
    const todoCount = getRandomInt(1, 2)

    Array.from({ length: todoCount }).forEach((_, j) => {
      const id = generateToken()
      const time = getRandomInt(450, 60 * 60 * 1)
      curr[id] = {
        id,
        created_at: subDays(new Date(), i),
        description: faker.lorem.lines({ min: 2, max: 3 }),
        estimatedTime: time,
        order: j + 1,
        overTime: 0,
        timeLeft: time,
        type: 'todo',
      }
    })

    Array.from({ length: doneCount + doingCount }).forEach((_, j) => {
      const id = generateToken()
      const estimatedTime = getRandomInt(450, 60 * 60 * 1)
      const timeTaken = getRandomInt(estimatedTime / 1.2, estimatedTime * 1.1)

      let timeLeft = estimatedTime - timeTaken
      const overTime = timeLeft > 0 ? 0 : Math.abs(timeLeft)
      if (overTime !== 0) timeLeft = 0

      curr[id] = {
        id,
        created_at: subDays(new Date(), i),
        description: faker.lorem.lines({ min: 2, max: 3 }),
        order: j + 1,
        type: j < doneCount ? 'done' : 'doing',
        estimatedTime,
        overTime,
        timeLeft,
      }
    })

    return curr
  }, {})
