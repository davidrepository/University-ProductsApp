import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

function ProductCard({ product }) {
  return (
    <$.Product>
      <Link to={`/product/${product._id}`}>
        <$.ProductImage src={product.images.url} alt="" />
      </Link>
      <$.H3>{product.title}</$.H3>
      <$.ProductPrice>$ {product.price}</$.ProductPrice>
      <$.ProductDescription>{product.description}</$.ProductDescription>
      <$.ProductCTA className="product_card_row">
        <$.ProductLink to={`/product/${product._id}`}>View</$.ProductLink>
      </$.ProductCTA>
    </$.Product>
  );
}

const $ = {};

$.Product = styled.div`
  max-width: 400px;
  min-width: 300px;
  overflow: hidden;
  padding: 32px;
  border-radius: 8px;
  box-shadow: 0 0 25px #ddd;
`;

$.ProductImage = styled.img`
  width: 100%;
  display: block;
  object-fit: cover;
  height: 250px;
  border-radius: 8px;
  margin-bottom: 20px;
  transform: none;
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.1);
  }
`;

$.H3 = styled.h3`
  text-transform: uppercase;
  margin: 5px 0;
`;

$.ProductPrice = styled.span`
  color: crimson;
`;

$.ProductDescription = styled.p``;

$.ProductCTA = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 32px;
`;

$.ProductLink = styled(Link)`
  background-color: rgba(41, 91, 230, 0.4);
  display: block;
  height: 40px;
  width: 100%;
  text-align: center;
  border-radius: 6px;
  color: #000;
  line-height: 36px;
  font-weight: 500;
  transition: all 0.2s;

  &:hover {
    background-color: rgb(41, 91, 230);
    color: #fff;
  }
`;

export default ProductCard;
