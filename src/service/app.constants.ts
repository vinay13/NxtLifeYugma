import { Injectable } from '@angular/core';
import { Headers } from '@angular/http';

@Injectable()
export class Configuration {

  public headers = new Headers({
    'Content-Type' : 'application/json',
    'Authorization' : 'Bearer ' + localStorage.getItem("access_token")
  });

  header() {
    return this.headers;
  }

  public Server: string = "https://yugma-146007.appspot.com";
  public Complaint: string = this.Server + "/parent/" + localStorage.getItem("id") + "/complaint";

}