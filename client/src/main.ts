import App from './App.svelte';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

L.Icon.Default.imagePath='assets/icons/'

const app = new App({
	target: document.body,
	// hydrate: true
});

export default app;
