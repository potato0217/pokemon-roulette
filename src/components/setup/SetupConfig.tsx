import { CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Switch } from '@/components/ui/Switch'
import SetupConfigItem from '@/components/setup/SetupConfigItem'
import useSetupStore, { DEFAULT_MAX_USERS, LIMIT_MAX_TYPE } from '@/stores/useSetupStore'
import { IconPlus, IconMinus } from '@tabler/icons-react'
import * as React from 'react'
import { GENERATIONS } from '@/domain/Pokemon'
import { useShallow } from 'zustand/react/shallow'

const SetupConfig = () => {
  const {
    users,
    maxGeneration,
    maxType,
    allowTypeDuplication,
    addUser,
    popUser,
    setAllowTypeDuplication,
    setMaxGeneration,
    decreaseMaxGeneration,
    increaseMaxGeneration,
    setMaxType,
    decreaseMaxType,
    increaseMaxType,
  } = useSetupStore(
    useShallow(state => ({
      users: state.users,
      maxGeneration: state.maxGeneration,
      maxType: state.maxType,
      allowTypeDuplication: state.allowTypeDuplication,
      addUser: state.addUser,
      popUser: state.popUser,
      setAllowTypeDuplication: state.setAllowTypeDuplication,
      setMaxGeneration: state.setMaxGeneration,
      decreaseMaxGeneration: state.decreaseMaxGeneration,
      increaseMaxGeneration: state.increaseMaxGeneration,
      setMaxType: state.setMaxType,
      decreaseMaxType: state.decreaseMaxType,
      increaseMaxType: state.increaseMaxType,
    }))
  )

  const onChangeMember = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.target.value)
    if (!isNaN(value) && value > 0) {
      let repeatCount: number
      if (value < DEFAULT_MAX_USERS) {
        repeatCount = value
      } else {
        repeatCount = DEFAULT_MAX_USERS
      }

      if (users.length > repeatCount) {
        for (let i = 0; i < users.length - repeatCount; i++) {
          popUser()
        }
      } else {
        for (let i = users.length; i < repeatCount; i++) {
          addUser()
        }
      }
    }
  }

  const onChangeMaxGeneration = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.target.value)
    if (!isNaN(value) && value > 0) {
      setMaxGeneration(value < GENERATIONS.length ? value : GENERATIONS.length)
    }
  }

  const onChangeMaxType = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.target.value)
    if (!isNaN(value) && value > 0) {
      setMaxType(value)
    }
  }

  return (
    <CardContent className="flex flex-col gap-4">
      <SetupConfigItem
        title="참가 인원"
        subtitle={`최대 ${DEFAULT_MAX_USERS}명`}
      >
        <Button
          variant="outline"
          size="icon"
          onClick={() => popUser()}
        >
          <IconMinus />
        </Button>
        <Input
          className="w-12"
          id="input-member"
          type="number"
          min="1"
          max={DEFAULT_MAX_USERS}
          value={users.length}
          onChange={event => onChangeMember(event)}
        />
        <Button
          variant="outline"
          size="icon"
          onClick={addUser}
        >
          <IconPlus />
        </Button>
      </SetupConfigItem>
      <SetupConfigItem
        title="세대 수"
        subtitle={`최대 ${GENERATIONS.length}개`}
      >
        <Button
          variant="outline"
          size="icon"
          onClick={() => decreaseMaxGeneration()}
        >
          <IconMinus />
        </Button>
        <Input
          className="w-12"
          id="input-max-generation"
          type="number"
          min="1"
          max={GENERATIONS.length}
          value={maxGeneration}
          onChange={event => onChangeMaxGeneration(event)}
        />
        <Button
          variant="outline"
          size="icon"
          onClick={() => increaseMaxGeneration()}
        >
          <IconPlus />
        </Button>
      </SetupConfigItem>
      <SetupConfigItem
        title="타입 수"
        subtitle={`최대 ${LIMIT_MAX_TYPE}개`}
      >
        <Button
          variant="outline"
          size="icon"
          onClick={() => decreaseMaxType()}
        >
          <IconMinus />
        </Button>
        <Input
          className="w-12"
          id="input-max-type"
          type="number"
          min="1"
          max={LIMIT_MAX_TYPE}
          value={maxType}
          onChange={event => onChangeMaxType(event)}
        />
        <Button
          variant="outline"
          size="icon"
          onClick={() => increaseMaxType()}
        >
          <IconPlus />
        </Button>
      </SetupConfigItem>
      <SetupConfigItem title="타입 중복 허용">
        <Switch
          id="switch-dup-type"
          size="default"
          checked={allowTypeDuplication}
          onCheckedChange={(checked) => setAllowTypeDuplication(checked)}
        />
      </SetupConfigItem>
    </CardContent>
  )
}

export default SetupConfig
