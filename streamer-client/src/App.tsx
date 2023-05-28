import { useEffect, useState } from 'react';

import { DraftStream } from './components/DraftStream';
import { OnlyPCSupport } from './components/OnlyPCSupport';

import './App.scss';

function App() {

  const [width,setWidth] = useState<number>(window.innerWidth);

  useEffect(()=>{

    const windowSize = () => setWidth(window.innerWidth);
    window.addEventListener('resize',windowSize);
    return ()=>{ window.removeEventListener('resize',windowSize); }
  },[])

  return (
    <div className='App'>
      {width > 1500 ? <DraftStream /> : <OnlyPCSupport />}
    </div>
  );
}

export default App;
