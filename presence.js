// KatnissOS — Global Discord Presence Engine
// User ID: 1454841600974000159

(function () {
  const WS_URL = "wss://api.lanyard.rest/socket";
  const USER_ID = "1454841600974000159";

  // Lavender‑Void palette
  const STATUS_COLORS = {
    online: "#a855f7",      // lavender
    idle: "#38bdf8",        // soft blue
    dnd: "#7c3aed",         // deep violet
    offline: "#475569"      // muted slate‑violet
  };

  // Public API container
  const listeners = [];

  window.KatnissPresence = {
    onUpdate(callback) {
      listeners.push(callback);
    },
    getColorForStatus(status) {
      return STATUS_COLORS[status] || STATUS_COLORS.offline;
    }
  };

  // WebSocket connection
  let ws;

  function connect() {
    ws = new WebSocket(WS_URL);

    ws.onopen = () => {
      ws.send(
        JSON.stringify({
          op: 2,
          d: {
            subscribe_to_id: USER_ID
          }
        })
      );
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);

      if (data.t === "INIT_STATE" || data
