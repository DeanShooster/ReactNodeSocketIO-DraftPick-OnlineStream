import { useState } from 'react';
import { adminLogin } from '../../../API/ControllerAPI';
import { localTokenAdminKey } from '../../../constants/General';

import './index.scss';

interface ILogin{
    setAuth: Function;
}

export const Login = ({setAuth} : ILogin) => {

    const [password,setPassword] = useState<string>('');
    const [loginError, setLoginError] = useState<string | null>(null);

    async function loginHandler(event : any){
        event.preventDefault();
        if(password.length <= 5) return;
        const result = await adminLogin(password);
        if(result.error){
            setLoginError(result.error);
            return;
        }
        localStorage.setItem(localTokenAdminKey,result.token);
        setLoginError(null); setAuth(true);
    }


    return (
        <div className='login-container'>
            <form onSubmit={loginHandler}>
                <h1>Admin Login</h1>
                <input maxLength={20} onChange={(event: React.ChangeEvent<HTMLInputElement>)=>setPassword(event.target.value)}/>
                <button>Login</button>
            </form>
            {loginError && <div className='login-error-msg'>{loginError}</div>}
        </div>
    );
}