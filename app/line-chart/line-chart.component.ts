import { Component } from '@angular/core';

import moment from 'moment';
 
@Component({
  selector: 'line-chart',
  templateUrl: './line-chart.component.html'
})
export class LineChartComponent {
  
  daySelected: string;

  public lineChartData:Array<any> = [{
    data: [40, 80, 60, 50, 40, 30, 20], 
    label: 'Series A',
    lineTension: 0,
    pointRadius: [4, 4, 4, 4],
    borderWidth: 2,
    pointHoverBorderWidth: 8,
    
  }];
  
  public lineChartLabels:Array<any> = [
    '20180430', 
    '20180501',
    '20180502',
    '20180503',
    '20180504',
    '20180505',
    '20180506'
  ];
  
  public lineChartOptions:any = {
    responsive: true,
    layout: {
      padding: {
          top: 10
      }
    },
    tooltips: {
      enabled: true
    },
    elements: {
      rectangle: {
          borderWidth: 0,
      }
    },
    scales: {
      xAxes: [{
        gridLines: {
            display: true,
            drawBorder: false,
            borderDash: [5, 2],
            zeroLineBorderDash: [5, 2],
            zeroLineColor: '#c5c0bc',
            color: '#c5c0bc'
        },
        ticks: {
          fontStyle: 'normal',
          callback: function(value, index, values) {
            const dayLetter = moment(value).format('dddd').charAt(0);
            const dayFormatted = moment(value).format('DD/MMM').toLowerCase();

            return [dayLetter, dayFormatted];
          }
        }
      }],
      yAxes: [{
        display: false,
        gridLines: {
            display: false,
            drawBorder: false,
            lineWidth: 0,
        },
        ticks: {          
          min: 0,
          max: 100
        }
      }]
    }
  };

  public lineChartColors:Array<any> = [
    { 
      backgroundColor: 'transparent',
      borderColor: '#ec7404',
      pointBackgroundColor: ['#fff', '#fff', '#fff', '#fff'],
      pointBorderColor: '#ec7404',
      pointHoverBackgroundColor: '#ec7404',
      pointHoverBorderColor: '#ec7404'
    }
  ];

  public lineChartLegend:boolean = false;
  public lineChartType:string = 'line';

  // events
  public chartClicked(e:any):void {
    console.log(e);
    if (e.active.length > 0) {
      var element = e.active[0];
      element._chart.config.data.datasets[0].pointBackgroundColor[element._index] = '#ec7404';
      for (var pointIndex in element._chart.config.data.datasets[0].pointBackgroundColor) {
        if (pointIndex == element._index) {
          element._chart.config.data.datasets[0].pointBackgroundColor[pointIndex] = '#ec7404';
          element._chart.config.data.datasets[0].pointRadius[pointIndex] = 6;
        } else {
          element._chart.config.data.datasets[0].pointBackgroundColor[pointIndex] = '#fff';
          element._chart.config.data.datasets[0].pointRadius[pointIndex] = 4;
        }
      }

      element._chart.update();
      this.daySelected = moment(this.lineChartLabels[element._index]).format('DD/MM/YYYY');
    }
  }
 
  public chartHovered(e:any):void {
    console.log(e);
  }
}