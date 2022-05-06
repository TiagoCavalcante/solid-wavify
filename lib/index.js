var $83Duu$solidjsjsxruntime = require("solid-js/jsx-runtime");
var $83Duu$solidjs = require("solid-js");

function $parcel$defineInteropFlag(a) {
  Object.defineProperty(a, '__esModule', {value: true, configurable: true});
}
function $parcel$export(e, n, v, s) {
  Object.defineProperty(e, n, {get: v, set: s, enumerable: true, configurable: true});
}

$parcel$defineInteropFlag(module.exports);

$parcel$export(module.exports, "default", () => $9233cea927cb9637$export$2e2bcd8739ae039);



function $6ad09188ba6eae36$export$2e2bcd8739ae039({ amplitude: amplitude = 20 , height: height = 20 , points: points1 = 3 , speed: speed = 0.15 , style: style , className: className , fill: fill , paused: paused , children: children , id: id , ref: ref , ...rest }) {
    const [path, setPath] = $83Duu$solidjs.createSignal('');
    let lastUpdate = 0;
    let elapsed = 0;
    let step = 0;
    let frameId = 0;
    function calculateWavePoints() {
        const pointList = [];
        for(let i = 0; i <= Math.max(points1, 1); i++){
            const scale = 100;
            const x = i / points1 * getWidth();
            const seed = (step + (i + i % points1)) * speed * scale;
            const currentHeight = Math.sin(seed / scale) * amplitude;
            const y = Math.sin(seed / scale) * currentHeight + height;
            pointList.push({
                x: x,
                y: y
            });
        }
        return pointList;
    }
    function buildPath(points) {
        let svg = `M ${points[0].x} ${points[0].y}`;
        const initial = {
            x: (points[1].x - points[0].x) / 2,
            y: points[1].y - points[0].y + points[0].y + (points[1].y - points[0].y)
        };
        const cubic = (a, b)=>` C ${a.x} ${a.y} ${a.x} ${a.y} ${b.x} ${b.y}`
        ;
        svg += cubic(initial, points[1]);
        let point = initial;
        for(let i = 1; i < points.length - 1; i++){
            point = {
                x: points[i].x - point.x + points[i].x,
                y: points[i].y - point.y + points[i].y
            };
            svg += cubic(point, points[i + 1]);
        }
        svg += ` L ${getWidth()} ${getHeight()}`;
        svg += ` L 0 ${getHeight()} Z`;
        return svg;
    }
    const getWidth = ()=>ref.offsetWidth
    ;
    const getHeight = ()=>ref.offsetHeight
    ;
    function redraw() {
        setPath(buildPath(calculateWavePoints()));
    }
    function draw() {
        if (!paused) {
            const now = new Date().getTime();
            elapsed += now - lastUpdate;
            lastUpdate = now;
        }
        const scale = 1000;
        step = elapsed * Math.PI / scale;
        redraw();
    }
    function update() {
        draw();
        if (frameId) resume();
    }
    function resume() {
        frameId = window.requestAnimationFrame(update);
        lastUpdate = new Date().getTime();
    }
    $83Duu$solidjs.onMount(()=>{
        if (!frameId) resume();
    });
    $83Duu$solidjs.onCleanup(()=>{
        window.cancelAnimationFrame(frameId);
        frameId = 0;
    });
    return /*#__PURE__*/ $83Duu$solidjsjsxruntime.jsx("div", {
        style: {
            width: '100%',
            display: 'inline-block',
            ...style
        },
        className: className,
        id: id,
        ref: ref,
        children: /*#__PURE__*/ $83Duu$solidjsjsxruntime.jsxs("svg", {
            width: "100%",
            height: "100%",
            version: "1.1",
            xmlns: "http://www.w3.org/2000/svg",
            children: [
                children,
                /*#__PURE__*/ $83Duu$solidjsjsxruntime.jsx("path", {
                    d: path(),
                    fill: fill,
                    ...rest
                })
            ]
        })
    });
}


const $9233cea927cb9637$var$defaults = {
    height: 20,
    amplitude: 20,
    speed: 0.15,
    points: 3
};
function $9233cea927cb9637$export$2e2bcd8739ae039({ fill: fill = "#fff" , paused: paused = false , options: options , ...rest }) {
    return /*#__PURE__*/ $83Duu$solidjsjsxruntime.jsx($6ad09188ba6eae36$export$2e2bcd8739ae039, {
        fill: fill,
        paused: paused,
        ...$9233cea927cb9637$var$defaults,
        ...options,
        ...rest
    });
}


//# sourceMappingURL=index.js.map
