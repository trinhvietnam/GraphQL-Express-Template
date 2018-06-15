import {ProjectFields} from "../../databases/Project";

export const VALIDATION_CREATE_PROJECT = `
    ${ProjectFields.name}: String!
`;
export const VALIDATION_UPDATE_PROJECT = `
    ${ProjectFields.id}: String!
    ${ProjectFields.name}: String,
    ${ProjectFields.leaderId}: String,
    ${ProjectFields.partnerIds}: [String!],
`