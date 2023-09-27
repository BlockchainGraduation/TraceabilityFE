'use client'
import { Input } from 'antd'
import React from 'react'

const {Search}=Input
export default function HomePage() {
  return (
    <div className='w-full h-full pt-[100px]'>
      <div className='flex'>
        <Search className='m-auto' placeholder="input search text" onSearch={()=>{}} style={{ width: 500 }} />
      </div>
    </div>
  )
}
