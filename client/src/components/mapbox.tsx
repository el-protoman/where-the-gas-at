import ReactMapGL, { Marker } from "react-map-gl";
import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import "mapbox-gl/dist/mapbox-gl.css";
import { Button } from 'antd';

mapboxgl.accessToken = process.env.MAPBOX_ACCESS_TOKEN;

const Map = () => {
    const mapContainerRef = useRef<any>(null);
    const map = useRef<any>(null);
    const [lng, setLng] = useState(42.35);
    const [lat, setLat] = useState(-70.9);
    const [zoom, setZoom] = useState(9);
    const [viewport, setViewport] = useState<any>({
        width: "100%",
        height: "100%",
        latitude: 37.7749,
        longitude: -122.4194,
        zoom: 10,
    });
    const [userLocation, setUserLocation] = useState<any>(null);

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                const iuserLocation = {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                };
                const iviewport = {
                    ...viewport,
                    latitude: iuserLocation.latitude,
                    longitude: iuserLocation.longitude,
                };
                setUserLocation(iuserLocation);
                setViewport(iviewport);
            });
        }
    });

    // Initialize map when component mounts
    useEffect(() => {
        if (map.current) return; // initialize map only once
        map.current = new mapboxgl.Map({
            container: mapContainerRef.current,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [lng, lat],
            zoom: zoom
        });

        // Add navigation control (the +/- zoom buttons)
        map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

        map.current.on('move', () => {
            setLng(map.current.getCenter().lng.toFixed(4));
            setLat(map.current.getCenter().lat.toFixed(4));
            setZoom(map.current.getZoom().toFixed(2));
        });

        // Clean up on unmount
        //return () => map.current.remove();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div>
            <div className='sidebarStyle'>
                <div>
                    Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
                </div>
            </div>
            <div className='map-container' ref={mapContainerRef} />
            <ReactMapGL
                {...viewport}
                mapStyle="mapbox://styles/mapbox/streets-v11"
                onViewportChange={(viewport: any) => setViewport(viewport)}
                mapboxApiAccessToken={mapboxgl.accessToken}
            >
                {userLocation && (
                    <Marker
                        latitude={userLocation.latitude}
                        longitude={userLocation.longitude}
                    >
                        <div style={{ color: "red" }}>You are here</div>
                    </Marker>
                )}
            </ReactMapGL>
        </div>
    );
};

export default Map;
