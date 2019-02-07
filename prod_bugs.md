| Page         | Action                             | Result|
| ------------- | :-------------                    | :-----|
| Signup        | Cannot sign up                    | post signup `504`. Second attempt `409`
| Signup        | Can't signup using social media   | post social-media-auth `500`
| Login         |     FB/G login    | post social-media-auth `500`
| Home detail   |    Products too big on initial load    | too large
| add to cart popup | click on checkout                  | does not go to the checkout page (Uncaught Error: You must either pass handleSubmit())
| add to cart popup | click on continue shopping                  | Uncaught Error: You must either pass handleSubmit()
| scss files        |  files too big (310 KB - 463 KB)        | profile, payment, addresses, checkout-shipping, checkout-payment, checkout-order, checkout-confirmation-order
| listing | changing the query params | does nothing
