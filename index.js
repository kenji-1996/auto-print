/**
 * Needed libaries to successfully access
 * @type {"fs"}
 * @type {"chokidar"}
 * @type {"cmd"}
 */
const fs = require('fs');
const chokidar = require('chokidar');
const cmd = require('node-cmd');

/**
 * Variables used within the process;
 * Autoprint folder
 * Foxit location,
 * Printer name
 * @type {string}
 */
var autoPrintFolder = '\\\\KENJI-LAPTOP\\autoprint';
var foxit = 'C:\\Program Files (x86)\\Foxit Software\\Foxit Reader\\FoxitReader.exe';
var printer = 'HP Officejet Pro 8620';

/**
 * Loop through provided arguments for the file
 * If found, replace default values
 */
process.argv.forEach(function (val, index, array) {
    if(index == 2) {
        autoPrintFolder = val;
    }
    if(index == 3) {
        foxit = val;
    }
    if(index == 4) {
        printer = val;
    }
});

/**
 * Provides the user with information on the arguments for the process
 */
console.log('Selected folder: ' + autoPrintFolder + '\n' +
    'Foxit location: ' + foxit + '\n' +
    'Selected Printer: ' + printer);

/**
 * File watcher checks provided path foe new files
 * Timer that resets on file changes
 */
var watcher = chokidar.watch(autoPrintFolder, {ignored: /^\./, persistent: true});
var initialTimer;

/**
 * Watch for file changes
 * @function {attemptPrint} Starts after clearing the timer
 * ensuring that the printing doesn't start premature
 */
watcher
    .on('change', function(path) {//wait 10 seconds before attempting to print
        console.log('File', path, 'has been changed');
        clearTimeout(initialTimer);
        attemptPrint(path);
    });

/**
 * When run, the function sets an empty var as a timer
 * After the timeout is reached, the file is checked to see its okay to write
 * @param path
 */
function attemptPrint(path) {
    initialTimer = setTimeout(function() {
        canWrite(path, function(err, isWritable) {
            if(isWritable) {
                pdfPrint(path);
            }
        });
    },15000);
}

/**
 * Prints to PDF using the foxit PDF reader location
 * provided path and printer name.
 * If errors occur they are printed.
 * @param path
 */
function pdfPrint(path) {
    cmd.get('"' + foxit + '" /t ' + path + ' "' + printer + '"', function(err, data, stderr)
    {
        if(!err) {
            console.log('Printing to',path,'successful.');
        }else{
            console.log(err);
        }
        if(data)
            console.log(data);
    });
}

/**
 * Simple check to see if a file can be written to.
 * @param path
 * @param callback
 */
function canWrite(path, callback) {
    fs.access(path, fs.W_OK, function(err) {
        callback(null, !err);
    });
}

