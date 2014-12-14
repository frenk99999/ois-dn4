
var baseUrl = 'https://rest.ehrscape.com/rest/v1';
var queryUrl = baseUrl + '/query';

var username = "ois.seminar";
var password = "ois4fri";

var vidno;
var izbran;
var grap;

var url = "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20html%20where%20url%3D%22http%3A%2F%2Fwww.lek.si%2Fsi%2Fskrb-za-zdravje%2Fbolezni-in-simptomi%2Fsrce-ozilje%2Fzvisan-krvni-tlak-hipertenzija%2F%22%20and%20xpath%3D'%2F%2Ftable'&format=json&diagnostics=true&callback=";
var page;

$.ajax({
	type: 'GET',
	url: "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20html%20where%20url%3D%22http%3A%2F%2Fwww.lek.si%2Fsi%2Fskrb-za-zdravje%2Fbolezni-in-simptomi%2Fsrce-ozilje%2Fzvisan-krvni-tlak-hipertenzija%2F%22%20and%20xpath%3D'%2F%2Ftable'&diagnostics=true",
	dataType: 'html',
	success: function(data) {
		page=$(data).find('table');
		console.log(page);
	}
});

var dat = [];

var data = [["Franko","Jančič","1994-2-13T20:00"],
			["Franjo","Frančič","1991-4-15T10:00"],
			["Janko","Frančič","1990-1-22T09:00"]]

var data2 = [[["2004-1-10T10:00","185","80.00","36.50","120","80","50"],
			["2004-1-11T10:00","185","80.00","36.50","120","80","50"],
			["2004-1-12T10:00","185","80.00","36.40","120","80","50"],
			["2004-1-13T10:00","185","80.00","36.50","120","80","50"],
			["2004-1-14T10:00","185","80.00","36.80","120","80","50"],
			["2004-1-15T10:00","185","80.10","36.50","120","80","50"],
			["2004-1-16T10:00","185","80.00","36.60","120","80","50"],
			["2004-1-17T10:00","185","80.10","36.50","120","80","50"],
			["2004-1-18T10:00","185","80.00","36.70","120","80","50"],
			["2004-1-19T10:00","185","80.00","36.50","120","80","50"],
			["2004-1-20T10:00","185","80.00","36.50","120","80","50"],
			["2004-1-21T10:00","185","80.10","36.10","120","80","50"]],
			[["2004-1-10T10:00","185","80.00","36.50","120","80","50"],
			["2004-1-11T10:00","185","80.00","36.50","140","90","50"],
			["2004-1-12T10:00","185","80.00","36.40","120","80","50"],
			["2004-1-13T10:00","185","80.00","36.50","120","80","50"],
			["2004-1-14T10:00","185","80.00","36.80","140","90","50"],
			["2004-1-15T10:00","185","80.10","36.50","120","80","50"],
			["2004-1-16T10:00","185","80.00","36.60","120","80","50"],
			["2004-1-17T10:00","185","80.10","36.50","120","80","50"],
			["2004-1-18T10:00","185","80.00","36.70","120","80","50"],
			["2004-1-19T10:00","185","80.00","36.50","120","80","50"],
			["2004-1-20T10:00","185","80.00","36.50","120","80","50"],
			["2004-1-21T10:00","185","80.10","36.10","140","90","50"]],
			[["2004-1-10T10:00","185","80.00","36.50","140","90","50"],
			["2004-1-11T10:00","185","80.00","36.50","140","90","50"],
			["2004-1-12T10:00","185","80.00","36.40","150","92","50"],
			["2004-1-13T10:00","185","80.00","36.50","170","95","50"],
			["2004-1-14T10:00","185","80.00","36.80","130","85","50"],
			["2004-1-15T10:00","185","80.10","36.50","150","93","50"],
			["2004-1-16T10:00","185","80.00","36.60","140","90","50"],
			["2004-1-17T10:00","185","80.10","36.50","130","85","50"],
			["2004-1-18T10:00","185","80.00","36.70","150","93","50"],
			["2004-1-19T10:00","185","80.00","36.50","150","93","50"],
			["2004-1-20T10:00","185","80.00","36.50","140","90","50"],
			["2004-1-21T10:00","185","80.10","36.20","140","90","50"]]]

function generira(a,b){

		sessionId = getSessionId();
		var ime = a[0];
		var priimek = a[1];
		var datumRojstva = a[2];
		console.log(ime);
		$.ajaxSetup({
		    headers: {"Ehr-Session": sessionId}
		});
		$.ajax({
		    url: baseUrl + "/ehr",
		    type: 'POST',
		    success: function (data) {
		        var ehrId = data.ehrId;
		        var partyData = {
		            firstNames: ime,
		            lastNames: priimek,
		            dateOfBirth: datumRojstva,
		            partyAdditionalInfo: [{key: "ehrId", value: ehrId}]
		        };
		        $.ajax({
		            url: baseUrl + "/demographics/party",
		            type: 'POST',
		            contentType: 'application/json',
		            data: JSON.stringify(partyData),
		            success: function (party) {
		                if (party.action == 'CREATE') {
		                    $("#preberiObstojeciEHR").append("<option value=\"" +ehrId+ "\">"+ime+" "+priimek+"</option>");
							$("#preberiPredlogoBolnika").append("<option value=\"" +ime+","+priimek+","+datumRojstva+"\">"+ime+" "+priimek+"</option>");
							$("#preberiObstojeciVitalniZnak").append("<option value=\"" +ehrId+"|"+b[0][0]+"|"+b[0][1]+"|"+b[0][2]+"|"+b[0][3]+"|"+b[0][4]+"|"+b[0][5]+"|"+b[0][6]+"|medicinska sestra Smrketa\">"+ime+" "+priimek+"</option>");
							$("#preberiEhrIdZaVitalneZnake").append("<option value=\"" +ehrId+ "\">"+ime+" "+priimek+"</option>");
							
		                    console.log("Uspešno kreiran EHR '" + ehrId + "'.");
							for(j=0;j<b.length;j++){
								generira2(b[j],ehrId)
							}
		                }
		            },
		            error: function(err) {
		            	$("#kreirajSporocilo").html("<span class='obvestilo label label-danger fade-in'>Napaka '" + JSON.parse(err.responseText).userMessage + "'!");
		            	console.log(JSON.parse(err.responseText).userMessage);
		            }
		        });
		    }
		});
}

function generira2(data3,o){
		$.ajaxSetup({
		    headers: {"Ehr-Session": sessionId}
		});
		var podatki = {
			// Preview Structure: https://rest.ehrscape.com/rest/v1/template/Vital%20Signs/example
		    "ctx/language": "en",
		    "ctx/territory": "SI",
		    "ctx/time": data3[0],
		    "vital_signs/height_length/any_event/body_height_length": data3[1],
		    "vital_signs/body_weight/any_event/body_weight": data3[2],
		   	"vital_signs/body_temperature/any_event/temperature|magnitude": data3[3],
		    "vital_signs/body_temperature/any_event/temperature|unit": "°C",
		    "vital_signs/blood_pressure/any_event/systolic": data3[4],
		    "vital_signs/blood_pressure/any_event/diastolic": data3[5],
		    "vital_signs/indirect_oximetry:0/spo2|numerator": data3[6]
		};
		var parametriZahteve = {
		    "ehrId": o,
		    templateId: 'Vital Signs',
		    format: 'FLAT',
		    committer: "medicinska sestra Hrastova Micka"
		};
		$.ajax({
		    url: baseUrl + "/composition?" + $.param(parametriZahteve),
		    type: 'POST',
		    contentType: 'application/json',
		    data: JSON.stringify(podatki),
		    success: function (res) {
		    	console.log(res.meta.href);
		       // $("#dodajMeritveVitalnihZnakovSporocilo").html("<span class='obvestilo label label-success fade-in'>" + res.meta.href + ".</span>");
		    },
		    error: function(err) {
		    	//$("#dodajMeritveVitalnihZnakovSporocilo").html("<span class='obvestilo label label-danger fade-in'>Napaka '" + JSON.parse(err.responseText).userMessage + "'!");
				console.log(JSON.parse(err.responseText).userMessage);
		    }
		});
}

function generiraj(){
	for(var i=0;i<data.length;i++){
		generira(data[i],data2[i]);
	}
}

//generiraj();
			
function spremeni(ob,a){
	if(vidno!=null){
		document.getElementById(vidno).style.display="none";
		izbran.style.backgroundColor = "#337ab7"
		document.getElementById("grap").style.display="none";
	}
	if(ob == "a4" && grap){
		document.getElementById("grap").style.display="block";
	}
	document.getElementById(ob).style.display="block";
	a.style.backgroundColor = "#003672";
	vidno=ob;
	izbran=a;
}

function getSessionId() {
    var response = $.ajax({
        type: "POST",
        url: baseUrl + "/session?username=" + encodeURIComponent(username) +
                "&password=" + encodeURIComponent(password),
        async: false
    });
    return response.responseJSON.sessionId;
}


function kreirajEHRzaBolnika() {
	sessionId = getSessionId();

	var ime = $("#kreirajIme").val();
	var priimek = $("#kreirajPriimek").val();
	var datumRojstva = $("#kreirajDatumRojstva").val();

	if (!ime || !priimek || !datumRojstva || ime.trim().length == 0 || priimek.trim().length == 0 || datumRojstva.trim().length == 0) {
		$("#kreirajSporocilo").html("<span class='obvestilo label label-warning fade-in'>Prosim vnesite zahtevane podatke!</span>");
	} else {
		$.ajaxSetup({
		    headers: {"Ehr-Session": sessionId}
		});
		$.ajax({
		    url: baseUrl + "/ehr",
		    type: 'POST',
		    success: function (data) {
		        var ehrId = data.ehrId;
		        var partyData = {
		            firstNames: ime,
		            lastNames: priimek,
		            dateOfBirth: datumRojstva,
		            partyAdditionalInfo: [{key: "ehrId", value: ehrId}]
		        };
		        $.ajax({
		            url: baseUrl + "/demographics/party",
		            type: 'POST',
		            contentType: 'application/json',
		            data: JSON.stringify(partyData),
		            success: function (party) {
		                if (party.action == 'CREATE') {
		                    $("#kreirajSporocilo").html("<span class='obvestilo label label-success fade-in'>Uspešno kreiran EHR '" + ehrId + "'.</span>");
							$("#preberiObstojeciEHR").append("<option value=\"" +ehrId+ "\">"+ime+" "+priimek+"</option>");
							$("#preberiPredlogoBolnika").append("<option value=\"" +ime+","+priimek+","+datumRojstva+"\">"+ime+" "+priimek+"</option>");
							$("#preberiObstojeciVitalniZnak").append("<option value=\"" +ehrId+"\">"+ime+" "+priimek+"</option>");
							$("#preberiEhrIdZaVitalneZnake").append("<option value=\"" +ehrId+ "\">"+ime+" "+priimek+"</option>");
		                    console.log("Uspešno kreiran EHR '" + ehrId + "'.");
		                }
		            },
		            error: function(err) {
		            	$("#kreirajSporocilo").html("<span class='obvestilo label label-danger fade-in'>Napaka '" + JSON.parse(err.responseText).userMessage + "'!");
		            	console.log(JSON.parse(err.responseText).userMessage);
		            }
		        });
		    }
		});
	}
}


function preberiEHRodBolnika() {
	sessionId = getSessionId();

	var ehrId = $("#preberiEHRid").val();

	if (!ehrId || ehrId.trim().length == 0) {
		$("#preberiSporocilo").html("<span class='obvestilo label label-warning fade-in'>Prosim vnesite zahtevan podatek!");
	} else {
		$.ajax({
			url: baseUrl + "/demographics/ehr/" + ehrId + "/party",
			type: 'GET',
			headers: {"Ehr-Session": sessionId},
	    	success: function (data) {
				var party = data.party;
				$("#preberiSporocilo").html("<span class='obvestilo label label-success fade-in'>Bolnik '" + party.firstNames + " " + party.lastNames + "', ki se je rodil '" + party.dateOfBirth + "'.</span>");
				console.log("Bolnik '" + party.firstNames + " " + party.lastNames + "', ki se je rodil '" + party.dateOfBirth + "'.");
			},
			error: function(err) {
				$("#preberiSporocilo").html("<span class='obvestilo label label-danger fade-in'>Napaka '" + JSON.parse(err.responseText).userMessage + "'!");
				console.log(JSON.parse(err.responseText).userMessage);
			}
		});
	}	
}


function dodajMeritveVitalnihZnakov() {
	sessionId = getSessionId();

	var ehrId = $("#dodajVitalnoEHR").val();
	var datumInUra = $("#dodajVitalnoDatumInUra").val();
	var telesnaVisina = $("#dodajVitalnoTelesnaVisina").val();
	var telesnaTeza = $("#dodajVitalnoTelesnaTeza").val();
	var telesnaTemperatura = $("#dodajVitalnoTelesnaTemperatura").val();
	var sistolicniKrvniTlak = $("#dodajVitalnoKrvniTlakSistolicni").val();
	var diastolicniKrvniTlak = $("#dodajVitalnoKrvniTlakDiastolicni").val();
	var nasicenostKrviSKisikom = $("#dodajVitalnoNasicenostKrviSKisikom").val();
	var merilec = $("#dodajVitalnoMerilec").val();

	if (!ehrId || ehrId.trim().length == 0) {
		$("#dodajMeritveVitalnihZnakovSporocilo").html("<span class='obvestilo label label-warning fade-in'>Prosim vnesite zahtevane podatke!</span>");
	} else {
		$.ajaxSetup({
		    headers: {"Ehr-Session": sessionId}
		});
		var podatki = {
			// Preview Structure: https://rest.ehrscape.com/rest/v1/template/Vital%20Signs/example
		    "ctx/language": "en",
		    "ctx/territory": "SI",
		    "ctx/time": datumInUra,
		    "vital_signs/height_length/any_event/body_height_length": telesnaVisina,
		    "vital_signs/body_weight/any_event/body_weight": telesnaTeza,
		   	"vital_signs/body_temperature/any_event/temperature|magnitude": telesnaTemperatura,
		    "vital_signs/body_temperature/any_event/temperature|unit": "°C",
		    "vital_signs/blood_pressure/any_event/systolic": sistolicniKrvniTlak,
		    "vital_signs/blood_pressure/any_event/diastolic": diastolicniKrvniTlak,
		    "vital_signs/indirect_oximetry:0/spo2|numerator": nasicenostKrviSKisikom
		};
		var parametriZahteve = {
		    "ehrId": ehrId,
		    templateId: 'Vital Signs',
		    format: 'FLAT',
		    committer: merilec
		};
		$.ajax({
		    url: baseUrl + "/composition?" + $.param(parametriZahteve),
		    type: 'POST',
		    contentType: 'application/json',
		    data: JSON.stringify(podatki),
		    success: function (res) {
		    	console.log(res.meta.href);
		        $("#dodajMeritveVitalnihZnakovSporocilo").html("<span class='obvestilo label label-success fade-in'>" + res.meta.href + ".</span>");
		    },
		    error: function(err) {
		    	$("#dodajMeritveVitalnihZnakovSporocilo").html("<span class='obvestilo label label-danger fade-in'>Napaka '" + JSON.parse(err.responseText).userMessage + "'!");
				console.log(JSON.parse(err.responseText).userMessage);
		    }
		});
	}
}

function generirajGraf(data){
	var margin = {top: 20, right: 80, bottom: 30, left: 50},
    width = document.getElementById("grap").offsetWidth - margin.left - margin.right - 50,
    height = 400 - margin.top - margin.bottom;
	console.log(width+" "+height)
var parseDate = d3.time.format("%Y-%m-%dT%H:%M:%S.%L").parse;
var altereg = false;
	console.log(data[0].date);
	if (data[0].date.toString().charAt(0)>"9"){
		parseDate = d3.time.format("%a %b %e %Y %H:%M:%S ").parse;
		altereg = true;
	}
var x = d3.time.scale()
    .range([0, width]);

var y = d3.scale.linear()
    .range([height, 0]);

var color = d3.scale.category10();

var tick = Math.round(width/100)
	console.log(tick);

var xAxis = d3.svg.axis()
    .scale(x)
    //.orient("bottom");
	.ticks(tick);
var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left");

var line = d3.svg.line()
    .interpolate("basis")
    .x(function(d) { return x(d.date); })
    .y(function(d) { return y(d.temperature); });
	
	$('#gra').empty();

var svg = d3.select("grap").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

	color.domain(d3.keys(data[0]).filter(function(key) { return key !== "date"; }));

	data.forEach(function(d) {
		if(altereg){
			d.date = parseDate(d.date.toString().split("G")[0]);
		}
		else{
			d.date = parseDate(d.date);
		}
	});

	var cities = color.domain().map(function(name) {
		return {
			name: name,
			values: data.map(function(d) {
			return {date: d.date, temperature: +d[name]};
		})
		};
	});

	x.domain(d3.extent(data, function(d) { return d.date; }));

	y.domain([
		d3.min(cities, function(c) { return d3.min(c.values, function(v) { return v.temperature; }); }),
		d3.max(cities, function(c) { return d3.max(c.values, function(v) { return v.temperature; }); })
	]);

	svg.append("g")
		.attr("class", "x axis")
		.attr("transform", "translate(0," + height + ")")
		.call(xAxis);

	svg.append("g")
		.attr("class", "y axis")
		.call(yAxis)
      .append("text")
		.attr("transform", "rotate(-90)")
		.attr("y", 6)
		.attr("dy", ".71em")
		.style("text-anchor", "end")
		.text("Krvni tlak (mm[Hg])");

	var city = svg.selectAll(".city")
		.data(cities)
	  .enter().append("g")
		.attr("class", "city");

	city.append("path")
		.attr("class", "line")
		.attr("d", function(d) { return line(d.values); })
		.style("stroke", function(d) { return color(d.name); });

	city.append("text")
		.datum(function(d) { return {name: d.name, value: d.values[0]}; })
		.attr("transform", function(d) { return "translate(" + x(d.value.date) + "," + y(d.value.temperature) + ")"; })
		.attr("x", 3)
		.attr("dy", ".35em")
	  .text(function(d) { return d.name; });

}

function preberiMeritveVitalnihZnakov() {
	sessionId = getSessionId();	

	var ehrId = $("#meritveVitalnihZnakovEHRid").val();
	var tip = $("#preberiTipZaVitalneZnake").val();

	if (!ehrId || ehrId.trim().length == 0 || !tip || tip.trim().length == 0) {
		$("#preberiMeritveVitalnihZnakovSporocilo").html("<span class='obvestilo label label-warning fade-in'>Prosim vnesite zahtevan podatek!");
	} else {
		$.ajax({
			url: baseUrl + "/demographics/ehr/" + ehrId + "/party",
	    	type: 'GET',
	    	headers: {"Ehr-Session": sessionId},
	    	success: function (data) {
				var party = data.party;
				$("#rezultatMeritveVitalnihZnakov").html("<br/><span>Pridobivanje podatkov za <b>'" + tip + "'</b> bolnika <b>'" + party.firstNames + " " + party.lastNames + "'</b>.</span><br/><br/>");
				if (tip == "telesna temperatura") {
					$.ajax({
					    url: baseUrl + "/view/" + ehrId + "/" + "body_temperature",
					    type: 'GET',
					    headers: {"Ehr-Session": sessionId},
					    success: function (res) {
					    	if (res.length > 0) {
						    	var results = "<table class='table table-striped table-hover'><tr><th>Datum in ura</th><th class='text-right'>Telesna temperatura</th></tr>";
						        for (var i in res) {
						            results += "<tr><td>" + res[i].time + "</td><td class='text-right'>" + res[i].temperature + " " 	+ res[i].unit + "</td>";
						        }
						        results += "</table>";
						        $("#rezultatMeritveVitalnihZnakov").append(results);
					    	} else {
					    		$("#preberiMeritveVitalnihZnakovSporocilo").html("<span class='obvestilo label label-warning fade-in'>Ni podatkov!</span>");
					    	}
							document.getElementById("grap").style.display="none";
							grap = false;
							$("#povprecje").html("");
					    },
					    error: function() {
					    	$("#preberiMeritveVitalnihZnakovSporocilo").html("<span class='obvestilo label label-danger fade-in'>Napaka '" + JSON.parse(err.responseText).userMessage + "'!");
							console.log(JSON.parse(err.responseText).userMessage);
					    }
					});
				} else if (tip == "telesna teža") {
					$.ajax({
					    url: baseUrl + "/view/" + ehrId + "/" + "weight",
					    type: 'GET',
					    headers: {"Ehr-Session": sessionId},
					    success: function (res) {
					    	if (res.length > 0) {
						    	var results = "<table class='table table-striped table-hover'><tr><th>Datum in ura</th><th class='text-right'>Telesna teža</th></tr>";
						        for (var i in res) {
						            results += "<tr><td>" + res[i].time + "</td><td class='text-right'>" + res[i].weight + " " 	+ res[i].unit + "</td>";
						        }
						        results += "</table>";
						        $("#rezultatMeritveVitalnihZnakov").append(results);
					    	} else {
					    		$("#preberiMeritveVitalnihZnakovSporocilo").html("<span class='obvestilo label label-warning fade-in'>Ni podatkov!</span>");
					    	}
							document.getElementById("grap").style.display="none";
							grap = false;
							$("#povprecje").html("");
					    },
					    error: function() {
					    	$("#preberiMeritveVitalnihZnakovSporocilo").html("<span class='obvestilo label label-danger fade-in'>Napaka '" + JSON.parse(err.responseText).userMessage + "'!");
							console.log(JSON.parse(err.responseText).userMessage);
					    }
					});					
				} else if (tip == "telesna temperatura AQL") {
					var AQL = 
						"select " +
    						"t/data[at0002]/events[at0003]/time/value as cas, " +
    						"t/data[at0002]/events[at0003]/data[at0001]/items[at0004]/value/magnitude as temperatura_vrednost, " +
    						"t/data[at0002]/events[at0003]/data[at0001]/items[at0004]/value/units as temperatura_enota " +
						"from EHR e[e/ehr_id/value='" + ehrId + "'] " +
						"contains OBSERVATION t[openEHR-EHR-OBSERVATION.body_temperature.v1] " +
						"where t/data[at0002]/events[at0003]/data[at0001]/items[at0004]/value/magnitude<35 " +
						"order by t/data[at0002]/events[at0003]/time/value desc " +
						"limit 10";
					$.ajax({
					    url: baseUrl + "/query?" + $.param({"aql": AQL}),
					    type: 'GET',
					    headers: {"Ehr-Session": sessionId},
					    success: function (res) {
					    	var results = "<table class='table table-striped table-hover'><tr><th>Datum in ura</th><th class='text-right'>Telesna temperatura</th></tr>";
					    	if (res) {
					    		var rows = res.resultSet;
						        for (var i in rows) {
						            results += "<tr><td>" + rows[i].cas + "</td><td class='text-right'>" + rows[i].temperatura_vrednost + " " 	+ rows[i].temperatura_enota + "</td>";
						        }
						        results += "</table>";
						        $("#rezultatMeritveVitalnihZnakov").append(results);
					    	} else {
					    		$("#preberiMeritveVitalnihZnakovSporocilo").html("<span class='obvestilo label label-warning fade-in'>Ni podatkov!</span>");
					    	}

					    },
					    error: function() {
					    	$("#preberiMeritveVitalnihZnakovSporocilo").html("<span class='obvestilo label label-danger fade-in'>Napaka '" + JSON.parse(err.responseText).userMessage + "'!");
							console.log(JSON.parse(err.responseText).userMessage);
					    }
					});
				}else if (tip == "krvni tlak AQL") {
					var AQL = 
						"select "+
							"a/data[at0001]/events[at0006]/time/value as time, "+
							"a/data[at0001]/events[at0006]/data[at0003]/items[at0004]/value/magnitude as sys, "+
							"a/data[at0001]/events[at0006]/data[at0003]/items[at0005]/value/magnitude as dia, "+
							"a/data[at0001]/events[at0006]/data[at0003]/items[at0005]/value/units as units "+
							"from EHR e[e/ehr_id/value='" + ehrId + "'] "+
							"contains OBSERVATION a[openEHR-EHR-OBSERVATION.blood_pressure.v1] "+
							"order by a/data[at0001]/events[at0006]/time/value desc " +
							"offset 0 limit 20";
					$.ajax({
					    url: baseUrl + "/query?" + $.param({"aql": AQL}),
					    type: 'GET',
					    headers: {"Ehr-Session": sessionId},
					    success: function (res) {
					    	var results = "<table class='table table-striped table-hover'><tr><th>Datum in ura</th><th class='text-right'>Telesna temperatura</th></tr>";
					    	if (res) {
					    		var rows = res.resultSet;
								var st = 0;
								var si = 0;
								var di = 0;
								dat = [];
						        for (var i in rows) {
									var syst = rows[i].sys;
									var diat = rows[i].dia;
									si = si + parseFloat(syst);
									di = di + parseFloat(diat);
									st++;
									var warning = false;
									var ha="<img src=\"blank.ico\">";
									if(parseFloat(syst)>=140){
										syst = "<b>" + syst + "</b>";
										warning = true;
									}
									if(parseFloat(diat)>=90){
										diat = "<b>" + diat + "</b>";
										warning = true;
									}
									if(warning){
										ha="<img src=\"favicon.ico\">";
									}
						            results += "<tr><td>" + rows[i].time + "</td><td class='text-right'>" + syst + "/" + diat + " " + rows[i].units + " "+ ha +"</td>";
									dat[dat.length]={ date: rows[i].time.split("+")[0], Sistolični: rows[i].sys, Diastolični: rows[i].dia};
						        }
								si=Math.round(si/st*100)/100;
								di=Math.round(di/st*100)/100;
								document.getElementById("grap").style.display="block";
								generirajGraf(dat);
								grap = true;
						        results += "</table><div id=\"pov\"></div>";
						        $("#rezultatMeritveVitalnihZnakov").append(results);
								var ss = ""+si
								var dd = ""+di
								var wa = "<img src=\"blank.ico\">";
								var t = false;
								if(ss>=140){
									ss="<b>"+ss+"</b>";
									wa="<img src=\"favicon.ico\">";
									t=true;
								}
								if(dd>=90){
									dd="<b>"+dd+"</b>";
									wa="<img src=\"favicon.ico\">";
									t=true;
								}
								$("#pov").append("<p><big>Pocprečje: "+ss+"/"+dd+"</big>"+wa+"</p>");
								$("#povprecje").html("");
								if (t){
									$("#povprecje").html("<div id='warning'><p><big><b>Imate previsok krni tlak!</b></big></p><p>Vrednost, ki je odebeljena presega najvišjo vrednost, ki ni škodljivo za zdravje. Spodaj so navedene vrednosti, ki opisujejo kolikšen je optimalni krvni tlak, in kolikšna je lahko najvišji krvni tlak za naslednje bolnike.</p></big></div><div id='tabela'></div>");
									$('#tabela').append(page);
								}
					    	} else {
								$("#preberiMeritveVitalnihZnakovSporocilo").html("<span class='obvestilo label label-warning fade-in'>Ni podatkov!</span>");
								document.getElementById("grap").style.display="none";
								grap = false;
					    	}

					    },
					    error: function() {
					    	$("#preberiMeritveVitalnihZnakovSporocilo").html("<span class='obvestilo label label-danger fade-in'>Napaka '" + JSON.parse(err.responseText).userMessage + "'!");
							console.log(JSON.parse(err.responseText).userMessage);
					    }
					});
				}
	    	},
	    	error: function(err) {
	    		$("#preberiMeritveVitalnihZnakovSporocilo").html("<span class='obvestilo label label-danger fade-in'>Napaka '" + JSON.parse(err.responseText).userMessage + "'!");
				console.log(JSON.parse(err.responseText).userMessage);
	    	}
		});
	}
}

function generirajGraf2(){
	if (dat.length>0){
		console.log("trig")
		generirajGraf(dat);
	}
}

$(document).ready(function() {
	$('#preberiObstojeciEHR').change(function() {
		$("#preberiSporocilo").html("");
		$("#preberiEHRid").val($(this).val());
	});
	$( window ).resize(function() {
		generirajGraf2();
	});
	$('#preberiPredlogoBolnika').change(function() {
		$("#kreirajSporocilo").html("");
		var podatki = $(this).val().split(",");
		$("#kreirajIme").val(podatki[0]);
		$("#kreirajPriimek").val(podatki[1]);
		$("#kreirajDatumRojstva").val(podatki[2]);
	});
	$('#preberiObstojeciVitalniZnak').change(function() {
		$("#dodajMeritveVitalnihZnakovSporocilo").html("");
		var podatki = $(this).val().split("|");
		$("#dodajVitalnoEHR").val(podatki[0]);
		$("#dodajVitalnoDatumInUra").val(podatki[1]);
		$("#dodajVitalnoTelesnaVisina").val(podatki[2]);
		$("#dodajVitalnoTelesnaTeza").val(podatki[3]);
		$("#dodajVitalnoTelesnaTemperatura").val(podatki[4]);
		$("#dodajVitalnoKrvniTlakSistolicni").val(podatki[5]);
		$("#dodajVitalnoKrvniTlakDiastolicni").val(podatki[6]);
		$("#dodajVitalnoNasicenostKrviSKisikom").val(podatki[7]);
		$("#dodajVitalnoMerilec").val(podatki[8]);
	});
	$('#preberiEhrIdZaVitalneZnake').change(function() {
		$("#preberiMeritveVitalnihZnakovSporocilo").html("");
		$("#rezultatMeritveVitalnihZnakov").html("");
		$("#meritveVitalnihZnakovEHRid").val($(this).val());
		$("#povprecje").html("");
	});
});