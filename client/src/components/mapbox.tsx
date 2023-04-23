import React, { useEffect, useState } from 'react';
import ReactMapGL, { Marker, NavigationControl } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Button } from 'antd';

const MAPBOX_ACCESS_TOKEN = process.env.MAPBOX_ACCESS_TOKEN || '';

const Map = () => {
    const [viewport, setViewport] = useState({
        width: '100%',
        height: '100%',
        latitude: 37.7749,
        longitude: -122.4194,
        zoom: 13,
    });
    const [userLocation, setUserLocation] = useState<any>(null);

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                const { latitude, longitude } = position.coords;
                const newViewport = {
                    ...viewport,
                    latitude,
                    longitude,
                };
                if (userLocation === null) {
                    setUserLocation({ latitude, longitude });
                }
                setViewport(newViewport);
            });
        }
    }, [userLocation, viewport]);

    return (
        <div style={{ height: '100vh' }}>
            <div className='sidebarStyle'>
                <div>
                    Longitude: {viewport.longitude.toFixed(4)} | Latitude:{' '}
                    {viewport.latitude.toFixed(4)} | Zoom: {viewport.zoom.toFixed(2)}
                </div>
            </div>
            <ReactMapGL
                {...viewport}
                mapStyle='mapbox://styles/mapbox/streets-v11'
                //onViewportChange={setViewport}
                mapboxAccessToken={MAPBOX_ACCESS_TOKEN}
            >
                {userLocation && (
                    <Marker latitude={userLocation.latitude} longitude={userLocation.longitude}>
                        <div style={{ color: 'red' }}>You are here</div>
                    </Marker>
                )}
                <div style={{ position: 'absolute', right: 10, top: 10 }}>
                    <NavigationControl />
                </div>
            </ReactMapGL>
        </div>
    );
};

export default Map;
