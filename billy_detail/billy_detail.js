/////////////////////////////////////////////////////////////////
//Boucle toute les factures en detail.
/////////////////////////////////////////////////////////////////


function edf_forme(json)
{
	var structhtml = "";
	var i = 0;
	while (i < Object.keys(json).length)
	{
		 structhtml += '<a class="button blue" style="background-color:#5792FF;padding-top:15px;padding-bottom:15px;border:2px solid #FFF; text-align:center;background:#FFF;border-radius:20px 0 20px 0;">'
  + '<strong class="title" style="color: black;font-size:23px;">'
  + 'EDF</strong>'
  + '<span>'
  + '<br>' + json[i].doc.date
  
  +'</span>'
  +'<br><span>'
    +'<p style="color: #952A35;font-size:25px; text-align: right; margin-top: 0px; Font-Weight: Bold;">'
    + json[i].doc.amount + " €"
    + '</p>'
  	+'</span>'
	+'</a>';
		i++;
	}
	var x = document.getElementById("id_detail");
	x.querySelector(".class_detail").innerHTML = structhtml;
}

function edf()
{
	cozysdk.defineView('Bill', 'facturesedf', 'function(doc) {if (doc.vendor === "EDF"){ emit(doc._id);} }', function(err)
	{
	cozysdk.queryView('Bill', 'facturesedf', {"limit":10,"include_docs":true}, 
		function(err, res)
		{
			edf_forme(res);
		}
		);
	}
	);
}

function gdf_forme(json)
{
	var structhtml = "";
	var i = 0;
	while (i < Object.keys(json).length)
	{
		 structhtml += '<a class="button blue" style="background-color:#5792FF;padding-top:15px;padding-bottom:15px;border:2px solid #FFF; text-align:center;background:#FFF;border-radius:20px 0 20px 0;">'
  + '<strong class="title" style="color: black;font-size:23px;">'
  + 'GDF</strong>'
  + '<span>'
  + '<br>' + json[i].doc.start
  
  +'</span>'
  +'<br><span>'
    +'<p style="color: #952A35;font-size:25px; text-align: right; margin-top: 0px; Font-Weight: Bold;">'
    + json[i].doc.value + " €"
    + '</p>'
  	+'</span>'
	+'</a>';
	break;
		i++;
	}
	var x = document.getElementById("id_detail");
	x.querySelector(".class_detail2").innerHTML = structhtml;
}

function gdf()
{
	cozysdk.defineView('ConsumptionStatement', 'consommationsdegaz', 'function(doc) {emit(doc._id)}', function(err)
	{
	cozysdk.queryView('ConsumptionStatement', 'consommationsdegaz', {"limit":10,"include_docs":true}, 
		function(err, res)
		{
			gdf_forme(res);
		}
		);
	}
	);
}


function Mesfactures()
{
	edf();
	//gdf();
}
