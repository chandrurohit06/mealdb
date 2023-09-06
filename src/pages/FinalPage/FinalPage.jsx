import React, { useEffect } from "react";
//antd c
import { Image, Col, Row, Descriptions, Result } from "antd";
import { useLocation, useNavigate } from "react-router-dom";

//components
import "../../components/Meal/Meal.scss";
//redux
import { useSelector, useDispatch } from "react-redux";
import { startFetchSingleMeal } from "../../redux/meals/MealSlice";

//pages for showing customer order details

export const FinalPage = () => {
  const { meal } = useSelector((state) => ({ ...state.mealsSlice }));

  const location = useLocation();
  const { formData } = location.state;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //array for showing customer shipping information
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
//useeffect for fetching selected meals
  useEffect(() => {
    let id = localStorage.getItem("mealId");
    dispatch(startFetchSingleMeal(id));
  }, []);

  let mealImage = meal?.meals?.length > 0 && meal?.meals[0];

//useeffect for navigating to home page
  useEffect(() => {
    if (!mealImage) {
      navigate("/");
    }
  }, []);

  return (
    <>
      <div style={{ height: "170px" }}>
        <Result status="success" title="Order Successfully Purchased " />
      </div>
      <div style={{ padding: "0 4rem" }}>
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
                  <div className="area fs-18 ls-1 fw-5">
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
              <Descriptions size="middle" title="Customer Info" items={items} />
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
};
