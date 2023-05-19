import yup from 'yup';

export const productBodySchema = yup.object({
    name: yup.string().required('Le champs name est requis'),
    price: yup.number().required('Le champs price est requis'),
    qty: yup.number().required('Le champs qty est requis'),
    description: yup.string().required('Le champs description est requis'),
    alert: yup.number().required('Le champs alert est requis'),
});