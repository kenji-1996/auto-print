var chokidar = require('chokidar');

// One-liner for current directory, ignores .dotfiles
chokidar.watch('\\\\NEO-TH-AD12\\files\\scanned-files\\auto-print', {usePolling: true}).on('all', (event, path) => {
});
var watcher = chokidar.watch('\\\\NEO-TH-AD12\\files\\scanned-files\\auto-print', {
    ignored: /(^|[\/\\])\../,
    persistent: true,
    usePolling: true,
    awaitWriteFinish: true
});
watcher
    .on('add', path => log(`File ${path} has been added`))

var log = console.log.bind(console);