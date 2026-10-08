import { cn } from 'cn'
import { Card, CardAction, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Separator } from '@/components/ui/Separator'
import { Button } from '@/components/ui/Button'
import { Label } from '@/components/ui/Label'
import { Input } from '@/components/ui/Input'
import useSetupStore from '@/stores/useSetupStore'
import * as React from 'react'
import { GENERATIONS } from '@/domain/Pokemon'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/ToggleGroup.tsx'
import { useShallow } from 'zustand/react/shallow'

type SetupUserItemProps = {
  id: string
  index: number
}

const SetupUserItem = ({ id, index }: SetupUserItemProps) => {
  const user = useSetupStore(state => (state.users ?? []).find(u => u.id === id))
  const isOnlyOneUser = useSetupStore((state) => state.users.length <= 1)

  const {
    deleteUser,
    updateUser,
  }= useSetupStore(
    useShallow(state => ({
      deleteUser: state.deleteUser,
      updateUser: state.updateUser,
    }))
  )

  const onClickReset = () => {
    if (!user) {
      return
    }

    updateUser({
      id: user.id,
      name: user.name,
      excludeGeneration: [],
    })
  }

  const onChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!user) {
      return
    }

    updateUser({
      id: user.id,
      name: e.target.value || '',
      excludeGeneration: user.excludeGeneration,
    })
  }

  const onValueChangeExcludeGeneration = (value: string[]) => {
    if (!user) {
      return
    }

    updateUser({
      id: user.id,
      name: user.name,
      excludeGeneration: value,
    })
  }

  return (
    <Card className={cn("mx-6 shadow-none rounded-xl bg-(--page-background) border")}>
      <CardHeader>
        <CardTitle className="flex gap-4 items-center">
          <Label className="rounded-full text-primary bg-primary/10 font-bold px-3 py-2">
            {index+1}
          </Label>
          <Input
            className="md:w-2/3 w-full bg-background ring-1 ring-foreground/5"
            placeholder={`참가자 ${index+1}`} value={user?.name}
            onChange={(e) => onChangeName(e)}
          />
        </CardTitle>
        <CardAction>
          <Button
            variant="ghost"
            disabled={user?.excludeGeneration.length === 0}
            onClick={() => onClickReset()}
          >
            제외 해제
          </Button>
          <Button
            className="text-accent-foreground hover:text-accent-foreground"
            variant="ghost"
            disabled={isOnlyOneUser}
            onClick={() => deleteUser(id)}
          >
            삭제
          </Button>
        </CardAction>
      </CardHeader>
      <Separator className="mx-6 -mt-1" />
      <CardContent>
        <div className="grid grid-cols-2">
          <div className="col-span-1">
            <Label className="text-muted-foreground font-bold">제외할 세대</Label>
          </div>
          <div className="flex col-span-1 justify-end gap-1">
            <Label className="text-muted-foreground">
              남은 세대
            </Label>
            <Label className="font-bold">
              {`${GENERATIONS.length - (user ? user.excludeGeneration.length : 0)}개`}
            </Label>
          </div>
        </div>
        <ToggleGroup
          className="flex-wrap pt-3"
          variant="outline"
          multiple
          value={user?.excludeGeneration}
          onValueChange={value => onValueChangeExcludeGeneration(value)}
        >
          {GENERATIONS.map(({ id, name }) => (
            <ToggleGroupItem
              className="bg-background aria-pressed:line-through"
              key={id || "null"}
              value={id || "null"}
            >
              {name}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      </CardContent>
    </Card>
  )
}

export default SetupUserItem
