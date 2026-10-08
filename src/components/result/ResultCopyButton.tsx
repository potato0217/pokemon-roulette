import useResultStore from '@/stores/useResultStore'
import { cn } from 'cn'
import { IconCopy } from '@tabler/icons-react'
import { Button } from '@/components/ui/Button'
import { GENERATIONS, POKEMON_TYPES } from '@/domain/Pokemon'

const ResultCopyButton = () => {
  const hasResultList = useResultStore(state => state.resultList.length > 0)

  const copyResult = () => {
    const { resultList } = useResultStore.getState()
    const copyText: string[] = []

    resultList.forEach(({ name, types, generations }) => {
      copyText.push(name)
      copyText.push(`- 타입 : [${types.map(id => POKEMON_TYPES.find(value => value.id === id)?.name).join(', ')}]`)
      copyText.push(`- 세대 : [${generations.map(id => GENERATIONS.find(value => value.id === id)?.subname).join(', ')}]`)
      copyText.push("")
    })


    navigator.clipboard.writeText(copyText.join('\n'))
  }

  return (
    <Button
      className={cn(hasResultList ? "" : "opacity-50 pointer-events-none select-none")}
      variant="secondary"
      size="lg"
      onClick={() => copyResult()}
    >
      <IconCopy />
      결과 복사
    </Button>
  )
}

export default ResultCopyButton
