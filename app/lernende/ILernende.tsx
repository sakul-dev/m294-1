export interface ILernende {
    id_lernende?: string;
    vorname: string,
    nachname: string,
    strasse: string,
    platz: string,
    ort: string,
    gender: string,
    telefon: string,
    email: string,
    emailPrivat: string,
    birthdate: string,
    nr_country: string,
}

export interface IKurseLernende {
  id_kurse_lernende: number;
  nr_lernende: number;
  nr_kurs: number;
  note: number;
  kursThema?: string; // Optional: for display purposes
}

export interface ILehrbetriebLernende {
  id_lehrbetrieb_lernende: number;
  nr_lehrbetrieb: number;
  nr_lernende: number;
  lehrstart: string;
  lehrende: string;
  beruf: string;
}