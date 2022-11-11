import { useState } from "react";
import { HHSTodoList } from "../types/HHSTodo";
import { useTodoListResources } from "./useTodoListResources";

export function useTodoList(hash: string) {
    const { data: todoListResources, isError, error, isLoading } = useTodoListResources();
    console.log("useTodoList Ran");

    const [todoList, setTodoList] = useState<HHSTodoList>();

    todoListResources?.store?.load<HHSTodoList>(hash, true, true).then((loaded?: HHSTodoList) => {
        setTodoList(loaded);
    });

    return todoList;
}
