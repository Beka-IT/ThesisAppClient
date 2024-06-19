declare type RequestRequest = {
    titleKg: string;
    titleTr: string;
    descriptionKg: string;
    descriptionTr: string;
    curatorId: number;
    isMyTheme: boolean;
}

declare type RequestRespone = {
    id: number;
    titleKg: string;
    titleTr: string;
    descriptionKg: string;
    descriptionTr: string;
    studentFirstname: string | null;
    studentLastname: string | null;
    studentPatronomyc: string | null;
    curatorId: number;
    isMyTheme: boolean
}

declare type RequestForm = {
    id?: number
    titleKg: string
    titleTr: string
    descriptionKg: string
    descriptionTr: string
    curatorId: number
    isMyTheme: boolean
}