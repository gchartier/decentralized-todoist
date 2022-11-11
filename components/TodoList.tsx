import { ObjectState, useObjectState } from "@hyper-hyper-space/react";
import { HHSTodoList } from "../types/HHSTodo";
import { TodoItem } from "../types/Todo";
import { TodoListItem } from "./TodoListItem";

interface Props {
    listHeading: string;
    emptyListMessage?: string;
    todoList?: HHSTodoList;
    filter?: (todo: TodoItem) => boolean;
}

export function TodoList({
    listHeading,
    emptyListMessage = "No todos...",
    todoList,
    filter,
}: Props) {
    const todoListState = useObjectState(todoList);
    const todos = todoListState?.getValue()?.items.getValue() ?? [];

    return (
        <fieldset>
            <legend className="text-lg font-medium text-gray-900">{listHeading}</legend>

            <ol
                className={`mt-4 divide-y border-t divide-gray-200 border-gray-200 ${
                    todos.length > 0 ? "border-b" : ""
                }`}
            >
                {todos.length > 0 ? (
                    todos.map((todo) => <TodoListItem todo={todo} todoList={todoListState} />)
                ) : (
                    <p className="text-gray-400 pt-2">{emptyListMessage}</p>
                )}
            </ol>
        </fieldset>
    );
}
