import { ProjectsActionTypes } from './actions'

export interface IProjectModel {
  id: string
  projectName: string
  projectTimerInMinutes: number
  startedAt: Date
  abortedDate?: Date
  finishedDate?: Date
}

interface IProjectsState {
  projects: IProjectModel[]
  activeProjectId: string | null
}

export function projectsReducer(state: IProjectsState, action: any) {
  const { type, payload } = action

  switch (type) {
    case ProjectsActionTypes.CREATE_NEW_PROJECT:
      return {
        ...state,
        projects: [...state.projects, payload.newProject],
        activeProjectId: payload.newProject.id,
      }
    case ProjectsActionTypes.ABORT_PROJECT:
      return {
        ...state,
        projects: state.projects.map((project) => {
          if (project.id === state.activeProjectId) {
            return { ...project, abortedDate: new Date() }
          } else {
            return project
          }
        }),
        activeProjectId: null,
      }
    case ProjectsActionTypes.FINISHED_PROJECT:
      return {
        ...state,
        projects: state.projects.map((project) => {
          if (project.id === state.activeProjectId) {
            return { ...project, finishedDate: new Date() }
          } else {
            return project
          }
        }),
        activeProjectId: null,
      }
    default:
      return state
  }
}
