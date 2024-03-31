import { getEmail } from "@/database/users";
import { saveCookie } from "../../cokie";

export async function POST(req: Request) {
   const { email, password } = await req.json();
   const user = await getEmail(email)
   if (user) {
      const result = user.password === password
      if (result) {
         await saveCookie({
            id: user.id,
            email: user.email,
            username: user.username,
            role: user.user_role
         })
         return Response.json({ success: true, message: 'Giris ustunlikli' });
      }
      return Response.json({success:false,  message: "Girizilen maglumatlar yalnys" });
   }
   return Response.json({success:false, message: "Girizilen maglumatlar yalnys" });
}
