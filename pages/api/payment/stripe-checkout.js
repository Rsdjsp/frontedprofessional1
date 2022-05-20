import { async } from "@firebase/util";

const stripe = require("stripe")(process.env.STRIPE_SK);

export default async function createCheackoutSession(req, res) {
  const host = req.headers.origin;
  if (req.method === "post") {
    try {
      const session = await stripe.checkout.sessions.create({
        line_items: [
          {
            price: "",
            quantity: 1,
          },
        ],
        mode: "payment",
        succsess_url: `${host}/`,
        cancel_url: `${host}/`,
      });
      return res.redirect(303, session.url);
    } catch (error) {
      return res.status(error.statusCode || 500).json(error.message);
    }
  }
}
