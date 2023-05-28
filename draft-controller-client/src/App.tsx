import { useEffect, useState } from 'react';

import { Header } from './components/Header';
import { Auth } from './components/Auth';
import { Controller } from './components/Controller';

import './App.scss';
import { isAdminLogged } from './API/ControllerAPI';
import { localTokenAdminKey } from './constants/General';
import { Loader } from './components/Loader';

function App() {

  const [auth,setAuth] = useState<boolean>(false);
  const [isLoading,setIsLoading] = useState<boolean>(true);

  useEffect(()=>{
    (async ()=>{
      setIsLoading(true);
      const token = localStorage.getItem(localTokenAdminKey);
      if(token){
        const result = await isAdminLogged(token);
        if(result.error){
          setAuth(false);
          setIsLoading(false);
          return;
        }
        setAuth(true);
      } else setAuth(false);
      setIsLoading(false);
    })();
  },[]);


  return (
    <div>
      <Header />
        {isLoading ? <Loader /> : <> {auth ? <Controller /> : <Auth setAuth={setAuth}/>} </>}
    </div>
  );
}

export default App;
