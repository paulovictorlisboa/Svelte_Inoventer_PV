import { Writable, writable } from "svelte/store";
import type { ColorRamp, MapOverlay } from "../../../@types/maps";

export const selectedMapOverlay: Writable<MapOverlay | null> = writable(null);
export const currentMapColorRamp: Writable<ColorRamp | null> = writable(null);
