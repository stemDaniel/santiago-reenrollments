import mongoose from 'mongoose';

import NewReenrollmentDTO from '@modules/reenrollment/dtos/NewReenrollmentDTO';

import {
    ReenrollmentSchema,
    IReenrollment,
} from '@modules/reenrollment/infra/mongoose/schemas/ReenrollmentSchema';

interface IRequest extends NewReenrollmentDTO {
    enrollment_number: number;
}

class NewEnrollmentService {
    public async execute({
        enrollment_number,
        ...rest
    }: IRequest): Promise<void> {
        const Reenrollment = mongoose.model<IReenrollment>(
            'Reenrollment',
            ReenrollmentSchema,
        );

        await Reenrollment.findOneAndUpdate(
            {
                enrollment_number,
            },
            {
                ...rest,
            },
            {
                useFindAndModify: false,
            },
        );
    }
}

export default NewEnrollmentService;
