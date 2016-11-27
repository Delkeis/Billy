/////////////////////////////////////////////////////////////////
//
/////////////////////////////////////////////////////////////////
var total_json = {};
var total = 0;
var HTML = '';

function add_total()
{
  var i = 0;
  total = 0;
  for (i in total_json)
  {
    total += total_json[i];  
    i++;
  }
  //draw_circle();
  bar.animate(total/budget);
}

function edf_price(callback)
{

  cozysdk.defineView('Bill', 'facturesedf', 'function(doc) {if (doc.vendor === "EDF"){ emit(doc._id);} }', function(err)
  {
  cozysdk.queryView('Bill', 'facturesedf', {"limit":10,"include_docs":true}, 
    function(err, res)
    {
      total_json['edf'] = res[0].doc.amount;
      callback();
    }
    );
  }
  );
}

  edf_price(add_total);

var budget = 300;
var bar = new ProgressBar.Circle(container, {
  color: '#ED6A5A',
  // This has to be the same size as the maximum width to
  // prevent clipping
  strokeWidth: 4,
  trailWidth: 1,
  easing: 'easeInOut',
  duration: 1400,
  text: {
    autoStyleContainer: false
  },
  from: { color: '#FFEA82', width: 1 },
  to: { color: '#ED6A5A', width: 4 },
  // Set default step function for all animate calls
  step: function(state, circle) {
    circle.path.setAttribute('stroke', state.color);
    circle.path.setAttribute('stroke-width', state.width);

    var value = Math.round(circle.value() * budget);
    circle.setText(value + "€ ");

  }
});
bar.text.style.fontFamily = '"Raleway", Helvetica, sans-serif';
bar.text.style.fontSize = '3rem';
HTML = budget;
HTML = "Mon solde : " + HTML + "€";
document.querySelector('p.solde').innerHTML = HTML;
bar.animate(total/budget);  // Number from 0.0 to 1.0