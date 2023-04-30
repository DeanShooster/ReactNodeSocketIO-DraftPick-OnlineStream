import { useRef, useState } from "react";
import { authenticator } from "../../../API/RaidLeagueAPI";
import { localTokenKey, localTokenTeamName } from "../../../constants/General";
import { Error } from "../../Error";

import { RaidLeagueLogo } from "../../../Images";

interface ICredentials{
    setAuth: Function;
}

export const Credentials = ({setAuth}: ICredentials) => {
    const [credentials,setCredentials] = useState<string | null>(null);
    const inputRef = useRef<any>();
    const [credentialsLabel,setCredentialsLabel] = useState<boolean>(false);
    const [error,setError] = useState<string | null>(null);

    const focusHandler = () => inputRef?.current ?  inputRef.current.focus() : null;

    const authenticatorHandler = async () => {
        if(inputRef){
            const auth = await authenticator({credentials: inputRef.current.value});
            if(auth.error){
                setError(auth.error);
                return;
            }
            localStorage.setItem(localTokenTeamName,auth.name); localStorage.setItem(localTokenKey , auth.token);
            setAuth(true);
        }
    }

    return (
        <div className="credentials-container">
            <img alt='' src={RaidLeagueLogo}/>
            <h1>Team Credentials</h1>
            <div className="input-container">
                <label className={(credentialsLabel || credentials) ? 'focused-label-input' : undefined} onClick={focusHandler}>Credentials Code</label>
                <input ref={inputRef} onChange={ (event: any) => setCredentials(event.target.value)} onFocus={()=>setCredentialsLabel(true)} onBlur={()=>setCredentialsLabel(false)}/>
            </div>
            <button onClick={authenticatorHandler}>Send Credentials</button>
            {error && <Error message={error}/>}
        </div>
    );
}