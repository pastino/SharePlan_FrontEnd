import { gql } from "apollo-boost";

export const CONFIRM_SECRET = gql`
  mutation confirmSecret($userId: String!, $password: String!) {
    confirmSecret(userId: $userId, password: $password)
  }
`;

export const CREATE_ACCOUNT = gql`
  mutation createAccount(
    $nickname: String!
    $dateOfBirth: Int!
    $userId: String!
    $password: String!
    $gender: String!
    $useTermsPrivacyagreement: Boolean!
    $bio: String
  ) {
    createAccount(
      nickname: $nickname
      dateOfBirth: $dateOfBirth
      userId: $userId
      password: $password
      gender: $gender
      useTermsPrivacyagreement: $useTermsPrivacyagreement
      bio: $bio
    )
  }
`;

export const REQUEST_SECRET = gql`
  mutation requestSecret($email: String!) {
    requestSecret(email: $email)
  }
`;

export const SECRET_CONFIRM = gql`
  mutation secretConfirm($email: String!, $secret: String!) {
    secretConfirm(email: $email, secret: $secret)
  }
`;

export const CAHNGE_PASSWORD = gql`
  mutation changePassword($userId: String!, $password: String!) {
    changePassword(userId: $userId, password: $password)
  }
`;

export const USER_ID_DOUBLE_CHECK = gql`
  mutation idDoubleCheck($userId: String!) {
    idDoubleCheck(userId: $userId)
  }
`;

export const SNS_CREATE_USER = gql`
  mutation snsCreateAccount(
    $nickname: String!
    $dateOfBirth: Int!
    $userId: String!
    $gender: String!
    $useTermsPrivacyagreement: Boolean!
    $snsLogin: String!
  ) {
    snsCreateAccount(
      nickname: $nickname
      dateOfBirth: $dateOfBirth
      userId: $userId
      gender: $gender
      useTermsPrivacyagreement: $useTermsPrivacyagreement
      snsLogin: $snsLogin
    )
  }
`;

export const SNS_CONFIRM_SECRET = gql`
  mutation snsConfirmSecret($userId: String!) {
    snsConfirmSecret(userId: $userId)
  }
`;

// export const USER_ID_DOUBLE_CHECK = gql`
//   query nicknameDoubleCheck($nickname: String) {
//     nicknameDoubleCheck(nickname: $nickname)
//   }
// `;
