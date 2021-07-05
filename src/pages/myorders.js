import { getSession, useSession } from "next-auth/client";
import { db } from "../firebase";
import moment from "moment";
import { useRouter } from "next/router";
import Order from "../component/Order";
import Head from "next/head";
function Orders({ orders }) {
    const [session] = useSession();
    const router = useRouter();
  console.log(orders)
    return (
        <div>
            <Head>
                <title>{"Orders"}</title>
            </Head>
            <main className="max-w-screen-lg mx-auto p-10">
                <h1 className="text-3xl border-b mb-2 pb-1 border-yellow-400">
                    Your orders
                </h1>

                {session ? (
                    <>
                    <h2 className="text-xl">{orders.length} Orders</h2>
                        <div className="mt-5 space-y-4">
                          {orders?.map(({id,amount,amountShipping,items,timestamp,images})=>(
                             <Order
                             key={id}
                             id={id}
                             amount={amount}
                             amountShipping={amountShipping}
                             items={items}
                             timestamp={timestamp}
                             images={images}
                             />
                          ))}
                        </div>
                    </>
                ) : (
                    <h2>Please sign in to see your orders.</h2>
                )}

                <div className="mt-5 space-y-4">
                    
                </div>
            </main>
        </div>
    );
}

export default Orders;

// Tells nextJS that's no longer a static page
// eg "Please calculate smthg and send it to the user next"
// Here, it's executed by Node.js
export async function getServerSideProps(context) {
    const stripe = require("stripe")('sk_test_51J6xHmSDxCal2IAd8u0Mvbl3ZJkNXTGa4Nqt5yMwweuBj9ImuMjIH3GpXlj6Q9uFaoQinvv6jbLXwWuKb3hG2Wkw00Y2dzMxyy');

    // Get the user logged in credentials...
    const session = await getSession(context);

    if (!session) {
        return { props: {} };
    }

    const stripeOrders = await db
        .collection("user")
        .doc(session.user.email)
        .collection("orders")
        .orderBy("timestamp", "desc")
        .get();

    const orders = await Promise.all(
        stripeOrders.docs.map(async (order) => ({
            id: order.id,
            amount: order.data().amount,
            amountShipping: order.data().amount_shipping,
            images: order.data().images,
            timestamp: moment(order.data().timestamp.toDate()).unix(),
            items: (
                await stripe.checkout.sessions.listLineItems(order.id, {
                    limit: 100,
                })
            ).data,
        }))
    );

    return { props: { orders } };
}
