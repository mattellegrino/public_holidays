'use client';
import React, { useEffect, useState } from 'react'
import shuffle from 'lodash/shuffle';
import MemoryCard from './memory_card';

interface MemoryGameProps {
    imagesURL: string[];
}

interface MemoryCard {
    id: number;
    imageURL: string;
    isMatched: boolean;
    isFlipped: boolean;
}


function MemoryGame({imagesURL}: MemoryGameProps) {

    const [reset,setReset] = useState<boolean>(false);
    const [memoryCards, setMemoryCards] = useState<MemoryCard[]>([]);
    const [memoryCardSelected, setMemoryCardSelected] = useState<MemoryCard>();
    const [selectedCards,setSelectedCards] = useState<number>(0);

    function handleSelection(cardSelected: MemoryCard){
        if(!cardSelected.isMatched ){
            if(!memoryCardSelected){
                setSelectedCards(1);
                setMemoryCards(prev => 
                    prev.map(memoryCard => 
                    memoryCard.id === cardSelected.id ?
                    {...memoryCard,isFlipped: true} :
                    memoryCard
                    ))
                setMemoryCardSelected(cardSelected);
            }
            else if(selectedCards < 2){
                    setSelectedCards(prev => prev + 1);
                if(cardSelected.imageURL === memoryCardSelected.imageURL){ //trovato 
                    setMemoryCards(prev => 
                    prev.map(memoryCard => 
                    memoryCard.imageURL === cardSelected.imageURL ?
                    {...memoryCard,isFlipped: true, isMatched: true} :
                    memoryCard
                    ))
                setMemoryCardSelected(undefined);
                }
                else { //non trovato
                    setMemoryCards(prev => 
                    prev.map(memoryCard => 
                    memoryCard.id === cardSelected.id ?
                    {...memoryCard,isFlipped: true} :
                    memoryCard
                    ))

                    setTimeout(() => {
                    setMemoryCards(prev => 
                    prev.map(memoryCard => 
                    (memoryCard.imageURL === cardSelected.imageURL || memoryCard.imageURL === memoryCardSelected.imageURL) ?
                    {...memoryCard,isFlipped: false} :
                    memoryCard
                    ));
                    setMemoryCardSelected(undefined);
                    },1000)
                }
            }
        }
    }

    useEffect(() => {
        if(imagesURL){
        const duplicated = [...imagesURL, ...imagesURL];
        const memoryCards : MemoryCard[] = duplicated.map((url,index) => ({id: index, imageURL: url, isMatched: false, isFlipped: true}));
        setMemoryCards(shuffle(memoryCards));
        }

        setTimeout(() => {
            setMemoryCards(prev => {
            return prev.map(card => ({...card, isFlipped: false}))});
        }, 1500);
    },[imagesURL,reset])


  return (
    <div>
        {imagesURL && imagesURL.length > 0 && 
            <div style={{ gridTemplateColumns: `repeat(${imagesURL.length}, minmax(0, 1fr))`}} className="grid gap-4 auto-cols-max p-20">
                {memoryCards.map((memoryCard,index)=> (
                    <div key={index} onClick={()=> !memoryCard.isFlipped ? handleSelection(memoryCard) : ''}>
                        <MemoryCard key={index} id={memoryCard.id} src={memoryCard.imageURL} isMatched={memoryCard.isMatched} isFlipped={memoryCard.isFlipped}/>
                    </div>    
                ))}
      </div>
    }   
     <div className='flex justify-center'>
        <button className='bg-green-500 hover:bg-green-700 p-4 rounded text-white cursor-pointer' onClick={()=> setReset(!reset)}>Shuffle again</button>
    </div>
    </div>
  )
}

export default MemoryGame