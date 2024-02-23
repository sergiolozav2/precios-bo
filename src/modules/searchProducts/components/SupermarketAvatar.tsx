type SupermarketAvatarType = {
  marketName: string;
};

export function SupermarketAvatar(props: SupermarketAvatarType) {
  return (
    <div className="flex items-center">
      <div className="rounded-full bg-stone-200">
        <img
          className="h-6 mix-blend-multiply"
          src={marketNameToImage(props.marketName)}
        />
      </div>
    </div>
  );
}

function marketNameToImage(marketName: string) {
  const mapMarketToImage: { [key: string]: string } = {
    Farmacorp: "/assets/farmacorp-logo.png",
    Fidalga: "/assets/fidalga-logo.png",
    Icnorte: "/assets/icnorte-logo.jpg",
    "El GenioX": "/assets/geniox-logo.png",
    Dismac: "/assets/dismac-logo.png"
  };

  return mapMarketToImage[marketName];
}
