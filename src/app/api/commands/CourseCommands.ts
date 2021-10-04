export interface CreateCourseCommand {
    name: string;
    shortName: string;
}

export interface UpdateCourseCommand {
    id: number;
    name: string;
    shortName: string;
}
