import { assertEquals, assertThrows } from '@std/assert';
import { User, UserId, UserProfile, Gender, HousingType, Location } from 'EcoPath/Domain/mod.ts';

function makeValidLocation(): Location {
    return Location.create('11', 'Main Street', 'New York', '1000');
}

function makeValidUserProfile(): UserProfile {
    return UserProfile.create(
        new Date(2000, 1, 1),
        Gender.Male,
        HousingType.House,
        makeValidLocation()
    );
}

function makeValidUserData() {
    return {
        id: UserId.create(),
        name: 'John Doe',
        email: 'john.doe@example.com',
        avatarImage: btoa('avatar'),
        userProfile: makeValidUserProfile()
    };
}

Deno.test('User - Create Successfully', () => {
    const data = makeValidUserData();
    const user = User.create(
        data.id,
        data.name,
        data.email,
        data.avatarImage,
        data.userProfile
    );

    assertEquals(user.id.equals(data.id), true);
    assertEquals(user.name, data.name);
    assertEquals(user.email, data.email);
    assertEquals(user.avatarImage, data.avatarImage);
    assertEquals(user.userProfile.birthDate.getTime(), data.userProfile.birthDate.getTime());
    assertEquals(user.userProfile.gender, data.userProfile.gender);
    assertEquals(user.userProfile.housingType, data.userProfile.housingType);

    const location = user.userProfile.location;
    const expected = data.userProfile.location;

    assertEquals(location.houseNumber, expected.houseNumber);
    assertEquals(location.street, expected.street);
    assertEquals(location.city, expected.city);
    assertEquals(location.postalCode, expected.postalCode);
});

Deno.test('User - Fails with missing or invalid fields', async (t) => {
    const data = makeValidUserData();

    const invalidCases = [
        {
            name: '',
            email: data.email,
            avatarImage: data.avatarImage,
            userProfile: data.userProfile,
            msg: 'empty name'
        },
        {
            name: '   ',
            email: data.email,
            avatarImage: data.avatarImage,
            userProfile: data.userProfile,
            msg: 'whitespace name'
        },
        {
            name: data.name,
            email: '',
            avatarImage: data.avatarImage,
            userProfile: data.userProfile,
            msg: 'empty email'
        },
        {
            name: data.name,
            email: '   ',
            avatarImage: data.avatarImage,
            userProfile: data.userProfile,
            msg: 'whitespace email'
        },
        {
            name: data.name,
            email: data.email,
            avatarImage: 'invalid_base64_string',
            userProfile: data.userProfile,
            msg: 'invalid avatar base64'
        },
        {
            name: data.name,
            email: data.email,
            avatarImage: data.avatarImage,
            userProfile: null as unknown as UserProfile,
            msg: 'missing userProfile'
        }
    ];

    for (const c of invalidCases) {
        await t.step(`Throws with ${c.msg}`, () => {
            assertThrows(() => {
                User.create(
                    data.id,
                    c.name,
                    c.email,
                    c.avatarImage,
                    c.userProfile
                );
            });
        });
    }
});