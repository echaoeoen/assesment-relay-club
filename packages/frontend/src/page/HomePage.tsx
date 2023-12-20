import { Link } from 'react-router-dom';

export default function HomePage() {
  return (
    <div data-testid="home-page">
      <h1>Home Page</h1>
      Welcome to Relay.club assesment, this application is built using monorepo
      architecture with yarn workspaces.
      <br />
      open this link to see the documentation: <br />
      <a href="http://localhost:3001/docs">api docs</a> <br />
      for administrative purpose, you can try it on the swagger page, to add new
      product, discount rule management. you need to trigger the login api
      first, you can do it on the swagger page, once you success doing login,
      your session will be created and then you can do administrative task
      without any token auth.
      <br />
      on the side barmenu, you can see the list of available pages,
      <br />
      <br />
      <div>
        Product Page: <Link to="/products">/products</Link>
        <br />
        to add product to cart you can click the add button on the product list
      </div>
      <br />
      <div>
        {' '}
        Cart Page: <Link to="/carts">/carts</Link>
        <br />
        to remove product from cart you can click the remove button on the cart
        list
        <br />
        to checkout you can click the checkout button
      </div>
    </div>
  );
}
