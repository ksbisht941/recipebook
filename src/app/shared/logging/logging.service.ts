import { Injectable } from "@angular/core";

// @Injectable({providedIn: 'root'})
export class LoggingService {
    lastLog!: string;

    printLog(message: string) {
        console.log(this.lastLog);
        console.log(message);
        
        this.lastLog = message;
    }

}