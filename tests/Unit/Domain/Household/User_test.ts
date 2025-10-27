import { assertEquals, assertThrows } from "@std/assert";
import { User, UserId, Gender, HousingType, Location } from "EcoPath/Domain/mod.ts";

function makeValidUserData() {
    return {
        id: UserId.create(),
        name: "John Doe",
        email: "john.doe@example.com",
        birthDate: new Date(2000, 1, 1),
        gender: Gender.Male,
        housingType: HousingType.House,
        location: Location.create("11", "Main Street", "New York", "1000"),
    };
}

Deno.test("User Entity - Create Successfully", () => {
    const data = makeValidUserData();
    const user = User.create(
        data.id,
        data.name,
        data.email,
        data.birthDate,
        data.gender,
        data.housingType,
        data.location
    );

    assertEquals(user.id, data.id);
    assertEquals(user.name, data.name);
    assertEquals(user.email, data.email);
    assertEquals(user.birthDate, data.birthDate);
    assertEquals(user.gender, data.gender);
    assertEquals(user.housingType, data.housingType);

    assertEquals(user.location.houseNumber, "11");
    assertEquals(user.location.street, "Main Street");
    assertEquals(user.location.city, "New York");
    assertEquals(user.location.postalCode, "1000");
});

Deno.test("User Entity - Fails on Required Fields", async (t) => {
    const data = makeValidUserData();

    const cases = [
        { name: "", email: data.email, gender: data.gender, msg: "empty name" },
        { name: data.name, email: "", gender: data.gender, msg: "empty email" },
        { name: data.name, email: data.email, gender: null as unknown as Gender, msg: "null gender" },
    ];

    for (const c of cases) {
        await t.step(`Fails with ${c.msg}`, () => {
            assertThrows(() => {
                User.create(
                    data.id,
                    c.name,
                    c.email,
                    data.birthDate,
                    c.gender,
                    data.housingType,
                    data.location
                );
            });
        });
    }
});

Deno.test("User Entity - Fails with Missing Location", () => {
    const data = makeValidUserData();

    assertThrows(() => {
        User.create(
            data.id,
            data.name,
            data.email,
            data.birthDate,
            data.gender,
            data.housingType,
            null as unknown as Location
        );
    }, Error, "Location is required");
});

Deno.test("User Entity - Fails with Future Birth Date", () => {
    const data = makeValidUserData();
    const futureDate = new Date(Date.now() + 1000 * 60 * 60 * 24); // 1 day ahead

    assertThrows(() => {
        User.create(
            data.id,
            data.name,
            data.email,
            futureDate,
            data.gender,
            data.housingType,
            data.location
        );
    }, Error, "Birth date cannot be in the future");
});

Deno.test("User Entity - Fails with Invalid Enum Values", async (t) => {
  const data = makeValidUserData();

  await t.step("Invalid Gender", () => {
    assertThrows(() => {
        User.create(
            data.id,
            data.name,
            data.email,
            data.birthDate,
            "invalid_gender" as unknown as Gender,
            data.housingType,
            data.location
        );
    }, Error, "Invalid gender");
  });

  await t.step("Invalid HousingType", () => {
    assertThrows(() => {
        User.create(
            data.id,
            data.name,
            data.email,
            data.birthDate,
            data.gender,
            "invalid_housing" as unknown as HousingType,
            data.location
        );
    }, Error, "Invalid housingType");
  });
});