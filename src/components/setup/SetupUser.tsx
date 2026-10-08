import useSetupStore from '@/stores/useSetupStore'
import SetupUserItem from '@/components/setup/SetupUserItem'
import SetupUserItemAdd from '@/components/setup/SetupUserItemAdd'
import { useShallow } from 'zustand/react/shallow'

const SetupUser = () => {
  const userIds = useSetupStore(
    useShallow((state) => state.users.map((u) => u.id))
  )

  return (
    <div className="flex flex-col gap-6">
      {userIds.map((id, idx) =>
        <SetupUserItem
          key={id}
          id={id}
          index={idx}
        />
      )}
      <SetupUserItemAdd />
    </div>
  )
}

export default SetupUser
