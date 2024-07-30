"use server";
import {eq} from "drizzle-orm";
import {revalidatePath} from "next/cache";
import {db} from "@/db/drizzle";
import {users , animals} from "@/db/schema"; 
import { clerkClient } from "@clerk/nextjs/server";



export const getUser = async (userId: any) => {
const user = await db.query.users.findMany(
  {
    where : (users , {eq}) => eq(users.clerkId , userId) , 
    with  : {
      animals: true,
    }
  }
)
return user

}

export const getAllUsers = async () => {
  const data = await db.select().from(users);
  return data;
};


export const addUser = async (user : any) => {
  await db.insert(users).values({ 
    password : user?.password,
    clerkId : user?.clerkId,
    email : user?.email,
    name : user?.name!,  
    firstName : user?.firstName,  
    lastName : user?.lastName,
    photo : user?.photo
  })
  .returning({clerkClientId : users?.clerkId})
  // revalidatePath("/");
};