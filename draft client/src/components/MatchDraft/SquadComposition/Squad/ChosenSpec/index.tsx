
import './index.scss';
import { Remove } from '../../../../../Images';

interface IChosenSpec{
    index: number;
    name: string;
    image: any;
    removeSpecHandler: Function;
}

export const ChosenSpec = ({name,image , removeSpecHandler,index}: IChosenSpec) => {
    return (
        <div className='chosen-spec-wrapper' data-index={index} >
            <img alt={name} src={image} className='chosen-spec-image' draggable={false}/>
            {name && <img alt='' src={Remove} className='remove-spec-icon' onClick={()=>removeSpecHandler(index)}/>}
        </div>
    );
}