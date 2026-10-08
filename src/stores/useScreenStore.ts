import { create } from 'zustand'

export const ScreenType = {
  Setup: 'setup',
  Result: 'result',
} as const

export type ScreenType = typeof ScreenType[keyof typeof ScreenType]

const DEFAULT_SHOW_SCREEN = ScreenType.Setup

type Screen = {
  showScreen: ScreenType
}

const initScreen: Screen = {
  showScreen: DEFAULT_SHOW_SCREEN,
}

type ScreenState = typeof initScreen & {
  setShowScreen: (showScreen: ScreenType) => void
}

const useScreenStore = create<ScreenState>()(
  (set) => ({
    ...initScreen,
    setShowScreen: (showScreen) => set({ showScreen }),
  })
)

export default useScreenStore
