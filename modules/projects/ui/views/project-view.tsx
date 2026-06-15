"use client"

import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { Suspense, useState } from "react";
import { MessagesContainer } from "../components/messages-contanier";
import { Fragment } from "@/lib/generated/prisma";
import { ProjectHeader } from "../components/project-header";
import { FragmentWeb } from "../components/fragment-web";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AppWindowIcon, CodeIcon, Crown } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CodeView } from "@/components/code-view";
import { FileExplorer } from "@/components/file-explorer";

interface Props {
  projectId: string;
}




export const ProjectView = ({ projectId }: Props) => {

  const [activeFragment, setActiveFragment] = useState<Fragment | null>(null)
  const [tabsState, setTabState] = useState<"preview" | "code">("preview")

  return (
    <div className="h-screen">
      <ResizablePanelGroup orientation="horizontal">
        <ResizablePanel
          defaultSize={35}
          minSize={20}
          className="flex flex-col min-h-0"
        >
          <Suspense fallback={<p>Loading project...</p>}>
            <ProjectHeader projectId={projectId} />
          </Suspense>
          <Suspense fallback={<p>Loading messages...</p>}>
            <MessagesContainer
              projectId={projectId}
              activeFragment={activeFragment}
              setActiveFragment={setActiveFragment}
            />
          </Suspense>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel
          defaultSize={65}
          minSize={50}
        >
          <Tabs
          className="h-full gap-y-0"
            defaultValue="preview"
            value={tabsState}
            onValueChange={(value) => setTabState(value as "preview" | "code")}
          >
            <div className="flex items-center justify-between border-b  w-full p-2">
              <TabsList className="h-8 p-0 border rounded-md">
                <TabsTrigger value="preview" >
                  <AppWindowIcon />
                  Preview
                </TabsTrigger>
                <TabsTrigger value="code">
                  <CodeIcon />
                  Code
                </TabsTrigger>
              </TabsList>
              <div className="ml-auto flex items-center gap-x-2">
                <Button asChild>
                  <Link href="/upgrade">
                    <Crown /><span>Upgrade</span>
                  </Link>
                </Button>
              </div>
            </div>
            <TabsContent value="preview">
             
                {
                  !!activeFragment && <FragmentWeb data={activeFragment} />
                }
              
            </TabsContent>
            <TabsContent value="code" className="min-h-0">
              {
                !!activeFragment?.files && (
                  <FileExplorer files={activeFragment?.files as {[file: string] : string}}/>
                )
              }
              
            </TabsContent>
          </Tabs>

        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  )

}