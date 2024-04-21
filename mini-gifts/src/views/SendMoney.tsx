import React, { useState } from "react";
import Button from "../components/button";
import { useSendMoney } from "../services/useSendMoney";
import { CeloService } from "../services/client";

function SendMoney() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const { mutate: sendMoney } = useSendMoney();

  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhoneNumber(e.target.value);
  };

  const handleSendMoney = async () => {
    const phoneData = {
      phoneNumber: phoneNumber,
      name: "Alphonce-test",
      amount: 10,
    };
    const celoService = new CeloService({
      contractAddress: "0x874069Fa1Eb16D44d622F2e0Ca25eeA172369bC1",
      rpcUrl: "https://alfajores-forno.celo-testnet.org",
    });
    const result = await celoService.sendCusd(
      "0x300ddc76321b2B588CE30aFb32Cf683E92572180" //escrow address
    );

    sendMoney(phoneData);
  };

  return (
    <div className="min-h-screen flex flex-col items-center">
      <div className="max-w-md w-full p-4">
        <h1 className="text-4xl font-bold mb-2 flex flex-col items-center mb-4">
          Send Money
        </h1>
        <label htmlFor="phoneNumber" className="block mb-2">
          Phone Number:
        </label>
        <input
          type="tel"
          id="phoneNumber"
          value={phoneNumber}
          onChange={handlePhoneNumberChange}
          placeholder="Enter phone number"
          className="w-full border border-gray-300 rounded-md p-2 mb-4"
        />

        <Button text="Send Money" onClick={handleSendMoney} />
      </div>
    </div>
  );
}

export default SendMoney;
