export default function ({ $axios, store }) {
    $axios.onError(error => {
        if (error.response.status == 463) {
            store.dispatch('validation/setErrors', error.response.data.message)
        }
        else if (error.response.status == 422) {
            store.dispatch('validation/setErrors', error.response.data.errors)
        }
        else if (error.response.status == 400) {
           
            store.dispatch('validation/setErrors', error.response.data[0])
        }
        return Promise.reject(error);
    });
    $axios.onRequest(() => {
        store.dispatch('validation/clearErrors')
        //store.dispatch('validation/clearRequestMessage')
    });
    $axios.onResponse((res) => {
        store.dispatch('validation/setRequestMessage', res.data.message)
    });

}