import { NodaTimePipe } from "../noda-time.pipe";

describe('NodaTimePipe', () => {
  it('create an instance', () => {
    const pipe = new NodaTimePipe();
    expect(pipe).toBeTruthy();
  });
});
