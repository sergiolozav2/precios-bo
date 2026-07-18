import type { Product } from "./types";

type Relevance = {
  tier: number;
  exactMatches: number;
  prefixMatches: number;
  extraWords: number;
  firstMatch: number;
};

export function rankProducts(products: Product[], query: string): Product[] {
  const queryWords = words(query);

  if (queryWords.length === 0) {
    return [...products];
  }

  const rankedProducts = products.map((product, index) => ({
    product,
    index,
    relevance: relevance(product.title, queryWords),
  }));

  rankedProducts.sort((a, b) => {
    const relevanceOrder = compareRelevance(a.relevance, b.relevance);

    if (relevanceOrder !== 0) {
      return relevanceOrder;
    }

    const priceOrder = comparablePrice(a.product.price) - comparablePrice(b.product.price);
    return priceOrder || a.index - b.index;
  });

  return rankedProducts.map(({ product }) => product);
}

function relevance(title: string, queryWords: string[]): Relevance {
  const titleWords = words(title);
  const queryTerms = [...new Set(queryWords)];
  const titleTerms = new Set(titleWords);
  const exactMatches = queryTerms.filter((term) => titleTerms.has(term)).length;
  const unmatchedTerms = queryTerms.filter((term) => !titleTerms.has(term));
  const prefixMatches = unmatchedTerms.filter(
    (term) => term.length >= 3 && titleWords.some((word) => word.startsWith(term)),
  ).length;
  const firstMatch = firstMatchingWord(titleWords, queryTerms);

  let tier = 0;
  if (sameWords(titleWords, queryWords)) {
    tier = 5;
  } else if (containsPhrase(titleWords, queryWords)) {
    tier = 4;
  } else if (exactMatches === queryTerms.length) {
    tier = 3;
  } else if (exactMatches > 0) {
    tier = 2;
  } else if (prefixMatches > 0) {
    tier = 1;
  }

  return {
    tier,
    exactMatches,
    prefixMatches,
    extraWords: Math.max(0, titleWords.length - exactMatches - prefixMatches),
    firstMatch,
  };
}

function compareRelevance(a: Relevance, b: Relevance): number {
  return (
    b.tier - a.tier ||
    b.exactMatches - a.exactMatches ||
    b.prefixMatches - a.prefixMatches ||
    a.extraWords - b.extraWords ||
    a.firstMatch - b.firstMatch
  );
}

function words(value: string): string[] {
  const normalized = value
    .normalize("NFD")
    .replace(/\p{M}/gu, "")
    .toLocaleLowerCase("es")
    .replace(/[^\p{L}\p{N}]+/gu, " ")
    .trim();

  return normalized === "" ? [] : normalized.split(/\s+/u);
}

function sameWords(a: string[], b: string[]): boolean {
  return a.length === b.length && a.every((word, index) => word === b[index]);
}

function containsPhrase(titleWords: string[], queryWords: string[]): boolean {
  if (queryWords.length > titleWords.length) {
    return false;
  }

  return titleWords.some((_, start) =>
    queryWords.every((word, offset) => titleWords[start + offset] === word),
  );
}

function firstMatchingWord(titleWords: string[], queryTerms: string[]): number {
  const index = titleWords.findIndex((word) =>
    queryTerms.some(
      (term) => word === term || (term.length >= 3 && word.startsWith(term)),
    ),
  );

  return index === -1 ? Number.POSITIVE_INFINITY : index;
}

function comparablePrice(price: number): number {
  return Number.isFinite(price) ? price : Number.POSITIVE_INFINITY;
}
