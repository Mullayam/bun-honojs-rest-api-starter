import path from 'path';
import winston from 'winston'
import { bold, greenBright, magenta, red, white, yellow } from "colorette"
import { LoggingLevel, LoggingOptions, } from '../interfaces/logs.interface';
import { createLogger, format, transports } from 'winston'
import moment from 'moment';
const { combine, timestamp, label, printf, colorize } = format;
const LogsPath = path.join(process.cwd(), 'logs')



class Logger {
    public static appName = 'Hono-App'
    constructor() {
        console.log("\u001b[2J\u001b[0;0H");
        console.log(greenBright(`[${Logger.appName}] ${yellow(process.pid)} - ${white(moment().format('DD/MM/YYYY hh:mm:ss A'))}, [INFO] ${Logger.name} Service Iniatialized`))
    }
    setName(name: string) {
        return Logger.appName = name
    }
    /**
     * Generates the LoggingOptions object.
     *
     * @return {LoggingOptions} The LoggingOptions object with the specified configuration.
     */
    private LoggingOptions(): LoggingOptions {
        return {
            file: {
                level: "info",
                filename: `${LogsPath}/apps.log`,
                handleExceptions: false,
                json: false,
                maxsize: 5242880, // 5MB
                maxFiles: 5,
                colorize: false,
                // format: winston.format.json(),
            },
            console: {
                level: "debug",
                handleExceptions: true,
                json: false,
                colorize: true,
                format: winston.format.simple(),
            },
        }
    }
    /**
     * Creates a logger with the specified logging level.
     *
     * @param {LoggingLevel} [level="info"] - The logging level to use. Defaults to "info".
     * @return {Logger} - The created logger.
     */
    private HandleCreateLogger(level: LoggingLevel = "info") {
        return createLogger({
            format: combine(
                // colorize({ all: true, level: true, message: true, colors: Colors }),
                timestamp({ format: "YYYY-MM-DD HH:mm:ss a" }),
                printf((info) => `[${Logger.name}] ${info.level.toUpperCase()}, ${info.timestamp} - ${info.message}`)
            ),
            levels: winston.config.syslog.levels,
            transports: [
                new transports.File({
                    filename: `${LogsPath}/error.log`,
                    level: level,
                }),
                new transports.File(this.LoggingOptions().file),
                new transports.Console(this.LoggingOptions().console),
            ],
            rejectionHandlers: [
                new transports.File({ filename: `${LogsPath}/rejection.log` }),
            ],
            exceptionHandlers: [
                new transports.File({ filename: `${LogsPath}/error.log` }),
            ],
            exitOnError: false,
        });
    }
    /**
     * Logs an info message.
     *
     * @param {string} message - The message to log.
      
     */
    info(message: string) {
        return this.HandleCreateLogger("info").info(message)
    }
    /**
     * A static method that handles an error message.
     *
     * @param {string} message - The error message to handle.
      
     */
    error(message: string) {
        return this.HandleCreateLogger("error").error(message)
    }
    /**
     * Logs a message to the console.
     *
     * @param {string} text - The message to be logged.
     */
    log(text: string) {
        console.log(yellow(`----------- ${text} -------------`))
    };
    dev(text: string, type: LoggingLevel = "info") {

        if (type === "info") {
            return console.log(greenBright(`[${Logger.appName}] ${yellow(process.pid)} - ${white(moment().format('DD/MM/YYYY hh:mm:ss A'))}, [${(type).toUpperCase()}] ${text}`))
        }
        if (type === "error") {
            return console.log(red(`[${Logger.appName}] ${process.pid} - ${white(moment().format('DD/MM/YYYY hh:mm:ss A'))}, [${(type).toUpperCase()}] ${text} console.log`))
        }
        if (type === "debug") {
            console.log(bold(`[${Logger.appName}] ${process.pid} - ${white(moment().format('DD/MM/YYYY hh:mm:ss A'))}, [${(type).toUpperCase()}] ${text} console.log`))
            return process.exit(1)
        }
        if (type === "alert") {
            console.log(magenta(`[${Logger.appName}] ${yellow(process.pid)} - ${white(moment().format('DD/MM/YYYY hh:mm:ss A'))}, [${(type).toUpperCase()}] ${text}console.log`))
        }
        if (type === "notice") {
            return console.log(yellow(`[${Logger.appName}] ${process.pid} - ${white(moment().format('DD/MM/YYYY hh:mm:ss A'))}, [${(type).toUpperCase()}] ${text}console.log`))
        }
    };
    /**
     * Prints the given text in the console with a formatted alert message.
     *
     * @param {string} text - The text to be displayed in the alert message.
     */
    alert(text: string) {
        console.log(magenta(`----------- ${text} -------------`))
    };



}

const Logging = new Logger();
export { Logging }