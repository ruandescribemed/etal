// All site content. Swap the mock data here; no component needs to change.
//
// MOCK DATA (everything marked `placeholder: true`, plus the following assumptions):
// - Theme: "Inteligência Artificial" is the provisional theme; title and subtitle are not decided yet.
// - Registration: SUAP link for 2026 does not exist yet, so the status is 'soon'.
// - Schedule: mirrors the 2025 structure, moved to 2 a 4 de dezembro de 2026.
// - Talks, speakers, minicursos and their instructors: invented examples. The names are fictional.
// - E-sports: the 2025 games, reused until the 2026 list is confirmed.
// - Free entry and open to the public: true in 2025, assumed for 2026.
// - NADIC as organizer: assumed from the domain (etal.nadic.com.br).
//
// Real facts (verified): first edition in 2015; the IFRN Pau dos Ferros address and coordinates;
// the themes of 2024 and 2025.

export type Registration =
  | { status: 'soon' }
  | { status: 'open'; url: string }
  | { status: 'closed' };

export type DayId = 'qua' | 'qui' | 'sex';

export type Day = {
  id: DayId;
  weekday: string;
  date: string;
  isoDate: string;
  summary: string;
};

export type Session = {
  day: DayId;
  start: string; // 'HH:MM'
  end: string;
  title: string;
};

export type Speaker =
  | { kind: 'announced'; name: string; role: string; photo: string | null } // photo: a path under public/speakers
  | { kind: 'tba'; note: string };

export type Talk = {
  slug: string;
  format: 'Palestra' | 'Mesa-redonda';
  title: string;
  day: DayId;
  start: string;
  speaker: Speaker;
  placeholder: true;
};

export type Course = {
  slug: string;
  title: string;
  instructor: string;
  level: 'Iniciante' | 'Intermediário';
  summary: string;
  seats: number;
  placeholder: true;
};

export type Game = {
  slug: string;
  name: string;
  seats: number;
  placeholder: true;
};

export type PastEdition = { year: number; label: string; note: string };

const registration: Registration = { status: 'soon' };

export const site = {
  name: 'ETAL 2026',
  edition: 'VIII',
  fullName: 'Encontro de Tecnologia do Alto Oeste Potiguar',
  url: 'https://etal.nadic.com.br',
  description:
    'O VIII ETAL acontece de 2 a 4 de dezembro de 2026 no IFRN Pau dos Ferros, com palestras, minicursos e e-sports sobre inteligência artificial.',
  theme: { lines: ['Inteligência', 'Artificial'], placeholder: true },
  dates: {
    label: '2 a 4 de dezembro de 2026',
    short: '2–4 dez',
    weekdays: 'de quarta a sexta',
    start: '2026-12-02',
    end: '2026-12-04',
  },
  registration,
  entry: 'Entrada gratuita e aberta ao público',
  venue: {
    name: 'IFRN Campus Pau dos Ferros',
    street: 'BR 405, km 154, Chico Cajá',
    city: 'Pau dos Ferros',
    region: 'RN',
    postalCode: '59900-000',
    coordinates: { lat: -6.1458, lng: -38.2037, label: '6°08′45″ S, 38°12′13″ O' },
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=IFRN%20Campus%20Pau%20dos%20Ferros',
  },
  organizers: ['IFRN Campus Pau dos Ferros', 'NADIC'],
  credit: { handle: '@ruangustavo', href: 'https://www.linkedin.com/in/ruan-gustavo/', avatar: '/credit/ruangustavo.png' },
};

// The LED strip under the hero. Decorative: every item also appears as real text elsewhere.
export const ticker = ['VIII ETAL', '2 a 4 de dezembro de 2026', 'IFRN Campus Pau dos Ferros', 'Inteligência Artificial', 'Entrada gratuita'];

export const nav = [
  { label: 'Programação', href: '/#programacao' },
  { label: 'Palestras', href: '/#palestras' },
  { label: 'Minicursos', href: '/#minicursos' },
  { label: 'E-sports', href: '/#e-sports' },
];

export const about = {
  statement:
    'O ETAL junta estudantes, professores e quem trabalha com tecnologia no Alto Oeste Potiguar para três dias de palestras, minicursos e competição. Em 2026 o assunto é inteligência artificial: como ela funciona, onde ela erra e o que dá para construir com ela a partir de Pau dos Ferros.',
};

export const days: Day[] = [
  { id: 'qua', weekday: 'Quarta', date: '2 de dezembro', isoDate: '2026-12-02', summary: 'Credenciamento, competição e minicursos' },
  { id: 'qui', weekday: 'Quinta', date: '3 de dezembro', isoDate: '2026-12-03', summary: 'Abertura, palestra e mesa-redonda' },
  { id: 'sex', weekday: 'Sexta', date: '4 de dezembro', isoDate: '2026-12-04', summary: 'Palestras, mesa-redonda e premiação' },
];

export const schedule: Session[] = [
  { day: 'qua', start: '13:00', end: '17:00', title: 'Credenciamento' },
  { day: 'qua', start: '14:00', end: '18:00', title: 'Competição de jogos: classificatórias' },
  { day: 'qua', start: '14:00', end: '18:00', title: 'Minicursos, primeiro encontro' },
  { day: 'qui', start: '07:00', end: '11:00', title: 'Credenciamento' },
  { day: 'qui', start: '08:00', end: '12:00', title: 'Competição de jogos: finais' },
  { day: 'qui', start: '08:00', end: '12:00', title: 'Minicursos, segundo encontro' },
  { day: 'qui', start: '13:00', end: '14:30', title: 'Cerimônia de abertura e palestra' },
  { day: 'qui', start: '14:50', end: '16:20', title: 'Intervalo e apresentação cultural' },
  { day: 'qui', start: '16:30', end: '18:00', title: 'Mesa-redonda' },
  { day: 'sex', start: '07:30', end: '08:30', title: 'Palestra' },
  { day: 'sex', start: '08:50', end: '09:20', title: 'Apresentação cultural' },
  { day: 'sex', start: '09:20', end: '10:20', title: 'Palestra' },
  { day: 'sex', start: '10:30', end: '12:00', title: 'Mesa-redonda' },
  { day: 'sex', start: '13:00', end: '14:30', title: 'Palestra' },
  { day: 'sex', start: '14:50', end: '16:20', title: 'Apresentação cultural e encerramento' },
  { day: 'sex', start: '16:30', end: '18:00', title: 'Premiação e coffee break' },
];

export const talks: Talk[] = [
  {
    slug: 'abertura',
    format: 'Palestra',
    title: 'O que um modelo de linguagem sabe, e o que ele só parece saber',
    day: 'qui',
    start: '13:00',
    speaker: { kind: 'announced', name: 'Marina Albuquerque', role: 'Pesquisadora em processamento de linguagem natural', photo: null },
    placeholder: true,
  },
  {
    slug: 'ia-e-trabalho',
    format: 'Mesa-redonda',
    title: 'IA e trabalho no Alto Oeste: quem contrata, quem automatiza',
    day: 'qui',
    start: '16:30',
    speaker: { kind: 'tba', note: 'Egressos do IFRN Pau dos Ferros, nomes a confirmar' },
    placeholder: true,
  },
  {
    slug: 'visao-computacional',
    format: 'Palestra',
    title: 'Visão computacional na caatinga: contando o que a câmera vê',
    day: 'sex',
    start: '07:30',
    speaker: { kind: 'announced', name: 'Rafael Nogueira', role: 'Professor e pesquisador em visão computacional', photo: null },
    placeholder: true,
  },
  {
    slug: 'agentes',
    format: 'Palestra',
    title: 'Agentes de IA na prática: do prompt ao sistema que age sozinho',
    day: 'sex',
    start: '09:20',
    speaker: { kind: 'tba', note: 'Palestrante a confirmar' },
    placeholder: true,
  },
  {
    slug: 'escola-tecnica',
    format: 'Mesa-redonda',
    title: 'Ensinar e aprender com IA na escola técnica',
    day: 'sex',
    start: '10:30',
    speaker: { kind: 'tba', note: 'Professores do IFRN, nomes a confirmar' },
    placeholder: true,
  },
  {
    slug: 'vies',
    format: 'Palestra',
    title: 'Viés, dados e decisões: quem responde pelo que a máquina aprende',
    day: 'sex',
    start: '13:00',
    speaker: { kind: 'announced', name: 'Lívia Fernandes', role: 'Advogada e pesquisadora em direito digital', photo: null },
    placeholder: true,
  },
];

export const coursesInfo = {
  when: 'Quarta à tarde e quinta de manhã, 8 horas no total',
  how: 'A vaga no minicurso é escolhida na inscrição do evento, pelo SUAP. As turmas são pequenas e as vagas acabam por ordem de inscrição.',
};

export const courses: Course[] = [
  {
    slug: 'python-para-ia',
    title: 'Python para IA, do zero ao primeiro modelo',
    instructor: 'Caio Medeiros',
    level: 'Iniciante',
    summary: 'Variáveis, listas e funções até treinar um classificador simples com scikit-learn. Não precisa saber programar antes.',
    seats: 30,
    placeholder: true,
  },
  {
    slug: 'agentes-llm',
    title: 'Agentes com modelos de linguagem',
    instructor: 'Beatriz Paiva',
    level: 'Intermediário',
    summary: 'Um agente que consulta uma API, decide o próximo passo e explica o que fez. Em Python, com a API de um modelo de linguagem.',
    seats: 25,
    placeholder: true,
  },
  {
    slug: 'visao-opencv',
    title: 'Visão computacional com OpenCV',
    instructor: 'Diego Holanda',
    level: 'Intermediário',
    summary: 'Detecção de objetos em fotos e vídeo com OpenCV e um modelo pré-treinado, rodando no seu próprio notebook.',
    seats: 25,
    placeholder: true,
  },
  {
    slug: 'rag',
    title: 'RAG: um assistente que leu os seus documentos',
    instructor: 'Larissa Queiroz',
    level: 'Intermediário',
    summary: 'Indexe editais do IFRN em PDF e monte um assistente que responde citando a página de onde tirou a resposta.',
    seats: 25,
    placeholder: true,
  },
  {
    slug: 'interfaces-ia',
    title: 'Interfaces com IA usando Next.js',
    instructor: 'Mateus Fontes',
    level: 'Intermediário',
    summary: 'Uma aplicação web que conversa com um modelo e mostra a resposta enquanto ela é gerada, com React e Next.js.',
    seats: 30,
    placeholder: true,
  },
  {
    slug: 'dados-abertos',
    title: 'Dados abertos do RN com pandas',
    instructor: 'Ana Clara Rêgo',
    level: 'Iniciante',
    summary: 'Limpeza, gráficos e perguntas respondidas com dados públicos do Rio Grande do Norte, usando pandas.',
    seats: 30,
    placeholder: true,
  },
];

export const esports = {
  intro: 'Cinco campeonatos em dois dias: classificatórias na quarta à tarde e finais na quinta de manhã.',
};

export const games: Game[] = [
  {
    slug: 'mortal-kombat-11',
    name: 'Mortal Kombat 11',
    seats: 16,
    placeholder: true,
  },
  {
    slug: 'ea-fc',
    name: 'EA Sports FC',
    seats: 16,
    placeholder: true,
  },
  {
    slug: 'clash-royale',
    name: 'Clash Royale',
    seats: 32,
    placeholder: true,
  },
  {
    slug: 'guitar-hero-3',
    name: 'Guitar Hero III',
    seats: 16,
    placeholder: true,
  },
  {
    slug: 'naruto-storm-4',
    name: 'Naruto Ultimate Ninja Storm 4',
    seats: 16,
    placeholder: true,
  },
];

export const pastEditions: PastEdition[] = [
  { year: 2025, label: '7ª edição', note: 'Entre likes e algoritmos: o impacto da IA nas redes e na mente' },
  { year: 2024, label: 'Edição de 2024', note: '15 anos de IFRN: inovação, crescimento e tecnologias impactando vidas' },
  { year: 2021, label: '4ª edição', note: 'Edição online, com mesas transmitidas ao vivo' },
  { year: 2015, label: '1ª edição', note: 'A primeira, com desafio de programação' },
];

export const dayById = (id: DayId) => {
  const day = days.find((d) => d.id === id);
  if (!day) throw new Error(`Unknown day: ${id}`);
  return day;
};
