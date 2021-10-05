export interface CreateTeacherCommand {
    firstName: string;
    lastName: string;
    thirdName: string;
}

export interface UpdateTeacherCommand {
    id: number;
    firstName: string;
    lastName: string;
    thirdName: string;
}
