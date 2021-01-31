import { Helpers, Random, Definitions } from "./index";

const Address = {
    zipCode: function(format?:string) {
        // if zip format is not specified, use the zip format defined for the locale
        if (typeof format === 'undefined') {
          var localeFormat = Definitions.address.postcode;
          if (typeof localeFormat === 'string') {
            format = localeFormat;
          } else {
            format = Random.arrayElement(localeFormat);
          }
        }
        return Helpers.replaceSymbols(format);
    },
    /**
     * Generates random zipcode from state abbreviation. If state abbreviation is
     * not specified, a random zip code is generated according to the locale's zip format.
     * Only works for locales with postcode_by_state definition. If a locale does not
     * have a postcode_by_state definition, a random zip code is generated according
     * to the locale's zip format.
     */
    zipCodeByState: function (state:string) {
        var zipRange = Definitions.address.postcode_by_state[state];
        if (zipRange) {
          return Random.number(zipRange);
        }
        return Address.zipCode();
    },
    /**
     * Generates a random localized city name. The format string can contain any
     * method provided by faker wrapped in `{{}}`, e.g. `{{name.firstName}}` in
     * order to build the city name.
     *
     * If no format string is provided one of the following is randomly used:
     *
     * * `{{address.cityPrefix}} {{name.firstName}}{{address.citySuffix}}`
     * * `{{address.cityPrefix}} {{name.firstName}}`
     * * `{{name.firstName}}{{address.citySuffix}}`
     * * `{{name.lastName}}{{address.citySuffix}}`
     *
     * @method faker.address.city
     * @param {String} format
     */
    city: function (format:string) {
        var formats = [
          '{{address.cityPrefix}} {{name.firstName}}{{address.citySuffix}}',
          '{{address.cityPrefix}} {{name.firstName}}',
          '{{name.firstName}}{{address.citySuffix}}',
          '{{name.lastName}}{{address.citySuffix}}'
        ];
    
        if (typeof format !== "number") {
          format = Random.number(formats.length - 1);
        }
    
        return faker(formats[format]);
      },
    /**
     * Return a random localized city prefix
     * @method faker.address.cityPrefix
     */
    cityPrefix: function () {
        return Random.arrayElement(Definitions.address.city_prefix);
    },
    
      /**
       * Return a random localized city suffix
       *
       * @method faker.address.citySuffix
       */
    citySuffix: function () {
        return Random.arrayElement(Definitions.address.city_suffix);
    },
    /**
     * Returns a random localized street name
     *
     * @method faker.address.streetName
     */
    streetName: function ():string {
        var result;
        var suffix = Address.streetSuffix();
        if (suffix !== "") {
            suffix = " " + suffix
        }
  
        switch (Random.number(1)) {
        case 0:
            result = Name.lastName() + suffix;
            break;
        case 1:
            result = Name.firstName() + suffix;
            break;
        }
        return result;
    },
    /**
     * Returns a random localized street address
     */
    streetAddress: function (useFullAddress:boolean):string {
        if (useFullAddress === undefined) { useFullAddress = false; }
        var address = "";
        switch (Random.number(2)) {
        case 0:
            address = Helpers.replaceSymbolWithNumber("#####") + " " + Address.streetName();
            break;
        case 1:
            address = Helpers.replaceSymbolWithNumber("####") +  " " + Address.streetName();
            break;
        case 2:
            address = Helpers.replaceSymbolWithNumber("###") + " " + Address.streetName();
            break;
        }
        return useFullAddress ? (address + " " + Address.secondaryAddress()) : address;
    },
    streetSuffix: function () {
        return Random.arrayElement(Definitions.address.street_suffix);
    },
    streetPrefix: function () {
        return Random.arrayElement(Definitions.address.street_prefix);
    },
    secondaryAddress: function () {
        return Helpers.replaceSymbolWithNumber(Random.arrayElement(
            [
                'Apt. ###',
                'Suite ###'
            ]
        ));
    },
    county: function () {return Random.arrayElement(Definitions.address.county)},
    country: function () { Random.arrayElement(Definitions.address.country); },
    countryCode: function (alphaCode:string) {
      
        if (typeof alphaCode === 'undefined' || alphaCode === 'alpha-2') {
            return Random.arrayElement(Definitions.address.country_code);
        }
    
        if (alphaCode === 'alpha-3') {
            return Random.arrayElement(Definitions.address.country_code_alpha_3);
        }
          
        return Random.arrayElement(Definitions.address.country_code);
    
    },
    state: function (useAbbr:boolean) {
        return Random.arrayElement(Definitions.address.state);
    },
    stateAbbr: function () {return Random.arrayElement(Definitions.address.state_abbr)},
    latitude: function (max:number=90, min:number=-90, precision:number=4) {
        return Random.number({
          max: max,
          min: min,
          precision: parseFloat((0.0).toPrecision(precision) + '1')
        }).toFixed(precision);
    },
    longitude: function (max:number=180, min:number=-180, precision:number=4) {
        return Random.number({
          max: max,
          min: min,
          precision: parseFloat((0.0).toPrecision(precision) + '1')
        }).toFixed(precision);
    },
    //* "description": "Generates a direction. Use optional useAbbr bool to return abbreviation", "sampleResults": ["Northwest", "South", "SW", "E"] */
    direction: function (useAbbr:boolean) {
        if (typeof useAbbr === 'undefined' || useAbbr === false) {
          return Random.arrayElement(Definitions.address.direction);
        }
        return Random.arrayElement(Definitions.address.direction_abbr);
    },
    /**
     * "description": "Generates a cardinal direction. Use optional useAbbr boolean to return abbreviation",
     * "sampleResults": ["North", "South", "E", "W"]
     */
    cardinalDirection:  function (useAbbr:boolean) {
        if (typeof useAbbr === 'undefined' || useAbbr === false) {
          return (
            Random.arrayElement(Definitions.address.direction.slice(0, 4))
          );
        }
        return (
          Random.arrayElement(Definitions.address.direction_abbr.slice(0, 4))
        );
    },
    ordinalDirection: function (useAbbr:boolean) {
        if (typeof useAbbr === 'undefined' || useAbbr === false) {
          return (
            Random.arrayElement(Definitions.address.direction.slice(4, 8))
          );
        }
        return (
          Random.arrayElement(Definitions.address.direction_abbr.slice(4, 8))
        );
    },
    /**
     * Return a random time zone
     */
    timeZone: function() { return Random.arrayElement(Definitions.address.time_zone); }



}
export default Address