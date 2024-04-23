import mongoose, { Schema } from "mongoose";

const productSchema = mongoose.Schema({
    product_id:{
        type:String,
        required:true,
        unique:true,
    },
    name:{
        type:String,
        required:true,
    },
    category:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    quantity:{
        type:Number,
        required:true
    },
    images: {
        type: [String],
        required:true
    },
    vendor:{
        type:Schema.Types.ObjectId,
        required: true,
        ref:'vendor_users'
    },
    activity:{
        total_views:{
            type:Number,
            default:0
        },
        total_buys: {
            type:Number,
            default:0
        },
        rating: {
            type:Number,
            default:0
        },
        
    }
},
{
    timestamps: {
        addedAt: 'addedAt'
    }
}
)

export default mongoose.model("products", productSchema);