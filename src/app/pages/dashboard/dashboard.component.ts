import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxEchartsModule, provideEcharts } from 'ngx-echarts';
import { EChartsOption } from 'echarts';
import { HttpClientModule } from '@angular/common/http';
import { DashboardViewModel } from '../../../Core/viewmodel/dashboard.vm';
import { DashboardService } from '../../../Core/services/dashboard.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, NgxEchartsModule, HttpClientModule,RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers: [
    DashboardViewModel,
    DashboardService,
    provideEcharts(), 
  ]
})
export class DashboardComponent implements OnInit {

  barChartOptions: EChartsOption = {};
  pieChartOptions: EChartsOption = {};
  lineChartOptions: EChartsOption = {};

  constructor(public vm: DashboardViewModel) {}

  ngOnInit(): void {
    this.vm.loadDashboard();

    this.vm.dashboard$.subscribe(data => {
      if (!data) return;

      // 📊 Bar Chart
      this.barChartOptions = {
        title: { text: 'Órdenes' },
        tooltip: {},
        xAxis: {
          type: 'category',
          data: ['Total', 'Completadas', 'Pendientes']
        },
        yAxis: { type: 'value' },
        series: [
          {
            type: 'bar',
            data: [
              data.totalOrders,
              data.completedOrders,
              data.pendingOrders
            ]
          }
        ]
      };

      // 🥧 Pie Chart
      this.pieChartOptions = {
        title: { text: 'Estado de órdenes', left: 'center' },
        tooltip: { trigger: 'item' },
        series: [
          {
            type: 'pie',
            radius: '60%',
            data: [
              { value: data.completedOrders, name: 'Completadas' },
              { value: data.pendingOrders, name: 'Pendientes' }
            ]
          }
        ]
      };

      // 📈 Line Chart
      this.lineChartOptions = {
        title: { text: 'Actividad por día' },
        xAxis: {
          type: 'category',
          data: data.activityByDay.map(x =>
            new Date(x.date).toLocaleDateString()
          )
        },
        yAxis: { type: 'value' },
        series: [
          {
            type: 'line',
            smooth: true,
            data: data.activityByDay.map(x => x.count)
          }
        ]
      };
    });
  }
}