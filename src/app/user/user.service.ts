import { Injectable, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({providedIn: 'root'})
export class UserService {

    // activatedEmitter = new EventEmitter<boolean>();
    // same approach using Subjects
    activatedEmitter = new Subject<boolean>();


    // Subjects are also Observables, but they are kind of Active Observables
    // It is more preferred over EventEmitters, because they are kind of Observables,
    // and we can use Operators on them at the time of subscribing them. 

    // And Just as in case of Custom Observables, 
    // we should also unsubscribe subjects explicitly when we dont need them

    // Also we don't use Subjecs instead of EventEmitter in case of @Output()
    // there use of EventEmitter is encouraged!

}