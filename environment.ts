export const environment = {
  production: false,
  stripe: {

    publicKey: 'pk_test_51O2JjLDkFvXdLHNcmllved2zdzZXFymVNV0ip0lwEwN1dGfvdTlng8eNwH9X3q6UdNSqnPKPJJKP8D9sXVcvmUS000yCwKKpal',
    testKey: 'sk_test_51O2JjLDkFvXdLHNciIbHLBm6Ie5X4NucjaFq10Dunfwo5tbPk4cJfYYyh0voJ5ayybQKcmC6TWJLgOCD1ScaoiW700jMfVdOXi'
  },
  paymentApiUrl:'https://checkout.stripe.com/checkout.js',
  authServiceApiUrl : 'localhost:8881/validation/',
  clientBaseUrl: '',
  orderBaseUrl:'',
  paymentBaseUrl:'',
  productBaseUrl: 'localhost:8889/product-service',
  shoppingCartBaseUrl: '',
  userBaseUrl: '',
  vendorBaseUrl:''
};
