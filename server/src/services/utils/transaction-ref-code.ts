import * as moment from 'moment';

export const generateReferenceCode = (): string => {
  const today = moment;
	return today.valueOf().toString()
}