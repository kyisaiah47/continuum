#!/usr/bin/env tsx
import fs from 'fs'
import path from 'path'

const updates = [
  // Myn pages
  { file: 'app/myn/dashboard/page.tsx', header: 'MynHeader', currentPage: 'dashboard' },
  { file: 'app/myn/vault/page.tsx', header: 'MynHeader', currentPage: 'vault' },
  { file: 'app/myn/requests/page.tsx', header: 'MynHeader', currentPage: 'requests' },
  { file: 'app/myn/access/page.tsx', header: 'MynHeader', currentPage: 'access' },
  { file: 'app/myn/earnings/page.tsx', header: 'MynHeader', currentPage: 'earnings' },
  { file: 'app/myn/settings/page.tsx', header: 'MynHeader', currentPage: 'settings' },

  // Continuum pages
  { file: 'app/continuum/dashboard/page.tsx', header: 'ContinuumHeader', currentPage: 'dashboard' },
  { file: 'app/continuum/contracts/page.tsx', header: 'ContinuumHeader', currentPage: 'contracts' },
  { file: 'app/continuum/explorer/page.tsx', header: 'ContinuumHeader', currentPage: 'explorer' },
  { file: 'app/continuum/api-keys/page.tsx', header: 'ContinuumHeader', currentPage: 'api-keys' },
  { file: 'app/continuum/docs/page.tsx', header: 'ContinuumHeader', currentPage: 'docs' },
  { file: 'app/continuum/playground/page.tsx', header: 'ContinuumHeader', currentPage: 'playground' },
]

for (const { file, header, currentPage } of updates) {
  const filePath = path.join(process.cwd(), file)

  if (!fs.existsSync(filePath)) {
    console.log(`⚠️  Skipping ${file} (not found)`)
    continue
  }

  let content = fs.readFileSync(filePath, 'utf8')

  // Determine import path based on header type
  const headerImport = header === 'MynHeader'
    ? 'import { MynHeader } from "@/components/myn-header"'
    : 'import { ContinuumHeader } from "@/components/continuum-header"'

  // Add header import if not exists
  if (!content.includes(`import { ${header} }`)) {
    // Try to replace ProductSwitcher import
    if (content.includes('import { ProductSwitcher }')) {
      content = content.replace(
        /import { ProductSwitcher } from ["']@\/components\/product-switcher["']/,
        headerImport
      )
    } else {
      // Add after other imports
      const lastImport = content.lastIndexOf('import ')
      const endOfLastImport = content.indexOf('\n', lastImport)
      content = content.slice(0, endOfLastImport + 1) + headerImport + '\n' + content.slice(endOfLastImport + 1)
    }
  }

  // Remove ContinuumLogo import if exists
  content = content.replace(
    /import { ContinuumLogo } from ["']@\/components\/brand\/continuum-logo["']\n?/g,
    ''
  )

  // Remove ProductSwitcher import if still exists (standalone)
  content = content.replace(
    /^import { ProductSwitcher } from ["']@\/components\/product-switcher["']\n?/gm,
    ''
  )

  // Replace the header section - look for the full header block
  const headerRegex = /<header className="fixed top-0[^>]*>[\s\S]*?<\/header>/
  if (headerRegex.test(content)) {
    content = content.replace(
      headerRegex,
      `<${header} currentPage="${currentPage}" />`
    )
  }

  fs.writeFileSync(filePath, content, 'utf8')
  console.log(`✅ Updated ${file}`)
}

console.log('\n🎉 All pages updated!')
