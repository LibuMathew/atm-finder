import { IMessageType } from './data';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class DataService {

    private messageSource = new BehaviorSubject({ type: '', data: '' });
    currentMessage = this.messageSource.asObservable();

    constructor() { }

    changeMessage(message: IMessageType) {
        this.messageSource.next(message);
    }

}
