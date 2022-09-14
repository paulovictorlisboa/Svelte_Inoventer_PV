import type { LeafletMouseEvent } from "leaflet";

type ColorRampDataPoint = [v: number, r: number, g: number, b: number]; 
type CoordinatePoint = [lat: number, lng: number];


export type ColorRamp = ColorRampDataPoint[];

export interface MapOverlay {
    id: number;
    type: string;
    location: string;
    capture: string;
    extent: [lowerLeft: CoordinatePoint, upperRight: CoordinatePoint];
    minZoom: number;
    maxZoom: number;
    colorRampId: number;
}

export interface ValueMarker {
    id: number;
    overlayId: number;
    type: string;
    capture: string;
    markedAt: number;
    lat: number;
    lng: number;
    value: number;
}

interface MapClickEvent {
    detail: LeafletMouseEvent;
}
