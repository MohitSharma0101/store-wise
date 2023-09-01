'use client'

import useStoreModal from '@/hooks/use-store-model'
import { useEffect } from 'react';

export default function Home() {
  const {isOpen,onOpen} = useStoreModal();

  useEffect(()=>{
    if(!isOpen){
      onOpen();
    }
  },[isOpen])

  return null;
}
