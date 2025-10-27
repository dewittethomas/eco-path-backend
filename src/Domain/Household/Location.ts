import { Guard } from '@domaincrafters/std';

export class Location {
    private readonly _houseNumber: string;
    private readonly _street: string;
    private readonly _city: string;
    private readonly _postalCode: string;

    private constructor(houseNumber: string, street: string, city: string, postalCode: string) {
        this._houseNumber = houseNumber;
        this._street = street;
        this._city = city;
        this._postalCode = postalCode;
    }

    public static create(houseNumber: string, street: string, city: string, postalCode: string): Location {
        const location = new Location(houseNumber, street, city, postalCode);
        location.validateState();
        return location;
    }

    public validateState(): void {
        Guard.check(this._houseNumber, 'House number is required').againstEmpty().againstWhitespace();
        Guard.check(this._street, 'Street is required').againstEmpty().againstWhitespace();
        Guard.check(this._city, 'City is required').againstEmpty().againstWhitespace();
        Guard.check(this._postalCode, 'Postal code is required').againstEmpty().againstWhitespace();
    }

    get houseNumber(): string {
        return this._houseNumber;
    }

    get street(): string {
        return this._street;
    }

    get city(): string {
        return this._city;
    }

    get postalCode(): string {
        return this._postalCode;
    }
}