import * as readline from "readline";
import CLIColorType from "./CLIColorType";

let args = process.argv.concat();
let _indent : number = 0;

args.shift();
args.shift();

type CLIOption = {
    color? : number[],
    noIndent? : boolean,
    indent? : number,
};

/**
 * ***CLIColorType***  
 * Static variable for preset text color.  
 * It can be set as below.
 * 
 * Example:)  
 * 
 * FlagCLI.outn("Hallo Red", {  
 * 　color: CLIColorType.red,  
 * });  
 * 
 * 
 */

export default class FlagCLI{

    private static getIndentSpace() : string{
        let indentStr : string = "";
        for(let n = 0 ; n < _indent ; n++){
            indentStr += " ";
        }
        return indentStr;
    }

    public static getArgs() : Array<string>{
        return args;
    }

    public getArgs() : Object{
        return FlagCLI.getArgs();
    }

    public static getArgsOption() : Object{
        
        var options = {
            _any : [],
        };

        var field = null;
        for(var n = 0 ; n < args.length ; n++){
            var a = args[n];

            if(a.indexOf("--") === 0){
                if(field){
                    options[field] = true;
                }
                field = a.substring(2);
            }
            else{
                if(!field){
                    options._any.push(a);
                    continue;
                }
                options[field] = a;
                field = null;
            }
        }

        if(field){
            options[field] = true;
        }

        return options;
    }

    public getArgsOption() : Object{
        return FlagCLI.getArgsOption();
    }

    public static indent(indent : number) : FlagCLI{
        _indent = indent;
        FlagCLI.out("\r" + FlagCLI.getIndentSpace());
        return this;
    }

    public indent(indent : number) : FlagCLI{
        return FlagCLI.indent(indent);
    }

    public static getColor(string : string, rgb : number[]) : string{
        return "\x1b[38;2;" + rgb[0] + ";" + rgb[1] + ";" + rgb[2] + "m" + string + "\x1b[39m";
    }

    public static color(string : string, rgb : number[]) : FlagCLI{
        return FlagCLI.out(string, {
            color: rgb,
        });
    }

    public color(string : string, rgb : number[]) : FlagCLI{
        return FlagCLI.color(string, rgb);
    }

    public static colorn(string : string, rgb : number[]) : FlagCLI{
        return FlagCLI.outn(string, {
            color: rgb,
        });
    }

    public colorn(string : string, rgb : number[]) : FlagCLI{
        return FlagCLI.colorn(string, rgb);
    }

    public static getRed(string : string) : string{
        return FlagCLI.getColor(string, CLIColorType.red);
    }

    public static red(string : string) : FlagCLI{
        return FlagCLI.color(string, CLIColorType.red);
    }

    public red(string : string) : FlagCLI{
        return FlagCLI.red(string);
    }

    public static redn(string : string) : FlagCLI{
        return FlagCLI.colorn(string, CLIColorType.red);
    }

    public redn(string : string) : FlagCLI{
        return FlagCLI.redn(string);
    }

    public static getYellow(string : string) : string{
        return FlagCLI.getColor(string, CLIColorType.yellow);
    }

    public static yellow(string : string) : FlagCLI{
        return FlagCLI.color(string, CLIColorType.yellow);
    }

    public yellow(string : string) : FlagCLI{
        return FlagCLI.yellow(string);
    }

    public static yellown(string : string) : FlagCLI{
        return FlagCLI.colorn(string, CLIColorType.yellow);
    }

    public yellown(string : string) : FlagCLI{
        return FlagCLI.yellown(string);
    }

    public static getGreen(string : string) : string{
        return FlagCLI.getColor(string, CLIColorType.green);
    }

    public static green(string : string) : FlagCLI{
        return FlagCLI.color(string, CLIColorType.green);
    }

    public green(string : string) : FlagCLI{
        return FlagCLI.green(string);
    }

    public static greenn(string : string) : FlagCLI{
        return FlagCLI.colorn(string, CLIColorType.green);
    }

    public greenn(string : string) : FlagCLI{
        return FlagCLI.greenn(string);
    }

    public static getBlue(string : string) : string{
        return FlagCLI.getColor(string, CLIColorType.blue);
    }

    public static blue(string: string) : FlagCLI{
        return FlagCLI.color(string, CLIColorType.blue);
    }

    public blue(string: string) : FlagCLI{
        return FlagCLI.blue(string);
    }

    public static bluen(string: string) : FlagCLI{
        return FlagCLI.colorn(string, CLIColorType.blue);
    }

    public bluen(string: string) : FlagCLI{
        return FlagCLI.bluen(string);
    }

    public static getGray(string : string) : string{
        return FlagCLI.getColor(string, CLIColorType.gray);
    }

    public static gray(string: string) : FlagCLI{
        return FlagCLI.color(string, CLIColorType.gray);
    }

    public gray(string: string) : FlagCLI{
        return FlagCLI.gray(string);
    }

    public static grayn(string: string) : FlagCLI{
        return FlagCLI.colorn(string, CLIColorType.gray);
    }

    public grayn(string: string) : FlagCLI{
        return FlagCLI.grayn(string);
    }

    public static getOrange(string : string) : string{
        return FlagCLI.getColor(string, CLIColorType.orange);
    }

    public static orange(string: string) : FlagCLI{
        return FlagCLI.color(string, CLIColorType.orange);
    }

    public orange(string: string) : FlagCLI{
        return FlagCLI.orange(string);
    }

    public static orangen(string: string) : FlagCLI{
        return FlagCLI.colorn(string, CLIColorType.orange);
    }

    public orangen(string: string) : FlagCLI{
        return FlagCLI.orangen(string);
    }

    public static out(string : string) : FlagCLI;

    public static out(string : string, option : CLIOption) : FlagCLI;

    public static out(string : string, option? : CLIOption) : FlagCLI{
        
        if(!option){
            option = {};
        }

        if(option.indent){
            const beforeIndent = _indent;
            FlagCLI.indent(option.indent);
            string = FlagCLI.getIndentSpace() + string;
            FlagCLI.indent(beforeIndent);
        }

        if(option.color){
            string = "\x1b[38;2;" + option.color[0] + ";" + option.color[1] + ";" + option.color[2] + "m" + string + "\x1b[39m";
        }

        process.stdout.write(string);
        return this;
    };

    public out(string : string) : FlagCLI;

    public out(string : string, option : CLIOption) : FlagCLI;

    public out(string : string, option? : CLIOption) : FlagCLI{
        return FlagCLI.out(string, option);
    }

    public static outn(string : string) : FlagCLI;

    public static outn(string : string, option : CLIOption) : FlagCLI;

    public static outn(string : string, option? : CLIOption) : FlagCLI{
        if(!option){
            option = {};
        }

        string = string + "\n";

        if(!option.noIndent){
            string = string + FlagCLI.getIndentSpace();
        }
        
        return FlagCLI.out(string, option);
    }

    public outn(string : string) : FlagCLI;

    public outn(string : string, option : CLIOption) : FlagCLI;

    public outn(string : string, option? : CLIOption) : FlagCLI{
        return FlagCLI.outn(string, option);
    }

    public static br() : FlagCLI{
        return FlagCLI.outn("");
    }

    public br() : FlagCLI{
        return FlagCLI.br();
    }

    public static in() : Promise<unknown>;

    public static in(string : string) : Promise<unknown>;

    public static in(string : string, option : CLIOption) : Promise<unknown>;

    public static in(string? : string, option? : CLIOption) : Promise<unknown>{

        if(string){
            FlagCLI.out(string, option);
        }

        FlagCLI.out(" :", option);

        const readInterface = readline.createInterface({
            input: process.stdin,
        });

        return new Promise(function(resolve){
            readInterface.question(" : ", (input : string) => {
                readInterface.close();
                if(_indent){
                    FlagCLI.out(FlagCLI.getIndentSpace());
                }
                resolve(input.trim());
            });
        });
    };
    
    public in() : Promise<unknown>;

    public in(string : string) : Promise<unknown>;

    public in(string : string, option : CLIOption) : Promise<unknown>;

    public in(string? : string, option? : CLIOption) : Promise<unknown>{
        return FlagCLI.in(string, option);
    }

    public static outData(data : Object) : FlagCLI{

        var c = Object.keys(data);

        var maxKeyLength = 0;

        for(var n = 0 ; n < c.length ; n++){
            var key = c[n];
            if(maxKeyLength < key.length){
                maxKeyLength = key.length;
            }
        }

        for(var n = 0 ; n < c.length ; n++){
            var key = c[n];
            var val = data[key];
            if(typeof val != "string"){
                val = val.toString();
            }
            val = val.split("\n").join("\n"+ " ".padEnd(_indent + maxKeyLength + 3));

            let keystr = key.padEnd(maxKeyLength) + " : ";

            FlagCLI.outn(keystr + val);
        }

        return this;
    }
    
    public outData(data : Object) : FlagCLI{
        return FlagCLI.outData(data);
    }

    public static wait(){


    }
};