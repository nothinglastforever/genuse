/**
 * Created by ZTS on 2016/4/15.
 */
var LogToArray = require('./lib/logtoarray');
var Promise = require('any-promise');
var logfile = 'D:\\temp\\WFC_log_temp.txt';
var DataGrouper = require('./lib/DataGrouper');
var _ = require('lodash');



DataGrouper.register("rules", function(item) {
    return _.extend({}, item.key, {RemoteAdds: _.map(item.vals, function(item) {
        return item.RemoteAdds;
    }).join(",")});
});

var display = (function() {
    // Function display() is used to show text only
    var output = "";
    var display = function(text, sameLine) {
        return output += (sameLine ? "" : "\n") + text;
    };

    //
    display.obj = function(obj) {
        //
        // console.log(display(JSON.stringify(obj, null, 4)));
        require('fs').writeFile(

            'D:\\temp\\my.json',

            JSON.stringify(obj,null,4),

            function (err) {
                if (err) {
                    console.error('Crap happens');
                }
            }
        );
        display("");
    };
    return display;
}());

// console.log(display('DataGrouper.sum(data, ["test"]):'));


function rulesMerged(rule) {
    // console.log(rule);
    display.obj(DataGrouper.rules(rule, ["Name","Program","Direction","RemotePorts","Protocol"]));
}
LogToArray(logfile,rulesMerged);












