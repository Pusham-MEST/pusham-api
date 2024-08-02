import joi from "joi";

// register schema
// export cont


// mainpage schema
// 
export const mainPageSchema = joi.object({
   featuredNeighborhoods: joi.string(),
    recentOutages: joi.string(),
    updatedAt: joi.date(),
})
   