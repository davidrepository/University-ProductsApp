import React, { useContext, useState, useEffect, useRef } from "react";
import { useParams, useHistory } from "react-router-dom";
import { DataContext } from "../../../GlobalState";
import { getData } from "../../utils/FetchData";
import styled from "styled-components";

import DetailProductCard from "../../utils/detailProductCard/DetailProductCard";
import FormInput from "../../utils/formInput/FormInput";
import CommentItem from "../../utils/commentItem/CommentItem";
import Loading from "../../utils/images/loading.gif";

function DetailProduct() {
  const { id } = useParams();
  const history = useHistory();

  const state = useContext(DataContext);
  const [products] = state.products;
  const socket = state.socket;

  const [detailProduct, setDetailProduct] = useState([]);

  const [rating, setRating] = useState(0);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);

  const [page, setPage] = useState(1);
  const pageEnd = useRef();

  useEffect(() => {
    setDetailProduct(products.filter((product) => product._id === id));
  }, [id, products]);

  useEffect(() => {
    setLoading(true);
    getData(`/api/comments/${id}?limit=${page * 5}`)
      .then((res) => {
        setComments((r) => (r = res.data.comments));
        setLoading(false);
      })
      .catch((err) => console.log(err.response.data.msg));
  }, [id, page]);

  // Realtime
  // Join room
  useEffect(() => {
    if (socket) {
      socket.emit("joinRoom", id);
    }
  }, [socket, id]);

  useEffect(() => {
    if (socket) {
      socket.on("sendCommentToClient", (msg) => {
        setComments([msg, ...comments]);
      });

      return () => socket.off("sendCommentToClient");
    }
  }, [socket, comments]);

  // infiniti scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setPage((prev) => prev + 1);
        }
      },
      {
        threshold: 0.1,
      }
    );

    observer.observe(pageEnd.current);
  }, []);

  // Reply Comments
  useEffect(() => {
    if (socket) {
      socket.on("sendReplyCommentToClient", (msg) => {
        const newArr = [...comments];

        newArr.forEach((cm) => {
          if (cm._id === msg._id) {
            cm.reply = msg.reply;
          }
        });

        setComments(newArr);
      });

      return () => socket.off("sendReplyCommentToClient");
    }
  }, [socket, comments]);

  return (
    <div className="detail_product_page">
      <$.GoBackButton onClick={() => history.goBack()}>Go back</$.GoBackButton>
      {detailProduct.map((product) => (
        <DetailProductCard key={product._id} product={product} />
      ))}

      <div className="comments">
        <h2 className="app_title">Comments</h2>

        {/* <div className="reviews">
          <input
            type="radio"
            name="rate"
            id="rd-5"
            onChange={() => setRating(5)}
          />
          <label htmlFor="rd-5" className="fas fa-star"></label>

          <input
            type="radio"
            name="rate"
            id="rd-4"
            onChange={() => setRating(4)}
          />
          <label htmlFor="rd-4" className="fas fa-star"></label>

          <input
            type="radio"
            name="rate"
            id="rd-3"
            onChange={() => setRating(3)}
          />
          <label htmlFor="rd-3" className="fas fa-star"></label>

          <input
            type="radio"
            name="rate"
            id="rd-2"
            onChange={() => setRating(2)}
          />
          <label htmlFor="rd-2" className="fas fa-star"></label>

          <input
            type="radio"
            name="rate"
            id="rd-1"
            onChange={() => setRating(1)}
          />
          <label htmlFor="rd-1" className="fas fa-star"></label>
        </div> */}

        <FormInput id={id} socket={socket} rating={rating} />

        <div className="comments_list">
          {comments.map((comment) => (
            <CommentItem key={comment._id} comment={comment} socket={socket} />
          ))}
        </div>
      </div>

      {loading && (
        <div className="loading">
          <img src={Loading} alt="" />
        </div>
      )}
      <button ref={pageEnd} style={{ opacity: 0 }}>
        Load more
      </button>
    </div>
  );
}

const $ = {};

$.GoBackButton = styled.button`
  font-size: 18px;
  margin-bottom: 24px;
`;

export default DetailProduct;
