import { ThemeProvider } from "styled-components"
import { GlobalStyle } from "./styles/global"
import { defaultTheme } from "./styles/themes/default"

export function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <h1>It's alive</h1>

      <GlobalStyle />
    </ThemeProvider>
  )
}
