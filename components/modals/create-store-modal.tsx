'use client'

import useStoreModal from "@/hooks/use-store-model"
import { Modal } from "@/components/ui/modal";


import * as z from 'zod';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";

const formSchema = z.object({
    name: z.string().min(3, "Store name should have atleast 3 characters.")
});

type FormType = z.infer<typeof formSchema>;

export const CreateStoreModel = () => {
    const storeModal = useStoreModal();

    const form = useForm<FormType>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: ""
        }
    })

    const onSubmit = async (values: FormType) => {
        
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
                                    <Input placeholder="Store-Name" {...field} />
                                </FormControl>
                                <FormMessage className="font-light" /> 
                            </FormItem>
                        )}
                    />
                    <div className="flex gap-2 justify-end">
                        <Button variant={"outline"}
                            onClick={storeModal.onClose}
                        > Cancel </Button>
                        <Button type="submit"> Create </Button>
                    </div>
                </form>
            </Form>
        </Modal>
    )
}