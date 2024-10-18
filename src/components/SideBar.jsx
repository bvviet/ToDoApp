/* eslint-disable react/prop-types */
import { useState } from "react";
import "./Sidebar.css";
import { CATEGORY_ITEMS } from "../constanst";

const SideBar = (props) => {
    const data = props.todoItem;
    const [name, setName] = useState(data.name);
    const [isImportant, setIsImportant] = useState(data.isImportant);
    const [isCompleted, setIsCompleted] = useState(data.isCompleted);
    const [category, setCategory] = useState(data.category);

    const handleSave = () => {
        const newTodo = { ...data, name, isCompleted, isImportant, category };
        props.handleTodoItemChange(newTodo);
        props.setShowSidebar(false);
    };

    return (
        <div className="sidebar">
            <form action="" className="sidebar-form">
                <div className="sidebar-form__field">
                    <label htmlFor="sb-name">Todo Name</label>
                    <input
                        id="sb-name"
                        name="name"
                        type="text"
                        value={name}
                        onChange={(e) => {
                            setName(e.target.value);
                            // props.handleTodoNameChange(data.id, e.target.value);
                        }}
                    />
                </div>
                <div className="sidebar-form__field">
                    <label htmlFor="sb-Important">Is Important?</label>
                    <input
                        id="sb-Important"
                        name="isImportant"
                        type="checkbox"
                        checked={isImportant}
                        onChange={() => setIsImportant(!isImportant)}
                    />
                </div>
                <div className="sidebar-form__field">
                    <label htmlFor="sb-Completed">Is Completed</label>
                    <input
                        id="sb-Completed"
                        name="isCompleted"
                        type="checkbox"
                        checked={isCompleted}
                        onChange={() => setIsCompleted(!isCompleted)}
                    />
                </div>

                <div className="sidebar-form__field">
                    <label htmlFor="sb-category">Category</label>
                    <select id="sb-category" value={category} onChange={(e) => setCategory(e.target.value)}>
                        {CATEGORY_ITEMS.map((category) => (
                            <option value={category.id} key={category.id}>
                                {category.label}
                            </option>
                        ))}
                    </select>
                </div>
            </form>
            <div className="sidebar-footer">
                <button onClick={handleSave}>Save</button>
                <button onClick={() => props.setShowSidebar(false)}>Cancel</button>
            </div>
        </div>
    );
};
export default SideBar;
