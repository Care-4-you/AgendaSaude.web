import { BackgroundImage } from "../components/Backgroundimage";
import { ContentOverlay } from "../components/content";

const OurServices = () => {
  return (
    <div className="relative min-h-screen flex-col">
      <div className="relative w-full h-[50vh] sm:h-[70vh]">
        <BackgroundImage
          src="/articleImage/1.png"
          alt="Dicas para manter a saúde em dia"
        />
      </div>

      <div className=" flex items-center justify-center px-8 -mt-[140px] mb-8">
        <ContentOverlay
          title="Nossos Serviços"
          content={[
            "Os serviços do site são focados em facilitar a conexão entre pacientes, médicos e clínicas, oferecendo funcionalidades para tornar o acesso à saúde mais simples e organizado. Aqui estão os principais serviços que o site pode oferecer para cada grupo de usuário:",
            "1. Para Pacientes",
            "• Busca de Clínicas e Médicos: Pesquise por profissionais e clínicas próximas com base na localização, especialidade e disponibilidade.",
            "• Agendamento de Consultas: Agende consultas de forma rápida e segura, visualizando horários disponíveis e preços antes de confirmar.",
            "• Transparência nos Valores: Acesso aos valores das consultas antes de agendar, permitindo escolhas adequadas ao orçamento.",
            "• Histórico de Consultas: Acompanhe um histórico dos agendamentos e consultas realizadas para fácil referência.",
            "2. Para Médicos",
            "• Gestão de Agenda: Organize e visualize facilmente a agenda de atendimentos, permitindo ajustes rápidos e controle dos horários disponíveis.",
            "• Gerenciamento de Pacientes: Tenha acesso a um histórico dos pacientes atendidos, facilitando a continuidade e o planejamento dos atendimentos.",
            "• Divulgação de Serviços: Promova seu perfil para aumentar a visibilidade e atrair mais pacientes da região.",
            "• Controle de Valores e Recebimentos: Configure valores dos serviços e acompanhe os agendamentos, com controle transparente sobre consultas realizadas e recebidas.",
            "3. Para Clínicas ",
            "• Centralização de Agenda dos Profissionais: Gerencie a agenda de todos os profissionais da clínica em um único lugar, permitindo otimizar horários e fluxo de atendimentos.",
            "• Gestão de Pacientes: Acompanhe o histórico de pacientes que frequentam a clínica, facilitando o atendimento e garantindo continuidade.",
            "• Transparência e Divulgação: Divulgue os valores dos serviços e horários de atendimento da clínica, garantindo que os pacientes encontrem facilmente o que procuram.",
            "• Aumento da Visibilidade: Posicione a clínica para que novos pacientes a encontrem ao buscar por especialidades e localização."
          ]}
          contentTwo="
Esses serviços tornam o site um facilitador de acesso e gestão na área da saúde, atraindo tanto pacientes quanto profissionais e clínicas para uma experiência única."
        />
      </div>
    </div>
  );
};

export default OurServices;
