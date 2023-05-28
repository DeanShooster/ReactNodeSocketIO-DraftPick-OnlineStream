import { SpecListPicks, SpecLogoListPicks } from "../data/specList";


export function findSpec(specName: string | undefined){
    if(specName)
        for(let i = 0; i < SpecListPicks.length ; i++)
            if(SpecListPicks[i].name === specName) return SpecListPicks[i].image;
    return undefined;
}

export function findSpecLogo(specName: string | undefined){
    if(specName)
    for(let i = 0; i < SpecLogoListPicks.length ; i++)
        if(SpecLogoListPicks[i].name === specName) return SpecLogoListPicks[i].image;
    return undefined;
}