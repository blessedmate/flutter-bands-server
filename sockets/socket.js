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

  // Sends the list of bands to a clients
  client.emit("active-bands", bands.getBands());

  client.on("disconnect", () => {
    console.log("Client disconnected");
  });

  // Listens to the action: Vote for a band
  client.on("vote-band", (data) => {
    bands.voteBand(data.id);
    io.emit("active-bands", bands.getBands());
  });

  // Listens to the action: Add a new band
  client.on("add-band", (data) => {
    bands.addBand(new Band(data.name));
    io.emit("active-bands", bands.getBands());
  });

  // Listens to the action: Delete a band
  client.on("delete-band", (data) => {
    bands.deleteBand(data.id);
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
