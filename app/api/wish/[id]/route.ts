import { deleteWish, getWishById, getWishedAnimals } from "@/actions/wishActions";
import { NextRequest, NextResponse } from "next/server";





export const GET = async (request: NextRequest, context: { params: { id: number } }) => {
    try {
        const userId = context.params.id
        const animals = await getWishedAnimals(userId);
        return NextResponse.json(animals, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ message: 'Error fetching user wishlist', error }, { status: 500 });
    }
}




export const DELETE = async (request :NextRequest , context : {params : {id : number}} ) => { 

    const wish = await getWishById(context.params.id);
    try { 
        const wishId = context.params.id
        
        if (!wish) {
            return NextResponse.json({ message: 'Wish not found' }, { status: 404 })
        };
        
        await deleteWish(wishId);
        return NextResponse.json({ message: 'wish deleted successfully' }, { status: 200 });

    } catch (error: any) {
        return NextResponse.json({ message: 'Error deleting the wish', error }, { status: 500 });

    }
}