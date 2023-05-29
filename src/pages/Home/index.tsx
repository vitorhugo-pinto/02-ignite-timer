import { Play } from '@phosphor-icons/react'
import {
  HomeContainer,
  FormContainer,
  CountdownContainer,
  ColonContainer,
  StartCountdownButton,
} from './styles'

export function Home() {
  return (
    <HomeContainer>
      <form action="">
        <FormContainer>
          <label htmlFor="project-name">Gonna work on</label>
          <input id="project-name" />

          <label htmlFor="project-time-minutes">for</label>
          <input id="project-time-minutes" type="number" />
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
