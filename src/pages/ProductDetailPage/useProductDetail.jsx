import { message } from "antd";
import { useRef } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import useQuery from "../../hooks/useQuery";
import { productService } from "../../services/productService";
import { handleAddCart } from "../../store/reducers/cartReducer";

const useProductDetail = () => {
  const dispatch = useDispatch();
  const { slug } = useParams();
  const colorRef = useRef();
  const quantityRef = useRef();

  //* API
  const { data: productDetailData } = useQuery(
    () => productService.getProductBySlug(slug),
    [slug]
  );

  const { name, description, shippingReturn, id, price, discount } =
    productDetailData || {};
  // console.log("productDetailData", productDetailData);
  const { data: productReview } = useQuery(
    () => id && productService.getProductReview(id),
    [id]
  );
  //* Handle
  const handleAddToCart = () => {
    const { value: color, reset: colorReset } = colorRef.current || {};
    const { value: quantity, reset: quantityReset } = quantityRef.current || {};
    if (!color) {
      message.error("Please select color");
      return;
    } else if (isNaN(quantity) && quantity < 1) {
      message.error("Quantity must be greater than 1");
      return;
    }

    const addPayload = {
      addedId: id,
      addedColor: color,
      addedQuantity: quantity,
      addedPrice: price - discount,
    };
    // console.log("addPayload", addPayload);
    try {
      const res = dispatch(handleAddCart(addPayload)).unwrap();
      if (res) {
        colorReset?.();
        quantityReset?.();
      }
    } catch (error) {
      console.log("error", error);
    }
  };
  //* Props
  const productDetailTabProps = {
    description,
    shippingReturn,
    reviews: productReview,
  };

  const productDetailTopProps = {
    ...productDetailData,
    colorRef,
    quantityRef,
    handleAddToCart,
  };
  return {
    productName: name,
    productDetailTopProps,
    productDetailTabProps,
  };
};

export default useProductDetail;
