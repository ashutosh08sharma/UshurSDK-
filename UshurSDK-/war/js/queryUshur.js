function stats() {
    startushur = new UshurApi();
    console.log("initialised");
    var filterCmd = "getSids,getCounts";
    var campaignId = "StudentFeedback";
    var UeTag = "UeTag_340324";
    var userPhoneNo = "+14088267701";
    startushur.queryUshur(filterCmd, campaignId, UeTag, userPhoneNo, function (err, response) {
        if (err == null) {
            var resp = response;
            console.log("Response" + resp);
            countUniv = resp[0];
            countCourse = resp[1];
            countRecommended = resp[2];
            countGood = resp[3];
            countAverage = resp[4];
            countPoor = resp[5];
            courseEx = resp[6];
            courseVgd = resp[7];
            coursegd = resp[8];
            courseAvg = resp[9];
            coursePoor = resp[10];
            console.log("init called");
            console.log("count called " + countUniv + countAverage + countCourse + countGood + countPoor + countRecommended);


            var testdata = [
                {key: "Recommended", y: countRecommended, color: "#5F5"},
                {key: "Good", y: countGood},
                {key: "Average", y: countAverage},
                {key: "Poor", y: countPoor}
            ];
            var testdata2 = [
                {key: "Rate University", y: countUniv},
                {key: "Rate Course", y: countCourse}
            ];

            var testdata3 = [
                {key: "Excellent", y: courseEx, color: "#5F5"},
                {key: "Very Good", y: courseVgd},
                {key: "Good", y: coursegd},
                {key: "Average", y: courseAvg},
                {key: "Poor", y: countPoor}
            ];
            var height = 390;
            var width = 390;

            nv.addGraph(function () {
                var chart = nv.models.pieChart()
                    .x(function (d) {
                        return d.key
                    })
                    .y(function (d) {
                        return d.y
                    })
                    .width(width)
                    .height(height)
                    .showTooltipPercent(true);
                d3.select("#test1")
                    .datum(testdata2)
                    .transition().duration(1200)
                    .attr('width', width)
                    .attr('height', height)
                    .call(chart);

                return chart;
            });
            nv.addGraph(function () {
                var chart = nv.models.pieChart()
                    .x(function (d) {
                        return d.key
                    })
                    .y(function (d) {
                        return d.y
                    })
                    .width(width)
                    .height(height)
                    .showTooltipPercent(true);
                d3.select("#test2")
                    .datum(testdata)
                    .transition().duration(1200)
                    .attr('width', width)
                    .attr('height', height)
                    .call(chart);
                return chart;

            });

            nv.addGraph(function () {
                var chart = nv.models.pieChart()
                    .x(function (d) {
                        return d.key
                    })
                    .y(function (d) {
                        return d.y
                    })
                    .width(width)
                    .height(height)
                    .showTooltipPercent(true);
                d3.select("#test3")
                    .datum(testdata3)
                    .transition().duration(1200)
                    .attr('width', width)
                    .attr('height', height)
                    .call(chart);
                return chart;
            });

        }
        $(document).ready(
            function () {
                $('#textuni').text(countUniv);
                $('#textCourse').text(countCourse);
                $('#textrec').text(countRecommended);
                $('#textgd').text(countGood);
                $('#textavg').text(countAverage);
                $('#textpoor').text(countPoor);
                $('#textCrec').text(countRecommended);
                $('#textCvgd').text(courseVgd);
                $('#textCgd').text(coursegd);
                $('#textCavg').text(courseAvg);
                $('#textcpoor').text(coursePoor);
                $('.showDiv').show();

            }
        );

    });

}
