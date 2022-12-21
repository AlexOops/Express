import {Worker} from "worker_threads";
import path from "path";

const run = (passwordSize) => {
    return new Promise((resolve, reject) => {
        const worker = new Worker(path.resolve('./worker'), {
            workerData: passwordSize
        })

        worker.on('message', resolve);
        worker.on('messageerror', reject);
    })
}

(async () => {
    try {
        const passwordByteSize = 4;
        const password = await run(passwordByteSize);

        console.log(password);
    } catch (err) {
        console.log(err);
    }
})()