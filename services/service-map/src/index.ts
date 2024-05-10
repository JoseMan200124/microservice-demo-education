import express from 'express';

const app = express();
const port = 3004; // Puerto único para este servicio

app.use(express.json());

// Definición de la interfaz para marcadores
interface Marker {
    id: string;
    latitude: number;
    longitude: number;
}

let mapState = {
    markers: [] as Marker[],
    updates: 0
};

app.get('/map', (req, res) => {
    res.json(mapState);
});

app.post('/map/update', (req, res) => {
    const marker = req.body as Marker; // Asignar el tipo correcto al marcador
    if (typeof marker.id === 'string' && typeof marker.latitude === 'number' && typeof marker.longitude === 'number') {
        mapState.markers.push(marker);
        mapState.updates += 1;
        res.json({ message: 'Map updated!', currentState: mapState });
    } else {
        res.status(400).json({ message: 'Invalid marker data' });
    }
});

app.listen(port, () => {
    console.log(`Map Service listening at http://localhost:${port}`);
});
