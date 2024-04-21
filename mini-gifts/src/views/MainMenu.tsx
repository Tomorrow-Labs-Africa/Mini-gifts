import React from "react";
import logo from "../logo.svg";
import "../App.css";
import CardButton from "../components/cardButton";
import { useState, useEffect } from "react";
import { CeloService } from "../services/client";
import { Link } from "react-router-dom";
import gifts from "../assets/gifts.svg";
import paybills from "../assets/paybills.svg";
import withdraw from "../assets/withdraw.svg";
import airtime from "../assets/airtime.svg";
import money from "../assets/money.svg";

function MainMenu() {
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
          <Link to="/gifts">
            <CardButton
              image={paybills}
              text="Gift Cards"
              onClick={() => console.log("Entertainment clicked")}
            />
          </Link>
          <Link to="/send-money">
            <CardButton
              image={gifts}
              text="Send Money"
              onClick={() => console.log("Travel clicked")}
            />
          </Link>
        </div>

        <div className="flex justify-between space-x-4">
          <CardButton
            image={airtime}
            text="Buy Goods"
            onClick={() => console.log("Shopping clicked")}
          />
          <CardButton
            image={money}
            text="Buy Airtime"
            onClick={() => console.log("Food clicked")}
          />
        </div>
      </div>
    </div>
  );
}

export default MainMenu;
