import {
  CountdownContainer,
  ColonContainer,
  FormContainer,
  HomeContainer,
  ProjectNameInput,
  ProjectTimeInput,
  StartCountdownButton,
  StopCountdownButton,
} from './styles'

import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { HandPalm, Play } from '@phosphor-icons/react'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'

const projectFormValidationSchema = zod.object({
  projectName: zod.string().min(1, 'Enter project name'),
  projectTimerInMinutes: zod.number().min(5).max(60),
})

type ProjectFormType = zod.infer<typeof projectFormValidationSchema>

interface ProjectModel {
  id: string
  projectName: string
  projectTimerInMinutes: number
  abortedDate?: Date
}

export function Home() {
  const [projects, setProjects] = useState<ProjectModel[]>([])
  const [activeProjectId, setActiveProjectId] = useState<string | null>(null)
  const [timePassedInSeconds, setTimePassedInSeconds] = useState(0)

  const { register, handleSubmit, watch, reset } = useForm<ProjectFormType>({
    resolver: zodResolver(projectFormValidationSchema),
    defaultValues: {
      projectName: '',
      projectTimerInMinutes: 0,
    },
  })

  function handleCreateNewProjectTimer(data: ProjectFormType) {
    const id = String(new Date().getTime())

    const newProject: ProjectModel = {
      id,
      projectName: data.projectName,
      projectTimerInMinutes: data.projectTimerInMinutes,
    }
    setProjects((state) => [...state, newProject])
    setActiveProjectId(id)
    setTimePassedInSeconds(0)

    reset()
  }

  function handleStopCountdown() {
    setProjects(
      projects.map((project) => {
        if (project.id === activeProjectId) {
          return { ...project, abortedDate: new Date() }
        } else {
          return project
        }
      }),
    )
    setActiveProjectId(null)
  }

  const activeProject = projects.find(
    (project) => project.id === activeProjectId,
  )

  const totalTimeInSeconds = activeProject
    ? 60 * activeProject.projectTimerInMinutes
    : 0

  const remainderTimeInSeconds = activeProject
    ? totalTimeInSeconds - timePassedInSeconds
    : 0

  useEffect(() => {
    let interval: number
    if (activeProject) {
      interval = setInterval(() => {
        setTimePassedInSeconds((state) => state + 1)
      }, 1000)
    }
    return () => {
      clearInterval(interval)
    }
  }, [activeProject])

  const timeInMinutes = Math.floor(remainderTimeInSeconds / 60)
  const timeInSeconds = remainderTimeInSeconds % 60

  const timeInMinutesToDisplay = String(timeInMinutes).padStart(2, '0')
  const timeInSecondsToDisplay = String(timeInSeconds).padStart(2, '0')

  useEffect(() => {
    if (activeProject) {
      document.title = `${timeInMinutesToDisplay}:${timeInSecondsToDisplay}`
    }
  }, [activeProject, timeInMinutesToDisplay, timeInSecondsToDisplay])

  const projectName = watch('projectName')
  const isSubmitDisabled = !projectName

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewProjectTimer)} action="">
        <FormContainer>
          <label htmlFor="projectName">Gonna work on</label>
          <ProjectNameInput
            id="projectName"
            list="namingProjectsSuggestions"
            placeholder="Give your project a name"
            disabled={!!activeProject}
            {...register('projectName')}
          />

          <datalist id="namingProjectsSuggestions"></datalist>

          <label htmlFor="projectTimerInMinutes">for</label>
          <ProjectTimeInput
            id="projectTimerInMinutes"
            type="number"
            placeholder="00"
            disabled={!!activeProject}
            step={5}
            min={5}
            max={60}
            {...register('projectTimerInMinutes', { valueAsNumber: true })}
          />
          <span>minutes</span>
        </FormContainer>
        <CountdownContainer>
          <span>{timeInMinutesToDisplay[0]}</span>
          <span>{timeInMinutesToDisplay[1]}</span>
          <ColonContainer>:</ColonContainer>
          <span>{timeInSecondsToDisplay[0]}</span>
          <span>{timeInSecondsToDisplay[1]}</span>
        </CountdownContainer>
        {!activeProject ? (
          <StartCountdownButton disabled={isSubmitDisabled} type="submit">
            <Play size={24} />
            Start
          </StartCountdownButton>
        ) : (
          <StopCountdownButton onClick={handleStopCountdown} type="button">
            <HandPalm size={24} />
            Stop
          </StopCountdownButton>
        )}
      </form>
    </HomeContainer>
  )
}
