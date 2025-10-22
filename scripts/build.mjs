import { rollup } from 'rollup'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { getPackages } from './utils.mjs'
import { createRollupConfig } from './rollup.config.base.mjs'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// 从命令行参数中提取构建模式
const args = process.argv.slice(2)
const mode = args.includes('--dev') ? 'development' : 'production'
const isDev = mode === 'development'
const filterName = args.find((arg) => arg.startsWith('--filter='))?.split('=')[1]

async function buildPackage(pkgInfo) {
  const { name, dir } = pkgInfo
  const input = path.join(dir, 'src/index.ts')
  const outputDir = path.join(dir, 'dist')
  const globalName = `WuhuReactUi${name.replace(/^@.*\//, '').split('-').map((s) => s.charAt(0).toUpperCase() + s.slice(1)).join('')}`

  console.log(`\n🚀 Building ${name} (${mode})...`)

  // 动态创建 rollup 配置
  const config = createRollupConfig({ input, name: globalName, outputDir, isDev })

  // 执行 rollup 构建
  const bundle = await rollup(config)
  for (const output of config.output) {
    await bundle.write(output)
  }

  console.log(`✅ Built ${name}`)
}

async function buildAll() {
  const pkgs = getPackages(path.resolve(__dirname, '..'))
    .filter((p) => !filterName || p.name.includes(filterName))
  for (const pkg of pkgs) {
    await buildPackage(pkg)
  }

  console.log(`\n🎉 All packages built successfully in ${mode} mode!`)
}

buildAll().catch((err) => {
  console.error(err)
  process.exit(1)
})
