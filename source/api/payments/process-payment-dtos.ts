import { Payment } from '../../shared';

export default function processPaymentDtos(dtos: any): Payment[] {
	if (!Array.isArray(dtos)) {
		dtos = [dtos];
	}

	return dtos.map((dto: any) => new Payment(dto));
}
