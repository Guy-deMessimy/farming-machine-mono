import { faker } from '@faker-js/faker';

export interface FakeUser {
  email: string;
  password: string;
  name: string;
}

export const generateFakeUsers = (count: number): FakeUser[] => {
  return Array.from({ length: count }, () => {
    return {
      email: faker.internet.email(),
      password: faker.internet.password({ length: 10 }),
      name: faker.person.fullName(),
    };
  });
};
