import { useObjectState } from "@hyper-hyper-space/react";
import { HHSTodoList } from "../types/HHSTodo";
import { useTodoListResources } from "./useTodoListResources";

export async function useTodoList(hash: string) {
    const { data: todoListResources, isError, error, isLoading } = useTodoListResources();
    const hhsTodoList = await todoListResources?.store?.load<HHSTodoList>(hash);
    const todoList = useObjectState<HHSTodoList>(hhsTodoList);

    return todoList;
}
