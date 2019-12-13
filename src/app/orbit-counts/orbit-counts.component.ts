import { Component, OnInit, Input } from '@angular/core';
import { Satellite } from '../satellite';

@Component({
  selector: 'app-orbit-counts',
  templateUrl: './orbit-counts.component.html',
  styleUrls: ['./orbit-counts.component.css']
})
export class OrbitCountsComponent implements OnInit {
  // @Input() typeCounts : [[string, number]];
  @Input() satellites : Satellite[];
  satTypes : string[] = ["Space Debris", "Communication", "Probe", "Positioning", "Space Station", "Telescope"];

  constructor() { 
  
  }

  ngOnInit() {
    
  }

  getTotalSats() : number {
    return this.satellites.length;
    
  }
  numSats(type : string) : number {
    let output : number = 0;
      for (let satellite in this.satellites) {
        if (this.satellites[satellite].type.toLowerCase() === type.toLowerCase()){
          output++;
        }
      }
    return output;
  }
  
}
