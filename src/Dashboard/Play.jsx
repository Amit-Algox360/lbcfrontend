import React, { useState } from "react";
import DashboardHeader from "./DashboardHeader";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function Play() {
  const numbers = Array.from({ length: 100 }, (_, i) => i + 1);

  const [selectedNumbers, setSelectedNumbers] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  const categories = {
    5: "Cat Rs 5",
    10: "Cat Rs 10",
    50: "Cat Rs 50",
    100: "Cat Rs 100",
    200: "Cat Rs 200",
  };

  const handleNumberClick = (number) => {
    if (!selectedCategory) {
      toast.warning("Please select a category first.");
      return;
    }

    setSelectedNumbers((prevSelectedNumbers) => {
      const newSelectedNumbers = { ...prevSelectedNumbers };
      const categoryNumbers = newSelectedNumbers[selectedCategory] || [];

      if (categoryNumbers.includes(number)) {
        newSelectedNumbers[selectedCategory] = categoryNumbers.filter(
          (selectedNumber) => selectedNumber !== number
        );
      } else {
        newSelectedNumbers[selectedCategory] = [...categoryNumbers, number];
      }

      return newSelectedNumbers;
    });
  };

  const handleCategoryChange = (e) => {
    const category = e.target.value;

    setSelectedNumbers((prevSelectedNumbers) => ({
      ...prevSelectedNumbers,
      [category]: [],
    }));

    setSelectedCategory(category);
  };

  const rows = [];
  for (let i = 0; i < numbers.length; i += 10) {
    rows.push(numbers.slice(i, i + 10));
  }

  return (
    <>
      <DashboardHeader />
      <div className="main-home1">
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-8">
              <div className="main-table mt-5">
                <div className="card-body">
                  <table className="table table-bordered" id="customeidbysqube">
                    <tbody>
                      {rows.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                          {row.map((number, colIndex) => {
                            const isSelected = Object.keys(
                              selectedNumbers
                            ).some((category) =>
                              selectedNumbers[category].includes(number)
                            );
                            return (
                              <td
                                key={colIndex}
                                onClick={() => handleNumberClick(number)}
                                className={isSelected ? "selected" : ""}
                              >
                                {number}
                              </td>
                            );
                          })}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            {/* Side Panel */}
            <div className="col-sm-4">
              <div className="wallet text-center">
                <h2>Wallet Balance: 0</h2>
              </div>
              <div className="category">
                <p>Headers</p>
                <div className="category-1">
                  {Object.entries(categories).map(([value, label]) => (
                    <div key={value}>
                      <input
                        type="radio"
                        id={`cat${value}`}
                        name="category"
                        value={value}
                        onChange={handleCategoryChange}
                      />
                      <span>
                        <label className="category-2" htmlFor={`cat${value}`}>
                          {label}
                        </label>
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="side-panel">
                <p>
                  <b>Number and its category On Board Selected By You!</b>
                </p>
                {Object.entries(categories).map(([category, label]) => (
                  <div key={category}>
                    <div className="side-category">{label}:</div>
                    {selectedNumbers[category]?.map((number) => (
                      <span key={number}>{number} </span>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Footer section */}
      <div className="footer-back">
        <p>Copyright © 2024 Wallet IBC World All Right Reserved</p>
      </div>
    </>
  );
}
