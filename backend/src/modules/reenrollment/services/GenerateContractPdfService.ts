import PDFMake from 'pdfmake';
import mongoose from 'mongoose';
import fs from 'fs';
import { resolve } from 'path';
import { v4 } from 'uuid';
import { format as formatDate } from 'date-fns';
import { TDocumentDefinitions } from 'pdfmake/interfaces';

import AppError from '@shared/errors/AppError';
import {
    ReenrollmentSchema,
    IReenrollment,
} from '@modules/reenrollment/infra/mongoose/schemas/ReenrollmentSchema';

interface IRequest {
    _id: string;
}

class GenerateContractPdfService {
    public async execute({ _id }: IRequest): Promise<string> {
        const Reenrollment = mongoose.model<IReenrollment>(
            'Reenrollment',
            ReenrollmentSchema,
        );

        const reenrollment = await Reenrollment.findOne({
            student_name: _id,
        });

        if (!reenrollment) {
            throw new AppError('Rematrícula inválida!');
        }

        reenrollment.student_name = this.capitalize(reenrollment.student_name);
        reenrollment.student_birth_city = this.capitalize(
            reenrollment.student_birth_city,
        );
        reenrollment.student_birth_state = this.capitalize(
            reenrollment.student_birth_state,
        );
        reenrollment.student_nacionality = this.capitalize(
            reenrollment.student_nacionality,
        );
        reenrollment.financial_name = this.capitalize(
            reenrollment.financial_name,
        );
        reenrollment.financial_email = reenrollment.financial_email.toLowerCase();
        reenrollment.financial_nacionality = this.capitalize(
            reenrollment.financial_nacionality,
        );
        reenrollment.financial_civil_state = this.capitalize(
            reenrollment.financial_civil_state,
        );
        reenrollment.financial_address_street = this.capitalize(
            reenrollment.financial_address_street,
        );
        reenrollment.financial_address_neighborhood = this.capitalize(
            reenrollment.financial_address_neighborhood,
        );
        reenrollment.financial_address_complement = this.capitalize(
            reenrollment.financial_address_complement,
        );
        reenrollment.financial_address_city = this.capitalize(
            reenrollment.financial_address_city,
        );
        reenrollment.financial_profission = this.capitalize(
            reenrollment.financial_profission,
        );
        reenrollment.supportive_name = this.capitalize(
            reenrollment.supportive_name,
        );
        reenrollment.supportive_email = reenrollment.supportive_email.toLowerCase();
        reenrollment.supportive_nacionality = this.capitalize(
            reenrollment.supportive_nacionality,
        );
        reenrollment.supportive_civil_state = this.capitalize(
            reenrollment.supportive_civil_state,
        );
        reenrollment.supportive_address_street = this.capitalize(
            reenrollment.supportive_address_street,
        );
        reenrollment.supportive_address_neighborhood = this.capitalize(
            reenrollment.supportive_address_neighborhood,
        );
        reenrollment.supportive_address_complement = this.capitalize(
            reenrollment.supportive_address_complement,
        );
        reenrollment.supportive_address_city = this.capitalize(
            reenrollment.supportive_address_city,
        );
        reenrollment.supportive_profission = this.capitalize(
            reenrollment.supportive_profission,
        );
        reenrollment.student_origin_school = this.capitalize(
            reenrollment.student_origin_school,
        );
        reenrollment.student_health_plan = this.capitalize(
            reenrollment.student_health_plan,
        );
        reenrollment.student_food_alergy = this.capitalize(
            reenrollment.student_food_alergy,
        );
        reenrollment.student_medication_alergy = this.capitalize(
            reenrollment.student_medication_alergy,
        );
        reenrollment.student_health_problem = this.capitalize(
            reenrollment.student_health_problem,
        );
        reenrollment.student_special_necessities = this.capitalize(
            reenrollment.student_special_necessities,
        );

        const fonts = {
            Arial: {
                normal: resolve(
                    __dirname,
                    '..',
                    '..',
                    '..',
                    'assets',
                    'fonts',
                    `arial.ttf`,
                ),
                bold: resolve(
                    __dirname,
                    '..',
                    '..',
                    '..',
                    'assets',
                    'fonts',
                    `arialbd.ttf`,
                ),
            },
        };

        const printer = new PDFMake(fonts);

        const docDefinition = {
            pageSize: 'A4',
            pageOrientation: 'portrait',
            pageMargins: [25, 25, 25, 25],
            info: {
                title: 'Contrato de Prestação de Serviços Educacionais',
                author: 'Colégio Santiago',
                subject: 'Contrato de Prestação de Serviços Educacionais',
                keywords: 'Contrato',
                creator: 'Colégio Santiago',
                producer: 'Colégio Santiago',
            },
            styles: {
                headerTitle: {
                    font: 'Arial',
                    fontSize: 16,
                    alignment: 'center',
                },
                headerSubtitle: {
                    font: 'Arial',
                    fontSize: 10,
                    alignment: 'center',
                },
                heading: {
                    font: 'Arial',
                    fontSize: 14,
                    bold: true,
                    alignment: 'center',
                },
                subheading: {
                    font: 'Arial',
                    fontSize: 12,
                    bold: true,
                    alignment: 'center',
                },
                clausule: {
                    bold: true,
                    decoration: 'underline',
                },
            },
            defaultStyle: {
                font: 'Arial',
                fontSize: 8,
                lineHeight: 1.33,
            },
            content: [
                // INÍCIO
                {
                    columns: [
                        {
                            image: resolve(
                                __dirname,
                                '..',
                                '..',
                                '..',
                                'assets',
                                'images',
                                'logo.png',
                            ),
                            width: 90,
                            alignment: 'center',
                        },
                        {
                            text:
                                'Inst. Educacional Doce Mel\nColegio Santiago Ltda',
                            style: 'headerTitle',
                        },
                        {
                            text: '',
                            width: 90,
                        },
                    ],
                },
                {
                    text:
                        'Dá instrução ao sábio e ele se fará mais sábio, ensina o justo e ele crescerá em entendimento. Prov.9.9',
                    style: 'headerSubtitle',
                },
                {
                    text:
                        '\nCONTRATO DE PRESTAÇÃO DE SERVIÇOS\nEDUCACIONAIS POR ADESÃO',
                    style: 'heading',
                },
                {
                    text: `Emitido em ${formatDate(new Date(), 'dd/MM/yyyy')}`,
                    style: 'subheading',
                },
                // DESCRIÇÃO
                {
                    text: [
                        '\nPor este instrumento particular e na melhor forma de Direito, o ',
                        {
                            text:
                                'INSTITUTO EDUCACIONAL DOCE MEL COLÉGIO SANTIAGO LTDA-ME',
                            bold: true,
                        },
                        ', empresa mantenedora, CNPJ 04.379.032/0001-09, doravante denominado ',
                        {
                            text: 'CONTRATADO',
                            bold: true,
                        },
                        ', e de outro lado, como ',
                        {
                            text: 'CONTRATANTES',
                            bold: true,
                        },
                        ', por si e pelo aluno(a) beneficiário(a), identificados no quadro abaixo, nos termos da legislação em vigor, resolvem acordar os termos de contratação de serviços educacionais oferecidos pelo ',
                        {
                            text: 'CONTRATADO',
                            bold: true,
                        },
                        ', para o ano de 2021 conforme cláusulas que seguem:',
                    ],
                },
                // RESPONSÁVEL FINANCEIRO
                {
                    text:
                        '\nIDENTIFICAÇÃO DO CONTRATANTE RESPONSÁVEL – (MAIOR DE 18 ANOS)',
                    bold: true,
                },
                {
                    columns: [
                        {
                            width: '*',
                            text: `Sr./Sra.: ${reenrollment.financial_name}`,
                        },
                        {
                            alignment: 'right',
                            text: `Data de nascimento: ${formatDate(
                                reenrollment.financial_birth_date,
                                'dd/MM/yyyy',
                            )}`,
                        },
                    ],
                },
                {
                    columns: [
                        `Parentesco Com o Aluno: ${reenrollment.financial_kinship}`,
                        {
                            width: '*',
                            alignment: 'center',
                            text: `Nacionalidade: ${reenrollment.financial_nacionality}`,
                        },
                        {
                            alignment: 'right',
                            text: `Estado Civil: ${reenrollment.financial_civil_state}`,
                        },
                    ],
                },
                {
                    columns: [
                        `Profissão: ${reenrollment.financial_profission}`,
                        {
                            width: '*',
                            alignment: 'center',
                            text: `CPF: ${reenrollment.financial_cpf}`,
                        },
                        {
                            alignment: 'right',
                            text: `RG: ${reenrollment.financial_rg}`,
                        },
                    ],
                },
                {
                    columns: [
                        `Telefone Residencial: ${reenrollment.financial_residencial_phone}`,
                        {
                            width: '*',
                            alignment: 'center',
                            text: `Telefone Comercial: ${reenrollment.financial_commercial_phone}`,
                        },
                        {
                            alignment: 'right',
                            text: `Telefone Celular: ${reenrollment.financial_personal_phone}`,
                        },
                    ],
                },
                {
                    columns: [
                        {
                            width: '*',
                            text: [
                                `Rua ${reenrollment.financial_address_street}`,
                                `, Nº ${reenrollment.financial_address_number}`,
                                `, Bairro ${reenrollment.financial_address_neighborhood}`,
                                `, Cidade ${reenrollment.financial_address_city}`,
                            ],
                        },
                        {
                            text: ` CEP: ${reenrollment.financial_address_cep}`,
                            alignment: 'right',
                        },
                    ],
                },
                `E-mail: ${reenrollment.financial_email}`,
                // RESPONSÁVEL SOLIDÁRIO
                {
                    text:
                        '\nIDENTIFICAÇÃO DO CONTRATANTE SOLIDÁRIO – (MAIOR DE 18 ANOS)',
                    bold: true,
                },
                {
                    columns: [
                        {
                            width: '*',
                            text: `Sr./Sra.: ${reenrollment.supportive_name}`,
                        },
                        {
                            alignment: 'right',
                            text: `Data de Nascimento: ${formatDate(
                                reenrollment.supportive_birth_date,
                                'dd/MM/yyyy',
                            )}`,
                        },
                    ],
                },
                {
                    columns: [
                        `Parentesco com o aluno: ${reenrollment.supportive_kinship}`,
                        {
                            width: '*',
                            alignment: 'center',
                            text: `Nacionalidade: ${reenrollment.supportive_nacionality}`,
                        },
                        {
                            alignment: 'right',
                            text: `Estado Civil: ${reenrollment.supportive_civil_state}`,
                        },
                    ],
                },
                {
                    columns: [
                        `Profissão: ${reenrollment.supportive_profission}`,
                        {
                            width: '*',
                            alignment: 'center',
                            text: `CPF: ${reenrollment.supportive_cpf}`,
                        },
                        {
                            alignment: 'right',
                            text: `RG: ${reenrollment.supportive_rg}`,
                        },
                    ],
                },
                {
                    columns: [
                        `Telefone Residencial: ${reenrollment.supportive_residencial_phone}`,
                        {
                            width: '*',
                            alignment: 'center',
                            text: `Telefone Comercial: ${reenrollment.supportive_commercial_phone}`,
                        },
                        {
                            alignment: 'right',
                            text: `Telefone Celular: ${reenrollment.supportive_personal_phone}`,
                        },
                    ],
                },
                {
                    columns: [
                        {
                            width: '*',
                            text: [
                                `Rua ${reenrollment.supportive_address_street}`,
                                `, Nº ${reenrollment.supportive_address_number}`,
                                `, Bairro ${reenrollment.supportive_address_neighborhood}`,
                                `, Cidade ${reenrollment.supportive_address_city}`,
                            ],
                        },
                        {
                            text: ` CEP: ${reenrollment.supportive_address_cep}`,
                            alignment: 'right',
                        },
                    ],
                },
                `E-mail: ${reenrollment.supportive_email}`,
                // ALUNO
                {
                    text:
                        '\nIDENTIFICAÇÃO DO BENEFICIÁRIO DOS SERVIÇOS DE EDUCAÇÃO ESCOLAR - ALUNO(A)',
                    bold: true,
                },
                {
                    columns: [
                        {
                            width: '*',
                            text: `Sr./Sra.: ${reenrollment.student_name}`,
                        },
                        {
                            alignment: 'right',
                            text: `Data de Nascimento: ${formatDate(
                                reenrollment.student_birth_date,
                                'dd/MM/yyyy',
                            )}`,
                        },
                    ],
                },
                {
                    columns: [
                        {
                            width: '*',
                            text: `Natural de: ${reenrollment.student_birth_city} - ${reenrollment.student_birth_state}`,
                        },
                        {
                            alignment: 'right',
                            text: `Nacionalidade: ${reenrollment.student_nacionality}`,
                        },
                    ],
                },
                `Série/Ano/Período que Cursará: ${this.formatGrade(
                    reenrollment.grade_name,
                )}`,
                // CLÁUSULAS
                // 1ª
                {
                    text: '\nCLÁUSULA PRIMEIRA:  DO OBJETO',
                    style: 'clausule',
                },
                'O objeto do presente contrato é a prestação de serviços educacionais ao beneficiário indicado acima, conforme o calendário escolar, regimento interno e Projeto Político-Pedagógico da instituição de ensino e a apresentação dos demais documentos necessários a sua efetivação, em conformidade  com o previsto na legislação de ensino atualmente em vigor.',
                {
                    text: [
                        { text: '§ 1º. ', bold: true },
                        'Entendem-se como serviços mencionados nesta cláusula os que objetivam ao cumprimento do programa de estudos destinados à turma, coletivamente, não incluídos os facultativos, de caráter opcional ou de grupo específico ou especial.',
                    ],
                    alignment: 'justify',
                },
                {
                    text: [
                        { text: '§ 2º. ', bold: true },
                        'O beneficiário estará sujeito às normas do Regimento Escolar da instituição, cujo exemplar encontra-se a disposição para consulta na secretaria da instituição. Regras disciplinares e informativos para os pais e alunos são entregues na primeira reunião de pais, no início do ano letivo. Submete-se ademais, às obrigações constantes na legislação aplicável à área de ensino e às emendas de outras fontes legais que regulamentem a matéria, tendo o ',
                        { text: 'CONTRATANTE', bold: true },
                        ', portanto, ao firmar este documento, amplo e expresso conhecimento das relações ora ajustadas.',
                    ],
                    alignment: 'justify',
                },
                // 2ª
                {
                    text: '\nCLÁUSULA SEGUNDA: DO PREÇO E FORMA DE PAGAMENTO',
                    style: 'clausule',
                },
                {
                    text: [
                        'Pelos serviços educacionais referidos na cláusula anterior, o ',
                        { text: 'CONTRATANTE', bold: true },
                        ' pagará ao ',
                        { text: 'CONTRATADO', bold: true },
                        ' uma ANUIDADE ESCOLAR, nos valores abaixo relacionados, fixada na forma da lei:',
                    ],
                    alignment: 'justify',
                },
                {
                    table: {
                        body: [
                            [
                                {
                                    text: 'PARCELA (12 MENSALIDADES)',
                                    bold: true,
                                },
                                {
                                    text: 'TOTAL DA ANUIDADE ESCOLAR',
                                    bold: true,
                                },
                                {
                                    text: 'VALOR DO DESCONTO',
                                    bold: true,
                                },
                                {
                                    text: 'VALOR DA MENSALIDADE COM DESCONTO',
                                    bold: true,
                                },
                                {
                                    text: 'VALOR DA ANUIDADE COM DESCONTO',
                                    bold: true,
                                },
                            ],
                            ['\n\n', '\n\n', '\n\n', '\n\n', '\n\n'],
                        ],
                    },
                },
                {
                    text: [
                        { text: '§ 1º. ', bold: true },
                        'O valor referido na cláusula anterior será pago em 12(doze) parcelas mensais e iguais, devendo a primeira parcela ser paga no ato da assinatura do contrato como  princípio de pagamento da anuidade escolar  e condição para concretização e celebração do contrato de prestação de serviços educacionais. As demais parcelas devem ser pagas até o  décimo dia  corrido de cada mês, iniciando-se em fevereiro e terminando em dezembro do ano do serviço contratado.',
                    ],
                },
                {
                    text: [
                        { text: '§ 2º. ', bold: true },
                        'A  1º parcela referida no parágrafo anterior somente será devolvida quando houver desistência formal do aluno entregue na diretoria da escola  antes do início das aulas, sendo retidos 10% (dez por cento) sobre o valor da matrícula a título de custos operacionais nos primeiros 10 dias, 20% do 11º ao 30º dia e 50% após 30 dias da matricula. Valores de livros já pagos cujos livros já foram encomendados e/ou entregues não serão reembolsados.',
                    ],
                },
                {
                    text: [
                        { text: '§ 3º. ', bold: true },
                        'O pagamento da 1ª parcela referida no parágrafo primeiro implica, automaticamente, aceitação de todos os termos do presente contrato, bem como do Regimento Escolar da instituição e demais regras de convivência.',
                    ],
                },
                {
                    text: [
                        { text: '§ 4º. ', bold: true },
                        'É facultado ao ',
                        { text: 'CONTRATADO', bold: true },
                        ', em caráter promocional, conceder descontos nas mensalidades. A referida concessão não integra o contrato, para quaisquer efeitos, não implicando novação. Caso o ',
                        { text: 'CONTRATANTE', bold: true },
                        'não faça uso da promoção no momento oportuno, esta não incidirá retroativamente.',
                    ],
                },
                {
                    text: [
                        { text: '§ 5º. ', bold: true },
                        'Caso o pagamento da primeira parcela seja efetuado em cheque,  este será recebido em carater pro solvendo, não se concretizando a validade do contrato,  senao após a regular compensação do cheque. ',
                    ],
                },
                {
                    text: [
                        { text: '§ 6º. ', bold: true },
                        'Na hipótese de não haver número suficiente de alunos que preencham uma série e/ou turma, em turno específico ou não, o ',
                        { text: 'CONTRATADO', bold: true },
                        'desobriga-se a validar este instrumento, salvo quanto àquele aluno beneficiário que se dispuser a transferir-se de turno, caso haja vaga. No caso de não validação do contrato, o ',
                        { text: 'CONTRATADO', bold: true },
                        ' reembolsará integralmente os valores e taxas eventualmente pagas pelo ',
                        { text: 'CONTRATANTE', bold: true },
                        '.',
                    ],
                },
                // 3ª
                {
                    text: '\nCLÁUSULA TERCEIRA:  DO ATRASO / INADIMPLÊNCIA',
                    style: 'clausule',
                },
                {
                    text: [
                        'Havendo atraso no pagamento de qualquer parcela, o ',
                        { text: 'CONTRATANTE', bold: true },
                        ' pagará o valor em atraso acrescido de multa de 2% (dois por cento).',
                    ],
                },
                {
                    text: [
                        { text: '§ 1º. ', bold: true },
                        'O valor em atraso também será devidamente atualizado pelo ',
                        {
                            text:
                                'ÍNDICE NACIONAL DE PREÇOS AO CONSUMIDOR (INPC)',
                            bold: true,
                        },
                        ' do mês anterior  ou o índice que vier a substituí-lo, e será acrescido de juros moratórios de 1% (um por cento) ao mês, sem prejuízo da multa prevista no caput.',
                    ],
                },
                {
                    text: [
                        { text: '§ 2º. ', bold: true },
                        'Por liberalidade do ',
                        { text: 'CONTRATANTE', bold: true },
                        ' ou negociação formalizada  entre as partes as penalidades e acréscimos poderão não serem exigidas, o que  não significa novação, permanecendo em vigor todos os preceitos desta cláusula.',
                    ],
                },
                {
                    text: [
                        { text: '§ 3º. ', bold: true },
                        'Se o atraso for superior a 90(noventa) dias, poderá ainda o ',
                        { text: 'CONTRATADO', bold: true },
                        ':',
                    ],
                },
                {
                    text: [
                        { text: 'a)', bold: true },
                        'Inscrever  o devedor em cadastro ou serviços de proteção ao crédito(Serasa, SPC, Cineb), desde que precedido de notificação; Neste caso o devedor após efetuar a  liquidação do débito e  de posse dos documentos de quitação ficará responsável por pedir a baixa nos serviços de proteção ao crédito.',
                    ],
                    margin: [20, 0, 0, 0],
                },
                {
                    text: [
                        { text: 'b)', bold: true },
                        'Promover a cobrança ou execução judicial do total de débito atualizado, incluindo-se ai os honorários advocatícios, pelos meios legalmente permitidos.',
                    ],
                    margin: [20, 0, 0, 0],
                },
                {
                    text: [
                        { text: 'c)', bold: true },
                        'Repassar o total do débito para empresa de cobrança especializada.',
                    ],
                    margin: [20, 0, 0, 0],
                },
                {
                    text: [
                        { text: '§ 4º. ', bold: true },
                        'Existindo débito ao final do ano letivo, o beneficiário será automaticamente desligado da instituição de ensino, desobrigando-se o ',
                        { text: 'CONTRATADO', bold: true },
                        'a deferir pedido de renovação do Contrato nos termos da Lei 9.870/99  ou regulamentação correlata.',
                    ],
                },
                {
                    text: [
                        { text: '§ 5º. ', bold: true },
                        'Além do dispositivo no parágrafo anterior, é pré-requisito indispensável para a renovação do contrato do aluno benificiário para o ano letivo seguinte a inexistência de pendências com a Biblioteca.',
                    ],
                },
                // 4ª
                {
                    text: '\nCLÁUSULA QUARTA: DA TRANSFERÊNCIA/DESISTÊNCIA',
                    style: 'clausule',
                },
                {
                    text: [
                        'A transferência e/ou desistência do curso devem ser requeridas por escrito, com antecedência mínima de 30(trinta) dias, através do formulário próprio e protocolado na Secretária da instituição de ensino, com observância das normas regimentais, e não excluem o direito do',
                        { text: 'CONTRATADO', bold: true },
                        ' de exigir o pagamento das parcelas vencidas.',
                    ],
                },
                {
                    text: [
                        { text: '§ 1°. ', bold: true },
                        'O período compreendido entre a data do último vencimento e a do efetivo desligamento do ',
                        { text: 'CONTRATANTE', bold: true },
                        'será calculado proporcionalmente ao número de dias frequentados, tendo por base o valor da mensalidade.',
                    ],
                },
                {
                    text: [
                        { text: '§ 2°. ', bold: true },
                        'Por efetivo desligamento entender-se á  como o primeiro dia após transcorrido o prazo de 30 dias da entrega da  solicitação da rescisão e/ou após decorrido este prazo, o ultimo dia em que o aluno beneficiário frequentar o estabelecimento escolar.',
                    ],
                },
                {
                    text: [
                        { text: '§ 3°. ', bold: true },
                        'A simples infrequência às aulas e/ou a não-participação nas atividades escolares, por qualquer motivo, sem a comunicação de que trata o caput desta cláusula,  não desobriga o ',
                        { text: 'CONTRATANTE', bold: true },
                        ' do pagamento das parcelas contratadas da anuidade, sendo devidas até  o dia do efetivo desligamento.',
                    ],
                },
                // 5ª
                {
                    text: '\nCLÁUSULA QUINTA: DA RECISÃO',
                    style: 'clausule',
                },
                'O presente contrato poderá ser rescindido:',
                {
                    text: [
                        { text: 'I - ', bold: true },
                        'Pelo ',
                        { text: 'CONTRATANE', bold: true },
                        ', a qualquer tempo, observada a cláusula 4ª.',
                    ],
                },
                {
                    text: [
                        { text: 'II - ', bold: true },
                        'Pelo ',
                        { text: 'CONTRATADO', bold: true },
                        ', por motivos disciplinares causados pelo aluno  beneficiário, ou outro previsto no regimento escolar, por incompatibilidade ou desarmonia do aluno beneficiário ou de seus responsáveis ou por atitudes por parte dos responsáveis ou beneficiário que tenham por finalidade denegrir a imagem da Escola ou o desrespeito para com os funcionários e educadores através de palavras e ações.',
                    ],
                },
                {
                    text: [
                        { text: 'III - ', bold: true },
                        'Pelo acordo entre as partes.',
                    ],
                },
                {
                    text: [
                        { text: 'IV - ', bold: true },
                        'Em razão do descumprimento de qualquer obrigação prevista neste instrumento, respeitada a legislação pertinente.',
                    ],
                },
                // 6ª
                {
                    text: '\nCLÁUSULA SEXTA: DAS DISPOSIÇÕES GERAIS',
                    style: 'clausule',
                },
                {
                    text: [
                        'O ',
                        { text: 'CONTRATANTE', bold: true },
                        ' se obriga a comunicar à ',
                        { text: 'CONTRATADA', bold: true },
                        ', imediatamente, qualquer mudança de endereço, telefones e e-mails constantes neste termo.',
                    ],
                },
                {
                    text: [
                        { text: '§ 1º. ', bold: true },
                        'O ',
                        { text: 'CONTRATANTE', bold: true },
                        ' se compromete a comunicar, imediata e expressamente, ao ',
                        { text: 'CONTRATADO', bold: true },
                        ' , sobre a existência e o teor de decisões judiciais que venham a alterar o regime de guarda do aluno benificiário, não se responsabilizando o ',
                        { text: 'CONTRATADO', bold: true },
                        ' por quaisquer fatos que resultem da inobservância da presente cláusula.',
                    ],
                },
                {
                    text: [
                        { text: '§ 2º. ', bold: true },
                        'Tendo em  vista a orientação para que não se traga objetos de valor estranhos à vida estudantil, tais como: telefone celular, relógios, games, notebook, palm-top, MP’s, câmeras fotográficas e entre outros, o ',
                        { text: 'CONTRATADO', bold: true },
                        'não se responsabiliza por perdas ou furtos de objetos de valor do beneficiário e/ou ',
                        { text: 'CONTRATANTE', bold: true },
                        'que aconteçam em suas dependências ou vizinhanças, limitando-se a acionar a autoridade policial, quando for o caso.',
                    ],
                },
                {
                    text: [
                        { text: '§ 3º. ', bold: true },
                        'Os contratantes, pais ou representantes legais, são responsáveis pelos danos provocados por seus filhos ou aluno beneficiário menores no ambiente do ',
                        { text: 'CONTRATADO', bold: true },
                        ', ou causados a terceiros que aconteçam nas dependências da Escola ou vizinhanças, sendo que os Pais e/ou responsáveis autorizam o uso das imagens do circuito interno de câmeras para comprovação destes danos.',
                    ],
                },
                {
                    text: [
                        { text: '§ 4º. ', bold: true },
                        'A indicação da metodologia pedagógica e do material didático é de responsabilidade do ',
                        { text: 'CONTRATADO', bold: true },
                        ', declarando-se o ',
                        { text: 'CONTRATANTE', bold: true },
                        ' ciente e concordante com a filosofia da instituição.',
                    ],
                },
                {
                    text: [
                        { text: '§ 5º. ', bold: true },
                        'O ',
                        { text: 'CONTRATANTE', bold: true },
                        ' declara que foi informado, neste ato, que o ',
                        { text: 'CONTRATADO', bold: true },
                        ' oferece, subsidiariamente, outros serviços para os alunos beneficiários interessados, que poderão ser adquiridos junto à Secretaria da Escola, com pagamento em separado, através das modalidades de aquisição, de acordo com a natureza de cada um dos serviços.',
                    ],
                },
                {
                    text: [
                        { text: '§ 6º. ', bold: true },
                        'O ',
                        { text: 'CONTRATANTE', bold: true },
                        'declara que foi informado, neste ato, que  não estão incluídos neste contrato, nem são remunerados pelo preço nele estabelecidos os serviços especiais de recuperação, serviços especiais de reforço e acompanhamento, progressão parcial, adaptação,  segunda chamada de avaliações, segunda via do cartão de identificação do aluno, transporte escolar, exames especiais, acompanhamento psicológico/neural/psicopedagógico, segunda via do caderno de comunicações, excursões e trabalhos de campo, taxa de artes, livros didáticos, eventos e fornecimento de segunda via de documentos, os opcionais e de uso facultativo para o aluno,  outras atividades de frequência facultativa, uniformes, merendas e materiais de uso individual que poderão ser objeto de ajuste à parte, os quais quando disponíveis terão os seus valores comunicados por circular da direção da Escola.',
                    ],
                },
                {
                    text: [
                        { text: '§ 7º. ', bold: true },
                        'O Contratante solidário assumirá todas as responsabilidades das cláusula deste contrato na falta do contratante principal ou se o contratante principal deixar de cumprir qualquer clausula deste contrato.',
                    ],
                },
                {
                    text: [
                        { text: '§ 8º. ', bold: true },
                        'As comunicações entre as partes, sejam elas de que natureza for, utilizará os diversos meios disponíveis, tais como: avisos na agenda escolar on-line, cartas, e-mails, ligações telefônicas, SMSs, WhatsApp, redes sociais, cujos contatos deverão ser informados na ficha de matricula.',
                    ],
                },
                {
                    text: [
                        { text: '§ 9º. ', bold: true },
                        'O ',
                        { text: 'CONTRATANTE', bold: true },
                        ' autoriza o uso da imagem e voz do aluno, para participação nas atividades remotas, via internet e conteúdos pedagógicos a serem divulgados aos outros alunos, nas redes sociais e site do colégio com a finalidade de garantir a complementação e a prestação do serviço educacional escolar.',
                    ],
                },
                // 7ª
                {
                    text: '\nCLÁUSULA SÉTIMA: DO FORO',
                    style: 'clausule',
                },
                'As partes elegem o foro da cidade de Betim para dirimir quaisquer duvidas provenientes deste contrato.',
                'E assim , por estarem justos e contratados, assim o presente em duas vias, também assinadas por duas testemunhas.',
                '\n\n\n',
                {
                    columns: [
                        '______________________________\nCOLÉGIO SANTIAGO',
                        '______________________________\nCONTRATANTE RESPONSÁVEL',
                        '______________________________\nCONTRATANTE SOLIDÁRIO',
                    ],
                    alignment: 'center',
                },
                '\n\n\n',
                {
                    columns: [
                        '________________________________________\nTESTEMUNHA: CIDINEIA FERREIRA DOS SANTOS ALVES\nCPF:102.005.516-20',
                        '________________________________________\nTESTEMUNHA: ANA LUIZA GONÇALVES PENIDO\nCPF: 103.446.466-37',
                    ],
                    alignment: 'center',
                },
                '\n\n\n',
                {
                    text: `BETIM, MG, ${formatDate(
                        new Date(),
                        'dd',
                    )} de ${formatDate(new Date(), 'MM')} de ${formatDate(
                        new Date(),
                        'yyyy',
                    )}`,
                    alignment: 'center',
                },
            ],
        } as TDocumentDefinitions;

        const fileHash = v4();
        const fileName = `contrato-${fileHash}.pdf`;
        const filePath = resolve(
            __dirname,
            '..',
            '..',
            '..',
            '..',
            'tmp',
            fileName,
        );

        const pdfDoc = printer.createPdfKitDocument(docDefinition);
        pdfDoc.pipe(fs.createWriteStream(filePath));
        pdfDoc.end();

        await Reenrollment.findOneAndUpdate(
            {
                student_name: _id,
            },
            {
                contract: fileName,
            },
            {
                useFindAndModify: false,
            },
        );

        if (reenrollment.contract) {
            const deletePath = resolve(
                __dirname,
                '..',
                '..',
                '..',
                '..',
                'tmp',
                reenrollment.contract,
            );

            fs.unlinkSync(deletePath);
        }

        return fileName;
    }

    private capitalize(str: string): string {
        if (typeof str === 'string') {
            return str
                .toLowerCase()
                .replace(/(^\w{1})|(\s+\w{1})/g, letter =>
                    letter.toUpperCase(),
                );
        }
        return '';
    }

    private formatGrade(
        grade:
            | 'maternal'
            | 'first_period'
            | 'second_period'
            | 'first_year'
            | 'second_year'
            | 'third_year'
            | 'fourth_year'
            | 'fifth_year'
            | 'sixth_year'
            | 'seventh_year'
            | 'eighth_year'
            | 'nineth_year',
    ): string {
        switch (grade) {
            case 'maternal':
                return 'Maternal';
            case 'first_period':
                return 'Primeiro Período';
            case 'second_period':
                return 'Segundo Período';
            case 'first_year':
                return '1º Ano';
            case 'second_year':
                return '2º Ano';
            case 'third_year':
                return '3º Ano';
            case 'fourth_year':
                return '4º Ano';
            case 'fifth_year':
                return '5º Ano';
            case 'sixth_year':
                return '6º Ano';
            case 'seventh_year':
                return '7º Ano';
            case 'eighth_year':
                return '8º Ano';
            case 'nineth_year':
                return '9º Ano';
            default:
                return '-';
        }
    }
}

export default GenerateContractPdfService;
