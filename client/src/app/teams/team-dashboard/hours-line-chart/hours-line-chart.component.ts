import { Component, OnInit, Input, DoCheck, OnChanges } from '@angular/core';
import { TeamService } from '../../team.service';

@Component({
  selector: 'app-hours-line-chart',
  template: `
  <div>
      <div style="display: block;">
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
  styleUrls: ['./hours-line-chart.component.css']
})
export class HoursLineChartComponent implements DoCheck {

  constructor(private teamService: TeamService) { }

  public lineChartOptions:any = {
    animation: false,
    scaleShowVerticalLines: false,
    responsive: true
  };
  public lineChartLabels:string[] = ['12 am', '1 am', '2 am', '3 am', '4 am', '5 am', '6 am','7 am', '8 am', '9 am', '10 am', '11 am', 
                                      '12 pm', '1 pm','2 pm', '3 pm', '4 pm', '5 pm', '6 pm', '7 pm', '8 pm', '9 pm', '10 pm', '11 pm'];
  public lineChartType:string = 'line';
  public lineChartLegend:boolean = true;

  public lineChartData:any[] = [{data: [], label: 'No Data Found'}];

  ngDoCheck() {
    this.lineChartData = this.teamService.lineChartHoursData.slice();
  }
}