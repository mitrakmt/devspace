import { Component, OnInit } from '@angular/core';
import { TeamService } from '../../team.service';

@Component({
  selector: 'app-line-chart',
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
  styleUrls: ['./line-chart.component.css']
})
export class LineChartComponent implements OnInit {

  constructor(private teamService: TeamService) { }

  public lineChartOptions:any = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public lineChartLabels:string[] = this.teamService.commitHourContributors;
  public lineChartType:string = 'line';
  public lineChartLegend:boolean = true;

  public lineChartData:any[] = [{data: this.teamService.commitHourContributors, label: 'Contribution Score'}];

  ngOnInit() {
  }

}
