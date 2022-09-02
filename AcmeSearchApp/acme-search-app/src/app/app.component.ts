import { Component } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  template: `
    <h1>Welcome to Acme Search</h1>
    <h3>Type to search</h3>
    <br>
   <input #item type="text" name="item"><br><br>
    <button (click)="look(item.value)">Submit</button>
<ul>
      <li *ngFor="let pr of dropboxArr"> 
        {{pr.id}}
        {{pr.path}}
        {{pr.title}}
        {{pr.shared_with}}
        {{pr.matching_terms}}
        {{pr.created}}
      </li>
      <li *ngFor="let pr of contactsArr"> 
        {{pr.id}}
        {{pr.name}}
        {{pr.company}}
        {{pr.emails}}
        {{pr.phones}}
        {{pr.matching_terms}}
        {{pr.last_contact}}
      </li>
      <li *ngFor="let pr of calendarArr"> 
        {{pr.id}}
        {{pr.title}}
        {{pr.invitees}}
        {{pr.matching_terms}}
        {{pr.date}}
      </li>
      <li *ngFor="let pr of tweetArr"> 
        {{pr.user}}
        {{pr.message}}
        {{pr.timestamp}}
        {{pr.matching_terms}}
      </li>
      <li *ngFor="let pr of slackArr"> 
        {{pr.id}}
        {{pr.channel}}
        {{pr.author}}
        {{pr.message}}
        {{pr.timestamp}}
        {{pr.matching_terms}}
      </li>
  </ul>
  `,
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  name: string = '';
  title = 'Neeva';
  dropbox: any;
  contacts: any;
  calendar: any;
  tweet: any;
  slack: any;
  dropboxArr:Array<any> = [];
  contactsArr:Array<any> = [];
  calendarArr:Array<any> = [];
  tweetArr:Array<any> = [];
  slackArr:Array<any> = [];
  
  constructor(private httpClient: HttpClient){}
  ngOnInit(){
    this.httpClient.get("assets/dropbox.json").subscribe(data =>{
      this.dropbox = data["dropbox"];
    })
    this.httpClient.get("assets/contacts.json").subscribe(data =>{
      this.contacts = data["contacts"];
    })
    this.httpClient.get("assets/calendar.json").subscribe(data =>{
      this.calendar = data["calendar"];
    })
    this.httpClient.get("assets/tweet.json").subscribe(data =>{
      this.tweet = data["tweet"];
    })
    this.httpClient.get("assets/slack.json").subscribe(data =>{
      this.slack = data["slack"];
    })
  }

  public look(item){
    this.dropboxArr.length = 0;
    this.tweetArr.length = 0;
    this.slackArr.length = 0;
    this.calendarArr.length = 0;
    this.contactsArr.length = 0;
    for(var val of this.dropbox){
      for(var result of val.matching_terms){
        if(item === result){
          console.log(val.title);
          this.dropboxArr.push(val);
        }
      }
    }
    for(var val of this.contacts){
      for(var result of val.matching_terms){
        if(item === result){
          console.log(val.title);
          this.contactsArr.push(val);
        }
      }
    }
    for(var val of this.calendar){
      for(var result of val.matching_terms){
        if(item === result){
          console.log(val.title);
          this.calendarArr.push(val);
        }
      }
    }
    for(var val of this.slack){
      for(var result of val.matching_terms){
        if(item === result){
          console.log(val.title);
          this.slackArr.push(val);
        }
      }
    }
    for(var val of this.tweet){
      for(var result of val.matching_terms){
        if(item === result){
          console.log(val.title);
          this.tweetArr.push(val);
        }
      }
    }
  }
}
