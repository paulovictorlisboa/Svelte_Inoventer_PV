import { Writable, writable } from "svelte/store";

export const userLoggedIn: Writable<boolean> = writable(false);
