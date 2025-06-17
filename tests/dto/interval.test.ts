import { Interval } from '../../source/shared';

describe('Interval DTO tests', () => {
   it('Interval length getter returns proper days cound', () => {
       const interval = new Interval({
           start: '2025-06-01',
           end: '2025-06-30'
       });

       expect(interval.length).toBe(30);
   });
});