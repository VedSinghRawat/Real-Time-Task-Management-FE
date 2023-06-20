export const secondsToHHMMSS = (seconds: number) => {
  const hours: number = Math.floor(seconds / (60 * 60))
  const minutes: number = Math.floor(seconds / 60) % 60
  seconds = seconds % 60

  // give the 0 padding to time segment which is less than 10
  const time = [hours, minutes, seconds].map((segment) => (segment < 10 ? '0' + segment.toString() : segment)).join(':')

  return time
}

export const HHMMSSToSeconds = (timeString: string) => {
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
  const totalSeconds = (hours * 60 * 60) + (minutes * 60) + seconds

  return totalSeconds
}
