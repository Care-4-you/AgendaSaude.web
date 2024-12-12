import { BackgroundImage } from "../components/Backgroundimage";
import { BackButton } from "../components/buttonBack";

import { ContentOverlay } from "../components/content";

const Article_One = () => {
  return (
    <div className="relative min-h-screen flex-col">
      <div className="relative w-full h-[50vh] sm:h-[70vh]">
        <BackButton />
        <BackgroundImage
          src="/articleImage/3.png"
          alt="Dicas para manter a saúde em dia"
        />
      </div>

      <div className="flex items-center justify-center px-8 -mt-[140px] mb-8">
        <ContentOverlay
          title="Benefícios da Atividade Física Regular para o Corpo e a Mente"
          content={[
            "A prática de atividade física regular é um dos pilares para uma vida saudável e equilibrada. Seus benefícios vão muito além da melhora estética, alcançando tanto a saúde física quanto a mental. Manter uma rotina de exercícios não só ajuda a prevenir diversas doenças, como também promove bem-estar emocional e qualidade de vida. Neste artigo, exploraremos como a atividade física impacta positivamente o corpo e a mente e por que ela deve ser uma prioridade em nossas vidas."
          ]}
          listItems={[
            "Melhora da Saúde Cardiovascular. A prática regular de atividades aeróbicas, como caminhada e corrida, fortalece o coração e melhora a circulação sanguínea, ajudando a reduzir a pressão arterial e a equilibrar o colesterol. Isso protege contra doenças cardiovasculares, como hipertensão e infarto, tornando o coração mais resistente e saudável.",
            "Controle de Peso e Composição Corporal. Exercícios físicos contribuem para a perda de gordura e o ganho de massa muscular, acelerando o metabolismo e ajudando o corpo a queimar calorias, até mesmo em repouso. Manter o peso saudável previne doenças como diabetes e obesidade, além de aumentar a autoestima.",
            "Fortalecimento dos Ossos e ArticulaçõesExercícios de resistência e impacto, como musculação e yoga, reforçam ossos e articulações, prevenindo problemas como osteoporose. Esse fortalecimento também melhora a flexibilidade e mobilidade, aumentando a proteção contra lesões.",
            "Melhora do Humor e Redução do EstresseDurante a atividade física, o corpo libera endorfinas, que são “hormônios da felicidade.” Isso alivia o estresse e sintomas de ansiedade e depressão, promovendo bem-estar emocional e uma melhor qualidade de sono.",
            "Aumento da Energia e da DisposiçãoExercícios ajudam o organismo a produzir energia e aumentar a resistência, combatendo o cansaço. Com mais disposição, o corpo consegue enfrentar as tarefas diárias com maior motivação e menos impacto do sedentarismo."
          ]}
        />
      </div>
    </div>
  );
};

export default Article_One;
