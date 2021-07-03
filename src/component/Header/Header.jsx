import Image from 'next/image';
import Link from 'next/link';
import {signIn,signOut,useSession} from 'next-auth/client'
import{MenuIcon,SearchIcon,ShoppingCartIcon} from '@heroicons/react/outline'
import {useRouter} from 'next/router'
import { useSelector } from 'react-redux';
import { selectItems } from '../../slices/basketSlice';
const Header = () => {
    const [session]=useSession();
     const router = useRouter();
     const items = useSelector(selectItems);
    return (
        <header>
            {/* top nav */}
            <div className="flex items-center bg-amazon_blue p-1 flex-grow py-2">
               <div className="mt-2 flex flex-grow sm:flex-grow-0">
                <Link href="/"><a><Image src="https://links.papareact.com/f90"
                width={150}
                height={40}
                objectFit="contain"
                className="cursor-pointer"
                /></a></Link>
               </div>
               {/* searh */}
               <div className="hidden sm:flex bg-yellow-400  items-center h-10 rounded-md flex-grow hover:bg-yellow-500 cursor-pointer">
               <input type="text" className="p-2 h-full w-6 flex-grow flex-shrink rounded-l-md outline-none px-4" />
               <SearchIcon className="h-12 p-4"/>
               </div>
               <div className="text-white flex items-center text-xs space-x-6 mx-6 whitespace-nowrap">
                   <div className="link cursor-pointer" onClick={signIn}>
                       <p>{session?`Hello! ${session.user.name}`:'SignIn'}</p>
                       <p className="font-extrabold md:text-sm">Account&List</p>
                   </div>
                   <div onClick={()=>session&&router.push('/myorders')} className="link cursor-pointer">
                    <p>Returns</p>
                    <p className="font-extrabold md:text-sm ">& Orders</p>
                   </div>
                   <div className="link cursor-pointer relavtive flex items-center" onClick={()=>router.push('/checkout')}>

                   <ShoppingCartIcon className="h-10"/>
                    <span className="absolute cursor-pointer top-0 right-0 md:right-16 top-3 h-4 w-4 bg-yellow-400 rounded-full text-center text-black font-bold">{items.length}</span>
                    <p className="hidden md:inline font-extrabold md:text-sm mt-2">Basket</p>
                    
                   </div>
               </div>
            </div>
            {/* bottom nav */}
            <div className="flex space-x-3 items-center bg-amazon_blue-light p-2 text-white text-sm">
              <p className="link flex items-center">
                 <MenuIcon className="h-6 mr-1"/> 
                 All
              </p>
              <p className="link">Prime Videos</p>
              <p className="link">Amazon bussiness</p>
              <p className="link">Today's Deal</p>
              <p className="link hidden lg:inline-flex">Electronics</p>
              <p className="link hidden lg:inline-flex">Customer service</p>
              <p className="link hidden lg:inline-flex">New Realse</p>
              <p className="link hidden lg:inline-flex">Amazon Pay</p>
            </div>
        </header>
    )
}

export default Header
