import React, { useEffect, useState } from "react";
import { LiveKitRoom, VideoConference } from "@livekit/components-react";

const RoomPage = () => {
  const room = "quickstart-room";
  const user = "quickstart-user";

  const [token, setToken] = useState();

  useEffect(() => {
    (async () => {
      const resp = await fetch(
        `/api/get_lk_token?room=${room}&username=${user}`
      );
      const data = await resp.json();
      setToken(data.token);
    })();
  }, []);

  if (!token) {
    return <div>Getting token...</div>;
  }

  return (
    <LiveKitRoom
      serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_URL}
      token={token}
      connect={true}
      video={true}
      audio={true}
    >
      <VideoConference />
    </LiveKitRoom>
  );
};

export default RoomPage;
