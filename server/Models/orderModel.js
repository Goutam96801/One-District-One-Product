import mongoose, {Schema} from "mongoose";

const orderSchema = mongoose.Schema({

    order_id: {
        type: String,
        required: true,
        unique: true
    },
    order_items: [
        {
        name: { type:String, required:true },
        quantity: { type:Number, required:true },
        image: {type: String},
        price: {type: Number, required:true},
        product: {
            type: Schema.Types.ObjectId,
            required:true,
            ref: 'products'
        },
    }
    ],
    shippingAddress: {
        address: { type: String, required:true },
        city: { type: String, required:true },
        postalCode: { type: String, required:true },
        country: { type: String, required:true }
    },
    user: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'users'
    },
    payment_method: {
        type: String,
        required:true,
    },
    is_delivered: {
        type: Boolean,
        required: true,
        default: false
    },
    deliveredAt: {
        type:Date
    }
},
{
    timestamps: true,
}
)

export default mongoose.model('order', orderSchema)