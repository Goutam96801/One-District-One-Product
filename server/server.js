import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import 'dotenv/config';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { nanoid } from 'nanoid';
import User from './Models/User.js';
import aws from 'aws-sdk';
import Products from './Models/productModel.js';
import VendorUserModel from './Models/VendorUserModel.js';

const app = express();
const PORT = 5000;

app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGODB_URL_ODOP, {
    autoIndex: true
});

const s3 = new aws.S3({
    region: 'ap-south-1',
    accessKeyId: process.env.AWS_ACCESS_KEY_ODOP,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY_ODOP
})

const generateUploadUrl = async () => {
    const date = new Date();
    const imageName = `${nanoid()}-${date.getTime()}.jpeg`;

    return await s3.getSignedUrlPromise('putObject', {
        Bucket: 'one-district-one-product',
        Key: imageName,
        Expires: 1000,
        ContentType: "image/jpeg"
    })
}

app.get('/get-upload-url', (req, res) => {
    generateUploadUrl().then(url => res.status(200).json({ uploadUrl: url })).catch(err => {
        console.log(err.message);
        return res.status(500).json({ error: err.message })
    })
})

const generateUsername = async (fullname) => {
    let username = fullname.split(" ")[0];

    let isUsernameNotUnique = await VendorUserModel.exists({ "personal_info.username": username }).then((result) => result)

    isUsernameNotUnique ? username += nanoid().substring(0, 5) : "";

    return username;
}

const formatDatatoSend = (user) => {
    const access_token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_ODOP)
    return {
        access_token,
        fullname: user.personal_info.fullname,
        email: user.personal_info.email,
        username: user.personal_info.username,
        isVerified: user.personal_info.isVerified,
        role: user.personal_info.role
    }
}

const formatDatatoSendUser = (user) => {
    const access_token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_ODOP)
    return {
        access_token,
        fullname: user.personal_info.fullname,
        email: user.personal_info.email,
        username: user.personal_info.username,
    }
}

const verifyJWT = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(" ")[1];

    if (token == null) {
        return res.status(404).json({ error: "No access token" })
    }

    jwt.verify(token, process.env.JWT_SECRET_ODOP, (err, user) => {
        if (err) {
            console.log(err);
            return res.status(403).json({ error: "Access token is invalid" })
        }
        req.user = user.id
        next()
    })
}


app.post("/seller/signup", async (req, res) => {

    const { fullname, email, password, state, pincode } = req.body;

    if (!email || !fullname || !password || !state || !pincode) {
        return res.status(400).json({ message: "Missing required fields" });
    }

    const user = await VendorUserModel.findOne({ "personal_info.email": email });

    if (user) {
        return res.status(402).json("User is already registered")
    }

    bcrypt.hash(password, 10, async (err, hashedPassword) => {

        let username = await generateUsername(fullname);

        const user = new VendorUserModel({
            personal_info: {
                email,
                fullname,
                password: hashedPassword,
                username,
                state,
                pincode
            }
        });
        await user.save().then((u) => {
            return res.status(200).json(formatDatatoSend(u))
        }).catch(err => {
            if (err.code == 11000) {
                return res.status(500).json({ "error": err.message })
            }
        })
    })

})

app.post("/seller/login", async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).send({ message: "please enter the required fields!" });
    }

    try {
        const user = await VendorUserModel.findOne({ "personal_info.email": email });

        if (!user) {
            return res.status(401).send({ message: "Email is not registered" })
        }

        const isPasswordMatch = await bcrypt.compare(password, user.personal_info.password);
        if (!isPasswordMatch) {
            return res.status(401).send({ message: "Incorrect Password" });
        }
        const access_token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_ODOP, { expiresIn: '1d' })
        res.status(200).json(formatDatatoSend(user))

    } catch (error) {
        res.status(500).send({ message: "Internal server error", error: error.message })
    }

})

app.post("/signup", (req, res) => {

    const { fullname, email, password } = req.body;

    bcrypt.hash(password, 10, async (err, hashedPassword) => {
        let username = await generateUsername(fullname);
        const user = new User({
            personal_info: {
                fullname,
                email,
                password: hashedPassword,
                username,
            }
        });
        await user.save().then((u) => {
            return res.status(200).json(formatDatatoSendUser(u));
        }).catch(err => {
            if (err.code == 11000) {
                return res.status(500).json({ "error": "Email already registered" })
            }
        })
    })
})

app.post("/login", async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).send({ message: "Email or Password is missing" })
    }

    try {
        const user = await User.findOne({ "personal_info.email": email });

        if (!user) {
            return res.status(401).send({ message: "Email is not registered" });
        }

        const isPasswordMatch = await bcrypt.compare(password, user.personal_info.password);

        if (!isPasswordMatch) {
            return res.status(401).send({ message: "Incorrect password" });
        }

        const access_token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_ODOP, { expiresIn: '30d' })
        res.status(200).json(formatDatatoSendUser(user))
    } catch (error) {
        res.status(500).send({ message: "Internal server error" })
    }
})

app.post('/add-product', verifyJWT, (req, res) => {
    let vendorId = req.user;

    let { name, category, description, price, quantity, images } = req.body;

    if (!name.length) {
        return res.status(403).json({ error: "You must provide some name of your product" });
    }
    if (!category.length) {
        return res.status(403).json({ error: "You must provide a category of your product" });
    }
    if (!description.length) {
        return res.status(403).json({ error: "You must provide a brief description of your product" });
    }
    if (!price == null) {
        return res.status(403).json({ error: "You must provide a price of your product" });
    }
    if (!quantity == null) {
        return res.status(403).json({ error: "You must provide qunatity of your product" });
    }
    if (!images.length) {
        return res.status(403).json({ error: "You must provide minimum one image of your product" });
    }

    let product_id = name.replace(/[^a-zA-Z0-9]/g, ' ').replace(/\s+/g, "-").trim() + nanoid();

    let product = new Products({
        name, category, description, price, quantity, images, vendor: vendorId, product_id
    })

    product.save().then(product => {
        let incrementVal = 1;

        VendorUserModel.findOneAndUpdate({ _id: vendorId }, { $inc: { "account_info.total_products": incrementVal }, $push: { "products": product._id } })
            .then(user => {
                return res.status(200).json({ id: product._id })
            })
            .catch(err => {
                return res.status(500).json({ error: "Internal server error" })
            })
    })
        .catch(err => {
            return res.status(500).json({ error: err.message })
        })
})

app.post('/get-all-product', (req, res) => {
    let { page } = req.body;
    let maxLimit = 20;

    Products.find({})
        .populate("vendor", " personal_info.username -_id")
        .sort({ "addedAt": -1 })
        .select("product_id name images category price quantity activity.rating activity.total_buys")
        .skip((page - 1) * maxLimit)
        .limit(maxLimit)
        .then(products => {
            return res.status(200).json({ products })
        })
        .catch(err => {
            return res.status(500).json({ error: err.message });
        })
})

app.post("/get-product", (req, res) => {
    let { product_id } = req.body;
    let incrementVal = 1;

    Products.findOneAndUpdate({ product_id }, { $inc: { "activity.total_view": incrementVal } })
        .populate("vendor", "personal_info.username personal_info.state personal_info.pincode")
        .select("name description images category price quantity activity.rating activiy.total_buys activity.total_views product_id addedAt ")
        .then(product => {
            return res.status(200).json({ product });
        })
        .catch(err => {
            return res.status(500).json({ error: err.messagge });
        })
})

app.post('/all-product-count', (req, res) => {
    Products.countDocuments({})
        .then(count => {
            return res.status(200).json({ totalDocs: count })
        })
        .catch(err => {
            return res.status(500).json({ error: err.message })
        })
})

app.post('/get-vendor-profile', async (req, res) => {
    let { username } = req.body;

    await VendorUserModel.findOneAndUpdate({ "personal_info.username": username })
        .select(" -personal_info.password -account_info.total_income")
        .then(user => {
            return res.status(200).json(user)
        })
        .catch(err => {
            return res.status(500).json({ error: err.message })
        })
})

app.post('/vendor-dashboard', verifyJWT, (req, res) => {

    let vendor_id = req.user;

    let { page, deletedDocCount, query } = req.body;

    let maxLimit = 10;
    let skipDocs = (page - 1) * maxLimit;

    if (deletedDocCount) {
        skipDocs -= deletedDocCount;
    }

    Products.find({ vendor: vendor_id, name: new RegExp(query, 'i') })
        .skip(skipDocs)
        .limit(maxLimit)
        .sort({ addedAt: -1 })
        .select(" name images description addedAt product_id activity category quantity price -_id")
        .then(products => {
            return res.status(200).json({ products })
        })
        .catch(err => {
            return res.status(500).json({ error: err.message })
        })
})

app.post('/vendor-products-count', verifyJWT, (req, res) => {

    let vendor_id = req.user;

    let { query } = req.body;

    Products.countDocuments({ vendor: vendor_id, name: new RegExp(query, 'i') })
        .then(count => {
            return res.status(200).json({ totalDocs: count })
        })
        .catch(err => {
            return res.status(500).json({ error: err.message })
        })
})

app.post("/delete-product", verifyJWT, (req, res) => {

    let vendor_id = req.user;

    let { product_id } = req.body;

    Products.findOneAndDelete({ product_id })
        .then(product => {
            VendorUserModel.findOneAndUpdate({ _id: vendor_id }, { $pull: { products: product._id }, $inc: { "account_info.total_products": -1 } })
                .then(user => console.log("Product deleted"));
            return res.status(200).json({ status: 'done' });
        })
        .catch(err => {
            return res.status(500).json({ error: err.message })
        })
})

app.post("/add-to-cart", verifyJWT, (req, res) => {

    let incrementVal = 1;
    let userId = req.user;
    console.log(userId)
    let { product_id } = req.body;

    Products.findOne({ product_id })
        .then(product => {
            User.findOneAndUpdate({ _id: userId }, {
                $inc: { "account_info.total_item_in_cart": incrementVal }, $push: { "cart": product._id }
            })
                .then((user) => {
                    return res.status(200).json({ message: "Added to cart ", user })
                }).catch(err => {
                    return res.status(402).json(err);
                })
        })
        .catch(err => {
            return res.status(500).json({ error: "Internal server error", err });
        });


})

app.post("/get-user", verifyJWT, async (req, res) => {

    let user_id = req.user;

    await User.findOne({ _id: user_id })
        .select(" -personal_info.password")
        .then(user => {
            return res.status(200).json(user)
        })
        .catch(err => {
            return res.status(500).json({ error: err.message })
        })

})

app.post("/get-cart-product", verifyJWT, async (req, res) => {
    let userId = req.user;
    try {
        const user = await User.findOne({ _id: userId });
        if (!user) {
            return res.status(401).json("Please login to view your cart");
        }
        const productIds = user.cart;
        if (productIds.length === 0) {
            return res.status(200).json({ message: "Your cart is empty" });
        }

        const products = await Products.find({
            '_id': { $in: productIds }
        });

        if (products.length !== productIds.length) {
            console.error("Mismatch in cart item counts. Expected:", productIds.length, "Got:", products.length);
        }

        return res.status(200).json(products);

    } catch (error) {
        console.error("Failed to fetch products:", error);
        return res.status(500).json({ error: "Internal server error", err: error });
    }
});



app.listen(PORT, () => {
    console.log("Server is running at PORT: " + PORT);
})