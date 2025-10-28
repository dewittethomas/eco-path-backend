import { assertEquals, assertThrows } from '@std/assert';
import { Location } from 'EcoPath/Domain/mod.ts';

function makeValidLocationData() {
    return {
        houseNumber: '11',
        street: 'Main Street',
        city: 'New York',
        postalCode: '1000'
    };
}

Deno.test('Location - Create Successfully', () => {
    const data = makeValidLocationData();
    const location = Location.create(
        data.houseNumber,
        data.street,
        data.city,
        data.postalCode
    );

    assertEquals(location.houseNumber, data.houseNumber);
    assertEquals(location.street, data.street);
    assertEquals(location.city, data.city);
    assertEquals(location.postalCode, data.postalCode);
});

Deno.test('Location - Fails on Empty or Whitespace Fields', async (t) => {
    const valid = makeValidLocationData();

    const invalidCases = [
        { houseNumber: '', street: valid.street, city: valid.city, postalCode: valid.postalCode, msg: 'empty houseNumber' },
        { houseNumber: valid.houseNumber, street: '', city: valid.city, postalCode: valid.postalCode, msg: 'empty street' },
        { houseNumber: valid.houseNumber, street: valid.street, city: '', postalCode: valid.postalCode, msg: 'empty city' },
        { houseNumber: valid.houseNumber, street: valid.street, city: valid.city, postalCode: '', msg: 'empty postalCode' },
        { houseNumber: '   ', street: valid.street, city: valid.city, postalCode: valid.postalCode, msg: 'whitespace houseNumber' },
        { houseNumber: valid.houseNumber, street: '   ', city: valid.city, postalCode: valid.postalCode, msg: 'whitespace street' },
        { houseNumber: valid.houseNumber, street: valid.street, city: '   ', postalCode: valid.postalCode, msg: 'whitespace city' },
        { houseNumber: valid.houseNumber, street: valid.street, city: valid.city, postalCode: '   ', msg: 'whitespace postalCode' }
    ];

    for (const c of invalidCases) {
        await t.step(`Fails with ${c.msg}`, () => {
            assertThrows(() => {
                Location.create(c.houseNumber, c.street, c.city, c.postalCode);
            });
        });
    }
});