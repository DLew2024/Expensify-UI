import numeral from 'numeral';

export const convertPriceToString = (price: number): string => {
	return numeral(price / 100).format('0,0.00');
};
