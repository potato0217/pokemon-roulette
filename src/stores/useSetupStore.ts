import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { GENERATIONS } from '@/domain/Pokemon'

export const DEFAULT_MIN_USERS = 1
export const DEFAULT_MAX_USERS = 30
export const DEFAULT_MAX_GENERATION = 2
export const DEFAULT_MAX_TYPE = 6
export const LIMIT_MAX_TYPE = 10

type User = {
  id: string
  name: string
  excludeGeneration: string[]
}

type Setup = {
  allowTypeDuplication: boolean
  users: User[]
  maxGeneration: number
  maxType: number
}

const getEmptyUser = () => ({ id: crypto.randomUUID(), name: '', excludeGeneration: [] })

const initSetup: Setup = {
  allowTypeDuplication: true,
  users: [getEmptyUser()],
  maxGeneration: DEFAULT_MAX_GENERATION,
  maxType: DEFAULT_MAX_TYPE,
}

type SetupState = typeof initSetup & {
  /** 참가자 **/
  addUser: () => void
  deleteUser: (id: string) => void
  popUser: () => void
  updateUser: (user: User) => void

  /** 타입 중복 **/
  setAllowTypeDuplication: (allowTypeDuplication: boolean) => void

  /** 세대 수 **/
  setMaxGeneration: (maxGeneration: number) => void
  increaseMaxGeneration: () => void
  decreaseMaxGeneration: () => void

  /** 타입 수 **/
  setMaxType: (maxType: number) => void
  increaseMaxType: () => void
  decreaseMaxType: () => void

  /** 초기화 **/
  reset: () => void
}

const useSetupStore = create<SetupState>()(
  persist(
    (set) => ({
      ...initSetup,

      addUser: () => set((state) => ({ users: (state.users ?? []).length < DEFAULT_MAX_USERS ? [...(state.users ?? []), getEmptyUser()] : (state.users ?? []) })),
      deleteUser: (id: string) => set((state) => ({ users: (state.users ?? []).length > DEFAULT_MIN_USERS ? (state.users ?? []).filter(u => id !== u.id) : (state.users ?? []) })),
      popUser: () => set((state) => ({ users: (state.users ?? []).length > DEFAULT_MIN_USERS ? (state.users ?? []).slice(0, -1) : (state.users ?? []) })),
      updateUser: (user: User) => set((state) => ({ users: (state.users ?? []).map(u => u.id === user.id ? user : u) })),

      setAllowTypeDuplication: (allowTypeDuplication: boolean) => set(() => ({ allowTypeDuplication: allowTypeDuplication })),

      setMaxGeneration: (maxGeneration: number) => set(() => ({ maxGeneration: maxGeneration < GENERATIONS.length ? maxGeneration : GENERATIONS.length })),
      increaseMaxGeneration: () => set((state) => ({ maxGeneration: state.maxGeneration === GENERATIONS.length ? state.maxGeneration : state.maxGeneration + 1 })),
      decreaseMaxGeneration: () => set((state) => ({ maxGeneration: state.maxGeneration === 1 ? state.maxGeneration : state.maxGeneration - 1 })),

      setMaxType: (maxType: number) => set(() => ({ maxType: maxType < LIMIT_MAX_TYPE ? maxType : LIMIT_MAX_TYPE })),
      increaseMaxType: () => set((state) => ({ maxType: state.maxType === LIMIT_MAX_TYPE ? state.maxType : state.maxType + 1 })),
      decreaseMaxType: () => set((state) => ({ maxType: state.maxType === 1 ? state.maxType : state.maxType - 1 })),

      reset: () => set(initSetup),
    }),
    {
      name: 'cobbleverse-pokemon-roulette-setup',
    }
  )
);

export default useSetupStore
