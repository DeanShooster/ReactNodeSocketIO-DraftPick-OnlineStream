
import './index.scss';

interface ISpec{
    name: string;
    image: any;
    handleDragStart: Function;
}

export const Spec = ({name,image,handleDragStart} : ISpec) => {
    return (
       <div className='spec-wrapper' draggable onDragStart={(event)=> handleDragStart(event,{name,image})}>
            <img alt={name} src={image}/>
       </div>
    );
}