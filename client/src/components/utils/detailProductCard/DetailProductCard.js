import React from "react";
import "./DetailProductCard.css";
import Rating from "../rating/Rating";
import styled from "styled-components";

function DetailProductCard({ product }) {
  return (
    <$.DetailProductCard>
      <$.DetailProductImage src={product.images.url} alt="" />

      <div className="detail_product_card_content">
        <h2>{product.title}</h2>
        <span>$ {product.price}</span>
        <p>{product.description}</p>
        {/* <button>Buy</button> */}

        <div>
          {/* <h3 style={{ margin: "10px 0" }}>
            Rating: {product.numReviews} reviews
          </h3>
          <Rating props={product} /> */}
        </div>
      </div>
    </$.DetailProductCard>
  );
}

const $ = {};

$.DetailProductCard = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: #fff;
  border-radius: 16px;
  padding: 32px;
  box-shadow: 0 4px 16px 0 rgba(0, 0, 0, 0.2);
`;

$.DetailProductImage = styled.img`
  /* max-width: 320px; */
  display: block;
  object-fit: cover;
  /* max-height: 200px; */
  max-width: 50%;
  max-height: 400px;
  margin: 10px 15px;
  border-radius: 8px;
`;

export default DetailProductCard;
