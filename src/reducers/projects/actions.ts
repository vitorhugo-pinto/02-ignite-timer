import { IProjectModel } from './reducer'

export enum ProjectsActionTypes {
  CREATE_NEW_PROJECT = 'CREATE_NEW_PROJECT',
  FINISHED_PROJECT = 'FINISHED_PROJECT',
  ABORT_PROJECT = 'ABORT_PROJECT',
}

export function createNewProjectAction(newProject: IProjectModel) {
  return {
    type: ProjectsActionTypes.CREATE_NEW_PROJECT,
    payload: {
      newProject,
    },
  }
}

export function abortCurrentProjectAction() {
  return {
    type: ProjectsActionTypes.ABORT_PROJECT,
  }
}

export function setCurrentProjectAsFinishedAction() {
  return {
    type: ProjectsActionTypes.FINISHED_PROJECT,
  }
}
