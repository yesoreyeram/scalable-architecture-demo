import {beforeMethod, Metadata} from 'aspect.js';

class LoggerAspect {
  @beforeMethod({
    classNamePattern: /^Model$/,
    methodNamePattern: /^performAsyncAction$/
  })
  logBeforeMethod(meta: Metadata) {
    console.log(`Before invocation of ${meta.className}.${meta.method.name}.`);
  }
}
