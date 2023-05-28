import { 
    Adina, CA, CairnMO, Deimos, Dhuum, Escort, Gorseval, KC, Mathias, QTP, 
    Qadim, SH, Sabetha, Sabir, Samarog, Sloth, TwinLargos, TwistedCastle, 
    ValeGuardian, Wing1, Wing2, Wing3, Wing4, Wing5, Wing6, Wing7, Xera, 
    noBoss 
} from "../Images";

interface IBoss{
    name: string;
    image: any;
}

export const BossList : IBoss[] = [
    {name: 'no-boss' , image: noBoss },
    {name: 'Wing1' , image: Wing1 },
    {name: 'Vale Guardian' , image: ValeGuardian },
    {name: 'Gorseval' , image: Gorseval },
    {name: 'Sabetha' , image: Sabetha },
    {name: 'Wing2' , image: Wing2 },
    {name: 'Sloth' , image: Sloth },
    {name: 'Mathias' , image: Mathias },
    {name: 'Wing3' , image: Wing3 },
    {name: 'Escort' , image: Escort },
    {name: 'KC' , image: KC },
    {name: 'Twisted Castle' , image: TwistedCastle },
    {name: 'Xera' , image: Xera },
    {name: 'Wing4' , image: Wing4 },
    {name: 'CairnMO' , image: CairnMO },
    {name: 'Samarog' , image: Samarog },
    {name: 'Deimos' , image: Deimos },
    {name: 'Wing5' , image: Wing5 },
    {name: 'SH' , image: SH },
    {name: 'Dhuum' , image: Dhuum },
    {name: 'Wing6' , image: Wing6 },
    {name: 'CA' , image: CA },
    {name: 'Twin Largos' , image: TwinLargos },
    {name: 'Qadim' , image: Qadim },
    {name: 'Wing7' , image: Wing7 },
    {name: 'Adina' , image: Adina },
    {name: 'Sabir' , image: Sabir },
    {name: 'QTP' , image: QTP },
];