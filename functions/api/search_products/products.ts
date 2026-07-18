import {
  DEFAULT_DISMAC_SEARCH_URL,
  DismacSearchProductsService,
  HttpDismacClient,
} from "../../_shared/search-products/dismac";
import {
  DEFAULT_HIPERMAXI_SEARCH_URL,
  HipermaxiSearchProductsService,
  HttpHipermaxiClient,
} from "../../_shared/search-products/hipermaxi";
import {
  DEFAULT_GENIOX_SEARCH_URL,
  GenioxSearchProductsService,
  HttpGenioxClient,
} from "../../_shared/search-products/geniox";
import {
  DEFAULT_ICNORTE_SEARCH_URL,
  HttpIcnorteClient,
  IcnorteSearchProductsService,
} from "../../_shared/search-products/icnorte";
import { searchProducts } from "../../_shared/search-products/search-products";

type Env = {
  DISMAC_SEARCH_URL?: string;
  GENIOX_SEARCH_URL?: string;
  HIPERMAXI_SEARCH_URL?: string;
  ICNORTE_SEARCH_URL?: string;
};

type PagesContext = {
  request: Request;
  env: Env;
};

export async function onRequestGet(context: PagesContext): Promise<Response> {
  const url = new URL(context.request.url);
  const query = url.searchParams.get("search")?.trim();

  if (!query) {
    return Response.json(
      { message: 'The "search" query parameter is required.' },
      { status: 400 },
    );
  }

  const services = [
    new DismacSearchProductsService(
      new HttpDismacClient(
        context.env.DISMAC_SEARCH_URL ?? DEFAULT_DISMAC_SEARCH_URL,
      ),
    ),
    new HipermaxiSearchProductsService(
      new HttpHipermaxiClient(
        context.env.HIPERMAXI_SEARCH_URL ?? DEFAULT_HIPERMAXI_SEARCH_URL,
      ),
    ),
    new GenioxSearchProductsService(
      new HttpGenioxClient(
        context.env.GENIOX_SEARCH_URL ?? DEFAULT_GENIOX_SEARCH_URL,
      ),
    ),
    new IcnorteSearchProductsService(
      new HttpIcnorteClient(
        context.env.ICNORTE_SEARCH_URL ?? DEFAULT_ICNORTE_SEARCH_URL,
      ),
    ),
  ];

  const result = await searchProducts(services, query);

  return Response.json(result, {
    headers: {
      "Cache-Control": "public, max-age=60, s-maxage=300",
    },
  });
}
