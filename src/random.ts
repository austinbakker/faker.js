// TODO
// var mersenne = require('../vendor/mersenne');


// TODO
// function Random (faker, seed) {
//     // Use a user provided seed if it exists
//     if (seed) {
//       if (Array.isArray(seed) && seed.length) {
//         mersenne.seed_array(seed);
//       }
//       else {
//         mersenne.seed(seed);
//       }
//     }



    
const Random = {
    /**
    * returns a single random number based on a max number or range
    */
    number: function (options:{min?:number,max?:number,precision?:number}) {

        if (typeof options === "number") {
        options = {
            max: options
        };
        }

        options = options || {};

        if (typeof options.min === "undefined") {
        options.min = 0;
        }

        if (typeof options.max === "undefined") {
        options.max = 99999;
        }
        if (typeof options.precision === "undefined") {
        options.precision = 1;
        }

        // Make the range inclusive of the max value
        var max = options.max;
        if (max >= 0) {
        max += options.precision;
        }

        var randomNumber = Math.floor(
        mersenne.rand(max / options.precision, options.min / options.precision));
        // Workaround problem in Float point arithmetics for e.g. 6681493 / 0.01
        randomNumber = randomNumber / (1 / options.precision);

        return randomNumber;
  },
  /**
   * returns a single random floating-point number based on a max number or range
   */
  float: function (options:{min?:number,max?:number,precision?:number}) {
        if (typeof options === "number") {
        options = {
            precision: options
        };
        }
        options = options || {};
        var opts:any = {};
        for (var p in options) {
        opts[p] = options[p];
        }
        if (typeof opts.precision === 'undefined') {
        opts.precision = 0.01;
        }
        return Random.number(opts);
    },
    /**
     * takes an array and returns a random element of the array
     */
    arrayElement: function (array:[]) {
        array = array || ["a", "b", "c"];
        var r = Random.number({ max: array.length - 1 });
        return array[r];
    },
    /**
     * takes an array and returns a subset with random elements of the array
     */
    arrayElements: function (array:[], count:number) {
        array = array || ["a", "b", "c"];

        if (typeof count !== 'number') {
            count = Random.number({ min: 1, max: array.length });
        } else if (count > array.length) {
            count = array.length;
        } else if (count < 0) {
            count = 0;
        }

        var arrayCopy = array.slice();
        var countToRemove = arrayCopy.length - count;
        for (var i = 0; i < countToRemove; i++) {
            var indexToRemove = Random.number({ max: arrayCopy.length - 1 });
            arrayCopy.splice(indexToRemove, 1);
        }

        return arrayCopy;
    },
    /**
     * takes an object and returns the randomly key or value
     */
    objectElement: function (object:object, field:string) {
        object = object || { "foo": "bar", "too": "car" };
        var array = Object.keys(object);
        var key = Random.arrayElement(array);

        return field === "key" ? key : object[key];
    },
    /**
    * uuid
    */
    uuid: function () {
        var RFC4122_TEMPLATE = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx';
        var replacePlaceholders = function (placeholder:string) {
            var random = Random.number({ min: 0, max: 15 });
            var value = placeholder == 'x' ? random : (random &0x3 | 0x8);
            return value.toString(16);
        };
        return RFC4122_TEMPLATE.replace(/[xy]/g, replacePlaceholders);
    },
    /**
     * boolean
     */
    boolean:  function () { return !!Random.number(1) },
    /**
     * word
     */
    word: function (type:string) {
        var wordMethods = [
        'commerce.department',
        'commerce.productName',
        'commerce.productAdjective',
        'commerce.productMaterial',
        'commerce.product',
        'commerce.color',

        'company.catchPhraseAdjective',
        'company.catchPhraseDescriptor',
        'company.catchPhraseNoun',
        'company.bsAdjective',
        'company.bsBuzz',
        'company.bsNoun',
        'address.streetSuffix',
        'address.county',
        'address.country',
        'address.state',

        'finance.accountName',
        'finance.transactionType',
        'finance.currencyName',

        'hacker.noun',
        'hacker.verb',
        'hacker.adjective',
        'hacker.ingverb',
        'hacker.abbreviation',

        'name.jobDescriptor',
        'name.jobArea',
        'name.jobType'];

        // randomly pick from the many faker methods that can generate words
        var randomWordMethod = Random.arrayElement(wordMethods);
        var result = Fake('{{' + randomWordMethod + '}}');
        return Random.arrayElement(result.split(' '));
    },
    /**
    * randomWords
    */
    words: function (count:number) {
        var words:string[] = [];
        if (typeof count === "undefined") {
        count = Random.number({min:1, max: 3});
        }
        for (var i = 0; i<count; i++) {
        words.push(Random.word());
        }
        return words.join(' ');
    },
    image: function randomImage () {return Image.image()},
    locale: function randomLocale () {
        return Random.arrayElement(Object.keys(Locales));
    },
    /**
    * alpha. returns lower/upper alpha characters based count and upcase options
    */
    alpha: function (options:{count:number=1,upcase:boolean=false}) {
        var wholeString = "";
        for(var i = 0; i < options.count; i++) {
        wholeString += Random.arrayElement(["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]);
        }

        return options.upcase ? wholeString.toUpperCase() : wholeString;
    },
    hexaDecimal: function(count:number=1) {
        var wholeString = "";
        for(var i = 0; i < count; i++) {
            wholeString += Random.arrayElement(["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f", "A", "B", "C", "D", "E", "F"]);
        }
        return "0x"+wholeString;
    }

}
export default Random
