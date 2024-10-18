import { useMemo, useState } from "react";
import "./App.css";
import TodoItem from "./components/TodoItem";
import { useRef } from "react";
import SideBar from "./components/SideBar";
import FilterPanel from "./components/FilterPanel";

function App() {
    const [todoList, setTodoList] = useState([
        {
            id: "1",
            name: "A",
            isImportant: true,
            isCompleted: false,
            isDeleted: false,
            category: "personal",
        },
        {
            id: "2",
            name: "b",
            isImportant: false,
            isCompleted: false,
            isDeleted: false,
            category: "travel",
        },
        {
            id: "3",
            name: "c",
            isImportant: true,
            isCompleted: true,
            isDeleted: false,
            category: "ideal",
        },
    ]);
    const [selectedFilterId, setSelectedFilterId] = useState("all");
    const [activeTodoItemId, setActiveTodoItemId] = useState();
    const [showSidebar, setShowSidebar] = useState(false);
    const [searchText, setSearchText] = useState("");

    const activeTodoItem = todoList.find((todo) => todo.id === activeTodoItemId);

    const handleCompleteCheckbox = (todoId) => {
        const newTodoList = todoList.map((todo) => {
            if (todo.id === todoId) {
                return { ...todo, isCompleted: !todo.isCompleted };
            }
            return todo;
        });
        setTodoList(newTodoList);
    };

    const handleTodoItemChange = (newTodo) => {
        const newTodoList = todoList.map((todo) => {
            if (todo.id === newTodo.id) {
                return newTodo;
            }
            return todo;
        });
        setTodoList(newTodoList);
    };

    const inputRef = useRef();

    const handleTodoItemClick = (todoId) => {
        setShowSidebar(true);
        setActiveTodoItemId(todoId);
    };

    const filterToDos = useMemo(() => {
        return todoList.filter((todo) => {
            if (!todo.name.includes(searchText)) {
                return false;
            }
            switch (selectedFilterId) {
                case selectedFilterId === "all":
                    return true;
                case selectedFilterId === "important":
                    return todo.isImportant;
                case selectedFilterId === "completed":
                    return todo.isCompleted;
                case selectedFilterId === "delete":
                    return todo.isDeleted;
                default:
                    return true;
            }
        });
    }, [todoList, selectedFilterId, searchText]);

    return (
        <div className="container">
            <FilterPanel
                selectedFilterId={selectedFilterId}
                setSelectedFilterId={setSelectedFilterId}
                todoList={todoList}
                searchText={searchText}
                setSearchText={setSearchText}
            />
            <div className="main-content">
                <input
                    ref={inputRef}
                    type="text"
                    placeholder="Add new task"
                    name="add-new-task"
                    className="task-input"
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            const value = e.target.value;
                            setTodoList([
                                ...todoList,
                                {
                                    id: crypto.randomUUID,
                                    name: value,
                                    isCompleted: false,
                                    isImportant: false,
                                    isDeleted: false,
                                    category: "personal",
                                },
                            ]);
                            inputRef.current.value = "";
                        }
                    }}
                />
                <div>
                    {filterToDos.map((todoItem) => {
                        return (
                            <TodoItem
                                id={todoItem.id}
                                name={todoItem.name}
                                key={todoItem.id}
                                isImportant={todoItem.isImportant}
                                isCompleted={todoItem.isCompleted}
                                handleCompleteCheckboxChange={handleCompleteCheckbox}
                                handleTodoItemClick={handleTodoItemClick}
                            />
                        );
                    })}
                </div>
                {showSidebar && (
                    <SideBar
                        key={activeTodoItemId}
                        todoItem={activeTodoItem}
                        handleTodoItemChange={handleTodoItemChange}
                        setShowSidebar={setShowSidebar}
                    />
                )}
            </div>
        </div>
    );
}

export default App;
