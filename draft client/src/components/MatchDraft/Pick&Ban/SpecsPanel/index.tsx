import { Spec } from "./Spec";

import { SpecList , ISpecList } from "../../../../data/specList";

import './index.scss';

interface ISpecsPanel{
    selectedSpecList: string[];
    banList: string[];
    setSelectedSpec: Function;
}

export const SpecsPanel = ({selectedSpecList,setSelectedSpec,banList} : ISpecsPanel) => {
    return (
        <section className="specs-panel">
            <div className="specs-container">
                {SpecList.map( (spec: ISpecList,index : number)=>{
                    return <Spec name={spec.name} image={spec.image} setSelectedSpec={setSelectedSpec} 
                            key={index} chosen={selectedSpecList.includes(spec.name) || banList.includes(spec.name)}/>;
                })}
            </div>
        </section>
    );
}