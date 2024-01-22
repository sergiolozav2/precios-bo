import { FeatureCard } from "./FeatureCard";

export function FeaturesList() {
  return (
    <div className="mt-4 px-4 gap-4 sm:gap-24 h-full flex flex-col items-center justify-center w-full sm:flex-row sm:flex-wrap">
      <FeatureCard
        title="Encuentra productos"
        description="Encuentra ropa, comida, laptops, bebidas, etc."
        iconName="FaShoppingCart"
      />
      <FeatureCard
        title="Ahorra dinero"
        description="Ahorra dinero al comparar precios en múltiples tiendas."
        iconName="FaMoneyCheckDollar"
      />
      <FeatureCard
        title="Más rápido"
        description="Puedes encontrar rápidamente productos."
        iconName="MdOutlineMoreTime"
      />
    </div>
  );
}
