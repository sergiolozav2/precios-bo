import { useTranslation } from "react-i18next";
import { FeatureCard } from "./FeatureCard";

export function FeaturesList() {
  const { t } = useTranslation()

  return (
    <div className="mt-4 px-4 gap-4 sm:gap-24 h-full flex flex-col items-center justify-center w-full sm:flex-row sm:flex-wrap">
      <FeatureCard
        title={t('search.features.title1')}
        description={t('search.features.subtitle1')}
        iconName="FaShoppingCart"
      />
      <FeatureCard
        title={t('search.features.title2')}
        description={t('search.features.subtitle2')}
        iconName="FaMoneyCheckDollar"
      />
      <FeatureCard
        title={t('search.features.title3')}
        description={t('search.features.subtitle3')}
        iconName="MdOutlineMoreTime"
      />
    </div>
  );
}
