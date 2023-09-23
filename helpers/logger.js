const winston = require('winston');

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
            format: winston.format.combine(
                winston.format.simple(),
                winston.format.timestamp(),
            ) 
        }),
    ]
});



module.exports = logger;