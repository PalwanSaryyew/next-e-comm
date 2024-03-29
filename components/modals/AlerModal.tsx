'use client'
import { useEffect, useState, type FC } from "react";
import {
   AlertDialog,
   AlertDialogAction,
   AlertDialogCancel,
   AlertDialogContent,
   AlertDialogDescription,
   AlertDialogFooter,
   AlertDialogHeader,
   AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface AlerModalProps {
   isOpen: boolean;
   onClose: () => void;
   onConfirm: () => void;
   loading?: boolean;
}

const AlerModal: FC<AlerModalProps> = ({
   isOpen,
   loading,
   onClose,
   onConfirm,
}) => {
   const onChange = (open: boolean) => {
      if (!open) {
         onClose();
      }
   };
   const [isMounted, setisMounted] = useState(false);
   
   useEffect(() => {
      setisMounted(true);
   }, []);
   
   if (!isMounted) {
      return null;
   }
   
   return (
      <AlertDialog open={isOpen} onOpenChange={onChange}>
         <AlertDialogContent>
            <AlertDialogHeader>
               <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
               <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete
                  your account and remove your data from our servers.
               </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
               <AlertDialogCancel disabled={loading} onClick={onClose}>Cancel</AlertDialogCancel>
               <AlertDialogAction disabled={loading} onClick={onConfirm}>Continue</AlertDialogAction>
            </AlertDialogFooter>
         </AlertDialogContent>
      </AlertDialog>
   );
};
export default AlerModal;
