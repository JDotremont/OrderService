import yup from 'yup';

export const orderBodySchema = yup.object({
    customerId: yup.number().required('Le champs customerId est requis'),
    orderLine: yup.array().of(yup.object({
        productId: yup.number().required('Le champs productId est requis'),
        qty: yup.number().required('Le champs quantity est requis'),
    })).required('Le champs orderLine est requis'),
});