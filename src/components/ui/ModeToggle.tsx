import { IconSun, IconMoon } from '@tabler/icons-react'
import { Button } from '@/components/ui/Button'
import { useTheme } from '@/context/ThemeContext'

export function ModeToggle() {
  const { theme, setTheme } = useTheme()

  const toggleTheme = () => {
    if (theme === 'light') {
      setTheme('dark')
    } else {
      setTheme('light')
    }
  }

  return (
    <Button
      variant="ghost"
      size="icon-lg"
      onClick={toggleTheme}
    >
      <IconMoon className="scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90 size-6" />
      <IconSun className="absolute scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0 size-6" />
    </Button>
  )
}