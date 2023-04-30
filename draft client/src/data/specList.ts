import { Berserker, BladeSworn, Catalyst, Chrono, DH, DareDevil, Deadeye, Druid, Ele, Engi, FB, Guardian, Harbinger, Herald, Holo, Mech, Mesmer, Mirage, Necro, Ranger, Reaper, Renegade, Rev, SLB, Scourge, Scrapper, Specter, SpellBreaker, Tempest, Thief, Untamed, Vindi, Virtuoso, Warrior, Weaver, WillBender } from "../Images";

export interface ISpecList{
    name: string;
    image: any;
}

export const SpecList: ISpecList[] = [
    { name: 'Warrior', image: Warrior },
    { name: 'Ele', image: Ele },
    { name: 'Mesmer', image: Mesmer },
    { name: 'Thief', image: Thief },
    { name: 'Guardian', image: Guardian },
    { name: 'Ranger', image: Ranger },
    { name: 'Necro', image: Necro },
    { name: 'Rev', image: Rev },
    { name: 'Engi', image: Engi },
    { name: 'Berserker', image: Berserker },
    { name: 'Tempest', image: Tempest },
    { name: 'Chrono', image: Chrono },
    { name: 'DareDevil', image: DareDevil },
    { name: 'DH', image: DH },
    { name: 'Druid', image: Druid },
    { name: 'Reaper', image: Reaper },
    { name: 'Herald', image: Herald },
    { name: 'Holo', image: Holo },
    { name: 'SpellBreaker', image: SpellBreaker },
    { name: 'Weaver', image: Weaver },
    { name: 'Mirage', image: Mirage },
    { name: 'Deadeye', image: Deadeye },
    { name: 'FB', image: FB },
    { name: 'SLB', image: SLB },
    { name: 'Scourge', image: Scourge },
    { name: 'Renegade', image: Renegade },
    { name: 'Scrapper', image: Scrapper },
    { name: 'BladeSworn', image: BladeSworn },
    { name: 'Catalyst', image: Catalyst },
    { name: 'Virtuoso', image: Virtuoso },
    { name: 'Specter', image: Specter },
    { name: 'WillBender', image: WillBender },
    { name: 'Untamed', image: Untamed },
    { name: 'Harbinger', image: Harbinger },
    { name: 'Vindi', image: Vindi },
    { name: 'Mech', image: Mech },
];