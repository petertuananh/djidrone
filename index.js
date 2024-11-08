const Tello = require("tello-drone");
 
const drone = new Tello();
 
drone.on("connection", () => {
    console.log("Connected to drone");
});

drone.on("state", state => {
    // console.log("Recieved State > ", state);
});
 
drone.on("send", (err, length) => {
    if (err) console.log(err);
 
    console.log(`Sent command is ${length} long`);
});


drone.on("message", async (message) => {
    console.log("Recieved Message > ", message);
    if (isNaN(message)) return;
    if (parseInt(message) < 80) {
        console.log('Pin yếu (dưới 80%), không đủ an toàn, không cất cánh');
        await drone.send("land");

        setTimeout(() => {
            process.exit();
        }, 2000);
    }
});
 
drone.on("connection", async () => {
    try {
        await drone.send("battery?")
        await drone.send("takeoff");
        // await drone.send("up", {
        //     value: 15
        // });
        await drone.send("speed", {
            value: 80
        });
        await drone.send("forward", {
            value: 300
        });
        await drone.send("flip", {
            value: "f"
        });
        await drone.send("back", {
            value: 330
        });
        await drone.send("land");
        await drone.send("battery?");
        setTimeout(() => {
            process.exit();
        }, 2000);
    } catch (error) {
        console.log(error)
        drone.send("land")
        //A short delay so that the land command can be sent before exiting
        setTimeout(process.exit);
    }
});