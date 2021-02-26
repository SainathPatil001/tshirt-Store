const stripe = require("stripe")(
  "sk_test_51IMwW5BwzPMg2waXpTnMEd09yRnqdA9KSK7g1KGkgDUCyN64sc7N23WsIFIWX2xsoOhgeoiojaqKCR4plksndQLK00twSbROIK"
);
const uuid = require("uuid/v4");

exports.makepayment = (req, res) => {
  const { products, token } = req.body;
  let amount = 0;
  products.map((product) => {
    amount = amount + product.price;
  });

  const idempotencyKey = uuid.v4();

  return stripe.customers
    .create({
      email: token.email,
      source: token.id,
    })
    .then((customer) => {
      stripe.charges
        .create(
          {
            amount: amount*100,
            currency: "INR",
            customer: customer.id,
            receipt_email: token.email,
            description: "a test account",
            shipping: {
              name: token.card.name,
              address: {
                line1: token.card.address_line1,
                line2: token.card.address_line2,
                country: token.card.address_country,
                city: token.card.address_city,
                postal_code: token.card.address_zip,
              },
            },
          },
          { idempotencyKey }
        )
        .then((result) => {
          res.status(200).json(result);
        })
        .catch((err) => {
          console.log(err);
        });
    });
};
