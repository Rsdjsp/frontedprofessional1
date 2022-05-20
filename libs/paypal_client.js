const paypal = require("@paypal/checkout-server-sdk")

const env = process.env.NODE_ENV;
const clientID = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;
const secret = process.env.PAYPAL_CLIENT_SECRET;

const enviroment =
  env === "development"
    ? new paypal.core.SandboxEnvironment(clientID, secret)
    : new paypal.core.LiveEnvironment(clientID, secret);

const client = new paypal.core.PayPalEnvironment(enviroment)
    

export default client