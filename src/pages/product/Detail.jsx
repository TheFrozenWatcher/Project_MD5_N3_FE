import React from "react";
import ProductDetailById from "../../components/product/ProductDetailById";
import RelatedProducts from "../../components/product/RelatedProducts";
import CommentSection from "../../components/comments/CommentSection";
import ReviewInput from "../../components/reviews/ReviewInput";
import ReviewSection from "../../components/review/ReviewSection";

export default function UserProductDetail() {
  return (
    <>
      <div className="p-6">
        <div>
          <RelatedProducts />
        </div>
        <div>
          <ProductDetailById />
        </div>
        <div className="mt-6">
          <div>
            <CommentSection />
          </div>
        </div>
        <div className="mt-6">
          <h2 className="text-xl font-bold">Reviews</h2>
          <ReviewInput />
          <ReviewSection />
        </div>
      </div>
    </>
  );
}
