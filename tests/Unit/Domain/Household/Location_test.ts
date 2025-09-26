import { assertEquals } from "@std/assert/equals";
import { assertThrows } from "@std/assert";

import { Location } from "EcoPath/Domain/mod.ts";

Deno.test("Create Location - Success", () => {
    const location = Location.create("11", "Main Street", "New York", "1000");

    assertEquals(location.houseNumber, "11");
    assertEquals(location.street, "Main Street");
    assertEquals(location.city, "New York");
    assertEquals(location.postalCode, "1000");
});

Deno.test("Create Location - Fail (Required Fields)", async (t) => {
    const cases = [
        { houseNumber: "", street: "Main Street", city: "New York", postalCode: "1000", msg: "empty house number" },
        { houseNumber: "11", street: "", city: "New York", postalCode: "1000", msg: "empty street" },
        { houseNumber: "11", street: "Main Street", city: "", postalCode: "1000", msg: "empty city" },
        { houseNumber: "11", street: "Main Street", city: "New York", postalCode: "", msg: "empty postal code" },
    ];

    for (const c of cases) {
        await t.step(`Fails with ${c.msg}`, () => {
            assertThrows(() => {
                Location.create(c.houseNumber, c.street, c.city, c.postalCode);
            });
        });
    }
});