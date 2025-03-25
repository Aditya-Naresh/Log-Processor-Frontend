import { useEffect, useState, useRef } from "react";

interface WebSocketMessage {
  [key: string]: any; // Define this based on your actual WebSocket message structure
}

const useWebSocket = (url: string, reconnectInterval: number = 5000) => {
  const [messages, setMessages] = useState<WebSocketMessage[]>([]);
  const socketRef = useRef<WebSocket | null>(null);
  const reconnectRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const connectWebSocket = () => {
      console.log("Connecting to WebSocket...");
      socketRef.current = new WebSocket(url);

      socketRef.current.onopen = () => {
        console.log("WebSocket connected");
        if (reconnectRef.current) {
          clearTimeout(reconnectRef.current);
          reconnectRef.current = null;
        }
      };

      socketRef.current.onmessage = (event: MessageEvent) => {
        try {
          const data: WebSocketMessage = JSON.parse(event.data);
          setMessages((prev) => [...prev, data]);
        } catch (error) {
          console.error("Error parsing WebSocket message:", error);
        }
      };

      socketRef.current.onclose = () => {
        console.log("WebSocket disconnected. Reconnecting...");
        reconnectRef.current = setTimeout(connectWebSocket, reconnectInterval);
      };

      socketRef.current.onerror = (error) => {
        console.error("WebSocket error:", error);
        socketRef.current?.close();
      };
    };

    connectWebSocket();

    return () => {
      if (socketRef.current) socketRef.current.close();
      if (reconnectRef.current) clearTimeout(reconnectRef.current);
    };
  }, [url, reconnectInterval]);

  return { messages };
};

export default useWebSocket;

