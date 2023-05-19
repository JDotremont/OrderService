import yup from 'yup';

export const customerBodySchema = yup.object({
    firstname: yup.string().required('Le champs firstname est requis'),
    lastname: yup.string().required('Le champs lastname est requis'),
    street: yup.string().required('Le champs street est requis'),
    number: yup.string().required('Le champs number est requis'),
    zipcode: yup.string().required('Le champs zipcode est requis'),
    city: yup.string().required('Le champs city est requis'),
    country: yup.string().required('Le champs country est requis'),   
});
