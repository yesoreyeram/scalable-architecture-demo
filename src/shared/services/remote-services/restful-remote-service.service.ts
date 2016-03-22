import {RemoteService} from './remote-service.service';
import {RestfulCommandBuilder} from '../commands/builders/restful-command-builder.service';

export class RestfulService extends RemoteService {
  constructor(protected builder: RestfulCommandBuilder) {
    super(builder);
  }
}
