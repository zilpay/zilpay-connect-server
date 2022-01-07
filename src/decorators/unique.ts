/*
 * Project: ZilPay-wallet
 * Author: Rinat(hiccaru)
 * -----
 * Modified By: the developer formerly known as Rinat(hiccaru) at <lich666black@gmail.com>
 * -----
 * Copyright (c) 2021 ZilPay
 */

import { Message } from "src/message";

export function uniqueMessage(list: Message[]) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    console.log('target', target.type);
    console.log('propertyKey', propertyKey);
    console.log('descriptor', descriptor);
  };
}
