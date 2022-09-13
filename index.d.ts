export = Logger;

type types = "DEBUG" | "SUCCESS" | "INFO" | "WARN" | "ERROR" | "FATAL";
declare class Logger {
    constructor(settings: { production: boolean; });
    production: boolean;
    log(message: string | undefined | null, type: types): void;
}
