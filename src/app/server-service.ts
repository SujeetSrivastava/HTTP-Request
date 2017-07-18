import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ServerService{
    constructor (private http: Http) {}

    storeService(servers: any[]){
        const headers = new Headers({'content-type': 'application/json'})
        /*return this.http.post('https://mytest-ng-project.firebaseio.com/data.json', 
        servers, 
        {'headers': headers});*/
        return this.http.put('https://mytest-ng-project.firebaseio.com/data.json', 
        servers, 
        {'headers': headers});
    }

    getServers(){
        return this.http.get('https://mytest-ng-project.firebaseio.com/data.json')
        .map(
            (response: Response) => {
                const data = response.json();
                for (const server of data){
                    server.name = 'FETCHED_'+ server.name;
                }
                return data;
            }
        )
        .catch(
            (error: Response) => {
                return Observable.throw("Somthing wrong...");
            }
        );
    }
    
    getAppName(){
        return this.http.get('https://mytest-ng-project.firebaseio.com/appName.json')
        .map(
            (response: Response) => {
                return response.json();
            }
        );
    }
}