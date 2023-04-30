import { ISpecList } from '../../../../data/specList';

import { ChosenSpec } from './ChosenSpec';

import './index.scss';

interface ISquad{
    squad: ISpecList [];
    setSquad: Function;
    handleDragOver: React.DragEventHandler<HTMLDivElement>;
    handleDragDrop: React.DragEventHandler<HTMLDivElement>;
}

export const Squad = ({squad ,setSquad , handleDragOver , handleDragDrop} : ISquad) => {

    const removeSpecHandler = (index: number) => {
        const newSquad = [...squad];
        newSquad[index] = {
            name: '',
            image: null
        }
        setSquad(newSquad);
    }

    return (
        <div className='squad-container' onDragOver={handleDragOver} onDrop={handleDragDrop}>
            {squad.map( (spec: ISpecList , index : number)=>{
                return <ChosenSpec key={index} index={index} name={spec.name} image={spec.image} removeSpecHandler={removeSpecHandler}/>
            })}
        </div>
    );
}