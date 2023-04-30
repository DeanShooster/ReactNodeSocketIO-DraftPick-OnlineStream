
import './index.scss';

export const WaitingForOpponent = () => {
    return (
        <div className='waiting-for-opponent'>
            <div className='waiting-for-opponent-text'>
                <span>Waiting For Opponent</span>
                <div className="spinner">
                    <div className="bounce1"></div>
                    <div className="bounce2"></div>
                    <div className="bounce3"></div>
                </div>
            </div>
        </div>
    );
}