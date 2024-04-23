import mongoose, { Schema } from "mongoose";
const userSchema = mongoose.Schema({
    personal_info: {
        fullname: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        username: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true,
        },
    },
    cart: {
        type: [Schema.Types.ObjectId],
        ref: 'products',
        default: [],
    },
    orders: {
        type: [Schema.Types.ObjectId],
        ref: 'orders',
        default: []
    },
    account_info: {
        total_item_in_cart: {
            type: Number,
            default: 0
        },
        total_order_placed: {
            type: Number,
            default: 0
        },
    },
},
{
    timestamps:{
        createdAt:'createdAt'
    }
}
)

export default mongoose.model("users", userSchema);