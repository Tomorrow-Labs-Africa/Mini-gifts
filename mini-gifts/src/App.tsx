import React from "react";
import logo from "./logo.svg";
import "./App.css";
import CardButton from "./components/cardButton";

function App() {
  return (
    <div className="min-h-screen flex flex-col items-center">
      <div className="max-w-md w-full p-4">
        <div
          className="bg-white shadow-md rounded-lg p-6 mb-4"
          style={{ minHeight: "15vh" }}
        >
          <p className="text-gray-700">MiniPay Balance</p>
          <h2 className="text-4xl font-bold mb-2">5 cUSD</h2>
        </div>

        <div className="flex justify-between space-x-4 mb-4">
          <CardButton
            image={logo}
            text="Entertainment"
            onClick={() => console.log("Entertainment clicked")}
          />
          <CardButton
            image={logo}
            text="Travel"
            onClick={() => console.log("Travel clicked")}
          />
        </div>

        <div className="flex justify-between space-x-4">
          <CardButton
            image={logo}
            text="Shopping"
            onClick={() => console.log("Shopping clicked")}
          />
          <CardButton
            image={logo}
            text="Food"
            onClick={() => console.log("Food clicked")}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
