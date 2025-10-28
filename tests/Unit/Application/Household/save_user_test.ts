import { SaveUser } from 'EcoPath/Application/mod.ts';
import { MockUserRepository, MockUnitOfWork } from 'EcoPath/tests/Unit/Shared/mod.ts';
import { UserId, Gender, HousingType } from 'EcoPath/Domain/mod.ts';
import { assert } from '@std/assert';

Deno.test('SaveUser - Successfully saves a user', async () => {
    // Arrange
    const mockUserRepository = new MockUserRepository();
    const mockUnitOfWork = new MockUnitOfWork();

    const saveUser = new SaveUser(mockUserRepository, mockUnitOfWork);

    const id = UserId.create();

    const input = {
        id: id.toString(),
        name: 'John Doe',
        email: 'john.doe@example.com',
        avatarImage: btoa('hello world'),
        userProfile: {
            birthDate: new Date('2000-01-01T00:00:00Z'),
            gender: Gender.Male,
            housingType: HousingType.House,
            location: {
                houseNumber: '11',
                street: 'Main Street',
                city: 'New York',
                postalCode: '1000'
            }
        }
    };

    // Act
    await saveUser.execute(input);

    mockUnitOfWork.assertDoIsCalled(1);
    mockUserRepository.assertSaveIsCalled(1);

    const savedUser = mockUserRepository.getUserFromCall(1);

    // Assert
    assert(savedUser.id.equals(id));
    assert(savedUser.name === input.name);
    assert(savedUser.email === input.email);
    assert(savedUser.avatarImage === input.avatarImage);

    const profile = savedUser.userProfile;
    assert(profile.gender === input.userProfile.gender);
    assert(profile.housingType === input.userProfile.housingType);
    assert(profile.birthDate.getTime() === input.userProfile.birthDate.getTime());

    const location = profile.location;
    assert(location.houseNumber === input.userProfile.location.houseNumber);
    assert(location.street === input.userProfile.location.street);
    assert(location.city === input.userProfile.location.city);
    assert(location.postalCode === input.userProfile.location.postalCode);
});