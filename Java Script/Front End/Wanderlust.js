// Foursquare API Info
const clientId = 'KNPWLP34CM012L4IZBCOB44TKPUJ5Z2OKJY4MCNEU1OPCMDP';
const clientSecret = 'DPUBOH0IKFRN2XDPKRXWVA1N12JUJIA1CYV0EWSR0DTLFTW5';
const url = 'https://api.foursquare.com/v2/venues/explore?near=';

// OpenWeather Info
const openWeatherKey = '5f9dfe6eeb13153816c40795bc07ba4c';
const weatherUrl = 'https://api.openweathermap.org/data/2.5/weather';

// Page Elements
const $input = $('#city');
const $submit = $('#button');
const $destination = $('#destination');
const $container = $('.container');
const $venueDivs = [$("#venue1"), $("#venue2"), $("#venue3"), $("#venue4")];
const $weatherDiv = $("#weather1");
const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

// Add AJAX functions here:
const getVenues = async () => {
  const city = $input.val();
  const urlToFetch = `${url}${city}&limit=10&client_id=${clientId}&client_secret=${clientSecret}&v=20200414`;
  
  try {
    const response = await fetch(urlToFetch);
    if(response.ok) {
      console.log(response);
      const jsonResponse = await response.json();
      console.log(jsonResponse);

      const venues = jsonResponse.response.groups[0].items.map(parameter => parameter.valueToStore);
      console.log(venues);
      return venues;
    }
  } catch(error) {
    console.log(error);
  }
}

const getForecast = async () => {
  try {
    const urlToFetch = `${weatherUrl}?&q=${$input.val()}&APPID=${openWeatherKey}`;
    const response = await fetch(urlToFetch);
    if (response.ok) {
      const jsonResponse = response.json();
      console.log(jsonResponse);
      return jsonResponse;
    }
  } catch(error) {
    console.log(error);
  }
}


// Render functions
const renderVenues = (venues) => {
  $venueDivs.forEach(($venue, index) => {
    // Add your code here:
    const venue = venues[index];
    const venueIcon = venue.categories[0].icon;
    const venueImgSrc = `${venueIcon.prefix}bg_64${venueIcon.suffix}`
    let venueContent = createVenueHTML(venue.name, venue.location, venueImgSrc);
    $venue.append(venueContent);
  });
  $destination.append(`<h2>${venues[0].location.city}</h2>`);
}

const renderForecast = (day) => {
  // Add your code here:

  let weatherContent = createWeatherHTML(day);
  $weatherDiv.append(weatherContent);
}

const executeSearch = () => {
  $venueDivs.forEach(venue => venue.empty());
  $weatherDiv.empty();
  $destination.empty();
  $container.css("visibility", "visible");
  getVenues().then(venues => {return renderVenues(venues)});
  getForecast().then(forecase => {return renderForecast(forecast)});
  return false;
}

$submit.click(executeSearch)


