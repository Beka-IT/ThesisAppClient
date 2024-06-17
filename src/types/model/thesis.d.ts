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


declare type ReportItem = {
    curatorFirstname: string
​    ​curatorId:    number
​    curatorLastname:   string
​        ​​students:{
        studentFirstname: string
        ​​studentId: number
        ​​​​​studentLastname: string
    }[]
​    ​​thesisId:string
​    ​​thesisTitleKg: string
​    ​​thesisTitleTr:string 
}

declare type ReportRes = {
    reportItems: ReportItem[]
}