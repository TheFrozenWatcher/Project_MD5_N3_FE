import React, { useState } from "react";
import ProductDetailById from "../../components/product/ProductDetailById";
import RelatedProducts from "../../components/product/RelatedProducts";
import CommentSection from "../../components/comments/CommentSection";

export default function UserProductDetail() {
  const [showComments, setShowComments] = useState(false);
  const [productId, setProductId] = useState(null);

  return (
    <div className="p-6 flex flex-col lg:flex-row gap-6">
      {/* Sidebar for Related Products */}
      <div className="lg:w-1/4">
        <RelatedProducts />
      </div>
      
      {/* Main Content Area */}
      <div className="lg:w-3/4">
        <ProductDetailById 
          setProductId={setProductId}
        />
        
        <div className="mt-6">
          {/* Toggle Button for Comments */}
          <div className="flex mb-4">
            <button
              onClick={() => setShowComments(!showComments)}
              className={`flex-1 py-2 px-4 text-center ${showComments ? "bg-gray-200" : "bg-gray-100"} rounded`}
            >
              {showComments ? "Hide Comments" : "Show Comments"}
            </button>
          </div>

          {/* Conditional Rendering of Comment Section */}
          {showComments && <CommentSection productId={productId} />}
        </div>
      </div>
    </div>
  );
}
