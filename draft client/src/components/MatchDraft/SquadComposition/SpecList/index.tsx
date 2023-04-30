import { ISpecList, SpecList } from "../../../../data/specList";

import { Spec } from "./Spec";

import './index.scss';

interface IBuildSpecList{
    handleDragStart: Function;
    opponentPicks: string[];
}

export const BuildSpecList = ({handleDragStart,opponentPicks} : IBuildSpecList) => {
    return (
        <section className="build-spec-list">
            {SpecList.map( (spec : ISpecList, index: number)=>{
                if(opponentPicks.includes(spec.name))
                    return <Spec key={index} name={spec.name} image={spec.image} handleDragStart={handleDragStart}/>
                return null;
            })}
        </section>
    );
}