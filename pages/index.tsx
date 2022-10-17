import { useObjectState } from "@hyper-hyper-space/react";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useTodoListResources } from "../hooks/useTodoListResources";
import { HHSTodoList } from "../types/HHSTodo";
import { TodoItem } from "../types/Todo";

const Home: NextPage = () => {
    const router = useRouter();
    const todoList = useObjectState<HHSTodoList>();
    const { data: todoListResources, isError, error, isLoading } = useTodoListResources();

    if (!todoList || isLoading) return <div>Loading.</div>;

    if (isError) return <div>ERROR</div>;

    if (router.query?.hash) {
        router.push(`/todo-list/${router.query.hash}`);
    }

    return (
        <div className="flex min-h-screen flex-col items-center justify-center py-2">
            <Head>
                <title>HHS Todo List App</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center">
                <h1 className="text-3xl font-bold pt-8">🚀 HyperHyperSpace Todo List ✅</h1>

                <div className="my-6 flex max-w-4xl flex-wrap items-center justify-around sm:w-full">
                    <button
                        onClick={async () => {
                            const todoList = new HHSTodoList();
                            const hash = todoList.hash();
                            const hashQueryParam = encodeURIComponent(hash);
                            alert(`Your todo list hash is: ${hash}`);
                            await todoListResources.store.save(todoList);
                            router.push(`/todo-list/${hashQueryParam}`);
                        }}
                        className="text-center mt-6 w-96 rounded-xl border p-6 hover:text-blue-600 focus:text-blue-600"
                    >
                        Add a Todo List!
                    </button>
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

export default Home;
