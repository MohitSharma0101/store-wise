'use client'

import { CreateStoreModel } from "@/components/modals/create-store-modal";
import { useEffect, useState } from "react"


export const ModalProvider = () => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    return (
        <>
            {
                (isMounted && <CreateStoreModel />)
            }
        </>
    )
}