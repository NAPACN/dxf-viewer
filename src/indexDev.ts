import {DxfFetcher} from "./DxfFetcher"
import {DxfViewer} from "./DxfViewer"
import three from "three"

export {DxfFetcher, DxfViewer}

export default {DxfFetcher, DxfViewer}

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
document.dispatchEvent(new CustomEvent('DxfViewLoadEvent'));
console.log("DxfViewLoadEvent js req end");

