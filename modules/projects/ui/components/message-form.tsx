import z from "zod";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { ArrowUpIcon, Loader2Icon } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";


import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useTRPC } from "@/trpc/client";
import { Field, FieldContent } from "@/components/ui/field";
import { Textarea } from "@/components/ui/textarea";


interface Props {
    projectId: string;
}

const formSchema = z.object({
    value: z.string()
        .min(1, { message: "Value is required" })
        .max(10000, { message: "Value is too long" })

})



export const MessageForm = ({ projectId }: Props) => {
    const trpc = useTRPC()
    const queryClient = useQueryClient()
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            value: ""
        }
    })
    
    const createMessage = useMutation(trpc.messages.create.mutationOptions({
        onSuccess: () => {
            form.reset()
            queryClient.invalidateQueries(
                trpc.messages.getMany.queryOptions({ projectId })

            )
        },

        onError: (error) => {
            toast.error(error.message)
        }
    }))

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        await createMessage.mutateAsync({
            value: values.value,
            projectId
        })
  };
  
   
  const isPending = createMessage.isPending;
  const isButtonDisabled = isPending || !form.formState.isValid;
  const showUsage = false;

    return (
        <form
            onSubmit={form.handleSubmit(onSubmit)}
        >
            <Field>
                <FieldContent>
                    <div className="relative overflow-hidden border p-4 pt-1 rounded-xl">
                        <Textarea
                            {...form.register("value")}
                            placeholder="What would you like to build?"
                            onKeyDown={(e) => {
                                if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
                                    e.preventDefault();
                                    form.handleSubmit(onSubmit)();
                                }
                            }}
                            disabled={isPending}
                              className="
                                         w-full
                                         resize-none
                                         border-0
                                         bg-transparent
                                         shadow-none
                                         focus-visible:ring-0
                                        "
                        />

                        <div className="flex gap-x-2 items-end justify-between pt-2">
                            <div className="text-[10px] text-muted-foreground font-mono">
                                <kbd className="ml-auto pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
                                    <span>&#8984;</span>Enter
                                </kbd>
                                &nbsp;to submit
                            </div>
                       <Button
            disabled={isButtonDisabled}
            className={cn(
              "size-8 rounded-full",
              isButtonDisabled && "bg-muted-foreground border"
            )}
          >
         {isPending ? (
              <Loader2Icon className="size-4 animate-spin" />
            ) : (
              <ArrowUpIcon />
            )}
          </Button>    
                        </div>
                    </div>
                </FieldContent>
            </Field>
        </form>
    );
}