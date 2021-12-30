export const UserTypes = {
  APPLICATION: {
    CREATE_USER: Symbol('CreateUserApplication'),
    GET_ALL_USERS: Symbol('GetAllUsersApplication'),
    GET_USER_BY_ID: Symbol('GetUserByIdApplication'),
    GET_USER: Symbol('GetUserApplication'),
    VALIDATE_USER: Symbol('ValidateUserApplication')
  },
  INFRASTRUCTURE: {
    USER_PROFILE_REPOSITORY: Symbol('UserProfileRepository'),
    USER_REPOSITORY: Symbol('UserRepository'),
  },
};
