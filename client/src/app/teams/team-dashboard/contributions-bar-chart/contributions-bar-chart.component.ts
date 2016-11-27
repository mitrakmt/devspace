import { Component, OnInit, DoCheck } from '@angular/core';
import { TeamService } from '../../team.service';

@Component({
  selector: 'app-contributions-bar-chart',
  template: `
    <div>
      <div style="display: block">
        <canvas baseChart
                [datasets]="barChartData"
                [labels]="barChartLabels"
                [options]="barChartOptions"
                [legend]="barChartLegend"
                [chartType]="barChartType">
        </canvas>
      </div>
  </div>
  `,
  styleUrls: ['./contributions-bar-chart.component.css']
})
export class ContributionsBarChartComponent implements DoCheck {
  constructor(private teamService: TeamService) { }
  public barChartOptions:any = {
    animation: false,
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabels:string[] = this.teamService.chartContributors;
  public barChartType:string = 'bar';
  public barChartLegend:boolean = true;

  public barChartData:any[] = [{data: this.teamService.contributionScore, label: 'No Data Found'}];

  ngDoCheck() {
    if (this.teamService.contributionScore.length > 0) {
      this.barChartData = [{data: this.teamService.contributionScore, label: 'Contribution Score'}];
    }
  }

}
