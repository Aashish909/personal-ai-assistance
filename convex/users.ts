import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const CreateUser = mutation({
    args:{
        name:v.string(),
        email:v.string(),
        picture:v.string(),
    },
    handler:async(ctx , args) => {
        //if user already exist in Table
        const user = await ctx.db.query('users')
        .filter(q=>q.eq(q.field('email'),args.email))
        .collect();

        if(user?.length==0) {
            //if not thn Add user
            const data ={
                name:args.name,
                email:args.email,
                picture:args.picture,
                credits:5000
            }
            const result = await ctx.db.insert('users', data)
            return data;
        }
        return user[0]

    }
})

export const GetUser= query({
    args: {
        email:v.string(),

    },
    handler:async(ctx , args) => {
        const user = await ctx.db.query('users')
        .filter(q=>q.eq(q.field('email'),args.email))
        .collect();

        return user[0]
    }
})
export const UpdateTokens = mutation({
    args:{
        credits:v.number(),
        uid:v.id('users'),
        orderId:v.optional(v.string())
    },
    handler:async(ctx , args) => {
        if(!args.orderId) 
        {
            const result = await ctx.db.patch(args.uid, {
            credits:args.credits
        })
        } else {
               const result = await ctx.db.patch(args.uid, {
            credits:args.credits,
            orderId: args.orderId
        })
        }

        
    }
})

export const CancelSubscription = mutation({
  args: {
    uid: v.id("users"),
  },
  handler: async (ctx, args) => {
    // Find the user
    const user = await ctx.db.get(args.uid);
    if (!user) {
      throw new Error("User not found.");
    }

    // Update the user by removing the subscription (orderId)
    await ctx.db.patch(args.uid, {
      orderId: undefined, // Remove the subscription ID
    });

    return { message: "Subscription Canceled", success: true };
  },
});