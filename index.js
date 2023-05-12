module.exports = class l {
    constructor(s) {
      this.p = s.production;
    }
  
    log(m, o) {
        let t = null
        let e = false
        const a ="\x1b["

        if (o === "DEBUG") { if (this.p) return; t = `${a}95mDEBUG${a}0m  ` }
        if (o === "SUCCESS") t = `${a}92mSUCCESS${a}0m`
        if (o === "INFO") t = `${a}94mINFO${a}0m   `
        if (o === "WARN") t = `${a}93mWARN${a}0m   `
        if (o === "ERROR") { t = `${a}91mERROR${a}0m  `; e = true }
        if (o === "FATAL") { t = `${a}101mFATAL${a}0m  `; e = true }

        const r = (new Error()).stack.split('\n')[3].split('(')[1].split(')')[0];
        const d = new Date();
        const p = `${a}2m[${d.toISOString().replace(/T/, ' ').replace(/Z/, '')}]${a}0m ${t} ${a}2m[${r.substr(0, r.lastIndexOf(":"))}]${a}0m ${m}\n`

        if (e) process.stderr.write(p)
        else process.stdout.write(p)
    }
  }
