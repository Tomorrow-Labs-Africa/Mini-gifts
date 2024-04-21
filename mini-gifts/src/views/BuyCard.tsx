import React from "react";
import Button from "../components/button";
import { CeloService } from "../services/client";

const BuyCard: React.FC = () => {
  const handlePayment = async () => {
    const giftCardData = {
      data: {
        productId: 15897,
        countryCode: "KE",
        quantity: 1,
        unitPrice: 12.99,
        customIdentifier: "vbucks4",
        senderName: "Alphonce Doe",
        recipientEmail: "mutebialphonce@gmail.com",
        recipientPhoneDetails: {
          countryCode: "KE",
          phoneNumber: "254710113242",
        },
      },
    };
    const celoService = new CeloService({
      contractAddress: "0x874069Fa1Eb16D44d622F2e0Ca25eeA172369bC1",
      rpcUrl: "https://alfajores-forno.celo-testnet.org",
    });
    const result = await celoService.sendCusd(
      "0x300ddc76321b2B588CE30aFb32Cf683E92572180", //escrow address
      "1"
    );
    console.log("Buying Gift Card");
  };
  return (
    <div className="min-h-screen flex flex-col items-center">
      <div className="max-w-md w-full p-4">
        <h1 className="text-4xl font-bold mb-4 text-center mb-4">Checkout</h1>{" "}
        <div className="grid grid-cols-1 gap-4 mb-4">
          <div className="bg-white rounded-lg p-4 shadow-md">
            <img
              src={
                "https://cdn.reloadly.com/giftcards/44d14596-e778-4664-a9f3-b72e9e9ab8e2.jpg"
              }
              alt={"Xbox Live Gold"}
              className="h-16 w-16 mx-auto"
            />
            <h2 className="text-lg font-bold text-center mt-2">
              Xbox Live Gold
            </h2>
            <p className="text-sm text-center mt-1">13 USD</p>
          </div>
        </div>
        <Button text="Pay with miniPay" onClick={handlePayment} />
      </div>
    </div>
  );
};

export default BuyCard;
