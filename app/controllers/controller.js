/**
 * Created by NE_LEADER on 2015. 10. 5..
 */

function mainCtrl($scope) {
    //$('#page-wrapper').removeClass('nav-small');
}

function emailCtrl($scope) {
    if (!$('#page-wrapper').hasClass('nav-small')) {
        $('#page-wrapper').addClass('nav-small');
    }
}

function weeklyErrorCtrl($scope, $http) {

    /*
        http request
     */
    $http({
        method: 'GET',
        url: 'http://api2.honeyqa.io/appruncount/weekly/4'
    }).then(function successCallback(response) {
        obj = JSON.parse(JSON.stringify(response.data));
        console.log(obj[0].date);

        //Flot Chart
        //Website traffic chart
        var init = {
                data: [[ 0, obj[0].error_count], [ 1, obj[1].error_count], [ 2, obj[2].error_count], [3, obj[3].error_count],
                            [4, obj[4].error_count], [5,obj[5].error_count], [6, obj[6].error_count], [7, obj[7].error_count]],
                label: "Visitor"
            },
            options = {
                series: {
                    lines: {
                        show: true,
                        fill: true,
                        fillColor: 'rgba(121,206,167,0.2)'
                    },
                    points: {
                        show: true,
                        radius: '4.5'
                    }
                },
                grid: {
                    hoverable: true,
                    clickable: true
                },
                colors: ["#37b494"]
            },
            plot;

        plot = $.plot($('#placeholder'), [init], options);

        $("#placeholder").bind("plotclick", function (event, pos, item) {
            if (item) {
                $("#clickdata").text(" - click point " + item.dataIndex + " in " + item.series.label);
                plot.highlight(item.series, item.datapoint);
            }
        });

        var animate = function () {
            $('#placeholder').animate( {tabIndex: 0}, {
                duration: 3000,
                step: function ( now, fx ) {
                    var r = $.map( init.data, function ( o ) {
                        return [[ o[0], o[1] * fx.pos ]];
                    });
                    plot.setData( [{ data: r }] );
                    plot.draw();
                }
            });
        }
        animate();

    }, function errorCallback(response) {
        console.log('error :' + response);
    });
}

function easyChartCtrl($scope) {
    $scope.percent = 65;
    $scope.options = {
        barColor: '#03a9f4',
        trackColor: '#f2f2f2',
        scaleColor: false,
        lineWidth: 8,
        size: 130,
        animate: 1500,
        onStep: function(from, to, percent) {
            $(this.el).find('.percent').text(Math.round(percent));
        },
    };

    $scope.optionsGreen = angular.copy($scope.options);
    $scope.optionsGreen.barColor = '#8bc34a';

    $scope.optionsRed = angular.copy($scope.options);
    $scope.optionsRed.barColor = '#e84e40';

    $scope.optionsYellow = angular.copy($scope.options);
    $scope.optionsYellow.barColor = '#ffc107';

    $scope.optionsPurple = angular.copy($scope.options);
    $scope.optionsPurple.barColor = '#9c27b0';

    $scope.optionsGray = angular.copy($scope.options);
    $scope.optionsGray.barColor = '#90a4ae';
};

function insight_donut($scope) {
    graphDonut = Morris.Donut({
        element: 'hero-donut',
        data: [
            {label: 'Unhandled', value: 25 },
            {label: 'Critical', value: 40 },
            {label: 'Native', value: 25 },
            {label: 'etc', value: 10 }
        ],
        colors: ['#8bc34a', '#ffc107', '#e84e40', '#03a9f4', '#9c27b0', '#90a4ae'],
        formatter: function (y) { return y + "%" },
        resize: true
    });
}

function insight_error_list($scope) {
    var table = $('#table-example').dataTable({
        'info': false,
        'sDom': 'lTfr<"clearfix">tip',
        'oTableTools': {
            'aButtons': [
                {
                    'sExtends':    'collection',
                    'sButtonText': '<i class="fa fa-cloud-download"></i>&nbsp;&nbsp;&nbsp;<i class="fa fa-caret-down"></i>',
                    'aButtons':    [ 'csv', 'xls', 'pdf', 'copy', 'print' ]
                }
            ]
        }
    });

    var tt = new $.fn.dataTable.TableTools( table );
    $( tt.fnContainer() ).insertBefore('div.dataTables_wrapper');
}


function appver_session_graph($scope) {
    graphArea2 = Morris.Area({
        element: 'hero-area-1',
        data: [
            {period: '2010 Q1', iphone: 2666, ipad: null, itouch: 2647},
            {period: '2010 Q2', iphone: 2778, ipad: 2294, itouch: 2441},
            {period: '2010 Q3', iphone: 4912, ipad: 1969, itouch: 2501},
            {period: '2010 Q4', iphone: 3767, ipad: 3597, itouch: 5689},
            {period: '2011 Q1', iphone: 6810, ipad: 1914, itouch: 2293},
            {period: '2011 Q2', iphone: 5670, ipad: 4293, itouch: 1881},
            {period: '2011 Q3', iphone: 4820, ipad: 3795, itouch: 1588},
            {period: '2011 Q4', iphone: 15073, ipad: 5967, itouch: 5175},
            {period: '2012 Q1', iphone: 10687, ipad: 4460, itouch: 2028},
            {period: '2012 Q2', iphone: 8432, ipad: 5713, itouch: 1791}
        ],
        lineColors: ['#0288d1', '#607d8b', '#689f38', '#8e44ad', '#c0392b', '#f39c12'],
        xkey: 'period',
        ykeys: ['iphone', 'ipad', 'itouch'],
        labels: ['iPhone', 'iPad', 'iPod Touch'],
        pointSize: 2,
        hideHover: 'auto',
        resize: true
    });
}

function appver_error_graph($scope) {
    graphArea2 = Morris.Area({
        element: 'hero-area-2',
        data: [
            {period: '2010 Q1', iphone: 2666, ipad: null, itouch: 2647},
            {period: '2010 Q2', iphone: 2778, ipad: 2294, itouch: 2441},
            {period: '2010 Q3', iphone: 4912, ipad: 1969, itouch: 2501},
            {period: '2010 Q4', iphone: 3767, ipad: 3597, itouch: 5689},
            {period: '2011 Q1', iphone: 6810, ipad: 1914, itouch: 2293},
            {period: '2011 Q2', iphone: 5670, ipad: 4293, itouch: 1881},
            {period: '2011 Q3', iphone: 4820, ipad: 3795, itouch: 1588},
            {period: '2011 Q4', iphone: 15073, ipad: 5967, itouch: 5175},
            {period: '2012 Q1', iphone: 10687, ipad: 4460, itouch: 2028},
            {period: '2012 Q2', iphone: 8432, ipad: 5713, itouch: 1791}
        ],
        lineColors: ['#0288d1', '#607d8b', '#689f38', '#8e44ad', '#c0392b', '#f39c12'],
        xkey: 'period',
        ykeys: ['iphone', 'ipad', 'itouch'],
        labels: ['iPhone', 'iPad', 'iPod Touch'],
        pointSize: 2,
        hideHover: 'auto',
        resize: true
    });
}

function dashboardFlotCtrl($scope) {
    var data1 = [
        [gd(2015, 1, 1), 838], [gd(2015, 1, 2), 749], [gd(2015, 1, 3), 634], [gd(2015, 1, 4), 1080], [gd(2015, 1, 5), 850], [gd(2015, 1, 6), 465], [gd(2015, 1, 7), 453], [gd(2015, 1, 8), 646], [gd(2015, 1, 9), 738], [gd(2015, 1, 10), 899], [gd(2015, 1, 11), 830], [gd(2015, 1, 12), 789]
    ];

    var data2 = [
        [gd(2015, 1, 1), 342], [gd(2015, 1, 2), 721], [gd(2015, 1, 3), 493], [gd(2015, 1, 4), 403], [gd(2015, 1, 5), 657], [gd(2015, 1, 6), 782], [gd(2015, 1, 7), 609], [gd(2015, 1, 8), 543], [gd(2015, 1, 9), 599], [gd(2015, 1, 10), 359], [gd(2015, 1, 11), 783], [gd(2015, 1, 12), 680]
    ];

    var series = new Array();

    series.push({
        data: data1,
        bars: {
            show : true,
            barWidth: 24 * 60 * 60 * 12000,
            lineWidth: 1,
            fill: 1,
            align: 'center'
        },
        label: 'Revenues'
    });
    series.push({
        data: data2,
        color: '#e84e40',
        lines: {
            show : true,
            lineWidth: 3,
        },
        points: {
            fillColor: "#e84e40",
            fillColor: '#ffffff',
            pointWidth: 1,
            show: true
        },
        label: 'Orders'
    });

    $.plot("#graph-bar", series, {
        colors: ['#03a9f4', '#f1c40f', '#2ecc71', '#3498db', '#9b59b6', '#95a5a6'],
        grid: {
            tickColor: "#f2f2f2",
            borderWidth: 0,
            hoverable: true,
            clickable: true
        },
        legend: {
            noColumns: 1,
            labelBoxBorderColor: "#000000",
            position: "ne"
        },
        shadowSize: 0,
        xaxis: {
            mode: "time",
            tickSize: [1, "month"],
            tickLength: 0,
            // axisLabel: "Date",
            axisLabelUseCanvas: true,
            axisLabelFontSizePixels: 12,
            axisLabelFontFamily: 'Open Sans, sans-serif',
            axisLabelPadding: 10
        }
    });

    var previousPoint = null;
    $("#graph-bar").bind("plothover", function (event, pos, item) {
        if (item) {
            if (previousPoint != item.dataIndex) {

                previousPoint = item.dataIndex;

                $("#flot-tooltip").remove();
                var x = item.datapoint[0],
                    y = item.datapoint[1];

                showTooltip(item.pageX, item.pageY, item.series.label, y );
            }
        }
        else {
            $("#flot-tooltip").remove();
            previousPoint = [0,0,0];
        }
    });
}

function device_range() {
    //range slider
    $('.slider-range').noUiSlider({
        range: [1, 30],
        start: [10, 15],
        step: 5,
        connect: true,
        slide: function(){
            var values = $(this).val();

            $(this).next('span').text(
                'Term range: ' + values[0] + ' - ' + values[1]
            );
        },
        set: function(){
            var values = $(this).val();

            $(this).next('span').text(
                'Term range: ' + values[0] + ' - ' + values[1]
            );
        }
    });
    $('.slider-range').val([10, 15], true);
}

function device_rate_bar() {
    graphBar = Morris.Bar({
        element: 'device-bar',
        data: [
            {device: 'iPhone', geekbench: 136},
            {device: 'iPhone 3G', geekbench: 137},
            {device: 'iPhone 3GS', geekbench: 275},
            {device: 'iPhone 4', geekbench: 380},
            {device: 'iPhone 4S', geekbench: 655},
            {device: 'iPhone 5', geekbench: 1571}
        ],
        barColors: ['#8bc34a', '#e84e40', '#f39c12', '#3fcfbb', '#626f70', '#8f44ad'],
        xkey: 'device',
        ykeys: ['geekbench'],
        labels: ['Geekbench'],
        barRatio: 0.4,
        xLabelAngle: 35,
        hideHover: 'auto',
        resize: true
    });
}

function device_morris_circle() {
    $(".knob").knob({
        change : function (value) {
            //console.log("change : " + value);
        },
        release : function (value) {
            //console.log(this.$.attr('value'));
            console.log("release : " + value);
        },
        cancel : function () {
            console.log("cancel : ", this);
        },
        draw : function () {

            // "tron" case
            if(this.$.data('skin') == 'tron') {

                var a = this.angle(this.cv)  // Angle
                    , sa = this.startAngle		  // Previous start angle
                    , sat = this.startAngle		 // Start angle
                    , ea							// Previous end angle
                    , eat = sat + a				 // End angle
                    , r = 1;

                this.g.lineWidth = this.lineWidth;

                this.o.cursor
                && (sat = eat - 0.3)
                && (eat = eat + 0.3);

                if (this.o.displayPrevious) {
                    ea = this.startAngle + this.angle(this.v);
                    this.o.cursor
                    && (sa = ea - 0.3)
                    && (ea = ea + 0.3);
                    this.g.beginPath();
                    this.g.strokeStyle = this.pColor;
                    this.g.arc(this.xy, this.xy, this.radius - this.lineWidth, sa, ea, false);
                    this.g.stroke();
                }

                this.g.beginPath();
                this.g.strokeStyle = r ? this.o.fgColor : this.fgColor ;
                this.g.arc(this.xy, this.xy, this.radius - this.lineWidth, sat, eat, false);
                this.g.stroke();

                this.g.lineWidth = 2;
                this.g.beginPath();
                this.g.strokeStyle = this.o.fgColor;
                this.g.arc( this.xy, this.xy, this.radius - this.lineWidth + 1 + this.lineWidth * 2 / 3, 0, 2 * Math.PI, false);
                this.g.stroke();

                return false;
            }
        }
    });
}

function sdk_flot_donut() {
    // donut chart
    if ($('#graph-flot-donut').length) {
        var dataDonut = [
            { label: "3.0",  data: 10},
            { label: "4.0.2",  data: 30},
            { label: "4.1",  data: 90},
            { label: "4.2",  data: 70},
            { label: "5.0.1",  data: 80},
            { label: "6.0",  data: 110}
        ];

        $.plot('#graph-flot-donut', dataDonut, {
            series: {
                pie: {
                    show: true,
                    innerRadius: 0.5,
                    label: {
                        show: true,
                    }
                }
            },
            colors: ['#e84e40', '#ffc107', '#8bc34a', '#03a9f4', '#9c27b0', '#90a4ae'],
            legend: {
                show: false,
            }
        });
    }
}

function sdk_flot_bar() {
    graphBar = Morris.Bar({
        element: 'sdk-flot-bar',
        data: [
            {x: '3.0', y: 3, z: 2, a: 3},
            {x: '4.0.2', y: 3, z: 2, a: 3},
            {x: '4.1', y: 3, z: 2, a: 3},
            {x: '4.2', y: 3, z: 2, a: 3},
            {x: '5.0.1', y: 2, z: null, a: 1},
            {x: '6.0', y: 0, z: 2, a: 4},
        ],
        barColors: ['#8bc34a', '#ffc107', '#e84e40', '#03a9f4', '#9c27b0', '#90a4ae'],
        xkey: 'x',
        ykeys: ['y', 'z', 'a'],
        labels: ['Y', 'Z', 'A'],
        resize: true
    });
}

function country_map() {
    //WORLD MAP
    $('#world-map-example').vectorMap({
        map: 'world_merc_en',
        backgroundColor: '#ffffff',
        zoomOnScroll: false,
        regionStyle: {
            initial: {
                fill: '#e1e1e1',
                stroke: 'none',
                "stroke-width": 0,
                "stroke-opacity": 1
            },
            hover: {
                "fill-opacity": 0.8
            },
            selected: {
                fill: '#8dc859'
            },
            selectedHover: {
            }
        },
        markerStyle: {
            initial: {
                fill: '#e84e40',
                stroke: '#e84e40'
            }
        },
        markers: [
            {latLng: [38.35, -121.92], name: 'Los Angeles - 23'},
            {latLng: [39.36, -73.12], name: 'New York - 84'},
            {latLng: [50.49, -0.23], name: 'London - 43'},
            {latLng: [36.29, 138.54], name: 'Tokyo - 33'},
            {latLng: [37.02, 114.13], name: 'Beijing - 91'},
            {latLng: [-32.59, 150.21], name: 'Sydney - 22'},
        ],
        series: {
            regions: [{
                values: gdpData,
                scale: ['#6fc4fe', '#2980b9'],
                normalizeFunction: 'polynomial'
            }]
        },
        onRegionLabelShow: function(e, el, code){
            el.html(el.html()+' ('+gdpData[code]+')');
        }
    });
}

function class_flot_donut() {
    // donut chart
    if ($('#class_flot_donut').length) {
        var dataDonut = [
            { label: "3.0",  data: 10},
            { label: "4.0.2",  data: 30},
            { label: "4.1",  data: 90},
            { label: "4.2",  data: 70},
            { label: "5.0.1",  data: 80},
            { label: "6.0",  data: 110}
        ];

        $.plot('#class_flot_donut', dataDonut, {
            series: {
                pie: {
                    show: true,
                    innerRadius: 0.5,
                    label: {
                        show: true,
                    }
                }
            },
            colors: ['#e84e40', '#ffc107', '#8bc34a', '#03a9f4', '#9c27b0', '#90a4ae'],
            legend: {
                show: false,
            }
        });
    }
}

angular
    .module('honeyqa')
    .controller('mainCtrl', mainCtrl)
    .controller('emailCtrl', emailCtrl)
    .controller('easyChartCtrl', easyChartCtrl)
    .controller('dashboardFlotCtrl', dashboardFlotCtrl)
    .controller('weeklyErrorCtrl', weeklyErrorCtrl)
    .controller('insight_donut', insight_donut)
    .controller('insight_error_list', insight_error_list)
    .controller('appver_session_graph', appver_session_graph)
    .controller('appver_error_graph', appver_error_graph)
    .controller('device_range', device_range)
    .controller('device_rate_bar', device_rate_bar)
    .controller('device_morris_circle', device_morris_circle)
    .controller('sdk_flot_donut', sdk_flot_donut)
    .controller('sdk_flot_bar', sdk_flot_bar)
    .controller('country_map', country_map)
    .controller('class_flot_donut', class_flot_donut)
