import React, { useEffect, useState } from 'react';
import 'tailwindcss/tailwind.css';
import './PurchaseHistory.scss';
import { Button, Modal, TextField, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch } from 'react-redux';
import { getPayHistory, giveFeedback } from '../../services/userService';
import Swal from 'sweetalert2';
 

 export default function PurchaseHistory(){
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

//   const products = [
//     { id: 1, name: 'Product 1', image: 'path/to/image1.jpg', price: '$10' },
//     { id: 2, name: 'Product 2', image: 'path/to/image2.jpg', price: '$20' },
//     // Add more products as needed
//    ];
const [products, setProducts] = useState(null)
const dispatch = useDispatch()


 useEffect(()=>{
    dispatch(getPayHistory()).then(res=>{
        console.log(res.payload.content);
        setProducts(res.payload.content);
    })
 },[])
  const handleReviewClick = (product) => {
    setSelectedProduct(product);
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setSelectedProduct(null);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const { rate, comment } = event.target.elements;
    console.log('Rate:', rate.value);
    console.log('Comment:', comment.value);
   dispatch(giveFeedback({comment: comment.value, rating: rate.value, productDetailId: selectedProduct.id}));
    handleModalClose();
    Swal.fire({
        title: "Complete",
        text: "Thank you for your feedback",
        icon: "success"
      });
  };

  return (
    <div className="purchase-history-container">
      <table className="purchase-history-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Product Name</th>
            <th>Image</th>
            <th>Price</th>
            <th>Review</th>
          </tr>
        </thead>
        <tbody>
          {products?.map((product) => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.productDetailName}</td>
              <td className='flex items-center justify-center'>
                <img src={product.image} alt={product.name} className="product-image" />
              </td>
              <td>{product.unitPrice}</td>
              <td>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleReviewClick(product)}
                >
                  Review
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal open={isModalOpen} onClose={handleModalClose}>
        <div className="modal-container">
          <IconButton onClick={handleModalClose} className="close-button">
            <CloseIcon />
          </IconButton>
          <form onSubmit={handleFormSubmit} className="review-form">
            <h2>Review {selectedProduct?.name}</h2>
            <TextField
              label="Rate (1 to 5)"
              type="number"
              inputProps={{ min: 1, max: 5 }}
              name="rate"
              required
              fullWidth
              margin="normal"
            />
            <TextField
              label="Comment"
              name="comment"
              multiline
              rows={4}
              required
              fullWidth
              margin="normal"
            />
            <Button type="submit" variant="contained" color="primary">
              Submit
            </Button>
          </form>
        </div>
      </Modal>
    </div>
  );
};


