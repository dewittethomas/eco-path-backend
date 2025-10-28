import { assertEquals, assertThrows } from "@std/assert";
import { UserProfile, Gender, HousingType, Location } from "EcoPath/Domain/mod.ts";

function makeValidProfileData() {
    return {
        birthDate: new Date(2000, 5, 15),
        gender: Gender.Male,
        housingType: HousingType.House,
        location: Location.create('11', 'Main Street', 'New York', '1000'),
    };
}

Deno.test("UserProfile - Create Successfully", () => {
    const data = makeValidProfileData();

    const profile = UserProfile.create(
        data.birthDate,
        data.gender,
        data.housingType,
        data.location
    );

    assertEquals(profile.birthDate.getTime(), data.birthDate.getTime());
    assertEquals(profile.gender, data.gender);
    assertEquals(profile.housingType, data.housingType);

    const location = profile.location;
    const expected = data.location;

    assertEquals(location.houseNumber, expected.houseNumber);
    assertEquals(location.street, expected.street);
    assertEquals(location.city, expected.city);
    assertEquals(location.postalCode, expected.postalCode);
});

Deno.test("UserProfile - Fails on Invalid BirthDate", () => {
    const data = makeValidProfileData();

    assertThrows(() => {
        UserProfile.create(
            new Date(3000, 1, 1),
            data.gender,
            data.housingType,
            data.location
        );
    }, Error);
});

Deno.test("UserProfile - Fails on Null or Undefined Fields", async (t) => {
    const data = makeValidProfileData();

    const invalidCases = [
        {
            birthDate: null as unknown as Date,
            gender: data.gender,
            housingType: data.housingType,
            location: data.location,
            msg: "null birthDate",
        },
        {
            birthDate: data.birthDate,
            gender: null as unknown as Gender,
            housingType: data.housingType,
            location: data.location,
            msg: "null gender",
        },
        {
            birthDate: data.birthDate,
            gender: data.gender,
            housingType: null as unknown as HousingType,
            location: data.location,
            msg: "null housingType",
        },
        {
            birthDate: data.birthDate,
            gender: data.gender,
            housingType: data.housingType,
            location: null as unknown as Location,
            msg: "null location",
        },
    ];

    for (const c of invalidCases) {
        await t.step(`Fails with ${c.msg}`, () => {
            assertThrows(() => {
                UserProfile.create(
                    c.birthDate,
                    c.gender,
                    c.housingType,
                    c.location
                );
            }, Error);
        });
    }
});

Deno.test("UserProfile - Fails on Invalid Enum Values", async (t) => {
    const data = makeValidProfileData();

    const invalidGender = "Alien" as unknown as Gender;
    const invalidHousingType = "Spaceship" as unknown as HousingType;

    await t.step("Invalid gender value", () => {
        assertThrows(() => {
            UserProfile.create(
                data.birthDate,
                invalidGender,
                data.housingType,
                data.location
            );
        }, Error);
    });

    await t.step("Invalid housing type value", () => {
        assertThrows(() => {
            UserProfile.create(
                data.birthDate,
                data.gender,
                invalidHousingType,
                data.location
            );
        }, Error);
    });
});