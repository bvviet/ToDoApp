/* eslint-disable react/prop-types */
const TodoItem = (props) => {
    return (
        <div className="todo-item" onClick={() => props.handleTodoItemClick(props.id)}>
            <div style={{ display: "flex", gap: "5px" }}>
                <input
                    type="checkbox"
                    checked={props.isCompleted}
                    onChange={() => props.handleCompleteCheckboxChange(props.id)}
                    onClick={(e) => e.stopPropagation()}
                />
                <p className="todo-item-text">{props.name}</p>
            </div>
            {props.isImportant && <p>⭐</p>}
        </div>
    );
};
export default TodoItem;
