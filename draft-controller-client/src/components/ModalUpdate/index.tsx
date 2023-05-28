
import './index.scss';
import { InfoBubble } from '../../Images';

interface IModalUpdate{
    update: string;
    closeModal: Function;
}

export const ModalUpdate = ({update,closeModal} : IModalUpdate) => {
    return (
        <>
            <div className='modal-wall'></div>
            <div className='modal-update-msg'>
                <img alt='' src={InfoBubble}/>
                <p>{update}</p>
                <button onClick={()=>closeModal(null)}>Close</button>
            </div>
        </>
    );
}