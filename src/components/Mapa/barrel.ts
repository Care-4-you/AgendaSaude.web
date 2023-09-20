import { FunctionComponent, useState, useEffect } from 'react';

// this is a "barrel file" that prevents the ClientMap from ever getting loaded in the server.
export const Map: FunctionComponent = () => {
  const [Client, setClient] = useState<FunctionComponent>();

  useEffect(() => {
      (async () => {
          if (typeof global.window !== "undefined") {
              const newClient = (await import('./index')).default
              setClient(() => newClient);
          }
      })();
  }, [])

  if (typeof global.window === "undefined" || !Client) {
      return null;
  }
  
  return Client ? <Client {...props} /> : null;
}