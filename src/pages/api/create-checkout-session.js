const stripe = require('stripe')('sk_test_51J6xHmSDxCal2IAd8u0Mvbl3ZJkNXTGa4Nqt5yMwweuBj9ImuMjIH3GpXlj6Q9uFaoQinvv6jbLXwWuKb3hG2Wkw00Y2dzMxyy')

export default async (req,res)=>{
const {items,email}=req.body;
const transformItemToStrip= items.map(item=>({
    //implisite return
    description:item.description,
    quantity:1,
    price_data:{
        currency:'inr',
        unit_amount:(item.price*50)*100,
        product_data:{
            name:item.title,
            images:[item.image]
        }
    }
}))
const session = await stripe.checkout.sessions.create({
    payment_method_types:['card'],
    shipping_rates:['shr_1J6yYWSDxCal2IAdx8bOyAqp'],
    shipping_address_collection:{
      allowed_countries:['IN','US','GB','CA']
    },
    line_items:transformItemToStrip,
    mode:'payment',
    success_url:`https://next-jsa-mazon-clone.vercel.app/success`,
    cancel_url:`https://next-jsa-mazon-clone.vercel.app/checkout`,
    metadata:{
        email,
        images:JSON.stringify(items.map(item=>item.image))
    }
})
res.status(200).json({id:session.id})
}