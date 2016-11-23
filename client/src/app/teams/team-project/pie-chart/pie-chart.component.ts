import { Component, OnInit, Input } from '@angular/core';
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

  
export class PieChartComponent implements OnInit {
  constructor(private teamService: TeamService) { }
  // Pie
  // public pieChartLabels:string[] = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];
  // @Input() pieChartLabelsIn:string[]
  // @Input() pieChartDataIn:number[];
  public pieChartLabels:string[] = this.teamService.teamProjectPieChartContributors;
  public pieChartData:number[] = this.teamService.teamProjectPieChartScore;
  public pieChartType:string = 'pie';

  ngOnInit() {
    console.log(this.pieChartLabels, this.pieChartData)
  }
}