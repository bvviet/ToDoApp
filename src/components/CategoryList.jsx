import { CATEGORY_ITEMS } from "../constanst";
import "./Category.css";

const CategoryList = () => {
    return (
        <div>
            <p>Category</p>
            <div>
                {CATEGORY_ITEMS.map((category) => (
                    <div key={category.id} className="category-item">
                        <p className="category-name">{category.label}</p>
                        <p>2</p>
                    </div>
                ))}
            </div>
        </div>
    );
};
export default CategoryList;
