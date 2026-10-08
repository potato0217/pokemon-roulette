import { Card } from '@/components/ui/Card'
import { Separator } from '@/components/ui/Separator'
import SetupTitle from '@/components/setup/SetupTitle'
import SetupConfig from '@/components/setup/SetupConfig'
import SetupUser from '@/components/setup/SetupUser'
import StartRouletteButton from '@/components/roulette/StartRouletteButton.tsx'

const Setup = () => {
  return (
    <>
      <Card>
        <SetupTitle />
        <Separator className="mx-6" />
        <SetupConfig />
        <Separator className="mx-6" />
        <SetupUser />
      </Card>
      <div className="flex justify-center pt-8">
        <StartRouletteButton
          className="w-50 h-16 text-1xl font-semibold gap-4 text-center shadow-md"
          iconClassName="size-6"
          iconStroke={2.5}
        />
      </div>
    </>
  )
}

export default Setup
