import { BackgroundImage } from "../components/Backgroundimage";
import { BackButton } from "../components/buttonBack";

import { ContentOverlay } from "../components/content";

const Article_One = () => {
  return (
    <div className="relative min-h-screen flex-col">
      <div className="relative w-full h-[50vh] sm:h-[70vh]">
        <BackButton />
        <BackgroundImage
          src="/articleImage/7.png"
          alt="Dicas para Dormir Melhor e Aumentar a Qualidade do Sono"
        />
      </div>

      <div className="flex items-center justify-center px-8 -mt-[140px] mb-8">
        <ContentOverlay
          title="Dicas para Dormir Melhor e Aumentar a Qualidade do Sono"
          content={[
            "A qualidade do sono é fundamental para a saúde física e mental. Dormir bem não apenas ajuda a restaurar as energias, mas também melhora a concentração, a memória e o humor. Infelizmente, muitas pessoas enfrentam dificuldades para dormir, seja por estresse, ansiedade ou hábitos inadequados. Neste artigo, apresentaremos dicas práticas para ajudar você a melhorar a qualidade do seu sono e garantir noites mais tranquilas."
          ]}
          listItems={[
            "Estabeleça uma Rotina de Sono: Manter um horário fixo para dormir e acordar, mesmo nos fins de semana, ajuda a regular o relógio biológico, facilitando o adormecimento e a manutenção do sono.",
            "Crie um Ambiente Confortável: Otimize seu quarto com uma temperatura agradável (18-22°C), cortinas blackout para bloquear a luz e técnicas para reduzir ruídos, como tampões ou ruído branco, para promover um sono mais tranquilo.",
            "Cuidado com a Alimentação: Evite refeições pesadas antes de dormir e limite cafeína e nicotina à tarde e à noite, pois são estimulantes que podem dificultar o adormecimento.",
            "Desconecte-se das Telas: Reduza a exposição à luz azul dos eletrônicos uma hora antes de dormir, para não atrapalhar a produção de melatonina. Atividades relaxantes, como leitura ou meditação, podem ajudar.",
            "Pratique Atividades Relaxantes: Incorpore práticas como meditação, alongamento e banho quente à sua rotina noturna para sinalizar ao corpo que é hora de relaxar e dormir.",
            "Exercite-se Regularmente: A prática regular de exercícios está associada a uma melhor qualidade do sono, mas evite atividades intensas próximas ao horário de dormir para não estimular o corpo.",
            "Gerencie o Estresse e a Ansiedade: Práticas como journaling (escrever seus pensamentos) e técnicas de respiração podem ajudar a acalmar a mente e reduzir o estresse antes de dormir."
          ]}
          contentTwo="Conclusão: Uma boa noite de sono é essencial para a saúde. Adotar hábitos consistentes de sono pode melhorar a qualidade das noites, e pequenas mudanças na rotina podem trazer grandes benefícios para o bem-estar físico e mental."
        />
      </div>
    </div>
  );
};

export default Article_One;
