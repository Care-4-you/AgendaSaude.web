import { BackgroundImage } from "../components/Backgroundimage";
import { BackButton } from "../components/buttonBack";

import { ContentOverlay } from "../components/content";

const Article_One = () => {
  return (
    <div className="relative min-h-screen flex-col">
      <div className="relative w-full h-[50vh] sm:h-[70vh]">
        <BackButton />
        <BackgroundImage
          src="/articleImage/2.png"
          alt="Dicas para manter a saúde em dia"
        />
      </div>

      <div className="flex items-center justify-center px-8 -mt-[140px] mb-8">
        <ContentOverlay
          title="Dicas para Manter a Saúde Mental em Dia"
          content={[
            "Manter a saúde mental em dia é essencial para levar uma vida equilibrada e satisfatória, tanto emocional quanto fisicamente. A rotina, o trabalho, a vida familiar e as responsabilidades podem gerar estresse, ansiedade e cansaço emocional. Por isso, é fundamental adotar hábitos que fortaleçam a mente e nos ajudem a enfrentar os desafios diários. Aqui estão algumas dicas práticas para cuidar da saúde mental no dia a dia."
          ]}
          listItems={[
            "Mantenha uma Rotina: Organizar o dia com horários para trabalho e descanso reduz o estresse e ajuda a equilibrar a vida.",
            "Durma Bem: O sono de qualidade melhora o humor e a saúde mental; evite telas antes de dormir e adote uma rotina relaxante.",
            "Exercite-se: Exercícios leves liberam endorfinas, elevando o humor e reduzindo a ansiedade.",
            "Medite e Pratique Mindfulness: A meditação e o mindfulness ajudam a controlar o estresse e aumentam o foco no presente.",
            "Fortaleça Conexões Sociais: Conversar com amigos e familiares alivia a solidão e oferece apoio emocional.",
            "Diga ‘Não’ Quando Necessário: Estabelecer limites evita a sobrecarga e preserva a saúde mental.",
            "Tenha Hobbies: Atividades prazerosas ajudam a relaxar e a manter o bem-estar.",
            "Pratique Gratidão: A gratidão melhora o humor ao focar no positivo.",
            "Procure Ajuda Profissional: Psicólogos e psiquiatras podem ajudar a enfrentar momentos difíceis e fortalecer a saúde mental."
          ]}
          contentTwo="Conclusão: Cuidar da saúde mental envolve pequenas práticas diárias que, somadas, promovem equilíbrio e bem-estar."
        />
      </div>
    </div>
  );
};

export default Article_One;
