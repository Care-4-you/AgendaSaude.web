import { BackgroundImage } from "../components/Backgroundimage";
import { BackButton } from "../components/buttonBack";

import { ContentOverlay } from "../components/content";

const Article_One = () => {
  return (
    <div className="relative min-h-screen flex-col">
      <div className="relative w-full h-[50vh] sm:h-[70vh]">
        <BackButton />
        <BackgroundImage
          src="/articleImage/6.png"
          alt="Dicas para manter a saúde em dia"
        />
      </div>

      <div className="flex items-center justify-center px-8 -mt-[140px] mb-8">
        <ContentOverlay
          title="Alimentação Saudável"
          content={[
            "A alimentação saudável é um dos pilares fundamentais para o bem-estar e a prevenção de doenças. Muitas pessoas acreditam que mudanças drásticas em seus hábitos alimentares são necessárias para alcançar uma dieta equilibrada, mas pequenas alterações podem fazer uma grande diferença. Este artigo explora como pequenas mudanças na sua alimentação diária podem impactar sua saúde de forma significativa."
          ]}
          listItems={[
            "Entendendo a Alimentação Saudável: Alimentação saudável não significa restrições, mas sim escolhas conscientes que promovem a saúde. Isso envolve uma dieta rica em nutrientes, com frutas, vegetais, grãos integrais, proteínas magras e gorduras saudáveis, para manter o equilíbrio e a variedade nos alimentos.",
            "Pequenas Mudanças que Fazem a Diferença: Alterações simples no dia a dia podem trazer grandes benefícios. Exemplos incluem: aumentar a ingestão de frutas e vegetais, substituir alimentos processados por opções naturais, preferir grãos integrais, reduzir o consumo de açúcar, controlar as porções e cozinhar em casa para ter mais controle sobre os ingredientes.",
            "A Importância da Hidratação: A água é essencial para o corpo, e substituí-la por chás sem açúcar ou aumentar o consumo ao longo do dia ajuda na saúde geral. Manter uma garrafinha de água por perto pode facilitar esse hábito.",
            "Fazendo Mudanças Sustentáveis: A adoção de uma alimentação saudável é gradual. Fazer pequenas mudanças e ser paciente consigo mesmo ajuda a estabelecer hábitos sustentáveis que beneficiam a saúde ao longo da vida.",
            "Apoio e Recursos: Ter o suporte de amigos, familiares e profissionais de saúde, como nutricionistas, pode facilitar a transição para uma alimentação mais saudável. Esses recursos proporcionam orientação e incentivo para alcançar os objetivos alimentares."
          ]}
          contentTwo="Conclusão: Pequenas ações na alimentação impactam diretamente na saúde e no bem-estar. Escolher alimentos naturais e saudáveis e fazer mudanças conscientes permite transformar sua dieta e melhorar sua vida. Lembre-se de que cada passo conta em direção a um estilo de vida mais saudável!"
        />
      </div>
    </div>
  );
};

export default Article_One;
