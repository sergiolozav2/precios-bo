import { useTranslation } from "react-i18next";
import { StatusPage } from "./StatusPage";

export function NotFoundPage() {
  const { t } = useTranslation();

  return (
    <StatusPage
      code="404"
      title={t("notFound.title")}
      description={t("notFound.description")}
      actionLabel={t("notFound.home")}
    />
  );
}
