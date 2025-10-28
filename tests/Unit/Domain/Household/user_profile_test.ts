import { assertEquals, assertThrows } from "@std/assert";
import { UserProfile, Gender, HousingType, Location } from "EcoPath/Domain/mod.ts";

function makeValidProfileData() {
    return {
        birthDate: new Date(2000, 5, 15),
        gender: Gender.Male,
        location: Location.create('11', 'Main Street', 'New York', '1000'),
        housingType: HousingType.House,
        householdSize: 3,
        ecoGoals: ['reduce waste', 'save energy']
    };
}

Deno.test("UserProfile - Create Successfully", () => {
    const data = makeValidProfileData();

    const profile = UserProfile.create(
        data.birthDate,
        data.gender,
        data.location,
        data.housingType,
        data.householdSize,
        data.ecoGoals,
    );

    assertEquals(profile.birthDate.getTime(), data.birthDate.getTime());
    assertEquals(profile.gender, data.gender);
    assertEquals(profile.housingType, data.housingType);
    assertEquals(profile.householdSize, data.householdSize);
    assertEquals(profile.ecoGoals, data.ecoGoals);

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
            new Date(3000, 1, 1), // future date
            data.gender,
            data.location,
            data.housingType,
            data.householdSize,
            data.ecoGoals,
        );
    }, Error);
});

Deno.test("UserProfile - Fails on Null or Undefined Fields", async (t) => {
    const data = makeValidProfileData();

    const invalidCases = [
        {
            ...data,
            birthDate: null as unknown as Date,
            msg: "null birthDate",
        },
        {
            ...data,
            gender: null as unknown as Gender,
            msg: "null gender",
        },
        {
            ...data,
            housingType: null as unknown as HousingType,
            msg: "null housingType",
        },
        {
            ...data,
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
                    c.location,
                    c.housingType,
                    c.householdSize,
                    c.ecoGoals,
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
                data.location,
                data.housingType,
                data.householdSize,
                data.ecoGoals,
            );
        }, Error);
    });

    await t.step("Invalid housing type value", () => {
        assertThrows(() => {
            UserProfile.create(
                data.birthDate,
                data.gender,
                data.location,
                invalidHousingType,
                data.householdSize,
                data.ecoGoals,
            );
        }, Error);
    });
});

Deno.test("UserProfile - Fails on Household Size <= 0", () => {
    const data = makeValidProfileData();

    assertThrows(() => {
        UserProfile.create(
            data.birthDate,
            data.gender,
            data.location,
            data.housingType,
            0, // invalid
            data.ecoGoals,
        );
    }, Error);
});