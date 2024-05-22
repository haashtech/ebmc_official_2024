import crypto from 'crypto'

const verifyWebhookSignature = (headers,payload,webhookSecret) =>{

const headerSignature = headers['x-zignsec-hmac-sha256'];

const[timestamp,signature] = headerSignature.split(',');



const[,timestampValue] = timestamp.split('=');
const[,signatureValue] =signature.split('=');



const payloadString = `${timestampValue}.${payload}`;



const hmac = crypto.createHmac('sha256',webhookSecret).update(payloadString).digest('hex')


return hmac ===signatureValue ;

}


export default {
    verifyWebhookSignature,
}