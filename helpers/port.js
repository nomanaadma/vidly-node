const MIN_PORT = 3000;
const MAX_PORT = 65535;

function port() {
    return Math.floor(Math.random() * (MAX_PORT - MIN_PORT + 1)) + MIN_PORT;
}

module.exports = port;



