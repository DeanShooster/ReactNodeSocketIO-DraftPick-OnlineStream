import { useEffect, useState } from 'react';
import { getSettings } from '../../API/ControllerAPI';

import { Categories } from './Categories';
import { Settings } from './Settings';
import { Teams } from './Teams';
import { Match } from './Match';

import './index.scss';

interface ICategory{
    settings: boolean;
    teams: boolean;
    match: boolean;
}

export interface IPickNBan{
    ban: number;
    banRange: {
        min: number;
        max: number;
    };
    pick: number;
    pickRange:{
        min: number;
        max: number;
    }
}

export interface ITeam{
    name: string;
    code: string;
}

interface IDraftMatch{
    pickNban: IPickNBan;
    teams: ITeam[];
    match: ITeam[];
}

export const Controller = () => {

    const [category, setCategory] = useState<ICategory>({settings: false, teams: false, match: false});
    const [settings,setSettings] = useState<IDraftMatch | null>(null);

    useEffect(()=>{
        (async ()=>{
            const result = await getSettings();
            if(!result.error) setSettings(result.settings);
        })();
    },[]);

    async function updateSetting(){
        const result = await getSettings();
        if(!result.error) setSettings(result.settings);
    }

    return (
        <section className='controller-page'>
            <Categories setCategory={setCategory}/>
            <>
                {settings ? <>
                    {category.settings && <Settings pickNban={settings.pickNban} updateSetting={updateSetting}/> }
                    {category.teams && <Teams teams={settings.teams} updateSetting={updateSetting}/> }
                    {category.match && <Match match={settings.match} teams={settings.teams} updateSetting={updateSetting}/> }
                </> : null}
            </>
        </section>
    );
}