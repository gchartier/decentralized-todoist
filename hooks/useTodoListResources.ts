import {
    Store,
    IdbBackend,
    RSAKeyPair,
    Identity,
    RNGImpl,
    Resources,
} from "@hyper-hyper-space/core";
import { useQuery } from "@tanstack/react-query";

export function useTodoListResources() {
    const todoListResources = useQuery(["todoListResources"], getTodoListResources, {
        cacheTime: Infinity,
    });

    return todoListResources;
}

export async function getTodoListResources() {
    const store = new Store(new IdbBackend("todo-list-app"));
    const key = await RSAKeyPair.generate(1024);
    const id = Identity.fromKeyPair({ name: new RNGImpl().randomHexString(128) }, key);

    await store.save(key);
    await store.save(id);

    return await Resources.create({ config: { id: id }, store: store });
}
