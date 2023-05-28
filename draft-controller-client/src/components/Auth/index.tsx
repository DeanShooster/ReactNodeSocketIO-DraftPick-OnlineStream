import { Login } from "./Login";
import { Wall } from "./Wall";

interface IAuth{
    setAuth: Function
}

export const Auth = ({setAuth} : IAuth) => {
    return (
        <>
            <Wall />
            <Login setAuth={setAuth}/>
        </>
    );
}