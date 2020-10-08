import { Request, Response } from 'express';

import GetReenrollmentDataService from '@modules/reenrollment/services/GetReenrollmentDataService';
import PrettierDataService from '@modules/reenrollment/services/PrettierDataService';
import GenerateReenrollmentFormPdfService from '@modules/reenrollment/services/GenerateReenrollmentFormPdfService';
import GenerateContractPdfService from '@modules/reenrollment/services/GenerateContractPdfService';
import GenerateChecklistPdfService from '@modules/reenrollment/services/GenerateChecklistPdfService';
import GenerateMonthlyControlPdfService from '@modules/reenrollment/services/GenerateMonthlyControlPdfService';
import GeneratePDFModelService from '@modules/reenrollment/services/GeneratePDFModelService';
import AppError from '@shared/errors/AppError';

class ReenrollmentsPDFsController {
    public async create(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const generatePDFModel = new GeneratePDFModelService();

        const filename = await generatePDFModel.execute();

        return response.json(filename);
    }

    public async update(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { enrollment_number } = request.params;

        const {
            discount_percent,
            contract_year,
            monthly_value,
            total_value,
        } = request.body;

        if (
            discount_percent < 0 ||
            discount_percent > 100 ||
            (discount_percent !== 0 && !discount_percent)
        ) {
            throw new AppError('Desconto inválido!');
        }

        if (contract_year !== '2020' && contract_year !== '2021') {
            throw new AppError('Ano de contrato inválido!');
        }

        const number = parseInt(enrollment_number, 10);

        if (typeof number !== 'number') {
            throw new AppError('Número de matrícula inválido!');
        }

        const getReenrollmentData = new GetReenrollmentDataService();

        const reenrollment = await getReenrollmentData.execute({
            enrollment_number: number,
        });

        if (!reenrollment) {
            throw new AppError('Número de matrícula inválido!');
        }

        const prettierData = new PrettierDataService();

        const generateReenrollmentFormPdf = new GenerateReenrollmentFormPdfService();

        const generateContractPdf = new GenerateContractPdfService();

        const generateChecklistPdf = new GenerateChecklistPdfService();

        const generateMonthlyControlPdf = new GenerateMonthlyControlPdfService();

        const prettierReenrollment = prettierData.execute(reenrollment);

        const [
            reenrollmentForm,
            contract,
            checklist,
            monthlyControl,
        ] = await Promise.all([
            generateReenrollmentFormPdf.execute(
                prettierReenrollment,
                contract_year,
            ),
            generateContractPdf.execute(
                prettierReenrollment,
                contract_year,
                monthly_value,
                total_value,
            ),
            generateChecklistPdf.execute(prettierReenrollment, contract_year),
            generateMonthlyControlPdf.execute({
                reenrollment: prettierReenrollment,
                discount_percent,
                contract_year,
                monthly_value,
            }),
        ]);

        return response.json([
            {
                name: 'Ficha de rematrícula',
                link: reenrollmentForm,
            },
            {
                name: 'Contrato',
                link: contract,
            },
            {
                name: 'Checklist',
                link: checklist,
            },
            {
                name: 'Controle de mensalidade',
                link: monthlyControl,
            },
        ]);
    }
}

export default ReenrollmentsPDFsController;
