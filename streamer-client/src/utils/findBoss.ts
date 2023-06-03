import { BossList } from "../data/bossList";

export function findBoss(bossName: string | undefined | null){
    if(bossName)
        for(let i = 0; i < BossList.length ; i++)
            if(BossList[i].name === bossName) return BossList[i];
    return BossList[0];
}