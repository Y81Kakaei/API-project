$(document).ready(() => {
  $("#submit_btn").click("submit", e => {
    var aipee = $("#search_txt").val();
    //console.log(aipee);
    getInput(aipee);
    e.preventDefault();
  });
});

function getInput(aipee) {
  console.log(aipee);

  // var $status = $("#status");
  var $isp = $("#isp");
  var $country = $("#country");
  var $countrycode = $("#countrycode");
  var $region = $("#region");
  var $languages = $("#languages");
  var $city = $("#city");
  var $currency = $("#currency");
  var $latt = $("#latt");
  var $long = $("#long");
  var $timezone = $("#timezone");

  $.ajax({
    url: "https://ipapi.co/" + aipee + "/json/",
    type: "GET",
    success: function(data) {
      $isp.append(data.org);
      $country.append(data.country_name);
      $countrycode.append(data.country_calling_code);
      $region.append(data.region);
      $languages.append(data.languages);
      $city.append(data.city);
      $currency.append(data.currency);
      $latt.append(data.latitude);
      $long.append(data.longitude);
      $timezone.append(data.timezone);
      var lattitude = data.latitude;
      var longitude = data.longitude;
      var city = data.city;
      initMap(lattitude, longitude);
      getArticle(city);
    }
  });
}

function initMap(lattitude, longitude) {
  var lat = Number(lattitude);
  var lng = Number(longitude);
  var myLatLng = { lat, lng };
  var map = new google.maps.Map(document.getElementById("map"), {
    zoom: 9,
    center: myLatLng
  });

  var marker = new google.maps.Marker({
    position: myLatLng,
    map: map
  });
}

//////wikipedia api/////////////////////////////

function getArticle(city) {
  $.ajax({
    url: "https://en.wikipedia.org/w/api.php",
    type: "GET",
    data: {
      format: "json",
      action: "parse",
      page: city,
      prop: "text|images",
      section: 0
    },
    dataType: "jsonp",
    headers: {
      "Api-User-Agent":
        "YazdanWebsite/2.3(http://yazdan.com/YazdanWebsite/; ykakaei.psy@gmail.com)LeidenWebLab/2.3"
    },
    success: function(data) {
      var markup = data.parse.text["*"];
      var i = $("<div></div>").html(markup);
      i.find("a").each(function() {
        $(this).replaceWith($(this).html());
      });
      i.find("sup").remove();
      i.find(".mw-ext-cite-error").remove();
      $("#article").html($(i).find("p"));
    }
  });
}

////////////////////////////////////////////
