import { Component, OnInit } from '@angular/core';
import { AreasService } from '../areas/areas.service';
import { Area } from '../areas/area';
import { FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms'; 
import { Router } from '@angular/router';

@Component({
  selector: 'asig-areas',
  templateUrl: './asig-areas.component.html',
  styleUrls: ['./asig-areas.component.scss']
})
export class AsigAreasComponent implements OnInit {  
  areas:Area[];
  areasAsig:FormGroup;
  constructor(private areaService:AreasService, private fb:FormBuilder,private router:Router)
  {
    this.areasAsig=this.createAsigAreaForm(fb);
  }
  
  ngOnInit() {
    this.areaService.getArea().subscribe(
      res=>this.areas=res)
  }
  createAsigAreaForm(fb:FormBuilder)
  {
    return fb.group({
      areas:['', Validators.required]
    });
  }
  onFormSubmit()
  {
    let areas=new Array;
    const result: any = Object.assign({}, this.areasAsig.value);
    for(let value of result.areas)
    {
      let length=areas.push(+value.id_area);      
    }
    this.areaService.setAsigArea(areas).subscribe(res=>console.log(res));
      
    this.router.navigate(['/dashboard']);
    
    
  }
}
