import { prisma } from "../Database/db.js";

export const GET_REFER = async(req,res)=>{
    try {
        const referral = await prisma.referral.findMany({
            orderBy:{
                createdAt:'desc'
            }
        });
        if(!referral)
            return res.status(404).json({message:"No referral found"});
     res.status(200).json(referral);
    } catch (error) {
        res.status(500).json({error:'Error fetching referral'})
    }
}
