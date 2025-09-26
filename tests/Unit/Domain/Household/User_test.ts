import { assertEquals } from "@std/assert/equals";
import { assertThrows } from "@std/assert";

import { User, UserId, Location } from 'EcoPath/Domain/mod.ts';

Deno.test("Create User - Success", () => {
    const location = Location.create("11", "Main Street", "New York", "1000")

    const id = UserId.create();

    const user = User.create(id, "John Doe", "john.doe@example.com", location);

    assertEquals(user.id, id);
    assertEquals(user.name, "John Doe");
    assertEquals(user.email, "john.doe@example.com");
    assertEquals(user.location.houseNumber, "11");
    assertEquals(user.location.street, "Main Street");
    assertEquals(user.location.city, "New York");
    assertEquals(user.location.postalCode, "1000");
});

Deno.test("Create User - Fail (Required Fields)", async (t) => {
    const location = Location.create("11", "Main Street", "New York", "1000");

    const id = UserId.create();

    const cases = [
        { name: "", email: "john.doe@example.com", location: location, msg: "empty name" },
        { name: "John Doe", email: "", location: location, msg: "empty email" }
    ]

    for (const c of cases) {
        await t.step(`Fails with ${c.msg}`, () => {
            assertThrows(() => {
                User.create(id, c.name, c.email, c.location);
            });
        });
    }
});

Deno.test("Create User - Fails with missing location", () => {
    const id = UserId.create();

    assertThrows(() => {
        User.create(id, "John Doe", "john.doe@example.com", null as unknown as Location);
    });
});