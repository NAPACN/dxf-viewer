import {DxfFetcher} from "./DxfFetcher"
import {DxfViewer} from "./DxfViewer"
import three from "three"

export {DxfFetcher, DxfViewer}

// const mainFont = require('./fonts/Roboto-LightItalic.ttf')

export default {DxfFetcher, DxfViewer}

const fileInput =document.getElementById("file");
const body = document.body,
    html = document.documentElement;

const height = Math.max( body.scrollHeight, body.offsetHeight,
    html.clientHeight, html.scrollHeight, html.offsetHeight );
document.getElementById('result')?.setAttribute("style","height:"+(height-37)+'px');
const progress=()=>{

}
if (fileInput){
    fileInput.addEventListener("change", handleFiles, false);
    function handleFiles() {
        // @ts-ignore
        const fileList = this.files; /* now you can work with the file list */
        console.log(fileList);


        const dxfUrl = URL.createObjectURL(fileList[0])
        const sceneOptions: any = {wireframeMesh: true}
        // @ts-ignore
        const cadCanvas2 = new DxfViewer(document.getElementById("result"), {
            clearColor: new three.Color("#0c0c0c"),
            // clearColor:'#fff',
            autoResize: true,
            // colorCorrection: true,
            // sceneOptions
        });
        // @ts-ignore
        cadCanvas2.Load({
            // fonts: [mainFont],
             fonts: ["http://localhost:63342/devDist/Roboto-LightItalic.ttf"],
            url: dxfUrl,
            progressCbk: progress,
            workerFactory: null,
            props:{ filterTags:["SN"] }
        });

    }
}
