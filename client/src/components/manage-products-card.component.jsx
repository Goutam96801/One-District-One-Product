import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom';
import { getDay } from '../common/date';
import { UserContext } from '../App';
import axios from 'axios';

const ProductStats = ({stats}) => {

    return (
        <div className='flex gap-2 max-lg:mb-6 max-lg:pb-6 border-grey max-lg:border-b '>
            {
                Object.keys(stats).map((key, i) => {
                    return <div key={i} className={'flex flex-col items-center w-full h-full justify-center p-4 px-6 ' + (i!= 0 ? " border-grey border-l ": "")}>
                        <h1 className='text-xl lg:text-2xl mb-2'>{stats[key].toLocaleString()}</h1>
                        <p className=' capitalize max-lg:text-dark-grey'>{key.includes("_") ? key.split("_")[1] : key}</p>
                    </div>
                })
            }
        </div>
    )
}

function ManageProductsCard({product}) {

    let { images, product_id, name, createdAt, activity } = product;
    let [showStat, setShowStat] = useState(false);

    let { userAuth: {access_token}} = useContext(UserContext);


  return (
    <div>
      <div className='flex gap-10 border-b mb-6 max-md:px-4 border-grey pb-6 items-center'>
        <img src={images[0]} className='max-md:hidden lg:hidden xl:block w-28 h-28 flex-none bg-grey object-cover'/>

        <div className='flex flex-col justify-between py-2 w-full min-w-[300px]'>
            <div>
                <Link to={`/product/${product_id}`} className=' blog-title mb-4 hover:underline'> {name}</Link>

                <p className='line-clamp-1'>Added on {getDay(createdAt)}</p>
            </div>
            <div className='flex gap-6 mt-3'>
                <Link className='pr-4 py-2 underline'>Edit</Link>

                <button onClick={() => setShowStat(preVal => !preVal)} className='lg:hidden pr-4 py-2 underline'>Stats</button>
                <button onClick={(e) => deleteProduct(product, access_token, e.target)} className='pr-4 py-2 underline text-red'>Delete</button>
            </div>
        </div>

        <div className='max-lg:hidden'>
            <ProductStats stats={activity}/>
        </div>
      </div>

      {
        showStat ? <div className='lg:hidden'>
            <ProductStats stats={activity}/>
            </div> : ""
      }
    </div>
  )
}

const deleteProduct = (product, access_token, target) => {

    let { index, product_id, setStateFunc } = product;

    target.setAttribute("disabled",true);

    axios.post(process.env.REACT_APP_SERVER_DOMAIN + "/delete-product", {
        product_id
    }, {
        headers:  {
            'Authorization': `Bearer ${access_token}`
        }
    })
    .then(({data}) => {
        target.removeAttribute("disabled");

        setStateFunc(preVal => {
             let { deletedDocCount, totalDocs, results } = preVal;

             results.splice(index, 1);

             if(!deletedDocCount){
                deletedDocCount = 0;
             }

             if(!results.length && totalDocs - 1 > 0){
                return null;
             }

             return { ...preVal, totalDocs: totalDocs - 1, deletedDocCount: deletedDocCount + 1}
        })
    })
    .catch(err => {
        console.log(err);
    })
}

export default ManageProductsCard
