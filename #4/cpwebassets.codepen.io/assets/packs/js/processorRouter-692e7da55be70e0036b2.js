! function(t) {
    function r(r) {
        for (var n, a, u = r[0], c = r[1], s = r[2], l = 0, h = []; l < u.length; l++) a = u[l], Object.prototype.hasOwnProperty.call(o, a) && o[a] && h.push(o[a][0]), o[a] = 0;
        for (n in c) Object.prototype.hasOwnProperty.call(c, n) && (t[n] = c[n]);
        for (f && f(r); h.length;) h.shift()();
        return i.push.apply(i, s || []), e()
    }

    function e() {
        for (var t, r = 0; r < i.length; r++) {
            for (var e = i[r], n = !0, u = 1; u < e.length; u++) {
                var c = e[u];
                0 !== o[c] && (n = !1)
            }
            n && (i.splice(r--, 1), t = a(a.s = e[0]))
        }
        return t
    }
    var n = {},
        o = {
            43: 0
        },
        i = [];

    function a(r) {
        if (n[r]) return n[r].exports;
        var e = n[r] = {
            i: r,
            l: !1,
            exports: {}
        };
        return t[r].call(e.exports, e, e.exports, a), e.l = !0, e.exports
    }
    a.e = function() {
        return Promise.resolve()
    }, a.m = t, a.c = n, a.d = function(t, r, e) {
        a.o(t, r) || Object.defineProperty(t, r, {
            enumerable: !0,
            get: e
        })
    }, a.r = function(t) {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(t, Symbol.toStringTag, {
            value: "Module"
        }), Object.defineProperty(t, "__esModule", {
            value: !0
        })
    }, a.t = function(t, r) {
        if (1 & r && (t = a(t)), 8 & r) return t;
        if (4 & r && "object" == typeof t && t && t.__esModule) return t;
        var e = Object.create(null);
        if (a.r(e), Object.defineProperty(e, "default", {
                enumerable: !0,
                value: t
            }), 2 & r && "string" != typeof t)
            for (var n in t) a.d(e, n, function(r) {
                return t[r]
            }.bind(null, n));
        return e
    }, a.n = function(t) {
        var r = t && t.__esModule ? function() {
            return t.default
        } : function() {
            return t
        };
        return a.d(r, "a", r), r
    }, a.o = function(t, r) {
        return Object.prototype.hasOwnProperty.call(t, r)
    }, a.p = "https://cpwebassets.codepen.io/assets/packs/";
    var u = (self || this).webpackJsonp = (self || this).webpackJsonp || [],
        c = u.push.bind(u);
    u.push = r, u = u.slice();
    for (var s = 0; s < u.length; s++) r(u[s]);
    var f = c;
    i.push([859, 0, 1]), e()
}({
    859: function(t, r, e) {
        "use strict";
        e.r(r), e.d(r, "process", (function() {
            return s
        }));
        var n = e(716),
            o = e.n(n),
            i = e(4);

        function a() {
            a = function() {
                return r
            };
            var t, r = {},
                e = Object.prototype,
                n = e.hasOwnProperty,
                o = Object.defineProperty || function(t, r, e) {
                    t[r] = e.value
                },
                i = "function" == typeof Symbol ? Symbol : {},
                u = i.iterator || "@@iterator",
                s = i.asyncIterator || "@@asyncIterator",
                f = i.toStringTag || "@@toStringTag";

            function l(t, r, e) {
                return Object.defineProperty(t, r, {
                    value: e,
                    enumerable: !0,
                    configurable: !0,
                    writable: !0
                }), t[r]
            }
            try {
                l({}, "")
            } catch (t) {
                l = function(t, r, e) {
                    return t[r] = e
                }
            }

            function h(t, r, e, n) {
                var i = r && r.prototype instanceof m ? r : m,
                    a = Object.create(i.prototype),
                    u = new G(n || []);
                return o(a, "_invoke", {
                    value: P(t, e, u)
                }), a
            }

            function p(t, r, e) {
                try {
                    return {
                        type: "normal",
                        arg: t.call(r, e)
                    }
                } catch (t) {
                    return {
                        type: "throw",
                        arg: t
                    }
                }
            }
            r.wrap = h;
            var y = "suspendedStart",
                v = "executing",
                d = "completed",
                g = {};

            function m() {}

            function b() {}

            function w() {}
            var x = {};
            l(x, u, (function() {
                return this
            }));
            var L = Object.getPrototypeOf,
                O = L && L(L(T([])));
            O && O !== e && n.call(O, u) && (x = O);
            var j = w.prototype = m.prototype = Object.create(x);

            function E(t) {
                ["next", "throw", "return"].forEach((function(r) {
                    l(t, r, (function(t) {
                        return this._invoke(r, t)
                    }))
                }))
            }

            function _(t, r) {
                function e(o, i, a, u) {
                    var s = p(t[o], t, i);
                    if ("throw" !== s.type) {
                        var f = s.arg,
                            l = f.value;
                        return l && "object" == c(l) && n.call(l, "__await") ? r.resolve(l.__await).then((function(t) {
                            e("next", t, a, u)
                        }), (function(t) {
                            e("throw", t, a, u)
                        })) : r.resolve(l).then((function(t) {
                            f.value = t, a(f)
                        }), (function(t) {
                            return e("throw", t, a, u)
                        }))
                    }
                    u(s.arg)
                }
                var i;
                o(this, "_invoke", {
                    value: function(t, n) {
                        function o() {
                            return new r((function(r, o) {
                                e(t, n, r, o)
                            }))
                        }
                        return i = i ? i.then(o, o) : o()
                    }
                })
            }

            function P(r, e, n) {
                var o = y;
                return function(i, a) {
                    if (o === v) throw new Error("Generator is already running");
                    if (o === d) {
                        if ("throw" === i) throw a;
                        return {
                            value: t,
                            done: !0
                        }
                    }
                    for (n.method = i, n.arg = a;;) {
                        var u = n.delegate;
                        if (u) {
                            var c = S(u, n);
                            if (c) {
                                if (c === g) continue;
                                return c
                            }
                        }
                        if ("next" === n.method) n.sent = n._sent = n.arg;
                        else if ("throw" === n.method) {
                            if (o === y) throw o = d, n.arg;
                            n.dispatchException(n.arg)
                        } else "return" === n.method && n.abrupt("return", n.arg);
                        o = v;
                        var s = p(r, e, n);
                        if ("normal" === s.type) {
                            if (o = n.done ? d : "suspendedYield", s.arg === g) continue;
                            return {
                                value: s.arg,
                                done: n.done
                            }
                        }
                        "throw" === s.type && (o = d, n.method = "throw", n.arg = s.arg)
                    }
                }
            }

            function S(r, e) {
                var n = e.method,
                    o = r.iterator[n];
                if (o === t) return e.delegate = null, "throw" === n && r.iterator.return && (e.method = "return", e.arg = t, S(r, e), "throw" === e.method) || "return" !== n && (e.method = "throw", e.arg = new TypeError("The iterator does not provide a '" + n + "' method")), g;
                var i = p(o, r.iterator, e.arg);
                if ("throw" === i.type) return e.method = "throw", e.arg = i.arg, e.delegate = null, g;
                var a = i.arg;
                return a ? a.done ? (e[r.resultName] = a.value, e.next = r.nextLoc, "return" !== e.method && (e.method = "next", e.arg = t), e.delegate = null, g) : a : (e.method = "throw", e.arg = new TypeError("iterator result is not an object"), e.delegate = null, g)
            }

            function k(t) {
                var r = {
                    tryLoc: t[0]
                };
                1 in t && (r.catchLoc = t[1]), 2 in t && (r.finallyLoc = t[2], r.afterLoc = t[3]), this.tryEntries.push(r)
            }

            function N(t) {
                var r = t.completion || {};
                r.type = "normal", delete r.arg, t.completion = r
            }

            function G(t) {
                this.tryEntries = [{
                    tryLoc: "root"
                }], t.forEach(k, this), this.reset(!0)
            }

            function T(r) {
                if (r || "" === r) {
                    var e = r[u];
                    if (e) return e.call(r);
                    if ("function" == typeof r.next) return r;
                    if (!isNaN(r.length)) {
                        var o = -1,
                            i = function e() {
                                for (; ++o < r.length;)
                                    if (n.call(r, o)) return e.value = r[o], e.done = !1, e;
                                return e.value = t, e.done = !0, e
                            };
                        return i.next = i
                    }
                }
                throw new TypeError(c(r) + " is not iterable")
            }
            return b.prototype = w, o(j, "constructor", {
                value: w,
                configurable: !0
            }), o(w, "constructor", {
                value: b,
                configurable: !0
            }), b.displayName = l(w, f, "GeneratorFunction"), r.isGeneratorFunction = function(t) {
                var r = "function" == typeof t && t.constructor;
                return !!r && (r === b || "GeneratorFunction" === (r.displayName || r.name))
            }, r.mark = function(t) {
                return Object.setPrototypeOf ? Object.setPrototypeOf(t, w) : (t.__proto__ = w, l(t, f, "GeneratorFunction")), t.prototype = Object.create(j), t
            }, r.awrap = function(t) {
                return {
                    __await: t
                }
            }, E(_.prototype), l(_.prototype, s, (function() {
                return this
            })), r.AsyncIterator = _, r.async = function(t, e, n, o, i) {
                void 0 === i && (i = Promise);
                var a = new _(h(t, e, n, o), i);
                return r.isGeneratorFunction(e) ? a : a.next().then((function(t) {
                    return t.done ? t.value : a.next()
                }))
            }, E(j), l(j, f, "Generator"), l(j, u, (function() {
                return this
            })), l(j, "toString", (function() {
                return "[object Generator]"
            })), r.keys = function(t) {
                var r = Object(t),
                    e = [];
                for (var n in r) e.push(n);
                return e.reverse(),
                    function t() {
                        for (; e.length;) {
                            var n = e.pop();
                            if (n in r) return t.value = n, t.done = !1, t
                        }
                        return t.done = !0, t
                    }
            }, r.values = T, G.prototype = {
                constructor: G,
                reset: function(r) {
                    if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(N), !r)
                        for (var e in this) "t" === e.charAt(0) && n.call(this, e) && !isNaN(+e.slice(1)) && (this[e] = t)
                },
                stop: function() {
                    this.done = !0;
                    var t = this.tryEntries[0].completion;
                    if ("throw" === t.type) throw t.arg;
                    return this.rval
                },
                dispatchException: function(r) {
                    if (this.done) throw r;
                    var e = this;

                    function o(n, o) {
                        return u.type = "throw", u.arg = r, e.next = n, o && (e.method = "next", e.arg = t), !!o
                    }
                    for (var i = this.tryEntries.length - 1; i >= 0; --i) {
                        var a = this.tryEntries[i],
                            u = a.completion;
                        if ("root" === a.tryLoc) return o("end");
                        if (a.tryLoc <= this.prev) {
                            var c = n.call(a, "catchLoc"),
                                s = n.call(a, "finallyLoc");
                            if (c && s) {
                                if (this.prev < a.catchLoc) return o(a.catchLoc, !0);
                                if (this.prev < a.finallyLoc) return o(a.finallyLoc)
                            } else if (c) {
                                if (this.prev < a.catchLoc) return o(a.catchLoc, !0)
                            } else {
                                if (!s) throw new Error("try statement without catch or finally");
                                if (this.prev < a.finallyLoc) return o(a.finallyLoc)
                            }
                        }
                    }
                },
                abrupt: function(t, r) {
                    for (var e = this.tryEntries.length - 1; e >= 0; --e) {
                        var o = this.tryEntries[e];
                        if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) {
                            var i = o;
                            break
                        }
                    }
                    i && ("break" === t || "continue" === t) && i.tryLoc <= r && r <= i.finallyLoc && (i = null);
                    var a = i ? i.completion : {};
                    return a.type = t, a.arg = r, i ? (this.method = "next", this.next = i.finallyLoc, g) : this.complete(a)
                },
                complete: function(t, r) {
                    if ("throw" === t.type) throw t.arg;
                    return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && r && (this.next = r), g
                },
                finish: function(t) {
                    for (var r = this.tryEntries.length - 1; r >= 0; --r) {
                        var e = this.tryEntries[r];
                        if (e.finallyLoc === t) return this.complete(e.completion, e.afterLoc), N(e), g
                    }
                },
                catch: function(t) {
                    for (var r = this.tryEntries.length - 1; r >= 0; --r) {
                        var e = this.tryEntries[r];
                        if (e.tryLoc === t) {
                            var n = e.completion;
                            if ("throw" === n.type) {
                                var o = n.arg;
                                N(e)
                            }
                            return o
                        }
                    }
                    throw new Error("illegal catch attempt")
                },
                delegateYield: function(r, e, n) {
                    return this.delegate = {
                        iterator: T(r),
                        resultName: e,
                        nextLoc: n
                    }, "next" === this.method && (this.arg = t), g
                }
            }, r
        }

        function u(t, r, e, n, o, i, a) {
            try {
                var u = t[i](a),
                    c = u.value
            } catch (t) {
                return void e(t)
            }
            u.done ? r(c) : Promise.resolve(c).then(n, o)
        }

        function c(t) {
            return c = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
                return typeof t
            } : function(t) {
                return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
            }, c(t)
        }
        var s = function() {
                var t, r = (t = a().mark((function t(r) {
                    var e, n, o, u, c;
                    return a().wrap((function(t) {
                        for (;;) switch (t.prev = t.next) {
                            case 0:
                                return e = Object.values(r).map((function(t) {
                                    return {
                                        id: t.id,
                                        options: t.options,
                                        processors: l(t),
                                        syntax: t.syntax,
                                        textInput: t.textInput
                                    }
                                })), t.next = 3, Object(i.fb)({
                                    url: "/cpe/process",
                                    params: e
                                });
                            case 3:
                                return n = t.sent, o = n.data, u = n.errors, c = n.success, t.abrupt("return", o.reduce((function(t, r) {
                                    return t.payload[r.id] = r, t
                                }), {
                                    errors: u,
                                    payload: {},
                                    success: c
                                }));
                            case 6:
                            case "end":
                                return t.stop()
                        }
                    }), t)
                })), function() {
                    var r = this,
                        e = arguments;
                    return new Promise((function(n, o) {
                        var i = t.apply(r, e);

                        function a(t) {
                            u(i, n, o, a, c, "next", t)
                        }

                        function c(t) {
                            u(i, n, o, a, c, "throw", t)
                        }
                        a(void 0)
                    }))
                });
                return function(t) {
                    return r.apply(this, arguments)
                }
            }(),
            f = window.__processorsMap;

        function l(t) {
            var r = [],
                e = t.options,
                n = t.syntax,
                o = t.version;
            return ["scss", "sass"].includes(n) && "3.4.22" === o ? r.push(f["sass-ruby-compass-3"]) : "vue" === n && "3" === o ? r.push(f.vue3) : "none" === n && e.detectInfiniteLoops ? r.push(f.babel) : r.push(f[n]), e.autoprefixer && r.push(f.autoprefixer), r.filter(Boolean)
        }
        window.ProcessorRouter = {
            hashObject: function(t) {
                var r = "object" === c(t) ? t : {},
                    e = JSON.stringify(r);
                return {
                    key: o()(e),
                    value: e
                }
            },
            process: s
        }
    }
});