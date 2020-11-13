/*
   Licensed to the Apache Software Foundation (ASF) under one or more
   contributor license agreements.  See the NOTICE file distributed with
   this work for additional information regarding copyright ownership.
   The ASF licenses this file to You under the Apache License, Version 2.0
   (the "License"); you may not use this file except in compliance with
   the License.  You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/
var showControllersOnly = false;
var seriesFilter = "";
var filtersOnlySampleSeries = true;

/*
 * Add header in statistics table to group metrics by category
 * format
 *
 */
function summaryTableHeader(header) {
    var newRow = header.insertRow(-1);
    newRow.className = "tablesorter-no-sort";
    var cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 1;
    cell.innerHTML = "Requests";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 3;
    cell.innerHTML = "Executions";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 6;
    cell.innerHTML = "Response Times (ms)";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 1;
    cell.innerHTML = "Throughput";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 2;
    cell.innerHTML = "Network (KB/sec)";
    newRow.appendChild(cell);
}

/*
 * Populates the table identified by id parameter with the specified data and
 * format
 *
 */
function createTable(table, info, formatter, defaultSorts, seriesIndex, headerCreator) {
    var tableRef = table[0];

    // Create header and populate it with data.titles array
    var header = tableRef.createTHead();

    // Call callback is available
    if(headerCreator) {
        headerCreator(header);
    }

    var newRow = header.insertRow(-1);
    for (var index = 0; index < info.titles.length; index++) {
        var cell = document.createElement('th');
        cell.innerHTML = info.titles[index];
        newRow.appendChild(cell);
    }

    var tBody;

    // Create overall body if defined
    if(info.overall){
        tBody = document.createElement('tbody');
        tBody.className = "tablesorter-no-sort";
        tableRef.appendChild(tBody);
        var newRow = tBody.insertRow(-1);
        var data = info.overall.data;
        for(var index=0;index < data.length; index++){
            var cell = newRow.insertCell(-1);
            cell.innerHTML = formatter ? formatter(index, data[index]): data[index];
        }
    }

    // Create regular body
    tBody = document.createElement('tbody');
    tableRef.appendChild(tBody);

    var regexp;
    if(seriesFilter) {
        regexp = new RegExp(seriesFilter, 'i');
    }
    // Populate body with data.items array
    for(var index=0; index < info.items.length; index++){
        var item = info.items[index];
        if((!regexp || filtersOnlySampleSeries && !info.supportsControllersDiscrimination || regexp.test(item.data[seriesIndex]))
                &&
                (!showControllersOnly || !info.supportsControllersDiscrimination || item.isController)){
            if(item.data.length > 0) {
                var newRow = tBody.insertRow(-1);
                for(var col=0; col < item.data.length; col++){
                    var cell = newRow.insertCell(-1);
                    cell.innerHTML = formatter ? formatter(col, item.data[col]) : item.data[col];
                }
            }
        }
    }

    // Add support of columns sort
    table.tablesorter({sortList : defaultSorts});
}

$(document).ready(function() {

    // Customize table sorter default options
    $.extend( $.tablesorter.defaults, {
        theme: 'blue',
        cssInfoBlock: "tablesorter-no-sort",
        widthFixed: true,
        widgets: ['zebra']
    });

    var data = {"OkPercent": 100.0, "KoPercent": 0.0};
    var dataset = [
        {
            "label" : "KO",
            "data" : data.KoPercent,
            "color" : "#FF6347"
        },
        {
            "label" : "OK",
            "data" : data.OkPercent,
            "color" : "#9ACD32"
        }];
    $.plot($("#flot-requests-summary"), dataset, {
        series : {
            pie : {
                show : true,
                radius : 1,
                label : {
                    show : true,
                    radius : 3 / 4,
                    formatter : function(label, series) {
                        return '<div style="font-size:8pt;text-align:center;padding:2px;color:white;">'
                            + label
                            + '<br/>'
                            + Math.round10(series.percent, -2)
                            + '%</div>';
                    },
                    background : {
                        opacity : 0.5,
                        color : '#000'
                    }
                }
            }
        },
        legend : {
            show : true
        }
    });

    // Creates APDEX table
    createTable($("#apdexTable"), {"supportsControllersDiscrimination": true, "overall": {"data": [0.6305555555555555, 500, 1500, "Total"], "isController": false}, "titles": ["Apdex", "T (Toleration threshold)", "F (Frustration threshold)", "Label"], "items": [{"data": [0.62, 500, 1500, "authors POST"], "isController": false}, {"data": [0.685, 500, 1500, "activities DELETE "], "isController": false}, {"data": [0.915, 500, 1500, "users DELETE"], "isController": false}, {"data": [0.57, 500, 1500, "coverPhotos all GET"], "isController": false}, {"data": [0.74, 500, 1500, "coverPhotosCoverPhotosForBook  GET"], "isController": false}, {"data": [0.675, 500, 1500, "authors all GET"], "isController": false}, {"data": [0.53, 500, 1500, "authors DELETE"], "isController": false}, {"data": [0.795, 500, 1500, "users all GET"], "isController": false}, {"data": [0.32, 500, 1500, "books PUT"], "isController": false}, {"data": [0.405, 500, 1500, "books POST"], "isController": false}, {"data": [0.685, 500, 1500, "activities GET"], "isController": false}, {"data": [0.64, 500, 1500, "activities PUT "], "isController": false}, {"data": [0.525, 500, 1500, "authors PUT"], "isController": false}, {"data": [0.225, 500, 1500, "books GET"], "isController": false}, {"data": [0.47, 500, 1500, "books DELETE"], "isController": false}, {"data": [0.85, 500, 1500, "coverPhotos POST"], "isController": false}, {"data": [0.845, 500, 1500, "users PUT"], "isController": false}, {"data": [0.83, 500, 1500, "users POST"], "isController": false}, {"data": [0.65, 500, 1500, "authors GET"], "isController": false}, {"data": [0.805, 500, 1500, "users GET"], "isController": false}, {"data": [0.655, 500, 1500, "activities POST"], "isController": false}, {"data": [0.65, 500, 1500, "coverPhotos GET"], "isController": false}, {"data": [0.07, 500, 1500, "books all GET"], "isController": false}, {"data": [0.8, 500, 1500, "coverPhotos DELETE"], "isController": false}, {"data": [0.75, 500, 1500, "coverPhotos PUT"], "isController": false}, {"data": [0.585, 500, 1500, "activities all GET"], "isController": false}, {"data": [0.735, 500, 1500, "authorsAuthorsForBook GET "], "isController": false}]}, function(index, item){
        switch(index){
            case 0:
                item = item.toFixed(3);
                break;
            case 1:
            case 2:
                item = formatDuration(item);
                break;
        }
        return item;
    }, [[0, 0]], 3);

    // Create statistics table
    createTable($("#statisticsTable"), {"supportsControllersDiscrimination": true, "overall": {"data": ["Total", 2700, 0, 0.0, 895.7848148148145, 72, 8033, 2033.9, 2909.95, 5362.949999999999, 95.87727708533077, 3452.1720184275237, 21.166309901104363], "isController": false}, "titles": ["Label", "#Samples", "KO", "Error %", "Average", "Min", "Max", "90th pct", "95th pct", "99th pct", "Transactions\/s", "Received", "Sent"], "items": [{"data": ["authors POST", 100, 0, 0.0, 841.1999999999999, 81, 5415, 1595.9, 2350.849999999997, 5397.599999999991, 5.364806866952789, 1.6565936829399142, 1.4837043991416308], "isController": false}, {"data": ["activities DELETE ", 100, 0, 0.0, 567.4000000000001, 73, 1856, 1183.4, 1412.999999999998, 1854.7699999999993, 10.726161106939827, 2.21017577496514, 2.0960008178697844], "isController": false}, {"data": ["users DELETE", 100, 0, 0.0, 311.7000000000001, 72, 5363, 684.9, 1191.8499999999958, 5334.789999999985, 6.5436461196178515, 1.3483489562884439, 1.2467435136107838], "isController": false}, {"data": ["coverPhotos all GET", 100, 0, 0.0, 989.8700000000003, 146, 6253, 1921.3000000000004, 3086.75, 6239.049999999993, 4.564125969876769, 92.43692235280693, 0.7889163053400274], "isController": false}, {"data": ["coverPhotosCoverPhotosForBook  GET", 100, 0, 0.0, 665.2499999999998, 77, 5330, 1649.3000000000006, 2085.2999999999997, 5308.909999999989, 4.903643407051439, 1.7162751924680038, 0.8432925820134359], "isController": false}, {"data": ["authors all GET", 100, 0, 0.0, 751.3200000000002, 164, 6196, 1302.7000000000003, 1895.499999999999, 6167.859999999986, 5.8230943923601, 273.2874870800093, 0.9837845018342748], "isController": false}, {"data": ["authors DELETE", 100, 0, 0.0, 1181.4500000000003, 79, 6363, 2302.5, 3027.2499999999995, 6362.59, 4.608932110430014, 0.949692065723372, 0.8871294130524958], "isController": false}, {"data": ["users all GET", 100, 0, 0.0, 664.8900000000007, 75, 6362, 2187.5000000000027, 2952.149999999999, 6358.219999999998, 5.422111370167544, 4.151304017784525, 0.9054502385729002], "isController": false}, {"data": ["books PUT", 100, 0, 0.0, 1634.6299999999997, 182, 7125, 2940.7000000000007, 5240.8499999999985, 7116.979999999996, 4.23477598035064, 1.667029489921233, 1.5599194333869737], "isController": false}, {"data": ["books POST", 100, 0, 0.0, 1194.5199999999995, 241, 3168, 2112.1, 2847.8499999999935, 3165.829999999999, 4.35028494366381, 1.7124998640535956, 1.6232850361073652], "isController": false}, {"data": ["activities GET", 100, 0, 0.0, 629.03, 72, 1758, 1401.8, 1510.6499999999999, 1757.95, 15.89319771137953, 5.456147190877305, 2.764236828512397], "isController": false}, {"data": ["activities PUT ", 100, 0, 0.0, 688.83, 73, 1751, 1372.5000000000002, 1548.1999999999998, 1750.8899999999999, 12.229423994129878, 4.135790555827321, 3.683158554482084], "isController": false}, {"data": ["authors PUT", 100, 0, 0.0, 1140.8000000000002, 73, 6315, 2125.0, 3078.4999999999977, 6305.519999999995, 4.749916876454662, 1.4667223792333635, 1.290919791716145], "isController": false}, {"data": ["books GET", 100, 0, 0.0, 1833.0800000000004, 293, 4016, 3114.4, 3279.5499999999993, 4013.0899999999983, 4.2718612499466015, 19.712720668332693, 0.7221281077790593], "isController": false}, {"data": ["books DELETE", 100, 0, 0.0, 1174.6300000000006, 88, 5336, 2850.4000000000033, 3555.9499999999935, 5322.079999999993, 4.407616361071932, 0.9082100119005643, 0.8397714375440762], "isController": false}, {"data": ["coverPhotos POST", 100, 0, 0.0, 501.62999999999965, 80, 2994, 1283.3, 1778.6499999999971, 2992.129999999999, 5.2186619350798455, 1.5763009145705043, 1.3826396318234004], "isController": false}, {"data": ["users PUT", 100, 0, 0.0, 540.94, 72, 5739, 1685.4, 2889.599999999989, 5734.989999999998, 6.101653548111538, 1.8596934300445422, 1.60406751479651], "isController": false}, {"data": ["users POST", 100, 0, 0.0, 489.0299999999997, 73, 3064, 1713.3000000000002, 2397.0999999999963, 3063.6, 5.809900069718801, 1.7707713005461305, 1.5324746179990705], "isController": false}, {"data": ["authors GET", 100, 0, 0.0, 645.8499999999999, 75, 2213, 1492.4, 1715.8999999999987, 2209.389999999998, 9.04649900488511, 2.9180259973765152, 1.546915991948616], "isController": false}, {"data": ["users GET", 100, 0, 0.0, 523.2899999999998, 73, 2959, 1684.6000000000001, 2403.949999999999, 2954.0799999999977, 5.625879043600563, 1.704795182841069, 0.9510152953586498], "isController": false}, {"data": ["activities POST", 100, 0, 0.0, 700.7999999999997, 72, 1737, 1436.9, 1644.6499999999999, 1736.6499999999999, 13.066771200836273, 4.4189676434078144, 3.9213074121259637], "isController": false}, {"data": ["coverPhotos GET", 100, 0, 0.0, 806.8599999999996, 80, 6316, 1890.800000000001, 2552.9499999999975, 6305.529999999995, 4.8093108257586685, 1.6738656038089743, 0.841159735247439], "isController": false}, {"data": ["books all GET", 100, 0, 0.0, 2933.78, 549, 7403, 5166.7, 7109.79999999999, 7401.82, 4.3478260869565215, 3870.0070482336955, 0.7260529891304348], "isController": false}, {"data": ["coverPhotos DELETE", 100, 0, 0.0, 632.1600000000004, 72, 5326, 1670.4000000000015, 2450.899999999999, 5312.509999999993, 5.2554130754677315, 1.0829024989489175, 1.032093329566954], "isController": false}, {"data": ["coverPhotos PUT", 100, 0, 0.0, 731.4099999999996, 83, 8033, 1695.5000000000002, 2319.099999999999, 8016.469999999992, 5.037529595486373, 1.5215897498866557, 1.3203837338169362], "isController": false}, {"data": ["activities all GET", 100, 0, 0.0, 895.53, 295, 1986, 1414.8000000000002, 1591.3999999999994, 1985.0899999999995, 15.489467162329616, 46.93278297320322, 2.6622521685254026], "isController": false}, {"data": ["authorsAuthorsForBook GET ", 100, 0, 0.0, 516.31, 74, 1864, 1202.2, 1414.9999999999982, 1861.3099999999986, 10.469011725293132, 5.000691118352178, 1.810607398974037], "isController": false}]}, function(index, item){
        switch(index){
            // Errors pct
            case 3:
                item = item.toFixed(2) + '%';
                break;
            // Mean
            case 4:
            // Mean
            case 7:
            // Percentile 1
            case 8:
            // Percentile 2
            case 9:
            // Percentile 3
            case 10:
            // Throughput
            case 11:
            // Kbytes/s
            case 12:
            // Sent Kbytes/s
                item = item.toFixed(2);
                break;
        }
        return item;
    }, [[0, 0]], 0, summaryTableHeader);

    // Create error table
    createTable($("#errorsTable"), {"supportsControllersDiscrimination": false, "titles": ["Type of error", "Number of errors", "% in errors", "% in all samples"], "items": []}, function(index, item){
        switch(index){
            case 2:
            case 3:
                item = item.toFixed(2) + '%';
                break;
        }
        return item;
    }, [[1, 1]]);

        // Create top5 errors by sampler
    createTable($("#top5ErrorsBySamplerTable"), {"supportsControllersDiscrimination": false, "overall": {"data": ["Total", 2700, 0, null, null, null, null, null, null, null, null, null, null], "isController": false}, "titles": ["Sample", "#Samples", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors"], "items": [{"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}]}, function(index, item){
        return item;
    }, [[0, 0]], 0);

});
