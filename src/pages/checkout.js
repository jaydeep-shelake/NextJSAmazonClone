import Head from 'next/head'
import Image from 'next/image';
import { useSelector } from 'react-redux';
import CheckoutProducts from '../component/Product/CheckoutProducts';
import { selectItems ,selectTotal} from '../slices/basketSlice';
import Currency from 'react-currency-formatter'
import {useSession } from 'next-auth/client';
const Checkout = () => {

    const items = useSelector(selectItems)
    const total = useSelector(selectTotal)
    const session=useSession()
    return (
        <>
        <Head>
            <title>{"Checkout"}</title>
        </Head>
        <div className="bg-gray-100">
            <main className="lg:flex max-w-screen-2xl mx-auto">
               {/* left */}
                 <div className="flex-grow m-5 shadow-sm">
                   <Image src="https://links.papareact.com/ikj"
                   width={1020}
                   height={250}
                   objectFit="contain"
                   />
                   <div className="flex flex-col p-5 space-y-10 bg-white">
                       <h1 className="text-3xl border-b pb-4">{items.length===0?'Your Cart is emty':'Your Shopping Basket'}</h1>
                      {items.map((item,index)=>(
                          <CheckoutProducts key={index}
                          id={item.id}
                          title={item.title}
                          price={item.price}
                          rating={item.rating}
                          hasPrime={item.hasPrime}
                          description={item.description}
                          category={item.category}
                          image={item.image}
                          hasPrice={item.hasPrice}
                          />
                      ))}
                   </div>

                 </div>

               {/* right */}
               <div className="flex flex-col bg-white p-10 shadow-md">
                {items.length>0&&(
                    <>
                      <h2 className="whitespace-nowrap">Subtotal({items.length} items):
                      <span className="font-bold"><Currency quantity={total*50} currency="INR"/></span>
                      </h2>
                      {
                        !session?(
                      <button className="button mt-2 from-gray-300 to-gray-500 border-gray-200 text-gray-300">
                          Sign in
                      </button>
                        ):(
                            <button className="button">
                               Proceed checkout
                            </button>  
                        )
                     }
                    </>
                )}
               </div>
            </main>
        </div>
        </>
    )
}

export default Checkout
