const Tello = require("tello-drone");
const drone = new Tello();
const colors = require('colors');
const readline = require('readline');

const routers = require('./routers/index');
let nowRouters = [];
let currentIndex = 0;
let isExecuting = false;
const commands = [
    {
        name: 'start',
        description: 'Bắt đầu bay',
        exeType: 'requireFile',
        msg: colors.green('> Đang bay lên')
    },
    {
        name: 'p8r',
        description: 'Bắt đầu qua vòng số 8',
        exeType: 'requireFile',
        msg: colors.green('> Đang qua vòng số 8')
    },
    // {
    //     name: 'forward2',
    //     description: 'Bắt đầu tiến lên2',
    //     exeType: 'direct',
    //     cmd: 'forward',
    //     msg: colors.green('> Đang tiến lên')
    // },
    {
        name: 'exit',
        description: 'Thoát chương trình',
        exeType: 'eval',
        cmd: 'process.exit()',
        msg: colors.red('> Đang thoát chương trình')
    },
    {
        name: 'clear',
        description: 'Xóa hàng đợi',
        exeType: 'eval',
        cmd: 'nowRouters = [];executeRouters([]);currentIndex = 0;',
        msg: colors.red('> Đang xóa hàng đợi')
    },
    {
        name: 'help',
        description: 'Xem các lệnh có sẵn',
        exeType: 'builtin',
        cmd: ``,
        msg: colors.red('> Đang tải các lệnh')
    },
];


const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    completer: (line) => {
        const hits = commands.filter(cmd => cmd.name.startsWith(line)).map(cmd => cmd.name);
        return [hits.length ? hits : commands.map(x => x.name), line];
    }
});

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
    executeRouters();
});

async function insertNewCommands(newCommands) {
    newCommands.forEach((newCommand, index) => {
        nowRouters.splice(currentIndex + index, 0, newCommand);
        console.log(colors.green(`> Đã chèn lệnh: ${newCommand.cmd} ${newCommand.value || ''} vào vị trí ${currentIndex + index}`));
        console.log(colors.yellow(`> Số lệnh hiện tại: ${nowRouters.length}`));
    });
    if (!isExecuting) {
        executeRouters();
    }
}

async function executeRouters() {
    if (isExecuting) return;
    isExecuting = true;
    while (currentIndex < nowRouters.length) {
        const router = nowRouters[currentIndex];
        try {
            const options = {};
            if (router.value) options.value = router.value;
            await drone.send(router.cmd, options);
            console.log(colors.green(`> Đã hoàn thành lệnh: ${router.cmd} ${router.value || ''}`));
        } catch (error) {
            console.log(colors.red("> Lỗi khi hoàn thành lệnh:", error));
        }
        currentIndex++;
        await new Promise((resolve) => setTimeout(resolve, 2000));
    }
    if (nowRouters.length > 0) console.log(colors.green("> Hoàn thành tất cả lệnh!"));
    currentIndex = 0;
    nowRouters = [];
    
    isExecuting = false;
}

const pass8Round = async function () {
    await drone.send("forward", {
        value: 60
    });
    await drone.send("up", {
        value: 60
    });
    await drone.send("forward", {
        value: 60
    });
    await drone.send("down", {
        value: 60
    });
    await drone.send("back", {
        value: 60
    });
    await drone.send("up", {
        value: 60
    });
    await drone.send("back", {
        value: 60
    });
    await drone.send("down", {
        value: 60
    });
}


function enterNewCommand() {
    rl.question('Nhập lệnh: ', async (inputCommand) => {
        const command = inputCommand.split(' ')[0].replace('/', '');
        if (!inputCommand || !command) {
            await console.log(colors.red('> Lệnh không hợp lệ, xem danh sách lệnh có sẵn: '));
            commands.forEach(cmd => {
                console.log(colors.yellow(`  /${cmd.name} (${cmd.description})`));
            });
            return enterNewCommand();
        }
        const value = inputCommand.split(' ')[1];
        const findCommand = commands.find(x => x.name == command);

        if (!findCommand) {
            await insertNewCommands([
                {
                    name: command,
                    cmd: command,
                    value: value,
                    msg: `${command} ${value}`
                }
            ]);
            return enterNewCommand();
        } else {
            if (findCommand.exeType == 'requireFile') {
                const routeData = routers[findCommand.name];
                if (!routeData) {
                    await console.log(colors.red(`> Lệnh lỗi, không tìm thấy file /routers/${findCommand.name}`));
                    return enterNewCommand();
                }
                console.log(colors.green('> Đang load danh sách lệnh...'));
                routeData.forEach(route => {
                    console.log(colors.yellow(`   > ${route.name} ${route.value ? `[${route.value}]` : ''}`));
                });
                await insertNewCommands(routeData);
                return enterNewCommand();
            } else if (findCommand.exeType == 'direct') {
                await insertNewCommands([
                    {
                        name: findCommand.name,
                        cmd: findCommand.cmd,
                        value: value,
                        msg: findCommand.msg
                    }
                ]);
                return enterNewCommand();
            } else if (findCommand.exeType == 'eval') {
                await console.log(colors.green(`> Đang eval lệnh ${command}`));
                await eval(findCommand.cmd);
                return enterNewCommand();
            } else if (findCommand.exeType == 'builtin') {
                if (command == 'help') {
                    await console.log(colors.green('> Danh sách lệnh có sẵn:'));
                    commands.forEach(cmd => {
                        console.log(colors.yellow(`  /${cmd.name} (${cmd.description})`));
                    });
                    return enterNewCommand();
                } else if (command == 'queue') {
                    await console.log(colors.green('> Danh sách lệnh đang chờ:'));
                    nowRouters.forEach(route => {
                        console.log(colors.yellow(`   > ${route.name} ${route.value ? `[${route.value}]` : ''}`));
    
                    });
                    return enterNewCommand();
                }
            }
        }
    });
}
enterNewCommand()