'use client'
import { useEffect, useState, type FC } from "react";
import {
   Dialog,
   DialogContent,
   DialogDescription,
   DialogHeader,
   DialogTitle,
} from "@/components/ui/dialog";

interface modalProps {
   title: string;
   description: string;
   isOpen: boolean;
   onClose: () => void;
   children?: React.ReactNode;
}

const Modal: FC<modalProps> = ({
   description,
   isOpen,
   onClose,
   title,
   children,
}) => {
   const  onChange = (open: boolean)=>{
      if (!open) {
         onClose()
      }
   }
   const [isMounted, setisMounted] = useState(false);

   useEffect(()=>{
      setisMounted(true)
   }, [])

   if (!isMounted) {
      return null
   }
   return (
      <Dialog open={isOpen} onOpenChange={onChange}>
         <DialogContent>
            <DialogHeader>
               <DialogTitle>{title}</DialogTitle>
               <DialogDescription>
                  {description}
               </DialogDescription>
            </DialogHeader>
            <div>
               {children}
            </div>
         </DialogContent>
      </Dialog>
   );
};
export default Modal;
