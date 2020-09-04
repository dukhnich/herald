import { shape, number, string, func } from 'prop-types';

export const inputTextType = shape({
    placeholder: string,
    value: string,
    onChange: func,
    name: string.isRequired
});