import numeral from 'numeral'

export default ()=> {
    numeral.register('locale', 'ng', {
    delimiters: {
        thousands: ',',
        decimal: '.'
    },abbreviations: {
        thousand: 'k',
        million: 'm',
        billion: 'b',
        trillion: 't'
    },
    ordinal : function (number) {
        return number === 1 ? 'er' : 'ème';
    },
    currency: {
        symbol: '₦'
    }
});

numeral.locale('ng');
}