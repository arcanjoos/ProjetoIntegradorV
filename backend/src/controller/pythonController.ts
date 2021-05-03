
import { spawn } from 'child_process'

export const pythonAction = async (request: any, response: any) => {

    var dataToSend: any;
    // spawn new child process to call the python script

    const python = spawn('python', ['script2.py', 'node.js', 'aa']);

    // collect data from script
    python.stdout.on('data', function (data) {
        console.log('Pipe data from python script ...');
        dataToSend = data.toString();
    });
    // in close event we are sure that stream from child process is closed
    python.on('close', (code) => {
        console.log(`child process close all stdio with code ${code}`);
        // send data to browser
        response.send(dataToSend)
    });
}

export const pythonActionEmail = async (request: any, response: any) => {

    var dataToSend: any;
    // spawn new child process to call the python script

    const python = spawn('python', ['scriptEmail.py', 'nome', 'email']);

    // collect data from script
    python.stdout.on('data', function (data) {
        console.log('Pipe data from python script ...');
        dataToSend = data.toString();
    });
    // in close event we are sure that stream from child process is closed
    python.on('close', (code) => {
        console.log(`child process close all stdio with code ${code}`);
        // send data to browser
        response.send(dataToSend)
    });
}