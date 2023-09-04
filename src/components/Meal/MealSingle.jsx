import React, { useState } from "react";
import "./Meal.scss";
import { FaUtensilSpoon } from "react-icons/fa";
import { AiFillHome } from "react-icons/ai";
import { Link } from "react-router-dom";
import { BiChevronsRight } from "react-icons/bi";
import { AiOutlineCheckSquare } from "react-icons/ai";

import { ButtonVariant } from "../AntdComponents/Button";
import { Popupmodal } from "../AntdComponents/PopupModal";
import { Divider, Space, Tag } from "antd";

const MealSingle = ({ meal }) => {
  const [visible, setVisible] = useState(false);

  let tags = meal?.tags?.split(",");
  let instructions = meal?.instructions?.split("\r\n");
  instructions = instructions?.filter((instruction) => instruction.length > 1);

  const handleModalClick = () => {
    setVisible(true);
  };

  return (
    <div className="section-wrapper">
      <div className="container">
        <div className="breadcrumb bg-orange text-white">
          <ul className="flex align-center my-2">
            <li className="breadcrumb-item">
              <Link to="/" className="flex align-center">
                <AiFillHome size={22} />
              </Link>
            </li>
            <li className="flex align-center mx-1">
              <BiChevronsRight size={23} />
            </li>
            <li className="breadcrumb-item flex">
              <span to="" className="fs-15 fw-5 text-uppercase">
                {meal?.title}
              </span>
            </li>
          </ul>
        </div>

        <div className="sc-title">Meal Details</div>
        <section className="sc-details bg-white">
          <div className="details-head grid">
            <div className="details-img">
              <img src={meal?.thumbnail} alt="" className="img-cover" />
            </div>

            <div className="details-intro">
              <h3 className="title text-orange">{meal?.title}</h3>
              <div className="py-4">
                <div className="category flex align-center">
                  <span className="text-uppercase fw-8 ls-1 my-1">
                    category: &nbsp;
                  </span>
                  <span className="text-uppercase ls-2">{meal?.category}</span>
                </div>
              </div>

              <div className="my-1 px-1 py-3">
                <span className="text-uppercase fw-8 ls-1 my-1">
                  Ingredients &nbsp;
                </span>
                <ul className="grid my-3">
                  <Space size={[1, "small"]} wrap>
                    {meal?.ingredients?.map((ingredient, idx) => (
                      <Tag
                        style={{ fontSize: "1.5rem" }}
                        bordered={false}
                        color="volcano"
                      >
                        {ingredient}
                      </Tag>
                    ))}
                  </Space>
                </ul>
              </div>

              <div className="my-1 px-1 py-3">
                <span className="text-uppercase fw-8 ls-1 my-1">
                  Measures &nbsp;
                </span>
                <ul className="grid my-3">
                  <Space size={[1, "small"]} wrap>
                    {meal?.measures?.map((measure, idx) => (
                      <Tag
                        style={{ fontSize: "1.5rem" }}
                        bordered={false}
                        color="volcano"
                      >
                        {measure}
                      </Tag>
                    ))}
                  </Space>
                </ul>
              </div>

              <div className="source flex align-center my-2">
                <ButtonVariant
                  label="Checkout"
                  click={handleModalClick}
                  type="primary"
                />
              </div>
            </div>
          </div>

          <div className="details-body">
            <div className="instructions my-4">
              <h6 className="fs-16">Instructions:</h6>
              <ul className="grid">
                {instructions?.map((instruction, idx) => (
                  <li key={idx} className="fs-14">
                    <AiOutlineCheckSquare
                      size={18}
                      className="text-orange li-icon"
                    />
                    <span className="li-text fs-16 fw-5 op-09">
                      {instruction}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </div>

      <Popupmodal onClose={() => setVisible(false)} visible={visible} />
    </div>
  );
};

export default MealSingle;
