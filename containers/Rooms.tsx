import { useRef } from "react";
import EVENTS from "../config/events";
import { useSockets } from "../context/socket.context";

function RoomsContainer() {
  const { socket, roomId, rooms } = useSockets();
  const newRoomRef = useRef(null);

  function handleCreateRoom() {
    //get room name
    const roomName = newRoomRef.current.value || "";

    if (!String(roomName.trim())) return;
    //emit room created event
    socket.emit(EVENTS.CLIENT.CREATE_ROOM, { roomName });

    //set room name input back to empty string
    newRoomRef.current.value = "";
  }

  function handleJoinRoom(key) {
    if (key === roomId) {
      return;
    }

    socket.emit(EVENTS.CLIENT.JOIN_ROOM, key);
  }

  return (
    <nav>
      <div>
        <input ref={newRoomRef} placeholder="Room name" />
        <button onClick={handleCreateRoom}>create room</button>
      </div>
      {Object.keys(rooms).map((key) => {
        return (
          <button
            disabled={key === roomId}
            key={key}
            onClick={() => handleJoinRoom(key)}
            title={`Join ${rooms[key].name}`}>
            {rooms[key].name}
          </button>
        );
      })}
    </nav>
  );
}

export default RoomsContainer;
