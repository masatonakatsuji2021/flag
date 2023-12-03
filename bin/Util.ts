import * as fs from "fs";
import { spawn } from "child_process";
import * as http from "http";
import * as https from "https";

interface deepSearchOption{
    callback? : Function,
    copyCallback? : Function,
    ignore? : Array<string>,
}

interface RequestResult{
    status : boolean,
    data : string | Object,
    res : http.IncomingMessage,
    error? : Error,
}

export default class FlagUtil{

    /**
     * ***uniwId*** ; 
     * generate random string. 
     * @param length Generated string length
     * @returns 
     */
    public static uniqId(length? : number) : string{
        if(!length){
            length = 32;
        }
        const lbn : string = "0123456789ABCDEFGHIJKNLMOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
        let str : string = "";
        for(var n = 0 ; n < length ; n++){
            let index : number = parseInt((Math.random() * 10000).toString());
            let s : string = lbn[index % lbn.length];
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
    public static ucFirst(content : string) : string{
        return content.substring(0,1).toUpperCase() + content.substring(1);
    }

    /**
     * #### lcFirst
     * Outputs text with the first letter converted to lowercase.
     * @param {string} content text content 
     * @returns {string} convert text content
     */
    public static lcFirst(content : string) : string{
        return content.substring(0,1).toLowerCase() + content.substring(1);
    }

    public static deepSearch(filePath : string, option? : deepSearchOption){
        if(!option){
            option = {};
        }

        let res = {
            file: [],
            dir: [],
        };
        const buffers = fs.readdirSync(filePath);
        for(let n = 0 ; n < buffers.length ; n++){
            const cpath = buffers[n];
            let fullPath = filePath + "/" + cpath
            fullPath = fullPath.split("//").join("/");

            if(option.ignore){
                let juge = true;
                for(let n2 = 0 ; n2 < option.ignore.length ; n2++){
                    const i_ = option.ignore[n2];
                    if(fullPath.indexOf(i_) === 0){
                        juge = false;
                        break;
                    }
                }

                if(!juge){
                    continue;
                }
            }

            if(fs.statSync(fullPath).isDirectory()){
                res.dir.push(fullPath);
                if(option.callback){
                    option.callback(1, fullPath);
                }
                const childbuffers = FlagUtil.deepSearch(fullPath);
                for(let n2 = 0 ; n2 < childbuffers.file.length ; n2++){
                    const b_ = childbuffers.file[n2];
                    res.file.push(b_);
                }
                for(let n2 = 0 ; n2 < childbuffers.dir.length ; n2++){
                    const b_ = childbuffers.dir[n2];
                    res.dir.push(b_);
                }
            }
            else{
                res.file.push(fullPath);
                if(option.callback){
                    option.callback(0, fullPath);
                }
            }
        }

        return res;
    }

    public static dirDelete(targetPath : string){
        const targetDatas = FlagUtil.deepSearch(targetPath);
        for(let n = 0 ; n < targetDatas.file.length ; n++){
            const file = targetDatas.file[n];
            fs.unlinkSync(file);            
        }

        const dirs = targetDatas.dir.reverse();

        for(let n = 0 ; n < dirs.length ; n++){
            const dir = dirs[n];
            fs.rmdirSync(dir);            
        }
    }

    public static deepCopy(targetPath : string, outputPath : string, option? : deepSearchOption){
        if(!option){
            option = {};
        }

        let exists = false;
        try{
            exists = fs.statSync(outputPath).isDirectory();
        }catch(err){}
        
        if(!exists){
            fs.mkdirSync(outputPath);
            if(option.copyCallback){
                option.copyCallback(0, outputPath);
            }
        }
        else{
            FlagUtil.dirDelete(outputPath);
        }

        const targetDatas = FlagUtil.deepSearch(targetPath, option);

        for(let n = 0 ; n < targetDatas.dir.length ; n++){
            const dir = targetDatas.dir[n];
            const outputMkdir = dir.replace(targetPath, outputPath);
            fs.mkdirSync(outputMkdir);
            if(option.copyCallback){
                option.copyCallback(0, outputMkdir);
            }
        }

        for(let n = 0 ; n < targetDatas.file.length ; n++){
            const file = targetDatas.file[n];
            const outputFile = file.replace(targetPath, outputPath);
            fs.copyFileSync(file, outputFile);
            if(option.copyCallback){
                option.copyCallback(1, file, outputFile);
            }
        }
    }

    public static realTimeExec(command : string, callback : Function) : Promise<unknown>{
        let cmds = command.split(" ");
        const firstCommand = cmds[0];
        cmds.shift();
        const cwd = process.cwd();

        const childProcess = spawn(firstCommand, cmds, { cwd });

        return new Promise((resolve)=>{
       
            childProcess.stdout.on("data", (d_) => {
                callback(d_.toString());
            });
          
            childProcess.stdout.on("end", () => {
                resolve(true);
            });
        });
    }

    public static request(url: string, option?){
        let lst;
        if(url.indexOf("https://") === 0){
            lst = https;
        }
        else{
            lst = http;
        }

        return new Promise((resolve) => {

            const listener = lst.get(url, (res) => {

                let data = "";
    
                res.on("data", (c) => {
                    data += c;
                });
    
                res.on("end", () => {
                    let result : RequestResult = {
                        status: true,
                        data : data,
                        res: res,
                    };
                    resolve(result);
                });

                res.on("error", (error) => {
                    let result : RequestResult = {
                        status: false,
                        error: error,
                        data : data,
                        res: res,
                    };
                    resolve(result);
                });
            });
            listener.end();    
        });

    }
}