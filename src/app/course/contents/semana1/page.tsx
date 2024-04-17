
'use client'
import dynamic from 'next/dynamic'
import React from 'react'



const Component = dynamic(() => import('./content.mdx'), {
    ssr: false,
}) 

export default function page() {       
    return (
        <div>
            <Component />           
        </div>
    )
}
