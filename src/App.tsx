import { ErrorBoundary } from 'react-error-boundary'
import { ThemeProvider } from '@/context/ThemeContext'
import { Page, Header, FallbackComponent } from '@/components/ui/Layout'
import Setup from '@/components/setup/Setup'
import Result from '@/components/result/Result'
import useScreenStore, { ScreenType } from '@/stores/useScreenStore'

function App() {
  const showScreen = useScreenStore((state) => state.showScreen)

  return (
    <ThemeProvider
      defaultTheme="light"
      storageKey="vite-ui-theme"
    >
      <Header />
      <Page>
        <ErrorBoundary FallbackComponent={FallbackComponent}>
          {showScreen === ScreenType.Setup ? <Setup /> : <Result />}
        </ErrorBoundary>
      </Page>
    </ThemeProvider>
  )
}

export default App
