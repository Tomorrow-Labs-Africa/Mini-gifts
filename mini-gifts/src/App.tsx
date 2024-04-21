import React from "react";
import logo from "./logo.svg";
import "./App.css";
import CardButton from "./components/cardButton";
import { useState, useEffect } from "react";
import { CeloService } from "./services/client";

function App() {
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    const fetchBalance = async () => {
      const celoService = new CeloService({
        contractAddress: "0x874069Fa1Eb16D44d622F2e0Ca25eeA172369bC1",
        rpcUrl: "https://alfajores-forno.celo-testnet.org",
      });
      const balance = await celoService.getBalance();
      // Do something with the balance here
      setBalance(Number(balance?.toFixed(2)));
    };

    fetchBalance();
  }, [balance]);

  return (
    <div className="min-h-screen flex flex-col items-center">
      <div className="max-w-md w-full p-4">
        <div
          className="bg-blue-400 text-white shadow-md rounded-lg p-6 mb-4"
          style={{ minHeight: "15vh" }}
        >
          <p className="text-gray-100">MiniPay Balance</p>
          <h2 className="text-4xl font-bold mb-2">{balance} cUSD</h2>
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
