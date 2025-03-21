export interface PageContent {
  id: number;
  elements: {
    type: string;
    content: string;
    className?: string;
    id?: string;
  }[];
}

export const pagesData: PageContent[] = [
  {
    id: 0,
    elements: [
      {
        type: "h1",
        content: "Rémi",
        className: "name-title-1",
      },
      {
        type: "h1",
        content: "Asselin",
        className: "name-title-2",
      },
      {
        type: "button",
        content: ">",
        className: "next-button",
      },
    ],
  },
  // Project 1
  {
    id: 1,
    elements: [
      {
        type: "div",
        content: "project-container",
        className: "project-layout",
        id: "project-1",
      },
      {
        type: "img",
        content: "/path/to/project1-image.jpg",
        className: "project-image",
      },
      {
        type: "h2",
        content: "E-Commerce Platform",
        className: "project-title",
      },
      {
        type: "p",
        content:
          "A full-featured e-commerce platform built with modern web technologies. Features include user authentication, product management, shopping cart functionality, and secure payment processing.",
        className: "project-description",
      },
      {
        type: "p",
        content: "React • Node.js • MongoDB • Express • Stripe API",
        className: "project-tech",
      },
      {
        type: "button",
        content: "Next Project",
        className: "next-button",
      },
    ],
  },
  // Project 2
  {
    id: 2,
    elements: [
      {
        type: "div",
        content: "project-container",
        className: "project-layout",
        id: "project-2",
      },
      {
        type: "img",
        content: "/path/to/project2-image.jpg",
        className: "project-image",
      },
      {
        type: "h2",
        content: "Task Management App",
        className: "project-title",
      },
      {
        type: "p",
        content:
          "A collaborative task management application that helps teams organize and track their projects. Includes real-time updates, task assignment, deadline tracking, and progress visualization.",
        className: "project-description",
      },
      {
        type: "p",
        content: "Vue.js • Firebase • Tailwind CSS • WebSocket",
        className: "project-tech",
      },
      {
        type: "button",
        content: "Next Project",
        className: "next-button",
      },
    ],
  },
  // Project 3
  {
    id: 3,
    elements: [
      {
        type: "div",
        content: "project-container",
        className: "project-layout",
        id: "project-3",
      },
      {
        type: "img",
        content: "/path/to/project3-image.jpg",
        className: "project-image",
      },
      {
        type: "h2",
        content: "Weather Dashboard",
        className: "project-title",
      },
      {
        type: "p",
        content:
          "An interactive weather dashboard that provides real-time weather data and forecasts. Features include location-based weather updates, interactive maps, and severe weather alerts.",
        className: "project-description",
      },
      {
        type: "p",
        content: "TypeScript • React • OpenWeather API • D3.js",
        className: "project-tech",
      },
      {
        type: "button",
        content: "Next Project",
        className: "next-button",
      },
    ],
  },
  // Page de contact
  {
    id: 5,
    elements: [
      {
        type: "div",
        content: "",
        className: "contact-section",
        id: "contact-section",
      },
      {
        type: "h2",
        content: "Contact",
        className: "contact-title",
      },
      {
        type: "div",
        content: "contact-container",
        className: "contact-layout",
      },
      {
        type: "input",
        content: "Votre nom",
        className: "contact-input name-input",
      },
      {
        type: "input",
        content: "Votre email",
        className: "contact-input email-input",
      },
      {
        type: "textarea",
        content: "Votre message",
        className: "contact-textarea",
      },
      {
        type: "button",
        content: "Envoyer",
        className: "submit-button",
      },
      {
        type: "button",
        content: "Page d'accueil",
        className: "home-button",
      },
    ],
  },
];
