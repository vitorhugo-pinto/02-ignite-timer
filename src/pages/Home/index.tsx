import { Play } from '@phosphor-icons/react'
import {
  HomeContainer,
  FormContainer,
  CountdownContainer,
  ColonContainer,
} from './styles'

export function Home() {
  return (
    <HomeContainer>
      <form action="">
        <FormContainer>
          <label htmlFor="project-name">Gonna work on</label>
          <input id="project-name" />

          <label htmlFor="project-time-minutes">for</label>
          <input id="project-time-minutes" />
          <span>minutes</span>
        </FormContainer>
        <CountdownContainer>
          <span>0</span>
          <span>0</span>
          <ColonContainer>:</ColonContainer>
          <span>0</span>
          <span>0</span>
        </CountdownContainer>
        <button type="submit">
          <Play size={24} />
          Start
        </button>
      </form>
    </HomeContainer>
  )
}
