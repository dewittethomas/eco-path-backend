import { SaveUser } from "EcoPath/Application/mod.ts";
import { MockUserRepository, MockUnitOfWork } from "EcoPath/tests/Unit/Shared/mod.ts";
import { UserId } from "EcoPath/Domain/mod.ts";
import { SaveUserInput } from "EcoPath/Application/Contracts/mod.ts";
import { assert } from "@std/assert/assert";

Deno.test("SaveUser - Succesfully saves a user", async () => {
    // Arrange
    const mockUserRepository = new MockUserRepository();
    const mockUnitOfWork = new MockUnitOfWork();

    const saveUser = new SaveUser(
        mockUserRepository,
        mockUnitOfWork,
    );

    const id = UserId.create();

    const input: SaveUserInput = {
        id: id.toString(),
        name: "John Doe",
        email: "john.doe@example.com",
        location: {
            houseNumber: "11",
            street: "Main Street",
            city: "New York",
            postalCode: "1000"
        }
    }

    // Act
    await saveUser.execute(input);

    // Assert
    mockUnitOfWork.assertDoIsCalled(1);
    mockUserRepository.assertSaveIsCalled(1);

    const savedUser = mockUserRepository.getUserFromCall(1);

    assert(savedUser.id.equals(id));
    assert(savedUser.name === input.name);
    assert(savedUser.email === input.email);
    assert(savedUser.location.houseNumber === input.location.houseNumber);
    assert(savedUser.location.street === input.location.street);
    assert(savedUser.location.city === input.location.city);
    assert(savedUser.location.postalCode === input.location.postalCode);
});