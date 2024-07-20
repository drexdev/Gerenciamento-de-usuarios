export class InternalError extends Error {
    statusCode: number;
    messages: string | string[];

    constructor(statusCode: number, messages: string | string[]) {
        super();
        this.statusCode = statusCode || 500;
        this.messages = messages || "Internal server error";
    }
}
