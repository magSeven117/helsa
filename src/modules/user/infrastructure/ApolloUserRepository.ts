import { Uuid } from '@/modules/shared/domain/core/value-objects/Uuid';
import { ApolloClient, gql, NormalizedCacheObject } from '@apollo/client';
import { User } from '../domain/User';
import { UserEmail } from '../domain/UserEmail';
import { UserRepository } from '../domain/UserRepository';

export class ApolloUserRepository implements UserRepository {
  constructor(private readonly client: ApolloClient<NormalizedCacheObject>) {}
  async save(user: User): Promise<void> {
    await this.client.mutate({
      mutation: gql`
        mutation SaveUser($user: UserInput!) {
          saveUser(user: $user)
        }
      `,
      variables: {
        user: user.toPrimitives(),
      },
    });
  }
  async findByEmail(email: UserEmail): Promise<User | null> {
    const { data } = await this.client.query({
      query: gql`
        query GetUser($filters: [Filter]!) {
          getUser(filters: $filters) {
            id
            email
            externalId
          }
        }
      `,
      variables: {
        filters: [{ field: 'email', value: email.value, operator: 'eq' }],
      },
    });
    return data.findUserByEmail ? User.fromPrimitives(data.findUserByEmail) : null;
  }
  async findById(id: Uuid): Promise<User | null> {
    const { data } = await this.client.query({
      query: gql`
        query GetUser($filters: [Filter]!) {
          getUser(filters: $filters) {
            id
            email
            externalId
          }
        }
      `,
      variables: {
        filters: [{ field: 'id', value: id.value, operator: 'eq' }],
      },
    });
    return data.findUserById ? User.fromPrimitives(data.findUserById) : null;
  }
  async findByExternalId(externalId: string): Promise<User | null> {
    const { data } = await this.client.query({
      query: gql`
        query GetUser($filters: [Filter]!) {
          getUser(filters: $filters) {
            id
            email
            externalId
          }
        }
      `,
      variables: {
        filters: [{ field: 'externalId', value: externalId, operator: 'eq' }],
      },
    });
    return data.findUserByExternalId ? User.fromPrimitives(data.findUserByExternalId) : null;
  }
  async delete(id: Uuid): Promise<void> {
    await this.client.mutate({
      mutation: gql`
        mutation DeleteUser($id: String!) {
          deleteUser(id: $id)
        }
      `,
      variables: {
        id: id.value,
      },
    });
  }
}
