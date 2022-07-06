import {createComponent as $9Ue0q$createComponent, mergeProps as $9Ue0q$mergeProps, template as $9Ue0q$template, insert as $9Ue0q$insert, spread as $9Ue0q$spread, effect as $9Ue0q$effect, style as $9Ue0q$style, className as $9Ue0q$className, setAttribute as $9Ue0q$setAttribute} from "solid-js/web";
import {splitProps as $9Ue0q$splitProps, mergeProps as $9Ue0q$mergeProps1, createSignal as $9Ue0q$createSignal, onMount as $9Ue0q$onMount, onCleanup as $9Ue0q$onCleanup} from "solid-js";











const $6719f9210d2bc6ba$var$_tmpl$ = /*#__PURE__*/ (0, $9Ue0q$template)(`<div><svg width="100%" height="100%" version="1.1" xmlns="http://www.w3.org/2000/svg"><path></path></svg></div>`, 6);
function $6719f9210d2bc6ba$export$2e2bcd8739ae039(baseProps) {
    const props = (0, $9Ue0q$mergeProps1)({
        amplitude: 20,
        height: 20,
        points: 3,
        speed: 0.15
    }, baseProps);
    const [local, rest] = (0, $9Ue0q$splitProps)(props, [
        "amplitude",
        "height",
        "points",
        "speed",
        "style",
        "class",
        "fill",
        "paused",
        "children",
        "id",
        "ref"
    ]);
    const [path, setPath] = (0, $9Ue0q$createSignal)("");
    let lastUpdate = 0;
    let elapsed = 0;
    let step = 0;
    let frameId = 0;
    function calculateWavePoints() {
        const pointList = [];
        for(let i = 0; i <= Math.max(local.points, 1); i++){
            const scale = 100;
            const x = i / local.points * getWidth();
            const seed = (step + (i + i % local.points)) * local.speed * scale;
            const currentHeight = Math.sin(seed / scale) * local.amplitude;
            const y = Math.sin(seed / scale) * currentHeight + local.height;
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
        const cubic = (a, b)=>` C ${a.x} ${a.y} ${a.x} ${a.y} ${b.x} ${b.y}`;
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
    const getWidth = ()=>local.ref.offsetWidth;
    const getHeight = ()=>local.ref.offsetHeight;
    function redraw() {
        setPath(buildPath(calculateWavePoints()));
    }
    function draw() {
        if (!local.paused) {
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
    (0, $9Ue0q$onMount)(()=>{
        if (!frameId) resume();
    });
    (0, $9Ue0q$onCleanup)(()=>{
        window.cancelAnimationFrame(frameId);
        frameId = 0;
    });
    return (()=>{
        const _el$ = $6719f9210d2bc6ba$var$_tmpl$.cloneNode(true), _el$2 = _el$.firstChild, _el$3 = _el$2.firstChild;
        const _ref$ = local.ref;
        typeof _ref$ === "function" ? _ref$(_el$) : local.ref = _el$;
        (0, $9Ue0q$insert)(_el$2, ()=>local.children, _el$3);
        (0, $9Ue0q$spread)(_el$3, rest, true, false);
        (0, $9Ue0q$effect)((_p$)=>{
            const _v$ = {
                width: "100%",
                display: "inline-block",
                ...local.style
            }, _v$2 = local.class, _v$3 = local.id, _v$4 = path(), _v$5 = local.fill;
            _p$._v$ = (0, $9Ue0q$style)(_el$, _v$, _p$._v$);
            _v$2 !== _p$._v$2 && (0, $9Ue0q$className)(_el$, _p$._v$2 = _v$2);
            _v$3 !== _p$._v$3 && (0, $9Ue0q$setAttribute)(_el$, "id", _p$._v$3 = _v$3);
            _v$4 !== _p$._v$4 && (0, $9Ue0q$setAttribute)(_el$3, "d", _p$._v$4 = _v$4);
            _v$5 !== _p$._v$5 && (0, $9Ue0q$setAttribute)(_el$3, "fill", _p$._v$5 = _v$5);
            return _p$;
        }, {
            _v$: undefined,
            _v$2: undefined,
            _v$3: undefined,
            _v$4: undefined,
            _v$5: undefined
        });
        return _el$;
    })();
}



const $090815f5086f7f29$var$defaults = {
    height: 20,
    amplitude: 20,
    speed: 0.15,
    points: 3
};
function $090815f5086f7f29$export$2e2bcd8739ae039(props) {
    const [local, rest] = (0, $9Ue0q$splitProps)(props, [
        "fill",
        "paused",
        "options"
    ]);
    return (0, $9Ue0q$createComponent)((0, $6719f9210d2bc6ba$export$2e2bcd8739ae039), (0, $9Ue0q$mergeProps)({
        get fill () {
            return local.fill;
        },
        get paused () {
            return local.paused;
        }
    }, $090815f5086f7f29$var$defaults, ()=>local.options, rest));
}


export {$090815f5086f7f29$export$2e2bcd8739ae039 as default};
//# sourceMappingURL=index.module.js.map
