import { Wall } from './Wall';
import { Credentials } from './Credentials';

import './index.scss';

interface IAuthenticator{
    setAuth: Function;
}

export const Authenticator = ({setAuth}: IAuthenticator) => {
    return (
        <>
            <Wall />
            <Credentials setAuth={setAuth}/>
        </>
    );
}