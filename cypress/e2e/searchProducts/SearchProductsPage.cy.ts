import { resultProductsData } from "./resultProductsData";

const baseUrl = "http://localhost:5173";
const apiEndpoint = "/api/search_products/*";
describe("Search feature", () => {
  const searchProduct = "coca cola";

  beforeEach(() => {
    cy.intercept(
      {
        method: "GET",
        url: apiEndpoint,
      },
      resultProductsData
    );
    cy.visit(baseUrl);
  });
  it("searches results", () => {
    cy.get("form input").type(searchProduct);
    cy.get("form button").click();
    cy.contains(`Resultados de '${searchProduct}'`).should("exist");
  });

  it("shows products", () => {
    cy.get("form input").type(searchProduct);
    cy.get("form button").click();
    cy.contains(resultProductsData.data.items[0].title).should("exist");
    cy.contains(resultProductsData.data.items[1].title).should("exist");
    cy.contains(resultProductsData.data.items[2].title).should("exist");
  });

  it("sets url param 'search' on search", () => {
    const urlParam = new URLSearchParams({ search: searchProduct });
    cy.get("form input").type(searchProduct);
    cy.get("form button").click();
    cy.location("search").should("include", `?${urlParam.toString()}`);
  });
});

describe("Load with url param", () => {
  const searchProduct = "coca cola";
  const urlParam = new URLSearchParams({ search: searchProduct });

  beforeEach(() => {
    const baseUrlWithParams = `${baseUrl}?${urlParam.toString()}`;
    cy.visit(baseUrlWithParams);
  });

  it("input takes value from url param", () => {
    cy.get("form input").should("have.value", searchProduct);
  });

  it("search takes value from url param", () => {
    cy.intercept(apiEndpoint, (req) => {
      expect(req.query["search"]).to.equal(searchProduct);
      req.reply(resultProductsData)
    });
  });
});
