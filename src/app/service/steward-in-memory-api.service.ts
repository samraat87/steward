
import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { ParsedRequestUrl, RequestInfo, RequestInfoUtilities, ResponseOptions } from 'angular-in-memory-web-api';
import { getStatusText, STATUS } from 'angular-in-memory-web-api';

@Injectable()
export class StewardInMemoryApiService implements InMemoryDbService {
  createDb() {
    return {};
  }

  // HTTP GET interceptor
  get(reqInfo: RequestInfo) {
    console.log("Get Interceptor");
    return undefined; // let the default GET handle all others
  }

  // HTTP POST interceptor
  post(reqInfo: RequestInfo) {
    console.log("Post Interceptor");
    return this.completeLogin(reqInfo); // let the default GET handle all others
  }


  // HTTP GET interceptor
  put(reqInfo: RequestInfo) {
    console.log("Put Interceptor");
    return undefined; // let the default GET handle all others
  }

   // parseRequestUrl override
  // Do this to manipulate the request URL or the parsed result
  // into something your data store can handle.
  parseRequestUrl(url: string, utils: RequestInfoUtilities): ParsedRequestUrl {
    console.log(`parseRequestUrl override of '${url}'`);
    return utils.parseRequestUrl(url);
  }

    // intercept ResponseOptions from default HTTP method handlers
  // add a response header and report interception to console.log
  responseInterceptor(resOptions: ResponseOptions, reqInfo: RequestInfo) {
    const method = reqInfo.method.toUpperCase();
    const body = JSON.stringify(resOptions);
    console.log(`responseInterceptor: ${method} ${reqInfo.req.url}: \n${body}`);
    return resOptions;
  }


  // HTTP GET interceptor handles requests for villains
  private completeLogin(reqInfo: RequestInfo) {
    return reqInfo.utils.createResponse$(() => {
      console.log('HTTP POST override');
      const options: ResponseOptions = 
        {
          body: { status: 'Success' },
          status: STATUS.OK
        };
      return this.finishOptions(options, reqInfo);
    });
  }

    /////////// helpers ///////////////
  private finishOptions(options: ResponseOptions, {headers, url}: RequestInfo) {
    options.statusText = getStatusText(options.status);
    options.headers = headers;
    options.url = url;
    return options;
  }

}
