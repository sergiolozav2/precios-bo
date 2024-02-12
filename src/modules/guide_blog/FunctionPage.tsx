import { PageHeaderWrapper } from "../../components/PageHeaderWrapper";
import { AuthorCard } from "./components/AuthorCard";
import { CodeSection } from "./components/CodeSection";
import { CommandSpan } from "./components/CommandSpan";

export default function FunctionPage() {
  return (
    <>
      <PageHeaderWrapper minHeight="200px">
        <div className="max-w-[740px] w-full  mx-auto">
          <div className="mt-2 sm:mt-8 py-8 px-6 flex flex-col w-full justify-center text-white">
            <h1 className="text-2xl sm:text-3xl font-semibold">
              Como crear un comparador de precios con Javascript
            </h1>
            <p className="mt-4 text-lg text-stone-100">
              Bueno, en realidad Typescript, React y Fastify.
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
          <p>
            No hay nada mejor que encontrar tu producto favorito con un mejor
            precio y sin mucho esfuerzo. Esto me motivó a desarrollar esta
            aplicación web que consigue los precios de distintas tiendas online
            de Bolivia para comparar los resultados.
          </p>
          <i className="mx-4">
            Este proyecto y el de la guía solo tienen fines educativos, y el
            código está disponible en Github.
          </i>
          <p>
            En este post, explicaré como puedes desarrollar un proyecto parecido
            con el buscador de imágenes de Google utilizando React y Fastify con
            Typescript.
          </p>

          <h2 className="text-2xl font-semibold">
            Primero algunos conceptos importantes
          </h2>
          <h2 className="font-medium">- ¿Qué es webscrapping?</h2>
          <img src="/assets/blog/webscrap-requirements.png" />
          <p>
            Webscrapping consiste extraer información de sitios web de forma
            automática. La idea básica es obtener el código HTML de un sitio
            web, identificar los datos usando un lenguaje de programación y
            convertirlo a un formato sencillo de utilizar como JSON.
          </p>
          <h2 className="font-medium">- ¿Qué es React?</h2>
          <p>
            Es una librería de Javascript usada para construir interfaces de
            usuario con HTML. Lo utilizaremos para mostrar los productos y la
            barra de búsqueda.
          </p>
          <h2 className="font-medium">- ¿Qué es Fastify?</h2>
          <p>
            Es un framework para crear aplicaciones web o API de alto
            rendimiento con NodeJS. Lo usaremos como servidor para realizar
            webscrapping y envíar los resultados al sitio web.
          </p>
          <h2 className="text-2xl font-semibold">Comencemos!</h2>
          <p>
            El primer paso es&nbsp;
            <a
              className="text-blue-600 hover:underline"
              target="_blank"
              href="https://nodejs.org/en/download/current"
            >
              instalar node
            </a>
            , si ya está instalado continúa con el siguiente paso.
          </p>
          <h2 className="font-medium">1. Preparar proyecto de Fastify</h2>
          <p>
            En una terminal, ejecuta los siguientes comandos para crear un
            proyecto e instalar fastify, node-html-parser y axios:
          </p>
          <CodeSection
            code={
              "npm init -y\nnpm i fastify\nnpm i node-html-parser\nnpm i axios\nnpm i -D typescript @types/node"
            }
          />
          <p>
            Añade las siguientes líneas a "scripts" del archivo package.json que
            se creó:
          </p>
          <CodeSection
            filename="package.json"
            code={
              '{\n  "scripts": {\n    "build": "tsc -p tsconfig.json --outDir ./build",\n    "start": "node ./build/index.js",\n    "dev": "npm run build && npm run start"\n  }\n}'
            }
          />
          <p>Inicia la configuración de typescript:</p>
          <CodeSection code="npx tsc --init" />
          <p>
            Ahora crea un archivo llamado <CommandSpan>index.ts</CommandSpan> y
            agrega este código al archivo.
          </p>
          <CodeSection
            filename="index.ts"
            language="typescript"
            code={
              "import fastify from 'fastify'\nconst server = fastify()\n\nserver.get('/', async (request, reply) => {\n  return 'hola'\n})\n\nserver.listen({ port: 8080 }, (err, address) => {\n  if (err) {\n    console.error(err)\n    process.exit(1)\n  }\n  console.log(`Server listening at ${address}`)\n})"
            }
          />
          <p>
            Ejecuta <CommandSpan>npm run dev</CommandSpan> para iniciar el
            servidor y podrás envíar solicitudes HTTP a{" "}
            <CommandSpan>localhost:8080/</CommandSpan>. Puedes comprobarlo
            ingresando a esa dirección desde tu navegador.
          </p>
          <img src="/assets/blog/fastify-setup.png" />

          <h2 className="font-medium">
            2. Construir webscrapper con node-html-parser
          </h2>
          <p>
            Crea un nuevo archivo llamado{" "}
            <CommandSpan>webscrapImages.ts</CommandSpan> y agrega las siguientes
            funciones:
          </p>
          <CodeSection
            filename="webscrapImages.ts"
            code={
              'import axios from "axios";\nimport parse from "node-html-parser";\n\nconst googleURL = "https://www.google.com/search?tbm=isch&q=";\n\ntype Product = {\n  title: string;\n  image: string;\n};\n\nasync function getHTMLCode(url: string) {\n  return "";\n}\n\nexport async function webscrapGoogleImages() {\n  const html = await getHTMLCode(googleURL);\n  // ?? Convertir html a productos\n  const products: Product[] = [];\n  return products;\n}\n'
            }
          />
          <p>
            Actualmente no hace nada, pero demuestra la esencia de la
            recolección de datos, la función{" "}
            <CommandSpan>webscrapGoogleImages</CommandSpan> obtiene el código
            HTML de Google, y lo convierte a un objeto de tipo{" "}
            <CommandSpan>Product</CommandSpan>.
          </p>
          <p>
            Cada sitio web es diferente, pero con ayuda de{" "}
            <strong>node-html-parser</strong> podemos obtener los datos que
            necesitamos. Para nuestro ejemplo de Google Images el código de las
            funciones anteriores es el siguiente:
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
          <h2 className="font-medium">3. Crear endpoint con Fastify</h2>
          <p>
            El último paso con el backend, es registrar una nueva ruta en{" "}
            <CommandSpan>index.ts</CommandSpan>. Esta ruta retornará los
            resultados de Google al hacer una petición GET a la ruta{" "}
            <CommandSpan>localhost:8080/search?q=busqueda</CommandSpan>:
          </p>
          <CodeSection
            filename="index.ts"
            language="typescript"
            code={
              'type SearchQueryType = {\n  q: string;\n};\nserver.get(\n  "/search",\n  async (request: FastifyRequest<{ Querystring: SearchQueryType }>) => {\n    const products = await webscrapProducts(request.query.q);\n    return products;\n  }\n);\n'
            }
          />
          <i className="mx-4">
            Recuerda reiniciar el servidor de Fastify para poder utilizar esta
            ruta.
          </i>
          <h2 className="font-medium">4. Preparar proyecto de React</h2>
          <p>Primero creamos un proyecto e instalamos las dependencias</p>
          <CodeSection
            language="bash"
            code={
              "npm create vite@latest frontend -- --template react-ts\ncd frontend\nnpm i"
            }
          />
          <p>
            Vite creará varios archivos en el directorio{" "}
            <CommandSpan>frontend</CommandSpan>, pero solo nos interesa{" "}
            <CommandSpan>App.tsx</CommandSpan>. Eliminaremos el código generado
            por Vite, y crearemos nuestro propio componente de esta forma:
          </p>
          <CodeSection
            filename="App.tsx"
            language="typescript"
            code={
              'function App() {\n  return (\n    <div>\n      <h1>Buscador de Imagenes</h1>\n      <input type="text" />\n      <button> Buscar </button>\n    </div>\n  );\n}\n\nexport default App;\n'
            }
          />
          <h2 className="font-medium">5. Mostrando productos</h2>
          <p>Para mostrar los productos se requiere de los siguientes pasos:</p>
          <ol className="list-decimal list-inside">
            <li>Crear variable de estado para valor de búsqueda</li>
            <li>Crear variable de estado para los productos</li>
            <li>
              Crear una función que solicite los productos a nuestro servidor de
              Fastify
            </li>
            <li>Enlazar esa función al botón de búsqueda</li>
            <li>Mostrar la lista de productos</li>
          </ol>
          <CodeSection
            filename="App.tsx"
            language="typescript"
            code={
              'import { useState } from "react";\n\ntype Product = {\n  title: string;\n  image: string;\n};\n\nfunction App() {\n  const [query, setQuery] = useState(""); // 1\n  const [products, setProducts] = useState<Product[]>([]); // 2\n\n  async function handleSearch() { // 3\n    try {\n      const response = await fetch(`http://localhost:8080/search?q=${query}`);\n      const data = await response.json();\n      setProducts(data as Product[]);\n    } catch (e) {\n      console.log(e);\n    }\n  }\n // Pasos 4 y 5 abajo\n return (\n    <div>\n      <h1>Buscador de Imagenes</h1>\n      <input type="text" onChange={(e) => setQuery(e.target.value)} />\n      <button onClick={handleSearch}>Buscar</button>\n      <br></br>\n      {products.map((p) => (\n        <>\n          <img src={p.image} />\n          <div> {p.title} </div>\n        </>\n      ))}\n    </div>\n  );\n}\n\nexport default App;\n'
            }
          />
          <p>
            Si todo salio bien, deberían mostrarse los resultados al apretar el
            botón de buscar.
          </p>
          <img src="./assets/blog/resultados.png" />
          <p> Funciona! 🥳🎉</p>
          <h2 className="text-2xl font-semibold">Últimas palabras</h2>
          <p>
            En este caso fue bastante sencillo crear un webscrapper y mostrar
            los resultados en una aplicación de React.
          </p>
          <p>
            Pero otros sitios requieren iniciar sesión, resolver
            captchas o bloqueen actividad sospechosa, sin embargo, donde hay
            voluntad, hay un camino.
          </p>
          <p>Hasta luego!</p>
        </div>
      </div>
    </>
  );
}
