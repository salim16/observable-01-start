import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { UserService } from './user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  id: number;

  constructor(private route: ActivatedRoute, private userService: UserService) {
  }

  // When Routing is used, component is loaded only when there is change in the route. 
  // or change in URL for that matter. Corresponding component is loaded when URL changes.
  // if the URL has some dynamic parameter, or path param like in this case, then user component won't get 
  // loaded again and again.

  ngOnInit() {
    console.log("User Component is loaded ... ");
    this.route.params.subscribe((params: Params) => {
      this.id = +params.id;
    });
  }

  onActivate() {
    this.userService.activatedEmitter.next(true);
  }
}
