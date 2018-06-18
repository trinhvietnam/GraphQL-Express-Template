import {ProjectFields} from "../../databases/Project";

export const INPUT_CREATE_PROJECT = `
    ${ProjectFields.name}: String!
`;
export const INPUT_UPDATE_PROJECT = `
    ${ProjectFields.id}: String!
    ${ProjectFields.name}: String,
    ${ProjectFields.leaderId}: String,
    ${ProjectFields.partnerIds}: [String!],
`