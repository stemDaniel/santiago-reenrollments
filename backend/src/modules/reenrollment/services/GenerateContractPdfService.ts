import { resolve } from 'path';
import { format as formatDate } from 'date-fns';
import { TDocumentDefinitions } from 'pdfmake/interfaces'; // eslint-disable-line

import ReenrollmentsRepository from '@modules/reenrollment/infra/mongoose/repositories/ReenrollmentsRepository';
import GeneratePDFService from '@modules/reenrollment/services/GeneratePDFService';
import IPrettierEnrollmentDTO from '@modules/reenrollment/dtos/IPrettierEnrollmentDTO';
import { IReenrollmentsRepository } from '@modules/reenrollment/repositories/IReenrollmentsRepository';

class GenerateContractPdfService {
    private reenrollmentsRepository: IReenrollmentsRepository;

    constructor() {
        this.reenrollmentsRepository = new ReenrollmentsRepository();
    }

    public async execute(
        reenrollment: IPrettierEnrollmentDTO,
    ): Promise<string> {
        const monthlyValue = this.getMonthlyValue(reenrollment.grade_name);

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
                alignment: 'justify',
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
                                'Inst. Educacional Doce Mel\nColégio Santiago Ltda',
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
                    text: `\nCONTRATO DE PRESTAÇÃO DE SERVIÇOS\nEDUCACIONAIS POR ADESÃO nº ${reenrollment.enrollment_number}/2021`,
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
                        ', empresa mantenedora, CNPJ 04.379.032/0001-09 — situada na Rua Rio Grande do Sul, 863, Bairro Espírito Santo em Betim-MG, CEP nº 32671-686, telefone (31) 3595-2156, e-mail contato@colégiosantiago.com.br — doravante denominado ',
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
                        ', conforme cláusulas que seguem:',
                    ],
                },
                // RESPONSÁVEL FINANCEIRO
                {
                    text:
                        '\nCONTRATANTE RESPONSÁVEL PRINCIPAL – (MAIOR DE 18 ANOS)',
                    bold: true,
                },
                {
                    columns: [
                        `Sr./Sra.: ${reenrollment.financial_name}`,
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
                        '\nCONTRATANTE RESPONSÁVEL SOLIDÁRIO – (MAIOR DE 18 ANOS)',
                    bold: true,
                },
                {
                    columns: [
                        `Sr./Sra.: ${reenrollment.supportive_name}`,
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
                        `Sr./Sra.: ${reenrollment.student_name}`,
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
                        `Natural de: ${reenrollment.student_birth_city} - ${reenrollment.student_birth_state}`,
                        {
                            alignment: 'right',
                            text: `Nacionalidade: ${reenrollment.student_nacionality}`,
                        },
                    ],
                },
                `Série/Ano/Período que Cursará: ${reenrollment.grade_name}`,
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
                                    text: 'ANUIDADE - 12 PARCELAS DE:',
                                    bold: true,
                                },
                                {
                                    text: 'TOTAL DA ANUIDADE ESCOLAR:',
                                    bold: true,
                                },
                            ],
                            [
                                `R$ ${monthlyValue},00`,
                                `R$ ${monthlyValue * 12},00`,
                            ],
                        ],
                    },
                },
                {
                    text: [
                        { text: '§ 1º. ', bold: true },
                        'O valor referido na cláusula anterior será pago em 12 (doze) parcelas mensais e iguais, devendo a primeira parcela ser paga no ato da assinatura do contrato como  princípio de pagamento da anuidade escolar  e condição para concretização e celebração do contrato de prestação de serviços educacionais. As demais parcelas devem ser pagas até o  décimo dia  corrido de cada mês, iniciando-se em fevereiro e terminando em dezembro do ano do serviço contratado.',
                    ],
                },
                {
                    text: [
                        { text: '§ 2º. ', bold: true },
                        'A  1º parcela referida no parágrafo anterior somente será devolvida quando houver desistência formal do aluno entregue na diretoria da escola  antes do início das aulas, sendo retidos 10% (dez por cento) sobre o valor da matrícula a título de custos operacionais nos primeiros 10 dias, 20% do 11º ao 30º dia e 50% após 30 dias da matricula. Valores de livros já pagos, os quais já foram encomendados e/ou entregues, não serão reembolsados.',
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
                        ' não faça uso da promoção no momento oportuno, esta não incidirá retroativamente.',
                    ],
                },
                {
                    text: [
                        { text: '§ 5º. ', bold: true },
                        'Caso o pagamento da primeira parcela seja efetuado em cheque,  este será recebido em caráter pro solvendo, não se concretizando a validade do contrato,  senao após a regular compensação do cheque. ',
                    ],
                },
                {
                    text: [
                        { text: '§ 6º. ', bold: true },
                        'Na hipótese de não haver número suficiente de alunos que preencham uma série e/ou turma, em turno específico ou não, o ',
                        { text: 'CONTRATADO', bold: true },
                        ' desobriga-se a validar este instrumento, salvo quanto àquele aluno beneficiário que se dispuser a transferir-se de turno, caso haja vaga. No caso de não validação do contrato, o ',
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
                        'Se o atraso for superior a 90 (noventa) dias, poderá ainda o ',
                        { text: 'CONTRATADO', bold: true },
                        ':',
                    ],
                },
                {
                    text: [
                        { text: 'a) ', bold: true },
                        'Inscrever  o devedor em cadastro ou serviços de proteção ao crédito (Serasa, SPC, Cineb), desde que precedido de notificação; Neste caso o devedor após efetuar a  liquidação do débito e  de posse dos documentos de quitação ficará responsável por pedir a baixa nos serviços de proteção ao crédito.',
                    ],
                    margin: [20, 0, 0, 0],
                },
                {
                    text: [
                        { text: 'b) ', bold: true },
                        'Promover a cobrança ou execução judicial do total de débito atualizado, incluindo-se ai os honorários advocatícios, pelos meios legalmente permitidos.',
                    ],
                    margin: [20, 0, 0, 0],
                },
                {
                    text: [
                        { text: 'c) ', bold: true },
                        'Repassar o total do débito para empresa de cobrança especializada.',
                    ],
                    margin: [20, 0, 0, 0],
                },
                {
                    text: [
                        { text: '§ 4º. ', bold: true },
                        'Existindo débito ao final do ano letivo, o beneficiário será automaticamente desligado da instituição de ensino, desobrigando-se o ',
                        { text: 'CONTRATADO', bold: true },
                        ' a deferir pedido de renovação do Contrato nos termos da Lei 9.870/99  ou regulamentação correlata.',
                    ],
                },
                // 4ª
                {
                    text: '\nCLÁUSULA QUARTA: DA TRANSFERÊNCIA/DESISTÊNCIA',
                    style: 'clausule',
                },
                {
                    text: [
                        'A transferência e/ou desistência do curso devem ser requeridas por escrito, com antecedência mínima de 30 (trinta) dias, através do formulário próprio e protocolado na Secretária da instituição de ensino, com observância das normas regimentais, e não excluem o direito do',
                        { text: 'CONTRATADO', bold: true },
                        ' de exigir o pagamento das parcelas vencidas.',
                    ],
                },
                {
                    text: [
                        { text: '§ 1°. ', bold: true },
                        'O período compreendido entre a data do último vencimento e a do efetivo desligamento do ',
                        { text: 'CONTRATANTE', bold: true },
                        ' será calculado proporcionalmente ao número de dias frequentados, tendo por base o valor da mensalidade.',
                    ],
                },
                {
                    text: [
                        { text: '§ 2°. ', bold: true },
                        'Por efetivo desligamento entender-se-á  como o primeiro dia após transcorrido o prazo de 30 dias da entrega da  solicitação da rescisão e/ou após decorrido este prazo, o ultimo dia em que o aluno beneficiário frequentar o estabelecimento escolar.',
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
                        ' não se responsabiliza por perdas ou furtos de objetos de valor do beneficiário e/ou ',
                        { text: 'CONTRATANTE', bold: true },
                        ' que aconteçam em suas dependências ou vizinhanças, limitando-se a acionar a autoridade policial, quando for o caso.',
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
                        'O Contratante solidário assumirá todas as responsabilidades das cláusulas deste contrato na falta do contratante principal ou se o contratante principal deixar de cumprir qualquer cláusula deste contrato.',
                    ],
                },
                {
                    text: [
                        { text: '§ 8º. ', bold: true },
                        'O',
                        { text: ' CONTRATANTE ', bold: true },
                        'autoriza o uso da imagem e voz do aluno, para participação nas atividades remotas, via internet e em conteúdos pedagógicos a serem divulgados aos outros alunos, nas redes sociais e site do colégio com a finalidade de garantir a complementação e a prestação do serviço educacional escolar.',
                    ],
                },
                {
                    text: [
                        { text: '§ 9º. ', bold: true },
                        'O',
                        { text: ' CONTRATANTE ', bold: true },
                        'se compromete a entregar um laudo médico biopsicossocial e descrição das habilidades, das limitações ou restrições no desempenho de suas atividades, emitido por profissional habilitado, no caso de alunos com deficiências e/ou necessidades especiais.',
                    ],
                },
                {
                    text: [
                        { text: '§ 10º. ', bold: true },
                        'As comunicações entre as partes, sejam elas de que natureza for, utilizará os diversos meios disponíveis, tais como: avisos na agenda escolar on-line, cartas, e-mails, ligações telefônicas, SMSs, WhatsApp, redes sociais, cujos contatos deverão ser informados na ficha de matricula.',
                    ],
                },
                // 7ª
                {
                    text: '\nCLÁUSULA SÉTIMA: DO FORO',
                    style: 'clausule',
                },
                'As partes elegem o foro da cidade de Betim para dirimir quaisquer duvidas provenientes deste contrato.',
                'E assim, por estarem justos e contratados, assim o presente em duas vias, também assinadas por duas testemunhas.',
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
                    text: `BETIM, MG\n${formatDate(
                        new Date(),
                        'dd',
                    )} DE ${this.formatMonth(
                        formatDate(new Date(), 'MMMM'),
                    )} DE ${formatDate(new Date(), 'yyyy')}`,
                    alignment: 'center',
                },
            ],
        } as TDocumentDefinitions;

        const generatePDF = new GeneratePDFService();

        const fileName = await generatePDF.execute({
            docDefinition,
            deleteFileName: reenrollment.contract,
        });

        await this.reenrollmentsRepository.updateContract({
            enrollment_number: reenrollment.enrollment_number,
            contract: fileName,
        });

        return fileName;
    }

    private getMonthlyValue(grade_name: string): number {
        switch (grade_name) {
            case 'Maternal':
                return 584;
            case 'Primeiro Preríodo':
                return 584;
            case 'Segundo Período':
                return 584;
            case '1º Ano':
                return 717;
            case '2º Ano':
                return 717;
            case '3º Ano':
                return 717;
            case '4º Ano':
                return 717;
            case '5º Ano':
                return 717;
            case '6º Ano':
                return 766;
            case '7º Ano':
                return 766;
            case '8º Ano':
                return 766;
            case '9º Ano':
                return 766;
            default:
                return 0;
        }
    }

    private formatMonth(month: string) {
        switch (month) {
            case 'January':
                return 'JANEIRO';
            case 'February':
                return 'FEVEREIRO';
            case 'March':
                return 'MARÇO';
            case 'April':
                return 'ABRIL';
            case 'May':
                return 'MAIO';
            case 'June':
                return 'JUNHO';
            case 'July':
                return 'JULHO';
            case 'August':
                return 'AGOSTO';
            case 'September':
                return 'SETEMBRO';
            case 'October':
                return 'OUTUBRO';
            case 'November':
                return 'NOVEMBRO';
            case 'December':
                return 'DEZEMBRO';
            default:
                return ' ';
        }
    }
}

export default GenerateContractPdfService;
