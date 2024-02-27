import getPaymentsByDate from './get-payments-by-date';
import { Payment } from '../../../../shared';

describe('getPaymentsByDate', () => {
  let payments: Payment[] = [];

  beforeEach(() => {
    payments = [
      new Payment({
        time: new Date('2023-09-30T08:41:39.222+03:00'),
        sum: 1,
      }),
      new Payment({
        time: new Date('2023-10-01T11:45:57.732+03:00'),
        sum: 2,
      }),
      new Payment({
        time: new Date('2023-10-01T23:45:57.732+03:00'),
        sum: 1,
      }),
      new Payment({
        time: new Date('2023-10-02T01:45:57.732+03:00'),
        sum: 2,
      }),
    ];
  })

  it('should return correct payments by specific date', () => {
    const targetDate = new Date('2023-10-01T00:00:00.000+03:00');

    const selectedPayments = getPaymentsByDate(payments, targetDate, 'Europe/Riga');

    expect(selectedPayments).toHaveLength(2);

    const actualSum = selectedPayments.reduce((result: number, payment:Payment) => {
      return result + payment.sum;
    }, 0);

    expect(actualSum).toBe(3);
  });

  it('should return correct payments by if time is end of the day', () => {
    const targetDate = new Date('2023-10-02T23:59:59.999+03:00');

    const selectedPayments = getPaymentsByDate(payments, targetDate, 'Europe/Riga');

    expect(selectedPayments).toHaveLength(1);

    const actualSum = selectedPayments.reduce((result: number, payment:Payment) => {
      return result + payment.sum;
    }, 0);

    expect(actualSum).toBe(2);
  });
});