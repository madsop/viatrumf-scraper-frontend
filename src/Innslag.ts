export interface Innslag {
  href: string;
  kategori: string | undefined;
  namn: string;
  timestamp: string;
  verdi: string;
  type: Type | undefined;
}

export enum Type {
  PROSENT = 'PROSENT',
  NOK = "NOK"
}