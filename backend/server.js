"use strict"

const gameServer = require("./app");
const { PORT } = require("./config");

gameServer.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`);
});