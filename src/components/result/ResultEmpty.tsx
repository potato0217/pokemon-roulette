import { Label } from '@/components/ui/Label'
import { IconRoulette } from '@tabler/icons-react'

const ResultEmpty = () => {
  return (
    <div className="flex flex-col gap-5">
      <div className="mx-auto w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
        <IconRoulette className="w-3/5 h-3/5 text-primary" stroke={1.5} />
      </div>
      <div>
        <Label className="font-bold text-lg justify-center">
          진행된 추첨이 없습니다
        </Label>
        <Label className="text-sm text-muted-foreground justify-center">
          룰렛을 돌려주세요
        </Label>
      </div>
    </div>
  )
}

export default ResultEmpty
