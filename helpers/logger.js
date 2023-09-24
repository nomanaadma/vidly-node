const winston = require('winston');
require('winston-mongodb');

const logger = winston.createLogger({
    format: winston.format.combine(
        winston.format.timestamp({
            format: 'YYYY-MM-DD HH:mm:ss'
        }),
        winston.format.errors({ stack: true }),
        winston.format.splat(),
        winston.format.json()
    ),
    defaultMeta: { service: 'user-service' },
    transports: [
        new winston.transports.File({
            filename: 'logfile.log', 
            handleExceptions: true,
            handleRejections: true,
            format: winston.format.combine(
                winston.format.simple(),
                winston.format.timestamp(),
            ) 
        }),
    ]
});

const transportOptions = {
    db: process.env.connection,
    handleExceptions: true,
    handleRejections: true,
};

logger.add(new winston.transports.MongoDB(transportOptions));

module.exports = logger;