interface Header {
    alg: string;
    typ: string;
}

interface Payload {
    exp: number;

    email: string;
    userName: string;
}

export class JwtToken {

    private readonly tokenString: string;

    public readonly header: Header;
    public readonly payload: Payload;

    public readonly expirationDate: Date;

    private constructor(header: Header, payload: Payload, tokenString: string) {
        this.header = header;
        this.payload = payload;
        this.tokenString = tokenString;

        this.expirationDate = new Date(payload.exp * 1000);
    }

    public get hasExpired(): boolean {
        return new Date() > this.expirationDate;
    }

    public toString(): string {
        return this.tokenString;
    }

    public static parse(tokenString: string): JwtToken {
        const tokenParts = tokenString.split('.');
        if (tokenParts.length !== 3) {
            throw new Error('Invalid token string');
        }

        const [header, payload] = tokenParts;

        const parsedHeader: Header = JSON.parse(atob(header));
        const parsedPayload: Payload = JSON.parse(atob(payload));

        return new JwtToken(parsedHeader, parsedPayload, tokenString);
    }
}
