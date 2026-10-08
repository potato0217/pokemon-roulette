import { CardAction, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { IconRefresh, IconAdjustments } from '@tabler/icons-react'
import useSetupStore from '@/stores/useSetupStore'

const SetupTitle = () => {
  const { reset } = useSetupStore()

  return (
    <CardHeader>
      <CardTitle>
        <div className="flex items-center">
          <IconAdjustments className="size-6 text-primary mr-[0.4rem]" />
          참가자 설정
        </div>
      </CardTitle>
      <CardDescription>참가자와 추첨 설정을 변경할 수 있습니다.</CardDescription>
      <CardAction>
        <Button
          variant="secondary"
          size="lg"
          onClick={() => reset()}
        >
          <IconRefresh />
          설정 초기화
        </Button>
      </CardAction>
    </CardHeader>
  )
}

export default SetupTitle