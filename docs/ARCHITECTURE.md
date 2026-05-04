# System Architecture

## Overview
The Smart City IoT Intelligence Dashboard is built on a modern full-stack architecture designed for real-time data ingestion, historical storage, and low-latency visualization.

## Component Diagram
```text
[External APIs] -> [Node.js Backend] -> [MongoDB]
                       |
                       v
                [Socket.io Server]
                       |
                       v
                [React Frontend] -> [Mapbox / Recharts]
```

## Data Flow
1. **Ingestion Layer:** The Node.js server runs a background process (every 10 seconds) that fetches metrics from OpenWeatherMap (Weather/AQI) and TomTom (Traffic) APIs.
2. **Storage Layer:** Fetched data is normalized and persisted in MongoDB Atlas, allowing for historical trend analysis.
3. **Real-time Layer:** Upon successful ingestion, the server broadcasts a `city_update` event via WebSockets (Socket.io). If thresholds are crossed, an `alert_notification` is emitted.
4. **Presentation Layer:** The React frontend maintains a live state of all cities. It uses `Framer Motion` for transitions, `Recharts` for historical trends, and `Mapbox` for geospatial visualization.

## Technical Choices
- **Node.js/Express:** Chosen for non-blocking I/O, ideal for handling frequent API requests and WebSocket connections.
- **MongoDB:** Flexible schema allows for evolving IoT data structures.
- **Socket.io:** Provides robust, bi-directional real-time communication.
- **Vite/React:** Ensures a blazing-fast development experience and optimized production builds.
- **Tailwind CSS:** Enables rapid development of the "Apple-level" minimal UI.
