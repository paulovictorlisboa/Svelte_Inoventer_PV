import type { Request, Response } from "express";
import { AccessPayload } from "../utils/Token";
import database from '../database/connection'
import type { MapOverlay } from "../../../@types/maps";

// export async function getOverlays(request: Request, response: Response) {
//     let { userid } = request.user as AccessPayload;

//     let overlays = await database.Overlays.Get(userid);  

//     response.status(200).json(overlays);
// }
