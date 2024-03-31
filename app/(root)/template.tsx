import type { FC } from "react";
import { redirect } from "next/navigation";
import { getSession } from "@/lib";
import { JWTPayload } from "jose";

interface layoutProps {
   children: React.ReactNode;
}

const layout: FC<layoutProps> = async ({ children }) => {
   const payload: JWTPayload | undefined = await getSession()
   if (payload) {
      if (payload.role === 'business') redirect("/" + payload.id);
   }if (!payload) redirect('/sign')
   return <div>{children}</div>;
};
export default layout;
