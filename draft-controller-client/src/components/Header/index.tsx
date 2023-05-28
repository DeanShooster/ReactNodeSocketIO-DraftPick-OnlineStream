import './index.scss';
import { RaidLeagueLogo } from '../../Images';

export const Header = () => {
    return (
        <header>
            <img alt='' src={RaidLeagueLogo}/>
            <h1>RaidLeague Controller Page</h1>
        </header>
    );
}