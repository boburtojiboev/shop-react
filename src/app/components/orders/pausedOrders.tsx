import { TabPanel } from "@mui/lab";
import { Box, Button, Stack } from "@mui/material";
// REDUX
import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { retrievePausedOrders } from "../../screens/OrdersPage/selector";
import { Order } from "../../../types/order";
import { Product } from "../../../types/product";
import { serverApi } from "../../../lib/config";
import {
  sweetErrorHandling,
  sweetFailureProvider,
} from "../../../lib/sweetAlert";
import OrderApiService from "../../apiServices/orderApiService";
import { verifiedMemberData } from "../../apiServices/verify";

// REDUX SELECTOR
const pausedOrdersRetriever = createSelector(
  retrievePausedOrders,
  (pausedOrders) => ({
    pausedOrders,
  })
);

export default function PausedOrders(props: any) {
  // INITIALIZATIONS
  const { pausedOrders } = useSelector(pausedOrdersRetriever);

  // HANDLERS//
  const deleteOrderHandler = async (event: any) => {
    try {
      const order_id = event.target.value;
      const data = { order_id: order_id, order_status: "DELETED" };

      if (!verifiedMemberData) {
        sweetFailureProvider("Please login first", true);
      }

      let confirmation = window.confirm(
        "Do you want to cancel order?"
      );
      if (confirmation) {
        const orderService = new OrderApiService();
        await orderService.updateOrdersStatus(data);
        props.setOrderRebuild(new Date());
      }
    } catch (err) {
      console.log("deleteOrderHandler, ERROR:", err);
      sweetErrorHandling(err).then();
    }
  };

  const processOrderHandler = async (event: any) => {
    try {
      const order_id = event.target.value;
      const data = { order_id: order_id, order_status: "PROCESS" };

      if (!verifiedMemberData) {
        sweetFailureProvider("Please login first", true);
      }

      let confirmation = window.confirm(
        "Do you confirm to pay?"
      );
      if (confirmation) {
        const orderService = new OrderApiService();
        await orderService.updateOrdersStatus(data);
        props.setOrderRebuild(new Date());
        props.setValue("2");
      }
    } catch (err) {
      console.log("processOrderHandler, ERROR:", err);
      sweetErrorHandling(err).then();
    }
  };
  return (
    <TabPanel value={"1"}>
      <Stack>
        {pausedOrders?.map((order: Order) => {
          return (
            <Box className="order_main_box">
              <Box className="order_box_scroll">
                {order.order_items.map((item) => {
                  const product: Product = order.product_data.filter(
                    (ele) => ele._id === item.product_id
                  )[0];
                  // const discount: Product = order.product_data.filter(
                  //   (ele) => ele.product_discount === item.item_discount
                  // )[0];
                  const discountedPrice = item.item_price * (100 - item.item_sale) / 100;
                  const image_path = `${serverApi}/${product.product_images[0]}`;
                  return (
                    <Box className="ordersName_price">
                      <img src={image_path} alt="" className={"orderDishImg"} />
                      <p className="titleDish">{product.product_name}</p>
                      <Box className="priceBox">
                        <p>${discountedPrice}</p>
                        <img src="/icons/Close.svg" alt="" />
                        <p>{item.item_quantity}</p>
                        <img src="/icons/pause.svg" alt="" />
                        <p style={{ marginLeft: "15px" }}>
                          {" "}
                          ${discountedPrice * item.item_quantity}
                        </p>
                      </Box>
                    </Box>
                  );
                })}
              </Box>
              <Box className="total_price_box black_solid">
                <Box className="boxTotal">
                  <p>Product price</p>
                  <p>${order.order_total_amount - order.order_delivery_cost}</p>
                  <img
                    src="/icons/plus.svg"
                    alt=""
                    style={{ marginLeft: "20px" }}
                  />
                  <p>Delivery fee</p>
                  <p>${order.order_delivery_cost}</p>
                  <img
                    src="/icons/pause.svg"
                    alt=""
                    style={{ marginLeft: "20px" }}
                  />
                  <p>Overall</p>
                  <p>${order.order_total_amount}</p>
                </Box>
                <Button
                  value={order._id}
                  onClick={deleteOrderHandler}
                  variant="contained"
                  color={"secondary"}
                  style={{ borderRadius: "10px" }}
                >
                  Cancel
                </Button>
                <Button
                  value={order._id}
                  onClick={processOrderHandler}
                  variant="contained"
                  sx={{
                    background: "rgb(2, 136, 209)",
                    color: "rgb(255, 255, 255)",
                    borderRadius: "10px",
                  }}
                >
                  Payment
                </Button>
              </Box>
            </Box>
          );
        })}
      </Stack>
    </TabPanel>
  );
}