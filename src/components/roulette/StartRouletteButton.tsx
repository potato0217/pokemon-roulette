import { IconReload } from '@tabler/icons-react'
import { Button } from '@/components/ui/Button'
import useScreenStore, { ScreenType } from '@/stores/useScreenStore'
import useResultStore from '@/stores/useResultStore'

type StartRouletteButtonProps = {
  className?: string
  iconClassName?: string
  iconStroke?: number
}

const StartRouletteButton = ({
  className,
  iconClassName,
  iconStroke = 2
}: StartRouletteButtonProps) => {
  const setShowScreen = useScreenStore((state) => state.setShowScreen)
  const getResult = useResultStore(state => state.getResult)

  const onClickStart = () => {
    getResult()
    setShowScreen(ScreenType.Result)
  }

  return (
    <Button
      className={className}
      onClick={() => onClickStart()}
    >
      <IconReload className={iconClassName} stroke={iconStroke} />
      룰렛 돌리기
    </Button>
  )
}

export default StartRouletteButton
