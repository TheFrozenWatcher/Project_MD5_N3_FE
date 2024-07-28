import React, { useEffect, useState } from "react";
import {
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Button,
  Typography,
} from "@mui/material";
import "./PaymentPage.scss";
import { useDispatch } from "react-redux";
import {
  createOrder,
  getTotalPrice,
  getUserAddress,
} from "../../services/userService";
import { useDebounce } from "rooks";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Header from "../../layouts/header";
import Footer from "../../layouts/footer";
import { fetchAllCartItems } from "../../services/cartService";
import { handleFormatMoney } from "../../ultils/formatData";

// const addresses = [
//   // { id: 1, address: "123 Main St, City, Country" },
//   // { id: 2, address: "456 Another St, City, Country" },
//   // { id: 3, address: "789 Elsewhere St, City, Country" },
// ];
export default function PaymentPage() {
  const [selectedAddress, setSelectedAddress] = useState("");
  const [voucher, setVoucher] = useState("");
  const [note, setNote] = useState("");
  const [originalPrice, setOriginalPrice] = useState(100); // Example price
  const [discountedPrice, setDiscountedPrice] = useState(80); // Example discounted price
  const [addresses, setAddresses] = useState(null);
  const [cartList, setCartList] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserAddress()).then((res) => {
      console.log(res.payload.content);
      setAddresses(res.payload.content);
      dispatch(getTotalPrice()).then((res) => {
        console.log(res.payload.content);
        const price = res.payload.content;
        setOriginalPrice(price.totalPrice);
        setDiscountedPrice(price.totalPriceAfterDiscount);
      });
    });
    dispatch(fetchAllCartItems()).then((res)=>{
      console.log(res.payload.cartList)
      setCartList(res.payload.cartList)

    })
  }, []);
  const handleAddressChange = (event) => {
    setSelectedAddress(event.target.value);
  };

  const handleVoucherChange = (value) => {
    setVoucher(value);
    const couponCode = value;
    dispatch(getTotalPrice(couponCode)).then((res) => {
      if (res.error) {
        console.log(res.payload.response.data.content);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: Object.values(res.payload.response.data.content).join(""),
        });
      } else {
        if (res.payload.message === "Error") {
          console.log(res)
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Coupon code is not valid",
          });
        } else {
          console.log(res.payload.message === "error");
          const price = res.payload.content;
          setOriginalPrice(price.totalPrice);
          setDiscountedPrice(price.totalPriceAfterDiscount);
        }
      }
    });
  };
  const setValueDebounced = useDebounce(handleVoucherChange, 500);

  const handleNoteChange = (event) => {
    setNote(event.target.value);
  };
  const handleCreateOrder = (event) => {
    event.preventDefault();
    if ( selectedAddress !== "") {
      if (confirm('Are you sure you want to create order?')) {
      dispatch(
        createOrder({
          couponCode: voucher,
          note: note,
          addressId: selectedAddress,
        })
      ).then((res) => {
        console.log(res);
        if (res.error) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: Object.values(res.payload),
          });
        } else {
          if (res.payload.message == "Error") {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: res.payload.content,
            });
            return;
          }
          Swal.fire({
            title: "Success",
            text: "Order created successfully",
            icon: "success",
          });
          navigate("/home");
        }
      });
    }
    }
  };
  return (
    <>
      <Header />
      <div className="payment-page">
        <form onSubmit={handleCreateOrder}>
          <FormControl fullWidth className="form-field">
            <InputLabel id="address-select-label">Address</InputLabel>
            <Select
              labelId="address-select-label"
              onChange={handleAddressChange}
            >
              {addresses?.map((address) => (
                <MenuItem key={address.id} value={address.id}>
                  {`${address.ward}, ${address.district}, ${address.province}`}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            label="Voucher Code"
            onChange={(e) => setValueDebounced(e.target.value)}
            fullWidth
            className="form-field"
            variant="outlined"
          />

          <TextField
            label="Note"
            onChange={handleNoteChange}
            fullWidth
            multiline
            rows={4}
            className="form-field"
            variant="outlined"
          />
             <div className="cart-list">
        {cartList?.map((cart) => (
          <div key={cart.id} className="cart-item">
            <img src={cart.image} alt={cart.productName} className="cart-image" />
            <Typography className="cart-name">Product Name: {cart.productName}</Typography>
            <Typography className="cart-name">Quantity: {cart.quantity}</Typography>
            <Typography className="cart-price">Total price: {handleFormatMoney(cart.unitPrice*cart.quantity)}</Typography>
          </div>
        ))}
      </div>
          <div className="price-details">
            <Typography className="price">
              Original Price: {handleFormatMoney(originalPrice)}
            </Typography>
            <Typography className="price discounted">
              Discounted Price: {handleFormatMoney(discountedPrice)}
            </Typography>
          </div>
         
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Order
          </Button>
        </form>
      </div>
      <Footer />
    </>
  );
}
