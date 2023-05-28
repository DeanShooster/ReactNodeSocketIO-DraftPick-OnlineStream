
import { ICategories } from "..";

import './index.scss';

interface ICategory{
    categoryID: number;
    category: ICategories
    categoryHandler: Function;
}

export const Category = ({categoryID , category , categoryHandler} : ICategory) => {
    return (
        <div className="category-container" style={{color: category.color}} onClick={()=>categoryHandler(categoryID)}>
            <div className="title-container">
                <h1>{category.title}</h1>
                <img alt='' src={category.image}/>
            </div>
            <div className="sub-title-container" style={{background: `linear-gradient(to right,${category.color},white 175%)`}}>{category.subTitle}</div>
        </div>
    );
}