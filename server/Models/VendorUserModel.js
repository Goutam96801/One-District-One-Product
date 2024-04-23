import mongoose, { Schema } from 'mongoose';

const vendorUserSchema = mongoose.Schema({
    personal_info: {
        fullname: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        username: {
            type: String,
            required: true,
            unique: true
        },
        state: {
            type: String,
            required: true
        },
        pincode: {
            type: Number,
            required: true
        },
        role: {
            type: String,
            default: 'vendor',
            required: true
        },
        isVerified: {
            type: Boolean,
            required: true,
            default: false
        },
    },
    account_info: {
        total_products: {
            type: Number,
            default: 0
        },
        total_product_sold: {
            type: Number,
            default: 0
        },
        rating: {
            type: Number,
            default: 0
        },
        total_income: {
            type: Number,
            default: 0
        },
    },
    products: {
        type: [Schema.Types.ObjectId],
        ref: 'products',
        default: [],
    }
},
    {
        timestamps: {
            updatedAt: 'updatedAt'
        }
    }
)

export default mongoose.model("vendor_users", vendorUserSchema);