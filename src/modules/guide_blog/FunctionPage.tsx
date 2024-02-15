import { Trans, useTranslation } from "react-i18next";
import { PageHeaderWrapper } from "../../components/PageHeaderWrapper";
import { AuthorCard } from "./components/AuthorCard";
import { CodeSection } from "./components/CodeSection";
import { CommandSpan } from "./components/CommandSpan";

export default function FunctionPage() {
  const { t } = useTranslation();
  return (
    <>
      <PageHeaderWrapper minHeight="200px">
        <div className="max-w-[740px] w-full  mx-auto">
          <div className="mt-2 sm:mt-8 py-8 px-6 flex flex-col w-full justify-center text-white">
            <h1 className="text-2xl sm:text-3xl font-semibold">
              {t("blog.title")}
            </h1>
            <p className="mt-4 text-lg text-stone-100">
              {t("blog.description")}
            </p>
            <div className="mt-6 mr-auto">
              <AuthorCard />
            </div>
          </div>
        </div>
      </PageHeaderWrapper>
      <div className="flex w-full justify-center">
        <div className="mt-6 max-w-[740px] px-6 gap-6 text-lg sm:text-xl flex flex-col">
          <img src="/assets/blog/blog-start.png" />
          <p>{t("blog.content.intro")}</p>
          <i className="mx-4">{t("blog.content.info")}</i>
          <p>{t("blog.content.purpose")}</p>

          <h2 className="text-2xl font-semibold">
            {t("blog.content.definitions.title")}
          </h2>
          <h2 className="font-medium">
            - {t("blog.content.definitions.question1")}
          </h2>
          <img src="/assets/blog/webscrap-requirements.png" />
          <p>{t("blog.content.definitions.answer1")}</p>
          <h2 className="font-medium">
            - {t("blog.content.definitions.question2")}
          </h2>
          <p>{t("blog.content.definitions.answer2")}</p>
          <h2 className="font-medium">
            - {t("blog.content.definitions.question3")}
          </h2>
          <p>{t("blog.content.definitions.answer3")}</p>
          <h2 className="text-2xl font-semibold">
            {t("blog.content.steps.title")}
          </h2>
          <p>
            <Trans
              i18nKey="blog.content.steps.intro1"
              values={{ link: "Node" }}
              components={[
                <a
                  className="text-blue-600 hover:underline"
                  target="_blank"
                  href="https://nodejs.org/en/download/current"
                />,
              ]}
            />
          </p>
          <h2 className="font-medium">
            1. {t("blog.content.steps.step1.title")}
          </h2>
          <p>{t("blog.content.steps.step1.dependencies")}</p>
          <CodeSection
            code={
              "npm init -y\nnpm i fastify\nnpm i node-html-parser\nnpm i axios\nnpm i -D typescript @types/node"
            }
          />
          <p>{t("blog.content.steps.step1.scripts")}</p>
          <CodeSection
            filename="package.json"
            code={
              '{\n  "scripts": {\n    "build": "tsc -p tsconfig.json --outDir ./build",\n    "start": "node ./build/index.js",\n    "dev": "npm run build && npm run start"\n  }\n}'
            }
          />
          <p>{t("blog.content.steps.step1.tsconfig")}</p>
          <CodeSection code="npx tsc --init" />
          <p>
            <Trans
              i18nKey="blog.content.steps.step1.indexcode"
              values={{ filename: "index.ts" }}
              components={[<CommandSpan />]}
            />
          </p>
          <CodeSection
            filename="index.ts"
            language="typescript"
            code={
              "import fastify from 'fastify'\nconst server = fastify()\n\nserver.get('/', async (request, reply) => {\n  return 'hola'\n})\n\nserver.listen({ port: 8080 }, (err, address) => {\n  if (err) {\n    console.error(err)\n    process.exit(1)\n  }\n  console.log(`Server listening at ${address}`)\n})"
            }
          />
          <p>
            <Trans
              i18nKey="blog.content.steps.step1.testserver"
              values={{ command1: "npm run dev", command2: "localhost:8000/" }}
              components={[<CommandSpan />]}
            />
          </p>
          <img src="/assets/blog/fastify-setup.png" />

          <h2 className="font-medium">
            2. {t("blog.content.steps.step2.title")}
          </h2>
          <p>
            <Trans
              i18nKey="blog.content.steps.step2.newfile"
              values={{ command1: "webscrapImages.ts" }}
              components={[<CommandSpan />]}
            />
          </p>
          <CodeSection
            filename="webscrapImages.ts"
            code={
              'import axios from "axios";\nimport parse from "node-html-parser";\n\nconst googleURL = "https://www.google.com/search?tbm=isch&q=";\n\ntype Product = {\n  title: string;\n  image: string;\n};\n\nasync function getHTMLCode(url: string) {\n  return "";\n}\n\nexport async function webscrapGoogleImages() {\n  const html = await getHTMLCode(googleURL);\n  // ?? Convertir html a productos\n  const products: Product[] = [];\n  return products;\n}\n'
            }
          />
          <p>
            <Trans
              i18nKey="blog.content.steps.step2.explanation"
              values={{ command1: "webscrapGoogleImages", command2: "Product" }}
              components={[<CommandSpan />]}
            />
          </p>
          <p>
            <Trans
              i18nKey="blog.content.steps.step2.implementation"
              values={{ library1: "node-html-parser" }}
              components={[<strong />]}
            />
          </p>
          <CodeSection
            filename="webscrapImages.ts"
            language="typescript"
            code={
              "async function getHTMLCode(url: string) {\n  try {\n    const response = await axios.get(url);\n    return response.data?.toString();\n  } catch (error) {\n    return null;\n  }\n}"
            }
          />
          <CodeSection
            filename="webscrapImages.ts"
            language="typescript"
            code={
              'export async function webscrapProducts(search: string) {\n  const html = await getHTMLCode(googleURL + search);\n  const root = parse(html ?? "");\n  let containers = root.querySelectorAll("table:has(img)");\n  console.log(containers.length);\n\n  const products: Products[] = [];\n  for (const product of containers) {\n    const title = product.querySelector("span span")?.innerText;\n    const image = product.querySelector("img")?.getAttribute("src");\n    products.push({\n      title: title ?? "",\n      image: image ?? "",\n    });\n  }\n  return products;\n}'
            }
          />
          <p>{t("blog.content.steps.step2.codeexplanation")}</p>
          <h2 className="font-medium">
            3. {t("blog.content.steps.step3.title")}
          </h2>
          <p>
            <Trans
              i18nKey="blog.content.steps.step3.laststep"
              values={{
                command1: "index.ts",
                command2: "localhost:8080/search?q=",
              }}
              components={[<CommandSpan />]}
            />
          </p>
          <CodeSection
            filename="index.ts"
            language="typescript"
            code={
              'type SearchQueryType = {\n  q: string;\n};\nserver.get(\n  "/search",\n  async (request: FastifyRequest<{ Querystring: SearchQueryType }>) => {\n    const products = await webscrapProducts(request.query.q);\n    return products;\n  }\n);\n'
            }
          />
          <i className="mx-4">{t("blog.content.steps.step3.info")}</i>
          <h2 className="font-medium">
            4. {t("blog.content.steps.step4.title")}
          </h2>
          <p>{t("blog.content.steps.step4.dependencies")}</p>
          <CodeSection
            language="bash"
            code={
              "npm create vite@latest frontend -- --template react-ts\ncd frontend\nnpm i"
            }
          />
          <p>
            <Trans
              i18nKey="blog.content.steps.step4.explanation"
              values={{
                command1: "App.tsx",
              }}
              components={[<CommandSpan />]}
            />
          </p>
          <CodeSection
            filename="App.tsx"
            language="typescript"
            code={
              'function App() {\n  return (\n    <div>\n      <h1>Buscador de Imagenes</h1>\n      <input type="text" />\n      <button> Buscar </button>\n    </div>\n  );\n}\n\nexport default App;\n'
            }
          />
          <h2 className="font-medium">
            5. {t("blog.content.steps.step5.title")}
          </h2>
          <p>{t("blog.content.steps.step5.plan")}</p>
          <ol className="list-decimal list-inside">
            <li>{t("blog.content.steps.step5.steps.0")}</li>
            <li>{t("blog.content.steps.step5.steps.1")}</li>
            <li>{t("blog.content.steps.step5.steps.2")}</li>
            <li>{t("blog.content.steps.step5.steps.3")}</li>
            <li>{t("blog.content.steps.step5.steps.4")}</li>
          </ol>
          <CodeSection
            filename="App.tsx"
            language="typescript"
            code={
              'import { useState } from "react";\n\ntype Product = {\n  title: string;\n  image: string;\n};\n\nfunction App() {\n  const [query, setQuery] = useState(""); // 1\n  const [products, setProducts] = useState<Product[]>([]); // 2\n\n  async function handleSearch() { // 3\n    try {\n      const response = await fetch(`http://localhost:8080/search?q=${query}`);\n      const data = await response.json();\n      setProducts(data as Product[]);\n    } catch (e) {\n      console.log(e);\n    }\n  }\n // Pasos 4 y 5 abajo\n return (\n    <div>\n      <h1>Buscador de Imagenes</h1>\n      <input type="text" onChange={(e) => setQuery(e.target.value)} />\n      <button onClick={handleSearch}>Buscar</button>\n      <br></br>\n      {products.map((p) => (\n        <>\n          <img src={p.image} />\n          <div> {p.title} </div>\n        </>\n      ))}\n    </div>\n  );\n}\n\nexport default App;\n'
            }
          />
          <p>{t("blog.content.steps.step5.results")}</p>
          <img src="./assets/blog/resultados.png" />
          <p>{t("blog.content.steps.step5.success")}</p>
          <h2 className="text-2xl font-semibold">
            {t("blog.content.conclusion.title")}
          </h2>
          <p>{t("blog.content.conclusion.summary")}</p>
          <p>{t("blog.content.conclusion.others")}</p>
          <p>{t("blog.content.conclusion.goodbye")}</p>
        </div>
      </div>
    </>
  );
}
