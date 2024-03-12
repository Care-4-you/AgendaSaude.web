import { FunctionComponent, useState, useEffect } from 'react';

export const FlightMap: FunctionComponent<FlightMapProps> = (props) => {
  const [Client, setClient] = useState<FunctionComponent<FlightMapProps>>();

  useEffect(() => {
      (async () => {
          if (typeof global.window !== "undefined") {
              const newClient = (await import('./FlightMapClient')).FlightMapClient
              setClient(() => newClient);
          }
      })();
  }, [])

  if (typeof global.window === "undefined" || !Client) {
      return null;
  }
  
  return Client ? <Client {...props} /> : null;
}