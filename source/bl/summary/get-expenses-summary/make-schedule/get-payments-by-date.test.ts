import getPaymentsByDate from './get-payments-by-date';
import { Payment } from '../../../../shared';

describe('getPaymentsByDate', () => {
  let payments: Payment[] = [];

  beforeEach(() => {
    payments = [
      new Payment({
        date: '2023-09-30',
        sum: 1,
      }),
      new Payment({
        date: '2023-10-01',
        sum: 2,
      }),
      new Payment({
        date: '2023-10-01',
        sum: 1,
      }),
      new Payment({
        date: '2023-10-02',
        sum: 2,
      }),
    ];
  })

  it('should return correct payments by specific date', () => {
    const targetDate = '2023-10-01';

    const selectedPayments = getPaymentsByDate(payments, targetDate);

    expect(selectedPayments).toHaveLength(2);

    const actualSum = selectedPayments.reduce((result: number, payment:Payment) => {
      return result + payment.sum;
    }, 0);

    expect(actualSum).toBe(3);
  });

  it('should return correct payments by if time is end of the day', () => {
    const targetDate = '2023-10-02';

    const selectedPayments = getPaymentsByDate(payments, targetDate);

    expect(selectedPayments).toHaveLength(1);

    const actualSum = selectedPayments.reduce((result: number, payment:Payment) => {
      return result + payment.sum;
    }, 0);

    expect(actualSum).toBe(2);
  });
});