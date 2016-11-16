import { Injectable } from '@angular/core';

@Injectable()
export class Configuration {
    public Server: string = "https://yugma-146007.appspot.com";
    public ApiUrl: string = "api/";
    public ServerWithApiUrl = this.Server + this.ApiUrl;
}