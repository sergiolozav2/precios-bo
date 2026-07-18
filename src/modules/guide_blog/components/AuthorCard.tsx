import { useTranslation } from "react-i18next";

const linkedinUrl = "https://www.linkedin.com/in/sergio-loza/";

export function AuthorCard() {
  const { t } = useTranslation();

  return (
    <a
      className="flex items-center hover:underline"
      href={linkedinUrl}
      target="_blank"
      rel="noreferrer"
      aria-label={t("blog.author.aria")}
    >
      <img
        className="w-11 h-11 rounded-full"
        src="/assets/sergio-loza.jpeg"
        alt="Sergio Loza"
      />
      <div className="ml-4 flex flex-col text-left">
        <p className="font-medium">
          Sergio Loza · <span>LinkedIn</span>
        </p>
        <p className="text-sm text-stone-100">{t("blog.date")}</p>
      </div>
    </a>
  );
}
