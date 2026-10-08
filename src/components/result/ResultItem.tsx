import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { cn } from 'cn'
import { Label } from '@/components/ui/Label'
import { Separator } from '@/components/ui/Separator'
import useResultStore from '@/stores/useResultStore'
import { useShallow } from 'zustand/react/shallow'
import { IconMapPin, IconSwords } from '@tabler/icons-react'
import { Badge } from '@/components/ui/Badge'
import { GENERATIONS, POKEMON_TYPES } from '@/domain/Pokemon'

type ResultItemProps = {
  id: string
  index: number
}

const ResultItem = ({ id, index }: ResultItemProps) => {
  const {
    name,
    types,
    generations,
  } = useResultStore(
    useShallow((state) => {
      const item = state.resultList.find((value) => value.id === id)

      return {
        name: item?.name,
        types: item?.types,
        generations: item?.generations,
      }
    })
  )

  return (
    <Card className={cn("shadow-none rounded-xl bg-(--page-background) border")}>
      <CardHeader>
        <CardTitle className="flex gap-4 items-center">
          <Label className="rounded-full text-primary bg-primary/10 font-bold px-3 py-2">
            {index+1}
          </Label>
          <Label className="text-lg">
            {name ? name : `참가자 ${index+1}`}
          </Label>
        </CardTitle>
      </CardHeader>
      <Separator className="mx-6 -mt-1" />
      <CardContent className="flex flex-col gap-5">
        <div className="flex flex-col gap-2">
          <div className="flex gap-2 items-center">
            <IconMapPin className="text-primary" />
            <Label className="text-sm text-muted-foreground">
              추첨 세대
            </Label>
          </div>
          <div className="flex flex-wrap gap-2">
            {generations?.map(id => {
              const name = GENERATIONS.find(gen => gen.id === id)?.name

              return name ?
                <Badge
                  className="bg-background text-foreground border-input text-md border border-solid py-4 pl-3 pr-3"
                  key={id}
                >
                  {name}
                </Badge> : null
            })}
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex gap-2 items-center">
            <IconSwords className="text-primary" />
            <Label className="text-sm text-muted-foreground">
              추첨 타입
            </Label>
          </div>
          <div className="flex flex-wrap gap-2">
            {types?.map((id, index) => {
              const pokemonType = POKEMON_TYPES.find(g => g.id === id)
              if (!pokemonType) return null

              const {
                name,
                color,
                textColor,
              } = pokemonType

              return name ?
                <Badge
                  style={{
                    backgroundColor: color,
                    color: textColor,
                  }}
                  className="border-input text-md border border-solid py-4 pl-3 pr-3"
                  key={id+index}
                >
                  {name}
                </Badge> : null
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default ResultItem
