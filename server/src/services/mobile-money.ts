import { sendMobileMoney, requestMpesaPayment, processMobileMoneyCollcetion } from "./apis/intasend";

const DEFAULT_PROVIDER = 'INTASEND';

export class MobileMoneyService {
  /**
   * This method sends mobile money to a user.
   * @param phoneNumber user's phone number in international format e.g. 254712345678
   * @param name user's name
   * @param amount amount to be sent
   * @param service mobile money service provider to use for sending - Defaults to INTASEND
   */
  public static sendMobileMoney(
    phoneNumber: string,
    name: string,
    amount: number,
    service: string = DEFAULT_PROVIDER): void {
      
    console.log(`Sending ${amount} to ${name} (${phoneNumber}) via ${service}`);
    switch (service) {
      case 'INTASEND':
        sendMobileMoney(phoneNumber, name, amount, 'TLA payout');
        break;
      default:
        throw new Error(`Unsupported mobile money service: ${service}`);
    }

    //TODO: Refactor, move transaction saving api file to here


  }

  /**
   * This method requests a mobile money payment from a user.
   * @param firstName user first name
   * @param lastName user's last name
   * @param email user's email address
   * @param phoneNumber user's phone number in international format e.g. 254712345678
   * @param amount user's amount to be paid
   * @param service mobile money service provider to use for request - Defaults to INTASEND
   */
  public static collectMobileMoney(firstName: string, lastName: string, email: string, phoneNumber: string, amount: number, service: string = DEFAULT_PROVIDER): void {
    console.log(`Sending ${amount} to ${firstName} (${phoneNumber}) via ${service}`);
    switch (service) {
      case 'INTASEND':
        requestMpesaPayment(firstName, lastName, email, phoneNumber, amount);
        break;
      default:
        throw new Error(`Unsupported mobile money service: ${service}`);
    }

    //TODO: Save transaction to DB

  }

  /**
   * 
   * @param payload request payload
   * 
   */
  public static processMobileMoneyCollcetion(payload: any): void {
    switch (payload.host) {
      case 'https://intasend.com':
        console.log('Processing Intasend payment');
        processMobileMoneyCollcetion(payload);
        break;
      default:
        processMobileMoneyCollcetion(payload);
    }
  }
}