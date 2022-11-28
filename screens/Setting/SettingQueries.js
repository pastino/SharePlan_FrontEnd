import { gql } from "apollo-boost";

export const EDIT_USER = gql`
  mutation editUser(
    $avatar: String
    $nickname: String
    $dateOfBirth: Int
    $gender: String
    $bio: String
  ) {
    editUser(
      avatar: $avatar
      nickname: $nickname
      dateOfBirth: $dateOfBirth
      gender: $gender
      bio: $bio
    ) {
      id
      avatar
      nickname
      dateOfBirth
      gender
      bio
    }
  }
`;

export const AVATAR = gql`
  mutation avatar($avatar: String!) {
    avatar(avatar: $avatar)
  }
`;

export const DELETE_AVATAR = gql`
  mutation deleteAvatar {
    deleteAvatar
  }
`;

export const NICK_NAME = gql`
  mutation nickName($nickname: String!) {
    nickName(nickname: $nickname)
  }
`;

export const GENDER = gql`
  mutation gender($gender: String!) {
    gender(gender: $gender)
  }
`;

export const DATE_OF_BIRTH = gql`
  mutation dateOfBirth($dateOfBirth: Int!) {
    dateOfBirth(dateOfBirth: $dateOfBirth)
  }
`;

export const SEE_PROFILE = gql`
  {
    seeProfile {
      id
      userId
      avatar
      nickname
      gender
      dateOfBirth
      snsLogin
    }
  }
`;

export const PASSWORD_CHANGE = gql`
  mutation passwordChange($currentPassword: String!, $changePassword: String!) {
    passwordChange(
      currentPassword: $currentPassword
      changePassword: $changePassword
    )
  }
`;

export const SEE_NOTICE = gql`
  {
    seeNotice {
      id
      title
      text
      createdAt
      updatedAt
    }
  }
`;

export const CREATE_NOTICE = gql`
  mutation createNotice($title: String!, $text: String!, $userId: String!) {
    createNotice(title: $title, text: $text, userId: $userId)
  }
`;

export const DELETE_NOTICE = gql`
  mutation deleteNotice($noticeId: String!) {
    deleteNotice(noticeId: $noticeId)
  }
`;

export const CREATE_SUGGESTION = gql`
  mutation createSuggestion($text: String!, $image: String) {
    createSuggestion(text: $text, image: $image)
  }
`;

export const SEE_SUGGESTION = gql`
  {
    seeSuggestion {
      id
      user {
        id
        userId
        nickname
        avatar
        gender
        dateOfBirth
      }
      text
      image
      createdAt
      updatedAt
    }
  }
`;

export const DELETE_USER = gql`
  mutation deleteUser {
    deleteUser
  }
`;
