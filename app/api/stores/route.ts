import { cookies } from "next/headers";
import { saveCookie, verifyCookie } from "../cokie";
import { NextResponse } from "next/server";
import { createBusiness, getId } from "@/database/users";
import { JWTPayload } from "jose";

export async function POST(req: Request) {
   try {
      const session = cookies().get("Bearer")?.value;
      if (!session) return new NextResponse('Unauthorized', {status: 403});
      const verified: JWTPayload =  await verifyCookie(session);
      if (!verified) return new NextResponse('Unauthorized', {status: 403});
      const body = await req.json();
      const {name} = body
      if (!name) return new NextResponse('Name is required', {status: 400});
      const store = await createBusiness({
         id: verified.id,
         business_name: name,
      })
      const {id, email, username, user_role} = await getId(verified.id)
      await saveCookie({
         id,
         email,
         username,
         role: user_role
      })
      return NextResponse.json(store);
   } catch (error) {
      console.log('errror store', error);
      return new NextResponse('interval server error', {status: 500})
   }
}
