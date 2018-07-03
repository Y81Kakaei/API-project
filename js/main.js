
$(document).ready(()  => {
  $('#submit_btn').click('submit',(e) => {
    var aipee = $('#search_txt').val();
    //console.log(aipee);
    getInput(aipee);
    e.preventDefault();
  });
});



function getInput(aipee){
  //console.log(aipee);

  var $status = $('#status');
  var $country = $('#country');
  var $countrycode = $('#countrycode');
  var $region = $('#region');
  var $regionname = $('#regionname')
  var $city = $('#city');
  var $zip = $('#zip');
  var $latt = $('#latt');
  var $long = $('#long');
  var $timezone = $('#timezone');

  $.ajax({

    url: "http://ip-api.com/json/"+ aipee,
    type: 'GET',
    success: function(data){

      $status.append(data.status);
      $country.append(data.country);
      $countrycode.append(data.countryCode);
      $region.append(data.region);
      $regionname.append(data.regionName);
      $city.append(data.city);
      $zip.append(data.zip);
      $latt.append(data.lat);
      $long.append(data.lon);
      $timezone.append(data.timezone);
      var lattitude = data.lat;
      var longitude = data.lon;
      var city = data.city;
      initMap(lattitude,longitude);
      getArticle (city);


      }


    });

//console.log(lattitude);
}



function initMap(lattitude,longitude) {
  var lat = Number(lattitude);
  var lng = Number(longitude);
  // console.log(lat);
  // console.log(lng);


  var myLatLng = {lat, lng};

  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 9,
    center: myLatLng
  });

  var marker = new google.maps.Marker({
    position: myLatLng,
    map: map,
  });
}



//////wikipedia api/////////////////////////////

function getArticle (city){
  $.ajax({
    url: 'https://en.wikipedia.org/w/api.php',
    type: 'GET',
    data: {
      format: 'json',
      action: 'parse',
      page : city,
      prop :'text|images',
      section: 0,
    },
    dataType: 'jsonp',
    headers: {
      'Api-User-Agent': 'YazdanWebsite/2.3(http://yazdan.com/YazdanWebsite/; ykakaei.psy@gmail.com)LeidenWebLab/2.3'},
    success: function(data){
      console.log(data);

       var markup = data.parse.text["*"];
       var i = $('<div></div>').html(markup);
       i.find('a').each(function() {
         $(this).replaceWith($(this).html()); });
         i.find('sup').remove();
         i.find('.mw-ext-cite-error').remove();
         $('#article').html($(i).find('p'));
       }
      });

    }




////////////////////////////////////////////
