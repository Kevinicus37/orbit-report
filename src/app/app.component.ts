import { Component } from '@angular/core';
import { Satellite } from './satellite';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'orbit-report';
  sourceList : Satellite[];
  displayList : Satellite[];

  constructor() {
    this.sourceList = [];
    this.displayList = [];
    let satellitesUrl = 'https://handlers.education.launchcode.org/static/satellites.json';
 
    window.fetch(satellitesUrl).then(function(response) {
       response.json().then(function(data) {
 
          let fetchedSatellites = data.satellites;
          
          for (let i = 0; i < fetchedSatellites.length; i++){
            let satellite = new Satellite(fetchedSatellites[i].name,
              fetchedSatellites[i].type,
              fetchedSatellites[i].launchDate,
              fetchedSatellites[i].orbitType,
              fetchedSatellites[i].operational);
            this.sourceList.push(satellite);
          }
          this.displayList = this.sourceList.slice(0);
       }.bind(this));
    }.bind(this));
 
 }

 // This was when I was doing dynamic satellite types and confused about *when* I could use the @Input() data (not in the constructor).
// satelliteCount() : [[string, number]] {
//   let typeCounts : {[k: string] : any} = {};
  
//   typeCounts[""] = this.displayList.length;
//   for (let i : number = 0; i < this.displayList.length; i++){
//       let curType = this.displayList[i].type;
//       if (!typeCounts[curType] || isNaN(Number(typeCounts[curType]))){
//         typeCounts[curType] = 1;
//       } else {
//         typeCounts[curType]++;
//       }
//     }

//     let output : [[string, number]]= [[this.sourceList[0].type, 1]];
//     for (var type in typeCounts){
//       output.push([type, typeCounts[type]]);
//     }
//     output.shift();
//     return output;
// }

 search(searchTerm: string){
   let matchingSatellites: Satellite[] = [];
   searchTerm = searchTerm.toLowerCase();
   for (let i = 0; i < this.sourceList.length; i++){
     let name = this.sourceList[i].name.toLowerCase();
     let type = this.sourceList[i].type.toLowerCase();
     let orbitType = this.sourceList[i].orbitType.toLowerCase();

     if (name.indexOf(searchTerm) >= 0 || type.indexOf(searchTerm) >= 0 || orbitType.indexOf(searchTerm) >= 0){
       matchingSatellites.push(this.sourceList[i]);
     }
   }
   this.displayList=matchingSatellites;
 }
}
