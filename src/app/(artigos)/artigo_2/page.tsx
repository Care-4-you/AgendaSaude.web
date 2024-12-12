import { BackgroundImage } from "../components/Backgroundimage";
import { BackButton } from "../components/buttonBack";

import { ContentOverlay } from "../components/content";

const Article_One = () => {
  return (
    <div className="relative min-h-screen flex-col">
      <div className="relative w-full h-[50vh] sm:h-[70vh]">
        <BackButton />
        <BackgroundImage
          src="/articleImage/4.png"
          alt="Dicas para manter a saúde em dia"
        />
      </div>

      <div className="flex items-center justify-center px-8 -mt-[140px] mb-8">
        <ContentOverlay
          title="Como se Preparar para Consultas Médicas: O que Levar e Perguntar"
          content={[
            "Ir ao médico é uma prática essencial para manter a saúde em dia, mas muitas vezes não aproveitamos ao máximo a consulta por falta de preparação. Saber o que levar e quais perguntas fazer pode tornar a consulta mais produtiva e ajudar o médico a entender melhor suas necessidades. Neste artigo, veremos algumas dicas para se preparar para uma consulta médica, desde os documentos e exames que você deve levar até as perguntas importantes que podem ajudar a esclarecer suas dúvidas."
          ]}
          listItems={[
            "Organize seus Documentos e Exames: Reúna cartão de saúde, identidade, exames anteriores, lista de medicamentos e seu histórico médico para que o médico tenha uma visão completa e consiga avaliar sua saúde com precisão.",
            "Faça uma Lista de Sintomas: Detalhe seus sintomas, quando começaram, a intensidade, frequência e o que os agrava ou alivia. Esse levantamento ajuda o médico a identificar padrões e fazer um diagnóstico mais eficaz.",
            "Leve Perguntas Preparadas: Antecipe dúvidas sobre suas condições, exames adicionais, tratamento, efeitos colaterais e dicas para melhorar sua saúde. Assim, você aproveita melhor a consulta e esclarece todas as suas questões.",
            "Converse sobre Estilo de Vida e Hábitos: Fale abertamente sobre sua dieta, exercícios, consumo de álcool, sono e fatores emocionais. Esses aspectos influenciam diretamente a saúde e ajudam o médico a entender o contexto dos seus sintomas.",
            "Anote as Recomendações do Médico: Registre todas as orientações e tratamentos sugeridos pelo médico. Isso inclui medicamentos, exames e mudanças no estilo de vida para garantir que você siga o plano corretamente.",
            "Pergunte sobre o Seguimento: Questione o médico sobre os próximos passos, como agendar uma nova consulta, monitorar sintomas específicos e a necessidade de novos exames. Essas orientações garantem um acompanhamento adequado da sua saúde."
          ]}
        />
      </div>
    </div>
  );
};

export default Article_One;
