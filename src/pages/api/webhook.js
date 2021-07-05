import {buffer} from 'micro'
import * as admin from 'firebase-admin'

// secure connection to firebase from the backend
const serviceAccount = require('../../permissons.json');
const app = !admin.apps.length ? admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
}): admin.app();

// action to stripe
const stripe= require('stripe')('sk_test_51J6xHmSDxCal2IAd8u0Mvbl3ZJkNXTGa4Nqt5yMwweuBj9ImuMjIH3GpXlj6Q9uFaoQinvv6jbLXwWuKb3hG2Wkw00Y2dzMxyy')
const endpointSecrete ='whsec_zEOVFm6y5ScWTUUPLTeNfPAkC9bRer3U'

const fullFillOrder=async(session)=>{
    console.log('Fullfill order',session)
    const images = JSON.parse(session.metadata.images).map((image) =>
        JSON.stringify(image)
    );

    return app.firestore().collection('user').doc(session.metadata.email)
    .collection('orders').doc(session.id).set({
        amount:session.amount_total/100,
        amount_shipping:session.total_details.amount_shipping/100,
        images:images,
        timestamp:admin.firestore.FieldValue.serverTimestamp()
    }).then(()=>{
        console.log(`success ${session.id} had been added to DB`)
    })
    .catch((err)=>{
        console.log('Error in linsertion !',err.message)
    })
}

export default async (req,res)=>{
    if(req.method==="POST"){
        const requestBuffer=await buffer(req);
        const payload = requestBuffer.toString();
        const sign =req.headers["stripe-signature"];
        let event;
        //verify it is come from stripe
        try{
            event= stripe.webhooks.constructEvent(payload,sign,endpointSecrete)
        }
        catch(err){
            console.log('ERR',err.message)
         return res.status(400).send(`Webhook error:${err.message}`)
        }

        //handle checkout session completed event
        if(event.type==="checkout.session.completed"){
            const session = event.data.object;
            //fullfill the order
               return fullFillOrder(session).then(()=>res.status(200)).catch(err=>res.status(400).send(`webhook ${err.message}`))
        }
    }
}

export const config ={
    api:{
        bodyParser:false,
        externalResolver:true
    }
}
//stripe listen --forward-to localhost:3000/api/webhook