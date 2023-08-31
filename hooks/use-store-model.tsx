'use client'

import { create } from "zustand";

interface UseStoreModelProps {
    isOpen: boolean,
    onOpen: () => void,
    onClose: () => void
}

const useStoreModal = create<UseStoreModelProps>((set) => ({
    isOpen: false,
    onOpen: () => set({isOpen: true}),
    onClose: () => set({isOpen: false})
}));

export default useStoreModal;