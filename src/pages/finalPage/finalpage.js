import React, { useEffect } from "react";
//antd c
import {
  List,
  Typography,
  Image,
  Card,
  Col,
  Divider,
  Row,
  Descriptions,
  Button,
  Result,
} from "antd";
import { useLocation, useNavigate } from "react-router-dom";

//components
import "../../components/Meal/Meal.scss";
//redux
import { useSelector, useDispatch } from "react-redux";
import { startFetchSingleMeal } from "../../redux/meals/mealSlice";


export const FinalPage = () => {
  const { categories, meal, categoryLoading, mealLoading } = useSelector(
    (state) => ({ ...state.mealsSlice })
  );
  const location = useLocation();
  const { formData } = location.state;
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const items = [
    {
      key: "1",
      label: "Name",
      children: formData?.fullName,
    },
    {
      key: "2",
      label: "Contact No.",
      children: formData?.mobileNo,
    },
    {
      key: "3",
      label: "State",
      children: formData?.state,
    },
    {
      key: "4",
      label: "City",
      children: formData?.city,
    },
    {
      key: "5",
      label: "Address",
      children: formData?.address,
    },
  ];

  useEffect(() => {
    let id = localStorage.getItem("mealId");
    dispatch(startFetchSingleMeal(id));
  }, []);

  

  const navigationType = window.performance?.navigation.type;
  console.log(window?.performance.getEntriesByType("navigation")[0].type)

  

  useEffect(() => {
    console.log(navigationType);
    // Check if the page was manually refreshed (type 1 is a manual refresh)
    if (navigationType === 1) {
      // Redirect to the home page
      window.location.href = "/";
    }
  }, [navigationType === 1]);

  let mealImage = meal?.meals?.length > 0 && meal?.meals[0];
 
  return (
    <>
      <div style={{ height: "170px" }}>
        <Result status="success" title="Order Successfully Purchased " />
      </div>
      <div style={{ padding: "0 4rem" }}>
        {/* <Card
        style={{
          width: "70%",
         
        }}
      > */}
        <Row>
          <Col
            style={{ padding: "2rem" }}
            align="end"
            justify="end"
            xs={24}
            sm={24}
            md={8}
          >
            <div>
              <Image width={200} src={mealImage?.strMealThumb} />

              <div className="meal-itm-body">
                <div className="meal-itm-body-info flex flex-column">
                  <div className="area fs-20 ls-1 fw-5">
                    {mealImage?.strMeal}
                  </div>
                </div>
              </div>
            </div>
          </Col>
          <Col
            style={{ alignSelf: "center" }}
            align="start"
            justify="center"
            xs={24}
            sm={12}
            md={16}
          >
            <div>
              {/* <List
              dataSource={data}
              renderItem={(item) => (
                <List.Item>
                  <Typography.Text mark>[ITEM]</Typography.Text> {item}
                </List.Item>
              )}
            /> */}
              <Descriptions size="middle" title="Customer Info" items={items} />
            </div>
          </Col>
        </Row>
        {/* </Card> */}
      </div>
    </>
  );
};
