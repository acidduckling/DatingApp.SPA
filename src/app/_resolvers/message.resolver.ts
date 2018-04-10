import { Resolve, Router, ActivatedRouteSnapshot } from "@angular/router";
import { User } from "../_models/User";
import { Injectable } from "@angular/core";
import { UserService } from "../_services/user.service";
import { AlertifyService } from "../_services/alertify.service";
import { Observable } from "rxjs/Observable";
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import { Message } from "../_models/message";
import { AuthService } from "../_services/auth.service";

@Injectable()
export class MessagesResolver implements Resolve<Message[]> {

    pageSize = 5;
    pageNumber = 1;
    messageContainer = 'Unread';
    
    constructor(private userService: UserService,
        private authService: AuthService,
        private router: Router, 
        private alertify: AlertifyService) {}
    
    resolve(route: ActivatedRouteSnapshot): Observable<Message[]>{
        return this.userService.getMessages(this.authService.decodedToken.nameid, 
            this.pageNumber, 
            this.pageSize,
            this.messageContainer).catch(error => {
                this.alertify.error('Problem retrieving data');
                this.router.navigate(['/home']);
                return Observable.of(null);
            });
    }
}