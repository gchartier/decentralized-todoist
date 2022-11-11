import { ObjectState } from "@hyper-hyper-space/react";
import { Dispatch, SetStateAction } from "react";
import { HHSTodoList } from "../types/HHSTodo";
import { TodoItem } from "../types/Todo";

interface Props {
    todo: TodoItem;
    todoList?: ObjectState<HHSTodoList>;
}

export function TodoListItem({ todo, todoList }: Props) {
    const { id, title } = todo;
    const todos = todoList?.getValue()?.items.getValue() ?? [];

    return (
        <div key={id} className="relative flex items-start py-4">
            <div className="min-w-0 flex-1 text-sm">
                <label htmlFor={`todo-${id}`} className="select-none font-medium text-gray-700">
                    {title}
                </label>
            </div>
            <div className="ml-3 flex h-5 items-center">
                <input
                    id={`todo-${id}`}
                    name={`todo-${id}`}
                    type="checkbox"
                    checked={todo.isCompleted}
                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    onClick={() => {
                        todoList?.getValue()?.items.setValue(
                            todos.map((todo) => {
                                if (todo.id === id) {
                                    return { ...todo, isCompleted: !todo.isCompleted };
                                }

                                return todo;
                            })
                        );
                    }}
                />
            </div>
        </div>
    );
}
