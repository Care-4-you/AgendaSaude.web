import { BackgroundImage } from "../components/Backgroundimage";
import { BackButton } from "../components/buttonBack";

import { ContentOverlay } from "../components/content";

const Article_One = () => {
  return (
    <div className="relative min-h-screen flex-col">
      <div className="relative w-full h-[50vh] sm:h-[70vh]">
        <BackButton />
        <BackgroundImage
          src="/articleImage/5.png"
          alt="Principais Exames Preventivos por Faixa Etária"
        />
      </div>

      <div className="flex items-center justify-center px-8 -mt-[140px] mb-8">
        <ContentOverlay
          title="Principais Exames Preventivos por Faixa Etária"
          content={[
            "A prevenção é uma das melhores estratégias para manter a saúde em dia e evitar o desenvolvimento de doenças. Os exames preventivos são ferramentas essenciais nesse processo, pois permitem a detecção precoce de condições que, se não tratadas, podem evoluir para problemas mais sérios. Abaixo, apresentamos os principais exames preventivos recomendados por faixa etária, ajudando você a manter sua saúde em dia em todas as fases da vida."
          ]}
          listItems={[
            "Infância e Adolescência (0 a 17 anos):  Nessa fase, os exames preventivos garantem um desenvolvimento saudável e ajudam a prevenir doenças. Consultas pediátricas devem ser feitas de acordo com o calendário vacinal para acompanhar o crescimento. Exames importantes incluem triagem auditiva ao nascimento, exame de visão entre 3 e 5 anos, além de hemogramas e exames de glicemia e colesterol a partir dos 10 anos.",
            "Adultos Jovens (18 a 29 anos):  É fundamental manter consultas médicas anuais para avaliar a saúde geral, com medições de pressão, peso e altura. Exames de sangue (hemograma, glicemia, colesterol) também devem ser feitos anualmente. Para mulheres, o Papanicolau é essencial a partir dos 21 anos para detectar câncer cervical, e o autoexame de mama deve ser realizado regularmente. Homens devem fazer o autoexame dos testículos para identificar possíveis alterações.",
            "Adultos (30 a 49 anos): O foco se volta para a prevenção de doenças crônicas e câncer. Exames de colesterol e glicemia são recomendados a cada 5 anos ou anualmente se houver histórico familiar. Mulheres devem fazer o Papanicolau a cada três anos, e mamografias anuais a partir dos 40 anos. Para homens, é importante iniciar o monitoramento da próstata aos 50 anos, com exames de PSA e toque retal.",
            "Idosos (50 anos ou mais): Com a idade, a frequência dos exames aumenta para monitorar a saúde geral. Exames de sangue devem incluir glicemia e função hepática anualmente. A mamografia continua anual para mulheres, e exames de vista devem ser feitos a cada dois anos. A densitometria óssea é recomendada para avaliar o risco de osteoporose em mulheres acima de 65 e homens acima de 70. Vacinas contra gripe, pneumonia e herpes zoster também são indicadas anualmente."
          ]}
          contentTwo="Conclusão: Manter um calendário de exames preventivos conforme a idade e as orientações médicas é essencial para detectar doenças precocemente e melhorar a qualidade de vida. Consultar seu médico regularmente e seguir esse cronograma são passos importantes para uma vida mais saudável."
        />
      </div>
    </div>
  );
};

export default Article_One;
