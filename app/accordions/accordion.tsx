'use client'

import React, { useState } from 'react'
import { Minus, Plus } from 'lucide-react';

interface AccordionItem {
  title: string
  content: string
}

function Accordion({ item }: { item: AccordionItem }) {

    const [expanded, setExpanded] = useState(false);


  return (
    <div className='w-full border-b-2 border-gray-300 py-4 px-2 space-y-2'>
        <div className='flex justify-between transition-all duration-400'>
            <span className='font-bold'>{item.title}</span>
            {expanded ? (
              <Minus className='left-0 cursor-pointer' color='red' onClick={() => setExpanded(false)}></Minus>
            ) : (
              <Plus className='left-0 cursor-pointer' color='red' onClick={() => setExpanded(true)}></Plus>
            )}
        </div>
        {expanded && <p>{item.content}</p>}
    </div>
  )
}

export default Accordion