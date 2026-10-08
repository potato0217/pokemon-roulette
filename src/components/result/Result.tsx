import useResultStore from '@/stores/useResultStore'
import ResultEmpty from '@/components/result/ResultEmpty'
import ResultList from '@/components/result/ResultList'
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { IconTrophy } from '@tabler/icons-react'
import ResultCopyButton from '@/components/result/ResultCopyButton'
import StartRouletteButton from '@/components/roulette/StartRouletteButton'
import { Separator } from '@/components/ui/Separator'

const Result = () => {
  const hasResultList = useResultStore(state => state.resultList.length > 0)

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <div className="flex items-center">
            <IconTrophy className="size-6 text-primary mr-[0.4rem]" />
            추첨 결과
          </div>
        </CardTitle>
        <CardDescription></CardDescription>
        <CardAction className="flex gap-2">
          <ResultCopyButton />
          <StartRouletteButton/>
        </CardAction>
      </CardHeader>
      <Separator className="mx-6 -mt-1" />
      <CardContent>
        { hasResultList ? <ResultList /> : <ResultEmpty /> }
      </CardContent>
    </Card>
  )
}

export default Result
