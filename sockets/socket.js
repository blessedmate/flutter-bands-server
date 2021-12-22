const { io } = require("../index");
const Band = require("../models/band");
const Bands = require("../models/bands");

const bands = new Bands();

bands.addBand(new Band("Avenged"));
bands.addBand(new Band("BFMV"));
bands.addBand(new Band("Metallica"));
bands.addBand(new Band("Rise Against"));

// Socket messaging
io.on("connection", (client) => {
  console.log("Client connected");

  client.emit("active-bands", bands.getBands());

  client.on("disconnect", () => {
    console.log("Client disconnected");
  });

  client.on("vote-band", (payload) => {
    bands.voteBand(payload.id);
    io.emit("active-bands", bands.getBands());
  });

  // // Receives message from client
  // client.on("message", (payload) => {
  //   console.log("message!!!", payload);

  //   // Server emits message to all connected clients
  //   io.emit("message", { admin: "New message" });
  // });

  // client.on("emit-message", (payload) => {
  //   // Broadcast is used to send message to all clients except emitter
  //   client.broadcast.emit("new-message", payload);
  // });
});
