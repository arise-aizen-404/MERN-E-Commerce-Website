import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { FaTrash } from "react-icons/fa";
import { addToCart, removeFromCart } from "../redux/features/cart/cartSlice";

export const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const addToCartHandler = (product, qty) => {
    dispatch(addToCart({ ...product, qty }));
  };

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    navigate("/login?redirect=/shipping");
  };

  return (
    <>
      <div className="container flex justify-around items-start flex-wrap mx-auto mt-8">
        {cartItems.length === 0 ? (
          <div>
            Your cart is Empty <Link to="/shop">Go To Shop</Link>
          </div>
        ) : (
          <>
            <div className="flex flex-col w-[80%] min-h-[100vh] gap-2">
              <h1 className="text-2xl font-semibold mb-4">Shopping Cart</h1>
              {cartItems.map((item) => (
                <div key={item._id} className="flex items-center gap-4">
                  <div className="w-[5rem] h-[5rem]">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full rounded object-fit"
                    />
                  </div>
                  <div className="flex-1">
                    <Link
                      to={`/product/${item._id}`}
                      className="text-[#dd4d51]"
                    >
                      {item.name}
                    </Link>
                    <div className="mt-2 text-white">{item.brand}</div>
                    <div className="mt-2 text-white font-bold">
                      $ {item.price}
                    </div>
                  </div>
                  <div className="w-24">
                    <select
                      name=""
                      id=""
                      className="w-full p-1 px-4 border-rounded text-black"
                      value={item.qty}
                      onChange={(e) =>
                        addToCartHandler(item, Number(e.target.value))
                      }
                    >
                      {[...Array(item.countInStock).keys()].map((x) => (
                        <option value={x + 1} key={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </select>
                  </div>
                  <button
                    className="text-red-500"
                    onClick={() => removeFromCartHandler(item._id)}
                  >
                    <FaTrash />
                  </button>
                </div>
              ))}
              <div className="mt-8 w-[40rem]">
                <div className="p-4 rounded-lg">
                  <h2 className="text-xl font-semibold b-2">
                    Items - (
                    {cartItems.reduce((acc, item) => acc + Number(item.qty), 0)}
                    )
                  </h2>
                  <div className="text-2xl font-bold">
                    ${" "}
                    {cartItems
                      .reduce((acc, item) => acc + item.qty * item.price, 0)
                      .toFixed(2)}
                  </div>
                  <button
                    className="bg-[#dd4d51] mt-4 py-2 px-4 rounded-full text-lg w-full"
                    disabled={cartItems.length === 0}
                    onClick={() => checkoutHandler()}
                  >
                    Proceed To Checkout
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};
