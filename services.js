var os = require('os');
module.exports.getCpuInfo = function() {
    return os.cpus();
};

module.exports.getNetworkInfo = function() {
    return os.networkInterfaces();
};

module.exports.getArchInfo = function() {
    return os.arch();
};

module.exports.getHostName = function() {
    return os.hostname();
};