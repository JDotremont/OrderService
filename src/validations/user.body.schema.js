import yup from 'yup';

export const userBodySchema = yup.object({
    username: yup.string().required('Le champs username est requis'),
    password: yup.string().required('Le champs password est requis'),
    role: yup.string().required('Le champs role (admin, seller) est requis'),
    email: yup.string().email('Le champs email doit être un email valide').required('Le champs email est requis'),
});