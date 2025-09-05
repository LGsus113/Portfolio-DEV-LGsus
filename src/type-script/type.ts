export interface TitleProps {
  title: string;
}

interface NameProps {
  name: string;
}

export interface LayoutProps extends TitleProps {
  description: string;
  clasName: string;
  variant: "default" | "main";
}

export interface RepoTypes {
  id: number;
  name: string;
  full_name: string;
  updated_at: string;
  html_url: string;
  created_at: string;
  pushed_at: string;
  description: string | null;
  language: string | null;
  visibility: string;
  topics?: string[];
}

export interface ItemInputProps extends NameProps {
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
  required: boolean;
}

export interface ButtonProps extends TitleProps {
  link: string;
}

interface ProfileProps {
  network: string;
  username: string;
  url: string;
}

export interface MeProps extends NameProps {
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

export interface HeaderMe extends NameProps {
  label: string;
  fecnac: string;
  dni: string;
  email: string;
  phone: string;
  city: string;
  region: string;
}

export interface MainMe extends NameProps {
  image: string;
}

export interface FooterMe extends NameProps {
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

export interface ExperienceTypeProps extends TitleProps {
  date: string;
  description: string;
  download: string;
  badge: string;
}

export interface ExperienceItemProps extends ExperienceTypeProps {
  color: string;
}

export interface ExperienceProps extends TitleProps {
  date: string;
  description: string;
  download: string;
  badge: string;
}

export interface GroupedExperience {
  badge: string;
  items: ExperienceProps[];
}

export interface ExperienceGroupedProps extends TitleProps {
  color: string;
  experiences: ExperienceProps[] | GroupedExperience[];
  class: string;
  grouped?: boolean;
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

export interface ProjectProps extends NameProps {
  description: string;
  startDate: string;
  endDate: string | null;
  url: string;
  highlights: string[];
  github: string;
}

export interface SkillProps extends NameProps {
  level: string;
}

export interface SkillWithIcon extends NameProps {
  level: string;
  Icon?: any;
}

export interface LinkProfileProps extends TitleProps {
  url: string;
}

export interface Badge2Props {
  bg: string;
  text: string;
}

export interface TextUseProps {
  description: string;
  className: string;
  cv: boolean;
}

export interface SectionSchemeProps {
  id: string;
  className: string;
}

interface ListProps {
  label: string;
  href: string;
  image: any;
  target?: string;
}

export interface ItemsProps {
  items: ListProps[];
}

export interface ListNavProps extends ItemsProps {
  variant?: "default" | "alt" | "third";
}

export interface ItemWSVAProps extends NameProps {
  position: string;
  years: string;
  summary: string;
}

export interface HoveredProps {
  items: string;
  container: string;
}
