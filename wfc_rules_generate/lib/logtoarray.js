//LogToArray:
//  1 : create a readable stream from csv file;
//  2 : transform  csvstream to object duplex stream;
//  3 : pipe the step2 stream to an readyable stream;
//  4 : stream to array, return a promise,when resolved, invoke callback function.


var Stream = require('stream').Stream, csvtoparser = require('./csvtoparser'), toArray = require('stream-to-array');

var arraystream = new Stream.Transform({objectMode: true});
arraystream._hasWritten = false;


arraystream._transform = function (chunk, encoding, callback) {
    // console.log('_transform:' + chunk);
    if (!this._hasWritten) {
        this._hasWritten = true;
        this.push(chunk);

    } else {
        this.push(chunk);
    }
    callback();
};

// arraystream._flush = function (callback) {
//     // console.log('_flush:');
//     // this.push();
//     callback();
//
// };


function toUnique(a,b,c){//array,placeholder,placeholder
    b=a.length;
    //original version, the type of array's elemets is string
    // while(c=--b)while(c--)a[b]!==a[c]||a.splice(c,1);

    //revised for  array with object elements
    while(c=--b)while(c--)JSON.stringify(a[b])!==JSON.stringify(a[c])||a.splice(c,1);
    //return a // not needed ;)
}

function LogToArray(filename,callback) {
    var fs = require('fs');
    var rr = fs.createReadStream(filename);
    
    toArray(rr.pipe(csvtoparser()).pipe(arraystream))
    // .pipe(JSONStream.stringify(op = '',sep = '',cl = null))
    //.pipe(process.stdout)
        .then(function (parts) {
            toUnique(parts);
            // console.log (parts);
            // return  parts;
            callback(parts);
         });

}

module.exports = function(filename,callback) {
    return new LogToArray(filename,callback);
};


// process.stdin.pipe(parser()).pipe(JSONStream.stringify()).pipe(process.stdout)
// process.stdout.on('error', process.exit);

