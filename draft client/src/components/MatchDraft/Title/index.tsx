
import './index.scss';

interface ITitle{
    text: string;
}

export const Title = ({text}: ITitle) => {
    return <h1 className='draft-match-title'>{text}</h1>;
}