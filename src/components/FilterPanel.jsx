/* eslint-disable react/prop-types */
import { useMemo } from "react";
import "./FilterPanel.css";
import CategoryList from "./CategoryList";

const FILTER_ITEMS = [
    {
        id: "all",
        label: "All",
        iconPatch: "./public/inbox.png",
    },
    {
        id: "important",
        label: "Important",
        iconPatch: "./public/flag.png",
    },
    {
        id: "completed",
        label: "Completed",
        iconPatch: "./public/check.png",
    },
    {
        id: "delete",
        label: "Delete",
        iconPatch: "./public/delete.png",
    },
];

const FilterPanel = ({ selectedFilterId, setSelectedFilterId, todoList, searchText, setSearchText }) => {
    const countByFilterType = useMemo(() => {
        return todoList.reduce(
            (acc, cur) => {
                let newAcc = { ...acc };
                if (cur.isCompleted) {
                    newAcc = { ...newAcc, completed: newAcc.completed + 1 };
                }
                if (cur.isImportant) {
                    newAcc = { ...newAcc, important: newAcc.important + 1 };
                }
                if (cur.isDeleted) {
                    newAcc = { ...newAcc, deleted: newAcc.deleted + 1 };
                }

                return newAcc;
            },
            { all: todoList.length, important: 0, completed: 0, deleted: 0 }
        );
    }, [todoList]);

    console.log({ countByFilterType });

    return (
        <div className="filter-panel">
            <input type="text" value={searchText} onChange={(e) => setSearchText(e.target.value)} />
            <div className="filter-container">
                {FILTER_ITEMS.map((filterItem) => (
                    <div
                        className={`filter-item ${filterItem.id === selectedFilterId ? "selected" : ""}`}
                        key={filterItem.id}
                        onClick={() => setSelectedFilterId(filterItem.id)}
                    >
                        <div className="filter-name">
                            <img src={filterItem.iconPatch} alt="" />
                            <p>{filterItem.label}</p>
                        </div>
                        <p>{countByFilterType[filterItem.id]}</p>
                    </div>
                ))}
            </div>
            <CategoryList />
        </div>
    );
};
export default FilterPanel;
