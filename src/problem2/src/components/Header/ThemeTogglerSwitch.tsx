import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import { useDarkMode } from "@/contexts/DarkMode.context";
import { tv } from "tailwind-variants";

const iconAnimationVariants = tv({
  base: "absolute inset-1/2 -translate-1/2 transition-all duration-(--duration-colors) data-[hidden=false]:scale-100 data-[hidden=false]:rotate-0 data-[hidden=false]:opacity-100 data-[hidden=true]:scale-0 data-[hidden=true]:opacity-0 text-white",
  variants: {
    rotateType: {
      sun: "data-[hidden=true]:rotate-90",
      moon: "data-[hidden=true]:-rotate-90",
    },
  },
});

function ThemeTogglerSwitch() {
  const { mode, toggleMode } = useDarkMode();
  const isDark = mode === "dark";

  return (
    <div className="flex items-center gap-1">
      <Switch
        checked={isDark}
        onCheckedChange={toggleMode}
        className="data-[state=unchecked]:bg-input/10 data-[state=unchecked]:backdrop-blur-md"
      />

      <Button variant="link" size="icon" className="cursor-default">
        <div className="relative w-6 h-6">
          <Sun
            className={iconAnimationVariants({
              rotateType: "sun",
            })}
            data-hidden={isDark}
          />
          <Moon
            className={iconAnimationVariants({
              rotateType: "moon",
            })}
            data-hidden={!isDark}
          />
        </div>
      </Button>
    </div>
  );
}

export default ThemeTogglerSwitch;
