import Vue from 'vue'

Vue.mixin({
    methods: {
        checkOperation(to) {
            if (/^-?[0-9]+$/.test(to)) {
                return true;
            }
            else if (typeof to === 'object') {
                return false;
            }
            else {
                return false;
            }
        },
        validateEmail(email) {
            var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(String(email).toLowerCase());
        },
        validatePhone(phone_number) {
            var re = /^\d{9}$/;
            return phone_number.match(re);
        },
        formatPhoneNumber(phone_number, code) {

            var cleaned = (String(phone_number)).replace(/\D/g, '')
            var match = cleaned.match(/^(\d{3})(\d{3})(\d{3})$/)
            if (match) {

                return [code, ' ', match[1], ' ', match[2], ' ', match[3]].join('')
            }
            return null

        },
        moneySettings() {
            return { currency: {}, 'value-range': { min: 0.1, max: 1000000000 } };
        },
        formatMoney(amount, decimalCount = 2, decimal = ",", thousands = ".") {
            try {
                decimalCount = Math.abs(decimalCount);
                decimalCount = isNaN(decimalCount) ? 2 : decimalCount;

                const negativeSign = amount < 0 ? "-" : "";

                let i = parseInt(
                    (amount = Math.abs(Number(amount) || 0).toFixed(decimalCount))
                ).toString();
                let j = i.length > 3 ? i.length % 3 : 0;

                return (
                    negativeSign +
                    (j ? i.substr(0, j) + thousands : "") +
                    i.substr(j).replace(/(\d{3})(?=\d)/g, `$1${thousands}`) +
                    (decimalCount
                        ? decimal +
                        Math.abs(amount - i)
                            .toFixed(decimalCount)
                            .slice(2)
                        : "")
                );
            } catch (e) {
                console.log(e);
            }
        },
        referenceMask(ref) {
            return String(ref).padStart(9, "0").replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ');
        },
        formatDate(input) {
            let datePart = input.match(/\d+/g),
                year = datePart[0].substring(0),
                month = datePart[1],
                day = datePart[2],
                hour = datePart[3],
                min = datePart[4];

            return `${day}/${month}/${year}`;
        },
        formatDateTime(input) {
            let datePart = input.match(/\d+/g),
                year = datePart[0].substring(0),
                month = datePart[1],
                day = datePart[2],
                hour = datePart[3],
                min = datePart[4];

            return `${day}/${month}/${year} ${hour}:${min}`;
        },
        formatTime(input) {
            let datePart = input.match(/\d+/g),
                year = datePart[0].substring(0),
                month = datePart[1],
                day = datePart[2],
                hour = datePart[3],
                min = datePart[4];

            return `${hour}:${min}`;
        },
        formatMoment(input) {
            let operation = parseInt((new Date() - new Date(input)) / 60000),
                datePart = input.match(/\d+/g),
                year = datePart[0].substring(0),
                month = datePart[1],
                day = datePart[2],
                hour = datePart[3],
                min = datePart[4];

            let hour_parsed = parseInt(operation / 60);
            if (operation < 60) {
                return `Há ${operation + (operation == 1 ? " minuto" : "  minutos")}`;
            } else if (hour_parsed < 6) {
                return `Há ${hour_parsed + (hour_parsed == 1 ? " hora" : " horas")}`;
            } else {
                return `${day}/${month}/${year} ${hour}:${min}`;
            }
        },
        typeFile(uri) {
            uri = uri.split('?')[0];
            let parts = uri.split('.');
            let extension = parts[parts.length - 1];
            let imageTypes = ['jpg', 'jpeg', 'png'];
            let docTypes = ['pdf'];
            if (imageTypes.indexOf(extension) !== -1) {
                return 'image';
            }
            else if (docTypes.indexOf(extension) !== -1) {
                return 'doc';
            }
            else {
                return 'unknow'
            }
        }
    }
})