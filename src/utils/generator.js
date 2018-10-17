import * as constant from '../constants';

export const generateQuantity = (quantity) => {
 return Array(parseInt(quantity, constant.RADIX)).fill(0).map((e, i) => ++i);
}