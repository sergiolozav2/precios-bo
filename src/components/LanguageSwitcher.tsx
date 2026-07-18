import { SvgIcon } from "./SvgIcon";
import {
  Select,
  SelectContent,
  SelectIcon,
  SelectItem,
  SelectItemText,
  SelectPortal,
  SelectTrigger,
  SelectViewport,
} from "@radix-ui/react-select";
import { useLanguageStorage } from "../hooks/useLanguageStorage";

const languages = ["en", "es"] as const;
const languageLabel = { en: "English (EN)", es: "Español (ES)" };

export function LanguageSwitcher() {
  const { currentLanguage, setLanguage } = useLanguageStorage();

  function changeLanguage(language: string) {
    setLanguage(language);
  }
  return (
    <Select  onValueChange={changeLanguage}>
      <SelectTrigger className="px-2 py-1 gap-1 uppercase focus:outline focus:outline-2 focus:outline-purple-900 font-medium rounded-md flex items-center text-stone-100 bg-stone-100/35">
        {currentLanguage}
        <SelectIcon>
          <SvgIcon className="h-3 text-stone-100" iconName="FaAngleDown" />
        </SelectIcon>
      </SelectTrigger>
      <SelectPortal>
        <SelectContent
          className="z-20 rounded-md overflow-hidden relative bg-white"
          position="popper"
          sideOffset={4}
          align="end"
        >
          <SelectViewport className="py-1">
            {languages.map((language) => (
              <SelectItem
                key={language}
                className="px-2 py-1 text-sm outline-none focus:bg-stone-200 cursor-pointer hover:bg-neutral-200"
                value={language}
              >
                <SelectItemText>
                  {languageLabel[language]}
                </SelectItemText>
              </SelectItem>
            ))}
          </SelectViewport>
        </SelectContent>
      </SelectPortal>
    </Select>
  );
}
