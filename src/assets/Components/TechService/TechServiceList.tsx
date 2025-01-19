// TechServiceList.ts


// ================ AQUI FICA A LISTA DE SERVIÇOS QUE ESTA SENDO IMPORTADA EM SERVIÇOS =================

//  AQUI FICA OS ICONS DO REACT ICONS 
import { FaLaptopCode, FaMobileAlt, FaTools, FaShieldAlt, FaCloud, FaNetworkWired, FaRobot, FaChalkboardTeacher, FaHeadset } from "react-icons/fa";
import { AiOutlineBarChart, AiOutlineSetting } from "react-icons/ai";
import React from "react";




export interface TechService {
  id: number;
  name: string;
  description: string;
  price: number;
  icon: React.ReactNode;
  details: string;
  gallery: string[];
}

const techServices: TechService[] = [
  
  { 
    id: 1, 
    name: 'Desenvolvimento de Websites', 
    description: 'Criação de websites personalizados e responsivos.', 
    price: 2000.0, 
    icon: <FaLaptopCode />, 
    details: 'Oferecemos websites que utilizam tecnologias como React, Angular e Tailwind CSS para garantir alta performance e responsividade.',
    gallery: [
      'https://telesintese.com.br/wp-content/uploads/2020/03/aplicativos-servicos-app-sistema-pagamento-investimento-ideias-grafico-planilha-nuvem-resultados-001.jpg', 
      'https://images.unsplash.com/photo-1593642634315-48b7d84b11e5', 
      'https://images.unsplash.com/photo-1606815761009-210fe3f7b218' 
    ]
  }
  ,
  { 
    id: 2, 
    name: 'Desenvolvimento de Aplicativos', 
    description: 'Criação de aplicativos mobile nativos e híbridos.', 
    price: 5000.0, 
    icon: <FaMobileAlt />, 
    details: 'Desenvolvemos aplicativos utilizando tecnologias como Flutter, React Native e Swift para atender todas as plataformas.',
    gallery: ['https://via.placeholder.com/300/008000', 'https://via.placeholder.com/300/800080', 'https://via.placeholder.com/300/FF9900']
  },
  { 
    id: 3, 
    name: 'Manutenção de Hardware', 
    description: 'Reparo e otimização de equipamentos.', 
    price: 300.0, 
    icon: <FaTools />, 
    details: 'Oferecemos serviços de manutenção preventiva e corretiva para garantir que seus equipamentos estejam sempre funcionando.',
    gallery: ['https://via.placeholder.com/300', 'https://via.placeholder.com/300/123456', 'https://via.placeholder.com/300/654321']
  },
  { 
    id: 4, 
    name: 'Segurança da Informação', 
    description: 'Proteção de dados e sistemas contra ameaças.', 
    price: 3500.0, 
    icon: <FaShieldAlt />, 
    details: 'Implementamos firewalls, antivírus e políticas de segurança para proteger sua infraestrutura digital.',
    gallery: ['https://via.placeholder.com/300/555555', 'https://via.placeholder.com/300/666666', 'https://via.placeholder.com/300/777777']
  },
  { 
    id: 5, 
    name: 'Migração para a Nuvem', 
    description: 'Transição de sistemas para a infraestrutura em nuvem.', 
    price: 4000.0, 
    icon: <FaCloud />, 
    details: 'Realizamos migrações utilizando AWS, Azure ou Google Cloud, garantindo alta disponibilidade e segurança.',
    gallery: ['https://via.placeholder.com/300/222222', 'https://via.placeholder.com/300/333333', 'https://via.placeholder.com/300/444444']
  },
  { 
    id: 6, 
    name: 'Gerenciamento de Redes', 
    description: 'Configuração e monitoramento de redes corporativas.', 
    price: 2500.0, 
    icon: <FaNetworkWired />, 
    details: 'Oferecemos suporte completo para configuração, monitoramento e manutenção de redes empresariais.',
    gallery: ['https://via.placeholder.com/300/ABCDEF', 'https://via.placeholder.com/300/654ABC', 'https://via.placeholder.com/300/321DEF']
  },
  { 
    id: 7, 
    name: 'Automação de Processos', 
    description: 'Automação para melhorar eficiência operacional.', 
    price: 7000.0, 
    icon: <FaRobot />, 
    details: 'Utilizamos RPA (Robotic Process Automation) para automatizar tarefas repetitivas e melhorar a produtividade.',
    gallery: ['https://via.placeholder.com/300/AAAAAA', 'https://via.placeholder.com/300/BBBBBB', 'https://via.placeholder.com/300/CCCCCC']
  },
  { 
    id: 8, 
    name: 'Análise de Dados', 
    description: 'Transformação de dados em insights valiosos.', 
    price: 6000.0, 
    icon: <AiOutlineBarChart />, 
    details: 'Utilizamos ferramentas como Power BI e Tableau para criar dashboards e relatórios analíticos.',
    gallery: ['https://via.placeholder.com/300/123123', 'https://via.placeholder.com/300/456456', 'https://via.placeholder.com/300/789789']
  },
  { 
    id: 9, 
    name: 'Consultoria em TI', 
    description: 'Soluções sob medida para sua infraestrutura de TI.', 
    price: 1500.0, 
    icon: <AiOutlineSetting />, 
    details: 'Nossos especialistas ajudam a identificar e implementar soluções tecnológicas para otimizar seu ambiente de TI.',
    gallery: ['https://via.placeholder.com/300/789123', 'https://via.placeholder.com/300/321789', 'https://via.placeholder.com/300/987654']
  },
  { 
    id: 10, 
    name: 'Treinamento em Tecnologia', 
    description: 'Workshops e cursos sobre tendências tecnológicas.', 
    price: 1200.0, 
    icon: <FaChalkboardTeacher />, 
    details: 'Oferecemos treinamentos personalizados para equipes, com foco em ferramentas e tecnologias atuais.',
    gallery: ['https://via.placeholder.com/300/654321', 'https://via.placeholder.com/300/456123', 'https://via.placeholder.com/300/789456']
  },
  { 
    id: 11, 
    name: 'Criação de Chatbots', 
    description: 'Assistentes virtuais personalizados para sua empresa.', 
    price: 3000.0, 
    icon: <FaRobot />, 
    details: 'Desenvolvemos chatbots inteligentes com IA utilizando plataformas como Dialogflow e IBM Watson.',
    gallery: ['https://via.placeholder.com/300/999999', 'https://via.placeholder.com/300/AAAAAA', 'https://via.placeholder.com/300/BBBBBB']
  },
  { 
    id: 12, 
    name: 'Suporte Técnico Remoto', 
    description: 'Assistência para problemas de hardware e software.', 
    price: 500.0, 
    icon: <FaHeadset />, 
    details: 'Oferecemos suporte técnico 24/7 para resolver problemas de forma rápida e eficiente.',
    gallery: ['https://via.placeholder.com/300/121212', 'https://via.placeholder.com/300/343434', 'https://via.placeholder.com/300/565656']
  },
];

export default techServices;
