/* eslint-disable */
const esbuild = require("esbuild");
const pkg = require("../package.json");
const { dtsPlugin } = require("esbuild-plugin-d.ts");

async function main() {
  const external = [];

  if (pkg.dependencies) external.push(Object.keys(pkg.dependencies));
  if (pkg.peerDependencies) external.push(Object.keys(pkg.peerDependencies));

  esbuild.build({
    entryPoints: ["./src/index.ts"],
    outdir: "dist",
    minify: false,
    bundle: true,
    format: "esm",
    target: "es6",
    jsxFactory: "React.createElement",
    jsxFragment: "React.Fragment",
    tsconfig: "./tsconfig.build.json",
    external,
    sourcemap: true,
    incremental: true,
    // plugins: [dtsPlugin()],
    watch: {
      onRebuild(error) {
        if (error) {
          console.log(`× ${pkg.name}: An error in prevented the rebuild.`);
          return;
        }
        console.log(`✔ ${pkg.name}: Rebuilt.`);
      },
    },
  });
}

main();
