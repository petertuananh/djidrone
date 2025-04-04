const colors = require('colors');
module.exports = [
    [
        {
            name: 'Xem % pin hiện tại',
            cmd: 'battery?',
            value: '',
            msg: '> Đang gửi lệnh xem % pin hiện tại'
        },
        {
            name: 'Bay lên',
            cmd: 'takeoff',
            value: '',
            msg: '> Đang bay lên'
        },
        {
            name: 'Bay tới giữa số 8',
            cmd: 'forward',
            value: 128,
            msg: '> Đang bay về phía trước tới giữa số 8'
        },
        {
            name: 'Bay lên giữa số 8',
            cmd: 'up',
            value: 70,
            msg: '> Đang bay lên giữa số 8'
        },
        {
            name: 'Bay qua nóc vòng 8 thứ hai',
            cmd: 'forward',
            value: 150,
            msg: '> Đang bay về phía trước qua nóc vòng 8 thứ hai'
        },
        {
            name: 'Bay xuống giữa vòng 8 thứ hai',
            cmd: 'down',
            value: 70,
            msg: '> Đang hạ độ cao xuống giữa vòng 8 thứ hai'
        },
        {
            name: 'Bay lùi về giữa vòng 8',
            cmd: 'back',
            value: 150,
            msg: '> Đang bay lùi về giữa vòng 8'
        },
        {
            name: 'Bay lên giữa vòng 8',
            cmd: 'up',
            value: 70,
            msg: '> Đang bay lên giữa vòng 8'
        },
        {
            name: 'Bay lùi về giữa điểm bắt đầu và vòng 8 đầu tiên',
            cmd: 'back',
            value: 85,
            msg: '> Đang bay lùi về giữa điểm bắt đầu và vòng 8 đầu tiên'
        },
        {
            name: 'Bay xuống giữa điểm bắt đầu và vòng 8 đầu tiên',
            cmd: 'down',
            value: 70,
            msg: '> Đang hạ độ cao xuống giữa điểm bắt đầu và vòng 8 đầu tiên'
        },
        {
            name: 'Bay xuyên qua 2 vòng số 8',
            cmd: 'forward',
            value: 345,
            msg: '> Đang bay về phía trước xuyên qua 2 vòng số 8'
        },
        {
            name: 'Bay lên giữa vòng vàng',
            cmd: 'up',
            value: 100,
            msg: '> Đang bay lên giữa vòng vàng'
        },
        {
            name: 'Bay qua vòng vàng tới trước vòng xanh lá',
            cmd: 'right',
            value: 223,
            msg: '> Đang bay sang phải xuyên qua vòng vàng tới trước vòng xanh lá'
        },
        {
            name: 'Hạ độ cao ngay trước vòng xanh lá',
            cmd: 'down',
            value: 20,
            msg: '> Đang hạ độ cao trước vòng xanh lá'
        },
        {
            name: 'Bay lùi về tâm đích',
            cmd: 'back',
            value: 240,
            msg: '> Đang bay lùi về tâm đích'
        },
        {
            name: 'Bay lùi về cuối đường bay',
            cmd: 'back',
            value: 46, // nếu box nhỏ => 56
            msg: '> Đang bay lùi về cuối đường bay'
        },
        {
            name: 'Hạ cánh',
            cmd: 'land',
            value: '',
            msg: '> Đang hạ cánh'
        }
    ]
    
]