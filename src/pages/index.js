import Head from "next/head";
import Banner from '../component/Banner/Banner';
import ProductFeed from '../component/Product/ProductFeed';
export default function Home({products}) {
  // console.log(props)
  return (
    <div>
      <Head>
        <title>Amazon Clone</title>
      </Head>
      <main className="mx-auto">
        {/* Banner */}
           <Banner/>
        {/* Product */}
        <ProductFeed products={products}/>
      </main>
    </div>
  );
}
export async function getServerSideProps(context){
  const products=await fetch('https://fakestoreapi.com/products')
  .then(res=>res.json())
  //  console.log(res)
  return{
    props:
    {
      products
    }
  }
  }