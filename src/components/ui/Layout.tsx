import type { FallbackProps } from 'react-error-boundary'
import * as React from 'react'
import { ModeToggle } from '@/components/ui/ModeToggle'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/Tabs'
import { IconAdjustments, IconTrophy } from '@tabler/icons-react'
import useScreenStore, { ScreenType } from "@/stores/useScreenStore.ts";

type PageProps = React.HTMLAttributes<HTMLDivElement> & {
  children?: React.ReactNode
}

const FallbackComponent = ({ error, resetErrorBoundary }: FallbackProps) => {
  const errorMessage = error instanceof Error ? error.message : String(error)

  return (
    <>
      <div>
        <h1>예상치 못한 오류가 발생했습니다.</h1>
        <p>{errorMessage}</p>
        <button onClick={resetErrorBoundary}>다시 시도</button>
      </div>
    </>
  )
}

const Page = ({ children, ...props }: PageProps) => {
  return (
    <div className="w-full max-w-5xl mx-auto py-8 px-6" {...props}>
      {children}
    </div>
  )
}

const Header = () => {
  const showScreen = useScreenStore((state) => state.showScreen)
  const setShowScreen = useScreenStore((state) => state.setShowScreen)

  const onValueChange = (value: ScreenType) => {
    setShowScreen(value)
  }

  return (
    <header className="bg-background border-b border-solid">
      <div className="flex items-center gap-3 w-full max-w-5xl mx-auto py-6 px-6">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">포켓몬 룰렛</h1>
          <p className="text-muted-foreground">포켓몬 세대 · 타입 추첨기</p>
        </div>
        <div className="flex ml-auto gap-3 items-center">
          <Tabs
            value={showScreen}
            onValueChange={value => onValueChange(value)}
          >
            <TabsList>
              <TabsTrigger
                className="gap-1"
                value={ScreenType.Setup}
              >
                <IconAdjustments />
                설정
              </TabsTrigger>
              <TabsTrigger
                className="gap-1"
                value={ScreenType.Result}
              >
                <IconTrophy />
                결과
              </TabsTrigger>
            </TabsList>
          </Tabs>
          <ModeToggle />
        </div>
      </div>
    </header>
  )
}

export {
  FallbackComponent,
  Page,
  Header,
}
