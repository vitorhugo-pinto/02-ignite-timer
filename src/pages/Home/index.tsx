import {
  HomeContainer,
  StartCountdownButton,
  StopCountdownButton,
} from './styles'

import { useContext } from 'react'
import * as zod from 'zod'

import { HandPalm, Play } from '@phosphor-icons/react'
import { NewProjectForm } from './components/NewProjectForm'
import { Countdown } from './components/Countdown'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm } from 'react-hook-form'
import { ProjectsContext } from '../../contexts/ProjectsContext'

const projectFormValidationSchema = zod.object({
  projectName: zod.string().min(1, 'Enter project name'),
  projectTimerInMinutes: zod.number().min(5).max(60),
})

type ProjectFormType = zod.infer<typeof projectFormValidationSchema>

export function Home() {
  const { createNewProject, activeProject, abortCurrentProject } =
    useContext(ProjectsContext)

  const newProjectForm = useForm<ProjectFormType>({
    resolver: zodResolver(projectFormValidationSchema),
    defaultValues: {
      projectName: '',
      projectTimerInMinutes: 0,
    },
  })

  const { handleSubmit, watch, reset } = newProjectForm

  function handleCreateNewProject(data: ProjectFormType) {
    createNewProject(data)
    reset()
  }

  const projectName = watch('projectName')
  const isSubmitDisabled = !projectName

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewProject)} action="">
        <FormProvider {...newProjectForm}>
          <NewProjectForm />
        </FormProvider>
        <Countdown />
        {!activeProject ? (
          <StartCountdownButton disabled={isSubmitDisabled} type="submit">
            <Play size={24} />
            Start
          </StartCountdownButton>
        ) : (
          <StopCountdownButton onClick={abortCurrentProject} type="button">
            <HandPalm size={24} />
            Stop
          </StopCountdownButton>
        )}
      </form>
    </HomeContainer>
  )
}
