
import { Category } from './Category';

import './index.scss';
import { MatchIcon, SettingsIcon, TeamsIcon } from '../../../Images';

export interface ICategories{
    title: string;
    subTitle: string;
    image: any,
    color: string;
}

interface ICategoriesList{
    setCategory: Function;
}

export const Categories = ({setCategory}: ICategoriesList) => {

    const categories: ICategories[] = [
        {
            title: 'Settings',
            subTitle: 'PickBan Configuration',
            image: SettingsIcon,
            color: '#fe9365'
        },
        {
            title: 'Teams',
            subTitle: 'Teams Configuration',
            image: TeamsIcon,
            color: '#0df3a3'
        },
        {
            title: 'Match',
            subTitle: 'Match Configuration',
            image: MatchIcon,
            color: '#8f202d'
        }
    ];

    const categoryHandler = (categoryID: number) => {
        const categories = {settings: false, teams: false , match: false};
        switch(categoryID){
            case 1:{
                setCategory({...categories,settings: true});
                return;
            }
            case 2:{
                setCategory({...categories,teams: true});
                return;
            }
            case 3: {
                setCategory({...categories,match: true});
                return;
            }
            default:{
                setCategory(categories);
                return;
            }
        }
    }

    return (
        <div className='categories-container'>
            {categories.map((category : ICategories,index: number)=>{
                return <Category key={index} categoryID={index+1} category={category} categoryHandler={categoryHandler}/>
            })}
        </div>
    );
}