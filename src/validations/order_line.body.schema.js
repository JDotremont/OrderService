import yup from 'yup';

export const orderLineBodySchema = yup.object({
    customerId: yup.number().required('Le champs customerId est requis'),
    orderLine: yup.array().of(yup.object({
        productId: yup.number().required('Le champs productId est requis'),
        qry: yup.number().required('Le champs quantity est requis'),
    })).required('Le champs orderLine est requis'),
});