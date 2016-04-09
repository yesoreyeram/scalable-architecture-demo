import {RPCCommand} from '../../../commands/rpc.command';
import {PROGRESS} from './game-p2p.commands';

export const gameProgress = (payload: any, baseCommand: RPCCommand) => {
  baseCommand.payload.appendPair('payload', { text: payload.text });
  baseCommand.payload.appendPair('method', PROGRESS);
  return baseCommand;
};
