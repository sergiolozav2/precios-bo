import { useTranslation } from "react-i18next";
import { AppLayout } from "../components/AppLayout";
import { StatusPage } from "./StatusPage";

export function RouteErrorPage() {
  const { t } = useTranslation();

  return (
    <AppLayout>
      <StatusPage
        code="500"
        title={t("errorBoundary.title")}
        description={t("errorBoundary.description")}
        actionLabel={t("errorBoundary.retry")}
        reload
      />
    </AppLayout>
  );
}
