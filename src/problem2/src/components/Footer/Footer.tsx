"no use cache";

import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { ComponentProps } from "react";
import { sectionBlurVariants } from "@/lib/variants";
import LanguageSelect from "./LanguageSelect";
import { useTranslation } from "react-i18next";
import Trans from "@/components/Trans";
import GithubLink from "./GithubLink";

function Footer({ className, ...props }: ComponentProps<"footer">) {
  const { t } = useTranslation();

  return (
    <footer
      {...props}
      className={cn(
        "bg-transparent transition-colors duration-(--duration-colors)",
        className
      )}
    >
      <Card
        className={sectionBlurVariants({
          className: "h-full justify-center rounded-b-none",
        })}
      >
        <CardContent>
          <div className="w-full flex lg:flex-row flex-col-reverse gap-2 lg:gap-2 justify-between lg:items-center ">
            <div className="size-full flex items-center justify-start prose prose-sm text-sm text-muted-foreground">
              <div className="flex items-center">
                <Trans
                  t={t}
                  i18nKey="FOOTER/BUILT_BY_ME_THE_SOURCE_CODE_IS_AVAILABLE_ON_GITHUB"
                  components={{
                    s: <span className="font-medium text-white ml-1" />,
                    a: <GithubLink />,
                  }}
                />
              </div>
            </div>

            <LanguageSelect />
          </div>
        </CardContent>
      </Card>
    </footer>
  );
}

export default Footer;
