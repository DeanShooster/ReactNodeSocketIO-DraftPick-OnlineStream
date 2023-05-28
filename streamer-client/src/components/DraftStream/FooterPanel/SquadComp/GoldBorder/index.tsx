
import './index.scss';
import { GoldLine } from "../../../../../Images";

export const GoldBorder = () => {
    return (
        <>
            <img src={GoldLine} alt="" className='TopBorder'/>
            <img src={GoldLine} alt="" className='RightBorder'/>
            <img src={GoldLine} alt="" className='BottomBorder'/>
            <img src={GoldLine} alt="" className='LeftBorder'/>
        </>
    );
}