import {
  createContext,
  useContext,
  useState,
  type ComponentProps,
} from "react";
import type { TDarkModeContext } from "@/types";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";

const DarkModeContext = createContext<TDarkModeContext>({
  mode: "light",
  toggleMode: () => {},
});

const DarkModeProvider = (props: ComponentProps<typeof Slot>) => {
  const [mode, setMode] = useState<"light" | "dark">("light");

  const toggleMode = () => {
    setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  };

  return (
    <DarkModeContext.Provider value={{ mode: mode, toggleMode: toggleMode }}>
      <Slot
        data-slot="theme-provider"
        data-theme={mode}
        className={cn(mode, "transition-colors duration-(--duration-colors)")}
        {...props}
      />
    </DarkModeContext.Provider>
  );
};

export const useDarkMode = () => {
  const context = useContext(DarkModeContext);
  if (context === undefined) {
    throw new Error("useDarkMode must be used within a DarkModeProvider");
  }
  return context;
};

export default DarkModeProvider;
