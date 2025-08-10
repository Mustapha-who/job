import {auth} from "@/auth";
import { NextResponse } from "next/server";
import {prisma} from "@/lib/prisma";


export async function POST(request: Request) {
  
    const session = await auth();

    if (!session?.user || !session.user.id) {
       return NextResponse.redirect(new URL("/auth/signin", request.url));
    }


    try {
        const data = await request.json()
        
        const job = await prisma.job.create({
            data :{
                ...data,
                postedById: session.user.id
            }
        })

        return NextResponse.json(job)
    }catch (error){
        console.error("Error creating job:", error);
        return new NextResponse("Internal Server Error", { status: 500 });

    }
}