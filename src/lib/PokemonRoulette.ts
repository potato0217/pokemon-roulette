import useSetupStore from '@/stores/useSetupStore'
import type { Result } from '@/stores/useResultStore'
import { GENERATIONS, POKEMON_TYPES } from "@/domain/Pokemon.ts";

type DrawOptions<T> = {
  count: number
  allowDuplicates?: boolean
  compareFn?: (a: T, b: T) => number
}

const drawAndSort = <T>(array: T[], options: DrawOptions<T>): T[] => {
  const { count, allowDuplicates = false, compareFn } = options

  if (array.length === 0) return []

  // 중복 불허 시 요청 수량이 배열 크기를 초과하지 않도록 제한
  if (!allowDuplicates && count > array.length) {
    throw new Error(`중복 없이 추첨할 경우, 요청 개수(${count})가 배열 크기(${array.length})보다 클 수 없습니다.`)
  }

  let picked: T[]
  if (allowDuplicates) {
    picked = Array.from({ length: count }, () => array[Math.floor(Math.random() * array.length)])
  } else {
    const shuffled = [...array]
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
    }
    picked = shuffled.slice(0, count)
  }

  return picked.toSorted(compareFn)
}

export const startPokemonRoulette = () => {
  const { users, allowTypeDuplication, maxGeneration, maxType } = useSetupStore.getState()

  const resultList: Result[] = []

  users.forEach(({ id, name, excludeGeneration }, index) => {
    const result: Result = {
      id: id,
      name: name === '' ? `참가자 ${index + 1}` : name,
      types: [],
      generations: [],
    }

    /**
     * 1. 타입의 ID만 추출
     * 2. 제외 세대 필터링 후, 세대의 ID만 추출
     **/
    const types = POKEMON_TYPES.map(({ id }) => id)
    const generations = GENERATIONS.filter( ({ id }) => !excludeGeneration.includes(id) ).map(({ id }) => id)

    /** 6개의 무작위 타입 추출 **/
    result.types = drawAndSort(types, {
      count: maxType,
      allowDuplicates: allowTypeDuplication,
      compareFn: (a, b) => {
        const aSort = POKEMON_TYPES.find(({ id }) => id === a)?.sort ?? 0
        const bSort = POKEMON_TYPES.find(({ id }) => id === b)?.sort ?? 0

        return aSort - bSort
      },
    })

    result.generations = drawAndSort(generations, {
      count: maxGeneration,
      compareFn: (a, b) => {
        const aSort = GENERATIONS.find(({ id }) => id === a)?.sort ?? 0
        const bSort = GENERATIONS.find(({ id }) => id === b)?.sort ?? 0

        return aSort - bSort
      },
    })

    resultList.push(result)
  })

  return resultList
}