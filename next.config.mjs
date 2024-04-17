import remarkGfm from 'remark-gfm'
import createMDX from '@next/mdx'
import { remarkCodeHike } from '@code-hike/mdx'

/** @type {import('next').NextConfig} */
const nextConfig = {    
    pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
}

const withMDX = createMDX({    
    options: {
        remarkPlugins: [[remarkCodeHike, { theme: "dracula-soft", showCopyButton: true }],remarkGfm],       
        rehypePlugins: [],
    },
})

// Merge MDX config with Next.js config
export default withMDX(nextConfig)
