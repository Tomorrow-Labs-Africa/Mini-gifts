import { gpDisburseVoucher } from "./apis/giftpesa";
import { rlDisburseVoucher, rlListVouchers } from "./apis/reloadly";

const DEFAULT_PROVIDER = 'RELOADLY';

export class GiftVoucherService {
  /**
   * 
   * @param recipients List of recipients (Required fields for each recipient -> Name, Amount, Phone)
   * @param service payment service provider to use for sending - Defaults to GIFTPESA
   */
  public static async listGiftVoucher(listOptions: any, service: string = DEFAULT_PROVIDER): Promise<void> {
    console.log(`Listing gift vouchers ${listOptions.countryISO} via ${service}`);
    switch (service) {
      case 'RELOADLY':
        return await rlListVouchers(listOptions);
      default:
        throw new Error(`Unsupported service: ${service}`);
    }
    

  }

  /**
   * 
   * @param recipients List of recipients (Required fields for each recipient -> Name, Amount, Phone)
   * @param service payment service provider to use for sending - Defaults to GIFTPESA
   */
  public static async disburseGiftVoucher(orderData: any, service: string = DEFAULT_PROVIDER): Promise<void> {
    console.log(`Sending to ${orderData.recipientEmail} via ${service}`);
    switch (service) {
      case 'GIFTPESA':
        return gpDisburseVoucher(orderData);
      case 'RELOADLY':
        return await rlDisburseVoucher(orderData);
      default:
        throw new Error(`Unsupported service: ${service}`);
    }

    //TODO: Save transaction to DB
    

  }

 
}