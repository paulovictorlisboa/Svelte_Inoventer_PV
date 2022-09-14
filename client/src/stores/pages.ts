import { Writable, writable } from "svelte/store";

export enum Page {
    Main,
    Login,
    Register,
};
export const currentPage: Writable<Page> = writable(Page.Main);
