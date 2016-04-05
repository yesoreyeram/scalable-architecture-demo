// import {OpaqueToken} from 'angular2/core';
// import {
//   GET_GUEST_TOKEN_COMMAND_BUILDER, SIGNIN_PARENT_COMMAND_BUILDER,
//   SIGNUP_COMMAND_BUILDER
// } from './parents.command-builder';
// import {LOAD_KIDS_COMMAND_BUILDER, CREATE_KID_COMMAND_BUILDER} from './game.command-builder.ts';
// import {RestfulCommand} from '../../../commands/restful.command';
// import {GET_GUEST_TOKEN, SIGNIN_PARENT, SIGNUP_PARENT} from '../../../actions/parent.actions';
// import {LOAD_KIDS, CREATE_KID} from '../../../actions/game.actions.ts';
//
// export const BP_RESTFUL_COMMAND_BUILDERS = new OpaqueToken('bp-restful-command-builders');
//
// export interface RestfulCommandBuilder {
//   (payload: any, cmd: RestfulCommand): RestfulCommand;
// }
//
// export const CommandBuilders: Map<string, RestfulCommandBuilder> = new Map<string, RestfulCommandBuilder>();
//
// const registerCommandBuilder = (action: string, builder: RestfulCommandBuilder) => CommandBuilders.set(action, builder);
//
// registerCommandBuilder(GET_GUEST_TOKEN, GET_GUEST_TOKEN_COMMAND_BUILDER);
// registerCommandBuilder(SIGNIN_PARENT, SIGNIN_PARENT_COMMAND_BUILDER);
// registerCommandBuilder(SIGNUP_PARENT, SIGNUP_COMMAND_BUILDER);
//
// registerCommandBuilder(LOAD_KIDS, LOAD_KIDS_COMMAND_BUILDER);
// registerCommandBuilder(CREATE_KID, CREATE_KID_COMMAND_BUILDER);
