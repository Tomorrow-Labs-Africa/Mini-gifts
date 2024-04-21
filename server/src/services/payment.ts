import { sendToMpesaTillNumber, sendToMpesaPaybill } from "./apis/intasend";

const DEFAULT_PROVIDER = 'INTASEND';

export class PaymentService {
  /**
   * 
   * @param businessName Name of the beneficiary business
   * @param tillNumber Till number of the beneficiary business
   * @param amount Amount to be sent in KES
   * @param service payment service provider to use for sending - Defaults to INTASEND
   */
  public static async buyGoods(businessName: string, tillNumber: string, amount: number, narrative: string = "Mini Util Buy goods", service: string = DEFAULT_PROVIDER): Promise<void> {
    console.log(`Sending ${amount} to ${businessName} (${businessName}) via ${service}`);
    switch (service) {
      case 'INTASEND':
        return await sendToMpesaTillNumber(businessName, amount, tillNumber, narrative);
      default:
        throw new Error(`Unsupported mobile money service: ${service}`);
    }

    //TODO: Save transaction to DB
    

  }

  /**
   * 
   * @param businessName name of the beneficiary business
   * @param amount amount to be sent in KES
   * @param paybillNumber paybill number of the beneficiary business
   * @param accountNumber account number/reference of the beneficiary business
   * @param service payment service provider to use for sending - Defaults to INTASEND
   */
  public static async payBill(businessName: string, amount: number, paybillNumber: string, accountNumber: string, narrative:string = "Mini-util paybill" ,service: string = DEFAULT_PROVIDER): Promise<void> {
    console.log(`Sending ${amount} to ${businessName} (${amount}) via ${service}`);
    let request: any;
    switch (service) {
      case 'INTASEND':
        return await sendToMpesaPaybill(businessName, amount, paybillNumber, accountNumber, narrative);
      default:
        throw new Error(`Unsupported mobile money service: ${service}`);
    }
  
  }
}