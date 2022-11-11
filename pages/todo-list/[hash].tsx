import { NextPage } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import { TodoList } from "../../components/TodoList";
import { useTodoList } from "../../hooks/useTodoList";
import { useTodoListResources } from "../../hooks/useTodoListResources";
import { PlusIcon as PlusIconMini } from "@heroicons/react/20/solid";

const TodoListPage: NextPage = () => {
    const router = useRouter();
    const { data: todoListResources, isError, error, isLoading } = useTodoListResources();
    const hash = router.query?.hash as string;
    const todoList = useTodoList(hash);

    if (!todoList || isLoading) return <div>Loading.</div>;

    if (isError) return <div>ERROR</div>;

    return (
        <div className="flex min-h-screen flex-col items-center justify-center py-2">
            <main className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center">
                <h1 className="text-3xl font-bold pt-8">🚀 HyperHyperSpace Todo List ✅</h1>

                <div className="my-6 flex max-w-4xl flex-wrap items-center justify-around sm:w-full">
                    <div className="mt-6 w-96 rounded-xl border p-6 text-left space-y-4 hover:text-blue-600 focus:text-blue-600">
                        <TodoList
                            todoList={todoList}
                            listHeading="📥 Todo"
                            emptyListMessage="No tasks..."
                        />

                        <button
                            // onClick={async () => {
                            //     const newTodo = { id: 123, title: "New Todo", isCompleted: false };
                            //     const items = todoList?.getValue()?.items.getValue();
                            //     console.log({ items });
                            //     items?.push(newTodo);
                            //     await todoList
                            //         ?.getValue()
                            //         ?.items.setValue(items as Array<TodoItem>);
                            //     await todoListResources.store.save(
                            //         todoList.getValue() as HHSTodoList
                            //     );
                            // }}
                            type="button"
                            className="inline-flex items-center rounded-full border border-transparent bg-indigo-600 p-1.5 text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        >
                            <PlusIconMini className="h-5 w-5" aria-hidden="true" />
                        </button>
                    </div>
                    <div className="mt-6 w-96 rounded-xl border p-6 text-left hover:text-blue-600 focus:text-blue-600">
                        <TodoList
                            todoList={todoList}
                            listHeading="✅ Done"
                            emptyListMessage="You haven't done anything yet..."
                        />
                    </div>
                </div>
            </main>

            <footer className="flex h-24 w-full items-center justify-center border-t">
                <a
                    className="flex items-center justify-center gap-2"
                    href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Powered by <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
                </a>
            </footer>
        </div>
    );
};

export default TodoListPage;
