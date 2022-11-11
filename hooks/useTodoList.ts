import { useObjectState } from "@hyper-hyper-space/react";
import { useState } from "react";
import { HHSTodoList } from "../types/HHSTodo";
import { useTodoListResources } from "./useTodoListResources";

export function useTodoList(hash: string) {

    const { data: todoListResources, isError, error, isLoading } = useTodoListResources();

    const [todoList, setTodoList] = useState<HHSTodoList>()

    todoListResources?.store?.load<HHSTodoList>(hash).then((loaded?: HHSTodoList) => {
        setTodoList(loaded);
    });

    //const todoList = await todoListResources?.store?.load<HHSTodoList>(hash);
    
    return todoList;
}
