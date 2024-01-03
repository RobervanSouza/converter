'use client'
import Link from 'next/link'
import React from 'react'

const NavBar = () => {
  return (
    <div className=' border bg-slate-500 p-4 mx-auto text-center ' >
      <Link href="../app/collections/page.tsx"> Colllection</Link>
    </div>
  )
}

export default NavBar
