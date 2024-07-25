import React, { useState } from "react";
import ProductDetailById from "../../components/product/ProductDetailById";
import RelatedProducts from "../../components/product/RelatedProducts";
import CommentSection from "../../components/comments/CommentSection";
import ReviewInput from "../../components/reviews/ReviewInput";
import ReviewSection from "../../components/review/ReviewSection";

export default function UserProductDetail() {
  // State to manage the active tab (Comment or Review)
  const [activeTab, setActiveTab] = useState("comments");

  return (
    <div className="p-6 flex flex-col lg:flex-row gap-6">
      {/* Sidebar for Related Products */}
      <div className="lg:w-1/4">
        <RelatedProducts />
      </div>
      
      {/* Main Content Area */}
      <div className="lg:w-3/4">
        <ProductDetailById />
        
        <div className="mt-6">
          {/* Tab Navigation */}
          <div className="flex mb-4">
            <button
              onClick={() => setActiveTab("comments")}
              className={`flex-1 py-2 px-4 text-center ${activeTab === "comments" ? "bg-gray-200" : "bg-gray-100"} rounded-l`}
            >
              Comments
            </button>
            <button
              onClick={() => setActiveTab("reviews")}
              className={`flex-1 py-2 px-4 text-center ${activeTab === "reviews" ? "bg-gray-200" : "bg-gray-100"} rounded-r`}
            >
              Reviews
            </button>
          </div>

          {/* Conditional Rendering based on Active Tab */}
          {activeTab === "comments" && <CommentSection />}
          {activeTab === "reviews" && (
            <div>
              <ReviewInput />
              <ReviewSection />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
