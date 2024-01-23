import { resultProductsData } from "../../mock/resultProductsData";

const baseUrl = "http://localhost:5173";
const apiEndpoint = "/api/search_products/*";

describe("Favorites button", () => {
  const searchProduct = "coca cola";
  const urlParam = new URLSearchParams({ search: searchProduct });

  beforeEach(() => {
    cy.intercept(apiEndpoint, (req) => {
      req.reply(resultProductsData);
    });
    const baseUrlWithParams = `${baseUrl}?${urlParam.toString()}`;
    cy.visit(baseUrlWithParams);
  });

  it("toggle on/off favorites", () => {
    const buttons = cy.get('button[role="checkbox"]');
    buttons.click({ multiple: true });

    buttons.each((button) => {
      cy.wrap(button).should("have.attr", "aria-checked", "true");
    });

    buttons.click({ multiple: true });

    buttons.each((button) => {
      cy.wrap(button).should("have.attr", "aria-checked", "false");
    });
  });

  it("favorites stay checked after reload", () => {
    let buttons = cy.get('button[role="checkbox"]');
    buttons.click({ multiple: true });

    cy.reload();

    buttons = cy.get('button[role="checkbox"]');
    buttons.each((button) => {
      cy.wrap(button).should("have.attr", "aria-checked", "true");
    });
  });
});
