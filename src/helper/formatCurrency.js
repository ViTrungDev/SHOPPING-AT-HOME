module.exports = {
    formatCurrency: function (number) {
        if (typeof number !== 'number') return number;
        return number.toLocaleString('vi-VN') + 'đ';
    },
};
