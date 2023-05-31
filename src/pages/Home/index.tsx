import { Play } from '@phosphor-icons/react'
import { useForm } from 'react-hook-form'

import {
  HomeContainer,
  FormContainer,
  CountdownContainer,
  ColonContainer,
  StartCountdownButton,
  ProjectNameInput,
  ProjectTimeInput,
} from './styles'

interface IProjectInputs {
  projectName: string
  projectTimerInMinutes: number
}

export function Home() {
  const { register, handleSubmit, watch } = useForm<IProjectInputs>()

  function handleCreateNewProjectTimer(data: IProjectInputs) {
    console.log(data)
    console.log(data.projectName)
    console.log(data.projectTimerInMinutes)
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

          <datalist id="namingProjectsSuggestions">
            <option value="Name 1" />
            <option value="Name 2" />
            <option value="Name 3" />
          </datalist>

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
