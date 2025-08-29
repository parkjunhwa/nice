"use client"

import React from 'react'
import Link from 'next/link'
import { Typography } from '@mui/material'

export interface BreadcrumbItem {
  label: string
  href?: string
  active?: boolean
}

interface BreadcrumbProps {
  items: BreadcrumbItem[]
  separator?: string
  className?: string
}

export default function Breadcrumb({ 
  items, 
  separator = "/", 
  className = "" 
}: BreadcrumbProps) {
  return (
         <nav className={`flex ${className}`} aria-label="Breadcrumb">
       <ol className="flex items-center p-0 m-0 gap-1">
         {items.map((item, idx) => (
           <React.Fragment key={idx}>
             {idx > 0 && (
               <li className="flex items-center">
                 <Typography variant="body2" className="text-gray-400">
                   {separator}
                 </Typography>
               </li>
             )}
                                           <li
                 className={`flex items-center ${item.active ? 'font-semibold text-blue-900' : 'text-gray-500'}`}
                 aria-current={item.active ? 'page' : undefined}
               >
                 {item.href && !item.active ? (
                   <Link href={item.href} className="hover:underline text-gray-500">
                     <Typography variant="body2" component="span">
                       {item.label}
                     </Typography>
                   </Link>
                 ) : (
                   <Typography variant="body2" component="span">
                     {item.label}
                   </Typography>
                 )}
               </li>
           </React.Fragment>
         ))}
       </ol>
     </nav>
  )
}
