import { useEffect, useState } from "react";

import { Authenticator } from "./components/Authenticator";
import { MatchDraft } from "./components/MatchDraft";

import { localTokenKey } from "./constants/General";
import { authValidation } from "./API/RaidLeagueAPI";

import './app.scss';

function App() {

  const [auth,setAuth] = useState<boolean>(false);

  // Authentication validator according to local storage token item.
  useEffect(()=>{
    if(localStorage.getItem(localTokenKey)){
      (async () => {
        const auth = await authValidation(localStorage.getItem(localTokenKey));
        if(auth.error) return;
        setAuth(true);
      })();
    }
  },[])

  return (
    <div className="App">
      {auth ? <MatchDraft /> : <Authenticator setAuth={setAuth}/>}
    </div>
  );
}

export default App;
