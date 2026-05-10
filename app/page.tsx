"use client"

import { Button } from "@/components/ui/button";
import { useTRPC } from "@/trpc/client";
import { useMutation, useQuery } from "@tanstack/react-query";


export default function Home() {

  const trpc = useTRPC()

 const invoke = useMutation(trpc.invoke.mutationOptions({}))
  return ( 
   <div className="flex-col items-center justify-center">
    
    <Button onClick={() => {invoke.mutate({id: 1, email:"priti@gmail.com"})}}>Click Me</Button>
    </div>

  );
}
