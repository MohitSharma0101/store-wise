'use client'

import useStoreModal from '@/hooks/use-store-model'
import { UserButton } from '@clerk/nextjs'
import { useEffect } from 'react';

export default function Home() {
  const {isOpen,onOpen} = useStoreModal();

  useEffect(()=>{
    if(!isOpen){
      onOpen();
    }
  },[isOpen])
  return (
    <main className="flex gap-2 p-24">
      Hello Store wise
      <UserButton afterSignOutUrl='/' />
    </main>
  )
}
