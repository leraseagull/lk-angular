import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";


import { User } from "../../interfaces";
import { environment } from "src/environments/environment";


@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(private http: HttpClient) {

    }

    authUser(user: any) {
        let UserArray = [];
        if (localStorage.getItem('Users')) {
            UserArray = JSON.parse(localStorage.getItem('Users'));
        }
        return UserArray.find((p: { email: any; password: any; }) => p.email === user.email && p.password === user.password);
    }
}
