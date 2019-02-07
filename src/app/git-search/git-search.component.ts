import { Component, OnInit } from '@angular/core';
import {GitSearchService} from '../git-search.service';
import {GitSearch} from '../git-search';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {AdvancedSearchModel} from '../advanced-search-model';
import {FormControl,FormGroup} from '@angular/forms';

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
  form: FormGroup;
  formControls= {};
  
  constructor(private GitSearchService: GitSearchService, private route: ActivatedRoute, private router: Router) {
    // En este punto, en nuestro constructor, vamos a recorrer nuestro this.modelKeysy crear FormControlelementos para cada uno de ellos envueltos en un objeto más grande.
    // Esto creará un formControlsobjeto con todos los campos necesarios de nuestro modelo.
    this.modelKeys.forEach((key)=> {
      this.formControls[key]= new FormControl();
    });

    // Ahora, vamos a crear un FormGroup para nuestro formulario. Lo instanciaremos con el formControlsobjeto que acabamos de hacer.
    // n este punto, ahora tenemos una forma reactiva inicializada con nuestro modelo. En nuestra próxima lección, lo adjuntaremos a nuestra plantilla y a nuestra Búsqueda de Git.
    this.form = new FormGroup(this.formControls);
   }

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


  // Para que la función sendQuery funcione con nuestro nuevo Formulario reactivo, debemos reemplazar todas las instancias de this.modelen el método con this.form.value, que es el objeto que contiene todos los valores almacenados por el nuevo formulario.
  // La razón de esto es que, a diferencia del Formulario controlado por plantillas, que utiliza un modelo simple para almacenar los datos, el Formulario reactivo crea un objeto completo que contiene toda la información sobre el formulario, incluida la validez, el estado del formulario y los valores, por lo que los valores están en una Propiedad separada del objeto formulario en sí.
  sendQuery = () => {
    alert("entro en sendquery");
    this.searchResults=null;
    // let search : string=this.model.q;
    let search : string=this.form.value['q'];
    
    let params : string = "";
    this.modelKeys.forEach( (elem) => {
      console.log(this.form.value[elem]);

      if(elem === 'q') {
        return false;
      }
      // if(this.model[elem]) {
        if(this.form.value[elem]) {
        // params += '+' + elem + ':' + this.model[elem];
        params += '+' + elem + ':' + this.form.value[elem];
      }
    });

    this.searchQuery=search;
    if(params !=='') {
      this.searchQuery=search + '+' + params;
    }
    this.displayQuery=this.searchQuery;
    alert(this.searchQuery);
    this.gitSearch(this.searchQuery);
    // this.router.navigate(['/search/'+ this.searchQuery] );
  }

}
