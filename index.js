module.exports = class Logger {
    constructor(settings) {
      this.production = settings.production;
    }
  
    log(message, type) {
        let type2 = null
        let iserr = false

        if (type === "DEBUG") type2 = "\x1b[95mDEBUG\x1b[0m  "
        if (type === "SUCCESS") type2 = "\x1b[92mSUCCESS\x1b[0m"
        if (type === "INFO") type2 = "\x1b[94mINFO\x1b[0m   "
        if (type === "WARN") type2 = "\x1b[93mWARN\x1b[0m   "
        if (type === "ERROR") { type2 = "\x1b[41mERROR\x1b[0m  "; iserr = true }
        if (type === "FATAL") { type2 = "\x1b[101mFATAL\x1b[0m  "; iserr = true }

        const ret = (new Error()).stack.split('\n')[3].split('(')[1].split(')')[0];
        const date = new Date();
        const printstr = `\x1b[2m[${date.getFullYear()}-${date.getMonth()}-${date.getDay()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}.${date.getMilliseconds()}]\x1b[0m ${type2} \x1b[2m[${ret.substr(0, ret.lastIndexOf(":"))}]\x1b[0m ${message}\n`

        if (iserr) process.stderr.write(printstr)
        else process.stdout.write(printstr)
    }
  }