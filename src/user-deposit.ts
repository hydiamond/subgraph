import { Deposit } from "../generated/WETH/WETH";

import { UserHistory } from "../generated/schema";
import {DEPOSIT} from "./constant/constant";
import { log } from "@graphprotocol/graph-ts";

export function handleDepositWithWETH(event: Deposit): void {
    let history = UserHistory.load(event.transaction.hash.toHex());

    log.info('deposit', [event.params.wad.toString()]);

    if(!history) {
        history = new UserHistory(event.transaction.hash.toHex());
        history.type = DEPOSIT;
        history.user = event.params.dst.toHex();
        history.timestamp = event.block.timestamp;
        history.amount = event.params.wad;
    }

    history.save();
}




