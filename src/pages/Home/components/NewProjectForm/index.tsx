import { FormContainer, ProjectNameInput, ProjectTimeInput } from './styles'

import { useContext } from 'react'
import { ProjectsContext } from '../../../../contexts/ProjectsContext'
import { useFormContext } from 'react-hook-form'

export function NewProjectForm() {
  const { activeProject } = useContext(ProjectsContext)
  const { register } = useFormContext()

  return (
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
  )
}
