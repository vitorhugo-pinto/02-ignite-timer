import { ProjectsContext } from '../../../../contexts/ProjectsContext'
import { CountdownContainer, ColonContainer } from './styles'

import { useEffect, useContext } from 'react'

export function Countdown() {
  const {
    activeProject,
    setCurrentProjectAsFinished,
    timePassedInSeconds,
    setTimePassedInSeconds,
  } = useContext(ProjectsContext)

  const totalTimeInSeconds = activeProject
    ? 60 * activeProject.projectTimerInMinutes
    : 0

  useEffect(() => {
    let interval: number
    if (activeProject) {
      interval = setInterval(() => {
        setTimePassedInSeconds((state) => state + 1)

        if (timePassedInSeconds >= totalTimeInSeconds) {
          setCurrentProjectAsFinished()
          clearInterval(interval)
        }
      }, 1000)
    }
    return () => {
      clearInterval(interval)
    }
  }, [
    activeProject,
    timePassedInSeconds,
    totalTimeInSeconds,
    setCurrentProjectAsFinished,
    setTimePassedInSeconds,
  ])

  const remainderTimeInSeconds = activeProject
    ? totalTimeInSeconds - timePassedInSeconds
    : 0

  const timeInMinutes = Math.floor(remainderTimeInSeconds / 60)
  const timeInSeconds = remainderTimeInSeconds % 60

  const timeInMinutesToDisplay = String(timeInMinutes).padStart(2, '0')
  const timeInSecondsToDisplay = String(timeInSeconds).padStart(2, '0')

  useEffect(() => {
    if (activeProject) {
      document.title = `${timeInMinutesToDisplay}:${timeInSecondsToDisplay}`
    }
  }, [activeProject, timeInMinutesToDisplay, timeInSecondsToDisplay])

  return (
    <CountdownContainer>
      <span>{timeInMinutesToDisplay[0]}</span>
      <span>{timeInMinutesToDisplay[1]}</span>
      <ColonContainer>:</ColonContainer>
      <span>{timeInSecondsToDisplay[0]}</span>
      <span>{timeInSecondsToDisplay[1]}</span>
    </CountdownContainer>
  )
}
