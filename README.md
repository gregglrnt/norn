
TODO : 
- The Wheel opens the Menu, all around the Earth, with : 
    - search
    - music
    - add an event
- Music plays in the background according to the year (antiquity, medieval, renaissance, classical, rock)
- You can add an event to the library
- Like a year. It is a cookie

- Format calendar with different calendars possibility : 
const options = {
  calendar: "hebrew",
  dateStyle: "long"
}

var dateFormat = new Intl.DateTimeFormat("en", options);
var usedOptions = dateFormat.resolvedOptions();

console.log(usedOptions.calendar)

const i = dateFormat.format(new Date());

console.log(i)
cf https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/DateTimeFormat#ca