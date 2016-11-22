import { Component, OnInit } from '@angular/core';
import { TeamService } from '../../team.service';

@Component({
  selector: 'app-bar-chart',
  template: `
    <div>
      <div style="display: block">
        <canvas baseChart
                [datasets]="barChartData"
                [labels]="barChartLabels"
                [options]="barChartOptions"
                [legend]="barChartLegend"
                [chartType]="barChartType"
                (chartHover)="chartHovered($event)"
                (chartClick)="chartClicked($event)"></canvas>
      </div>
      <!-- <button (click)="randomize()">Update</button> -->
  </div>
  `,
  styleUrls: ['./bar-chart.component.css']
})
export class BarChartComponent implements OnInit {
  constructor(private teamService: TeamService) { }
  public barChartOptions:any = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabels:string[] = this.teamService.chartContributors;
  public barChartType:string = 'bar';
  public barChartLegend:boolean = true;

  public barChartData:any[] = [{data: this.teamService.contributionScore, label: 'Contribution Score'}];
  // events
  public chartClicked(e:any):void {
    console.log(e);
  }

  public chartHovered(e:any):void {
    console.log(e);
  }

  // public randomize():void {
  //   // Only Change 3 values
  //   let data = [
  //     Math.round(Math.random() * 100),
  //     59,
  //     80,
  //     (Math.random() * 100),
  //     56,
  //     (Math.random() * 100),
  //     40];
  //   let clone = JSON.parse(JSON.stringify(this.barChartData));
  //   clone[0].data = data;
  //   this.barChartData = clone;
  //   /**
  //    * (My guess), for Angular to recognize the change in the dataset
  //    * it has to change the dataset variable directly,
  //    * so one way around it, is to clone the data, change it and then
  //    * assign it;
  //    */
  // }


  ngOnInit() {
  }

}
