import { Play } from '@phosphor-icons/react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'

import {
  HomeContainer,
  FormContainer,
  CountdownContainer,
  ColonContainer,
  StartCountdownButton,
  ProjectNameInput,
  ProjectTimeInput,
} from './styles'

const projectFormValidationSchema = zod.object({
  projectName: zod.string().min(1, 'Enter project name'),
  projectTimerInMinutes: zod.number().min(5).max(60),
})

type ProjectFormData = zod.infer<typeof projectFormValidationSchema>

export function Home() {
  const { register, handleSubmit, watch, reset } = useForm<ProjectFormData>({
    resolver: zodResolver(projectFormValidationSchema),
    defaultValues: {
      projectName: '',
      projectTimerInMinutes: 0,
    },
  })

  function handleCreateNewProjectTimer(data: ProjectFormData) {
    console.log(data)
    reset()
  }

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
            {...register('projectName')}
          />

          <datalist id="namingProjectsSuggestions"></datalist>

          <label htmlFor="projectTimerInMinutes">for</label>
          <ProjectTimeInput
            id="projectTimerInMinutes"
            type="number"
            placeholder="00"
            step={5}
            min={5}
            max={60}
            {...register('projectTimerInMinutes', { valueAsNumber: true })}
          />
          <span>minutes</span>
        </FormContainer>
        <CountdownContainer>
          <span>0</span>
          <span>0</span>
          <ColonContainer>:</ColonContainer>
          <span>0</span>
          <span>0</span>
        </CountdownContainer>
        <StartCountdownButton disabled={isSubmitDisabled} type="submit">
          <Play size={24} />
          Start
        </StartCountdownButton>
      </form>
    </HomeContainer>
  )
}
