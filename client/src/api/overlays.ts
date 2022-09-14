import { get, post } from './requests';

export const getOverlays = async () => get( "api/v1/overlays" );
