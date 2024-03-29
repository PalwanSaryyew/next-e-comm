"use client";
import StoreModal from "@/components/modals/StoreModal";
import { useEffect, useState, type FC } from "react";

interface ModalProviderProps {}

const ModalProvider: FC<ModalProviderProps> = ({}) => {
   const [isMounted, setisMounted] = useState(false);
   useEffect(() => {
      setisMounted(true);
   }, []);

   if (!isMounted) {
      return null;
   }
   return (
      <>
         <StoreModal />
      </>
   );
};
export default ModalProvider;
