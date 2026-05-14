// src/inngest/functions.ts
import { inngest } from "./client";
import { createAgent, openai } from '@inngest/agent-kit';

export const processTask = inngest.createFunction(
  { 
    id: "process-task",
    triggers: { event: "app/task.created" }
  },
  async ({ event, step }) => {

    const codeAgent = createAgent({
  name: 'code-agent',
  system: "You are an expert Next.js developer. You write clean, maintainable, readable code. You write simple Next.js and React snippets. Also style the component using tailwind css",
  model: openai({model: "gpt-4.1"}),
});

const { output } = await codeAgent.run(
  `Write the following snippets: ${event.data.value}` ,
);

return {output}
// [{ role: 'assistant', content: 'function removeUnecessaryWhitespace(...' }]
    
  }
);