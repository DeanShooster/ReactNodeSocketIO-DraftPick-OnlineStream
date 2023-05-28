import { ban, pick } from "../constants/General";

export function pickOrBanHandler(picks : number,bans: number){
    if(bans === 0 ) return ban;
    if(bans === 1 && picks === 0 ) return pick;
    if(bans === picks ) return pick;
    else return ban;
}