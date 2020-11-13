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
    createTable($("#apdexTable"), {"supportsControllersDiscrimination": true, "overall": {"data": [0.783601525439494, 500, 1500, "Total"], "isController": false}, "titles": ["Apdex", "T (Toleration threshold)", "F (Frustration threshold)", "Label"], "items": [{"data": [0.7604938271604939, 500, 1500, "authors POST"], "isController": false}, {"data": [0.889294403892944, 500, 1500, "activities DELETE "], "isController": false}, {"data": [0.8743386243386243, 500, 1500, "users DELETE"], "isController": false}, {"data": [0.7951653944020356, 500, 1500, "coverPhotos all GET"], "isController": false}, {"data": [0.8461538461538461, 500, 1500, "coverPhotosCoverPhotosForBook  GET"], "isController": false}, {"data": [0.8115763546798029, 500, 1500, "authors all GET"], "isController": false}, {"data": [0.7418952618453866, 500, 1500, "authors DELETE"], "isController": false}, {"data": [0.8795336787564767, 500, 1500, "users all GET"], "isController": false}, {"data": [0.6594936708860759, 500, 1500, "books PUT"], "isController": false}, {"data": [0.7106598984771574, 500, 1500, "books POST"], "isController": false}, {"data": [0.8883610451306413, 500, 1500, "activities GET"], "isController": false}, {"data": [0.8485576923076923, 500, 1500, "activities PUT "], "isController": false}, {"data": [0.7182044887780549, 500, 1500, "authors PUT"], "isController": false}, {"data": [0.5665829145728644, 500, 1500, "books GET"], "isController": false}, {"data": [0.7938931297709924, 500, 1500, "books DELETE"], "isController": false}, {"data": [0.7951030927835051, 500, 1500, "coverPhotos POST"], "isController": false}, {"data": [0.8284960422163589, 500, 1500, "users PUT"], "isController": false}, {"data": [0.8468586387434555, 500, 1500, "users POST"], "isController": false}, {"data": [0.8341523341523341, 500, 1500, "authors GET"], "isController": false}, {"data": [0.8958333333333334, 500, 1500, "users GET"], "isController": false}, {"data": [0.8797619047619047, 500, 1500, "activities POST"], "isController": false}, {"data": [0.8316326530612245, 500, 1500, "coverPhotos GET"], "isController": false}, {"data": [0.2543640897755611, 500, 1500, "books all GET"], "isController": false}, {"data": [0.8808290155440415, 500, 1500, "coverPhotos DELETE"], "isController": false}, {"data": [0.8, 500, 1500, "coverPhotos PUT"], "isController": false}, {"data": [0.68, 500, 1500, "activities all GET"], "isController": false}, {"data": [0.8569682151589242, 500, 1500, "authorsAuthorsForBook GET "], "isController": false}]}, function(index, item){
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
    createTable($("#statisticsTable"), {"supportsControllersDiscrimination": true, "overall": {"data": ["Total", 10751, 0, 0.0, 557.2705794809801, 72, 7507, 1259.0, 1757.3999999999996, 2823.4799999999996, 89.19771011366464, 3229.9934566342404, 19.68652124989629], "isController": false}, "titles": ["Label", "#Samples", "KO", "Error %", "Average", "Min", "Max", "90th pct", "95th pct", "99th pct", "Transactions\/s", "Received", "Sent"], "items": [{"data": ["authors POST", 405, 0, 0.0, 592.9851851851855, 79, 3707, 1413.400000000001, 1750.5999999999995, 2711.66, 3.4745457353168274, 1.0728933421698323, 0.9609206768715362], "isController": false}, {"data": ["activities DELETE ", 411, 0, 0.0, 358.9683698296837, 77, 1595, 833.0000000000005, 1127.1999999999998, 1358.1999999999998, 3.5052109096491377, 0.7222651386093438, 0.68495297868303], "isController": false}, {"data": ["users DELETE", 378, 0, 0.0, 374.9312169312171, 75, 2365, 752.0000000000002, 1053.1500000000005, 1538.84, 3.598457803798372, 0.7414790982436099, 0.6856064662763578], "isController": false}, {"data": ["coverPhotos all GET", 393, 0, 0.0, 520.2290076335875, 95, 2663, 955.0000000000003, 1421.3999999999996, 1970.46, 3.6232552136153267, 73.381533081219, 0.6262853250096805], "isController": false}, {"data": ["coverPhotosCoverPhotosForBook  GET", 390, 0, 0.0, 447.47179487179517, 84, 2489, 1042.9000000000017, 1276.85, 2145.3699999999976, 3.6512751376249857, 1.277946298168745, 0.6279194841169532], "isController": false}, {"data": ["authors all GET", 406, 0, 0.0, 492.6108374384237, 149, 2222, 923.3, 1144.65, 1896.7400000000002, 3.4859659817802466, 159.80058829700687, 0.5889376121562331], "isController": false}, {"data": ["authors DELETE", 401, 0, 0.0, 629.9625935162089, 76, 3825, 1379.8000000000002, 1825.7999999999986, 3697.6400000000067, 3.476979103442296, 0.7164478426038325, 0.6692497209095639], "isController": false}, {"data": ["users all GET", 386, 0, 0.0, 384.940414507772, 78, 2654, 843.7000000000003, 1252.7999999999993, 2213.209999999999, 3.6496005294757246, 2.7942254053798514, 0.6094547759183094], "isController": false}, {"data": ["books PUT", 395, 0, 0.0, 805.060759493671, 88, 4848, 1821.0000000000007, 2537.0, 3476.800000000003, 3.465915572051559, 1.3643529349504682, 1.2766853562873464], "isController": false}, {"data": ["books POST", 394, 0, 0.0, 702.6345177664972, 86, 3350, 1668.0, 2100.5, 3077.2500000000014, 3.5394096192888838, 1.39327583757793, 1.320690288744857], "isController": false}, {"data": ["activities GET", 421, 0, 0.0, 344.83847980997615, 72, 1803, 662.8, 1040.099999999999, 1553.4599999999998, 3.570065719737121, 1.2258436903752385, 0.6209256412974348], "isController": false}, {"data": ["activities PUT ", 416, 0, 0.0, 420.60336538461536, 76, 3133, 957.9000000000001, 1322.2499999999955, 2312.759999999999, 3.5435015928721105, 1.198389040379734, 1.0672329649994037], "isController": false}, {"data": ["authors PUT", 401, 0, 0.0, 696.9376558603499, 84, 4854, 1615.0, 1999.3999999999992, 3464.2400000000007, 3.4760447638283303, 1.0733629107757388, 0.9447076730870918], "isController": false}, {"data": ["books GET", 398, 0, 0.0, 914.4271356783917, 149, 4630, 1746.6000000000008, 2351.149999999997, 3339.869999999999, 3.449860011961826, 16.21539677453258, 0.5831678063267659], "isController": false}, {"data": ["books DELETE", 393, 0, 0.0, 520.9185750636124, 86, 2983, 1148.8000000000004, 1689.2999999999986, 2338.2400000000002, 3.5943259038403497, 0.7406277008889783, 0.6848146875771682], "isController": false}, {"data": ["coverPhotos POST", 388, 0, 0.0, 498.01546391752566, 80, 2466, 1064.4, 1500.8499999999997, 2100.250000000001, 3.6602047073251263, 1.1055640064147918, 0.9697360973538984], "isController": false}, {"data": ["users PUT", 379, 0, 0.0, 444.4907651715039, 75, 2507, 908.0, 1348.0, 2056.999999999998, 3.6049232408164817, 1.0987280220956113, 0.9477023816034774], "isController": false}, {"data": ["users POST", 382, 0, 0.0, 422.3350785340314, 77, 3133, 972.7999999999998, 1348.249999999995, 2473.450000000001, 3.629039919439114, 1.1060756433945773, 0.9572283029488324], "isController": false}, {"data": ["authors GET", 407, 0, 0.0, 431.30712530712543, 77, 2143, 959.0, 1183.1999999999994, 1692.0400000000009, 3.4786324786324783, 1.1220452724358974, 0.5948267227564102], "isController": false}, {"data": ["users GET", 384, 0, 0.0, 353.1067708333335, 75, 2426, 708.5, 1141.5, 1781.0999999999992, 3.6375348123448834, 1.102261411107743, 0.6148959833184927], "isController": false}, {"data": ["activities POST", 420, 0, 0.0, 375.07857142857137, 77, 3457, 865.0, 1239.95, 1855.8800000000035, 3.566031007488665, 1.2059565984309464, 1.070140964356671], "isController": false}, {"data": ["coverPhotos GET", 392, 0, 0.0, 470.09948979591843, 85, 2953, 879.1999999999999, 1293.7499999999964, 2282.08, 3.6479029211140994, 1.2696339417824472, 0.6380249531216556], "isController": false}, {"data": ["books all GET", 401, 0, 0.0, 1781.8054862842885, 513, 7507, 2913.2000000000007, 4235.699999999999, 6320.860000000004, 3.4468235071644076, 3066.1408365987545, 0.5755925973878063], "isController": false}, {"data": ["coverPhotos DELETE", 386, 0, 0.0, 373.2590673575126, 77, 2490, 739.6, 1048.6, 1885.0999999999974, 3.6649860901434663, 0.7551875634963587, 0.7197490291584774], "isController": false}, {"data": ["coverPhotos PUT", 390, 0, 0.0, 509.3384615384614, 84, 3476, 1129.1000000000006, 1556.5, 2798.399999999996, 3.662350101888458, 1.1062157094864258, 0.95993629623717], "isController": false}, {"data": ["activities all GET", 425, 0, 0.0, 740.5294117647055, 298, 2470, 1804.8000000000002, 2226.7, 2407.8, 3.535303121048779, 10.72097730595345, 0.6076302239302589], "isController": false}, {"data": ["authorsAuthorsForBook GET ", 409, 0, 0.0, 417.0929095354523, 76, 3184, 895.0, 1304.0, 1942.2999999999997, 3.491369743738583, 1.6508096067087223, 0.6038221668900347], "isController": false}]}, function(index, item){
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
    createTable($("#top5ErrorsBySamplerTable"), {"supportsControllersDiscrimination": false, "overall": {"data": ["Total", 10751, 0, null, null, null, null, null, null, null, null, null, null], "isController": false}, "titles": ["Sample", "#Samples", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors"], "items": [{"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}]}, function(index, item){
        return item;
    }, [[0, 0]], 0);

});
