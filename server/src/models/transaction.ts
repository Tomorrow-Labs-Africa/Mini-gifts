import { Schema,model } from "mongoose";
import { TransactionTypes } from "./enums/transaction-types.enum"; 

const transactionSchema = new Schema({
    status: {
        required: true,
        type: String,
    },
    createdAt: {
      type: Date,
      default: Date.now
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
    type: {
      required: true,
      type: String,
      enum: Object.values(TransactionTypes),
    },
    requestData: {
      type: Object,
    },
    responseData: {
      type: Object,
    },
});
export const Transaction = model("Transaction", transactionSchema);
