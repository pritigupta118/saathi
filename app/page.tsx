"use client"

import { Button } from "@/components/ui/button";
import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";


export default function Home() {

  const trpc = useTRPC()

  const {data} = useQuery(trpc.hello.queryOptions({text: "Hello!"}))
  return ( 
   <div className="flex-col items-center justify-center">
    <h1 className="font-bold text-red-600">{JSON.stringify(data)}</h1>
    <Button>Click Me</Button>
    </div>

  );
}
