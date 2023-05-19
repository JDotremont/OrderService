import yup from 'yup';

export const loginBodySchema = yup.object({
    username: yup.string().required("Le champs username est requis"),
    password: yup.string().required("Le champs password est requis"),
})