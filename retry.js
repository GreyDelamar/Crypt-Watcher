
$(document).ready(function() {

  $('form').on('submit', function(e){
      e.preventDefault();
  });
  $.get("https://api.coinmarketcap.com/v1/ticker/")
    .then(function(Rates){
      for(i in Rates){
        var tr= $("<tr>");
        var td=$("<td>");
        $(".tablerow").append(tr);

        tr.append(td)
        td.text(Rates[i].rank)

        var td1=$("<td>");
        tr.append(td1)
        td1.text(Rates[i].name)

        var td2=$("<td>");
        tr.append(td2)
        td2.text("1 " + Rates[i].symbol)

        var td3=$("<td>")
        tr.append(td3)
        td3.text("$ " + Rates[i].price_usd)

        var td4=$("<td>")
        tr.append(td4)
        td4.text(Rates[i].percent_change_24h);
        // if(Rates[i].percent_change_24h < 0){
        //   $("tr").removeClass();
        //   $("tr").addClass("danger")
        // } else if(Rates[i].percent_change_24h > 0) {
        //   $("tr").removeClass()
        //   $("tr").addClass("pos");
        // }else {
        //   $("tr").removeClass();
        //   $("tr").addClass("unchanged");
        // }

        var opt=$("<option>")
        $("#coinselect").append(opt);
        opt.text(Rates[i].name)
        opt.attr("value", Rates[i].price_btc)

        var btcexerate=(1/Rates[0].price_usd)
        var pt1equation = (1 / btcexerate)

        $('#coinselect').change(function(){
            var checkopt=$("#coinselect").find("option:selected");
            var btcprice=checkopt[0].value;
            var equation = btcprice * pt1equation;
            $('#userInput').change(function(){
              var input = $('#userInput').val();
              var answer = "$" + input * equation.toFixed(8);

              var answerout = $("#answer");
              answerout.val(answer)
             })
        });
      };
      setTimeout(Rates, 15000)
    });

// google.charts.load('current', {'packages':['corechart']});
// google.charts.setOnLoadCallback(drawChart);
//
// function drawChart() {
//         var data = google.visualization.arrayToDataTable([
//           ['Year', 'Sales', 'Expenses'],
//           ['2004',  1000,      400],
//           ['2005',  1170,      460],
//           ['2006',  660,       1120],
//           ['2007',  1030,      540]
//         ]);
//
//         var options = {
//           title: 'Company Performance',
//           curveType: 'function',
//           legend: { position: 'bottom' }
//         };
//
//         var chart = new google.visualization.LineChart(document.getElementById('curve_chart'));
//
//         chart.draw(data, options);
//       }
});
