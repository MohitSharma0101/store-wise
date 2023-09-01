'use client'

import useStoreModal from "@/hooks/use-store-model"
import { Modal } from "@/components/ui/modal";


import * as z from 'zod';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const formSchema = z.object({
    name: z.string().min(3, "Store name should have atleast 3 characters.")
});

type FormType = z.infer<typeof formSchema>;

export const CreateStoreModel = () => {
    const storeModal = useStoreModal();
    const { toast } = useToast()

    const form = useForm<FormType>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: ""
        }
    })

    const { formState } = form;
    const { isSubmitting } = formState;

    const onSubmit = async (values: FormType) => {
        try {
            const response = await fetch('/api/stores', {
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(values)
            });
            const store = await response.json();
            toast({
                variant: "success",
                title: "Nice Job!",
                description: `Store successfully created.`,
            });
            window.location.assign(`/${store?.name}`);
        } catch (error) {
            console.log(error)
            toast({
                variant: "destructive",
                title: "Something went wrong",
                description: "Try again!!",
            });
        }
    }

    return (
        <Modal
            isOpen={storeModal.isOpen}
            onClose={storeModal.onClose}
            title="Create Store"
            description="Add a new store to manage products and categories."
        >
            <Form {...form}>
                <form
                    className="space-y-4"
                    onSubmit={form.handleSubmit(onSubmit)}>
                    <FormField
                        name="name"
                        control={form.control}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl >
                                    <Input disabled={isSubmitting} placeholder="Store-Name" {...field} />
                                </FormControl>
                                <FormMessage className="font-light" />
                            </FormItem>
                        )}
                    />
                    <div className="flex gap-2 justify-end">
                        <Button disabled={isSubmitting} variant={"outline"}
                            onClick={storeModal.onClose}
                        > Cancel </Button>
                        <Button disabled={isSubmitting} type="submit">
                            Create
                            {isSubmitting && <Loader2 className="animate-spin p-1" />}
                        </Button>
                    </div>
                </form>
            </Form>
        </Modal>
    )
}