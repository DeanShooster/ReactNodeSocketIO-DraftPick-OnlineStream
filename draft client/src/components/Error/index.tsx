
import './index.scss';
import { SadSmiley } from '../../Images';

interface IError{
    message: string;
}

export const Error = ({message}: IError) => {
    return <p className='error-msg'>{message} <img alt='' src={SadSmiley}/></p>
}

