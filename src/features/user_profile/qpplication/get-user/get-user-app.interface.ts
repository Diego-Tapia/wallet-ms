import { User } from '../../domain/entities/user.entity';

export interface IGetUserpplication {
  execute(param: string | number): Promise<User>;
}
