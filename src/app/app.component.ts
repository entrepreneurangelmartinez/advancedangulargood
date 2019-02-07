import { Component, OnInit } from '@angular/core';
import  {GitSearchService} from './git-search.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'app is functional';
  constructor(private GitSearchService: GitSearchService) {

  }
  ngOnInit(): void {
    // throw new Error("Method not implemented.");
    // this.GitSearchService.gitSearch('angular').then((response)=> {
    //   alert("Total Libraries Found:" + response.total_count);
    // } , (error) => {
    //   alert("Error: " + error.statusText);
    // });

    // this.GitSearchService.gitSearchUsers('iscangelmartinez').then((response)=> {
    //   alert("Total Users Found:" + response.total_count);

    //   for (let entry of response.items) {
    //     console.log(entry); // 1, "string", false
    // }
    // } , (error) => {
    //   alert("Error: " + error.statusText);
    // });
  }
  
  // title = 'angular-fundamentals';
}


