export type TimeString = `${number}:${number}:${number}`

export const secondsToHHMMSS = (seconds: number) => {
  const hours: number = Math.floor(seconds / (60 * 60))
  const minutes: number = Math.floor(seconds / 60) % 60
  seconds = seconds % 60

  // give the 0 padding to time segment which is less than 10
  const time = [hours, minutes, seconds].map((segment) => (segment < 10 ? '0' + segment.toString() : segment)).join(':')

  return time as TimeString
}

export const HHMMSSToSeconds = (timeString: TimeString) => {
  const timeChunks = timeString.split(':').map((timeChunk) => +timeChunk)

  if (timeChunks.length > 3 || timeChunks.includes(NaN)) {
    console.error('time string not in correct format')

    return undefined
  }

  while (timeChunks.length < 3) {
    timeChunks.unshift(0)
  }

  const [hours, minutes, seconds] = timeChunks

  // prettier-ignore
  const totalSeconds = (hours! * 60 * 60) + (minutes! * 60) + seconds!

  return totalSeconds
}

export const getHistoryParam = () => {
  const urlSearchParams = new URLSearchParams(window.location.search)
  const { h } = Object.fromEntries(urlSearchParams.entries())

  return h
}

export const generateToken = () => {
  return Math.random().toString(36).substring(2)
}

export function getRandomInt(min: number, max: number) {
  min = Math.ceil(min)
  max = Math.floor(max)

  return Math.floor(Math.random() * (max + 1 - min) + min)
}

export function sleep(dur?: number) {
  return new Promise((res) => setTimeout(() => res('done'), dur || 1000))
}
