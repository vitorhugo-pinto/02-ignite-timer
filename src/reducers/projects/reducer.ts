import { ProjectsActionTypes } from './actions'
import { produce } from 'immer'

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
      return produce(state, (draft) => {
        draft.projects.push(payload.newProject)
        draft.activeProjectId = payload.newProject.id
      })
    // return {
    //   ...state,
    //   projects: [...state.projects, payload.newProject],
    //   activeProjectId: payload.newProject.id,
    // }
    case ProjectsActionTypes.ABORT_PROJECT: {
      const currentProjectIndex = state.projects.findIndex((project) => {
        return project.id === state.activeProjectId
      })
      if (currentProjectIndex === -1) return state
      return produce(state, (draft) => {
        draft.activeProjectId = null
        draft.projects[currentProjectIndex].abortedDate = new Date()
      })
    }
    // return {
    //   ...state,
    //   projects: state.projects.map((project) => {
    //     if (project.id === state.activeProjectId) {
    //       return { ...project, abortedDate: new Date() }
    //     } else {
    //       return project
    //     }
    //   }),
    //   activeProjectId: null,
    // }
    case ProjectsActionTypes.FINISHED_PROJECT: {
      const currentProjectIndex = state.projects.findIndex((project) => {
        return project.id === state.activeProjectId
      })
      if (currentProjectIndex === -1) return state
      return produce(state, (draft) => {
        draft.activeProjectId = null
        draft.projects[currentProjectIndex].finishedDate = new Date()
      })
      // return {
      //   ...state,
      //   projects: state.projects.map((project) => {
      //     if (project.id === state.activeProjectId) {
      //       return { ...project, finishedDate: new Date() }
      //     } else {
      //       return project
      //     }
      //   }),
      //   activeProjectId: null,
      // }
    }
    default:
      return state
  }
}
