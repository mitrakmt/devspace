import { Component, OnInit } from '@angular/core';
import { TeamService } from '../../team.service';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css']
})

export class PieChartComponent {
  // Pie
  public pieChartLabels:string[] = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];
  public pieChartData:number[] = [350, 450, 100];
  public pieChartType:string = 'pie';

  // events
  public chartClicked(e:any):void {
    console.log(e);
  }

  public chartHovered(e:any):void {
    console.log(e);
  }
}