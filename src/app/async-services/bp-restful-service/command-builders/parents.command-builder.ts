import {RequestMethod} from 'angular2/http';
import {RestfulCommand} from '../../../commands/restful.command';
import {JsonPayload} from '../../../commands/payloads/json.command.payload';

export const SIGNUP_COMMAND_BUILDER = (payload: any, cmd: RestfulCommand): RestfulCommand => {
  cmd.method = RequestMethod.Post;
  cmd.payload = new JsonPayload({
    name: payload.name,
    password: payload.password,
    email: payload.email
  });
  cmd.setResource([{ name: 'parents' }]);
  return cmd;
};

export const GET_GUEST_TOKEN_COMMAND_BUILDER = (payload: any, cmd: RestfulCommand): RestfulCommand => {
  cmd.method = RequestMethod.Post;
  cmd.payload = new JsonPayload({
    authorizable: 'guest',
    authorizable_type: 'guest'
  });
  cmd.setResource([{ name: 'auth' }]);
  return cmd;
};

export const SIGNIN_PARENT_COMMAND_BUILDER = (payload: any, cmd: RestfulCommand): RestfulCommand => {
  cmd.method = RequestMethod.Post;
  cmd.payload = new JsonPayload({
    authorizable: payload.email,
    authorizable_type: 'parent',
    password: payload.password
  });
  cmd.setResource([{ name: 'auth' }]);
  return cmd;
};
