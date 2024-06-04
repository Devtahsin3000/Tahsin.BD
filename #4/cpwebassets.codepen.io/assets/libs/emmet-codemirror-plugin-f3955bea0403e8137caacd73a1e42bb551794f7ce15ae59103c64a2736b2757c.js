! function(e) {
    "function" == typeof define && define.amd ? define(e) : e()
}((function() {
    "use strict";

    function e(e) {
        return e > 47 && e < 58
    }

    function t(e, t, n) {
        return n = n || 90, (e &= -33) >= (t = t || 65) && e <= n
    }

    function n(t) {
        return e(t) || r(t)
    }

    function r(e) {
        return 95 === e || t(e)
    }

    function o(e) {
        return 32 === e || 9 === e || 160 === e
    }

    function i(e) {
        return o(e) || 10 === e || 13 === e
    }

    function s(e, t) {
        t = Object.assign(Object.assign({}, ic), t);
        const n = e.pos,
            r = e.peek();
        if (e.eat(a)) {
            for (; !e.eof();) switch (e.next()) {
                case r:
                    return e.start = n, !0;
                case t.escape:
                    e.next()
            }
            if (e.pos = n, t.throws) throw e.error("Unable to consume quoted string")
        }
        return !1
    }

    function a(e) {
        return 39 === e || 34 === e
    }

    function u(e, t, n, r) {
        r = Object.assign(Object.assign({}, ic), r);
        const o = e.pos;
        if (e.eat(t)) {
            let i, a = 1;
            for (; !e.eof();)
                if (!s(e, r))
                    if (i = e.next(), i === t) a++;
                    else if (i === n) {
                if (a--, !a) return e.start = o, !0
            } else i === r.escape && e.next();
            if (e.pos = o, r.throws) throw e.error(`Unable to find matching pair for ${String.fromCharCode(t)}`)
        }
        return !1
    }

    function c(e) {
        return {
            tokens: e,
            start: 0,
            pos: 0,
            size: e.length
        }
    }

    function l(e) {
        return e.tokens[e.pos]
    }

    function p(e) {
        return e.tokens[e.pos++]
    }

    function f(e, t = e.start, n = e.pos) {
        return e.tokens.slice(t, n)
    }

    function m(e) {
        return e.pos < e.size
    }

    function d(e, t) {
        const n = l(e);
        return !(!n || !t(n)) && (e.pos++, !0)
    }

    function h(e, t, n = l(e)) {
        n && null != n.start && (t += ` at ${n.start}`);
        const r = new Error(t);
        return r.pos = n && n.start, r
    }

    function g(e, t = {}) {
        const n = c(e),
            r = b(n, t);
        if (m(n)) throw h(n, "Unexpected character");
        return r
    }

    function b(e, t) {
        const n = {
            type: "TokenGroup",
            elements: []
        };
        let r, o = n;
        const i = [];
        for (; m(e) && (r = y(e, t) || v(e, t));)
            if (o.elements.push(r), d(e, _)) i.push(o), o = r;
            else {
                if (d(e, Q)) continue;
                if (d(e, H))
                    do {
                        i.length && (o = i.pop())
                    } while (d(e, H))
            }
        return n
    }

    function v(e, t) {
        if (d(e, B)) {
            const n = b(e, t);
            return T(p(e), "group", !1) && (n.repeat = $(e)), n
        }
    }

    function y(e, t) {
        let n;
        const r = {
            type: "TokenElement",
            name: void 0,
            attributes: void 0,
            value: void 0,
            repeat: void 0,
            selfClose: !1,
            elements: []
        };
        for (j(e, t) && (r.name = f(e)); m(e);)
            if (e.start = e.pos, r.repeat || D(r) || !d(e, L))
                if (!r.value && A(e)) r.value = E(e);
                else {
                    if (!(n = k(e, "id", t) || k(e, "class", t) || x(e))) {
                        !D(r) && d(e, X) && (r.selfClose = !0, !r.repeat && d(e, L) && (r.repeat = e.tokens[e.pos - 1]));
                        break
                    }
                    r.attributes ? r.attributes = r.attributes.concat(n) : r.attributes = Array.isArray(n) ? n.slice() : [n]
                }
        else r.repeat = e.tokens[e.pos - 1];
        return D(r) ? void 0 : r
    }

    function x(e) {
        if (d(e, W)) {
            const t = [];
            let n;
            for (; m(e);)
                if (n = w(e)) t.push(n);
                else {
                    if (d(e, V)) break;
                    if (!d(e, F)) throw h(e, `Unexpected "${l(e).type}" token`)
                }
            return t
        }
    }

    function k(e, t, n) {
        if (N(l(e), t)) {
            e.pos++;
            const r = {
                name: [U(t)]
            };
            return n.jsx && A(e) ? (r.value = E(e), r.expression = !0) : r.value = S(e) ? f(e) : void 0, r
        }
    }

    function w(e) {
        return C(e) ? {
            value: f(e)
        } : S(e, !0) ? {
            name: f(e),
            value: d(e, q) && (C(e) || S(e, !0)) ? f(e) : void 0
        } : void 0
    }

    function $(e) {
        return L(l(e)) ? e.tokens[e.pos++] : void 0
    }

    function C(e) {
        const t = e.pos,
            n = l(e);
        if (O(n)) {
            for (e.pos++; m(e);)
                if (O(p(e), n.single)) return e.start = t, !0;
            throw h(e, "Unclosed quote", n)
        }
        return !1
    }

    function S(e, t) {
        const n = e.pos,
            r = {
                attribute: 0,
                expression: 0,
                group: 0
            };
        for (; m(e);) {
            const n = l(e);
            if (r.expression) T(n, "expression") && (r[n.context] += n.open ? 1 : -1);
            else {
                if (O(n) || N(n) || F(n) || L(n)) break;
                if (T(n)) {
                    if (!t) break;
                    if (n.open) r[n.context]++;
                    else {
                        if (!r[n.context]) break;
                        r[n.context]--
                    }
                }
            }
            e.pos++
        }
        return n !== e.pos && (e.start = n, !0)
    }

    function j(e, t) {
        const n = e.pos;
        if (t.jsx && d(e, M))
            for (; m(e);) {
                const {
                    pos: t
                } = e;
                if (!d(e, I) || !d(e, M)) {
                    e.pos = t;
                    break
                }
            }
        for (; m(e) && d(e, P););
        return e.pos !== n && (e.start = n, !0)
    }

    function A(e) {
        const t = e.pos;
        if (d(e, R)) {
            let n = 0;
            for (; m(e);) {
                const t = p(e);
                if (T(t, "expression"))
                    if (t.open) n++;
                    else {
                        if (!n) break;
                        n--
                    }
            }
            return e.start = t, !0
        }
        return !1
    }

    function E(e) {
        let t = e.start,
            n = e.pos;
        return T(e.tokens[t], "expression", !0) && t++, T(e.tokens[n - 1], "expression", !1) && n--, f(e, t, n)
    }

    function T(e, t, n) {
        return Boolean(e && "Bracket" === e.type && (!t || e.context === t) && (null == n || e.open === n))
    }

    function N(e, t) {
        return Boolean(e && "Operator" === e.type && (!t || e.operator === t))
    }

    function O(e, t) {
        return Boolean(e && "Quote" === e.type && (null == t || e.single === t))
    }

    function F(e) {
        return Boolean(e && "WhiteSpace" === e.type)
    }

    function q(e) {
        return N(e, "equal")
    }

    function L(e) {
        return Boolean(e && "Repeater" === e.type)
    }

    function z(e) {
        return "Literal" === e.type
    }

    function M(e) {
        if (z(e)) {
            const t = e.value.charCodeAt(0);
            return t >= 65 && t <= 90
        }
        return !1
    }

    function P(e) {
        return "Literal" === e.type || "RepeaterNumber" === e.type || "RepeaterPlaceholder" === e.type
    }

    function I(e) {
        return N(e, "class")
    }

    function W(e) {
        return T(e, "attribute", !0)
    }

    function V(e) {
        return T(e, "attribute", !1)
    }

    function R(e) {
        return T(e, "expression", !0)
    }

    function B(e) {
        return T(e, "group", !0)
    }

    function U(e) {
        return {
            type: "Literal",
            value: e
        }
    }

    function D(e) {
        return !e.name && !e.value && !e.attributes
    }

    function _(e) {
        return N(e, "child")
    }

    function Q(e) {
        return N(e, "sibling")
    }

    function H(e) {
        return N(e, "climb")
    }

    function X(e) {
        return N(e, "close")
    }

    function G(e) {
        return !!e.eat(92) && (e.start = e.pos, e.eof() || e.pos++, !0)
    }

    function Z(e) {
        const t = new sc(e),
            n = [],
            r = {
                group: 0,
                attribute: 0,
                expression: 0,
                quote: 0
            };
        let o, i = 0;
        for (; !t.eof();) {
            if (i = t.peek(), o = Y(t, r), !o) throw t.error("Unexpected character");
            n.push(o), "Quote" === o.type ? r.quote = i === r.quote ? 0 : i : "Bracket" === o.type && (r[o.context] += o.open ? 1 : -1)
        }
        return n
    }

    function Y(e, t) {
        return se(e, t) || oe(e) || ie(e) || re(e) || K(e) || J(e, t) || ne(e) || ee(e) || te(e)
    }

    function J(e, t) {
        const n = e.pos;
        let r = "";
        for (; !e.eof();) {
            if (G(e)) {
                r += e.current();
                continue
            }
            const n = e.peek();
            if (n === t.quote || 36 === n || ue(n, t)) break;
            if (t.expression && 125 === n) break;
            if (!t.quote && !t.expression) {
                if (!t.attribute && !de(n)) break;
                if (ce(n, t) || le(n, t) || a(n) || pe(n)) break
            }
            r += e.string[e.pos++]
        }
        if (n !== e.pos) return e.start = n, {
            type: "Literal",
            value: r,
            start: n,
            end: e.pos
        }
    }

    function K(e) {
        const t = e.pos;
        if (e.eatWhile(i)) return {
            type: "WhiteSpace",
            start: t,
            end: e.pos,
            value: e.substring(t, e.pos)
        }
    }

    function ee(e) {
        const t = e.peek();
        if (a(t)) return {
            type: "Quote",
            single: 39 === t,
            start: e.pos++,
            end: e.pos
        }
    }

    function te(e) {
        const t = e.peek(),
            n = pe(t);
        if (n) return {
            type: "Bracket",
            open: me(t),
            context: n,
            start: e.pos++,
            end: e.pos
        }
    }

    function ne(e) {
        const t = fe(e.peek());
        if (t) return {
            type: "Operator",
            operator: t,
            start: e.pos++,
            end: e.pos
        }
    }

    function re(t) {
        const n = t.pos;
        if (t.eat(42)) {
            t.start = t.pos;
            let r = 1,
                o = !1;
            return t.eatWhile(e) ? r = Number(t.current()) : o = !0, {
                type: "Repeater",
                count: r,
                value: 0,
                implicit: o,
                start: n,
                end: t.pos
            }
        }
    }

    function oe(e) {
        const t = e.pos;
        if (e.eat(36) && e.eat(35)) return {
            type: "RepeaterPlaceholder",
            value: void 0,
            start: t,
            end: e.pos
        };
        e.pos = t
    }

    function ie(t) {
        const n = t.pos;
        if (t.eatWhile(36)) {
            const r = t.pos - n;
            let o = !1,
                i = 1,
                s = 0;
            if (t.eat(64)) {
                for (; t.eat(94);) s++;
                o = t.eat(45), t.start = t.pos, t.eatWhile(e) && (i = Number(t.current()))
            }
            return t.start = n, {
                type: "RepeaterNumber",
                size: r,
                reverse: o,
                base: i,
                parent: s,
                start: n,
                end: t.pos
            }
        }
    }

    function se(n, r) {
        const o = n.pos;
        if ((r.expression || r.attribute) && n.eat(36) && n.eat(123)) {
            let r;
            n.start = n.pos;
            let i = "";
            if (n.eatWhile(e) ? (r = Number(n.current()), i = n.eat(58) ? ae(n) : "") : t(n.peek()) && (i = ae(n)), n.eat(125)) return {
                type: "Field",
                index: r,
                name: i,
                start: o,
                end: n.pos
            };
            throw n.error("Expecting }")
        }
        n.pos = o
    }

    function ae(e) {
        const t = [];
        for (e.start = e.pos; !e.eof();)
            if (e.eat(123)) t.push(e.pos);
            else if (e.eat(125)) {
            if (!t.length) {
                e.pos--;
                break
            }
            t.pop()
        } else e.pos++;
        if (t.length) throw e.pos = t.pop(), e.error("Expecting }");
        return e.current()
    }

    function ue(e, t) {
        const n = fe(e);
        return !(!n || t.quote || t.expression) && (!t.attribute || "equal" === n)
    }

    function ce(e, t) {
        return i(e) && !t.expression
    }

    function le(e, t) {
        return 42 === e && !t.attribute && !t.expression
    }

    function pe(e) {
        return 40 === e || 41 === e ? "group" : 91 === e || 93 === e ? "attribute" : 123 === e || 125 === e ? "expression" : void 0
    }

    function fe(e) {
        return (62 === e ? "child" : 43 === e && "sibling") || 94 === e && "climb" || 46 === e && "class" || 35 === e && "id" || 47 === e && "close" || 61 === e && "equal" || void 0
    }

    function me(e) {
        return 123 === e || 91 === e || 40 === e
    }

    function de(e) {
        return n(e) || 45 === e || 58 === e || 33 === e
    }

    function he(e, t) {
        if (!cc[e.type]) throw new Error(`Unknown token ${e.type}`);
        return cc[e.type](e, t)
    }

    function ge(e, t = {}) {
        let n, r = !1;
        t.text && (n = Array.isArray(t.text) ? t.text.filter((e => e.trim())) : t.text);
        const o = {
            type: "Abbreviation",
            children: ye(e, {
                inserted: !1,
                repeaters: [],
                text: t.text,
                cleanText: n,
                repeatGuard: t.maxRepeat || Number.POSITIVE_INFINITY,
                getText(e) {
                    var o;
                    let i;
                    if (r = !0, Array.isArray(t.text)) {
                        if (void 0 !== e && e >= 0 && e < n.length) return n[e];
                        i = void 0 !== e ? t.text[e] : t.text.join("\n")
                    } else i = null !== (o = t.text) && void 0 !== o ? o : "";
                    return i
                },
                getVariable(e) {
                    const n = t.variables && t.variables[e];
                    return null != n ? n : e
                }
            })
        };
        if (null != t.text && !r) {
            const e = je(Se(o.children));
            if (e) {
                const n = Array.isArray(t.text) ? t.text.join("\n") : t.text;
                Ae(e, n), "a" === e.name && t.href && Ee(e, n)
            }
        }
        return o
    }

    function be(e, t) {
        let n = [];
        if (e.repeat) {
            const r = e.repeat,
                o = Object.assign({}, r);
            let i;
            o.count = o.implicit && Array.isArray(t.text) ? t.cleanText.length : o.count || 1, t.repeaters.push(o);
            for (let r = 0; r < o.count; r++) {
                if (o.value = r, e.repeat = o, i = $e(e) ? ye(e, t) : ve(e, t), o.implicit && !t.inserted) {
                    const e = Se(i),
                        n = e && je(e);
                    n && Ae(n, t.getText(o.value))
                }
                if (n = n.concat(i), --t.repeatGuard <= 0) break
            }
            t.repeaters.pop(), e.repeat = r, o.implicit && (t.inserted = !0)
        } else n = n.concat($e(e) ? ye(e, t) : ve(e, t));
        return n
    }

    function ve(e, t) {
        let n = [];
        const r = {
            type: "AbbreviationNode",
            name: e.name && ke(e.name, t),
            value: e.value && we(e.value, t),
            attributes: void 0,
            children: n,
            repeat: e.repeat && Object.assign({}, e.repeat),
            selfClosing: e.selfClose
        };
        let o = [r];
        for (const r of e.elements) n = n.concat(be(r, t));
        if (e.attributes) {
            r.attributes = [];
            for (const n of e.attributes) r.attributes.push(xe(n, t))
        }
        return r.name || r.attributes || !r.value || r.value.some(Ce) ? r.children = n : o = o.concat(n), o
    }

    function ye(e, t) {
        let n = [];
        for (const r of e.elements) n = n.concat(be(r, t));
        return e.repeat && (n = Te(n, e.repeat)), n
    }

    function xe(e, t) {
        let n, r = !1,
            o = !1,
            i = e.expression ? "expression" : "raw";
        const s = e.name && ke(e.name, t);
        if (s && "!" === s[0] && (r = !0), s && "." === s[s.length - 1] && (o = !0), e.value) {
            const r = e.value.slice();
            if (O(r[0])) {
                const e = r.shift();
                r.length && Se(r).type === e.type && r.pop(), i = e.single ? "singleQuote" : "doubleQuote"
            } else T(r[0], "expression", !0) && (i = "expression", r.shift(), T(Se(r), "expression", !1) && r.pop());
            n = we(r, t)
        }
        return {
            name: o || r ? s.slice(r ? 1 : 0, o ? -1 : void 0) : s,
            value: n,
            boolean: o,
            implied: r,
            valueType: i
        }
    }

    function ke(e, t) {
        let n = "";
        for (let r = 0; r < e.length; r++) n += he(e[r], t);
        return n
    }

    function we(e, t) {
        const n = [];
        let r = "";
        for (let o, i = 0; i < e.length; i++) o = e[i], Ce(o) ? (r && (n.push(r), r = ""), n.push(o)) : r += he(o, t);
        return r && n.push(r), n
    }

    function $e(e) {
        return "TokenGroup" === e.type
    }

    function Ce(e) {
        return "object" == typeof e && "Field" === e.type && null != e.index
    }

    function Se(e) {
        return e[e.length - 1]
    }

    function je(e) {
        return e.children.length ? je(Se(e.children)) : e
    }

    function Ae(e, t) {
        if (e.value) {
            "string" == typeof Se(e.value) ? e.value[e.value.length - 1] += t : e.value.push(t)
        } else e.value = [t]
    }

    function Ee(e, t) {
        var n;
        let r = "";
        lc.test(t) ? (r = t, /\w+:/.test(r) || r.startsWith("//") || (r = `http://${r}`)) : pc.test(t) && (r = `mailto:${t}`);
        const o = null === (n = e.attributes) || void 0 === n ? void 0 : n.find((e => "href" === e.name));
        o ? o.value || (o.value = [r]) : e.attributes = [{
            name: "href",
            value: [r],
            valueType: "doubleQuote"
        }]
    }

    function Te(e, t) {
        for (const n of e) n.repeat || (n.repeat = Object.assign({}, t));
        return e
    }

    function Ne(e, t) {
        try {
            return ge(g("string" == typeof e ? Z(e) : e, t), t)
        } catch (t) {
            throw t instanceof ac && "string" == typeof e && (t.message += `\n${e}\n${"-".repeat(t.pos)}^`), t
        }
    }

    function Oe(e, t) {
        let n, r = 0;
        const o = new sc(e),
            i = [];
        for (; !o.eof();) {
            if (n = Fe(o, 0 === r && !t), !n) throw o.error("Unexpected character");
            if ("Bracket" === n.type && (!r && n.open && Ke(o, i), r += n.open ? 1 : -1, r < 0)) throw o.error("Unexpected bracket", n.start);
            i.push(n), Je(n) && (n = Ue(o)) && i.push(n)
        }
        return i
    }

    function Fe(e, t) {
        return qe(e) || Pe(e) || We(e) || Ie(e) || Be(e) || Ue(e) || Re(e) || ze(e, t)
    }

    function qe(n) {
        const r = n.pos;
        if (n.eat(36) && n.eat(123)) {
            let o;
            n.start = n.pos;
            let i = "";
            if (n.eatWhile(e) ? (o = Number(n.current()), i = n.eat(58) ? Le(n) : "") : t(n.peek()) && (i = Le(n)), n.eat(125)) return {
                type: "Field",
                index: o,
                name: i,
                start: r,
                end: n.pos
            };
            throw n.error("Expecting }")
        }
        n.pos = r
    }

    function Le(e) {
        const t = [];
        for (e.start = e.pos; !e.eof();)
            if (e.eat(123)) t.push(e.pos);
            else if (e.eat(125)) {
            if (!t.length) {
                e.pos--;
                break
            }
            t.pop()
        } else e.pos++;
        if (t.length) throw e.pos = t.pop(), e.error("Expecting }");
        return e.current()
    }

    function ze(e, t) {
        const n = e.pos;
        if (e.eat(_e) ? e.eatWhile(n ? Xe : Ze) : e.eat(r) ? e.eatWhile(t ? Ze : Xe) : (e.eat(46), e.eatWhile(Ze)), n !== e.pos) return e.start = n, Me(e, e.start = n)
    }

    function Me(e, t = e.start, n = e.pos) {
        return {
            type: "Literal",
            value: e.substring(t, n),
            start: t,
            end: n
        }
    }

    function Pe(e) {
        const t = e.pos;
        if (De(e)) {
            e.start = t;
            const n = e.current();
            return e.start = e.pos, e.eat(37) || e.eatWhile(r), {
                type: "NumberValue",
                value: Number(n),
                rawValue: n,
                unit: e.current(),
                start: t,
                end: e.pos
            }
        }
    }

    function Ie(e) {
        const t = e.peek(),
            n = e.pos;
        let r = !1;
        if (a(t)) {
            for (e.pos++; !e.eof();) {
                if (e.eat(t)) {
                    r = !0;
                    break
                }
                e.pos++
            }
            return e.start = n, {
                type: "StringValue",
                value: e.substring(n + 1, e.pos - (r ? 1 : 0)),
                quote: 39 === t ? "single" : "double",
                start: n,
                end: e.pos
            }
        }
    }

    function We(e) {
        const t = e.pos;
        if (e.eat(35)) {
            const n = e.pos;
            let r = "",
                o = "";
            if (e.eatWhile(He) ? (r = e.substring(n, e.pos), o = Ve(e)) : e.eat(116) ? (r = "0", o = Ve(e) || "0") : o = Ve(e), r || o || e.eof()) {
                const {
                    r: n,
                    g: i,
                    b: s,
                    a: a
                } = Ye(r, o);
                return {
                    type: "ColorValue",
                    r: n,
                    g: i,
                    b: s,
                    a: a,
                    raw: e.substring(t + 1, e.pos),
                    start: t,
                    end: e.pos
                }
            }
            return Me(e, t)
        }
        e.pos = t
    }

    function Ve(t) {
        const n = t.pos;
        return t.eat(46) ? (t.start = n, t.eatWhile(e) ? t.current() : "1") : ""
    }

    function Re(e) {
        const t = e.pos;
        if (e.eatWhile(i)) return {
            type: "WhiteSpace",
            start: t,
            end: e.pos
        }
    }

    function Be(e) {
        const t = e.peek();
        if (Ge(t)) return {
            type: "Bracket",
            open: 40 === t,
            start: e.pos++,
            end: e.pos
        }
    }

    function Ue(e) {
        const t = Qe(e.peek());
        if (t) return {
            type: "Operator",
            operator: t,
            start: e.pos++,
            end: e.pos
        }
    }

    function De(t) {
        const n = t.pos;
        t.eat(45);
        const r = t.pos,
            o = t.eatWhile(e),
            i = t.pos;
        if (t.eat(46)) {
            const n = t.eatWhile(e);
            o || n || (t.pos = i)
        }
        return t.pos === r && (t.pos = n), t.pos !== n
    }

    function _e(e) {
        return 64 === e || 36 === e
    }

    function Qe(e) {
        return (43 === e ? "+" : 33 === e && "!") || 44 === e && "," || 58 === e && ":" || 45 === e && "-" || void 0
    }

    function He(n) {
        return e(n) || t(n, 65, 70)
    }

    function Xe(e) {
        return n(e) || 45 === e
    }

    function Ge(e) {
        return 40 === e || 41 === e
    }

    function Ze(e) {
        return r(e) || 37 === e || 47 === e
    }

    function Ye(e, t) {
        let n = "0",
            r = "0",
            o = "0",
            i = Number(null != t && "" !== t ? t : 1);
        if ("t" === e) i = 0;
        else switch (e.length) {
            case 0:
                break;
            case 1:
                n = r = o = e + e;
                break;
            case 2:
                n = r = o = e;
                break;
            case 3:
                n = e[0] + e[0], r = e[1] + e[1], o = e[2] + e[2];
                break;
            default:
                n = (e += e).slice(0, 2), r = e.slice(2, 4), o = e.slice(4, 6)
        }
        return {
            r: parseInt(n, 16),
            g: parseInt(r, 16),
            b: parseInt(o, 16),
            a: i
        }
    }

    function Je(e) {
        return "ColorValue" === e.type || "NumberValue" === e.type && !e.unit
    }

    function Ke(e, t) {
        let n = 0,
            r = 0;
        for (; t.length;) {
            const e = et(t);
            if ("Literal" !== e.type && "NumberValue" !== e.type) break;
            n = e.start, r || (r = e.end), t.pop()
        }
        n !== r && t.push(Me(e, n, r))
    }

    function et(e) {
        return e[e.length - 1]
    }

    function tt(e) {
        return {
            tokens: e,
            start: 0,
            pos: 0,
            size: e.length
        }
    }

    function nt(e) {
        return e.tokens[e.pos]
    }

    function rt(e) {
        return e.pos < e.size
    }

    function ot(e, t) {
        return !!t(nt(e)) && (e.pos++, !0)
    }

    function it(e, t, n = nt(e)) {
        n && null != n.start && (t += ` at ${n.start}`);
        const r = new Error(t);
        return r.pos = n && n.start, r
    }

    function st(e, t = {}) {
        const n = tt(e),
            r = [];
        let o;
        for (; rt(n);)
            if (o = at(n, t)) r.push(o);
            else if (!ot(n, gt)) throw it(n, "Unexpected token");
        return r
    }

    function at(e, t) {
        let n, r, o = !1;
        const i = [],
            s = nt(e),
            a = !!t.value;
        for (a || !lt(s) || wt(e) || (e.pos++, n = s.value, ot(e, kt)), a && ot(e, dt); rt(e);)
            if (ot(e, yt)) o = !0;
            else if (r = ut(e, a)) i.push(r);
        else if (!ot(e, vt)) break;
        if (n || i.length || o) return {
            name: n,
            value: i,
            important: o
        }
    }

    function ut(e, t) {
        const n = [];
        let r, o;
        for (; rt(e);)
            if (r = nt(e), xt(r)) e.pos++, lt(r) && (o = ct(e)) ? n.push({
                type: "FunctionCall",
                name: r.value,
                arguments: o
            }) : n.push(r);
            else {
                if (!(kt(r) || t && dt(r))) break;
                e.pos++
            }
        return n.length ? {
            type: "CSSValue",
            value: n
        } : void 0
    }

    function ct(e) {
        const t = e.pos;
        if (ot(e, ft)) {
            const n = [];
            let r;
            for (; rt(e) && !ot(e, mt);)
                if (r = ut(e, !0)) n.push(r);
                else if (!ot(e, dt) && !ot(e, bt)) throw it(e, "Unexpected token");
            return e.start = t, n
        }
    }

    function lt(e) {
        return e && "Literal" === e.type
    }

    function pt(e, t) {
        return e && "Bracket" === e.type && (null == t || e.open === t)
    }

    function ft(e) {
        return pt(e, !0)
    }

    function mt(e) {
        return pt(e, !1)
    }

    function dt(e) {
        return e && "WhiteSpace" === e.type
    }

    function ht(e, t) {
        return e && "Operator" === e.type && (!t || e.operator === t)
    }

    function gt(e) {
        return ht(e, "+")
    }

    function bt(e) {
        return ht(e, ",")
    }

    function vt(e) {
        return bt(e)
    }

    function yt(e) {
        return ht(e, "!")
    }

    function xt(e) {
        return "StringValue" === e.type || "ColorValue" === e.type || "NumberValue" === e.type || "Literal" === e.type || "Field" === e.type
    }

    function kt(e) {
        return ht(e, ":") || ht(e, "-")
    }

    function wt(e) {
        const t = e.tokens[e.pos],
            n = e.tokens[e.pos + 1];
        return t && n && lt(t) && "Bracket" === n.type
    }

    function $t(e, t) {
        try {
            return st("string" == typeof e ? Oe(e, t && t.value) : e, t)
        } catch (t) {
            throw t instanceof ac && "string" == typeof e && (t.message += `\n${e}\n${"-".repeat(t.pos)}^`), t
        }
    }

    function Ct(e, t) {
        return t || (t = e.getOption("emmet")), Object.assign(Object.assign({}, fc), t)
    }

    function St(e = {}) {
        return Object.assign(Object.assign({}, mc), e)
    }

    function jt(e) {
        return e.split("").map((e => e.charCodeAt(0)))
    }

    function At(e, t) {
        const n = e.pos;
        for (let r = 0; r < t.length; r++)
            if (!e.eat(t[r])) return e.pos = n, !1;
        return e.start = n, !0
    }

    function Et(e, t, n, r) {
        const o = e.pos;
        if (At(e, t)) {
            for (; !e.eof();) {
                if (At(e, n)) return e.start = o, !0;
                e.pos++
            }
            return r ? (e.start = o, !0) : (e.pos = o, !1)
        }
        return e.pos = o, !1
    }

    function Tt(e) {
        return t(e) || 58 === e || 95 === e || e >= 192 && e <= 214 || e >= 216 && e <= 246 || e >= 248 && e <= 767 || e >= 880 && e <= 893 || e >= 895 && e <= 8191
    }

    function Nt(t) {
        return Tt(t) || 45 === t || 46 === t || e(t) || 183 === t || t >= 768 && t <= 879
    }

    function Ot(e) {
        const t = e.pos;
        return !!e.eat(Tt) && (e.eatWhile(Nt), e.start = t, !0)
    }

    function Ft(e) {
        return 62 === e || 47 === e
    }

    function qt(e) {
        return !(isNaN(e) || a(e) || i(e) || Ft(e))
    }

    function Lt(e) {
        return u(e, 60, 62, dc) || u(e, 40, 41, dc) || u(e, 91, 93, dc) || u(e, 123, 125, dc)
    }

    function zt(e) {
        return a(e.charCodeAt(0)) && (e = e.slice(1)), a(e.charCodeAt(e.length - 1)) && (e = e.slice(0, -1)), e
    }

    function Mt(e, t) {
        const n = [];
        let r = 0,
            o = e.length;
        t && (r = t.length + 1, o -= "/>" === e.slice(-2) ? 2 : 1);
        const s = new sc(e, r, o);
        for (; !s.eof();)
            if (s.eatWhile(i), Pt(s)) {
                const e = {
                    name: s.current(),
                    nameStart: s.start,
                    nameEnd: s.pos
                };
                s.eat(61) && It(s) && (e.value = s.current(), e.valueStart = s.start, e.valueEnd = s.pos), n.push(e)
            } else s.pos++;
        return n
    }

    function Pt(e) {
        const t = e.pos;
        return e.eat(42) || e.eat(35) ? (Ot(e), e.start = t, !0) : Lt(e) || Ot(e)
    }

    function It(e) {
        return s(e, dc) || Lt(e) || Vt(e)
    }

    function Wt(e, t) {
        for (let n = 0; n < e.length; n++) {
            const r = e[n];
            if (r.name === t) return r.value && zt(r.value)
        }
    }

    function Vt(e) {
        const t = e.pos;
        if (e.eatWhile(qt)) return e.start = t, !0
    }

    function Rt(e, t, n) {
        const r = new sc(e),
            o = n ? n.special : null,
            s = !!n && n.allTokens;
        let a, u, c, l, p, f = !1,
            m = null;
        for (; !r.eof();) {
            const n = r.pos;
            if (Dt(r)) {
                if (s && !1 === t("#cdata", 4, r.start, r.pos)) break
            } else if (_t(r)) {
                if (s && !1 === t("#comment", 6, r.start, r.pos)) break
            } else if (Ht(r)) {
                if (s && !1 === t("#erb", 7, r.start, r.pos)) break
            } else if (m = Qt(r)) {
                if (s && !1 === t(m, 5, r.start, r.pos)) break
            } else if (r.eat(60)) {
                if (a = r.eat(47) ? 2 : 1, c = r.pos, Ot(r) && (l = r.pos, 2 !== a && (Bt(r), r.eatWhile(i), r.eat(47) && (a = 3)), r.eat(62))) {
                    if (u = r.substring(c, l), !1 === t(u, a, n, r.pos)) break;
                    if (1 === a && o && Xt(o, u, e, n, r.pos)) {
                        for (p = jt(u), f = !1; !r.eof();) {
                            if (Ut(r, p)) {
                                f = !0;
                                break
                            }
                            r.pos++
                        }
                        if (f && !1 === t(u, 2, r.start, r.pos)) break
                    }
                }
            } else r.pos++
        }
    }

    function Bt(e) {
        for (; !e.eof();)
            if (e.eatWhile(i), Pt(e)) e.eat(61) && It(e);
            else {
                if (Ft(e.peek())) break;
                e.pos++
            }
    }

    function Ut(e, t) {
        const n = e.pos;
        return e.eat(60) && e.eat(47) && At(e, t) && e.eat(62) ? (e.start = n, !0) : (e.pos = n, !1)
    }

    function Dt(e) {
        return Et(e, hc, gc, !0)
    }

    function _t(e) {
        return Et(e, bc, vc, !0)
    }

    function Qt(e) {
        const t = e.pos;
        if (At(e, yc) && Ot(e)) {
            const n = e.current();
            for (; !e.eof() && !At(e, xc);) s(e) || e.pos++;
            return e.start = t, n
        }
        return e.pos = t, null
    }

    function Ht(e) {
        const t = e.pos;
        if (At(e, kc)) {
            for (; !e.eof() && !At(e, wc);) s(e) || e.pos++;
            return e.start = t, !0
        }
        return e.pos = t, !1
    }

    function Xt(e, t, n, r, o) {
        if (t in e) {
            const i = e[t];
            if (!Array.isArray(i)) return !0;
            const s = Mt(n.substring(r + t.length + 1, o - 1));
            return i.includes(Wt(s, "type") || "")
        }
        return !1
    }

    function Gt(e, t, n) {
        const r = [],
            o = [],
            i = St(n);
        let s = null;
        return Rt(e, ((n, a, u, c) => {
            if (1 === a && tn(n, i) && (a = 3), 1 === a) o.push(Jt(r, n, u, c));
            else if (3 === a) {
                if (u < t && t < c) return s = {
                    name: n,
                    attributes: en(e, u, c, n),
                    open: [u, c]
                }, !1
            } else {
                const i = nn(o);
                if (i && i.name === n) {
                    if (i.start < t && t < c) return s = {
                        name: n,
                        attributes: en(e, i.start, i.end, n),
                        open: [i.start, i.end],
                        close: [u, c]
                    }, !1;
                    o.length && Kt(r, o.pop())
                }
            }
        }), i), o.length = r.length = 0, s
    }

    function Zt(e, t, n) {
        const r = [],
            o = [],
            i = St(n),
            s = [];
        return Rt(e, ((e, n, a, u) => {
            if (2 === n) {
                const n = nn(o);
                n && n.name === e && (n.start < t && t < u && s.push({
                    name: e,
                    open: [n.start, n.end],
                    close: [a, u]
                }), Kt(r, o.pop()))
            } else 3 === n || tn(e, i) ? a < t && t < u && s.push({
                name: e,
                open: [a, u]
            }) : o.push(Jt(r, e, a, u))
        }), i), o.length = r.length = 0, s
    }

    function Yt(e, t, n) {
        const r = [],
            o = [],
            i = St(n),
            s = [],
            a = (e, t, n) => {
                if (r.length) {
                    const o = r.pop();
                    return o.name = e, o.ranges.push(t, n), o
                }
                return {
                    name: e,
                    ranges: [t, n]
                }
            },
            u = e => {
                e.ranges.length = 0, e.firstChild = void 0, r.push(e)
            };
        return Rt(e, ((e, n, r, c) => {
            if (2 === n) {
                if (!o.length) return;
                let n = nn(o);
                if (n.name === e) {
                    if (n.ranges[0] <= t && t <= c) {
                        for (s.push({
                                name: e,
                                open: n.ranges.slice(0, 2),
                                close: [r, c]
                            }); n.firstChild;) {
                            const e = n.firstChild,
                                t = {
                                    name: e.name,
                                    open: e.ranges.slice(0, 2)
                                };
                            e.ranges.length > 2 && (t.close = e.ranges.slice(2, 4)), s.push(t), u(n), n = e
                        }
                        return !1
                    } {
                        o.pop();
                        const e = nn(o);
                        e && !e.firstChild ? (n.ranges.push(r, c), e.firstChild = n) : u(n)
                    }
                }
            } else if (3 === n || tn(e, i)) {
                if (r < t && t < c) return s.push({
                    name: e,
                    open: [r, c]
                }), !1;
                const n = nn(o);
                n && !n.firstChild && (n.firstChild = a(e, r, c))
            } else o.push(a(e, r, c))
        }), i), o.length = r.length = 0, s
    }

    function Jt(e, t, n, r) {
        if (e.length) {
            const o = e.pop();
            return o.name = t, o.start = n, o.end = r, o
        }
        return {
            name: t,
            start: n,
            end: r
        }
    }

    function Kt(e, t) {
        e.push(t)
    }

    function en(e, t, n, r) {
        const o = Mt(e.slice(t, n), r);
        return o.forEach((e => {
            e.nameStart += t, e.nameEnd += t, null != e.value && (e.valueStart += t, e.valueEnd += t)
        })), o
    }

    function tn(e, t) {
        return !t.xml && t.empty.includes(e)
    }

    function nn(e) {
        return e.length ? e[e.length - 1] : null
    }

    function rn(e, t) {
        const n = new sc(e),
            r = {
                start: -1,
                end: -1,
                propertyStart: -1,
                propertyEnd: -1,
                propertyDelimiter: -1,
                expression: 0
            };
        let o;
        const i = (e, o = n.start, i = r.start, s = r.end) => !1 === t(e, i, s, o);
        for (; !n.eof();)
            if (!sn(n) && !on(n))
                if (n.start = n.pos, (o = n.eat(125)) || n.eat(59)) {
                    if (-1 !== r.propertyStart) {
                        if (i("propertyName", r.propertyDelimiter, r.propertyStart, r.propertyEnd)) return;
                        if (-1 === r.start && (r.start = r.end = n.start), i("propertyValue")) return
                    } else if (-1 !== r.start && i("propertyName")) return;
                    if (o && (r.start = n.start, r.end = n.pos, i("blockEnd"))) return;
                    un(r)
                } else if (n.eat(123)) {
            if (-1 === r.start && -1 === r.propertyStart && (r.start = r.end = n.pos), -1 !== r.propertyStart && (r.start = r.propertyStart), i("selector")) return;
            un(r)
        } else n.eat(58) && !cn(n, r) ? (-1 === r.propertyStart && (r.propertyStart = r.start), r.propertyEnd = r.end, r.propertyDelimiter = n.pos - 1, r.start = r.end = -1) : (-1 === r.start && (r.start = n.pos), n.eat(40) ? r.expression++ : n.eat(41) ? r.expression-- : an(n) || n.pos++, r.end = n.pos); - 1 !== r.propertyStart && i("propertyName", r.propertyDelimiter, r.propertyStart, r.propertyEnd) || -1 !== r.start && i(-1 !== r.propertyStart ? "propertyValue" : "propertyName", -1)
    }

    function on(e) {
        return e.eatWhile(i)
    }

    function sn(e) {
        const t = e.pos;
        if (e.eat(47) && e.eat(42)) {
            for (e.start = t; !e.eof();)
                if (e.eat(42)) {
                    if (e.eat(47)) return !0
                } else e.pos++;
            return !0
        }
        return e.pos = t, !1
    }

    function an(e) {
        const t = e.peek();
        if (a(t)) {
            for (e.start = e.pos++; !e.eof() && !(e.eat(t) || e.eat(10) || e.eat(13));) e.eat(92), e.pos++;
            return !0
        }
    }

    function un(e) {
        e.start = e.end = e.propertyStart = e.propertyEnd = e.propertyDelimiter = -1
    }

    function cn(e, t) {
        return t.expression || e.eatWhile(58)
    }

    function ln(e, t = 0) {
        let n = -1,
            r = 0,
            o = 0;
        const s = [],
            a = new sc(e);
        for (; !a.eof();) o = a.pos, a.eat(i) || a.eat(pn) || fn(a) ? (r || -1 === n || (s.push([t + n, t + o]), n = -1), a.eatWhile(i)) : (-1 === n && (n = a.pos), a.eat(40) ? r++ : a.eat(41) ? r-- : an(a) || a.pos++);
        return -1 !== n && n !== a.pos && s.push([t + n, t + a.pos]), s
    }

    function pn(e) {
        return $c.includes(e)
    }

    function fn(e) {
        const t = e.pos;
        return !(!e.eat(45) || !e.eat(i)) || (e.pos = t, !1)
    }

    function mn(e, t) {
        const n = [],
            r = [];
        let o = null,
            i = null;
        const s = () => {
            i && (vn(n, i), i = null)
        };
        return rn(e, ((e, a, u, c) => {
            if ("selector" === e) s(), r.push(bn(n, a, u, c));
            else if ("blockEnd" === e) {
                s();
                const e = r.pop();
                if (e && e[0] < t && t < u) return o = {
                    type: "selector",
                    start: e[0],
                    end: u,
                    bodyStart: e[2] + 1,
                    bodyEnd: a
                }, !1
            } else if ("propertyName" === e) s(), i = bn(n, a, u, c);
            else if ("propertyValue" === e) {
                if (i && i[0] < t && t < u) return o = {
                    type: "property",
                    start: i[0],
                    end: c + 1,
                    bodyStart: a,
                    bodyEnd: u
                }, !1;
                s()
            }
        })), o
    }

    function dn(e, t) {
        const n = [],
            r = [],
            o = [];
        let i = null;
        return rn(e, ((s, a, u, c) => {
            if ("selector" === s) r.push(bn(n, a, u, c));
            else if ("blockEnd" === s) {
                const i = r.pop();
                if (i && i[0] < t && u > t) {
                    const t = gn(e, i[2] + 1, a);
                    t && yn(o, t), yn(o, [i[0], u])
                }
                if (i && vn(n, i), !r.length) return !1
            } else "propertyName" === s ? (i && vn(n, i), i = bn(n, a, u, c)) : "propertyValue" === s && i && i[0] < t && Math.max(c, u) > t && (yn(o, [a, u]), yn(o, [i[0], -1 !== c ? c + 1 : u]));
            "propertyName" !== s && i && (vn(n, i), i = null)
        })), o
    }

    function hn(e, t) {
        const n = [],
            r = [],
            o = [];
        let i = null;
        const s = (e, t, r) => {
                if (n.length) {
                    const o = n.pop();
                    return o.start = e, o.end = t, o.delimiter = r, o
                }
                return {
                    start: e,
                    end: t,
                    delimiter: r,
                    firstChild: null
                }
            },
            a = e => {
                e.firstChild = null, n.push(e)
            },
            u = () => {
                i && (a(i), i = null)
            },
            c = (e, t, n) => {
                const o = xn(r);
                o && !o.firstChild && (o.firstChild = s(e, t, n))
            };
        return rn(e, ((n, l, p, f) => {
            if ("blockEnd" === n) {
                u();
                let n = r.pop();
                if (!n) return;
                if (n.start <= t && t <= p) {
                    let t = gn(e, n.delimiter + 1, l);
                    for (yn(o, [n.start, p]), t && yn(o, t); n.firstChild;) {
                        const r = n.firstChild;
                        t = gn(e, r.delimiter + 1, r.end - 1), yn(o, [r.start, r.end]), t && yn(o, t), n = r
                    }
                    return !1
                } {
                    const e = xn(r);
                    e && !e.firstChild ? (n.end = p, e.firstChild = n) : a(n)
                }
            } else if ("propertyName" === n) u(), i = s(l, p, f), c(l, p, f);
            else if ("propertyValue" === n) {
                if (i) {
                    if (i.start <= t && p >= t) return yn(o, [i.start, f + 1]), yn(o, [l, p]), u(), !1;
                    const e = xn(r);
                    e && e.firstChild && e.firstChild.start === i.start && (e.firstChild.end = -1 !== f ? f + 1 : p), u()
                }
            } else r.push(s(l, p, f)), u()
        })), r.length = n.length = 0, o
    }

    function gn(e, t, n) {
        for (; t < n && i(e.charCodeAt(t));) t++;
        for (; n > t && i(e.charCodeAt(n - 1));) n--;
        return t !== n ? [t, n] : null
    }

    function bn(e, t, n, r) {
        if (e.length) {
            const o = e.pop();
            return o[0] = t, o[1] = n, o[2] = r, o
        }
        return [t, n, r]
    }

    function vn(e, t) {
        return t && e.push(t), null
    }

    function yn(e, t) {
        const n = e.length ? e[e.length - 1] : null;
        n && n[0] === t[0] && n[1] === t[1] || t[0] === t[1] || e.push(t)
    }

    function xn(e) {
        return e.length ? e[e.length - 1] : null
    }

    function kn(e, t) {
        if (!e.attributes) return;
        const n = [],
            r = {};
        for (const o of e.attributes)
            if (o.name) {
                const e = o.name;
                if (e in r) {
                    const n = r[e];
                    "class" === e ? n.value = wn(n.value, o.value, " ") : $n(n, o, t)
                } else n.push(r[e] = Object.assign({}, o))
            } else n.push(o);
        e.attributes = n
    }

    function wn(e, t, n) {
        if (e && t) {
            e.length && n && Cn(e, n);
            for (const n of t) Cn(e, n);
            return e
        }
        const r = e || t;
        return r && r.slice()
    }

    function $n(e, t, n) {
        return e.name = t.name, n.options["output.reverseAttributes"] || (e.value = t.value), e.implied || (e.implied = t.implied), e.boolean || (e.boolean = t.boolean), "expression" !== e.valueType && (e.valueType = t.valueType), e
    }

    function Cn(e, t) {
        const n = e.length - 1;
        "string" == typeof e[n] && "string" == typeof t ? e[n] += t : e.push(t)
    }

    function Sn(e, t, n) {
        const r = [e],
            o = e => {
                t(e, r, n), r.push(e), e.children.forEach(o), r.pop()
            };
        e.children.forEach(o)
    }

    function jn(e) {
        let t;
        for (; e.children.length;) t = e, e = e.children[e.children.length - 1];
        return {
            parent: t,
            node: e
        }
    }

    function An(e) {
        return "AbbreviationNode" === e.type
    }

    function En(e, t) {
        const n = [],
            r = t.options["output.reverseAttributes"],
            o = e => {
                const i = e.name && t.snippets[e.name];
                if (!i || n.includes(i)) return null;
                const s = Ne(i, t);
                n.push(i), Tn(s, o), n.pop();
                for (const t of s.children) {
                    if (e.attributes) {
                        const n = t.attributes || [],
                            o = e.attributes || [];
                        t.attributes = r ? o.concat(n) : n.concat(o)
                    }
                    Nn(e, t)
                }
                return s
            };
        return Tn(e, o), e
    }

    function Tn(e, t) {
        let n = [];
        for (const r of e.children) {
            const e = t(r);
            if (e) {
                n = n.concat(e.children);
                const o = jn(e);
                An(o.node) && (o.node.children = o.node.children.concat(Tn(r, t)))
            } else n.push(r), r.children = Tn(r, t)
        }
        return e.children = n
    }

    function Nn(e, t) {
        e.selfClosing && (t.selfClosing = !0), null != e.value && (t.value = e.value), e.repeat && (t.repeat = e.repeat)
    }

    function On(e, t = 0) {
        return {
            options: e,
            value: "",
            level: t,
            offset: 0,
            line: 0,
            column: 0
        }
    }

    function Fn(e, t) {
        Dn(e, (0, e.options["output.text"])(t, e.offset, e.line, e.column))
    }

    function qn(e, t) {
        const n = Un(t);
        for (let t = 0, r = n.length - 1; t <= r; t++) Fn(e, n[t]), t !== r && Ln(e, !0)
    }

    function Ln(e, t) {
        const n = e.options["output.baseIndent"];
        Fn(e, e.options["output.newline"] + n), e.line++, e.column = n.length, t && zn(e, !0 === t ? e.level : t)
    }

    function zn(e, t = e.level) {
        Fn(e, e.options["output.indent"].repeat(Math.max(t, 0)))
    }

    function Mn(e, t, n) {
        Dn(e, (0, e.options["output.field"])(t, n, e.offset, e.line, e.column))
    }

    function Pn(e, t) {
        return _n(e, t.options["output.tagCase"])
    }

    function In(e, t) {
        return _n(e, t.options["output.attributeCase"])
    }

    function Wn(e, t, n) {
        return "expression" === e.valueType ? n ? "{" : "}" : "single" === t.options["output.attributeQuotes"] ? "'" : '"'
    }

    function Vn(e, t) {
        return e.boolean || t.options["output.booleanAttributes"].includes((e.name || "").toLowerCase())
    }

    function Rn(e) {
        switch (e.options["output.selfClosingStyle"]) {
            case "xhtml":
                return " /";
            case "xml":
                return "/";
            default:
                return ""
        }
    }

    function Bn(e, t) {
        return "string" == typeof e ? t.options.inlineElements.includes(e.toLowerCase()) : e.name ? Bn(e.name, t) : Boolean(e.value && !e.attributes)
    }

    function Un(e) {
        return e.split(/\r\n|\r|\n/g)
    }

    function Dn(e, t) {
        e.value += t, e.offset += t.length, e.column += t.length
    }

    function _n(e, t) {
        return t ? "upper" === t ? e.toUpperCase() : e.toLowerCase() : e
    }

    function Qn(e, t, n) {
        !e.name && e.attributes && Hn(e, t, n)
    }

    function Hn(e, t, n) {
        const r = Gn(t),
            o = n.context ? n.context.name : "",
            i = Xn(r ? r.name : o);
        e.name = Cc[i] || (Bn(i, n) ? "span" : "div")
    }

    function Xn(e) {
        return (e || "").toLowerCase()
    }

    function Gn(e) {
        for (let t = e.length - 1; t >= 0; t--) {
            const n = e[t];
            if (An(n)) return n
        }
    }

    function Zn(e, t, n) {
        let r;
        if (e.name && (r = e.name.match(jc))) {
            const o = Sc[r[1]] || Sc.latin,
                i = r[2] ? Math.max(1, Number(r[2])) : 30,
                s = Yn(i, r[3] ? Math.max(i, Number(r[3].slice(1))) : i),
                a = e.repeat || or(t);
            e.name = e.attributes = void 0, e.value = [rr(o, s, !a || 0 === a.value)], e.repeat && t.length > 1 && Hn(e, t, n)
        }
    }

    function Yn(e, t) {
        return Math.floor(Math.random() * (t - e) + e)
    }

    function Jn(e, t) {
        const n = e.length,
            r = Math.min(n, t),
            o = [];
        for (; o.length < r;) {
            const t = e[Yn(0, n)];
            o.includes(t) || o.push(t)
        }
        return o
    }

    function Kn(e) {
        return e[Yn(0, e.length - 1)]
    }

    function er(e, t) {
        return e.length && (e = [tr(e[0])].concat(e.slice(1))), e.join(" ") + (t || Kn("?!..."))
    }

    function tr(e) {
        return e[0].toUpperCase() + e.slice(1)
    }

    function nr(e) {
        if (e.length < 2) return e;
        const t = (e = e.slice()).length,
            n = /,$/;
        let r = 0;
        r = t > 3 && t <= 6 ? Yn(0, 1) : t > 6 && t <= 12 ? Yn(0, 2) : Yn(1, 4);
        for (let o, i = 0; i < r; i++) o = Yn(0, t - 2), n.test(e[o]) || (e[o] += ",");
        return e
    }

    function rr(e, t, n) {
        const r = [];
        let o, i = 0;
        for (n && e.common && (o = e.common.slice(0, t), i += o.length, r.push(er(nr(o), "."))); i < t;) o = Jn(e.words, Math.min(Yn(2, 30), t - i)), i += o.length, r.push(er(nr(o)));
        return r.join(" ")
    }

    function or(e) {
        for (let t = e.length - 1; t >= 0; t--) {
            const n = e[t];
            if ("AbbreviationNode" === n.type && n.repeat) return n.repeat
        }
    }

    function ir(e) {
        e.attributes && e.attributes.forEach(sr)
    }

    function sr(e) {
        "class" === e.name ? e.name = "className" : "for" === e.name && (e.name = "htmlFor")
    }

    function ar(e) {
        cr(e.name) && e.attributes && (e.children.length || e.value) && (e.attributes = e.attributes.filter(ur))
    }

    function ur(e) {
        return "select" !== e.name
    }

    function cr(e) {
        return "xsl:variable" === e || "xsl:with-param" === e
    }

    function lr(e, t, n) {
        pr(e), fr(e, t, n)
    }

    function pr(e) {
        const t = mr(e),
            n = [];
        for (const e of t.classNames) {
            const t = e.indexOf("_");
            t > 0 && !e.startsWith("-") ? (n.push(e.slice(0, t)), n.push(e.slice(t))) : n.push(e)
        }
        n.length && (t.classNames = n.filter(kr), t.block = br(t.classNames), yr(e, t.classNames.join(" ")))
    }

    function fr(e, t, n) {
        const r = mr(e),
            o = [],
            {
                options: i
            } = n,
            s = t.slice(1).concat(e);
        for (let e of r.classNames) {
            let t, r = "";
            const a = e;
            (t = e.match(Ac)) && (r = gr(s, t[1].length, n.context) + i["bem.element"] + t[2], o.push(r), e = e.slice(t[0].length)), (t = e.match(Ec)) && (r || (r = gr(s, t[1].length), o.push(r)), o.push(`${r}${i["bem.modifier"]}${t[2]}`), e = e.slice(t[0].length)), e === a && o.push(a)
        }
        const a = o.filter(kr);
        a.length && yr(e, a.join(" "))
    }

    function mr(e) {
        if (!e._bem) {
            let t = "";
            if (e.attributes)
                for (const n of e.attributes)
                    if ("class" === n.name && n.value) {
                        t = xr(n.value);
                        break
                    }
            e._bem = hr(t)
        }
        return e._bem
    }

    function dr(e) {
        return e._bem || (e._bem = hr(e.attributes && e.attributes.class || "")), e._bem
    }

    function hr(e) {
        const t = e ? e.split(/\s+/) : [];
        return {
            classNames: t,
            block: br(t)
        }
    }

    function gr(e, t = 0, n) {
        const r = 0;
        let o = Math.max(e.length - t, r);
        do {
            const t = e[o];
            if (t) {
                const e = mr(t);
                if (e.block) return e.block
            }
        } while (r < o--);
        if (n) {
            const e = dr(n);
            if (e.block) return e.block
        }
        return ""
    }

    function br(e) {
        return vr(e, Tc) || vr(e, Nc) || void 0
    }

    function vr(e, t) {
        for (const n of e) {
            if (Ac.test(n) || Ec.test(n)) break;
            if (t(n)) return n
        }
    }

    function yr(e, t) {
        for (const n of e.attributes)
            if ("class" === n.name) {
                n.value = [t];
                break
            }
    }

    function xr(e) {
        let t = "";
        for (const n of e) t += "string" == typeof n ? n : n.name;
        return t
    }

    function kr(e, t, n) {
        return !!e && n.indexOf(e) === t
    }

    function wr(e, t, n) {
        const r = (e, r, i) => {
                const {
                    parent: s,
                    current: a
                } = n;
                n.parent = a, n.current = e, t(e, r, i, n, o), n.current = a, n.parent = s
            },
            o = (e, t, o) => {
                n.ancestors.push(n.current), r(e, t, o), n.ancestors.pop()
            };
        e.children.forEach(r)
    }

    function $r(e) {
        return {
            current: null,
            parent: void 0,
            ancestors: [],
            config: e,
            field: 1,
            out: On(e.options)
        }
    }

    function Cr(e) {
        return !!e && (!e.name && !e.attributes)
    }

    function Sr(e, t) {
        return !!e && Bn(e, t)
    }

    function jr(e) {
        return "object" == typeof e && "Field" === e.type
    }

    function Ar(e, t) {
        const {
            out: n
        } = t;
        let r = -1;
        for (const o of e) "string" == typeof o ? qn(n, o) : (Mn(n, t.field + o.index, o.name), o.index > r && (r = o.index)); - 1 !== r && (t.field += r + 1)
    }

    function Er(e) {
        const t = [];
        let n = [];
        for (const r of e)
            if ("string" == typeof r) {
                const e = r.split(/\r\n?|\n/g);
                for (n.push(e.shift() || ""); e.length;) t.push(n), n = [e.shift() || ""]
            } else n.push(r);
        return n.length && t.push(n), t
    }

    function Tr(e) {
        return !e.implied || "raw" !== e.valueType || !!e.value && e.value.length > 0
    }

    function Nr(e) {
        const t = [],
            n = {
                pos: 0,
                text: e
            };
        let r, o = n.pos,
            i = n.pos;
        for (; n.pos < n.text.length;) i = n.pos, (r = Or(n)) ? (o !== n.pos && t.push(e.slice(o, i)), t.push(r), o = n.pos) : n.pos++;
        return o !== n.pos && t.push(e.slice(o)), t
    }

    function Or(e) {
        if (91 === Fr(e)) {
            const t = ++e.pos;
            let n = t,
                r = t,
                o = 1;
            for (; e.pos < e.text.length;) {
                const i = Fr(e);
                if (qr(i)) {
                    for (n = e.pos; Lr(Fr(e));) e.pos++;
                    r = e.pos
                } else {
                    if (91 === i) o++;
                    else if (93 === i && 0 == --o) return {
                        before: e.text.slice(t, n),
                        after: e.text.slice(r, e.pos++),
                        name: e.text.slice(n, r)
                    };
                    e.pos++
                }
            }
        }
    }

    function Fr(e, t = e.pos) {
        return e.text.charCodeAt(t)
    }

    function qr(e) {
        return e >= 65 && e <= 90
    }

    function Lr(e) {
        return qr(e) || e > 47 && e < 58 || 95 === e || 45 === e
    }

    function zr(e) {
        const {
            options: t
        } = e;
        return {
            enabled: t["comment.enabled"],
            trigger: t["comment.trigger"],
            before: t["comment.before"] ? Nr(t["comment.before"]) : void 0,
            after: t["comment.after"] ? Nr(t["comment.after"]) : void 0
        }
    }

    function Mr(e, t) {
        Ir(e, t) && t.comment.before && Wr(e, t.comment.before, t)
    }

    function Pr(e, t) {
        Ir(e, t) && t.comment.after && Wr(e, t.comment.after, t)
    }

    function Ir(e, t) {
        const {
            comment: n
        } = t;
        if (!(n.enabled && n.trigger && e.name && e.attributes)) return !1;
        for (const t of e.attributes)
            if (t.name && n.trigger.includes(t.name)) return !0;
        return !1
    }

    function Wr(e, t, n) {
        const r = {},
            {
                out: o
            } = n;
        for (const t of e.attributes) t.name && t.value && (r[t.name.toUpperCase()] = t.value);
        for (const e of t) "string" == typeof e ? qn(o, e) : r[e.name] && (qn(o, e.before), Ar(r[e.name], n), qn(o, e.after))
    }

    function Vr(e, t) {
        const n = $r(t);
        return n.comment = zr(t), wr(e, Rr, n), n.out.value
    }

    function Rr(e, t, n, r, o) {
        const {
            out: i,
            config: s
        } = r, a = Dr(e, t, n, r), u = _r(r);
        if (i.level += u, a && Ln(i, !0), e.name) {
            const t = Pn(e.name, s);
            if (Mr(e, r), qn(i, `<${t}`), e.attributes)
                for (const t of e.attributes) Tr(t) && Br(t, r);
            if (!e.selfClosing || e.children.length || e.value) {
                if (qn(i, ">"), !Ur(e, r, o)) {
                    if (e.value) {
                        const t = e.value.some(Qr) || Hr(e.value, s);
                        t && Ln(r.out, ++i.level), Ar(e.value, r), t && Ln(r.out, --i.level)
                    }
                    if (e.children.forEach(o), !e.value && !e.children.length) {
                        const t = s.options["output.formatLeafNode"] || s.options["output.formatForce"].includes(e.name);
                        t && Ln(r.out, ++i.level), Ar(Oc, r), t && Ln(r.out, --i.level)
                    }
                }
                qn(i, `</${t}>`), Pr(e, r)
            } else qn(i, `${Rn(s)}>`)
        } else !Ur(e, r, o) && e.value && (Ar(e.value, r), e.children.forEach(o));
        if (a && t === n.length - 1 && r.parent) {
            const e = Cr(r.parent) ? 0 : 1;
            Ln(i, i.level - e)
        }
        i.level -= u
    }

    function Br(e, t) {
        const {
            out: n,
            config: r
        } = t;
        if (e.name) {
            const o = In(e.name, r),
                i = Wn(e, r, !0),
                s = Wn(e, r);
            let a = e.value;
            Vn(e, r) && !a ? r.options["output.compactBoolean"] || (a = [o]) : a || (a = Oc), qn(n, " " + o), a ? (qn(n, "=" + i), Ar(a, t), qn(n, s)) : "html" !== r.options["output.selfClosingStyle"] && qn(n, "=" + i + s)
        }
    }

    function Ur(e, t, n) {
        if (e.value && e.children.length) {
            const r = e.value.findIndex(jr);
            if (-1 !== r) {
                Ar(e.value.slice(0, r), t);
                const o = t.out.line;
                let i = r + 1;
                return e.children.forEach(n), t.out.line !== o && "string" == typeof e.value[i] && qn(t.out, e.value[i++].trimLeft()), Ar(e.value.slice(i), t), !0
            }
        }
        return !1
    }

    function Dr(e, t, n, r) {
        const {
            config: o,
            parent: i
        } = r;
        if (!o.options["output.format"]) return !1;
        if (0 === t && !i) return !1;
        if (i && Cr(i) && 1 === n.length) return !1;
        if (Cr(e)) {
            if (Cr(n[t - 1]) || Cr(n[t + 1]) || e.value.some(Qr) || e.value.some(jr) && e.children.length) return !0
        }
        if (Bn(e, o)) {
            if (0 === t) {
                for (let e = 0; e < n.length; e++)
                    if (!Bn(n[e], o)) return !0
            } else if (!Bn(n[t - 1], o)) return !0;
            if (o.options["output.inlineBreak"]) {
                let e = 1,
                    r = t,
                    i = t;
                for (; Sr(n[--r], o);) e++;
                for (; Sr(n[++i], o);) e++;
                if (e >= o.options["output.inlineBreak"]) return !0
            }
            for (let t = 0, n = e.children.length; t < n; t++)
                if (Dr(e.children[t], t, e.children, r)) return !0;
            return !1
        }
        return !0
    }

    function _r(e) {
        const {
            config: t,
            parent: n
        } = e;
        return !n || Cr(n) || n.name && t.options["output.formatSkip"].includes(n.name) ? 0 : 1
    }

    function Qr(e) {
        return "string" == typeof e && /\r|\n/.test(e)
    }

    function Hr(e, t) {
        if (e.length && "string" == typeof e[0]) {
            const n = Fc.exec(e[0]);
            if ((null == n ? void 0 : n.length) && !t.options.inlineElements.includes(n[1].toLowerCase())) return !0
        }
        return !1
    }

    function Xr(e, t, n) {
        const r = $r(t);
        return r.options = n || {}, wr(e, Gr, r), r.out.value
    }

    function Gr(e, t, n, r, o) {
        const {
            out: i,
            options: s
        } = r, {
            primary: a,
            secondary: u
        } = Zr(e), c = r.parent ? 1 : 0;
        i.level += c, no(e, t, n, r) && Ln(i, !0), !e.name || "div" === e.name && a.length || qn(i, (s.beforeName || "") + e.name + (s.afterName || "")), Yr(a, r), Jr(u.filter(Tr), r), !e.selfClosing || e.value || e.children.length ? (Kr(e, r), e.children.forEach(o)) : r.options.selfClose && qn(i, r.options.selfClose), i.level -= c
    }

    function Zr(e) {
        const t = [],
            n = [];
        if (e.attributes)
            for (const r of e.attributes) eo(r) ? t.push(r) : n.push(r);
        return {
            primary: t,
            secondary: n
        }
    }

    function Yr(e, t) {
        for (const n of e)
            if (n.value)
                if ("class" === n.name) {
                    qn(t.out, ".");
                    Ar(n.value.map((e => "string" == typeof e ? e.replace(/\s+/g, ".") : e)), t)
                } else qn(t.out, "#"), Ar(n.value, t)
    }

    function Jr(e, t) {
        if (e.length) {
            const {
                out: n,
                config: r,
                options: o
            } = t;
            o.beforeAttribute && qn(n, o.beforeAttribute);
            for (let i = 0; i < e.length; i++) {
                const s = e[i];
                qn(n, In(s.name || "", r)), Vn(s, r) && !s.value ? !r.options["output.compactBoolean"] && o.booleanValue && qn(n, "=" + o.booleanValue) : (qn(n, "=" + Wn(s, r, !0)), Ar(s.value || Oc, t), qn(n, Wn(s, r))), i !== e.length - 1 && o.glueAttribute && qn(n, o.glueAttribute)
            }
            o.afterAttribute && qn(n, o.afterAttribute)
        }
    }

    function Kr(e, t) {
        if (!e.value && e.children.length) return;
        const n = e.value || Oc,
            r = Er(n),
            {
                out: o,
                options: i
            } = t;
        if (1 === r.length)(e.name || e.attributes) && Fn(o, " "), Ar(n, t);
        else {
            const e = [];
            let n = 0;
            for (const t of r) {
                const r = to(t);
                e.push(r), r > n && (n = r)
            }
            o.level++;
            for (let s = 0; s < r.length; s++) Ln(o, !0), i.beforeTextLine && Fn(o, i.beforeTextLine), Ar(r[s], t), i.afterTextLine && (Fn(o, " ".repeat(n - e[s])), Fn(o, i.afterTextLine));
            o.level--
        }
    }

    function eo(e) {
        return "class" === e.name || "id" === e.name
    }

    function to(e) {
        let t = 0;
        for (const n of e) t += "string" == typeof n ? n.length : n.name.length;
        return t
    }

    function no(e, t, n, r) {
        return !(!r.parent && 0 === t) && !Cr(e)
    }

    function ro(e, t) {
        return Xr(e, t, {
            beforeName: "%",
            beforeAttribute: "(",
            afterAttribute: ")",
            glueAttribute: " ",
            afterTextLine: " |",
            booleanValue: "true",
            selfClose: "/"
        })
    }

    function oo(e, t) {
        return Xr(e, t, {
            beforeAttribute: " ",
            glueAttribute: " ",
            beforeTextLine: "| ",
            selfClose: "/"
        })
    }

    function io(e, t) {
        return Xr(e, t, {
            beforeAttribute: "(",
            afterAttribute: ")",
            glueAttribute: ", ",
            beforeTextLine: "| ",
            selfClose: "xml" === t.options["output.selfClosingStyle"] ? "/" : ""
        })
    }

    function so(e, t) {
        let n;
        if ("string" == typeof e) {
            let r = t;
            t.options["jsx.enabled"] && (r = Object.assign(Object.assign({}, r), {
                jsx: !0
            })), t.options["markup.href"] && (r = Object.assign(Object.assign({}, r), {
                href: !0
            })), e = Ne(e, r), n = t.text, t.text = void 0
        }
        return Sn(e = En(e, t), uo, t), t.text = null != n ? n : t.text, e
    }

    function ao(e, t) {
        return (qc[t.syntax] || Vr)(e, t)
    }

    function uo(e, t, n) {
        Qn(e, t, n), kn(e, n), Zn(e, t, n), "xsl" === n.syntax && ar(e), n.options["jsx.enabled"] && ir(e), n.options["bem.enabled"] && lr(e, t, n)
    }

    function co(e, t) {
        const n = t.match(Lc);
        if (n) {
            const t = {},
                r = n[2] ? n[2].split("|").map(fo) : [];
            for (const e of r)
                for (const n of e) ho(n, t);
            return {
                type: "Property",
                key: e,
                property: n[1],
                value: r,
                keywords: t,
                dependencies: []
            }
        }
        return {
            type: "Raw",
            key: e,
            value: t
        }
    }

    function lo(e) {
        e = e.slice().sort(po);
        const t = [];
        let n;
        for (const r of e.filter(mo)) {
            for (; t.length;) {
                if (n = t[t.length - 1], r.property.startsWith(n.property) && 45 === r.property.charCodeAt(n.property.length)) {
                    n.dependencies.push(r), t.push(r);
                    break
                }
                t.pop()
            }
            t.length || t.push(r)
        }
        return e
    }

    function po(e, t) {
        return e.key === t.key ? 0 : e.key < t.key ? -1 : 1
    }

    function fo(e) {
        return $t(e.trim(), zc)[0].value
    }

    function mo(e) {
        return "Property" === e.type
    }

    function ho(e, t) {
        for (const n of e.value)
            if ("Literal" === n.type) t[n.value] = n;
            else if ("FunctionCall" === n.type) t[n.name] = n;
        else if ("Field" === n.type) {
            const e = n.name.trim();
            e && (t[e] = {
                type: "Literal",
                value: e
            })
        }
    }

    function go(e, t, n = !1) {
        if ((e = e.toLowerCase()) === (t = t.toLowerCase())) return 1;
        if (!e || !t || e.charCodeAt(0) !== t.charCodeAt(0)) return 0;
        const r = e.length,
            o = t.length;
        if (!n && r > o) return 0;
        const i = Math.min(r, o),
            s = Math.max(r, o);
        let a = 1,
            u = 1,
            c = s,
            l = 0,
            p = 0,
            f = !1,
            m = !1;
        for (; a < r;) {
            for (l = e.charCodeAt(a), f = !1, m = !1; u < o;) {
                if (p = t.charCodeAt(u), l === p) {
                    f = !0, c += s - (m ? a : u);
                    break
                }
                m = 45 === p, u++
            }
            if (!f) {
                if (!n) return 0;
                break
            }
            a++
        }
        const d = s - i;
        return c * (a / s) / (bo(s) - bo(d))
    }

    function bo(e) {
        return e * (e + 1) / 2
    }

    function vo(e, t) {
        return e.r || e.g || e.b || e.a ? 1 === e.a ? yo(e, t) : xo(e) : "transparent"
    }

    function yo(e, t) {
        const n = t && wo(e.r) && wo(e.g) && wo(e.b) ? $o : Co;
        return "#" + n(e.r) + n(e.g) + n(e.b)
    }

    function xo(e) {
        const t = [e.r, e.g, e.b];
        return 1 !== e.a && t.push(ko(e.a, 8)), `${3===t.length?"rgb":"rgba"}(${t.join(", ")})`
    }

    function ko(e, t = 4) {
        return e.toFixed(t).replace(/\.?0+$/, "")
    }

    function wo(e) {
        return !(e % 17)
    }

    function $o(e) {
        return (e >> 4).toString(16)
    }

    function Co(e) {
        return So(e.toString(16), 2)
    }

    function So(e, t) {
        for (; e.length < t;) e = "0" + e;
        return e
    }

    function jo(e, t) {
        var n;
        const r = On(t.options),
            o = t.options["output.format"];
        "@@section" === (null === (n = t.context) || void 0 === n ? void 0 : n.name) && (e = e.filter((e => e.snippet)));
        for (let n = 0; n < e.length; n++) o && 0 !== n && Ln(r, !0), Ao(e[n], r, t);
        return r.value
    }

    function Ao(e, t, n) {
        const r = n.options["stylesheet.json"];
        if (e.name) {
            qn(t, (r ? qo(e.name) : e.name) + n.options["stylesheet.between"]), e.value.length ? Eo(e, t, n) : Mn(t, 0, ""), r ? Fn(t, ",") : (To(e, t, !0), Fn(t, n.options["stylesheet.after"]))
        } else {
            for (const r of e.value)
                for (const e of r.value) Oo(e, t, n);
            To(e, t, e.value.length > 0)
        }
    }

    function Eo(e, t, n) {
        const r = n.options["stylesheet.json"],
            o = r ? Fo(e) : null;
        if (!o || o.unit && "px" !== o.unit) {
            const o = Lo(n);
            r && Fn(t, o);
            for (let r = 0; r < e.value.length; r++) 0 !== r && Fn(t, ", "), No(e.value[r], t, n);
            r && Fn(t, o)
        } else Fn(t, String(o.value))
    }

    function To(e, t, n) {
        e.important && (n && Fn(t, " "), Fn(t, "!important"))
    }

    function No(e, t, n) {
        for (let r = 0, o = -1; r < e.value.length; r++) {
            const i = e.value[r];
            0 === r || "Field" === i.type && i.start === o || Fn(t, " "), Oo(i, t, n), o = i.end
        }
    }

    function Oo(e, t, n) {
        if ("ColorValue" === e.type) Fn(t, vo(e, n.options["stylesheet.shortHex"]));
        else if ("Literal" === e.type) qn(t, e.value);
        else if ("NumberValue" === e.type) qn(t, ko(e.value, 4) + e.unit);
        else if ("StringValue" === e.type) {
            const n = "double" === e.quote ? '"' : "'";
            qn(t, n + e.value + n)
        } else if ("Field" === e.type) Mn(t, e.index, e.name);
        else if ("FunctionCall" === e.type) {
            Fn(t, e.name + "(");
            for (let r = 0; r < e.arguments.length; r++) r && Fn(t, ", "), No(e.arguments[r], t, n);
            Fn(t, ")")
        }
    }

    function Fo(e) {
        if (1 === e.value.length) {
            const t = e.value[0];
            if (1 === t.value.length && "NumberValue" === t.value[0].type) return t.value[0]
        }
    }

    function qo(e) {
        return e.replace(/\-(\w)/g, ((e, t) => t.toUpperCase()))
    }

    function Lo(e) {
        return e.options["stylesheet.jsonDoubleQuotes"] ? '"' : "'"
    }

    function zo(e, t) {
        var n;
        const r = (null === (n = t.cache) || void 0 === n ? void 0 : n.stylesheetSnippets) || Mo(t.snippets);
        t.cache && (t.cache.stylesheetSnippets = r), "string" == typeof e && (e = $t(e, {
            value: Jo(t)
        }));
        const o = Ko(r, t);
        for (const n of e) Po(n, o, t);
        return e
    }

    function Mo(e) {
        const t = [];
        for (const n of Object.keys(e)) t.push(co(n, e[n]));
        return lo(t)
    }

    function Po(e, t, n) {
        if (!Io(e, n)) {
            const r = n.options["stylesheet.fuzzySearchMinScore"];
            if (Jo(n)) {
                const o = n.context.name,
                    i = t.find((e => "Property" === e.type && e.property === o));
                Vo(e, n, i, r), e.snippet = i
            } else if (e.name) {
                const o = Bo(e.name, t, r, !0);
                e.snippet = o, o && ("Property" === o.type ? Wo(e, o, n) : Ro(e, o))
            }
        }
        return (e.name || n.context) && Qo(e, n), e
    }

    function Io(e, t) {
        let n = null;
        const r = 1 === e.value.length ? e.value[0] : null;
        if (r && 1 === r.value.length) {
            const e = r.value[0];
            "FunctionCall" === e.type && e.name === Mc && (n = e)
        }
        return !(!n && e.name !== Mc) && (n = n ? Object.assign(Object.assign({}, n), {
            name: "linear-gradient"
        }) : {
            type: "FunctionCall",
            name: "linear-gradient",
            arguments: [Ho(Go(0, ""))]
        }, t.context || (e.name = "background-image"), e.value = [Ho(n)], !0)
    }

    function Wo(e, t, n) {
        const r = Do(e.name, t.key);
        if (r) {
            if (e.value.length) return e;
            const o = _o(r, n, t);
            if (!o) return e;
            e.value.push(Ho(o))
        }
        if (e.name = t.property, e.value.length) Vo(e, n, t);
        else if (t.value.length) {
            const r = t.value[0];
            e.value = 1 === t.value.length || r.some(Zo) ? r : r.map((e => Yo(e, n)))
        }
        return e
    }

    function Vo(e, t, n, r) {
        for (const o of e.value) {
            const e = [];
            for (const i of o.value)
                if ("Literal" === i.type) e.push(_o(i.value, t, n, r) || i);
                else if ("FunctionCall" === i.type) {
                const o = _o(i.name, t, n, r);
                o && "FunctionCall" === o.type ? e.push(Object.assign(Object.assign({}, o), {
                    arguments: i.arguments.concat(o.arguments.slice(i.arguments.length))
                })) : e.push(i)
            } else e.push(i);
            o.value = e
        }
    }

    function Ro(e, t) {
        let n, r = 0;
        const o = /\$\{(\d+)(:[^}]+)?\}/g,
            i = e.value[0],
            s = [];
        for (; n = o.exec(t.value);) r !== n.index && s.push(Xo(t.value.slice(r, n.index))), r = n.index + n[0].length, i && i.value.length ? s.push(i.value.shift()) : s.push(Go(Number(n[1]), n[2] ? n[2].slice(1) : ""));
        const a = t.value.slice(r);
        return a && s.push(Xo(a)), e.name = void 0, e.value = [Ho(...s)], e
    }

    function Bo(e, t, n = 0, r = !1) {
        let o = null,
            i = 0;
        for (const n of t) {
            const t = go(e, Uo(n), r);
            if (1 === t) return n;
            t && t >= i && (i = t, o = n)
        }
        return i >= n ? o : null
    }

    function Uo(e) {
        return "string" == typeof e ? e : e.key
    }

    function Do(e, t) {
        for (let n = 0, r = 0; n < e.length; n++) {
            if (r = t.indexOf(e[n], r), -1 === r) return e.slice(n);
            r++
        }
        return ""
    }

    function _o(e, t, n, r) {
        let o;
        if (n) {
            if (o = Bo(e, Object.keys(n.keywords), r)) return n.keywords[o];
            for (const t of n.dependencies)
                if (o = Bo(e, Object.keys(t.keywords), r)) return t.keywords[o]
        }
        return (o = Bo(e, t.options["stylesheet.keywords"], r)) ? Xo(o) : null
    }

    function Qo(e, t) {
        const n = t.options["stylesheet.unitAliases"],
            r = t.options["stylesheet.unitless"];
        for (const o of e.value)
            for (const i of o.value) "NumberValue" === i.type && (i.unit ? i.unit = n[i.unit] || i.unit : 0 === i.value || r.includes(e.name) || (i.unit = i.rawValue.includes(".") ? t.options["stylesheet.floatUnit"] : t.options["stylesheet.intUnit"]))
    }

    function Ho(...e) {
        return {
            type: "CSSValue",
            value: e
        }
    }

    function Xo(e) {
        return {
            type: "Literal",
            value: e
        }
    }

    function Go(e, t) {
        return {
            type: "Field",
            index: e,
            name: t
        }
    }

    function Zo(e) {
        for (const t of e.value)
            if ("Field" === t.type || "FunctionCall" === t.type && t.arguments.some(Zo)) return !0;
        return !1
    }

    function Yo(e, t, n = {
        index: 1
    }) {
        let r = [];
        for (const o of e.value) switch (o.type) {
            case "ColorValue":
                r.push(Go(n.index++, vo(o, t.options["stylesheet.shortHex"])));
                break;
            case "Literal":
                r.push(Go(n.index++, o.value));
                break;
            case "NumberValue":
                r.push(Go(n.index++, `${o.value}${o.unit}`));
                break;
            case "StringValue":
                const e = "single" === o.quote ? "'" : '"';
                r.push(Go(n.index++, e + o.value + e));
                break;
            case "FunctionCall":
                r.push(Go(n.index++, o.name), Xo("("));
                for (let e = 0, i = o.arguments.length; e < i; e++) r = r.concat(Yo(o.arguments[e], t, n).value), e !== i - 1 && r.push(Xo(", "));
                r.push(Xo(")"));
                break;
            default:
                r.push(o)
        }
        return Object.assign(Object.assign({}, e), {
            value: r
        })
    }

    function Jo(e) {
        return !!e.context && ("@@value" === e.context.name || !e.context.name.startsWith("@@"))
    }

    function Ko(e, t) {
        if (t.context) {
            if ("@@section" === t.context.name) return e.filter((e => "Raw" === e.type));
            if ("@@property" === t.context.name) return e.filter((e => "Property" === e.type))
        }
        return e
    }

    function ei(e) {
        const t = {};
        return Object.keys(e).forEach((n => {
            for (const r of n.split("|")) t[r] = e[n]
        })), t
    }

    function ti(e = {}, t = {}) {
        const n = e.type || "markup",
            r = e.syntax || Vc[n];
        return Object.assign(Object.assign(Object.assign({}, Bc), e), {
            type: n,
            syntax: r,
            variables: ni(n, r, "variables", e, t),
            snippets: ni(n, r, "snippets", e, t),
            options: ni(n, r, "options", e, t)
        })
    }

    function ni(e, t, n, r, o = {}) {
        const i = Uc[e],
            s = o[e],
            a = Uc[t],
            u = o[t];
        return Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, Bc[n]), i && i[n]), a && a[n]), s && s[n]), u && u[n]), r[n])
    }

    function ri(e, t = 0) {
        return {
            text: e,
            start: t,
            pos: e.length
        }
    }

    function oi(e) {
        return e.pos === e.start
    }

    function ii(e, t = 0) {
        return e.text.charCodeAt(e.pos - 1 + t)
    }

    function si(e) {
        if (!oi(e)) return e.text.charCodeAt(--e.pos)
    }

    function ai(e, t) {
        if (oi(e)) return !1;
        const n = "function" == typeof t ? t(ii(e)) : t === ii(e);
        return n && e.pos--, !!n
    }

    function ui(e, t) {
        const n = e.pos;
        for (; ai(e, t););
        return e.pos < n
    }

    function ci(e) {
        return 39 === e || 34 === e
    }

    function li(e) {
        const t = e.pos,
            n = si(e);
        if (ci(n))
            for (; !oi(e);)
                if (si(e) === n && 92 !== ii(e)) return !0;
        return e.pos = t, !1
    }

    function pi(e) {
        const t = e.pos;
        if (!ai(e, 62)) return !1;
        let n = !1;
        for (ai(e, 47); !oi(e);) {
            if (ui(e, yi), hi(e)) {
                if (ai(e, 47)) {
                    n = ai(e, 60);
                    break
                }
                if (ai(e, 60)) {
                    n = !0;
                    break
                }
                if (ai(e, yi)) continue;
                if (ai(e, 61)) {
                    if (hi(e)) continue;
                    break
                }
                if (di(e)) {
                    n = !0;
                    break
                }
                break
            }
            if (!fi(e)) break
        }
        return e.pos = t, n
    }

    function fi(e) {
        return mi(e) || di(e)
    }

    function mi(e) {
        const t = e.pos;
        return !!(li(e) && ai(e, 61) && hi(e)) || (e.pos = t, !1)
    }

    function di(e) {
        const t = e.pos,
            n = [];
        for (; !oi(e);) {
            const t = ii(e);
            if (wi(t)) n.push(t);
            else if (ki(t)) {
                if (n.pop() !== Dc[t]) break
            } else if (!xi(t)) break;
            e.pos--
        }
        return !(t === e.pos || !ai(e, 61) || !hi(e)) || (e.pos = t, !1)
    }

    function hi(e) {
        return ui(e, gi)
    }

    function gi(e) {
        return 58 === e || 45 === e || bi(e) || vi(e)
    }

    function bi(e) {
        return (e &= -33) >= 65 && e <= 90
    }

    function vi(e) {
        return e > 47 && e < 58
    }

    function yi(e) {
        return 32 === e || 9 === e
    }

    function xi(e) {
        return !isNaN(e) && 61 !== e && !yi(e) && !ci(e)
    }

    function ki(e) {
        return 123 === e || 40 === e || 91 === e
    }

    function wi(e) {
        return 125 === e || 41 === e || 93 === e
    }

    function $i(e, t = e.length, n = {}) {
        const r = Object.assign(Object.assign({}, Hc), n);
        let o;
        t = Math.min(e.length, Math.max(0, null == t ? e.length : t)), r.lookAhead && (t = Ci(e, t, r));
        const i = Si(e, t, r.prefix || "");
        if (-1 === i) return;
        const s = ri(e, i);
        s.pos = t;
        const a = [];
        for (; !oi(s);) {
            if (o = ii(s), a.includes(125)) {
                if (125 === o) {
                    a.push(o), s.pos--;
                    continue
                }
                if (123 !== o) {
                    s.pos--;
                    continue
                }
            }
            if (Ni(o, r.type)) a.push(o);
            else if (Ti(o, r.type)) {
                if (a.pop() !== Dc[o]) break
            } else {
                if (a.includes(93) || a.includes(125)) {
                    s.pos--;
                    continue
                }
                if (pi(s) || !Ei(o)) break
            }
            s.pos--
        }
        if (!a.length && s.pos !== t) {
            const r = e.slice(s.pos, t).replace(/^[*+>^]+/, "");
            return {
                abbreviation: r,
                location: t - r.length,
                start: n.prefix ? i - n.prefix.length : t - r.length,
                end: t
            }
        }
    }

    function Ci(e, t, n) {
        for (ci(e.charCodeAt(t)) && t++; Ni(e.charCodeAt(t), n.type);) t++;
        return t
    }

    function Si(e, t, n) {
        if (!n) return 0;
        const r = ri(e),
            o = n.split("").map(_c);
        let i;
        for (r.pos = t; !oi(r);)
            if (!ji(r, 93, 91) && !ji(r, 125, 123)) {
                if (i = r.pos, Ai(r, o)) return i;
                r.pos--
            }
        return -1
    }

    function ji(e, t, n) {
        const r = e.pos;
        if (ai(e, t))
            for (; !oi(e);) {
                if (ai(e, n)) return !0;
                e.pos--
            }
        return e.pos = r, !1
    }

    function Ai(e, t) {
        const n = e.pos;
        let r = !1;
        for (let n = t.length - 1; n >= 0 && !oi(e) && ai(e, t[n]); n--) r = 0 === n;
        return r || (e.pos = n), r
    }

    function Ei(e) {
        return e > 64 && e < 91 || e > 96 && e < 123 || e > 47 && e < 58 || Qc.includes(e)
    }

    function Ti(e, t) {
        return 40 === e || "markup" === t && (91 === e || 123 === e)
    }

    function Ni(e, t) {
        return 41 === e || "markup" === t && (93 === e || 125 === e)
    }

    function Oi(e, t) {
        const n = ti(t);
        return "stylesheet" === n.type ? qi(e, n) : Fi(e, n)
    }

    function Fi(e, t) {
        return ao(so(e, t), t)
    }

    function qi(e, t) {
        return jo(zo(e, t), t)
    }

    function Li(e) {
        return 32 === e || 9 === e || 160 === e || 10 === e || 13 === e
    }

    function zi(e, t) {
        const n = e[e.length - 1];
        !t || t[0] === t[1] || n && n[0] === t[0] && n[1] === t[1] || e.push(t)
    }

    function Mi(e, t = 0) {
        const n = [],
            r = e.length;
        let o = 0,
            i = 0,
            s = 0;
        for (; o < r;) {
            s = o;
            if (Li(e.charCodeAt(o++))) {
                for (i !== s && n.push([t + i, t + s]); Li(e.charCodeAt(o));) o++;
                i = o
            }
        }
        return i !== o && n.push([t + i, t + o]), n
    }

    function Pi(e) {
        return '"' === e || "'" === e
    }

    function Ii(e) {
        const {
            value: t
        } = e;
        return t && Vi(t) ? t.slice(1, -1) : t
    }

    function Wi(e, t, n = 0) {
        let r = t.valueStart,
            o = t.valueEnd;
        return Pi(e[r]) && r++, Pi(e[o - 1]) && o > r && o--, [n + r, n + o]
    }

    function Vi(e) {
        return !!e && (Ri(e) || Bi(e))
    }

    function Ri(e) {
        return e.length > 1 && Pi(e[0]) && e[0] === e.slice(-1)
    }

    function Bi(e) {
        return "{" === e[0] && "}" === e.slice(-1)
    }

    function Ui(e) {
        return e.length > 0 ? e[e.length - 1] : void 0
    }

    function Di(e, t) {
        const n = St(t),
            r = [],
            o = [];
        return Rt(e, ((e, t, n, i) => {
            if (3 === t) o.push({
                name: e,
                open: [n, i]
            });
            else if (1 === t) {
                const t = {
                    name: e,
                    open: [n, i]
                };
                r.push(t), o.push(t)
            } else
                for (; r.length;) {
                    const t = r.pop();
                    if (t.name === e) {
                        t.close = [n, i];
                        break
                    }
                }
        }), n), o
    }

    function _i(e, t, n) {
        let r;
        return "string" == typeof e && (e = Di(e, n)), e.some((e => {
            const n = e.open[0],
                o = e.close ? e.close[1] : e.open[1];
            if (t < n) return !0;
            t > n && t < o && (r = e)
        })), r
    }

    function Qi(e, t, n) {
        return n ? Xi(e, t) : Hi(e, t)
    }

    function Hi(e, t) {
        let n;
        return Rt(e, ((r, o, i, s) => {
            if ((1 === o || 3 === o) && s > t) return n = Gi(e, r, i, s), !1
        })), n
    }

    function Xi(e, t) {
        let n = null,
            r = "",
            o = -1,
            i = -1;
        if (Rt(e, ((e, s, a, u) => {
                if (a >= t) return !1;
                1 !== s && 3 !== s || (r = e, n = s, o = a, i = u)
            })), null !== n) return Gi(e, r, o, i)
    }

    function Gi(e, t, n, r) {
        const o = [
                [n + 1, n + 1 + t.length]
            ],
            i = e.slice(n, r);
        for (const e of Mt(i, t))
            if (null != e.value) {
                zi(o, [n + e.nameStart, n + e.valueEnd]);
                const t = Zi(e);
                if (t[0] !== t[1] && (zi(o, [n + t[0], n + t[1]]), "class" === e.name)) {
                    const e = Mi(i.slice(t[0], t[1]), n + t[0]);
                    for (const t of e) zi(o, t)
                }
            } else zi(o, [n + e.nameStart, n + e.nameEnd]);
        return {
            start: n,
            end: r,
            ranges: o
        }
    }

    function Zi(e) {
        const t = e.value,
            n = t[0],
            r = t[t.length - 1];
        return '"' === n || "'" === n ? [e.valueStart + 1, e.valueEnd - (r === n ? 1 : 0)] : "{" === n && "}" === r ? [e.valueStart + 1, e.valueEnd - 1] : [e.valueStart, e.valueEnd]
    }

    function Yi(e, t, n) {
        return n ? Ki(e, t) : Ji(e, t)
    }

    function Ji(e, t) {
        let n, r;
        return rn(e, ((o, i, s, a) => {
            if (!(i < t)) {
                if ("selector" === o) return n = {
                    start: i,
                    end: s,
                    ranges: [
                        [i, s]
                    ]
                }, !1;
                if ("propertyName" === o) r = [i, s, a];
                else {
                    if ("propertyValue" === o) {
                        n = {
                            start: i,
                            end: -1 !== a ? a + 1 : s,
                            ranges: []
                        }, r && (n.start = r[0], zi(n.ranges, [r[0], n.end])), zi(n.ranges, [i, s]);
                        for (const t of ln(e.substring(i, s))) zi(n.ranges, [t[0] + i, t[1] + i]);
                        return !1
                    }
                    if (r) return n = {
                        start: r[0],
                        end: r[1],
                        ranges: [
                            [r[0], r[1]]
                        ]
                    }, !1
                }
            }
        })), n
    }

    function Ki(e, t) {
        const n = {
            type: null,
            start: -1,
            end: -1,
            valueStart: -1,
            valueEnd: -1,
            valueDelimiter: -1
        };
        if (rn(e, ((e, r, o, i) => {
                if (r >= t && "propertyValue" !== e) return !1;
                "selector" === e || "propertyName" === e ? (n.start = r, n.end = o, n.type = e, n.valueStart = n.valueEnd = n.valueDelimiter = -1) : "propertyValue" === e && (n.valueStart = r, n.valueEnd = o, n.valueDelimiter = i)
            })), "selector" === n.type) return {
            start: n.start,
            end: n.end,
            ranges: [
                [n.start, n.end]
            ]
        };
        if ("propertyName" === n.type) {
            const t = {
                start: n.start,
                end: n.end,
                ranges: []
            };
            if (-1 !== n.valueStart) {
                t.end = -1 !== n.valueDelimiter ? n.valueDelimiter + 1 : n.valueEnd, zi(t.ranges, [n.start, t.end]), zi(t.ranges, [n.valueStart, n.valueEnd]);
                for (const r of ln(e.substring(n.valueStart, n.valueEnd))) zi(t.ranges, [r[0] + n.valueStart, r[1] + n.valueStart])
            } else zi(t.ranges, [n.start, n.end]);
            return t
        }
    }

    function es(e, t, n = {}) {
        const r = {
                type: "html",
                ancestors: [],
                current: null,
                css: null
            },
            o = [],
            i = [],
            s = St({
                xml: n.xml,
                allTokens: !0
            });
        return Rt(e, ((e, n, a, u) => !(a >= t) && (a < t && t < u ? (r.current = {
            name: e,
            type: n,
            range: [a, u]
        }, !1) : (1 === n && ss(e, s) && (n = 3), void(1 === n ? i.push(as(o, e, n, a, u)) : 2 === n && i.length && Ui(i).name === e && us(o, i.pop()))))), s), i.forEach((e => {
            r.ancestors.push({
                name: e.name,
                range: [e.start, e.end]
            })
        })), n.skipCSS || (r.css = is(e, t, r)), r
    }

    function ts(e, t, n) {
        const r = {
                type: "css",
                ancestors: [],
                current: null,
                inline: !1,
                embedded: n
            },
            o = [],
            i = [];
        return rn(e, ((n, s, a) => {
            if (s >= t) return !1;
            if (s < t && t <= a) return r.current = {
                name: e.slice(s, a),
                type: n,
                range: [s, a]
            }, !1;
            switch (n) {
                case "selector":
                case "propertyName":
                    i.push(as(o, e.slice(s, a), n, s, a));
                    break;
                case "propertyValue":
                case "blockEnd":
                    us(o, i.pop())
            }
        })), i.forEach((e => {
            r.ancestors.push({
                name: e.name,
                type: e.type,
                range: [e.start, e.end]
            })
        })), r
    }

    function ns(e, t) {
        const n = Ui(t.ancestors);
        if (n && "style" === n.name)
            for (const t of Mt(e.slice(n.range[0], n.range[1]), n.name))
                if ("type" === t.name) return Ii(t)
    }

    function rs(e, t) {
        const n = Ui(t.ancestors);
        if (n) {
            const t = {};
            for (const r of Mt(e.slice(n.range[0], n.range[1]), n.name)) t[r.name] = Ii(r) || "";
            return {
                name: n.name,
                attributes: t
            }
        }
    }

    function os(e) {
        if (e.inline) return {
            name: "@@property"
        };
        const t = Ui(e.ancestors);
        let n = "@@global";
        return e.current && ("propertyValue" === e.current.type && t ? n = t.name : "selector" !== e.current.type && "propertyName" !== e.current.type || t || (n = "@@section")), {
            name: n
        }
    }

    function is(e, t, n) {
        let r = null;
        if (n.current) {
            const o = n.current;
            if (1 === o.type || 2 === o.type) {
                const n = e.slice(o.range[0], o.range[1]);
                Mt(n, o.name).some((i => {
                    if ("style" === i.name && null != i.value) {
                        const [s, a] = Wi(n, i, o.range[0]);
                        if (t >= s && t <= a) return r = ts(e.slice(s, a), t - s, [s, a]), cs(r, s), r.inline = !0, !0
                    }
                }))
            }
        } else if (n.ancestors.length) {
            const o = Ui(n.ancestors);
            if ("style" === o.name) {
                const n = o.range[1];
                let i = e.length;
                Rt(e.slice(o.range[1]), ((e, t, r) => {
                    if (e === o.name && 2 === t) return i = r + n, !1
                })), r = ts(e.slice(n, i), t - n, [n, i]), cs(r, n)
            }
        }
        return r
    }

    function ss(e, t) {
        return !t.xml && t.empty.includes(e)
    }

    function as(e, t, n, r, o) {
        if (e.length) {
            const i = e.pop();
            return i.name = t, i.type = n, i.start = r, i.end = o, i
        }
        return {
            name: t,
            type: n,
            start: r,
            end: o
        }
    }

    function us(e, t) {
        t && e.push(t)
    }

    function cs(e, t) {
        e.ancestors.forEach((e => {
            ls(e.range, t)
        })), e.current && ls(e.current.range, t)
    }

    function ls(e, t) {
        e[0] += t, e[1] += t
    }

    function ps(e, t, n) {
        return t < 0 ? n === e[0] ? (e[0] += t, e[1] += t) : e[0] < n && n <= e[1] && (e[1] += t) : t > 0 && e[0] <= n && n <= e[1] && (e[1] += t), e
    }

    function fs(e, t, n) {
        if ("error" === e.type) {
            if (t[1] === n) return !1;
            const {
                abbreviation: r
            } = e, o = t[0];
            let i = t[1];
            for (; i > o && Gc.includes(r[i - o - 1]);) i--;
            return i !== n
        }
        return !0
    }

    function ms(e, t) {
        const n = bs(e, t);
        let r = 0,
            o = n.length;
        for (; r < o && Cs(n[r]);) r++;
        for (; o > r && Cs(n[o - 1]);) o--;
        return [t[0] + r, t[0] + o]
    }

    function ds(e, t, n) {
        return e.operation((() => {
            const r = zs(n, t[0]),
                [o, i] = vs(e, t);
            if (e.replaceRange(r.snippet, o, i), r.ranges.length) {
                const t = r.ranges.map((t => {
                    const [n, r] = vs(e, t);
                    return {
                        head: n,
                        anchor: r
                    }
                }));
                e.setSelections(t)
            }
            return !0
        }))
    }

    function hs(e) {
        const t = e.getCursor();
        return e.indexFromPos(t)
    }

    function gs(e) {
        return e.getValue()
    }

    function bs(e, t) {
        const [n, r] = vs(e, t);
        return e.getRange(n, r)
    }

    function vs(e, t) {
        return [e.posFromIndex(t[0]), e.posFromIndex(t[1])]
    }

    function ys(e) {
        const {
            value: t
        } = e;
        return t && xs(t) ? t.slice(1, -1) : t
    }

    function xs(e) {
        return !!e && (ws(e) || $s(e))
    }

    function ks(e) {
        return '"' === e || "'" === e
    }

    function ws(e) {
        return e.length > 1 && ks(e[0]) && e[0] === e.slice(-1)
    }

    function $s(e) {
        return "{" === e[0] && "}" === e.slice(-1)
    }

    function Cs(e) {
        return /^[\s\n\r]+$/.test(e)
    }

    function Ss(e) {
        const t = {
            "<": "&lt;",
            ">": "&gt;",
            "&": "&amp;"
        };
        return e.replace(/[<>&]/g, (e => t[e]))
    }

    function js(e) {
        return e.constructor.Pass
    }

    function As(e, t) {
        const n = e.indexFromPos(t.head),
            r = e.indexFromPos(t.anchor);
        return [Math.min(n, r), Math.max(n, r)]
    }

    function Es(e, t) {
        return e[0] === t[0] && e[1] === t[1]
    }

    function Ts(e, t) {
        return e[0] <= t[0] && e[1] >= t[1]
    }

    function Ns(e) {
        return e[0] === e[1]
    }

    function Os(e, t = "emmet-error-snippet") {
        const n = e.message.split("\n")[0];
        return `<div class="${t}">\n        <div class="${t}-ptr">\n            <div class="${t}-line"></div>\n            <div class="${t}-tip"></div>\n            <div class="${t}-spacer">${" ".repeat(e.pos||0)}</div>\n        </div>\n        <div class="${t}-message">${Ss(n.replace(/\s+at\s+\d+$/,""))}</div>\n    </div>`
    }

    function Fs(e) {
        return e.length > 0 ? e[e.length - 1] : void 0
    }

    function qs(e) {
        return rl in e
    }

    function Ls(e) {
        return qs(e) || (e[rl] = {
            id: String(il++)
        }), e[rl]
    }

    function zs(e, t = 0) {
        const n = [];
        let r, o = "",
            i = null,
            s = 0,
            a = 0;
        for (; a < e.length;) r = e.charAt(a++), r !== tl && r !== nl || (o += e.slice(s, a - 1), s = a, r === tl ? (i = [t + o.length, t + o.length], n.push(i)) : i && (i[1] = t + o.length, i = null));
        return {
            ranges: n,
            snippet: o + e.slice(s)
        }
    }

    function Ms(e, t) {
        let n, r, o = Is(e);
        if (Rs(o)) {
            const i = gs(e);
            r = es(i, t, {
                xml: Vs(o)
            }), r.css && (o = Qs(i, r) || "css", n = r.css.inline, r = r.css)
        } else Us(o) && (r = ts(gs(e), t));
        return {
            type: Ws(o),
            syntax: o,
            inline: n,
            context: r
        }
    }

    function Ps(e, t) {
        const n = e.posFromIndex(t),
            r = e.getModeAt(n);
        return r && "xml" === r.name ? r.configuration || r.name : r && r.name
    }

    function Is(e) {
        const t = e.getMode();
        return t ? "htmlmixed" === t.name ? "html" : t.name || "" : ""
    }

    function Ws(e) {
        return e && pl.includes(e) ? "stylesheet" : "markup"
    }

    function Vs(e) {
        return !!e && sl.includes(e)
    }

    function Rs(e) {
        return !!e && (al.includes(e) || Vs(e))
    }

    function Bs(e) {
        return !!e && (ll.includes(e) || pl.includes(e))
    }

    function Us(e) {
        return !!e && ul.includes(e)
    }

    function Ds(e) {
        return !!e && cl.includes(e)
    }

    function _s(e, t) {
        if (!0 === e) return !0;
        if (Array.isArray(e)) {
            const n = [t.type, t.syntax];
            return t.inline && n.push(`${t.type}-inline`, `${t.syntax}-inline`), n.some((t => e.includes(t)))
        }
        return !1
    }

    function Qs(e, t) {
        const n = Fs(t.ancestors);
        if (n && "style" === n.name)
            for (const t of Mt(e.slice(n.range[0], n.range[1]), n.name))
                if ("type" === t.name) return ys(t)
    }

    function Hs(e, t) {
        const n = Fs(t.ancestors);
        if (n) {
            const t = {};
            for (const r of Mt(e.slice(n.range[0], n.range[1]), n.name)) t[r.name] = ys(r) || "";
            return {
                name: n.name,
                attributes: t
            }
        }
    }

    function Xs(e) {
        if (e.inline) return {
            name: "@@property"
        };
        const t = Fs(e.ancestors);
        let n = "@@global";
        return e.current && ("propertyValue" === e.current.type && t ? n = t.name : "selector" !== e.current.type && "propertyName" !== e.current.type || t || (n = "@@section")), {
            name: n
        }
    }

    function Gs(e) {
        const t = "string" == typeof e ? new sc(e) : e;
        let n, r = 0,
            i = 21;
        const s = [];
        for (; !t.eof();) t.eatWhile(o), t.start = t.pos, Zs(t) ? (0 == (1 & i) && ta("Unexpected number", t), s.push(Js(t.current())), i = 10) : ia(t.peek()) ? (n = t.next(), na(n) && 16 & i ? (oa(n) && s.push(Ks(n, r)), i = 21) : (0 == (2 & i) && ta("Unexpected operator", t), s.push(ea(n, r)), i = 21)) : t.eat(40) ? (0 == (4 & i) && ta('Unexpected "("', t), r += 10, i = 53) : t.eat(41) ? (r -= 10, 32 & i ? s.push(fl) : 0 == (8 & i) && ta('Unexpected ")"', t), i = 14) : ta("Unknown character", t);
        (r < 0 || r >= 10) && ta('Unmatched "()"', t);
        const a = Ys(s);
        return null === a && ta("Parity", t), a
    }

    function Zs(t) {
        const n = t.pos;
        return !(!t.eat(46) || !t.eatWhile(e)) || (!(!t.eatWhile(e) || t.eat(46) && !t.eatWhile(e)) || (t.pos = n, !1))
    }

    function Ys(e) {
        const t = [],
            n = [];
        let r = 0;
        for (let o = 0; o < e.length; o++) {
            const i = e[o];
            if ("num" === i.type) n.push(i);
            else {
                for (r += "op1" === i.type ? 1 : 2; t.length && i.priority <= t[t.length - 1].priority;) n.push(t.pop());
                t.push(i)
            }
        }
        return r + 1 === n.length + t.length ? n.concat(t.reverse()) : null
    }

    function Js(e, t) {
        return sa("num", parseFloat(e), t)
    }

    function Ks(e, t = 0) {
        return 45 === e && (t += 2), sa("op1", e, t)
    }

    function ea(e, t = 0) {
        return 42 === e ? t += 1 : 47 !== e && 92 !== e || (t += 2), sa("op2", e, t)
    }

    function ta(e, t) {
        throw t && (e += ` at column ${t.pos} of expression`), new Error(e)
    }

    function na(e) {
        return ra(e) || oa(e)
    }

    function ra(e) {
        return 43 === e
    }

    function oa(e) {
        return 45 === e
    }

    function ia(e) {
        return 43 === e || 45 === e || 42 === e || 47 === e || 92 === e
    }

    function sa(e, t, n = 0) {
        return {
            type: e,
            value: t,
            priority: n
        }
    }

    function aa(e, t = e.length, n) {
        const r = Object.assign(Object.assign({}, ml), n),
            o = {
                text: e,
                pos: t
            };
        let s;
        if (r.lookAhead && 41 === la(o)) {
            o.pos++;
            const t = e.length;
            for (; o.pos < t && (s = la(o), 41 === s || r.whitespace && i(s));) o.pos++
        }
        const a = o.pos;
        let u = 0;
        for (; o.pos >= 0;)
            if (!ua(o)) {
                if (s = ca(o), 41 === s) u++;
                else if (40 === s) {
                    if (!u) break;
                    u--
                } else if (!(r.whitespace && i(s) || na(s) || ia(s))) break;
                o.pos--
            }
        if (o.pos !== a && !u) {
            for (; i(la(o));) o.pos++;
            return [o.pos, a]
        }
        return null
    }

    function ua(t) {
        if (e(ca(t))) {
            t.pos--;
            let n, r = !1;
            for (; t.pos >= 0;) {
                if (n = ca(t), 46 === n) {
                    if (r) break;
                    r = !0
                } else if (!e(n)) break;
                t.pos--
            }
            return !0
        }
        return !1
    }

    function ca(e) {
        return e.text.charCodeAt(e.pos - 1)
    }

    function la(e) {
        return e.text.charCodeAt(e.pos)
    }

    function pa(e) {
        if (Array.isArray(e) || (e = Gs(e)), !e || !e.length) return null;
        const t = [];
        let n, r, o;
        for (let i = 0, s = e.length; i < s; i++) {
            const s = e[i];
            if ("num" === s.type) t.push(s.value);
            else if ("op2" === s.type) r = t.pop(), n = t.pop(), o = hl[s.value], t.push(o(n, r));
            else {
                if ("op1" !== s.type) throw new Error("Invalid expression");
                n = t.pop(), o = dl[s.value], t.push(o(n))
            }
        }
        if (t.length > 1) throw new Error("Invalid Expression (parity)");
        return t[0]
    }

    function fa(e, t, n) {
        const r = null != t ? e.posFromIndex(t) : e.getCursor(),
            o = Is(e) || "html",
            i = Ct(e),
            s = {
                "output.baseIndent": da(e, r.line),
                "output.indent": ha(e),
                "output.field": ma(),
                "output.format": !n,
                "output.attributeQuotes": i.attributeQuotes
            };
        return "html" === o && (s["output.selfClosingStyle"] = i.markupStyle, s["output.compactBoolean"] = "html" === i.markupStyle), Rs(o) && (i.comments && (s["comment.enabled"] = !0, i.commentsTemplate && (s["comment.after"] = i.commentsTemplate)), s["bem.enabled"] = i.bem, s["stylesheet.shortHex"] = i.shortHex), s
    }

    function ma() {
        let e = -1;
        return (t, n) => -1 === e || e === t ? (e = t, n ? tl + n + nl : tl) : n || ""
    }

    function da(e, t) {
        const n = e.getLine(t).match(/^\s+/);
        return n ? n[0] : ""
    }

    function ha(e) {
        return e.getOption("indentWithTabs") ? "\t" : " ".repeat(e.getOption("indentUnit") || 0)
    }

    function ga(e, t, n) {
        let r = {
            cache: gl
        };
        const o = {
            "output.field": ma(),
            "output.format": !n || !n.inline
        };
        n && (Object.assign(r, n), n.options && Object.assign(o, n.options)), r.options = o;
        const i = Ct(e);
        return i.config && (r = ti(r, i.config)), Oi(t, r)
    }

    function ba(e, t, n = "markup", r) {
        return $i(e, t, Object.assign({
            lookAhead: "stylesheet" !== n,
            type: n
        }, r))
    }

    function va(e, t, n = !1, r = !1) {
        const o = {
            xml: r
        };
        return n ? Yt(e, t, o) : Zt(e, t, o)
    }

    function ya(e, t, n) {
        return n ? hn(e, t) : dn(e, t)
    }

    function xa(e, t, n, r) {
        return n ? Yi(e, t, r) : Qi(e, t, r)
    }

    function ka(e, t, n) {
        const r = aa(e, t, n);
        if (r) try {
            const [t, n] = r, o = pa(e.slice(t, n));
            if (null !== o) return {
                start: t,
                end: n,
                result: o,
                snippet: o.toFixed(4).replace(/\.?0+$/, "")
            }
        } catch (e) {
            console.error(e)
        }
    }

    function wa(e, t, n) {
        const r = gs(e);
        let o;
        if (null == n) {
            const t = e.getMode();
            n = !!t && Vs(t.name)
        }
        const i = Gt(r, t, {
            xml: n
        });
        if (i) {
            const {
                open: e,
                close: t
            } = i;
            o = {
                name: i.name,
                open: e,
                close: t
            }, i.attributes && (o.attributes = {}, i.attributes.forEach((e => {
                let t = e.value;
                t && ws(t) && (t = t.slice(1, -1)), o.attributes[e.name] = null == t ? null : t
            })))
        }
        return o
    }

    function $a(e, t) {
        const n = Ms(e, t),
            {
                context: r
            } = n,
            o = {
                type: n.type,
                syntax: n.syntax || "html",
                options: fa(e, t, n.inline)
            };
        if (r) {
            const t = gs(e);
            "html" === r.type && r.ancestors.length ? o.context = Hs(t, r) : "css" === r.type && (o.context = Xs(r))
        }
        return o
    }

    function Ca(e, t) {
        return t
    }

    function Sa(e) {
        const t = e => {
                xl.run(e, (() => {
                    kl.handleChange(xl, hs(e))
                }))
            },
            n = e => {
                xl.run(e, (() => {
                    const t = hs(e);
                    if (!Ea(e, t)) return;
                    const n = kl.handleSelectionChange(xl, t);
                    n && (za(n, t) ? xl.showPreview(n) : xl.hidePreview())
                }))
            };
        return e.on("change", t), e.on("focus", n), e.on("cursorActivity", n), () => {
            xl.run(e, (() => kl.disposeEditor(xl))), e.off("change", t), e.off("focus", n), e.off("cursorActivity", n)
        }
    }

    function ja(e, t) {
        return xl.run(e, (() => t(kl, xl)))
    }

    function Aa(e, t) {
        if (Ea(e, t)) {
            const n = Ps(e, t);
            return !!n && (Bs(n) || Ds(n))
        }
        return !1
    }

    function Ea(e, t) {
        return _s(Ct(e).mark, Ms(e, t))
    }

    function Ta(e, t, n) {
        return xl.run(e, (() => {
            const e = xl.syntax(),
                r = xl.isJSX(e) ? Zc : "",
                o = kl.getActivationContext(xl, t),
                i = ba(xl.substr(), t, Ws(null == o ? void 0 : o.syntax), {
                    prefix: r
                });
            if (i) {
                const e = kl.startTracking(xl, i.start, i.end, {
                    offset: r.length,
                    config: o
                });
                if (e) {
                    if ("error" === e.type && n) return void kl.stopTracking(xl, {
                        force: !0
                    });
                    xl.showPreview(e)
                }
                return e
            }
        }))
    }

    function Na(e) {
        return xl.run(e, (() => kl.getTracker(xl)))
    }

    function Oa(e, t, n, r) {
        return xl.run(e, (() => {
            const e = kl.startTracking(xl, t, n, r);
            return e && xl.showPreview(e), e
        }))
    }

    function Fa(e, t) {
        return xl.run(e, (() => kl.stopTracking(xl, t)))
    }

    function qa(e, t) {
        const n = Na(e) || Ta(e, t);
        if (n && za(n, t) && "abbreviation" === n.type) {
            const {
                abbreviation: t,
                preview: r
            } = n;
            return {
                text: t,
                displayText: r,
                hint: () => {
                    Fa(e);
                    const r = ga(e, t, n.config);
                    ds(e, n.range, r)
                },
                from: e.posFromIndex(n.range[0]),
                to: e.posFromIndex(n.range[1])
            }
        }
    }

    function La(e, t, n) {
        xl.run(e, (() => {
            const e = kl.getStoredTracker(xl);
            if (e) {
                "abbreviation" === e.type && n === e.abbreviation && e.range[0] === t && kl.restoreTracker(xl, t)
            }
        }))
    }

    function za(e, t) {
        return t >= e.range[0] && t <= e.range[1]
    }

    function Ma(e) {
        function t(e, t, r) {
            i && i.dataset.pos === String(t) || (n(), i = Ua(e, t, r))
        }

        function n() {
            i && (i.remove(), i = null)
        }
        let r, o = null,
            i = null;
        const s = e => {
                o || (o = Di(e.getValue()));
                const i = hs(e);
                let s = _i(o, i);
                if (s) {
                    s.preview || (s.preview = Da(e, s)), Pa(e, s, i) ? t(e, s.close[1], s.preview) : n();
                    const r = s.name.length;
                    s = Object.assign(Object.assign({}, s), {
                        open: [s.open[0] + 1, s.open[0] + 1 + r]
                    }), s.close && (s.close = [s.close[0] + 2, s.close[0] + 2 + r])
                }!s || r && Es(r.open, s.open) ? !s && r && Wa(e) : (Wa(e), Ia(e, s)), r = s
            },
            a = e => {
                if (o = null, Ct(e).autoRenameTags) {
                    const {
                        open: t,
                        close: n
                    } = Va(e);
                    if (t && n) {
                        const o = e.getCursor(),
                            i = t.find(),
                            s = n.find();
                        let a = !1;
                        Ga(e, i) || Ga(e, s) ? a = !0 : Xa(e, i, s) && (Qa(i, o) ? a = Ba(e, i, s) : Qa(s, o) && (a = Ba(e, s, i))), a && (Wa(e), r = null)
                    }
                }
            };
        return e.on("cursorActivity", s), e.on("change", a), () => {
            Wa(e), n(), e.off("cursorActivity", s), e.off("cursorActivity", a), o = r = null
        }
    }

    function Pa(e, t, n) {
        return t.close && t.preview && Ct(e).previewOpenTag && n > t.close[0] && n < t.close[1]
    }

    function Ia(e, {
        open: t,
        close: n,
        preview: r
    }) {
        Ra(e, e.posFromIndex(t[0]), e.posFromIndex(t[1]), wl), n && Ra(e, e.posFromIndex(n[0]), e.posFromIndex(n[1]), $l)
    }

    function Wa(e) {
        const {
            open: t,
            close: n
        } = Va(e);
        t && t.clear(), n && n.clear()
    }

    function Va(e) {
        let t, n;
        return e.getAllMarks().forEach((e => {
            e.className === wl ? t = e : e.className === $l && (n = e)
        })), {
            open: t,
            close: n
        }
    }

    function Ra(e, t, n, r, o) {
        return e.markText(t, n, {
            className: r,
            inclusiveLeft: !0,
            inclusiveRight: !0,
            clearWhenEmpty: !1,
            attributes: o
        })
    }

    function Ba(e, t, n) {
        const r = e.getRange(t.from, t.to),
            o = r.match(/[\w:.-]+/),
            i = o ? o[0] : "";
        return e.getRange(n.from, n.to) !== i && e.replaceRange(i, n.from, n.to), r !== i
    }

    function Ua(e, t, n) {
        const r = document.createElement("div");
        return r.className = "emmet-tag-preview", r.innerText = n, r.dataset.pos = String(t), e.addWidget(e.posFromIndex(t), r, !1), r
    }

    function Da(e, t) {
        let n = "",
            r = "";
        const o = [];
        Mt(bs(e, t.open), t.name).forEach((e => {
            "class" === e.name && e.value ? n = "." + _a(e.value).replace(/\s+/g, ".") : "id" === e.name && e.value ? r = "#" + _a(e.value) : o.push(e.value ? `${e.name}=${e.value}` : e.name)
        }));
        const i = o.length ? `[${o.join(" ")}]` : "",
            s = r + n + i;
        return s ? t.name + s : ""
    }

    function _a(e) {
        return ws(e) ? e.slice(1, -1) : e
    }

    function Qa(e, t, n) {
        return n ? Ha(t, e.from) > 0 && Ha(t, e.to) < 0 : Ha(t, e.from) >= 0 && Ha(t, e.to) <= 0
    }

    function Ha(e, t) {
        return e.line - t.line || e.ch - t.ch
    }

    function Xa(e, t, n) {
        return e.getRange(t.from, t.to) !== e.getRange(n.from, n.to)
    }

    function Ga(e, t) {
        return "" === e.getRange(t.from, t.to)
    }

    function Za(e, t) {
        const n = new Error(e);
        return n.ch = t.pos, n
    }

    function Ya(e, t, n = "Unexpected character") {
        return t.parseError = Za(n.replace(/\s+at\s+\d+$/, ""), e), e.skipToEnd(), "invalidchar"
    }

    function Ja(e) {
        return e[e.length - 1]
    }

    function Ka() {
        return {
            startState: () => ({
                attribute: 0,
                expression: 0,
                group: 0,
                quote: 0,
                braces: [],
                tokens: [],
                scanner: new sc("")
            }),
            token(e, t) {
                const {
                    scanner: n
                } = t;
                n.string = e.string, n.pos = e.pos, n.start = e.start, n.end = e.string.length;
                const r = n.peek(),
                    o = Y(n, t);
                if (!o) return Ya(e, t);
                if (e.pos = n.pos, "Quote" === o.type) t.quote = r === t.quote ? 0 : r;
                else if ("Bracket" === o.type)
                    if (o.open) t[o.context]++, t.braces.push(o);
                    else {
                        t[o.context]--;
                        const e = Ja(t.braces);
                        e && e.context === o.context && t.braces.pop()
                    }
                if (e.eol() && t.braces.length && !t.parseError) {
                    const n = Ja(t.braces).start;
                    return t.parseError = Za(`No closing brace at ${n}`, e), null
                }
                const i = eu(o, t);
                return t.tokens.push(o), i
            }
        }
    }

    function eu(e, t) {
        const n = Ja(t.tokens);
        switch (e.type) {
            case "Bracket":
                return "bracket";
            case "Field":
                return "variable-2";
            case "Literal":
                if (t.attribute) return n && "Operator" === n.type && "equal" === n.operator ? "string-2" : t.quote ? "string" : "attribute";
                if (t.quote) return "string";
                if (n && "Operator" === n.type) {
                    if ("class" === n.operator) return "variable-2";
                    if ("id" === n.operator) return "variable-3"
                }
                return "tag";
            case "Operator":
                return "class" === e.operator ? "variable-2" : "id" === e.operator ? "variable-3" : `operator ${e.operator}`;
            case "Repeater":
            case "RepeaterPlaceholder":
                return "meta";
            case "Quote":
                return "string";
            case "RepeaterNumber":
                return "number"
        }
        return ""
    }

    function tu() {
        return {
            startState: () => ({
                brackets: 0,
                tokens: [],
                scanner: new sc("")
            }),
            token(e, t) {
                const {
                    scanner: n
                } = t;
                n.string = e.string, n.pos = e.pos, n.start = e.start, n.end = e.string.length;
                const r = Fe(n, 0 === t.brackets);
                if (!r) return Ya(e, t);
                if ("Bracket" === r.type && (t.brackets += r.open ? 1 : -1, t.brackets < 0)) return Ya(e, t, "Unexpected bracket");
                e.pos = n.pos;
                const o = nu(r);
                return t.tokens.push(r), o
            }
        }
    }

    function nu(e) {
        switch (e.type) {
            case "Bracket":
                return "bracket";
            case "Field":
                return "variable-2";
            case "Literal":
                return "tag";
            case "Operator":
                return `operator ${e.operator}`;
            case "ColorValue":
                return "variable-3";
            case "NumberValue":
                return "number";
            case "StringValue":
                return "string"
        }
        return null
    }

    function ru() {
        return {
            token: e => e.eatWhile(ou) ? "tag" : e.eat(iu) ? "operator" : (e.skipToEnd(), "invalidchar")
        }
    }

    function ou(e) {
        return /[a-zA-Z0-9-_$@!:]/.test(e)
    }

    function iu(e) {
        return "|" === e
    }

    function su(e, t) {
        if (e.somethingSelected()) return js(e);
        if (t) return au(e);
        const n = hs(e),
            r = e.posFromIndex(n),
            o = e.getLine(r.line),
            i = $a(e, n),
            s = ba(o, r.ch, Ws(i.syntax));
        if (s) {
            const t = n - r.ch;
            uu(e, s.abbreviation, [s.start + t, s.end + t], i)
        }
    }

    function au(e) {
        const t = hs(e);
        if (Ct(e).mark) {
            const n = Na(e);
            return n && za(n, t) && "abbreviation" === n.type ? (uu(e, n.abbreviation, n.range, n.config), void Fa(e, {
                skipRemove: !0
            })) : js(e)
        }
        return ja(e, ((n, r) => {
            const o = n.getActivationContext(r, t);
            if (o) {
                const n = e.posFromIndex(t),
                    r = ba(e.getLine(n.line), n.ch, Ws(o.syntax));
                if (r) {
                    const i = t - n.ch;
                    return void uu(e, r.abbreviation, [r.start + i, r.end + i], o)
                }
            }
            return js(e)
        }))
    }

    function uu(e, t, n, r) {
        ds(e, n, ga(e, t, r))
    }

    function cu(e) {
        if (!Na(e)) return js(e);
        Fa(e, {
            force: !0
        })
    }

    function lu(e) {
        Fa(e), Ta(e, hs(e))
    }

    function pu(e) {
        let t = Na(e);
        if (Fa(e), t && t.forced) return;
        const [n, r] = As(e, e.listSelections()[0]);
        t = Oa(e, n, r, {
            forced: !0
        }), n !== r && e.setSelection(e.posFromIndex(r))
    }

    function fu(e) {
        const t = e.listSelections().map((t => mu(e, t.anchor, t.head)));
        if (!t.some(Boolean)) return js(e);
        e.operation((() => {
            const n = e.listSelections(),
                r = e.getDoc().lineSeparator(),
                o = ha(e),
                i = [];
            for (let s = n.length - 1; s >= 0; s--) {
                const a = n[s],
                    u = da(e, a.anchor.line);
                let c = u;
                t[s] ? (c += o, e.replaceRange(r + c + r + u, a.anchor, a.head)) : e.replaceRange(r + u, a.anchor, a.head);
                const l = {
                    line: a.anchor.line + 1,
                    ch: c.length
                };
                i.unshift({
                    anchor: l,
                    head: l
                })
            }
            e.setSelections(i)
        }))
    }

    function mu(e, t, n) {
        if (hu(t, n)) {
            if ("xml" === e.getModeAt(t).name) {
                const n = e.getTokenAt(t),
                    r = e.getTokenAt(Object.assign({}, t, {
                        ch: t.ch + 1
                    }));
                return "tag bracket" === n.type && ">" === n.string && "tag bracket" === r.type && "</" === r.string
            }
        }
    }

    function du(e, t) {
        return e.line - t.line || e.ch - t.ch
    }

    function hu(e, t) {
        return e.sticky === t.sticky && 0 === du(e, t)
    }

    function gu(e) {
        function t(t) {
            t && t.stopPropagation(), r();
            const n = m.value.trim();
            if (n) try {
                const t = ga(e, n, p);
                ds(e, l, t), h = !0, f.classList.contains(Sl) && (d.innerHTML = "", f.classList.remove(Sl))
            } catch (e) {
                h = !1, f.classList.add(Sl), d.innerHTML = Os(e), console.error(e)
            }
        }

        function n(e) {
            27 === e.keyCode ? (e.stopPropagation(), e.preventDefault(), o()) : 13 === e.keyCode && (e.stopPropagation(), e.preventDefault(), i())
        }

        function r() {
            h && e.undo()
        }

        function o() {
            r(), s(), e.focus()
        }

        function i() {
            s(), e.focus()
        }

        function s() {
            m.removeEventListener("input", t), m.removeEventListener("change", t), m.removeEventListener("paste", t), m.removeEventListener("keydown", n), m.removeEventListener("blur", o), f.remove(), f = m = d = null
        }
        const a = Is(e),
            u = hs(e),
            c = wa(e, u, Vs(a)),
            l = vu(e, ku(e), c),
            p = $a(e, l[0]);
        p.text = yu(e, l, !0);
        let f = bu(),
            m = f.querySelector("input"),
            d = f.querySelector(`.${Cl}-error`),
            h = !1;
        f.emmet = {
            submit: i,
            cancel: o,
            update: t
        }, m.addEventListener("input", t), m.addEventListener("change", t), m.addEventListener("paste", t), m.addEventListener("keydown", n), e.getWrapperElement().appendChild(f), m.focus()
    }

    function bu() {
        const e = document.createElement("div");
        return e.className = Cl, e.innerHTML = `<div class="${Cl}-wrapper">\n        <input type="text" placeholder="Enter abbreviation" autofocus />\n        <div class="${Cl}-error"></div>\n    </div>`, e
    }

    function vu(e, t, n) {
        if (t[0] === t[1] && n) {
            const {
                open: r,
                close: o
            } = n, i = t[0];
            if (xu(r, i) || o && xu(o, i)) return [r[0], o ? o[1] : r[1]];
            if (o) return ms(e, [r[1], o[0]])
        }
        return t
    }

    function yu(e, t, n = !1) {
        const r = e.posFromIndex(t[0]),
            o = da(e, r.line),
            i = bs(e, t).split("\n").map((e => e.startsWith(o) ? e.slice(o.length) : e));
        return n ? i : i.join("\n")
    }

    function xu(e, t) {
        return e[0] < t && t < e[1]
    }

    function ku(e) {
        return As(e, e.listSelections()[0])
    }

    function wu(e, t) {
        const n = Is(e);
        if (!Rs(n) && !Us(n)) return js(e); {
            const r = t ? Su(e, n) : ju(e, n);
            e.setSelections(r.map((t => ({
                anchor: e.posFromIndex(t[0]),
                head: e.posFromIndex(t[1])
            }))))
        }
    }

    function $u(e, t) {
        const n = e[e.length - 1];
        n && Es(n, t) || e.push(t)
    }

    function Cu(e, t, n, r) {
        const o = gs(e);
        if (Us(n)) return ya(o, t, r);
        const i = [],
            s = va(o, t, r, Vs(n));
        for (const e of s) e.close ? ($u(i, [e.open[1], e.close[0]]), $u(i, [e.open[0], e.close[1]])) : $u(i, [e.open[0], e.open[1]]);
        return i.sort(((e, t) => r ? e[0] - t[0] : t[0] - e[0]))
    }

    function Su(e, t) {
        const n = [];
        for (const r of e.listSelections()) {
            const o = As(e, r),
                i = Cu(e, o[0], t, !0);
            let s, a = i.findIndex((e => Es(o, e)));
            a < i.length - 1 ? s = i[a + 1] : -1 !== a && (s = i.find((e => Ts(e, o)))), n.push(s || o)
        }
        return n
    }

    function ju(e, t) {
        const n = [];
        for (const r of e.listSelections()) {
            const o = As(e, r),
                i = Cu(e, o[0], t).find((e => Ts(e, o) && e[1] > o[1]));
            n.push(i || o)
        }
        return n
    }

    function Au(e) {
        const t = e.listSelections().slice().reverse();
        e.operation((() => {
            for (const n of t) {
                const t = As(e, n),
                    {
                        syntax: r
                    } = Ms(e, t[0]),
                    o = r && Us(r) ? Al : jl,
                    i = Ou(e, t[0]);
                if (i && i.commentStart) Eu(e, i);
                else if (i && Ns(t)) {
                    let t = 0;
                    for (const n of Nu(e, i.range, o).reverse()) t += Eu(e, n);
                    Tu(e, [i.range[0], i.range[1] - t], o)
                } else if (Ns(t)) {
                    const t = e.getLine(n.anchor.line),
                        r = As(e, {
                            anchor: {
                                line: n.anchor.line,
                                ch: 0
                            },
                            head: {
                                line: n.anchor.line,
                                ch: t.length
                            }
                        });
                    Tu(e, ms(e, r), o)
                } else Tu(e, t, o)
            }
        }))
    }

    function Eu(e, {
        range: t,
        commentStart: n,
        commentEnd: r
    }) {
        const o = bs(e, t);
        if (n && o.startsWith(n)) {
            let i = n.length,
                s = r && o.endsWith(r) ? r.length : 0;
            Cs(o[i]) && (i += 1), s && Cs(o[o.length - s - 1]) && (s += 1);
            const a = vs(e, [t[1] - s, t[1]]),
                u = vs(e, [t[0], t[0] + i]);
            return e.replaceRange("", a[0], a[1]), e.replaceRange("", u[0], u[1]), i + s
        }
        return 0
    }

    function Tu(e, t, n) {
        const [r, o] = vs(e, t);
        e.replaceRange(" " + n[1], o, o), e.replaceRange(n[0] + " ", r, r)
    }

    function Nu(e, t, n) {
        const r = [],
            o = bs(e, t);
        let i = t[0],
            s = 0;
        for (;;) {
            const e = o.indexOf(n[0], s);
            if (-1 === e) break; {
                s = e + n[0].length;
                const t = o.indexOf(n[1], s); - 1 !== t && (s = t + n[1].length, r.push({
                    range: [i + e, i + s],
                    commentStart: n[0],
                    commentEnd: n[1]
                }))
            }
        }
        return r
    }

    function Ou(e, t) {
        const {
            syntax: n
        } = Ms(e, t);
        if (n) {
            if (Rs(n)) return Fu(gs(e), t, Vs(n));
            if (Us(n)) {
                const n = gs(e),
                    r = qu(n, t);
                if (r) return r;
                const o = mn(n, t);
                if (o) return {
                    range: [o.start, o.end]
                }
            }
        }
    }

    function Fu(e, t, n = !1) {
        const r = [],
            o = [],
            i = St({
                xml: n,
                allTokens: !0
            });
        let s;
        return Rt(e, ((e, n, a, u) => {
            if (1 === n && zu(e, i) && (n = 3), 1 === n) o.push(Mu(r, e, a, u));
            else if (3 === n) {
                if (a < t && t < u) return s = {
                    range: [a, u]
                }, !1
            } else if (2 === n) {
                const n = Iu(o);
                if (n && n.name === e) {
                    if (n.start < t && t < u) return s = {
                        range: [n.start, u]
                    }, !1;
                    o.length && Pu(r, o.pop())
                }
            } else if (a < t && t < u) return s = {
                range: [a, u]
            }, 6 === n && (s.commentStart = jl[0], s.commentEnd = jl[1]), !1
        }), i), o.length = r.length = 0, s
    }

    function qu(e, t) {
        const n = new sc(e);
        for (; !n.eof() && t > n.pos;) {
            const e = n.pos;
            if (Lu(n, 47, 42)) {
                for (; !n.eof() && !Lu(n, 42, 47);) n.pos++;
                if (e < t && t < n.pos) return {
                    range: [e, n.pos],
                    commentStart: Al[0],
                    commentEnd: Al[1]
                }
            } else if (Lu(n, 47, 47)) {
                for (; !n.eof() && !n.eat(13) && !n.eat(10);) n.pos++;
                if (e < t && t < n.pos) return {
                    range: [e, n.pos],
                    commentStart: "//"
                }
            } else n.pos++
        }
    }

    function Lu(e, t, n) {
        const {
            pos: r
        } = e;
        return !(!e.eat(t) || !e.eat(n)) || (e.pos = r, !1)
    }

    function zu(e, t) {
        return !t.xml && t.empty.includes(e)
    }

    function Mu(e, t, n, r) {
        if (e.length) {
            const o = e.pop();
            return o.name = t, o.start = n, o.end = r, o
        }
        return {
            name: t,
            start: n,
            end: r
        }
    }

    function Pu(e, t) {
        e.push(t)
    }

    function Iu(e) {
        return e.length ? e[e.length - 1] : null
    }

    function Wu(e) {
        const t = e.getCursor(),
            n = ka(e.getLine(t.line), t.ch);
        if (n) {
            const r = {
                    line: t.line,
                    ch: n.start
                },
                o = {
                    line: t.line,
                    ch: n.end
                };
            e.replaceRange(n.snippet, r, o)
        }
    }

    function Vu(e, t) {
        const n = Ru(e, hs(e) + t, t);
        null != n && e.setCursor(e.posFromIndex(n))
    }

    function Ru(e, t, n) {
        const r = gs(e),
            o = r.length;
        let i = t;
        for (; i < o && i >= 0;) {
            i += n;
            const t = r[i],
                o = r[i + 1],
                s = r[i - 1];
            if (ks(t) && o === t && "=" === s) return i + 1;
            if ("<" === t && ">" === s) return i;
            if (Bu(t)) {
                const t = e.posFromIndex(i),
                    n = e.getLine(t.line);
                if (!n || Cs(n)) return e.indexFromPos({
                    line: t.line,
                    ch: n.length
                })
            }
        }
    }

    function Bu(e) {
        return "\r" === e || "\n" === e
    }

    function Uu(e) {
        let t = hs(e);
        const n = [t, Math.min(t + 1, e.getValue().length)];
        "<" === bs(e, n) && t++;
        const {
            syntax: r
        } = Ms(e, t);
        if (Rs(r)) {
            const n = wa(e, t, Vs(r));
            if (n && n.open && n.close) {
                const {
                    open: r,
                    close: o
                } = n, i = r[0] <= t && t < r[1] ? o[0] : r[0];
                e.setCursor(e.posFromIndex(i))
            }
        }
    }

    function Du(e, t = 1) {
        e.operation((() => {
            const n = e.listSelections().slice().reverse().map((n => {
                let r = As(e, n);
                if (Ns(r)) {
                    const t = e.getLine(n.anchor.line),
                        o = n.anchor.ch,
                        i = _u(t, o);
                    i && (r = [r[0] - o + i[0], r[0] - o + i[1]])
                }
                if (!Ns(r)) {
                    let o = Qu(bs(e, r), t);
                    ds(e, r, o), n = {
                        anchor: e.posFromIndex(r[0]),
                        head: e.posFromIndex(r[0] + o.length)
                    }
                }
                return n
            }));
            e.setSelections(n)
        }))
    }

    function _u(t, n) {
        let r, o = !1,
            i = n,
            s = n;
        const a = t.length;
        for (; i < a;) {
            if (r = t.charCodeAt(i), Hu(r)) {
                if (o) break;
                o = !0
            } else if (!e(r)) break;
            i++
        }
        for (; s >= 0;) {
            if (r = t.charCodeAt(s - 1), Hu(r)) {
                if (o) break;
                o = !0
            } else if (!e(r)) break;
            s--
        }
        if (s > 0 && "-" === t[s - 1] && s--, s !== i) return [s, i]
    }

    function Qu(e, t, n = 3) {
        const r = parseFloat(e) + t;
        if (isNaN(r)) return e;
        const o = r < 0;
        let i = Math.abs(r).toFixed(n);
        return i = i.replace(/\.?0+$/, ""), "." !== e[0] && !e.startsWith("-.") || "0" !== i[0] || (i = i.slice(1)), (o ? "-" : "") + i
    }

    function Hu(e) {
        return 46 === e
    }

    function Xu(e) {
        e.operation((() => {
            const t = e.listSelections().slice().reverse().map((t => {
                const n = wa(e, e.indexFromPos(t.anchor));
                if (n) {
                    Gu(e, n);
                    const t = e.posFromIndex(n.open[0]);
                    return {
                        anchor: t,
                        head: t
                    }
                }
                return t
            }));
            e.setSelections(t)
        }))
    }

    function Gu(e, {
        open: t,
        close: n
    }) {
        if (n) {
            const r = ms(e, [t[1], n[0]]);
            if (Ns(r)) ds(e, [t[0], n[1]], "");
            else {
                ds(e, [r[1], n[1]], "");
                const o = e.posFromIndex(t[0]),
                    i = e.posFromIndex(n[1]);
                if (o.line !== i.line) {
                    let n = o.line + 2;
                    const s = Zu(e, t[0]),
                        a = Zu(e, r[0]);
                    for (; n <= i.line;) {
                        const t = e.indexFromPos({
                                line: n,
                                ch: 0
                            }),
                            r = [t, t + a.length];
                        Cs(bs(e, r)) && (console.log('replace "%s" with "%s"', bs(e, r), s), ds(e, r, s)), n++
                    }
                }
                ds(e, [t[0], r[0]], "")
            }
        } else ds(e, t, "")
    }

    function Zu(e, t) {
        return da(e, e.posFromIndex(t).line)
    }

    function Yu(e, t = !1) {
        const n = Is(e);
        if (!Us(n) && !Rs(n)) return;
        const r = e.listSelections()[0],
            o = As(e, r),
            i = gs(e);
        let s = xa(i, o[0], Us(n), t);
        if (s) {
            let r = Ju(o, s.ranges, t);
            if (!r) {
                s = xa(i, t ? s.start : s.end, Us(n), t), s && (r = Ju(o, s.ranges, t))
            }
            if (r) {
                const [t, n] = vs(e, r);
                e.setSelection(t, n)
            }
        }
    }

    function Ju(e, t, n = !1) {
        n && (t = t.slice().reverse());
        let r, o = !1;
        for (const i of t) {
            if (o) return i;
            Es(i, e) ? o = !0 : !r && (Ts(i, e) || n && i[0] <= e[0] || !n && i[0] >= e[0]) && (r = i)
        }
        if (!o) return r
    }

    function Ku(e) {
        const t = e.listSelections().slice().reverse(),
            n = [];
        e.operation((() => {
            for (const r of t) {
                const t = e.indexFromPos(r.anchor),
                    {
                        syntax: o
                    } = Ms(e, t),
                    i = wa(e, t, Vs(o));
                if (i) {
                    const {
                        open: t,
                        close: r
                    } = i;
                    if (r) {
                        ds(e, [t[1], r[1]], "");
                        let o = Cs(ec(e, t[1] - 2)) ? "/" : " /";
                        ds(e, [t[1] - 1, t[1] - 1], o), n.push(tc(e, t[1] + o.length))
                    } else {
                        const r = `</${i.name}>`;
                        if (ds(e, [t[1], t[1]], r), "/" === ec(e, t[1] - 2)) {
                            let r = t[1] - 2,
                                o = t[1] - 1;
                            Cs(ec(e, r - 1)) && r--, ds(e, [r, o], ""), n.push(tc(e, t[1] - o + r))
                        } else n.push(tc(e, t[1]))
                    }
                } else n.push(r)
            }
            e.setSelections(n)
        }))
    }

    function ec(e, t) {
        return bs(e, [t, t + 1])
    }

    function tc(e, t) {
        const n = e.posFromIndex(t);
        return {
            anchor: n,
            head: n
        }
    }

    function nc(e) {
        Object.assign(e.commands, {
            emmetExpandAbbreviation: e => su(e, !0),
            emmetExpandAbbreviationAll: e => su(e, !1),
            emmetCaptureAbbreviation: lu,
            emmetResetAbbreviation: cu,
            emmetEnterAbbreviationMode: pu,
            emmetInsertLineBreak: fu,
            emmetWrapWithAbbreviation: gu,
            emmetBalance: wu,
            emmetBalanceInward: e => wu(e, !0),
            emmetToggleComment: Au,
            emmetEvaluateMath: Wu,
            emmetGoToNextEditPoint: e => Vu(e, 1),
            emmetGoToPreviousEditPoint: e => Vu(e, -1),
            emmetGoToTagPair: Uu,
            emmetIncrementNumber1: e => Du(e, 1),
            emmetIncrementNumber01: e => Du(e, .1),
            emmetIncrementNumber10: e => Du(e, 10),
            emmetDecrementNumber1: e => Du(e, -1),
            emmetDecrementNumber01: e => Du(e, -.1),
            emmetDecrementNumber10: e => Du(e, -10),
            emmetRemoveTag: Xu,
            emmetSelectNextItem: e => Yu(e),
            emmetSelectPreviousItem: e => Yu(e, !0),
            emmetSplitJoinTag: Ku
        }), e.defineOption("emmet", fc, ((e, t) => {
            qs(e) || (e.on("change", rc), e.on("change", oc));
            const n = Ls(e);
            (t = Ct(e, t)).mark && !n.tracker ? n.tracker = Sa(e) : !t.mark && n.tracker && (n.tracker(), n.tracker = null), t.markTagPairs && !n.tagMatch ? n.tagMatch = Ma(e) : !t.markTagPairs && n.tagMatch && (n.tagMatch(), n.tagMatch = null)
        })), e.defineMode("emmet-abbreviation", Ka), e.defineMode("emmet-css-abbreviation", tu), e.defineMode("emmet-snippet", ru), e.defineExtension("expandAbbreviation", (function(e, t = $a(this, 0)) {
            return ga(this, e, t)
        })), e.defineExtension("emmetOptions", (function(e = 0) {
            return $a(this, e)
        })), e.defineExtension("parseAbbreviation", (function(e, t) {
            return "stylesheet" === t ? st(Oe(e)) : g(Z(e), {
                jsx: "jsx" === t
            })
        })), e.defineExtension("getEmmetCompletion", (function(e) {
            return "number" != typeof e && (e = this.indexFromPos(e)), qa(this, e)
        }))
    }

    function rc(e, t) {
        if ("undo" === t.origin && 1 === t.text.length) {
            const n = e.indexFromPos(t.from);
            La(e, n, t.text[0])
        }
    }

    function oc(e, t) {
        if ("paste" === t.origin && 1 === t.text.length && Aa(e, e.indexFromPos(t.from))) {
            const n = e.indexFromPos(t.from) + t.text[0].length;
            Ta(e, n, !0)
        }
    }
    const ic = {
        escape: 92,
        throws: !1
    };
    class sc {
        constructor(e, t, n) {
            null == n && "string" == typeof e && (n = e.length), this.string = e, this.pos = this.start = t || 0, this.end = n || 0
        }
        eof() {
            return this.pos >= this.end
        }
        limit(e, t) {
            return new sc(this.string, e, t)
        }
        peek() {
            return this.string.charCodeAt(this.pos)
        }
        next() {
            if (this.pos < this.string.length) return this.string.charCodeAt(this.pos++)
        }
        eat(e) {
            const t = this.peek(),
                n = "function" == typeof e ? e(t) : t === e;
            return n && this.next(), n
        }
        eatWhile(e) {
            const t = this.pos;
            for (; !this.eof() && this.eat(e););
            return this.pos !== t
        }
        backUp(e) {
            this.pos -= e || 1
        }
        current() {
            return this.substring(this.start, this.pos)
        }
        substring(e, t) {
            return this.string.slice(e, t)
        }
        error(e, t = this.pos) {
            return new ac(`${e} at ${t+1}`, t, this.string)
        }
    }
    class ac extends Error {
        constructor(e, t, n) {
            super(e), this.pos = t, this.string = n
        }
    }
    const uc = {
            child: ">",
            class: ".",
            climb: "^",
            id: "#",
            equal: "=",
            close: "/",
            sibling: "+"
        },
        cc = {
            Literal: e => e.value,
            Quote: e => e.single ? "'" : '"',
            Bracket: e => "attribute" === e.context ? e.open ? "[" : "]" : "expression" === e.context ? e.open ? "{" : "}" : e.open ? "(" : "}",
            Operator: e => uc[e.operator],
            Field: (e, t) => null != e.index ? e.name ? `\${${e.index}:${e.name}}` : `\${${e.index}` : e.name ? t.getVariable(e.name) : "",
            RepeaterPlaceholder(e, t) {
                let n;
                for (let e = t.repeaters.length - 1; e >= 0; e--)
                    if (t.repeaters[e].implicit) {
                        n = t.repeaters[e];
                        break
                    }
                return t.inserted = !0, t.getText(n && n.value)
            },
            RepeaterNumber(e, t) {
                let n = 1;
                const r = t.repeaters.length - 1,
                    o = t.repeaters[r];
                if (o && (n = e.reverse ? e.base + o.count - o.value - 1 : e.base + o.value, e.parent)) {
                    const i = Math.max(0, r - e.parent);
                    if (i !== r) {
                        const e = t.repeaters[i];
                        n += o.count * e.value
                    }
                }
                let i = String(n);
                for (; i.length < e.size;) i = "0" + i;
                return i
            },
            WhiteSpace: e => e.value
        },
        lc = /^((https?:|ftp:|file:)?\/\/|(www|ftp)\.)[^ ]*$/,
        pc = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,5}$/,
        fc = {
            mark: !0,
            preview: !0,
            autoRenameTags: !0,
            markTagPairs: !0,
            previewOpenTag: !1,
            attributeQuotes: "double",
            markupStyle: "html",
            comments: !1,
            commentsTemplate: "<!-- /[#ID][.CLASS] -->",
            bem: !1
        },
        mc = {
            xml: !1,
            allTokens: !1,
            special: {
                style: null,
                script: ["", "text/javascript", "application/x-javascript", "javascript", "typescript", "ts", "coffee", "coffeescript"]
            },
            empty: ["img", "meta", "link", "br", "base", "hr", "area", "wbr", "col", "embed", "input", "param", "source", "track"]
        },
        dc = {
            throws: !1
        },
        hc = jt("<![CDATA["),
        gc = jt("]]>"),
        bc = jt("<!--"),
        vc = jt("-->"),
        yc = jt("<?"),
        xc = jt("?>"),
        kc = jt("<%"),
        wc = jt("%>"),
        $c = [43, 47, 42, 44],
        Cc = {
            p: "span",
            ul: "li",
            ol: "li",
            table: "tr",
            tr: "td",
            tbody: "tr",
            thead: "tr",
            tfoot: "tr",
            colgroup: "col",
            select: "option",
            optgroup: "option",
            audio: "source",
            video: "source",
            object: "param",
            map: "area"
        };
    const Sc = {
            ru: {
                common: ["\u0434\u0430\u043b\u0435\u043a\u043e-\u0434\u0430\u043b\u0435\u043a\u043e", "\u0437\u0430", "\u0441\u043b\u043e\u0432\u0435\u0441\u043d\u044b\u043c\u0438", "\u0433\u043e\u0440\u0430\u043c\u0438", "\u0432 \u0441\u0442\u0440\u0430\u043d\u0435", "\u0433\u043b\u0430\u0441\u043d\u044b\u0445", "\u0438 \u0441\u043e\u0433\u043b\u0430\u0441\u043d\u044b\u0445", "\u0436\u0438\u0432\u0443\u0442", "\u0440\u044b\u0431\u043d\u044b\u0435", "\u0442\u0435\u043a\u0441\u0442\u044b"],
                words: ["\u0432\u0434\u0430\u043b\u0438", "\u043e\u0442 \u0432\u0441\u0435\u0445", "\u043e\u043d\u0438", "\u0431\u0443\u043a\u0432\u0435\u043d\u043d\u044b\u0445", "\u0434\u043e\u043c\u0430\u0445", "\u043d\u0430 \u0431\u0435\u0440\u0435\u0433\u0443", "\u0441\u0435\u043c\u0430\u043d\u0442\u0438\u043a\u0430", "\u0431\u043e\u043b\u044c\u0448\u043e\u0433\u043e", "\u044f\u0437\u044b\u043a\u043e\u0432\u043e\u0433\u043e", "\u043e\u043a\u0435\u0430\u043d\u0430", "\u043c\u0430\u043b\u0435\u043d\u044c\u043a\u0438\u0439", "\u0440\u0443\u0447\u0435\u0435\u043a", "\u0434\u0430\u043b\u044c", "\u0436\u0443\u0440\u0447\u0438\u0442", "\u043f\u043e \u0432\u0441\u0435\u0439", "\u043e\u0431\u0435\u0441\u043f\u0435\u0447\u0438\u0432\u0430\u0435\u0442", "\u0435\u0435", "\u0432\u0441\u0435\u043c\u0438", "\u043d\u0435\u043e\u0431\u0445\u043e\u0434\u0438\u043c\u044b\u043c\u0438", "\u043f\u0440\u0430\u0432\u0438\u043b\u0430\u043c\u0438", "\u044d\u0442\u0430", "\u043f\u0430\u0440\u0430\u0434\u0438\u0433\u043c\u0430\u0442\u0438\u0447\u0435\u0441\u043a\u0430\u044f", "\u0441\u0442\u0440\u0430\u043d\u0430", "\u043a\u043e\u0442\u043e\u0440\u043e\u0439", "\u0436\u0430\u0440\u0435\u043d\u043d\u044b\u0435", "\u043f\u0440\u0435\u0434\u043b\u043e\u0436\u0435\u043d\u0438\u044f", "\u0437\u0430\u043b\u0435\u0442\u0430\u044e\u0442", "\u043f\u0440\u044f\u043c\u043e", "\u0440\u043e\u0442", "\u0434\u0430\u0436\u0435", "\u0432\u0441\u0435\u043c\u043e\u0433\u0443\u0449\u0430\u044f", "\u043f\u0443\u043d\u043a\u0442\u0443\u0430\u0446\u0438\u044f", "\u043d\u0435", "\u0438\u043c\u0435\u0435\u0442", "\u0432\u043b\u0430\u0441\u0442\u0438", "\u043d\u0430\u0434", "\u0440\u044b\u0431\u043d\u044b\u043c\u0438", "\u0442\u0435\u043a\u0441\u0442\u0430\u043c\u0438", "\u0432\u0435\u0434\u0443\u0449\u0438\u043c\u0438", "\u0431\u0435\u0437\u043e\u0440\u0444\u043e\u0433\u0440\u0430\u0444\u0438\u0447\u043d\u044b\u0439", "\u043e\u0431\u0440\u0430\u0437", "\u0436\u0438\u0437\u043d\u0438", "\u043e\u0434\u043d\u0430\u0436\u0434\u044b", "\u043e\u0434\u043d\u0430", "\u043c\u0430\u043b\u0435\u043d\u044c\u043a\u0430\u044f", "\u0441\u0442\u0440\u043e\u0447\u043a\u0430", "\u0440\u044b\u0431\u043d\u043e\u0433\u043e", "\u0442\u0435\u043a\u0441\u0442\u0430", "\u0438\u043c\u0435\u043d\u0438", "lorem", "ipsum", "\u0440\u0435\u0448\u0438\u043b\u0430", "\u0432\u044b\u0439\u0442\u0438", "\u0431\u043e\u043b\u044c\u0448\u043e\u0439", "\u043c\u0438\u0440", "\u0433\u0440\u0430\u043c\u043c\u0430\u0442\u0438\u043a\u0438", "\u0432\u0435\u043b\u0438\u043a\u0438\u0439", "\u043e\u043a\u0441\u043c\u043e\u043a\u0441", "\u043f\u0440\u0435\u0434\u0443\u043f\u0440\u0435\u0436\u0434\u0430\u043b", "\u043e", "\u0437\u043b\u044b\u0445", "\u0437\u0430\u043f\u044f\u0442\u044b\u0445", "\u0434\u0438\u043a\u0438\u0445", "\u0437\u043d\u0430\u043a\u0430\u0445", "\u0432\u043e\u043f\u0440\u043e\u0441\u0430", "\u043a\u043e\u0432\u0430\u0440\u043d\u044b\u0445", "\u0442\u043e\u0447\u043a\u0430\u0445", "\u0437\u0430\u043f\u044f\u0442\u043e\u0439", "\u043d\u043e", "\u0442\u0435\u043a\u0441\u0442", "\u0434\u0430\u043b", "\u0441\u0431\u0438\u0442\u044c", "\u0441\u0435\u0431\u044f", "\u0442\u043e\u043b\u043a\u0443", "\u043e\u043d", "\u0441\u043e\u0431\u0440\u0430\u043b", "\u0441\u0435\u043c\u044c", "\u0441\u0432\u043e\u0438\u0445", "\u0437\u0430\u0433\u043b\u0430\u0432\u043d\u044b\u0445", "\u0431\u0443\u043a\u0432", "\u043f\u043e\u0434\u043f\u043e\u044f\u0441\u0430\u043b", "\u0438\u043d\u0438\u0446\u0438\u0430\u043b", "\u0437\u0430", "\u043f\u043e\u044f\u0441", "\u043f\u0443\u0441\u0442\u0438\u043b\u0441\u044f", "\u0434\u043e\u0440\u043e\u0433\u0443", "\u0432\u0437\u043e\u0431\u0440\u0430\u0432\u0448\u0438\u0441\u044c", "\u043f\u0435\u0440\u0432\u0443\u044e", "\u0432\u0435\u0440\u0448\u0438\u043d\u0443", "\u043a\u0443\u0440\u0441\u0438\u0432\u043d\u044b\u0445", "\u0433\u043e\u0440", "\u0431\u0440\u043e\u0441\u0438\u043b", "\u043f\u043e\u0441\u043b\u0435\u0434\u043d\u0438\u0439", "\u0432\u0437\u0433\u043b\u044f\u0434", "\u043d\u0430\u0437\u0430\u0434", "\u0441\u0438\u043b\u0443\u044d\u0442", "\u0441\u0432\u043e\u0435\u0433\u043e", "\u0440\u043e\u0434\u043d\u043e\u0433\u043e", "\u0433\u043e\u0440\u043e\u0434\u0430", "\u0431\u0443\u043a\u0432\u043e\u0433\u0440\u0430\u0434", "\u0437\u0430\u0433\u043e\u043b\u043e\u0432\u043e\u043a", "\u0434\u0435\u0440\u0435\u0432\u043d\u0438", "\u0430\u043b\u0444\u0430\u0432\u0438\u0442", "\u043f\u043e\u0434\u0437\u0430\u0433\u043e\u043b\u043e\u0432\u043e\u043a", "\u0441\u0432\u043e\u0435\u0433\u043e", "\u043f\u0435\u0440\u0435\u0443\u043b\u043a\u0430", "\u0433\u0440\u0443\u0441\u0442\u043d\u044b\u0439", "\u0440\u0435\u0442\u043e\u0440\u0438\u0447\u0435\u0441\u043a\u0438\u0439", "\u0432\u043e\u043f\u0440\u043e\u0441", "\u0441\u043a\u0430\u0442\u0438\u043b\u0441\u044f", "\u0435\u0433\u043e", "\u0449\u0435\u043a\u0435", "\u043f\u0440\u043e\u0434\u043e\u043b\u0436\u0438\u043b", "\u0441\u0432\u043e\u0439", "\u043f\u0443\u0442\u044c", "\u0434\u043e\u0440\u043e\u0433\u0435", "\u0432\u0441\u0442\u0440\u0435\u0442\u0438\u043b", "\u0440\u0443\u043a\u043e\u043f\u0438\u0441\u044c", "\u043e\u043d\u0430", "\u043f\u0440\u0435\u0434\u0443\u043f\u0440\u0435\u0434\u0438\u043b\u0430", "\u043c\u043e\u0435\u0439", "\u0432\u0441\u0435", "\u043f\u0435\u0440\u0435\u043f\u0438\u0441\u044b\u0432\u0430\u0435\u0442\u0441\u044f", "\u043d\u0435\u0441\u043a\u043e\u043b\u044c\u043a\u043e", "\u0440\u0430\u0437", "\u0435\u0434\u0438\u043d\u0441\u0442\u0432\u0435\u043d\u043d\u043e\u0435", "\u0447\u0442\u043e", "\u043c\u0435\u043d\u044f", "\u043e\u0441\u0442\u0430\u043b\u043e\u0441\u044c", "\u044d\u0442\u043e", "\u043f\u0440\u0438\u0441\u0442\u0430\u0432\u043a\u0430", "\u0432\u043e\u0437\u0432\u0440\u0430\u0449\u0430\u0439\u0441\u044f", "\u0442\u044b", "\u043b\u0443\u0447\u0448\u0435", "\u0441\u0432\u043e\u044e", "\u0431\u0435\u0437\u043e\u043f\u0430\u0441\u043d\u0443\u044e", "\u0441\u0442\u0440\u0430\u043d\u0443", "\u043f\u043e\u0441\u043b\u0443\u0448\u0430\u0432\u0448\u0438\u0441\u044c", "\u0440\u0443\u043a\u043e\u043f\u0438\u0441\u0438", "\u043d\u0430\u0448", "\u043f\u0440\u043e\u0434\u043e\u043b\u0436\u0438\u043b", "\u0441\u0432\u043e\u0439", "\u043f\u0443\u0442\u044c", "\u0432\u0441\u043a\u043e\u0440\u0435", "\u0435\u043c\u0443", "\u043f\u043e\u0432\u0441\u0442\u0440\u0435\u0447\u0430\u043b\u0441\u044f", "\u043a\u043e\u0432\u0430\u0440\u043d\u044b\u0439", "\u0441\u043e\u0441\u0442\u0430\u0432\u0438\u0442\u0435\u043b\u044c", "\u0440\u0435\u043a\u043b\u0430\u043c\u043d\u044b\u0445", "\u0442\u0435\u043a\u0441\u0442\u043e\u0432", "\u043d\u0430\u043f\u043e\u0438\u0432\u0448\u0438\u0439", "\u044f\u0437\u044b\u043a\u043e\u043c", "\u0440\u0435\u0447\u044c\u044e", "\u0437\u0430\u043c\u0430\u043d\u0438\u0432\u0448\u0438\u0439", "\u0441\u0432\u043e\u0435", "\u0430\u0433\u0435\u043d\u0442\u0441\u0442\u0432\u043e", "\u043a\u043e\u0442\u043e\u0440\u043e\u0435", "\u0438\u0441\u043f\u043e\u043b\u044c\u0437\u043e\u0432\u0430\u043b\u043e", "\u0441\u043d\u043e\u0432\u0430", "\u0441\u043d\u043e\u0432\u0430", "\u0441\u0432\u043e\u0438\u0445", "\u043f\u0440\u043e\u0435\u043a\u0442\u0430\u0445", "\u0435\u0441\u043b\u0438", "\u043f\u0435\u0440\u0435\u043f\u0438\u0441\u0430\u043b\u0438", "\u0442\u043e", "\u0436\u0438\u0432\u0435\u0442", "\u0442\u0430\u043c", "\u0434\u043e", "\u0441\u0438\u0445", "\u043f\u043e\u0440"]
            },
            sp: {
                common: ["mujer", "uno", "dolor", "m\xe1s", "de", "poder", "mismo", "si"],
                words: ["ejercicio", "preferencia", "perspicacia", "laboral", "pa\xf1o", "suntuoso", "molde", "namibia", "planeador", "mirar", "dem\xe1s", "oficinista", "excepci\xf3n", "odio", "consecuencia", "casi", "auto", "chicharra", "velo", "elixir", "ataque", "no", "odio", "temporal", "cu\xf3rum", "dign\xedsimo", "facilismo", "letra", "nihilista", "expedici\xf3n", "alma", "alveolar", "aparte", "le\xf3n", "animal", "como", "paria", "belleza", "modo", "natividad", "justo", "ataque", "s\xe9quito", "pillo", "sed", "ex", "y", "voluminoso", "temporalidad", "verdades", "racional", "asunci\xf3n", "incidente", "marejada", "placenta", "amanecer", "fuga", "previsor", "presentaci\xf3n", "lejos", "necesariamente", "sospechoso", "adiposidad", "quind\xedo", "p\xf3cima", "voluble", "d\xe9bito", "sinti\xf3", "accesorio", "falda", "sapiencia", "volutas", "queso", "permacultura", "laudo", "soluciones", "entero", "pan", "litro", "tonelada", "culpa", "libertario", "mosca", "dictado", "reincidente", "nascimiento", "dolor", "escolar", "impedimento", "m\xednima", "mayores", "repugnante", "dulce", "obcecado", "monta\xf1a", "enigma", "total", "delet\xe9reo", "d\xe9cima", "c\xe1bala", "fotograf\xeda", "dolores", "molesto", "olvido", "paciencia", "resiliencia", "voluntad", "molestias", "magn\xedfico", "distinci\xf3n", "ovni", "marejada", "cerro", "torre", "y", "abogada", "manantial", "corporal", "agua", "crep\xfasculo", "ataque", "desierto", "laboriosamente", "angustia", "afortunado", "alma", "encefalograma", "materialidad", "cosas", "o", "renuncia", "error", "menos", "conejo", "abad\xeda", "analfabeto", "remo", "fugacidad", "oficio", "en", "alm\xe1cigo", "vos", "pan", "represi\xf3n", "n\xfameros", "triste", "refugiado", "trote", "inventor", "corchea", "repelente", "magma", "recusado", "patr\xf3n", "expl\xedcito", "paloma", "s\xedndrome", "inmune", "autoinmune", "comodidad", "ley", "vietnamita", "demonio", "tasmania", "repeler", "ap\xe9ndice", "arquitecto", "columna", "yugo", "computador", "mula", "a", "prop\xf3sito", "fantas\xeda", "alias", "rayo", "tenedor", "deleznable", "ventana", "cara", "anemia", "corrupto"]
            },
            latin: {
                common: ["lorem", "ipsum", "dolor", "sit", "amet", "consectetur", "adipisicing", "elit"],
                words: ["exercitationem", "perferendis", "perspiciatis", "laborum", "eveniet", "sunt", "iure", "nam", "nobis", "eum", "cum", "officiis", "excepturi", "odio", "consectetur", "quasi", "aut", "quisquam", "vel", "eligendi", "itaque", "non", "odit", "tempore", "quaerat", "dignissimos", "facilis", "neque", "nihil", "expedita", "vitae", "vero", "ipsum", "nisi", "animi", "cumque", "pariatur", "velit", "modi", "natus", "iusto", "eaque", "sequi", "illo", "sed", "ex", "et", "voluptatibus", "tempora", "veritatis", "ratione", "assumenda", "incidunt", "nostrum", "placeat", "aliquid", "fuga", "provident", "praesentium", "rem", "necessitatibus", "suscipit", "adipisci", "quidem", "possimus", "voluptas", "debitis", "sint", "accusantium", "unde", "sapiente", "voluptate", "qui", "aspernatur", "laudantium", "soluta", "amet", "quo", "aliquam", "saepe", "culpa", "libero", "ipsa", "dicta", "reiciendis", "nesciunt", "doloribus", "autem", "impedit", "minima", "maiores", "repudiandae", "ipsam", "obcaecati", "ullam", "enim", "totam", "delectus", "ducimus", "quis", "voluptates", "dolores", "molestiae", "harum", "dolorem", "quia", "voluptatem", "molestias", "magni", "distinctio", "omnis", "illum", "dolorum", "voluptatum", "ea", "quas", "quam", "corporis", "quae", "blanditiis", "atque", "deserunt", "laboriosam", "earum", "consequuntur", "hic", "cupiditate", "quibusdam", "accusamus", "ut", "rerum", "error", "minus", "eius", "ab", "ad", "nemo", "fugit", "officia", "at", "in", "id", "quos", "reprehenderit", "numquam", "iste", "fugiat", "sit", "inventore", "beatae", "repellendus", "magnam", "recusandae", "quod", "explicabo", "doloremque", "aperiam", "consequatur", "asperiores", "commodi", "optio", "dolor", "labore", "temporibus", "repellat", "veniam", "architecto", "est", "esse", "mollitia", "nulla", "a", "similique", "eos", "alias", "dolore", "tenetur", "deleniti", "porro", "facere", "maxime", "corrupti"]
            }
        },
        jc = /^lorem([a-z]*)(\d*)(-\d*)?$/i,
        Ac = /^(-+)([a-z0-9]+[a-z0-9-]*)/i,
        Ec = /^(_+)([a-z0-9]+[a-z0-9-_]*)/i,
        Tc = e => /^[a-z]\-/i.test(e),
        Nc = e => /^[a-z]/i.test(e),
        Oc = [{
            type: "Field",
            index: 0,
            name: ""
        }],
        Fc = /^<([\w\-:]+)[\s>]/,
        qc = {
            html: Vr,
            haml: ro,
            slim: oo,
            pug: io
        },
        Lc = /^([a-z-]+)(?:\s*:\s*([^\n\r;]+?);*)?$/,
        zc = {
            value: !0
        },
        Mc = "lg";
    var Pc = {
            "@f": "@font-face {\n\tfont-family: ${1};\n\tsrc: url(${2});\n}",
            "@ff": "@font-face {\n\tfont-family: '${1:FontName}';\n\tsrc: url('${2:FileName}.eot');\n\tsrc: url('${2:FileName}.eot?#iefix') format('embedded-opentype'),\n\t\t url('${2:FileName}.woff') format('woff'),\n\t\t url('${2:FileName}.ttf') format('truetype'),\n\t\t url('${2:FileName}.svg#${1:FontName}') format('svg');\n\tfont-style: ${3:normal};\n\tfont-weight: ${4:normal};\n}",
            "@i|@import": "@import url(${0});",
            "@kf": "@keyframes ${1:identifier} {\n\t${2}\n}",
            "@m|@media": "@media ${1:screen} {\n\t${0}\n}",
            ac: "align-content:start|end|flex-start|flex-end|center|space-between|space-around|stretch|space-evenly",
            ai: "align-items:start|end|flex-start|flex-end|center|baseline|stretch",
            anim: "animation:${1:name} ${2:duration} ${3:timing-function} ${4:delay} ${5:iteration-count} ${6:direction} ${7:fill-mode}",
            animdel: "animation-delay:time",
            animdir: "animation-direction:normal|reverse|alternate|alternate-reverse",
            animdur: "animation-duration:${1:0}s",
            animfm: "animation-fill-mode:both|forwards|backwards",
            animic: "animation-iteration-count:1|infinite",
            animn: "animation-name",
            animps: "animation-play-state:running|paused",
            animtf: "animation-timing-function:linear|ease|ease-in|ease-out|ease-in-out|cubic-bezier(${1:0.1}, ${2:0.7}, ${3:1.0}, ${3:0.1})",
            ap: "appearance:none",
            as: "align-self:start|end|auto|flex-start|flex-end|center|baseline|stretch",
            b: "bottom",
            bd: "border:${1:1px} ${2:solid} ${3:#000}",
            bdb: "border-bottom:${1:1px} ${2:solid} ${3:#000}",
            bdbc: "border-bottom-color:${1:#000}",
            bdbi: "border-bottom-image:url(${0})",
            bdbk: "border-break:close",
            bdbli: "border-bottom-left-image:url(${0})|continue",
            bdblrs: "border-bottom-left-radius",
            bdbri: "border-bottom-right-image:url(${0})|continue",
            bdbrrs: "border-bottom-right-radius",
            bdbs: "border-bottom-style",
            bdbw: "border-bottom-width",
            bdc: "border-color:${1:#000}",
            bdci: "border-corner-image:url(${0})|continue",
            bdcl: "border-collapse:collapse|separate",
            bdf: "border-fit:repeat|clip|scale|stretch|overwrite|overflow|space",
            bdi: "border-image:url(${0})",
            bdl: "border-left:${1:1px} ${2:solid} ${3:#000}",
            bdlc: "border-left-color:${1:#000}",
            bdlen: "border-length",
            bdli: "border-left-image:url(${0})",
            bdls: "border-left-style",
            bdlw: "border-left-width",
            bdr: "border-right:${1:1px} ${2:solid} ${3:#000}",
            bdrc: "border-right-color:${1:#000}",
            bdri: "border-right-image:url(${0})",
            bdrs: "border-radius",
            bdrst: "border-right-style",
            bdrw: "border-right-width",
            bds: "border-style:none|hidden|dotted|dashed|solid|double|dot-dash|dot-dot-dash|wave|groove|ridge|inset|outset",
            bdsp: "border-spacing",
            bdt: "border-top:${1:1px} ${2:solid} ${3:#000}",
            bdtc: "border-top-color:${1:#000}",
            bdti: "border-top-image:url(${0})",
            bdtli: "border-top-left-image:url(${0})|continue",
            bdtlrs: "border-top-left-radius",
            bdtri: "border-top-right-image:url(${0})|continue",
            bdtrrs: "border-top-right-radius",
            bdts: "border-top-style",
            bdtw: "border-top-width",
            bdw: "border-width",
            bfv: "backface-visibility:hidden|visible",
            bg: "background:${1:#000}",
            bga: "background-attachment:fixed|scroll",
            bgbk: "background-break:bounding-box|each-box|continuous",
            bgc: "background-color:#${1:fff}",
            bgcp: "background-clip:padding-box|border-box|content-box|no-clip",
            bgi: "background-image:url(${0})",
            bgo: "background-origin:padding-box|border-box|content-box",
            bgp: "background-position:${1:0} ${2:0}",
            bgpx: "background-position-x",
            bgpy: "background-position-y",
            bgr: "background-repeat:no-repeat|repeat-x|repeat-y|space|round",
            bgsz: "background-size:contain|cover",
            bxsh: "box-shadow:${1:inset }${2:hoff} ${3:voff} ${4:blur} ${5:#000}|none",
            bxsz: "box-sizing:border-box|content-box|border-box",
            c: "color:${1:#000}",
            cr: "color:rgb(${1:0}, ${2:0}, ${3:0})",
            cra: "color:rgba(${1:0}, ${2:0}, ${3:0}, ${4:.5})",
            cl: "clear:both|left|right|none",
            cm: "/* ${0} */",
            cnt: "content:'${0}'|normal|open-quote|no-open-quote|close-quote|no-close-quote|attr(${0})|counter(${0})|counters(${0})",
            coi: "counter-increment",
            colm: "columns",
            colmc: "column-count",
            colmf: "column-fill",
            colmg: "column-gap",
            colmr: "column-rule",
            colmrc: "column-rule-color",
            colmrs: "column-rule-style",
            colmrw: "column-rule-width",
            colms: "column-span",
            colmw: "column-width",
            cor: "counter-reset",
            cp: "clip:auto|rect(${1:top} ${2:right} ${3:bottom} ${4:left})",
            cps: "caption-side:top|bottom",
            cur: "cursor:pointer|auto|default|crosshair|hand|help|move|pointer|text",
            d: "display:block|none|flex|inline-flex|inline|inline-block|grid|inline-grid|subgrid|list-item|run-in|compact|table|inline-table|table-caption|table-column|table-column-group|table-header-group|table-footer-group|table-row|table-row-group|table-cell|ruby|ruby-base|ruby-base-group|ruby-text|ruby-text-group",
            ec: "empty-cells:show|hide",
            f: "font:${1:1em} ${2:sans-serif}",
            fd: "font-display:auto|block|swap|fallback|optional",
            fef: "font-effect:none|engrave|emboss|outline",
            fem: "font-emphasize",
            femp: "font-emphasize-position:before|after",
            fems: "font-emphasize-style:none|accent|dot|circle|disc",
            ff: "font-family:serif|sans-serif|cursive|fantasy|monospace",
            fft: 'font-family:"Times New Roman", Times, Baskerville, Georgia, serif',
            ffa: 'font-family:Arial, "Helvetica Neue", Helvetica, sans-serif',
            ffv: "font-family:Verdana, Geneva, sans-serif",
            fl: "float:left|right|none",
            fs: "font-style:italic|normal|oblique",
            fsm: "font-smoothing:antialiased|subpixel-antialiased|none",
            fst: "font-stretch:normal|ultra-condensed|extra-condensed|condensed|semi-condensed|semi-expanded|expanded|extra-expanded|ultra-expanded",
            fv: "font-variant:normal|small-caps",
            fvs: "font-variation-settings:normal|inherit|initial|unset",
            fw: "font-weight:normal|bold|bolder|lighter",
            fx: "flex",
            fxb: "flex-basis:fill|max-content|min-content|fit-content|content",
            fxd: "flex-direction:row|row-reverse|column|column-reverse",
            fxf: "flex-flow",
            fxg: "flex-grow",
            fxsh: "flex-shrink",
            fxw: "flex-wrap:nowrap|wrap|wrap-reverse",
            fsz: "font-size",
            fsza: "font-size-adjust",
            gtc: "grid-template-columns:repeat()|minmax()",
            gtr: "grid-template-rows:repeat()|minmax()",
            gta: "grid-template-areas",
            gt: "grid-template",
            gg: "grid-gap",
            gcg: "grid-column-gap",
            grg: "grid-row-gap",
            gac: "grid-auto-columns:auto|minmax()",
            gar: "grid-auto-rows:auto|minmax()",
            gaf: "grid-auto-flow:row|column|dense|inherit|initial|unset",
            gd: "grid",
            gc: "grid-column",
            gcs: "grid-column-start",
            gce: "grid-column-end",
            gr: "grid-row",
            grs: "grid-row-start",
            gre: "grid-row-end",
            ga: "grid-area",
            h: "height",
            jc: "justify-content:start|end|stretch|flex-start|flex-end|center|space-between|space-around|space-evenly",
            ji: "justify-items:start|end|center|stretch",
            js: "justify-self:start|end|center|stretch",
            l: "left",
            lg: "background-image:linear-gradient(${1})",
            lh: "line-height",
            lis: "list-style",
            lisi: "list-style-image",
            lisp: "list-style-position:inside|outside",
            list: "list-style-type:disc|circle|square|decimal|decimal-leading-zero|lower-roman|upper-roman",
            lts: "letter-spacing:normal",
            m: "margin",
            mah: "max-height",
            mar: "max-resolution",
            maw: "max-width",
            mb: "margin-bottom",
            mih: "min-height",
            mir: "min-resolution",
            miw: "min-width",
            ml: "margin-left",
            mr: "margin-right",
            mt: "margin-top",
            ol: "outline",
            olc: "outline-color:${1:#000}|invert",
            olo: "outline-offset",
            ols: "outline-style:none|dotted|dashed|solid|double|groove|ridge|inset|outset",
            olw: "outline-width|thin|medium|thick",
            "op|opa": "opacity",
            ord: "order",
            ori: "orientation:landscape|portrait",
            orp: "orphans",
            ov: "overflow:hidden|visible|hidden|scroll|auto",
            ovs: "overflow-style:scrollbar|auto|scrollbar|panner|move|marquee",
            ovx: "overflow-x:hidden|visible|hidden|scroll|auto",
            ovy: "overflow-y:hidden|visible|hidden|scroll|auto",
            p: "padding",
            pb: "padding-bottom",
            pgba: "page-break-after:auto|always|left|right",
            pgbb: "page-break-before:auto|always|left|right",
            pgbi: "page-break-inside:auto|avoid",
            pl: "padding-left",
            pos: "position:relative|absolute|relative|fixed|static",
            pr: "padding-right",
            pt: "padding-top",
            q: "quotes",
            qen: "quotes:'\\201C' '\\201D' '\\2018' '\\2019'",
            qru: "quotes:'\\00AB' '\\00BB' '\\201E' '\\201C'",
            r: "right",
            rsz: "resize:none|both|horizontal|vertical",
            t: "top",
            ta: "text-align:left|center|right|justify",
            tal: "text-align-last:left|center|right",
            tbl: "table-layout:fixed",
            td: "text-decoration:none|underline|overline|line-through",
            te: "text-emphasis:none|accent|dot|circle|disc|before|after",
            th: "text-height:auto|font-size|text-size|max-size",
            ti: "text-indent",
            tj: "text-justify:auto|inter-word|inter-ideograph|inter-cluster|distribute|kashida|tibetan",
            to: "text-outline:${1:0} ${2:0} ${3:#000}",
            tov: "text-overflow:ellipsis|clip",
            tr: "text-replace",
            trf: "transform:${1}|skewX(${1:angle})|skewY(${1:angle})|scale(${1:x}, ${2:y})|scaleX(${1:x})|scaleY(${1:y})|scaleZ(${1:z})|scale3d(${1:x}, ${2:y}, ${3:z})|rotate(${1:angle})|rotateX(${1:angle})|rotateY(${1:angle})|rotateZ(${1:angle})|translate(${1:x}, ${2:y})|translateX(${1:x})|translateY(${1:y})|translateZ(${1:z})|translate3d(${1:tx}, ${2:ty}, ${3:tz})",
            trfo: "transform-origin",
            trfs: "transform-style:preserve-3d",
            trs: "transition:${1:prop} ${2:time}",
            trsde: "transition-delay:${1:time}",
            trsdu: "transition-duration:${1:time}",
            trsp: "transition-property:${1:prop}",
            trstf: "transition-timing-function:${1:fn}",
            tsh: "text-shadow:${1:hoff} ${2:voff} ${3:blur} ${4:#000}",
            tt: "text-transform:uppercase|lowercase|capitalize|none",
            tw: "text-wrap:none|normal|unrestricted|suppress",
            us: "user-select:none",
            v: "visibility:hidden|visible|collapse",
            va: "vertical-align:top|super|text-top|middle|baseline|bottom|text-bottom|sub",
            w: "width",
            whs: "white-space:nowrap|pre|pre-wrap|pre-line|normal",
            whsc: "white-space-collapse:normal|keep-all|loose|break-strict|break-all",
            wid: "widows",
            wm: "writing-mode:lr-tb|lr-tb|lr-bt|rl-tb|rl-bt|tb-rl|tb-lr|bt-lr|bt-rl",
            wob: "word-break:normal|keep-all|break-all",
            wos: "word-spacing",
            wow: "word-wrap:none|unrestricted|suppress|break-word|normal",
            z: "z-index",
            zom: "zoom:1"
        },
        Ic = {
            "tm|tmatch": "xsl:template[match mode]",
            "tn|tname": "xsl:template[name]",
            call: "xsl:call-template[name]",
            ap: "xsl:apply-templates[select mode]",
            api: "xsl:apply-imports",
            imp: "xsl:import[href]",
            inc: "xsl:include[href]",
            ch: "xsl:choose",
            "wh|xsl:when": "xsl:when[test]",
            ot: "xsl:otherwise",
            if: "xsl:if[test]",
            par: "xsl:param[name]",
            pare: "xsl:param[name select]",
            var: "xsl:variable[name]",
            vare: "xsl:variable[name select]",
            wp: "xsl:with-param[name select]",
            key: "xsl:key[name match use]",
            elem: "xsl:element[name]",
            attr: "xsl:attribute[name]",
            attrs: "xsl:attribute-set[name]",
            cp: "xsl:copy[select]",
            co: "xsl:copy-of[select]",
            val: "xsl:value-of[select]",
            "for|each": "xsl:for-each[select]",
            tex: "xsl:text",
            com: "xsl:comment",
            msg: "xsl:message[terminate=no]",
            fall: "xsl:fallback",
            num: "xsl:number[value]",
            nam: "namespace-alias[stylesheet-prefix result-prefix]",
            pres: "xsl:preserve-space[elements]",
            strip: "xsl:strip-space[elements]",
            proc: "xsl:processing-instruction[name]",
            sort: "xsl:sort[select order]",
            choose: "xsl:choose>xsl:when+xsl:otherwise",
            xsl: "!!!+xsl:stylesheet[version=1.0 xmlns:xsl=http://www.w3.org/1999/XSL/Transform]>{\n|}",
            "!!!": '{<?xml version="1.0" encoding="UTF-8"?>}'
        },
        Wc = {
            "!!!": "{doctype html}"
        };
    const Vc = {
            markup: "html",
            stylesheet: "css"
        },
        Rc = {
            inlineElements: ["a", "abbr", "acronym", "applet", "b", "basefont", "bdo", "big", "br", "button", "cite", "code", "del", "dfn", "em", "font", "i", "iframe", "img", "input", "ins", "kbd", "label", "map", "object", "q", "s", "samp", "select", "small", "span", "strike", "strong", "sub", "sup", "textarea", "tt", "u", "var"],
            "output.indent": "\t",
            "output.baseIndent": "",
            "output.newline": "\n",
            "output.tagCase": "",
            "output.attributeCase": "",
            "output.attributeQuotes": "double",
            "output.format": !0,
            "output.formatLeafNode": !1,
            "output.formatSkip": ["html"],
            "output.formatForce": ["body"],
            "output.inlineBreak": 3,
            "output.compactBoolean": !1,
            "output.booleanAttributes": ["contenteditable", "seamless", "async", "autofocus", "autoplay", "checked", "controls", "defer", "disabled", "formnovalidate", "hidden", "ismap", "loop", "multiple", "muted", "novalidate", "readonly", "required", "reversed", "selected", "typemustmatch"],
            "output.reverseAttributes": !1,
            "output.selfClosingStyle": "html",
            "output.field": (e, t) => t,
            "output.text": e => e,
            "markup.href": !0,
            "comment.enabled": !1,
            "comment.trigger": ["id", "class"],
            "comment.before": "",
            "comment.after": "\n<!-- /[#ID][.CLASS] -->",
            "bem.enabled": !1,
            "bem.element": "__",
            "bem.modifier": "_",
            "jsx.enabled": !1,
            "stylesheet.keywords": ["auto", "inherit", "unset", "none"],
            "stylesheet.unitless": ["z-index", "line-height", "opacity", "font-weight", "zoom", "flex", "flex-grow", "flex-shrink"],
            "stylesheet.shortHex": !0,
            "stylesheet.between": ": ",
            "stylesheet.after": ";",
            "stylesheet.intUnit": "px",
            "stylesheet.floatUnit": "em",
            "stylesheet.unitAliases": {
                e: "em",
                p: "%",
                x: "ex",
                r: "rem"
            },
            "stylesheet.json": !1,
            "stylesheet.jsonDoubleQuotes": !1,
            "stylesheet.fuzzySearchMinScore": 0
        },
        Bc = {
            type: "markup",
            syntax: "html",
            variables: {
                lang: "en",
                locale: "en-US",
                charset: "UTF-8",
                indentation: "\t",
                newline: "\n"
            },
            snippets: {},
            options: Rc
        },
        Uc = {
            markup: {
                snippets: ei({
                    a: "a[href]",
                    "a:blank": "a[href='http://${0}' target='_blank' rel='noopener noreferrer']",
                    "a:link": "a[href='http://${0}']",
                    "a:mail": "a[href='mailto:${0}']",
                    "a:tel": "a[href='tel:+${0}']",
                    abbr: "abbr[title]",
                    "acr|acronym": "acronym[title]",
                    base: "base[href]/",
                    basefont: "basefont/",
                    br: "br/",
                    frame: "frame/",
                    hr: "hr/",
                    bdo: "bdo[dir]",
                    "bdo:r": "bdo[dir=rtl]",
                    "bdo:l": "bdo[dir=ltr]",
                    col: "col/",
                    link: "link[rel=stylesheet href]/",
                    "link:css": "link[href='${1:style}.css']",
                    "link:print": "link[href='${1:print}.css' media=print]",
                    "link:favicon": "link[rel='shortcut icon' type=image/x-icon href='${1:favicon.ico}']",
                    "link:mf|link:manifest": "link[rel='manifest' href='${1:manifest.json}']",
                    "link:touch": "link[rel=apple-touch-icon href='${1:favicon.png}']",
                    "link:rss": "link[rel=alternate type=application/rss+xml title=RSS href='${1:rss.xml}']",
                    "link:atom": "link[rel=alternate type=application/atom+xml title=Atom href='${1:atom.xml}']",
                    "link:im|link:import": "link[rel=import href='${1:component}.html']",
                    meta: "meta/",
                    "meta:utf": "meta[http-equiv=Content-Type content='text/html;charset=UTF-8']",
                    "meta:vp": "meta[name=viewport content='width=${1:device-width}, initial-scale=${2:1.0}']",
                    "meta:compat": "meta[http-equiv=X-UA-Compatible content='${1:IE=7}']",
                    "meta:edge": "meta:compat[content='${1:ie=edge}']",
                    "meta:redirect": "meta[http-equiv=refresh content='0; url=${1:http://example.com}']",
                    "meta:kw": "meta[name=keywords content]",
                    "meta:desc": "meta[name=description content]",
                    style: "style",
                    script: "script",
                    "script:src": "script[src]",
                    img: "img[src alt]/",
                    "img:s|img:srcset": "img[srcset src alt]",
                    "img:z|img:sizes": "img[sizes srcset src alt]",
                    picture: "picture",
                    "src|source": "source/",
                    "src:sc|source:src": "source[src type]",
                    "src:s|source:srcset": "source[srcset]",
                    "src:t|source:type": "source[srcset type='${1:image/}']",
                    "src:z|source:sizes": "source[sizes srcset]",
                    "src:m|source:media": "source[media='(${1:min-width: })' srcset]",
                    "src:mt|source:media:type": "source:media[type='${2:image/}']",
                    "src:mz|source:media:sizes": "source:media[sizes srcset]",
                    "src:zt|source:sizes:type": "source[sizes srcset type='${1:image/}']",
                    iframe: "iframe[src frameborder=0]",
                    embed: "embed[src type]/",
                    object: "object[data type]",
                    param: "param[name value]/",
                    map: "map[name]",
                    area: "area[shape coords href alt]/",
                    "area:d": "area[shape=default]",
                    "area:c": "area[shape=circle]",
                    "area:r": "area[shape=rect]",
                    "area:p": "area[shape=poly]",
                    form: "form[action]",
                    "form:get": "form[method=get]",
                    "form:post": "form[method=post]",
                    label: "label[for]",
                    input: "input[type=${1:text}]/",
                    inp: "input[name=${1} id=${1}]",
                    "input:h|input:hidden": "input[type=hidden name]",
                    "input:t|input:text": "inp[type=text]",
                    "input:search": "inp[type=search]",
                    "input:email": "inp[type=email]",
                    "input:url": "inp[type=url]",
                    "input:p|input:password": "inp[type=password]",
                    "input:datetime": "inp[type=datetime]",
                    "input:date": "inp[type=date]",
                    "input:datetime-local": "inp[type=datetime-local]",
                    "input:month": "inp[type=month]",
                    "input:week": "inp[type=week]",
                    "input:time": "inp[type=time]",
                    "input:tel": "inp[type=tel]",
                    "input:number": "inp[type=number]",
                    "input:color": "inp[type=color]",
                    "input:c|input:checkbox": "inp[type=checkbox]",
                    "input:r|input:radio": "inp[type=radio]",
                    "input:range": "inp[type=range]",
                    "input:f|input:file": "inp[type=file]",
                    "input:s|input:submit": "input[type=submit value]",
                    "input:i|input:image": "input[type=image src alt]",
                    "input:b|input:btn|input:button": "input[type=button value]",
                    "input:reset": "input:button[type=reset]",
                    isindex: "isindex/",
                    select: "select[name=${1} id=${1}]",
                    "select:d|select:disabled": "select[disabled.]",
                    "opt|option": "option[value]",
                    textarea: "textarea[name=${1} id=${1} cols=${2:30} rows=${3:10}]",
                    marquee: "marquee[behavior direction]",
                    "menu:c|menu:context": "menu[type=context]",
                    "menu:t|menu:toolbar": "menu[type=toolbar]",
                    video: "video[src]",
                    audio: "audio[src]",
                    "html:xml": "html[xmlns=http://www.w3.org/1999/xhtml]",
                    keygen: "keygen/",
                    command: "command/",
                    "btn:s|button:s|button:submit": "button[type=submit]",
                    "btn:r|button:r|button:reset": "button[type=reset]",
                    "btn:d|button:d|button:disabled": "button[disabled.]",
                    "fst:d|fset:d|fieldset:d|fieldset:disabled": "fieldset[disabled.]",
                    bq: "blockquote",
                    fig: "figure",
                    figc: "figcaption",
                    pic: "picture",
                    ifr: "iframe",
                    emb: "embed",
                    obj: "object",
                    cap: "caption",
                    colg: "colgroup",
                    fst: "fieldset",
                    btn: "button",
                    optg: "optgroup",
                    tarea: "textarea",
                    leg: "legend",
                    sect: "section",
                    art: "article",
                    hdr: "header",
                    ftr: "footer",
                    adr: "address",
                    dlg: "dialog",
                    str: "strong",
                    prog: "progress",
                    mn: "main",
                    tem: "template",
                    fset: "fieldset",
                    datag: "datagrid",
                    datal: "datalist",
                    kg: "keygen",
                    out: "output",
                    det: "details",
                    sum: "summary",
                    cmd: "command",
                    "ri:d|ri:dpr": "img:s",
                    "ri:v|ri:viewport": "img:z",
                    "ri:a|ri:art": "pic>src:m+img",
                    "ri:t|ri:type": "pic>src:t+img",
                    "!!!": "{<!DOCTYPE html>}",
                    doc: "html[lang=${lang}]>(head>meta[charset=${charset}]+meta[http-equiv='X-UA-Compatible'][content='IE=edge']+meta:vp+title{${1:Document}})+body",
                    "!|html:5": "!!!+doc",
                    c: "{<!-- ${0} -->}",
                    "cc:ie": "{<!--[if IE]>${0}<![endif]-->}",
                    "cc:noie": "{<!--[if !IE]><!-->${0}<!--<![endif]-->}"
                })
            },
            xhtml: {
                options: {
                    "output.selfClosingStyle": "xhtml"
                }
            },
            xml: {
                options: {
                    "output.selfClosingStyle": "xml"
                }
            },
            xsl: {
                snippets: ei(Ic),
                options: {
                    "output.selfClosingStyle": "xml"
                }
            },
            jsx: {
                options: {
                    "jsx.enabled": !0
                }
            },
            pug: {
                snippets: ei(Wc)
            },
            stylesheet: {
                snippets: ei(Pc)
            },
            sass: {
                options: {
                    "stylesheet.after": ""
                }
            },
            stylus: {
                options: {
                    "stylesheet.between": " ",
                    "stylesheet.after": ""
                }
            }
        },
        Dc = {
            91: 93,
            40: 41,
            123: 125
        },
        _c = e => e.charCodeAt(0),
        Qc = "#.*:$-_!@%^+>/".split("").map(_c),
        Hc = {
            type: "markup",
            lookAhead: !0,
            prefix: ""
        },
        Xc = {
            "{": "}",
            "[": "]",
            "(": ")"
        },
        Gc = [];
    for (const e of Object.keys(Xc)) Gc.push(Xc[e]);
    const Zc = "<",
        Yc = /^[a-zA-Z.#\[\(]$/,
        Jc = /^[\s>;"\']?[a-zA-Z.#!@\[\(]$/,
        Kc = /^[\s;"\']?[a-zA-Z!@]$/;
    class el {
        constructor() {
            this.cache = new Map, this.trackers = new Map, this.lastPos = new Map
        }
        getLastPost(e) {
            return this.lastPos.get(e.id)
        }
        setLastPos(e, t) {
            this.lastPos.set(e.id, t)
        }
        getTracker(e) {
            return this.trackers.get(e.id)
        }
        typingAbbreviation(e, t) {
            var n;
            const r = e.substr(Math.max(0, t - 2), t),
                o = e.syntax();
            let i = -1,
                s = t,
                a = 0;
            if (e.isJSX(o) ? 2 === r.length && r[0] === Zc && Yc.test(r[1]) && (i = t - 2, a = Zc.length) : Jc.test(r) && (i = t - 1), i >= 0) {
                const o = r[r.length - 1];
                o in Xc && e.substr(t, t + 1) === Xc[o] && s++;
                const u = this.getActivationContext(e, t);
                if (u) {
                    if ("stylesheet" === u.type && !Kc.test(r)) return;
                    const t = this.startTracking(e, i, s, {
                        offset: a,
                        config: u
                    });
                    if (t && "abbreviation" === t.type && "@@section" === (null === (n = u.context) || void 0 === n ? void 0 : n.name)) {
                        const {
                            abbreviation: n,
                            preview: r
                        } = t;
                        if (r.startsWith(n) && /^:\s*;?$/.test(r.slice(n.length))) return void this.stopTracking(e)
                    }
                    return t
                }
            }
        }
        startTracking(e, t, n, r) {
            const o = (null == r ? void 0 : r.config) || e.config(t),
                i = this.createTracker(e, [t, n], Object.assign({
                    config: o
                }, r));
            if (i) return this.trackers.set(e.id, i), i;
            this.trackers.delete(e.id)
        }
        stopTracking(e, t) {
            const n = this.getTracker(e);
            n && (e.unmark(n), n.forced && !(null == t ? void 0 : t.skipRemove) && e.replace("", n.range[0], n.range[1]), (null == t ? void 0 : t.force) ? this.cache.delete(e.id) : this.storeTracker(e, n), this.trackers.delete(e.id))
        }
        createTracker(e, t, n) {
            if (t[0] >= t[1]) return null;
            let r = e.substr(t[0], t[1]);
            const {
                config: o
            } = n;
            if (n.offset && (r = r.slice(n.offset)), !r || /[\r\n]/.test(r)) return null;
            const i = {
                abbreviation: r,
                range: t,
                config: o,
                forced: !!n.forced,
                offset: n.offset || 0,
                lastPos: t[1],
                lastLength: e.size()
            };
            try {
                let t, n = !1;
                "stylesheet" === o.type ? t = $t(r) : (t = Ne(r, {
                    jsx: "jsx" === o.syntax
                }), n = this.isSimpleMarkupAbbreviation(t));
                const s = e.previewConfig(o);
                return Object.assign(Object.assign({}, i), {
                    type: "abbreviation",
                    simple: n,
                    preview: Oi(t, s)
                })
            } catch (e) {
                return Object.assign(Object.assign({}, i), {
                    type: "error",
                    error: e
                })
            }
        }
        storeTracker(e, t) {
            this.cache.set(e.id, t)
        }
        getStoredTracker(e) {
            return this.cache.get(e.id)
        }
        restoreTracker(e, t) {
            const n = this.getStoredTracker(e);
            if (n && n.range[0] <= t && n.range[1] >= t) {
                const [t, r] = n.range;
                if (e.substr(t + n.offset, r) === n.abbreviation) return this.trackers.set(e.id, n), n.lastLength = e.size(), n
            }
        }
        handleChange(e, t) {
            const n = this.getTracker(e),
                r = this.getLastPost(e);
            if (this.setLastPos(e, t), !n) return null != r && r === t - 1 && e.allowTracking(t) ? this.typingAbbreviation(e, t) : void 0;
            const {
                lastPos: o
            } = n;
            let {
                range: i
            } = n;
            if (o < i[0] || o > i[1]) return void this.stopTracking(e);
            const s = e.size() - n.lastLength;
            if (i = i.slice(), ps(i, s, o), i[0] === i[1] && n.forced) return n.abbreviation = "", n;
            const a = this.createTracker(e, i, n);
            if (a && (n.forced || fs(a, i, t))) return a.lastPos = t, this.trackers.set(e.id, a), e.mark(a), a;
            this.stopTracking(e)
        }
        handleSelectionChange(e, t) {
            this.setLastPos(e, t);
            const n = this.getTracker(e) || this.restoreTracker(e, t);
            if (n) return n.lastPos = t, n
        }
        getActivationContext(e, t) {
            const n = e.syntax(),
                r = e.substr();
            if (e.isCSS(n)) return this.getCSSActivationContext(e, t, n, ts(r, t));
            if (!e.isHTML(n)) return {
                syntax: n,
                type: e.syntaxType(n),
                options: e.outputOptions(t)
            }; {
                const o = es(r, t, {
                    xml: e.isXML(n)
                });
                if (o.css) return this.getCSSActivationContext(e, t, ns(r, o) || "css", o.css);
                if (!o.current) return {
                    syntax: n,
                    type: "markup",
                    context: rs(r, o),
                    options: e.outputOptions(t)
                }
            }
        }
        getCSSActivationContext(e, t, n, r) {
            if (!r.current) return;
            return "propertyName" === r.current.type || "propertyValue" === r.current.type || this.isTypingBeforeSelector(e, t, r) ? {
                syntax: n,
                type: "stylesheet",
                context: os(r),
                options: e.outputOptions(t, r.inline)
            } : void 0
        }
        isTypingBeforeSelector(e, t, {
            current: n
        }) {
            if (n && "selector" === n.type && n.range[0] === t - 1) {
                return 1 === e.substr(n.range[0], n.range[1]).split(/[\n\r]/)[0].trim().length
            }
            return !1
        }
        isSimpleMarkupAbbreviation(e) {
            if (1 === e.children.length && !e.children[0].children.length) {
                const t = e.children[0];
                return !t.name || /^[a-z]/i.test(t.name)
            }
            return !e.children.length
        }
        disposeEditor(e) {
            this.cache.delete(e.id), this.trackers.delete(e.id), this.lastPos.delete(e.id)
        }
    }
    const tl = String.fromCodePoint(65520),
        nl = String.fromCodePoint(65521),
        rl = "$$emmet",
        ol = {
            "{": "}",
            "[": "]",
            "(": ")"
        };
    for (const e of Object.keys(ol));
    let il = 0;
    const sl = ["xml", "xsl", "jsx"],
        al = ["html", "htmlmixed", "vue"],
        ul = ["css", "scss", "less"],
        cl = ["jsx", "tsx"],
        ll = ["haml", "jade", "pug", "slim"].concat(al, sl, cl),
        pl = ["sass", "sss", "stylus", "postcss"].concat(ul),
        fl = sa("null", 0),
        ml = {
            lookAhead: !0,
            whitespace: !0
        },
        dl = {
            45: e => -e
        },
        hl = {
            43: (e, t) => e + t,
            45: (e, t) => e - t,
            42: (e, t) => e * t,
            47: (e, t) => e / t,
            92: (e, t) => Math.floor(e / t)
        };
    let gl = {};
    const bl = "emmet-abbreviation",
        vl = "emmet-abbreviation-preview";
    class yl {
        constructor() {
            this.marker = null, this.preview = null, this.forcedMarker = null
        }
        get id() {
            return Ls(this.cm).id
        }
        substr(e, t) {
            const n = this.cm.getValue();
            return void 0 === e && void 0 === t ? n : n.slice(e || 0, t)
        }
        replace(e, t, n) {
            this.cm.replaceRange(e, this.cm.posFromIndex(t), this.cm.posFromIndex(n))
        }
        syntax() {
            return Is(this.cm)
        }
        size() {
            return this.cm.getValue().length
        }
        config(e) {
            return $a(this.cm, e)
        }
        outputOptions(e, t) {
            return fa(this.cm, e, t)
        }
        previewConfig(e) {
            return Object.assign(Object.assign({}, e), {
                options: Object.assign(Object.assign({}, e.options), {
                    "output.field": Ca,
                    "output.indent": "  ",
                    "output.baseIndent": ""
                })
            })
        }
        allowTracking(e) {
            return Aa(this.cm, e)
        }
        mark(e) {
            const {
                cm: t
            } = this;
            this.disposeMarker();
            const [n, r] = vs(t, e.range);
            this.marker = t.markText(n, r, {
                inclusiveLeft: !0,
                inclusiveRight: !0,
                clearWhenEmpty: !1,
                className: bl
            }), e.forced && !this.forcedMarker && (this.forcedMarker = document.createElement("div"), this.forcedMarker.className = `${bl}-marker`, t.addWidget(n, this.forcedMarker, !1))
        }
        unmark() {
            this.disposeMarker(), this.hidePreview()
        }
        showPreview(e) {
            const {
                cm: t
            } = this, n = Ct(t);
            if (!_s(n.preview, Ms(t, e.range[0]))) return;
            let r, o = !1;
            if ("error" === e.type ? (r = Os(e.error), o = !0) : !e.forced && e.simple || (r = e.preview), r) {
                if (!this.preview) {
                    const r = document.createElement("div");
                    r.className = vl;
                    const o = t.posFromIndex(e.range[0]);
                    n.attachPreview ? n.attachPreview(t, r, o) : t.addWidget(o, r, !1), this.preview = new this.cm.constructor(r, {
                        mode: t.getOption("mode"),
                        readOnly: "nocursor",
                        lineNumbers: !1
                    });
                    const i = document.createElement("div");
                    i.className = `${vl}-error`, r.appendChild(i)
                }
                const i = this.preview.getWrapperElement().parentElement;
                i.classList.toggle("has-error", o), o ? i.querySelector(`.${vl}-error`).innerHTML = r : this.preview.setValue(r)
            } else this.hidePreview()
        }
        hidePreview() {
            this.preview && (this.preview.getWrapperElement().parentElement.remove(), this.preview = null)
        }
        isCSS(e) {
            return Us(e)
        }
        syntaxType(e) {
            return Ws(e)
        }
        isHTML(e) {
            return Rs(e)
        }
        isXML(e) {
            return Vs(e)
        }
        isJSX(e) {
            return Ds(e)
        }
        run(e, t) {
            const {
                cm: n
            } = this;
            this.cm = e;
            const r = t();
            return this.cm = n, r
        }
        disposeMarker() {
            this.marker && (this.marker.clear(), this.marker = null), this.forcedMarker && (this.forcedMarker.remove(), this.forcedMarker = null)
        }
    }
    const xl = new yl,
        kl = new el,
        wl = "emmet-open-tag",
        $l = "emmet-close-tag",
        Cl = "emmet-panel",
        Sl = "emmet-error",
        jl = ["<!--", "-->"],
        Al = ["/*", "*/"];
    void 0 !== window.CodeMirror && nc(window.CodeMirror)
}));