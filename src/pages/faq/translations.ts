export type FaqLang = 'de' | 'en' | 'es' | 'fr' | 'ru'

export const FAQ_LANGUAGES: { code: FaqLang; flag: string; label: string }[] = [
  { code: 'de', flag: '🇩🇪', label: 'Deutsch' },
  { code: 'en', flag: '🇬🇧', label: 'English' },
  { code: 'es', flag: '🇪🇸', label: 'Español' },
  { code: 'fr', flag: '🇫🇷', label: 'Français' },
  { code: 'ru', flag: '🇷🇺', label: 'Русский' },
]

export interface FaqContent {
  title: string
  intro: string
  sections: { title: string; paragraphs: string[] }[]
  contact: {
    legalNote: string
    imprint: string
    terms: string
  }
}

export const faqTranslations: Record<FaqLang, FaqContent> = {
  de: {
    title: 'FAQ',
    intro: 'Die wichtigsten Fragen zu Website, Demo-Zugang und KI-Agent.',
    sections: [
      {
        title: 'Was bietet Montagfrei?',
        paragraphs: [
          'Montagfrei richtet für Handwerks- und Dienstleistungsbetriebe eine professionelle Website ein, inklusive persönlicher Demo zur Abstimmung und anschließender Live-Umsetzung auf Ihrer Domain. Im Anschluss wird ein KI-Agent auf der Website eingebunden, der Kundenanfragen übernimmt und Ihren Betrieb im Alltag entlastet.',
        ],
      },
      {
        title: 'Wie läuft die Zusammenarbeit ab?',
        paragraphs: [
          '(1) Sie erhalten eine Demo-Website mit individuellem Zugangscode zur Prüfung von Texten, Aufbau und Design.',
          '(2) Nach Ihrer Freigabe setzen wir die Website auf Ihrer Wunsch-Domain um.',
          '(3) Anschließend konfigurieren und aktivieren wir den KI-Agenten auf Ihrer Live-Website, abgestimmt auf Ihre Leistungen, Abläufe und Kommunikation.',
        ],
      },
      {
        title: 'Der KI-Agent',
        paragraphs: [
          'Der KI-Agent ist die zentrale Erweiterung Ihrer Website: Er beantwortet Anfragen von Besuchern direkt auf der Seite, zu Leistungen, Verfügbarkeit, Abläufen und Terminen. Er ist rund um die Uhr erreichbar, antwortet einheitlich und professionell und nimmt Ihnen wiederkehrende Rückfragen ab.',
          'So bleibt mehr Zeit für die eigentliche Arbeit im Betrieb, während potenzielle Kunden auch außerhalb Ihrer Geschäftszeiten eine schnelle Orientierung erhalten.',
        ],
      },
      {
        title: 'Was übernimmt der KI-Agent konkret?',
        paragraphs: [
          'Je nach Konfiguration beantwortet er Leistungs- und Preisfragen, erklärt Ihr Servicegebiet, unterstützt bei Termin- und Kontaktanfragen und leitet qualifizierte Anliegen strukturiert an Sie weiter. Inhalte und Antwortlogik werden auf Basis Ihrer freigegebenen Website und Ihrer Vorgaben eingerichtet.',
        ],
      },
      {
        title: 'Wie erhalte ich Zugang zur Demo-Website?',
        paragraphs: [
          'Sie erhalten von uns einen persönlichen Zugangscode. Auf der Startseite auf „Montagfrei“ klicken, Code eingeben, und Sie gelangen direkt zu Ihrer Demo.',
        ],
      },
      {
        title: 'Ist die Demo bereits die Live-Website?',
        paragraphs: [
          'Nein. Die Demo dient der Abstimmung. Erst nach Ihrer Freigabe geht die Website auf Ihrer Domain live; der KI-Agent folgt im Anschluss.',
        ],
      },
      {
        title: 'Was kostet der Service?',
        paragraphs: [
          'Die Konditionen werden individuell vereinbart, abhängig von Umfang, Branche und gewünschten Leistungen wie KI-Agent oder laufender Wartung. Ein Angebot erhalten Sie nach dem Erstgespräch.',
        ],
      },
      {
        title: 'Fragen oder Interesse?',
        paragraphs: [],
      },
    ],
    contact: {
      legalNote: 'Rechtliche Hinweise:',
      imprint: 'Impressum',
      terms: 'AGB',
    },
  },

  en: {
    title: 'FAQ',
    intro: 'Key questions about the website, demo access, and AI agent.',
    sections: [
      {
        title: 'What does Montagfrei offer?',
        paragraphs: [
          'Montagfrei sets up a professional website for trades and service businesses, including a personal demo for review and subsequent live deployment on your domain. An AI agent is then integrated into the site to handle customer inquiries and reduce day-to-day workload.',
        ],
      },
      {
        title: 'How does the process work?',
        paragraphs: [
          '(1) You receive a demo website with a personal access code to review copy, structure, and design.',
          '(2) After your approval, we deploy the website on your chosen domain.',
          '(3) We then configure and activate the AI agent on your live site, tailored to your services, workflows, and communication style.',
        ],
      },
      {
        title: 'The AI agent',
        paragraphs: [
          'The AI agent is the core extension of your website: it answers visitor inquiries directly on the page, about services, availability, processes, and appointments. It is available around the clock, responds consistently and professionally, and handles recurring questions on your behalf.',
          'This frees up time for your core work while potential customers get quick guidance even outside business hours.',
        ],
      },
      {
        title: 'What does the AI agent handle?',
        paragraphs: [
          'Depending on configuration, it answers service and pricing questions, explains your service area, supports appointment and contact requests, and forwards qualified inquiries to you in a structured way. Content and response logic are set up based on your approved website and your specifications.',
        ],
      },
      {
        title: 'How do I access the demo website?',
        paragraphs: [
          'You receive a personal access code from us. Click “Montagfrei” on the homepage, enter the code, and you go straight to your demo.',
        ],
      },
      {
        title: 'Is the demo already the live website?',
        paragraphs: [
          'No. The demo is for review and approval. Only after you sign off does the site go live on your domain; the AI agent follows afterwards.',
        ],
      },
      {
        title: 'What does the service cost?',
        paragraphs: [
          'Terms are agreed individually, depending on scope, industry, and optional services such as the AI agent or ongoing maintenance. You receive a quote after an initial consultation.',
        ],
      },
      {
        title: 'Questions or interested?',
        paragraphs: [],
      },
    ],
    contact: {
      legalNote: 'Legal information:',
      imprint: 'Imprint',
      terms: 'Terms',
    },
  },

  es: {
    title: 'FAQ',
    intro: 'Las preguntas clave sobre el sitio web, el acceso a la demo y el agente de IA.',
    sections: [
      {
        title: '¿Qué ofrece Montagfrei?',
        paragraphs: [
          'Montagfrei configura un sitio web profesional para empresas artesanales y de servicios, con una demo personal para revisión y posterior publicación en su dominio. Después se integra un agente de IA que atiende consultas de clientes y alivia la carga diaria del negocio.',
        ],
      },
      {
        title: '¿Cómo funciona el proceso?',
        paragraphs: [
          '(1) Recibe un sitio demo con un código de acceso individual para revisar textos, estructura y diseño.',
          '(2) Tras su aprobación, publicamos el sitio en el dominio que elija.',
          '(3) A continuación configuramos y activamos el agente de IA en su sitio en vivo, adaptado a sus servicios, procesos y forma de comunicación.',
        ],
      },
      {
        title: 'El agente de IA',
        paragraphs: [
          'El agente de IA es la extensión central de su sitio web: responde consultas de visitantes directamente en la página, sobre servicios, disponibilidad, procesos y citas. Está disponible las 24 horas, responde de forma uniforme y profesional y asume preguntas recurrentes.',
          'Así queda más tiempo para el trabajo principal, mientras los clientes potenciales obtienen orientación rápida incluso fuera del horario comercial.',
        ],
      },
      {
        title: '¿Qué hace el agente de IA en concreto?',
        paragraphs: [
          'Según la configuración, responde preguntas sobre servicios y precios, explica su zona de actuación, apoya solicitudes de cita y contacto y le reenvía consultas cualificadas de forma estructurada. Los contenidos y la lógica de respuesta se configuran según su sitio aprobado y sus indicaciones.',
        ],
      },
      {
        title: '¿Cómo accedo a la demo?',
        paragraphs: [
          'Le enviamos un código de acceso personal. En la página de inicio, haga clic en «Montagfrei», introduzca el código, y accederá directamente a su demo.',
        ],
      },
      {
        title: '¿La demo ya es el sitio en vivo?',
        paragraphs: [
          'No. La demo sirve para la revisión. Solo tras su aprobación el sitio se publica en su dominio; el agente de IA se activa después.',
        ],
      },
      {
        title: '¿Cuánto cuesta el servicio?',
        paragraphs: [
          'Las condiciones se acuerdan individualmente, según alcance, sector y servicios opcionales como el agente de IA o mantenimiento continuo. Recibirá una oferta tras la primera conversación.',
        ],
      },
      {
        title: '¿Preguntas o interés?',
        paragraphs: [],
      },
    ],
    contact: {
      legalNote: 'Información legal:',
      imprint: 'Aviso legal',
      terms: 'Términos',
    },
  },

  fr: {
    title: 'FAQ',
    intro: 'Les questions essentielles sur le site web, l’accès à la démo et l’agent IA.',
    sections: [
      {
        title: 'Que propose Montagfrei ?',
        paragraphs: [
          'Montagfrei met en place un site web professionnel pour les artisans et entreprises de services, avec une démo personnelle pour validation, puis mise en ligne sur votre domaine. Un agent IA est ensuite intégré au site pour traiter les demandes clients et alléger votre charge quotidienne.',
        ],
      },
      {
        title: 'Comment se déroule la collaboration ?',
        paragraphs: [
          '(1) Vous recevez un site démo avec un code d’accès individuel pour valider textes, structure et design.',
          '(2) Après votre accord, nous déployons le site sur le domaine de votre choix.',
          '(3) Nous configurons et activons ensuite l’agent IA sur votre site en ligne, adapté à vos prestations, processus et communication.',
        ],
      },
      {
        title: 'L’agent IA',
        paragraphs: [
          'L’agent IA est l’extension centrale de votre site : il répond aux demandes des visiteurs directement sur la page, sur les prestations, la disponibilité, les processus et les rendez-vous. Disponible en permanence, il répond de manière cohérente et professionnelle et prend en charge les questions récurrentes.',
          'Vous gagnez du temps pour votre activité principale, tandis que les clients potentiels obtiennent une orientation rapide, y compris en dehors des heures d’ouverture.',
        ],
      },
      {
        title: 'Que fait concrètement l’agent IA ?',
        paragraphs: [
          'Selon la configuration, il répond aux questions sur les prestations et tarifs, précise votre zone d’intervention, facilite les demandes de rendez-vous et de contact, et vous transmet les demandes qualifiées de façon structurée. Contenus et logique de réponse sont définis à partir de votre site validé et de vos instructions.',
        ],
      },
      {
        title: 'Comment accéder à la démo ?',
        paragraphs: [
          'Vous recevez un code d’accès personnel. Sur la page d’accueil, cliquez sur « Montagfrei », saisissez le code, et vous accédez directement à votre démo.',
        ],
      },
      {
        title: 'La démo est-elle déjà le site en ligne ?',
        paragraphs: [
          'Non. La démo sert à la validation. Ce n’est qu’après votre accord que le site est mis en ligne sur votre domaine ; l’agent IA suit ensuite.',
        ],
      },
      {
        title: 'Quel est le coût du service ?',
        paragraphs: [
          'Les conditions sont convenues individuellement, selon l’étendue, le secteur et les options comme l’agent IA ou la maintenance. Vous recevez une offre après un premier échange.',
        ],
      },
      {
        title: 'Questions ou intérêt ?',
        paragraphs: [],
      },
    ],
    contact: {
      legalNote: 'Informations légales :',
      imprint: 'Mentions légales',
      terms: 'CGV',
    },
  },

  ru: {
    title: 'FAQ',
    intro: 'Главные вопросы о сайте, доступе к демо и ИИ-агенте.',
    sections: [
      {
        title: 'Что предлагает Montagfrei?',
        paragraphs: [
          'Montagfrei создаёт профессиональный сайт для ремесленных и сервисных предприятий, с персональной демо-версией для согласования и последующим запуском на вашем домене. Затем на сайт интегрируется ИИ-агент, который обрабатывает запросы клиентов и снижает ежедневную нагрузку на бизнес.',
        ],
      },
      {
        title: 'Как проходит сотрудничество?',
        paragraphs: [
          '(1) Вы получаете демо-сайт с индивидуальным кодом доступа для проверки текстов, структуры и дизайна.',
          '(2) После вашего одобрения мы размещаем сайт на выбранном вами домене.',
          '(3) Затем настраиваем и активируем ИИ-агента на живом сайте, с учётом ваших услуг, процессов и стиля общения.',
        ],
      },
      {
        title: 'ИИ-агент',
        paragraphs: [
          'ИИ-агент является ключевым расширением вашего сайта: он отвечает на вопросы посетителей прямо на странице, об услугах, доступности, процессах и записях. Доступен круглосуточно, отвечает единообразно и профессионально, берёт на себя повторяющиеся вопросы.',
          'У вас остаётся больше времени на основную работу, а потенциальные клиенты получают быструю информацию даже вне рабочих часов.',
        ],
      },
      {
        title: 'Что конкретно делает ИИ-агент?',
        paragraphs: [
          'В зависимости от настройки он отвечает на вопросы об услугах и ценах, объясняет зону обслуживания, помогает с запросами на запись и контакт и структурированно передаёт вам квалифицированные обращения. Содержание и логика ответов настраиваются на основе утверждённого сайта и ваших указаний.',
        ],
      },
      {
        title: 'Как получить доступ к демо-сайту?',
        paragraphs: [
          'Мы высылаем вам персональный код доступа. На главной странице нажмите «Montagfrei», введите код, и вы сразу попадёте на демо.',
        ],
      },
      {
        title: 'Демо уже является живым сайтом?',
        paragraphs: [
          'Нет. Демо предназначено для согласования. Только после вашего одобрения сайт публикуется на вашем домене; ИИ-агент подключается следом.',
        ],
      },
      {
        title: 'Сколько стоит услуга?',
        paragraphs: [
          'Условия согласовываются индивидуально, в зависимости от объёма, отрасли и дополнительных услуг, таких как ИИ-агент или сопровождение. Предложение вы получите после первой беседы.',
        ],
      },
      {
        title: 'Вопросы или интерес?',
        paragraphs: [],
      },
    ],
    contact: {
      legalNote: 'Правовая информация:',
      imprint: 'Импрессум',
      terms: 'Условия',
    },
  },
}

export function parseFaqLang(value: string | null): FaqLang {
  if (value && value in faqTranslations) return value as FaqLang
  return 'de'
}
