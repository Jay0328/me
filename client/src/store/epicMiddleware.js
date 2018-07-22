import { createEpicMiddleware, ofType as ofType$ } from 'redux-observable';
import {
  of as of$,
  from as from$,
  defer as defer$,
  empty as empty$,
  concat as concat$
} from 'rxjs';
import {
  filter as filter$,
  map as map$,
  mapTo as mapTo$,
  tap as tap$,
  switchMap as switchMap$,
  mergeMap as mergeMap$,
  mergeMapTo as mergeMapTo$,
  catchError as catch$
} from 'rxjs/operators';

const dependencies = {
  ofType$,
  of$,
  from$,
  defer$,
  empty$,
  concat$,
  filter$,
  map$,
  mapTo$,
  tap$,
  switchMap$,
  mergeMap$,
  mergeMapTo$,
  catch$
};

export default createEpicMiddleware({ dependencies });
