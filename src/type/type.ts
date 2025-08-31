export interface Experience {
  title: string;
  date: string;
  description: string;
  download: string;
  badge: string;
}

export interface ItemInputProps {
  label: string;
  type:
    | "textarea"
    | "text"
    | "email"
    | "password"
    | "number"
    | "tel"
    | "url"
    | "search"
    | "date"
    | "time"
    | "datetime-local"
    | "month"
    | "week";
  name: string;
  required: boolean;
}

export interface ExperienceTypeProps {
  title: string;
  date: string;
  description: string;
  download: string;
  badge: string;
}

export interface ExperienceItemProps extends ExperienceTypeProps {
  color: string;
}

interface ProfileProps {
  network: string;
  username: string;
  url: string;
}

export interface MeProps {
  name: string;
  fecnac: string;
  dni: string;
  label: string;
  image: string;
  email: string;
  phone: string;
  url: string;
  location: {
    address: string;
    postalCode: string;
    city: string;
    countryCode: string;
    region: string;
  };
  profiles: ProfileProps[];
}

export interface HeaderMe {
  label: string;
  name: string;
  fecnac: string;
  dni: string;
  email: string;
  phone: string;
  city: string;
  region: string;
}

export interface MainMe {
  name: string;
  image: string;
}

export interface FooterMe {
  name: string;
  email: string;
  phone: string;
  profiles: ProfileProps[];
}

interface SummarieProps {
  text: string;
}
export interface AboutMeProps {
  summaries: SummarieProps[];
}

export interface ExperienceProps {
  title: string;
  date: string;
  description: string;
  download: string;
  badge: string;
}

export interface EducationProps {
  institution: string;
  area: string;
  url: string;
  studyType: string;
  startDate: string;
  endDate: string | null;
  courses: string[];
}

export interface ProjectProps {
  name: string;
  description: string;
  startDate: string;
  endDate: string | null;
  url: string;
  highlights: string[];
  github: string;
}

export interface SkillProps {
  name: string;
  level: string;
}

export interface LinkProfileProps {
  title: string;
  url: string;
}
