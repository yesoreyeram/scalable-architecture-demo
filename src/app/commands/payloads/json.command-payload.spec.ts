import {JsonPayload} from './json.command-payload';
export function main() {
  describe('JsonPayload Service', () => {
    let jsonPayload: JsonPayload;

    it('should set properly data in constructor', () => {
      jsonPayload = new JsonPayload({
        foo: 'bar'
      });
      expect(jsonPayload.serialize()).toBe('{ "foo": "bar" }');
    });
    it('should append new fields', () => {
      jsonPayload = new JsonPayload({
        foo: 'bar'
      });
      jsonPayload.appendPair('baz', 'bar');
      expect(jsonPayload.serialize()).toBe('{ "foo": "bar", "baz": "bar" }');
    });
  });
}
