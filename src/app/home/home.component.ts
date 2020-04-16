import { Component, OnInit, OnDestroy } from '@angular/core';
import { interval, Subscription, Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {


  // There are some observables which continuosly keep on emitting, even if you no more using that
  // component, and if you navigate somewhere else, and again come back on the same component,
  // one more instance of subscription would start, and one more if you 
  // again come back to this component, thus it will make the App slower and slower.
  // To avoid this you need to explicitly unsubscribe from the subscription 
  // when the component is destroyed. Now in case of built in Observables like params, the 
  // unsubscription part is taken care by Angular, therefore we need not/should not take care
  // of such unsubscription.
  // We only unsubscribe in custom observables, and some subscriptions which angular 
  // does not unsubscribe itself, need to check that one
  // Also there are some observables like HTTP observable, which only emits once, 
  // here there is no need to unsubscribe.


  // Also whenever an observable throws an error, it dies, it ends, and does not emit further.

  firstObsSubscription: Subscription;


  constructor() { }

  // here we are creating observable and then subscribing to it both in ngOnInit method
  ngOnInit() {
    console.log("home component was loaded ... ");
    // this.firstObsSubscription = interval(1000).subscribe( count => {
    //   console.log(count);
    // });

    const customIntervalObservable = Observable.create(observer => {
      let count = 0;
      setInterval(() => {
        observer.next(count++);
        if(count === 10) {
          observer.complete();
        }
        if(count > 3) {
          observer.error(new Error('Count is greater than 3'));
        }
      }, 3000);
    })



    // When an error dies/end due to some "error", than it is different from observable completion.
    // In that case completion method will not execute. and the observable is not completed as such.
    // So Error and Completion are two different things

    // So here the manipulation will be of data(observable) would first be done by filter operator,
    // if the data returned is true than only it passes to map filter and then to subscription
    // below filter is returning false so it will not pass to filter neither to subscribe

    // this.firstObsSubscription = customIntervalObservable.pipe(filter(data => {
    //   return false;
    // }) ,map((data: number) => {
    //   return 'Round: ' + (data + 1);
    // })).subscribe(data => {
    //   console.log(data);
    // }, error => {
    //   console.log(error);
    //   console.log('Error, executes when error occurs, takes error as a parameter')
    //   alert(error.message);
    // }, () => {
    //   console.log('Completed, executes when observable completes,' 
    //   + 'good for clean up work, takes no parameters')
    // });

    // with pipe method we can use one or more operators, as below we 
    // used more than one operators which is filter and map
    this.firstObsSubscription = customIntervalObservable.pipe(filter(data => {
      return data > 0;
    }), map((data: number) => {
      return 'Round: ' + (data + 1);
    })).subscribe(data => {
      console.log(data);
    }, error => {
      console.log(error);
      console.log('Error, executes when error occurs, takes error as a parameter')
      alert(error.message);
    }, () => {
      console.log('Completed, executes when observable completes, good for clean up work,'
      + 'takes no parameters')
    });

  }

  ngOnDestroy(): void {
    console.log("observable destroyed!");
    this.firstObsSubscription.unsubscribe();
  }

}
