export interface PageElement {
  type: string;
  content: string;
  className?: string;
  id?: string;
}

export interface PageContent {
  id: number;
  elements: PageElement[];
}

export interface PageProps {
  onNextPage: () => void;
  onHomePage: () => void;
  onContactPage: () => void;
}
