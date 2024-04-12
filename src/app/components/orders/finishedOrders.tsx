import { TabPanel } from "@mui/lab";
import { Box, Stack } from "@mui/material";
// REDUX
import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { retrieveFinishedOrders } from "../../screens/OrdersPage/selector";
import { Order } from "../../../types/order";
import { Product } from "../../../types/product";
import { serverApi } from "../../../lib/config";

// REDUX SELECTOR
const finishedOrdersRetriever = createSelector(
  retrieveFinishedOrders,
  (finishedOrders) => ({
    finishedOrders,
  })
);

export default function FinishedOrders(props: any) {
  // INITIALIZATIONS
  const { finishedOrders } = useSelector(finishedOrdersRetriever);
  return (
    <TabPanel value={"3"}>
      <Stack>
        {finishedOrders?.map((order: Order) => {
          return (
            <Box className="order_main_box">
              <Box className="order_box_scroll">
                {order.order_items.map((item) => {
                  const product: Product = order.product_data.filter(
                    (ele) => ele._id === item.product_id
                  )[0];
                  const discountedPrice =
                    (item.item_price * (100 - item.item_sale)) / 100;
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
                          ${discountedPrice * item.item_quantity}
                        </p>
                      </Box>
                    </Box>
                  );
                })}
              </Box>

              <Box className="total_price_box red_solid">
                <Box className="boxTotal finish_total">
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
              </Box>
            </Box>
          );
        })}
      </Stack>
    </TabPanel>
  );
}
