export const UserProfileTypes = {
  APPLICATION: {
    CREATE_USER: Symbol('CreateUserApplication'),
    GET_ALL_USERS: Symbol('GetAllUsersApplication'),
    GET_USER_BY_ID: Symbol('GetUserByIdApplication'),
    GET_USER: Symbol('GetUserApplication'),
    VALIDATE_USER_PROFILE: Symbol('ValidateUserProfileApplication')
  },
  INFRASTRUCTURE: {
    REPOSITORY: Symbol('UserRepository'),
  },
};
