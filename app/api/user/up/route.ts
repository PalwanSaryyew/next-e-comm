import { getEmail, createUser } from "@/database/users";
import { saveCookie } from "../../cokie";

export async function POST(req: Request) {
   const { email, password, username } = await req.json();

   if (await getEmail(email)) {
      return Response.json({
         success: false,
         message: "kullanici mevcut",
      });
   }

   const user = {
      email,
      password,
      username,
      role: 'user'
   };

   try {
      await createUser(user);
      const {id, email: emaiL, username, user_role} = await getEmail(email)
      await saveCookie({
         id,
         email: emaiL,
         username,
         role: user_role
      })
      return Response.json({
         success: true,
         message: 'Ustunlkli'
      });
   } catch (error: any) {
      return Response.json({ error: error.message });
   }
}
