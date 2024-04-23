import { useContext, useEffect, useState } from "react";
import InputBox from "../components/input-box";
import ImageUpload from "../files/image.png";
import { uploadImage } from "../common/aws";
import axios from "axios";
import { UserContext } from "../App";
import { toast, Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const productStructure = {
  category: "",
  name: "",
  description: "",
  images: [],
  price: 100,
  quantity: 1,
};

const AddProduct = () => {
  const categories = [
    "Handicrafts",
    "Food Processing",
    "Diary",
    "Agriculture",
    "Textile",
    "Art & Decor",
    "Beauty & Health Products",
    "Tools & Utensils",
    'Marine',
    'Handloom',
    'Manufacturing',
    'Others'
  ];

  let navigate = useNavigate();
  let characterLimit = 1000;
  let nameLimit = 70;
  let imageLimit = 12;
  const [product, setProduct] = useState(productStructure);
  const [imagePreviews, setImagePreviews] = useState([]);

  let {
    userAuth: { access_token },
  } = useContext(UserContext);

  let { name, description, category, images, price, quantity } = product || {};

  const handleImageChange = (e) => {
    const files = e.target.files;
    let loadingToast = toast.loading("loading...");
    if (files && files.length > 0) {
      const selectedImages = Array.from(files).slice(0, imageLimit);
      setImagePreviews([]);

      setProduct({ ...product, images: selectedImages });

      selectedImages.forEach((image) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          setImagePreviews((prevPreviews) => [
            ...prevPreviews,
            e.target.result,
          ]);
        };
        reader.readAsDataURL(image);
        toast.dismiss(loadingToast);
      });
    }
  };

  const handleDesChange = (e) => {
    let input = e.target;

    setProduct({ ...product, description: input.value });
  };

  const handleNameChange = (e) => {
    let input = e.target;
    setProduct({ ...product, name: input.value });
  };

  const handleCategoryChange = (e) => {
    let input = e.target;
    setProduct({ ...product, category: input.value });
  };

  const handlePrice = (e) => {
    const newPrice = parseInt(e.target.value, 10); // Convert string to number
    setProduct((prevProduct) => ({
      ...prevProduct,
      price: newPrice,
    }));
  };

  const handleQuantity = (e) => {
    const newQuantity = parseInt(e.target.value, 10); // Convert string to number
    setProduct((prevProduct) => ({
      ...prevProduct,
      quantity: newQuantity,
    }));
  };

  const handleImageUpload = (e) => {
    e.target.classList.remove("disabled");
    e.preventDefault();
    let loadingToast = toast.loading("Uploading...");
    let uploadedUrls = [];

    if (images.length) {
      e.target.classList.add("disabled");
      Array.from(images).forEach((image) => {
        uploadImage(image).then((url) => {
          if (url) {
            uploadedUrls.push(url);
          }
        });
      });
      toast.dismiss(loadingToast);
      setProduct({ ...product, images: uploadedUrls });
      toast.success("Images uploaded");
    } else {
      toast.dismiss(loadingToast);
      toast.error("Failed to upload images");
      e.target.classList.add("disabled");
    }
  };

  const handleDesKeyDown = (e) => {
    if (e.keyCode == 13) {
      e.preventDefault();
    }
  };

  const handleSubmit = (e) => {

    e.preventDefault();
    if (e.target.className.includes("disable")) {
      return;
    }

    if (price < 100 || price > 100000 || quantity < 1 || quantity > 100) {
      toast.error("Please check the errors in the form.");
      return;
    }

    if (!name.length) {
      return toast.error( "You must provide some name of your product" );
  }
  if (!category.length) {
      return toast.error( "You must provide a category of your product");
  }
  if (!description.length) {
      return toast.error( "You must provide a brief description of your product");
  }
  if (!price == null) {
      return toast.error( "You must provide a price of your product");
  }
  if (!quantity == null) {
      return toast.error( "You must provide qunatity of your product");
  }
  if (!images.length) {
      return toast.error( "You must provide minimum one image of your product");
  }

  e.target.classList.add("disabled");
    let loadingToast = toast.loading("Adding to your E-Shop...");

    let productObj = {
      name,
      category,
      description,
      price,
      quantity,
      images,
    };

    axios
      .post(process.env.REACT_APP_SERVER_DOMAIN + "/add-product", productObj, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      })
      .then(() => {
        toast.dismiss(loadingToast);
        e.target.classList.remove("disabled");
        toast.success("Congratulations, you have added a product👍");
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };

  return (
    <div className="flex flex-col gap-4 p-4 lg:gap-8 lg:p-6">
      <Toaster />
      <div className="flex justify-between items-center">
        <h1 className="font-semibold center text-lg md:text-2xl">
          Add a Product
        </h1>
        <button onClick={(() => {navigate('/')})} className="flex items-center gap-4 hover:bg-dark-grey/20 px-4 py-2 rounded-lg duration-300">
          <i className="fi fi-rr-exit"></i>
          <h1 className="font-semibold text-lg md:text-2xl">Exit</h1>
        </button>
      </div>
      <div className="border-dark-grey/40 border-2 mx-16">
        <div className="grid gap-4">
          <div className="border-dark-grey/40 border-b-2 px-16 py-4">
            <h1 className="font-bold text-xl mb-2">INCLUDE SOME DETAILS</h1>
            {/* category */}
            <div className="grid gap-2 mt-4">
              <label className="text-sm" htmlFor="name">
                Category<span className="text-red">*</span>
              </label>
              <div className="relative w-[100%]">
              <select name="category" onChange={handleCategoryChange} defaultValue="Select"  className=" input-box border-dark-grey/20 placeholder:text-dark-grey/60">
                <option value='select'>Select a category</option>
                {
                  categories.map((category, i) => {
                    return (
                      <option key={i}  value={category}>{category}</option>
                    )
                  })
                }
              </select>
              <i className="fi fi-rr-category-alt input-icon"></i>
              </div>
            </div>
            {/* name */}
            <div className="grid gap-2 mt-8">
              <label className="text-sm" htmlFor="name">
                Product Name <span className="text-red">*</span>
              </label>
              <InputBox
                icon="fi-rr-tags"
                maxLength={nameLimit}
                type="text"
                placeholder="Product name"
                className="border-dark-grey/20 placeholder:text-dark-grey/60"
                required
                onChange={handleNameChange}
                defaultValue={name}
              />
              <p className="flex justify-between">
                <span className="text-sm text-dark-grey/80">
                  Mention the name of your item
                </span>
                <span className="text-sm text-dark-grey/80">
                  {name.length} / {nameLimit}
                </span>
              </p>
            </div>
            {/* description */}
            <div className="grid gap-2 mt-8">
              <label className="text-sm" htmlFor="description">
                Description <span className="text-red">*</span>
              </label>
              <textarea
                maxLength={characterLimit}
                placeholder="Short description about blog"
                className="w-full h-40 leading-tight border-4 p-2 focus:outline-none border-grey text-2xl"
                onChange={handleDesChange}
                onKeyDown={handleDesKeyDown}
                defaultValue={description}
              ></textarea>
              <p className="flex justify-between">
                <span className="text-sm text-dark-grey/80">
                  Mention brief description of your item
                </span>
                <span className="text-sm text-dark-grey/80">
                  {description.length} / {characterLimit}
                </span>
              </p>
            </div>
          </div>

          {/* price and quantity */}
          <div className="border-dark-grey/40 border-b-2 px-16 py-4">
            <h1 className="font-bold text-xl mb-2">PRICE AND QUANTITY</h1>
            <div className="grid gap-2 mt-4">
              <label className="text-sm" htmlFor="price">
                Set A Price <span className="text-red">*</span>
              </label>
              <div className="mb-4">
                <div className=" relative w-[100%]">
                  <InputBox
                    id="price"
                    placeholder="price"
                    defaultValue={price.toString()}
                    required
                    min="100"
                    max="100000"
                    type="number"
                    onChange={handlePrice}
                    className="border-dark-grey/20 placeholder:text-dark-grey/60"
                  />
                  <i className="fi fi-rr-indian-rupee-sign input-icon"></i>
                </div>
                <span className="text-sm text-dark-grey/80">
                  {product.price < 100 ? (
                    <p className="text-red">
                      Price should not be less than 100
                    </p>
                  ) : product.price > 100000 ? (
                    <p className="text-red">Price should be less than 100000</p>
                  ) : (
                    <p>Minimum Price ₹100, Maximum Price ₹100000</p>
                  )}
                </span>
              </div>
            </div>
            <div className="grid gap-2">
              <label className="text-sm" htmlFor="quantity">
                Quantity <span className="text-red">*</span>
              </label>
              <div className="mb-4">
                <div className="relative w-[100%]">
                  <InputBox
                    id="quantity"
                    placeholder="Quantity"
                    defaultValue={quantity.toString()}
                    required
                    type="number"
                    onChange={handleQuantity}
                    minLength="1"
                    maxLength="100"
                    className="border-dark-grey/20 placeholder:text-dark-grey/60"
                  />
                  <i className="fi fi-rr-sort-amount-up input-icon"></i>
                </div>
                <span className="text-sm text-dark-grey/80">
                  {product.quantity < 1 ? (
                    <p className="text-red">
                      There should be minimum of one product
                    </p>
                  ) : product.quantity > 100 ? (
                    <p className="text-red">
                      You can add upto 100 products only
                    </p>
                  ) : (
                    <p>Minimum Quantity 1, Maximum Quantity 100</p>
                  )}
                </span>
              </div>
            </div>
          </div>

          {/* images */}
          <div className="border-dark-grey/40 border-b-2 px-16 py-4">
            <h1 className="font-bold text-xl mb-2">PRODUCT IMAGES</h1>
            <div className="grid gap-2 mt-4">
              <h1 className="font-medium text-xl">Upload up to 12 photos</h1>
              <label className="h-[90px] w-[90px] border-dark-grey relative mx-[8px] border-2 inline-block align-top ">
                <div className="text-dark-grey flex items-center justify-center w-full h-full cursor-pointer flex-col ">
                  <input
                    type="file"
                    accept=".jpg, .jpeg, .png"
                    multiple
                    maxLength={12}
                    minLength={1}
                    hidden
                    onChange={handleImageChange}
                  />
                  <i className="fi fi-rr-add-image text-2xl"></i>
                  <h1>Add photo</h1>
                </div>
              </label>

              <div className="flex justify-center items-center gap-4 mt-2 flex-wrap">
                {imagePreviews.map((preview, index) => (
                  <div
                    key={index}
                    className="h-[90px] w-[90px] border-dark-grey relative border-2"
                  >
                    <img
                      src={preview}
                      alt={`Preview ${index}`}
                      className="object-cover w-full h-full"
                    />
                  </div>
                ))}
              </div>
            </div>

            <button
              className={
                imagePreviews.length ? " btn-dark center mt-2 " : " hidden "
              }
              onClick={handleImageUpload}
            >
              Upload
            </button>
          </div>
        </div>
        <div className="mt-4">
          <button
            type="submit"
            onClick={handleSubmit}
            className="btn-dark mx-4 mb-4 "
          >
            Add to your E-Shop
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
