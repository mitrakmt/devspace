import { Component, OnInit, DoCheck } from '@angular/core';
import { TeamService } from '../../team.service';

@Component({
  selector: 'app-days-line-chart',
  template: `
  <div>
      <div style="display: block">
        <canvas baseChart
                [datasets]="lineChartData"
                [labels]="lineChartLabels"
                [options]="lineChartOptions"
                [legend]="lineChartLegend"
                [chartType]="lineChartType">
        </canvas>
      </div>
  </div>
  `,
  styles: []
})
export class DaysLineChartComponent implements DoCheck {

  constructor(private teamService: TeamService) { }
  
  public lineChartOptions:any = {
    animation: false,
    scaleShowVerticalLines: false,
    responsive: true
  };
  public lineChartLabels:string[] = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  public lineChartType:string = 'line';
  public lineChartLegend:boolean = true;

  public lineChartData:any[] = [{data: [], label: 'No Data Found'}];
  ngDoCheck() {
    this.lineChartData = this.teamService.lineChartDaysData.slice();
  }

}
