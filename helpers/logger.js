const winston = require('winston');
require('winston-mongodb');
const config = require('config');

let logger;


if (process.env.NODE_ENV !== 'test') {

    logger = winston.createLogger({
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
            new winston.transports.Console({
                handleExceptions: true,
                handleRejections: true,
                format: winston.format.combine(
                    winston.format.colorize(),
                    winston.format.simple(),
                    winston.format.timestamp(),
                )
            }),
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
        db: config.get('connection'),
        handleExceptions: true,
        handleRejections: true,
        leaveConnectionOpen: false,
    };
    
    logger.add(new winston.transports.MongoDB(transportOptions));

} else {
    
    logger = winston.createLogger({
        level: 'error', // Or another level like 'warn', or even 'silent' to turn off all logs.
        format: winston.format.json(),
        transports: [
            new winston.transports.Console({ format: winston.format.simple() })
        ]
    });

}



module.exports = logger;