import { create } from 'zustand'
import { startPokemonRoulette } from '@/lib/PokemonRoulette'

export type Result = {
  id: string
  name: string
  types: string[]
  generations: string[]
}

type ResultList = {
  resultList: Result[]
}

const initResultList: ResultList = {
  resultList: [],
}

type ResultState = typeof initResultList & {
  getResult: () => void
}

const useResultStore = create<ResultState>()(
  (set) => ({
    ...initResultList,
    getResult: () => set(
      () => ({ resultList: startPokemonRoulette() })
    ),
  })
)

export default useResultStore
