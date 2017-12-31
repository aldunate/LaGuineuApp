
export function uriApiFun(apiDir: string) {
    const mockBackend = true;
    const uriApi = 'http://localhost:57989/api/';
    const uriJson = '../jsonApi/';

    if (mockBackend) {
        return uriJson + apiDir + '.json';
    }
    return uriApi + apiDir;
}

export const GlobalVar = Object.freeze({
    mockBackend: true,
    // uriApi: 'http://localhost:57989/api/',
    uriApi: 'file:///home/computadora/JoinderNote/src/app/util/jsonApi/',
    jsonApi: 'file:///home/computadora/JoinderNote/src/app/util/jsonApi/'
});


export const UtilFechas = Object.freeze({
    calculaEdad(birthdate: any) {
        birthdate = new Date(UtilFechas.espAdate(birthdate));
        const timeDiff = new Date().getFullYear() - birthdate.getFullYear();
        return timeDiff;
    },
    espAdate(fecha: string) {
        /* Formato dd/mm/yyyy a Date*/
        const aux = fecha.split('/');
        const date = Date.parse(aux[1] + '/' + aux[0] + '/' + aux[2]);
        return new Date(date);
    },
    stringToDate(fecha: string) {
        return new Date(fecha).toDateString;
    }
});

