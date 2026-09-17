import { project } from './project-media';
import { SiteContent } from '@/types';

export const nlContent: SiteContent = {
  locale: 'nl',
  meta: {
    title: 'Vikum Samaranayake - Fullstack Engineer & Mobile Developer',
    description: 'Vikum Samaranayake is een Fullstack Engineer en Mobile Developer gevestigd in Singapore met meer dan 8 jaar ervaring in het bouwen van webapps, mobiele platforms en schaalbare systemen.',
  },
  profile: {
    name: 'Vikum',
    title: 'Fullstack Web',
    subtitle: '& Mobile',
    email: 'hello@vikum.dev',
    location: 'Gevestigd in Singapore',
    avatarUrl: '/profile.webp',
    copyright: '© 2026 Vikum. Alle rechten voorbehouden',
    hireButtonText: 'Neem contact op',
    cvUrl: '', // '/vikum-samaranayake-cv.pdf' once the PDF is in /public
    cvButtonText: 'Download cv',
    socialLinks: [
      { platform: 'github', url: 'https://github.com/vikum-samare', label: 'GitHub' },
      { platform: 'linkedin', url: 'https://www.linkedin.com/in/vikum-samaranayake', label: 'LinkedIn' },
      { platform: 'instagram', url: 'https://www.instagram.com/vikum_samare', label: 'Instagram' },
      { platform: 'youtube', url: 'https://www.youtube.com/@vikumsamaranayake1723', label: 'YouTube' },
    ],
  },
  hero: {
    sectionLabel: 'INTRODUCTIE',
    greeting: 'Hallo, dit is',
    name: 'Vikum',
    title: 'Fullstack Engineer en DevOps Enthousiast',
    description: 'Ik bouw fullstack webapplicaties, mobiele apps en productgerichte oplossingen die echte problemen oplossen. Gepassioneerd over het creëren van naadloze gebruikerservaringen en schaalbare systemen.',
    scrollCta: 'MIJN PROJECTEN',
  },
  about: {
    sectionLabel: 'OVER MIJ',
    heading: 'Elk geweldig ontwerp begint met een nog',
    headingAccent: 'beter verhaal',
    paragraphs: [
      "Ik floreer in productgebaseerde ontwikkelingsculturen met resultaatgericht werk, gespecialiseerd in web-, backend- en mobiele ontwikkeling om impactvolle oplossingen te leveren.",
      "Met meer dan 8 jaar ervaring in fintech, food tech en vastgoedmarktplaatsen in Singapore en Sri Lanka, heb ik ontwikkelingsteams geleid, microservices geïntegreerd en schaalbare functies gebouwd voor webbanking-apps, mobiele platforms en digitale bestelsystemen. Van mijn begintijd met het bouwen van PHP-websites tot het leiden van mobile banking-teams bij Maybank en het ontwikkelen van marktplaatsproducten bij PropertyGuru, heb ik consequent oplossingen geleverd die technische excellentie verbinden met bedrijfsresultaten."
    ],
  },
  resume: {
    sectionLabel: 'CV',
    heading: 'Opleiding &',
    headingAccent: 'Ervaring',
    sections: [
      {
        id: 'current',
        label: '2021 - Heden',
        items: [
          {
            id: 'exp-5',
            period: '2022 - Heden',
            title: 'Senior Software Engineer',
            organization: 'PropertyGuru Group - Singapore',
            description: 'Bouwen van marktplaats agentproducten met focus op web- en backend-ontwikkeling. Ontwikkeling van Agentnet mobiele functies in een productgebaseerde, resultaatgerichte ontwikkelingscultuur.',
          },
          {
            id: 'exp-4',
            period: '2021 - 2022',
            title: 'Software Engineer / Lead Developer',
            organization: 'Maybank - Singapore',
            description: 'Gebouwde functies voor Maybank webbanking-app. Leidde mobile banking app ontwikkelingsteam en coördineerde met offshore ontwikkelaars om producten op schema te leveren.',
          },
        ],
      },
      {
        id: 'past',
        label: '2015 - 2021',
        items: [
          {
            id: 'exp-3',
            period: '2021 - 2021',
            title: 'Senior Software Engineer',
            organization: 'Aeturnum Lanka (Pvt) Ltd',
            description: 'Samengewerkt met Incentivio, een Amerikaans food tech startup, om webgebaseerde functies te ontwikkelen en te leveren voor hun digitale bestelplatform.'
          },
          {
            id: 'exp-2',
            period: '2018 - 2021',
            title: 'Software Engineer / Lead Engineer',
            organization: 'Noetic Marketing Technologies (Pvt) Ltd',
            description: 'Leidde mobiele/web ontwikkelingsteams, geïntegreerde microservices in frontend producten, en beheerde het Noetic engineering team.',
          },
          {
            id: 'exp-1',
            period: '2015 - 2018',
            title: 'Trainee Software Engineer / Associate Software Engineer',
            organization: 'Innovative Software Engineering (Pvt) Ltd',
            description: 'Werkte aan verschillende webontwikkelingsprojecten met PHP, JavaScript en MySQL. Assisteerde bij de ontwikkeling en onderhoud van klantwebsites en interne tools.',
          },
        ],
      },
      {
        id: 'education',
        label: 'Opleiding',
        items: [
          {
            id: 'edu-1',
            period: '2012 - 2017',
            title: 'Bachelor of Science in Computer Science',
            organization: 'University College Dublin, National University of Ireland',
            description: 'Mijn academische reis bouwde een sterke basis in software engineering, gedistribueerde systemen, algoritmes en AI, terwijl hands-on projecten mijn vermogen versterkten om theorie toe te passen op echte, productie-grade systemen.',
          },
        ],
      },
    ],
  },
  contributions: {
    sectionLabel: 'BIJDRAGEN',
    heading: 'GitHub',
    headingAccent: 'Bijdragen',
    totalLabel: 'Totaal',
    contributionsLabel: 'bijdragen',
    lessLabel: 'Minder',
    moreLabel: 'Meer',
    noDataLabel: 'Geen bijdragegegevens beschikbaar',
    contributionTypes: {
      commits: 'Commits',
      pullRequests: 'Pull Requests',
      reviews: 'Code Review',
      issues: 'Issues',
    },
  },
  services: {
    sectionLabel: 'DIENSTEN',
    heading: 'Mijn',
    headingAccent: 'Specialisaties',
    services: [
      {
        id: 'svc-1',
        title: 'Frontend & Productontwikkeling',
        description:
          'Ik bouw schaalbare, gebruikersgerichte webapplicaties met React, Next.js, Tailwind CSS en modern state management. Mijn werk benadrukt schone architectuur, prestaties en meetbare productresultaten in plaats van alleen visuele aspecten.',
        projectLabel: 'PROJECTEN',
        icon: 'design',
      },
      {
        id: 'svc-2',
        title: 'Backend & Systeemarchitectuur',
        description:
          'Ik ontwerp en ontwikkel backend-systemen met NestJS, MySQL, MongoDB, Redis en Python. Ik focus op onderhoudbare APIs, data-integriteit en architecturen die betrouwbaar schalen in productieomgevingen.',
        projectLabel: 'PROJECTEN',
        icon: 'code',
      },
      {
        id: 'svc-3',
        title: 'Mobile & DevOps Engineering',
        description:
          'Ik bouw cross-platform mobiele apps met React Native en beheer gecontaineriseerde deployments met Docker. Ik zet CI-pipelines op met GitHub Actions, handhaaf codekwaliteit met SonarQube en QLTY, en deploy naar AWS, DigitalOcean en zelf-gehoste infrastructuur.',
        projectLabel: 'PROJECTEN',
        icon: 'seo',
      },
    ],
  },
  skills: {
    sectionLabel: 'MIJN VAARDIGHEDEN',
    heading: 'Mijn',
    headingAccent: 'Voordelen',
    skills: [
      { id: 'skill-1',  name: 'TypeScript',     category: 'Languages',    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg' },
      { id: 'skill-2',  name: 'JavaScript',     category: 'Languages',    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
      { id: 'skill-3',  name: 'Node.js',        category: 'Languages',    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
      { id: 'skill-4',  name: 'PHP',            category: 'Languages',    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg' },
      { id: 'skill-5',  name: 'NestJS',         category: 'Frameworks',   icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nestjs/nestjs-original.svg' },
      { id: 'skill-6',  name: 'Express',        category: 'Frameworks',   icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg' },
      { id: 'skill-7',  name: 'React',          category: 'Frameworks',   icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
      { id: 'skill-8',  name: 'React Native',   category: 'Frameworks',   icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
      { id: 'skill-17', name: 'Tailwind CSS',   category: 'Frameworks',   icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg' },
      { id: 'skill-18', name: 'Bootstrap',      category: 'Frameworks',   icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg' },
      { id: 'skill-9',  name: 'AWS',            category: 'Cloud & Infra', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg' },
      { id: 'skill-19', name: 'AWS Lambda',     category: 'Cloud & Infra', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg' },
      { id: 'skill-10', name: 'Docker',         category: 'Cloud & Infra', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg' },
      { id: 'skill-11', name: 'Kubernetes',     category: 'Cloud & Infra', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg' },
      { id: 'skill-12', name: 'Terraform',      category: 'Cloud & Infra', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/terraform/terraform-original.svg' },
      { id: 'skill-13', name: 'GitHub Actions', category: 'Cloud & Infra', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg' },
      { id: 'skill-20', name: 'Cloudflare',     category: 'Cloud & Infra', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cloudflare/cloudflare-original.svg' },
      { id: 'skill-14', name: 'MySQL',          category: 'Databases',    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg' },
      { id: 'skill-15', name: 'MongoDB',        category: 'Databases',    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg' },
      { id: 'skill-16', name: 'DynamoDB',       category: 'Databases',    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dynamodb/dynamodb-original.svg' },
      { id: 'skill-21', name: 'BigQuery',       category: 'Databases',    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecloud/googlecloud-original.svg' },
    ],
  },
  portfolio: {
    sectionLabel: 'PORTFOLIO',
    heading: 'Uitgelichte',
    headingAccent: 'Projecten',
    projects: [
      project('proj-1', {
        title: 'Endurep – Fitnessplatform',
        category: 'Persoonlijk project',
        subtitle: 'Een trainings- en voedingsplatform voor coaches en hun cliënten',
        description: [
          'Endurep is een fitnessplatform gebouwd rond een <strong>NestJS-microservicebackend</strong> en een React Native-client. Coaches stellen programma&rsquo;s samen, wijzen ze toe aan cliënten en volgen de opvolging op één plek.',
          'De services communiceren via RabbitMQ en draaien op Kubernetes, met MongoDB als primaire opslag. Deployments verlopen via GitHub Actions bij elke merge naar main.',
          'Lees meer over de architectuur op <a href="https://github.com/vikum-samare" target="_blank" rel="noopener noreferrer">GitHub</a>. Het lastigste was trainingssessies offline consistent houden: de mobiele client bewaart schrijfacties lokaal en synchroniseert zodra er weer verbinding is.',
        ],
        linkLabel: 'Bekijk Endurep',
      }),
      project('proj-2', {
        title: 'Clyde & Co – Productiviteitsapp',
        category: 'Freelance',
        subtitle: 'Productiviteit en prestaties volgen voor partners en medewerkers',
        description: [
          'Een app voor productiviteit en prestatiemonitoring voor partners en medewerkers van Clyde &amp; Co, uitgebracht op zowel Android als iOS vanuit één <strong>React Native</strong>-codebase met Redux (thunk) voor state.',
          'Ik werkte hieraan als freelance mobile- en middlewareontwikkelaar. Ik zette de middlewarelaag op en integreerde die &mdash; een Node.js-service op AWS EC2 &mdash; en was verantwoordelijk voor de releases tot in productie.',
          'Testbuilds gingen uit via <strong>Microsoft App Center</strong>, en ik verzorgde de kennisoverdrachtsessies waarmee het werk aan het interne team werd overgedragen.',
        ],
      }),
      project('proj-3', {
        title: 'PropertyGuru – Marktplaats voor makelaars',
        category: 'Proptech',
        subtitle: 'Een marktplaats die makelaars en kopers samenbrengt',
        description: [
          'Een marktplaats voor makelaars van PropertyGuru, gebouwd op een <strong>NestJS</strong>-backend met React op het web en React Native op mobiel.',
          'Draait op AWS met DynamoDB als primaire opslag.',
        ],
        linkLabel: 'Bekijk project',
      }),
      project('proj-4', {
        title: 'Maybank2u – Digitaal bankieren',
        category: 'Fintech',
        subtitle: 'Web en mobiel bankieren voor Maybank Singapore',
        description: [
          'Ik begon bij het webteam van Maybank als <strong>frontendontwikkelaar met React</strong>, waar ik de module voor permanente en tijdelijke verhoging van de kredietlimiet opleverde, samen met de Wealth360-showcasemodule.',
          'Daarna stapte ik over naar het team dat de nieuwe mobiele bankapp bouwde, als <strong>lead engineer</strong>. Daar was ik verantwoordelijk voor de Revenue360- en transactiemodules &mdash; inclusief buitenlandse transacties en factuurbetalingen &mdash; en leidde ik Wealth360 op mobiel.',
          'Naast het ontwikkelwerk begeleidde ik junior ontwikkelaars, stemde ik af met een offshoreteam en rapporteerde ik de voortgang aan het management. Een jaar van opleveren onder strakke deadlines in een gereguleerde omgeving, zonder in te leveren op kwaliteit.',
        ],
      }),
      project('proj-5', {
        title: 'Incentivio – Online bestellen v2',
        category: 'Food tech',
        subtitle: 'De tweede generatie van een bestelplatform voor restaurants',
        description: [
          'Een herbouw van de online bestelervaring van Incentivio in <strong>React</strong>, ondersteund door Node.js-services op AWS.',
          'Betalingen lopen via Dwolla voor overboekingen tussen bankrekeningen.',
        ],
        linkLabel: 'Bekijk project',
      }),
      project('proj-6', {
        title: 'Noetic1 – SaaS-platform voor horeca',
        category: 'Horecatechnologie',
        subtitle: 'Een multi-tenant SaaS-platform voor horecaondernemers',
        description: [
          'Noetic1 is een SaaS-platform voor de horeca met een <strong>React</strong>-webapp, een React Native-app voor mobiel en Node.js-services daarachter.',
          'De stack draait in Docker-containers achter NGINX en wordt via Jenkins op AWS uitgerold.',
        ],
        linkLabel: 'Bekijk project',
      }),
    ],
  },
  publications: {
    sectionLabel: 'SCHRIJVEN',
    heading: 'Recente',
    headingAccent: 'Artikelen',
    readMoreLabel: 'Lees op Medium',
    viewAllLabel: 'Alle artikelen op Medium',
    viewAllUrl: 'https://medium.com/@vikum.mail',
  },
  testimonials: {
    sectionLabel: 'GETUIGENISSEN',
    heading: 'Vertrouwd door',
    headingAccent: 'honderden klanten',
    testimonials: [
      {
        id: 'test-1',
        quote: 'Vikum - Een ontwikkelaar met creativiteit, professionaliteit en meesterschap in code. Veel meer dan verwacht. Hoogwaardige producten & flexibele prijzen. Aanbevolen!',
        authorName: 'Paublo Dybala',
        authorTitle: 'CEO',
        authorCompany: 'IBM Global',
        authorImageUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
        projectLink: '#',
        projectLabel: 'PROJECT',
      },
      {
        id: 'test-2',
        quote: 'Uitzonderlijke werkkwaliteit en geweldige communicatie gedurende het hele project. Zou zeker weer met Vikum werken!',
        authorName: 'Sarah Johnson',
        authorTitle: 'Oprichter',
        authorCompany: 'StartupXYZ',
        authorImageUrl: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face',
        projectLink: '#',
        projectLabel: 'PROJECT',
      },
      {
        id: 'test-3',
        quote: 'De aandacht voor detail en het ontwerpgevoel zijn uitstekend. Vikum heeft onze visie omgezet in werkelijkheid.',
        authorName: 'Michael Chen',
        authorTitle: 'Productmanager',
        authorCompany: 'TechCorp',
        authorImageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
        projectLink: '#',
        projectLabel: 'PROJECT',
      },
    ],
  },
  clients: {
    heading: 'SAMENWERKING MET 60+ MERKEN WERELDWIJD',
    clients: [
      { id: 'client-1', name: 'BLB', logoUrl: 'https://via.placeholder.com/150x50?text=BLB' },
      { id: 'client-2', name: 'Christopher Willis', logoUrl: 'https://via.placeholder.com/150x50?text=CW' },
      { id: 'client-3', name: 'Serenity Hotel', logoUrl: 'https://via.placeholder.com/150x50?text=Serenity' },
      { id: 'client-4', name: 'Artchive', logoUrl: 'https://via.placeholder.com/150x50?text=Artchive' },
      { id: 'client-5', name: 'Neuton Interactive', logoUrl: 'https://via.placeholder.com/150x50?text=Neuton' },
      { id: 'client-6', name: 'Papillon', logoUrl: 'https://via.placeholder.com/150x50?text=Papillon' },
      { id: 'client-7', name: 'Good Habits', logoUrl: 'https://via.placeholder.com/150x50?text=GoodHabits' },
      { id: 'client-8', name: 'Creative Space', logoUrl: 'https://via.placeholder.com/150x50?text=Creative' },
    ],
  },
  contact: {
    sectionLabel: 'CONTACT',
    heading: 'Laten we',
    headingAccent: 'samenwerken!',
    email: 'hello@Vikum.design',
    fields: [
      { id: 'name', label: 'VOLLEDIGE NAAM', placeholder: 'Uw volledige naam', type: 'text', required: true },
      { id: 'email', label: 'E-MAIL', placeholder: 'Uw e-mailadres', type: 'email', required: true },
      { id: 'phone', label: 'TELEFOON (optioneel)', placeholder: 'Uw telefoonnummer', type: 'tel', required: false },
      { id: 'subject', label: 'ONDERWERP', placeholder: 'Selecteer een onderwerp', type: 'select', required: true, options: ['Website Ontwerp', 'Ontwikkeling', 'SEO/Marketing', 'Anders'] },
      { id: 'budget', label: 'UW BUDGET (optioneel)', placeholder: 'Een budgetbereik voor uw project', type: 'text', required: false },
      { id: 'message', label: 'BERICHT', placeholder: 'Schrijf uw bericht hier ...', type: 'textarea', required: true },
    ],
    attachmentLabel: 'BIJLAGE TOEVOEGEN',
    submitButtonText: 'BERICHT VERZENDEN',
  },
  navigation: {
    items: [
      { id: 'nav-1', label: 'Home', icon: 'home', sectionId: 'hero' },
      { id: 'nav-2', label: 'Over mij', icon: 'about', sectionId: 'about' },
      { id: 'nav-3', label: 'CV', icon: 'resume', sectionId: 'resume' },
      { id: 'nav-3b', label: 'Bijdragen', icon: 'contributions', sectionId: 'contributions' },
      { id: 'nav-4', label: 'Diensten', icon: 'services', sectionId: 'services' },
      { id: 'nav-5', label: 'Vaardigheden', icon: 'skills', sectionId: 'skills' },
      { id: 'nav-6', label: 'Portfolio', icon: 'portfolio', sectionId: 'portfolio' },
      { id: 'nav-7', label: 'Schrijven', icon: 'publications', sectionId: 'publications' },
    ],
  },
  theme: {
    toggleTheme: 'Thema wisselen',
    lightMode: 'Naar lichte modus',
    darkMode: 'Naar donkere modus',
  },
  cookieBanner: {
    message: 'Ik gebruik Google Analytics om te zien welke pagina’s mensen lezen. Daarvoor wordt een cookie geplaatst. Zeg je nee, dan werkt de site precies hetzelfde.',
    acceptLabel: 'Toestaan',
    declineLabel: 'Nee, bedankt',
    privacyLinkLabel: 'Wat hiermee wordt verzameld',
    withdrawLabel: 'Je cookiekeuze wijzigen',
    withdrawDoneLabel: 'Gewist. De melding verschijnt opnieuw.',
  },
  privacy: {
    metaTitle: 'Privacy · Vikum Samaranayake',
    metaDescription: 'Wat deze site verzamelt, wat niet, en hoe je me erover kunt bereiken.',
    backLabel: '← Terug naar de site',
    heading: 'Privacy',
    lastUpdatedLabel: 'Laatst bijgewerkt',
    lastUpdated: '18 september 2026',
    intro: [
      'Dit is mijn persoonlijke portfolio. Er zijn geen accounts, geen inloggegevens en niets te koop, dus er valt hier weinig te vertellen &mdash; maar wat er te vertellen is, zeg ik liever gewoon dan dat ik het wegstop in juridische taal.',
    ],
    sections: [
      {
        heading: 'Statistieken',
        paragraphs: [
          'Ik gebruik Google Analytics om te zien hoeveel mensen langskomen en welke pagina&rsquo;s ze lezen. Zo weet ik of het werk dat ik in deze site steek iemand bereikt. Het plaatst twee cookies in je browser, <code>_ga</code> en <code>_ga_Z4XVZ5T2GG</code>, die na twee jaar verlopen en waarmee een herhaald bezoek wordt herkend zonder te weten wie je bent.',
          'Ik registreer ook wanneer iemand op de contactknop klikt, en op welke van de drie knoppen. Dat is een aantal, geen identiteit &mdash; ik kan niet zien welke bezoeker het was.',
          'Google verwerkt deze gegevens namens mij en ontvangt daarbij je IP-adres en browsergegevens. Ik zie je IP-adres nooit en ik combineer dit met niets anders. Wil je liever niet meegeteld worden: elke advertentie- of trackerblocker houdt het tegen, en de site werkt precies hetzelfde zonder.',
        ],
      },
      {
        heading: 'Contact opnemen',
        paragraphs: [
          'De contactknop opent je e-mailprogramma en stuurt een bericht rechtstreeks naar <a href="mailto:{email}">{email}</a>. Die e-mail komt binnen in mijn inbox, net als elke andere. Ik bewaar hem zolang het gesprek nuttig is, ik zet je niet op een mailinglijst en ik geef hem aan niemand door.',
        ],
      },
      {
        heading: 'Wat er van elders wordt geladen',
        paragraphs: [
          'Sommige afbeeldingen op deze site komen van mijn eigen assetserver op assets.vikum.dev en sommige van Unsplash. De GitHub-bijdragengrafiek gebruikt gegevens die ik vooraf ophaal wanneer de site wordt gebouwd, niet terwijl jij zit te lezen. Elke keer dat je browser een bestand van de server van een ander bedrijf laadt, kan dat bedrijf je IP-adres zien &mdash; zo werkt het web nu eenmaal, en het is goed om dat te weten.',
          'De site zelf bestaat uit statische bestanden. Er is geen database en er draait geen server van mij achter.',
        ],
      },
      {
        heading: 'Jouw rechten',
        paragraphs: [
          'Woon je in de EU of het VK, dan heb je het recht om op te vragen welke gegevens op jou betrekking hebben, om ze te laten corrigeren of verwijderen, en om een klacht in te dienen bij je nationale toezichthouder. In de praktijk: heb je me gemaild, mail me dan opnieuw en ik verwijder het gesprek. Heb je alleen de site gelezen, dan heb ik niets waarmee ik je kan identificeren.',
        ],
      },
      {
        heading: 'Wijzigingen',
        paragraphs: [
          'Verandert er iets aan wat deze site verzamelt, dan pas ik deze pagina en de datum bovenaan aan. Vragen erover zijn welkom op het adres hierboven.',
        ],
      },
    ],
  },
  notFound: {
    title: 'Pagina niet gevonden',
    heading: '404',
    description: 'Oeps! De pagina die je zoekt bestaat niet. Het is mogelijk verplaatst of verwijderd.',
    homeButtonText: 'Terug naar Home',
  },
};
