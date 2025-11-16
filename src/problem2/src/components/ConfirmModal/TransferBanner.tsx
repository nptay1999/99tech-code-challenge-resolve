import { TokenDefault } from "@/assets";
import { ArrowRightLeft, ChevronsRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type TTransferBannerProps = {
  loading?: boolean;
  className?: string;
};

function TransferBanner({ loading, className }: TTransferBannerProps) {
  const [process, setProcess] = useState(10);
  const intervalId = useRef<number>(null);

  useEffect(() => {
    if (loading) {
      intervalId.current = setInterval(() => {
        setProcess((prev) => (prev < 10 ? prev + 1 : 1));
      }, 400);
    } else {
      setProcess(10);
      if (intervalId.current) {
        clearInterval(intervalId.current);
      }
    }

    return () => {
      if (intervalId.current) {
        clearInterval(intervalId.current);
      }
    };
  }, [loading]);

  return (
    <section
      className={cn("flex items-center justify-center gap-4", className)}
    >
      <img
        src={`/tokens/USD.svg`}
        alt="USD.svg"
        onError={(e) => (e.currentTarget.src = TokenDefault)}
        className="size-10 bg-white rounded-full"
      />

      <div className="flex items-center gap-0.5">
        {Array.from({ length: 5 }).map((_, index) => (
          <ChevronsRight
            key={index}
            className={cn(
              "size-4 opacity-60 transition-all scale-90",
              process >= index + 1 && "opacity-100 scale-110"
            )}
          />
        ))}
      </div>

      <Button
        variant="outline"
        size="icon-lg"
        className={cn(
          "rounded-full transition-transform",
          loading && process > 5 && "rotate-180"
        )}
        disabled
      >
        <ArrowRightLeft />
      </Button>

      <div className="flex items-center gap-0.5">
        {Array.from({ length: 5 }).map((_, index) => (
          <ChevronsRight
            key={index}
            className={cn(
              "size-4 opacity-60",
              process >= index + 6 && "opacity-100"
            )}
          />
        ))}
      </div>

      <img
        src={`/tokens/ETH.svg`}
        alt="ETH.svg"
        onError={(e) => (e.currentTarget.src = TokenDefault)}
        className="size-10 bg-white rounded-full"
      />
    </section>
  );
}

export default TransferBanner;
