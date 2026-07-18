type SupermarketAvatarType = {
  marketName: string;
};

export function SupermarketAvatar(props: SupermarketAvatarType) {
  const image = marketNameToImage(props.marketName);

  return (
    <div className="flex items-center" aria-label={props.marketName}>
      <div className="h-6 min-w-6 rounded-full bg-stone-200 grid place-items-center overflow-hidden">
        {image ? (
          <img
            className="h-6 mix-blend-multiply"
            src={image}
            alt=""
          />
        ) : (
          <span className="px-1 text-[0.625rem] font-semibold text-stone-600">
            {props.marketName.slice(0, 1).toUpperCase()}
          </span>
        )}
      </div>
    </div>
  );
}

function marketNameToImage(marketName: string) {
  const mapMarketToImage: { [key: string]: string } = {
    Farmacorp: "/assets/farmacorp-logo.png",
    Fidalga: "/assets/fidalga-logo.png",
    Icnorte: "/assets/icnorte-logo.png",
    "El GenioX": "/assets/geniox-logo.png",
    Dismac: "/assets/dismac-logo.png",
    Hipermaxi: "/assets/hipermaxi-logo.jpg",
  };

  return mapMarketToImage[marketName];
}
