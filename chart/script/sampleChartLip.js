(function()
{
    if (!("classList" in document.documentElement) && Object.defineProperty && typeof HTMLElement !== 'undefined') {
        Object.defineProperty(HTMLElement.prototype, 'classList', {
            get: function() {
                var self = this;
                function update(fn) {
                    return function(value) {
                        var classes = self.className.split(/\s+/),
                            index = classes.indexOf(value);
    
                        fn(classes, index, value);
                        self.className = classes.join(" ");
                    }
                }
    
                var ret = {                    
                    add: update(function(classes, index, value) {
                        ~index || classes.push(value);
                    }),
    
                    remove: update(function(classes, index) {
                        ~index && classes.splice(index, 1);
                    }),
    
                    toggle: update(function(classes, index, value) {
                        ~index ? classes.splice(index, 1) : classes.push(value);
                    }),
    
                    contains: function(value) {
                        return !!~self.className.split(/\s+/).indexOf(value);
                    },
    
                    item: function(i) {
                        return self.className.split(/\s+/)[i] || null;
                    }
                };
                
                Object.defineProperty(ret, 'length', {
                    get: function() {
                        return self.className.split(/\s+/).length;
                    }
                });
    
                return ret;
            }
        });
    }
    
    window.addEventListener('DOMContentLoaded' , function()
    {
        var ChartSample = 
        {
            // multiDoughnutChart : function()
            // {
            //     Chart.pluginService.register(
                    
                    
            //         {
            //         afterUpdate: function (chart) {
            //             if (chart.config.options.elements.arc.roundedCornersFor !== undefined) {
            //                 var a=chart.config.data.datasets.length -1;
            //                 for (var i in chart.config.data.datasets) {
            //                     var arc = chart.getDatasetMeta(i).data[chart.config.options.elements.arc.roundedCornersFor];
        
            //                     // console.log(a, chart.chartArea.left )
            //                     // console.log(a, chart.chartArea.right )
            //                     // console.log(a, chart.chartArea.top )
            //                     // console.log(a, chart.chartArea.bottom )
        
            //                     arc.round = {
            //                         x: ( (chart.chartArea.left) + (chart.chartArea.right ) ) / 2,
            //                         y: ( (chart.chartArea.top  )+ (chart.chartArea.bottom )) / 2,
            //                         radius: (chart.innerRadius) + chart.radiusLength / 2 + (a * chart.radiusLength),
            //                         thickness:  chart.radiusLength / 2 - 1,
            //                         backgroundColor: arc._model.backgroundColor
            //                     }
            //                     a--;
            //                 }
            //             }
            //         },
        
            //         afterDraw: function (chart) {

            //             // console.log( 'dar999' )
            //             if (chart.config.options.elements.arc.roundedCornersFor !== undefined) {
            //                 var ctx = chart.chart.ctx;
            //                 for (var i in chart.config.data.datasets) {
            //                     var arc = chart.getDatasetMeta(i).data[chart.config.options.elements.arc.roundedCornersFor];
            //                     var startAngle = Math.PI / 2 - arc._view.startAngle;
            //                     var endAngle = Math.PI / 2 - arc._view.endAngle;
        
            //                     ctx.save();
            //                     ctx.translate(arc.round.x, arc.round.y);
            //                     // console.log(arc.round.radius )
            //                     ctx.fillStyle = arc.round.backgroundColor;
        
            //                     var radios = arc.round.radius;
        
            //                     ctx.beginPath();
                                
            //                     // ctx.arc(radios * Math.sin(startAngle) , radios * Math.cos(startAngle), arc.round.thickness, 0, 2 * Math.PI);
            //                     // ctx.arc(radios * Math.sin(endAngle) , radios * Math.cos(endAngle), arc.round.thickness, 0, 2 * Math.PI);
                                
            //                     // ctx.arc(arc.round.radius * Math.sin(startAngle), arc.round.radius * Math.cos(startAngle), arc.round.thickness, 0, 2 * Math.PI);
            //                     // ctx.arc(arc.round.radius * Math.sin(endAngle), arc.round.radius * Math.cos(endAngle), arc.round.thickness, 0, 2 * Math.PI);
    
            //                     ctx.closePath();
            //                     ctx.fill();
            //                     ctx.restore();
            //                 }
            //             }
            //         },
            //     });
        
            // // write text plugin
            // Chart.pluginService.register({
            //     afterUpdate: function (chart) 
            //     {
            //         // console.log( 'dar999' )
            //         if (chart.config.options.elements.center) {
            //             var helpers = Chart.helpers;
            //             var centerConfig = chart.config.options.elements.center;
            //             var globalConfig = Chart.defaults.global;
            //             var ctx = chart.chart.ctx;
        
            //             var fontStyle = helpers.getValueOrDefault(centerConfig.fontStyle, globalConfig.defaultFontStyle);
            //             var fontFamily = helpers.getValueOrDefault(centerConfig.fontFamily, globalConfig.defaultFontFamily);
        
            //             if (centerConfig.fontSize)
            //                 var fontSize = centerConfig.fontSize;
            //                 // figure out the best font size, if one is not specified
            //             else {
            //                 ctx.save();
            //                 var fontSize = helpers.getValueOrDefault(centerConfig.minFontSize, 1);
            //                 var maxFontSize = helpers.getValueOrDefault(centerConfig.maxFontSize, 256);
            //                 var maxText = helpers.getValueOrDefault(centerConfig.maxText, centerConfig.text);
        
            //                 do {
            //                     ctx.font = helpers.fontString(fontSize, fontStyle, fontFamily);
            //                     var textWidth = ctx.measureText(maxText).width;
        
            //                     // check if it fits, is within configured limits and that we are not simply toggling back and forth
            //                     if (textWidth < chart.innerRadius * 2 && fontSize < maxFontSize)
            //                         fontSize += 1;
            //                     else {
            //                         // reverse last step
            //                         fontSize -= 1;
            //                         break;
            //                     }
            //                 } while (true)
            //                 ctx.restore();
            //             }
        
            //             // save properties
            //             chart.center = {
            //                 font: helpers.fontString(fontSize, fontStyle, fontFamily),
            //                 fillStyle: helpers.getValueOrDefault(centerConfig.fontColor, globalConfig.defaultFontColor)
            //             };
            //         }
        
            //     },
            //     afterDraw: function (chart) {
        
            //         if (chart.center) {
            //             // var centerConfig = chart.config.options.elements.center;
            //             // var ctx = chart.chart.ctx;
        
            //             // ctx.save();
            //             // ctx.font = chart.center.font;
            //             // ctx.fillStyle = chart.center.fillStyle;
            //             // ctx.textAlign = 'center';
            //             // ctx.textBaseline = 'middle';
            //             // var centerX = (chart.chartArea.left + chart.chartArea.right) / 2;
            //             // var centerY = (chart.chartArea.top + chart.chartArea.bottom) / 2;
            //             // ctx.fillText(centerConfig.text, centerX, centerY);
            //             // ctx.restore();
            //         }
            //     },
            // })
        
        
            // var config = {
            //     type: 'doughnut',
             
            //     // cutoutPercentage : 10000,
            //     data: {
                    
            //         labels: [
            //             "Red",
            //             "Blue",
            //             "pink"
            //         ],
            //         datasets: [{
            //                 data: [67, 33],
            //                 backgroundColor: [
            //                     "#FF66fff84",
            //                     "#fff"
            //                 ],
            //                 hoverBackgroundColor: [
            //                     "#FF6384",
            //                     "#fff"
            //                 ]
            //                 ,borderWidth: [
            //                         10, 10
            //                 ]
            //             },
            //           {
            //             data: [23, 77],
            //             backgroundColor: [
            //                 "blue",
            //                 "#fff"
            //             ],
            //             hoverBackgroundColor: [
            //                 "blue",
            //                 "#fff"
            //             ]
            //             ,borderWidth: [
            //                 10,10
            //             ]
            //         },
            //           {
            //             data: [50, 50],
            //             backgroundColor: [
            //                 "red",
            //                 "#fff"
            //             ],
            //             hoverBackgroundColor: [
            //                 "red",
            //                 "#fff"
            //             ]
            //             ,borderWidth: [
            //                  10, 10
            //             ]
            //         }]
            //     },
               
            //     options: 
            //     {
            //         // id : '1234',
            //         elements: 
            //         {
            //             arc: {
            //                 roundedCornersFor: 0,
            //                 // radius : -10,
            //                 // borderWidth : 1
            //                 // hoverBorderWidth : 10
            //             },
            //             center: {
            //                 // the longest text that could appear in the center
            //                 maxText: '100%',
            //                 text: '1%',
            //                 fontColor: '#FF6684',
            //                 fontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
            //                 fontStyle: 'normal',
            //                 fontSize:30,
            //                 // if a fontSize is NOT specified, we will scale (within the below limits) maxText to take up the maximum space in the center
            //                 // if these are not specified either, we default to 1 and 256
            //                 minFontSize: 1,
            //                 maxFontSize: 256,
            //             }
            //         },
            //     // responsive: true,
            //     // outerRadius : 3,
            //     // cutoutPercentage: 30,	
            //     // tooltipTemplate: "<%= value %>%",
            //     legend : false,
            //     legendCallback: function(chart) 
            //     {
            //         // console.log('---=')
            //         var ul = document.createElement('ul');
            //         var borderColor = chart.data.datasets[0].borderColor;
            //         chart.data.labels.forEach(function(label, index) 
            //         {
            //         //    ul.innerHTML += `
            //         //        <li>
            //         //           <span style="background-color: ${'#fff'}"></span>
            //         //          ${label}
            //         //       </li>
            //         //    `;
            //             // ^ ES6 Template String
            //         });
            //         return ul.outerHTML;
            //      },
            //         tooltips : {
            //             enabled : false
            //         },
            //         hover: {
            //             mode: null
            //         },
                    
            //     },
            // };
    
            //     var ctx = document.getElementById("chartjs-1").getContext("2d");
            //     var myChart = new Chart(ctx, config);
            //     myChart.update();
            //     // document.getElementById('legend').innerHTML = myChart.generateLegend();
            // },
            doughnutOneChart : function()
            {

                var p1 = {
                    afterUpdate: function (chart) {
                        if (chart.config.options.elements.arc.roundedCornersFor !== undefined) {
                            var a=chart.config.data.datasets.length -1;
                            for (var i in chart.config.data.datasets) {
                                var arc = chart.getDatasetMeta(i).data[chart.config.options.elements.arc.roundedCornersFor];
        
                                // console.log(a, chart.chartArea.left )
                                // console.log(a, chart.chartArea.right )
                                // console.log(a, chart.chartArea.top )
                                // console.log(a, chart.chartArea.bottom )
        
                                arc.round = {
                                    x: ( (chart.chartArea.left) + (chart.chartArea.right ) ) / 2,
                                    y: ( (chart.chartArea.top  )+ (chart.chartArea.bottom )) / 2,
                                    radius: (chart.innerRadius) + chart.radiusLength / 2 + (a * chart.radiusLength),
                                    thickness:  chart.radiusLength / 2 - 1,
                                    backgroundColor: arc._model.backgroundColor
                                }
                                a--;
                            }
                        }
                    },
        
                    afterDraw: function (chart) 
                    {
                        // console.log( 'dar999' )
                        if (chart.config.options.elements.arc.roundedCornersFor !== undefined) {
                            var ctx = chart.chart.ctx;
                            for (var i in chart.config.data.datasets) {
                                var arc = chart.getDatasetMeta(i).data[chart.config.options.elements.arc.roundedCornersFor];
                                var startAngle = Math.PI / 2 - arc._view.startAngle;
                                var endAngle = Math.PI / 2 - arc._view.endAngle;
        
                                ctx.save();
                                ctx.translate(arc.round.x, arc.round.y);
                                // console.log(arc.round.radius )
                                ctx.fillStyle = arc.round.backgroundColor;
        
                                var radios = arc.round.radius;
        
                                ctx.beginPath();
                                
                                // ctx.arc(radios * Math.sin(startAngle) , radios * Math.cos(startAngle), arc.round.thickness, 0, 2 * Math.PI);
                                // ctx.arc(radios * Math.sin(endAngle) , radios * Math.cos(endAngle), arc.round.thickness, 0, 2 * Math.PI);
                                
                                ctx.arc(arc.round.radius * Math.sin(startAngle), arc.round.radius * Math.cos(startAngle), arc.round.thickness, 0, 2 * Math.PI);
                                ctx.arc(arc.round.radius * Math.sin(endAngle), arc.round.radius * Math.cos(endAngle), arc.round.thickness, 0, 2 * Math.PI);
    
                                ctx.closePath();
                                ctx.fill();
                                ctx.restore();
                            }
                        }
                    },
                }
        
            // write text plugin
            // Chart.pluginService.register()
            var p2 = 
            {
                afterUpdate: function (chart ) 
                {
                    // console.log('xx==---- ',chart)
                    if (chart.config.options.elements.center) {
                        var helpers = Chart.helpers;
                        var centerConfig = chart.config.options.elements.center;
                        var globalConfig = Chart.defaults.global;
                        var ctx = chart.chart.ctx;
        
                        var fontStyle = helpers.getValueOrDefault(centerConfig.fontStyle, globalConfig.defaultFontStyle);
                        var fontFamily = helpers.getValueOrDefault(centerConfig.fontFamily, globalConfig.defaultFontFamily);
        
                        if (centerConfig.fontSize)
                            var fontSize = centerConfig.fontSize;
                            // figure out the best font size, if one is not specified
                        else {
                            ctx.save();
                            var fontSize = helpers.getValueOrDefault(centerConfig.minFontSize, 1);
                            var maxFontSize = helpers.getValueOrDefault(centerConfig.maxFontSize, 256);
                            var maxText = helpers.getValueOrDefault(centerConfig.maxText, centerConfig.text);
        
                            do {
                                ctx.font = helpers.fontString(fontSize, fontStyle, fontFamily);
                                var textWidth = ctx.measureText(maxText).width;
        
                                // check if it fits, is within configured limits and that we are not simply toggling back and forth
                                if (textWidth < chart.innerRadius * 2 && fontSize < maxFontSize)
                                    fontSize += 1;
                                else {
                                    // reverse last step
                                    fontSize -= 1;
                                    break;
                                }
                            } while (true)
                            ctx.restore();
                        }
        
                        // save properties
                        chart.center = {
                            font: helpers.fontString(fontSize, fontStyle, fontFamily),
                            fillStyle: helpers.getValueOrDefault(centerConfig.fontColor, globalConfig.defaultFontColor)
                        };
                    }
        
                },
                // afterEvent : function(){
                //     console.log('==')
                // },
                afterDraw: function (chart , onAnimationProgress) 
                {
                    if (chart.center) 
                    {
                        
                        var centerConfig = chart.config.options.elements.center;
                        var ctx = chart.chart.ctx;
        
                        ctx.save();
                        ctx.font = chart.center.font;
                        ctx.fillStyle = chart.center.fillStyle;
                        ctx.textAlign = 'center';
                        ctx.textBaseline = 'middle';
                        var centerX = (chart.chartArea.left + chart.chartArea.right) / 2;
                        var centerY = (chart.chartArea.top + chart.chartArea.bottom) / 2;
                        ctx.fillText('테스트', centerX, centerY-20);
                        ctx.fillText( Math.floor(chart.data.datasets[0].data[0]*onAnimationProgress)+'%', centerX, centerY+20);
                        ctx.restore();
                    }
                },
            }
        
        
            var config = {
                type: 'doughnut',
                 plugins: [p1,p2],
                // cutoutPercentage : 100,
                data: {
                    labels: [
                        // "Red",
                        // "Blue",
                        // "pink"
                    ],
                    datasets: [{
                        data: [67, 33],
                        backgroundColor: [
                            "#FF6684",
                            "#fff"
                        ],
                        hoverBackgroundColor: [
                            "#FF6384",
                            "#fff"
                        ]
                        ,borderWidth: [
                                // 10, 10
                        ]
                    }]
                },
               
                options: 
                {
                    elements: 
                    {
                        arc: {
                            roundedCornersFor: 0,
                            // radius : -10,
                            // borderWidth : 1
                            // hoverBorderWidth : 10
                        },
                        center: {
                            // the longest text that could appear in the center
                            maxText: '100%',
                            text: 90+'%',
                            fontColor: '#FF6684',
                            fontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
                            fontStyle: 'normal',
                            fontSize:30,
                            // if a fontSize is NOT specified, we will scale (within the below limits) maxText to take up the maximum space in the center
                            // if these are not specified either, we default to 1 and 256
                            minFontSize: 1,
                            maxFontSize: 256,
                        }
                    },
                    animation: {
                        duration: 0
                    },

                    events : [''],
                    // responsive: true,
                    // outerRadius : 3,
                cutoutPercentage: 70,	
                legend : false,
       
                    tooltips : {
                        enabled : false
                    },
                    hover: {
                        mode: null
                    },
                    
                },
                onClick : function(){
                },
                onHover : function(){
                },
        
            };
    
                var ctx = document.getElementById("chartjs-2").getContext("2d");
                var myChart = new Chart(ctx, config);
                myChart.update();
                // document.getElementById('legend').innerHTML = myChart.generateLegend();
            },

            lineChart : function()
            {
                // console.log('lineChart == ')
                var ctx = document.getElementById("chartjs-8").getContext("2d");
                var gradient1 = ctx.createLinearGradient(0, 0, 0, 175);
                gradient1.addColorStop(0.0, 'rgba(33,143,237,0.8)');
                gradient1.addColorStop(1.0, 'rgba(33,143,237,0.05)');
    
                var gradient2 = ctx.createLinearGradient(0, 0, 0, 175);
                gradient2.addColorStop(0.0, 'rgba(242,17,48,0.8)');
                gradient2.addColorStop(1.0, 'rgba(242,17,48,0.05)');
                
    
    

                var myChart = new Chart(ctx, {
                    type: 'line',
          		    easing: 'easeOutBack',
                    data: {
                        labels: ['00시','02시','04시','06시','08시','10시','12시','14시','16시','18시','20시','22시','24시'],
                        legend: {
                            display: false
                        },
                        datasets: [{
                            label: '차트1',
                            data: [30, 60, 70, 80 , 90 , 100 , 20, 50, 40, 100, 150, 200, 210, 220, 230, 170, 150, 130, 120, 100, 90, 50, 40, 100, 150, 200, 210, 220, 230, 170, 150, 130],
                            backgroundColor: gradient1,
                            borderColor: 'rgba(33,143,237,1)', //라인 색상
                            borderCapStyle:'round',
                            pointRadius: 4, // 0 : 포인트 숨김
                            pointHoverRadius: 4, //마우스 호버 시 포인트 표시
                            pointHitRadius: 10, //point hover 영역
                            pointBorderColor: '#fff',
                            pointBackgroundColor: 'rgba(33,143,237,1)',
                            pointHoverBackgroundColor: 'rgba(33,143,237,1)',
                            lineTension: 0.6,            // 곡선 부드러움
                            fill: true                    // 곡선 채우기
                        }
                        ,
                        {
                            label: '차트2',
                            data: [20, 4, 30, 50, 15, 33, 11, 20, 4, 30, 50, 15, 33, 11, 20, 4, 30, 50, 15, 33, 11, 20, 4, 30, 50, 15, 33, 11, 20, 4, 30, 50, 15, 33, 11, 20, 4, 30, 50, 15, 33, 11, 20, 4, 30, 50, 15, 33, 11, 20, 4, 30, 50, 15, 33, 11],
                            backgroundColor: gradient2,
                            borderColor: 'rgba(242,17,48,1)',
                            borderWidth: 2, // 라인 두께
                            borderCapStyle: 'round',
                            pointRadius: 4, // 0 : 포인트 숨김
                            pointHoverRadius: 4, //마우스 호버 시 포인트 표시
                            pointHitRadius: 10, //point hover 영역
                            pointBorderColor: '#fff',
                            pointBackgroundColor: 'rgba(242,17,48,1)',
                            pointHoverBackgroundColor: 'rgba(242,17,48,1)',
                            lineTension: 0.6,        ////곡선 부드러움
                            fill: true
                        }
                    ]
                    },
                    options: {
                        maintainAspectRatio: false,
			            // spanGaps: false,
                        // color:['red','blue','green','black','yellow'],
                        scales:{
                            display: true,
                          xAxes:[{
                              gridLines: {
                                  display: true,
                                  color: '#dfdfdf',
                                  lineWidth:1
                             },
                             scaleLabel: {
                                display: false,
                                labelString: "Day",
                                fontColor: "#b87590",
                                fontSize: 12,
                                fontStyle: 'bold',
                            },
                          }],
                          yAxes:[{
                              gridLines: {
                                  display: true,
                                  color: '#dfdfdf',
                                  lineWidth:1
                             },
                             scaleLabel: {
                                display: false,
                                labelString: 'Data',
                                fontColor: "#4d4d4d",
                                fontSize: 12,
                                fontStyle: 'bold',
                            }
                          }],
                        },
                        legend:{
                            labels:{
                                position: 'left',
                                fontColor: '#4d4d4d',
                                fontFamily: '굴림체',
                                fontSize: 11,
                                fontStyle: 'bold',
                            },
                            onHover: function(){
                            //   console.log('hover');  
                            },
                            // onClick: function(evt){
                            //     // console.log("click");
                            // }
                        },
                        
                        tooltips: {
                            mode: 'index',
        					intersect: false,
                            enabled : false,
                            displayColors: true,
                        },
                        layout: {
                            padding: {
                                left: 20,
                                right: 0,
                                top: 50,
                                bottom: 0
                            }
                        },
                    },
                    
                });
            }
        }

        // ChartSample.multiDoughnutChart();
        ChartSample.doughnutOneChart();
        ChartSample.lineChart();
    });
})()