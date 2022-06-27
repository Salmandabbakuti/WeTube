import { gql } from "@apollo/client";

export const GET_VIDEOS = gql`
    query videos(
      $first: Int
      $skip: Int
      $orderBy: Video_orderBy
      $orderDirection: OrderDirection
      $where: Video_filter
    ) {
      videos(
        first: $first
        skip: $skip
        orderBy: $orderBy
        orderDirection: $orderDirection
        where: $where
      ) {
        id
        title
        description
        location
        category
        thumbnailHash
        videoHash
        owner
        createdAt
      }
    }
  `;
