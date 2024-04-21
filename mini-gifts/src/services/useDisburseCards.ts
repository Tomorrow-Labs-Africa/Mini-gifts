import axios from "axios";
import { useMutation } from "react-query";
import { toast } from "react-toastify";
import { BASE_URL, TOKEN } from "../constants";

const config = {
  headers: {
    Authorization: `Bearer ${TOKEN}`,
  },
};
export const disburseCards = (requestDetails: any) => {
  return axios
    .post(
      `${BASE_URL}/transactions/disburseGiftVoucher`,
      requestDetails,
      config
    )
    .then(
      (response) => {
        if (response.status == 200) {
          console.log("response: ", response);
          toast("Gift Card Purchase was successfull", { type: "success" });
        }
      },
      (error) => {
        toast(error, { type: "error" });
      }
    );
};

export const useDisburseCards = () => {
  return useMutation(disburseCards);
};
