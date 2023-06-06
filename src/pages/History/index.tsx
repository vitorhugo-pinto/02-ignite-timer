import { useContext } from 'react'
import { formatDistanceToNow } from 'date-fns'
import { HistoryContainer, HistoryList, Status } from './styles'
import { ProjectsContext } from '../../contexts/ProjectsContext'

export function History() {
  const { projects } = useContext(ProjectsContext)
  return (
    <HistoryContainer>
      <h1>History</h1>

      <HistoryList>
        <table>
          <thead>
            <tr>
              <th>Project</th>
              <th>Time</th>
              <th>Started at</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project) => {
              return (
                <tr key={project.id}>
                  <td>{project.projectName}</td>
                  <td>{project.projectTimerInMinutes} minutes</td>
                  <td>
                    {formatDistanceToNow(project.startedAt, {
                      addSuffix: true,
                    })}
                  </td>
                  <td>
                    {project.finishedDate && (
                      <Status status="done">Done</Status>
                    )}
                    {project.abortedDate && (
                      <Status status="aborted">Aborted</Status>
                    )}
                    {!project.finishedDate && !project.abortedDate && (
                      <Status status="onGoing">On going</Status>
                    )}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </HistoryList>
    </HistoryContainer>
  )
}
