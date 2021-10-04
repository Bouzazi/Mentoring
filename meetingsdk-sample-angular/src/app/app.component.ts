import { Component, OnInit, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DOCUMENT } from '@angular/common';

import { ZoomMtg } from '@zoomus/websdk';

ZoomMtg.preLoadWasm();
ZoomMtg.prepareWebSDK();
// loads language files, also passes any error messages to the ui
ZoomMtg.i18n.load('en-US');
ZoomMtg.i18n.reload('en-US');

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  signatureEndpoint = 'http://localhost:3000';
  apiKey = '_4T6qvC7QdKgOurpoF7pzA';
  meetingNumber = '91988076920';
  role = 0;
  leaveUrl = 'http://localhost:4200';
  userName = 'Amine Bouza';
  userEmail = '';
  passWord = '301006';
  registrantToken = '';

  /**
   

Join Zoom Meeting
https://zoom.us/j/91988076920?pwd=aytRYTI0djQ2Z08rQ0NFSExYSEhGUT09

Meeting ID: 919 8807 6920
Passcode: 301006
One tap mobile
+16699006833,,91988076920#,,,,*301006# US (San Jose)
+19292056099,,91988076920#,,,,*301006# US (New York)

Dial by your location
        +1 669 900 6833 US (San Jose)
        +1 929 205 6099 US (New York)
        +1 253 215 8782 US (Tacoma)
        +1 301 715 8592 US (Washington DC)
        +1 312 626 6799 US (Chicago)
        +1 346 248 7799 US (Houston)
Meeting ID: 919 8807 6920
Passcode: 301006
Find your local number: https://zoom.us/u/abAaVZ04hs





   */

  constructor(public httpClient: HttpClient, @Inject(DOCUMENT) document) { }

  ngOnInit() { }

  getSignature() {
    this.httpClient
      .post(this.signatureEndpoint, {
        meetingNumber: this.meetingNumber,
        role: this.role,
      })
      .toPromise()
      .then((data: any) => {
        if (data.signature) {
          console.log(data.signature);
          this.startMeeting(data.signature);
        } else {
          console.log(data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  startMeeting(signature) {
    document.getElementById('zmmtg-root').style.display = 'block';

    ZoomMtg.init({
      leaveUrl: this.leaveUrl,
      success: (success) => {
        console.log(success);
        ZoomMtg.join({
          signature: signature,
          meetingNumber: this.meetingNumber,
          userName: this.userName,
          apiKey: this.apiKey,
          userEmail: this.userEmail,
          passWord: this.passWord,
          tk: this.registrantToken,
          success: (success) => {
            console.log(success);
          },
          error: (error) => {
            console.log(error);
          },
        });
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
