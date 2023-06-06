import {
  createContext,
  Dispatch,
  SetStateAction,
  useState,
  ReactNode,
} from 'react'

interface IProjectForm {
  projectName: string
  projectTimerInMinutes: number
}

interface IProjectModel {
  id: string
  projectName: string
  projectTimerInMinutes: number
  startedAt: Date
  abortedDate?: Date
  finishedDate?: Date
}

interface ProjectsContextProps {
  projects: IProjectModel[]
  activeProject: IProjectModel | undefined
  activeProjectId: string | null
  timePassedInSeconds: number
  setTimePassedInSeconds: Dispatch<SetStateAction<number>>
  setCurrentProjectAsFinished: () => void
  createNewProject: (data: IProjectForm) => void
  abortCurrentProject: () => void
}

export const ProjectsContext = createContext({} as ProjectsContextProps)

interface ProjectsContextProviderProps {
  children: ReactNode
}

export function ProjectsContextProvider({
  children,
}: ProjectsContextProviderProps) {
  const [projects, setProjects] = useState<IProjectModel[]>([])
  const [activeProjectId, setActiveProjectId] = useState<string | null>(null)
  const [timePassedInSeconds, setTimePassedInSeconds] = useState(0)

  const activeProject = projects.find(
    (project) => project.id === activeProjectId,
  )

  function setCurrentProjectAsFinished() {
    setProjects((state) =>
      state.map((project) => {
        if (project.id === activeProjectId) {
          return { ...project, finishedDate: new Date() }
        } else {
          return project
        }
      }),
    )
    setActiveProjectId(null)
  }

  function createNewProject(data: IProjectForm) {
    const id = String(new Date().getTime())

    const newProject: IProjectModel = {
      id,
      projectName: data.projectName,
      projectTimerInMinutes: data.projectTimerInMinutes,
      startedAt: new Date(),
    }
    setProjects((state) => [...state, newProject])
    setActiveProjectId(id)
    setTimePassedInSeconds(0)
  }

  function abortCurrentProject() {
    setProjects((state) =>
      state.map((project) => {
        if (project.id === activeProjectId) {
          return { ...project, abortedDate: new Date() }
        } else {
          return project
        }
      }),
    )
    setActiveProjectId(null)
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
