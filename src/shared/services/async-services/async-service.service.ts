import {Observable} from 'rxjs/Observable';
import {Action} from '@ngrx/store';

export abstract class AsyncService {
  abstract process(data: Action): Observable<any>;
}
