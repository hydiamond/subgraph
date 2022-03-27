import {UserHistory} from "../generated/schema";
import {Withdraw} from "../generated/MasterChef/MasterChef";
import {log} from "@graphprotocol/graph-ts/index";
import {WITHDRAW} from "./constant/constant";

export function handleWithDrawMasterChef(event: Withdraw): void {
    let history = UserHistory.load(event.transaction.hash.toHex());

    log.info('withDraw', [event.params.amount.toString()]);

    if (!history) {
        history = new UserHistory(event.transaction.hash.toHex());
        history.type = WITHDRAW;
        history.user = event.params.user.toHex();
        history.timestamp = event.block.timestamp;
        history.amount = event.params.amount;
    }

    history.save();
}

export function handleWithDrawWeth(event): void {

}
