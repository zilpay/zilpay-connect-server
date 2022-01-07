/*
 * Project: ZilPay-wallet
 * Author: Rinat(hiccaru)
 * -----
 * Modified By: the developer formerly known as Rinat(hiccaru) at <lich666black@gmail.com>
 * -----
 * Copyright (c) 2021 ZilPay
 */
import type { connection } from 'websocket';

export class Message {
  public readonly data: string;
  public readonly type: string;
  public readonly uuid: string;
  public readonly timestamp: number;
  public readonly cur: connection;

  public get serialize() {
    return JSON.stringify({
      type: this.type,
      data: this.data,
      uuid: this.uuid
    });
  }

  constructor(type: string, data: string, uuid: string, cur: connection) {
    this.type = type;
    this.data = data;
    this.uuid = uuid;
    this.cur = cur;
    this.timestamp = new Date().getTime();
  }

  public close() {
    if (this.cur.state === 'open') {
      this.cur.close();
    }
  }
}
