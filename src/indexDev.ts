import {DxfFetcher} from "./DxfFetcher"
import {DxfViewer} from "./DxfViewer"
import three from "three"

export {DxfFetcher, DxfViewer}

export default {DxfFetcher, DxfViewer}

const body = document.body,
    html = document.documentElement;

const height = Math.max( body.scrollHeight, body.offsetHeight,
    html.clientHeight, html.scrollHeight, html.offsetHeight );
document.getElementById('dxfViewContainer')?.setAttribute("style","height:"+(height-37)+'px');

const sceneOptions: any = {wireframeMesh: true}
// @ts-ignore
const cadCanvas2 = new DxfViewer(document.getElementById("dxfViewContainer"), {
    clearColor: new three.Color("#0c0c0c"),
    // clearColor:'#fff',
    autoResize: true,
    // colorCorrection: true,
    // sceneOptions
});
(window as any).WDxfViewer = cadCanvas2;


