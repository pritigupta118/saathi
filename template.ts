// template.ts
import { Template, waitForURL } from 'e2b'

export const template = Template()
    .fromNodeImage('22-slim')
    .setWorkdir('/home/user/nextjs-app')
    .runCmd(
        'npx --yes create-next-app@15.3.4 . --yes'
    )
    .runCmd('npx --yes shadcn@2.6.3 init --yes -b neutral --force')
    .runCmd('npm install tw-animate-css clsx tailwind-merge')
    .runCmd('mkdir -p lib').runCmd(`echo 'import { clsx } from "clsx"; import { twMerge } from "tailwind-merge"; export function cn(...inputs: any[]) { return twMerge(clsx(inputs)); }' > lib/utils.ts`)
    .runCmd('npx --yes shadcn@2.6.3 add --all --yes')
    .runCmd('cp -r /home/user/nextjs-app/. /home/user/ && rm -rf /home/user/nextjs-app')
    .setWorkdir('/home/user')
    .setStartCmd('npx next --turbo', waitForURL('http://localhost:3000'))