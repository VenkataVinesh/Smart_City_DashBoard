# Module Breakdown

## Backend (Server)

### Data Fetcher Service
- **Purpose:** Centralized logic for 3rd party API integration.
- **Logic:** Aggregates data from multiple sources and maps them to a unified `CityData` schema.
- **Fault Tolerance:** Implements fallbacks and graceful error handling for API failures.

### Socket.io Handler
- **Purpose:** Manages live connections with frontend clients.
- **Features:** Broadcasts global updates and targeted alerts.

### REST API
- **Purpose:** Provides initial state and historical data access.
- **Endpoints:** `/api/cities` (Latest metrics for all cities).

## Frontend (Client)

### MapModule
- **Technology:** Mapbox GL JS + React Map GL.
- **Function:** Renders a 3D dark-themed global map with interactive markers for city selection.

### TrendsChart
- **Technology:** Recharts.
- **Function:** Uses AreaCharts with custom gradients to visualize temporal changes in AQI, Traffic, and Temperature.

### AlertsPanel
- **Function:** A real-time notification feed that categorizes and displays system-detected anomalies.

### ThemeContext
- **Function:** Manages Dark/Light mode state globally, persisted via CSS variables.
