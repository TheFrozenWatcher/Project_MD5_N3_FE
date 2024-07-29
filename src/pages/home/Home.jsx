import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Footer from "../../layouts/footer";
import Header from "../../layouts/header";
import MostSoldProducts from "../../components/product/MostSoldProducts";
import NewestProducts from "../../components/product/NewestProducts";

import BannerCarousel from "../../components/banner";

import HomeCarousel from "../../components/carousel/HomeCarousel";
import { fetchAllMessages, setMessageStatus, fetchUnreadMessageCount } from "../../services/messageService";
import Messages from "../../components/message/MessageList";
import AddressManager from "../../components/address/AddressManager"; // Import AddressManager


export default function UserIndex() {
  const [showMessages, setShowMessages] = useState(false);
  const [showAddressForm, setShowAddressForm] = useState(false); // State to toggle address form
  const dispatch = useDispatch();
  const unreadCount = useSelector((state) => state.message.unreadCount);

  useEffect(() => {
    dispatch(fetchUnreadMessageCount());
  }, [dispatch]);

  const toggleMessages = () => {
    if (!showMessages) {
      dispatch(fetchAllMessages());
    }
    setShowMessages(!showMessages);
    if (unreadCount > 0) {
      dispatch(setMessageStatus());
    }
  };

  const toggleAddressForm = () => {
    setShowAddressForm(!showAddressForm);
  };

  return (
    <>
      <Header />

      <BannerCarousel/>
      

      <div className="fixed bottom-5 right-5 z-50">
        <button
          onClick={toggleMessages}
          className="bg-blue-500 text-white p-3 rounded-full shadow-lg relative"
        >
          📨
          {unreadCount > 0 && (
            <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {unreadCount}
            </span>
          )}
        </button>
      </div>
      {showMessages && (
        <div className="fixed bottom-20 right-5 w-96 h-96 bg-white shadow-lg rounded-lg overflow-auto">
          <Messages />

        </div>
      )}
      <div className="fixed bottom-5 left-5 z-50">
        <button
          onClick={toggleAddressForm}
          className="bg-green-500 text-white p-3 rounded-full shadow-lg"
        >
          {showAddressForm ? "Hide Address Form" : "Add New Address"}
        </button>
      </div>
      {showAddressForm && (
        <div className="fixed bottom-20 left-5 w-96 h-auto bg-white shadow-lg rounded-lg p-4">
          <AddressManager />
        </div>
      )}
      <div className="mt-[20vh] mb-[10vh] flex-1 overflow-y-auto">
        <div><HomeCarousel /></div>
        <div><MostSoldProducts /></div>
        <div><NewestProducts /></div>
      </div>
      {/* <!--New  Section  --> */}
  
      <Footer />
    </>
  );
  
}
