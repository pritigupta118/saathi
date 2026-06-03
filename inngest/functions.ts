// src/inngest/functions.ts
import { Sandbox } from "@e2b/code-interpreter";

import { inngest } from "./client";
import { createAgent, openai } from '@inngest/agent-kit';
import { getSandbox } from "./utils";

export const processTask = inngest.createFunction(
  { 
    id: "process-task",
    triggers: { event: "app/task.created" }
  },
  async ({ event, step }) => {

    const sandboxId = await step.run("get-sandbox-id", async () => {
      const sandbox = await Sandbox.create("saathi-nextjs-test-2")
      return sandbox.sandboxId
    })

    const codeAgent = createAgent({
  name: 'code-agent',
  system: "You are an expert Next.js developer. You write clean, maintainable, readable code. You write simple Next.js and React snippets. Also style the component using tailwind css",
  model: openai({model: "gpt-4.1"}),
});

const { output } = await codeAgent.run(
  `Write the following snippets: ${event.data.value}` ,
);

const sandboxUrl = await step.run("get-sandbox-url", async () => {
  const sandbox = await getSandbox(sandboxId)
  const host = sandbox.getHost(3000)

  return `https://${host}`
})

return {output, sandboxUrl}
// [{ role: 'assistant', content: 'function removeUnecessaryWhitespace(...' }]
    
  }
);