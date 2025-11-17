import { Globe } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "../ui/button";
import { Field, FieldLabel } from "@/components/ui/field";
import { sectionBlurVariants } from "@/lib/variants";
import { useEffect, useId } from "react";
import { useTranslation } from "react-i18next";
import { CnFlag, DeFlag, EsFlag, FrFlag, GbFlag } from "@/assets";

const languageOptions = [
  { value: "en", label: "English", flag: <GbFlag /> },
  { value: "cn", label: "中文", flag: <CnFlag /> },
  { value: "de", label: "Deutsch", flag: <DeFlag /> },
  { value: "fr", label: "Français", flag: <FrFlag /> },
  { value: "es", label: "Español", flag: <EsFlag /> },
];

function LanguageSelect() {
  const languageSelectId = useId();
  const {
    i18n: { language, changeLanguage },
  } = useTranslation();

  useEffect(() => {
    document.documentElement.lang = language;
  }, []);

  const handleChangeLanguage = (value: string) => {
    document.documentElement.lang = value;

    changeLanguage(value);
  };

  return (
    <Field
      orientation="horizontal"
      className="text-sm text-muted-foreground gap-1 w-fit"
    >
      <Button
        variant="link"
        size="icon"
        className="cursor-pointer text-muted-foreground"
        asChild
      >
        <FieldLabel htmlFor={languageSelectId}>
          <Globe />
        </FieldLabel>
      </Button>
      <Select
        defaultValue={language}
        onValueChange={(value) => handleChangeLanguage(value)}
      >
        <SelectTrigger
          size="sm"
          className="py-1 border-muted-foreground min-w-30"
          id={languageSelectId}
        >
          <SelectValue placeholder="Language" />
        </SelectTrigger>
        <SelectContent className={sectionBlurVariants()}>
          {languageOptions.map((option) => (
            <SelectItem
              key={option.value}
              value={option.value}
              className="text-muted-foreground focus:bg-muted-foreground/20 focus:text-muted"
              checkedIconClassName="text-muted"
            >
              {option.flag} {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </Field>
  );
}

export default LanguageSelect;
