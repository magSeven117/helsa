import { UserRepository } from '../domain/UserRepository';

export class UpdateRoleUser {
  constructor(private repository: UserRepository) {}
  async run(id: string, role: string) {
    try {
      const user = await this.repository.findByExternalId(id);
      if (!user) {
        throw new Error('User not found');
      }
      user.updateRole(role);

      await this.repository.save(user);
    } catch (error) {
      console.log(error);
      throw new Error('Error updating role');
    }
  }
}
