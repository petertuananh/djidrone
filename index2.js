const Tello = require("tello-drone");
const drone = new Tello();
const colors = require('colors');
drone.on("connection", () => {
    console.log(colors.cyan(`> Đã kết nối đến drone: ${drone.HOST}`));
});

drone.on("state", state => {
    // console.log("Recieved State > ", state);
});

drone.on("send", (err, length) => {
    if (err) console.log(err);

    // console.log(`Sent command is ${length} long`);
});


drone.on("message", async (message) => {
    console.log("Recieved Message > ", message);
    if (isNaN(message)) return;
});
drone.on("connection", async () => {
    console.log("> Drone đã kết nối! Bắt đầu thực thi lệnh...");
    await drone.send('battery?'); // xem pin
    await drone.send('takeoff'); // cất cánh
    await drone.send('forward', {
        value: 128
    }); // bay từ bắt đầu đến giữa số 8
    await drone.send('up', {
        value: 70
    }); // bay lên giữa số 8
    await drone.send('forward', {
        value: 150
    }); // bay qua nóc vòng 8 2
    await drone.send('down', {
        value: 70
    }); // bay xuống giữa vòng 8 2
    await drone.send('back', {
        value: 150
    }); // bay về giữa vòng 8
    await drone.send('up', {
        value: 70
    }); // bay lên giữa vòng 8
    await drone.send('back', {
        value: 85
    }); // bay về giữa bắt đầu và vòng 8 1
    await drone.send('down', {
        value: 70
    }); // xuống giữa bắt đầu và vòng 8 1
    await drone.send('forward', {
        value: 345
    }); // bay xuyên qua 2 vòng số 8
    await drone.send('up', {
        value: 100
    }); // bay lên giữa vòng vàng
    await drone.send('right', {
        value: 223
    }); // bay xuyên qua vòng vàng và đến trước vòng xanh lá
    await drone.send('down', {
        value: 20
    }); // bay hạ độ cao ngay trước vòng xanh lá
    await drone.send('back', {
        value: 240
    }); // bay ngược về tâm đích
    // await drone.send('land'); // hạ cánh cuối landing space
    // await drone.send('takeoff'); // cất cánh từ landing space
    await drone.send('back', {
        value: 46 // nếu box nhỏ => 56
    });
    await drone.send('land'); // hạ cánh cuối
});