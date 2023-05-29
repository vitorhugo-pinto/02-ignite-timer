import { HistoryContainer, HistoryList, Status } from './styles'

export function History() {
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
            <tr>
              <td>Fixing technical debts</td>
              <td>25 minutes</td>
              <td>About two moths ago</td>
              <td>
                <Status status="done">Done</Status>
              </td>
            </tr>
            <tr>
              <td>Fixing technical debts</td>
              <td>25 minutes</td>
              <td>About two moths ago</td>
              <td>
                <Status status="done">Done</Status>
              </td>
            </tr>
            <tr>
              <td>Fixing technical debts</td>
              <td>25 minutes</td>
              <td>About two moths ago</td>
              <td>
                <Status status="done">Done</Status>
              </td>
            </tr>
            <tr>
              <td>Fixing technical debts</td>
              <td>25 minutes</td>
              <td>About two moths ago</td>
              <td>
                <Status status="onGoing">On going</Status>
              </td>
            </tr>
            <tr>
              <td>Fixing technical debts</td>
              <td>25 minutes</td>
              <td>About two moths ago</td>
              <td>
                <Status status="aborted">Done</Status>
              </td>
            </tr>
          </tbody>
        </table>
      </HistoryList>
    </HistoryContainer>
  )
}
