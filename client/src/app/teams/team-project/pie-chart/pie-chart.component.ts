import { Component, OnInit, Input, DoCheck } from '@angular/core';
import { TeamService } from '../../team.service';

@Component({
  selector: 'app-pie-chart',
  template: `
    <div>
      <div style="display: block">
        <canvas baseChart
                    [data]="pieChartData"
                    [labels]="pieChartLabels"
                    [chartType]="pieChartType">
        </canvas>
      </div>
    </div>
  `,
  styleUrls: ['./pie-chart.component.css']
})

  
export class PieChartComponent implements DoCheck {
  constructor(private teamService: TeamService) { }
  // Pie
  public pieChartLabels:string[] = ['No Data Found'];
  public pieChartData:number[] = [];
  public pieChartType:string = 'pie';

  ngDoCheck() {
    this.pieChartLabels = this.teamService.teamProjectPieChartContributors;
    this.pieChartData = this.teamService.teamProjectPieChartScore;
  }
}