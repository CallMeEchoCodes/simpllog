import { dim, bold, greenBright, magentaBright, blueBright, yellowBright, bgRed, bgRedBright } from 'colorette'
import path from 'path';

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
    return `${date.getFullYear()}-${date.getMonth()}-${date.getDay()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}.${date.getMilliseconds()}`;
  }

  public debug(message: string) {
    if (this.production) return
    process.stdout.write(`${dim(`[${this.getTime()}]`)} ${magentaBright(bold('DEBUG'))}   ${dim(`[${this.getCallerFile()}]`)} ${message}\n`);
  }

  public success(message: string) {
    process.stdout.write(`${dim(`[${this.getTime()}]`)} ${greenBright(bold('SUCCESS'))} ${dim(`[${this.getCallerFile()}]`)} ${message}\n`);
  }

  public info(message: string) {
    process.stdout.write(`${dim(`[${this.getTime()}]`)} ${blueBright(bold('INFO'))}    ${dim(`[${this.getCallerFile()}]`)} ${message}\n`);
  }

  public warn(message: string) {
    process.stdout.write(`${dim(`[${this.getTime()}]`)} ${yellowBright(bold('WARN'))}    ${dim(`[${this.getCallerFile()}]`)} ${message}\n`);
  }

  public error(message: string) {
    process.stdout.write(`${dim(`[${this.getTime()}]`)} ${bgRed(bold('ERROR'))}   ${dim(`[${this.getCallerFile()}]`)} ${message}\n`);
  }

  public fatal(message: string) {
    process.stdout.write(`${dim(`[${this.getTime()}]`)} ${bgRedBright(bold('FATAL'))}   ${dim(`[${this.getCallerFile()}]`)} ${message}\n`);
  }
}
