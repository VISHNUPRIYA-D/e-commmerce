import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import { Link } from 'react-router-dom'


const ProductItem = ({id,image_url,product_name,price}) => {
    const {currency,backendUrl} = useContext(ShopContext)
 
    return (
    <Link to={`/product/${id}`} className='text-gray-700 cursor-pointer'>
        <div className='overflow-hidden place-items-center'>
            <img className='sm:h-[220px] h-[190px]  hover:scale-110 transition ease-in-out ' src={`${backendUrl}/uploads/${image_url}` } alt={product_name} />
        </div>
        <p className='pt-3 pb-1 text-sm'>{product_name }</p>
        <p className='text-sm font-medium'>{currency}{price.toFixed(2)}</p>
    </Link>
  )
}

export default ProductItem;
