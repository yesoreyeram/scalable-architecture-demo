import {RequestMethod} from 'angular2/http';
import {RestfulCommand} from '../../../commands/restful.command';
import {JsonPayload} from '../../../commands/payloads/json.command.payload';

export const LOAD_KIDS_COMMAND_BUILDER = (payload: any, cmd: RestfulCommand): RestfulCommand => {
  cmd.method = RequestMethod.Get;
  cmd.payload = new JsonPayload();
  cmd.setResource([{ name: 'kids' }]);
  return cmd;
};

export const CREATE_KID_COMMAND_BUILDER = (payload: any, cmd: RestfulCommand): RestfulCommand => {
  cmd.method = RequestMethod.Post;
  cmd.setResource([{ name: 'kids' }]);
  cmd.payload = new JsonPayload({
    name: payload.name,
    grade: payload.grade,
    gender: payload.gender
  });
  return cmd;
};
