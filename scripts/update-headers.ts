#!/usr/bin/env tsx
import fs from 'fs'
import path from 'path'

// Ethos pages to update
const ethosPages = [
  { file: 'app/ethos/activities/page.tsx', currentPage: 'activities' },
  { file: 'app/ethos/tasks/page.tsx', currentPage: 'tasks' },
  { file: 'app/ethos/data-access/page.tsx', currentPage: 'data-access' },
  { file: 'app/ethos/contacts/page.tsx', currentPage: 'contacts' },
]

for (const { file, currentPage } of ethosPages) {
  const filePath = path.join(process.cwd(), file)
  let content = fs.readFileSync(filePath, 'utf8')

  // Add EthosHeader import if not exists
  if (!content.includes('import { EthosHeader }')) {
    content = content.replace(
      /import { ProductSwitcher } from ["']@\/components\/product-switcher["']/,
      'import { EthosHeader } from "@/components/ethos-header"'
    )
  }

  // Remove ContinuumLogo import if exists
  content = content.replace(
    /import { ContinuumLogo } from ["']@\/components\/brand\/continuum-logo["']\n?/g,
    ''
  )

  // Remove ProductSwitcher import if exists
  content = content.replace(
    /import { ProductSwitcher } from ["']@\/components\/product-switcher["']\n?/g,
    ''
  )

  // Replace the header section
  const headerRegex = /<header className="fixed top-0[^>]*>[\s\S]*?<\/header>/
  content = content.replace(
    headerRegex,
    `<EthosHeader currentPage="${currentPage}" />`
  )

  fs.writeFileSync(filePath, content, 'utf8')
  console.log(`✅ Updated ${file}`)
}

console.log('\n🎉 All Ethos pages updated!')
