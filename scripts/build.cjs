const { build } = require("@ncpa0cpl/nodepack");
const { toJsonSchema } = require("dilswer");
const path = require("path");
const fs = require("fs/promises");

const p = (loc) => path.resolve(__dirname, "..", loc);

const removeGiImportsPlugin = {
  name: "remove-gi-imports",
  setup(build) {
    build.onResolve({ filter: /^gi?:\/\// }, (args) => ({
      path: args.path.replace(/^gi?:/, ""),
      namespace: "gi",
    }));

    build.onResolve({ filter: /.*/, namespace: "gi" }, (args) => ({
      path: args.path.replace(/^gi?:/, ""),
      namespace: "gi",
    }));

    build.onLoad({ filter: /.*/, namespace: "gi" }, (args) => {
      const name = args.path.replace(/(^gi:\/\/)|(^gi:)|(^\/\/)|(\?.+)/g, "");
      return {
        contents: `export default ${name};`,
      };
    });
  },
};

async function main() {
  try {
    await Promise.all([
      // Build main package
      await build({
        target: "es6",
        srcDir: p("src"),
        outDir: p("dist"),
        tsConfig: p("tsconfig.json"),
        formats: ["cjs", "esm", "legacy"],
        declarations: true,
        exclude: [/polyfills\//],
        isomorphicImports: {
          "./config/eval-js-config/eval-js-config.ts": {
            js: "./config/eval-js-config/eval-js-config.cjs.ts",
            cjs: "./config/eval-js-config/eval-js-config.cjs.ts",
            mjs: "./config/eval-js-config/eval-js-config.esm.ts",
          },
          "./get-dirpath/get-dirpath.ts": {
            js: "./get-dirpath/get-dirpath.cjs.ts",
            cjs: "./get-dirpath/get-dirpath.cjs.ts",
            mjs: "./get-dirpath/get-dirpath.esm.ts",
          },
        },
      }),
      // Build polyfill packages
      await build({
        target: "ESNext",
        srcDir: p("src/polyfills"),
        outDir: p("polyfills"),
        tsConfig: p("tsconfig.json"),
        formats: ["esm"],
        exclude: [/\.d\.ts$/, /index.ts/, /tsconfig/],
        esbuildOptions: { plugins: [removeGiImportsPlugin] },
      }),
    ]);

    const { ConfigSchema } = require(p("dist/cjs/config/config-schema.cjs"));

    const configJsonSchema = toJsonSchema(ConfigSchema, {
      additionalProperties: false,
      customParser: {
        Custom() {
          // EsBuild Plugin
          return {
            type: "object",
            properties: {
              name: { type: "string" },
            },
            additionalProperties: false,
          };
        },
      },
    });

    await fs.writeFile(
      p("dist/config-schema.json"),
      JSON.stringify(configJsonSchema, null, 2)
    );
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}

main();
