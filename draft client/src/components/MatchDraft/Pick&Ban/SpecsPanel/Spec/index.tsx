
import './index.scss';
import { RedX } from '../../../../../Images';

interface ISpec{
    name: string;
    image: any;
    setSelectedSpec: Function;
    chosen: boolean;
}

export const Spec = ({name , image , setSelectedSpec, chosen} : ISpec) => {

    const selectSpecHandler = () =>{
        if(chosen) return;
        window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: 'smooth'
        });
        setSelectedSpec({name,image});
    }

    return (
        <div className={`spec-wrapper ${chosen ? '' : 'with-hover'}`} onClick={selectSpecHandler}>
            <img alt={name} src={image} className='spec-image' style={chosen ? {filter: 'grayscale(100%)'} : {}}/>
            {chosen && <img alt='' src={RedX} className='chosen-spec-image'/>}
        </div>
    );
}