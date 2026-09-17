import { project } from './project-media';
import { SiteContent } from '@/types';

export const enContent: SiteContent = {
  locale: 'en',
  meta: {
    title: 'Vikum Samaranayake - Fullstack Engineer & Mobile Developer',
    description: 'Vikum Samaranayake is a Fullstack Engineer and Mobile Developer based in Singapore with 8+ years of experience building web apps, mobile platforms, and scalable systems.',
  },
  profile: {
    name: 'Vikum',
    title: 'Fullstack Web',
    subtitle: '& Mobile',
    email: 'hello@vikum.dev',
    location: 'Based in Singapore',
    avatarUrl: '/profile.webp',
    copyright: '© 2026 Vikum. All Rights Reserved',
    hireButtonText: 'Get in touch',
    cvUrl: '', // '/vikum-samaranayake-cv.pdf' once the PDF is in /public
    cvButtonText: 'Download CV',
    socialLinks: [
      { platform: 'github', url: 'https://github.com/vikum-samare', label: 'GitHub' },
      { platform: 'linkedin', url: 'https://www.linkedin.com/in/vikum-samaranayake', label: 'LinkedIn' },
      { platform: 'instagram', url: 'https://www.instagram.com/vikum_samare', label: 'Instagram' },
      { platform: 'youtube', url: 'https://www.youtube.com/@vikumsamaranayake1723', label: 'YouTube' },
    ],
  },
  hero: {
    sectionLabel: 'INTRODUCE',
    greeting: 'Hello, this is',
    name: 'Vikum',
    title: 'Fullstack Engineer and DevOps Enthusiast',
    description: 'I build fullstack web applications, mobile apps, and product-focused solutions that solve real problems. Passionate about creating seamless user experiences and scalable systems.',
    scrollCta: 'MY PROJECTS',
  },
  about: {
    sectionLabel: 'ABOUT',
    heading: 'Every great design begin with an even',
    headingAccent: 'better story',
    paragraphs: [
      "I thrive in product-based development cultures with outcome-focused work, specializing in web, backend, and mobile development to deliver impactful solutions.",
      "With over 8 years of experience spanning fintech, food tech, and real estate marketplaces across Singapore and Sri Lanka, I've led development teams, integrated microservices, and built scalable features for web banking apps, mobile platforms, and digital ordering systems. From my early days building PHP websites to leading mobile banking teams at Maybank and developing marketplace products at PropertyGuru, I've consistently delivered solutions that bridge technical excellence with business outcomes."
    ],
  },
  resume: {
    sectionLabel: 'RESUME',
    heading: 'Education &',
    headingAccent: 'Experience',
    sections: [
      {
        id: 'current',
        label: '2021 - Present',
        items: [
          {
            id: 'exp-5',
            period: '2022 - Present',
            title: 'Senior Software Engineer',
            organization: 'PropertyGuru Group - Singapore',
            description: 'Building marketplace agent products focusing on web and backend development. Developing Agentnet mobile features in a product-based, outcome-focused development culture.',
          },
          {
            id: 'exp-4',
            period: '2021 - 2022',
            title: 'Software Engineer / Lead Developer',
            organization: 'Maybank - Singapore',
            description: 'Built features for Maybank web banking app. Led mobile banking app development team and coordinated with offshore developers to deliver products on schedule.',
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
            description: 'Collaborated with Incentivio, a US-based food tech startup, to develop and deliver web-based features for their digital ordering platform.'
          },
          {
            id: 'exp-2',
            period: '2018 - 2021',
            title: 'Software Engineer / Lead Engineer',
            organization: 'Noetic Marketing Technologies (Pvt) Ltd',
            description: 'Led mobile/web development teams, integrated microservices into frontend products, and managed the Noetic engineering team.',
          },
          {
            id: 'exp-1',
            period: '2015 - 2018',
            title: 'Trainee Software Engineer / Associate Software Engineer',
            organization: 'Innovative Software Engineering (Pvt) Ltd',
            description: 'Worked on various web development projects using PHP, JavaScript, and MySQL. Assisted in the development and maintenance of client websites and internal tools.',
          },
        ],
      },
      {
        id: 'education',
        label: 'Education',
        items: [
          {
            id: 'edu-1',
            period: '2012 - 2017',
            title: 'Bachelor of Science in Computer Science',
            organization: 'University College Dublin, National University of Ireland',
            description: 'My academic journey built a strong foundation in software engineering, distributed systems, algorithms, and AI, while hands-on projects strengthened my ability to apply theory to real-world, production-grade systems.',
          },
        ],
      },
    ],
  },
  contributions: {
    sectionLabel: 'CONTRIBUTIONS',
    heading: 'GitHub',
    headingAccent: 'Contributions',
    totalLabel: 'Total',
    contributionsLabel: 'contributions',
    lessLabel: 'Less',
    moreLabel: 'More',
    noDataLabel: 'No contribution data available',
    contributionTypes: {
      commits: 'Commits',
      pullRequests: 'Pull Requests',
      reviews: 'Code Review',
      issues: 'Issues',
    },
  },
  services: {
    sectionLabel: 'SERVICES',
    heading: 'My',
    headingAccent: 'Specializations',
    services: [
      {
        id: 'svc-1',
        title: 'Frontend & Product Development',
        description:
          'I build scalable, user-focused web applications using React, Next.js, Tailwind CSS, and modern state management. My work emphasizes clean architecture, performance, and measurable product outcomes rather than just visuals.',
        projectLabel: 'PROJECTS',
        icon: 'design',
      },
      {
        id: 'svc-2',
        title: 'Backend & System Architecture',
        description:
          'I design and develop backend systems using NestJS, MySQL, MongoDB, Redis, and Python. I focus on maintainable APIs, data integrity, and architectures that scale reliably in production environments.',
        projectLabel: 'PROJECTS',
        icon: 'code',
      },
      {
        id: 'svc-3',
        title: 'Mobile & DevOps Engineering',
        description:
          'I build cross-platform mobile apps with React Native and handle containerized deployments using Docker. I set up CI pipelines with GitHub Actions, enforce code quality with SonarQube and QLTY, and deploy across AWS, DigitalOcean, and self-hosted infrastructure.',
        projectLabel: 'PROJECTS',
        icon: 'seo',
      },
    ],
  },
  skills: {
    sectionLabel: 'MY SKILLS',
    heading: 'My',
    headingAccent: 'Advantages',
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
    heading: 'Featured',
    headingAccent: 'Projects',
    projects: [
      project('proj-1', {
        title: 'Endurep – Fitness Platform',
        category: 'Personal Project',
        subtitle: 'A training and nutrition platform for coaches and their clients',
        description: [
          'Endurep is a fitness platform built around a <strong>NestJS microservice backend</strong> and a React Native client. Coaches build programmes, assign them to clients, and track adherence in one place.',
          'The services communicate over RabbitMQ and run on Kubernetes, with MongoDB as the primary store. Deployments ship through GitHub Actions on every merge to main.',
          'Read more about the architecture on <a href="https://github.com/vikum-samare" target="_blank" rel="noopener noreferrer">GitHub</a>. The hardest part was keeping workout sessions consistent offline: the mobile client queues writes locally and reconciles them when connectivity returns.',
        ],
        linkLabel: 'Visit Endurep',
      }),
      project('proj-2', {
        title: 'Clyde & Co – Productivity App',
        category: 'Freelance',
        subtitle: 'Productivity and performance tracking for partners and internal staff',
        description: [
          'A productivity and performance tracking app for Clyde &amp; Co partners and internal employees, shipped on both Android and iOS from a single <strong>React Native</strong> codebase with Redux (thunk) for state.',
          'I joined as a freelance mobile and middleware developer. I initiated and integrated the middleware layer &mdash; a Node.js service running on AWS EC2 &mdash; and owned its releases through to production.',
          'Test builds went out through <strong>Microsoft App Center</strong>, and I ran the knowledge transfer sessions that handed the work over to the in-house team at the end of the engagement.',
        ],
      }),
      project('proj-3', {
        title: 'PropertyGuru – Agent Marketplace',
        category: 'Proptech',
        subtitle: 'A marketplace connecting property agents with buyers',
        description: [
          'An agent marketplace for PropertyGuru, built on a <strong>NestJS</strong> backend with React on the web and React Native on mobile.',
          'Runs on AWS with DynamoDB as the primary store.',
        ],
        linkLabel: 'Visit project',
      }),
      project('proj-4', {
        title: 'Maybank2u – Digital Banking Platform',
        category: 'Fintech',
        subtitle: 'Web and mobile banking for Maybank Singapore',
        description: [
          'I joined the Maybank web app team as a <strong>frontend engineer working in React</strong>, where I delivered the permanent and temporary credit card limit increase module, along with the Wealth360 showcase module.',
          'I then moved to the team building the new mobile banking app as a <strong>lead engineer</strong>, owning the Revenue360 and transaction modules &mdash; including foreign transactions and bill payments &mdash; and leading Wealth360 on mobile.',
          'Alongside the delivery work I mentored junior developers, coordinated with an off-shore team, and reported progress to senior management. It was a year of shipping to tight deadlines in a regulated environment without letting quality slip.',
        ],
      }),
      project('proj-5', {
        title: 'Incentivio – Web Ordering v2',
        category: 'Food Tech',
        subtitle: 'The second generation of a restaurant web ordering flow',
        description: [
          'A rebuild of Incentivio&rsquo;s web ordering experience in <strong>React</strong>, backed by Node.js services on AWS.',
          'Payments run through Dwolla for bank-to-bank transfers.',
        ],
        linkLabel: 'Visit project',
      }),
      project('proj-6', {
        title: 'Noetic1 – Hospitality SaaS Platform',
        category: 'Hospitality Tech',
        subtitle: 'A multi-tenant SaaS platform for hospitality operators',
        description: [
          'Noetic1 is a hospitality SaaS platform with a <strong>React</strong> web app, a React Native mobile client and Node.js services behind it.',
          'The stack is containerised with Docker, fronted by NGINX and deployed through Jenkins on AWS.',
        ],
        linkLabel: 'Visit project',
      }),
    ],
  },
  publications: {
    sectionLabel: 'WRITING',
    heading: 'Recent',
    headingAccent: 'Articles',
    readMoreLabel: 'Read on Medium',
    viewAllLabel: 'All articles on Medium',
    viewAllUrl: 'https://medium.com/@vikum.mail',
  },
  testimonials: {
    sectionLabel: 'TESTIMONIALS',
    heading: 'Trusted by',
    headingAccent: 'Hundred Clients',
    testimonials: [
      {
        id: 'test-1',
        quote: "Vikum - A Developer with the creativity, professional and master of code. Much more than what I'm expect. High quality product & flexible price. Recommended!",
        authorName: 'Paublo Dybala',
        authorTitle: 'CEO',
        authorCompany: 'IBM Global',
        authorImageUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
        projectLink: '#',
        projectLabel: 'PROJECT',
      },
      {
        id: 'test-2',
        quote: 'Exceptional work quality and great communication throughout the project. Would definitely work with Vikum again!',
        authorName: 'Sarah Johnson',
        authorTitle: 'Founder',
        authorCompany: 'StartupXYZ',
        authorImageUrl: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face',
        projectLink: '#',
        projectLabel: 'PROJECT',
      },
      {
        id: 'test-3',
        quote: 'The attention to detail and design sensibility is outstanding. Vikum transformed our vision into reality.',
        authorName: 'Michael Chen',
        authorTitle: 'Product Manager',
        authorCompany: 'TechCorp',
        authorImageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
        projectLink: '#',
        projectLabel: 'PROJECT',
      },
    ],
  },
  clients: {
    heading: 'WORK WITH 60+ BRANDS WORLDWIDE',
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
    heading: "Let's Work",
    headingAccent: 'Together!',
    email: 'hello@Vikum.design',
    fields: [
      { id: 'name', label: 'FULL NAME', placeholder: 'Your Full Name', type: 'text', required: true },
      { id: 'email', label: 'EMAIL', placeholder: 'Your email address', type: 'email', required: true },
      { id: 'phone', label: 'PHONE (optional)', placeholder: 'Your number phone', type: 'tel', required: false },
      { id: 'subject', label: 'SUBJECT', placeholder: 'Select a subject', type: 'select', required: true, options: ['Website Design', 'Development', 'SEO/Marketing', 'Other'] },
      { id: 'budget', label: 'YOUR BUDGET (optional)', placeholder: 'A range budget for your project', type: 'text', required: false },
      { id: 'message', label: 'MESSAGE', placeholder: 'Write your message here ...', type: 'textarea', required: true },
    ],
    attachmentLabel: 'ADD AN ATTACHMENT',
    submitButtonText: 'SEND MESSAGE',
  },
  navigation: {
    items: [
      { id: 'nav-1', label: 'Home', icon: 'home', sectionId: 'hero' },
      { id: 'nav-2', label: 'About', icon: 'about', sectionId: 'about' },
      { id: 'nav-3', label: 'Resume', icon: 'resume', sectionId: 'resume' },
      { id: 'nav-3b', label: 'Contributions', icon: 'contributions', sectionId: 'contributions' },
      { id: 'nav-4', label: 'Services', icon: 'services', sectionId: 'services' },
      { id: 'nav-5', label: 'Skills', icon: 'skills', sectionId: 'skills' },
      { id: 'nav-6', label: 'Portfolio', icon: 'portfolio', sectionId: 'portfolio' },
      { id: 'nav-7', label: 'Writing', icon: 'publications', sectionId: 'publications' },
    ],
  },
  theme: {
    toggleTheme: 'Toggle theme',
    lightMode: 'Switch to light mode',
    darkMode: 'Switch to dark mode',
  },
  cookieBanner: {
    message: 'I use Google Analytics to see which pages people read. It sets a cookie. The site works exactly the same if you say no.',
    acceptLabel: 'Allow',
    declineLabel: 'No thanks',
    privacyLinkLabel: 'What this collects',
    withdrawLabel: 'Change your cookie choice',
    withdrawDoneLabel: 'Cleared. The banner will ask again.',
  },
  privacy: {
    metaTitle: 'Privacy · Vikum Samaranayake',
    metaDescription: 'What this site collects, what it does not, and how to reach me about it.',
    backLabel: '← Back to the site',
    heading: 'Privacy',
    lastUpdatedLabel: 'Last updated',
    lastUpdated: '18 September 2026',
    intro: [
      'This is my personal portfolio. There are no accounts, no logins and nothing to buy, so there is very little to say here &mdash; but what there is, I would rather say plainly than bury in legal boilerplate.',
    ],
    sections: [
      {
        heading: 'Analytics',
        paragraphs: [
          'I use Google Analytics to see how many people visit and which pages they read. It tells me whether the work I put into this site is reaching anyone. It sets two cookies in your browser, <code>_ga</code> and <code>_ga_Z4XVZ5T2GG</code>, which expire after two years and let it recognise a repeat visit without knowing who you are.',
          'I also record when someone clicks the contact button, and which of the three buttons it was. That is a count, not an identity &mdash; I cannot tell which visitor clicked it.',
          'Google processes this data on my behalf and receives your IP address and browser details as part of it. I never see your IP address, and I do not combine any of this with anything else. If you would rather not be counted, any ad or tracker blocker will stop it, and the site works exactly the same without it.',
        ],
      },
      {
        heading: 'Getting in touch',
        paragraphs: [
          'The contact button opens your email client and sends a message straight to <a href="mailto:{email}">{email}</a>. That email arrives in my inbox like any other. I keep it for as long as the conversation is useful, I do not add you to a mailing list, and I do not pass it to anyone.',
        ],
      },
      {
        heading: 'Things loaded from elsewhere',
        paragraphs: [
          'Some images on this site come from my own asset server at assets.vikum.dev and some from Unsplash. The GitHub contribution chart uses data I fetch ahead of time when the site is built, not while you are reading it. Any time your browser loads a file from another company&rsquo;s server, that company can see your IP address &mdash; that is how the web works, and it is worth knowing.',
          'The site itself is a set of static files. There is no database and no server of mine running behind it.',
        ],
      },
      {
        heading: 'Your rights',
        paragraphs: [
          'If you are in the EU or UK, you have the right to ask what data relates to you, to ask for it to be corrected or deleted, and to complain to your national data protection authority. In practice, if you have emailed me, email me again and I will delete the thread. If you have only read the site, I hold nothing that identifies you.',
        ],
      },
      {
        heading: 'Changes',
        paragraphs: [
          'If I change what this site collects, I will change this page and the date at the top. Questions about any of it are welcome at the address above.',
        ],
      },
    ],
  },
  notFound: {
    title: 'Page Not Found',
    heading: '404',
    description: "Oops! The page you're looking for doesn't exist. It might have been moved or deleted.",
    homeButtonText: 'Back to Home',
  },
};
