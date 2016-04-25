var fs = require('fs'),
    DataGrouper = require('./DataGrouper'),
    _ = require('lodash');

var array1;
var array2;

DataGrouper.register("rules", function (item) {
    return _.extend({}, item.key, {
        RemoteAdds: _.uniq(_.map(item.vals, function (item) {
            return item.RemoteAdds.replace(/ /g, '');
        })).join(",")
    });
});

var display = (function () {
    // Function display() is used to show text only
    var output = "";
    var display = function (text, sameLine) {
        return output += (sameLine ? "" : "\n") + text;
    };

    //
    display.obj = function (obj) {
        //
        // console.log(display(JSON.stringify(obj, null, 4)));
        // display("");
        require('fs').writeFile(
            'D:\\temp\\my1.json',

            JSON.stringify(obj, null, 4),

            function (err) {
                if (err) {
                    console.error('Crap happens');
                }
            }
        );

    };
    return display;
}());


function rulesMerged(rule) {
    // console.log(rule);
    display.obj(DataGrouper.rules(rule, ["Name", "Program", "Direction", "RemotePorts", "Protocol"]));
}

function jsonlogToArray(data) {

    var parsed = JSON.parse(data);

    var arr = [];

    for (var x in parsed) {
        arr.push(parsed[x]);
    }
    return arr;
}

fs.readFile('D:\\temp\\my.json', function (err, data) {
    if (err) throw err;
    array1 = jsonlogToArray(data);
    // console.log(array1.length);

});

fs.readFile('D:\\temp\\my1.json', function (err, data) {
    if (err) throw err;
    array2 = jsonlogToArray(data);
    rulesMerged(array2.concat(array1));

});


