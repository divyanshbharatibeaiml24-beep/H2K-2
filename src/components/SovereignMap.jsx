import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import { WARDS } from '../data/seedData';

// Free, No-API-Key Tile Providers
const TILE_LAYERS = {
  cyberDark: {
    name: "🌌 Cyber Dark (Full GIS)",
    url: "https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}",
    refUrl: "https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Reference/MapServer/tile/{z}/{y}/{x}",
    attribution: "&copy; Esri &bull; Sovereign GIS",
    className: "tile-cyber-dark"
  },
  osmDark: {
    name: "🗺️ Detailed Streets (OSM)",
    url: "https://tile.openstreetmap.org/{z}/{x}/{y}.png",
    refUrl: null,
    attribution: "&copy; OpenStreetMap contributors",
    className: "tile-osm-dark"
  },
  satellite: {
    name: "🛰️ Satellite Night Vision",
    url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
    refUrl: "https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Reference/MapServer/tile/{z}/{y}/{x}",
    attribution: "&copy; Esri &bull; High-Res Satellite",
    className: "tile-satellite-dark"
  }
};

export default function SovereignMap({ selectedWard, onSelectWard }) {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const baseTileLayerRef = useRef(null);
  const refTileLayerRef = useRef(null);
  const markersRef = useRef([]);
  const circlesRef = useRef([]);

  const [activeTileKey, setActiveTileKey] = useState("cyberDark");

  useEffect(() => {
    if (!mapContainerRef.current) return;

    // Initialize Map once
    if (!mapInstanceRef.current) {
      const map = L.map(mapContainerRef.current, {
        center: [13.045, 80.235],
        zoom: 11,
        zoomControl: true,
        scrollWheelZoom: true,
        attributionControl: false
      });

      mapInstanceRef.current = map;
    }

    const map = mapInstanceRef.current;
    const tileConfig = TILE_LAYERS[activeTileKey];

    // Remove existing tile layers
    if (baseTileLayerRef.current) map.removeLayer(baseTileLayerRef.current);
    if (refTileLayerRef.current) map.removeLayer(refTileLayerRef.current);

    // Add Base Tile Layer
    const baseLayer = L.tileLayer(tileConfig.url, {
      maxZoom: 19,
      className: tileConfig.className
    }).addTo(map);
    baseTileLayerRef.current = baseLayer;

    // Add Reference Label Layer if available
    if (tileConfig.refUrl) {
      const refLayer = L.tileLayer(tileConfig.refUrl, {
        maxZoom: 19,
        pane: 'overlayPane',
        opacity: 0.95
      }).addTo(map);
      refTileLayerRef.current = refLayer;
    }

    // Clear previous markers & circles
    markersRef.current.forEach(m => map.removeLayer(m));
    circlesRef.current.forEach(c => map.removeLayer(c));
    markersRef.current = [];
    circlesRef.current = [];

    // Render Detailed Wards with Zones & Beacons
    WARDS.forEach(w => {
      const isSelected = selectedWard?.id === w.id;
      const isCrit = w.critical;
      const isSil = w.silent;
      const primaryColor = isCrit ? '#FF3B6E' : (isSil ? '#FFA500' : '#00D4FF');
      const radiusMeters = isCrit ? 1800 : 1300;

      // 1. Spatial Coverage Circle
      const coverageCircle = L.circle([w.lat, w.lon], {
        radius: radiusMeters,
        color: primaryColor,
        weight: isSelected ? 2.5 : 1.2,
        dashArray: isCrit ? '5, 5' : (isSil ? '3, 4' : null),
        fillColor: primaryColor,
        fillOpacity: isSelected ? 0.25 : (isCrit ? 0.18 : 0.1)
      }).addTo(map);

      coverageCircle.on('click', () => onSelectWard(w));
      circlesRef.current.push(coverageCircle);

      // 2. Glowing Beacon Icon
      const customIcon = L.divIcon({
        className: 'sovereign-beacon-icon',
        html: `
          <div style="position: relative; width: 36px; height: 36px; display: flex; align-items: center; justify-content: center; cursor: pointer;">
            ${isCrit ? `
              <div style="position: absolute; width: 100%; height: 100%; border-radius: 50%; background: rgba(255, 59, 110, 0.45); animation: pingBeacon 1.8s cubic-bezier(0, 0, 0.2, 1) infinite;"></div>
            ` : ''}
            <div style="
              width: ${isSelected ? '22px' : '16px'};
              height: ${isSelected ? '22px' : '16px'};
              border-radius: 50%;
              background: ${primaryColor};
              border: 2px solid #FFFFFF;
              box-shadow: 0 0 16px ${primaryColor};
              display: flex;
              align-items: center;
              justify-content: center;
              color: #060913;
              font-size: 9px;
              font-weight: 800;
              transition: all 0.2s ease;
            ">
              ${isCrit ? '!' : ''}
            </div>
          </div>
        `,
        iconSize: [36, 36],
        iconAnchor: [18, 18]
      });

      const marker = L.marker([w.lat, w.lon], { icon: customIcon }).addTo(map);

      // Cyber Popup with Full Details
      const popupHtml = `
        <div style="
          background: rgba(7, 10, 23, 0.96);
          color: #FFFFFF;
          padding: 10px 14px;
          border-radius: 9px;
          border: 1px solid ${primaryColor};
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.8), 0 0 20px ${primaryColor}40;
          font-family: 'Inter', sans-serif;
          min-width: 190px;
        ">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 5px;">
            <span style="font-family: 'JetBrains Mono', monospace; font-size: 11px; color: ${primaryColor}; font-weight: 700;">${w.id}</span>
            <span style="font-size: 10px; padding: 2px 7px; border-radius: 9999px; background: ${primaryColor}25; color: ${primaryColor}; font-weight: 700; border: 1px solid ${primaryColor}60;">
              ${isCrit ? 'HOTSPOT' : (isSil ? 'SILENT ZONE' : 'STABLE AREA')}
            </span>
          </div>
          <div style="font-weight: 800; font-size: 14px; margin-bottom: 3px; color: #FFFFFF;">${w.name}</div>
          <div style="font-size: 11px; color: #CBD5E1; margin-bottom: 6px;">
            Deficit: <strong style="color: ${primaryColor};">${w.deficit}</strong>
          </div>
          <div style="font-size: 10px; color: #94A3B8; font-family: 'JetBrains Mono', monospace; border-top: 1px solid rgba(255,255,255,0.1); padding-top: 5px; display: flex; justify-content: space-between;">
            <span>Population: ${w.population.toLocaleString()}</span>
            <span>Intensity: <strong style="color: ${primaryColor};">${w.intensity}</strong></span>
          </div>
        </div>
      `;

      marker.bindPopup(popupHtml, {
        className: 'cyber-leaflet-popup',
        closeButton: false,
        offset: [0, -10]
      });

      marker.on('click', () => {
        onSelectWard(w);
      });

      markersRef.current.push(marker);
    });

    // Smooth Fly-to on Ward Focus
    if (selectedWard && map) {
      map.flyTo([selectedWard.lat, selectedWard.lon], 12.5, {
        animate: true,
        duration: 0.75
      });
    }

  }, [selectedWard, onSelectWard, activeTileKey]);

  const resetView = () => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.flyTo([13.045, 80.235], 11, { duration: 0.75 });
    }
  };

  return (
    <div style={{ position: 'relative', width: '100%', borderRadius: '10px', overflow: 'hidden', border: '1px solid rgba(0, 212, 255, 0.3)' }}>
      {/* Dynamic CSS for Jet-Black Cyber Mapping */}
      <style>{`
        @keyframes pingBeacon {
          0% { transform: scale(0.6); opacity: 0.9; }
          100% { transform: scale(2.2); opacity: 0; }
        }

        /* 1. Esri Dark Gray Base Inversion to Deep Jet Black */
        .tile-cyber-dark {
          filter: brightness(0.7) contrast(1.4) invert(0.08) !important;
          background: #04060E !important;
        }

        /* 2. OpenStreetMap Inverted to Cyber Black */
        .tile-osm-dark {
          filter: brightness(0.65) invert(1) contrast(2.8) hue-rotate(200deg) saturate(0.25) brightness(0.75) !important;
          background: #04060E !important;
        }

        /* 3. Satellite Night Vision */
        .tile-satellite-dark {
          filter: brightness(0.6) contrast(1.3) saturate(0.8) !important;
          background: #04060E !important;
        }

        .leaflet-container {
          background: #04060E !important;
          font-family: inherit;
        }

        .cyber-leaflet-popup .leaflet-popup-content-wrapper {
          background: transparent !important;
          box-shadow: none !important;
          padding: 0 !important;
        }

        .cyber-leaflet-popup .leaflet-popup-tip {
          background: #070A17 !important;
        }
      `}</style>

      {/* Map Header Overlay with Style Switcher */}
      <div style={{
        position: 'absolute',
        top: '12px',
        left: '12px',
        right: '12px',
        zIndex: 1000,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        background: 'rgba(7, 10, 23, 0.9)',
        backdropFilter: 'blur(12px)',
        padding: '6px 10px',
        borderRadius: '8px',
        border: '1px solid rgba(0, 212, 255, 0.25)'
      }}>
        {/* Layer Switcher Tabs */}
        <div style={{ display: 'flex', gap: '5px' }}>
          {Object.entries(TILE_LAYERS).map(([key, cfg]) => {
            const isSelected = activeTileKey === key;
            return (
              <button
                key={key}
                onClick={() => setActiveTileKey(key)}
                style={{
                  background: isSelected ? 'var(--cyan)' : 'rgba(13, 20, 42, 0.8)',
                  color: isSelected ? '#060913' : '#CBD5E1',
                  border: `1px solid ${isSelected ? 'var(--cyan)' : 'rgba(255,255,255,0.1)'}`,
                  borderRadius: '5px',
                  padding: '0.22rem 0.55rem',
                  fontSize: '0.68rem',
                  fontWeight: isSelected ? 700 : 500,
                  cursor: 'pointer',
                  transition: 'all 0.15s ease'
                }}
              >
                {cfg.name}
              </button>
            );
          })}
        </div>

        <button
          onClick={resetView}
          className="btn"
          style={{
            background: 'rgba(0, 212, 255, 0.15)',
            border: '1px solid var(--cyan)',
            color: '#FFFFFF',
            fontSize: '0.72rem',
            padding: '0.25rem 0.65rem'
          }}
        >
          🎯 Reset Focus
        </button>
      </div>

      {/* Leaflet Map Canvas */}
      <div 
        ref={mapContainerRef} 
        style={{ 
          height: '360px', 
          width: '100%', 
          background: '#04060E'
        }} 
      />

      {/* Ward Quick Focus Strip at Bottom */}
      <div style={{
        position: 'absolute',
        bottom: '10px',
        left: '10px',
        right: '10px',
        zIndex: 1000,
        display: 'flex',
        gap: '5px',
        overflowX: 'auto',
        background: 'rgba(7, 10, 23, 0.9)',
        backdropFilter: 'blur(12px)',
        padding: '6px 8px',
        borderRadius: '8px',
        border: '1px solid rgba(0, 212, 255, 0.25)'
      }}>
        {WARDS.map((w) => {
          const isAct = selectedWard?.id === w.id;
          const color = w.critical ? 'var(--neon-red)' : (w.silent ? 'var(--amber)' : 'var(--cyan)');
          return (
            <button
              key={w.id}
              onClick={() => onSelectWard(w)}
              style={{
                background: isAct ? color : 'rgba(13, 20, 42, 0.8)',
                color: isAct ? '#060913' : '#CBD5E1',
                border: `1px solid ${isAct ? color : 'rgba(255,255,255,0.1)'}`,
                borderRadius: '5px',
                padding: '0.24rem 0.55rem',
                fontSize: '0.68rem',
                fontWeight: isAct ? 700 : 500,
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                transition: 'all 0.15s ease'
              }}
            >
              {w.name} {w.critical ? '🔥' : (w.silent ? '⚠️' : '')}
            </button>
          );
        })}
      </div>
    </div>
  );
}
