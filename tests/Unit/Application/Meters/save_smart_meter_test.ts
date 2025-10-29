import { SaveSmartMeter } from "EcoPath/Application/mod.ts";
import { MockSmartMeterRepository, MockUnitOfWork } from "EcoPath/tests/Unit/Shared/mod.ts";
import { SmartMeterId } from "EcoPath/Domain/mod.ts";
import { MeterType } from "EcoPath/Domain/Meters/SmartMeter.ts";
import { SaveSmartMeterInput } from "EcoPath/Application/Contracts/mod.ts";
import { assert } from "@std/assert/assert";

Deno.test("SaveSmartMeter - Succesfully saves a smart meter", async () => {
    // Arrange
    const mockSmartMeterRepository = new MockSmartMeterRepository();
    const mockUnitOfWork = new MockUnitOfWork();

    const saveSmartMeter = new SaveSmartMeter(
        mockSmartMeterRepository,
        mockUnitOfWork
    );

    const id = SmartMeterId.create();

    const input: SaveSmartMeterInput = {
        meterType: MeterType.ELECTRICITY,
        location: {
            houseNumber: "11",
            street: "Main Street",
            city: "New York",
            postalCode: "1000"
        }
    }

    // Act
    await saveSmartMeter.execute(input);

    // Assert
    mockUnitOfWork.assertDoIsCalled(1);
    mockSmartMeterRepository.assertSaveIsCalled(1);

    const savedSmartMeter = mockSmartMeterRepository.getSmartMeterFromCall(1);

    assert(savedSmartMeter.meterType === input.meterType);
    assert(savedSmartMeter.location.houseNumber === input.location.houseNumber);
    assert(savedSmartMeter.location.street === input.location.street);
    assert(savedSmartMeter.location.city === input.location.city);
    assert(savedSmartMeter.location.postalCode === input.location.postalCode);
});