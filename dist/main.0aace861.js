/*
MIT License

Copyright (c) 2012 - 2021 @jonobr1 / http://jono.fyi

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/ var Two = (()=>{
    var ye = Object.defineProperty;
    var Gi = Object.getOwnPropertyDescriptor;
    var Ki = Object.getOwnPropertyNames;
    var $i = Object.prototype.hasOwnProperty;
    var Ji = (i, t, e)=>t in i ? ye(i, t, {
            enumerable: !0,
            configurable: !0,
            writable: !0,
            value: e
        }) : i[t] = e;
    var Ce = (i, t)=>{
        for(var e in t)ye(i, e, {
            get: t[e],
            enumerable: !0
        });
    }, Zi = (i, t, e, s)=>{
        if (t && typeof t == "object" || typeof t == "function") for (let r of Ki(t))!$i.call(i, r) && r !== e && ye(i, r, {
            get: ()=>t[r],
            enumerable: !(s = Gi(t, r)) || s.enumerable
        });
        return i;
    };
    var Qi = (i)=>Zi(ye({}, "__esModule", {
            value: !0
        }), i);
    var v = (i, t, e)=>(Ji(i, typeof t != "symbol" ? t + "" : t, e), e);
    var $s = {};
    Ce($s, {
        default: ()=>P
    });
    var w = {
        move: "M",
        line: "L",
        curve: "C",
        arc: "A",
        close: "Z"
    };
    var Ie = {};
    Ce(Ie, {
        HALF_PI: ()=>J,
        NumArray: ()=>bt,
        TWO_PI: ()=>$,
        decomposeMatrix: ()=>Ot,
        getComputedMatrix: ()=>pt,
        getPoT: ()=>Pe,
        lerp: ()=>nt,
        mod: ()=>it,
        setMatrix: ()=>Oe,
        toFixed: ()=>K
    });
    var H;
    typeof window < "u" ? H = window : typeof global < "u" ? H = global : typeof self < "u" && (H = self);
    var li, $ = Math.PI * 2, J = Math.PI * .5;
    function Ot(i, t, e, s, r, n) {
        let a;
        return arguments.length <= 1 ? (a = i.a, t = i.b, e = i.c, s = i.d, r = i.e, n = i.f) : a = i, {
            translateX: r,
            translateY: n,
            scaleX: Math.sqrt(a * a + t * t),
            scaleY: Math.sqrt(e * e + s * s),
            rotation: 180 * Math.atan2(t, a) / Math.PI
        };
    }
    function Oe(i) {
        li = i;
    }
    function pt(i, t) {
        t = t && t.identity() || new li;
        let e = i, s = [];
        for(; e && e._matrix;)s.push(e._matrix), e = e.parent;
        s.reverse();
        for(let r = 0; r < s.length; r++){
            let a = s[r].elements;
            t.multiply(a[0], a[1], a[2], a[3], a[4], a[5], a[6], a[7], a[8], a[9]);
        }
        return t;
    }
    function nt(i, t, e) {
        return e * (t - i) + i;
    }
    var Le = [
        2,
        4,
        8,
        16,
        32,
        64,
        128,
        256,
        512,
        1024,
        2048,
        4096
    ];
    function Pe(i) {
        let t = 0;
        for(; Le[t] && Le[t] < i;)t++;
        return Le[t];
    }
    function it(i, t) {
        for(; i < 0;)i += t;
        return i % t;
    }
    var bt = H.Float32Array || Array, ts = Math.floor;
    function K(i) {
        return ts(i * 1e6) / 1e6;
    }
    var Ve = {};
    Ce(Ve, {
        Curve: ()=>Ut,
        getAnchorsFromArcData: ()=>is,
        getComponentOnCubicBezier: ()=>Wt,
        getControlPoints: ()=>ui,
        getCurveBoundingBox: ()=>Ne,
        getCurveFromPoints: ()=>je,
        getCurveLength: ()=>Be,
        getReflection: ()=>xe,
        integrate: ()=>ci,
        subdivide: ()=>re
    });
    var p = class {
        _events = {};
        _bound = !1;
        constructor(){}
        addEventListener(t, e) {
            return (this._events[t] || (this._events[t] = [])).push(e), this._bound = !0, this;
        }
        on() {
            return this.addEventListener.apply(this, arguments);
        }
        bind() {
            return this.addEventListener.apply(this, arguments);
        }
        removeEventListener(t, e) {
            if (!this._events) return this;
            if (!t && !e) return this._events = {}, this._bound = !1, this;
            let s = t ? [
                t
            ] : Object.keys(this._events);
            for(let r = 0, n = s.length; r < n; r++){
                t = s[r];
                let a = this._events[t];
                if (a) {
                    let o = [];
                    if (e) for(let h = 0, l = a.length; h < l; h++){
                        let f = a[h];
                        f = f.handler ? f.handler : f, e !== f && o.push(f);
                    }
                    this._events[t] = o;
                }
            }
            return this;
        }
        off() {
            return this.removeEventListener.apply(this, arguments);
        }
        unbind() {
            return this.removeEventListener.apply(this, arguments);
        }
        dispatchEvent(t) {
            if (!this._events) return this;
            let e = Array.prototype.slice.call(arguments, 1), s = this._events[t];
            if (s) for(let r = 0; r < s.length; r++)s[r].call(this, ...e);
            return this;
        }
        trigger() {
            return this.dispatchEvent.apply(this, arguments);
        }
        listen(t, e, s) {
            let r = this;
            t && (n.obj = t, n.name = e, n.handler = s, t.on(e, n));
            function n() {
                s.apply(r, arguments);
            }
            return r;
        }
        ignore(t, e, s) {
            return t.off(e, s), this;
        }
    };
    v(p, "Types", {
        play: "play",
        pause: "pause",
        update: "update",
        render: "render",
        resize: "resize",
        change: "change",
        remove: "remove",
        insert: "insert",
        order: "order",
        load: "load"
    }), v(p, "Methods", [
        "addEventListener",
        "on",
        "removeEventListener",
        "off",
        "unbind",
        "dispatchEvent",
        "trigger",
        "listen",
        "ignore"
    ]);
    var hi = {
        x: {
            enumerable: !0,
            get: function() {
                return this._x;
            },
            set: function(i) {
                this._x !== i && (this._x = i, this._bound && this.dispatchEvent(p.Types.change));
            }
        },
        y: {
            enumerable: !0,
            get: function() {
                return this._y;
            },
            set: function(i) {
                this._y !== i && (this._y = i, this._bound && this.dispatchEvent(p.Types.change));
            }
        }
    }, vt = class extends p {
        _x = 0;
        _y = 0;
        constructor(t = 0, e = 0){
            super();
            for(let s in hi)Object.defineProperty(this, s, hi[s]);
            this.x = t, this.y = e;
        }
        static add(t, e) {
            return new vt(t.x + e.x, t.y + e.y);
        }
        static sub(t, e) {
            return new vt(t.x - e.x, t.y - e.y);
        }
        static subtract(t, e) {
            return vt.sub(t, e);
        }
        static ratioBetween(t, e) {
            return (t.x * e.x + t.y * e.y) / (t.length() * e.length());
        }
        static angleBetween(t, e) {
            if (arguments.length >= 4) {
                let n = arguments[0] - arguments[2], a = arguments[1] - arguments[3];
                return Math.atan2(a, n);
            }
            let s = t.x - e.x, r = t.y - e.y;
            return Math.atan2(r, s);
        }
        static distanceBetween(t, e) {
            return Math.sqrt(vt.distanceBetweenSquared(t, e));
        }
        static distanceBetweenSquared(t, e) {
            let s = t.x - e.x, r = t.y - e.y;
            return s * s + r * r;
        }
        set(t, e) {
            return this.x = t, this.y = e, this;
        }
        copy(t) {
            return this.x = t.x, this.y = t.y, this;
        }
        clear() {
            return this.x = 0, this.y = 0, this;
        }
        clone() {
            return new vt(this.x, this.y);
        }
        add(t, e) {
            return arguments.length <= 0 ? this : (arguments.length <= 1 ? typeof t == "number" ? (this.x += t, this.y += t) : t && typeof t.x == "number" && typeof t.y == "number" && (this.x += t.x, this.y += t.y) : (this.x += t, this.y += e), this);
        }
        addSelf(t) {
            return this.add.apply(this, arguments);
        }
        sub(t, e) {
            return arguments.length <= 0 ? this : (arguments.length <= 1 ? typeof t == "number" ? (this.x -= t, this.y -= t) : t && typeof t.x == "number" && typeof t.y == "number" && (this.x -= t.x, this.y -= t.y) : (this.x -= t, this.y -= e), this);
        }
        subtract() {
            return this.sub.apply(this, arguments);
        }
        subSelf(t) {
            return this.sub.apply(this, arguments);
        }
        subtractSelf(t) {
            return this.sub.apply(this, arguments);
        }
        multiply(t, e) {
            return arguments.length <= 0 ? this : (arguments.length <= 1 ? typeof t == "number" ? (this.x *= t, this.y *= t) : t && typeof t.x == "number" && typeof t.y == "number" && (this.x *= t.x, this.y *= t.y) : (this.x *= t, this.y *= e), this);
        }
        multiplySelf(t) {
            return this.multiply.apply(this, arguments);
        }
        multiplyScalar(t) {
            return this.multiply(t);
        }
        divide(t, e) {
            return arguments.length <= 0 ? this : (arguments.length <= 1 ? typeof t == "number" ? (this.x /= t, this.y /= t) : t && typeof t.x == "number" && typeof t.y == "number" && (this.x /= t.x, this.y /= t.y) : (this.x /= t, this.y /= e), isNaN(this.x) && (this.x = 0), isNaN(this.y) && (this.y = 0), this);
        }
        divideSelf(t) {
            return this.divide.apply(this, arguments);
        }
        divideScalar(t) {
            return this.divide(t);
        }
        negate() {
            return this.multiply(-1);
        }
        dot(t) {
            return this.x * t.x + this.y * t.y;
        }
        length() {
            return Math.sqrt(this.lengthSquared());
        }
        lengthSquared() {
            return this.x * this.x + this.y * this.y;
        }
        normalize() {
            return this.divideScalar(this.length());
        }
        distanceTo(t) {
            return Math.sqrt(this.distanceToSquared(t));
        }
        distanceToSquared(t) {
            let e = this.x - t.x, s = this.y - t.y;
            return e * e + s * s;
        }
        setLength(t) {
            return this.normalize().multiplyScalar(t);
        }
        equals(t, e) {
            return e = typeof e > "u" ? 1e-4 : e, this.distanceTo(t) < e;
        }
        lerp(t, e) {
            let s = (t.x - this.x) * e + this.x, r = (t.y - this.y) * e + this.y;
            return this.set(s, r);
        }
        isZero(t) {
            return t = typeof t > "u" ? 1e-4 : t, this.length() < t;
        }
        toString() {
            return this.x + ", " + this.y;
        }
        toObject() {
            return {
                x: this.x,
                y: this.y
            };
        }
        rotate(t) {
            let e = this.x, s = this.y, r = Math.cos(t), n = Math.sin(t);
            return this.x = e * r - s * n, this.y = e * n + s * r, this;
        }
    }, k = vt;
    v(k, "zero", new vt), v(k, "left", new vt(-1, 0)), v(k, "right", new vt(1, 0)), v(k, "up", new vt(0, -1)), v(k, "down", new vt(0, 1));
    var F = class extends k {
        controls = {
            left: new k,
            right: new k
        };
        _command = w.move;
        _relative = !0;
        _rx = 0;
        _ry = 0;
        _xAxisRotation = 0;
        _largeArcFlag = 0;
        _sweepFlag = 1;
        constructor(t = 0, e = 0, s = 0, r = 0, n = 0, a = 0, o = w.move){
            super(t, e);
            for(let l in fi)Object.defineProperty(this, l, fi[l]);
            this.command = o, this.relative = !0;
            let h = F.makeBroadcast(this);
            this.controls.left.set(s, r).addEventListener(p.Types.change, h), this.controls.right.set(n, a).addEventListener(p.Types.change, h);
        }
        static makeBroadcast(t) {
            return e;
            function e() {
                t._bound && t.dispatchEvent(p.Types.change);
            }
        }
        copy(t) {
            return this.x = t.x, this.y = t.y, typeof t.command == "string" && (this.command = t.command), t.controls && (t.controls.left && this.controls.left.copy(t.controls.left), t.controls.right && this.controls.right.copy(t.controls.right)), typeof t.relative == "boolean" && (this.relative = t.relative), typeof t.rx == "number" && (this.rx = t.rx), typeof t.ry == "number" && (this.ry = t.ry), typeof t.xAxisRotation == "number" && (this.xAxisRotation = t.xAxisRotation), typeof t.largeArcFlag == "number" && (this.largeArcFlag = t.largeArcFlag), typeof t.sweepFlag == "number" && (this.sweepFlag = t.sweepFlag), this;
        }
        clone() {
            return new F().copy(this);
        }
        toObject() {
            return {
                x: this.x,
                y: this.y,
                command: this.command,
                relative: this.relative,
                controls: {
                    left: this.controls.left.toObject(),
                    right: this.controls.right.toObject()
                },
                rx: this.rx,
                ry: this.ry,
                xAxisRotation: this.xAxisRotation,
                largeArcFlag: this.largeArcFlag,
                sweepFlag: this.sweepFlag
            };
        }
        toString() {
            return JSON.stringify(this.toObject());
        }
    }, fi = {
        command: {
            enumerable: !0,
            get: function() {
                return this._command;
            },
            set: function(i) {
                this._command !== i && (this._command = i, this._bound && this.dispatchEvent(p.Types.change));
            }
        },
        relative: {
            enumerable: !0,
            get: function() {
                return this._relative;
            },
            set: function(i) {
                this._relative !== !!i && (this._relative = !!i, this._bound && this.dispatchEvent(p.Types.change));
            }
        },
        rx: {
            enumerable: !0,
            get: function() {
                return this._rx;
            },
            set: function(i) {
                this._rx !== i && (this._rx = i, this._bound && this.dispatchEvent(p.Types.change));
            }
        },
        ry: {
            enumerable: !0,
            get: function() {
                return this._ry;
            },
            set: function(i) {
                this._ry !== i && (this._ry = i, this._bound && this.dispatchEvent(p.Types.change));
            }
        },
        xAxisRotation: {
            enumerable: !0,
            get: function() {
                return this._xAxisRotation;
            },
            set: function(i) {
                this._xAxisRotation !== i && (this._xAxisRotation = i, this._bound && this.dispatchEvent(p.Types.change));
            }
        },
        largeArcFlag: {
            enumerable: !0,
            get: function() {
                return this._largeArcFlag;
            },
            set: function(i) {
                this._largeArcFlag !== i && (this._largeArcFlag = i, this._bound && this.dispatchEvent(p.Types.change));
            }
        },
        sweepFlag: {
            get: function() {
                return this._sweepFlag;
            },
            set: function(i) {
                this._sweepFlag !== i && (this._sweepFlag = i, this._bound && this.dispatchEvent(p.Types.change));
            }
        }
    };
    var es = 0, Y = {
        nextFrameID: null,
        Types: {
            webgl: "WebGLRenderer",
            svg: "SVGRenderer",
            canvas: "CanvasRenderer"
        },
        Version: "v0.8.11",
        PublishDate: "2023-01-30T20:34:45.639Z",
        Identifier: "two-",
        Resolution: 12,
        AutoCalculateImportedMatrices: !0,
        Instances: [],
        uniqueId: function() {
            return es++;
        }
    };
    var Ut = {
        CollinearityEpsilon: Math.pow(10, -30),
        RecursionLimit: 16,
        CuspLimit: 0,
        Tolerance: {
            distance: .25,
            angle: 0,
            epsilon: Number.EPSILON
        },
        abscissas: [
            [
                .5773502691896257
            ],
            [
                0,
                .7745966692414834
            ],
            [
                .33998104358485626,
                .8611363115940526
            ],
            [
                0,
                .5384693101056831,
                .906179845938664
            ],
            [
                .2386191860831969,
                .6612093864662645,
                .932469514203152
            ],
            [
                0,
                .4058451513773972,
                .7415311855993945,
                .9491079123427585
            ],
            [
                .1834346424956498,
                .525532409916329,
                .7966664774136267,
                .9602898564975363
            ],
            [
                0,
                .3242534234038089,
                .6133714327005904,
                .8360311073266358,
                .9681602395076261
            ],
            [
                .14887433898163122,
                .4333953941292472,
                .6794095682990244,
                .8650633666889845,
                .9739065285171717
            ],
            [
                0,
                .26954315595234496,
                .5190961292068118,
                .7301520055740494,
                .8870625997680953,
                .978228658146057
            ],
            [
                .1252334085114689,
                .3678314989981802,
                .5873179542866175,
                .7699026741943047,
                .9041172563704749,
                .9815606342467192
            ],
            [
                0,
                .2304583159551348,
                .44849275103644687,
                .6423493394403402,
                .8015780907333099,
                .9175983992229779,
                .9841830547185881
            ],
            [
                .10805494870734367,
                .31911236892788974,
                .5152486363581541,
                .6872929048116855,
                .827201315069765,
                .9284348836635735,
                .9862838086968123
            ],
            [
                0,
                .20119409399743451,
                .3941513470775634,
                .5709721726085388,
                .7244177313601701,
                .8482065834104272,
                .937273392400706,
                .9879925180204854
            ],
            [
                .09501250983763744,
                .2816035507792589,
                .45801677765722737,
                .6178762444026438,
                .755404408355003,
                .8656312023878318,
                .9445750230732326,
                .9894009349916499
            ]
        ],
        weights: [
            [
                1
            ],
            [
                .8888888888888888,
                .5555555555555556
            ],
            [
                .6521451548625461,
                .34785484513745385
            ],
            [
                .5688888888888889,
                .47862867049936647,
                .23692688505618908
            ],
            [
                .46791393457269104,
                .3607615730481386,
                .17132449237917036
            ],
            [
                .4179591836734694,
                .3818300505051189,
                .27970539148927664,
                .1294849661688697
            ],
            [
                .362683783378362,
                .31370664587788727,
                .22238103445337448,
                .10122853629037626
            ],
            [
                .3302393550012598,
                .31234707704000286,
                .26061069640293544,
                .1806481606948574,
                .08127438836157441
            ],
            [
                .29552422471475287,
                .26926671930999635,
                .21908636251598204,
                .1494513491505806,
                .06667134430868814
            ],
            [
                .2729250867779006,
                .26280454451024665,
                .23319376459199048,
                .18629021092773426,
                .1255803694649046,
                .05566856711617366
            ],
            [
                .24914704581340277,
                .2334925365383548,
                .20316742672306592,
                .16007832854334622,
                .10693932599531843,
                .04717533638651183
            ],
            [
                .2325515532308739,
                .22628318026289723,
                .2078160475368885,
                .17814598076194574,
                .13887351021978725,
                .09212149983772845,
                .04048400476531588
            ],
            [
                .2152638534631578,
                .2051984637212956,
                .18553839747793782,
                .15720316715819355,
                .12151857068790319,
                .08015808715976021,
                .03511946033175186
            ],
            [
                .2025782419255613,
                .19843148532711158,
                .1861610000155622,
                .16626920581699392,
                .13957067792615432,
                .10715922046717194,
                .07036604748810812,
                .03075324199611727
            ],
            [
                .1894506104550685,
                .18260341504492358,
                .16915651939500254,
                .14959598881657674,
                .12462897125553388,
                .09515851168249279,
                .062253523938647894,
                .027152459411754096
            ]
        ]
    };
    function Wt(i, t, e, s, r) {
        let n = 1 - i;
        return n * n * n * t + 3 * n * n * i * e + 3 * n * i * i * s + i * i * i * r;
    }
    function re(i, t, e, s, r, n, a, o, h) {
        h = h || Ut.RecursionLimit;
        let l = h + 1;
        if (Math.abs(i - a) < .001 && Math.abs(t - o) < .001) return [
            new F(a, o)
        ];
        let f = [];
        for(let u = 0; u < l; u++){
            let _ = u / l, d = Wt(_, i, e, r, a), c = Wt(_, t, s, n, o);
            f.push(new F(d, c));
        }
        return f;
    }
    function Be(i, t, e, s, r, n, a, o, h) {
        if (i === e && t === s && r === a && n === o) {
            let b = a - i, g = o - t;
            return Math.sqrt(b * b + g * g);
        }
        let l = 9 * (e - r) + 3 * (a - i), f = 6 * (i + r) - 12 * e, u = 3 * (e - i), _ = 9 * (s - n) + 3 * (o - t), d = 6 * (t + n) - 12 * s, c = 3 * (s - t);
        function m(b) {
            let g = (l * b + f) * b + u, y = (_ * b + d) * b + c;
            return Math.sqrt(g * g + y * y);
        }
        return ci(m, 0, 1, h || Ut.RecursionLimit);
    }
    function Ne(i, t, e, s, r, n, a, o) {
        let h = [], l = [
            [],
            []
        ], f, u, _, d, c, m, b, g;
        for(let A = 0; A < 2; ++A){
            if (A == 0 ? (u = 6 * i - 12 * e + 6 * r, f = -3 * i + 9 * e - 9 * r + 3 * a, _ = 3 * e - 3 * i) : (u = 6 * t - 12 * s + 6 * n, f = -3 * t + 9 * s - 9 * n + 3 * o, _ = 3 * s - 3 * t), Math.abs(f) < 1e-12) {
                if (Math.abs(u) < 1e-12) continue;
                d = -_ / u, 0 < d && d < 1 && h.push(d);
                continue;
            }
            b = u * u - 4 * _ * f, g = Math.sqrt(b), !(b < 0) && (c = (-u + g) / (2 * f), 0 < c && c < 1 && h.push(c), m = (-u - g) / (2 * f), 0 < m && m < 1 && h.push(m));
        }
        let y = h.length, x = y, S;
        for(; y--;)d = h[y], S = 1 - d, l[0][y] = S * S * S * i + 3 * S * S * d * e + 3 * S * d * d * r + d * d * d * a, l[1][y] = S * S * S * t + 3 * S * S * d * s + 3 * S * d * d * n + d * d * d * o;
        return l[0][x] = i, l[1][x] = t, l[0][x + 1] = a, l[1][x + 1] = o, l[0].length = l[1].length = x + 2, {
            min: {
                x: Math.min.apply(0, l[0]),
                y: Math.min.apply(0, l[1])
            },
            max: {
                x: Math.max.apply(0, l[0]),
                y: Math.max.apply(0, l[1])
            }
        };
    }
    function ci(i, t, e, s) {
        let r = Ut.abscissas[s - 2], n = Ut.weights[s - 2], a = .5 * (e - t), o = a + t, h = 0, l = s + 1 >> 1, f = s & 1 ? n[h++] * i(o) : 0;
        for(; h < l;){
            let u = a * r[h];
            f += n[h++] * (i(o + u) + i(o - u));
        }
        return a * f;
    }
    function je(i, t) {
        let e = i.length, s = e - 1;
        for(let r = 0; r < e; r++){
            let n = i[r], a = t ? it(r - 1, e) : Math.max(r - 1, 0), o = t ? it(r + 1, e) : Math.min(r + 1, s), h = i[a], l = n, f = i[o];
            ui(h, l, f), l.command = r === 0 ? w.move : w.curve;
        }
    }
    function ui(i, t, e) {
        let s = k.angleBetween(i, t), r = k.angleBetween(e, t), n = k.distanceBetween(i, t), a = k.distanceBetween(e, t), o = (s + r) / 2;
        return n < 1e-4 || a < 1e-4 ? (typeof t.relative == "boolean" && !t.relative && (t.controls.left.copy(t), t.controls.right.copy(t)), t) : (n *= .33, a *= .33, r < s ? o += J : o -= J, t.controls.left.x = Math.cos(o) * n, t.controls.left.y = Math.sin(o) * n, o -= Math.PI, t.controls.right.x = Math.cos(o) * a, t.controls.right.y = Math.sin(o) * a, typeof t.relative == "boolean" && !t.relative && (t.controls.left.x += t.x, t.controls.left.y += t.y, t.controls.right.x += t.x, t.controls.right.y += t.y), t);
    }
    function xe(i, t, e) {
        return new k(2 * i.x - (t.x + i.x) - (e ? i.x : 0), 2 * i.y - (t.y + i.y) - (e ? i.y : 0));
    }
    function is(i, t, e, s, r, n, a) {
        let o = Y.Resolution, h = [];
        for(let l = 0; l < o; l++){
            let f = (l + 1) / o;
            a && (f = 1 - f);
            let u = f * n + r, _ = e * Math.cos(u), d = s * Math.sin(u), c = new F(_, d);
            c.command = w.line, h.push(c);
        }
    }
    var ss = H.devicePixelRatio || 1;
    function rs(i) {
        return i.webkitBackingStorePixelRatio || i.mozBackingStorePixelRatio || i.msBackingStorePixelRatio || i.oBackingStorePixelRatio || i.backingStorePixelRatio || 1;
    }
    function Xt(i) {
        return ss / rs(i);
    }
    var di = Array.prototype.slice;
    function ns(i) {
        if (i == null) return !1;
        let t = i.length;
        return typeof t == "number" && t >= 0 && t < 4294967296;
    }
    var R = {
        isNaN: function(i) {
            return typeof i == "number" && i !== +i;
        },
        isElement: function(i) {
            return !!(i && i.nodeType === 1);
        },
        isObject: function(i) {
            let t = typeof i;
            return t === "function" || t === "object" && !!i;
        },
        extend: function(i) {
            let t = di.call(arguments, 1);
            for(let e = 0; e < t.length; e++){
                let s = t[e];
                for(let r in s)i[r] = s[r];
            }
            return i;
        },
        defaults: function(i) {
            let t = di.call(arguments, 1);
            for(let e = 0; e < t.length; e++){
                let s = t[e];
                for(let r in s)i[r] === void 0 && (i[r] = s[r]);
            }
            return i;
        },
        each: function(i, t, e) {
            let s = e || this, r = !ns(i) && Object.keys(i), n = (r || i).length;
            for(let a = 0; a < n; a++){
                let o = r ? r[a] : a;
                t.call(s, i[o], o, i);
            }
            return i;
        },
        performance: H.performance && H.performance.now ? H.performance : Date
    };
    var Rt = class extends p {
        _flagId = !1;
        _flagClassName = !1;
        _renderer = {};
        _id = "";
        _className = "";
        classList = [];
        constructor(){
            super();
            for(let t in _i)Object.defineProperty(this, t, _i[t]);
        }
        flagReset() {
            this._flagId = this._flagClassName = !1;
        }
    }, _i = {
        renderer: {
            enumerable: !1,
            get: function() {
                return this._renderer;
            }
        },
        id: {
            enumerable: !0,
            get: function() {
                return this._id;
            },
            set: function(i) {
                let t = this._id;
                i !== this._id && (this._id = i, this._flagId = !0, this.parent && (delete this.parent.children.ids[t], this.parent.children.ids[this._id] = this));
            }
        },
        className: {
            enumerable: !0,
            get: function() {
                return this._className;
            },
            set: function(i) {
                this._className !== i && (this._flagClassName = !0, this.classList = i.split(/\s+?/), this._className = i);
            }
        }
    };
    var as = Math.cos, os = Math.sin, gi = Math.tan, ze = [], mt = class extends p {
        elements = new bt(9);
        manual = !1;
        constructor(t, e, s, r, n, a){
            super();
            let o = t;
            Array.isArray(o) || (o = Array.prototype.slice.call(arguments)), this.identity(), o.length > 0 && this.set(o);
        }
        static Multiply(t, e, s) {
            if (e.length <= 3) {
                let E = t, C, N, M, T = e[0] || 0, j = e[1] || 0, z = e[2] || 0;
                return C = E[0] * T + E[1] * j + E[2] * z, N = E[3] * T + E[4] * j + E[5] * z, M = E[6] * T + E[7] * j + E[8] * z, {
                    x: C,
                    y: N,
                    z: M
                };
            }
            let r = t[0], n = t[1], a = t[2], o = t[3], h = t[4], l = t[5], f = t[6], u = t[7], _ = t[8], d = e[0], c = e[1], m = e[2], b = e[3], g = e[4], y = e[5], x = e[6], S = e[7], A = e[8];
            return s = s || new bt(9), s[0] = r * d + n * b + a * x, s[1] = r * c + n * g + a * S, s[2] = r * m + n * y + a * A, s[3] = o * d + h * b + l * x, s[4] = o * c + h * g + l * S, s[5] = o * m + h * y + l * A, s[6] = f * d + u * b + _ * x, s[7] = f * c + u * g + _ * S, s[8] = f * m + u * y + _ * A, s;
        }
        set(t, e, s, r, n, a, o, h, l) {
            if (typeof e > "u") {
                let f = t;
                t = f[0], e = f[1], s = f[2], r = f[3], n = f[4], a = f[5], o = f[6], h = f[7], l = f[8];
            }
            return this.elements[0] = t, this.elements[1] = e, this.elements[2] = s, this.elements[3] = r, this.elements[4] = n, this.elements[5] = a, this.elements[6] = o, this.elements[7] = h, this.elements[8] = l, this.trigger(p.Types.change);
        }
        copy(t) {
            return this.elements[0] = t.elements[0], this.elements[1] = t.elements[1], this.elements[2] = t.elements[2], this.elements[3] = t.elements[3], this.elements[4] = t.elements[4], this.elements[5] = t.elements[5], this.elements[6] = t.elements[6], this.elements[7] = t.elements[7], this.elements[8] = t.elements[8], this.manual = t.manual, this.trigger(p.Types.change);
        }
        identity() {
            return this.elements[0] = mt.Identity[0], this.elements[1] = mt.Identity[1], this.elements[2] = mt.Identity[2], this.elements[3] = mt.Identity[3], this.elements[4] = mt.Identity[4], this.elements[5] = mt.Identity[5], this.elements[6] = mt.Identity[6], this.elements[7] = mt.Identity[7], this.elements[8] = mt.Identity[8], this.trigger(p.Types.change);
        }
        multiply(t, e, s, r, n, a, o, h, l) {
            if (typeof e > "u") return this.elements[0] *= t, this.elements[1] *= t, this.elements[2] *= t, this.elements[3] *= t, this.elements[4] *= t, this.elements[5] *= t, this.elements[6] *= t, this.elements[7] *= t, this.elements[8] *= t, this.trigger(p.Types.change);
            if (typeof r > "u") {
                t = t || 0, e = e || 0, s = s || 0, n = this.elements;
                let V = n[0] * t + n[1] * e + n[2] * s, ut = n[3] * t + n[4] * e + n[5] * s, dt = n[6] * t + n[7] * e + n[8] * s;
                return {
                    x: V,
                    y: ut,
                    z: dt
                };
            }
            let f = this.elements, u = [
                t,
                e,
                s,
                r,
                n,
                a,
                o,
                h,
                l
            ], _ = f[0], d = f[1], c = f[2], m = f[3], b = f[4], g = f[5], y = f[6], x = f[7], S = f[8], A = u[0], E = u[1], C = u[2], N = u[3], M = u[4], T = u[5], j = u[6], z = u[7], X = u[8];
            return this.elements[0] = _ * A + d * N + c * j, this.elements[1] = _ * E + d * M + c * z, this.elements[2] = _ * C + d * T + c * X, this.elements[3] = m * A + b * N + g * j, this.elements[4] = m * E + b * M + g * z, this.elements[5] = m * C + b * T + g * X, this.elements[6] = y * A + x * N + S * j, this.elements[7] = y * E + x * M + S * z, this.elements[8] = y * C + x * T + S * X, this.trigger(p.Types.change);
        }
        inverse(t) {
            let e = this.elements;
            t = t || new mt;
            let s = e[0], r = e[1], n = e[2], a = e[3], o = e[4], h = e[5], l = e[6], f = e[7], u = e[8], _ = u * o - h * f, d = -u * a + h * l, c = f * a - o * l, m = s * _ + r * d + n * c;
            return m ? (m = 1 / m, t.elements[0] = _ * m, t.elements[1] = (-u * r + n * f) * m, t.elements[2] = (h * r - n * o) * m, t.elements[3] = d * m, t.elements[4] = (u * s - n * l) * m, t.elements[5] = (-h * s + n * a) * m, t.elements[6] = c * m, t.elements[7] = (-f * s + r * l) * m, t.elements[8] = (o * s - r * a) * m, t) : null;
        }
        scale(t, e) {
            return arguments.length <= 1 && (e = t), this.multiply(t, 0, 0, 0, e, 0, 0, 0, 1);
        }
        rotate(t) {
            let e = as(t), s = os(t);
            return this.multiply(e, -s, 0, s, e, 0, 0, 0, 1);
        }
        translate(t, e) {
            return this.multiply(1, 0, t, 0, 1, e, 0, 0, 1);
        }
        skewX(t) {
            let e = gi(t);
            return this.multiply(1, e, 0, 0, 1, 0, 0, 0, 1);
        }
        skewY(t) {
            let e = gi(t);
            return this.multiply(1, 0, 0, e, 1, 0, 0, 0, 1);
        }
        toString(t) {
            return ze.length = 0, this.toTransformArray(t, ze), ze.map(K).join(" ");
        }
        toTransformArray(t, e) {
            let s = this.elements, r = !!e, n = s[0], a = s[1], o = s[2], h = s[3], l = s[4], f = s[5];
            if (t) {
                let u = s[6], _ = s[7], d = s[8];
                if (r) {
                    e[0] = n, e[1] = h, e[2] = u, e[3] = a, e[4] = l, e[5] = _, e[6] = o, e[7] = f, e[8] = d;
                    return;
                }
                return [
                    n,
                    h,
                    u,
                    a,
                    l,
                    _,
                    o,
                    f,
                    d
                ];
            }
            if (r) {
                e[0] = n, e[1] = h, e[2] = a, e[3] = l, e[4] = o, e[5] = f;
                return;
            }
            return [
                n,
                h,
                a,
                l,
                o,
                f
            ];
        }
        toArray(t, e) {
            let s = this.elements, r = !!e, n = s[0], a = s[1], o = s[2], h = s[3], l = s[4], f = s[5];
            if (t) {
                let u = s[6], _ = s[7], d = s[8];
                if (r) {
                    e[0] = n, e[1] = a, e[2] = o, e[3] = h, e[4] = l, e[5] = f, e[6] = u, e[7] = _, e[8] = d;
                    return;
                }
                return [
                    n,
                    a,
                    o,
                    h,
                    l,
                    f,
                    u,
                    _,
                    d
                ];
            }
            if (r) {
                e[0] = n, e[1] = a, e[2] = o, e[3] = h, e[4] = l, e[5] = f;
                return;
            }
            return [
                n,
                a,
                o,
                h,
                l,
                f
            ];
        }
        toObject() {
            return {
                elements: this.toArray(!0),
                manual: !!this.manual
            };
        }
        clone() {
            return new mt().copy(this);
        }
    }, at = mt;
    v(at, "Identity", [
        1,
        0,
        0,
        0,
        1,
        0,
        0,
        0,
        1
    ]);
    Oe(at);
    var ot = class extends Rt {
        _flagMatrix = !0;
        _flagScale = !1;
        _matrix = null;
        _worldMatrix = null;
        _position = null;
        _rotation = 0;
        _scale = 1;
        _skewX = 0;
        _skewY = 0;
        constructor(){
            super();
            for(let t in be)Object.defineProperty(this, t, be[t]);
            this._renderer.flagMatrix = pi.bind(this), this.isShape = !0, this.id = Y.Identifier + Y.uniqueId(), this.matrix = new at, this.worldMatrix = new at, this.position = new k, this.rotation = 0, this.scale = 1, this.skewX = 0, this.skewY = 0;
        }
        get renderer() {
            return this._renderer;
        }
        set renderer(t) {
            this._renderer = t;
        }
        get translation() {
            return be.position.get.apply(this, arguments);
        }
        set translation(t) {
            be.position.set.apply(this, arguments);
        }
        addTo(t) {
            return t.add(this), this;
        }
        remove() {
            return this.parent ? (this.parent.remove(this), this) : this;
        }
        clone(t) {
            let e = new ot;
            return e.position.copy(this.position), e.rotation = this.rotation, e.scale = this.scale, e.skewX = this.skewX, e.skewY = this.skewY, this.matrix.manual && e.matrix.copy(this.matrix), t && t.add(e), e._update();
        }
        _update(t) {
            return !this._matrix.manual && this._flagMatrix && (this._matrix.identity().translate(this.position.x, this.position.y), this._scale instanceof k ? this._matrix.scale(this._scale.x, this._scale.y) : this._matrix.scale(this._scale), this._matrix.rotate(this.rotation), this._matrix.skewX(this.skewX), this._matrix.skewY(this.skewY)), t && this.parent && this.parent._update && this.parent._update(), this;
        }
        flagReset() {
            return this._flagMatrix = this._flagScale = !1, super.flagReset.call(this), this;
        }
    }, be = {
        position: {
            enumerable: !0,
            get: function() {
                return this._position;
            },
            set: function(i) {
                this._position && this._position.unbind(p.Types.change, this._renderer.flagMatrix), this._position = i, this._position.bind(p.Types.change, this._renderer.flagMatrix), pi.call(this);
            }
        },
        rotation: {
            enumerable: !0,
            get: function() {
                return this._rotation;
            },
            set: function(i) {
                this._rotation = i, this._flagMatrix = !0;
            }
        },
        scale: {
            enumerable: !0,
            get: function() {
                return this._scale;
            },
            set: function(i) {
                this._scale instanceof k && this._scale.unbind(p.Types.change, this._renderer.flagMatrix), this._scale = i, this._scale instanceof k && this._scale.bind(p.Types.change, this._renderer.flagMatrix), this._flagMatrix = !0, this._flagScale = !0;
            }
        },
        skewX: {
            enumerable: !0,
            get: function() {
                return this._skewX;
            },
            set: function(i) {
                this._skewX = i, this._flagMatrix = !0;
            }
        },
        skewY: {
            enumerable: !0,
            get: function() {
                return this._skewY;
            },
            set: function(i) {
                this._skewY = i, this._flagMatrix = !0;
            }
        },
        matrix: {
            enumerable: !0,
            get: function() {
                return this._matrix;
            },
            set: function(i) {
                this._matrix = i, this._flagMatrix = !0;
            }
        },
        worldMatrix: {
            enumerable: !0,
            get: function() {
                return pt(this, this._worldMatrix), this._worldMatrix;
            },
            set: function(i) {
                this._worldMatrix = i;
            }
        }
    };
    function pi() {
        this._flagMatrix = !0;
    }
    var lt = class extends Array {
        _events = new p;
        get _bound() {
            return this._events._bound;
        }
        set _bound(t) {
            this._events._bound = t;
        }
        addEventListener() {
            return this._events.addEventListener.apply(this, arguments);
        }
        on() {
            return this._events.on.apply(this, arguments);
        }
        bind() {
            return this._events.bind.apply(this, arguments);
        }
        removeEventListener() {
            return this._events.removeEventListener.apply(this, arguments);
        }
        off() {
            return this._events.off.apply(this, arguments);
        }
        unbind() {
            return this._events.unbind.apply(this, arguments);
        }
        dispatchEvent() {
            return this._events.dispatchEvent.apply(this, arguments);
        }
        trigger() {
            return this._events.trigger.apply(this, arguments);
        }
        listen() {
            return this._events.listen.apply(this, arguments);
        }
        ignore() {
            return this._events.ignore.apply(this, arguments);
        }
        constructor(){
            super(), arguments[0] && Array.isArray(arguments[0]) ? arguments[0].length > 0 && this.push.apply(this, arguments[0]) : arguments.length > 0 && this.push.apply(this, arguments);
        }
        pop() {
            let t = super.pop.apply(this, arguments);
            return this.trigger(p.Types.remove, [
                t
            ]), t;
        }
        shift() {
            let t = super.shift.apply(this, arguments);
            return this.trigger(p.Types.remove, [
                t
            ]), t;
        }
        push() {
            let t = super.push.apply(this, arguments);
            return this.trigger(p.Types.insert, arguments), t;
        }
        unshift() {
            let t = super.unshift.apply(this, arguments);
            return this.trigger(p.Types.insert, arguments), t;
        }
        splice() {
            let t = super.splice.apply(this, arguments);
            if (this.trigger(p.Types.remove, t), arguments.length > 2) {
                let e = this.slice(arguments[0], arguments[0] + arguments.length - 2);
                this.trigger(p.Types.insert, e), this.trigger(p.Types.order);
            }
            return t;
        }
        sort() {
            return super.sort.apply(this, arguments), this.trigger(p.Types.order), this;
        }
        reverse() {
            return super.reverse.apply(this, arguments), this.trigger(p.Types.order), this;
        }
        indexOf() {
            return super.indexOf.apply(this, arguments);
        }
        map(t, e) {
            let s = [];
            for(let r = 0; r < this.length; r++){
                let n = this[r], a;
                e ? a = t.call(e, n, r) : a = t(n, r), s.push(a);
            }
            return s;
        }
    };
    var ne = class extends lt {
        ids = {};
        constructor(t){
            t = Array.isArray(t) ? t : Array.prototype.slice.call(arguments), super(t), this.attach(t), this.on(p.Types.insert, this.attach), this.on(p.Types.remove, this.detach);
        }
        attach(t) {
            for(let e = 0; e < t.length; e++){
                let s = t[e];
                s && s.id && (this.ids[s.id] = s);
            }
            return this;
        }
        detach(t) {
            for(let e = 0; e < t.length; e++)delete this.ids[t[e].id];
            return this;
        }
    };
    var ve = Math.min, we = Math.max, Ue = class extends ot {
        _flagAdditions = !1;
        _flagSubtractions = !1;
        _flagOrder = !1;
        _flagOpacity = !0;
        _flagBeginning = !1;
        _flagEnding = !1;
        _flagLength = !1;
        _flagMask = !1;
        _fill = "#fff";
        _stroke = "#000";
        _linewidth = 1;
        _opacity = 1;
        _visible = !0;
        _cap = "round";
        _join = "round";
        _miter = 4;
        _closed = !0;
        _curved = !1;
        _automatic = !0;
        _beginning = 0;
        _ending = 1;
        _length = 0;
        _mask = null;
        constructor(t){
            super();
            for(let e in mi)Object.defineProperty(this, e, mi[e]);
            this._renderer.type = "group", this.additions = [], this.subtractions = [], this.children = Array.isArray(t) ? t : Array.prototype.slice.call(arguments);
        }
        static InsertChildren(t) {
            for(let e = 0; e < t.length; e++)yi.call(this, t[e], this);
        }
        static RemoveChildren(t) {
            for(let e = 0; e < t.length; e++)yi.call(this, t[e]);
        }
        static OrderChildren(t) {
            this._flagOrder = !0;
        }
        clone(t) {
            let e = new Ue, s = this.children.map(function(r) {
                return r.clone();
            });
            return e.add(s), e.opacity = this.opacity, this.mask && (e.mask = this.mask), e.translation.copy(this.translation), e.rotation = this.rotation, e.scale = this.scale, e.className = this.className, this.matrix.manual && e.matrix.copy(this.matrix), t && t.add(e), e._update();
        }
        toObject() {
            let t = {
                children: [],
                translation: this.translation.toObject(),
                rotation: this.rotation,
                scale: this.scale instanceof k ? this.scale.toObject() : this.scale,
                opacity: this.opacity,
                className: this.className,
                mask: this.mask ? this.mask.toObject() : null
            };
            return this.matrix.manual && (t.matrix = this.matrix.toObject()), R.each(this.children, function(e, s) {
                t.children[s] = e.toObject();
            }, this), t;
        }
        corner() {
            let t = this.getBoundingClientRect(!0);
            for(let e = 0; e < this.children.length; e++){
                let s = this.children[e];
                s.translation.x -= t.left, s.translation.y -= t.top;
            }
            return this.mask && (this.mask.translation.x -= t.left, this.mask.translation.y -= t.top), this;
        }
        center() {
            let t = this.getBoundingClientRect(!0), e = t.left + t.width / 2 - this.translation.x, s = t.top + t.height / 2 - this.translation.y;
            for(let r = 0; r < this.children.length; r++){
                let n = this.children[r];
                n.isShape && (n.translation.x -= e, n.translation.y -= s);
            }
            return this.mask && (this.mask.translation.x -= e, this.mask.translation.y -= s), this;
        }
        getById(t) {
            let e = null;
            function s(r) {
                if (r.id === t) return r;
                if (r.children) {
                    for(let n = 0; n < r.children.length; n++)if (e = s(r.children[n]), e) return e;
                }
                return null;
            }
            return s(this);
        }
        getByClassName(t) {
            let e = [];
            function s(r) {
                if (Array.prototype.indexOf.call(r.classList, t) >= 0 && e.push(r), r.children) for(let n = 0; n < r.children.length; n++){
                    let a = r.children[n];
                    s(a);
                }
                return e;
            }
            return s(this);
        }
        getByType(t) {
            let e = [];
            function s(r) {
                if (r instanceof t && e.push(r), r.children) for(let n = 0; n < r.children.length; n++){
                    let a = r.children[n];
                    s(a);
                }
                return e;
            }
            return s(this);
        }
        add(t) {
            t instanceof Array ? t = t.slice() : t = Array.prototype.slice.call(arguments);
            for(let e = 0; e < t.length; e++){
                let s = t[e];
                if (!(s && s.id)) continue;
                let r = Array.prototype.indexOf.call(this.children, s);
                r >= 0 && this.children.splice(r, 1), this.children.push(s);
            }
            return this;
        }
        remove(t) {
            let e = arguments.length, s = this.parent;
            if (e <= 0 && s) return s.remove(this), this;
            t instanceof Array ? t = t.slice() : t = Array.prototype.slice.call(arguments);
            for(let r = 0; r < t.length; r++){
                let n = t[r];
                if (!n || !this.children.ids[n.id]) continue;
                let a = this.children.indexOf(n);
                a >= 0 && this.children.splice(a, 1);
            }
            return this;
        }
        getBoundingClientRect(t) {
            let e, s, r, n, a, o, h, l, f, u;
            this._update(!0);
            let _ = 1 / 0, d = -1 / 0, c = 1 / 0, m = -1 / 0, b = /texture|gradient/i;
            s = t ? this._matrix : pt(this);
            for(let g = 0; g < this.children.length; g++){
                let y = this.children[g];
                !y.visible || b.test(y._renderer.type) || (e = y.getBoundingClientRect(t), h = typeof e.top != "number" || R.isNaN(e.top) || !isFinite(e.top), l = typeof e.left != "number" || R.isNaN(e.left) || !isFinite(e.left), f = typeof e.right != "number" || R.isNaN(e.right) || !isFinite(e.right), u = typeof e.bottom != "number" || R.isNaN(e.bottom) || !isFinite(e.bottom), !(h || l || f || u) && (c = ve(e.top, c), _ = ve(e.left, _), d = we(e.right, d), m = we(e.bottom, m)));
            }
            return t && (r = s.multiply(_, c, 1), n = s.multiply(_, m, 1), a = s.multiply(d, c, 1), o = s.multiply(d, m, 1), c = ve(r.y, n.y, a.y, o.y), _ = ve(r.x, n.x, a.x, o.x), d = we(r.x, n.x, a.x, o.x), m = we(r.y, n.y, a.y, o.y)), {
                top: c,
                left: _,
                right: d,
                bottom: m,
                width: d - _,
                height: m - c
            };
        }
        noFill() {
            return this.children.forEach(function(t) {
                t.noFill();
            }), this;
        }
        noStroke() {
            return this.children.forEach(function(t) {
                t.noStroke();
            }), this;
        }
        subdivide() {
            let t = arguments;
            return this.children.forEach(function(e) {
                e.subdivide.apply(e, t);
            }), this;
        }
        _update() {
            let t, e, s;
            if (this._flagBeginning || this._flagEnding) {
                let r = Math.min(this._beginning, this._ending), n = Math.max(this._beginning, this._ending), a = this.length, o = 0, h = r * a, l = n * a;
                for(t = 0; t < this.children.length; t++)s = this.children[t], e = s.length, h > o + e ? (s.beginning = 1, s.ending = 1) : l < o ? (s.beginning = 0, s.ending = 0) : h > o && h < o + e ? (s.beginning = (h - o) / e, s.ending = 1) : l > o && l < o + e ? (s.beginning = 0, s.ending = (l - o) / e) : (s.beginning = 0, s.ending = 1), o += e;
            }
            return super._update.apply(this, arguments);
        }
        flagReset() {
            return this._flagAdditions && (this.additions.length = 0, this._flagAdditions = !1), this._flagSubtractions && (this.subtractions.length = 0, this._flagSubtractions = !1), this._flagOrder = this._flagMask = this._flagOpacity = this._flagBeginning = this._flagEnding = !1, super.flagReset.call(this), this;
        }
    }, q = Ue;
    v(q, "Children", ne), v(q, "Properties", [
        "fill",
        "stroke",
        "linewidth",
        "cap",
        "join",
        "miter",
        "closed",
        "curved",
        "automatic"
    ]);
    var mi = {
        visible: {
            enumerable: !0,
            get: function() {
                return this._visible;
            },
            set: function(i) {
                this._flagVisible = this._visible !== i || this._flagVisible, this._visible = i;
            }
        },
        opacity: {
            enumerable: !0,
            get: function() {
                return this._opacity;
            },
            set: function(i) {
                this._flagOpacity = this._opacity !== i || this._flagOpacity, this._opacity = i;
            }
        },
        beginning: {
            enumerable: !0,
            get: function() {
                return this._beginning;
            },
            set: function(i) {
                this._flagBeginning = this._beginning !== i || this._flagBeginning, this._beginning = i;
            }
        },
        ending: {
            enumerable: !0,
            get: function() {
                return this._ending;
            },
            set: function(i) {
                this._flagEnding = this._ending !== i || this._flagEnding, this._ending = i;
            }
        },
        length: {
            enumerable: !0,
            get: function() {
                if (this._flagLength || this._length <= 0) {
                    if (this._length = 0, !this.children) return this._length;
                    for(let i = 0; i < this.children.length; i++){
                        let t = this.children[i];
                        this._length += t.length;
                    }
                }
                return this._length;
            }
        },
        fill: {
            enumerable: !0,
            get: function() {
                return this._fill;
            },
            set: function(i) {
                this._fill = i;
                for(let t = 0; t < this.children.length; t++){
                    let e = this.children[t];
                    e.fill = i;
                }
            }
        },
        stroke: {
            enumerable: !0,
            get: function() {
                return this._stroke;
            },
            set: function(i) {
                this._stroke = i;
                for(let t = 0; t < this.children.length; t++){
                    let e = this.children[t];
                    e.stroke = i;
                }
            }
        },
        linewidth: {
            enumerable: !0,
            get: function() {
                return this._linewidth;
            },
            set: function(i) {
                this._linewidth = i;
                for(let t = 0; t < this.children.length; t++){
                    let e = this.children[t];
                    e.linewidth = i;
                }
            }
        },
        join: {
            enumerable: !0,
            get: function() {
                return this._join;
            },
            set: function(i) {
                this._join = i;
                for(let t = 0; t < this.children.length; t++){
                    let e = this.children[t];
                    e.join = i;
                }
            }
        },
        miter: {
            enumerable: !0,
            get: function() {
                return this._miter;
            },
            set: function(i) {
                this._miter = i;
                for(let t = 0; t < this.children.length; t++){
                    let e = this.children[t];
                    e.miter = i;
                }
            }
        },
        cap: {
            enumerable: !0,
            get: function() {
                return this._cap;
            },
            set: function(i) {
                this._cap = i;
                for(let t = 0; t < this.children.length; t++){
                    let e = this.children[t];
                    e.cap = i;
                }
            }
        },
        closed: {
            enumerable: !0,
            get: function() {
                return this._closed;
            },
            set: function(i) {
                this._closed = i;
                for(let t = 0; t < this.children.length; t++){
                    let e = this.children[t];
                    e.closed = i;
                }
            }
        },
        curved: {
            enumerable: !0,
            get: function() {
                return this._curved;
            },
            set: function(i) {
                this._curved = i;
                for(let t = 0; t < this.children.length; t++){
                    let e = this.children[t];
                    e.curved = i;
                }
            }
        },
        automatic: {
            enumerable: !0,
            get: function() {
                return this._automatic;
            },
            set: function(i) {
                this._automatic = i;
                for(let t = 0; t < this.children.length; t++){
                    let e = this.children[t];
                    e.automatic = i;
                }
            }
        },
        children: {
            enumerable: !0,
            get: function() {
                return this._children;
            },
            set: function(i) {
                let t = q.InsertChildren.bind(this), e = q.RemoveChildren.bind(this), s = q.OrderChildren.bind(this);
                this._children && (this._children.unbind(), this._children.length > 0 && e(this._children)), this._children = new ne(i), this._children.bind(p.Types.insert, t), this._children.bind(p.Types.remove, e), this._children.bind(p.Types.order, s), i.length > 0 && t(i);
            }
        },
        mask: {
            enumerable: !0,
            get: function() {
                return this._mask;
            },
            set: function(i) {
                this._mask = i, this._flagMask = !0, R.isObject(i) && !i.clip && (i.clip = !0);
            }
        }
    };
    function yi(i, t) {
        let e = i.parent, s;
        if (e === t) {
            r();
            return;
        }
        if (e && e.children.ids[i.id] && (s = Array.prototype.indexOf.call(e.children, i), e.children.splice(s, 1), n()), t) {
            r();
            return;
        }
        n(), e._flagAdditions && e.additions.length === 0 && (e._flagAdditions = !1), e._flagSubtractions && e.subtractions.length === 0 && (e._flagSubtractions = !1), delete i.parent;
        function r() {
            t.subtractions.length > 0 && (s = Array.prototype.indexOf.call(t.subtractions, i), s >= 0 && t.subtractions.splice(s, 1)), t.additions.length > 0 && (s = Array.prototype.indexOf.call(t.additions, i), s >= 0 && t.additions.splice(s, 1)), i.parent = t, t.additions.push(i), t._flagAdditions = !0;
        }
        function n() {
            s = Array.prototype.indexOf.call(e.additions, i), s >= 0 && e.additions.splice(s, 1), s = Array.prototype.indexOf.call(e.subtractions, i), s < 0 && (e.subtractions.push(i), e._flagSubtractions = !0);
        }
    }
    var xi = new at, De = [], He = Math.max, ls = Math.min, bi = Math.abs, ke = Math.sin, Ae = Math.cos, hs = Math.acos, Re = Math.sqrt, tt = {
        isHidden: /(undefined|none|transparent)/i,
        alignments: {
            left: "start",
            middle: "center",
            right: "end"
        },
        shim: function(i, t) {
            return i.tagName = i.nodeName = t || "canvas", i.nodeType = 1, i.getAttribute = function(e) {
                return this[e];
            }, i.setAttribute = function(e, s) {
                return this[e] = s, this;
            }, i;
        },
        group: {
            renderChild: function(i) {
                tt[i._renderer.type].render.call(i, this.ctx, !0, this.clip);
            },
            render: function(i) {
                if (!this._visible) return this;
                this._update();
                let t = this._matrix.elements, e = this.parent;
                this._renderer.opacity = this._opacity * (e && e._renderer ? e._renderer.opacity : 1);
                let s = this._mask, r = Se(t), n = !r || !!s;
                if (this._renderer.context || (this._renderer.context = {}), this._renderer.context.ctx = i, n && (i.save(), r || i.transform(t[0], t[3], t[1], t[4], t[2], t[5])), s && tt[s._renderer.type].render.call(s, i, !0), this._opacity > 0 && this._scale !== 0) for(let a = 0; a < this.children.length; a++){
                    let o = this.children[a];
                    tt[o._renderer.type].render.call(o, i);
                }
                return n && i.restore(), this.flagReset();
            }
        },
        path: {
            render: function(i, t, e) {
                let s, r, n, a, o, h, l, f, u, _, d, c, m, b, g, y, x, S, A, E, C, N, M, T, j, z, X, V, ut, dt, Z, _t, rt, Tt;
                if (Tt = this.parent && this.parent._renderer ? this.parent._renderer.opacity : 1, ut = this._mask, dt = this._clip, o = this._opacity * (Tt || 1), h = this._visible, !t && (!h || dt || o === 0)) return this;
                this._update(), s = this._matrix.elements, r = this._stroke, n = this._linewidth, a = this._fill, l = this._cap, f = this._join, u = this._miter, _ = this._closed, d = this._renderer.vertices, c = d.length, m = c - 1, Z = Se(s), rt = this.dashes, Z || (i.save(), i.transform(s[0], s[3], s[1], s[4], s[2], s[5])), ut && tt[ut._renderer.type].render.call(ut, i, !0), a && (typeof a == "string" ? i.fillStyle = a : (tt[a._renderer.type].render.call(a, i, this), i.fillStyle = a._renderer.effect)), r && (typeof r == "string" ? i.strokeStyle = r : (tt[r._renderer.type].render.call(r, i, this), i.strokeStyle = r._renderer.effect), n && (i.lineWidth = n), u && (i.miterLimit = u), f && (i.lineJoin = f), !_ && l && (i.lineCap = l)), typeof o == "number" && (i.globalAlpha = o), rt && rt.length > 0 && (i.lineDashOffset = rt.offset || 0, i.setLineDash(rt)), i.beginPath();
                let Ct, ee, ie, se, kt, Q, oi;
                for(let Lt = 0; Lt < c; Lt++)switch(y = d[Lt], X = y.x, V = y.y, y.command){
                    case w.close:
                        i.closePath();
                        break;
                    case w.arc:
                        Ct = y.rx, ee = y.ry, ie = y.xAxisRotation, se = y.largeArcFlag, kt = y.sweepFlag, b = _ ? it(Lt - 1, c) : He(Lt - 1, 0), g = d[b], Q = g.x, oi = g.y, tt.renderSvgArcCommand(i, Q, oi, Ct, ee, se, kt, ie, X, V);
                        break;
                    case w.curve:
                        b = _ ? it(Lt - 1, c) : Math.max(Lt - 1, 0), g = d[b], M = g.controls && g.controls.right || k.zero, T = y.controls && y.controls.left || k.zero, g._relative ? (C = M.x + g.x, N = M.y + g.y) : (C = M.x, N = M.y), y._relative ? (A = T.x + y.x, E = T.y + y.y) : (A = T.x, E = T.y), i.bezierCurveTo(C, N, A, E, X, V), Lt >= m && _ && (x = S, j = y.controls && y.controls.right || k.zero, z = x.controls && x.controls.left || k.zero, y._relative ? (C = j.x + y.x, N = j.y + y.y) : (C = j.x, N = j.y), x._relative ? (A = z.x + x.x, E = z.y + x.y) : (A = z.x, E = z.y), X = x.x, V = x.y, i.bezierCurveTo(C, N, A, E, X, V));
                        break;
                    case w.line:
                        i.lineTo(X, V);
                        break;
                    case w.move:
                        S = y, i.moveTo(X, V);
                        break;
                }
                return _ && i.closePath(), !dt && !e && (tt.isHidden.test(a) || (_t = a._renderer && a._renderer.offset, _t && (i.save(), i.translate(-a._renderer.offset.x, -a._renderer.offset.y), i.scale(a._renderer.scale.x, a._renderer.scale.y)), i.fill(), _t && i.restore()), tt.isHidden.test(r) || (_t = r._renderer && r._renderer.offset, _t && (i.save(), i.translate(-r._renderer.offset.x, -r._renderer.offset.y), i.scale(r._renderer.scale.x, r._renderer.scale.y), i.lineWidth = n / r._renderer.scale.x), i.stroke(), _t && i.restore())), Z || i.restore(), dt && !e && i.clip(), rt && rt.length > 0 && i.setLineDash(De), this.flagReset();
            }
        },
        points: {
            render: function(i, t, e) {
                let s, r, n, a, o, h, l, f, u, _, d, c, m, b, g, y;
                if (y = this.parent && this.parent._renderer ? this.parent._renderer.opacity : 1, o = this._opacity * (y || 1), h = this._visible, !t && (!h || o === 0)) return this;
                this._update(), s = this._matrix.elements, r = this._stroke, n = this._linewidth, a = this._fill, f = this._renderer.collection, u = f.length, m = Se(s), g = this.dashes, l = this._size, m || (i.save(), i.transform(s[0], s[3], s[1], s[4], s[2], s[5])), a && (typeof a == "string" ? i.fillStyle = a : (tt[a._renderer.type].render.call(a, i, this), i.fillStyle = a._renderer.effect)), r && (typeof r == "string" ? i.strokeStyle = r : (tt[r._renderer.type].render.call(r, i, this), i.strokeStyle = r._renderer.effect), n && (i.lineWidth = n)), typeof o == "number" && (i.globalAlpha = o), g && g.length > 0 && (i.lineDashOffset = g.offset || 0, i.setLineDash(g)), i.beginPath();
                let x = l * .5, S;
                this._sizeAttenuation || (pt(this, xi), S = xi.elements, S = Ot(S[0], S[3], S[1], S[4], S[2], S[5]), x /= Math.max(S.scaleX, S.scaleY));
                for(let A = 0; A < u; A++)_ = f[A], d = _.x, c = _.y, i.moveTo(d + x, c), i.arc(d, c, x, 0, $);
                return e || (tt.isHidden.test(a) || (b = a._renderer && a._renderer.offset, b && (i.save(), i.translate(-a._renderer.offset.x, -a._renderer.offset.y), i.scale(a._renderer.scale.x, a._renderer.scale.y)), i.fill(), b && i.restore()), tt.isHidden.test(r) || (b = r._renderer && r._renderer.offset, b && (i.save(), i.translate(-r._renderer.offset.x, -r._renderer.offset.y), i.scale(r._renderer.scale.x, r._renderer.scale.y), i.lineWidth = n / r._renderer.scale.x), i.stroke(), b && i.restore())), m || i.restore(), g && g.length > 0 && i.setLineDash(De), this.flagReset();
            }
        },
        text: {
            render: function(i, t, e) {
                let s = this.parent && this.parent._renderer ? this.parent._renderer.opacity : 1, r = this._opacity * s, n = this._visible, a = this._mask, o = this._clip;
                if (!t && (!n || o || r === 0)) return this;
                this._update();
                let h = this._matrix.elements, l = this._stroke, f = this._linewidth, u = this._fill, _ = this._decoration, d = Se(h), c = u._renderer && u._renderer.offset && l._renderer && l._renderer.offset, m = this.dashes, b = tt.alignments[this._alignment] || this._alignment, g = this._baseline, y, x, S, A, E, C, N, M, T, j, z;
                if (d || (i.save(), i.transform(h[0], h[3], h[1], h[4], h[2], h[5])), a && tt[a._renderer.type].render.call(a, i, !0), c || (i.font = [
                    this._style,
                    this._weight,
                    this._size + "px/" + this._leading + "px",
                    this._family
                ].join(" ")), i.textAlign = b, i.textBaseline = g, u && (typeof u == "string" ? i.fillStyle = u : (tt[u._renderer.type].render.call(u, i, this), i.fillStyle = u._renderer.effect)), l && (typeof l == "string" ? i.strokeStyle = l : (tt[l._renderer.type].render.call(l, i, this), i.strokeStyle = l._renderer.effect), f && (i.lineWidth = f)), typeof r == "number" && (i.globalAlpha = r), m && m.length > 0 && (i.lineDashOffset = m.offset || 0, i.setLineDash(m)), !o && !e && (tt.isHidden.test(u) || (u._renderer && u._renderer.offset ? (C = u._renderer.scale.x, N = u._renderer.scale.y, i.save(), i.translate(-u._renderer.offset.x, -u._renderer.offset.y), i.scale(C, N), y = this._size / u._renderer.scale.y, x = this._leading / u._renderer.scale.y, i.font = [
                    this._style,
                    this._weight,
                    y + "px/",
                    x + "px",
                    this._family
                ].join(" "), S = u._renderer.offset.x / u._renderer.scale.x, A = u._renderer.offset.y / u._renderer.scale.y, i.fillText(this.value, S, A), i.restore()) : i.fillText(this.value, 0, 0)), tt.isHidden.test(l) || (l._renderer && l._renderer.offset ? (C = l._renderer.scale.x, N = l._renderer.scale.y, i.save(), i.translate(-l._renderer.offset.x, -l._renderer.offset.y), i.scale(C, N), y = this._size / l._renderer.scale.y, x = this._leading / l._renderer.scale.y, i.font = [
                    this._style,
                    this._weight,
                    y + "px/",
                    x + "px",
                    this._family
                ].join(" "), S = l._renderer.offset.x / l._renderer.scale.x, A = l._renderer.offset.y / l._renderer.scale.y, E = f / l._renderer.scale.x, i.lineWidth = E, i.strokeText(this.value, S, A), i.restore()) : i.strokeText(this.value, 0, 0))), /(underline|strikethrough)/i.test(_)) {
                    let X = i.measureText(this.value), V = 1;
                    switch(_){
                        case "underline":
                            T = X.actualBoundingBoxAscent, z = X.actualBoundingBoxAscent;
                            break;
                        case "strikethrough":
                            T = 0, z = 0, V = .5;
                            break;
                    }
                    switch(g){
                        case "top":
                            T += this._size * V, z += this._size * V;
                            break;
                        case "baseline":
                        case "bottom":
                            T -= this._size * V, z -= this._size * V;
                            break;
                    }
                    switch(b){
                        case "left":
                        case "start":
                            M = 0, j = X.width;
                            break;
                        case "right":
                        case "end":
                            M = -X.width, j = 0;
                            break;
                        default:
                            M = -X.width / 2, j = X.width / 2;
                    }
                    i.lineWidth = Math.max(Math.floor(this._size / 15), 1), i.strokeStyle = i.fillStyle, i.beginPath(), i.moveTo(M, T), i.lineTo(j, z), i.stroke();
                }
                return d || i.restore(), o && !e && i.clip(), m && m.length > 0 && i.setLineDash(De), this.flagReset();
            }
        },
        "linear-gradient": {
            render: function(i, t) {
                if (!!t) {
                    if (this._update(), !this._renderer.effect || this._flagEndPoints || this._flagStops || this._flagUnits) {
                        let e, s = this.left._x, r = this.left._y, n = this.right._x, a = this.right._y;
                        /objectBoundingBox/i.test(this._units) && (e = t.getBoundingClientRect(!0), s = (s - .5) * e.width, r = (r - .5) * e.height, n = (n - .5) * e.width, a = (a - .5) * e.height), this._renderer.effect = i.createLinearGradient(s, r, n, a);
                        for(let o = 0; o < this.stops.length; o++){
                            let h = this.stops[o];
                            this._renderer.effect.addColorStop(h._offset, h._color);
                        }
                    }
                    return this.flagReset();
                }
            }
        },
        "radial-gradient": {
            render: function(i, t) {
                if (!!t) {
                    if (this._update(), !this._renderer.effect || this._flagCenter || this._flagFocal || this._flagRadius || this._flagStops || this._flagUnits) {
                        let e, s = this.center._x, r = this.center._y, n = this.focal._x, a = this.focal._y, o = this._radius;
                        /objectBoundingBox/i.test(this._units) && (e = t.getBoundingClientRect(!0), s = s * e.width * .5, r = r * e.height * .5, n = n * e.width * .5, a = a * e.height * .5, o *= Math.min(e.width, e.height) * .5), this._renderer.effect = i.createRadialGradient(s, r, 0, n, a, o);
                        for(let h = 0; h < this.stops.length; h++){
                            let l = this.stops[h];
                            this._renderer.effect.addColorStop(l._offset, l._color);
                        }
                    }
                    return this.flagReset();
                }
            }
        },
        texture: {
            render: function(i) {
                this._update();
                let t = this.image;
                return (!this._renderer.effect || (this._flagLoaded || this._flagImage || this._flagVideo || this._flagRepeat) && this.loaded) && (this._renderer.effect = i.createPattern(this.image, this._repeat)), (this._flagOffset || this._flagLoaded || this._flagScale) && (this._renderer.offset instanceof k || (this._renderer.offset = new k), this._renderer.offset.x = -this._offset.x, this._renderer.offset.y = -this._offset.y, t && (this._renderer.offset.x += t.width / 2, this._renderer.offset.y += t.height / 2, this._scale instanceof k ? (this._renderer.offset.x *= this._scale.x, this._renderer.offset.y *= this._scale.y) : (this._renderer.offset.x *= this._scale, this._renderer.offset.y *= this._scale))), (this._flagScale || this._flagLoaded) && (this._renderer.scale instanceof k || (this._renderer.scale = new k), this._scale instanceof k ? this._renderer.scale.copy(this._scale) : this._renderer.scale.set(this._scale, this._scale)), this.flagReset();
            }
        },
        renderSvgArcCommand: function(i, t, e, s, r, n, a, o, h, l) {
            o = o * Math.PI / 180, s = bi(s), r = bi(r);
            let f = (t - h) / 2, u = (e - l) / 2, _ = Ae(o) * f + ke(o) * u, d = -ke(o) * f + Ae(o) * u, c = _ * _, m = d * d, b = s * s, g = r * r, y = c / b + m / g;
            if (y > 1) {
                let V = Re(y);
                s = V * s, r = V * r, b = s * s, g = r * r;
            }
            let x = b * m + g * c, S = (b * g - x) / x, A = Re(He(0, S));
            n === a && (A = -A);
            let E = A * s * d / r, C = -A * r * _ / s, N = Ae(o) * E - ke(o) * C + (t + h) / 2, M = ke(o) * E + Ae(o) * C + (e + l) / 2, T = vi(1, 0, (_ - E) / s, (d - C) / r), j = vi((_ - E) / s, (d - C) / r, (-_ - E) / s, (-d - C) / r) % $, z = T + j;
            fs(i, N, M, s, r, T, z, a === 0, o);
        }
    }, At = class extends p {
        constructor(t){
            super();
            let e = t.smoothing !== !1;
            this.domElement = t.domElement || document.createElement("canvas"), this.ctx = this.domElement.getContext("2d"), this.overdraw = t.overdraw || !1, typeof this.ctx.imageSmoothingEnabled < "u" && (this.ctx.imageSmoothingEnabled = e), this.scene = new q, this.scene.parent = this;
        }
        setSize(t, e, s) {
            return this.width = t, this.height = e, this.ratio = typeof s > "u" ? Xt(this.ctx) : s, this.domElement.width = t * this.ratio, this.domElement.height = e * this.ratio, this.domElement.style && R.extend(this.domElement.style, {
                width: t + "px",
                height: e + "px"
            }), this.trigger(p.Types.resize, t, e, s);
        }
        render() {
            let t = this.ratio === 1;
            return t || (this.ctx.save(), this.ctx.scale(this.ratio, this.ratio)), this.overdraw || this.ctx.clearRect(0, 0, this.width, this.height), tt.group.render.call(this.scene, this.ctx), t || this.ctx.restore(), this;
        }
    };
    v(At, "Utils", tt);
    function fs(i, t, e, s, r, n, a, o, h) {
        let l = a - n, f = Ut.Tolerance.epsilon, u = Math.abs(l) < f, _ = it(l, $);
        _ < f && (u ? _ = 0 : _ = $), o === !0 && !u && (_ === $ ? _ = -$ : _ = _ - $);
        for(let d = 0; d < Y.Resolution; d++){
            let c = d / (Y.Resolution - 1), m = n + c * _, b = t + s * Math.cos(m), g = e + r * Math.sin(m);
            if (h !== 0) {
                let y = Math.cos(h), x = Math.sin(h), S = b - t, A = g - e;
                b = S * y - A * x + t, g = S * x + A * y + e;
            }
            i.lineTo(b, g);
        }
    }
    function vi(i, t, e, s) {
        let r = i * e + t * s, n = Re(i * i + t * t) * Re(e * e + s * s), a = hs(He(-1, ls(1, r / n)));
        return i * s - t * e < 0 && (a = -a), a;
    }
    function Se(i) {
        return i[0] == 1 && i[3] == 0 && i[1] == 0 && i[4] == 1 && i[2] == 0 && i[5] == 0;
    }
    var ht = {
        Image: null,
        isHeadless: !1,
        shim: function(i, t) {
            return At.Utils.shim(i), typeof t < "u" && (ht.Image = t), ht.isHeadless = !0, i;
        }
    };
    var gt = {
        hasEventListeners: typeof H.addEventListener == "function",
        bind: function(i, t, e, s) {
            return this.hasEventListeners ? i.addEventListener(t, e, !!s) : i.attachEvent("on" + t, e), gt;
        },
        unbind: function(i, t, e, s) {
            return gt.hasEventListeners ? i.removeEventListeners(t, e, !!s) : i.detachEvent("on" + t, e), gt;
        },
        getRequestAnimationFrame: function() {
            let i = [
                "ms",
                "moz",
                "webkit",
                "o"
            ], t = 0, e = H.requestAnimationFrame;
            if (!e) {
                for(let r = 0; r < i.length; r++)e = H[i[r] + "RequestAnimationFrame"] || e;
                e = e || s;
            }
            function s(r, n) {
                let a = new Date().getTime(), o = Math.max(0, 16 - (a - t)), h = H.setTimeout(l, o);
                t = a + o;
                function l() {
                    r(a + o);
                }
                return h;
            }
            return e;
        }
    }, Yt = H.document ? H.document.createElement("div") : {};
    Yt.id = "help-two-load";
    Object.defineProperty(gt, "temp", {
        enumerable: !0,
        get: function() {
            return R.isElement(Yt) && !H.document.head.contains(Yt) && (Yt.style.display = "none", H.document.head.appendChild(Yt)), Yt;
        }
    });
    var et = class extends Error {
        name = "Two.js";
        message;
        constructor(t){
            super(), this.message = t;
        }
    };
    var Et = class {
        map = {};
        constructor(){}
        add(t, e) {
            return this.map[t] = e, this;
        }
        remove(t) {
            return delete this.map[t], this;
        }
        get(t) {
            return this.map[t];
        }
        contains(t) {
            return t in this.map;
        }
    };
    function We(i, t) {
        if (t === 0 || t === 1) return !0;
        let s = i._length * t, r = 0;
        for(let n = 0; n < i._lengths.length; n++){
            let a = i._lengths[n];
            if (r >= s) return s - r >= 0;
            r += a;
        }
        return !1;
    }
    function qt(i, t) {
        let e = i._length;
        if (t <= 0) return 0;
        if (t >= e) return i._lengths.length - 1;
        for(let s = 0, r = 0; s < i._lengths.length; s++){
            if (r + i._lengths[s] >= t) return t -= r, Math.max(s - 1, 0) + t / i._lengths[s];
            r += i._lengths[s];
        }
        return -1;
    }
    function Ee(i, t, e) {
        let s, r, n, a, o, h, l, f, u = t.controls && t.controls.right, _ = i.controls && i.controls.left;
        return s = t.x, o = t.y, r = (u || t).x, h = (u || t).y, n = (_ || i).x, l = (_ || i).y, a = i.x, f = i.y, u && t._relative && (r += t.x, h += t.y), _ && i._relative && (n += i.x, l += i.y), Be(s, o, r, h, n, l, a, f, e);
    }
    function Xe(i, t, e) {
        let s, r, n, a, o, h, l, f, u = t.controls && t.controls.right, _ = i.controls && i.controls.left;
        return s = t.x, o = t.y, r = (u || t).x, h = (u || t).y, n = (_ || i).x, l = (_ || i).y, a = i.x, f = i.y, u && t._relative && (r += t.x, h += t.y), _ && i._relative && (n += i.x, l += i.y), re(s, o, r, h, n, l, a, f, e);
    }
    var Mt = class extends Rt {
        _flagOffset = !0;
        _flagOpacity = !0;
        _flagColor = !0;
        _offset = 0;
        _opacity = 1;
        _color = "#fff";
        constructor(t, e, s){
            super();
            for(let r in wi)Object.defineProperty(this, r, wi[r]);
            this._renderer.type = "stop", this.offset = typeof t == "number" ? t : Mt.Index <= 0 ? 0 : 1, this.opacity = typeof s == "number" ? s : 1, this.color = typeof e == "string" ? e : Mt.Index <= 0 ? "#fff" : "#000", Mt.Index = (Mt.Index + 1) % 2;
        }
        clone(t) {
            let e = new Mt;
            return R.each(Mt.Properties, function(s) {
                e[s] = this[s];
            }, this), t && t.stops && t.stops.push(e), e;
        }
        toObject() {
            let t = {};
            return R.each(Mt.Properties, function(e) {
                t[e] = this[e];
            }, this), t;
        }
        flagReset() {
            return this._flagOffset = this._flagColor = this._flagOpacity = !1, super.flagReset.call(this), this;
        }
    }, ft = Mt;
    v(ft, "Index", 0), v(ft, "Properties", [
        "offset",
        "opacity",
        "color"
    ]);
    var wi = {
        offset: {
            enumerable: !0,
            get: function() {
                return this._offset;
            },
            set: function(i) {
                this._offset = i, this._flagOffset = !0, this.parent && (this.parent._flagStops = !0);
            }
        },
        opacity: {
            enumerable: !0,
            get: function() {
                return this._opacity;
            },
            set: function(i) {
                this._opacity = i, this._flagOpacity = !0, this.parent && (this.parent._flagStops = !0);
            }
        },
        color: {
            enumerable: !0,
            get: function() {
                return this._color;
            },
            set: function(i) {
                this._color = i, this._flagColor = !0, this.parent && (this.parent._flagStops = !0);
            }
        }
    };
    var ae = class extends Rt {
        _flagStops = !1;
        _flagSpread = !1;
        _flagUnits = !1;
        _spread = "";
        _units = "";
        constructor(t){
            super();
            for(let e in ki)Object.defineProperty(this, e, ki[e]);
            this._renderer.type = "gradient", this.id = Y.Identifier + Y.uniqueId(), this.classList = [], this._renderer.flagStops = cs.bind(this), this._renderer.bindStops = us.bind(this), this._renderer.unbindStops = ds.bind(this), this.spread = "pad", this.units = "objectBoundingBox", t && (this.stops = t);
        }
        clone(t) {
            let e = this.stops.map(function(r) {
                return r.clone();
            }), s = new ae(e);
            return R.each(ae.Properties, function(r) {
                s[r] = this[r];
            }, this), t && t.add(s), s;
        }
        toObject() {
            let t = {
                stops: this.stops.map(function(e) {
                    return e.toObject();
                })
            };
            return R.each(ae.Properties, function(e) {
                t[e] = this[e];
            }, this), t;
        }
        _update() {
            return (this._flagSpread || this._flagStops) && this.trigger(p.Types.change), this;
        }
        flagReset() {
            return this._flagSpread = this._flagUnits = this._flagStops = !1, super.flagReset.call(this), this;
        }
    }, W = ae;
    v(W, "Stop", ft), v(W, "Properties", [
        "spread",
        "stops",
        "renderer",
        "units"
    ]);
    var ki = {
        spread: {
            enumerable: !0,
            get: function() {
                return this._spread;
            },
            set: function(i) {
                this._spread = i, this._flagSpread = !0;
            }
        },
        units: {
            enumerable: !0,
            get: function() {
                return this._units;
            },
            set: function(i) {
                this._units = i, this._flagUnits = !0;
            }
        },
        stops: {
            enumerable: !0,
            get: function() {
                return this._stops;
            },
            set: function(i) {
                let t = this._renderer.bindStops, e = this._renderer.unbindStops;
                this._stops && this._stops.unbind(p.Types.insert, t).unbind(p.Types.remove, e), this._stops = new lt((i || []).slice(0)), this._stops.bind(p.Types.insert, t).bind(p.Types.remove, e), t(this._stops);
            }
        }
    };
    function cs() {
        this._flagStops = !0;
    }
    function us(i) {
        let t = i.length;
        for(; t--;)i[t].bind(p.Types.change, this._renderer.flagStops), i[t].parent = this;
        this._renderer.flagStops();
    }
    function ds(i) {
        let t = i.length;
        for(; t--;)i[t].unbind(p.Types.change, this._renderer.flagStops), delete i[t].parent;
        this._renderer.flagStops();
    }
    var Ye = class extends W {
        _flagEndPoints = !1;
        _left = null;
        _right = null;
        constructor(t, e, s, r, n){
            super(n);
            for(let a in Ai)Object.defineProperty(this, a, Ai[a]);
            this._renderer.type = "linear-gradient", this._renderer.flagEndPoints = _s.bind(this), this.left = new k, this.right = new k, typeof t == "number" && (this.left.x = t), typeof e == "number" && (this.left.y = e), typeof s == "number" && (this.right.x = s), typeof r == "number" && (this.right.y = r);
        }
        clone(t) {
            let e = this.stops.map(function(r) {
                return r.clone();
            }), s = new Ye(this.left._x, this.left._y, this.right._x, this.right._y, e);
            return R.each(W.Properties, function(r) {
                s[r] = this[r];
            }, this), t && t.add(s), s;
        }
        toObject() {
            let t = super.toObject.call(this);
            return t.left = this.left.toObject(), t.right = this.right.toObject(), t;
        }
        _update() {
            return (this._flagEndPoints || this._flagSpread || this._flagStops) && this.trigger(p.Types.change), this;
        }
        flagReset() {
            return this._flagEndPoints = !1, super.flagReset.call(this), this;
        }
    }, U = Ye;
    v(U, "Properties", [
        "left",
        "right"
    ]), v(U, "Stop", ft);
    var Ai = {
        left: {
            enumerable: !0,
            get: function() {
                return this._left;
            },
            set: function(i) {
                this._left instanceof k && this._left.unbind(p.Types.change, this._renderer.flagEndPoints), this._left = i, this._left.bind(p.Types.change, this._renderer.flagEndPoints), this._flagEndPoints = !0;
            }
        },
        right: {
            enumerable: !0,
            get: function() {
                return this._right;
            },
            set: function(i) {
                this._right instanceof k && this._right.unbind(p.Types.change, this._renderer.flagEndPoints), this._right = i, this._right.bind(p.Types.change, this._renderer.flagEndPoints), this._flagEndPoints = !0;
            }
        }
    };
    function _s() {
        this._flagEndPoints = !0;
    }
    var oe = class extends W {
        _flagRadius = !1;
        _flagCenter = !1;
        _flagFocal = !1;
        _radius = 0;
        _center = null;
        _focal = null;
        constructor(t, e, s, r, n, a){
            super(r);
            for(let o in Si)Object.defineProperty(this, o, Si[o]);
            this._renderer.type = "radial-gradient", this._renderer.flagCenter = gs.bind(this), this._renderer.flagFocal = ps.bind(this), this.center = new k, this.radius = typeof s == "number" ? s : 1, this.focal = new k, typeof t == "number" && (this.center.x = t), typeof e == "number" && (this.center.y = e), this.focal.copy(this.center), typeof n == "number" && (this.focal.x = n), typeof a == "number" && (this.focal.y = a);
        }
        clone(t) {
            let e = this.stops.map(function(r) {
                return r.clone();
            }), s = new oe(this.center._x, this.center._y, this._radius, e, this.focal._x, this.focal._y);
            return R.each(W.Properties.concat(oe.Properties), function(r) {
                s[r] = this[r];
            }, this), t && t.add(s), s;
        }
        toObject() {
            let t = super.toObject.call(this);
            return R.each(oe.Properties, function(e) {
                t[e] = this[e];
            }, this), t.center = this.center.toObject(), t.focal = this.focal.toObject(), t;
        }
        _update() {
            return (this._flagRadius || this._flatCenter || this._flagFocal || this._flagSpread || this._flagStops) && this.trigger(p.Types.change), this;
        }
        flagReset() {
            return this._flagRadius = this._flagCenter = this._flagFocal = !1, super.flagReset.call(this), this;
        }
    }, D = oe;
    v(D, "Stop", ft), v(D, "Properties", [
        "center",
        "radius",
        "focal"
    ]);
    var Si = {
        radius: {
            enumerable: !0,
            get: function() {
                return this._radius;
            },
            set: function(i) {
                this._radius = i, this._flagRadius = !0;
            }
        },
        center: {
            enumerable: !0,
            get: function() {
                return this._center;
            },
            set: function(i) {
                this._center && this._center.unbind(p.Types.change, this._renderer.flagCenter), this._center = i, this._center.bind(p.Types.change, this._renderer.flagCenter), this._flagCenter = !0;
            }
        },
        focal: {
            enumerable: !0,
            get: function() {
                return this._focal;
            },
            set: function(i) {
                this._focal && this._focal.unbind(p.Types.change, this._renderer.flagFocal), this._focal = i, this._focal.bind(p.Types.change, this._renderer.flagFocal), this._flagFocal = !0;
            }
        }
    };
    function gs() {
        this._flagCenter = !0;
    }
    function ps() {
        this._flagFocal = !0;
    }
    var Fe, Ri = {
        video: /\.(mp4|webm|ogg)$/i,
        image: /\.(jpe?g|png|gif|tiff|webp)$/i,
        effect: /texture|gradient/i
    };
    H.document && (Fe = document.createElement("a"));
    var st = class extends Rt {
        _flagSrc = !1;
        _flagImage = !1;
        _flagVideo = !1;
        _flagLoaded = !1;
        _flagRepeat = !1;
        _flagOffset = !1;
        _flagScale = !1;
        _src = "";
        _image = null;
        _loaded = !1;
        _repeat = "no-repeat";
        _scale = 1;
        _offset = null;
        constructor(t, e){
            super(), this._renderer = {};
            for(let s in Ei)Object.defineProperty(this, s, Ei[s]);
            if (this._renderer.type = "texture", this._renderer.flagOffset = ms.bind(this), this._renderer.flagScale = ys.bind(this), this.id = Y.Identifier + Y.uniqueId(), this.classList = [], this.loaded = !1, this.repeat = "no-repeat", this.offset = new k, typeof e == "function") {
                let s = (function() {
                    this.unbind(p.Types.load, s), typeof e == "function" && e();
                }).bind(this);
                this.bind(p.Types.load, s);
            }
            if (typeof t == "string") this.src = t;
            else if (typeof t == "object") {
                let s = Object.prototype.toString.call(t);
                (s === "[object HTMLImageElement]" || s === "[object HTMLCanvasElement]" || s === "[object HTMLVideoElement]" || s === "[object Image]") && (this.image = t);
            }
            this._update();
        }
        static getAbsoluteURL(t) {
            return Fe ? (Fe.href = t, Fe.href) : t;
        }
        static loadHeadlessBuffer(t, e) {
            t.image.onload = e, t.image.src = t.src;
        }
        static getTag(t) {
            return t && t.nodeName && t.nodeName.toLowerCase() || "img";
        }
        static getImage(t) {
            let e = st.getAbsoluteURL(t);
            if (st.ImageRegistry.contains(e)) return st.ImageRegistry.get(e);
            let s;
            return ht.Image ? (s = new ht.Image, At.Utils.shim(s, "img")) : H.document ? Ri.video.test(e) ? s = document.createElement("video") : s = document.createElement("img") : console.warn("Two.js: no prototypical image defined for Two.Texture"), s.crossOrigin = "anonymous", s;
        }
        static load(t, e) {
            let s = t.image, r = st.getTag(s);
            t._flagImage && (/canvas/i.test(r) ? st.Register.canvas(t, e) : (t._src = !ht.isHeadless && s.getAttribute("two-src") || s.src, st.Register[r](t, e))), t._flagSrc && (s || (s = st.getImage(t.src), t.image = s), r = st.getTag(s), st.Register[r](t, e));
        }
        clone() {
            let t = new st(this.src);
            return t.repeat = this.repeat, t.offset.copy(this.origin), t.scale = this.scale, t;
        }
        toObject() {
            return {
                src: this.src,
                repeat: this.repeat,
                origin: this.origin.toObject(),
                scale: typeof this.scale == "number" ? this.scale : this.scale.toObject()
            };
        }
        _update() {
            return (this._flagSrc || this._flagImage) && (this.trigger(p.Types.change), (this._flagSrc || this._flagImage) && (this.loaded = !1, st.load(this, (function() {
                this.loaded = !0, this.trigger(p.Types.change).trigger(p.Types.load);
            }).bind(this)))), this._image && this._image.readyState >= 4 && (this._flagVideo = !0), this;
        }
        flagReset() {
            return this._flagSrc = this._flagImage = this._flagLoaded = this._flagRepeat = this._flagVideo = this._flagScale = this._flagOffset = !1, super.flagReset.call(this), this;
        }
    }, B = st;
    v(B, "Properties", [
        "src",
        "loaded",
        "repeat",
        "scale",
        "offset",
        "image"
    ]), v(B, "RegularExpressions", Ri), v(B, "ImageRegistry", new Et), v(B, "Register", {
        canvas: function(t, e) {
            t._src = "#" + t.id, st.ImageRegistry.add(t.src, t.image), typeof e == "function" && e();
        },
        img: function(t, e) {
            let s = t.image, r = function(a) {
                !ht.isHeadless && s.removeEventListener && typeof s.removeEventListener == "function" && (s.removeEventListener("load", r, !1), s.removeEventListener("error", n, !1)), typeof e == "function" && e();
            }, n = function(a) {
                throw !ht.isHeadless && typeof s.removeEventListener == "function" && (s.removeEventListener("load", r, !1), s.removeEventListener("error", n, !1)), new et("unable to load " + t.src);
            };
            typeof s.width == "number" && s.width > 0 && typeof s.height == "number" && s.height > 0 ? r() : !ht.isHeadless && typeof s.addEventListener == "function" && (s.addEventListener("load", r, !1), s.addEventListener("error", n, !1)), t._src = st.getAbsoluteURL(t._src), !(!ht.isHeadless && s && s.getAttribute("two-src")) && (ht.isHeadless || s.setAttribute("two-src", t.src), st.ImageRegistry.add(t.src, s), ht.isHeadless ? st.loadHeadlessBuffer(t, r) : t.image.src = t.src);
        },
        video: function(t, e) {
            if (ht.isHeadless) throw new et("video textures are not implemented in headless environments.");
            let s = function(n) {
                t.image.removeEventListener("canplaythrough", s, !1), t.image.removeEventListener("error", r, !1), t.image.width = t.image.videoWidth, t.image.height = t.image.videoHeight, typeof e == "function" && e();
            }, r = function(n) {
                throw t.image.removeEventListener("canplaythrough", s, !1), t.image.removeEventListener("error", r, !1), new et("unable to load " + t.src);
            };
            t._src = st.getAbsoluteURL(t._src), t.image.getAttribute("two-src") || (t.image.setAttribute("two-src", t.src), st.ImageRegistry.add(t.src, t.image)), t.image.readyState >= 4 ? s() : (t.image.addEventListener("canplaythrough", s, !1), t.image.addEventListener("error", r, !1), t.image.src = t.src, t.image.load());
        }
    });
    var Ei = {
        src: {
            enumerable: !0,
            get: function() {
                return this._src;
            },
            set: function(i) {
                this._src = i, this._flagSrc = !0;
            }
        },
        loaded: {
            enumerable: !0,
            get: function() {
                return this._loaded;
            },
            set: function(i) {
                this._loaded = i, this._flagLoaded = !0;
            }
        },
        repeat: {
            enumerable: !0,
            get: function() {
                return this._repeat;
            },
            set: function(i) {
                this._repeat = i, this._flagRepeat = !0;
            }
        },
        image: {
            enumerable: !0,
            get: function() {
                return this._image;
            },
            set: function(i) {
                let t = B.getTag(i), e;
                switch(t){
                    case "canvas":
                        e = "#" + i.id;
                        break;
                    default:
                        e = i.src;
                }
                B.ImageRegistry.contains(e) ? this._image = B.ImageRegistry.get(i.src) : this._image = i, this._flagImage = !0;
            }
        },
        offset: {
            enumerable: !0,
            get: function() {
                return this._offset;
            },
            set: function(i) {
                this._offset && this._offset.unbind(p.Types.change, this._renderer.flagOffset), this._offset = i, this._offset.bind(p.Types.change, this._renderer.flagOffset), this._flagOffset = !0;
            }
        },
        scale: {
            enumerable: !0,
            get: function() {
                return this._scale;
            },
            set: function(i) {
                this._scale instanceof k && this._scale.unbind(p.Types.change, this._renderer.flagScale), this._scale = i, this._scale instanceof k && this._scale.bind(p.Types.change, this._renderer.flagScale), this._flagScale = !0;
            }
        }
    };
    function ms() {
        this._flagOffset = !0;
    }
    function ys() {
        this._flagScale = !0;
    }
    var Pt = Math.min, It = Math.max, xs = Math.ceil, bs = Math.floor, vs = new k, Gt = class extends ot {
        _flagVertices = !0;
        _flagLength = !0;
        _flagFill = !0;
        _flagStroke = !0;
        _flagLinewidth = !0;
        _flagOpacity = !0;
        _flagVisible = !0;
        _flagCap = !0;
        _flagJoin = !0;
        _flagMiter = !0;
        _flagMask = !1;
        _flagClip = !1;
        _length = 0;
        _fill = "#fff";
        _stroke = "#000";
        _linewidth = 1;
        _opacity = 1;
        _visible = !0;
        _cap = "round";
        _join = "round";
        _miter = 4;
        _closed = !0;
        _curved = !1;
        _automatic = !0;
        _beginning = 0;
        _ending = 1;
        _mask = null;
        _clip = !1;
        _dashes = null;
        constructor(t, e, s, r){
            super();
            for(let n in Fi)Object.defineProperty(this, n, Fi[n]);
            this._renderer.type = "path", this._renderer.flagVertices = qe.bind(this), this._renderer.bindVertices = Ge.bind(this), this._renderer.unbindVertices = Ke.bind(this), this._renderer.flagFill = $e.bind(this), this._renderer.flagStroke = Je.bind(this), this._renderer.vertices = [], this._renderer.collection = [], this.closed = !!e, this.curved = !!s, this.beginning = 0, this.ending = 1, this.fill = "#fff", this.stroke = "#000", this.linewidth = 1, this.opacity = 1, this.className = "", this.visible = !0, this.cap = "butt", this.join = "miter", this.miter = 4, this.vertices = t, this.automatic = !r, this.dashes = [], this.dashes.offset = 0;
        }
        clone(t) {
            let e = new Gt;
            for(let s = 0; s < this.vertices.length; s++)e.vertices.push(this.vertices[s].clone());
            for(let s = 0; s < Gt.Properties.length; s++){
                let r = Gt.Properties[s];
                e[r] = this[r];
            }
            return e.className = this.className, e.translation.copy(this.translation), e.rotation = this.rotation, e.scale = this.scale, e.skewX = this.skewX, e.skewY = this.skewY, this.matrix.manual && e.matrix.copy(this.matrix), t && t.add(e), e._update();
        }
        toObject() {
            let t = {
                vertices: this.vertices.map(function(e) {
                    return e.toObject();
                })
            };
            return R.each(Gt.Properties, function(e) {
                typeof this[e] < "u" && (this[e].toObject ? t[e] = this[e].toObject() : t[e] = this[e]);
            }, this), t.className = this.className, t.translation = this.translation.toObject(), t.rotation = this.rotation, t.scale = this.scale instanceof k ? this.scale.toObject() : this.scale, t.skewX = this.skewX, t.skewY = this.skewY, this.matrix.manual && (t.matrix = this.matrix.toObject()), t;
        }
        noFill() {
            return this.fill = "transparent", this;
        }
        noStroke() {
            return this.stroke = void 0, this;
        }
        corner() {
            let t = this.getBoundingClientRect(!0), e = t.width / 2, s = t.height / 2, r = t.left + t.width / 2, n = t.top + t.height / 2;
            for(let a = 0; a < this.vertices.length; a++){
                let o = this.vertices[a];
                o.x -= r, o.y -= n, o.x += e, o.y += s;
            }
            return this.mask && (this.mask.translation.x -= r, this.mask.translation.x += e, this.mask.translation.y -= n, this.mask.translation.y += s), this;
        }
        center() {
            let t = this.getBoundingClientRect(!0), e = t.left + t.width / 2 - this.translation.x, s = t.top + t.height / 2 - this.translation.y;
            for(let r = 0; r < this.vertices.length; r++){
                let n = this.vertices[r];
                n.x -= e, n.y -= s;
            }
            return this.mask && (this.mask.translation.x -= e, this.mask.translation.y -= s), this;
        }
        getBoundingClientRect(t) {
            let e, s, r, n, a, o, h, l, f, u, _, d, c, m, b = 1 / 0, g = -1 / 0, y = 1 / 0, x = -1 / 0;
            if (this._update(!0), e = t ? this._matrix : pt(this), s = (this.linewidth || 0) / 2, r = this._renderer.vertices.length, r <= 0) return {
                width: 0,
                height: 0
            };
            for(n = 0; n < r; n++)if (o = this._renderer.vertices[n], a = this._renderer.vertices[(n + r - 1) % r], a.controls && o.controls) {
                h = a.controls.right.x, l = a.controls.right.y, a.relative && (h += a.x, l += a.y), f = o.controls.left.x, u = o.controls.left.y, o.relative && (f += o.x, u += o.y);
                let S = Ne(a.x, a.y, h, l, f, u, o.x, o.y);
                y = Pt(S.min.y - s, y), b = Pt(S.min.x - s, b), g = It(S.max.x + s, g), x = It(S.max.y + s, x);
            } else n <= 1 && (y = Pt(a.y - s, y), b = Pt(a.x - s, b), g = It(a.x + s, g), x = It(a.y + s, x)), y = Pt(o.y - s, y), b = Pt(o.x - s, b), g = It(o.x + s, g), x = It(o.y + s, x);
            return _ = e.multiply(b, y, 1), d = e.multiply(b, x, 1), c = e.multiply(g, y, 1), m = e.multiply(g, x, 1), y = Pt(_.y, d.y, c.y, m.y), b = Pt(_.x, d.x, c.x, m.x), g = It(_.x, d.x, c.x, m.x), x = It(_.y, d.y, c.y, m.y), {
                top: y,
                left: b,
                right: g,
                bottom: x,
                width: g - b,
                height: x - y
            };
        }
        getPointAt(t, e) {
            let s, r, n, a, o, h, l, f, u, _, d, c, m, b, g, y = this.length * Math.min(Math.max(t, 0), 1), x = this.vertices.length, S = x - 1, A = null, E = null;
            for(let Z = 0, _t = this._lengths.length, rt = 0; Z < _t; Z++){
                if (rt + this._lengths[Z] >= y) {
                    this._closed ? (s = it(Z, x), r = it(Z - 1, x), Z === 0 && (s = r, r = Z)) : (s = Z, r = Math.min(Math.max(Z - 1, 0), S)), A = this.vertices[s], E = this.vertices[r], y -= rt, this._lengths[Z] !== 0 ? t = y / this._lengths[Z] : t = 0;
                    break;
                }
                rt += this._lengths[Z];
            }
            if (A === null || E === null) return null;
            if (A) {
                if (!E) return A;
            } else return E;
            g = E.controls && E.controls.right, b = A.controls && A.controls.left, o = E.x, _ = E.y, h = (g || E).x, d = (g || E).y, l = (b || A).x, c = (b || A).y, f = A.x, m = A.y, g && E.relative && (h += E.x, d += E.y), b && A.relative && (l += A.x, c += A.y), a = Wt(t, o, h, l, f), u = Wt(t, _, d, c, m);
            let C = nt(o, h, t), N = nt(_, d, t), M = nt(h, l, t), T = nt(d, c, t), j = nt(l, f, t), z = nt(c, m, t), X = nt(C, M, t), V = nt(N, T, t), ut = nt(M, j, t), dt = nt(T, z, t);
            return R.isObject(e) ? (e.x = a, e.y = u, e instanceof F && (e.controls.left.x = X, e.controls.left.y = V, e.controls.right.x = ut, e.controls.right.y = dt, (typeof e.relative != "boolean" || e.relative) && (e.controls.left.x -= a, e.controls.left.y -= u, e.controls.right.x -= a, e.controls.right.y -= u)), e.t = t, e) : (n = new F(a, u, X - a, V - u, ut - a, dt - u, this._curved ? w.curve : w.line), n.t = t, n);
        }
        plot() {
            if (this.curved) return je(this._collection, this.closed), this;
            for(let t = 0; t < this._collection.length; t++)this._collection[t].command = t === 0 ? w.move : w.line;
            return this;
        }
        subdivide(t) {
            this._update();
            let e = this.vertices.length - 1, s = this._closed || this.vertices[e]._command === w.close, r = this.vertices[e], n = [], a;
            return R.each(this.vertices, function(o, h) {
                if (h <= 0 && !s) {
                    r = o;
                    return;
                }
                if (o.command === w.move) {
                    n.push(new F(r.x, r.y)), h > 0 && (n[n.length - 1].command = w.line), r = o;
                    return;
                }
                a = Xe(o, r, t), n = n.concat(a), R.each(a, function(l, f) {
                    f <= 0 && r.command === w.move ? l.command = w.move : l.command = w.line;
                }), h >= e && (this._closed && this._automatic ? (r = o, a = Xe(o, r, t), n = n.concat(a), R.each(a, function(l, f) {
                    f <= 0 && r.command === w.move ? l.command = w.move : l.command = w.line;
                })) : s && n.push(new F(o.x, o.y)), n[n.length - 1].command = s ? w.close : w.line), r = o;
            }, this), this._automatic = !1, this._curved = !1, this.vertices = n, this;
        }
        _updateLength(t, e) {
            e || this._update();
            let s = this.vertices.length, r = s - 1, n = !1, a = this.vertices[r], o = 0;
            return typeof this._lengths > "u" && (this._lengths = []), R.each(this.vertices, function(h, l) {
                if (l <= 0 && !n || h.command === w.move) {
                    a = h, this._lengths[l] = 0;
                    return;
                }
                this._lengths[l] = Ee(h, a, t), o += this._lengths[l], l >= r && n && (a = this.vertices[(l + 1) % s], this._lengths[l + 1] = Ee(h, a, t), o += this._lengths[l + 1]), a = h;
            }, this), this._length = o, this._flagLength = !1, this;
        }
        _update() {
            if (this._flagVertices) {
                this._automatic && this.plot(), this._flagLength && this._updateLength(void 0, !0);
                let t = this._collection.length, e = this._closed, s = Math.min(this._beginning, this._ending), r = Math.max(this._beginning, this._ending), n = qt(this, s * this._length), a = qt(this, r * this._length), o = xs(n), h = bs(a), l, f, u, _, d, c;
                for(this._renderer.vertices.length = 0, c = 0; c < t; c++)this._renderer.collection.length <= c && this._renderer.collection.push(new F), c > h && !f ? (d = this._renderer.collection[c].copy(this._collection[c]), this.getPointAt(r, d), d.command = this._renderer.collection[c].command, this._renderer.vertices.push(d), f = d, u = this._collection[c - 1], u && u.controls && (d.relative ? d.controls.right.clear() : d.controls.right.copy(d), u.relative ? this._renderer.collection[c - 1].controls.right.copy(u.controls.right).lerp(k.zero, 1 - d.t) : this._renderer.collection[c - 1].controls.right.copy(u.controls.right).lerp(u, 1 - d.t))) : c >= o && c <= h && (d = this._renderer.collection[c].copy(this._collection[c]), this._renderer.vertices.push(d), c === h && We(this, r) ? (f = d, !e && f.controls && (f.relative ? f.controls.right.clear() : f.controls.right.copy(f))) : c === o && We(this, s) && (l = d, l.command = w.move, !e && l.controls && (l.relative ? l.controls.left.clear() : l.controls.left.copy(l))));
                o > 0 && !l && (c = o - 1, d = this._renderer.collection[c].copy(this._collection[c]), this.getPointAt(s, d), d.command = w.move, this._renderer.vertices.unshift(d), _ = this._collection[c + 1], _ && _.controls && (d.controls.left.clear(), _.relative ? this._renderer.collection[c + 1].controls.left.copy(_.controls.left).lerp(k.zero, d.t) : (vs.copy(_), this._renderer.collection[c + 1].controls.left.copy(_.controls.left).lerp(_, d.t))));
            }
            return ot.prototype._update.apply(this, arguments), this;
        }
        flagReset() {
            return this._flagVertices = this._flagLength = this._flagFill = this._flagStroke = this._flagLinewidth = this._flagOpacity = this._flagVisible = this._flagCap = this._flagJoin = this._flagMiter = this._flagClip = !1, ot.prototype.flagReset.call(this), this;
        }
    }, L = Gt;
    v(L, "Properties", [
        "fill",
        "stroke",
        "linewidth",
        "opacity",
        "visible",
        "cap",
        "join",
        "miter",
        "closed",
        "curved",
        "automatic",
        "beginning",
        "ending"
    ]), v(L, "Utils", {
        getCurveLength: Ee
    });
    var Fi = {
        linewidth: {
            enumerable: !0,
            get: function() {
                return this._linewidth;
            },
            set: function(i) {
                this._linewidth = i, this._flagLinewidth = !0;
            }
        },
        opacity: {
            enumerable: !0,
            get: function() {
                return this._opacity;
            },
            set: function(i) {
                this._opacity = i, this._flagOpacity = !0;
            }
        },
        visible: {
            enumerable: !0,
            get: function() {
                return this._visible;
            },
            set: function(i) {
                this._visible = i, this._flagVisible = !0;
            }
        },
        cap: {
            enumerable: !0,
            get: function() {
                return this._cap;
            },
            set: function(i) {
                this._cap = i, this._flagCap = !0;
            }
        },
        join: {
            enumerable: !0,
            get: function() {
                return this._join;
            },
            set: function(i) {
                this._join = i, this._flagJoin = !0;
            }
        },
        miter: {
            enumerable: !0,
            get: function() {
                return this._miter;
            },
            set: function(i) {
                this._miter = i, this._flagMiter = !0;
            }
        },
        fill: {
            enumerable: !0,
            get: function() {
                return this._fill;
            },
            set: function(i) {
                (this._fill instanceof W || this._fill instanceof U || this._fill instanceof D || this._fill instanceof B) && this._fill.unbind(p.Types.change, this._renderer.flagFill), this._fill = i, this._flagFill = !0, (this._fill instanceof W || this._fill instanceof U || this._fill instanceof D || this._fill instanceof B) && this._fill.bind(p.Types.change, this._renderer.flagFill);
            }
        },
        stroke: {
            enumerable: !0,
            get: function() {
                return this._stroke;
            },
            set: function(i) {
                (this._stroke instanceof W || this._stroke instanceof U || this._stroke instanceof D || this._stroke instanceof B) && this._stroke.unbind(p.Types.change, this._renderer.flagStroke), this._stroke = i, this._flagStroke = !0, (this._stroke instanceof W || this._stroke instanceof U || this._stroke instanceof D || this._stroke instanceof B) && this._stroke.bind(p.Types.change, this._renderer.flagStroke);
            }
        },
        length: {
            get: function() {
                return this._flagLength && this._updateLength(), this._length;
            }
        },
        closed: {
            enumerable: !0,
            get: function() {
                return this._closed;
            },
            set: function(i) {
                this._closed = !!i, this._flagVertices = !0;
            }
        },
        curved: {
            enumerable: !0,
            get: function() {
                return this._curved;
            },
            set: function(i) {
                this._curved = !!i, this._flagVertices = !0;
            }
        },
        automatic: {
            enumerable: !0,
            get: function() {
                return this._automatic;
            },
            set: function(i) {
                if (i === this._automatic) return;
                this._automatic = !!i;
                let t = this._automatic ? "ignore" : "listen";
                R.each(this.vertices, function(e) {
                    e[t]();
                });
            }
        },
        beginning: {
            enumerable: !0,
            get: function() {
                return this._beginning;
            },
            set: function(i) {
                this._beginning = i, this._flagVertices = !0;
            }
        },
        ending: {
            enumerable: !0,
            get: function() {
                return this._ending;
            },
            set: function(i) {
                this._ending = i, this._flagVertices = !0;
            }
        },
        vertices: {
            enumerable: !0,
            get: function() {
                return this._collection;
            },
            set: function(i) {
                let t = this._renderer.bindVertices, e = this._renderer.unbindVertices;
                this._collection && this._collection.unbind(p.Types.insert, t).unbind(p.Types.remove, e), i instanceof lt ? this._collection = i : this._collection = new lt(i || []), this._collection.bind(p.Types.insert, t).bind(p.Types.remove, e), t(this._collection);
            }
        },
        mask: {
            enumerable: !0,
            get: function() {
                return this._mask;
            },
            set: function(i) {
                this._mask = i, this._flagMask = !0, R.isObject(i) && !i.clip && (i.clip = !0);
            }
        },
        clip: {
            enumerable: !0,
            get: function() {
                return this._clip;
            },
            set: function(i) {
                this._clip = i, this._flagClip = !0;
            }
        },
        dashes: {
            enumerable: !0,
            get: function() {
                return this._dashes;
            },
            set: function(i) {
                typeof i.offset != "number" && (i.offset = this.dashes && this._dashes.offset || 0), this._dashes = i;
            }
        }
    };
    function qe() {
        this._flagVertices = !0, this._flagLength = !0, this.parent && (this.parent._flagLength = !0);
    }
    function Ge(i) {
        let t = i.length;
        for(; t--;)i[t].bind(p.Types.change, this._renderer.flagVertices);
        this._renderer.flagVertices();
    }
    function Ke(i) {
        let t = i.length;
        for(; t--;)i[t].unbind(p.Types.change, this._renderer.flagVertices);
        this._renderer.flagVertices();
    }
    function $e() {
        this._flagFill = !0;
    }
    function Je() {
        this._flagStroke = !0;
    }
    var Ze = class extends L {
        constructor(t, e, s, r){
            let n = [
                new F,
                new F,
                new F,
                new F
            ];
            super(n, !0, !1, !0);
            for(let a in Ti)Object.defineProperty(this, a, Ti[a]);
            this.width = typeof s == "number" ? s : 1, this.height = typeof r == "number" ? r : 1, this.origin = new k, typeof t == "number" && (this.translation.x = t), typeof e == "number" && (this.translation.y = e), this._update();
        }
        _flagWidth = 0;
        _flagHeight = 0;
        _width = 0;
        _height = 0;
        _origin = null;
        _update() {
            if (this._flagVertices || this._flagWidth || this._flagHeight) {
                let t = this._width / 2, e = this._height / 2;
                !this._closed && this.vertices.length === 4 && this.vertices.push(new F), this.vertices[0].set(-t, -e).sub(this._origin).command = w.move, this.vertices[1].set(t, -e).sub(this._origin).command = w.line, this.vertices[2].set(t, e).sub(this._origin).command = w.line, this.vertices[3].set(-t, e).sub(this._origin).command = w.line, this.vertices[4] && (this.vertices[4].set(-t, -e).sub(this._origin).command = w.line);
            }
            return super._update.call(this), this;
        }
        flagReset() {
            return this._flagWidth = this._flagHeight = !1, super.flagReset.call(this), this;
        }
        clone(t) {
            let e = new Ze(0, 0, this.width, this.height);
            e.translation.copy(this.translation), e.rotation = this.rotation, e.scale = this.scale, e.skewX = this.skewX, e.skewY = this.skewY, this.matrix.manual && e.matrix.copy(this.matrix);
            for(let s = 0; s < L.Properties.length; s++){
                let r = L.Properties[s];
                e[r] = this[r];
            }
            return t && t.add(e), e;
        }
        toObject() {
            let t = super.toObject.call(this);
            return t.width = this.width, t.height = this.height, t.origin = this.origin.toObject(), t;
        }
    }, yt = Ze;
    v(yt, "Properties", [
        "width",
        "height"
    ]);
    var Ti = {
        width: {
            enumerable: !0,
            get: function() {
                return this._width;
            },
            set: function(i) {
                this._width = i, this._flagWidth = !0;
            }
        },
        height: {
            enumerable: !0,
            get: function() {
                return this._height;
            },
            set: function(i) {
                this._height = i, this._flagHeight = !0;
            }
        },
        origin: {
            enumerable: !0,
            get: function() {
                return this._origin;
            },
            set: function(i) {
                this._origin && this._origin.unbind(p.Types.change, this._renderer.flagVertices), this._origin = i, this._origin.bind(p.Types.change, this._renderer.flagVertices), this._renderer.flagVertices();
            }
        }
    };
    var Qe = class extends yt {
        _flagTexture = !1;
        _flagColumns = !1;
        _flagRows = !1;
        _flagFrameRate = !1;
        _flagIndex = !1;
        _amount = 1;
        _duration = 0;
        _startTime = 0;
        _playing = !1;
        _firstFrame = 0;
        _lastFrame = 0;
        _loop = !0;
        _texture = null;
        _columns = 1;
        _rows = 1;
        _frameRate = 0;
        _index = 0;
        _origin = null;
        constructor(t, e, s, r, n, a){
            super(e, s, 0, 0);
            for(let o in Mi)Object.defineProperty(this, o, Mi[o]);
            this.noStroke(), this.noFill(), t instanceof B ? this.texture = t : typeof t == "string" && (this.texture = new B(t)), this.origin = new k, this._update(), typeof r == "number" && (this.columns = r), typeof n == "number" && (this.rows = n), typeof a == "number" && (this.frameRate = a), this.index = 0;
        }
        play(t, e, s) {
            return this._playing = !0, this._firstFrame = 0, this._lastFrame = this.amount - 1, this._startTime = R.performance.now(), typeof t == "number" && (this._firstFrame = t), typeof e == "number" && (this._lastFrame = e), typeof s == "function" ? this._onLastFrame = s : delete this._onLastFrame, this._index !== this._firstFrame && (this._startTime -= 1e3 * Math.abs(this._index - this._firstFrame) / this._frameRate), this;
        }
        pause() {
            return this._playing = !1, this;
        }
        stop() {
            return this._playing = !1, this._index = 0, this;
        }
        clone(t) {
            let e = new Qe(this.texture, this.translation.x, this.translation.y, this.columns, this.rows, this.frameRate);
            return this.playing && (e.play(this._firstFrame, this._lastFrame), e._loop = this._loop), t && t.add(e), e;
        }
        toObject() {
            let t = super.toObject.call(this);
            return t.texture = this.texture.toObject(), t.columns = this.columns, t.rows = this.rows, t.frameRate = this.frameRate, t.index = this.index, t._firstFrame = this._firstFrame, t._lastFrame = this._lastFrame, t._loop = this._loop, t;
        }
        _update() {
            let t = this._texture, e = this._columns, s = this._rows, r, n, a, o, h, l, f, u, _;
            if (t && ((this._flagColumns || this._flagRows) && (this._amount = this._columns * this._rows), this._flagFrameRate && (this._duration = 1e3 * this._amount / this._frameRate), this._flagTexture && (this.fill = t), t.loaded)) {
                f = t.image.width, u = t.image.height, r = f / e, n = u / s, o = this._amount, this.width !== r && (this.width = r), this.height !== n && (this.height = n), this._playing && this._frameRate > 0 && (R.isNaN(this._lastFrame) && (this._lastFrame = o - 1), a = R.performance.now() - this._startTime, _ = this._lastFrame + 1, h = 1e3 * (_ - this._firstFrame) / this._frameRate, this._loop ? a = a % h : a = Math.min(a, h), l = nt(this._firstFrame, _, a / h), l = Math.floor(l), l !== this._index && (this._index = l, l >= this._lastFrame - 1 && this._onLastFrame && this._onLastFrame()));
                let d = this._index % e, c = Math.floor(this._index / e), m = -r * d + (f - r) / 2, b = -n * c + (u - n) / 2;
                m !== t.offset.x && (t.offset.x = m), b !== t.offset.y && (t.offset.y = b);
            }
            return super._update.call(this), this;
        }
        flagReset() {
            return this._flagTexture = this._flagColumns = this._flagRows = this._flagFrameRate = !1, super.flagReset.call(this), this;
        }
    }, Bt = Qe;
    v(Bt, "Properties", [
        "texture",
        "columns",
        "rows",
        "frameRate",
        "index"
    ]);
    var Mi = {
        texture: {
            enumerable: !0,
            get: function() {
                return this._texture;
            },
            set: function(i) {
                this._texture = i, this._flagTexture = !0;
            }
        },
        columns: {
            enumerable: !0,
            get: function() {
                return this._columns;
            },
            set: function(i) {
                this._columns = i, this._flagColumns = !0;
            }
        },
        rows: {
            enumerable: !0,
            get: function() {
                return this._rows;
            },
            set: function(i) {
                this._rows = i, this._flagRows = !0;
            }
        },
        frameRate: {
            enumerable: !0,
            get: function() {
                return this._frameRate;
            },
            set: function(i) {
                this._frameRate = i, this._flagFrameRate = !0;
            }
        },
        index: {
            enumerable: !0,
            get: function() {
                return this._index;
            },
            set: function(i) {
                this._index = i, this._flagIndex = !0;
            }
        }
    };
    var ti = Math.cos, ei = Math.sin, le = class extends L {
        _flagRadius = !1;
        _radius = 0;
        constructor(t, e, s, r){
            let n = r ? Math.max(r, 2) : 4, a = [];
            for(let o = 0; o < n; o++)a.push(new F(0, 0, 0, 0, 0, 0));
            super(a, !0, !0, !0);
            for(let o in Ci)Object.defineProperty(this, o, Ci[o]);
            typeof s == "number" && (this.radius = s), this._update(), typeof t == "number" && (this.translation.x = t), typeof e == "number" && (this.translation.y = e);
        }
        _update() {
            if (this._flagVertices || this._flagRadius) {
                let t = this.vertices.length;
                !this._closed && t > 2 && (t -= 1);
                let e = 4 / 3 * Math.tan(Math.PI / (t * 2)), s = this._radius, r = s * e;
                for(let n = 0; n < this.vertices.length; n++){
                    let o = n / t * $, h = s * ti(o), l = s * ei(o), f = r * ti(o - J), u = r * ei(o - J), _ = r * ti(o + J), d = r * ei(o + J), c = this.vertices[n];
                    c.command = n === 0 ? w.move : w.curve, c.set(h, l), c.controls.left.set(f, u), c.controls.right.set(_, d);
                }
            }
            return super._update.call(this), this;
        }
        flagReset() {
            return this._flagRadius = !1, super.flagReset.call(this), this;
        }
        clone(t) {
            let e = new le(0, 0, this.radius, this.vertices.length);
            e.translation.copy(this.translation), e.rotation = this.rotation, e.scale = this.scale, e.skewX = this.skewX, e.skewY = this.skewY, this.matrix.manual && e.matrix.copy(this.matrix);
            for(let s = 0; s < L.Properties.length; s++){
                let r = L.Properties[s];
                e[r] = this[r];
            }
            return t && t.add(e), e;
        }
        toObject() {
            let t = super.toObject.call(this);
            for(let e = 0; e < le.Properties.length; e++){
                let s = le.Properties[e];
                t[s] = this[s];
            }
            return t;
        }
    }, Nt = le;
    v(Nt, "Properties", [
        "radius"
    ]);
    var Ci = {
        radius: {
            enumerable: !0,
            get: function() {
                return this._radius;
            },
            set: function(i) {
                this._radius = i, this._flagRadius = !0;
            }
        }
    };
    var ii = Math.cos, si = Math.sin, he = class extends L {
        _flagWidth = !1;
        _flagHeight = !1;
        _width = 0;
        _height = 0;
        constructor(t, e, s, r, n){
            typeof r != "number" && typeof s == "number" && (r = s);
            let a = n ? Math.max(n, 2) : 4, o = [];
            for(let h = 0; h < a; h++)o.push(new F);
            super(o, !0, !0, !0);
            for(let h in Li)Object.defineProperty(this, h, Li[h]);
            typeof s == "number" && (this.width = s * 2), typeof r == "number" && (this.height = r * 2), this._update(), typeof t == "number" && (this.translation.x = t), typeof e == "number" && (this.translation.y = e);
        }
        _update() {
            if (this._flagVertices || this._flagWidth || this._flagHeight) {
                let t = this.vertices.length;
                !this._closed && t > 2 && (t -= 1);
                let e = 4 / 3 * Math.tan(Math.PI / (this.vertices.length * 2)), s = this._width / 2, r = this._height / 2;
                for(let n = 0; n < this.vertices.length; n++){
                    let o = n / t * $, h = s * ii(o), l = r * si(o), f = s * e * ii(o - J), u = r * e * si(o - J), _ = s * e * ii(o + J), d = r * e * si(o + J), c = this.vertices[n];
                    c.command = n === 0 ? w.move : w.curve, c.set(h, l), c.controls.left.set(f, u), c.controls.right.set(_, d);
                }
            }
            return super._update.call(this), this;
        }
        flagReset() {
            return this._flagWidth = this._flagHeight = !1, super.flagReset.call(this), this;
        }
        clone(t) {
            let e = this.width / 2, s = this.height / 2, r = this.vertices.length, n = new he(0, 0, e, s, r);
            n.translation.copy(this.translation), n.rotation = this.rotation, n.scale = this.scale, n.skewX = this.skewX, n.skewY = this.skewY, this.matrix.manual && n.matrix.copy(this.matrix);
            for(let a = 0; a < L.Properties.length; a++){
                let o = L.Properties[a];
                n[o] = this[o];
            }
            return t && t.add(n), n;
        }
        toObject() {
            let t = super.toObject.call(this);
            for(let e = 0; e < he.Properties.length; e++){
                let s = he.Properties[e];
                t[s] = this[s];
            }
            return t;
        }
    }, jt = he;
    v(jt, "Properties", [
        "width",
        "height"
    ]);
    var Li = {
        width: {
            enumerable: !0,
            get: function() {
                return this._width;
            },
            set: function(i) {
                this._width = i, this._flagWidth = !0;
            }
        },
        height: {
            enumerable: !0,
            get: function() {
                return this._height;
            },
            set: function(i) {
                this._height = i, this._flagHeight = !0;
            }
        }
    };
    var Dt = class extends L {
        constructor(t, e, s, r){
            let n = [
                new F(t, e),
                new F(s, r)
            ];
            super(n);
            for(let a in Oi)Object.defineProperty(this, a, Oi[a]);
            this.vertices[0].command = w.move, this.vertices[1].command = w.line, this.automatic = !1;
        }
    }, Oi = {
        left: {
            enumerable: !0,
            get: function() {
                return this.vertices[0];
            },
            set: function(i) {
                if (R.isObject(i)) this.vertices.splice(0, 1, i);
                else {
                    let t = new et("Two.Line.x argument is not an object.");
                    console.warn(t.name, t.message);
                }
            }
        },
        right: {
            enumerable: !0,
            get: function() {
                return this.vertices[0];
            },
            set: function(i) {
                if (R.isObject(i)) this.vertices.splice(1, 1, i);
                else {
                    let t = new et("Two.Line.y argument is not an object.");
                    console.warn(t.name, t.message);
                }
            }
        }
    };
    var fe = class extends L {
        _flagWidth = !1;
        _flagHeight = !1;
        _flagRadius = !1;
        _width = 0;
        _height = 0;
        _radius = 12;
        constructor(t, e, s, r, n){
            typeof n > "u" && typeof s == "number" && typeof r == "number" && (n = Math.floor(Math.min(s, r) / 12));
            let a = [];
            for(let o = 0; o < 10; o++)a.push(new F(0, 0, 0, 0, 0, 0, o === 0 ? w.move : w.curve));
            super(a);
            for(let o in Pi)Object.defineProperty(this, o, Pi[o]);
            this.closed = !0, this.automatic = !1, this._renderer.flagRadius = ws.bind(this), typeof s == "number" && (this.width = s), typeof r == "number" && (this.height = r), typeof n == "number" && (this.radius = n), this._update(), typeof t == "number" && (this.translation.x = t), typeof e == "number" && (this.translation.y = e);
        }
        _update() {
            if (this._flagVertices || this._flagWidth || this._flagHeight || this._flagRadius) {
                let t = this._width, e = this._height, s, r;
                this._radius instanceof k ? (s = this._radius.x, r = this._radius.y) : (s = this._radius, r = this._radius);
                let n, a = t / 2, o = e / 2;
                n = this.vertices[0], n.x = -(a - s), n.y = -o, n = this.vertices[1], n.x = a - s, n.y = -o, n.controls.left.clear(), n.controls.right.x = s, n.controls.right.y = 0, n = this.vertices[2], n.x = a, n.y = -(o - r), n.controls.right.clear(), n.controls.left.clear(), n = this.vertices[3], n.x = a, n.y = o - r, n.controls.left.clear(), n.controls.right.x = 0, n.controls.right.y = r, n = this.vertices[4], n.x = a - s, n.y = o, n.controls.right.clear(), n.controls.left.clear(), n = this.vertices[5], n.x = -(a - s), n.y = o, n.controls.left.clear(), n.controls.right.x = -s, n.controls.right.y = 0, n = this.vertices[6], n.x = -a, n.y = o - r, n.controls.left.clear(), n.controls.right.clear(), n = this.vertices[7], n.x = -a, n.y = -(o - r), n.controls.left.clear(), n.controls.right.x = 0, n.controls.right.y = -r, n = this.vertices[8], n.x = -(a - s), n.y = -o, n.controls.left.clear(), n.controls.right.clear(), n = this.vertices[9], n.copy(this.vertices[8]);
            }
            return super._update.call(this), this;
        }
        flagReset() {
            return this._flagWidth = this._flagHeight = this._flagRadius = !1, super.flagReset.call(this), this;
        }
        clone(t) {
            let e = this.width, s = this.height, r = this.radius, n = new fe(0, 0, e, s, r);
            n.translation.copy(this.translation), n.rotation = this.rotation, n.scale = this.scale, n.skewX = this.skewX, n.skewY = this.skewY, this.matrix.manual && n.matrix.copy(this.matrix);
            for(let a = 0; a < L.Properties.length; a++){
                let o = L.Properties[a];
                n[o] = this[o];
            }
            return t && t.add(n), n;
        }
        toObject() {
            let t = super.toObject.call(this);
            for(let e = 0; e < fe.Properties.length; e++){
                let s = fe.Properties[e];
                t[s] = this[s];
            }
            return t.radius = typeof this.radius == "number" ? this.radius : this.radius.toObject(), t;
        }
    }, Vt = fe;
    v(Vt, "Properties", [
        "width",
        "height",
        "radius"
    ]);
    var Pi = {
        width: {
            enumerable: !0,
            get: function() {
                return this._width;
            },
            set: function(i) {
                this._width = i, this._flagWidth = !0;
            }
        },
        height: {
            enumerable: !0,
            get: function() {
                return this._height;
            },
            set: function(i) {
                this._height = i, this._flagHeight = !0;
            }
        },
        radius: {
            enumerable: !0,
            get: function() {
                return this._radius;
            },
            set: function(i) {
                this._radius instanceof k && this._radius.unbind(p.Types.change, this._renderer.flagRadius), this._radius = i, this._radius instanceof k && this._radius.bind(p.Types.change, this._renderer.flagRadius), this._flagRadius = !0;
            }
        }
    };
    function ws() {
        this._flagRadius = !0;
    }
    var ri, Ii = Math.min, Bi = Math.max;
    H.document && (ri = document.createElement("canvas"));
    var St = class extends ot {
        _flagValue = !0;
        _flagFamily = !0;
        _flagSize = !0;
        _flagLeading = !0;
        _flagAlignment = !0;
        _flagBaseline = !0;
        _flagStyle = !0;
        _flagWeight = !0;
        _flagDecoration = !0;
        _flagFill = !0;
        _flagStroke = !0;
        _flagLinewidth = !0;
        _flagOpacity = !0;
        _flagVisible = !0;
        _flagMask = !1;
        _flagClip = !1;
        _value = "";
        _family = "sans-serif";
        _size = 13;
        _leading = 17;
        _alignment = "center";
        _baseline = "middle";
        _style = "normal";
        _weight = 500;
        _decoration = "none";
        _fill = "#000";
        _stroke = "transparent";
        _linewidth = 1;
        _opacity = 1;
        _visible = !0;
        _mask = null;
        _clip = !1;
        _dashes = null;
        constructor(t, e, s, r){
            super();
            for(let n in Ni)Object.defineProperty(this, n, Ni[n]);
            if (this._renderer.type = "text", this._renderer.flagFill = ks.bind(this), this._renderer.flagStroke = As.bind(this), this.value = t, typeof e == "number" && (this.translation.x = e), typeof s == "number" && (this.translation.y = s), this.dashes = [], this.dashes.offset = 0, !R.isObject(r)) return this;
            for(let n = 0; n < St.Properties.length; n++){
                let a = St.Properties[n];
                a in r && (this[a] = r[a]);
            }
        }
        static Measure(t) {
            if (ri) {
                let e = ri.getContext("2d");
                e.font = [
                    t._style,
                    t._weight,
                    `${t._size}px/${t._leading}px`,
                    t._family
                ].join(" ");
                let s = e.measureText(t.value, 0, 0), r = s.actualBoundingBoxDescent + s.actualBoundingBoxAscent;
                return {
                    width: s.width,
                    height: r
                };
            } else {
                let e = this.value.length * this.size * St.Ratio, s = this.leading;
                return console.warn("Two.Text: unable to accurately measure text, so using an approximation."), {
                    width: e,
                    height: s
                };
            }
        }
        clone(t) {
            let e = new St(this.value);
            e.translation.copy(this.translation), e.rotation = this.rotation, e.scale = this.scale;
            for(let s = 0; s < St.Properties.length; s++){
                let r = St.Properties[s];
                e[r] = this[r];
            }
            return this.matrix.manual && e.matrix.copy(this.matrix), t && t.add(e), e._update();
        }
        toObject() {
            let t = {
                translation: this.translation.toObject(),
                rotation: this.rotation,
                scale: this.scale
            };
            this.matrix.manual && (t.matrix = this.matrix.toObject());
            for(let e = 0; e < St.Properties.length; e++){
                let s = St.Properties[e];
                t[s] = this[s];
            }
            return t;
        }
        noFill() {
            return this.fill = "transparent", this;
        }
        noStroke() {
            return this.stroke = void 0, this.linewidth = void 0, this;
        }
        getBoundingClientRect(t) {
            let e, s, r, n, a, o, h, l, f;
            this._update(!0), e = t ? this._matrix : pt(this);
            let { width: u , height: _  } = St.Measure(this), d = (this._linewidth || 0) / 2;
            switch(this.alignment){
                case "left":
                    o = -d, h = u + d;
                    break;
                case "right":
                    o = -(u + d), h = d;
                    break;
                default:
                    o = -(u / 2 + d), h = u / 2 + d;
            }
            switch(this.baseline){
                case "middle":
                    l = -(_ / 2 + d), f = _ / 2 + d;
                    break;
                default:
                    l = -(_ + d), f = d;
            }
            return s = e.multiply(o, l, 1), r = e.multiply(o, f, 1), n = e.multiply(h, l, 1), a = e.multiply(h, f, 1), l = Ii(s.y, r.y, n.y, a.y), o = Ii(s.x, r.x, n.x, a.x), h = Bi(s.x, r.x, n.x, a.x), f = Bi(s.y, r.y, n.y, a.y), {
                top: l,
                left: o,
                right: h,
                bottom: f,
                width: h - o,
                height: f - l
            };
        }
        flagReset() {
            return super.flagReset.call(this), this._flagValue = this._flagFamily = this._flagSize = this._flagLeading = this._flagAlignment = this._flagFill = this._flagStroke = this._flagLinewidth = this._flagOpacity = this._flagVisible = this._flagClip = this._flagDecoration = this._flagClassName = this._flagBaseline = this._flagWeight = this._flagStyle = !1, this;
        }
    }, ct = St;
    v(ct, "Ratio", .6), v(ct, "Properties", [
        "value",
        "family",
        "size",
        "leading",
        "alignment",
        "linewidth",
        "style",
        "weight",
        "decoration",
        "baseline",
        "opacity",
        "visible",
        "fill",
        "stroke"
    ]);
    var Ni = {
        value: {
            enumerable: !0,
            get: function() {
                return this._value;
            },
            set: function(i) {
                this._value = i, this._flagValue = !0;
            }
        },
        family: {
            enumerable: !0,
            get: function() {
                return this._family;
            },
            set: function(i) {
                this._family = i, this._flagFamily = !0;
            }
        },
        size: {
            enumerable: !0,
            get: function() {
                return this._size;
            },
            set: function(i) {
                this._size = i, this._flagSize = !0;
            }
        },
        leading: {
            enumerable: !0,
            get: function() {
                return this._leading;
            },
            set: function(i) {
                this._leading = i, this._flagLeading = !0;
            }
        },
        alignment: {
            enumerable: !0,
            get: function() {
                return this._alignment;
            },
            set: function(i) {
                this._alignment = i, this._flagAlignment = !0;
            }
        },
        linewidth: {
            enumerable: !0,
            get: function() {
                return this._linewidth;
            },
            set: function(i) {
                this._linewidth = i, this._flagLinewidth = !0;
            }
        },
        style: {
            enumerable: !0,
            get: function() {
                return this._style;
            },
            set: function(i) {
                this._style = i, this._flagStyle = !0;
            }
        },
        weight: {
            enumerable: !0,
            get: function() {
                return this._weight;
            },
            set: function(i) {
                this._weight = i, this._flagWeight = !0;
            }
        },
        decoration: {
            enumerable: !0,
            get: function() {
                return this._decoration;
            },
            set: function(i) {
                this._decoration = i, this._flagDecoration = !0;
            }
        },
        baseline: {
            enumerable: !0,
            get: function() {
                return this._baseline;
            },
            set: function(i) {
                this._baseline = i, this._flagBaseline = !0;
            }
        },
        opacity: {
            enumerable: !0,
            get: function() {
                return this._opacity;
            },
            set: function(i) {
                this._opacity = i, this._flagOpacity = !0;
            }
        },
        visible: {
            enumerable: !0,
            get: function() {
                return this._visible;
            },
            set: function(i) {
                this._visible = i, this._flagVisible = !0;
            }
        },
        fill: {
            enumerable: !0,
            get: function() {
                return this._fill;
            },
            set: function(i) {
                (this._fill instanceof W || this._fill instanceof U || this._fill instanceof D || this._fill instanceof B) && this._fill.unbind(p.Types.change, this._renderer.flagFill), this._fill = i, this._flagFill = !0, (this._fill instanceof W || this._fill instanceof U || this._fill instanceof D || this._fill instanceof B) && this._fill.bind(p.Types.change, this._renderer.flagFill);
            }
        },
        stroke: {
            enumerable: !0,
            get: function() {
                return this._stroke;
            },
            set: function(i) {
                (this._stroke instanceof W || this._stroke instanceof U || this._stroke instanceof D || this._stroke instanceof B) && this._stroke.unbind(p.Types.change, this._renderer.flagStroke), this._stroke = i, this._flagStroke = !0, (this._stroke instanceof W || this._stroke instanceof U || this._stroke instanceof D || this._stroke instanceof B) && this._stroke.bind(p.Types.change, this._renderer.flagStroke);
            }
        },
        mask: {
            enumerable: !0,
            get: function() {
                return this._mask;
            },
            set: function(i) {
                this._mask = i, this._flagMask = !0, R.isObject(i) && !i.clip && (i.clip = !0);
            }
        },
        clip: {
            enumerable: !0,
            get: function() {
                return this._clip;
            },
            set: function(i) {
                this._clip = i, this._flagClip = !0;
            }
        },
        dashes: {
            enumerable: !0,
            get: function() {
                return this._dashes;
            },
            set: function(i) {
                typeof i.offset != "number" && (i.offset = this.dashes && this._dashes.offset || 0), this._dashes = i;
            }
        }
    };
    function ks() {
        this._flagFill = !0;
    }
    function As() {
        this._flagStroke = !0;
    }
    var Ft = {
        path: /[+-]?(?:\d*\.\d+|\d+)(?:[eE][+-]\d+)?/g,
        cssBackgroundImage: /url\(['"]?#([\w\d-_]*)['"]?\)/i,
        unitSuffix: /[a-zA-Z%]*/i
    }, Ss = {
        start: "left",
        middle: "center",
        end: "right"
    }, ji = [
        "id",
        "class",
        "transform",
        "xmlns",
        "viewBox"
    ], Rs = [
        "x",
        "y",
        "width",
        "height",
        "href",
        "xlink:href"
    ];
    function Es(i) {
        return Ss[i];
    }
    function Fs(i) {
        let t = i.getAttribute("dominant-baseline"), e = i.getAttribute("alignment-baseline");
        return t || e;
    }
    function ce(i) {
        return i.replace(/svg:/ig, "").toLowerCase();
    }
    function Vi(i, t) {
        if (t.x += i.translateX, t.y += i.translateY, t.x *= i.scaleX, t.y *= i.scaleY, i.rotation !== 0) {
            let e = t.length();
            t.x = e * Math.cos(i.rotation), t.y = e * Math.sin(i.rotation);
        }
    }
    function Ts(i, t) {
        t || (t = {});
        let e = i.split(";");
        for(let s = 0; s < e.length; s++){
            let r = e[s].split(":"), n = r[0], a = r[1];
            typeof n > "u" || typeof a > "u" || (t[n] = a.replace(/\s/, ""));
        }
        return t;
    }
    function Ms(i) {
        let t = {}, e = Cs(i), s = Math.max(e.length, i.style.length);
        for(let r = 0; r < s; r++){
            let n = i.style[r], a = e[r];
            n && (t[n] = i.style[n]), a && (t[a] = i.getAttribute(a));
        }
        return t;
    }
    function Cs(i) {
        let t = i.getAttributeNames();
        for(let e = 0; e < ji.length; e++){
            let s = ji[e], r = Array.prototype.indexOf.call(t, s);
            r >= 0 && t.splice(r, 1);
        }
        return t;
    }
    function Ls(i, t) {
        let e = t.split(/[\s,]/), s = -parseFloat(e[0]), r = -parseFloat(e[1]), n = parseFloat(e[2]), a = parseFloat(e[3]);
        if (s && r) for(let u = 0; u < i.children.length; u++){
            let _ = i.children[u];
            "translation" in _ ? _.translation.add(s, r) : "x" in _ ? _.x = s : "y" in _ && (_.y = r);
        }
        let o = typeof i.x == "number", h = typeof i.y == "number", l = typeof i.width == "number", f = typeof i.height == "number";
        return o && (i.translation.x += i.x), h && (i.translation.y += i.y), (l || f) && (i.scale = new k(1, 1)), l && (i.scale.x = i.width / n), f && (i.scale.y = i.height / a), i.mask = new yt(0, 0, n, a), i.mask.origin.set(-n / 2, -a / 2), i;
    }
    function wt(i, t, e) {
        let s = {}, r = {}, n = {}, a, o, h, l, f, u, _, d, c, m, b, g, y, x, S, A, E;
        if (H.getComputedStyle) {
            let C = H.getComputedStyle(i);
            for(a = C.length; a--;)h = C[a], l = C[h], typeof l < "u" && (s[h] = l);
        }
        for(a = 0; a < i.attributes.length; a++)u = i.attributes[a], /style/i.test(u.nodeName) ? Ts(u.value, n) : r[u.nodeName] = u.value;
        typeof s.opacity < "u" && (s["stroke-opacity"] = s.opacity, s["fill-opacity"] = s.opacity, delete s.opacity), e && R.defaults(s, e), R.extend(s, n, r), s.visible = !(typeof s.display > "u" && /none/i.test(s.display)) || typeof s.visibility > "u" && /hidden/i.test(s.visibility);
        for(h in s)switch(l = s[h], h){
            case "gradientTransform":
                if (/none/i.test(l) || (o = i.gradientTransform && i.gradientTransform.baseVal && i.gradientTransform.baseVal.length > 0 ? i.gradientTransform.baseVal[0].matrix : i.getCTM ? i.getCTM() : null, o === null)) break;
                switch(_ = Ot(o), t._renderer.type){
                    case "linear-gradient":
                        Vi(_, t.left), Vi(_, t.right);
                        break;
                    case "radial-gradient":
                        t.center.x += _.translateX, t.center.y += _.translateY, t.focal.x += _.translateX, t.focal.y += _.translateY, t.radius *= Math.max(_.scaleX, _.scaleY);
                        break;
                }
                break;
            case "transform":
                if (/none/i.test(l) || (o = i.transform && i.transform.baseVal && i.transform.baseVal.length > 0 ? i.transform.baseVal[0].matrix : i.getCTM ? i.getCTM() : null, o === null)) break;
                Y.AutoCalculateImportedMatrices ? (_ = Ot(o), t.translation.set(_.translateX, _.translateY), t.rotation = Math.PI * (_.rotation / 180), t.scale = new k(_.scaleX, _.scaleY), d = parseFloat((s.x + "").replace("px")), c = parseFloat((s.y + "").replace("px")), d && (t.translation.x = d), c && (t.translation.y = c)) : (o = i.getCTM(), t._matrix.manual = !0, t._matrix.set(o.a, o.b, o.c, o.d, o.e, o.f));
                break;
            case "visible":
                if (t instanceof q) {
                    t._visible = l;
                    break;
                }
                t.visible = l;
                break;
            case "stroke-linecap":
                if (t instanceof q) {
                    t._cap = l;
                    break;
                }
                t.cap = l;
                break;
            case "stroke-linejoin":
                if (t instanceof q) {
                    t._join = l;
                    break;
                }
                t.join = l;
                break;
            case "stroke-miterlimit":
                if (t instanceof q) {
                    t._miter = l;
                    break;
                }
                t.miter = l;
                break;
            case "stroke-width":
                if (t instanceof q) {
                    t._linewidth = parseFloat(l);
                    break;
                }
                t.linewidth = parseFloat(l);
                break;
            case "opacity":
            case "stroke-opacity":
            case "fill-opacity":
                if (t instanceof q) {
                    t._opacity = parseFloat(l);
                    break;
                }
                t.opacity = parseFloat(l);
                break;
            case "clip-path":
                if (Ft.cssBackgroundImage.test(l) && (m = l.replace(Ft.cssBackgroundImage, "$1"), G.defs.current && G.defs.current.contains(m) && (g = G.defs.current.get(m), g && g.childNodes.length > 0))) switch(g = g.childNodes[0], y = ce(g.nodeName), t.mask = G[y].call(this, g, {}), t._renderer.type){
                    case "text":
                    case "path":
                        t.position.add(t.mask.position), t.mask.position.clear();
                        break;
                }
                break;
            case "fill":
            case "stroke":
                f = (t instanceof q ? "_" : "") + h, Ft.cssBackgroundImage.test(l) ? (m = l.replace(Ft.cssBackgroundImage, "$1"), G.defs.current && G.defs.current.contains(m) ? (g = G.defs.current.get(m), g.object || (y = ce(g.nodeName), g.object = G[y].call(this, g, {})), g = g.object) : (b = Ps(this), g = b.getById(m)), t[f] = g) : t[f] = /none/i.test(l) ? "transparent" : l;
                break;
            case "id":
                t.id = l;
                break;
            case "class":
            case "className":
                t.classList = l.split(" "), t._flagClassName = !0;
                break;
            case "x":
            case "y":
                if (x = t instanceof W, S = t instanceof U, A = t instanceof D, x || S || A) break;
                l.match("[a-z%]$") && !l.endsWith("px") && (E = new et("only pixel values are supported with the " + h + " attribute."), console.warn(E.name, E.message)), t.translation[h] = parseFloat(l);
                break;
            case "font-family":
                t instanceof ct && (t.family = l);
                break;
            case "font-size":
                t instanceof ct && (t.size = l);
                break;
            case "font-weight":
                t instanceof ct && (t.weight = l);
                break;
            case "font-style":
                t instanceof ct && (t.style = l);
                break;
            case "text-decoration":
                t instanceof ct && (t.decoration = l);
                break;
            case "line-height":
                t instanceof ct && (t.leading = l);
                break;
        }
        return Object.keys(i.dataset).length && (t.dataset = i.dataset), s;
    }
    function Os(i, t) {
        for(let e = 0, s = i.childNodes.length; e < s; e++){
            let r = i.childNodes[e];
            !r.id || ce(i.nodeName) === "#text" || t.add(r.id, r);
        }
    }
    function Ps(i) {
        for(; i.parent;)i = i.parent;
        return i.scene;
    }
    var G = {
        svg: function(i) {
            let t = G.defs.current = new Et, e = i.getElementsByTagName("defs");
            for(let c = 0; c < e.length; c++)Os(e[c], t);
            let s = G.g.call(this, i), r = i.getAttribute("viewBox"), n = i.getAttribute("x"), a = i.getAttribute("y"), o = i.getAttribute("width"), h = i.getAttribute("height");
            s.defs = t;
            let l = r !== null, f = n !== null, u = a !== null, _ = o !== null, d = h !== null;
            return f && (s.x = parseFloat(n.replace(Ft.unitSuffix, ""))), u && (s.y = parseFloat(a.replace(Ft.unitSuffix, ""))), _ && (s.width = parseFloat(o.replace(Ft.unitSuffix, ""))), d && (s.height = parseFloat(h.replace(Ft.unitSuffix, ""))), l && Ls(s, r), delete G.defs.current, s;
        },
        defs: function(i) {
            return null;
        },
        use: function(i, t) {
            let e, s = i.getAttribute("href") || i.getAttribute("xlink:href");
            if (!s) return e = new et("encountered <use /> with no href."), console.warn(e.name, e.message), null;
            let r = s.slice(1);
            if (!G.defs.current.contains(r)) return e = new et("unable to find element for reference " + s + "."), console.warn(e.name, e.message), null;
            let a = G.defs.current.get(r).cloneNode(!0);
            for(let h = 0; h < i.attributes.length; h++){
                let l = i.attributes[h], f = Rs.includes(l.nodeName), u = !a.hasAttribute(l.nodeName);
                (f || u) && a.setAttribute(l.nodeName, l.value);
            }
            let o = ce(a.nodeName);
            return G[o].call(this, a, t);
        },
        g: function(i, t) {
            let e = new q;
            wt.call(this, i, e, t), this.add(e);
            let s = Ms.call(this, i);
            for(let r = 0, n = i.childNodes.length; r < n; r++){
                let a = i.childNodes[r], o = a.nodeName;
                if (!o) return;
                let h = ce(o);
                if (h in G) {
                    let l = G[h].call(e, a, s);
                    !!l && !l.parent && e.add(l);
                }
            }
            return e;
        },
        polygon: function(i, t) {
            let e;
            typeof i == "string" ? e = i : e = i.getAttribute("points");
            let s = [];
            e.replace(/(-?[\d.eE-]+)[,|\s](-?[\d.eE-]+)/g, function(n, a, o) {
                s.push(new F(parseFloat(a), parseFloat(o)));
            });
            let r = new L(s, !0).noStroke();
            return r.fill = "black", wt.call(this, i, r, t), r;
        },
        polyline: function(i, t) {
            let e = G.polygon.call(this, i, t);
            return e.closed = !1, e;
        },
        path: function(i, t) {
            let e;
            typeof i == "string" ? e = i : e = i.getAttribute("d");
            let s = [], r = !1, n = !1;
            if (e) {
                let o = new F, h, l, f = e.match(/[a-df-z][^a-df-z]*/ig), u = f.length - 1;
                R.each(f.slice(0), function(_, d) {
                    let c = _.slice(1).trim().match(Ft.path), m = _[0], b = m.toLowerCase(), g, y, x, S, A, E = [];
                    switch(d === 0 && (f = []), b){
                        case "h":
                        case "v":
                            c.length > 1 && (g = 1);
                            break;
                        case "m":
                        case "l":
                        case "t":
                            c.length > 2 && (g = 2);
                            break;
                        case "s":
                        case "q":
                            c.length > 4 && (g = 4);
                            break;
                        case "c":
                            c.length > 6 && (g = 6);
                            break;
                        case "a":
                            c.length > 7 && (g = 7);
                            break;
                    }
                    if (g) {
                        for(y = 0, x = c.length, A = 0; y < x; y += g){
                            if (S = m, A > 0) switch(m){
                                case "m":
                                    S = "l";
                                    break;
                                case "M":
                                    S = "L";
                                    break;
                            }
                            E.push(S + c.slice(y, y + g).join(" ")), A++;
                        }
                        f = Array.prototype.concat.apply(f, E);
                    } else f.push(_);
                }), R.each(f, function(_, d) {
                    let c, m, b, g = _[0], y = g.toLowerCase();
                    l = _.slice(1).trim().match(Ft.path), n = g === y;
                    let x, S, A, E, C, N, M, T, j, z, X, V, ut, dt, Z, _t, rt;
                    switch(y){
                        case "z":
                            if (d >= u) r = !0;
                            else {
                                m = o.x, b = o.y, c = new F(m, b, void 0, void 0, void 0, void 0, w.close);
                                for(let Tt = s.length - 1; Tt >= 0; Tt--){
                                    let Ct = s[Tt];
                                    if (/m/i.test(Ct.command)) {
                                        o = Ct;
                                        break;
                                    }
                                }
                            }
                            break;
                        case "m":
                        case "l":
                            h = void 0, m = parseFloat(l[0]), b = parseFloat(l[1]), c = new F(m, b, void 0, void 0, void 0, void 0, /m/i.test(y) ? w.move : w.line), n && c.addSelf(o), o = c;
                            break;
                        case "h":
                        case "v":
                            z = /h/i.test(y) ? "x" : "y", X = /x/i.test(z) ? "y" : "x", c = new F(void 0, void 0, void 0, void 0, void 0, void 0, w.line), c[z] = parseFloat(l[0]), c[X] = o[X], n && (c[z] += o[z]), o = c;
                            break;
                        case "c":
                        case "s":
                            x = o.x, S = o.y, h || (h = new k), /c/i.test(y) ? (A = parseFloat(l[0]), E = parseFloat(l[1]), C = parseFloat(l[2]), N = parseFloat(l[3]), M = parseFloat(l[4]), T = parseFloat(l[5])) : (j = xe(o, h, n), A = j.x, E = j.y, C = parseFloat(l[0]), N = parseFloat(l[1]), M = parseFloat(l[2]), T = parseFloat(l[3])), n && (A += x, E += S, C += x, N += S, M += x, T += S), o.controls.right.set(A - o.x, E - o.y), c = new F(M, T, C - M, N - T, void 0, void 0, w.curve), o = c, h = c.controls.left;
                            break;
                        case "t":
                        case "q":
                            x = o.x, S = o.y, h || (h = new k), /q/i.test(y) ? (A = parseFloat(l[0]), E = parseFloat(l[1]), C = parseFloat(l[0]), N = parseFloat(l[1]), M = parseFloat(l[2]), T = parseFloat(l[3])) : (j = xe(o, h, n), A = j.x, E = j.y, C = j.x, N = j.y, M = parseFloat(l[0]), T = parseFloat(l[1])), n && (A += x, E += S, C += x, N += S, M += x, T += S), o.controls.right.set((A - o.x) * .33, (E - o.y) * .33), c = new F(M, T, C - M, N - T, void 0, void 0, w.curve), o = c, h = c.controls.left;
                            break;
                        case "a":
                            x = o.x, S = o.y, ut = parseFloat(l[0]), dt = parseFloat(l[1]), Z = parseFloat(l[2]), _t = parseFloat(l[3]), rt = parseFloat(l[4]), M = parseFloat(l[5]), T = parseFloat(l[6]), n && (M += x, T += S), V = new F(M, T), V.command = w.arc, V.rx = ut, V.ry = dt, V.xAxisRotation = Z, V.largeArcFlag = _t, V.sweepFlag = rt, c = V, o = V, h = void 0;
                            break;
                    }
                    c && (Array.isArray(c) ? s = s.concat(c) : s.push(c));
                });
            }
            e = new L(s, r, void 0, !0).noStroke(), e.fill = "black";
            let a = e.getBoundingClientRect(!0);
            return a.centroid = {
                x: a.left + a.width / 2,
                y: a.top + a.height / 2
            }, R.each(e.vertices, function(o) {
                o.subSelf(a.centroid);
            }), wt.call(this, i, e, t), e.translation.addSelf(a.centroid), e;
        },
        circle: function(i, t) {
            let e = parseFloat(i.getAttribute("cx")), s = parseFloat(i.getAttribute("cy")), r = parseFloat(i.getAttribute("r")), n = new Nt(0, 0, r).noStroke();
            return n.fill = "black", wt.call(this, i, n, t), n.translation.x = e, n.translation.y = s, n;
        },
        ellipse: function(i, t) {
            let e = parseFloat(i.getAttribute("cx")), s = parseFloat(i.getAttribute("cy")), r = parseFloat(i.getAttribute("rx")), n = parseFloat(i.getAttribute("ry")), a = new jt(0, 0, r, n).noStroke();
            return a.fill = "black", wt.call(this, i, a, t), a.translation.x = e, a.translation.y = s, a;
        },
        rect: function(i, t) {
            let e = parseFloat(i.getAttribute("rx")), s = parseFloat(i.getAttribute("ry"));
            if (!R.isNaN(e) || !R.isNaN(s)) return G["rounded-rect"](i);
            let r = parseFloat(i.getAttribute("width")), n = parseFloat(i.getAttribute("height")), a = r / 2, o = n / 2, h = new yt(0, 0, r, n).noStroke();
            return h.fill = "black", wt.call(this, i, h, t), h.translation.x += a, h.translation.y += o, h;
        },
        "rounded-rect": function(i, t) {
            let e = parseFloat(i.getAttribute("rx")) || 0, s = parseFloat(i.getAttribute("ry")) || 0, r = parseFloat(i.getAttribute("width")), n = parseFloat(i.getAttribute("height")), a = r / 2, o = n / 2, h = new k(e, s), l = new Vt(0, 0, r, n, h).noStroke();
            return l.fill = "black", wt.call(this, i, l, t), l.translation.x += a, l.translation.y += o, l;
        },
        line: function(i, t) {
            let e = parseFloat(i.getAttribute("x1")), s = parseFloat(i.getAttribute("y1")), r = parseFloat(i.getAttribute("x2")), n = parseFloat(i.getAttribute("y2")), a = new Dt(e, s, r, n).noFill();
            return wt.call(this, i, a, t), a;
        },
        lineargradient: function(i, t) {
            let e = i.getAttribute("gradientUnits"), s = i.getAttribute("spreadMethod");
            e || (e = "objectBoundingBox"), s || (s = "pad");
            let r = parseFloat(i.getAttribute("x1") || 0), n = parseFloat(i.getAttribute("y1") || 0), a = parseFloat(i.getAttribute("x2") || 0), o = parseFloat(i.getAttribute("y2") || 0), h = (a + r) / 2, l = (o + n) / 2;
            /userSpaceOnUse/i.test(e) && (r -= h, n -= l, a -= h, o -= l);
            let f = [];
            for(let _ = 0; _ < i.children.length; _++){
                let d = i.children[_], c = d.getAttribute("offset");
                /%/ig.test(c) && (c = parseFloat(c.replace(/%/ig, "")) / 100), c = parseFloat(c);
                let m = d.getAttribute("stop-color"), b = d.getAttribute("stop-opacity"), g = d.getAttribute("style"), y;
                m === null && (y = g ? g.match(/stop-color:\s?([#a-fA-F0-9]*)/) : !1, m = y && y.length > 1 ? y[1] : void 0), b === null ? (y = g ? g.match(/stop-opacity:\s?([0-9.-]*)/) : !1, b = y && y.length > 1 ? parseFloat(y[1]) : 1) : b = parseFloat(b), f.push(new ft(c, m, b));
            }
            let u = new U(r, n, a, o, f);
            return u.spread = s, u.units = e, wt.call(this, i, u, t), u;
        },
        radialgradient: function(i, t) {
            let e = i.getAttribute("gradientUnits"), s = i.getAttribute("spreadMethod");
            e || (e = "objectBoundingBox"), s || (s = "pad");
            let r = parseFloat(i.getAttribute("cx")) || 0, n = parseFloat(i.getAttribute("cy")) || 0, a = parseFloat(i.getAttribute("r")), o = parseFloat(i.getAttribute("fx")), h = parseFloat(i.getAttribute("fy"));
            R.isNaN(o) && (o = r), R.isNaN(h) && (h = n);
            let l = Math.abs(r + o) / 2, f = Math.abs(n + h) / 2;
            /userSpaceOnUse/i.test(e) && (r -= l, n -= f, o -= l, h -= f);
            let u = [];
            for(let d = 0; d < i.children.length; d++){
                let c = i.children[d], m = c.getAttribute("offset");
                /%/ig.test(m) && (m = parseFloat(m.replace(/%/ig, "")) / 100), m = parseFloat(m);
                let b = c.getAttribute("stop-color"), g = c.getAttribute("stop-opacity"), y = c.getAttribute("style"), x;
                b === null && (x = y ? y.match(/stop-color:\s?([#a-fA-F0-9]*)/) : !1, b = x && x.length > 1 ? x[1] : void 0), g === null ? (x = y ? y.match(/stop-opacity:\s?([0-9.-]*)/) : !1, g = x && x.length > 1 ? parseFloat(x[1]) : 1) : g = parseFloat(g), u.push(new ft(m, b, g));
            }
            let _ = new D(r, n, a, u, o, h);
            return _.spread = s, _.units = e, wt.call(this, i, _, t), _;
        },
        text: function(i, t) {
            let e = Es(i.getAttribute("text-anchor")) || "left", s = Fs(i) || "baseline", r = i.textContent, n = new ct(r);
            return wt.call(this, i, n, t), n.alignment = e, n.baseline = s, n;
        },
        clippath: function(i, t) {
            return G.defs.current && !G.defs.current.contains(i.id) && G.defs.current.add(i.id, i), null;
        },
        image: function(i, t) {
            let e, s = i.getAttribute("href") || i.getAttribute("xlink:href");
            if (!s) return e = new et("encountered <image /> with no href."), console.warn(e.name, e.message), null;
            let r = parseFloat(i.getAttribute("x")) || 0, n = parseFloat(i.getAttribute("y")) || 0, a = parseFloat(i.getAttribute("width")), o = parseFloat(i.getAttribute("height")), h = new Bt(s, r, n);
            return R.isNaN(a) || (h.width = a), R.isNaN(o) || (h.height = o), wt.call(this, i, h, t), h;
        }
    };
    function ni(i, t) {
        let e = new XMLHttpRequest;
        return e.open("GET", i), e.onreadystatechange = function() {
            e.readyState === 4 && e.status === 200 && t(e.responseText);
        }, e.send(), e;
    }
    var Te = class extends yt {
        _flagTextures = !1;
        _flagFrameRate = !1;
        _flagIndex = !1;
        _amount = 1;
        _duration = 0;
        _index = 0;
        _startTime = 0;
        _playing = !1;
        _firstFrame = 0;
        _lastFrame = 0;
        _loop = !0;
        _textures = null;
        _frameRate = 0;
        _origin = null;
        constructor(t, e, s, r){
            super(e, s, 0, 0);
            for(let n in zi)Object.defineProperty(this, n, zi[n]);
            this._renderer.flagTextures = Is.bind(this), this._renderer.bindTextures = Bs.bind(this), this._renderer.unbindTextures = Ns.bind(this), this.noStroke(), this.noFill(), Array.isArray(t) ? this.textures = t.map(Ui.bind(this)) : this.textures = [
                Ui(t)
            ], this.origin = new k, this._update(), typeof r == "number" ? this.frameRate = r : this.frameRate = Te.DefaultFrameRate, this.index = 0;
        }
        play(t, e, s) {
            return this._playing = !0, this._firstFrame = 0, this._lastFrame = this.amount - 1, this._startTime = R.performance.now(), typeof t == "number" && (this._firstFrame = t), typeof e == "number" && (this._lastFrame = e), typeof s == "function" ? this._onLastFrame = s : delete this._onLastFrame, this._index !== this._firstFrame && (this._startTime -= 1e3 * Math.abs(this._index - this._firstFrame) / this._frameRate), this;
        }
        pause() {
            return this._playing = !1, this;
        }
        stop() {
            return this._playing = !1, this._index = this._firstFrame, this;
        }
        clone(t) {
            let e = new Te(this.textures, this.translation.x, this.translation.y, this.frameRate);
            return e._loop = this._loop, this._playing && e.play(), t && t.add(e), e;
        }
        toObject() {
            let t = super.toObject.call(this);
            return t.textures = this.textures.map(function(e) {
                return e.toObject();
            }), t.frameRate = this.frameRate, t.index = this.index, t._firstFrame = this._firstFrame, t._lastFrame = this._lastFrame, t._loop = this._loop, t;
        }
        _update() {
            let t = this._textures, e, s, r, n, a, o, h, l;
            return t && (this._flagTextures && (this._amount = t.length), this._flagFrameRate && (this._duration = 1e3 * this._amount / this._frameRate), this._playing && this._frameRate > 0 ? (n = this._amount, R.isNaN(this._lastFrame) && (this._lastFrame = n - 1), r = R.performance.now() - this._startTime, l = this._lastFrame + 1, a = 1e3 * (l - this._firstFrame) / this._frameRate, this._loop ? r = r % a : r = Math.min(r, a), h = nt(this._firstFrame, l, r / a), h = Math.floor(h), h !== this._index && (this._index = h, o = t[this._index], o.loaded && (e = o.image.width, s = o.image.height, this.width !== e && (this.width = e), this.height !== s && (this.height = s), this.fill = o, h >= this._lastFrame - 1 && this._onLastFrame && this._onLastFrame()))) : (this._flagIndex || !(this.fill instanceof B)) && (o = t[this._index], o.loaded && (e = o.image.width, s = o.image.height, this.width !== e && (this.width = e), this.height !== s && (this.height = s)), this.fill = o)), super._update.call(this), this;
        }
        flagReset() {
            return this._flagTextures = this._flagFrameRate = !1, super.flagReset.call(this), this;
        }
    }, Ht = Te;
    v(Ht, "Properties", [
        "textures",
        "frameRate",
        "index"
    ]), v(Ht, "DefaultFrameRate", 30);
    var zi = {
        frameRate: {
            enumerable: !0,
            get: function() {
                return this._frameRate;
            },
            set: function(i) {
                this._frameRate = i, this._flagFrameRate = !0;
            }
        },
        index: {
            enumerable: !0,
            get: function() {
                return this._index;
            },
            set: function(i) {
                this._index = i, this._flagIndex = !0;
            }
        },
        textures: {
            enumerable: !0,
            get: function() {
                return this._textures;
            },
            set: function(i) {
                let t = this._renderer.bindTextures, e = this._renderer.unbindTextures;
                this._textures && this._textures.unbind(p.Types.insert, t).unbind(p.Types.remove, e), this._textures = new lt((i || []).slice(0)), this._textures.bind(p.Types.insert, t).bind(p.Types.remove, e), t(this._textures);
            }
        }
    };
    function Is() {
        this._flagTextures = !0;
    }
    function Bs(i) {
        let t = i.length;
        for(; t--;)i[t].bind(p.Types.change, this._renderer.flagTextures);
        this._renderer.flagTextures();
    }
    function Ns(i) {
        let t = i.length;
        for(; t--;)i[t].unbind(p.Types.change, this._renderer.flagTextures);
        this._renderer.flagTextures();
    }
    function Ui(i) {
        if (i instanceof B) return i;
        if (typeof i == "string") return new B(i);
    }
    var ue = class extends L {
        _flagStartAngle = !1;
        _flagEndAngle = !1;
        _flagInnerRadius = !1;
        _flagOuterRadius = !1;
        _startAngle = 0;
        _endAngle = $;
        _innerRadius = 0;
        _outerRadius = 0;
        constructor(t, e, s, r, n, a, o){
            let h = o || Y.Resolution * 3, l = [];
            for(let f = 0; f < h; f++)l.push(new F);
            super(l, !0, !1, !0);
            for(let f in Di)Object.defineProperty(this, f, Di[f]);
            typeof s == "number" && (this.innerRadius = s), typeof r == "number" && (this.outerRadius = r), typeof n == "number" && (this.startAngle = n), typeof a == "number" && (this.endAngle = a), this._update(), typeof t == "number" && (this.translation.x = t), typeof e == "number" && (this.translation.y = e);
        }
        _update() {
            if (this._flagVertices || this._flagStartAngle || this._flagEndAngle || this._flagInnerRadius || this._flagOuterRadius) {
                let t = this._startAngle, e = this._endAngle, s = this._innerRadius, r = this._outerRadius, n = it(t, $) === it(e, $), a = s > 0, o = this.vertices, h = a ? o.length / 2 : o.length, l, f = 0, u, _, d, c, m, b, g, y, x;
                for(n ? h-- : a || (h -= 2), u = 0, _ = h - 1; u < h; u++){
                    switch(d = u / _, c = o[f], m = d * (e - t) + t, b = (e - t) / h, g = r * Math.cos(m), y = r * Math.sin(m), u){
                        case 0:
                            l = w.move;
                            break;
                        default:
                            l = w.curve;
                    }
                    c.command = l, c.x = g, c.y = y, c.controls.left.clear(), c.controls.right.clear(), c.command === w.curve && (x = r * b / Math.PI, c.controls.left.x = x * Math.cos(m - J), c.controls.left.y = x * Math.sin(m - J), c.controls.right.x = x * Math.cos(m + J), c.controls.right.y = x * Math.sin(m + J), u === 1 && c.controls.left.multiplyScalar(2), u === _ && c.controls.right.multiplyScalar(2)), f++;
                }
                if (a) {
                    for(n ? (o[f].command = w.close, f++) : (h--, _ = h - 1), u = 0; u < h; u++)d = u / _, c = o[f], m = (1 - d) * (e - t) + t, b = (e - t) / h, g = s * Math.cos(m), y = s * Math.sin(m), l = w.curve, u <= 0 && (l = n ? w.move : w.line), c.command = l, c.x = g, c.y = y, c.controls.left.clear(), c.controls.right.clear(), c.command === w.curve && (x = s * b / Math.PI, c.controls.left.x = x * Math.cos(m + J), c.controls.left.y = x * Math.sin(m + J), c.controls.right.x = x * Math.cos(m - J), c.controls.right.y = x * Math.sin(m - J), u === 1 && c.controls.left.multiplyScalar(2), u === _ && c.controls.right.multiplyScalar(2)), f++;
                    o[f].copy(o[0]), o[f].command = w.line;
                } else n || (o[f].command = w.line, o[f].x = 0, o[f].y = 0, f++, o[f].copy(o[0]), o[f].command = w.line);
            }
            return super._update.call(this), this;
        }
        flagReset() {
            return super.flagReset.call(this), this._flagStartAngle = this._flagEndAngle = this._flagInnerRadius = this._flagOuterRadius = !1, this;
        }
        clone(t) {
            let e = this.innerRadius, s = this.outerRadius, r = this.startAngle, n = this.endAngle, a = this.vertices.length, o = new ue(0, 0, e, s, r, n, a);
            o.translation.copy(this.translation), o.rotation = this.rotation, o.scale = this.scale, o.skewX = this.skewX, o.skewY = this.skewY, this.matrix.manual && o.matrix.copy(this.matrix);
            for(let h = 0; h < L.Properties.length; h++){
                let l = L.Properties[h];
                o[l] = this[l];
            }
            return t && t.add(o), o;
        }
        toObject() {
            let t = super.toObject.call(this);
            for(let e = 0; e < ue.Properties.length; e++){
                let s = ue.Properties[e];
                t[s] = this[s];
            }
            return t;
        }
    }, Kt = ue;
    v(Kt, "Properties", [
        "startAngle",
        "endAngle",
        "innerRadius",
        "outerRadius"
    ]);
    var Di = {
        startAngle: {
            enumerable: !0,
            get: function() {
                return this._startAngle;
            },
            set: function(i) {
                this._startAngle = i, this._flagStartAngle = !0;
            }
        },
        endAngle: {
            enumerable: !0,
            get: function() {
                return this._endAngle;
            },
            set: function(i) {
                this._endAngle = i, this._flagEndAngle = !0;
            }
        },
        innerRadius: {
            enumerable: !0,
            get: function() {
                return this._innerRadius;
            },
            set: function(i) {
                this._innerRadius = i, this._flagInnerRadius = !0;
            }
        },
        outerRadius: {
            enumerable: !0,
            get: function() {
                return this._outerRadius;
            },
            set: function(i) {
                this._outerRadius = i, this._flagOuterRadius = !0;
            }
        }
    };
    var js = Math.ceil, Vs = Math.floor, $t = class extends ot {
        _flagVertices = !0;
        _flagLength = !0;
        _flagFill = !0;
        _flagStroke = !0;
        _flagLinewidth = !0;
        _flagOpacity = !0;
        _flagVisible = !0;
        _flagSize = !0;
        _flagSizeAttenuation = !0;
        _length = 0;
        _fill = "#fff";
        _stroke = "#000";
        _linewidth = 1;
        _opacity = 1;
        _visible = !0;
        _size = 1;
        _sizeAttenuation = !1;
        _beginning = 0;
        _ending = 1;
        _dashes = null;
        constructor(t){
            super();
            for(let e in Hi)Object.defineProperty(this, e, Hi[e]);
            this._renderer.type = "points", this._renderer.flagVertices = qe.bind(this), this._renderer.bindVertices = Ge.bind(this), this._renderer.unbindVertices = Ke.bind(this), this._renderer.flagFill = $e.bind(this), this._renderer.flagStroke = Je.bind(this), this._renderer.vertices = null, this._renderer.collection = null, this.sizeAttenuation = !1, this.beginning = 0, this.ending = 1, this.fill = "#fff", this.stroke = "#000", this.className = "", this.visible = !0, this.vertices = t, this.dashes = [], this.dashes.offset = 0;
        }
        clone(t) {
            let e = new $t;
            for(let s = 0; s < this.vertices.length; s++)e.vertices.push(this.vertices[s].clone());
            for(let s = 0; s < $t.Properties.length; s++){
                let r = $t.Properties[s];
                e[r] = this[r];
            }
            return e.className = this.className, e.translation.copy(this.translation), e.rotation = this.rotation, e.scale = this.scale, e.skewX = this.skewX, e.skewY = this.skewY, this.matrix.manual && e.matrix.copy(this.matrix), t && t.add(e), e._update();
        }
        toObject() {
            let t = {
                vertices: this.vertices.map(function(e) {
                    return e.toObject();
                })
            };
            return R.each($t.Properties, function(e) {
                t[e] = this[e];
            }, this), t.className = this.className, t.translation = this.translation.toObject(), t.rotation = this.rotation, t.scale = this.scale instanceof k ? this.scale.toObject() : this.scale, t.skewX = this.skewX, t.skewY = this.skewY, this.matrix.manual && (t.matrix = this.matrix.toObject()), t;
        }
        noFill = L.prototype.noFill;
        noStroke = L.prototype.noStroke;
        corner = L.prototype.corner;
        center = L.prototype.center;
        getBoundingClientRect = L.prototype.getBoundingClientRect;
        subdivide(t) {
            this._update();
            let e = [];
            for(let s = 0; s < this.vertices.length; s++){
                let r = this.vertices[s], n = this.vertices[s - 1];
                if (!n) continue;
                let a = r.x, o = r.y, h = n.x, l = n.y, f = re(a, o, a, o, h, l, h, l, t);
                e = e.concat(f);
            }
            return this.vertices = e, this;
        }
        _updateLength = L.prototype._updateLength;
        _update() {
            if (this._flagVertices) {
                this._flagLength && this._updateLength(void 0, !0);
                let t = Math.min(this._beginning, this._ending), e = Math.max(this._beginning, this._ending), s = qt(this, t * this._length), r = qt(this, e * this._length), n = js(s), a = Vs(r), o = 0, h;
                this._renderer.vertices = [], this._renderer.collection = [];
                for(let l = 0; l < this._collection.length; l++)l >= n && l <= a && (h = this._collection[l], this._renderer.collection.push(h), this._renderer.vertices[o * 2 + 0] = h.x, this._renderer.vertices[o * 2 + 1] = h.y, o++);
            }
            return super._update.apply(this, arguments), this;
        }
        flagReset() {
            return this._flagVertices = this._flagLength = this._flagFill = this._flagStroke = this._flagLinewidth = this._flagOpacity = this._flagVisible = this._flagSize = this._flagSizeAttenuation = !1, super.flagReset.call(this), this;
        }
    }, Jt = $t;
    v(Jt, "Properties", [
        "fill",
        "stroke",
        "linewidth",
        "opacity",
        "visible",
        "size",
        "sizeAttenuation",
        "beginning",
        "ending"
    ]);
    var Hi = {
        linewidth: {
            enumerable: !0,
            get: function() {
                return this._linewidth;
            },
            set: function(i) {
                this._linewidth = i, this._flagLinewidth = !0;
            }
        },
        opacity: {
            enumerable: !0,
            get: function() {
                return this._opacity;
            },
            set: function(i) {
                this._opacity = i, this._flagOpacity = !0;
            }
        },
        visible: {
            enumerable: !0,
            get: function() {
                return this._visible;
            },
            set: function(i) {
                this._visible = i, this._flagVisible = !0;
            }
        },
        size: {
            enumerable: !0,
            get: function() {
                return this._size;
            },
            set: function(i) {
                this._size = i, this._flagSize = !0;
            }
        },
        sizeAttenuation: {
            enumerable: !0,
            get: function() {
                return this._sizeAttenuation;
            },
            set: function(i) {
                this._sizeAttenuation = i, this._flagSizeAttenuation = !0;
            }
        },
        fill: {
            enumerable: !0,
            get: function() {
                return this._fill;
            },
            set: function(i) {
                (this._fill instanceof W || this._fill instanceof U || this._fill instanceof D || this._fill instanceof B) && this._fill.unbind(p.Types.change, this._renderer.flagFill), this._fill = i, this._flagFill = !0, (this._fill instanceof W || this._fill instanceof U || this._fill instanceof D || this._fill instanceof B) && this._fill.bind(p.Types.change, this._renderer.flagFill);
            }
        },
        stroke: {
            enumerable: !0,
            get: function() {
                return this._stroke;
            },
            set: function(i) {
                (this._stroke instanceof W || this._stroke instanceof U || this._stroke instanceof D || this._stroke instanceof B) && this._stroke.unbind(p.Types.change, this._renderer.flagStroke), this._stroke = i, this._flagStroke = !0, (this._stroke instanceof W || this._stroke instanceof U || this._stroke instanceof D || this._stroke instanceof B) && this._stroke.bind(p.Types.change, this._renderer.flagStroke);
            }
        },
        length: {
            get: function() {
                return this._flagLength && this._updateLength(), this._length;
            }
        },
        beginning: {
            enumerable: !0,
            get: function() {
                return this._beginning;
            },
            set: function(i) {
                this._beginning = i, this._flagVertices = !0;
            }
        },
        ending: {
            enumerable: !0,
            get: function() {
                return this._ending;
            },
            set: function(i) {
                this._ending = i, this._flagVertices = !0;
            }
        },
        vertices: {
            enumerable: !0,
            get: function() {
                return this._collection;
            },
            set: function(i) {
                let t = this._renderer.bindVertices, e = this._renderer.unbindVertices;
                this._collection && this._collection.unbind(p.Types.insert, t).unbind(p.Types.remove, e), i instanceof lt ? this._collection = i : this._collection = new lt(i || []), this._collection.bind(p.Types.insert, t).bind(p.Types.remove, e), t(this._collection);
            }
        },
        dashes: {
            enumerable: !0,
            get: function() {
                return this._dashes;
            },
            set: function(i) {
                typeof i.offset != "number" && (i.offset = this.dashes && this._dashes.offset || 0), this._dashes = i;
            }
        }
    };
    var zs = Math.cos, Us = Math.sin, de = class extends L {
        _flagWidth = !1;
        _flagHeight = !1;
        _flagSides = !1;
        _radius = 0;
        _width = 0;
        _height = 0;
        _sides = 0;
        constructor(t, e, s, r){
            r = Math.max(r || 0, 3), super();
            for(let n in Wi)Object.defineProperty(this, n, Wi[n]);
            this.closed = !0, this.automatic = !1, typeof s == "number" && (this.radius = s), typeof r == "number" && (this.sides = r), this._update(), typeof t == "number" && (this.translation.x = t), typeof e == "number" && (this.translation.y = e);
        }
        _update() {
            if (this._flagVertices || this._flagWidth || this._flagHeight || this._flagSides) {
                let t = this._sides, e = t + 1, s = this.vertices.length;
                s > t && (this.vertices.splice(t - 1, s - t), s = t);
                for(let r = 0; r < e; r++){
                    let n = (r + .5) / t, a = $ * n + Math.PI / 2, o = this._width * zs(a) / 2, h = this._height * Us(a) / 2;
                    r >= s ? this.vertices.push(new F(o, h)) : this.vertices[r].set(o, h), this.vertices[r].command = r === 0 ? w.move : w.line;
                }
            }
            return super._update.call(this), this;
        }
        flagReset() {
            return this._flagWidth = this._flagHeight = this._flagSides = !1, super.flagReset.call(this), this;
        }
        clone(t) {
            let e = new de(0, 0, 0, this.sides);
            e.translation.copy(this.translation), e.rotation = this.rotation, e.scale = this.scale, e.skewX = this.skewX, e.skewY = this.skewY, e.width = this.width, e.height = this.height, this.matrix.manual && e.matrix.copy(this.matrix);
            for(let s = 0; s < L.Properties.length; s++){
                let r = L.Properties[s];
                e[r] = this[r];
            }
            return t && t.add(e), e;
        }
        toObject() {
            let t = super.toObject.call(this);
            for(let e = 0; e < de.Properties.length; e++){
                let s = de.Properties[e];
                t[s] = this[s];
            }
            return t;
        }
    }, Zt = de;
    v(Zt, "Properties", [
        "width",
        "height",
        "sides"
    ]);
    var Wi = {
        radius: {
            enumerable: !0,
            get: function() {
                return this._radius;
            },
            set: function(i) {
                this._radius = i, this.width = i * 2, this.height = i * 2;
            }
        },
        width: {
            enumerable: !0,
            get: function() {
                return this._width;
            },
            set: function(i) {
                this._width = i, this._flagWidth = !0, this._radius = Math.max(this.width, this.height) / 2;
            }
        },
        height: {
            enumerable: !0,
            get: function() {
                return this._height;
            },
            set: function(i) {
                this._height = i, this._flagHeight = !0, this._radius = Math.max(this.width, this.height) / 2;
            }
        },
        sides: {
            enumerable: !0,
            get: function() {
                return this._sides;
            },
            set: function(i) {
                this._sides = i, this._flagSides = !0;
            }
        }
    };
    var Ds = Math.cos, Hs = Math.sin, _e = class extends L {
        _flagInnerRadius = !1;
        _flagOuterRadius = !1;
        _flagSides = !1;
        _innerRadius = 0;
        _outerRadius = 0;
        _sides = 0;
        constructor(t, e, s, r, n){
            arguments.length <= 3 && (r = s, s = r / 2), (typeof n != "number" || n <= 0) && (n = 5), super();
            for(let a in Xi)Object.defineProperty(this, a, Xi[a]);
            this.closed = !0, this.automatic = !1, typeof s == "number" && (this.innerRadius = s), typeof r == "number" && (this.outerRadius = r), typeof n == "number" && (this.sides = n), this._update(), typeof t == "number" && (this.translation.x = t), typeof e == "number" && (this.translation.y = e);
        }
        _update() {
            if (this._flagVertices || this._flagInnerRadius || this._flagOuterRadius || this._flagSides) {
                let t = this._sides * 2, e = t + 1, s = this.vertices.length;
                s > t && (this.vertices.splice(t - 1, s - t), s = t);
                for(let r = 0; r < e; r++){
                    let n = (r + .5) / t, a = $ * n, o = (r % 2 ? this._outerRadius : this._innerRadius) / 2, h = o * Ds(a), l = o * Hs(a);
                    r >= s ? this.vertices.push(new F(h, l)) : this.vertices[r].set(h, l), this.vertices[r].command = r === 0 ? w.move : w.line;
                }
            }
            return super._update.call(this), this;
        }
        flagReset() {
            return this._flagInnerRadius = this._flagOuterRadius = this._flagSides = !1, super.flagReset.call(this), this;
        }
        clone(t) {
            let e = this.innerRadius, s = this.outerRadius, r = this.sides, n = new _e(0, 0, e, s, r);
            n.translation.copy(this.translation), n.rotation = this.rotation, n.scale = this.scale, n.skewX = this.skewX, n.skewY = this.skewY, this.matrix.manual && n.matrix.copy(this.matrix);
            for(let a = 0; a < L.Properties.length; a++){
                let o = L.Properties[a];
                n[o] = this[o];
            }
            return t && t.add(n), n;
        }
        toObject() {
            let t = super.toObject.call(this);
            for(let e = 0; e < _e.Properties.length; e++){
                let s = _e.Properties[e];
                t[s] = this[s];
            }
            return t;
        }
    }, Qt = _e;
    v(Qt, "Properties", [
        "innerRadius",
        "outerRadius",
        "sides"
    ]);
    var Xi = {
        innerRadius: {
            enumerable: !0,
            get: function() {
                return this._innerRadius;
            },
            set: function(i) {
                this._innerRadius = i, this._flagInnerRadius = !0;
            }
        },
        outerRadius: {
            enumerable: !0,
            get: function() {
                return this._outerRadius;
            },
            set: function(i) {
                this._outerRadius = i, this._flagOuterRadius = !0;
            }
        },
        sides: {
            enumerable: !0,
            get: function() {
                return this._sides;
            },
            set: function(i) {
                this._sides = i, this._flagSides = !0;
            }
        }
    };
    var Yi = new at, O = {
        version: 1.1,
        ns: "http://www.w3.org/2000/svg",
        xlink: "http://www.w3.org/1999/xlink",
        alignments: {
            left: "start",
            center: "middle",
            right: "end"
        },
        createElement: function(i, t) {
            let e = i, s = document.createElementNS(O.ns, e);
            return e === "svg" && (t = R.defaults(t || {}, {
                version: O.version
            })), t && Object.keys(t).length > 0 && O.setAttributes(s, t), s;
        },
        setAttributes: function(i, t) {
            let e = Object.keys(t);
            for(let s = 0; s < e.length; s++)/href/.test(e[s]) ? i.setAttributeNS(O.xlink, e[s], t[e[s]]) : i.setAttribute(e[s], t[e[s]]);
            return this;
        },
        removeAttributes: function(i, t) {
            for(let e in t)i.removeAttribute(e);
            return this;
        },
        toString: function(i, t) {
            let e = i.length, s = e - 1, r, n = "";
            for(let a = 0; a < e; a++){
                let o = i[a], h = t ? it(a - 1, e) : Math.max(a - 1, 0), l = i[h], f, u, _, d, c, m, b, g, y, x, S, A, E, C, N, M = K(o.x), T = K(o.y);
                switch(o.command){
                    case w.close:
                        f = w.close;
                        break;
                    case w.arc:
                        S = o.rx, A = o.ry, E = o.xAxisRotation, C = o.largeArcFlag, N = o.sweepFlag, f = w.arc + " " + S + " " + A + " " + E + " " + C + " " + N + " " + M + " " + T;
                        break;
                    case w.curve:
                        b = l.controls && l.controls.right || k.zero, g = o.controls && o.controls.left || k.zero, l.relative ? (_ = K(b.x + l.x), d = K(b.y + l.y)) : (_ = K(b.x), d = K(b.y)), o.relative ? (c = K(g.x + o.x), m = K(g.y + o.y)) : (c = K(g.x), m = K(g.y)), f = (a === 0 ? w.move : w.curve) + " " + _ + " " + d + " " + c + " " + m + " " + M + " " + T;
                        break;
                    case w.move:
                        r = o, f = w.move + " " + M + " " + T;
                        break;
                    default:
                        f = o.command + " " + M + " " + T;
                }
                a >= s && t && (o.command === w.curve && (u = r, y = o.controls && o.controls.right || o, x = u.controls && u.controls.left || u, o.relative ? (_ = K(y.x + o.x), d = K(y.y + o.y)) : (_ = K(y.x), d = K(y.y)), u.relative ? (c = K(x.x + u.x), m = K(x.y + u.y)) : (c = K(x.x), m = K(x.y)), M = K(u.x), T = K(u.y), f += " C " + _ + " " + d + " " + c + " " + m + " " + M + " " + T), o.command !== w.close && (f += " Z")), n += f + " ";
            }
            return n;
        },
        pointsToString: function(i, t) {
            let e = "", s = t * .5;
            for(let r = 0; r < i.length; r++){
                let n = i[r].x, a = i[r].y - s;
                e += w.move + " " + n + " " + a + " ", e += "a " + s + " " + s + " 0 1 0 0.001 0 Z";
            }
            return e;
        },
        getClip: function(i, t) {
            let e = i._renderer.clip;
            return e || (e = i._renderer.clip = O.createElement("clipPath", {
                "clip-rule": "nonzero"
            })), e.parentNode === null && t.defs.appendChild(e), e;
        },
        defs: {
            update: function(i) {
                let { defs: t  } = i;
                if (t._flagUpdate) {
                    let e = Array.prototype.slice.call(t.children, 0);
                    for(let s = 0; s < e.length; s++){
                        let r = e[s], n = r.id, a = `[fill="url(#${n})"],[stroke="url(#${n})"],[clip-path="url(#${n})"]`;
                        i.querySelector(a) || t.removeChild(r);
                    }
                    t._flagUpdate = !1;
                }
            }
        },
        group: {
            appendChild: function(i) {
                let t = i._renderer.elem;
                if (!t) return;
                let e = t.nodeName;
                !e || /(radial|linear)gradient/i.test(e) || i._clip || this.elem.appendChild(t);
            },
            removeChild: function(i) {
                let t = i._renderer.elem;
                !t || t.parentNode != this.elem || !t.nodeName || i._clip || this.elem.removeChild(t);
            },
            orderChild: function(i) {
                this.elem.appendChild(i._renderer.elem);
            },
            renderChild: function(i) {
                O[i._renderer.type].render.call(i, this);
            },
            render: function(i) {
                if (!this._visible && !this._flagVisible || this._opacity === 0 && !this._flagOpacity) return this;
                this._update(), this._renderer.elem || (this._renderer.elem = O.createElement("g", {
                    id: this.id
                }), i.appendChild(this._renderer.elem));
                let t = this._matrix.manual || this._flagMatrix, e = {
                    domElement: i,
                    elem: this._renderer.elem
                };
                t && this._renderer.elem.setAttribute("transform", "matrix(" + this._matrix.toString() + ")");
                for(let s = 0; s < this.children.length; s++){
                    let r = this.children[s];
                    O[r._renderer.type].render.call(r, i);
                }
                return this._flagId && this._renderer.elem.setAttribute("id", this._id), this._flagOpacity && this._renderer.elem.setAttribute("opacity", this._opacity), this._flagVisible && this._renderer.elem.setAttribute("display", this._visible ? "inline" : "none"), this._flagClassName && this._renderer.elem.setAttribute("class", this.classList.join(" ")), this._flagAdditions && this.additions.forEach(O.group.appendChild, e), this._flagSubtractions && this.subtractions.forEach(O.group.removeChild, e), this._flagOrder && this.children.forEach(O.group.orderChild, e), this._flagMask && (this._mask ? (O[this._mask._renderer.type].render.call(this._mask, i), this._renderer.elem.setAttribute("clip-path", "url(#" + this._mask.id + ")")) : this._renderer.elem.removeAttribute("clip-path")), this.dataset && Object.assign(this._renderer.elem.dataset, this.dataset), this.flagReset();
            }
        },
        path: {
            render: function(i) {
                if (this._opacity === 0 && !this._flagOpacity) return this;
                this._update();
                let t = {};
                if ((this._matrix.manual || this._flagMatrix) && (t.transform = "matrix(" + this._matrix.toString() + ")"), this._flagId && (t.id = this._id), this._flagVertices) {
                    let s = O.toString(this._renderer.vertices, this._closed);
                    t.d = s;
                }
                if (this._fill && this._fill._renderer && (this._renderer.hasFillEffect = !0, this._fill._update(), O[this._fill._renderer.type].render.call(this._fill, i, !0)), this._flagFill && (t.fill = this._fill && this._fill.id ? "url(#" + this._fill.id + ")" : this._fill, this._renderer.hasFillEffect && typeof this._fill.id > "u" && (i.defs._flagUpdate = !0, delete this._renderer.hasFillEffect)), this._stroke && this._stroke._renderer && (this._renderer.hasStrokeEffect = !0, this._stroke._update(), O[this._stroke._renderer.type].render.call(this._stroke, i, !0)), this._flagStroke && (t.stroke = this._stroke && this._stroke.id ? "url(#" + this._stroke.id + ")" : this._stroke, this._renderer.hasStrokeEffect && typeof this._stroke.id > "u" && (i.defs._flagUpdate = !0, delete this._renderer.hasStrokeEffect)), this._flagLinewidth && (t["stroke-width"] = this._linewidth), this._flagOpacity && (t["stroke-opacity"] = this._opacity, t["fill-opacity"] = this._opacity), this._flagClassName && (t.class = this.classList.join(" ")), this._flagVisible && (t.visibility = this._visible ? "visible" : "hidden"), this._flagCap && (t["stroke-linecap"] = this._cap), this._flagJoin && (t["stroke-linejoin"] = this._join), this._flagMiter && (t["stroke-miterlimit"] = this._miter), this.dashes && this.dashes.length > 0 && (t["stroke-dasharray"] = this.dashes.join(" "), t["stroke-dashoffset"] = this.dashes.offset || 0), this._renderer.elem ? O.setAttributes(this._renderer.elem, t) : (t.id = this._id, this._renderer.elem = O.createElement("path", t), i.appendChild(this._renderer.elem)), this._flagClip) {
                    let s = O.getClip(this, i), r = this._renderer.elem;
                    this._clip ? (r.removeAttribute("id"), s.setAttribute("id", this.id), s.appendChild(r)) : (s.removeAttribute("id"), r.setAttribute("id", this.id), this.parent._renderer.elem.appendChild(r));
                }
                return this._flagMask && (this._mask ? (O[this._mask._renderer.type].render.call(this._mask, i), this._renderer.elem.setAttribute("clip-path", "url(#" + this._mask.id + ")")) : this._renderer.elem.removeAttribute("clip-path")), this.flagReset();
            }
        },
        points: {
            render: function(i) {
                if (this._opacity === 0 && !this._flagOpacity) return this;
                this._update();
                let t = {};
                if ((this._matrix.manual || this._flagMatrix) && (t.transform = "matrix(" + this._matrix.toString() + ")"), this._flagId && (t.id = this._id), this._flagVertices || this._flagSize || this._flagSizeAttenuation) {
                    let s = this._size;
                    if (!this._sizeAttenuation) {
                        pt(this, Yi);
                        let n = Yi.elements, a = Ot(n[0], n[3], n[1], n[4], n[2], n[5]);
                        s /= Math.max(a.scaleX, a.scaleY);
                    }
                    let r = O.pointsToString(this._renderer.collection, s);
                    t.d = r;
                }
                return this._fill && this._fill._renderer && (this._renderer.hasFillEffect = !0, this._fill._update(), O[this._fill._renderer.type].render.call(this._fill, i, !0)), this._flagFill && (t.fill = this._fill && this._fill.id ? "url(#" + this._fill.id + ")" : this._fill, this._renderer.hasFillEffect && typeof this._fill.id > "u" && (i.defs._flagUpdate = !0, delete this._renderer.hasFillEffect)), this._stroke && this._stroke._renderer && (this._renderer.hasStrokeEffect = !0, this._stroke._update(), O[this._stroke._renderer.type].render.call(this._stroke, i, !0)), this._flagStroke && (t.stroke = this._stroke && this._stroke.id ? "url(#" + this._stroke.id + ")" : this._stroke, this._renderer.hasStrokeEffect && typeof this._stroke.id > "u" && (i.defs._flagUpdate = !0, delete this._renderer.hasStrokeEffect)), this._flagLinewidth && (t["stroke-width"] = this._linewidth), this._flagOpacity && (t["stroke-opacity"] = this._opacity, t["fill-opacity"] = this._opacity), this._flagClassName && (t.class = this.classList.join(" ")), this._flagVisible && (t.visibility = this._visible ? "visible" : "hidden"), this.dashes && this.dashes.length > 0 && (t["stroke-dasharray"] = this.dashes.join(" "), t["stroke-dashoffset"] = this.dashes.offset || 0), this._renderer.elem ? O.setAttributes(this._renderer.elem, t) : (t.id = this._id, this._renderer.elem = O.createElement("path", t), i.appendChild(this._renderer.elem)), this.flagReset();
            }
        },
        text: {
            render: function(i) {
                this._update();
                let t = {};
                if ((this._matrix.manual || this._flagMatrix) && (t.transform = "matrix(" + this._matrix.toString() + ")"), this._flagId && (t.id = this._id), this._flagFamily && (t["font-family"] = this._family), this._flagSize && (t["font-size"] = this._size), this._flagLeading && (t["line-height"] = this._leading), this._flagAlignment && (t["text-anchor"] = O.alignments[this._alignment] || this._alignment), this._flagBaseline && (t["alignment-baseline"] = t["dominant-baseline"] = this._baseline), this._flagStyle && (t["font-style"] = this._style), this._flagWeight && (t["font-weight"] = this._weight), this._flagDecoration && (t["text-decoration"] = this._decoration), this._fill && this._fill._renderer && (this._renderer.hasFillEffect = !0, this._fill._update(), O[this._fill._renderer.type].render.call(this._fill, i, !0)), this._flagFill && (t.fill = this._fill && this._fill.id ? "url(#" + this._fill.id + ")" : this._fill, this._renderer.hasFillEffect && typeof this._fill.id > "u" && (i.defs._flagUpdate = !0, delete this._renderer.hasFillEffect)), this._stroke && this._stroke._renderer && (this._renderer.hasStrokeEffect = !0, this._stroke._update(), O[this._stroke._renderer.type].render.call(this._stroke, i, !0)), this._flagStroke && (t.stroke = this._stroke && this._stroke.id ? "url(#" + this._stroke.id + ")" : this._stroke, this._renderer.hasStrokeEffect && typeof this._stroke.id > "u" && (i.defs._flagUpdate = !0, delete this._renderer.hasStrokeEffect)), this._flagLinewidth && (t["stroke-width"] = this._linewidth), this._flagOpacity && (t.opacity = this._opacity), this._flagClassName && (t.class = this.classList.join(" ")), this._flagVisible && (t.visibility = this._visible ? "visible" : "hidden"), this.dashes && this.dashes.length > 0 && (t["stroke-dasharray"] = this.dashes.join(" "), t["stroke-dashoffset"] = this.dashes.offset || 0), this._renderer.elem ? O.setAttributes(this._renderer.elem, t) : (t.id = this._id, this._renderer.elem = O.createElement("text", t), i.appendChild(this._renderer.elem)), this._flagClip) {
                    let s = O.getClip(this, i), r = this._renderer.elem;
                    this._clip ? (r.removeAttribute("id"), s.setAttribute("id", this.id), s.appendChild(r)) : (s.removeAttribute("id"), r.setAttribute("id", this.id), this.parent._renderer.elem.appendChild(r));
                }
                return this._flagMask && (this._mask ? (O[this._mask._renderer.type].render.call(this._mask, i), this._renderer.elem.setAttribute("clip-path", "url(#" + this._mask.id + ")")) : this._renderer.elem.removeAttribute("clip-path")), this._flagValue && (this._renderer.elem.textContent = this._value), this.flagReset();
            }
        },
        "linear-gradient": {
            render: function(i, t) {
                t || this._update();
                let e = {};
                if (this._flagId && (e.id = this._id), this._flagEndPoints && (e.x1 = this.left._x, e.y1 = this.left._y, e.x2 = this.right._x, e.y2 = this.right._y), this._flagSpread && (e.spreadMethod = this._spread), this._flagUnits && (e.gradientUnits = this._units), this._renderer.elem ? O.setAttributes(this._renderer.elem, e) : (e.id = this._id, this._renderer.elem = O.createElement("linearGradient", e)), this._renderer.elem.parentNode === null && i.defs.appendChild(this._renderer.elem), this._flagStops) {
                    let s = this._renderer.elem.childNodes.length !== this.stops.length;
                    if (s) for(; this._renderer.elem.lastChild;)this._renderer.elem.removeChild(this._renderer.elem.lastChild);
                    for(let r = 0; r < this.stops.length; r++){
                        let n = this.stops[r], a = {};
                        n._flagOffset && (a.offset = 100 * n._offset + "%"), n._flagColor && (a["stop-color"] = n._color), n._flagOpacity && (a["stop-opacity"] = n._opacity), n._renderer.elem ? O.setAttributes(n._renderer.elem, a) : n._renderer.elem = O.createElement("stop", a), s && this._renderer.elem.appendChild(n._renderer.elem), n.flagReset();
                    }
                }
                return this.flagReset();
            }
        },
        "radial-gradient": {
            render: function(i, t) {
                t || this._update();
                let e = {};
                if (this._flagId && (e.id = this._id), this._flagCenter && (e.cx = this.center._x, e.cy = this.center._y), this._flagFocal && (e.fx = this.focal._x, e.fy = this.focal._y), this._flagRadius && (e.r = this._radius), this._flagSpread && (e.spreadMethod = this._spread), this._flagUnits && (e.gradientUnits = this._units), this._renderer.elem ? O.setAttributes(this._renderer.elem, e) : (e.id = this._id, this._renderer.elem = O.createElement("radialGradient", e)), this._renderer.elem.parentNode === null && i.defs.appendChild(this._renderer.elem), this._flagStops) {
                    let s = this._renderer.elem.childNodes.length !== this.stops.length;
                    if (s) for(; this._renderer.elem.lastChild;)this._renderer.elem.removeChild(this._renderer.elem.lastChild);
                    for(let r = 0; r < this.stops.length; r++){
                        let n = this.stops[r], a = {};
                        n._flagOffset && (a.offset = 100 * n._offset + "%"), n._flagColor && (a["stop-color"] = n._color), n._flagOpacity && (a["stop-opacity"] = n._opacity), n._renderer.elem ? O.setAttributes(n._renderer.elem, a) : n._renderer.elem = O.createElement("stop", a), s && this._renderer.elem.appendChild(n._renderer.elem), n.flagReset();
                    }
                }
                return this.flagReset();
            }
        },
        texture: {
            render: function(i, t) {
                t || this._update();
                let e = {}, s = {
                    x: 0,
                    y: 0
                }, r = this.image;
                if (this._flagId && (e.id = this._id), this._flagLoaded && this.loaded) switch(r.nodeName.toLowerCase()){
                    case "canvas":
                        s.href = s["xlink:href"] = r.toDataURL("image/png");
                        break;
                    case "img":
                    case "image":
                        s.href = s["xlink:href"] = this.src;
                        break;
                }
                if ((this._flagOffset || this._flagLoaded || this._flagScale) && (e.x = this._offset.x, e.y = this._offset.y, r && (e.x -= r.width / 2, e.y -= r.height / 2, this._scale instanceof k ? (e.x *= this._scale.x, e.y *= this._scale.y) : (e.x *= this._scale, e.y *= this._scale)), e.x > 0 && (e.x *= -1), e.y > 0 && (e.y *= -1)), (this._flagScale || this._flagLoaded || this._flagRepeat) && (e.width = 0, e.height = 0, r)) {
                    switch(s.width = e.width = r.width, s.height = e.height = r.height, this._repeat){
                        case "no-repeat":
                            e.width += 1, e.height += 1;
                            break;
                    }
                    this._scale instanceof k ? (e.width *= this._scale.x, e.height *= this._scale.y) : (e.width *= this._scale, e.height *= this._scale);
                }
                return (this._flagScale || this._flagLoaded) && (this._renderer.image ? O.setAttributes(this._renderer.image, s) : this._renderer.image = O.createElement("image", s)), this._renderer.elem ? Object.keys(e).length !== 0 && O.setAttributes(this._renderer.elem, e) : (e.id = this._id, e.patternUnits = "userSpaceOnUse", this._renderer.elem = O.createElement("pattern", e)), this._renderer.elem.parentNode === null && i.defs.appendChild(this._renderer.elem), this._renderer.elem && this._renderer.image && !this._renderer.appended && (this._renderer.elem.appendChild(this._renderer.image), this._renderer.appended = !0), this.flagReset();
            }
        }
    }, ge = class extends p {
        constructor(t){
            super(), this.domElement = t.domElement || O.createElement("svg"), this.scene = new q, this.scene.parent = this, this.defs = O.createElement("defs"), this.defs._flagUpdate = !1, this.domElement.appendChild(this.defs), this.domElement.defs = this.defs, this.domElement.style.overflow = "hidden";
        }
        setSize(t, e) {
            return this.width = t, this.height = e, O.setAttributes(this.domElement, {
                width: t,
                height: e
            }), this.trigger(p.Types.resize, t, e);
        }
        render() {
            return O.group.render.call(this.scene, this.domElement), O.defs.update(this.domElement), this;
        }
    };
    v(ge, "Utils", O);
    var xt = {
        create: function(i, t, e) {
            let s = i.createShader(i[e]);
            if (i.shaderSource(s, t), i.compileShader(s), !i.getShaderParameter(s, i.COMPILE_STATUS)) {
                let n = i.getShaderInfoLog(s);
                throw i.deleteShader(s), new et("unable to compile shader " + s + ": " + n);
            }
            return s;
        },
        types: {
            vertex: "VERTEX_SHADER",
            fragment: "FRAGMENT_SHADER"
        },
        path: {
            vertex: `
      precision mediump float;
      attribute vec2 a_position;

      uniform mat3 u_matrix;
      uniform vec2 u_resolution;
      uniform vec4 u_rect;

      varying vec2 v_textureCoords;

      void main() {
        vec2 rectCoords = (a_position * (u_rect.zw - u_rect.xy)) + u_rect.xy;
        vec2 projected = (u_matrix * vec3(rectCoords, 1.0)).xy;
        vec2 normal = projected / u_resolution;
        vec2 clipspace = (normal * 2.0) - 1.0;

        gl_Position = vec4(clipspace * vec2(1.0, -1.0), 0.0, 1.0);
        v_textureCoords = a_position;
      }
    `,
            fragment: `
      precision mediump float;

      uniform sampler2D u_image;
      varying vec2 v_textureCoords;

      void main() {
        vec4 texel = texture2D(u_image, v_textureCoords);
        if (texel.a == 0.0) {
          discard;
        }
        gl_FragColor = texel;
      }
    `
        },
        points: {
            vertex: `
      precision mediump float;
      attribute vec2 a_position;

      uniform float u_size;
      uniform mat3 u_matrix;
      uniform vec2 u_resolution;

      varying vec2 v_textureCoords;

      void main() {
        vec2 projected = (u_matrix * vec3(a_position, 1.0)).xy;
        vec2 normal = projected / u_resolution;
        vec2 clipspace = (normal * 2.0) - 1.0;

        gl_PointSize = u_size;
        gl_Position = vec4(clipspace * vec2(1.0, -1.0), 0.0, 1.0);
        v_textureCoords = a_position;
      }
    `,
            fragment: `
      precision mediump float;

      uniform sampler2D u_image;

      void main() {
        vec4 texel = texture2D(u_image, gl_PointCoord);
        if (texel.a == 0.0) {
          discard;
        }
        gl_FragColor = texel;
      }
    `
        }
    };
    var Me = at.Multiply, Ws = [
        1,
        0,
        0,
        0,
        1,
        0,
        0,
        0,
        1
    ], zt = new bt(9), Xs = At.Utils, ai = new bt([
        0,
        0,
        1,
        0,
        0,
        1,
        0,
        1,
        1,
        0,
        1,
        1
    ]), I = {
        precision: .9,
        isHidden: /(undefined|none|transparent)/i,
        canvas: H.document ? H.document.createElement("canvas") : {
            getContext: function() {}
        },
        alignments: {
            left: "start",
            middle: "center",
            right: "end"
        },
        matrix: new at,
        group: {
            removeChild: function(i, t) {
                if (i.children) for(let e = 0; e < i.children.length; e++)I.group.removeChild(i.children[e], t);
                i._renderer.texture && (t.deleteTexture(i._renderer.texture), delete i._renderer.texture), i._renderer.positionBuffer && (t.deleteBuffer(i._renderer.positionBuffer), delete i._renderer.positionBuffer);
            },
            render: function(i, t) {
                if (!this._visible) return;
                this._update();
                let e = this.parent, s = e._matrix && e._matrix.manual || e._flagMatrix, r = this._matrix.manual || this._flagMatrix;
                (s || r) && (this._renderer.matrix || (this._renderer.matrix = new bt(9)), this._matrix.toTransformArray(!0, zt), Me(zt, e._renderer.matrix, this._renderer.matrix), this._renderer.scale instanceof k || (this._renderer.scale = new k), this._scale instanceof k ? (this._renderer.scale.x = this._scale.x, this._renderer.scale.y = this._scale.y) : (this._renderer.scale.x = this._scale, this._renderer.scale.y = this._scale), /renderer/i.test(e._renderer.type) || (this._renderer.scale.x *= e._renderer.scale.x, this._renderer.scale.y *= e._renderer.scale.y), s && (this._flagMatrix = !0)), this._mask && (i.clear(i.STENCIL_BUFFER_BIT), i.enable(i.STENCIL_TEST), i.stencilFunc(i.ALWAYS, 1, 0), i.stencilOp(i.KEEP, i.KEEP, i.REPLACE), i.colorMask(!1, !1, !1, !1), I[this._mask._renderer.type].render.call(this._mask, i, t, this), i.stencilFunc(i.EQUAL, 1, 255), i.stencilOp(i.KEEP, i.KEEP, i.KEEP), i.colorMask(!0, !0, !0, !0)), this._flagOpacity = e._flagOpacity || this._flagOpacity, this._renderer.opacity = this._opacity * (e && e._renderer ? e._renderer.opacity : 1);
                let n;
                if (this._flagSubtractions) for(n = 0; n < this.subtractions.length; n++)I.group.removeChild(this.subtractions[n], i);
                for(n = 0; n < this.children.length; n++){
                    let a = this.children[n];
                    I[a._renderer.type].render.call(a, i, t);
                }
                return this._mask && i.disable(i.STENCIL_TEST), this.flagReset();
            }
        },
        path: {
            updateCanvas: function(i) {
                let t, e, s, r, n, a, o, h, l, f, u, _, d, c, m = i._renderer.vertices, b = this.canvas, g = this.ctx, y = i._renderer.scale, x = i._stroke, S = i._linewidth, A = i._fill, E = i._renderer.opacity || i._opacity, C = i._cap, N = i._join, M = i._miter, T = i._closed, j = i.dashes, z = m.length, X = z - 1;
                b.width = Math.max(Math.ceil(i._renderer.rect.width * y.x), 1), b.height = Math.max(Math.ceil(i._renderer.rect.height * y.y), 1);
                let V = i._renderer.rect.centroid, ut = V.x, dt = V.y;
                g.clearRect(0, 0, b.width, b.height), A && (typeof A == "string" ? g.fillStyle = A : (I[A._renderer.type].render.call(A, g, i), g.fillStyle = A._renderer.effect)), x && (typeof x == "string" ? g.strokeStyle = x : (I[x._renderer.type].render.call(x, g, i), g.strokeStyle = x._renderer.effect), S && (g.lineWidth = S), M && (g.miterLimit = M), N && (g.lineJoin = N), !T && C && (g.lineCap = C)), typeof E == "number" && (g.globalAlpha = E), j && j.length > 0 && (g.lineDashOffset = j.offset || 0, g.setLineDash(j));
                let Z, _t, rt, Tt, Ct, ee, ie, se;
                g.save(), g.scale(y.x, y.y), g.translate(ut, dt), g.beginPath();
                for(let kt = 0; kt < m.length; kt++){
                    let Q = m[kt];
                    switch(_ = Q.x, d = Q.y, Q.command){
                        case w.close:
                            g.closePath();
                            break;
                        case w.arc:
                            _t = Q.rx, rt = Q.ry, Tt = Q.xAxisRotation, Ct = Q.largeArcFlag, ee = Q.sweepFlag, t = T ? it(kt - 1, z) : Math.max(kt - 1, 0), e = m[t], ie = e.x, se = e.y, Xs.renderSvgArcCommand(g, ie, se, _t, rt, Ct, ee, Tt, _, d);
                            break;
                        case w.curve:
                            t = T ? it(kt - 1, z) : Math.max(kt - 1, 0), e = m[t], h = e.controls && e.controls.right || k.zero, l = Q.controls && Q.controls.left || k.zero, e._relative ? (a = h.x + e.x, o = h.y + e.y) : (a = h.x, o = h.y), Q._relative ? (r = l.x + Q.x, n = l.y + Q.y) : (r = l.x, n = l.y), g.bezierCurveTo(a, o, r, n, _, d), kt >= X && T && (s = Z, f = Q.controls && Q.controls.right || k.zero, u = s.controls && s.controls.left || k.zero, Q._relative ? (a = f.x + Q.x, o = f.y + Q.y) : (a = f.x, o = f.y), s._relative ? (r = u.x + s.x, n = u.y + s.y) : (r = u.x, n = u.y), _ = s.x, d = s.y, g.bezierCurveTo(a, o, r, n, _, d));
                            break;
                        case w.line:
                            g.lineTo(_, d);
                            break;
                        case w.move:
                            Z = Q, g.moveTo(_, d);
                            break;
                    }
                }
                T && g.closePath(), I.isHidden.test(A) || (c = A._renderer && A._renderer.offset, c && (g.save(), g.translate(-A._renderer.offset.x, -A._renderer.offset.y), g.scale(A._renderer.scale.x, A._renderer.scale.y)), g.fill(), c && g.restore()), I.isHidden.test(x) || (c = x._renderer && x._renderer.offset, c && (g.save(), g.translate(-x._renderer.offset.x, -x._renderer.offset.y), g.scale(x._renderer.scale.x, x._renderer.scale.y), g.lineWidth = S / x._renderer.scale.x), g.stroke(), c && g.restore()), g.restore();
            },
            getBoundingClientRect: function(i, t, e) {
                let s = 1 / 0, r = -1 / 0, n = 1 / 0, a = -1 / 0, o, h;
                i.forEach(function(l) {
                    let f = l.x, u = l.y, _ = l.controls, d, c, m, b, g, y;
                    n = Math.min(u, n), s = Math.min(f, s), r = Math.max(f, r), a = Math.max(u, a), l.controls && (g = _.left, y = _.right, !(!g || !y) && (d = l._relative ? g.x + f : g.x, c = l._relative ? g.y + u : g.y, m = l._relative ? y.x + f : y.x, b = l._relative ? y.y + u : y.y, !(!d || !c || !m || !b) && (n = Math.min(c, b, n), s = Math.min(d, m, s), r = Math.max(d, m, r), a = Math.max(c, b, a))));
                }), typeof t == "number" && (n -= t, s -= t, r += t, a += t), o = r - s, h = a - n, e.top = n, e.left = s, e.right = r, e.bottom = a, e.width = o, e.height = h, e.centroid || (e.centroid = {}), e.centroid.x = -s, e.centroid.y = -n;
            },
            render: function(i, t, e) {
                if (!this._visible || !this._opacity) return this;
                this._update();
                let s = e || this.parent, r = t[this._renderer.type], n = s._matrix.manual || s._flagMatrix, a = this._matrix.manual || this._flagMatrix, o = this._renderer.parent !== s, h = this._flagVertices || this._flagFill || this._fill instanceof U && (this._fill._flagSpread || this._fill._flagStops || this._fill._flagEndPoints) || this._fill instanceof D && (this._fill._flagSpread || this._fill._flagStops || this._fill._flagRadius || this._fill._flagCenter || this._fill._flagFocal) || this._fill instanceof B && (this._fill._flagLoaded && this._fill.loaded || this._fill._flagImage || this._fill._flagVideo || this._fill._flagRepeat || this._fill._flagOffset || this._fill._flagScale) || this._stroke instanceof U && (this._stroke._flagSpread || this._stroke._flagStops || this._stroke._flagEndPoints) || this._stroke instanceof D && (this._stroke._flagSpread || this._stroke._flagStops || this._stroke._flagRadius || this._stroke._flagCenter || this._stroke._flagFocal) || this._stroke instanceof B && (this._stroke._flagLoaded && this._stroke.loaded || this._stroke._flagImage || this._stroke._flagVideo || this._stroke._flagRepeat || this._stroke._flagOffset || this._fill._flagScale) || this._flagStroke || this._flagLinewidth || this._flagOpacity || s._flagOpacity || this._flagVisible || this._flagCap || this._flagJoin || this._flagMiter || this._flagScale || this.dashes && this.dashes.length > 0 || !this._renderer.texture;
                if ((n || a || o) && (this._renderer.matrix || (this._renderer.matrix = new bt(9)), this._matrix.toTransformArray(!0, zt), Me(zt, s._renderer.matrix, this._renderer.matrix), this._renderer.scale instanceof k || (this._renderer.scale = new k), this._scale instanceof k ? (this._renderer.scale.x = this._scale.x * s._renderer.scale.x, this._renderer.scale.y = this._scale.y * s._renderer.scale.y) : (this._renderer.scale.x = this._scale * s._renderer.scale.x, this._renderer.scale.y = this._scale * s._renderer.scale.y), o && (this._renderer.parent = s)), this._mask && (i.clear(i.STENCIL_BUFFER_BIT), i.enable(i.STENCIL_TEST), i.stencilFunc(i.ALWAYS, 1, 0), i.stencilOp(i.KEEP, i.KEEP, i.REPLACE), i.colorMask(!1, !1, !1, !1), I[this._mask._renderer.type].render.call(this._mask, i, t, this), i.stencilFunc(i.EQUAL, 1, 255), i.stencilOp(i.KEEP, i.KEEP, i.KEEP), i.colorMask(!0, !0, !0, !0)), h ? (this._renderer.rect || (this._renderer.rect = {}), this._renderer.opacity = this._opacity * s._renderer.opacity, I.path.getBoundingClientRect(this._renderer.vertices, this._linewidth, this._renderer.rect), I.updateTexture.call(I, i, this)) : (this._fill && this._fill._update && this._fill._update(), this._stroke && this._stroke._update && this._stroke._update()), this._clip && !e || !this._renderer.texture) return this;
                t.current !== r && (i.useProgram(r), i.bindBuffer(i.ARRAY_BUFFER, t.buffers.position), i.vertexAttribPointer(r.position, 2, i.FLOAT, !1, 0, 0), i.enableVertexAttribArray(r.position), i.bufferData(i.ARRAY_BUFFER, ai, i.STATIC_DRAW), t.resolution.flagged || i.uniform2f(i.getUniformLocation(r, "u_resolution"), t.resolution.width, t.resolution.height), t.current = r), t.resolution.flagged && i.uniform2f(i.getUniformLocation(r, "u_resolution"), t.resolution.width, t.resolution.height), i.bindTexture(i.TEXTURE_2D, this._renderer.texture);
                let l = this._renderer.rect;
                return i.uniformMatrix3fv(r.matrix, !1, this._renderer.matrix), i.uniform4f(r.rect, l.left, l.top, l.right, l.bottom), i.drawArrays(i.TRIANGLES, 0, 6), this._mask && i.disable(i.STENCIL_TEST), this.flagReset();
            }
        },
        points: {
            updateCanvas: function(i) {
                let t, e = this.canvas, s = this.ctx, r = i._stroke, n = i._linewidth, a = i._fill, o = i._renderer.opacity || i._opacity, h = i.dashes, l = i._size, f = l;
                I.isHidden.test(r) || (f += n), e.width = Pe(f), e.height = e.width;
                let u = f / e.width, _ = e.width / 2, d = e.height / 2;
                s.clearRect(0, 0, e.width, e.height), a && (typeof a == "string" ? s.fillStyle = a : (I[a._renderer.type].render.call(a, s, i), s.fillStyle = a._renderer.effect)), r && (typeof r == "string" ? s.strokeStyle = r : (I[r._renderer.type].render.call(r, s, i), s.strokeStyle = r._renderer.effect), n && (s.lineWidth = n / u)), typeof o == "number" && (s.globalAlpha = o), h && h.length > 0 && (s.lineDashOffset = h.offset || 0, s.setLineDash(h)), s.save(), s.translate(_, d), s.scale(I.precision, I.precision), s.beginPath(), s.arc(0, 0, l / u * .5, 0, $), s.restore(), closed && s.closePath(), I.isHidden.test(a) || (t = a._renderer && a._renderer.offset, t && (s.save(), s.translate(-a._renderer.offset.x, -a._renderer.offset.y), s.scale(a._renderer.scale.x, a._renderer.scale.y)), s.fill(), t && s.restore()), I.isHidden.test(r) || (t = r._renderer && r._renderer.offset, t && (s.save(), s.translate(-r._renderer.offset.x, -r._renderer.offset.y), s.scale(r._renderer.scale.x, r._renderer.scale.y), s.lineWidth = n / r._renderer.scale.x), s.stroke(), t && s.restore());
            },
            render: function(i, t, e) {
                if (!this._visible || !this._opacity) return this;
                this._update();
                let s = this._size, r = e || this.parent, n = t[this._renderer.type], a = this._sizeAttenuation, o = this._stroke, h = this._linewidth, l = r._matrix.manual || r._flagMatrix, f = this._matrix.manual || this._flagMatrix, u = this._renderer.parent !== r, _ = this._renderer.vertices, d = this._renderer.collection.length, c = this._flagVertices, m = this._flagFill || this._fill instanceof U && (this._fill._flagSpread || this._fill._flagStops || this._fill._flagEndPoints) || this._fill instanceof D && (this._fill._flagSpread || this._fill._flagStops || this._fill._flagRadius || this._fill._flagCenter || this._fill._flagFocal) || this._fill instanceof B && (this._fill._flagLoaded && this._fill.loaded || this._fill._flagImage || this._fill._flagVideo || this._fill._flagRepeat || this._fill._flagOffset || this._fill._flagScale) || this._stroke instanceof U && (this._stroke._flagSpread || this._stroke._flagStops || this._stroke._flagEndPoints) || this._stroke instanceof D && (this._stroke._flagSpread || this._stroke._flagStops || this._stroke._flagRadius || this._stroke._flagCenter || this._stroke._flagFocal) || this._stroke instanceof B && (this._stroke._flagLoaded && this._stroke.loaded || this._stroke._flagImage || this._stroke._flagVideo || this._stroke._flagRepeat || this._stroke._flagOffset || this._fill._flagScale) || this._flagStroke || this._flagLinewidth || this._flagOpacity || r._flagOpacity || this._flagVisible || this._flagScale || this.dashes && this.dashes.length > 0 || !this._renderer.texture;
                if ((l || f || u) && (this._renderer.matrix || (this._renderer.matrix = new bt(9)), this._matrix.toTransformArray(!0, zt), Me(zt, r._renderer.matrix, this._renderer.matrix), this._renderer.scale instanceof k || (this._renderer.scale = new k), this._scale instanceof k ? (this._renderer.scale.x = this._scale.x * r._renderer.scale.x, this._renderer.scale.y = this._scale.y * r._renderer.scale.y) : (this._renderer.scale.x = this._scale * r._renderer.scale.x, this._renderer.scale.y = this._scale * r._renderer.scale.y), u && (this._renderer.parent = r)), c) {
                    let b = this._renderer.positionBuffer;
                    b && i.deleteBuffer(b), this._renderer.positionBuffer = i.createBuffer(), i.bindBuffer(i.ARRAY_BUFFER, this._renderer.positionBuffer), i.vertexAttribPointer(n.position, 2, i.FLOAT, !1, 0, 0), i.enableVertexAttribArray(n.position), i.bufferData(i.ARRAY_BUFFER, _, i.STATIC_DRAW);
                }
                return m ? (this._renderer.opacity = this._opacity * r._renderer.opacity, I.updateTexture.call(I, i, this)) : (this._fill && this._fill._update && this._fill._update(), this._stroke && this._stroke._update && this._stroke._update()), this._clip && !e || !this._renderer.texture ? this : (I.isHidden.test(o) || (s += h), s /= I.precision, a && (s *= Math.max(this._renderer.scale.x, this._renderer.scale.y)), t.current !== n && (i.useProgram(n), t.resolution.flagged || i.uniform2f(i.getUniformLocation(n, "u_resolution"), t.resolution.width, t.resolution.height), t.current = n), t.resolution.flagged && i.uniform2f(i.getUniformLocation(n, "u_resolution"), t.resolution.width, t.resolution.height), i.bindTexture(i.TEXTURE_2D, this._renderer.texture), i.uniformMatrix3fv(n.matrix, !1, this._renderer.matrix), i.uniform1f(n.size, s * t.resolution.ratio), i.drawArrays(i.POINTS, 0, d), this.flagReset());
            }
        },
        text: {
            updateCanvas: function(i) {
                let t = this.canvas, e = this.ctx, s = i._renderer.scale, r = i._stroke, n = i._linewidth * s, a = i._fill, o = i._renderer.opacity || i._opacity, h = i.dashes, l = i._decoration;
                t.width = Math.max(Math.ceil(i._renderer.rect.width * s.x), 1), t.height = Math.max(Math.ceil(i._renderer.rect.height * s.y), 1);
                let f = i._renderer.rect.centroid, u = f.x, _ = f.y, d, c, m, b, g, y, x, S, A, E, C, N = a._renderer && a._renderer.offset && r._renderer && r._renderer.offset;
                if (e.clearRect(0, 0, t.width, t.height), N || (e.font = [
                    i._style,
                    i._weight,
                    i._size + "px/" + i._leading + "px",
                    i._family
                ].join(" ")), e.textAlign = "center", e.textBaseline = "middle", a && (typeof a == "string" ? e.fillStyle = a : (I[a._renderer.type].render.call(a, e, i), e.fillStyle = a._renderer.effect)), r && (typeof r == "string" ? e.strokeStyle = r : (I[r._renderer.type].render.call(r, e, i), e.strokeStyle = r._renderer.effect), n && (e.lineWidth = n)), typeof o == "number" && (e.globalAlpha = o), h && h.length > 0 && (e.lineDashOffset = h.offset || 0, e.setLineDash(h)), e.save(), e.scale(s.x, s.y), e.translate(u, _), I.isHidden.test(a) || (a._renderer && a._renderer.offset ? (y = a._renderer.scale.x, x = a._renderer.scale.y, e.save(), e.translate(-a._renderer.offset.x, -a._renderer.offset.y), e.scale(y, x), d = i._size / a._renderer.scale.y, c = i._leading / a._renderer.scale.y, e.font = [
                    i._style,
                    i._weight,
                    d + "px/",
                    c + "px",
                    i._family
                ].join(" "), m = a._renderer.offset.x / a._renderer.scale.x, b = a._renderer.offset.y / a._renderer.scale.y, e.fillText(i.value, m, b), e.restore()) : e.fillText(i.value, 0, 0)), I.isHidden.test(r) || (r._renderer && r._renderer.offset ? (y = r._renderer.scale.x, x = r._renderer.scale.y, e.save(), e.translate(-r._renderer.offset.x, -r._renderer.offset.y), e.scale(y, x), d = i._size / r._renderer.scale.y, c = i._leading / r._renderer.scale.y, e.font = [
                    i._style,
                    i._weight,
                    d + "px/",
                    c + "px",
                    i._family
                ].join(" "), m = r._renderer.offset.x / r._renderer.scale.x, b = r._renderer.offset.y / r._renderer.scale.y, g = n / r._renderer.scale.x, e.lineWidth = g, e.strokeText(i.value, m, b), e.restore()) : e.strokeText(i.value, 0, 0)), /(underline|strikethrough)/i.test(l)) {
                    let M = e.measureText(i.value);
                    switch(l){
                        case "underline":
                            A = M.actualBoundingBoxAscent, C = M.actualBoundingBoxAscent;
                            break;
                        case "strikethrough":
                            A = 0, C = 0;
                            break;
                    }
                    S = -M.width / 2, E = M.width / 2, e.lineWidth = Math.max(Math.floor(i._size / 15), 1), e.strokeStyle = e.fillStyle, e.beginPath(), e.moveTo(S, A), e.lineTo(E, C), e.stroke();
                }
                e.restore();
            },
            getBoundingClientRect: function(i, t) {
                let e = I.ctx;
                e.font = [
                    i._style,
                    i._weight,
                    i._size + "px/" + i._leading + "px",
                    i._family
                ].join(" "), e.textAlign = "center", e.textBaseline = i._baseline;
                let s = e.measureText(i._value).width * 1.25, r = Math.max(i._size, i._leading) * 1.25;
                this._linewidth && !I.isHidden.test(this._stroke) && (s += this._linewidth * 2, r += this._linewidth * 2);
                let n = s / 2, a = r / 2;
                switch(I.alignments[i._alignment] || i._alignment){
                    case I.alignments.left:
                        t.left = 0, t.right = s;
                        break;
                    case I.alignments.right:
                        t.left = -s, t.right = 0;
                        break;
                    default:
                        t.left = -n, t.right = n;
                }
                switch(i._baseline){
                    case "bottom":
                        t.top = -r, t.bottom = 0;
                        break;
                    case "top":
                        t.top = 0, t.bottom = r;
                        break;
                    default:
                        t.top = -a, t.bottom = a;
                }
                t.width = s, t.height = r, t.centroid || (t.centroid = {}), t.centroid.x = n, t.centroid.y = a;
            },
            render: function(i, t, e) {
                if (!this._visible || !this._opacity) return this;
                this._update();
                let s = e || this.parent, r = t[this._renderer.type], n = s._matrix.manual || s._flagMatrix, a = this._matrix.manual || this._flagMatrix, o = this._renderer.parent !== s, h = this._flagVertices || this._flagFill || this._fill instanceof U && (this._fill._flagSpread || this._fill._flagStops || this._fill._flagEndPoints) || this._fill instanceof D && (this._fill._flagSpread || this._fill._flagStops || this._fill._flagRadius || this._fill._flagCenter || this._fill._flagFocal) || this._fill instanceof B && (this._fill._flagLoaded && this._fill.loaded || this._fill._flagImage || this._fill._flagVideo || this._fill._flagRepeat || this._fill._flagOffset || this._fill._flagScale) || this._stroke instanceof U && (this._stroke._flagSpread || this._stroke._flagStops || this._stroke._flagEndPoints) || this._stroke instanceof D && (this._stroke._flagSpread || this._stroke._flagStops || this._stroke._flagRadius || this._stroke._flagCenter || this._stroke._flagFocal) || this._stroke instanceof B && (this._stroke._flagLoaded && this._stroke.loaded || this._stroke._flagImage || this._stroke._flagVideo || this._stroke._flagRepeat || this._stroke._flagOffset || this._fill._flagScale) || this._flagStroke || this._flagLinewidth || this._flagOpacity || s._flagOpacity || this._flagVisible || this._flagScale || this._flagValue || this._flagFamily || this._flagSize || this._flagLeading || this._flagAlignment || this._flagBaseline || this._flagStyle || this._flagWeight || this._flagDecoration || this.dashes && this.dashes.length > 0 || !this._renderer.texture;
                if ((n || a || o) && (this._renderer.matrix || (this._renderer.matrix = new bt(9)), this._matrix.toTransformArray(!0, zt), Me(zt, s._renderer.matrix, this._renderer.matrix), this._renderer.scale instanceof k || (this._renderer.scale = new k), this._scale instanceof k ? (this._renderer.scale.x = this._scale.x * s._renderer.scale.x, this._renderer.scale.y = this._scale.y * s._renderer.scale.y) : (this._renderer.scale.x = this._scale * s._renderer.scale.x, this._renderer.scale.y = this._scale * s._renderer.scale.y), o && (this._renderer.parent = s)), this._mask && (i.clear(i.STENCIL_BUFFER_BIT), i.enable(i.STENCIL_TEST), i.stencilFunc(i.ALWAYS, 1, 0), i.stencilOp(i.KEEP, i.KEEP, i.REPLACE), i.colorMask(!1, !1, !1, !1), I[this._mask._renderer.type].render.call(this._mask, i, t, this), i.stencilFunc(i.EQUAL, 1, 255), i.stencilOp(i.KEEP, i.KEEP, i.KEEP), i.colorMask(!0, !0, !0, !0)), h ? (this._renderer.rect || (this._renderer.rect = {}), this._renderer.opacity = this._opacity * s._renderer.opacity, I.text.getBoundingClientRect(this, this._renderer.rect), I.updateTexture.call(I, i, this)) : (this._fill && this._fill._update && this._fill._update(), this._stroke && this._stroke._update && this._stroke._update()), this._clip && !e || !this._renderer.texture) return this;
                t.current !== r && (i.useProgram(r), i.bindBuffer(i.ARRAY_BUFFER, t.buffers.position), i.vertexAttribPointer(r.position, 2, i.FLOAT, !1, 0, 0), i.enableVertexAttribArray(r.position), i.bufferData(i.ARRAY_BUFFER, ai, i.STATIC_DRAW), t.resolution.flagged || i.uniform2f(i.getUniformLocation(r, "u_resolution"), t.resolution.width, t.resolution.height), t.current = r), t.resolution.flagged && i.uniform2f(i.getUniformLocation(r, "u_resolution"), t.resolution.width, t.resolution.height), i.bindTexture(i.TEXTURE_2D, this._renderer.texture);
                let l = this._renderer.rect;
                return i.uniformMatrix3fv(r.matrix, !1, this._renderer.matrix), i.uniform4f(r.rect, l.left, l.top, l.right, l.bottom), i.drawArrays(i.TRIANGLES, 0, 6), this._mask && i.disable(i.STENCIL_TEST), this.flagReset();
            }
        },
        "linear-gradient": {
            render: function(i, t) {
                if (!(!i.canvas.getContext("2d") || !t)) {
                    if (this._update(), !this._renderer.effect || this._flagEndPoints || this._flagStops || this._flagUnits) {
                        let e, s = this.left._x, r = this.left._y, n = this.right._x, a = this.right._y;
                        /objectBoundingBox/i.test(this._units) && (e = t.getBoundingClientRect(!0), s = (s - .5) * e.width, r = (r - .5) * e.height, n = (n - .5) * e.width, a = (a - .5) * e.height), this._renderer.effect = i.createLinearGradient(s, r, n, a);
                        for(let o = 0; o < this.stops.length; o++){
                            let h = this.stops[o];
                            this._renderer.effect.addColorStop(h._offset, h._color);
                        }
                    }
                    return this.flagReset();
                }
            }
        },
        "radial-gradient": {
            render: function(i, t) {
                if (!(!i.canvas.getContext("2d") || !t)) {
                    if (this._update(), !this._renderer.effect || this._flagCenter || this._flagFocal || this._flagRadius || this._flagStops || this._flagUnits) {
                        let e, s = this.center._x, r = this.center._y, n = this.focal._x, a = this.focal._y, o = this._radius;
                        /objectBoundingBox/i.test(this._units) && (e = t.getBoundingClientRect(!0), s = s * e.width * .5, r = r * e.height * .5, n = n * e.width * .5, a = a * e.height * .5, o *= Math.min(e.width, e.height) * .5), this._renderer.effect = i.createRadialGradient(s, r, 0, n, a, o);
                        for(let h = 0; h < this.stops.length; h++){
                            let l = this.stops[h];
                            this._renderer.effect.addColorStop(l._offset, l._color);
                        }
                    }
                    return this.flagReset();
                }
            }
        },
        texture: {
            render: function(i, t) {
                if (!i.canvas.getContext("2d")) return;
                this._update();
                let e = this.image;
                if ((this._flagLoaded || this._flagImage || this._flagVideo || this._flagRepeat) && this.loaded) this._renderer.effect = i.createPattern(e, this._repeat);
                else if (!this._renderer.effect) return this.flagReset();
                return (this._flagOffset || this._flagLoaded || this._flagScale) && (this._renderer.offset instanceof k || (this._renderer.offset = new k), this._renderer.offset.x = -this._offset.x, this._renderer.offset.y = -this._offset.y, e && (this._renderer.offset.x += e.width / 2, this._renderer.offset.y += e.height / 2, this._scale instanceof k ? (this._renderer.offset.x *= this._scale.x, this._renderer.offset.y *= this._scale.y) : (this._renderer.offset.x *= this._scale, this._renderer.offset.y *= this._scale))), (this._flagScale || this._flagLoaded) && (this._renderer.scale instanceof k || (this._renderer.scale = new k), this._scale instanceof k ? this._renderer.scale.copy(this._scale) : this._renderer.scale.set(this._scale, this._scale)), this.flagReset();
            }
        },
        updateTexture: function(i, t) {
            if (this[t._renderer.type].updateCanvas.call(I, t), this.canvas.width <= 0 || this.canvas.height <= 0) {
                t._renderer.texture && i.deleteTexture(t._renderer.texture), delete t._renderer.texture;
                return;
            }
            t._renderer.texture || (t._renderer.texture = i.createTexture()), i.bindTexture(i.TEXTURE_2D, t._renderer.texture), i.texParameteri(i.TEXTURE_2D, i.TEXTURE_WRAP_S, i.CLAMP_TO_EDGE), i.texParameteri(i.TEXTURE_2D, i.TEXTURE_WRAP_T, i.CLAMP_TO_EDGE), i.texParameteri(i.TEXTURE_2D, i.TEXTURE_MIN_FILTER, i.LINEAR), i.texImage2D(i.TEXTURE_2D, 0, i.RGBA, i.RGBA, i.UNSIGNED_BYTE, this.canvas);
        },
        program: {
            create: function(i, t) {
                let e, s, r;
                if (e = i.createProgram(), R.each(t, function(n) {
                    i.attachShader(e, n);
                }), i.linkProgram(e), s = i.getProgramParameter(e, i.LINK_STATUS), !s) throw r = i.getProgramInfoLog(e), i.deleteProgram(e), new et("unable to link program: " + r);
                return e;
            }
        },
        TextureRegistry: new Et
    };
    I.ctx = I.canvas.getContext("2d");
    var pe = class extends p {
        constructor(t){
            super();
            let e, s, r, n;
            if (this.domElement = t.domElement || document.createElement("canvas"), typeof t.offscreenElement < "u" && (I.canvas = t.offscreenElement, I.ctx = I.canvas.getContext("2d")), this.scene = new q, this.scene.parent = this, this._renderer = {
                type: "renderer",
                matrix: new bt(Ws),
                scale: 1,
                opacity: 1
            }, this._flagMatrix = !0, t = R.defaults(t || {}, {
                antialias: !1,
                alpha: !0,
                premultipliedAlpha: !0,
                stencil: !0,
                preserveDrawingBuffer: !0,
                overdraw: !1
            }), this.overdraw = t.overdraw, e = this.ctx = this.domElement.getContext("webgl", t) || this.domElement.getContext("experimental-webgl", t), !this.ctx) throw new et("unable to create a webgl context. Try using another renderer.");
            r = xt.create(e, xt.path.vertex, xt.types.vertex), n = xt.create(e, xt.path.fragment, xt.types.fragment), this.programs = {
                current: null,
                buffers: {
                    position: e.createBuffer()
                },
                resolution: {
                    width: 0,
                    height: 0,
                    ratio: 1,
                    flagged: !1
                }
            }, s = this.programs.path = I.program.create(e, [
                r,
                n
            ]), this.programs.text = this.programs.path, s.position = e.getAttribLocation(s, "a_position"), s.matrix = e.getUniformLocation(s, "u_matrix"), s.rect = e.getUniformLocation(s, "u_rect");
            let a = e.createBuffer();
            e.bindBuffer(e.ARRAY_BUFFER, a), e.vertexAttribPointer(s.position, 2, e.FLOAT, !1, 0, 0), e.enableVertexAttribArray(s.position), e.bufferData(e.ARRAY_BUFFER, ai, e.STATIC_DRAW), r = xt.create(e, xt.points.vertex, xt.types.vertex), n = xt.create(e, xt.points.fragment, xt.types.fragment), s = this.programs.points = I.program.create(e, [
                r,
                n
            ]), s.position = e.getAttribLocation(s, "a_position"), s.matrix = e.getUniformLocation(s, "u_matrix"), s.size = e.getUniformLocation(s, "u_size"), e.enable(e.BLEND), e.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL, !0), e.blendEquation(e.FUNC_ADD), e.blendFunc(e.ONE, e.ONE_MINUS_SRC_ALPHA);
        }
        setSize(t, e, s) {
            let r, n, a = this.ctx;
            return this.width = t, this.height = e, this.ratio = typeof s > "u" ? Xt(a) : s, this.domElement.width = t * this.ratio, this.domElement.height = e * this.ratio, R.isObject(this.domElement.style) && R.extend(this.domElement.style, {
                width: t + "px",
                height: e + "px"
            }), this._renderer.matrix[0] = this._renderer.matrix[4] = this._renderer.scale = this.ratio, this._flagMatrix = !0, r = t * this.ratio, n = e * this.ratio, a.viewport(0, 0, r, n), this.programs.resolution.width = r, this.programs.resolution.height = n, this.programs.resolution.ratio = this.ratio, this.programs.resolution.flagged = !0, this.trigger(p.Types.resize, t, e, s);
        }
        render() {
            let t = this.ctx;
            return this.overdraw || t.clear(t.COLOR_BUFFER_BIT), I.group.render.call(this.scene, t, this.programs), this._flagMatrix = !1, this.programs.resolution.flagged = !0, this;
        }
    };
    v(pe, "Utils", I);
    var Ys = R.extend({
        Error: et,
        getRatio: Xt,
        read: G,
        xhr: ni
    }, R, ht, Ve, Ie), te = class {
        _events = new p;
        get _bound() {
            return this._events._bound;
        }
        set _bound(t) {
            this._events._bound = t;
        }
        addEventListener() {
            return this._events.addEventListener.apply(this, arguments);
        }
        on() {
            return this._events.addEventListener.apply(this, arguments);
        }
        bind() {
            return this._events.addEventListener.apply(this, arguments);
        }
        removeEventListener() {
            return this._events.removeEventListener.apply(this, arguments);
        }
        off() {
            return this._events.removeEventListener.apply(this, arguments);
        }
        unbind() {
            return this._events.removeEventListener.apply(this, arguments);
        }
        dispatchEvent() {
            return this._events.dispatchEvent.apply(this, arguments);
        }
        trigger() {
            return this._events.dispatchEvent.apply(this, arguments);
        }
        listen() {
            return this._events.listen.apply(this, arguments);
        }
        ignore() {
            return this._events.ignore.apply(this, arguments);
        }
        type = "";
        renderer = null;
        scene = null;
        width = 0;
        height = 0;
        frameCount = 0;
        timeDelta = 0;
        playing = !1;
        constructor(t){
            let e = R.defaults(t || {}, {
                fullscreen: !1,
                fitted: !1,
                width: 640,
                height: 480,
                type: te.Types.svg,
                autostart: !1
            });
            if (R.each(e, function(s, r) {
                /fullscreen/i.test(r) || /autostart/i.test(r) || (this[r] = s);
            }, this), R.isElement(e.domElement)) {
                let s = e.domElement.tagName.toLowerCase();
                /^(CanvasRenderer-canvas|WebGLRenderer-canvas|SVGRenderer-svg)$/.test(this.type + "-" + s) || (this.type = te.Types[s]);
            }
            this.renderer = new te[this.type](this), this.setPlaying(e.autostart), this.frameCount = 0, e.fullscreen ? (this.fit = qs.bind(this), this.fit.domElement = window, this.fit.attached = !0, R.extend(document.body.style, {
                overflow: "hidden",
                margin: 0,
                padding: 0,
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                position: "fixed"
            }), R.extend(this.renderer.domElement.style, {
                display: "block",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                position: "fixed"
            }), gt.bind(this.fit.domElement, "resize", this.fit), this.fit()) : e.fitted ? (this.fit = Gs.bind(this), R.extend(this.renderer.domElement.style, {
                display: "block"
            })) : R.isElement(e.domElement) || (this.renderer.setSize(e.width, e.height, this.ratio), this.width = e.width, this.height = e.height), this.renderer.bind(p.Types.resize, Ks.bind(this)), this.scene = this.renderer.scene, te.Instances.push(this), e.autostart && me.init();
        }
        appendTo(t) {
            return t.appendChild(this.renderer.domElement), this.fit && (this.fit.domElement !== window && (this.fit.domElement = t, this.fit.attached = !1), this.update()), this;
        }
        play() {
            return this.playing = !0, me.init(), this.trigger(p.Types.play);
        }
        pause() {
            return this.playing = !1, this.trigger(p.Types.pause);
        }
        setPlaying(t) {
            this.playing = t;
        }
        release(t) {
            let e, s, r;
            if (!R.isObject(t)) return this.release(this.scene);
            if (typeof t.unbind == "function" && t.unbind(), t.vertices) for(typeof t.vertices.unbind == "function" && t.vertices.unbind(), e = 0; e < t.vertices.length; e++)s = t.vertices[e], typeof s.unbind == "function" && s.unbind(), s.controls && (s.controls.left && typeof s.controls.left.unbind == "function" && s.controls.left.unbind(), s.controls.right && typeof s.controls.right.unbind == "function" && s.controls.right.unbind());
            if (t.children) {
                for(e = 0; e < t.children.length; e++)r = t.children[e], this.release(r);
                typeof t.children.unbind == "function" && t.children.unbind();
            }
            return t;
        }
        update() {
            let t = !!this._lastFrame, e = R.performance.now();
            t && (this.timeDelta = parseFloat((e - this._lastFrame).toFixed(3))), this._lastFrame = e, this.fit && this.fit.domElement && !this.fit.attached && (gt.bind(this.fit.domElement, "resize", this.fit), this.fit.attached = !0, this.fit());
            let s = this.width, r = this.height, n = this.renderer;
            return (s !== n.width || r !== n.height) && n.setSize(s, r, this.ratio), this.trigger(p.Types.update, this.frameCount, this.timeDelta), this.render();
        }
        render() {
            return this.renderer.render(), this.trigger(p.Types.render, this.frameCount++);
        }
        add(t) {
            return t instanceof Array || (t = Array.prototype.slice.call(arguments)), this.scene.add(t), this;
        }
        remove(t) {
            return t instanceof Array || (t = Array.prototype.slice.call(arguments)), this.scene.remove(t), this;
        }
        clear() {
            return this.scene.remove(this.scene.children), this;
        }
        makeLine(t, e, s, r) {
            let n = new Dt(t, e, s, r);
            return this.scene.add(n), n;
        }
        makeArrow(t, e, s, r, n) {
            let a = typeof n == "number" ? n : 10, o = Math.atan2(r - e, s - t), h = [
                new F(t, e, void 0, void 0, void 0, void 0, w.move),
                new F(s, r, void 0, void 0, void 0, void 0, w.line),
                new F(s - a * Math.cos(o - Math.PI / 4), r - a * Math.sin(o - Math.PI / 4), void 0, void 0, void 0, void 0, w.line),
                new F(s, r, void 0, void 0, void 0, void 0, w.move),
                new F(s - a * Math.cos(o + Math.PI / 4), r - a * Math.sin(o + Math.PI / 4), void 0, void 0, void 0, void 0, w.line)
            ], l = new L(h, !1, !1, !0);
            return l.noFill(), l.cap = "round", l.join = "round", this.scene.add(l), l;
        }
        makeRectangle(t, e, s, r) {
            let n = new yt(t, e, s, r);
            return this.scene.add(n), n;
        }
        makeRoundedRectangle(t, e, s, r, n) {
            let a = new Vt(t, e, s, r, n);
            return this.scene.add(a), a;
        }
        makeCircle(t, e, s, r) {
            let n = new Nt(t, e, s, r);
            return this.scene.add(n), n;
        }
        makeEllipse(t, e, s, r, n) {
            let a = new jt(t, e, s, r, n);
            return this.scene.add(a), a;
        }
        makeStar(t, e, s, r, n) {
            let a = new Qt(t, e, s, r, n);
            return this.scene.add(a), a;
        }
        makeCurve(t) {
            let e = arguments.length;
            if (!Array.isArray(t)) {
                t = [];
                for(let a = 0; a < e; a += 2){
                    let o = arguments[a];
                    if (typeof o != "number") break;
                    let h = arguments[a + 1];
                    t.push(new F(o, h));
                }
            }
            let s = arguments[e - 1], r = new L(t, !(typeof s == "boolean" && s), !0), n = r.getBoundingClientRect();
            return r.center().translation.set(n.left + n.width / 2, n.top + n.height / 2), this.scene.add(r), r;
        }
        makePolygon(t, e, s, r) {
            let n = new Zt(t, e, s, r);
            return this.scene.add(n), n;
        }
        makeArcSegment(t, e, s, r, n, a, o) {
            let h = new Kt(t, e, s, r, n, a, o);
            return this.scene.add(h), h;
        }
        makePoints(t) {
            let e = arguments.length, s = t;
            if (!Array.isArray(t)) {
                s = [];
                for(let n = 0; n < e; n += 2){
                    let a = arguments[n];
                    if (typeof a != "number") break;
                    let o = arguments[n + 1];
                    s.push(new k(a, o));
                }
            }
            let r = new Jt(s);
            return this.scene.add(r), r;
        }
        makePath(t) {
            let e = arguments.length, s = t;
            if (!Array.isArray(t)) {
                s = [];
                for(let o = 0; o < e; o += 2){
                    let h = arguments[o];
                    if (typeof h != "number") break;
                    let l = arguments[o + 1];
                    s.push(new F(h, l));
                }
            }
            let r = arguments[e - 1], n = new L(s, !(typeof r == "boolean" && r)), a = n.getBoundingClientRect();
            return typeof a.top == "number" && typeof a.left == "number" && typeof a.right == "number" && typeof a.bottom == "number" && n.center().translation.set(a.left + a.width / 2, a.top + a.height / 2), this.scene.add(n), n;
        }
        makeText(t, e, s, r) {
            let n = new ct(t, e, s, r);
            return this.add(n), n;
        }
        makeLinearGradient(t, e, s, r) {
            let n = Array.prototype.slice.call(arguments, 4), a = new U(t, e, s, r, n);
            return this.add(a), a;
        }
        makeRadialGradient(t, e, s) {
            let r = Array.prototype.slice.call(arguments, 3), n = new D(t, e, s, r);
            return this.add(n), n;
        }
        makeSprite(t, e, s, r, n, a, o) {
            let h = new Bt(t, e, s, r, n, a);
            return o && h.play(), this.add(h), h;
        }
        makeImageSequence(t, e, s, r, n) {
            let a = new Ht(t, e, s, r);
            return n && a.play(), this.add(a), a;
        }
        makeTexture(t, e) {
            return new B(t, e);
        }
        makeGroup(t) {
            t instanceof Array || (t = Array.prototype.slice.call(arguments));
            let e = new q;
            return this.scene.add(e), e.add(t), e;
        }
        interpret(t, e, s) {
            let r = t.tagName.toLowerCase();
            if (s = typeof s < "u" ? s : !0, !(r in G)) return null;
            let n = G[r].call(this, t);
            return s ? this.add(e && n instanceof q ? n.children : n) : n.parent && n.remove(), n;
        }
        load(t, e) {
            let s = new q, r, n, a, o = (function(h) {
                for(gt.temp.innerHTML = h, n = 0; n < gt.temp.children.length; n++)r = gt.temp.children[n], a = this.interpret(r, !1, !1), a !== null && s.add(a);
                if (typeof e == "function") {
                    let l = gt.temp.children.length <= 1 ? gt.temp.children[0] : gt.temp.children;
                    e(s, l);
                }
            }).bind(this);
            return /\.svg$/i.test(t) ? (ni(t, o), s) : (o(t), s);
        }
    }, P = te;
    v(P, "nextFrameID", Y.nextFrameID), v(P, "Types", Y.Types), v(P, "Version", Y.Version), v(P, "PublishDate", Y.PublishDate), v(P, "Identifier", Y.Identifier), v(P, "Resolution", Y.Resolution), v(P, "AutoCalculateImportedMatrices", Y.AutoCalculateImportedMatrices), v(P, "Instances", Y.Instances), v(P, "uniqueId", Y.uniqueId), v(P, "Anchor", F), v(P, "Collection", lt), v(P, "Events", p), v(P, "Group", q), v(P, "Matrix", at), v(P, "Path", L), v(P, "Registry", Et), v(P, "Shape", ot), v(P, "Text", ct), v(P, "Vector", k), v(P, "Gradient", W), v(P, "ImageSequence", Ht), v(P, "LinearGradient", U), v(P, "RadialGradient", D), v(P, "Sprite", Bt), v(P, "Stop", ft), v(P, "Texture", B), v(P, "ArcSegment", Kt), v(P, "Circle", Nt), v(P, "Ellipse", jt), v(P, "Line", Dt), v(P, "Points", Jt), v(P, "Polygon", Zt), v(P, "Rectangle", yt), v(P, "RoundedRectangle", Vt), v(P, "Star", Qt), v(P, "CanvasRenderer", At), v(P, "SVGRenderer", ge), v(P, "WebGLRenderer", pe), v(P, "Commands", w), v(P, "Utils", Ys);
    function qs() {
        let i = document.body.getBoundingClientRect(), t = this.width = i.width, e = this.height = i.height;
        this.renderer.setSize(t, e, this.ratio);
    }
    function Gs() {
        let i = this.renderer.domElement.parentElement;
        if (!i) {
            console.warn("Two.js: Attempting to fit to parent, but no parent found.");
            return;
        }
        let t = i.getBoundingClientRect(), e = this.width = t.width, s = this.height = t.height;
        this.renderer.setSize(e, s, this.ratio);
    }
    function Ks(i, t) {
        this.width = i, this.height = t, this.trigger(p.Types.resize, i, t);
    }
    var me = gt.getRequestAnimationFrame();
    function qi() {
        for(let i = 0; i < P.Instances.length; i++){
            let t = P.Instances[i];
            t.playing && t.update();
        }
        P.nextFrameID = me(qi);
    }
    me.init = function() {
        qi(), me.init = function() {};
    };
    return Qi($s);
})().default;
(function() {
    if (typeof exports === "object" && typeof module !== "undefined") module.exports = Two;
})();

//# sourceMappingURL=main.0aace861.js.map
