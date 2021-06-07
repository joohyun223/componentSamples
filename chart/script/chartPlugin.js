var COMMON = (function(ns, $) {
    ns.init = function() {
        ns._setIE9.init();
    };

    ns._setIE9 = {
        init: function() {
            //Ie9 에서 캔버스 작동 가능 코드
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
        }
    }
    ns.lineChart = {
        init: function(opt) {
            this.$target = $(opt.id);
            this.options = opt;

            if (this.$target.data('plugin_chartJs')) {
                var labelData = opt.label;
                var dataSetData = opt.dataSet;

                this.$target.data('plugin_chartJs').myChart.data.labels = labelData;
                this.$target.data('plugin_chartJs').myChart.data.datasets[0].data = opt.dataSet[0];
                this.$target.data('plugin_chartJs').myChart.data.datasets[1].data = opt.dataSet[1];
                this.$target.data('plugin_chartJs').myChart.options.scales.yAxes[0].ticks.min = opt.dataSetMin;
                this.$target.data('plugin_chartJs').myChart.options.scales.yAxes[0].ticks.max = opt.dataSetMax;

                this.$target.data('plugin_chartJs').myChart.update();

            } else {
                this._setLineConfig();
            }

        },
        _setLineConfig: function() {
            var labelData = this.options.label;
            var dataSetData = this.options.dataSet;
            var dataSetDataMin = this.options.dataSetMin; // 최소값 0
            var dataSetDataMax = this.options.dataSetMax + 50; //최대값 +50


            var ctx = document.getElementById("chartjs-5").getContext("2d");
            var gradient1 = ctx.createLinearGradient(0, 0, 0, 175);
            gradient1.addColorStop(0.0, 'rgba(33,143,237,0.8)');
            gradient1.addColorStop(1.0, 'rgba(33,143,237,0.05)');

            var gradient2 = ctx.createLinearGradient(0, 0, 0, 175);
            gradient2.addColorStop(0.0, 'rgba(242,17,48,0.8)');
            gradient2.addColorStop(1.0, 'rgba(242,17,48,0.05)');
            



            var configOpt = {
                type: 'line',
                lineThickness: 1,
                data: {
                    labels: labelData,
                    datasets: [{
                            label: '종류 C5',
                            data: dataSetData[0],
                            backgroundColor: gradient1, //210602추가
                            borderColor: 'rgba(33,143,237,1)', //라인 색상
                            borderWidth: 2, // 라인 두께
                            borderCapStyle: 'round',
                            pointRadius: 4, // 0 : 포인트 숨김
                            pointHoverRadius: 4, //마우스 호버 시 포인트 표시
                            pointHitRadius: 10, //point hover 영역
                            pointBorderColor: '#fff',
                            pointBackgroundColor: 'rgba(33,143,237,1)',
                            pointHoverBackgroundColor: 'rgba(33,143,237,1)',
                            lineTension: 0.0001, // 곡선 부드러움
                            fill: true, // 곡선 채우기  option: false, true, origin, start, end//210602추가
                            lineTension: 0.4
                        },
                        {
                            label: '벤치마크',
                            data: dataSetData[1],
                            backgroundColor: gradient2, //210602추가
                            borderColor: 'rgba(242,17,48,1)',
                            borderWidth: 2, // 라인 두께
                            borderCapStyle: 'round',
                            pointRadius: 4, // 0 : 포인트 숨김
                            pointHoverRadius: 4, //마우스 호버 시 포인트 표시
                            pointHitRadius: 10, //point hover 영역
                            pointBorderColor: '#fff',
                            pointBackgroundColor: 'rgba(242,17,48,1)',
                            pointHoverBackgroundColor: 'rgba(242,17,48,1)',
                            lineTension: 0.0001, ////곡선 부드러움
                            fill: true,
                            lineTension: 0.4
                        }
                    ]
                },
                options: {
                    scales: {
                        display: true,
                        xAxes: [{
                            gridLines: {
                                display: true,
                                color: '#eeeeee',
                            },
                            scaleLabel: {
                                display: true,
                                labelString: "",
                                fontColor: "#737373",
                                fontSize: 14,
                            },                            
                            ticks: {
                                maxTicksLimit: 10, //
                                minRotation: 0,
                                maxRotation: 0,
                            }
                        }],
                        yAxes: [{
                            gridLines: {
                                display: true,
                                color: '#eeeeee'
                            },
                            scaleLabel: {
                                display: true,
                                labelString: '',
                                fontColor: "#737373",
                                fontSize: 14,

                            },
                            ticks: {
                                min: dataSetDataMin,
                                max: dataSetDataMax,
                            }

                        }],
                    },
                    tooltips: {
                        mode: 'index',
                        intersect: false,
                        enabled: false,
                        displayColors: true,
                        // custom: function(tooltipModel) {
                        //     // Tooltip Element
                        //     var tooltipEl = document.getElementById('chartjs-tooltip');

                        //     // Create element on first render
                        //     if (!tooltipEl) {
                        //         tooltipEl = document.createElement('div');
                        //         tooltipEl.id = 'chartjs-tooltip';
                        //         tooltipEl.innerHTML = "<table></table>";
                        //         document.body.appendChild(tooltipEl);
                        //     }

                        //     // Hide if no tooltip
                        //     if (tooltipModel.opacity === 0) {
                        //         tooltipEl.style.opacity = 0;
                        //         return;
                        //     }

                        //     // Set caret Position
                        //     tooltipEl.classList.remove('above', 'below', 'no-transform');
                        //     if (tooltipModel.yAlign) {
                        //         tooltipEl.classList.add(tooltipModel.yAlign);
                        //     } else {
                        //         tooltipEl.classList.add('no-transform');
                        //     }

                        //     function getBody(bodyItem) {
                        //         return bodyItem.lines;
                        //     }

                        //     // Set Text
                        //     if (tooltipModel.body) {
                        //         var titleLines = tooltipModel.title || [];
                        //         var bodyLines = tooltipModel.body.map(getBody);

                        //         var innerHtml = '<thead>';

                        //         titleLines.forEach(function(title) {
                        //             innerHtml += '<tr><th style="color:#737373;font-size:14px;text-align:left">' + title + '</th></tr>';
                        //         });
                        //         innerHtml += '</thead><tbody>';

                        //         bodyLines.forEach(function(body, i) {
                        //             var colors = tooltipModel.labelColors[i];
                        //             var style = 'color:' + colors.borderColor;
                        //             style += ';font-size:16pxl';
                        //             var span = '<span style="' + style + '">' + body + '</span>';
                        //             innerHtml += '<tr><td>' + span + '</td></tr>';
                        //         });
                        //         innerHtml += '</tbody>';
                        //         var tableRoot = tooltipEl.querySelector('table');
                        //         // tableRoot.innerHTML = innerHtml;
                        //         //Ie9 적용 코드
                        //         $('#chartjs-tooltip table').html(innerHtml)
                        //     }

                        //     // `this` will be the overall tooltip
                        //     var position = this._chart.canvas.getBoundingClientRect();

                        //     // Display, position, and set styles for font
                        //     tooltipEl.style.opacity = 1;
                        //     tooltipEl.style.background = 'white';
                        //     tooltipEl.style.border = '#111111 1px solid' //outline border
                        //     tooltipEl.style.position = 'absolute';
                        //     tooltipEl.style.left = position.left + window.pageXOffset + tooltipModel.caretX + 'px';
                        //     tooltipEl.style.top = position.top + window.pageYOffset + tooltipModel.caretY + 'px';
                        //     tooltipEl.style.fontFamily = tooltipModel._bodyFontFamily;
                        //     tooltipEl.style.fontSize = tooltipModel.bodyFontSize + 'px';
                        //     tooltipEl.style.fontStyle = tooltipModel._bodyFontStyle;
                        //     // tooltipEl.style.padding = tooltipModel.yPadding + 'px ' + tooltipModel.xPadding + 'px';
                        //     tooltipEl.style.padding = '10px 30px 10px 10px';
                        //     tooltipEl.style.pointerEvents = 'none';
                        // }
                    },
                }
            };


            //chart 함수 호출
            this.$target.chartJs(configOpt);
        },

    };

    ns.doughnutChart = {
        init: function(opt) {
            this.$target = $(opt.id);
            this.options = opt;

            if (this.$target.data('plugin_chartJs')) {
                var labelData = opt.label;
                var dataSetData = opt.dataSet;

                this.$target.data('plugin_chartJs').myChart.data.datasets[0].data = opt.dataSet;
                this.$target.data('plugin_chartJs').myChart.update();

            } else {
                this._setDoughnutConfig();

            }
        },
        _setDoughnutConfig: function() {
            var oSelf = this;

            var chartId = this.$target.attr('id');
            var ctx = document.getElementById(chartId).getContext('2d');

            //패턴이미지 호출
            var img0 = new Image();
            var img1 = new Image();
            var img2 = new Image();
            var img3 = new Image();
            var img4 = new Image();

            img0.src = './img/pattern0.png';
            img1.src = './img/pattern1.png';
            img2.src = './img/pattern2.png';
            img3.src = './img/pattern3.png';
            img4.src = './img/pattern4.png';


            // 추가코드
            Chart.defaults.RoundedDoughnut    = Chart.helpers.clone(Chart.defaults.doughnut);
            Chart.controllers.RoundedDoughnut = Chart.controllers.doughnut.extend({
                draw: function(ease) {
                    var ctx           = this.chart.ctx;

                    var easingDecimal = ease || 1;
                    var arcs          = this.getMeta().data;
                    Chart.helpers.each(arcs, function(arc, i) {

                        // console.log(i);
                        arc.transition(easingDecimal).draw();

                        var pArc   = arcs[i === 0 ? arcs.length - 1 : i - 1];
                        var pColor = pArc._view.backgroundColor;

                        var vm         = arc._view;
                        var radius     = (vm.outerRadius + vm.innerRadius) / 2;
                        var thickness  = (vm.outerRadius - vm.innerRadius) / 2;
                        var startAngle = Math.PI - vm.startAngle - Math.PI / 2;
                        var angle      = Math.PI - vm.endAngle - Math.PI / 2;

                        ctx.save();
                        ctx.translate(vm.x, vm.y);

                        ctx.fillStyle = i === 0 ? vm.backgroundColor : pColor;
                        ctx.beginPath();
                        ctx.arc(radius * Math.sin(startAngle), radius * Math.cos(startAngle), thickness, 0, 2 * Math.PI);
                        ctx.fill();

                        ctx.fillStyle = vm.backgroundColor;
                        ctx.beginPath();
                        // console.log(ctx);
                        // ctx.style.zIndex = "-1";
                        ctx.arc(radius * Math.sin(angle), radius * Math.cos(angle), thickness, 0, 2 * Math.PI);
                        ctx.fill();

                        ctx.restore();
                    });
                }
            });



            img4.onload = function() {

                var fillPattern0 = ctx.createPattern(img0, 'repeat');
                var fillPattern1 = ctx.createPattern(img1, 'repeat');
                var fillPattern2 = ctx.createPattern(img2, 'repeat');
                var fillPattern3 = ctx.createPattern(img3, 'repeat');
                var fillPattern4 = ctx.createPattern(img4, 'repeat');



                var dataSetData = oSelf.options.dataSet;
                var configOpt = {
                    type: 'RoundedDoughnut',
                    data: {
                        datasets: [{
                            data: dataSetData,
                            backgroundColor: [
                                
                                'rgba(242,17,48,1)',
                                'rgba(245,236,237,1)'
                                // fillPattern0,
                                // fillPattern1,
                                // fillPattern2,
                                // fillPattern3,
                                // fillPattern4
                            ],
                            hoverBorderColor: '#fff', //마우스 오버 시 효과 없앰
                            hoverColor: '#fff' //마우스 오버 시 효과 없앰
                        }],

                        labels: [
                            '주식',
                            '채권',
                            // '장회파생',
                            // '유동성',
                            // '기타'
                        ]
                    },
                    options: {
                        elements: {
                            arc: {
                                borderWidth: 0 // 원형 차트 stroke
                            }
                        },
                        tooltips: {
                            displayColors: false, //툴팁 이미지 로 되어 있어 컬러값이 없음
                            enabled: false
                        },
                        cutoutPercentage: 75 // 가운데 원의 비율

                    }
                };


                oSelf.$target.chartJs(configOpt);
            }
        }
    };


    ns.chartJs = ns.chartJs || {};
    ns.chartJs = function(element, options) {
        var defOpt = {
            options: {
                maintainAspectRatio: false, //리사이즈 시  사이즈 변경
                responsive: false, //리사이즈 시  사이즈 변경
                animation: {
                    duration: 0, //애니메이션 비활성화
                },
                legend: {
                    display: false, //커스텀
                }
            }
        };
        this.$target = $(element);

        this.options = $.extend(true, defOpt, options);


        this.init();

    };

    ns.chartJs.prototype = {
        constructor: ns.chartJs,
        init: function() {
            this._setElement();
        },
        _setElement: function() {
            this.myChart = new Chart(this.$target, this.options);
        }
    }

    $.fn.chartJs = function(options) {
        return this.each(function() {
            if (!$.data(this, "plugin_chartJs")) {
                $.data(this, "plugin_chartJs", new ns.chartJs(this, options));
            }
        });
    };


    ns.init();
    return ns;
}(window.COMMON || {}, jQuery));
