import {CheckCircleIcon} from '@heroicons/react/solid'
import Head from 'next/head'
import Link from 'next/link'
const success = () => {
    return (
        <div className="bg-gray-100 h-screen">
            <Head>
               <title>Order Confirmed!</title>
            </Head>
          <main className="max-w-screen-lg mx-auto ">
            <div className="flex flex-col p-10 bg-white ">
                <div className="flex  items-center space-x-2 mb-5">
                    <CheckCircleIcon className="text-green-500 h-10"/>
                    <h1 className="text-3xl">
                    Thank you. your order has been confirmed..!
                    </h1>
                </div>
                <p>
                    Thank you!, for shopping with us .We'll send a confirmation once order is shipped from our wherehouse , if you want to check the status of your order please click link below.
                </p>
               <Link href="/myorders"><a className="button mt-8 text-center"><button className=" ">Go to my Orders</button></a></Link>
            </div>
          </main>
        </div>
    )
}

export default success
