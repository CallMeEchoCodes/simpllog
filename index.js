module.exports = class Logger {
    constructor(settings) {
      this.production = settings.production;
    }
  
    log(message, type) {
        let t = null
        let e = false
        const a ="\x1b["

        if (type === "DEBUG") t = `${a}95mDEBUG${a}0m  `
        if (type === "DEBUG" && this.production) return
        if (type === "SUCCESS") t = `${a}92mSUCCESS${a}0m`
        if (type === "INFO") t = `${a}94mINFO${a}0m   `
        if (type === "WARN") t = `${a}93mWARN${a}0m   `
        if (type === "ERROR") { t = `${a}41mERROR${a}0m  `; e = true }
        if (type === "FATAL") { t = `${a}101mFATAL${a}0m  `; e = true }

        const r = (new Error()).stack.split('\n')[3].split('(')[1].split(')')[0];
        const d = new Date();
        const p = `${a}2m[${d.getFullYear()}-${d.getMonth()}-${d.getDay()} ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}.${d.getMilliseconds()}]${a}0m ${t} ${a}2m[${r.substr(0, r.lastIndexOf(":"))}]${a}0m ${message}\n`

        if (e) process.stderr.write(p)
        else process.stdout.write(p)
    }
  }