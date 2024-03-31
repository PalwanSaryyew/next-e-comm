'use client'
import { useState, type FC } from "react";
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from "zod";
import Modal from "./Modal";
import { useStoreModal } from "@/hooks/use-store-modal";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import axios from 'axios'

const formSchema = z.object({
   name: z.string().min(1),
});

interface StoreModalProps {}

const StoreModal: FC<StoreModalProps> = ({}) => {
   const storeModal = useStoreModal();
   const [loading, setloading] = useState(false);
   const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
         name: '',

      },
   })

   const onSubmit = async (values: z.infer<typeof formSchema>)=>{
      try {
         setloading(true)
         const response = await axios.post('/api/stores',values)
         if(response) window.location.assign('/'+response.data.id) 
      } catch (error) {
         toast.error('something went wrong')
      } finally{
         setloading(false)
      }
   }
   return <Modal
      title="Create Store"
      description="Add a new store"
      isOpen={storeModal.isOpen}
      onClose={storeModal.onClose}
   >
      <div>
         <div className="space-y-6 py-6 pb-6">
            <div className="space-y-6">
               <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)}>
                     <FormField
                        control={form.control}
                        name="name"
                        render={({field})=>(
                           <FormItem>
                              <FormLabel>Name</FormLabel>
                              <FormControl>
                                 <Input 
                                    disabled={loading}
                                    placeholder="E-commerce"
                                 {...field}></Input>
                              </FormControl>
                              <FormMessage/>
                           </FormItem>
                        )}
                     >
                     </FormField>
                     <div className="pt-9 space-x-2 flex items-center justify-end w-full">
                        <Button disabled={loading} variant='secondary' onClick={storeModal.onClose}>Cancel</Button>
                        <Button disabled={loading} type="submit">Contunie</Button>
                     </div>
                  </form>
               </Form>
            </div>
         </div>
      </div>
   </Modal>;
};
export default StoreModal;
