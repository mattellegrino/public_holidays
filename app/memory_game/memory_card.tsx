'use client'

import React, { useState } from 'react'
import Image from 'next/image';

interface MemoryCardProps {
    id: number,
    src: string,
    isMatched: boolean,
    isFlipped: boolean
}

function MemoryCard({id,src,isFlipped}: MemoryCardProps) {

  return (
    <div className='w-30 h-30 [perspective:1500px] cursor-pointer' >
        <div className={`relative w-full h-full duration-700 [transform-style:preserve-3d] ${
                isFlipped ? "[transform:rotateY(180deg)]" : ""
            }`}>
            <div key={id} className='absolute w-full h-full bg-gray-400 [backface-visibility-hidden]' onClick={()=> ""}></div> 
            <Image alt={`${src}-${id}`} src={src} key={id} width={100} height={100} className='absolute w-full h-full [transform:rotateY(180deg)] [backface-visibility:hidden]'></Image>
            
        </div>
    </div>
  )
}

export default MemoryCard