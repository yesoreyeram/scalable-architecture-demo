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
    const serialized = this._commands.map(c => c.serialize()).concat(currentSerialized).join(',');
    return `[${serialized}]`;
  }
}
