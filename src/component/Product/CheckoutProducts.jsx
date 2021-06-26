import { StarIcon } from '@heroicons/react/outline'
import Image from 'next/image'
import Currency from 'react-currency-formatter'
import { useDispatch } from 'react-redux'
import { removeFromBasket } from '../../slices/basketSlice'

const CheckoutProducts = ({id,
    title,
    price,
    rating,
    hasPrime,
    description,
    category,
    image,
 }) => {

    const dispatch =useDispatch()

const deleteItem =()=>{
 dispatch(removeFromBasket({id}))
}

    return (
        <div className="grid grid-cols-5">
            <Image src={image} height={200} width={200} objectFit="contain"/>

            <div className="col-span-3 mx-5">
                <p className="font-bold">{title}</p>
                 <div className="flex">
                     {Array(rating).fill().map((_,i)=>(
                         <StarIcon key={i} className="h-5 text-yellow-500"/>
                     ))}
                 </div>
                 <p className="text-xs my-2 line-clamp-3">{description}</p>
                 <Currency quantity={price*50} currency="INR"/>
                 {hasPrime&&(
                     <div className="flex items-center space-x-2">
                         <img 
                         loading="lazy"
                         className="w-12"
                         src="https://links.papareact.com/fdw" 
                         alt="prime" />
                         <p className="text-xs text-gray-500">FREE next day Delivery</p>
                     </div>
                 )}
            </div>
            <div className="flex flex-col space-y-2 my-auto justifyy-self-end">
                <button className="button">Whislist</button>
                <button className="button"onClick={deleteItem} >Delete</button>
            </div>
        </div>
    )
}

export default CheckoutProducts
