import { IconCirclePlus } from '@tabler/icons-react'
import { Button } from '@/components/ui/Button'
import useSetupStore from '@/stores/useSetupStore'

const SetupUserItemAdd = () => {
  const addUser = useSetupStore(state => state.addUser)

  return (
    <div className="mx-6">
      <Button
        className="w-full h-16 border-2 border-dashed border-muted hover:bg-background hover:text-primary hover:border-primary"
        variant="ghost"
        onClick={() => addUser()}
      >
        <IconCirclePlus/>
        참가자 추가
      </Button>
    </div>
  )
}

export default SetupUserItemAdd
