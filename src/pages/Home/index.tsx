import { Play } from '@phosphor-icons/react'
import {
  HomeContainer,
  FormContainer,
  CountdownContainer,
  ColonContainer,
  StartCountdownButton,
  ProjectNameInput,
  ProjectTimeInput,
} from './styles'

export function Home() {
  return (
    <HomeContainer>
      <form action="">
        <FormContainer>
          <label htmlFor="project-name">Gonna work on</label>
          <ProjectNameInput
            id="project-name"
            list="naming-projects-suggestions"
            placeholder="Give your project a name"
          />

          <datalist id="naming-projects-suggestions">
            <option value="Name 1" />
            <option value="Name 2" />
            <option value="Name 3" />
          </datalist>

          <label htmlFor="project-time-minutes">for</label>
          <ProjectTimeInput
            id="project-time-minutes"
            type="number"
            placeholder="00"
            step={5}
            min={5}
            max={60}
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
        <StartCountdownButton type="submit">
          <Play size={24} />
          Start
        </StartCountdownButton>
      </form>
    </HomeContainer>
  )
}
