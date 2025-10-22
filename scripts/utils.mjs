import fs from 'node:fs'
import path from 'node:path'

export function getPackages(rootDir = process.cwd()) {
  const packagesDir = path.join(rootDir, 'packages')

  const subDirs = fs.readdirSync(packagesDir)
  return subDirs
    .map((dir) => {
      const pkgPath = path.join(packagesDir, dir)
      const pkgJsonPath = path.join(pkgPath, 'package.json')

      if (fs.existsSync(pkgJsonPath)) {
        const pkg = JSON.parse(fs.readFileSync(pkgJsonPath, 'utf-8'))
        return { name: pkg.name || dir, dir: pkgPath, pkg }
      }
      return null
    })
    .filter(Boolean)
}
