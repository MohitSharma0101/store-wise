import prismaDb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs"
import { redirect } from "next/navigation";

export default async function DashboardLayout({
    params,
    children,
  }: {
    params: {name: string}
    children: React.ReactNode
  }) {

    const {userId} = auth();

    if(!userId){
        redirect('/sign-in')
    }

    const store = await prismaDb.store.findFirst({
      where:{
        name: params.name,
        userId
      }
    })

    if(!store) {
      redirect('/');
    }
    
    return (
        <div>
            This is the Navbar 
            {children}
        </div>
    )
  }