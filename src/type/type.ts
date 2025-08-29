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
