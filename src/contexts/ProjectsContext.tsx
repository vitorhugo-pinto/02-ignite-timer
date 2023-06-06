import {
  createContext,
  Dispatch,
  SetStateAction,
  ReactNode,
  useReducer,
  useState,
} from 'react'
import { IProjectModel, projectsReducer } from '../reducers/projects/reducer'
import {
  abortCurrentProjectAction,
  createNewProjectAction,
  setCurrentProjectAsFinishedAction,
} from '../reducers/projects/actions'

interface IProjectForm {
  projectName: string
  projectTimerInMinutes: number
}

interface IProjectsContextProps {
  projects: IProjectModel[]
  activeProject: IProjectModel | undefined
  activeProjectId: string | null
  timePassedInSeconds: number
  setTimePassedInSeconds: Dispatch<SetStateAction<number>>
  setCurrentProjectAsFinished: () => void
  createNewProject: (data: IProjectForm) => void
  abortCurrentProject: () => void
}

export const ProjectsContext = createContext({} as IProjectsContextProps)

interface IProjectsContextProviderProps {
  children: ReactNode
}

export function ProjectsContextProvider({
  children,
}: IProjectsContextProviderProps) {
  const [projectsSate, dispatch] = useReducer(projectsReducer, {
    projects: [],
    activeProjectId: null,
  })
  const [timePassedInSeconds, setTimePassedInSeconds] = useState(0)

  const { projects, activeProjectId } = projectsSate

  const activeProject = projects.find(
    (project) => project.id === activeProjectId,
  )

  function setCurrentProjectAsFinished() {
    dispatch(setCurrentProjectAsFinishedAction())
  }

  function createNewProject(data: IProjectForm) {
    const id = String(new Date().getTime())

    const newProject: IProjectModel = {
      id,
      projectName: data.projectName,
      projectTimerInMinutes: data.projectTimerInMinutes,
      startedAt: new Date(),
    }
    dispatch(createNewProjectAction(newProject))
    setTimePassedInSeconds(0)
  }

  function abortCurrentProject() {
    dispatch(abortCurrentProjectAction())
  }

  return (
    <ProjectsContext.Provider
      value={{
        projects,
        activeProject,
        activeProjectId,
        setCurrentProjectAsFinished,
        timePassedInSeconds,
        setTimePassedInSeconds,
        createNewProject,
        abortCurrentProject,
      }}
    >
      {children}
    </ProjectsContext.Provider>
  )
}
