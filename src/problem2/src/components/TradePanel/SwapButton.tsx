import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowDownUp } from "lucide-react";
import { useFormContext } from "react-hook-form";
import type { TConvertSchema } from "./TradePanel.config";

function SwapButton() {
  const form = useFormContext<TConvertSchema>();

  const handleSwap = () => {
    const fromInput = form.getValues("from");
    const toInput = form.getValues("to");
    const exchangeRate = form.getValues("exchangeRate");

    form.setValue("from", toInput);
    form.setValue("to", fromInput);
    form.setValue("exchangeRate", 1 / exchangeRate);
  };

  return (
    <div className="relative flex items-center justify-center gap-2 py-4">
      <div className="flex-1">
        <Separator className="opacity-30 dark:opacity-50 dark:bg-muted-foreground" />
      </div>
      <Button
        type="button"
        aria-label="Swap tokens"
        onClick={handleSwap}
        className={cn(
          "relative z-10 rounded-full border-2 p-2.5",
          "transition-all duration-(--duration-colors) bg-white/70 dark:bg-accent/70 hover:bg-accent hover:border-foreground/40 hover:rotate-180"
        )}
        size="icon-lg"
      >
        <ArrowDownUp className="size-5 text-foreground" />
      </Button>
      <div className="flex-1">
        <Separator className="opacity-30 dark:opacity-50 dark:bg-muted-foreground" />
      </div>
    </div>
  );
}

export default SwapButton;
