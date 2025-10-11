import { Metadata } from 'next'

export const siteConfig = {
  name: 'Continuum',
  description: 'Decentralized data ownership ecosystem built on Polkadot. Own your data, control access, earn rewards.',
  url: 'https://continuum.app',
  ogImage: 'https://continuum.app/og.png',
  links: {
    twitter: 'https://twitter.com/continuum',
    github: 'https://github.com/continuum/web3-crm',
  },
}

export function createMetadata(override?: Metadata): Metadata {
  return {
    ...override,
    title: override?.title || {
      default: siteConfig.name,
      template: `%s | ${siteConfig.name}`,
    },
    description: override?.description || siteConfig.description,
    keywords: [
      'Polkadot',
      'Web3',
      'Data Ownership',
      'Privacy',
      'CRM',
      'Smart Contracts',
      'DOT',
      'ink!',
      ...(Array.isArray(override?.keywords) ? override.keywords : []),
    ],
    authors: [
      {
        name: 'Continuum',
        url: siteConfig.url,
      },
    ],
    creator: 'Continuum',
    openGraph: {
      type: 'website',
      locale: 'en_US',
      url: siteConfig.url,
      title: typeof override?.title === 'string' ? override.title : siteConfig.name,
      description: override?.description || siteConfig.description,
      siteName: siteConfig.name,
      images: [
        {
          url: siteConfig.ogImage,
          width: 1200,
          height: 630,
          alt: siteConfig.name,
        },
      ],
      ...override?.openGraph,
    },
    twitter: {
      card: 'summary_large_image',
      title: typeof override?.title === 'string' ? override.title : siteConfig.name,
      description: override?.description || siteConfig.description,
      images: [siteConfig.ogImage],
      creator: '@continuum',
      ...override?.twitter,
    },
    icons: {
      icon: '/favicon.ico',
      shortcut: '/favicon-16x16.png',
      apple: '/apple-touch-icon.png',
    },
    manifest: '/site.webmanifest',
    ...override,
  }
}

// Product-specific metadata
export const productMetadata = {
  myn: createMetadata({
    title: 'Myn - Personal Data Wallet',
    description: 'Own your data. Control who accesses it. Earn rewards in DOT tokens for sharing your information.',
  }),
  ethos: createMetadata({
    title: 'Ethos - Ethical CRM',
    description: 'Consent-based customer relationship management. Request data access ethically, pay fairly in DOT.',
  }),
  continuum: createMetadata({
    title: 'Continuum - Privacy Protocol',
    description: 'Decentralized protocol for privacy-preserving data exchange. Deploy smart contracts, monitor transactions.',
  }),
}
