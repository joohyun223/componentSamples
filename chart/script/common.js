(function(document, window) {

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
    // project default object
    var common = {
      el    : {
        doc : document,
        win : window,
        body: null,
        doughnutEl: null,
        doughnutOneEl: null,
        pieEl           : null,
        barEl           : null,
        lineEl          : null,
        radarEl         : null,
        candleEl        : null,
        curvLineEl      : null,
        // multiDoughnutEl : null,
        multiDoughnut2El: null,
      },
      selector: {
        body            : 'body, html',
        doughnutEl      : '#chartjs-1',
        doughnutOneEl   : '#chartjs-2',
        pieEl           : '#chartjs-3',
        barEl           : '#chartjs-4',
        lineEl          : '#chartjs-5',
        radarEl         : '#chartjs-6',
        candleEl        : '#chartjs-7',
        curvLineEl      : '#chartjs-8',
        // multiDoughnutEl : '#chartjs-9',
        multiDoughnut2El: '#chartjs-10'
      },
      handler: {
        ready: function() {
            common.el.body = common.el.doc.body;

    
            common.el.doughnutEl = common.el.doc.querySelector(common.selector.doughnutEl);
            common.el.doughnutOneEl = common.el.doc.querySelector(common.selector.doughnutOneEl);
            common.el.pieEl = common.el.doc.querySelector(common.selector.pieEl);
            common.el.barEl = common.el.doc.querySelector(common.selector.barEl);
            common.el.lineEl = common.el.doc.querySelector(common.selector.lineEl);
            common.el.radarEl = common.el.doc.querySelector(common.selector.radarEl);
            common.el.candleEl = common.el.doc.querySelector(common.selector.candleEl);
            common.el.curvLineEl = common.el.doc.querySelector(common.selector.curvLineEl);
            // common.el.multiDoughnutEl = common.el.doc.querySelector(common.selector.multiDoughnutEl);
            common.el.multiDoughnut2El = common.el.doc.querySelector(common.selector.multiDoughnut2El);


            if (common.el.doughnutEl !== null) {
                
                doughnutChart.init(common.el.doughnutEl);
            } 

            if (common.el.doughnutOneEl !== null) {
                doughnutOneChart.init(common.el.doughnutOneEl); 
            } 
            if (common.el.pieEl !== null) {
                pieChart.init(common.el.pieEl); 
            } 

            if (common.el.barEl !== null) {
                barChart.init(common.el.barEl); 
            }

            if (common.el.lineEl !== null) {
                lineChart.init(common.el.lineEl); 
            }

            if (common.el.radarEl !== null) {
                radarChart.init(common.el.radarEl); 
            }

            if (common.el.candleEl !== null) {
                candleChart.init(common.el.candleEl); 
            }

            if (common.el.curvLineEl !== null) {
                curvLineChart.init(common.el.curvLineEl); 

            }

            // if (common.el.multiDoughnutEl !== null) {
            //     multiDoughnutChart.init(common.el.multiDoughnutEl); 
            // }

            if (common.el.multiDoughnut2El !== null) {
                multiDoughnutChart2.init(common.el.multiDoughnut2El); 
            }
            
            
        },
        load: function() {

        }
      }
    };
  
    common.el.doc.addEventListener("DOMContentLoaded", common.handler.ready);

    var doughnutChart = {
      el: {
  
      },
      handler: {
  
      },
      setProperty: function(el) {
        var options = 
        {
            "type":"doughnut",
            "data":
            {
                "labels":["Red","Blue","Yellow"],
                "datasets":[
                    {
                    "label":"My First Dataset","data":[300,50,100],
                    "backgroundColor":["rgb(255, 99, 132)","rgb(54, 162, 235)","rgb(255, 205, 86)"],
                    borderWidth : [2,2,2]
                    }],
                    // maintainAspectRatio : false
            },
            percentageInnerCutout: 90,
            options :
            {
                // circumference: Math.PI,
                // rotation: 1.0 * Math.PI,
                // percentageInnerCutout: 100,

                cutoutPercentage: 80,
                responsive:true,
                layout: {
                    padding: {
                        left: 10,
                        right: 10,
                        top: 10,
                        bottom: 10
                    }
                },	
                tooltipTemplate: "<%= value %>%",
                legend : 
                {
                    // top : 1000,
                    // position :{
                    // 	top : 0,
                    // 	left : 0
                    // },
                    position:'bottom',
                    // display : false,
                    // position :{
                    // 	// top : 100,
                    // 	// left : 200
                    // },
                    // display:false,
                    // fullWidth : 10,
                    labels : {
                        boxWidth : 10,
                        padding:10
                    },
                    // onClick : function(){
                    // }
                }	
            },
        }


        var chart = new Chart(el,options);

      },
      bind: function() {
  
      },
      init: function(el) {
        doughnutChart.setProperty(el);
      }
    };

    var multiDoughnutChart2 = {
        el: {
    
        },
        handler: {
    
        },
        setProperty: function(el) {
			
			Chart.pluginService.register({
                afterUpdate: function (chart) {
                    if (chart.config.options.elements.arc.roundedCornersFor !== undefined) {
                        var a=chart.config.data.datasets.length -1;
                        for (let i in chart.config.data.datasets) {
                            // console.log( a );
                            var arc = chart.getDatasetMeta(i).data[ chart.config.options.elements.arc.roundedCornersFor ];
                            
                            arc.round = {
                                x: (chart.chartArea.left + chart.chartArea.right) / 2,
                                y: (chart.chartArea.top + chart.chartArea.bottom) / 2,
                                radius: chart.innerRadius + chart.radiusLength / 2 + (a * chart.radiusLength),
                                thickness: chart.radiusLength / 2,
                                backgroundColor: arc._model.backgroundColor
                            }
                            a--;
                        }
                    }
                },
    
                afterDraw: function (chart) {
                    // console.log( 'afterDraw' )
                    if (chart.config.options.elements.arc.roundedCornersFor !== undefined) {
                        var ctx = chart.chart.ctx;
                        for (let i in chart.config.data.datasets) {
                            var arc = chart.getDatasetMeta(i).data[chart.config.options.elements.arc.roundedCornersFor];
                            var startAngle = Math.PI / 2 - arc._view.startAngle;
                            var endAngle = Math.PI / 2 - arc._view.endAngle;
    
                            ctx.save();
                            ctx.translate(arc.round.x, arc.round.y);
                            // console.log(arc.round.startAngle)
                            ctx.fillStyle = arc.round.backgroundColor;
                            ctx.beginPath();
    
                            // console.log( arc.round.radius );
    
                            ctx.arc(arc.round.radius * Math.sin(startAngle), arc.round.radius * Math.cos(startAngle), arc.round.thickness, 0, 2 * Math.PI);
                            ctx.arc(arc.round.radius * Math.sin(endAngle), arc.round.radius * Math.cos(endAngle), arc.round.thickness, 0, 2 * Math.PI);
                            ctx.closePath();
                            ctx.fill();
                            ctx.restore();
                        }
                    }
                },
            });
    
            // write text plugin
            Chart.pluginService.register({
                afterUpdate: function (chart) {
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
                afterDraw: function (chart) {
                    if (chart.center) {
                        var centerConfig = chart.config.options.elements.center;
                        var ctx = chart.chart.ctx;
        
                        ctx.save();
                        ctx.font = chart.center.font;
                        ctx.fillStyle = chart.center.fillStyle;
                        ctx.textAlign = 'center';
                        ctx.textBaseline = 'middle';
                        var centerX = (chart.chartArea.left + chart.chartArea.right) / 2;
                        var centerY = (chart.chartArea.top + chart.chartArea.bottom) / 2;
                        ctx.fillText(centerConfig.text, centerX, centerY);
                        ctx.restore();
                    }
                },
            })
        
        
            var config = {
                type: 'doughnut',
                data: {
                    labels: [
                        "Red",
                        "Gray"
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
                                0, 0
                        ]
                    },
            {
                        data: [23, 77],
                        backgroundColor: [
                            "blue",
                            "#fff"
                        ],
                        hoverBackgroundColor: [
                            "blue",
                            "#fff"
                        ]
                        ,borderWidth: [
                                0, 0
                        ]
                    },
            {
                        data: [50, 50],
                        backgroundColor: [
                            "red",
                            "#fff"
                        ],
                        hoverBackgroundColor: [
                            "red",
                            "#fff"
                        ]
                                ,borderWidth: [
                                0, 0
                        ]
                    }]
                },
                options: {
                    elements: {
                        arc: {
                            roundedCornersFor: 0
                        },
                        center: {
                            // the longest text that could appear in the center
                            maxText: '100%',
                            text: '67%',
                            fontColor: '#FF6684',
                            fontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
                            fontStyle: 'normal',
                            // fontSize: 12,
                            // if a fontSize is NOT specified, we will scale (within the below limits) maxText to take up the maximum space in the center
                            // if these are not specified either, we default to 1 and 256
                            minFontSize: 1,
                            maxFontSize: 256,
                        }
                        
                    },
                legend : false,
                tooltips : {
                    enabled : false
                }
                }
            };
    
    
            // var ctx = document.getElementById("chartjs-10").getContext("2d");
            var ctx = el.getContext("2d");
            var myChart = new Chart(ctx, config);
        },
        bind: function() {
            
    
        },
        init: function(el) {
            multiDoughnutChart2.setProperty(el);
        }
    };

    var doughnutOneChart = {
        el: {
    
        },
        handler: {
    
        },
        setProperty: function(el) {
            var p1 = {
                afterUpdate: function (chart) {
                    if (chart.config.options.elements.arc.roundedCornersFor !== undefined) {
                        var a=chart.config.data.datasets.length -1;
                        for (var i in chart.config.data.datasets) {
                            var arc = chart.getDatasetMeta(i).data[chart.config.options.elements.arc.roundedCornersFor];
    
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
                    if (chart.config.options.elements.arc.roundedCornersFor !== undefined) {
                        var ctx = chart.chart.ctx;
                        for (var i in chart.config.data.datasets) {
                            var arc = chart.getDatasetMeta(i).data[chart.config.options.elements.arc.roundedCornersFor];
                            var startAngle = Math.PI / 2 - arc._view.startAngle;
                            var endAngle = Math.PI / 2 - arc._view.endAngle;
    
                            ctx.save();
                            ctx.translate(arc.round.x, arc.round.y);
                            
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
                        ],
                        borderWidth: [
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
                        duration: 0 // 애니메이션 제거
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

            var ctx = el.getContext("2d");
            var myChart = new Chart(ctx, config);
            myChart.update();
            // document.getElementById('legend').innerHTML = myChart.generateLegend();
  
        },
        bind: function() {
    
        },
        init: function(el) {
            doughnutOneChart.setProperty(el);
        }
    };

    var pieChart = {
        el: {
    
        },
        handler: {
    
        },
        setProperty: function(el) {
            var randomScalingFactor = function() {
                return Math.round(Math.random() * 100);
            };

            var myPie;

            var config = {
                type: 'pie',
                data: {
                    datasets: [{
                        data: [
                            randomScalingFactor(),
                            randomScalingFactor(),
                            randomScalingFactor(),
                            randomScalingFactor(),
                            randomScalingFactor(),
                        ],
                        backgroundColor: [ 'red', 'orange', 'yellow', 'green', 'blue' ],
                        label: 'Dataset 1'
                    }],
                    labels: [
                        'Red',
                        'Orange',
                        'Yellow',
                        'Green',
                        'Blue'
                    ]
                },
                options: {
                    responsive: true,
                    legend : 
                    {
                        position:'top',
                        labels : {
                            boxWidth : 10,
                            padding:10
                        },
                    }	
                }
            
            };
            var ctx = el.getContext('2d');
            myPie = new Chart(ctx, config);   
  
        },
        bind: function() {
    
        },
        init: function(el) {
            pieChart.setProperty(el);
        }
    };

    var barChart = {
        el: {
    
        },
        handler: {
    
        },
        setProperty: function(el) {
     
            // var MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
            var color = Chart.helpers.color;
            var barChartData = 
            {
                labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                datasets: [{
                    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                    backgroundColor: ['red','yellow','pink','blue'],
                    // borderColor: 'red',
                    // background
                    borderWidth: 1,
                    data: [
                        20,-10,20,30,40,11,12,100
                        // randomScalingFactor()
                    ]
                }
                // ,{

                //     label: 'Dataset 2',
                //     backgroundColor: color(window.chartColors.blue).alpha(0.5).rgbString(),
                //     borderColor: window.chartColors.blue,
                //     borderWidth: 1,
                //     data: [
                //         randomScalingFactor()
                //     ]
                // }
                ]
            };
            var ctx = el.getContext('2d');
            window.myBar = new Chart(ctx, 
            {
                type: 'bar',
                data: barChartData,
                options: 
                {

                    responsive: true,
                    legend: {
                        display:false,
                        position: 'top',
                    },
                    title: {
                        display: true,
                        // text: 'Chart.js Bar Chart'
                    },
                    scales: {
                        yAxes: [{
                            ticks: {
                                min: -60,
                                max: 60,
                                // beginAtZero:true
                            }
                        }]
                    }

                    // yAxes: [{
                    //     ticks: {
                    //         min: 0,
                    //         max: 60,
                    //         stepSize: 20
                    //     }
                    // }]
                }
            });
            // var chart = new Chart(document.getElementById("chartjs-4"),options );
        },
        bind: function() {
    
        },
        init: function(el) {
            barChart.setProperty(el);
        }
    };

    var lineChart = {
        el: {
    
        },
        handler: {
    
        },
        setProperty: function(el) {
            // console.log('lineChart == ')
            var ctx = el;

            var myChart = new Chart(ctx, {
                type: 'line',
                  easing: 'easeOutBack',
                data: {
                    labels: ['월','화','수','목','금','토','일'],
                    datasets: [{
                        label: '차트1',
                        data: [10,20,20,30,15,45,52],
                        backgroundColor: '#9fb1a1',
                        borderColor: 'green',
                        borderCapStyle:'butt',
                        lineTension: 0.0001,            // 곡선 부드러움
                        fill: false                    // 곡선 채우기
                    }
                    ,
                    {
                        label: '차트2',
                        data: [20,4,30,50,15,33,11],
                        backgroundColor: '#d9d8df70',
                        borderColor: '#8c7386',
                        borderCapStyle:'round',
                        lineTension: 0.0001,        ////곡선 부드러움
                        fill: false
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
                              color: 'pink',
                              lineWidth:3
                         },
                         scaleLabel: {
                            display: true,
                            labelString: "Day",
                            fontColor: "#b87590",
                            fontSize: 12,
                            fontStyle: 'bold',
                        },
                      }],
                      yAxes:[{
                          gridLines: {
                              display: true,
                              color: 'pink'
                         },
                         scaleLabel: {
                            display: true,
                            labelString: 'Data',
                            fontColor: "#9fb1a1",
                            fontSize: 12,
                            fontStyle: 'bold',
                        }
                      }],
                    },
                    legend:{
                        labels:{
                            position: 'left',
                            fontColor: '#4B8A08',
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
                        enabled : true,
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
  
        },
        bind: function() {
    
        },
        init: function(el) {
            lineChart.setProperty(el);
          
        }
    };

    var radarChart = {
        el: {
    
        },
        handler: {
    
        },
        setProperty: function(el) {
            var randomScalingFactor = function() {
                return Math.round(Math.random() * 100);
            };
    
            var color = Chart.helpers.color;
            var config = {
                type: 'radar',
                data: {
                    // labels: [['Eating', 'Dinner'], ['Drinking', 'Water'], 'Sleeping', ['Designing', 'Graphics'], 'Coding', 'Cycling', 'Running'],
                    labels: ['Dinner', 'Drinking', 'Sleeping'],
                    datasets: [{
                        label: 'My First dataset',
                        backgroundColor: color(window.chartColors.red).alpha(0.2).rgbString(),
                        borderColor: window.chartColors.red,
                        pointBackgroundColor: window.chartColors.red,
                        data: [
                            10,
                            30,
                            50,
                            // randomScalingFactor(),
                            // randomScalingFactor(),
                            // randomScalingFactor(),
                            // randomScalingFactor()
                        ]
                    }
                    // , {
                    //     label: 'My Second dataset',
                    //     backgroundColor: color(window.chartColors.blue).alpha(0.2).rgbString(),
                    //     borderColor: window.chartColors.blue,
                    //     pointBackgroundColor: window.chartColors.blue,
                    //     data: [
                    //         randomScalingFactor(),
                    //         randomScalingFactor(),
                    //         randomScalingFactor(),
                    //         // randomScalingFactor(),
                    //         // randomScalingFactor(),
                    //         // randomScalingFactor(),
                    //         // randomScalingFactor()
                    //     ]
                    // }
                    ]
                },
                options: {
                    legend: {
                        display:false,
                        position: 'top',
                    },
                    title: {
                        display: false,
                        text: 'Chart.js Radar Chart'
                    },
                    scale: {
                        ticks: {
                            beginAtZero: true
                        }
                    }
                }
            };


            var myRadar = new Chart(el, config);
  
        },
        bind: function() {
    
        },
        init: function(el) {
            radarChart.setProperty(el);
        }
    };

    var candleChart = {
        el: {
    
        },
        handler: {
    
        },
        setProperty: function(el) {
            var data = [{
                o: 31.386321414335523,
                h: 31.837572871591057,
                l: 28.3126005331242,
                c: 31.186708266911094,
                t: 1490972400000
            },
            {
                o: 30.00761908304676,
                h: 32.37670077632535,
                l: 27.43874853580521,
                c: 29.343558073967607,
                t: 1491145200000
            },
            {
                o: 29.632958418321927,
                h: 32.71088838901936,
                l: 28.993688055692957,
                c: 30.73242049829479,
                t: 1491231600000
            }];

            var options = {
                type: 'candlestick',
                data: {
                    datasets: [{
                        label: "CHRT - Chart.js Corporation",
                        data: data,
                        fractionalDigitsCount: 0, // data 소숫점 자릿 수
                        color: {
                            up: 'blue', //c < o
                            down: 'red', // c> o
                            unchanged: 'green', //c === o
                        },
                    }]
                },
                options: {
                    legend: {
                        display:false,
                        position: 'top',
                    },
                    events: ['click'],
                    tooltips: 
                    {
                        position: 'nearest',
                        mode: 'point',
                        enabled: false,
                        custom: function(tooltipModel) {
                            // Tooltip Element
                            var tooltipEl = document.getElementById('chartjs-tooltip');
    
                            // Create element on first render
                            if (!tooltipEl) {
                                tooltipEl = document.createElement('div');
                                tooltipEl.id = 'chartjs-tooltip';
                                tooltipEl.innerHTML = "<table></table>";
                                document.body.appendChild(tooltipEl);
                            }
    
                            // Hide if no tooltip
                            if (tooltipModel.opacity === 0) {
                                tooltipEl.style.opacity = 0;
                                return;
                            }
    
                            // Set caret Position
                            tooltipEl.classList.remove('above', 'below', 'no-transform');
                            if (tooltipModel.yAlign) {
                                tooltipEl.classList.add(tooltipModel.yAlign);
                            } else {
                                tooltipEl.classList.add('no-transform');
                            }
    
                            function getBody(bodyItem) {
                                return bodyItem.lines;
                            }
    
                            // Set Text
                            if (tooltipModel.body) {
                                var titleLines = tooltipModel.title || [];
                                var bodyLines = tooltipModel.body.map(getBody);
    
                                var innerHtml = '<thead>';
    
                                titleLines.forEach(function(title) {
                                    innerHtml += '<tr><th>' + title + '</th></tr>';
                                });
                                innerHtml += '</thead><tbody>';
    
                                bodyLines.forEach(function(body, i) {
                                    var colors = tooltipModel.labelColors[i];
                                    var style = 'background:' + colors.backgroundColor;
                                    style += '; border-color:' + colors.borderColor;
                                    style += '; border-width: 2px';
                                    var span = '<span style="' + style + '"></span>';
                                    innerHtml += '<tr><td>' + span + body + '</td></tr>';
                                });
                                innerHtml += '</tbody>';
    
                                var tableRoot = tooltipEl.querySelector('table');
                                tableRoot.innerHTML = innerHtml;
                            }
    
                            // `this` will be the overall tooltip
                            var position = this._chart.canvas.getBoundingClientRect();
    
                            // Display, position, and set styles for font
                            tooltipEl.style.backgroundColor = '#eee';
                            tooltipEl.style.opacity = 1;
                            tooltipEl.style.position = 'absolute';
                            tooltipEl.style.left = position.left + window.pageXOffset + tooltipModel.caretX + 'px';
                            tooltipEl.style.top = position.top + window.pageYOffset + tooltipModel.caretY + 'px';
                            tooltipEl.style.fontFamily = tooltipModel._bodyFontFamily;
                            tooltipEl.style.fontSize = tooltipModel.bodyFontSize + 'px';
                            tooltipEl.style.fontStyle = tooltipModel._bodyFontStyle;
                            tooltipEl.style.padding = tooltipModel.yPadding + 'px ' + tooltipModel.xPadding + 'px';
                            tooltipEl.style.pointerEvents = 'none';
                        }
                    }
                },
            }

            // Candlestick
            var ctx = el.getContext("2d");
            ctx.canvas.width = 1000;
            ctx.canvas.height = 400;

            new Chart(ctx, options);
  
        },
        bind: function() {
    
        },
        init: function(el) {
            candleChart.setProperty(el);
        }
    };

    var curvLineChart = {
        el: {
    
        },
        handler: {
    
        },
        setProperty: function(el) {
            // console.log('lineChart == ')
            var ctx = el.getContext("2d");


            var gradient1 = ctx.createLinearGradient(0, 0, 0, 175);
            gradient1.addColorStop(0.0, 'rgba(33,143,237,0.8)');
            gradient1.addColorStop(1.0, 'rgba(33,143,237,0.05)');

            var gradient2 = ctx.createLinearGradient(0, 0, 0, 175);
            gradient2.addColorStop(0.0, 'rgba(242,17,48,0.8)');
            gradient2.addColorStop(1.0, 'rgba(242,17,48,0.05)');
            

            var config = {
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
                    },{
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
                    }]
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
                }
            }


            var myChart = new Chart(ctx, config);
  
        },
        bind: function() {
    
        },
        init: function(el) {
            curvLineChart.setProperty(el);
        }
    };

    var multiDoughnutChart = {
        el: {
    
        },
        handler: {
    
        },
        setProperty: function(el) {
            Chart.pluginService.register(
                {
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
    
                afterDraw: function (chart) {

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
                            
                            // ctx.arc(arc.round.radius * Math.sin(startAngle), arc.round.radius * Math.cos(startAngle), arc.round.thickness, 0, 2 * Math.PI);
                            // ctx.arc(arc.round.radius * Math.sin(endAngle), arc.round.radius * Math.cos(endAngle), arc.round.thickness, 0, 2 * Math.PI);

                            ctx.closePath();
                            ctx.fill();
                            ctx.restore();
                        }
                    }
                },
            });
    
            // write text plugin
            Chart.pluginService.register({
                afterUpdate: function (chart) 
                {
                    // console.log( 'dar999' )
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
                afterDraw: function (chart) {
        
                    if (chart.center) {
                        // var centerConfig = chart.config.options.elements.center;
                        // var ctx = chart.chart.ctx;
        
                        // ctx.save();
                        // ctx.font = chart.center.font;
                        // ctx.fillStyle = chart.center.fillStyle;
                        // ctx.textAlign = 'center';
                        // ctx.textBaseline = 'middle';
                        // var centerX = (chart.chartArea.left + chart.chartArea.right) / 2;
                        // var centerY = (chart.chartArea.top + chart.chartArea.bottom) / 2;
                        // ctx.fillText(centerConfig.text, centerX, centerY);
                        // ctx.restore();
                    }
                },
            })
        
        
            var config = {
                type: 'doughnut',
            
                // cutoutPercentage : 10000,
                data: {
                    
                    labels: [
                        "Red",
                        "Blue",
                        "pink"
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
                                    10, 10
                            ]
                        },
                    {
                        data: [23, 77],
                        backgroundColor: [
                            "blue",
                            "#fff"
                        ],
                        hoverBackgroundColor: [
                            "blue",
                            "#fff"
                        ]
                        ,borderWidth: [
                            10,10
                        ]
                    },
                    {
                        data: [50, 50],
                        backgroundColor: [
                            "red",
                            "#fff"
                        ],
                        hoverBackgroundColor: [
                            "red",
                            "#fff"
                        ]
                        ,borderWidth: [
                            10, 10
                        ]
                    }]
                },
            
                options: {
                    // id : '1234',
                    elements: {
                        arc: {
                            roundedCornersFor: 0,
                            // radius : -10,
                            // borderWidth : 1
                            // hoverBorderWidth : 10
                        },
                        center: {
                            // the longest text that could appear in the center
                            maxText: '100%',
                            text: '1%',
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
                // responsive: true,
                // outerRadius : 3,
                // cutoutPercentage: 30,	
                // tooltipTemplate: "<%= value %>%",
                    legend : false,
                    legendCallback: function(chart) 
                    {
                        // console.log('---=')
                        var ul = document.createElement('ul');
                        var borderColor = chart.data.datasets[0].borderColor;
                        chart.data.labels.forEach(function(label, index) 
                        {
                        //    ul.innerHTML += `
                        //        <li>
                        //           <span style="background-color: ${'#fff'}"></span>
                        //          ${label}
                        //       </li>
                        //    `;
                            // ^ ES6 Template String
                        });
                        return ul.outerHTML;
                    },
                    tooltips : {
                        enabled : false
                    },
                    hover: {
                        mode: null
                    }   
                }
            };

            
            // var ctx = document.getElementById("chartjs-9").getContext("2d");
            var ctx = el.getContext("2d");
            var myChart = new Chart(ctx, config);
            myChart.update();
            document.getElementById('legend').innerHTML = myChart.generateLegend();
  
        },
        bind: function() {
    
        },
        init: function(el) {
            multiDoughnutChart.setProperty(el);
          
        }
    };

  })(document, window);