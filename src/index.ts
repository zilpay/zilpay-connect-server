/*
 * Project: ZilPay-wallet
 * Author: Rinat(hiccaru)
 * -----
 * Modified By: the developer formerly known as Rinat(hiccaru) at <lich666black@gmail.com>
 * -----
 * Copyright (c) 2021 ZilPay
 */
import { server } from './ws-server';

server.listen(8080, function() {
  console.log((new Date()) + ' Server is listening on port 8080');
});
