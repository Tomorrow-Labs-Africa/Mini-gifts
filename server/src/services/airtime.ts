import { airtimeTopUp } from "./apis/fonbnk-airtime-topup";

const DEFAULT_PROVIDER = 'FONBNK';

export class AirtimeService {
  public static buyAirtime(phoneNumber: string, amount: number, service: string = DEFAULT_PROVIDER): void {
    console.log(`Buying ${amount} airtime for ${phoneNumber} via ${service}`);
    switch (service) {
      case 'FONBNK':
        airtimeTopUp(phoneNumber, amount);
        break;
      default:
        throw new Error(`Unsupported airtime service: ${service}`);
    }

  }
}