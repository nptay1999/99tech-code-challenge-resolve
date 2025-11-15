import { Logo } from "@/assets";
import { Button } from "@/components/ui/button";
import ThemeTogglerSwitch from "./ThemeTogglerSwitch";
import { Separator } from "@/components/ui/separator";
import GithubButton from "./GithubButton";
import { Card, CardContent } from "@/components/ui/card";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";
import { sectionBlurVariants } from "@/lib/variants";

const Header = ({ className, ...props }: ComponentProps<"header">) => {
  return (
    <header
      {...props}
      className={cn(
        "container-wrapper 3xl:fixed:px-0 sticky top-0 z-50 w-full bg-transparent transition-colors duration-(--duration-colors)",
        className
      )}
    >
      <Card
        className={sectionBlurVariants({
          className: "rounded-2xl py-4",
        })}
      >
        <CardContent>
          <div className="3xl:fixed:container flex h-(--header-height) items-center **:data-[slot=separator]:h-4!">
            <Button asChild variant="link" className="cursor-pointer ">
              <img src={Logo} alt="Logo" className="h-8" />
            </Button>

            <div className="ml-auto flex items-center gap-2 md:flex-1 md:justify-end">
              <GithubButton />

              <Separator orientation="vertical" />

              <ThemeTogglerSwitch />
            </div>
          </div>
        </CardContent>
      </Card>
    </header>
  );
};

export default Header;
