import winston from "winston";
export enum ColorCode {
    black = '\u001b[30m',
    red = '\u001b[31m',
    green = '\u001b[32m',
    orange = '\u001b[33m',
    blue = '\u001b[34m',
    purple = '\u001b[35m',
    cyan = '\u001b[36m',
    white = '\u001b[37m',
    reset = '\u001b[39m'
};
export type LoggingLevel = "emerg" | "alert" | "crit" | "error" | "notice" | "info" | "debug"
export type StorageType = "Redis" | "Memory" | "Disk"
export type LoggingOptions = {
    file: {
        level: string;
        filename: string;
        handleExceptions: boolean;
        json: boolean;
        maxsize: number;
        maxFiles: number;
        colorize: boolean;
    };
    console: {
        level: string;
        handleExceptions: boolean;
        json: boolean;
        colorize: boolean;
        format: winston.Logform.Format;
    };
}