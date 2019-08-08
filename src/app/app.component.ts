import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from './user/user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {

  private activatedSubscription: Subscription
  userActivated = false;

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.activatedSubscription = this.userService.activatedEmitter.subscribe(
      (didActivate: boolean) => {
        this.userActivated = didActivate;
      }
    )
  }

  ngOnDestroy(): void {
    //throw new Error("Method not implemented.");
    this.activatedSubscription.unsubscribe();
  }
}
