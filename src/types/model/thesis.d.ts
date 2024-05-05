declare type Thesis = {
    id: number;
    titleKg: string;
    titleTr: string;
    curatorFirstname: string;
    curatorLastname: string;
    curatorPatronomyc: string;
    isChosen: boolean;
    createdAt: string;
}
declare type ThesisDetail = {
    id: number;
    titleKg: string;
    titleTr: string;
    descriptionKg: string;
    descriptionTr: string;
    curatorFirstname: string;
    curatorLastname: string;
    curatorPatronomyc: string;
    isChosen: boolean;
    createdAt: string;
    updatedAt: string;
    chosenBy: Student[];
}
declare type ThesisForm = {
    id?: number | null;
    titleKg: string;
    titleTr: string;
    descriptionKg: string;
    descriptionTr: string;
}
declare type ThesisCreateRequest = {

}

declare type ThesisUpdateRequest = {

}