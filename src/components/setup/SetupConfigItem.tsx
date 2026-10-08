import { Label } from '@/components/ui/Label'
import * as React from 'react'

type SetupConfigItemProps = {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}

const SetupConfigItem = ({ title, subtitle, children }: SetupConfigItemProps) => {
  return (
    <div className="flex items-center justify-between w-full">
      <div className="flex gap-4">
        <Label className="text-base font-semibold">{title}</Label>
        { subtitle &&
          <Label className="text-sm text-muted-foreground">{subtitle}</Label>
        }
      </div>
      <div className="flex gap-2">
        {children}
      </div>
    </div>
  )
}

export default SetupConfigItem
