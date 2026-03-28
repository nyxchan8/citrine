import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { formatMoney } from "../../utils/money";
import { DeliveryOptions } from "./DeliveryOptions";
import axios from "axios";

export function OrderSummary({ cart, deliveryOptions, loadCart }) {
  return (
    <div className="order-summary">
      {deliveryOptions.length > 0 &&
        cart.map((cartItem) => {
          return (
            <CartItemDetails
              key={cartItem.productId}
              cartItem={cartItem}
              deliveryOptions={deliveryOptions}
              loadCart={loadCart}
            />
          );
        })}
    </div>
  );
}

function CartItemDetails({ cartItem, deliveryOptions, loadCart }) {
  const [isUpdating, setIsUpdating] = useState(false);
  const [quantity, setQuantity] = useState(cartItem.quantity);

  useEffect(() => {
    if (!isUpdating) {
      setQuantity(cartItem.quantity);
    }
  }, [cartItem.quantity, isUpdating]);

  const selectedDeliveryOption = deliveryOptions.find((deliveryOption) => {
    return deliveryOption.id === cartItem.deliveryOptionId;
  });

  const deleteCartItem = async () => {
    await axios.delete(`/api/cart-items/${cartItem.productId}`);
    await loadCart();
  };

  const updateQuantity = async () => {
    if (isUpdating) {
      await axios.put(`/api/cart-items/${cartItem.productId}`, {
        quantity: Number(quantity),
      });
      await loadCart();
      setIsUpdating(false);
      return;
    }

    setIsUpdating(true);
  };

  const handleQuantityChange = (event) => {
    setQuantity(event.target.value);
  };

  const handleQuantityKeyDown = (event) => {
    if (event.key === "Enter") {
      updateQuantity();
    }

    if (event.key === "Escape") {
      setQuantity(cartItem.quantity);
      setIsUpdating(false);
    }
  };

  return (
    <div className="cart-item-container">
      <div className="delivery-date">
        Delivery date:{" "}
        {dayjs(selectedDeliveryOption.estimatedDeliveryTimeMs).format(
          "dddd MMMM D",
        )}
      </div>

      <div className="cart-item-details-grid">
        <img className="product-image" src={cartItem.product.image} />

        <div className="cart-item-details">
          <div className="product-name">{cartItem.product.name}</div>
          <div className="product-price">
            {formatMoney(cartItem.product.priceCents)}
          </div>
          <div className="product-quantity">
            <span>
              Quantity:{" "}
              {isUpdating ? (
                <input
                  className="quantity-input"
                  type="text"
                  value={quantity}
                  onChange={handleQuantityChange}
                  onKeyDown={handleQuantityKeyDown}
                />
              ) : (
                <span className="quantity-label">{cartItem.quantity}</span>
              )}
            </span>
            <span
              className="update-quantity-link link-primary"
              onClick={updateQuantity}
            >
              Update
            </span>
            <span
              className="delete-quantity-link link-primary"
              onClick={deleteCartItem}
            >
              Delete
            </span>
          </div>
        </div>

        <DeliveryOptions
          cartItem={cartItem}
          deliveryOptions={deliveryOptions}
          loadCart={loadCart}
        />
      </div>
    </div>
  );
}
