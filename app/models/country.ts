export interface Country {
    isoCode: string;
    name: LocalizedName[];
    officialLanguages: string[];
}

export interface LocalizedName {
    language: string;
    text: string;
}