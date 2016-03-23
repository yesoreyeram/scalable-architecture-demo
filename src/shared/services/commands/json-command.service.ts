import {ExecutableCommand} from './executable-command.service';
import {Command} from './command.service';

export class JsonCommand extends ExecutableCommand {
  concat(command: Command): this {
    this._commands.push(command);
    return this;
  }
  serialize(): string | Blob | ArrayBuffer {
    let currentSerialized: string;
    try {
      currentSerialized = JSON.stringify(this.payload);
    } catch (e) {
      throw new Error(`Invalid JSON command ${this.payload.toString()}`);
    }
    if (!this._commands.length) {
      return currentSerialized;
    } else {
      const serialized = this._commands.map(c => c.serialize()).concat(currentSerialized).join(',');
      return `[${serialized}]`;
    }
  }
  processResponse(response: any) {
    try {
      return JSON.parse(response);
    } catch (e) {
      debugger;
      return {
        foo: 42
      };
      // throw new Error(`Cannot\' parse ${response} to JSON.`);
    }
  }
}
