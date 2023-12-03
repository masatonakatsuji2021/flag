"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const child_process_1 = require("child_process");
class FlagUtil {
    /**
     * ***uniwId*** ;
     * generate random string.
     * @param length Generated string length
     * @returns
     */
    static uniqId(length) {
        if (!length) {
            length = 32;
        }
        const lbn = "0123456789ABCDEFGHIJKNLMOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
        let str = "";
        for (var n = 0; n < length; n++) {
            let index = parseInt((Math.random() * 10000).toString());
            let s = lbn[index % lbn.length];
            str += s;
        }
        return str;
    }
    /**
     * #### ucFirst
     * Outputs text with the first letter converted to uppercase.
     * @param {string} content text content
     * @returns {string} convert text content
     */
    static ucFirst(content) {
        return content.substring(0, 1).toUpperCase() + content.substring(1);
    }
    /**
     * #### lcFirst
     * Outputs text with the first letter converted to lowercase.
     * @param {string} content text content
     * @returns {string} convert text content
     */
    static lcFirst(content) {
        return content.substring(0, 1).toLowerCase() + content.substring(1);
    }
    static deepSearch(filePath, option) {
        if (!option) {
            option = {};
        }
        let res = {
            file: [],
            dir: [],
        };
        const buffers = fs.readdirSync(filePath);
        for (let n = 0; n < buffers.length; n++) {
            const cpath = buffers[n];
            let fullPath = filePath + "/" + cpath;
            fullPath = fullPath.split("//").join("/");
            if (option.ignore) {
                let juge = true;
                for (let n2 = 0; n2 < option.ignore.length; n2++) {
                    const i_ = option.ignore[n2];
                    if (fullPath.indexOf(i_) === 0) {
                        juge = false;
                        break;
                    }
                }
                if (!juge) {
                    continue;
                }
            }
            if (fs.statSync(fullPath).isDirectory()) {
                res.dir.push(fullPath);
                if (option.callback) {
                    option.callback(1, fullPath);
                }
                const childbuffers = FlagUtil.deepSearch(fullPath);
                for (let n2 = 0; n2 < childbuffers.file.length; n2++) {
                    const b_ = childbuffers.file[n2];
                    res.file.push(b_);
                }
                for (let n2 = 0; n2 < childbuffers.dir.length; n2++) {
                    const b_ = childbuffers.dir[n2];
                    res.dir.push(b_);
                }
            }
            else {
                res.file.push(fullPath);
                if (option.callback) {
                    option.callback(0, fullPath);
                }
            }
        }
        return res;
    }
    static dirDelete(targetPath) {
        const targetDatas = FlagUtil.deepSearch(targetPath);
        for (let n = 0; n < targetDatas.file.length; n++) {
            const file = targetDatas.file[n];
            fs.unlinkSync(file);
        }
        const dirs = targetDatas.dir.reverse();
        for (let n = 0; n < dirs.length; n++) {
            const dir = dirs[n];
            fs.rmdirSync(dir);
        }
    }
    static deepCopy(targetPath, outputPath, option) {
        if (!option) {
            option = {};
        }
        let exists = false;
        try {
            exists = fs.statSync(outputPath).isDirectory();
        }
        catch (err) { }
        if (!exists) {
            fs.mkdirSync(outputPath);
            if (option.copyCallback) {
                option.copyCallback(0, outputPath);
            }
        }
        else {
            FlagUtil.dirDelete(outputPath);
        }
        const targetDatas = FlagUtil.deepSearch(targetPath, option);
        for (let n = 0; n < targetDatas.dir.length; n++) {
            const dir = targetDatas.dir[n];
            const outputMkdir = dir.replace(targetPath, outputPath);
            fs.mkdirSync(outputMkdir);
            if (option.copyCallback) {
                option.copyCallback(0, outputMkdir);
            }
        }
        for (let n = 0; n < targetDatas.file.length; n++) {
            const file = targetDatas.file[n];
            const outputFile = file.replace(targetPath, outputPath);
            fs.copyFileSync(file, outputFile);
            if (option.copyCallback) {
                option.copyCallback(1, file, outputFile);
            }
        }
    }
    static realTimeExec(command, callback) {
        let cmds = command.split(" ");
        const firstCommand = cmds[0];
        cmds.shift();
        const cwd = process.cwd();
        const childProcess = (0, child_process_1.spawn)(firstCommand, cmds, { cwd });
        return new Promise((resolve) => {
            childProcess.stdout.on("data", (d_) => {
                callback(d_.toString());
            });
            childProcess.stdout.on("end", () => {
                resolve(true);
            });
        });
    }
}
exports.default = FlagUtil;
