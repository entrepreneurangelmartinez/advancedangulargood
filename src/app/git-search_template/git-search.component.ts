import { Component, OnInit } from '@angular/core';
import {GitSearchService} from '../git-search.service';
import {GitSearch} from '../git-search';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {AdvancedSearchModel} from '../advanced-search-model';

@Component({
  selector: 'app-git-search',
  templateUrl: './git-search.component.html',
  styleUrls: ['./git-search.component.css']
})
export class GitSearchComponent implements OnInit {

  searchResults: GitSearch;
  searchQuery: string;
  title: string;
  displayQuery: string;
  
  constructor(private GitSearchService: GitSearchService, private route: ActivatedRoute, private router: Router) { }

  model = new AdvancedSearchModel('', '', '', null, null, '');
  modelKeys= Object.keys(this.model) as Array<any>;


  ngOnInit() {
    // this.GitSearchService.gitSearch('angular').then( (response) => {
    //   this.searchResults = response;
    // }, (error) => {
    //   alert("Error: " + error.statusText)
    // });


    // this.route.paramMap.subscribe((params: ParamMap) => {
    //   this.searchQuery= params.get('query');
    //   this.displayQuery= params.get('query');
    //   this.gitSearch(this.searchQuery);
    // });

    // this.GitSearchService.gitSearch("dalay").then( (response) => {
    //   this.searchResults = response;
    // }, (error) => {
    //   alert("Error: " + error.statusText)
    // });

    // this.route.data.subscribe((result)=>  {
    //   alert(result.title);
    //   this.title=result.title;
    // });
    console.log("el modelo base");
    console.log(this.model);
    console.log("el modelo con sus llaves");
    console.log(this.modelKeys);

    this.route.paramMap.subscribe( (params: ParamMap) => {
      this.searchQuery = params.get('query');
      this.displayQuery = params.get('query');
      return this.gitSearch(this.searchQuery);  
    })
    this.route.data.subscribe( (result) => {
      this.title = result.title
    });
  }

  gitSearch = (query) => {
    this.GitSearchService.gitSearch(this.searchQuery).then( (response) => {
      this.searchResults = response;
    }, (error) => {
      alert("Error: " + error.statusText)
    })
  }

  // sendQuery = () => {
  //   this.searchResults=null;
  //   this.router.navigate(['/search/'+ this.searchQuery] );
  // }

  sendQuery = () => {
    this.searchResults=null;
    let search : string=this.model.q;
    let params : string = "";
    this.modelKeys.forEach( (elem) => {
      if(elem === 'q') {
        return false;
      }
      if(this.model[elem]) {
        params += '+' + elem + ':' + this.model[elem];
      }
    });

    this.searchQuery=search;
    if(params !=='') {
      this.searchQuery=search + '+' + params;
    }
    this.displayQuery=this.searchQuery;

    this.gitSearch(this.searchQuery);
    // this.router.navigate(['/search/'+ this.searchQuery] );
  }

}
