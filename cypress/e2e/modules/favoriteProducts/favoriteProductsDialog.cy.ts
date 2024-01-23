import { resultProductsData } from "../../mock/resultProductsData";

const baseUrl = "http://localhost:5173";
const apiEndpoint = "/api/search_products/*";

describe("Favorites dialog", () => {
  const searchProduct = "coca cola";
  const urlParam = new URLSearchParams({ search: searchProduct });
  const items = resultProductsData.data.items;

  beforeEach(() => {
    cy.intercept(apiEndpoint, (req) => {
      req.reply(resultProductsData);
    });

    const baseUrlWithParams = `${baseUrl}?${urlParam.toString()}`;
    cy.visit(baseUrlWithParams);
  });

  it("shows saved favorite items", () => {
    cy.get('button[role="checkbox"]').click({ multiple: true });
    cy.get('button[aria-haspopup="dialog"]').click();
    const dialog = cy.get('div[role="dialog"] > div');

    dialog
      .should("contain", items[0].title)
      .and("contain", items[1].title)
      .and("contain", items[2].title);
  });

  it("product should disappear if toggled off", () => {
    cy.get('button[role="checkbox"]').click({ multiple: true });
    cy.get('button[aria-haspopup="dialog"]').click();
    cy.get('div[role="dialog"]').as("favorites");

    cy.get("@favorites").find('button[role="checkbox"]').first().click();
    cy.get("@favorites").find('button[role="checkbox"]').first().click();
    cy.get("@favorites").find('button[role="checkbox"]').first().click();

    cy.get("@favorites").should("not.contain", items[0].title)
    cy.get("@favorites").should("not.contain", items[1].title)
    cy.get("@favorites").should("not.contain", items[2].title)
  });
});
