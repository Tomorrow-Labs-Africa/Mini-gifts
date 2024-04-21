import React, { useEffect } from "react";
import { useGetCards } from "../services/useGetCards";

const GiftCards: React.FC = () => {
  const { data, isLoading, isError, error, mutate: getCards } = useGetCards();
  console.log("data from top: ", data);

  useEffect(() => {
    getCards({ options: { countryISO: "KE" } });
  }, [getCards]);

  return (
    <div className="min-h-screen flex flex-col items-center">
      <div className="max-w-md w-full p-4">
        {isLoading && <p>Loading...</p>}

        {data && (
          <div className="grid grid-cols-1 gap-4">
            {data.map((giftCard: any) => (
              <div
                key={giftCard.productName}
                className="bg-white rounded-lg p-4 shadow-md"
              >
                <img
                  src={giftCard.logoUrls}
                  alt={giftCard.productName}
                  className="h-16 w-16 mx-auto"
                />
                <h2 className="text-lg font-bold text-center mt-2">
                  {giftCard.productName}
                </h2>
                <p className="text-sm text-center mt-1">
                  Denominations: {giftCard.fixedRecipientDenominations}
                  KSH: {giftCard.fixedSenderDenominations}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default GiftCards;
