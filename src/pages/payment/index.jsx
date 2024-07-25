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
  }, []);
  const handleAddressChange = (event) => {
    setSelectedAddress(event.target.value);
  };

  const handleVoucherChange = (value) => {
    setVoucher(value);
    const couponCode = value;
    dispatch(getTotalPrice(couponCode)).then((res) => {
      console.log(res.payload.content);
      const price = res.payload.content;
      setOriginalPrice(price.totalPrice);
      setDiscountedPrice(price.totalPriceAfterDiscount);
    });
  };
  const setValueDebounced = useDebounce(handleVoucherChange, 500);

  const handleNoteChange = (event) => {
    setNote(event.target.value);
  };
  const handleCreateOrder = (event) => {
    event.preventDefault();
    if (selectedAddress !== "") {
      dispatch(
        createOrder({
          couponCode: voucher,
          note: note,
          addressId: selectedAddress,
        })
      ).then((res) => {
        console.log(res);
        if(res.error){
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: Object.values(res.payload),
          });
        } else{
          Swal.fire({
            title: "Success",
            text: "Order created successfully",
            icon: "success",
          });
          navigate("/home")
        }
      });
    }
  };
  return (
    <div className="payment-page">
      <form onSubmit={handleCreateOrder}>
        <FormControl fullWidth className="form-field">
          <InputLabel id="address-select-label">Address</InputLabel>
          <Select labelId="address-select-label" onChange={handleAddressChange}>
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

        <div className="price-details">
          <Typography className="price">
            Original Price: ${originalPrice}
          </Typography>
          <Typography className="price discounted">
            Discounted Price: ${discountedPrice}
          </Typography>
        </div>

        <Button type="submit" variant="contained" color="primary" fullWidth>
          Proceed to Payment
        </Button>
      </form>
    </div>
  );
}
