module.exports = class Logger {
  production: boolean;
  
  constructor(process: NodeJS.Process, settings: { production: boolean; }) {
    this.production = settings.production;
  }

  private getCallerFile() {
    let ret = (new Error() as any).stack.split('\n')[3].split('(')[1].split(')')[0];
    return ret.substr(0, ret.lastIndexOf(":"));
  }

  private getTime() {
    const date = new Date();
    return `\x1b[2m[${date.getFullYear()}-${date.getMonth()}-${date.getDay()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}.${date.getMilliseconds()}]\x1b[0m`;
  }

  public debug(message: string) {
    if (this.production) return
    process.stdout.write(`${this.getTime()} \x1b[1;95mDEBUG\x1b[0m   \x1b[2m[${this.getCallerFile()}]\x1b[0m ${message}\n`);
  }

  public success(message: string) {
    process.stdout.write(`${this.getTime()} \x1b[1;92mSUCCESS\x1b[0m \x1b[2m[${this.getCallerFile()}]\x1b[0m ${message}\n`);
  }

  public info(message: string) {
    process.stdout.write(`${this.getTime()} \x1b[1;94mINFO\x1b[0m    \x1b[2m[${this.getCallerFile()}]\x1b[0m ${message}\n`);
  }

  public warn(message: string) {
    process.stdout.write(`${this.getTime()} \x1b[1;93mWARN\x1b[0m    \x1b[2m[${this.getCallerFile()}]\x1b[0m ${message}\n`);
  }

  public error(message: string) {
    process.stdout.write(`${this.getTime()} \x1b[41mERROR\x1b[0m   \x1b[2m[${this.getCallerFile()}]\x1b[0m ${message}\n`);
  }

  public fatal(message: string) {
    process.stdout.write(`${this.getTime()} \x1b[101mFATAL\x1b[0m   \x1b[2m[${this.getCallerFile()}]\x1b[0m ${message}\n`);
  }
}
