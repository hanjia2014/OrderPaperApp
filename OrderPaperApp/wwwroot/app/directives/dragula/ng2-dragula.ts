import {Dragula} from './dragula.directive';
import {DragulaService} from './dragula.provider';

export * from './dragula.directive';
export * from './dragula.provider';

export default {
  directives: [Dragula],
  providers: [DragulaService]
};