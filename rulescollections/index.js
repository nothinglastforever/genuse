var fs = require('fs'),
    DataGrouper = require('./DataGrouper'),
    NaturalSort = require('./naturalSort'),
    _ = require('lodash');

var array1;
var array2;

function toUnique(a,b,c){//array,placeholder,placeholder
    b=a.length;
    //original version, the type of array's elemets is string
    // while(c=--b)while(c--)a[b]!==a[c]||a.splice(c,1);

    //revised for  array with object elements
    while(c=--b)while(c--)JSON.stringify(a[b])!==JSON.stringify(a[c])||a.splice(c,1);
    return a;// not needed ;)
}

DataGrouper.register("rules", function (item) {
    return _.extend({}, item.key, {
        RemoteAdds: _.map(item.vals, function (item) {
                        return item.RemoteAdds.replace(/\s/g, '');
                    }).join(",")
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
        //console.log(display(JSON.stringify(obj, null, 4)));
        // display("");
        obj.forEach(function(ele){

            ele.RemoteAdds = toUnique(ele.RemoteAdds.split(",")).sort(NaturalSort).toString();
        });


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
    //console.log(array1);

});

fs.readFile('D:\\temp\\my1.json', function (err, data) {
    if (err) throw err;
    array2 = jsonlogToArray(data);
    rulesMerged(array2.concat(array1));

});


