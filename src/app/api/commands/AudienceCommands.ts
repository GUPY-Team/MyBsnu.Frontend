export interface CreateAudienceCommand {
    corps: number;
    floor: number;
    room: number;
}

export interface UpdateAudienceCommand {
    id: number;
    corps: number;
    floor: number;
    room: number;
}

