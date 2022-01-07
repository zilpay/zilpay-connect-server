/*
 * Project: ZilPay-wallet
 * Author: Rinat(hiccaru)
 * -----
 * Modified By: the developer formerly known as Rinat(hiccaru) at <lich666black@gmail.com>
 * -----
 * Copyright (c) 2021 ZilPay
 */
import { Message } from './message';

const QUEUE_TIME_IS_OVER = process.env.QUEUE_TIME_IS_OVER || 323041;

export class MessageQueue {
  #list: Message[] = [];

  public get(uuid: string): Message | undefined {
    return this.#list.find((msg) => msg.uuid === uuid);
  }

  public add(msg: Message): void {
    this.#list.push(msg);
    this.#update();
  }

  public remove(uuid: string) {
    this.#list = this.#list.filter((msg) => {
      const notEqual = msg.uuid !== uuid;

      if (!notEqual) {
        msg.close();
      }

      return notEqual;
    });
  }

  #update() {
    this.#list = this.#list.filter((msg) => {
      return (new Date().getTime() - msg.timestamp) < QUEUE_TIME_IS_OVER;
    });
  }
}
