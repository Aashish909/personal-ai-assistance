import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const InsertSelectedAssistants = mutation({
    args: {
        records: v.any(),
        uid: v.id('users')
    },
    handler:async(ctx, args) => {
        const insertedIds= await Promise.all(
            args.records.map(async(record:any) => 
            await ctx.db.insert('userAiAssistants', {
                ...record,
                aiModelId:'Google: Gemini 1.5',
                uid:args.uid
            })

            )
        )
        return insertedIds
        
    }
})

export const GetAllUserAssistants=query({
    args: {
        uid:v.id('users')
    },
        handler: async(ctx, args)=> {
            const result = await ctx.db
            .query('userAiAssistants')
            .filter(q=>q.eq(q.field('uid'), args.uid))
            .order('desc')
            .collect();

            return result        
            }
})

export const UpdateUserAiAssistant = mutation({
    args:{
        id:v.id('userAiAssistants'),
        userInstruction:v.string(),
        aiModelId:v.string(),
    },
    handler: async (ctx , args) => {
        const result = await ctx.db.patch(args.id,{
            aiModelId:args.aiModelId,
            userInstruction:args.userInstruction
        })
        return result;
    }
})
export const deleteAssistant = mutation({
    args: {
        id: v.id('userAiAssistants') // Ensure 'userAiAssistant' exists in your schema
    },
    handler: async (ctx, args) => {
        try {
            await ctx.db.delete(args.id);
            return { success: true, message: 'Assistant deleted successfully.' };
        } catch (error) {
            return { success: false, message: 'Failed to delete assistant.' };
        }
    }
});