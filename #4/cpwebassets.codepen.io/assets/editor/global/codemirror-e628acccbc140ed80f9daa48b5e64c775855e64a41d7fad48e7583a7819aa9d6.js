! function(e, t) {
    "object" == typeof exports && "undefined" != typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define(t) : (e = e || self).CodeMirror = t()
}(this, (function() {
    "use strict";

    function e(e) {
        return new RegExp("(^|\\s)" + e + "(?:$|\\s)\\s*")
    }

    function t(e) {
        for (var t = e.childNodes.length; t > 0; --t) e.removeChild(e.firstChild);
        return e
    }

    function n(e, n) {
        return t(e).appendChild(n)
    }

    function r(e, t, n, r) {
        var i = document.createElement(e);
        if (n && (i.className = n), r && (i.style.cssText = r), "string" == typeof t) i.appendChild(document.createTextNode(t));
        else if (t)
            for (var o = 0; o < t.length; ++o) i.appendChild(t[o]);
        return i
    }

    function i(e, t, n, i) {
        var o = r(e, t, n, i);
        return o.setAttribute("role", "presentation"), o
    }

    function o(e, t) {
        if (3 == t.nodeType && (t = t.parentNode), e.contains) return e.contains(t);
        do {
            if (11 == t.nodeType && (t = t.host), t == e) return !0
        } while (t = t.parentNode)
    }

    function a() {
        var e;
        try {
            e = document.activeElement
        } catch (t) {
            e = document.body || null
        }
        for (; e && e.shadowRoot && e.shadowRoot.activeElement;) e = e.shadowRoot.activeElement;
        return e
    }

    function l(t, n) {
        var r = t.className;
        e(n).test(r) || (t.className += (r ? " " : "") + n)
    }

    function s(t, n) {
        for (var r = t.split(" "), i = 0; i < r.length; i++) r[i] && !e(r[i]).test(n) && (n += " " + r[i]);
        return n
    }

    function c(e) {
        var t = Array.prototype.slice.call(arguments, 1);
        return function() {
            return e.apply(null, t)
        }
    }

    function u(e, t, n) {
        for (var r in t || (t = {}), e) !e.hasOwnProperty(r) || !1 === n && t.hasOwnProperty(r) || (t[r] = e[r]);
        return t
    }

    function d(e, t, n, r, i) {
        null == t && -1 == (t = e.search(/[^\s\u00a0]/)) && (t = e.length);
        for (var o = r || 0, a = i || 0;;) {
            var l = e.indexOf("\t", o);
            if (l < 0 || l >= t) return a + (t - o);
            a += l - o, a += n - a % n, o = l + 1
        }
    }

    function f(e, t) {
        for (var n = 0; n < e.length; ++n)
            if (e[n] == t) return n;
        return -1
    }

    function h(e, t, n) {
        for (var r = 0, i = 0;;) {
            var o = e.indexOf("\t", r); - 1 == o && (o = e.length);
            var a = o - r;
            if (o == e.length || i + a >= t) return r + Math.min(a, t - i);
            if (i += o - r, r = o + 1, (i += n - i % n) >= t) return r
        }
    }

    function p(e) {
        for (; Qa.length <= e;) Qa.push(m(Qa) + " ");
        return Qa[e]
    }

    function m(e) {
        return e[e.length - 1]
    }

    function g(e, t) {
        for (var n = [], r = 0; r < e.length; r++) n[r] = t(e[r], r);
        return n
    }

    function v(e, t, n) {
        for (var r = 0, i = n(t); r < e.length && n(e[r]) <= i;) r++;
        e.splice(r, 0, t)
    }

    function y() {}

    function b(e, t) {
        var n;
        return Object.create ? n = Object.create(e) : (y.prototype = e, n = new y), t && u(t, n), n
    }

    function k(e) {
        return /\w/.test(e) || e > "\x80" && (e.toUpperCase() != e.toLowerCase() || Ja.test(e))
    }

    function x(e, t) {
        return t ? !!(t.source.indexOf("\\w") > -1 && k(e)) || t.test(e) : k(e)
    }

    function w(e) {
        for (var t in e)
            if (e.hasOwnProperty(t) && e[t]) return !1;
        return !0
    }

    function C(e) {
        return e.charCodeAt(0) >= 768 && el.test(e)
    }

    function S(e, t, n) {
        for (;
            (n < 0 ? t > 0 : t < e.length) && C(e.charAt(t));) t += n;
        return t
    }

    function L(e, t, n) {
        for (var r = t > n ? -1 : 1;;) {
            if (t == n) return t;
            var i = (t + n) / 2,
                o = r < 0 ? Math.ceil(i) : Math.floor(i);
            if (o == t) return e(o) ? t : n;
            e(o) ? n = o : t = o + r
        }
    }

    function T(e, t, n, r) {
        if (!e) return r(t, n, "ltr", 0);
        for (var i = !1, o = 0; o < e.length; ++o) {
            var a = e[o];
            (a.from < n && a.to > t || t == n && a.to == t) && (r(Math.max(a.from, t), Math.min(a.to, n), 1 == a.level ? "rtl" : "ltr", o), i = !0)
        }
        i || r(t, n, "ltr")
    }

    function M(e, t, n) {
        var r;
        tl = null;
        for (var i = 0; i < e.length; ++i) {
            var o = e[i];
            if (o.from < t && o.to > t) return i;
            o.to == t && (o.from != o.to && "before" == n ? r = i : tl = i), o.from == t && (o.from != o.to && "before" != n ? r = i : tl = i)
        }
        return null != r ? r : tl
    }

    function A(e, t) {
        var n = e.order;
        return null == n && (n = e.order = nl(e.text, t)), n
    }

    function z(e, t) {
        return e._handlers && e._handlers[t] || rl
    }

    function O(e, t, n) {
        if (e.removeEventListener) e.removeEventListener(t, n, !1);
        else if (e.detachEvent) e.detachEvent("on" + t, n);
        else {
            var r = e._handlers,
                i = r && r[t];
            if (i) {
                var o = f(i, n);
                o > -1 && (r[t] = i.slice(0, o).concat(i.slice(o + 1)))
            }
        }
    }

    function F(e, t) {
        var n = z(e, t);
        if (n.length)
            for (var r = Array.prototype.slice.call(arguments, 2), i = 0; i < n.length; ++i) n[i].apply(null, r)
    }

    function E(e, t, n) {
        return "string" == typeof t && (t = {
            type: t,
            preventDefault: function() {
                this.defaultPrevented = !0
            }
        }), F(e, n || t.type, e, t), B(t) || t.codemirrorIgnore
    }

    function N(e) {
        var t = e._handlers && e._handlers.cursorActivity;
        if (t)
            for (var n = e.curOp.cursorActivityHandlers || (e.curOp.cursorActivityHandlers = []), r = 0; r < t.length; ++r) - 1 == f(n, t[r]) && n.push(t[r])
    }

    function D(e, t) {
        return z(e, t).length > 0
    }

    function P(e) {
        e.prototype.on = function(e, t) {
            il(this, e, t)
        }, e.prototype.off = function(e, t) {
            O(this, e, t)
        }
    }

    function I(e) {
        e.preventDefault ? e.preventDefault() : e.returnValue = !1
    }

    function j(e) {
        e.stopPropagation ? e.stopPropagation() : e.cancelBubble = !0
    }

    function B(e) {
        return null != e.defaultPrevented ? e.defaultPrevented : 0 == e.returnValue
    }

    function W(e) {
        I(e), j(e)
    }

    function H(e) {
        return e.target || e.srcElement
    }

    function _(e) {
        var t = e.which;
        return null == t && (1 & e.button ? t = 1 : 2 & e.button ? t = 3 : 4 & e.button && (t = 2)), Da && e.ctrlKey && 1 == t && (t = 3), t
    }

    function R(e) {
        if (null == Ua) {
            var t = r("span", "\u200b");
            n(e, r("span", [t, document.createTextNode("x")])), 0 != e.firstChild.offsetHeight && (Ua = t.offsetWidth <= 1 && t.offsetHeight > 2 && !(wa && Ca < 8))
        }
        var i = Ua ? r("span", "\u200b") : r("span", "\xa0", null, "display: inline-block; width: 1px; margin-right: -1px");
        return i.setAttribute("cm-text", ""), i
    }

    function q(e) {
        if (null != $a) return $a;
        var r = n(e, document.createTextNode("A\u062eA")),
            i = Ba(r, 0, 1).getBoundingClientRect(),
            o = Ba(r, 1, 2).getBoundingClientRect();
        return t(e), !(!i || i.left == i.right) && ($a = o.right - i.right < 3)
    }

    function U(e) {
        if (null != cl) return cl;
        var t = n(e, r("span", "x")),
            i = t.getBoundingClientRect(),
            o = Ba(t, 0, 1).getBoundingClientRect();
        return cl = Math.abs(i.left - o.left) > 1
    }

    function $(e, t) {
        arguments.length > 2 && (t.dependencies = Array.prototype.slice.call(arguments, 2)), ul[e] = t
    }

    function K(e, t) {
        dl[e] = t
    }

    function V(e) {
        if ("string" == typeof e && dl.hasOwnProperty(e)) e = dl[e];
        else if (e && "string" == typeof e.name && dl.hasOwnProperty(e.name)) {
            var t = dl[e.name];
            "string" == typeof t && (t = {
                name: t
            }), (e = b(t, e)).name = t.name
        } else {
            if ("string" == typeof e && /^[\w\-]+\/[\w\-]+\+xml$/.test(e)) return V("application/xml");
            if ("string" == typeof e && /^[\w\-]+\/[\w\-]+\+json$/.test(e)) return V("application/json")
        }
        return "string" == typeof e ? {
            name: e
        } : e || {
            name: "null"
        }
    }

    function G(e, t) {
        t = V(t);
        var n = ul[t.name];
        if (!n) return G(e, "text/plain");
        var r = n(e, t);
        if (fl.hasOwnProperty(t.name)) {
            var i = fl[t.name];
            for (var o in i) i.hasOwnProperty(o) && (r.hasOwnProperty(o) && (r["_" + o] = r[o]), r[o] = i[o])
        }
        if (r.name = t.name, t.helperType && (r.helperType = t.helperType), t.modeProps)
            for (var a in t.modeProps) r[a] = t.modeProps[a];
        return r
    }

    function Y(e, t) {
        u(t, fl.hasOwnProperty(e) ? fl[e] : fl[e] = {})
    }

    function X(e, t) {
        if (!0 === t) return t;
        if (e.copyState) return e.copyState(t);
        var n = {};
        for (var r in t) {
            var i = t[r];
            i instanceof Array && (i = i.concat([])), n[r] = i
        }
        return n
    }

    function Z(e, t) {
        for (var n; e.innerMode && (n = e.innerMode(t)) && n.mode != e;) t = n.state, e = n.mode;
        return n || {
            mode: e,
            state: t
        }
    }

    function Q(e, t, n) {
        return !e.startState || e.startState(t, n)
    }

    function J(e, t) {
        if ((t -= e.first) < 0 || t >= e.size) throw new Error("There is no line " + (t + e.first) + " in the document.");
        for (var n = e; !n.lines;)
            for (var r = 0;; ++r) {
                var i = n.children[r],
                    o = i.chunkSize();
                if (t < o) {
                    n = i;
                    break
                }
                t -= o
            }
        return n.lines[t]
    }

    function ee(e, t, n) {
        var r = [],
            i = t.line;
        return e.iter(t.line, n.line + 1, (function(e) {
            var o = e.text;
            i == n.line && (o = o.slice(0, n.ch)), i == t.line && (o = o.slice(t.ch)), r.push(o), ++i
        })), r
    }

    function te(e, t, n) {
        var r = [];
        return e.iter(t, n, (function(e) {
            r.push(e.text)
        })), r
    }

    function ne(e, t) {
        var n = t - e.height;
        if (n)
            for (var r = e; r; r = r.parent) r.height += n
    }

    function re(e) {
        if (null == e.parent) return null;
        for (var t = e.parent, n = f(t.lines, e), r = t.parent; r; t = r, r = r.parent)
            for (var i = 0; r.children[i] != t; ++i) n += r.children[i].chunkSize();
        return n + t.first
    }

    function ie(e, t) {
        var n = e.first;
        e: do {
            for (var r = 0; r < e.children.length; ++r) {
                var i = e.children[r],
                    o = i.height;
                if (t < o) {
                    e = i;
                    continue e
                }
                t -= o, n += i.chunkSize()
            }
            return n
        } while (!e.lines);
        for (var a = 0; a < e.lines.length; ++a) {
            var l = e.lines[a].height;
            if (t < l) break;
            t -= l
        }
        return n + a
    }

    function oe(e, t) {
        return t >= e.first && t < e.first + e.size
    }

    function ae(e, t) {
        return String(e.lineNumberFormatter(t + e.firstLineNumber))
    }

    function le(e, t, n) {
        if (void 0 === n && (n = null), !(this instanceof le)) return new le(e, t, n);
        this.line = e, this.ch = t, this.sticky = n
    }

    function se(e, t) {
        return e.line - t.line || e.ch - t.ch
    }

    function ce(e, t) {
        return e.sticky == t.sticky && 0 == se(e, t)
    }

    function ue(e) {
        return le(e.line, e.ch)
    }

    function de(e, t) {
        return se(e, t) < 0 ? t : e
    }

    function fe(e, t) {
        return se(e, t) < 0 ? e : t
    }

    function he(e, t) {
        return Math.max(e.first, Math.min(t, e.first + e.size - 1))
    }

    function pe(e, t) {
        if (t.line < e.first) return le(e.first, 0);
        var n = e.first + e.size - 1;
        return t.line > n ? le(n, J(e, n).text.length) : me(t, J(e, t.line).text.length)
    }

    function me(e, t) {
        var n = e.ch;
        return null == n || n > t ? le(e.line, t) : n < 0 ? le(e.line, 0) : e
    }

    function ge(e, t) {
        for (var n = [], r = 0; r < t.length; r++) n[r] = pe(e, t[r]);
        return n
    }

    function ve(e, t, n, r) {
        var i = [e.state.modeGen],
            o = {};
        Le(e, t.text, e.doc.mode, n, (function(e, t) {
            return i.push(e, t)
        }), o, r);
        for (var a = n.state, l = function(r) {
                n.baseTokens = i;
                var l = e.state.overlays[r],
                    s = 1,
                    c = 0;
                n.state = !0, Le(e, t.text, l.mode, n, (function(e, t) {
                    for (var n = s; c < e;) {
                        var r = i[s];
                        r > e && i.splice(s, 1, e, i[s + 1], r), s += 2, c = Math.min(e, r)
                    }
                    if (t)
                        if (l.opaque) i.splice(n, s - n, e, "overlay " + t), s = n + 2;
                        else
                            for (; n < s; n += 2) {
                                var o = i[n + 1];
                                i[n + 1] = (o ? o + " " : "") + "overlay " + t
                            }
                }), o), n.state = a, n.baseTokens = null, n.baseTokenPos = 1
            }, s = 0; s < e.state.overlays.length; ++s) l(s);
        return {
            styles: i,
            classes: o.bgClass || o.textClass ? o : null
        }
    }

    function ye(e, t, n) {
        if (!t.styles || t.styles[0] != e.state.modeGen) {
            var r = be(e, re(t)),
                i = t.text.length > e.options.maxHighlightLength && X(e.doc.mode, r.state),
                o = ve(e, t, r);
            i && (r.state = i), t.stateAfter = r.save(!i), t.styles = o.styles, o.classes ? t.styleClasses = o.classes : t.styleClasses && (t.styleClasses = null), n === e.doc.highlightFrontier && (e.doc.modeFrontier = Math.max(e.doc.modeFrontier, ++e.doc.highlightFrontier))
        }
        return t.styles
    }

    function be(e, t, n) {
        var r = e.doc,
            i = e.display;
        if (!r.mode.startState) return new ml(r, !0, t);
        var o = Te(e, t, n),
            a = o > r.first && J(r, o - 1).stateAfter,
            l = a ? ml.fromSaved(r, a, o) : new ml(r, Q(r.mode), o);
        return r.iter(o, t, (function(n) {
            ke(e, n.text, l);
            var r = l.line;
            n.stateAfter = r == t - 1 || r % 5 == 0 || r >= i.viewFrom && r < i.viewTo ? l.save() : null, l.nextLine()
        })), n && (r.modeFrontier = l.line), l
    }

    function ke(e, t, n, r) {
        var i = e.doc.mode,
            o = new hl(t, e.options.tabSize, n);
        for (o.start = o.pos = r || 0, "" == t && xe(i, n.state); !o.eol();) we(i, o, n.state), o.start = o.pos
    }

    function xe(e, t) {
        if (e.blankLine) return e.blankLine(t);
        if (e.innerMode) {
            var n = Z(e, t);
            return n.mode.blankLine ? n.mode.blankLine(n.state) : void 0
        }
    }

    function we(e, t, n, r) {
        for (var i = 0; i < 10; i++) {
            r && (r[0] = Z(e, n).mode);
            var o = e.token(t, n);
            if (t.pos > t.start) return o
        }
        throw new Error("Mode " + e.name + " failed to advance stream.")
    }

    function Ce(e, t, n, r) {
        var i, o, a = e.doc,
            l = a.mode,
            s = J(a, (t = pe(a, t)).line),
            c = be(e, t.line, n),
            u = new hl(s.text, e.options.tabSize, c);
        for (r && (o = []);
            (r || u.pos < t.ch) && !u.eol();) u.start = u.pos, i = we(l, u, c.state), r && o.push(new gl(u, i, X(a.mode, c.state)));
        return r ? o : new gl(u, i, c.state)
    }

    function Se(e, t) {
        if (e)
            for (;;) {
                var n = e.match(/(?:^|\s+)line-(background-)?(\S+)/);
                if (!n) break;
                e = e.slice(0, n.index) + e.slice(n.index + n[0].length);
                var r = n[1] ? "bgClass" : "textClass";
                null == t[r] ? t[r] = n[2] : new RegExp("(?:^|\\s)" + n[2] + "(?:$|\\s)").test(t[r]) || (t[r] += " " + n[2])
            }
        return e
    }

    function Le(e, t, n, r, i, o, a) {
        var l = n.flattenSpans;
        null == l && (l = e.options.flattenSpans);
        var s, c = 0,
            u = null,
            d = new hl(t, e.options.tabSize, r),
            f = e.options.addModeClass && [null];
        for ("" == t && Se(xe(n, r.state), o); !d.eol();) {
            if (d.pos > e.options.maxHighlightLength ? (l = !1, a && ke(e, t, r, d.pos), d.pos = t.length, s = null) : s = Se(we(n, d, r.state, f), o), f) {
                var h = f[0].name;
                h && (s = "m-" + (s ? h + " " + s : h))
            }
            if (!l || u != s) {
                for (; c < d.start;) i(c = Math.min(d.start, c + 5e3), u);
                u = s
            }
            d.start = d.pos
        }
        for (; c < d.pos;) {
            var p = Math.min(d.pos, c + 5e3);
            i(p, u), c = p
        }
    }

    function Te(e, t, n) {
        for (var r, i, o = e.doc, a = n ? -1 : t - (e.doc.mode.innerMode ? 1e3 : 100), l = t; l > a; --l) {
            if (l <= o.first) return o.first;
            var s = J(o, l - 1),
                c = s.stateAfter;
            if (c && (!n || l + (c instanceof pl ? c.lookAhead : 0) <= o.modeFrontier)) return l;
            var u = d(s.text, null, e.options.tabSize);
            (null == i || r > u) && (i = l - 1, r = u)
        }
        return i
    }

    function Me(e, t) {
        if (e.modeFrontier = Math.min(e.modeFrontier, t), !(e.highlightFrontier < t - 10)) {
            for (var n = e.first, r = t - 1; r > n; r--) {
                var i = J(e, r).stateAfter;
                if (i && (!(i instanceof pl) || r + i.lookAhead < t)) {
                    n = r + 1;
                    break
                }
            }
            e.highlightFrontier = Math.min(e.highlightFrontier, n)
        }
    }

    function Ae() {
        vl = !0
    }

    function ze() {
        yl = !0
    }

    function Oe(e, t, n) {
        this.marker = e, this.from = t, this.to = n
    }

    function Fe(e, t) {
        if (e)
            for (var n = 0; n < e.length; ++n) {
                var r = e[n];
                if (r.marker == t) return r
            }
    }

    function Ee(e, t) {
        for (var n, r = 0; r < e.length; ++r) e[r] != t && (n || (n = [])).push(e[r]);
        return n
    }

    function Ne(e, t, n) {
        var r = n && window.WeakSet && (n.markedSpans || (n.markedSpans = new WeakSet));
        r && r.has(e.markedSpans) ? e.markedSpans.push(t) : (e.markedSpans = e.markedSpans ? e.markedSpans.concat([t]) : [t], r && r.add(e.markedSpans)), t.marker.attachLine(e)
    }

    function De(e, t, n) {
        var r;
        if (e)
            for (var i = 0; i < e.length; ++i) {
                var o = e[i],
                    a = o.marker;
                if (null == o.from || (a.inclusiveLeft ? o.from <= t : o.from < t) || o.from == t && "bookmark" == a.type && (!n || !o.marker.insertLeft)) {
                    var l = null == o.to || (a.inclusiveRight ? o.to >= t : o.to > t);
                    (r || (r = [])).push(new Oe(a, o.from, l ? null : o.to))
                }
            }
        return r
    }

    function Pe(e, t, n) {
        var r;
        if (e)
            for (var i = 0; i < e.length; ++i) {
                var o = e[i],
                    a = o.marker;
                if (null == o.to || (a.inclusiveRight ? o.to >= t : o.to > t) || o.from == t && "bookmark" == a.type && (!n || o.marker.insertLeft)) {
                    var l = null == o.from || (a.inclusiveLeft ? o.from <= t : o.from < t);
                    (r || (r = [])).push(new Oe(a, l ? null : o.from - t, null == o.to ? null : o.to - t))
                }
            }
        return r
    }

    function Ie(e, t) {
        if (t.full) return null;
        var n = oe(e, t.from.line) && J(e, t.from.line).markedSpans,
            r = oe(e, t.to.line) && J(e, t.to.line).markedSpans;
        if (!n && !r) return null;
        var i = t.from.ch,
            o = t.to.ch,
            a = 0 == se(t.from, t.to),
            l = De(n, i, a),
            s = Pe(r, o, a),
            c = 1 == t.text.length,
            u = m(t.text).length + (c ? i : 0);
        if (l)
            for (var d = 0; d < l.length; ++d) {
                var f = l[d];
                if (null == f.to) {
                    var h = Fe(s, f.marker);
                    h ? c && (f.to = null == h.to ? null : h.to + u) : f.to = i
                }
            }
        if (s)
            for (var p = 0; p < s.length; ++p) {
                var g = s[p];
                if (null != g.to && (g.to += u), null == g.from) Fe(l, g.marker) || (g.from = u, c && (l || (l = [])).push(g));
                else g.from += u, c && (l || (l = [])).push(g)
            }
        l && (l = je(l)), s && s != l && (s = je(s));
        var v = [l];
        if (!c) {
            var y, b = t.text.length - 2;
            if (b > 0 && l)
                for (var k = 0; k < l.length; ++k) null == l[k].to && (y || (y = [])).push(new Oe(l[k].marker, null, null));
            for (var x = 0; x < b; ++x) v.push(y);
            v.push(s)
        }
        return v
    }

    function je(e) {
        for (var t = 0; t < e.length; ++t) {
            var n = e[t];
            null != n.from && n.from == n.to && !1 !== n.marker.clearWhenEmpty && e.splice(t--, 1)
        }
        return e.length ? e : null
    }

    function Be(e, t, n) {
        var r = null;
        if (e.iter(t.line, n.line + 1, (function(e) {
                if (e.markedSpans)
                    for (var t = 0; t < e.markedSpans.length; ++t) {
                        var n = e.markedSpans[t].marker;
                        !n.readOnly || r && -1 != f(r, n) || (r || (r = [])).push(n)
                    }
            })), !r) return null;
        for (var i = [{
                from: t,
                to: n
            }], o = 0; o < r.length; ++o)
            for (var a = r[o], l = a.find(0), s = 0; s < i.length; ++s) {
                var c = i[s];
                if (!(se(c.to, l.from) < 0 || se(c.from, l.to) > 0)) {
                    var u = [s, 1],
                        d = se(c.from, l.from),
                        h = se(c.to, l.to);
                    (d < 0 || !a.inclusiveLeft && !d) && u.push({
                        from: c.from,
                        to: l.from
                    }), (h > 0 || !a.inclusiveRight && !h) && u.push({
                        from: l.to,
                        to: c.to
                    }), i.splice.apply(i, u), s += u.length - 3
                }
            }
        return i
    }

    function We(e) {
        var t = e.markedSpans;
        if (t) {
            for (var n = 0; n < t.length; ++n) t[n].marker.detachLine(e);
            e.markedSpans = null
        }
    }

    function He(e, t) {
        if (t) {
            for (var n = 0; n < t.length; ++n) t[n].marker.attachLine(e);
            e.markedSpans = t
        }
    }

    function _e(e) {
        return e.inclusiveLeft ? -1 : 0
    }

    function Re(e) {
        return e.inclusiveRight ? 1 : 0
    }

    function qe(e, t) {
        var n = e.lines.length - t.lines.length;
        if (0 != n) return n;
        var r = e.find(),
            i = t.find(),
            o = se(r.from, i.from) || _e(e) - _e(t);
        if (o) return -o;
        var a = se(r.to, i.to) || Re(e) - Re(t);
        return a || t.id - e.id
    }

    function Ue(e, t) {
        var n, r = yl && e.markedSpans;
        if (r)
            for (var i = void 0, o = 0; o < r.length; ++o)(i = r[o]).marker.collapsed && null == (t ? i.from : i.to) && (!n || qe(n, i.marker) < 0) && (n = i.marker);
        return n
    }

    function $e(e) {
        return Ue(e, !0)
    }

    function Ke(e) {
        return Ue(e, !1)
    }

    function Ve(e, t) {
        var n, r = yl && e.markedSpans;
        if (r)
            for (var i = 0; i < r.length; ++i) {
                var o = r[i];
                o.marker.collapsed && (null == o.from || o.from < t) && (null == o.to || o.to > t) && (!n || qe(n, o.marker) < 0) && (n = o.marker)
            }
        return n
    }

    function Ge(e, t, n, r, i) {
        var o = J(e, t),
            a = yl && o.markedSpans;
        if (a)
            for (var l = 0; l < a.length; ++l) {
                var s = a[l];
                if (s.marker.collapsed) {
                    var c = s.marker.find(0),
                        u = se(c.from, n) || _e(s.marker) - _e(i),
                        d = se(c.to, r) || Re(s.marker) - Re(i);
                    if (!(u >= 0 && d <= 0 || u <= 0 && d >= 0) && (u <= 0 && (s.marker.inclusiveRight && i.inclusiveLeft ? se(c.to, n) >= 0 : se(c.to, n) > 0) || u >= 0 && (s.marker.inclusiveRight && i.inclusiveLeft ? se(c.from, r) <= 0 : se(c.from, r) < 0))) return !0
                }
            }
    }

    function Ye(e) {
        for (var t; t = $e(e);) e = t.find(-1, !0).line;
        return e
    }

    function Xe(e) {
        for (var t; t = Ke(e);) e = t.find(1, !0).line;
        return e
    }

    function Ze(e) {
        for (var t, n; t = Ke(e);) e = t.find(1, !0).line, (n || (n = [])).push(e);
        return n
    }

    function Qe(e, t) {
        var n = J(e, t),
            r = Ye(n);
        return n == r ? t : re(r)
    }

    function Je(e, t) {
        if (t > e.lastLine()) return t;
        var n, r = J(e, t);
        if (!et(e, r)) return t;
        for (; n = Ke(r);) r = n.find(1, !0).line;
        return re(r) + 1
    }

    function et(e, t) {
        var n = yl && t.markedSpans;
        if (n)
            for (var r = void 0, i = 0; i < n.length; ++i)
                if ((r = n[i]).marker.collapsed) {
                    if (null == r.from) return !0;
                    if (!r.marker.widgetNode && 0 == r.from && r.marker.inclusiveLeft && tt(e, t, r)) return !0
                }
    }

    function tt(e, t, n) {
        if (null == n.to) {
            var r = n.marker.find(1, !0);
            return tt(e, r.line, Fe(r.line.markedSpans, n.marker))
        }
        if (n.marker.inclusiveRight && n.to == t.text.length) return !0;
        for (var i = void 0, o = 0; o < t.markedSpans.length; ++o)
            if ((i = t.markedSpans[o]).marker.collapsed && !i.marker.widgetNode && i.from == n.to && (null == i.to || i.to != n.from) && (i.marker.inclusiveLeft || n.marker.inclusiveRight) && tt(e, t, i)) return !0
    }

    function nt(e) {
        for (var t = 0, n = (e = Ye(e)).parent, r = 0; r < n.lines.length; ++r) {
            var i = n.lines[r];
            if (i == e) break;
            t += i.height
        }
        for (var o = n.parent; o; o = (n = o).parent)
            for (var a = 0; a < o.children.length; ++a) {
                var l = o.children[a];
                if (l == n) break;
                t += l.height
            }
        return t
    }

    function rt(e) {
        if (0 == e.height) return 0;
        for (var t, n = e.text.length, r = e; t = $e(r);) {
            var i = t.find(0, !0);
            r = i.from.line, n += i.from.ch - i.to.ch
        }
        for (r = e; t = Ke(r);) {
            var o = t.find(0, !0);
            n -= r.text.length - o.from.ch, n += (r = o.to.line).text.length - o.to.ch
        }
        return n
    }

    function it(e) {
        var t = e.display,
            n = e.doc;
        t.maxLine = J(n, n.first), t.maxLineLength = rt(t.maxLine), t.maxLineChanged = !0, n.iter((function(e) {
            var n = rt(e);
            n > t.maxLineLength && (t.maxLineLength = n, t.maxLine = e)
        }))
    }

    function ot(e, t, n, r) {
        e.text = t, e.stateAfter && (e.stateAfter = null), e.styles && (e.styles = null), null != e.order && (e.order = null), We(e), He(e, n);
        var i = r ? r(e) : 1;
        i != e.height && ne(e, i)
    }

    function at(e) {
        e.parent = null, We(e)
    }

    function lt(e, t) {
        if (!e || /^\s*$/.test(e)) return null;
        var n = t.addModeClass ? wl : xl;
        return n[e] || (n[e] = e.replace(/\S+/g, "cm-$&"))
    }

    function st(e, t) {
        var n = i("span", null, null, Sa ? "padding-right: .1px" : null),
            r = {
                pre: i("pre", [n], "CodeMirror-line"),
                content: n,
                col: 0,
                pos: 0,
                cm: e,
                trailingSpace: !1,
                splitSpaces: e.getOption("lineWrapping")
            };
        t.measure = {};
        for (var o = 0; o <= (t.rest ? t.rest.length : 0); o++) {
            var a = o ? t.rest[o - 1] : t.line,
                l = void 0;
            r.pos = 0, r.addToken = ut, q(e.display.measure) && (l = A(a, e.doc.direction)) && (r.addToken = ft(r.addToken, l)), r.map = [], pt(a, r, ye(e, a, t != e.display.externalMeasured && re(a))), a.styleClasses && (a.styleClasses.bgClass && (r.bgClass = s(a.styleClasses.bgClass, r.bgClass || "")), a.styleClasses.textClass && (r.textClass = s(a.styleClasses.textClass, r.textClass || ""))), 0 == r.map.length && r.map.push(0, 0, r.content.appendChild(R(e.display.measure))), 0 == o ? (t.measure.map = r.map, t.measure.cache = {}) : ((t.measure.maps || (t.measure.maps = [])).push(r.map), (t.measure.caches || (t.measure.caches = [])).push({}))
        }
        if (Sa) {
            var c = r.content.lastChild;
            (/\bcm-tab\b/.test(c.className) || c.querySelector && c.querySelector(".cm-tab")) && (r.content.className = "cm-tab-wrap-hack")
        }
        return F(e, "renderLine", e, t.line, r.pre), r.pre.className && (r.textClass = s(r.pre.className, r.textClass || "")), r
    }

    function ct(e) {
        var t = r("span", "\u2022", "cm-invalidchar");
        return t.title = "\\u" + e.charCodeAt(0).toString(16), t.setAttribute("aria-label", t.title), t
    }

    function ut(e, t, n, i, o, a, l) {
        if (t) {
            var s, c = e.splitSpaces ? dt(t, e.trailingSpace) : t,
                u = e.cm.state.specialChars,
                d = !1;
            if (u.test(t)) {
                s = document.createDocumentFragment();
                for (var f = 0;;) {
                    u.lastIndex = f;
                    var h = u.exec(t),
                        m = h ? h.index - f : t.length - f;
                    if (m) {
                        var g = document.createTextNode(c.slice(f, f + m));
                        wa && Ca < 9 ? s.appendChild(r("span", [g])) : s.appendChild(g), e.map.push(e.pos, e.pos + m, g), e.col += m, e.pos += m
                    }
                    if (!h) break;
                    f += m + 1;
                    var v = void 0;
                    if ("\t" == h[0]) {
                        var y = e.cm.options.tabSize,
                            b = y - e.col % y;
                        (v = s.appendChild(r("span", p(b), "cm-tab"))).setAttribute("role", "presentation"), v.setAttribute("cm-text", "\t"), e.col += b
                    } else "\r" == h[0] || "\n" == h[0] ? ((v = s.appendChild(r("span", "\r" == h[0] ? "\u240d" : "\u2424", "cm-invalidchar"))).setAttribute("cm-text", h[0]), e.col += 1) : ((v = e.cm.options.specialCharPlaceholder(h[0])).setAttribute("cm-text", h[0]), wa && Ca < 9 ? s.appendChild(r("span", [v])) : s.appendChild(v), e.col += 1);
                    e.map.push(e.pos, e.pos + 1, v), e.pos++
                }
            } else e.col += t.length, s = document.createTextNode(c), e.map.push(e.pos, e.pos + t.length, s), wa && Ca < 9 && (d = !0), e.pos += t.length;
            if (e.trailingSpace = 32 == c.charCodeAt(t.length - 1), n || i || o || d || a || l) {
                var k = n || "";
                i && (k += i), o && (k += o);
                var x = r("span", [s], k, a);
                if (l)
                    for (var w in l) l.hasOwnProperty(w) && "style" != w && "class" != w && x.setAttribute(w, l[w]);
                return e.content.appendChild(x)
            }
            e.content.appendChild(s)
        }
    }

    function dt(e, t) {
        if (e.length > 1 && !/  /.test(e)) return e;
        for (var n = t, r = "", i = 0; i < e.length; i++) {
            var o = e.charAt(i);
            " " != o || !n || i != e.length - 1 && 32 != e.charCodeAt(i + 1) || (o = "\xa0"), r += o, n = " " == o
        }
        return r
    }

    function ft(e, t) {
        return function(n, r, i, o, a, l, s) {
            i = i ? i + " cm-force-border" : "cm-force-border";
            for (var c = n.pos, u = c + r.length;;) {
                for (var d = void 0, f = 0; f < t.length && !((d = t[f]).to > c && d.from <= c); f++);
                if (d.to >= u) return e(n, r, i, o, a, l, s);
                e(n, r.slice(0, d.to - c), i, o, null, l, s), o = null, r = r.slice(d.to - c), c = d.to
            }
        }
    }

    function ht(e, t, n, r) {
        var i = !r && n.widgetNode;
        i && e.map.push(e.pos, e.pos + t, i), !r && e.cm.display.input.needsContentAttribute && (i || (i = e.content.appendChild(document.createElement("span"))), i.setAttribute("cm-marker", n.id)), i && (e.cm.display.input.setUneditable(i), e.content.appendChild(i)), e.pos += t, e.trailingSpace = !1
    }

    function pt(e, t, n) {
        var r = e.markedSpans,
            i = e.text,
            o = 0;
        if (r)
            for (var a, l, s, c, u, d, f, h = i.length, p = 0, m = 1, g = "", v = 0;;) {
                if (v == p) {
                    s = c = u = l = "", f = null, d = null, v = 1 / 0;
                    for (var y = [], b = void 0, k = 0; k < r.length; ++k) {
                        var x = r[k],
                            w = x.marker;
                        if ("bookmark" == w.type && x.from == p && w.widgetNode) y.push(w);
                        else if (x.from <= p && (null == x.to || x.to > p || w.collapsed && x.to == p && x.from == p)) {
                            if (null != x.to && x.to != p && v > x.to && (v = x.to, c = ""), w.className && (s += " " + w.className), w.css && (l = (l ? l + ";" : "") + w.css), w.startStyle && x.from == p && (u += " " + w.startStyle), w.endStyle && x.to == v && (b || (b = [])).push(w.endStyle, x.to), w.title && ((f || (f = {})).title = w.title), w.attributes)
                                for (var C in w.attributes)(f || (f = {}))[C] = w.attributes[C];
                            w.collapsed && (!d || qe(d.marker, w) < 0) && (d = x)
                        } else x.from > p && v > x.from && (v = x.from)
                    }
                    if (b)
                        for (var S = 0; S < b.length; S += 2) b[S + 1] == v && (c += " " + b[S]);
                    if (!d || d.from == p)
                        for (var L = 0; L < y.length; ++L) ht(t, 0, y[L]);
                    if (d && (d.from || 0) == p) {
                        if (ht(t, (null == d.to ? h + 1 : d.to) - p, d.marker, null == d.from), null == d.to) return;
                        d.to == p && (d = !1)
                    }
                }
                if (p >= h) break;
                for (var T = Math.min(h, v);;) {
                    if (g) {
                        var M = p + g.length;
                        if (!d) {
                            var A = M > T ? g.slice(0, T - p) : g;
                            t.addToken(t, A, a ? a + s : s, u, p + A.length == v ? c : "", l, f)
                        }
                        if (M >= T) {
                            g = g.slice(T - p), p = T;
                            break
                        }
                        p = M, u = ""
                    }
                    g = i.slice(o, o = n[m++]), a = lt(n[m++], t.cm.options)
                }
            } else
                for (var z = 1; z < n.length; z += 2) t.addToken(t, i.slice(o, o = n[z]), lt(n[z + 1], t.cm.options))
    }

    function mt(e, t, n) {
        this.line = t, this.rest = Ze(t), this.size = this.rest ? re(m(this.rest)) - n + 1 : 1, this.node = this.text = null, this.hidden = et(e, t)
    }

    function gt(e, t, n) {
        for (var r, i = [], o = t; o < n; o = r) {
            var a = new mt(e.doc, J(e.doc, o), o);
            r = o + a.size, i.push(a)
        }
        return i
    }

    function vt(e) {
        Cl ? Cl.ops.push(e) : e.ownsGroup = Cl = {
            ops: [e],
            delayedCallbacks: []
        }
    }

    function yt(e) {
        var t = e.delayedCallbacks,
            n = 0;
        do {
            for (; n < t.length; n++) t[n].call(null);
            for (var r = 0; r < e.ops.length; r++) {
                var i = e.ops[r];
                if (i.cursorActivityHandlers)
                    for (; i.cursorActivityCalled < i.cursorActivityHandlers.length;) i.cursorActivityHandlers[i.cursorActivityCalled++].call(null, i.cm)
            }
        } while (n < t.length)
    }

    function bt(e, t) {
        var n = e.ownsGroup;
        if (n) try {
            yt(n)
        } finally {
            Cl = null, t(n)
        }
    }

    function kt(e, t) {
        var n = z(e, t);
        if (n.length) {
            var r, i = Array.prototype.slice.call(arguments, 2);
            Cl ? r = Cl.delayedCallbacks : Sl ? r = Sl : (r = Sl = [], setTimeout(xt, 0));
            for (var o = function(e) {
                    r.push((function() {
                        return n[e].apply(null, i)
                    }))
                }, a = 0; a < n.length; ++a) o(a)
        }
    }

    function xt() {
        var e = Sl;
        Sl = null;
        for (var t = 0; t < e.length; ++t) e[t]()
    }

    function wt(e, t, n, r) {
        for (var i = 0; i < t.changes.length; i++) {
            var o = t.changes[i];
            "text" == o ? Tt(e, t) : "gutter" == o ? At(e, t, n, r) : "class" == o ? Mt(e, t) : "widget" == o && zt(e, t, r)
        }
        t.changes = null
    }

    function Ct(e) {
        return e.node == e.text && (e.node = r("div", null, null, "position: relative"), e.text.parentNode && e.text.parentNode.replaceChild(e.node, e.text), e.node.appendChild(e.text), wa && Ca < 8 && (e.node.style.zIndex = 2)), e.node
    }

    function St(e, t) {
        var n = t.bgClass ? t.bgClass + " " + (t.line.bgClass || "") : t.line.bgClass;
        if (n && (n += " CodeMirror-linebackground"), t.background) n ? t.background.className = n : (t.background.parentNode.removeChild(t.background), t.background = null);
        else if (n) {
            var i = Ct(t);
            t.background = i.insertBefore(r("div", null, n), i.firstChild), e.display.input.setUneditable(t.background)
        }
    }

    function Lt(e, t) {
        var n = e.display.externalMeasured;
        return n && n.line == t.line ? (e.display.externalMeasured = null, t.measure = n.measure, n.built) : st(e, t)
    }

    function Tt(e, t) {
        var n = t.text.className,
            r = Lt(e, t);
        t.text == t.node && (t.node = r.pre), t.text.parentNode.replaceChild(r.pre, t.text), t.text = r.pre, r.bgClass != t.bgClass || r.textClass != t.textClass ? (t.bgClass = r.bgClass, t.textClass = r.textClass, Mt(e, t)) : n && (t.text.className = n)
    }

    function Mt(e, t) {
        St(e, t), t.line.wrapClass ? Ct(t).className = t.line.wrapClass : t.node != t.text && (t.node.className = "");
        var n = t.textClass ? t.textClass + " " + (t.line.textClass || "") : t.line.textClass;
        t.text.className = n || ""
    }

    function At(e, t, n, i) {
        if (t.gutter && (t.node.removeChild(t.gutter), t.gutter = null), t.gutterBackground && (t.node.removeChild(t.gutterBackground), t.gutterBackground = null), t.line.gutterClass) {
            var o = Ct(t);
            t.gutterBackground = r("div", null, "CodeMirror-gutter-background " + t.line.gutterClass, "left: " + (e.options.fixedGutter ? i.fixedPos : -i.gutterTotalWidth) + "px; width: " + i.gutterTotalWidth + "px"), e.display.input.setUneditable(t.gutterBackground), o.insertBefore(t.gutterBackground, t.text)
        }
        var a = t.line.gutterMarkers;
        if (e.options.lineNumbers || a) {
            var l = Ct(t),
                s = t.gutter = r("div", null, "CodeMirror-gutter-wrapper", "left: " + (e.options.fixedGutter ? i.fixedPos : -i.gutterTotalWidth) + "px");
            if (s.setAttribute("aria-hidden", "true"), e.display.input.setUneditable(s), l.insertBefore(s, t.text), t.line.gutterClass && (s.className += " " + t.line.gutterClass), !e.options.lineNumbers || a && a["CodeMirror-linenumbers"] || (t.lineNumber = s.appendChild(r("div", ae(e.options, n), "CodeMirror-linenumber CodeMirror-gutter-elt", "left: " + i.gutterLeft["CodeMirror-linenumbers"] + "px; width: " + e.display.lineNumInnerWidth + "px"))), a)
                for (var c = 0; c < e.display.gutterSpecs.length; ++c) {
                    var u = e.display.gutterSpecs[c].className,
                        d = a.hasOwnProperty(u) && a[u];
                    d && s.appendChild(r("div", [d], "CodeMirror-gutter-elt", "left: " + i.gutterLeft[u] + "px; width: " + i.gutterWidth[u] + "px"))
                }
        }
    }

    function zt(t, n, r) {
        n.alignable && (n.alignable = null);
        for (var i = e("CodeMirror-linewidget"), o = n.node.firstChild, a = void 0; o; o = a) a = o.nextSibling, i.test(o.className) && n.node.removeChild(o);
        Ft(t, n, r)
    }

    function Ot(e, t, n, r) {
        var i = Lt(e, t);
        return t.text = t.node = i.pre, i.bgClass && (t.bgClass = i.bgClass), i.textClass && (t.textClass = i.textClass), Mt(e, t), At(e, t, n, r), Ft(e, t, r), t.node
    }

    function Ft(e, t, n) {
        if (Et(e, t.line, t, n, !0), t.rest)
            for (var r = 0; r < t.rest.length; r++) Et(e, t.rest[r], t, n, !1)
    }

    function Et(e, t, n, i, o) {
        if (t.widgets)
            for (var a = Ct(n), l = 0, s = t.widgets; l < s.length; ++l) {
                var c = s[l],
                    u = r("div", [c.node], "CodeMirror-linewidget" + (c.className ? " " + c.className : ""));
                c.handleMouseEvents || u.setAttribute("cm-ignore-events", "true"), Nt(c, u, n, i), e.display.input.setUneditable(u), o && c.above ? a.insertBefore(u, n.gutter || n.text) : a.appendChild(u), kt(c, "redraw")
            }
    }

    function Nt(e, t, n, r) {
        if (e.noHScroll) {
            (n.alignable || (n.alignable = [])).push(t);
            var i = r.wrapperWidth;
            t.style.left = r.fixedPos + "px", e.coverGutter || (i -= r.gutterTotalWidth, t.style.paddingLeft = r.gutterTotalWidth + "px"), t.style.width = i + "px"
        }
        e.coverGutter && (t.style.zIndex = 5, t.style.position = "relative", e.noHScroll || (t.style.marginLeft = -r.gutterTotalWidth + "px"))
    }

    function Dt(e) {
        if (null != e.height) return e.height;
        var t = e.doc.cm;
        if (!t) return 0;
        if (!o(document.body, e.node)) {
            var i = "position: relative;";
            e.coverGutter && (i += "margin-left: -" + t.display.gutters.offsetWidth + "px;"), e.noHScroll && (i += "width: " + t.display.wrapper.clientWidth + "px;"), n(t.display.measure, r("div", [e.node], null, i))
        }
        return e.height = e.node.parentNode.offsetHeight
    }

    function Pt(e, t) {
        for (var n = H(t); n != e.wrapper; n = n.parentNode)
            if (!n || 1 == n.nodeType && "true" == n.getAttribute("cm-ignore-events") || n.parentNode == e.sizer && n != e.mover) return !0
    }

    function It(e) {
        return e.lineSpace.offsetTop
    }

    function jt(e) {
        return e.mover.offsetHeight - e.lineSpace.offsetHeight
    }

    function Bt(e) {
        if (e.cachedPaddingH) return e.cachedPaddingH;
        var t = n(e.measure, r("pre", "x", "CodeMirror-line-like")),
            i = window.getComputedStyle ? window.getComputedStyle(t) : t.currentStyle,
            o = {
                left: parseInt(i.paddingLeft),
                right: parseInt(i.paddingRight)
            };
        return isNaN(o.left) || isNaN(o.right) || (e.cachedPaddingH = o), o
    }

    function Wt(e) {
        return Va - e.display.nativeBarWidth
    }

    function Ht(e) {
        return e.display.scroller.clientWidth - Wt(e) - e.display.barWidth
    }

    function _t(e) {
        return e.display.scroller.clientHeight - Wt(e) - e.display.barHeight
    }

    function Rt(e, t, n) {
        var r = e.options.lineWrapping,
            i = r && Ht(e);
        if (!t.measure.heights || r && t.measure.width != i) {
            var o = t.measure.heights = [];
            if (r) {
                t.measure.width = i;
                for (var a = t.text.firstChild.getClientRects(), l = 0; l < a.length - 1; l++) {
                    var s = a[l],
                        c = a[l + 1];
                    Math.abs(s.bottom - c.bottom) > 2 && o.push((s.bottom + c.top) / 2 - n.top)
                }
            }
            o.push(n.bottom - n.top)
        }
    }

    function qt(e, t, n) {
        if (e.line == t) return {
            map: e.measure.map,
            cache: e.measure.cache
        };
        if (e.rest) {
            for (var r = 0; r < e.rest.length; r++)
                if (e.rest[r] == t) return {
                    map: e.measure.maps[r],
                    cache: e.measure.caches[r]
                };
            for (var i = 0; i < e.rest.length; i++)
                if (re(e.rest[i]) > n) return {
                    map: e.measure.maps[i],
                    cache: e.measure.caches[i],
                    before: !0
                }
        }
    }

    function Ut(e, t) {
        var r = re(t = Ye(t)),
            i = e.display.externalMeasured = new mt(e.doc, t, r);
        i.lineN = r;
        var o = i.built = st(e, i);
        return i.text = o.pre, n(e.display.lineMeasure, o.pre), i
    }

    function $t(e, t, n, r) {
        return Gt(e, Vt(e, t), n, r)
    }

    function Kt(e, t) {
        if (t >= e.display.viewFrom && t < e.display.viewTo) return e.display.view[Tn(e, t)];
        var n = e.display.externalMeasured;
        return n && t >= n.lineN && t < n.lineN + n.size ? n : void 0
    }

    function Vt(e, t) {
        var n = re(t),
            r = Kt(e, n);
        r && !r.text ? r = null : r && r.changes && (wt(e, r, n, xn(e)), e.curOp.forceUpdate = !0), r || (r = Ut(e, t));
        var i = qt(r, t, n);
        return {
            line: t,
            view: r,
            rect: null,
            map: i.map,
            cache: i.cache,
            before: i.before,
            hasHeights: !1
        }
    }

    function Gt(e, t, n, r, i) {
        t.before && (n = -1);
        var o, a = n + (r || "");
        return t.cache.hasOwnProperty(a) ? o = t.cache[a] : (t.rect || (t.rect = t.view.text.getBoundingClientRect()), t.hasHeights || (Rt(e, t.view, t.rect), t.hasHeights = !0), (o = Zt(e, t, n, r)).bogus || (t.cache[a] = o)), {
            left: o.left,
            right: o.right,
            top: i ? o.rtop : o.top,
            bottom: i ? o.rbottom : o.bottom
        }
    }

    function Yt(e, t, n) {
        for (var r, i, o, a, l, s, c = 0; c < e.length; c += 3)
            if (l = e[c], s = e[c + 1], t < l ? (i = 0, o = 1, a = "left") : t < s ? o = (i = t - l) + 1 : (c == e.length - 3 || t == s && e[c + 3] > t) && (i = (o = s - l) - 1, t >= s && (a = "right")), null != i) {
                if (r = e[c + 2], l == s && n == (r.insertLeft ? "left" : "right") && (a = n), "left" == n && 0 == i)
                    for (; c && e[c - 2] == e[c - 3] && e[c - 1].insertLeft;) r = e[2 + (c -= 3)], a = "left";
                if ("right" == n && i == s - l)
                    for (; c < e.length - 3 && e[c + 3] == e[c + 4] && !e[c + 5].insertLeft;) r = e[(c += 3) + 2], a = "right";
                break
            }
        return {
            node: r,
            start: i,
            end: o,
            collapse: a,
            coverStart: l,
            coverEnd: s
        }
    }

    function Xt(e, t) {
        var n = Ll;
        if ("left" == t)
            for (var r = 0; r < e.length && (n = e[r]).left == n.right; r++);
        else
            for (var i = e.length - 1; i >= 0 && (n = e[i]).left == n.right; i--);
        return n
    }

    function Zt(e, t, n, r) {
        var i, o = Yt(t.map, n, r),
            a = o.node,
            l = o.start,
            s = o.end,
            c = o.collapse;
        if (3 == a.nodeType) {
            for (var u = 0; u < 4; u++) {
                for (; l && C(t.line.text.charAt(o.coverStart + l));) --l;
                for (; o.coverStart + s < o.coverEnd && C(t.line.text.charAt(o.coverStart + s));) ++s;
                if ((i = wa && Ca < 9 && 0 == l && s == o.coverEnd - o.coverStart ? a.parentNode.getBoundingClientRect() : Xt(Ba(a, l, s).getClientRects(), r)).left || i.right || 0 == l) break;
                s = l, l -= 1, c = "right"
            }
            wa && Ca < 11 && (i = Qt(e.display.measure, i))
        } else {
            var d;
            l > 0 && (c = r = "right"), i = e.options.lineWrapping && (d = a.getClientRects()).length > 1 ? d["right" == r ? d.length - 1 : 0] : a.getBoundingClientRect()
        }
        if (wa && Ca < 9 && !l && (!i || !i.left && !i.right)) {
            var f = a.parentNode.getClientRects()[0];
            i = f ? {
                left: f.left,
                right: f.left + kn(e.display),
                top: f.top,
                bottom: f.bottom
            } : Ll
        }
        for (var h = i.top - t.rect.top, p = i.bottom - t.rect.top, m = (h + p) / 2, g = t.view.measure.heights, v = 0; v < g.length - 1 && !(m < g[v]); v++);
        var y = v ? g[v - 1] : 0,
            b = g[v],
            k = {
                left: ("right" == c ? i.right : i.left) - t.rect.left,
                right: ("left" == c ? i.left : i.right) - t.rect.left,
                top: y,
                bottom: b
            };
        return i.left || i.right || (k.bogus = !0), e.options.singleCursorHeightPerLine || (k.rtop = h, k.rbottom = p), k
    }

    function Qt(e, t) {
        if (!window.screen || null == screen.logicalXDPI || screen.logicalXDPI == screen.deviceXDPI || !U(e)) return t;
        var n = screen.logicalXDPI / screen.deviceXDPI,
            r = screen.logicalYDPI / screen.deviceYDPI;
        return {
            left: t.left * n,
            right: t.right * n,
            top: t.top * r,
            bottom: t.bottom * r
        }
    }

    function Jt(e) {
        if (e.measure && (e.measure.cache = {}, e.measure.heights = null, e.rest))
            for (var t = 0; t < e.rest.length; t++) e.measure.caches[t] = {}
    }

    function en(e) {
        e.display.externalMeasure = null, t(e.display.lineMeasure);
        for (var n = 0; n < e.display.view.length; n++) Jt(e.display.view[n])
    }

    function tn(e) {
        en(e), e.display.cachedCharWidth = e.display.cachedTextHeight = e.display.cachedPaddingH = null, e.options.lineWrapping || (e.display.maxLineChanged = !0), e.display.lineNumChars = null
    }

    function nn() {
        return Ta && Ea ? -(document.body.getBoundingClientRect().left - parseInt(getComputedStyle(document.body).marginLeft)) : window.pageXOffset || (document.documentElement || document.body).scrollLeft
    }

    function rn() {
        return Ta && Ea ? -(document.body.getBoundingClientRect().top - parseInt(getComputedStyle(document.body).marginTop)) : window.pageYOffset || (document.documentElement || document.body).scrollTop
    }

    function on(e) {
        var t = Ye(e).widgets,
            n = 0;
        if (t)
            for (var r = 0; r < t.length; ++r) t[r].above && (n += Dt(t[r]));
        return n
    }

    function an(e, t, n, r, i) {
        if (!i) {
            var o = on(t);
            n.top += o, n.bottom += o
        }
        if ("line" == r) return n;
        r || (r = "local");
        var a = nt(t);
        if ("local" == r ? a += It(e.display) : a -= e.display.viewOffset, "page" == r || "window" == r) {
            var l = e.display.lineSpace.getBoundingClientRect();
            a += l.top + ("window" == r ? 0 : rn());
            var s = l.left + ("window" == r ? 0 : nn());
            n.left += s, n.right += s
        }
        return n.top += a, n.bottom += a, n
    }

    function ln(e, t, n) {
        if ("div" == n) return t;
        var r = t.left,
            i = t.top;
        if ("page" == n) r -= nn(), i -= rn();
        else if ("local" == n || !n) {
            var o = e.display.sizer.getBoundingClientRect();
            r += o.left, i += o.top
        }
        var a = e.display.lineSpace.getBoundingClientRect();
        return {
            left: r - a.left,
            top: i - a.top
        }
    }

    function sn(e, t, n, r, i) {
        return r || (r = J(e.doc, t.line)), an(e, r, $t(e, r, t.ch, i), n)
    }

    function cn(e, t, n, r, i, o) {
        function a(t, a) {
            var l = Gt(e, i, t, a ? "right" : "left", o);
            return a ? l.left = l.right : l.right = l.left, an(e, r, l, n)
        }

        function l(e, t, n) {
            return a(n ? e - 1 : e, 1 == s[t].level != n)
        }
        r = r || J(e.doc, t.line), i || (i = Vt(e, r));
        var s = A(r, e.doc.direction),
            c = t.ch,
            u = t.sticky;
        if (c >= r.text.length ? (c = r.text.length, u = "before") : c <= 0 && (c = 0, u = "after"), !s) return a("before" == u ? c - 1 : c, "before" == u);
        var d = M(s, c, u),
            f = tl,
            h = l(c, d, "before" == u);
        return null != f && (h.other = l(c, f, "before" != u)), h
    }

    function un(e, t) {
        var n = 0;
        t = pe(e.doc, t), e.options.lineWrapping || (n = kn(e.display) * t.ch);
        var r = J(e.doc, t.line),
            i = nt(r) + It(e.display);
        return {
            left: n,
            right: n,
            top: i,
            bottom: i + r.height
        }
    }

    function dn(e, t, n, r, i) {
        var o = le(e, t, n);
        return o.xRel = i, r && (o.outside = r), o
    }

    function fn(e, t, n) {
        var r = e.doc;
        if ((n += e.display.viewOffset) < 0) return dn(r.first, 0, null, -1, -1);
        var i = ie(r, n),
            o = r.first + r.size - 1;
        if (i > o) return dn(r.first + r.size - 1, J(r, o).text.length, null, 1, 1);
        t < 0 && (t = 0);
        for (var a = J(r, i);;) {
            var l = gn(e, a, i, t, n),
                s = Ve(a, l.ch + (l.xRel > 0 || l.outside > 0 ? 1 : 0));
            if (!s) return l;
            var c = s.find(1);
            if (c.line == i) return c;
            a = J(r, i = c.line)
        }
    }

    function hn(e, t, n, r) {
        r -= on(t);
        var i = t.text.length,
            o = L((function(t) {
                return Gt(e, n, t - 1).bottom <= r
            }), i, 0);
        return {
            begin: o,
            end: i = L((function(t) {
                return Gt(e, n, t).top > r
            }), o, i)
        }
    }

    function pn(e, t, n, r) {
        return n || (n = Vt(e, t)), hn(e, t, n, an(e, t, Gt(e, n, r), "line").top)
    }

    function mn(e, t, n, r) {
        return !(e.bottom <= n) && (e.top > n || (r ? e.left : e.right) > t)
    }

    function gn(e, t, n, r, i) {
        i -= nt(t);
        var o = Vt(e, t),
            a = on(t),
            l = 0,
            s = t.text.length,
            c = !0,
            u = A(t, e.doc.direction);
        if (u) {
            var d = (e.options.lineWrapping ? yn : vn)(e, t, n, o, u, r, i);
            l = (c = 1 != d.level) ? d.from : d.to - 1, s = c ? d.to : d.from - 1
        }
        var f, h, p = null,
            m = null,
            g = L((function(t) {
                var n = Gt(e, o, t);
                return n.top += a, n.bottom += a, !!mn(n, r, i, !1) && (n.top <= i && n.left <= r && (p = t, m = n), !0)
            }), l, s),
            v = !1;
        if (m) {
            var y = r - m.left < m.right - r,
                b = y == c;
            g = p + (b ? 0 : 1), h = b ? "after" : "before", f = y ? m.left : m.right
        } else {
            c || g != s && g != l || g++, h = 0 == g ? "after" : g == t.text.length ? "before" : Gt(e, o, g - (c ? 1 : 0)).bottom + a <= i == c ? "after" : "before";
            var k = cn(e, le(n, g, h), "line", t, o);
            f = k.left, v = i < k.top ? -1 : i >= k.bottom ? 1 : 0
        }
        return dn(n, g = S(t.text, g, 1), h, v, r - f)
    }

    function vn(e, t, n, r, i, o, a) {
        var l = L((function(l) {
                var s = i[l],
                    c = 1 != s.level;
                return mn(cn(e, le(n, c ? s.to : s.from, c ? "before" : "after"), "line", t, r), o, a, !0)
            }), 0, i.length - 1),
            s = i[l];
        if (l > 0) {
            var c = 1 != s.level,
                u = cn(e, le(n, c ? s.from : s.to, c ? "after" : "before"), "line", t, r);
            mn(u, o, a, !0) && u.top > a && (s = i[l - 1])
        }
        return s
    }

    function yn(e, t, n, r, i, o, a) {
        var l = hn(e, t, r, a),
            s = l.begin,
            c = l.end;
        /\s/.test(t.text.charAt(c - 1)) && c--;
        for (var u = null, d = null, f = 0; f < i.length; f++) {
            var h = i[f];
            if (!(h.from >= c || h.to <= s)) {
                var p = Gt(e, r, 1 != h.level ? Math.min(c, h.to) - 1 : Math.max(s, h.from)).right,
                    m = p < o ? o - p + 1e9 : p - o;
                (!u || d > m) && (u = h, d = m)
            }
        }
        return u || (u = i[i.length - 1]), u.from < s && (u = {
            from: s,
            to: u.to,
            level: u.level
        }), u.to > c && (u = {
            from: u.from,
            to: c,
            level: u.level
        }), u
    }

    function bn(e) {
        if (null != e.cachedTextHeight) return e.cachedTextHeight;
        if (null == kl) {
            kl = r("pre", null, "CodeMirror-line-like");
            for (var i = 0; i < 49; ++i) kl.appendChild(document.createTextNode("x")), kl.appendChild(r("br"));
            kl.appendChild(document.createTextNode("x"))
        }
        n(e.measure, kl);
        var o = kl.offsetHeight / 50;
        return o > 3 && (e.cachedTextHeight = o), t(e.measure), o || 1
    }

    function kn(e) {
        if (null != e.cachedCharWidth) return e.cachedCharWidth;
        var t = r("span", "xxxxxxxxxx"),
            i = r("pre", [t], "CodeMirror-line-like");
        n(e.measure, i);
        var o = t.getBoundingClientRect(),
            a = (o.right - o.left) / 10;
        return a > 2 && (e.cachedCharWidth = a), a || 10
    }

    function xn(e) {
        for (var t = e.display, n = {}, r = {}, i = t.gutters.clientLeft, o = t.gutters.firstChild, a = 0; o; o = o.nextSibling, ++a) {
            var l = e.display.gutterSpecs[a].className;
            n[l] = o.offsetLeft + o.clientLeft + i, r[l] = o.clientWidth
        }
        return {
            fixedPos: wn(t),
            gutterTotalWidth: t.gutters.offsetWidth,
            gutterLeft: n,
            gutterWidth: r,
            wrapperWidth: t.wrapper.clientWidth
        }
    }

    function wn(e) {
        return e.scroller.getBoundingClientRect().left - e.sizer.getBoundingClientRect().left
    }

    function Cn(e) {
        var t = bn(e.display),
            n = e.options.lineWrapping,
            r = n && Math.max(5, e.display.scroller.clientWidth / kn(e.display) - 3);
        return function(i) {
            if (et(e.doc, i)) return 0;
            var o = 0;
            if (i.widgets)
                for (var a = 0; a < i.widgets.length; a++) i.widgets[a].height && (o += i.widgets[a].height);
            return n ? o + (Math.ceil(i.text.length / r) || 1) * t : o + t
        }
    }

    function Sn(e) {
        var t = e.doc,
            n = Cn(e);
        t.iter((function(e) {
            var t = n(e);
            t != e.height && ne(e, t)
        }))
    }

    function Ln(e, t, n, r) {
        var i = e.display;
        if (!n && "true" == H(t).getAttribute("cm-not-content")) return null;
        var o, a, l = i.lineSpace.getBoundingClientRect();
        try {
            o = t.clientX - l.left, a = t.clientY - l.top
        } catch (e) {
            return null
        }
        var s, c = fn(e, o, a);
        if (r && c.xRel > 0 && (s = J(e.doc, c.line).text).length == c.ch) {
            var u = d(s, s.length, e.options.tabSize) - s.length;
            c = le(c.line, Math.max(0, Math.round((o - Bt(e.display).left) / kn(e.display)) - u))
        }
        return c
    }

    function Tn(e, t) {
        if (t >= e.display.viewTo) return null;
        if ((t -= e.display.viewFrom) < 0) return null;
        for (var n = e.display.view, r = 0; r < n.length; r++)
            if ((t -= n[r].size) < 0) return r
    }

    function Mn(e, t, n, r) {
        null == t && (t = e.doc.first), null == n && (n = e.doc.first + e.doc.size), r || (r = 0);
        var i = e.display;
        if (r && n < i.viewTo && (null == i.updateLineNumbers || i.updateLineNumbers > t) && (i.updateLineNumbers = t), e.curOp.viewChanged = !0, t >= i.viewTo) yl && Qe(e.doc, t) < i.viewTo && zn(e);
        else if (n <= i.viewFrom) yl && Je(e.doc, n + r) > i.viewFrom ? zn(e) : (i.viewFrom += r, i.viewTo += r);
        else if (t <= i.viewFrom && n >= i.viewTo) zn(e);
        else if (t <= i.viewFrom) {
            var o = On(e, n, n + r, 1);
            o ? (i.view = i.view.slice(o.index), i.viewFrom = o.lineN, i.viewTo += r) : zn(e)
        } else if (n >= i.viewTo) {
            var a = On(e, t, t, -1);
            a ? (i.view = i.view.slice(0, a.index), i.viewTo = a.lineN) : zn(e)
        } else {
            var l = On(e, t, t, -1),
                s = On(e, n, n + r, 1);
            l && s ? (i.view = i.view.slice(0, l.index).concat(gt(e, l.lineN, s.lineN)).concat(i.view.slice(s.index)), i.viewTo += r) : zn(e)
        }
        var c = i.externalMeasured;
        c && (n < c.lineN ? c.lineN += r : t < c.lineN + c.size && (i.externalMeasured = null))
    }

    function An(e, t, n) {
        e.curOp.viewChanged = !0;
        var r = e.display,
            i = e.display.externalMeasured;
        if (i && t >= i.lineN && t < i.lineN + i.size && (r.externalMeasured = null), !(t < r.viewFrom || t >= r.viewTo)) {
            var o = r.view[Tn(e, t)];
            if (null != o.node) {
                var a = o.changes || (o.changes = []); - 1 == f(a, n) && a.push(n)
            }
        }
    }

    function zn(e) {
        e.display.viewFrom = e.display.viewTo = e.doc.first, e.display.view = [], e.display.viewOffset = 0
    }

    function On(e, t, n, r) {
        var i, o = Tn(e, t),
            a = e.display.view;
        if (!yl || n == e.doc.first + e.doc.size) return {
            index: o,
            lineN: n
        };
        for (var l = e.display.viewFrom, s = 0; s < o; s++) l += a[s].size;
        if (l != t) {
            if (r > 0) {
                if (o == a.length - 1) return null;
                i = l + a[o].size - t, o++
            } else i = l - t;
            t += i, n += i
        }
        for (; Qe(e.doc, n) != n;) {
            if (o == (r < 0 ? 0 : a.length - 1)) return null;
            n += r * a[o - (r < 0 ? 1 : 0)].size, o += r
        }
        return {
            index: o,
            lineN: n
        }
    }

    function Fn(e, t, n) {
        var r = e.display;
        0 == r.view.length || t >= r.viewTo || n <= r.viewFrom ? (r.view = gt(e, t, n), r.viewFrom = t) : (r.viewFrom > t ? r.view = gt(e, t, r.viewFrom).concat(r.view) : r.viewFrom < t && (r.view = r.view.slice(Tn(e, t))), r.viewFrom = t, r.viewTo < n ? r.view = r.view.concat(gt(e, r.viewTo, n)) : r.viewTo > n && (r.view = r.view.slice(0, Tn(e, n)))), r.viewTo = n
    }

    function En(e) {
        for (var t = e.display.view, n = 0, r = 0; r < t.length; r++) {
            var i = t[r];
            i.hidden || i.node && !i.changes || ++n
        }
        return n
    }

    function Nn(e) {
        e.display.input.showSelection(e.display.input.prepareSelection())
    }

    function Dn(e, t) {
        void 0 === t && (t = !0);
        var n = e.doc,
            r = {},
            i = r.cursors = document.createDocumentFragment(),
            o = r.selection = document.createDocumentFragment(),
            a = e.options.$customCursor;
        a && (t = !0);
        for (var l = 0; l < n.sel.ranges.length; l++)
            if (t || l != n.sel.primIndex) {
                var s = n.sel.ranges[l];
                if (!(s.from().line >= e.display.viewTo || s.to().line < e.display.viewFrom)) {
                    var c = s.empty();
                    if (a) {
                        var u = a(e, s);
                        u && Pn(e, u, i)
                    } else(c || e.options.showCursorWhenSelecting) && Pn(e, s.head, i);
                    c || jn(e, s, o)
                }
            }
        return r
    }

    function Pn(e, t, n) {
        var i = cn(e, t, "div", null, null, !e.options.singleCursorHeightPerLine),
            o = n.appendChild(r("div", "\xa0", "CodeMirror-cursor"));
        if (o.style.left = i.left + "px", o.style.top = i.top + "px", o.style.height = Math.max(0, i.bottom - i.top) * e.options.cursorHeight + "px", /\bcm-fat-cursor\b/.test(e.getWrapperElement().className)) {
            var a = sn(e, t, "div", null, null),
                l = a.right - a.left;
            o.style.width = (l > 0 ? l : e.defaultCharWidth()) + "px"
        }
        if (i.other) {
            var s = n.appendChild(r("div", "\xa0", "CodeMirror-cursor CodeMirror-secondarycursor"));
            s.style.display = "", s.style.left = i.other.left + "px", s.style.top = i.other.top + "px", s.style.height = .85 * (i.other.bottom - i.other.top) + "px"
        }
    }

    function In(e, t) {
        return e.top - t.top || e.left - t.left
    }

    function jn(e, t, n) {
        function i(e, t, n, i) {
            t < 0 && (t = 0), t = Math.round(t), i = Math.round(i), s.appendChild(r("div", null, "CodeMirror-selected", "position: absolute; left: " + e + "px;\n                             top: " + t + "px; width: " + (null == n ? d - e : n) + "px;\n                             height: " + (i - t) + "px"))
        }

        function o(t, n, r) {
            function o(n, r) {
                return sn(e, le(t, n), "div", h, r)
            }

            function a(t, n, r) {
                var i = pn(e, h, null, t),
                    a = "ltr" == n == ("after" == r) ? "left" : "right";
                return o("after" == r ? i.begin : i.end - (/\s/.test(h.text.charAt(i.end - 1)) ? 2 : 1), a)[a]
            }
            var s, c, h = J(l, t),
                p = h.text.length,
                m = A(h, l.direction);
            return T(m, n || 0, null == r ? p : r, (function(e, t, l, h) {
                var g = "ltr" == l,
                    v = o(e, g ? "left" : "right"),
                    y = o(t - 1, g ? "right" : "left"),
                    b = null == n && 0 == e,
                    k = null == r && t == p,
                    x = 0 == h,
                    w = !m || h == m.length - 1;
                if (y.top - v.top <= 3) {
                    var C = (f ? k : b) && w,
                        S = (f ? b : k) && x ? u : (g ? v : y).left,
                        L = C ? d : (g ? y : v).right;
                    i(S, v.top, L - S, v.bottom)
                } else {
                    var T, M, A, z;
                    g ? (T = f && b && x ? u : v.left, M = f ? d : a(e, l, "before"), A = f ? u : a(t, l, "after"), z = f && k && w ? d : y.right) : (T = f ? a(e, l, "before") : u, M = !f && b && x ? d : v.right, A = !f && k && w ? u : y.left, z = f ? a(t, l, "after") : d), i(T, v.top, M - T, v.bottom), v.bottom < y.top && i(u, v.bottom, null, y.top), i(A, y.top, z - A, y.bottom)
                }(!s || In(v, s) < 0) && (s = v), In(y, s) < 0 && (s = y), (!c || In(v, c) < 0) && (c = v), In(y, c) < 0 && (c = y)
            })), {
                start: s,
                end: c
            }
        }
        var a = e.display,
            l = e.doc,
            s = document.createDocumentFragment(),
            c = Bt(e.display),
            u = c.left,
            d = Math.max(a.sizerWidth, Ht(e) - a.sizer.offsetLeft) - c.right,
            f = "ltr" == l.direction,
            h = t.from(),
            p = t.to();
        if (h.line == p.line) o(h.line, h.ch, p.ch);
        else {
            var m = J(l, h.line),
                g = J(l, p.line),
                v = Ye(m) == Ye(g),
                y = o(h.line, h.ch, v ? m.text.length + 1 : null).end,
                b = o(p.line, v ? 0 : null, p.ch).start;
            v && (y.top < b.top - 2 ? (i(y.right, y.top, null, y.bottom), i(u, b.top, b.left, b.bottom)) : i(y.right, y.top, b.left - y.right, y.bottom)), y.bottom < b.top && i(u, y.bottom, null, b.top)
        }
        n.appendChild(s)
    }

    function Bn(e) {
        if (e.state.focused) {
            var t = e.display;
            clearInterval(t.blinker);
            var n = !0;
            t.cursorDiv.style.visibility = "", e.options.cursorBlinkRate > 0 ? t.blinker = setInterval((function() {
                e.hasFocus() || Rn(e), t.cursorDiv.style.visibility = (n = !n) ? "" : "hidden"
            }), e.options.cursorBlinkRate) : e.options.cursorBlinkRate < 0 && (t.cursorDiv.style.visibility = "hidden")
        }
    }

    function Wn(e) {
        e.hasFocus() || (e.display.input.focus(), e.state.focused || _n(e))
    }

    function Hn(e) {
        e.state.delayingBlurEvent = !0, setTimeout((function() {
            e.state.delayingBlurEvent && (e.state.delayingBlurEvent = !1, e.state.focused && Rn(e))
        }), 100)
    }

    function _n(e, t) {
        e.state.delayingBlurEvent && !e.state.draggingText && (e.state.delayingBlurEvent = !1), "nocursor" != e.options.readOnly && (e.state.focused || (F(e, "focus", e, t), e.state.focused = !0, l(e.display.wrapper, "CodeMirror-focused"), e.curOp || e.display.selForContextMenu == e.doc.sel || (e.display.input.reset(), Sa && setTimeout((function() {
            return e.display.input.reset(!0)
        }), 20)), e.display.input.receivedFocus()), Bn(e))
    }

    function Rn(e, t) {
        e.state.delayingBlurEvent || (e.state.focused && (F(e, "blur", e, t), e.state.focused = !1, _a(e.display.wrapper, "CodeMirror-focused")), clearInterval(e.display.blinker), setTimeout((function() {
            e.state.focused || (e.display.shift = !1)
        }), 150))
    }

    function qn(e) {
        for (var t = e.display, n = t.lineDiv.offsetTop, r = Math.max(0, t.scroller.getBoundingClientRect().top), i = t.lineDiv.getBoundingClientRect().top, o = 0, a = 0; a < t.view.length; a++) {
            var l = t.view[a],
                s = e.options.lineWrapping,
                c = void 0,
                u = 0;
            if (!l.hidden) {
                if (i += l.line.height, wa && Ca < 8) {
                    var d = l.node.offsetTop + l.node.offsetHeight;
                    c = d - n, n = d
                } else {
                    var f = l.node.getBoundingClientRect();
                    c = f.bottom - f.top, !s && l.text.firstChild && (u = l.text.firstChild.getBoundingClientRect().right - f.left - 1)
                }
                var h = l.line.height - c;
                if ((h > .005 || h < -.005) && (i < r && (o -= h), ne(l.line, c), Un(l.line), l.rest))
                    for (var p = 0; p < l.rest.length; p++) Un(l.rest[p]);
                if (u > e.display.sizerWidth) {
                    var m = Math.ceil(u / kn(e.display));
                    m > e.display.maxLineLength && (e.display.maxLineLength = m, e.display.maxLine = l.line, e.display.maxLineChanged = !0)
                }
            }
        }
        Math.abs(o) > 2 && (t.scroller.scrollTop += o)
    }

    function Un(e) {
        if (e.widgets)
            for (var t = 0; t < e.widgets.length; ++t) {
                var n = e.widgets[t],
                    r = n.node.parentNode;
                r && (n.height = r.offsetHeight)
            }
    }

    function $n(e, t, n) {
        var r = n && null != n.top ? Math.max(0, n.top) : e.scroller.scrollTop;
        r = Math.floor(r - It(e));
        var i = n && null != n.bottom ? n.bottom : r + e.wrapper.clientHeight,
            o = ie(t, r),
            a = ie(t, i);
        if (n && n.ensure) {
            var l = n.ensure.from.line,
                s = n.ensure.to.line;
            l < o ? (o = l, a = ie(t, nt(J(t, l)) + e.wrapper.clientHeight)) : Math.min(s, t.lastLine()) >= a && (o = ie(t, nt(J(t, s)) - e.wrapper.clientHeight), a = s)
        }
        return {
            from: o,
            to: Math.max(a, o + 1)
        }
    }

    function Kn(e, t) {
        if (!E(e, "scrollCursorIntoView")) {
            var n = e.display,
                i = n.sizer.getBoundingClientRect(),
                o = null;
            if (t.top + i.top < 0 ? o = !0 : t.bottom + i.top > (window.innerHeight || document.documentElement.clientHeight) && (o = !1), null != o && !Oa) {
                var a = r("div", "\u200b", null, "position: absolute;\n                         top: " + (t.top - n.viewOffset - It(e.display)) + "px;\n                         height: " + (t.bottom - t.top + Wt(e) + n.barHeight) + "px;\n                         left: " + t.left + "px; width: " + Math.max(2, t.right - t.left) + "px;");
                e.display.lineSpace.appendChild(a), a.scrollIntoView(o), e.display.lineSpace.removeChild(a)
            }
        }
    }

    function Vn(e, t, n, r) {
        var i;
        null == r && (r = 0), e.options.lineWrapping || t != n || (n = "before" == t.sticky ? le(t.line, t.ch + 1, "before") : t, t = t.ch ? le(t.line, "before" == t.sticky ? t.ch - 1 : t.ch, "after") : t);
        for (var o = 0; o < 5; o++) {
            var a = !1,
                l = cn(e, t),
                s = n && n != t ? cn(e, n) : l,
                c = Yn(e, i = {
                    left: Math.min(l.left, s.left),
                    top: Math.min(l.top, s.top) - r,
                    right: Math.max(l.left, s.left),
                    bottom: Math.max(l.bottom, s.bottom) + r
                }),
                u = e.doc.scrollTop,
                d = e.doc.scrollLeft;
            if (null != c.scrollTop && (nr(e, c.scrollTop), Math.abs(e.doc.scrollTop - u) > 1 && (a = !0)), null != c.scrollLeft && (ir(e, c.scrollLeft), Math.abs(e.doc.scrollLeft - d) > 1 && (a = !0)), !a) break
        }
        return i
    }

    function Gn(e, t) {
        var n = Yn(e, t);
        null != n.scrollTop && nr(e, n.scrollTop), null != n.scrollLeft && ir(e, n.scrollLeft)
    }

    function Yn(e, t) {
        var n = e.display,
            r = bn(e.display);
        t.top < 0 && (t.top = 0);
        var i = e.curOp && null != e.curOp.scrollTop ? e.curOp.scrollTop : n.scroller.scrollTop,
            o = _t(e),
            a = {};
        t.bottom - t.top > o && (t.bottom = t.top + o);
        var l = e.doc.height + jt(n),
            s = t.top < r,
            c = t.bottom > l - r;
        if (t.top < i) a.scrollTop = s ? 0 : t.top;
        else if (t.bottom > i + o) {
            var u = Math.min(t.top, (c ? l : t.bottom) - o);
            u != i && (a.scrollTop = u)
        }
        var d = e.options.fixedGutter ? 0 : n.gutters.offsetWidth,
            f = e.curOp && null != e.curOp.scrollLeft ? e.curOp.scrollLeft : n.scroller.scrollLeft - d,
            h = Ht(e) - n.gutters.offsetWidth,
            p = t.right - t.left > h;
        return p && (t.right = t.left + h), t.left < 10 ? a.scrollLeft = 0 : t.left < f ? a.scrollLeft = Math.max(0, t.left + d - (p ? 0 : 10)) : t.right > h + f - 3 && (a.scrollLeft = t.right + (p ? 0 : 10) - h), a
    }

    function Xn(e, t) {
        null != t && (er(e), e.curOp.scrollTop = (null == e.curOp.scrollTop ? e.doc.scrollTop : e.curOp.scrollTop) + t)
    }

    function Zn(e) {
        er(e);
        var t = e.getCursor();
        e.curOp.scrollToPos = {
            from: t,
            to: t,
            margin: e.options.cursorScrollMargin
        }
    }

    function Qn(e, t, n) {
        null == t && null == n || er(e), null != t && (e.curOp.scrollLeft = t), null != n && (e.curOp.scrollTop = n)
    }

    function Jn(e, t) {
        er(e), e.curOp.scrollToPos = t
    }

    function er(e) {
        var t = e.curOp.scrollToPos;
        t && (e.curOp.scrollToPos = null, tr(e, un(e, t.from), un(e, t.to), t.margin))
    }

    function tr(e, t, n, r) {
        var i = Yn(e, {
            left: Math.min(t.left, n.left),
            top: Math.min(t.top, n.top) - r,
            right: Math.max(t.right, n.right),
            bottom: Math.max(t.bottom, n.bottom) + r
        });
        Qn(e, i.scrollLeft, i.scrollTop)
    }

    function nr(e, t) {
        Math.abs(e.doc.scrollTop - t) < 2 || (ya || Ar(e, {
            top: t
        }), rr(e, t, !0), ya && Ar(e), xr(e, 100))
    }

    function rr(e, t, n) {
        t = Math.max(0, Math.min(e.display.scroller.scrollHeight - e.display.scroller.clientHeight, t)), (e.display.scroller.scrollTop != t || n) && (e.doc.scrollTop = t, e.display.scrollbars.setScrollTop(t), e.display.scroller.scrollTop != t && (e.display.scroller.scrollTop = t))
    }

    function ir(e, t, n, r) {
        t = Math.max(0, Math.min(t, e.display.scroller.scrollWidth - e.display.scroller.clientWidth)), (n ? t == e.doc.scrollLeft : Math.abs(e.doc.scrollLeft - t) < 2) && !r || (e.doc.scrollLeft = t, Er(e), e.display.scroller.scrollLeft != t && (e.display.scroller.scrollLeft = t), e.display.scrollbars.setScrollLeft(t))
    }

    function or(e) {
        var t = e.display,
            n = t.gutters.offsetWidth,
            r = Math.round(e.doc.height + jt(e.display));
        return {
            clientHeight: t.scroller.clientHeight,
            viewHeight: t.wrapper.clientHeight,
            scrollWidth: t.scroller.scrollWidth,
            clientWidth: t.scroller.clientWidth,
            viewWidth: t.wrapper.clientWidth,
            barLeft: e.options.fixedGutter ? n : 0,
            docHeight: r,
            scrollHeight: r + Wt(e) + t.barHeight,
            nativeBarWidth: t.nativeBarWidth,
            gutterWidth: n
        }
    }

    function ar(e, t) {
        t || (t = or(e));
        var n = e.display.barWidth,
            r = e.display.barHeight;
        lr(e, t);
        for (var i = 0; i < 4 && n != e.display.barWidth || r != e.display.barHeight; i++) n != e.display.barWidth && e.options.lineWrapping && qn(e), lr(e, or(e)), n = e.display.barWidth, r = e.display.barHeight
    }

    function lr(e, t) {
        var n = e.display,
            r = n.scrollbars.update(t);
        n.sizer.style.paddingRight = (n.barWidth = r.right) + "px", n.sizer.style.paddingBottom = (n.barHeight = r.bottom) + "px", n.heightForcer.style.borderBottom = r.bottom + "px solid transparent", r.right && r.bottom ? (n.scrollbarFiller.style.display = "block", n.scrollbarFiller.style.height = r.bottom + "px", n.scrollbarFiller.style.width = r.right + "px") : n.scrollbarFiller.style.display = "", r.bottom && e.options.coverGutterNextToScrollbar && e.options.fixedGutter ? (n.gutterFiller.style.display = "block", n.gutterFiller.style.height = r.bottom + "px", n.gutterFiller.style.width = t.gutterWidth + "px") : n.gutterFiller.style.display = ""
    }

    function sr(e) {
        e.display.scrollbars && (e.display.scrollbars.clear(), e.display.scrollbars.addClass && _a(e.display.wrapper, e.display.scrollbars.addClass)), e.display.scrollbars = new Al[e.options.scrollbarStyle]((function(t) {
            e.display.wrapper.insertBefore(t, e.display.scrollbarFiller), il(t, "mousedown", (function() {
                e.state.focused && setTimeout((function() {
                    return e.display.input.focus()
                }), 0)
            })), t.setAttribute("cm-not-content", "true")
        }), (function(t, n) {
            "horizontal" == n ? ir(e, t) : nr(e, t)
        }), e), e.display.scrollbars.addClass && l(e.display.wrapper, e.display.scrollbars.addClass)
    }

    function cr(e) {
        e.curOp = {
            cm: e,
            viewChanged: !1,
            startHeight: e.doc.height,
            forceUpdate: !1,
            updateInput: 0,
            typing: !1,
            changeObjs: null,
            cursorActivityHandlers: null,
            cursorActivityCalled: 0,
            selectionChanged: !1,
            updateMaxLine: !1,
            scrollLeft: null,
            scrollTop: null,
            scrollToPos: null,
            focus: !1,
            id: ++zl,
            markArrays: null
        }, vt(e.curOp)
    }

    function ur(e) {
        var t = e.curOp;
        t && bt(t, (function(e) {
            for (var t = 0; t < e.ops.length; t++) e.ops[t].cm.curOp = null;
            dr(e)
        }))
    }

    function dr(e) {
        for (var t = e.ops, n = 0; n < t.length; n++) fr(t[n]);
        for (var r = 0; r < t.length; r++) hr(t[r]);
        for (var i = 0; i < t.length; i++) pr(t[i]);
        for (var o = 0; o < t.length; o++) mr(t[o]);
        for (var a = 0; a < t.length; a++) gr(t[a])
    }

    function fr(e) {
        var t = e.cm,
            n = t.display;
        Cr(t), e.updateMaxLine && it(t), e.mustUpdate = e.viewChanged || e.forceUpdate || null != e.scrollTop || e.scrollToPos && (e.scrollToPos.from.line < n.viewFrom || e.scrollToPos.to.line >= n.viewTo) || n.maxLineChanged && t.options.lineWrapping, e.update = e.mustUpdate && new Ol(t, e.mustUpdate && {
            top: e.scrollTop,
            ensure: e.scrollToPos
        }, e.forceUpdate)
    }

    function hr(e) {
        e.updatedDisplay = e.mustUpdate && Tr(e.cm, e.update)
    }

    function pr(e) {
        var t = e.cm,
            n = t.display;
        e.updatedDisplay && qn(t), e.barMeasure = or(t), n.maxLineChanged && !t.options.lineWrapping && (e.adjustWidthTo = $t(t, n.maxLine, n.maxLine.text.length).left + 3, t.display.sizerWidth = e.adjustWidthTo, e.barMeasure.scrollWidth = Math.max(n.scroller.clientWidth, n.sizer.offsetLeft + e.adjustWidthTo + Wt(t) + t.display.barWidth), e.maxScrollLeft = Math.max(0, n.sizer.offsetLeft + e.adjustWidthTo - Ht(t))), (e.updatedDisplay || e.selectionChanged) && (e.preparedSelection = n.input.prepareSelection())
    }

    function mr(e) {
        var t = e.cm;
        null != e.adjustWidthTo && (t.display.sizer.style.minWidth = e.adjustWidthTo + "px", e.maxScrollLeft < t.doc.scrollLeft && ir(t, Math.min(t.display.scroller.scrollLeft, e.maxScrollLeft), !0), t.display.maxLineChanged = !1);
        var n = e.focus && e.focus == a();
        e.preparedSelection && t.display.input.showSelection(e.preparedSelection, n), (e.updatedDisplay || e.startHeight != t.doc.height) && ar(t, e.barMeasure), e.updatedDisplay && Fr(t, e.barMeasure), e.selectionChanged && Bn(t), t.state.focused && e.updateInput && t.display.input.reset(e.typing), n && Wn(e.cm)
    }

    function gr(e) {
        var t = e.cm,
            n = t.display,
            r = t.doc;
        (e.updatedDisplay && Mr(t, e.update), null == n.wheelStartX || null == e.scrollTop && null == e.scrollLeft && !e.scrollToPos || (n.wheelStartX = n.wheelStartY = null), null != e.scrollTop && rr(t, e.scrollTop, e.forceScroll), null != e.scrollLeft && ir(t, e.scrollLeft, !0, !0), e.scrollToPos) && Kn(t, Vn(t, pe(r, e.scrollToPos.from), pe(r, e.scrollToPos.to), e.scrollToPos.margin));
        var i = e.maybeHiddenMarkers,
            o = e.maybeUnhiddenMarkers;
        if (i)
            for (var a = 0; a < i.length; ++a) i[a].lines.length || F(i[a], "hide");
        if (o)
            for (var l = 0; l < o.length; ++l) o[l].lines.length && F(o[l], "unhide");
        n.wrapper.offsetHeight && (r.scrollTop = t.display.scroller.scrollTop), e.changeObjs && F(t, "changes", t, e.changeObjs), e.update && e.update.finish()
    }

    function vr(e, t) {
        if (e.curOp) return t();
        cr(e);
        try {
            return t()
        } finally {
            ur(e)
        }
    }

    function yr(e, t) {
        return function() {
            if (e.curOp) return t.apply(e, arguments);
            cr(e);
            try {
                return t.apply(e, arguments)
            } finally {
                ur(e)
            }
        }
    }

    function br(e) {
        return function() {
            if (this.curOp) return e.apply(this, arguments);
            cr(this);
            try {
                return e.apply(this, arguments)
            } finally {
                ur(this)
            }
        }
    }

    function kr(e) {
        return function() {
            var t = this.cm;
            if (!t || t.curOp) return e.apply(this, arguments);
            cr(t);
            try {
                return e.apply(this, arguments)
            } finally {
                ur(t)
            }
        }
    }

    function xr(e, t) {
        e.doc.highlightFrontier < e.display.viewTo && e.state.highlight.set(t, c(wr, e))
    }

    function wr(e) {
        var t = e.doc;
        if (!(t.highlightFrontier >= e.display.viewTo)) {
            var n = +new Date + e.options.workTime,
                r = be(e, t.highlightFrontier),
                i = [];
            t.iter(r.line, Math.min(t.first + t.size, e.display.viewTo + 500), (function(o) {
                if (r.line >= e.display.viewFrom) {
                    var a = o.styles,
                        l = o.text.length > e.options.maxHighlightLength ? X(t.mode, r.state) : null,
                        s = ve(e, o, r, !0);
                    l && (r.state = l), o.styles = s.styles;
                    var c = o.styleClasses,
                        u = s.classes;
                    u ? o.styleClasses = u : c && (o.styleClasses = null);
                    for (var d = !a || a.length != o.styles.length || c != u && (!c || !u || c.bgClass != u.bgClass || c.textClass != u.textClass), f = 0; !d && f < a.length; ++f) d = a[f] != o.styles[f];
                    d && i.push(r.line), o.stateAfter = r.save(), r.nextLine()
                } else o.text.length <= e.options.maxHighlightLength && ke(e, o.text, r), o.stateAfter = r.line % 5 == 0 ? r.save() : null, r.nextLine();
                if (+new Date > n) return xr(e, e.options.workDelay), !0
            })), t.highlightFrontier = r.line, t.modeFrontier = Math.max(t.modeFrontier, r.line), i.length && vr(e, (function() {
                for (var t = 0; t < i.length; t++) An(e, i[t], "text")
            }))
        }
    }

    function Cr(e) {
        var t = e.display;
        !t.scrollbarsClipped && t.scroller.offsetWidth && (t.nativeBarWidth = t.scroller.offsetWidth - t.scroller.clientWidth, t.heightForcer.style.height = Wt(e) + "px", t.sizer.style.marginBottom = -t.nativeBarWidth + "px", t.sizer.style.borderRightWidth = Wt(e) + "px", t.scrollbarsClipped = !0)
    }

    function Sr(e) {
        if (e.hasFocus()) return null;
        var t = a();
        if (!t || !o(e.display.lineDiv, t)) return null;
        var n = {
            activeElt: t
        };
        if (window.getSelection) {
            var r = window.getSelection();
            r.anchorNode && r.extend && o(e.display.lineDiv, r.anchorNode) && (n.anchorNode = r.anchorNode, n.anchorOffset = r.anchorOffset, n.focusNode = r.focusNode, n.focusOffset = r.focusOffset)
        }
        return n
    }

    function Lr(e) {
        if (e && e.activeElt && e.activeElt != a() && (e.activeElt.focus(), !/^(INPUT|TEXTAREA)$/.test(e.activeElt.nodeName) && e.anchorNode && o(document.body, e.anchorNode) && o(document.body, e.focusNode))) {
            var t = window.getSelection(),
                n = document.createRange();
            n.setEnd(e.anchorNode, e.anchorOffset), n.collapse(!1), t.removeAllRanges(), t.addRange(n), t.extend(e.focusNode, e.focusOffset)
        }
    }

    function Tr(e, n) {
        var r = e.display,
            i = e.doc;
        if (n.editorIsHidden) return zn(e), !1;
        if (!n.force && n.visible.from >= r.viewFrom && n.visible.to <= r.viewTo && (null == r.updateLineNumbers || r.updateLineNumbers >= r.viewTo) && r.renderedView == r.view && 0 == En(e)) return !1;
        Nr(e) && (zn(e), n.dims = xn(e));
        var o = i.first + i.size,
            a = Math.max(n.visible.from - e.options.viewportMargin, i.first),
            l = Math.min(o, n.visible.to + e.options.viewportMargin);
        r.viewFrom < a && a - r.viewFrom < 20 && (a = Math.max(i.first, r.viewFrom)), r.viewTo > l && r.viewTo - l < 20 && (l = Math.min(o, r.viewTo)), yl && (a = Qe(e.doc, a), l = Je(e.doc, l));
        var s = a != r.viewFrom || l != r.viewTo || r.lastWrapHeight != n.wrapperHeight || r.lastWrapWidth != n.wrapperWidth;
        Fn(e, a, l), r.viewOffset = nt(J(e.doc, r.viewFrom)), e.display.mover.style.top = r.viewOffset + "px";
        var c = En(e);
        if (!s && 0 == c && !n.force && r.renderedView == r.view && (null == r.updateLineNumbers || r.updateLineNumbers >= r.viewTo)) return !1;
        var u = Sr(e);
        return c > 4 && (r.lineDiv.style.display = "none"), zr(e, r.updateLineNumbers, n.dims), c > 4 && (r.lineDiv.style.display = ""), r.renderedView = r.view, Lr(u), t(r.cursorDiv), t(r.selectionDiv), r.gutters.style.height = r.sizer.style.minHeight = 0, s && (r.lastWrapHeight = n.wrapperHeight, r.lastWrapWidth = n.wrapperWidth, xr(e, 400)), r.updateLineNumbers = null, !0
    }

    function Mr(e, t) {
        for (var n = t.viewport, r = !0;; r = !1) {
            if (r && e.options.lineWrapping && t.oldDisplayWidth != Ht(e)) r && (t.visible = $n(e.display, e.doc, n));
            else if (n && null != n.top && (n = {
                    top: Math.min(e.doc.height + jt(e.display) - _t(e), n.top)
                }), t.visible = $n(e.display, e.doc, n), t.visible.from >= e.display.viewFrom && t.visible.to <= e.display.viewTo) break;
            if (!Tr(e, t)) break;
            qn(e);
            var i = or(e);
            Nn(e), ar(e, i), Fr(e, i), t.force = !1
        }
        t.signal(e, "update", e), e.display.viewFrom == e.display.reportedViewFrom && e.display.viewTo == e.display.reportedViewTo || (t.signal(e, "viewportChange", e, e.display.viewFrom, e.display.viewTo), e.display.reportedViewFrom = e.display.viewFrom, e.display.reportedViewTo = e.display.viewTo)
    }

    function Ar(e, t) {
        var n = new Ol(e, t);
        if (Tr(e, n)) {
            qn(e), Mr(e, n);
            var r = or(e);
            Nn(e), ar(e, r), Fr(e, r), n.finish()
        }
    }

    function zr(e, n, r) {
        function i(t) {
            var n = t.nextSibling;
            return Sa && Da && e.display.currentWheelTarget == t ? t.style.display = "none" : t.parentNode.removeChild(t), n
        }
        for (var o = e.display, a = e.options.lineNumbers, l = o.lineDiv, s = l.firstChild, c = o.view, u = o.viewFrom, d = 0; d < c.length; d++) {
            var h = c[d];
            if (h.hidden);
            else if (h.node && h.node.parentNode == l) {
                for (; s != h.node;) s = i(s);
                var p = a && null != n && n <= u && h.lineNumber;
                h.changes && (f(h.changes, "gutter") > -1 && (p = !1), wt(e, h, u, r)), p && (t(h.lineNumber), h.lineNumber.appendChild(document.createTextNode(ae(e.options, u)))), s = h.node.nextSibling
            } else {
                var m = Ot(e, h, u, r);
                l.insertBefore(m, s)
            }
            u += h.size
        }
        for (; s;) s = i(s)
    }

    function Or(e) {
        var t = e.gutters.offsetWidth;
        e.sizer.style.marginLeft = t + "px", kt(e, "gutterChanged", e)
    }

    function Fr(e, t) {
        e.display.sizer.style.minHeight = t.docHeight + "px", e.display.heightForcer.style.top = t.docHeight + "px", e.display.gutters.style.height = t.docHeight + e.display.barHeight + Wt(e) + "px"
    }

    function Er(e) {
        var t = e.display,
            n = t.view;
        if (t.alignWidgets || t.gutters.firstChild && e.options.fixedGutter) {
            for (var r = wn(t) - t.scroller.scrollLeft + e.doc.scrollLeft, i = t.gutters.offsetWidth, o = r + "px", a = 0; a < n.length; a++)
                if (!n[a].hidden) {
                    e.options.fixedGutter && (n[a].gutter && (n[a].gutter.style.left = o), n[a].gutterBackground && (n[a].gutterBackground.style.left = o));
                    var l = n[a].alignable;
                    if (l)
                        for (var s = 0; s < l.length; s++) l[s].style.left = o
                }
            e.options.fixedGutter && (t.gutters.style.left = r + i + "px")
        }
    }

    function Nr(e) {
        if (!e.options.lineNumbers) return !1;
        var t = e.doc,
            n = ae(e.options, t.first + t.size - 1),
            i = e.display;
        if (n.length != i.lineNumChars) {
            var o = i.measure.appendChild(r("div", [r("div", n)], "CodeMirror-linenumber CodeMirror-gutter-elt")),
                a = o.firstChild.offsetWidth,
                l = o.offsetWidth - a;
            return i.lineGutter.style.width = "", i.lineNumInnerWidth = Math.max(a, i.lineGutter.offsetWidth - l) + 1, i.lineNumWidth = i.lineNumInnerWidth + l, i.lineNumChars = i.lineNumInnerWidth ? n.length : -1, i.lineGutter.style.width = i.lineNumWidth + "px", Or(e.display), !0
        }
        return !1
    }

    function Dr(e, t) {
        for (var n = [], r = !1, i = 0; i < e.length; i++) {
            var o = e[i],
                a = null;
            if ("string" != typeof o && (a = o.style, o = o.className), "CodeMirror-linenumbers" == o) {
                if (!t) continue;
                r = !0
            }
            n.push({
                className: o,
                style: a
            })
        }
        return t && !r && n.push({
            className: "CodeMirror-linenumbers",
            style: null
        }), n
    }

    function Pr(e) {
        var n = e.gutters,
            i = e.gutterSpecs;
        t(n), e.lineGutter = null;
        for (var o = 0; o < i.length; ++o) {
            var a = i[o],
                l = a.className,
                s = a.style,
                c = n.appendChild(r("div", null, "CodeMirror-gutter " + l));
            s && (c.style.cssText = s), "CodeMirror-linenumbers" == l && (e.lineGutter = c, c.style.width = (e.lineNumWidth || 1) + "px")
        }
        n.style.display = i.length ? "" : "none", Or(e)
    }

    function Ir(e) {
        Pr(e.display), Mn(e), Er(e)
    }

    function jr(e, t, n, o) {
        var a = this;
        this.input = n, a.scrollbarFiller = r("div", null, "CodeMirror-scrollbar-filler"), a.scrollbarFiller.setAttribute("cm-not-content", "true"), a.gutterFiller = r("div", null, "CodeMirror-gutter-filler"), a.gutterFiller.setAttribute("cm-not-content", "true"), a.lineDiv = i("div", null, "CodeMirror-code"), a.selectionDiv = r("div", null, null, "position: relative; z-index: 1"), a.cursorDiv = r("div", null, "CodeMirror-cursors"), a.measure = r("div", null, "CodeMirror-measure"), a.lineMeasure = r("div", null, "CodeMirror-measure"), a.lineSpace = i("div", [a.measure, a.lineMeasure, a.selectionDiv, a.cursorDiv, a.lineDiv], null, "position: relative; outline: none");
        var l = i("div", [a.lineSpace], "CodeMirror-lines");
        a.mover = r("div", [l], null, "position: relative"), a.sizer = r("div", [a.mover], "CodeMirror-sizer"), a.sizerWidth = null, a.heightForcer = r("div", null, null, "position: absolute; height: " + Va + "px; width: 1px;"), a.gutters = r("div", null, "CodeMirror-gutters"), a.lineGutter = null, a.scroller = r("div", [a.sizer, a.heightForcer, a.gutters], "CodeMirror-scroll"), a.scroller.setAttribute("tabIndex", "-1"), a.wrapper = r("div", [a.scrollbarFiller, a.gutterFiller, a.scroller], "CodeMirror"), a.wrapper.setAttribute("translate", "no"), wa && Ca < 8 && (a.gutters.style.zIndex = -1, a.scroller.style.paddingRight = 0), Sa || ya && Na || (a.scroller.draggable = !0), e && (e.appendChild ? e.appendChild(a.wrapper) : e(a.wrapper)), a.viewFrom = a.viewTo = t.first, a.reportedViewFrom = a.reportedViewTo = t.first, a.view = [], a.renderedView = null, a.externalMeasured = null, a.viewOffset = 0, a.lastWrapHeight = a.lastWrapWidth = 0, a.updateLineNumbers = null, a.nativeBarWidth = a.barHeight = a.barWidth = 0, a.scrollbarsClipped = !1, a.lineNumWidth = a.lineNumInnerWidth = a.lineNumChars = null, a.alignWidgets = !1, a.cachedCharWidth = a.cachedTextHeight = a.cachedPaddingH = null, a.maxLine = null, a.maxLineLength = 0, a.maxLineChanged = !1, a.wheelDX = a.wheelDY = a.wheelStartX = a.wheelStartY = null, a.shift = !1, a.selForContextMenu = null, a.activeTouch = null, a.gutterSpecs = Dr(o.gutters, o.lineNumbers), Pr(a), n.init(a)
    }

    function Br(e) {
        var t = e.wheelDeltaX,
            n = e.wheelDeltaY;
        return null == t && e.detail && e.axis == e.HORIZONTAL_AXIS && (t = e.detail), null == n && e.detail && e.axis == e.VERTICAL_AXIS ? n = e.detail : null == n && (n = e.wheelDelta), {
            x: t,
            y: n
        }
    }

    function Wr(e) {
        var t = Br(e);
        return t.x *= El, t.y *= El, t
    }

    function Hr(e, t) {
        var n = Br(t),
            r = n.x,
            i = n.y,
            o = El;
        0 === t.deltaMode && (r = t.deltaX, i = t.deltaY, o = 1);
        var a = e.display,
            l = a.scroller,
            s = l.scrollWidth > l.clientWidth,
            c = l.scrollHeight > l.clientHeight;
        if (r && s || i && c) {
            if (i && Da && Sa) e: for (var u = t.target, d = a.view; u != l; u = u.parentNode)
                for (var f = 0; f < d.length; f++)
                    if (d[f].node == u) {
                        e.display.currentWheelTarget = u;
                        break e
                    }
            if (r && !ya && !Ma && null != o) return i && c && nr(e, Math.max(0, l.scrollTop + i * o)), ir(e, Math.max(0, l.scrollLeft + r * o)), (!i || i && c) && I(t), void(a.wheelStartX = null);
            if (i && null != o) {
                var h = i * o,
                    p = e.doc.scrollTop,
                    m = p + a.wrapper.clientHeight;
                h < 0 ? p = Math.max(0, p + h - 50) : m = Math.min(e.doc.height, m + h + 50), Ar(e, {
                    top: p,
                    bottom: m
                })
            }
            Fl < 20 && 0 !== t.deltaMode && (null == a.wheelStartX ? (a.wheelStartX = l.scrollLeft, a.wheelStartY = l.scrollTop, a.wheelDX = r, a.wheelDY = i, setTimeout((function() {
                if (null != a.wheelStartX) {
                    var e = l.scrollLeft - a.wheelStartX,
                        t = l.scrollTop - a.wheelStartY,
                        n = t && a.wheelDY && t / a.wheelDY || e && a.wheelDX && e / a.wheelDX;
                    a.wheelStartX = a.wheelStartY = null, n && (El = (El * Fl + n) / (Fl + 1), ++Fl)
                }
            }), 200)) : (a.wheelDX += r, a.wheelDY += i))
        }
    }

    function _r(e, t, n) {
        var r = e && e.options.selectionsMayTouch,
            i = t[n];
        t.sort((function(e, t) {
            return se(e.from(), t.from())
        })), n = f(t, i);
        for (var o = 1; o < t.length; o++) {
            var a = t[o],
                l = t[o - 1],
                s = se(l.to(), a.from());
            if (r && !a.empty() ? s > 0 : s >= 0) {
                var c = fe(l.from(), a.from()),
                    u = de(l.to(), a.to()),
                    d = l.empty() ? a.from() == a.head : l.from() == l.head;
                o <= n && --n, t.splice(--o, 2, new Dl(d ? u : c, d ? c : u))
            }
        }
        return new Nl(t, n)
    }

    function Rr(e, t) {
        return new Nl([new Dl(e, t || e)], 0)
    }

    function qr(e) {
        return e.text ? le(e.from.line + e.text.length - 1, m(e.text).length + (1 == e.text.length ? e.from.ch : 0)) : e.to
    }

    function Ur(e, t) {
        if (se(e, t.from) < 0) return e;
        if (se(e, t.to) <= 0) return qr(t);
        var n = e.line + t.text.length - (t.to.line - t.from.line) - 1,
            r = e.ch;
        return e.line == t.to.line && (r += qr(t).ch - t.to.ch), le(n, r)
    }

    function $r(e, t) {
        for (var n = [], r = 0; r < e.sel.ranges.length; r++) {
            var i = e.sel.ranges[r];
            n.push(new Dl(Ur(i.anchor, t), Ur(i.head, t)))
        }
        return _r(e.cm, n, e.sel.primIndex)
    }

    function Kr(e, t, n) {
        return e.line == t.line ? le(n.line, e.ch - t.ch + n.ch) : le(n.line + (e.line - t.line), e.ch)
    }

    function Vr(e, t, n) {
        for (var r = [], i = le(e.first, 0), o = i, a = 0; a < t.length; a++) {
            var l = t[a],
                s = Kr(l.from, i, o),
                c = Kr(qr(l), i, o);
            if (i = l.to, o = c, "around" == n) {
                var u = e.sel.ranges[a],
                    d = se(u.head, u.anchor) < 0;
                r[a] = new Dl(d ? c : s, d ? s : c)
            } else r[a] = new Dl(s, s)
        }
        return new Nl(r, e.sel.primIndex)
    }

    function Gr(e) {
        e.doc.mode = G(e.options, e.doc.modeOption), Yr(e)
    }

    function Yr(e) {
        e.doc.iter((function(e) {
            e.stateAfter && (e.stateAfter = null), e.styles && (e.styles = null)
        })), e.doc.modeFrontier = e.doc.highlightFrontier = e.doc.first, xr(e, 100), e.state.modeGen++, e.curOp && Mn(e)
    }

    function Xr(e, t) {
        return 0 == t.from.ch && 0 == t.to.ch && "" == m(t.text) && (!e.cm || e.cm.options.wholeLineUpdateBefore)
    }

    function Zr(e, t, n, r) {
        function i(e) {
            return n ? n[e] : null
        }

        function o(e, n, i) {
            ot(e, n, i, r), kt(e, "change", e, t)
        }

        function a(e, t) {
            for (var n = [], o = e; o < t; ++o) n.push(new bl(c[o], i(o), r));
            return n
        }
        var l = t.from,
            s = t.to,
            c = t.text,
            u = J(e, l.line),
            d = J(e, s.line),
            f = m(c),
            h = i(c.length - 1),
            p = s.line - l.line;
        if (t.full) e.insert(0, a(0, c.length)), e.remove(c.length, e.size - c.length);
        else if (Xr(e, t)) {
            var g = a(0, c.length - 1);
            o(d, d.text, h), p && e.remove(l.line, p), g.length && e.insert(l.line, g)
        } else if (u == d)
            if (1 == c.length) o(u, u.text.slice(0, l.ch) + f + u.text.slice(s.ch), h);
            else {
                var v = a(1, c.length - 1);
                v.push(new bl(f + u.text.slice(s.ch), h, r)), o(u, u.text.slice(0, l.ch) + c[0], i(0)), e.insert(l.line + 1, v)
            }
        else if (1 == c.length) o(u, u.text.slice(0, l.ch) + c[0] + d.text.slice(s.ch), i(0)), e.remove(l.line + 1, p);
        else {
            o(u, u.text.slice(0, l.ch) + c[0], i(0)), o(d, f + d.text.slice(s.ch), h);
            var y = a(1, c.length - 1);
            p > 1 && e.remove(l.line + 1, p - 1), e.insert(l.line + 1, y)
        }
        kt(e, "change", e, t)
    }

    function Qr(e, t, n) {
        function r(e, i, o) {
            if (e.linked)
                for (var a = 0; a < e.linked.length; ++a) {
                    var l = e.linked[a];
                    if (l.doc != i) {
                        var s = o && l.sharedHist;
                        n && !s || (t(l.doc, s), r(l.doc, e, s))
                    }
                }
        }
        r(e, null, !0)
    }

    function Jr(e, t) {
        if (t.cm) throw new Error("This document is already in use.");
        e.doc = t, t.cm = e, Sn(e), Gr(e), ei(e), e.options.direction = t.direction, e.options.lineWrapping || it(e), e.options.mode = t.modeOption, Mn(e)
    }

    function ei(e) {
        ("rtl" == e.doc.direction ? l : _a)(e.display.lineDiv, "CodeMirror-rtl")
    }

    function ti(e) {
        vr(e, (function() {
            ei(e), Mn(e)
        }))
    }

    function ni(e) {
        this.done = [], this.undone = [], this.undoDepth = e ? e.undoDepth : 1 / 0, this.lastModTime = this.lastSelTime = 0, this.lastOp = this.lastSelOp = null, this.lastOrigin = this.lastSelOrigin = null, this.generation = this.maxGeneration = e ? e.maxGeneration : 1
    }

    function ri(e, t) {
        var n = {
            from: ue(t.from),
            to: qr(t),
            text: ee(e, t.from, t.to)
        };
        return ui(e, n, t.from.line, t.to.line + 1), Qr(e, (function(e) {
            return ui(e, n, t.from.line, t.to.line + 1)
        }), !0), n
    }

    function ii(e) {
        for (; e.length;) {
            if (!m(e).ranges) break;
            e.pop()
        }
    }

    function oi(e, t) {
        return t ? (ii(e.done), m(e.done)) : e.done.length && !m(e.done).ranges ? m(e.done) : e.done.length > 1 && !e.done[e.done.length - 2].ranges ? (e.done.pop(), m(e.done)) : void 0
    }

    function ai(e, t, n, r) {
        var i = e.history;
        i.undone.length = 0;
        var o, a, l = +new Date;
        if ((i.lastOp == r || i.lastOrigin == t.origin && t.origin && ("+" == t.origin.charAt(0) && i.lastModTime > l - (e.cm ? e.cm.options.historyEventDelay : 500) || "*" == t.origin.charAt(0))) && (o = oi(i, i.lastOp == r))) a = m(o.changes), 0 == se(t.from, t.to) && 0 == se(t.from, a.to) ? a.to = qr(t) : o.changes.push(ri(e, t));
        else {
            var s = m(i.done);
            for (s && s.ranges || ci(e.sel, i.done), o = {
                    changes: [ri(e, t)],
                    generation: i.generation
                }, i.done.push(o); i.done.length > i.undoDepth;) i.done.shift(), i.done[0].ranges || i.done.shift()
        }
        i.done.push(n), i.generation = ++i.maxGeneration, i.lastModTime = i.lastSelTime = l, i.lastOp = i.lastSelOp = r, i.lastOrigin = i.lastSelOrigin = t.origin, a || F(e, "historyAdded")
    }

    function li(e, t, n, r) {
        var i = t.charAt(0);
        return "*" == i || "+" == i && n.ranges.length == r.ranges.length && n.somethingSelected() == r.somethingSelected() && new Date - e.history.lastSelTime <= (e.cm ? e.cm.options.historyEventDelay : 500)
    }

    function si(e, t, n, r) {
        var i = e.history,
            o = r && r.origin;
        n == i.lastSelOp || o && i.lastSelOrigin == o && (i.lastModTime == i.lastSelTime && i.lastOrigin == o || li(e, o, m(i.done), t)) ? i.done[i.done.length - 1] = t : ci(t, i.done), i.lastSelTime = +new Date, i.lastSelOrigin = o, i.lastSelOp = n, r && !1 !== r.clearRedo && ii(i.undone)
    }

    function ci(e, t) {
        var n = m(t);
        n && n.ranges && n.equals(e) || t.push(e)
    }

    function ui(e, t, n, r) {
        var i = t["spans_" + e.id],
            o = 0;
        e.iter(Math.max(e.first, n), Math.min(e.first + e.size, r), (function(n) {
            n.markedSpans && ((i || (i = t["spans_" + e.id] = {}))[o] = n.markedSpans), ++o
        }))
    }

    function di(e) {
        if (!e) return null;
        for (var t, n = 0; n < e.length; ++n) e[n].marker.explicitlyCleared ? t || (t = e.slice(0, n)) : t && t.push(e[n]);
        return t ? t.length ? t : null : e
    }

    function fi(e, t) {
        var n = t["spans_" + e.id];
        if (!n) return null;
        for (var r = [], i = 0; i < t.text.length; ++i) r.push(di(n[i]));
        return r
    }

    function hi(e, t) {
        var n = fi(e, t),
            r = Ie(e, t);
        if (!n) return r;
        if (!r) return n;
        for (var i = 0; i < n.length; ++i) {
            var o = n[i],
                a = r[i];
            if (o && a) e: for (var l = 0; l < a.length; ++l) {
                for (var s = a[l], c = 0; c < o.length; ++c)
                    if (o[c].marker == s.marker) continue e;
                o.push(s)
            } else a && (n[i] = a)
        }
        return n
    }

    function pi(e, t, n) {
        for (var r = [], i = 0; i < e.length; ++i) {
            var o = e[i];
            if (o.ranges) r.push(n ? Nl.prototype.deepCopy.call(o) : o);
            else {
                var a = o.changes,
                    l = [];
                r.push({
                    changes: l
                });
                for (var s = 0; s < a.length; ++s) {
                    var c = a[s],
                        u = void 0;
                    if (l.push({
                            from: c.from,
                            to: c.to,
                            text: c.text
                        }), t)
                        for (var d in c)(u = d.match(/^spans_(\d+)$/)) && f(t, Number(u[1])) > -1 && (m(l)[d] = c[d], delete c[d])
                }
            }
        }
        return r
    }

    function mi(e, t, n, r) {
        if (r) {
            var i = e.anchor;
            if (n) {
                var o = se(t, i) < 0;
                o != se(n, i) < 0 ? (i = t, t = n) : o != se(t, n) < 0 && (t = n)
            }
            return new Dl(i, t)
        }
        return new Dl(n || t, t)
    }

    function gi(e, t, n, r, i) {
        null == i && (i = e.cm && (e.cm.display.shift || e.extend)), wi(e, new Nl([mi(e.sel.primary(), t, n, i)], 0), r)
    }

    function vi(e, t, n) {
        for (var r = [], i = e.cm && (e.cm.display.shift || e.extend), o = 0; o < e.sel.ranges.length; o++) r[o] = mi(e.sel.ranges[o], t[o], null, i);
        wi(e, _r(e.cm, r, e.sel.primIndex), n)
    }

    function yi(e, t, n, r) {
        var i = e.sel.ranges.slice(0);
        i[t] = n, wi(e, _r(e.cm, i, e.sel.primIndex), r)
    }

    function bi(e, t, n, r) {
        wi(e, Rr(t, n), r)
    }

    function ki(e, t, n) {
        var r = {
            ranges: t.ranges,
            update: function(t) {
                this.ranges = [];
                for (var n = 0; n < t.length; n++) this.ranges[n] = new Dl(pe(e, t[n].anchor), pe(e, t[n].head))
            },
            origin: n && n.origin
        };
        return F(e, "beforeSelectionChange", e, r), e.cm && F(e.cm, "beforeSelectionChange", e.cm, r), r.ranges != t.ranges ? _r(e.cm, r.ranges, r.ranges.length - 1) : t
    }

    function xi(e, t, n) {
        var r = e.history.done,
            i = m(r);
        i && i.ranges ? (r[r.length - 1] = t, Ci(e, t, n)) : wi(e, t, n)
    }

    function wi(e, t, n) {
        Ci(e, t, n), si(e, e.sel, e.cm ? e.cm.curOp.id : NaN, n)
    }

    function Ci(e, t, n) {
        (D(e, "beforeSelectionChange") || e.cm && D(e.cm, "beforeSelectionChange")) && (t = ki(e, t, n));
        var r = n && n.bias || (se(t.primary().head, e.sel.primary().head) < 0 ? -1 : 1);
        Si(e, Ti(e, t, r, !0)), n && !1 === n.scroll || !e.cm || "nocursor" == e.cm.getOption("readOnly") || Zn(e.cm)
    }

    function Si(e, t) {
        t.equals(e.sel) || (e.sel = t, e.cm && (e.cm.curOp.updateInput = 1, e.cm.curOp.selectionChanged = !0, N(e.cm)), kt(e, "cursorActivity", e))
    }

    function Li(e) {
        Si(e, Ti(e, e.sel, null, !1))
    }

    function Ti(e, t, n, r) {
        for (var i, o = 0; o < t.ranges.length; o++) {
            var a = t.ranges[o],
                l = t.ranges.length == e.sel.ranges.length && e.sel.ranges[o],
                s = Ai(e, a.anchor, l && l.anchor, n, r),
                c = Ai(e, a.head, l && l.head, n, r);
            (i || s != a.anchor || c != a.head) && (i || (i = t.ranges.slice(0, o)), i[o] = new Dl(s, c))
        }
        return i ? _r(e.cm, i, t.primIndex) : t
    }

    function Mi(e, t, n, r, i) {
        var o = J(e, t.line);
        if (o.markedSpans)
            for (var a = 0; a < o.markedSpans.length; ++a) {
                var l = o.markedSpans[a],
                    s = l.marker,
                    c = "selectLeft" in s ? !s.selectLeft : s.inclusiveLeft,
                    u = "selectRight" in s ? !s.selectRight : s.inclusiveRight;
                if ((null == l.from || (c ? l.from <= t.ch : l.from < t.ch)) && (null == l.to || (u ? l.to >= t.ch : l.to > t.ch))) {
                    if (i && (F(s, "beforeCursorEnter"), s.explicitlyCleared)) {
                        if (o.markedSpans) {
                            --a;
                            continue
                        }
                        break
                    }
                    if (!s.atomic) continue;
                    if (n) {
                        var d = s.find(r < 0 ? 1 : -1),
                            f = void 0;
                        if ((r < 0 ? u : c) && (d = zi(e, d, -r, d && d.line == t.line ? o : null)), d && d.line == t.line && (f = se(d, n)) && (r < 0 ? f < 0 : f > 0)) return Mi(e, d, t, r, i)
                    }
                    var h = s.find(r < 0 ? -1 : 1);
                    return (r < 0 ? c : u) && (h = zi(e, h, r, h.line == t.line ? o : null)), h ? Mi(e, h, t, r, i) : null
                }
            }
        return t
    }

    function Ai(e, t, n, r, i) {
        var o = r || 1,
            a = Mi(e, t, n, o, i) || !i && Mi(e, t, n, o, !0) || Mi(e, t, n, -o, i) || !i && Mi(e, t, n, -o, !0);
        return a || (e.cantEdit = !0, le(e.first, 0))
    }

    function zi(e, t, n, r) {
        return n < 0 && 0 == t.ch ? t.line > e.first ? pe(e, le(t.line - 1)) : null : n > 0 && t.ch == (r || J(e, t.line)).text.length ? t.line < e.first + e.size - 1 ? le(t.line + 1, 0) : null : new le(t.line, t.ch + n)
    }

    function Oi(e) {
        e.setSelection(le(e.firstLine(), 0), le(e.lastLine()), Ya)
    }

    function Fi(e, t, n) {
        var r = {
            canceled: !1,
            from: t.from,
            to: t.to,
            text: t.text,
            origin: t.origin,
            cancel: function() {
                return r.canceled = !0
            }
        };
        return n && (r.update = function(t, n, i, o) {
            t && (r.from = pe(e, t)), n && (r.to = pe(e, n)), i && (r.text = i), void 0 !== o && (r.origin = o)
        }), F(e, "beforeChange", e, r), e.cm && F(e.cm, "beforeChange", e.cm, r), r.canceled ? (e.cm && (e.cm.curOp.updateInput = 2), null) : {
            from: r.from,
            to: r.to,
            text: r.text,
            origin: r.origin
        }
    }

    function Ei(e, t, n) {
        if (e.cm) {
            if (!e.cm.curOp) return yr(e.cm, Ei)(e, t, n);
            if (e.cm.state.suppressEdits) return
        }
        if (!(D(e, "beforeChange") || e.cm && D(e.cm, "beforeChange")) || (t = Fi(e, t, !0))) {
            var r = vl && !n && Be(e, t.from, t.to);
            if (r)
                for (var i = r.length - 1; i >= 0; --i) Ni(e, {
                    from: r[i].from,
                    to: r[i].to,
                    text: i ? [""] : t.text,
                    origin: t.origin
                });
            else Ni(e, t)
        }
    }

    function Ni(e, t) {
        if (1 != t.text.length || "" != t.text[0] || 0 != se(t.from, t.to)) {
            var n = $r(e, t);
            ai(e, t, n, e.cm ? e.cm.curOp.id : NaN), Ii(e, t, n, Ie(e, t));
            var r = [];
            Qr(e, (function(e, n) {
                n || -1 != f(r, e.history) || (_i(e.history, t), r.push(e.history)), Ii(e, t, null, Ie(e, t))
            }))
        }
    }

    function Di(e, t, n) {
        var r = e.cm && e.cm.state.suppressEdits;
        if (!r || n) {
            for (var i, o = e.history, a = e.sel, l = "undo" == t ? o.done : o.undone, s = "undo" == t ? o.undone : o.done, c = 0; c < l.length && (i = l[c], n ? !i.ranges || i.equals(e.sel) : i.ranges); c++);
            if (c != l.length) {
                for (o.lastOrigin = o.lastSelOrigin = null;;) {
                    if (!(i = l.pop()).ranges) {
                        if (r) return void l.push(i);
                        break
                    }
                    if (ci(i, s), n && !i.equals(e.sel)) return void wi(e, i, {
                        clearRedo: !1
                    });
                    a = i
                }
                var u = [];
                ci(a, s), s.push({
                    changes: u,
                    generation: o.generation
                }), o.generation = i.generation || ++o.maxGeneration;
                for (var d = D(e, "beforeChange") || e.cm && D(e.cm, "beforeChange"), h = function(n) {
                        var r = i.changes[n];
                        if (r.origin = t, d && !Fi(e, r, !1)) return l.length = 0, {};
                        u.push(ri(e, r));
                        var o = n ? $r(e, r) : m(l);
                        Ii(e, r, o, hi(e, r)), !n && e.cm && e.cm.scrollIntoView({
                            from: r.from,
                            to: qr(r)
                        });
                        var a = [];
                        Qr(e, (function(e, t) {
                            t || -1 != f(a, e.history) || (_i(e.history, r), a.push(e.history)), Ii(e, r, null, hi(e, r))
                        }))
                    }, p = i.changes.length - 1; p >= 0; --p) {
                    var g = h(p);
                    if (g) return g.v
                }
            }
        }
    }

    function Pi(e, t) {
        if (0 != t && (e.first += t, e.sel = new Nl(g(e.sel.ranges, (function(e) {
                return new Dl(le(e.anchor.line + t, e.anchor.ch), le(e.head.line + t, e.head.ch))
            })), e.sel.primIndex), e.cm)) {
            Mn(e.cm, e.first, e.first - t, t);
            for (var n = e.cm.display, r = n.viewFrom; r < n.viewTo; r++) An(e.cm, r, "gutter")
        }
    }

    function Ii(e, t, n, r) {
        if (e.cm && !e.cm.curOp) return yr(e.cm, Ii)(e, t, n, r);
        if (t.to.line < e.first) Pi(e, t.text.length - 1 - (t.to.line - t.from.line));
        else if (!(t.from.line > e.lastLine())) {
            if (t.from.line < e.first) {
                var i = t.text.length - 1 - (e.first - t.from.line);
                Pi(e, i), t = {
                    from: le(e.first, 0),
                    to: le(t.to.line + i, t.to.ch),
                    text: [m(t.text)],
                    origin: t.origin
                }
            }
            var o = e.lastLine();
            t.to.line > o && (t = {
                from: t.from,
                to: le(o, J(e, o).text.length),
                text: [t.text[0]],
                origin: t.origin
            }), t.removed = ee(e, t.from, t.to), n || (n = $r(e, t)), e.cm ? ji(e.cm, t, r) : Zr(e, t, r), Ci(e, n, Ya), e.cantEdit && Ai(e, le(e.firstLine(), 0)) && (e.cantEdit = !1)
        }
    }

    function ji(e, t, n) {
        var r = e.doc,
            i = e.display,
            o = t.from,
            a = t.to,
            l = !1,
            s = o.line;
        e.options.lineWrapping || (s = re(Ye(J(r, o.line))), r.iter(s, a.line + 1, (function(e) {
            if (e == i.maxLine) return l = !0, !0
        }))), r.sel.contains(t.from, t.to) > -1 && N(e), Zr(r, t, n, Cn(e)), e.options.lineWrapping || (r.iter(s, o.line + t.text.length, (function(e) {
            var t = rt(e);
            t > i.maxLineLength && (i.maxLine = e, i.maxLineLength = t, i.maxLineChanged = !0, l = !1)
        })), l && (e.curOp.updateMaxLine = !0)), Me(r, o.line), xr(e, 400);
        var c = t.text.length - (a.line - o.line) - 1;
        t.full ? Mn(e) : o.line != a.line || 1 != t.text.length || Xr(e.doc, t) ? Mn(e, o.line, a.line + 1, c) : An(e, o.line, "text");
        var u = D(e, "changes"),
            d = D(e, "change");
        if (d || u) {
            var f = {
                from: o,
                to: a,
                text: t.text,
                removed: t.removed,
                origin: t.origin
            };
            d && kt(e, "change", e, f), u && (e.curOp.changeObjs || (e.curOp.changeObjs = [])).push(f)
        }
        e.display.selForContextMenu = null
    }

    function Bi(e, t, n, r, i) {
        var o;
        r || (r = n), se(r, n) < 0 && (n = (o = [r, n])[0], r = o[1]), "string" == typeof t && (t = e.splitLines(t)), Ei(e, {
            from: n,
            to: r,
            text: t,
            origin: i
        })
    }

    function Wi(e, t, n, r) {
        n < e.line ? e.line += r : t < e.line && (e.line = t, e.ch = 0)
    }

    function Hi(e, t, n, r) {
        for (var i = 0; i < e.length; ++i) {
            var o = e[i],
                a = !0;
            if (o.ranges) {
                o.copied || ((o = e[i] = o.deepCopy()).copied = !0);
                for (var l = 0; l < o.ranges.length; l++) Wi(o.ranges[l].anchor, t, n, r), Wi(o.ranges[l].head, t, n, r)
            } else {
                for (var s = 0; s < o.changes.length; ++s) {
                    var c = o.changes[s];
                    if (n < c.from.line) c.from = le(c.from.line + r, c.from.ch), c.to = le(c.to.line + r, c.to.ch);
                    else if (t <= c.to.line) {
                        a = !1;
                        break
                    }
                }
                a || (e.splice(0, i + 1), i = 0)
            }
        }
    }

    function _i(e, t) {
        var n = t.from.line,
            r = t.to.line,
            i = t.text.length - (r - n) - 1;
        Hi(e.done, n, r, i), Hi(e.undone, n, r, i)
    }

    function Ri(e, t, n, r) {
        var i = t,
            o = t;
        return "number" == typeof t ? o = J(e, he(e, t)) : i = re(t), null == i ? null : (r(o, i) && e.cm && An(e.cm, i, n), o)
    }

    function qi(e) {
        this.lines = e, this.parent = null;
        for (var t = 0, n = 0; n < e.length; ++n) e[n].parent = this, t += e[n].height;
        this.height = t
    }

    function Ui(e) {
        this.children = e;
        for (var t = 0, n = 0, r = 0; r < e.length; ++r) {
            var i = e[r];
            t += i.chunkSize(), n += i.height, i.parent = this
        }
        this.size = t, this.height = n, this.parent = null
    }

    function $i(e, t, n) {
        nt(t) < (e.curOp && e.curOp.scrollTop || e.doc.scrollTop) && Xn(e, n)
    }

    function Ki(e, t, n, r) {
        var i = new Pl(e, n, r),
            o = e.cm;
        return o && i.noHScroll && (o.display.alignWidgets = !0), Ri(e, t, "widget", (function(t) {
            var n = t.widgets || (t.widgets = []);
            if (null == i.insertAt ? n.push(i) : n.splice(Math.min(n.length, Math.max(0, i.insertAt)), 0, i), i.line = t, o && !et(e, t)) {
                var r = nt(t) < e.scrollTop;
                ne(t, t.height + Dt(i)), r && Xn(o, i.height), o.curOp.forceUpdate = !0
            }
            return !0
        })), o && kt(o, "lineWidgetAdded", o, i, "number" == typeof t ? t : re(t)), i
    }

    function Vi(e, t, n, r, o) {
        if (r && r.shared) return Gi(e, t, n, r, o);
        if (e.cm && !e.cm.curOp) return yr(e.cm, Vi)(e, t, n, r, o);
        var a = new jl(e, o),
            l = se(t, n);
        if (r && u(r, a, !1), l > 0 || 0 == l && !1 !== a.clearWhenEmpty) return a;
        if (a.replacedWith && (a.collapsed = !0, a.widgetNode = i("span", [a.replacedWith], "CodeMirror-widget"), r.handleMouseEvents || a.widgetNode.setAttribute("cm-ignore-events", "true"), r.insertLeft && (a.widgetNode.insertLeft = !0)), a.collapsed) {
            if (Ge(e, t.line, t, n, a) || t.line != n.line && Ge(e, n.line, t, n, a)) throw new Error("Inserting collapsed marker partially overlapping an existing one");
            ze()
        }
        a.addToHistory && ai(e, {
            from: t,
            to: n,
            origin: "markText"
        }, e.sel, NaN);
        var s, c = t.line,
            d = e.cm;
        if (e.iter(c, n.line + 1, (function(r) {
                d && a.collapsed && !d.options.lineWrapping && Ye(r) == d.display.maxLine && (s = !0), a.collapsed && c != t.line && ne(r, 0), Ne(r, new Oe(a, c == t.line ? t.ch : null, c == n.line ? n.ch : null), e.cm && e.cm.curOp), ++c
            })), a.collapsed && e.iter(t.line, n.line + 1, (function(t) {
                et(e, t) && ne(t, 0)
            })), a.clearOnEnter && il(a, "beforeCursorEnter", (function() {
                return a.clear()
            })), a.readOnly && (Ae(), (e.history.done.length || e.history.undone.length) && e.clearHistory()), a.collapsed && (a.id = ++Il, a.atomic = !0), d) {
            if (s && (d.curOp.updateMaxLine = !0), a.collapsed) Mn(d, t.line, n.line + 1);
            else if (a.className || a.startStyle || a.endStyle || a.css || a.attributes || a.title)
                for (var f = t.line; f <= n.line; f++) An(d, f, "text");
            a.atomic && Li(d.doc), kt(d, "markerAdded", d, a)
        }
        return a
    }

    function Gi(e, t, n, r, i) {
        (r = u(r)).shared = !1;
        var o = [Vi(e, t, n, r, i)],
            a = o[0],
            l = r.widgetNode;
        return Qr(e, (function(e) {
            l && (r.widgetNode = l.cloneNode(!0)), o.push(Vi(e, pe(e, t), pe(e, n), r, i));
            for (var s = 0; s < e.linked.length; ++s)
                if (e.linked[s].isParent) return;
            a = m(o)
        })), new Bl(o, a)
    }

    function Yi(e) {
        return e.findMarks(le(e.first, 0), e.clipPos(le(e.lastLine())), (function(e) {
            return e.parent
        }))
    }

    function Xi(e, t) {
        for (var n = 0; n < t.length; n++) {
            var r = t[n],
                i = r.find(),
                o = e.clipPos(i.from),
                a = e.clipPos(i.to);
            if (se(o, a)) {
                var l = Vi(e, o, a, r.primary, r.primary.type);
                r.markers.push(l), l.parent = r
            }
        }
    }

    function Zi(e) {
        for (var t = function(t) {
                var n = e[t],
                    r = [n.primary.doc];
                Qr(n.primary.doc, (function(e) {
                    return r.push(e)
                }));
                for (var i = 0; i < n.markers.length; i++) {
                    var o = n.markers[i]; - 1 == f(r, o.doc) && (o.parent = null, n.markers.splice(i--, 1))
                }
            }, n = 0; n < e.length; n++) t(n)
    }

    function Qi(e) {
        var t = this;
        if (to(t), !E(t, e) && !Pt(t.display, e)) {
            I(e), wa && (_l = +new Date);
            var n = Ln(t, e, !0),
                r = e.dataTransfer.files;
            if (n && !t.isReadOnly())
                if (r && r.length && window.FileReader && window.File)
                    for (var i = r.length, o = Array(i), a = 0, l = function() {
                            ++a == i && yr(t, (function() {
                                var e = {
                                    from: n = pe(t.doc, n),
                                    to: n,
                                    text: t.doc.splitLines(o.filter((function(e) {
                                        return null != e
                                    })).join(t.doc.lineSeparator())),
                                    origin: "paste"
                                };
                                Ei(t.doc, e), xi(t.doc, Rr(pe(t.doc, n), pe(t.doc, qr(e))))
                            }))()
                        }, s = function(e, n) {
                            if (t.options.allowDropFileTypes && -1 == f(t.options.allowDropFileTypes, e.type)) l();
                            else {
                                var r = new FileReader;
                                r.onerror = function() {
                                    return l()
                                }, r.onload = function() {
                                    var e = r.result;
                                    /[\x00-\x08\x0e-\x1f]{2}/.test(e) || (o[n] = e), l()
                                }, r.readAsText(e)
                            }
                        }, c = 0; c < r.length; c++) s(r[c], c);
                else {
                    if (t.state.draggingText && t.doc.sel.contains(n) > -1) return t.state.draggingText(e), void setTimeout((function() {
                        return t.display.input.focus()
                    }), 20);
                    try {
                        var u = e.dataTransfer.getData("Text");
                        if (u) {
                            var d;
                            if (t.state.draggingText && !t.state.draggingText.copy && (d = t.listSelections()), Ci(t.doc, Rr(n, n)), d)
                                for (var h = 0; h < d.length; ++h) Bi(t.doc, "", d[h].anchor, d[h].head, "drag");
                            t.replaceSelection(u, "around", "paste"), t.display.input.focus()
                        }
                    } catch (e) {}
                }
        }
    }

    function Ji(e, t) {
        if (wa && (!e.state.draggingText || +new Date - _l < 100)) W(t);
        else if (!E(e, t) && !Pt(e.display, t) && (t.dataTransfer.setData("Text", e.getSelection()), t.dataTransfer.effectAllowed = "copyMove", t.dataTransfer.setDragImage && !Aa)) {
            var n = r("img", null, null, "position: fixed; left: 0; top: 0;");
            n.src = "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==", Ma && (n.width = n.height = 1, e.display.wrapper.appendChild(n), n._top = n.offsetTop), t.dataTransfer.setDragImage(n, 0, 0), Ma && n.parentNode.removeChild(n)
        }
    }

    function eo(e, t) {
        var i = Ln(e, t);
        if (i) {
            var o = document.createDocumentFragment();
            Pn(e, i, o), e.display.dragCursor || (e.display.dragCursor = r("div", null, "CodeMirror-cursors CodeMirror-dragcursors"), e.display.lineSpace.insertBefore(e.display.dragCursor, e.display.cursorDiv)), n(e.display.dragCursor, o)
        }
    }

    function to(e) {
        e.display.dragCursor && (e.display.lineSpace.removeChild(e.display.dragCursor), e.display.dragCursor = null)
    }

    function no(e) {
        if (document.getElementsByClassName) {
            for (var t = document.getElementsByClassName("CodeMirror"), n = [], r = 0; r < t.length; r++) {
                var i = t[r].CodeMirror;
                i && n.push(i)
            }
            n.length && n[0].operation((function() {
                for (var t = 0; t < n.length; t++) e(n[t])
            }))
        }
    }

    function ro() {
        Rl || (io(), Rl = !0)
    }

    function io() {
        var e;
        il(window, "resize", (function() {
            null == e && (e = setTimeout((function() {
                e = null, no(oo)
            }), 100))
        })), il(window, "blur", (function() {
            return no(Rn)
        }))
    }

    function oo(e) {
        var t = e.display;
        t.cachedCharWidth = t.cachedTextHeight = t.cachedPaddingH = null, t.scrollbarsClipped = !1, e.setSize()
    }

    function ao(e) {
        var t, n, r, i, o = e.split(/-(?!$)/);
        e = o[o.length - 1];
        for (var a = 0; a < o.length - 1; a++) {
            var l = o[a];
            if (/^(cmd|meta|m)$/i.test(l)) i = !0;
            else if (/^a(lt)?$/i.test(l)) t = !0;
            else if (/^(c|ctrl|control)$/i.test(l)) n = !0;
            else {
                if (!/^s(hift)?$/i.test(l)) throw new Error("Unrecognized modifier name: " + l);
                r = !0
            }
        }
        return t && (e = "Alt-" + e), n && (e = "Ctrl-" + e), i && (e = "Cmd-" + e), r && (e = "Shift-" + e), e
    }

    function lo(e) {
        var t = {};
        for (var n in e)
            if (e.hasOwnProperty(n)) {
                var r = e[n];
                if (/^(name|fallthrough|(de|at)tach)$/.test(n)) continue;
                if ("..." == r) {
                    delete e[n];
                    continue
                }
                for (var i = g(n.split(" "), ao), o = 0; o < i.length; o++) {
                    var a = void 0,
                        l = void 0;
                    o == i.length - 1 ? (l = i.join(" "), a = r) : (l = i.slice(0, o + 1).join(" "), a = "...");
                    var s = t[l];
                    if (s) {
                        if (s != a) throw new Error("Inconsistent bindings for " + l)
                    } else t[l] = a
                }
                delete e[n]
            }
        for (var c in t) e[c] = t[c];
        return e
    }

    function so(e, t, n, r) {
        var i = (t = ho(t)).call ? t.call(e, r) : t[e];
        if (!1 === i) return "nothing";
        if ("..." === i) return "multi";
        if (null != i && n(i)) return "handled";
        if (t.fallthrough) {
            if ("[object Array]" != Object.prototype.toString.call(t.fallthrough)) return so(e, t.fallthrough, n, r);
            for (var o = 0; o < t.fallthrough.length; o++) {
                var a = so(e, t.fallthrough[o], n, r);
                if (a) return a
            }
        }
    }

    function co(e) {
        var t = "string" == typeof e ? e : ql[e.keyCode];
        return "Ctrl" == t || "Alt" == t || "Shift" == t || "Mod" == t
    }

    function uo(e, t, n) {
        var r = e;
        return t.altKey && "Alt" != r && (e = "Alt-" + e), (Wa ? t.metaKey : t.ctrlKey) && "Ctrl" != r && (e = "Ctrl-" + e), (Wa ? t.ctrlKey : t.metaKey) && "Mod" != r && (e = "Cmd-" + e), !n && t.shiftKey && "Shift" != r && (e = "Shift-" + e), e
    }

    function fo(e, t) {
        if (Ma && 34 == e.keyCode && e.char) return !1;
        var n = ql[e.keyCode];
        return null != n && !e.altGraphKey && (3 == e.keyCode && e.code && (n = e.code), uo(n, e, t))
    }

    function ho(e) {
        return "string" == typeof e ? Vl[e] : e
    }

    function po(e, t) {
        for (var n = e.doc.sel.ranges, r = [], i = 0; i < n.length; i++) {
            for (var o = t(n[i]); r.length && se(o.from, m(r).to) <= 0;) {
                var a = r.pop();
                if (se(a.from, o.from) < 0) {
                    o.from = a.from;
                    break
                }
            }
            r.push(o)
        }
        vr(e, (function() {
            for (var t = r.length - 1; t >= 0; t--) Bi(e.doc, "", r[t].from, r[t].to, "+delete");
            Zn(e)
        }))
    }

    function mo(e, t, n) {
        var r = S(e.text, t + n, n);
        return r < 0 || r > e.text.length ? null : r
    }

    function go(e, t, n) {
        var r = mo(e, t.ch, n);
        return null == r ? null : new le(t.line, r, n < 0 ? "after" : "before")
    }

    function vo(e, t, n, r, i) {
        if (e) {
            "rtl" == t.doc.direction && (i = -i);
            var o = A(n, t.doc.direction);
            if (o) {
                var a, l = i < 0 ? m(o) : o[0],
                    s = i < 0 == (1 == l.level) ? "after" : "before";
                if (l.level > 0 || "rtl" == t.doc.direction) {
                    var c = Vt(t, n);
                    a = i < 0 ? n.text.length - 1 : 0;
                    var u = Gt(t, c, a).top;
                    a = L((function(e) {
                        return Gt(t, c, e).top == u
                    }), i < 0 == (1 == l.level) ? l.from : l.to - 1, a), "before" == s && (a = mo(n, a, 1))
                } else a = i < 0 ? l.to : l.from;
                return new le(r, a, s)
            }
        }
        return new le(r, i < 0 ? n.text.length : 0, i < 0 ? "before" : "after")
    }

    function yo(e, t, n, r) {
        var i = A(t, e.doc.direction);
        if (!i) return go(t, n, r);
        n.ch >= t.text.length ? (n.ch = t.text.length, n.sticky = "before") : n.ch <= 0 && (n.ch = 0, n.sticky = "after");
        var o = M(i, n.ch, n.sticky),
            a = i[o];
        if ("ltr" == e.doc.direction && a.level % 2 == 0 && (r > 0 ? a.to > n.ch : a.from < n.ch)) return go(t, n, r);
        var l, s = function(e, n) {
                return mo(t, e instanceof le ? e.ch : e, n)
            },
            c = function(n) {
                return e.options.lineWrapping ? (l = l || Vt(e, t), pn(e, t, l, n)) : {
                    begin: 0,
                    end: t.text.length
                }
            },
            u = c("before" == n.sticky ? s(n, -1) : n.ch);
        if ("rtl" == e.doc.direction || 1 == a.level) {
            var d = 1 == a.level == r < 0,
                f = s(n, d ? 1 : -1);
            if (null != f && (d ? f <= a.to && f <= u.end : f >= a.from && f >= u.begin)) {
                var h = d ? "before" : "after";
                return new le(n.line, f, h)
            }
        }
        var p = function(e, t, r) {
                for (var o = function(e, t) {
                        return t ? new le(n.line, s(e, 1), "before") : new le(n.line, e, "after")
                    }; e >= 0 && e < i.length; e += t) {
                    var a = i[e],
                        l = t > 0 == (1 != a.level),
                        c = l ? r.begin : s(r.end, -1);
                    if (a.from <= c && c < a.to) return o(c, l);
                    if (c = l ? a.from : s(a.to, -1), r.begin <= c && c < r.end) return o(c, l)
                }
            },
            m = p(o + r, r, u);
        if (m) return m;
        var g = r > 0 ? u.end : s(u.begin, -1);
        return null == g || r > 0 && g == t.text.length || !(m = p(r > 0 ? 0 : i.length - 1, r, c(g))) ? null : m
    }

    function bo(e, t) {
        var n = J(e.doc, t),
            r = Ye(n);
        return r != n && (t = re(r)), vo(!0, e, r, t, 1)
    }

    function ko(e, t) {
        var n = J(e.doc, t),
            r = Xe(n);
        return r != n && (t = re(r)), vo(!0, e, n, t, -1)
    }

    function xo(e, t) {
        var n = bo(e, t.line),
            r = J(e.doc, n.line),
            i = A(r, e.doc.direction);
        if (!i || 0 == i[0].level) {
            var o = Math.max(n.ch, r.text.search(/\S/)),
                a = t.line == n.line && t.ch <= o && t.ch;
            return le(n.line, a ? 0 : o, n.sticky)
        }
        return n
    }

    function wo(e, t, n) {
        if ("string" == typeof t && !(t = Xl[t])) return !1;
        e.display.input.ensurePolled();
        var r = e.display.shift,
            i = !1;
        try {
            e.isReadOnly() && (e.state.suppressEdits = !0), n && (e.display.shift = !1), i = t(e) != Ga
        } finally {
            e.display.shift = r, e.state.suppressEdits = !1
        }
        return i
    }

    function Co(e, t, n) {
        for (var r = 0; r < e.state.keyMaps.length; r++) {
            var i = so(t, e.state.keyMaps[r], n, e);
            if (i) return i
        }
        return e.options.extraKeys && so(t, e.options.extraKeys, n, e) || so(t, e.options.keyMap, n, e)
    }

    function So(e, t, n, r) {
        var i = e.state.keySeq;
        if (i) {
            if (co(t)) return "handled";
            if (/\'$/.test(t) ? e.state.keySeq = null : Zl.set(50, (function() {
                    e.state.keySeq == i && (e.state.keySeq = null, e.display.input.reset())
                })), Lo(e, i + " " + t, n, r)) return !0
        }
        return Lo(e, t, n, r)
    }

    function Lo(e, t, n, r) {
        var i = Co(e, t, r);
        return "multi" == i && (e.state.keySeq = t), "handled" == i && kt(e, "keyHandled", e, t, n), "handled" != i && "multi" != i || (I(n), Bn(e)), !!i
    }

    function To(e, t) {
        var n = fo(t, !0);
        return !!n && (t.shiftKey && !e.state.keySeq ? So(e, "Shift-" + n, t, (function(t) {
            return wo(e, t, !0)
        })) || So(e, n, t, (function(t) {
            if ("string" == typeof t ? /^go[A-Z]/.test(t) : t.motion) return wo(e, t)
        })) : So(e, n, t, (function(t) {
            return wo(e, t)
        })))
    }

    function Mo(e, t, n) {
        return So(e, "'" + n + "'", t, (function(t) {
            return wo(e, t, !0)
        }))
    }

    function Ao(e) {
        var t = this;
        if (!(e.target && e.target != t.display.input.getField() || (t.curOp.focus = a(), E(t, e)))) {
            wa && Ca < 11 && 27 == e.keyCode && (e.returnValue = !1);
            var n = e.keyCode;
            t.display.shift = 16 == n || e.shiftKey;
            var r = To(t, e);
            Ma && (Ql = r ? n : null, r || 88 != n || sl || !(Da ? e.metaKey : e.ctrlKey) || t.replaceSelection("", null, "cut")), ya && !Da && !r && 46 == n && e.shiftKey && !e.ctrlKey && document.execCommand && document.execCommand("cut"), 18 != n || /\bCodeMirror-crosshair\b/.test(t.display.lineDiv.className) || zo(t)
        }
    }

    function zo(e) {
        function t(e) {
            18 != e.keyCode && e.altKey || (_a(n, "CodeMirror-crosshair"), O(document, "keyup", t), O(document, "mouseover", t))
        }
        var n = e.display.lineDiv;
        l(n, "CodeMirror-crosshair"), il(document, "keyup", t), il(document, "mouseover", t)
    }

    function Oo(e) {
        16 == e.keyCode && (this.doc.sel.shift = !1), E(this, e)
    }

    function Fo(e) {
        var t = this;
        if (!(e.target && e.target != t.display.input.getField() || Pt(t.display, e) || E(t, e) || e.ctrlKey && !e.altKey || Da && e.metaKey)) {
            var n = e.keyCode,
                r = e.charCode;
            if (Ma && n == Ql) return Ql = null, void I(e);
            if (!Ma || e.which && !(e.which < 10) || !To(t, e)) {
                var i = String.fromCharCode(null == r ? n : r);
                "\b" != i && (Mo(t, e, i) || t.display.input.onKeyPress(e))
            }
        }
    }

    function Eo(e, t) {
        var n = +new Date;
        return Yl && Yl.compare(n, e, t) ? (Gl = Yl = null, "triple") : Gl && Gl.compare(n, e, t) ? (Yl = new es(n, e, t), Gl = null, "double") : (Gl = new es(n, e, t), Yl = null, "single")
    }

    function No(e) {
        var t = this,
            n = t.display;
        if (!(E(t, e) || n.activeTouch && n.input.supportsTouch()))
            if (n.input.ensurePolled(), n.shift = e.shiftKey, Pt(n, e)) Sa || (n.scroller.draggable = !1, setTimeout((function() {
                return n.scroller.draggable = !0
            }), 100));
            else if (!Ro(t, e)) {
            var r = Ln(t, e),
                i = _(e),
                o = r ? Eo(r, i) : "single";
            window.focus(), 1 == i && t.state.selectingText && t.state.selectingText(e), r && Do(t, i, r, o, e) || (1 == i ? r ? Io(t, r, o, e) : H(e) == n.scroller && I(e) : 2 == i ? (r && gi(t.doc, r), setTimeout((function() {
                return n.input.focus()
            }), 20)) : 3 == i && (Ha ? t.display.input.onContextMenu(e) : Hn(t)))
        }
    }

    function Do(e, t, n, r, i) {
        var o = "Click";
        return "double" == r ? o = "Double" + o : "triple" == r && (o = "Triple" + o), So(e, uo(o = (1 == t ? "Left" : 2 == t ? "Middle" : "Right") + o, i), i, (function(t) {
            if ("string" == typeof t && (t = Xl[t]), !t) return !1;
            var r = !1;
            try {
                e.isReadOnly() && (e.state.suppressEdits = !0), r = t(e, n) != Ga
            } finally {
                e.state.suppressEdits = !1
            }
            return r
        }))
    }

    function Po(e, t, n) {
        var r = e.getOption("configureMouse"),
            i = r ? r(e, t, n) : {};
        if (null == i.unit) {
            var o = Pa ? n.shiftKey && n.metaKey : n.altKey;
            i.unit = o ? "rectangle" : "single" == t ? "char" : "double" == t ? "word" : "line"
        }
        return (null == i.extend || e.doc.extend) && (i.extend = e.doc.extend || n.shiftKey), null == i.addNew && (i.addNew = Da ? n.metaKey : n.ctrlKey), null == i.moveOnDrag && (i.moveOnDrag = !(Da ? n.altKey : n.ctrlKey)), i
    }

    function Io(e, t, n, r) {
        wa ? setTimeout(c(Wn, e), 0) : e.curOp.focus = a();
        var i, o = Po(e, n, r),
            l = e.doc.sel;
        e.options.dragDrop && ol && !e.isReadOnly() && "single" == n && (i = l.contains(t)) > -1 && (se((i = l.ranges[i]).from(), t) < 0 || t.xRel > 0) && (se(i.to(), t) > 0 || t.xRel < 0) ? jo(e, r, t, o) : Wo(e, r, t, o)
    }

    function jo(e, t, n, r) {
        var i = e.display,
            o = !1,
            a = yr(e, (function(t) {
                Sa && (i.scroller.draggable = !1), e.state.draggingText = !1, e.state.delayingBlurEvent && (e.hasFocus() ? e.state.delayingBlurEvent = !1 : Hn(e)), O(i.wrapper.ownerDocument, "mouseup", a), O(i.wrapper.ownerDocument, "mousemove", l), O(i.scroller, "dragstart", s), O(i.scroller, "drop", a), o || (I(t), r.addNew || gi(e.doc, n, null, null, r.extend), Sa && !Aa || wa && 9 == Ca ? setTimeout((function() {
                    i.wrapper.ownerDocument.body.focus({
                        preventScroll: !0
                    }), i.input.focus()
                }), 20) : i.input.focus())
            })),
            l = function(e) {
                o = o || Math.abs(t.clientX - e.clientX) + Math.abs(t.clientY - e.clientY) >= 10
            },
            s = function() {
                return o = !0
            };
        Sa && (i.scroller.draggable = !0), e.state.draggingText = a, a.copy = !r.moveOnDrag, il(i.wrapper.ownerDocument, "mouseup", a), il(i.wrapper.ownerDocument, "mousemove", l), il(i.scroller, "dragstart", s), il(i.scroller, "drop", a), e.state.delayingBlurEvent = !0, setTimeout((function() {
            return i.input.focus()
        }), 20), i.scroller.dragDrop && i.scroller.dragDrop()
    }

    function Bo(e, t, n) {
        if ("char" == n) return new Dl(t, t);
        if ("word" == n) return e.findWordAt(t);
        if ("line" == n) return new Dl(le(t.line, 0), pe(e.doc, le(t.line + 1, 0)));
        var r = n(e, t);
        return new Dl(r.from, r.to)
    }

    function Wo(e, t, n, r) {
        function i(t) {
            if (0 != se(v, t))
                if (v = t, "rectangle" == r.unit) {
                    for (var i = [], o = e.options.tabSize, a = d(J(c, n.line).text, n.ch, o), l = d(J(c, t.line).text, t.ch, o), s = Math.min(a, l), m = Math.max(a, l), g = Math.min(n.line, t.line), y = Math.min(e.lastLine(), Math.max(n.line, t.line)); g <= y; g++) {
                        var b = J(c, g).text,
                            k = h(b, s, o);
                        s == m ? i.push(new Dl(le(g, k), le(g, k))) : b.length > k && i.push(new Dl(le(g, k), le(g, h(b, m, o))))
                    }
                    i.length || i.push(new Dl(n, n)), wi(c, _r(e, p.ranges.slice(0, f).concat(i), f), {
                        origin: "*mouse",
                        scroll: !1
                    }), e.scrollIntoView(t)
                } else {
                    var x, w = u,
                        C = Bo(e, t, r.unit),
                        S = w.anchor;
                    se(C.anchor, S) > 0 ? (x = C.head, S = fe(w.from(), C.anchor)) : (x = C.anchor, S = de(w.to(), C.head));
                    var L = p.ranges.slice(0);
                    L[f] = Ho(e, new Dl(pe(c, S), x)), wi(c, _r(e, L, f), Xa)
                }
        }

        function o(t) {
            var n = ++b,
                l = Ln(e, t, !0, "rectangle" == r.unit);
            if (l)
                if (0 != se(l, v)) {
                    e.curOp.focus = a(), i(l);
                    var u = $n(s, c);
                    (l.line >= u.to || l.line < u.from) && setTimeout(yr(e, (function() {
                        b == n && o(t)
                    })), 150)
                } else {
                    var d = t.clientY < y.top ? -20 : t.clientY > y.bottom ? 20 : 0;
                    d && setTimeout(yr(e, (function() {
                        b == n && (s.scroller.scrollTop += d, o(t))
                    })), 50)
                }
        }

        function l(t) {
            e.state.selectingText = !1, b = 1 / 0, t && (I(t), s.input.focus()), O(s.wrapper.ownerDocument, "mousemove", k), O(s.wrapper.ownerDocument, "mouseup", x), c.history.lastSelOrigin = null
        }
        wa && Hn(e);
        var s = e.display,
            c = e.doc;
        I(t);
        var u, f, p = c.sel,
            m = p.ranges;
        if (r.addNew && !r.extend ? (f = c.sel.contains(n), u = f > -1 ? m[f] : new Dl(n, n)) : (u = c.sel.primary(), f = c.sel.primIndex), "rectangle" == r.unit) r.addNew || (u = new Dl(n, n)), n = Ln(e, t, !0, !0), f = -1;
        else {
            var g = Bo(e, n, r.unit);
            u = r.extend ? mi(u, g.anchor, g.head, r.extend) : g
        }
        r.addNew ? -1 == f ? (f = m.length, wi(c, _r(e, m.concat([u]), f), {
            scroll: !1,
            origin: "*mouse"
        })) : m.length > 1 && m[f].empty() && "char" == r.unit && !r.extend ? (wi(c, _r(e, m.slice(0, f).concat(m.slice(f + 1)), 0), {
            scroll: !1,
            origin: "*mouse"
        }), p = c.sel) : yi(c, f, u, Xa) : (f = 0, wi(c, new Nl([u], 0), Xa), p = c.sel);
        var v = n,
            y = s.wrapper.getBoundingClientRect(),
            b = 0,
            k = yr(e, (function(e) {
                0 !== e.buttons && _(e) ? o(e) : l(e)
            })),
            x = yr(e, l);
        e.state.selectingText = x, il(s.wrapper.ownerDocument, "mousemove", k), il(s.wrapper.ownerDocument, "mouseup", x)
    }

    function Ho(e, t) {
        var n = t.anchor,
            r = t.head,
            i = J(e.doc, n.line);
        if (0 == se(n, r) && n.sticky == r.sticky) return t;
        var o = A(i);
        if (!o) return t;
        var a = M(o, n.ch, n.sticky),
            l = o[a];
        if (l.from != n.ch && l.to != n.ch) return t;
        var s, c = a + (l.from == n.ch == (1 != l.level) ? 0 : 1);
        if (0 == c || c == o.length) return t;
        if (r.line != n.line) s = (r.line - n.line) * ("ltr" == e.doc.direction ? 1 : -1) > 0;
        else {
            var u = M(o, r.ch, r.sticky),
                d = u - a || (r.ch - n.ch) * (1 == l.level ? -1 : 1);
            s = u == c - 1 || u == c ? d < 0 : d > 0
        }
        var f = o[c + (s ? -1 : 0)],
            h = s == (1 == f.level),
            p = h ? f.from : f.to,
            m = h ? "after" : "before";
        return n.ch == p && n.sticky == m ? t : new Dl(new le(n.line, p, m), r)
    }

    function _o(e, t, n, r) {
        var i, o;
        if (t.touches) i = t.touches[0].clientX, o = t.touches[0].clientY;
        else try {
            i = t.clientX, o = t.clientY
        } catch (e) {
            return !1
        }
        if (i >= Math.floor(e.display.gutters.getBoundingClientRect().right)) return !1;
        r && I(t);
        var a = e.display,
            l = a.lineDiv.getBoundingClientRect();
        if (o > l.bottom || !D(e, n)) return B(t);
        o -= l.top - a.viewOffset;
        for (var s = 0; s < e.display.gutterSpecs.length; ++s) {
            var c = a.gutters.childNodes[s];
            if (c && c.getBoundingClientRect().right >= i) return F(e, n, e, ie(e.doc, o), e.display.gutterSpecs[s].className, t), B(t)
        }
    }

    function Ro(e, t) {
        return _o(e, t, "gutterClick", !0)
    }

    function qo(e, t) {
        Pt(e.display, t) || Uo(e, t) || E(e, t, "contextmenu") || Ha || e.display.input.onContextMenu(t)
    }

    function Uo(e, t) {
        return !!D(e, "gutterContextMenu") && _o(e, t, "gutterContextMenu", !1)
    }

    function $o(e) {
        e.display.wrapper.className = e.display.wrapper.className.replace(/\s*cm-s-\S+/g, "") + e.options.theme.replace(/(^|\s)\s*/g, " cm-s-"), tn(e)
    }

    function Ko(e) {
        function t(t, r, i, o) {
            e.defaults[t] = r, i && (n[t] = o ? function(e, t, n) {
                n != ts && i(e, t, n)
            } : i)
        }
        var n = e.optionHandlers;
        e.defineOption = t, e.Init = ts, t("value", "", (function(e, t) {
            return e.setValue(t)
        }), !0), t("mode", null, (function(e, t) {
            e.doc.modeOption = t, Gr(e)
        }), !0), t("indentUnit", 2, Gr, !0), t("indentWithTabs", !1), t("smartIndent", !0), t("tabSize", 4, (function(e) {
            Yr(e), tn(e), Mn(e)
        }), !0), t("lineSeparator", null, (function(e, t) {
            if (e.doc.lineSep = t, t) {
                var n = [],
                    r = e.doc.first;
                e.doc.iter((function(e) {
                    for (var i = 0;;) {
                        var o = e.text.indexOf(t, i);
                        if (-1 == o) break;
                        i = o + t.length, n.push(le(r, o))
                    }
                    r++
                }));
                for (var i = n.length - 1; i >= 0; i--) Bi(e.doc, t, n[i], le(n[i].line, n[i].ch + t.length))
            }
        })), t("specialChars", /[\u0000-\u001f\u007f-\u009f\u00ad\u061c\u200b\u200e\u200f\u2028\u2029\ufeff\ufff9-\ufffc]/g, (function(e, t, n) {
            e.state.specialChars = new RegExp(t.source + (t.test("\t") ? "" : "|\t"), "g"), n != ts && e.refresh()
        })), t("specialCharPlaceholder", ct, (function(e) {
            return e.refresh()
        }), !0), t("electricChars", !0), t("inputStyle", Na ? "contenteditable" : "textarea", (function() {
            throw new Error("inputStyle can not (yet) be changed in a running editor")
        }), !0), t("spellcheck", !1, (function(e, t) {
            return e.getInputField().spellcheck = t
        }), !0), t("autocorrect", !1, (function(e, t) {
            return e.getInputField().autocorrect = t
        }), !0), t("autocapitalize", !1, (function(e, t) {
            return e.getInputField().autocapitalize = t
        }), !0), t("rtlMoveVisually", !Ia), t("wholeLineUpdateBefore", !0), t("theme", "default", (function(e) {
            $o(e), Ir(e)
        }), !0), t("keyMap", "default", (function(e, t, n) {
            var r = ho(t),
                i = n != ts && ho(n);
            i && i.detach && i.detach(e, r), r.attach && r.attach(e, i || null)
        })), t("extraKeys", null), t("configureMouse", null), t("lineWrapping", !1, Go, !0), t("gutters", [], (function(e, t) {
            e.display.gutterSpecs = Dr(t, e.options.lineNumbers), Ir(e)
        }), !0), t("fixedGutter", !0, (function(e, t) {
            e.display.gutters.style.left = t ? wn(e.display) + "px" : "0", e.refresh()
        }), !0), t("coverGutterNextToScrollbar", !1, (function(e) {
            return ar(e)
        }), !0), t("scrollbarStyle", "native", (function(e) {
            sr(e), ar(e), e.display.scrollbars.setScrollTop(e.doc.scrollTop), e.display.scrollbars.setScrollLeft(e.doc.scrollLeft)
        }), !0), t("lineNumbers", !1, (function(e, t) {
            e.display.gutterSpecs = Dr(e.options.gutters, t), Ir(e)
        }), !0), t("firstLineNumber", 1, Ir, !0), t("lineNumberFormatter", (function(e) {
            return e
        }), Ir, !0), t("showCursorWhenSelecting", !1, Nn, !0), t("resetSelectionOnContextMenu", !0), t("lineWiseCopyCut", !0), t("pasteLinesPerSelection", !0), t("selectionsMayTouch", !1), t("readOnly", !1, (function(e, t) {
            "nocursor" == t && (Rn(e), e.display.input.blur()), e.display.input.readOnlyChanged(t)
        })), t("screenReaderLabel", null, (function(e, t) {
            t = "" === t ? null : t, e.display.input.screenReaderLabelChanged(t)
        })), t("disableInput", !1, (function(e, t) {
            t || e.display.input.reset()
        }), !0), t("dragDrop", !0, Vo), t("allowDropFileTypes", null), t("cursorBlinkRate", 530), t("cursorScrollMargin", 0), t("cursorHeight", 1, Nn, !0), t("singleCursorHeightPerLine", !0, Nn, !0), t("workTime", 100), t("workDelay", 100), t("flattenSpans", !0, Yr, !0), t("addModeClass", !1, Yr, !0), t("pollInterval", 100), t("undoDepth", 200, (function(e, t) {
            return e.doc.history.undoDepth = t
        })), t("historyEventDelay", 1250), t("viewportMargin", 10, (function(e) {
            return e.refresh()
        }), !0), t("maxHighlightLength", 1e4, Yr, !0), t("moveInputWithCursor", !0, (function(e, t) {
            t || e.display.input.resetPosition()
        })), t("tabindex", null, (function(e, t) {
            return e.display.input.getField().tabIndex = t || ""
        })), t("autofocus", null), t("direction", "ltr", (function(e, t) {
            return e.doc.setDirection(t)
        }), !0), t("phrases", null)
    }

    function Vo(e, t, n) {
        if (!t != !(n && n != ts)) {
            var r = e.display.dragFunctions,
                i = t ? il : O;
            i(e.display.scroller, "dragstart", r.start), i(e.display.scroller, "dragenter", r.enter), i(e.display.scroller, "dragover", r.over), i(e.display.scroller, "dragleave", r.leave), i(e.display.scroller, "drop", r.drop)
        }
    }

    function Go(e) {
        e.options.lineWrapping ? (l(e.display.wrapper, "CodeMirror-wrap"), e.display.sizer.style.minWidth = "", e.display.sizerWidth = null) : (_a(e.display.wrapper, "CodeMirror-wrap"), it(e)), Sn(e), Mn(e), tn(e), setTimeout((function() {
            return ar(e)
        }), 100)
    }

    function Yo(e, t) {
        var n = this;
        if (!(this instanceof Yo)) return new Yo(e, t);
        this.options = t = t ? u(t) : {}, u(ns, t, !1);
        var r = t.value;
        "string" == typeof r ? r = new Hl(r, t.mode, null, t.lineSeparator, t.direction) : t.mode && (r.modeOption = t.mode), this.doc = r;
        var i = new Yo.inputStyles[t.inputStyle](this),
            o = this.display = new jr(e, r, i, t);
        for (var a in o.wrapper.CodeMirror = this, $o(this), t.lineWrapping && (this.display.wrapper.className += " CodeMirror-wrap"), sr(this), this.state = {
                keyMaps: [],
                overlays: [],
                modeGen: 0,
                overwrite: !1,
                delayingBlurEvent: !1,
                focused: !1,
                suppressEdits: !1,
                pasteIncoming: -1,
                cutIncoming: -1,
                selectingText: !1,
                draggingText: !1,
                highlight: new qa,
                keySeq: null,
                specialChars: null
            }, t.autofocus && !Na && o.input.focus(), wa && Ca < 11 && setTimeout((function() {
                return n.display.input.reset(!0)
            }), 20), Xo(this), ro(), cr(this), this.curOp.forceUpdate = !0, Jr(this, r), t.autofocus && !Na || this.hasFocus() ? setTimeout((function() {
                n.hasFocus() && !n.state.focused && _n(n)
            }), 20) : Rn(this), rs) rs.hasOwnProperty(a) && rs[a](this, t[a], ts);
        Nr(this), t.finishInit && t.finishInit(this);
        for (var l = 0; l < is.length; ++l) is[l](this);
        ur(this), Sa && t.lineWrapping && "optimizelegibility" == getComputedStyle(o.lineDiv).textRendering && (o.lineDiv.style.textRendering = "auto")
    }

    function Xo(e) {
        function t() {
            i.activeTouch && (o = setTimeout((function() {
                return i.activeTouch = null
            }), 1e3), (a = i.activeTouch).end = +new Date)
        }

        function n(e) {
            if (1 != e.touches.length) return !1;
            var t = e.touches[0];
            return t.radiusX <= 1 && t.radiusY <= 1
        }

        function r(e, t) {
            if (null == t.left) return !0;
            var n = t.left - e.left,
                r = t.top - e.top;
            return n * n + r * r > 400
        }
        var i = e.display;
        il(i.scroller, "mousedown", yr(e, No)), il(i.scroller, "dblclick", wa && Ca < 11 ? yr(e, (function(t) {
            if (!E(e, t)) {
                var n = Ln(e, t);
                if (n && !Ro(e, t) && !Pt(e.display, t)) {
                    I(t);
                    var r = e.findWordAt(n);
                    gi(e.doc, r.anchor, r.head)
                }
            }
        })) : function(t) {
            return E(e, t) || I(t)
        }), il(i.scroller, "contextmenu", (function(t) {
            return qo(e, t)
        })), il(i.input.getField(), "contextmenu", (function(t) {
            i.scroller.contains(t.target) || qo(e, t)
        }));
        var o, a = {
            end: 0
        };
        il(i.scroller, "touchstart", (function(t) {
            if (!E(e, t) && !n(t) && !Ro(e, t)) {
                i.input.ensurePolled(), clearTimeout(o);
                var r = +new Date;
                i.activeTouch = {
                    start: r,
                    moved: !1,
                    prev: r - a.end <= 300 ? a : null
                }, 1 == t.touches.length && (i.activeTouch.left = t.touches[0].pageX, i.activeTouch.top = t.touches[0].pageY)
            }
        })), il(i.scroller, "touchmove", (function() {
            i.activeTouch && (i.activeTouch.moved = !0)
        })), il(i.scroller, "touchend", (function(n) {
            var o = i.activeTouch;
            if (o && !Pt(i, n) && null != o.left && !o.moved && new Date - o.start < 300) {
                var a, l = e.coordsChar(i.activeTouch, "page");
                a = !o.prev || r(o, o.prev) ? new Dl(l, l) : !o.prev.prev || r(o, o.prev.prev) ? e.findWordAt(l) : new Dl(le(l.line, 0), pe(e.doc, le(l.line + 1, 0))), e.setSelection(a.anchor, a.head), e.focus(), I(n)
            }
            t()
        })), il(i.scroller, "touchcancel", t), il(i.scroller, "scroll", (function() {
            i.scroller.clientHeight && (nr(e, i.scroller.scrollTop), ir(e, i.scroller.scrollLeft, !0), F(e, "scroll", e))
        })), il(i.scroller, "mousewheel", (function(t) {
            return Hr(e, t)
        })), il(i.scroller, "DOMMouseScroll", (function(t) {
            return Hr(e, t)
        })), il(i.wrapper, "scroll", (function() {
            return i.wrapper.scrollTop = i.wrapper.scrollLeft = 0
        })), i.dragFunctions = {
            enter: function(t) {
                E(e, t) || W(t)
            },
            over: function(t) {
                E(e, t) || (eo(e, t), W(t))
            },
            start: function(t) {
                return Ji(e, t)
            },
            drop: yr(e, Qi),
            leave: function(t) {
                E(e, t) || to(e)
            }
        };
        var l = i.input.getField();
        il(l, "keyup", (function(t) {
            return Oo.call(e, t)
        })), il(l, "keydown", yr(e, Ao)), il(l, "keypress", yr(e, Fo)), il(l, "focus", (function(t) {
            return _n(e, t)
        })), il(l, "blur", (function(t) {
            return Rn(e, t)
        }))
    }

    function Zo(e, t, n, r) {
        var i, o = e.doc;
        null == n && (n = "add"), "smart" == n && (o.mode.indent ? i = be(e, t).state : n = "prev");
        var a = e.options.tabSize,
            l = J(o, t),
            s = d(l.text, null, a);
        l.stateAfter && (l.stateAfter = null);
        var c, u = l.text.match(/^\s*/)[0];
        if (r || /\S/.test(l.text)) {
            if ("smart" == n && ((c = o.mode.indent(i, l.text.slice(u.length), l.text)) == Ga || c > 150)) {
                if (!r) return;
                n = "prev"
            }
        } else c = 0, n = "not";
        "prev" == n ? c = t > o.first ? d(J(o, t - 1).text, null, a) : 0 : "add" == n ? c = s + e.options.indentUnit : "subtract" == n ? c = s - e.options.indentUnit : "number" == typeof n && (c = s + n), c = Math.max(0, c);
        var f = "",
            h = 0;
        if (e.options.indentWithTabs)
            for (var m = Math.floor(c / a); m; --m) h += a, f += "\t";
        if (h < c && (f += p(c - h)), f != u) return Bi(o, f, le(t, 0), le(t, u.length), "+input"), l.stateAfter = null, !0;
        for (var g = 0; g < o.sel.ranges.length; g++) {
            var v = o.sel.ranges[g];
            if (v.head.line == t && v.head.ch < u.length) {
                var y = le(t, u.length);
                yi(o, g, new Dl(y, y));
                break
            }
        }
    }

    function Qo(e) {
        os = e
    }

    function Jo(e, t, n, r, i) {
        var o = e.doc;
        e.display.shift = !1, r || (r = o.sel);
        var a = +new Date - 200,
            l = "paste" == i || e.state.pasteIncoming > a,
            s = al(t),
            c = null;
        if (l && r.ranges.length > 1)
            if (os && os.text.join("\n") == t) {
                if (r.ranges.length % os.text.length == 0) {
                    c = [];
                    for (var u = 0; u < os.text.length; u++) c.push(o.splitLines(os.text[u]))
                }
            } else s.length == r.ranges.length && e.options.pasteLinesPerSelection && (c = g(s, (function(e) {
                return [e]
            })));
        for (var d = e.curOp.updateInput, f = r.ranges.length - 1; f >= 0; f--) {
            var h = r.ranges[f],
                p = h.from(),
                v = h.to();
            h.empty() && (n && n > 0 ? p = le(p.line, p.ch - n) : e.state.overwrite && !l ? v = le(v.line, Math.min(J(o, v.line).text.length, v.ch + m(s).length)) : l && os && os.lineWise && os.text.join("\n") == s.join("\n") && (p = v = le(p.line, 0)));
            var y = {
                from: p,
                to: v,
                text: c ? c[f % c.length] : s,
                origin: i || (l ? "paste" : e.state.cutIncoming > a ? "cut" : "+input")
            };
            Ei(e.doc, y), kt(e, "inputRead", e, y)
        }
        t && !l && ta(e, t), Zn(e), e.curOp.updateInput < 2 && (e.curOp.updateInput = d), e.curOp.typing = !0, e.state.pasteIncoming = e.state.cutIncoming = -1
    }

    function ea(e, t) {
        var n = e.clipboardData && e.clipboardData.getData("Text");
        if (n) return e.preventDefault(), t.isReadOnly() || t.options.disableInput || vr(t, (function() {
            return Jo(t, n, 0, null, "paste")
        })), !0
    }

    function ta(e, t) {
        if (e.options.electricChars && e.options.smartIndent)
            for (var n = e.doc.sel, r = n.ranges.length - 1; r >= 0; r--) {
                var i = n.ranges[r];
                if (!(i.head.ch > 100 || r && n.ranges[r - 1].head.line == i.head.line)) {
                    var o = e.getModeAt(i.head),
                        a = !1;
                    if (o.electricChars) {
                        for (var l = 0; l < o.electricChars.length; l++)
                            if (t.indexOf(o.electricChars.charAt(l)) > -1) {
                                a = Zo(e, i.head.line, "smart");
                                break
                            }
                    } else o.electricInput && o.electricInput.test(J(e.doc, i.head.line).text.slice(0, i.head.ch)) && (a = Zo(e, i.head.line, "smart"));
                    a && kt(e, "electricInput", e, i.head.line)
                }
            }
    }

    function na(e) {
        for (var t = [], n = [], r = 0; r < e.doc.sel.ranges.length; r++) {
            var i = e.doc.sel.ranges[r].head.line,
                o = {
                    anchor: le(i, 0),
                    head: le(i + 1, 0)
                };
            n.push(o), t.push(e.getRange(o.anchor, o.head))
        }
        return {
            text: t,
            ranges: n
        }
    }

    function ra(e, t, n, r) {
        e.setAttribute("autocorrect", n ? "" : "off"), e.setAttribute("autocapitalize", r ? "" : "off"), e.setAttribute("spellcheck", !!t)
    }

    function ia() {
        var e = r("textarea", null, null, "position: absolute; bottom: -1em; padding: 0; width: 1px; height: 1em; min-height: 1em; outline: none"),
            t = r("div", [e], null, "overflow: hidden; position: relative; width: 3px; height: 0px;");
        return Sa ? e.style.width = "1000px" : e.setAttribute("wrap", "off"), Fa && (e.style.border = "1px solid black"), ra(e), t
    }

    function oa(e) {
        var t = e.optionHandlers,
            n = e.helpers = {};
        e.prototype = {
            constructor: e,
            focus: function() {
                window.focus(), this.display.input.focus()
            },
            setOption: function(e, n) {
                var r = this.options,
                    i = r[e];
                r[e] == n && "mode" != e || (r[e] = n, t.hasOwnProperty(e) && yr(this, t[e])(this, n, i), F(this, "optionChange", this, e))
            },
            getOption: function(e) {
                return this.options[e]
            },
            getDoc: function() {
                return this.doc
            },
            addKeyMap: function(e, t) {
                this.state.keyMaps[t ? "push" : "unshift"](ho(e))
            },
            removeKeyMap: function(e) {
                for (var t = this.state.keyMaps, n = 0; n < t.length; ++n)
                    if (t[n] == e || t[n].name == e) return t.splice(n, 1), !0
            },
            addOverlay: br((function(t, n) {
                var r = t.token ? t : e.getMode(this.options, t);
                if (r.startState) throw new Error("Overlays may not be stateful.");
                v(this.state.overlays, {
                    mode: r,
                    modeSpec: t,
                    opaque: n && n.opaque,
                    priority: n && n.priority || 0
                }, (function(e) {
                    return e.priority
                })), this.state.modeGen++, Mn(this)
            })),
            removeOverlay: br((function(e) {
                for (var t = this.state.overlays, n = 0; n < t.length; ++n) {
                    var r = t[n].modeSpec;
                    if (r == e || "string" == typeof e && r.name == e) return t.splice(n, 1), this.state.modeGen++, void Mn(this)
                }
            })),
            indentLine: br((function(e, t, n) {
                "string" != typeof t && "number" != typeof t && (t = null == t ? this.options.smartIndent ? "smart" : "prev" : t ? "add" : "subtract"), oe(this.doc, e) && Zo(this, e, t, n)
            })),
            indentSelection: br((function(e) {
                for (var t = this.doc.sel.ranges, n = -1, r = 0; r < t.length; r++) {
                    var i = t[r];
                    if (i.empty()) i.head.line > n && (Zo(this, i.head.line, e, !0), n = i.head.line, r == this.doc.sel.primIndex && Zn(this));
                    else {
                        var o = i.from(),
                            a = i.to(),
                            l = Math.max(n, o.line);
                        n = Math.min(this.lastLine(), a.line - (a.ch ? 0 : 1)) + 1;
                        for (var s = l; s < n; ++s) Zo(this, s, e);
                        var c = this.doc.sel.ranges;
                        0 == o.ch && t.length == c.length && c[r].from().ch > 0 && yi(this.doc, r, new Dl(o, c[r].to()), Ya)
                    }
                }
            })),
            getTokenAt: function(e, t) {
                return Ce(this, e, t)
            },
            getLineTokens: function(e, t) {
                return Ce(this, le(e), t, !0)
            },
            getTokenTypeAt: function(e) {
                e = pe(this.doc, e);
                var t, n = ye(this, J(this.doc, e.line)),
                    r = 0,
                    i = (n.length - 1) / 2,
                    o = e.ch;
                if (0 == o) t = n[2];
                else
                    for (;;) {
                        var a = r + i >> 1;
                        if ((a ? n[2 * a - 1] : 0) >= o) i = a;
                        else {
                            if (!(n[2 * a + 1] < o)) {
                                t = n[2 * a + 2];
                                break
                            }
                            r = a + 1
                        }
                    }
                var l = t ? t.indexOf("overlay ") : -1;
                return l < 0 ? t : 0 == l ? null : t.slice(0, l - 1)
            },
            getModeAt: function(t) {
                var n = this.doc.mode;
                return n.innerMode ? e.innerMode(n, this.getTokenAt(t).state).mode : n
            },
            getHelper: function(e, t) {
                return this.getHelpers(e, t)[0]
            },
            getHelpers: function(e, t) {
                var r = [];
                if (!n.hasOwnProperty(t)) return r;
                var i = n[t],
                    o = this.getModeAt(e);
                if ("string" == typeof o[t]) i[o[t]] && r.push(i[o[t]]);
                else if (o[t])
                    for (var a = 0; a < o[t].length; a++) {
                        var l = i[o[t][a]];
                        l && r.push(l)
                    } else o.helperType && i[o.helperType] ? r.push(i[o.helperType]) : i[o.name] && r.push(i[o.name]);
                for (var s = 0; s < i._global.length; s++) {
                    var c = i._global[s];
                    c.pred(o, this) && -1 == f(r, c.val) && r.push(c.val)
                }
                return r
            },
            getStateAfter: function(e, t) {
                var n = this.doc;
                return be(this, (e = he(n, null == e ? n.first + n.size - 1 : e)) + 1, t).state
            },
            cursorCoords: function(e, t) {
                var n = this.doc.sel.primary();
                return cn(this, null == e ? n.head : "object" == typeof e ? pe(this.doc, e) : e ? n.from() : n.to(), t || "page")
            },
            charCoords: function(e, t) {
                return sn(this, pe(this.doc, e), t || "page")
            },
            coordsChar: function(e, t) {
                return fn(this, (e = ln(this, e, t || "page")).left, e.top)
            },
            lineAtHeight: function(e, t) {
                return e = ln(this, {
                    top: e,
                    left: 0
                }, t || "page").top, ie(this.doc, e + this.display.viewOffset)
            },
            heightAtLine: function(e, t, n) {
                var r, i = !1;
                if ("number" == typeof e) {
                    var o = this.doc.first + this.doc.size - 1;
                    e < this.doc.first ? e = this.doc.first : e > o && (e = o, i = !0), r = J(this.doc, e)
                } else r = e;
                return an(this, r, {
                    top: 0,
                    left: 0
                }, t || "page", n || i).top + (i ? this.doc.height - nt(r) : 0)
            },
            defaultTextHeight: function() {
                return bn(this.display)
            },
            defaultCharWidth: function() {
                return kn(this.display)
            },
            getViewport: function() {
                return {
                    from: this.display.viewFrom,
                    to: this.display.viewTo
                }
            },
            addWidget: function(e, t, n, r, i) {
                var o = this.display,
                    a = (e = cn(this, pe(this.doc, e))).bottom,
                    l = e.left;
                if (t.style.position = "absolute", t.setAttribute("cm-ignore-events", "true"), this.display.input.setUneditable(t), o.sizer.appendChild(t), "over" == r) a = e.top;
                else if ("above" == r || "near" == r) {
                    var s = Math.max(o.wrapper.clientHeight, this.doc.height),
                        c = Math.max(o.sizer.clientWidth, o.lineSpace.clientWidth);
                    ("above" == r || e.bottom + t.offsetHeight > s) && e.top > t.offsetHeight ? a = e.top - t.offsetHeight : e.bottom + t.offsetHeight <= s && (a = e.bottom), l + t.offsetWidth > c && (l = c - t.offsetWidth)
                }
                t.style.top = a + "px", t.style.left = t.style.right = "", "right" == i ? (l = o.sizer.clientWidth - t.offsetWidth, t.style.right = "0px") : ("left" == i ? l = 0 : "middle" == i && (l = (o.sizer.clientWidth - t.offsetWidth) / 2), t.style.left = l + "px"), n && Gn(this, {
                    left: l,
                    top: a,
                    right: l + t.offsetWidth,
                    bottom: a + t.offsetHeight
                })
            },
            triggerOnKeyDown: br(Ao),
            triggerOnKeyPress: br(Fo),
            triggerOnKeyUp: Oo,
            triggerOnMouseDown: br(No),
            execCommand: function(e) {
                if (Xl.hasOwnProperty(e)) return Xl[e].call(null, this)
            },
            triggerElectric: br((function(e) {
                ta(this, e)
            })),
            findPosH: function(e, t, n, r) {
                var i = 1;
                t < 0 && (i = -1, t = -t);
                for (var o = pe(this.doc, e), a = 0; a < t && !(o = aa(this.doc, o, i, n, r)).hitSide; ++a);
                return o
            },
            moveH: br((function(e, t) {
                var n = this;
                this.extendSelectionsBy((function(r) {
                    return n.display.shift || n.doc.extend || r.empty() ? aa(n.doc, r.head, e, t, n.options.rtlMoveVisually) : e < 0 ? r.from() : r.to()
                }), Za)
            })),
            deleteH: br((function(e, t) {
                var n = this.doc.sel,
                    r = this.doc;
                n.somethingSelected() ? r.replaceSelection("", null, "+delete") : po(this, (function(n) {
                    var i = aa(r, n.head, e, t, !1);
                    return e < 0 ? {
                        from: i,
                        to: n.head
                    } : {
                        from: n.head,
                        to: i
                    }
                }))
            })),
            findPosV: function(e, t, n, r) {
                var i = 1,
                    o = r;
                t < 0 && (i = -1, t = -t);
                for (var a = pe(this.doc, e), l = 0; l < t; ++l) {
                    var s = cn(this, a, "div");
                    if (null == o ? o = s.left : s.left = o, (a = la(this, s, i, n)).hitSide) break
                }
                return a
            },
            moveV: br((function(e, t) {
                var n = this,
                    r = this.doc,
                    i = [],
                    o = !this.display.shift && !r.extend && r.sel.somethingSelected();
                if (r.extendSelectionsBy((function(a) {
                        if (o) return e < 0 ? a.from() : a.to();
                        var l = cn(n, a.head, "div");
                        null != a.goalColumn && (l.left = a.goalColumn), i.push(l.left);
                        var s = la(n, l, e, t);
                        return "page" == t && a == r.sel.primary() && Xn(n, sn(n, s, "div").top - l.top), s
                    }), Za), i.length)
                    for (var a = 0; a < r.sel.ranges.length; a++) r.sel.ranges[a].goalColumn = i[a]
            })),
            findWordAt: function(e) {
                var t = J(this.doc, e.line).text,
                    n = e.ch,
                    r = e.ch;
                if (t) {
                    var i = this.getHelper(e, "wordChars");
                    "before" != e.sticky && r != t.length || !n ? ++r : --n;
                    for (var o = t.charAt(n), a = x(o, i) ? function(e) {
                            return x(e, i)
                        } : /\s/.test(o) ? function(e) {
                            return /\s/.test(e)
                        } : function(e) {
                            return !/\s/.test(e) && !x(e)
                        }; n > 0 && a(t.charAt(n - 1));) --n;
                    for (; r < t.length && a(t.charAt(r));) ++r
                }
                return new Dl(le(e.line, n), le(e.line, r))
            },
            toggleOverwrite: function(e) {
                null != e && e == this.state.overwrite || ((this.state.overwrite = !this.state.overwrite) ? l(this.display.cursorDiv, "CodeMirror-overwrite") : _a(this.display.cursorDiv, "CodeMirror-overwrite"), F(this, "overwriteToggle", this, this.state.overwrite))
            },
            hasFocus: function() {
                return this.display.input.getField() == a()
            },
            isReadOnly: function() {
                return !(!this.options.readOnly && !this.doc.cantEdit)
            },
            scrollTo: br((function(e, t) {
                Qn(this, e, t)
            })),
            getScrollInfo: function() {
                var e = this.display.scroller;
                return {
                    left: e.scrollLeft,
                    top: e.scrollTop,
                    height: e.scrollHeight - Wt(this) - this.display.barHeight,
                    width: e.scrollWidth - Wt(this) - this.display.barWidth,
                    clientHeight: _t(this),
                    clientWidth: Ht(this)
                }
            },
            scrollIntoView: br((function(e, t) {
                null == e ? (e = {
                    from: this.doc.sel.primary().head,
                    to: null
                }, null == t && (t = this.options.cursorScrollMargin)) : "number" == typeof e ? e = {
                    from: le(e, 0),
                    to: null
                } : null == e.from && (e = {
                    from: e,
                    to: null
                }), e.to || (e.to = e.from), e.margin = t || 0, null != e.from.line ? Jn(this, e) : tr(this, e.from, e.to, e.margin)
            })),
            setSize: br((function(e, t) {
                var n = this,
                    r = function(e) {
                        return "number" == typeof e || /^\d+$/.test(String(e)) ? e + "px" : e
                    };
                null != e && (this.display.wrapper.style.width = r(e)), null != t && (this.display.wrapper.style.height = r(t)), this.options.lineWrapping && en(this);
                var i = this.display.viewFrom;
                this.doc.iter(i, this.display.viewTo, (function(e) {
                    if (e.widgets)
                        for (var t = 0; t < e.widgets.length; t++)
                            if (e.widgets[t].noHScroll) {
                                An(n, i, "widget");
                                break
                            }++i
                })), this.curOp.forceUpdate = !0, F(this, "refresh", this)
            })),
            operation: function(e) {
                return vr(this, e)
            },
            startOperation: function() {
                return cr(this)
            },
            endOperation: function() {
                return ur(this)
            },
            refresh: br((function() {
                var e = this.display.cachedTextHeight;
                Mn(this), this.curOp.forceUpdate = !0, tn(this), Qn(this, this.doc.scrollLeft, this.doc.scrollTop), Or(this.display), (null == e || Math.abs(e - bn(this.display)) > .5 || this.options.lineWrapping) && Sn(this), F(this, "refresh", this)
            })),
            swapDoc: br((function(e) {
                var t = this.doc;
                return t.cm = null, this.state.selectingText && this.state.selectingText(), Jr(this, e), tn(this), this.display.input.reset(), Qn(this, e.scrollLeft, e.scrollTop), this.curOp.forceScroll = !0, kt(this, "swapDoc", this, t), t
            })),
            phrase: function(e) {
                var t = this.options.phrases;
                return t && Object.prototype.hasOwnProperty.call(t, e) ? t[e] : e
            },
            getInputField: function() {
                return this.display.input.getField()
            },
            getWrapperElement: function() {
                return this.display.wrapper
            },
            getScrollerElement: function() {
                return this.display.scroller
            },
            getGutterElement: function() {
                return this.display.gutters
            }
        }, P(e), e.registerHelper = function(t, r, i) {
            n.hasOwnProperty(t) || (n[t] = e[t] = {
                _global: []
            }), n[t][r] = i
        }, e.registerGlobalHelper = function(t, r, i, o) {
            e.registerHelper(t, r, o), n[t]._global.push({
                pred: i,
                val: o
            })
        }
    }

    function aa(e, t, n, r, i) {
        function o() {
            var n = t.line + u;
            return !(n < e.first || n >= e.first + e.size) && (t = new le(n, t.ch, t.sticky), c = J(e, n))
        }

        function a(a) {
            var l;
            if ("codepoint" == r) {
                var s = c.text.charCodeAt(t.ch + (n > 0 ? 0 : -1));
                if (isNaN(s)) l = null;
                else {
                    var d = n > 0 ? s >= 55296 && s < 56320 : s >= 56320 && s < 57343;
                    l = new le(t.line, Math.max(0, Math.min(c.text.length, t.ch + n * (d ? 2 : 1))), -n)
                }
            } else l = i ? yo(e.cm, c, t, n) : go(c, t, n);
            if (null == l) {
                if (a || !o()) return !1;
                t = vo(i, e.cm, c, t.line, u)
            } else t = l;
            return !0
        }
        var l = t,
            s = n,
            c = J(e, t.line),
            u = i && "rtl" == e.direction ? -n : n;
        if ("char" == r || "codepoint" == r) a();
        else if ("column" == r) a(!0);
        else if ("word" == r || "group" == r)
            for (var d = null, f = "group" == r, h = e.cm && e.cm.getHelper(t, "wordChars"), p = !0; !(n < 0) || a(!p); p = !1) {
                var m = c.text.charAt(t.ch) || "\n",
                    g = x(m, h) ? "w" : f && "\n" == m ? "n" : !f || /\s/.test(m) ? null : "p";
                if (!f || p || g || (g = "s"), d && d != g) {
                    n < 0 && (n = 1, a(), t.sticky = "after");
                    break
                }
                if (g && (d = g), n > 0 && !a(!p)) break
            }
        var v = Ai(e, t, l, s, !0);
        return ce(l, v) && (v.hitSide = !0), v
    }

    function la(e, t, n, r) {
        var i, o, a = e.doc,
            l = t.left;
        if ("page" == r) {
            var s = Math.min(e.display.wrapper.clientHeight, window.innerHeight || document.documentElement.clientHeight),
                c = Math.max(s - .5 * bn(e.display), 3);
            i = (n > 0 ? t.bottom : t.top) + n * c
        } else "line" == r && (i = n > 0 ? t.bottom + 3 : t.top - 3);
        for (;
            (o = fn(e, l, i)).outside;) {
            if (n < 0 ? i <= 0 : i >= a.height) {
                o.hitSide = !0;
                break
            }
            i += 5 * n
        }
        return o
    }

    function sa(e, t) {
        var n = Kt(e, t.line);
        if (!n || n.hidden) return null;
        var r = J(e.doc, t.line),
            i = qt(n, r, t.line),
            o = A(r, e.doc.direction),
            a = "left";
        o && (a = M(o, t.ch) % 2 ? "right" : "left");
        var l = Yt(i.map, t.ch, a);
        return l.offset = "right" == l.collapse ? l.end : l.start, l
    }

    function ca(e) {
        for (var t = e; t; t = t.parentNode)
            if (/CodeMirror-gutter-wrapper/.test(t.className)) return !0;
        return !1
    }

    function ua(e, t) {
        return t && (e.bad = !0), e
    }

    function da(e, t, n, r, i) {
        function o(e) {
            return function(t) {
                return t.id == e
            }
        }

        function a() {
            u && (c += d, f && (c += d), u = f = !1)
        }

        function l(e) {
            e && (a(), c += e)
        }

        function s(t) {
            if (1 == t.nodeType) {
                var n = t.getAttribute("cm-text");
                if (n) return void l(n);
                var c, h = t.getAttribute("cm-marker");
                if (h) {
                    var p = e.findMarks(le(r, 0), le(i + 1, 0), o(+h));
                    return void(p.length && (c = p[0].find(0)) && l(ee(e.doc, c.from, c.to).join(d)))
                }
                if ("false" == t.getAttribute("contenteditable")) return;
                var m = /^(pre|div|p|li|table|br)$/i.test(t.nodeName);
                if (!/^br$/i.test(t.nodeName) && 0 == t.textContent.length) return;
                m && a();
                for (var g = 0; g < t.childNodes.length; g++) s(t.childNodes[g]);
                /^(pre|p)$/i.test(t.nodeName) && (f = !0), m && (u = !0)
            } else 3 == t.nodeType && l(t.nodeValue.replace(/\u200b/g, "").replace(/\u00a0/g, " "))
        }
        for (var c = "", u = !1, d = e.doc.lineSeparator(), f = !1; s(t), t != n;) t = t.nextSibling, f = !1;
        return c
    }

    function fa(e, t, n) {
        var r;
        if (t == e.display.lineDiv) {
            if (!(r = e.display.lineDiv.childNodes[n])) return ua(e.clipPos(le(e.display.viewTo - 1)), !0);
            t = null, n = 0
        } else
            for (r = t;; r = r.parentNode) {
                if (!r || r == e.display.lineDiv) return null;
                if (r.parentNode && r.parentNode == e.display.lineDiv) break
            }
        for (var i = 0; i < e.display.view.length; i++) {
            var o = e.display.view[i];
            if (o.node == r) return ha(o, t, n)
        }
    }

    function ha(e, t, n) {
        function r(t, n, r) {
            for (var i = -1; i < (d ? d.length : 0); i++)
                for (var o = i < 0 ? u.map : d[i], a = 0; a < o.length; a += 3) {
                    var l = o[a + 2];
                    if (l == t || l == n) {
                        var s = re(i < 0 ? e.line : e.rest[i]),
                            c = o[a] + r;
                        return (r < 0 || l != t) && (c = o[a + (r ? 1 : 0)]), le(s, c)
                    }
                }
        }
        var i = e.text.firstChild,
            a = !1;
        if (!t || !o(i, t)) return ua(le(re(e.line), 0), !0);
        if (t == i && (a = !0, t = i.childNodes[n], n = 0, !t)) {
            var l = e.rest ? m(e.rest) : e.line;
            return ua(le(re(l), l.text.length), a)
        }
        var s = 3 == t.nodeType ? t : null,
            c = t;
        for (s || 1 != t.childNodes.length || 3 != t.firstChild.nodeType || (s = t.firstChild, n && (n = s.nodeValue.length)); c.parentNode != i;) c = c.parentNode;
        var u = e.measure,
            d = u.maps,
            f = r(s, c, n);
        if (f) return ua(f, a);
        for (var h = c.nextSibling, p = s ? s.nodeValue.length - n : 0; h; h = h.nextSibling) {
            if (f = r(h, h.firstChild, 0)) return ua(le(f.line, f.ch - p), a);
            p += h.textContent.length
        }
        for (var g = c.previousSibling, v = n; g; g = g.previousSibling) {
            if (f = r(g, g.firstChild, -1)) return ua(le(f.line, f.ch + v), a);
            v += g.textContent.length
        }
    }

    function pa(e, t) {
        function n() {
            e.value = s.getValue()
        }
        if ((t = t ? u(t) : {}).value = e.value, !t.tabindex && e.tabIndex && (t.tabindex = e.tabIndex), !t.placeholder && e.placeholder && (t.placeholder = e.placeholder), null == t.autofocus) {
            var r = a();
            t.autofocus = r == e || null != e.getAttribute("autofocus") && r == document.body
        }
        var i;
        if (e.form && (il(e.form, "submit", n), !t.leaveSubmitMethodAlone)) {
            var o = e.form;
            i = o.submit;
            try {
                var l = o.submit = function() {
                    n(), o.submit = i, o.submit(), o.submit = l
                }
            } catch (e) {}
        }
        t.finishInit = function(r) {
            r.save = n, r.getTextArea = function() {
                return e
            }, r.toTextArea = function() {
                r.toTextArea = isNaN, n(), e.parentNode.removeChild(r.getWrapperElement()), e.style.display = "", e.form && (O(e.form, "submit", n), t.leaveSubmitMethodAlone || "function" != typeof e.form.submit || (e.form.submit = i))
            }
        }, e.style.display = "none";
        var s = Yo((function(t) {
            return e.parentNode.insertBefore(t, e.nextSibling)
        }), t);
        return s
    }

    function ma(e) {
        e.off = O, e.on = il, e.wheelEventPixels = Wr, e.Doc = Hl, e.splitLines = al, e.countColumn = d, e.findColumn = h, e.isWordChar = k, e.Pass = Ga, e.signal = F, e.Line = bl, e.changeEnd = qr, e.scrollbarModel = Al, e.Pos = le, e.cmpPos = se, e.modes = ul, e.mimeModes = dl, e.resolveMode = V, e.getMode = G, e.modeExtensions = fl, e.extendMode = Y, e.copyState = X, e.startState = Q, e.innerMode = Z, e.commands = Xl, e.keyMap = Vl, e.keyName = fo, e.isModifierKey = co, e.lookupKey = so, e.normalizeKeyMap = lo, e.StringStream = hl, e.SharedTextMarker = Bl, e.TextMarker = jl, e.LineWidget = Pl, e.e_preventDefault = I, e.e_stopPropagation = j, e.e_stop = W, e.addClass = l, e.contains = o, e.rmClass = _a, e.keyNames = ql
    }
    var ga = navigator.userAgent,
        va = navigator.platform,
        ya = /gecko\/\d/i.test(ga),
        ba = /MSIE \d/.test(ga),
        ka = /Trident\/(?:[7-9]|\d{2,})\..*rv:(\d+)/.exec(ga),
        xa = /Edge\/(\d+)/.exec(ga),
        wa = ba || ka || xa,
        Ca = wa && (ba ? document.documentMode || 6 : +(xa || ka)[1]),
        Sa = !xa && /WebKit\//.test(ga),
        La = Sa && /Qt\/\d+\.\d+/.test(ga),
        Ta = !xa && /Chrome\//.test(ga),
        Ma = /Opera\//.test(ga),
        Aa = /Apple Computer/.test(navigator.vendor),
        za = /Mac OS X 1\d\D([8-9]|\d\d)\D/.test(ga),
        Oa = /PhantomJS/.test(ga),
        Fa = Aa && (/Mobile\/\w+/.test(ga) || navigator.maxTouchPoints > 2),
        Ea = /Android/.test(ga),
        Na = Fa || Ea || /webOS|BlackBerry|Opera Mini|Opera Mobi|IEMobile/i.test(ga),
        Da = Fa || /Mac/.test(va),
        Pa = /\bCrOS\b/.test(ga),
        Ia = /win/i.test(va),
        ja = Ma && ga.match(/Version\/(\d*\.\d*)/);
    ja && (ja = Number(ja[1])), ja && ja >= 15 && (Ma = !1, Sa = !0);
    var Ba, Wa = Da && (La || Ma && (null == ja || ja < 12.11)),
        Ha = ya || wa && Ca >= 9,
        _a = function(t, n) {
            var r = t.className,
                i = e(n).exec(r);
            if (i) {
                var o = r.slice(i.index + i[0].length);
                t.className = r.slice(0, i.index) + (o ? i[1] + o : "")
            }
        };
    Ba = document.createRange ? function(e, t, n, r) {
        var i = document.createRange();
        return i.setEnd(r || e, n), i.setStart(e, t), i
    } : function(e, t, n) {
        var r = document.body.createTextRange();
        try {
            r.moveToElementText(e.parentNode)
        } catch (e) {
            return r
        }
        return r.collapse(!0), r.moveEnd("character", n), r.moveStart("character", t), r
    };
    var Ra = function(e) {
        e.select()
    };
    Fa ? Ra = function(e) {
        e.selectionStart = 0, e.selectionEnd = e.value.length
    } : wa && (Ra = function(e) {
        try {
            e.select()
        } catch (e) {}
    });
    var qa = function() {
        this.id = null, this.f = null, this.time = 0, this.handler = c(this.onTimeout, this)
    };
    qa.prototype.onTimeout = function(e) {
        e.id = 0, e.time <= +new Date ? e.f() : setTimeout(e.handler, e.time - +new Date)
    }, qa.prototype.set = function(e, t) {
        this.f = t;
        var n = +new Date + e;
        (!this.id || n < this.time) && (clearTimeout(this.id), this.id = setTimeout(this.handler, e), this.time = n)
    };
    var Ua, $a, Ka, Va = 50,
        Ga = {
            toString: function() {
                return "CodeMirror.Pass"
            }
        },
        Ya = {
            scroll: !1
        },
        Xa = {
            origin: "*mouse"
        },
        Za = {
            origin: "+move"
        },
        Qa = [""],
        Ja = /[\u00df\u0587\u0590-\u05f4\u0600-\u06ff\u3040-\u309f\u30a0-\u30ff\u3400-\u4db5\u4e00-\u9fcc\uac00-\ud7af]/,
        el = /[\u0300-\u036f\u0483-\u0489\u0591-\u05bd\u05bf\u05c1\u05c2\u05c4\u05c5\u05c7\u0610-\u061a\u064b-\u065e\u0670\u06d6-\u06dc\u06de-\u06e4\u06e7\u06e8\u06ea-\u06ed\u0711\u0730-\u074a\u07a6-\u07b0\u07eb-\u07f3\u0816-\u0819\u081b-\u0823\u0825-\u0827\u0829-\u082d\u0900-\u0902\u093c\u0941-\u0948\u094d\u0951-\u0955\u0962\u0963\u0981\u09bc\u09be\u09c1-\u09c4\u09cd\u09d7\u09e2\u09e3\u0a01\u0a02\u0a3c\u0a41\u0a42\u0a47\u0a48\u0a4b-\u0a4d\u0a51\u0a70\u0a71\u0a75\u0a81\u0a82\u0abc\u0ac1-\u0ac5\u0ac7\u0ac8\u0acd\u0ae2\u0ae3\u0b01\u0b3c\u0b3e\u0b3f\u0b41-\u0b44\u0b4d\u0b56\u0b57\u0b62\u0b63\u0b82\u0bbe\u0bc0\u0bcd\u0bd7\u0c3e-\u0c40\u0c46-\u0c48\u0c4a-\u0c4d\u0c55\u0c56\u0c62\u0c63\u0cbc\u0cbf\u0cc2\u0cc6\u0ccc\u0ccd\u0cd5\u0cd6\u0ce2\u0ce3\u0d3e\u0d41-\u0d44\u0d4d\u0d57\u0d62\u0d63\u0dca\u0dcf\u0dd2-\u0dd4\u0dd6\u0ddf\u0e31\u0e34-\u0e3a\u0e47-\u0e4e\u0eb1\u0eb4-\u0eb9\u0ebb\u0ebc\u0ec8-\u0ecd\u0f18\u0f19\u0f35\u0f37\u0f39\u0f71-\u0f7e\u0f80-\u0f84\u0f86\u0f87\u0f90-\u0f97\u0f99-\u0fbc\u0fc6\u102d-\u1030\u1032-\u1037\u1039\u103a\u103d\u103e\u1058\u1059\u105e-\u1060\u1071-\u1074\u1082\u1085\u1086\u108d\u109d\u135f\u1712-\u1714\u1732-\u1734\u1752\u1753\u1772\u1773\u17b7-\u17bd\u17c6\u17c9-\u17d3\u17dd\u180b-\u180d\u18a9\u1920-\u1922\u1927\u1928\u1932\u1939-\u193b\u1a17\u1a18\u1a56\u1a58-\u1a5e\u1a60\u1a62\u1a65-\u1a6c\u1a73-\u1a7c\u1a7f\u1b00-\u1b03\u1b34\u1b36-\u1b3a\u1b3c\u1b42\u1b6b-\u1b73\u1b80\u1b81\u1ba2-\u1ba5\u1ba8\u1ba9\u1c2c-\u1c33\u1c36\u1c37\u1cd0-\u1cd2\u1cd4-\u1ce0\u1ce2-\u1ce8\u1ced\u1dc0-\u1de6\u1dfd-\u1dff\u200c\u200d\u20d0-\u20f0\u2cef-\u2cf1\u2de0-\u2dff\u302a-\u302f\u3099\u309a\ua66f-\ua672\ua67c\ua67d\ua6f0\ua6f1\ua802\ua806\ua80b\ua825\ua826\ua8c4\ua8e0-\ua8f1\ua926-\ua92d\ua947-\ua951\ua980-\ua982\ua9b3\ua9b6-\ua9b9\ua9bc\uaa29-\uaa2e\uaa31\uaa32\uaa35\uaa36\uaa43\uaa4c\uaab0\uaab2-\uaab4\uaab7\uaab8\uaabe\uaabf\uaac1\uabe5\uabe8\uabed\udc00-\udfff\ufb1e\ufe00-\ufe0f\ufe20-\ufe26\uff9e\uff9f]/,
        tl = null,
        nl = function() {
            function e(e) {
                return e <= 247 ? n.charAt(e) : 1424 <= e && e <= 1524 ? "R" : 1536 <= e && e <= 1785 ? r.charAt(e - 1536) : 1774 <= e && e <= 2220 ? "r" : 8192 <= e && e <= 8203 ? "w" : 8204 == e ? "b" : "L"
            }

            function t(e, t, n) {
                this.level = e, this.from = t, this.to = n
            }
            var n = "bbbbbbbbbtstwsbbbbbbbbbbbbbbssstwNN%%%NNNNNN,N,N1111111111NNNNNNNLLLLLLLLLLLLLLLLLLLLLLLLLLNNNNNNLLLLLLLLLLLLLLLLLLLLLLLLLLNNNNbbbbbbsbbbbbbbbbbbbbbbbbbbbbbbbbb,N%%%%NNNNLNNNNN%%11NLNNN1LNNNNNLLLLLLLLLLLLLLLLLLLLLLLNLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLN",
                r = "nnnnnnNNr%%r,rNNmmmmmmmmmmmrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrmmmmmmmmmmmmmmmmmmmmmnnnnnnnnnn%nnrrrmrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrmmmmmmmnNmmmmmmrrmmNmmmmrr1111111111",
                i = /[\u0590-\u05f4\u0600-\u06ff\u0700-\u08ac]/,
                o = /[stwN]/,
                a = /[LRr]/,
                l = /[Lb1n]/,
                s = /[1n]/;
            return function(n, r) {
                var c = "ltr" == r ? "L" : "R";
                if (0 == n.length || "ltr" == r && !i.test(n)) return !1;
                for (var u = n.length, d = [], f = 0; f < u; ++f) d.push(e(n.charCodeAt(f)));
                for (var h = 0, p = c; h < u; ++h) {
                    var g = d[h];
                    "m" == g ? d[h] = p : p = g
                }
                for (var v = 0, y = c; v < u; ++v) {
                    var b = d[v];
                    "1" == b && "r" == y ? d[v] = "n" : a.test(b) && (y = b, "r" == b && (d[v] = "R"))
                }
                for (var k = 1, x = d[0]; k < u - 1; ++k) {
                    var w = d[k];
                    "+" == w && "1" == x && "1" == d[k + 1] ? d[k] = "1" : "," != w || x != d[k + 1] || "1" != x && "n" != x || (d[k] = x), x = w
                }
                for (var C = 0; C < u; ++C) {
                    var S = d[C];
                    if ("," == S) d[C] = "N";
                    else if ("%" == S) {
                        var L = void 0;
                        for (L = C + 1; L < u && "%" == d[L]; ++L);
                        for (var T = C && "!" == d[C - 1] || L < u && "1" == d[L] ? "1" : "N", M = C; M < L; ++M) d[M] = T;
                        C = L - 1
                    }
                }
                for (var A = 0, z = c; A < u; ++A) {
                    var O = d[A];
                    "L" == z && "1" == O ? d[A] = "L" : a.test(O) && (z = O)
                }
                for (var F = 0; F < u; ++F)
                    if (o.test(d[F])) {
                        var E = void 0;
                        for (E = F + 1; E < u && o.test(d[E]); ++E);
                        for (var N = "L" == (F ? d[F - 1] : c), D = N == ("L" == (E < u ? d[E] : c)) ? N ? "L" : "R" : c, P = F; P < E; ++P) d[P] = D;
                        F = E - 1
                    }
                for (var I, j = [], B = 0; B < u;)
                    if (l.test(d[B])) {
                        var W = B;
                        for (++B; B < u && l.test(d[B]); ++B);
                        j.push(new t(0, W, B))
                    } else {
                        var H = B,
                            _ = j.length,
                            R = "rtl" == r ? 1 : 0;
                        for (++B; B < u && "L" != d[B]; ++B);
                        for (var q = H; q < B;)
                            if (s.test(d[q])) {
                                H < q && (j.splice(_, 0, new t(1, H, q)), _ += R);
                                var U = q;
                                for (++q; q < B && s.test(d[q]); ++q);
                                j.splice(_, 0, new t(2, U, q)), _ += R, H = q
                            } else ++q;
                        H < B && j.splice(_, 0, new t(1, H, B))
                    }
                return "ltr" == r && (1 == j[0].level && (I = n.match(/^\s+/)) && (j[0].from = I[0].length, j.unshift(new t(0, 0, I[0].length))), 1 == m(j).level && (I = n.match(/\s+$/)) && (m(j).to -= I[0].length, j.push(new t(0, u - I[0].length, u)))), "rtl" == r ? j.reverse() : j
            }
        }(),
        rl = [],
        il = function(e, t, n) {
            if (e.addEventListener) e.addEventListener(t, n, !1);
            else if (e.attachEvent) e.attachEvent("on" + t, n);
            else {
                var r = e._handlers || (e._handlers = {});
                r[t] = (r[t] || rl).concat(n)
            }
        },
        ol = function() {
            if (wa && Ca < 9) return !1;
            var e = r("div");
            return "draggable" in e || "dragDrop" in e
        }(),
        al = 3 != "\n\nb".split(/\n/).length ? function(e) {
            for (var t = 0, n = [], r = e.length; t <= r;) {
                var i = e.indexOf("\n", t); - 1 == i && (i = e.length);
                var o = e.slice(t, "\r" == e.charAt(i - 1) ? i - 1 : i),
                    a = o.indexOf("\r"); - 1 != a ? (n.push(o.slice(0, a)), t += a + 1) : (n.push(o), t = i + 1)
            }
            return n
        } : function(e) {
            return e.split(/\r\n?|\n/)
        },
        ll = window.getSelection ? function(e) {
            try {
                return e.selectionStart != e.selectionEnd
            } catch (e) {
                return !1
            }
        } : function(e) {
            var t;
            try {
                t = e.ownerDocument.selection.createRange()
            } catch (e) {}
            return !(!t || t.parentElement() != e) && 0 != t.compareEndPoints("StartToEnd", t)
        },
        sl = "oncopy" in (Ka = r("div")) || (Ka.setAttribute("oncopy", "return;"), "function" == typeof Ka.oncopy),
        cl = null,
        ul = {},
        dl = {},
        fl = {},
        hl = function(e, t, n) {
            this.pos = this.start = 0, this.string = e, this.tabSize = t || 8, this.lastColumnPos = this.lastColumnValue = 0, this.lineStart = 0, this.lineOracle = n
        };
    hl.prototype.eol = function() {
        return this.pos >= this.string.length
    }, hl.prototype.sol = function() {
        return this.pos == this.lineStart
    }, hl.prototype.peek = function() {
        return this.string.charAt(this.pos) || void 0
    }, hl.prototype.next = function() {
        if (this.pos < this.string.length) return this.string.charAt(this.pos++)
    }, hl.prototype.eat = function(e) {
        var t = this.string.charAt(this.pos);
        if ("string" == typeof e ? t == e : t && (e.test ? e.test(t) : e(t))) return ++this.pos, t
    }, hl.prototype.eatWhile = function(e) {
        for (var t = this.pos; this.eat(e););
        return this.pos > t
    }, hl.prototype.eatSpace = function() {
        for (var e = this.pos;
            /[\s\u00a0]/.test(this.string.charAt(this.pos));) ++this.pos;
        return this.pos > e
    }, hl.prototype.skipToEnd = function() {
        this.pos = this.string.length
    }, hl.prototype.skipTo = function(e) {
        var t = this.string.indexOf(e, this.pos);
        if (t > -1) return this.pos = t, !0
    }, hl.prototype.backUp = function(e) {
        this.pos -= e
    }, hl.prototype.column = function() {
        return this.lastColumnPos < this.start && (this.lastColumnValue = d(this.string, this.start, this.tabSize, this.lastColumnPos, this.lastColumnValue), this.lastColumnPos = this.start), this.lastColumnValue - (this.lineStart ? d(this.string, this.lineStart, this.tabSize) : 0)
    }, hl.prototype.indentation = function() {
        return d(this.string, null, this.tabSize) - (this.lineStart ? d(this.string, this.lineStart, this.tabSize) : 0)
    }, hl.prototype.match = function(e, t, n) {
        if ("string" != typeof e) {
            var r = this.string.slice(this.pos).match(e);
            return r && r.index > 0 ? null : (r && !1 !== t && (this.pos += r[0].length), r)
        }
        var i = function(e) {
            return n ? e.toLowerCase() : e
        };
        if (i(this.string.substr(this.pos, e.length)) == i(e)) return !1 !== t && (this.pos += e.length), !0
    }, hl.prototype.current = function() {
        return this.string.slice(this.start, this.pos)
    }, hl.prototype.hideFirstChars = function(e, t) {
        this.lineStart += e;
        try {
            return t()
        } finally {
            this.lineStart -= e
        }
    }, hl.prototype.lookAhead = function(e) {
        var t = this.lineOracle;
        return t && t.lookAhead(e)
    }, hl.prototype.baseToken = function() {
        var e = this.lineOracle;
        return e && e.baseToken(this.pos)
    };
    var pl = function(e, t) {
            this.state = e, this.lookAhead = t
        },
        ml = function(e, t, n, r) {
            this.state = t, this.doc = e, this.line = n, this.maxLookAhead = r || 0, this.baseTokens = null, this.baseTokenPos = 1
        };
    ml.prototype.lookAhead = function(e) {
        var t = this.doc.getLine(this.line + e);
        return null != t && e > this.maxLookAhead && (this.maxLookAhead = e), t
    }, ml.prototype.baseToken = function(e) {
        if (!this.baseTokens) return null;
        for (; this.baseTokens[this.baseTokenPos] <= e;) this.baseTokenPos += 2;
        var t = this.baseTokens[this.baseTokenPos + 1];
        return {
            type: t && t.replace(/( |^)overlay .*/, ""),
            size: this.baseTokens[this.baseTokenPos] - e
        }
    }, ml.prototype.nextLine = function() {
        this.line++, this.maxLookAhead > 0 && this.maxLookAhead--
    }, ml.fromSaved = function(e, t, n) {
        return t instanceof pl ? new ml(e, X(e.mode, t.state), n, t.lookAhead) : new ml(e, X(e.mode, t), n)
    }, ml.prototype.save = function(e) {
        var t = !1 !== e ? X(this.doc.mode, this.state) : this.state;
        return this.maxLookAhead > 0 ? new pl(t, this.maxLookAhead) : t
    };
    var gl = function(e, t, n) {
            this.start = e.start, this.end = e.pos, this.string = e.current(), this.type = t || null, this.state = n
        },
        vl = !1,
        yl = !1,
        bl = function(e, t, n) {
            this.text = e, He(this, t), this.height = n ? n(this) : 1
        };
    bl.prototype.lineNo = function() {
        return re(this)
    }, P(bl);
    var kl, xl = {},
        wl = {},
        Cl = null,
        Sl = null,
        Ll = {
            left: 0,
            right: 0,
            top: 0,
            bottom: 0
        },
        Tl = function(e, t, n) {
            this.cm = n;
            var i = this.vert = r("div", [r("div", null, null, "min-width: 1px")], "CodeMirror-vscrollbar"),
                o = this.horiz = r("div", [r("div", null, null, "height: 100%; min-height: 1px")], "CodeMirror-hscrollbar");
            i.tabIndex = o.tabIndex = -1, e(i), e(o), il(i, "scroll", (function() {
                i.clientHeight && t(i.scrollTop, "vertical")
            })), il(o, "scroll", (function() {
                o.clientWidth && t(o.scrollLeft, "horizontal")
            })), this.checkedZeroWidth = !1, wa && Ca < 8 && (this.horiz.style.minHeight = this.vert.style.minWidth = "18px")
        };
    Tl.prototype.update = function(e) {
        var t = e.scrollWidth > e.clientWidth + 1,
            n = e.scrollHeight > e.clientHeight + 1,
            r = e.nativeBarWidth;
        if (n) {
            this.vert.style.display = "block", this.vert.style.bottom = t ? r + "px" : "0";
            var i = e.viewHeight - (t ? r : 0);
            this.vert.firstChild.style.height = Math.max(0, e.scrollHeight - e.clientHeight + i) + "px"
        } else this.vert.scrollTop = 0, this.vert.style.display = "", this.vert.firstChild.style.height = "0";
        if (t) {
            this.horiz.style.display = "block", this.horiz.style.right = n ? r + "px" : "0", this.horiz.style.left = e.barLeft + "px";
            var o = e.viewWidth - e.barLeft - (n ? r : 0);
            this.horiz.firstChild.style.width = Math.max(0, e.scrollWidth - e.clientWidth + o) + "px"
        } else this.horiz.style.display = "", this.horiz.firstChild.style.width = "0";
        return !this.checkedZeroWidth && e.clientHeight > 0 && (0 == r && this.zeroWidthHack(), this.checkedZeroWidth = !0), {
            right: n ? r : 0,
            bottom: t ? r : 0
        }
    }, Tl.prototype.setScrollLeft = function(e) {
        this.horiz.scrollLeft != e && (this.horiz.scrollLeft = e), this.disableHoriz && this.enableZeroWidthBar(this.horiz, this.disableHoriz, "horiz")
    }, Tl.prototype.setScrollTop = function(e) {
        this.vert.scrollTop != e && (this.vert.scrollTop = e), this.disableVert && this.enableZeroWidthBar(this.vert, this.disableVert, "vert")
    }, Tl.prototype.zeroWidthHack = function() {
        var e = Da && !za ? "12px" : "18px";
        this.horiz.style.height = this.vert.style.width = e, this.horiz.style.pointerEvents = this.vert.style.pointerEvents = "none", this.disableHoriz = new qa, this.disableVert = new qa
    }, Tl.prototype.enableZeroWidthBar = function(e, t, n) {
        function r() {
            var i = e.getBoundingClientRect();
            ("vert" == n ? document.elementFromPoint(i.right - 1, (i.top + i.bottom) / 2) : document.elementFromPoint((i.right + i.left) / 2, i.bottom - 1)) != e ? e.style.pointerEvents = "none" : t.set(1e3, r)
        }
        e.style.pointerEvents = "auto", t.set(1e3, r)
    }, Tl.prototype.clear = function() {
        var e = this.horiz.parentNode;
        e.removeChild(this.horiz), e.removeChild(this.vert)
    };
    var Ml = function() {};
    Ml.prototype.update = function() {
        return {
            bottom: 0,
            right: 0
        }
    }, Ml.prototype.setScrollLeft = function() {}, Ml.prototype.setScrollTop = function() {}, Ml.prototype.clear = function() {};
    var Al = {
            native: Tl,
            null: Ml
        },
        zl = 0,
        Ol = function(e, t, n) {
            var r = e.display;
            this.viewport = t, this.visible = $n(r, e.doc, t), this.editorIsHidden = !r.wrapper.offsetWidth, this.wrapperHeight = r.wrapper.clientHeight, this.wrapperWidth = r.wrapper.clientWidth, this.oldDisplayWidth = Ht(e), this.force = n, this.dims = xn(e), this.events = []
        };
    Ol.prototype.signal = function(e, t) {
        D(e, t) && this.events.push(arguments)
    }, Ol.prototype.finish = function() {
        for (var e = 0; e < this.events.length; e++) F.apply(null, this.events[e])
    };
    var Fl = 0,
        El = null;
    wa ? El = -.53 : ya ? El = 15 : Ta ? El = -.7 : Aa && (El = -1 / 3);
    var Nl = function(e, t) {
        this.ranges = e, this.primIndex = t
    };
    Nl.prototype.primary = function() {
        return this.ranges[this.primIndex]
    }, Nl.prototype.equals = function(e) {
        if (e == this) return !0;
        if (e.primIndex != this.primIndex || e.ranges.length != this.ranges.length) return !1;
        for (var t = 0; t < this.ranges.length; t++) {
            var n = this.ranges[t],
                r = e.ranges[t];
            if (!ce(n.anchor, r.anchor) || !ce(n.head, r.head)) return !1
        }
        return !0
    }, Nl.prototype.deepCopy = function() {
        for (var e = [], t = 0; t < this.ranges.length; t++) e[t] = new Dl(ue(this.ranges[t].anchor), ue(this.ranges[t].head));
        return new Nl(e, this.primIndex)
    }, Nl.prototype.somethingSelected = function() {
        for (var e = 0; e < this.ranges.length; e++)
            if (!this.ranges[e].empty()) return !0;
        return !1
    }, Nl.prototype.contains = function(e, t) {
        t || (t = e);
        for (var n = 0; n < this.ranges.length; n++) {
            var r = this.ranges[n];
            if (se(t, r.from()) >= 0 && se(e, r.to()) <= 0) return n
        }
        return -1
    };
    var Dl = function(e, t) {
        this.anchor = e, this.head = t
    };
    Dl.prototype.from = function() {
        return fe(this.anchor, this.head)
    }, Dl.prototype.to = function() {
        return de(this.anchor, this.head)
    }, Dl.prototype.empty = function() {
        return this.head.line == this.anchor.line && this.head.ch == this.anchor.ch
    }, qi.prototype = {
        chunkSize: function() {
            return this.lines.length
        },
        removeInner: function(e, t) {
            for (var n = e, r = e + t; n < r; ++n) {
                var i = this.lines[n];
                this.height -= i.height, at(i), kt(i, "delete")
            }
            this.lines.splice(e, t)
        },
        collapse: function(e) {
            e.push.apply(e, this.lines)
        },
        insertInner: function(e, t, n) {
            this.height += n, this.lines = this.lines.slice(0, e).concat(t).concat(this.lines.slice(e));
            for (var r = 0; r < t.length; ++r) t[r].parent = this
        },
        iterN: function(e, t, n) {
            for (var r = e + t; e < r; ++e)
                if (n(this.lines[e])) return !0
        }
    }, Ui.prototype = {
        chunkSize: function() {
            return this.size
        },
        removeInner: function(e, t) {
            this.size -= t;
            for (var n = 0; n < this.children.length; ++n) {
                var r = this.children[n],
                    i = r.chunkSize();
                if (e < i) {
                    var o = Math.min(t, i - e),
                        a = r.height;
                    if (r.removeInner(e, o), this.height -= a - r.height, i == o && (this.children.splice(n--, 1), r.parent = null), 0 == (t -= o)) break;
                    e = 0
                } else e -= i
            }
            if (this.size - t < 25 && (this.children.length > 1 || !(this.children[0] instanceof qi))) {
                var l = [];
                this.collapse(l), this.children = [new qi(l)], this.children[0].parent = this
            }
        },
        collapse: function(e) {
            for (var t = 0; t < this.children.length; ++t) this.children[t].collapse(e)
        },
        insertInner: function(e, t, n) {
            this.size += t.length, this.height += n;
            for (var r = 0; r < this.children.length; ++r) {
                var i = this.children[r],
                    o = i.chunkSize();
                if (e <= o) {
                    if (i.insertInner(e, t, n), i.lines && i.lines.length > 50) {
                        for (var a = i.lines.length % 25 + 25, l = a; l < i.lines.length;) {
                            var s = new qi(i.lines.slice(l, l += 25));
                            i.height -= s.height, this.children.splice(++r, 0, s), s.parent = this
                        }
                        i.lines = i.lines.slice(0, a), this.maybeSpill()
                    }
                    break
                }
                e -= o
            }
        },
        maybeSpill: function() {
            if (!(this.children.length <= 10)) {
                var e = this;
                do {
                    var t = new Ui(e.children.splice(e.children.length - 5, 5));
                    if (e.parent) {
                        e.size -= t.size, e.height -= t.height;
                        var n = f(e.parent.children, e);
                        e.parent.children.splice(n + 1, 0, t)
                    } else {
                        var r = new Ui(e.children);
                        r.parent = e, e.children = [r, t], e = r
                    }
                    t.parent = e.parent
                } while (e.children.length > 10);
                e.parent.maybeSpill()
            }
        },
        iterN: function(e, t, n) {
            for (var r = 0; r < this.children.length; ++r) {
                var i = this.children[r],
                    o = i.chunkSize();
                if (e < o) {
                    var a = Math.min(t, o - e);
                    if (i.iterN(e, a, n)) return !0;
                    if (0 == (t -= a)) break;
                    e = 0
                } else e -= o
            }
        }
    };
    var Pl = function(e, t, n) {
        if (n)
            for (var r in n) n.hasOwnProperty(r) && (this[r] = n[r]);
        this.doc = e, this.node = t
    };
    Pl.prototype.clear = function() {
        var e = this.doc.cm,
            t = this.line.widgets,
            n = this.line,
            r = re(n);
        if (null != r && t) {
            for (var i = 0; i < t.length; ++i) t[i] == this && t.splice(i--, 1);
            t.length || (n.widgets = null);
            var o = Dt(this);
            ne(n, Math.max(0, n.height - o)), e && (vr(e, (function() {
                $i(e, n, -o), An(e, r, "widget")
            })), kt(e, "lineWidgetCleared", e, this, r))
        }
    }, Pl.prototype.changed = function() {
        var e = this,
            t = this.height,
            n = this.doc.cm,
            r = this.line;
        this.height = null;
        var i = Dt(this) - t;
        i && (et(this.doc, r) || ne(r, r.height + i), n && vr(n, (function() {
            n.curOp.forceUpdate = !0, $i(n, r, i), kt(n, "lineWidgetChanged", n, e, re(r))
        })))
    }, P(Pl);
    var Il = 0,
        jl = function(e, t) {
            this.lines = [], this.type = t, this.doc = e, this.id = ++Il
        };
    jl.prototype.clear = function() {
        if (!this.explicitlyCleared) {
            var e = this.doc.cm,
                t = e && !e.curOp;
            if (t && cr(e), D(this, "clear")) {
                var n = this.find();
                n && kt(this, "clear", n.from, n.to)
            }
            for (var r = null, i = null, o = 0; o < this.lines.length; ++o) {
                var a = this.lines[o],
                    l = Fe(a.markedSpans, this);
                e && !this.collapsed ? An(e, re(a), "text") : e && (null != l.to && (i = re(a)), null != l.from && (r = re(a))), a.markedSpans = Ee(a.markedSpans, l), null == l.from && this.collapsed && !et(this.doc, a) && e && ne(a, bn(e.display))
            }
            if (e && this.collapsed && !e.options.lineWrapping)
                for (var s = 0; s < this.lines.length; ++s) {
                    var c = Ye(this.lines[s]),
                        u = rt(c);
                    u > e.display.maxLineLength && (e.display.maxLine = c, e.display.maxLineLength = u, e.display.maxLineChanged = !0)
                }
            null != r && e && this.collapsed && Mn(e, r, i + 1), this.lines.length = 0, this.explicitlyCleared = !0, this.atomic && this.doc.cantEdit && (this.doc.cantEdit = !1, e && Li(e.doc)), e && kt(e, "markerCleared", e, this, r, i), t && ur(e), this.parent && this.parent.clear()
        }
    }, jl.prototype.find = function(e, t) {
        var n, r;
        null == e && "bookmark" == this.type && (e = 1);
        for (var i = 0; i < this.lines.length; ++i) {
            var o = this.lines[i],
                a = Fe(o.markedSpans, this);
            if (null != a.from && (n = le(t ? o : re(o), a.from), -1 == e)) return n;
            if (null != a.to && (r = le(t ? o : re(o), a.to), 1 == e)) return r
        }
        return n && {
            from: n,
            to: r
        }
    }, jl.prototype.changed = function() {
        var e = this,
            t = this.find(-1, !0),
            n = this,
            r = this.doc.cm;
        t && r && vr(r, (function() {
            var i = t.line,
                o = re(t.line),
                a = Kt(r, o);
            if (a && (Jt(a), r.curOp.selectionChanged = r.curOp.forceUpdate = !0), r.curOp.updateMaxLine = !0, !et(n.doc, i) && null != n.height) {
                var l = n.height;
                n.height = null;
                var s = Dt(n) - l;
                s && ne(i, i.height + s)
            }
            kt(r, "markerChanged", r, e)
        }))
    }, jl.prototype.attachLine = function(e) {
        if (!this.lines.length && this.doc.cm) {
            var t = this.doc.cm.curOp;
            t.maybeHiddenMarkers && -1 != f(t.maybeHiddenMarkers, this) || (t.maybeUnhiddenMarkers || (t.maybeUnhiddenMarkers = [])).push(this)
        }
        this.lines.push(e)
    }, jl.prototype.detachLine = function(e) {
        if (this.lines.splice(f(this.lines, e), 1), !this.lines.length && this.doc.cm) {
            var t = this.doc.cm.curOp;
            (t.maybeHiddenMarkers || (t.maybeHiddenMarkers = [])).push(this)
        }
    }, P(jl);
    var Bl = function(e, t) {
        this.markers = e, this.primary = t;
        for (var n = 0; n < e.length; ++n) e[n].parent = this
    };
    Bl.prototype.clear = function() {
        if (!this.explicitlyCleared) {
            this.explicitlyCleared = !0;
            for (var e = 0; e < this.markers.length; ++e) this.markers[e].clear();
            kt(this, "clear")
        }
    }, Bl.prototype.find = function(e, t) {
        return this.primary.find(e, t)
    }, P(Bl);
    var Wl = 0,
        Hl = function(e, t, n, r, i) {
            if (!(this instanceof Hl)) return new Hl(e, t, n, r, i);
            null == n && (n = 0), Ui.call(this, [new qi([new bl("", null)])]), this.first = n, this.scrollTop = this.scrollLeft = 0, this.cantEdit = !1, this.cleanGeneration = 1, this.modeFrontier = this.highlightFrontier = n;
            var o = le(n, 0);
            this.sel = Rr(o), this.history = new ni(null), this.id = ++Wl, this.modeOption = t, this.lineSep = r, this.direction = "rtl" == i ? "rtl" : "ltr", this.extend = !1, "string" == typeof e && (e = this.splitLines(e)), Zr(this, {
                from: o,
                to: o,
                text: e
            }), wi(this, Rr(o), Ya)
        };
    Hl.prototype = b(Ui.prototype, {
        constructor: Hl,
        iter: function(e, t, n) {
            n ? this.iterN(e - this.first, t - e, n) : this.iterN(this.first, this.first + this.size, e)
        },
        insert: function(e, t) {
            for (var n = 0, r = 0; r < t.length; ++r) n += t[r].height;
            this.insertInner(e - this.first, t, n)
        },
        remove: function(e, t) {
            this.removeInner(e - this.first, t)
        },
        getValue: function(e) {
            var t = te(this, this.first, this.first + this.size);
            return !1 === e ? t : t.join(e || this.lineSeparator())
        },
        setValue: kr((function(e) {
            var t = le(this.first, 0),
                n = this.first + this.size - 1;
            Ei(this, {
                from: t,
                to: le(n, J(this, n).text.length),
                text: this.splitLines(e),
                origin: "setValue",
                full: !0
            }, !0), this.cm && Qn(this.cm, 0, 0), wi(this, Rr(t), Ya)
        })),
        replaceRange: function(e, t, n, r) {
            Bi(this, e, t = pe(this, t), n = n ? pe(this, n) : t, r)
        },
        getRange: function(e, t, n) {
            var r = ee(this, pe(this, e), pe(this, t));
            return !1 === n ? r : "" === n ? r.join("") : r.join(n || this.lineSeparator())
        },
        getLine: function(e) {
            var t = this.getLineHandle(e);
            return t && t.text
        },
        getLineHandle: function(e) {
            if (oe(this, e)) return J(this, e)
        },
        getLineNumber: function(e) {
            return re(e)
        },
        getLineHandleVisualStart: function(e) {
            return "number" == typeof e && (e = J(this, e)), Ye(e)
        },
        lineCount: function() {
            return this.size
        },
        firstLine: function() {
            return this.first
        },
        lastLine: function() {
            return this.first + this.size - 1
        },
        clipPos: function(e) {
            return pe(this, e)
        },
        getCursor: function(e) {
            var t = this.sel.primary();
            return null == e || "head" == e ? t.head : "anchor" == e ? t.anchor : "end" == e || "to" == e || !1 === e ? t.to() : t.from()
        },
        listSelections: function() {
            return this.sel.ranges
        },
        somethingSelected: function() {
            return this.sel.somethingSelected()
        },
        setCursor: kr((function(e, t, n) {
            bi(this, pe(this, "number" == typeof e ? le(e, t || 0) : e), null, n)
        })),
        setSelection: kr((function(e, t, n) {
            bi(this, pe(this, e), pe(this, t || e), n)
        })),
        extendSelection: kr((function(e, t, n) {
            gi(this, pe(this, e), t && pe(this, t), n)
        })),
        extendSelections: kr((function(e, t) {
            vi(this, ge(this, e), t)
        })),
        extendSelectionsBy: kr((function(e, t) {
            vi(this, ge(this, g(this.sel.ranges, e)), t)
        })),
        setSelections: kr((function(e, t, n) {
            if (e.length) {
                for (var r = [], i = 0; i < e.length; i++) r[i] = new Dl(pe(this, e[i].anchor), pe(this, e[i].head || e[i].anchor));
                null == t && (t = Math.min(e.length - 1, this.sel.primIndex)), wi(this, _r(this.cm, r, t), n)
            }
        })),
        addSelection: kr((function(e, t, n) {
            var r = this.sel.ranges.slice(0);
            r.push(new Dl(pe(this, e), pe(this, t || e))), wi(this, _r(this.cm, r, r.length - 1), n)
        })),
        getSelection: function(e) {
            for (var t, n = this.sel.ranges, r = 0; r < n.length; r++) {
                var i = ee(this, n[r].from(), n[r].to());
                t = t ? t.concat(i) : i
            }
            return !1 === e ? t : t.join(e || this.lineSeparator())
        },
        getSelections: function(e) {
            for (var t = [], n = this.sel.ranges, r = 0; r < n.length; r++) {
                var i = ee(this, n[r].from(), n[r].to());
                !1 !== e && (i = i.join(e || this.lineSeparator())), t[r] = i
            }
            return t
        },
        replaceSelection: function(e, t, n) {
            for (var r = [], i = 0; i < this.sel.ranges.length; i++) r[i] = e;
            this.replaceSelections(r, t, n || "+input")
        },
        replaceSelections: kr((function(e, t, n) {
            for (var r = [], i = this.sel, o = 0; o < i.ranges.length; o++) {
                var a = i.ranges[o];
                r[o] = {
                    from: a.from(),
                    to: a.to(),
                    text: this.splitLines(e[o]),
                    origin: n
                }
            }
            for (var l = t && "end" != t && Vr(this, r, t), s = r.length - 1; s >= 0; s--) Ei(this, r[s]);
            l ? xi(this, l) : this.cm && Zn(this.cm)
        })),
        undo: kr((function() {
            Di(this, "undo")
        })),
        redo: kr((function() {
            Di(this, "redo")
        })),
        undoSelection: kr((function() {
            Di(this, "undo", !0)
        })),
        redoSelection: kr((function() {
            Di(this, "redo", !0)
        })),
        setExtending: function(e) {
            this.extend = e
        },
        getExtending: function() {
            return this.extend
        },
        historySize: function() {
            for (var e = this.history, t = 0, n = 0, r = 0; r < e.done.length; r++) e.done[r].ranges || ++t;
            for (var i = 0; i < e.undone.length; i++) e.undone[i].ranges || ++n;
            return {
                undo: t,
                redo: n
            }
        },
        clearHistory: function() {
            var e = this;
            this.history = new ni(this.history), Qr(this, (function(t) {
                return t.history = e.history
            }), !0)
        },
        markClean: function() {
            this.cleanGeneration = this.changeGeneration(!0)
        },
        changeGeneration: function(e) {
            return e && (this.history.lastOp = this.history.lastSelOp = this.history.lastOrigin = null), this.history.generation
        },
        isClean: function(e) {
            return this.history.generation == (e || this.cleanGeneration)
        },
        getHistory: function() {
            return {
                done: pi(this.history.done),
                undone: pi(this.history.undone)
            }
        },
        setHistory: function(e) {
            var t = this.history = new ni(this.history);
            t.done = pi(e.done.slice(0), null, !0), t.undone = pi(e.undone.slice(0), null, !0)
        },
        setGutterMarker: kr((function(e, t, n) {
            return Ri(this, e, "gutter", (function(e) {
                var r = e.gutterMarkers || (e.gutterMarkers = {});
                return r[t] = n, !n && w(r) && (e.gutterMarkers = null), !0
            }))
        })),
        clearGutter: kr((function(e) {
            var t = this;
            this.iter((function(n) {
                n.gutterMarkers && n.gutterMarkers[e] && Ri(t, n, "gutter", (function() {
                    return n.gutterMarkers[e] = null, w(n.gutterMarkers) && (n.gutterMarkers = null), !0
                }))
            }))
        })),
        lineInfo: function(e) {
            var t;
            if ("number" == typeof e) {
                if (!oe(this, e)) return null;
                if (t = e, !(e = J(this, e))) return null
            } else if (null == (t = re(e))) return null;
            return {
                line: t,
                handle: e,
                text: e.text,
                gutterMarkers: e.gutterMarkers,
                textClass: e.textClass,
                bgClass: e.bgClass,
                wrapClass: e.wrapClass,
                widgets: e.widgets
            }
        },
        addLineClass: kr((function(t, n, r) {
            return Ri(this, t, "gutter" == n ? "gutter" : "class", (function(t) {
                var i = "text" == n ? "textClass" : "background" == n ? "bgClass" : "gutter" == n ? "gutterClass" : "wrapClass";
                if (t[i]) {
                    if (e(r).test(t[i])) return !1;
                    t[i] += " " + r
                } else t[i] = r;
                return !0
            }))
        })),
        removeLineClass: kr((function(t, n, r) {
            return Ri(this, t, "gutter" == n ? "gutter" : "class", (function(t) {
                var i = "text" == n ? "textClass" : "background" == n ? "bgClass" : "gutter" == n ? "gutterClass" : "wrapClass",
                    o = t[i];
                if (!o) return !1;
                if (null == r) t[i] = null;
                else {
                    var a = o.match(e(r));
                    if (!a) return !1;
                    var l = a.index + a[0].length;
                    t[i] = o.slice(0, a.index) + (a.index && l != o.length ? " " : "") + o.slice(l) || null
                }
                return !0
            }))
        })),
        addLineWidget: kr((function(e, t, n) {
            return Ki(this, e, t, n)
        })),
        removeLineWidget: function(e) {
            e.clear()
        },
        markText: function(e, t, n) {
            return Vi(this, pe(this, e), pe(this, t), n, n && n.type || "range")
        },
        setBookmark: function(e, t) {
            var n = {
                replacedWith: t && (null == t.nodeType ? t.widget : t),
                insertLeft: t && t.insertLeft,
                clearWhenEmpty: !1,
                shared: t && t.shared,
                handleMouseEvents: t && t.handleMouseEvents
            };
            return Vi(this, e = pe(this, e), e, n, "bookmark")
        },
        findMarksAt: function(e) {
            var t = [],
                n = J(this, (e = pe(this, e)).line).markedSpans;
            if (n)
                for (var r = 0; r < n.length; ++r) {
                    var i = n[r];
                    (null == i.from || i.from <= e.ch) && (null == i.to || i.to >= e.ch) && t.push(i.marker.parent || i.marker)
                }
            return t
        },
        findMarks: function(e, t, n) {
            e = pe(this, e), t = pe(this, t);
            var r = [],
                i = e.line;
            return this.iter(e.line, t.line + 1, (function(o) {
                var a = o.markedSpans;
                if (a)
                    for (var l = 0; l < a.length; l++) {
                        var s = a[l];
                        null != s.to && i == e.line && e.ch >= s.to || null == s.from && i != e.line || null != s.from && i == t.line && s.from >= t.ch || n && !n(s.marker) || r.push(s.marker.parent || s.marker)
                    }++i
            })), r
        },
        getAllMarks: function() {
            var e = [];
            return this.iter((function(t) {
                var n = t.markedSpans;
                if (n)
                    for (var r = 0; r < n.length; ++r) null != n[r].from && e.push(n[r].marker)
            })), e
        },
        posFromIndex: function(e) {
            var t, n = this.first,
                r = this.lineSeparator().length;
            return this.iter((function(i) {
                var o = i.text.length + r;
                if (o > e) return t = e, !0;
                e -= o, ++n
            })), pe(this, le(n, t))
        },
        indexFromPos: function(e) {
            var t = (e = pe(this, e)).ch;
            if (e.line < this.first || e.ch < 0) return 0;
            var n = this.lineSeparator().length;
            return this.iter(this.first, e.line, (function(e) {
                t += e.text.length + n
            })), t
        },
        copy: function(e) {
            var t = new Hl(te(this, this.first, this.first + this.size), this.modeOption, this.first, this.lineSep, this.direction);
            return t.scrollTop = this.scrollTop, t.scrollLeft = this.scrollLeft, t.sel = this.sel, t.extend = !1, e && (t.history.undoDepth = this.history.undoDepth, t.setHistory(this.getHistory())), t
        },
        linkedDoc: function(e) {
            e || (e = {});
            var t = this.first,
                n = this.first + this.size;
            null != e.from && e.from > t && (t = e.from), null != e.to && e.to < n && (n = e.to);
            var r = new Hl(te(this, t, n), e.mode || this.modeOption, t, this.lineSep, this.direction);
            return e.sharedHist && (r.history = this.history), (this.linked || (this.linked = [])).push({
                doc: r,
                sharedHist: e.sharedHist
            }), r.linked = [{
                doc: this,
                isParent: !0,
                sharedHist: e.sharedHist
            }], Xi(r, Yi(this)), r
        },
        unlinkDoc: function(e) {
            if (e instanceof Yo && (e = e.doc), this.linked)
                for (var t = 0; t < this.linked.length; ++t) {
                    if (this.linked[t].doc == e) {
                        this.linked.splice(t, 1), e.unlinkDoc(this), Zi(Yi(this));
                        break
                    }
                }
            if (e.history == this.history) {
                var n = [e.id];
                Qr(e, (function(e) {
                    return n.push(e.id)
                }), !0), e.history = new ni(null), e.history.done = pi(this.history.done, n), e.history.undone = pi(this.history.undone, n)
            }
        },
        iterLinkedDocs: function(e) {
            Qr(this, e)
        },
        getMode: function() {
            return this.mode
        },
        getEditor: function() {
            return this.cm
        },
        splitLines: function(e) {
            return this.lineSep ? e.split(this.lineSep) : al(e)
        },
        lineSeparator: function() {
            return this.lineSep || "\n"
        },
        setDirection: kr((function(e) {
            "rtl" != e && (e = "ltr"), e != this.direction && (this.direction = e, this.iter((function(e) {
                return e.order = null
            })), this.cm && ti(this.cm))
        }))
    }), Hl.prototype.eachLine = Hl.prototype.iter;
    for (var _l = 0, Rl = !1, ql = {
            3: "Pause",
            8: "Backspace",
            9: "Tab",
            13: "Enter",
            16: "Shift",
            17: "Ctrl",
            18: "Alt",
            19: "Pause",
            20: "CapsLock",
            27: "Esc",
            32: "Space",
            33: "PageUp",
            34: "PageDown",
            35: "End",
            36: "Home",
            37: "Left",
            38: "Up",
            39: "Right",
            40: "Down",
            44: "PrintScrn",
            45: "Insert",
            46: "Delete",
            59: ";",
            61: "=",
            91: "Mod",
            92: "Mod",
            93: "Mod",
            106: "*",
            107: "=",
            109: "-",
            110: ".",
            111: "/",
            145: "ScrollLock",
            173: "-",
            186: ";",
            187: "=",
            188: ",",
            189: "-",
            190: ".",
            191: "/",
            192: "`",
            219: "[",
            220: "\\",
            221: "]",
            222: "'",
            224: "Mod",
            63232: "Up",
            63233: "Down",
            63234: "Left",
            63235: "Right",
            63272: "Delete",
            63273: "Home",
            63275: "End",
            63276: "PageUp",
            63277: "PageDown",
            63302: "Insert"
        }, Ul = 0; Ul < 10; Ul++) ql[Ul + 48] = ql[Ul + 96] = String(Ul);
    for (var $l = 65; $l <= 90; $l++) ql[$l] = String.fromCharCode($l);
    for (var Kl = 1; Kl <= 12; Kl++) ql[Kl + 111] = ql[Kl + 63235] = "F" + Kl;
    var Vl = {
        basic: {
            Left: "goCharLeft",
            Right: "goCharRight",
            Up: "goLineUp",
            Down: "goLineDown",
            End: "goLineEnd",
            Home: "goLineStartSmart",
            PageUp: "goPageUp",
            PageDown: "goPageDown",
            Delete: "delCharAfter",
            Backspace: "delCharBefore",
            "Shift-Backspace": "delCharBefore",
            Tab: "defaultTab",
            "Shift-Tab": "indentAuto",
            Enter: "newlineAndIndent",
            Insert: "toggleOverwrite",
            Esc: "singleSelection"
        },
        pcDefault: {
            "Ctrl-A": "selectAll",
            "Ctrl-D": "deleteLine",
            "Ctrl-Z": "undo",
            "Shift-Ctrl-Z": "redo",
            "Ctrl-Y": "redo",
            "Ctrl-Home": "goDocStart",
            "Ctrl-End": "goDocEnd",
            "Ctrl-Up": "goLineUp",
            "Ctrl-Down": "goLineDown",
            "Ctrl-Left": "goGroupLeft",
            "Ctrl-Right": "goGroupRight",
            "Alt-Left": "goLineStart",
            "Alt-Right": "goLineEnd",
            "Ctrl-Backspace": "delGroupBefore",
            "Ctrl-Delete": "delGroupAfter",
            "Ctrl-S": "save",
            "Ctrl-F": "find",
            "Ctrl-G": "findNext",
            "Shift-Ctrl-G": "findPrev",
            "Shift-Ctrl-F": "replace",
            "Shift-Ctrl-R": "replaceAll",
            "Ctrl-[": "indentLess",
            "Ctrl-]": "indentMore",
            "Ctrl-U": "undoSelection",
            "Shift-Ctrl-U": "redoSelection",
            "Alt-U": "redoSelection",
            fallthrough: "basic"
        },
        emacsy: {
            "Ctrl-F": "goCharRight",
            "Ctrl-B": "goCharLeft",
            "Ctrl-P": "goLineUp",
            "Ctrl-N": "goLineDown",
            "Ctrl-A": "goLineStart",
            "Ctrl-E": "goLineEnd",
            "Ctrl-V": "goPageDown",
            "Shift-Ctrl-V": "goPageUp",
            "Ctrl-D": "delCharAfter",
            "Ctrl-H": "delCharBefore",
            "Alt-Backspace": "delWordBefore",
            "Ctrl-K": "killLine",
            "Ctrl-T": "transposeChars",
            "Ctrl-O": "openLine"
        },
        macDefault: {
            "Cmd-A": "selectAll",
            "Cmd-D": "deleteLine",
            "Cmd-Z": "undo",
            "Shift-Cmd-Z": "redo",
            "Cmd-Y": "redo",
            "Cmd-Home": "goDocStart",
            "Cmd-Up": "goDocStart",
            "Cmd-End": "goDocEnd",
            "Cmd-Down": "goDocEnd",
            "Alt-Left": "goGroupLeft",
            "Alt-Right": "goGroupRight",
            "Cmd-Left": "goLineLeft",
            "Cmd-Right": "goLineRight",
            "Alt-Backspace": "delGroupBefore",
            "Ctrl-Alt-Backspace": "delGroupAfter",
            "Alt-Delete": "delGroupAfter",
            "Cmd-S": "save",
            "Cmd-F": "find",
            "Cmd-G": "findNext",
            "Shift-Cmd-G": "findPrev",
            "Cmd-Alt-F": "replace",
            "Shift-Cmd-Alt-F": "replaceAll",
            "Cmd-[": "indentLess",
            "Cmd-]": "indentMore",
            "Cmd-Backspace": "delWrappedLineLeft",
            "Cmd-Delete": "delWrappedLineRight",
            "Cmd-U": "undoSelection",
            "Shift-Cmd-U": "redoSelection",
            "Ctrl-Up": "goDocStart",
            "Ctrl-Down": "goDocEnd",
            fallthrough: ["basic", "emacsy"]
        }
    };
    Vl.default = Da ? Vl.macDefault : Vl.pcDefault;
    var Gl, Yl, Xl = {
            selectAll: Oi,
            singleSelection: function(e) {
                return e.setSelection(e.getCursor("anchor"), e.getCursor("head"), Ya)
            },
            killLine: function(e) {
                return po(e, (function(t) {
                    if (t.empty()) {
                        var n = J(e.doc, t.head.line).text.length;
                        return t.head.ch == n && t.head.line < e.lastLine() ? {
                            from: t.head,
                            to: le(t.head.line + 1, 0)
                        } : {
                            from: t.head,
                            to: le(t.head.line, n)
                        }
                    }
                    return {
                        from: t.from(),
                        to: t.to()
                    }
                }))
            },
            deleteLine: function(e) {
                return po(e, (function(t) {
                    return {
                        from: le(t.from().line, 0),
                        to: pe(e.doc, le(t.to().line + 1, 0))
                    }
                }))
            },
            delLineLeft: function(e) {
                return po(e, (function(e) {
                    return {
                        from: le(e.from().line, 0),
                        to: e.from()
                    }
                }))
            },
            delWrappedLineLeft: function(e) {
                return po(e, (function(t) {
                    var n = e.charCoords(t.head, "div").top + 5;
                    return {
                        from: e.coordsChar({
                            left: 0,
                            top: n
                        }, "div"),
                        to: t.from()
                    }
                }))
            },
            delWrappedLineRight: function(e) {
                return po(e, (function(t) {
                    var n = e.charCoords(t.head, "div").top + 5,
                        r = e.coordsChar({
                            left: e.display.lineDiv.offsetWidth + 100,
                            top: n
                        }, "div");
                    return {
                        from: t.from(),
                        to: r
                    }
                }))
            },
            undo: function(e) {
                return e.undo()
            },
            redo: function(e) {
                return e.redo()
            },
            undoSelection: function(e) {
                return e.undoSelection()
            },
            redoSelection: function(e) {
                return e.redoSelection()
            },
            goDocStart: function(e) {
                return e.extendSelection(le(e.firstLine(), 0))
            },
            goDocEnd: function(e) {
                return e.extendSelection(le(e.lastLine()))
            },
            goLineStart: function(e) {
                return e.extendSelectionsBy((function(t) {
                    return bo(e, t.head.line)
                }), {
                    origin: "+move",
                    bias: 1
                })
            },
            goLineStartSmart: function(e) {
                return e.extendSelectionsBy((function(t) {
                    return xo(e, t.head)
                }), {
                    origin: "+move",
                    bias: 1
                })
            },
            goLineEnd: function(e) {
                return e.extendSelectionsBy((function(t) {
                    return ko(e, t.head.line)
                }), {
                    origin: "+move",
                    bias: -1
                })
            },
            goLineRight: function(e) {
                return e.extendSelectionsBy((function(t) {
                    var n = e.cursorCoords(t.head, "div").top + 5;
                    return e.coordsChar({
                        left: e.display.lineDiv.offsetWidth + 100,
                        top: n
                    }, "div")
                }), Za)
            },
            goLineLeft: function(e) {
                return e.extendSelectionsBy((function(t) {
                    var n = e.cursorCoords(t.head, "div").top + 5;
                    return e.coordsChar({
                        left: 0,
                        top: n
                    }, "div")
                }), Za)
            },
            goLineLeftSmart: function(e) {
                return e.extendSelectionsBy((function(t) {
                    var n = e.cursorCoords(t.head, "div").top + 5,
                        r = e.coordsChar({
                            left: 0,
                            top: n
                        }, "div");
                    return r.ch < e.getLine(r.line).search(/\S/) ? xo(e, t.head) : r
                }), Za)
            },
            goLineUp: function(e) {
                return e.moveV(-1, "line")
            },
            goLineDown: function(e) {
                return e.moveV(1, "line")
            },
            goPageUp: function(e) {
                return e.moveV(-1, "page")
            },
            goPageDown: function(e) {
                return e.moveV(1, "page")
            },
            goCharLeft: function(e) {
                return e.moveH(-1, "char")
            },
            goCharRight: function(e) {
                return e.moveH(1, "char")
            },
            goColumnLeft: function(e) {
                return e.moveH(-1, "column")
            },
            goColumnRight: function(e) {
                return e.moveH(1, "column")
            },
            goWordLeft: function(e) {
                return e.moveH(-1, "word")
            },
            goGroupRight: function(e) {
                return e.moveH(1, "group")
            },
            goGroupLeft: function(e) {
                return e.moveH(-1, "group")
            },
            goWordRight: function(e) {
                return e.moveH(1, "word")
            },
            delCharBefore: function(e) {
                return e.deleteH(-1, "codepoint")
            },
            delCharAfter: function(e) {
                return e.deleteH(1, "char")
            },
            delWordBefore: function(e) {
                return e.deleteH(-1, "word")
            },
            delWordAfter: function(e) {
                return e.deleteH(1, "word")
            },
            delGroupBefore: function(e) {
                return e.deleteH(-1, "group")
            },
            delGroupAfter: function(e) {
                return e.deleteH(1, "group")
            },
            indentAuto: function(e) {
                return e.indentSelection("smart")
            },
            indentMore: function(e) {
                return e.indentSelection("add")
            },
            indentLess: function(e) {
                return e.indentSelection("subtract")
            },
            insertTab: function(e) {
                return e.replaceSelection("\t")
            },
            insertSoftTab: function(e) {
                for (var t = [], n = e.listSelections(), r = e.options.tabSize, i = 0; i < n.length; i++) {
                    var o = n[i].from(),
                        a = d(e.getLine(o.line), o.ch, r);
                    t.push(p(r - a % r))
                }
                e.replaceSelections(t)
            },
            defaultTab: function(e) {
                e.somethingSelected() ? e.indentSelection("add") : e.execCommand("insertTab")
            },
            transposeChars: function(e) {
                return vr(e, (function() {
                    for (var t = e.listSelections(), n = [], r = 0; r < t.length; r++)
                        if (t[r].empty()) {
                            var i = t[r].head,
                                o = J(e.doc, i.line).text;
                            if (o)
                                if (i.ch == o.length && (i = new le(i.line, i.ch - 1)), i.ch > 0) i = new le(i.line, i.ch + 1), e.replaceRange(o.charAt(i.ch - 1) + o.charAt(i.ch - 2), le(i.line, i.ch - 2), i, "+transpose");
                                else if (i.line > e.doc.first) {
                                var a = J(e.doc, i.line - 1).text;
                                a && (i = new le(i.line, 1), e.replaceRange(o.charAt(0) + e.doc.lineSeparator() + a.charAt(a.length - 1), le(i.line - 1, a.length - 1), i, "+transpose"))
                            }
                            n.push(new Dl(i, i))
                        }
                    e.setSelections(n)
                }))
            },
            newlineAndIndent: function(e) {
                return vr(e, (function() {
                    for (var t = e.listSelections(), n = t.length - 1; n >= 0; n--) e.replaceRange(e.doc.lineSeparator(), t[n].anchor, t[n].head, "+input");
                    t = e.listSelections();
                    for (var r = 0; r < t.length; r++) e.indentLine(t[r].from().line, null, !0);
                    Zn(e)
                }))
            },
            openLine: function(e) {
                return e.replaceSelection("\n", "start")
            },
            toggleOverwrite: function(e) {
                return e.toggleOverwrite()
            }
        },
        Zl = new qa,
        Ql = null,
        Jl = 400,
        es = function(e, t, n) {
            this.time = e, this.pos = t, this.button = n
        };
    es.prototype.compare = function(e, t, n) {
        return this.time + Jl > e && 0 == se(t, this.pos) && n == this.button
    };
    var ts = {
            toString: function() {
                return "CodeMirror.Init"
            }
        },
        ns = {},
        rs = {};
    Yo.defaults = ns, Yo.optionHandlers = rs;
    var is = [];
    Yo.defineInitHook = function(e) {
        return is.push(e)
    };
    var os = null,
        as = function(e) {
            this.cm = e, this.lastAnchorNode = this.lastAnchorOffset = this.lastFocusNode = this.lastFocusOffset = null, this.polling = new qa, this.composing = null, this.gracePeriod = !1, this.readDOMTimeout = null
        };
    as.prototype.init = function(e) {
        function t(e) {
            for (var t = e.target; t; t = t.parentNode) {
                if (t == l) return !0;
                if (/\bCodeMirror-(?:line)?widget\b/.test(t.className)) break
            }
            return !1
        }

        function n(e) {
            if (t(e) && !E(o, e)) {
                if (o.somethingSelected()) Qo({
                    lineWise: !1,
                    text: o.getSelections()
                }), "cut" == e.type && o.replaceSelection("", null, "cut");
                else {
                    if (!o.options.lineWiseCopyCut) return;
                    var n = na(o);
                    Qo({
                        lineWise: !0,
                        text: n.text
                    }), "cut" == e.type && o.operation((function() {
                        o.setSelections(n.ranges, 0, Ya), o.replaceSelection("", null, "cut")
                    }))
                }
                if (e.clipboardData) {
                    e.clipboardData.clearData();
                    var r = os.text.join("\n");
                    if (e.clipboardData.setData("Text", r), e.clipboardData.getData("Text") == r) return void e.preventDefault()
                }
                var s = ia(),
                    c = s.firstChild;
                o.display.lineSpace.insertBefore(s, o.display.lineSpace.firstChild), c.value = os.text.join("\n");
                var u = a();
                Ra(c), setTimeout((function() {
                    o.display.lineSpace.removeChild(s), u.focus(), u == l && i.showPrimarySelection()
                }), 50)
            }
        }
        var r = this,
            i = this,
            o = i.cm,
            l = i.div = e.lineDiv;
        l.contentEditable = !0, ra(l, o.options.spellcheck, o.options.autocorrect, o.options.autocapitalize), il(l, "paste", (function(e) {
            !t(e) || E(o, e) || ea(e, o) || Ca <= 11 && setTimeout(yr(o, (function() {
                return r.updateFromDOM()
            })), 20)
        })), il(l, "compositionstart", (function(e) {
            r.composing = {
                data: e.data,
                done: !1
            }
        })), il(l, "compositionupdate", (function(e) {
            r.composing || (r.composing = {
                data: e.data,
                done: !1
            })
        })), il(l, "compositionend", (function(e) {
            r.composing && (e.data != r.composing.data && r.readFromDOMSoon(), r.composing.done = !0)
        })), il(l, "touchstart", (function() {
            return i.forceCompositionEnd()
        })), il(l, "input", (function() {
            r.composing || r.readFromDOMSoon()
        })), il(l, "copy", n), il(l, "cut", n)
    }, as.prototype.screenReaderLabelChanged = function(e) {
        e ? this.div.setAttribute("aria-label", e) : this.div.removeAttribute("aria-label")
    }, as.prototype.prepareSelection = function() {
        var e = Dn(this.cm, !1);
        return e.focus = a() == this.div, e
    }, as.prototype.showSelection = function(e, t) {
        e && this.cm.display.view.length && ((e.focus || t) && this.showPrimarySelection(), this.showMultipleSelections(e))
    }, as.prototype.getSelection = function() {
        return this.cm.display.wrapper.ownerDocument.getSelection()
    }, as.prototype.showPrimarySelection = function() {
        var e = this.getSelection(),
            t = this.cm,
            n = t.doc.sel.primary(),
            r = n.from(),
            i = n.to();
        if (t.display.viewTo == t.display.viewFrom || r.line >= t.display.viewTo || i.line < t.display.viewFrom) e.removeAllRanges();
        else {
            var o = fa(t, e.anchorNode, e.anchorOffset),
                a = fa(t, e.focusNode, e.focusOffset);
            if (!o || o.bad || !a || a.bad || 0 != se(fe(o, a), r) || 0 != se(de(o, a), i)) {
                var l = t.display.view,
                    s = r.line >= t.display.viewFrom && sa(t, r) || {
                        node: l[0].measure.map[2],
                        offset: 0
                    },
                    c = i.line < t.display.viewTo && sa(t, i);
                if (!c) {
                    var u = l[l.length - 1].measure,
                        d = u.maps ? u.maps[u.maps.length - 1] : u.map;
                    c = {
                        node: d[d.length - 1],
                        offset: d[d.length - 2] - d[d.length - 3]
                    }
                }
                if (s && c) {
                    var f, h = e.rangeCount && e.getRangeAt(0);
                    try {
                        f = Ba(s.node, s.offset, c.offset, c.node)
                    } catch (e) {}
                    f && (!ya && t.state.focused ? (e.collapse(s.node, s.offset), f.collapsed || (e.removeAllRanges(), e.addRange(f))) : (e.removeAllRanges(), e.addRange(f)), h && null == e.anchorNode ? e.addRange(h) : ya && this.startGracePeriod()), this.rememberSelection()
                } else e.removeAllRanges()
            }
        }
    }, as.prototype.startGracePeriod = function() {
        var e = this;
        clearTimeout(this.gracePeriod), this.gracePeriod = setTimeout((function() {
            e.gracePeriod = !1, e.selectionChanged() && e.cm.operation((function() {
                return e.cm.curOp.selectionChanged = !0
            }))
        }), 20)
    }, as.prototype.showMultipleSelections = function(e) {
        n(this.cm.display.cursorDiv, e.cursors), n(this.cm.display.selectionDiv, e.selection)
    }, as.prototype.rememberSelection = function() {
        var e = this.getSelection();
        this.lastAnchorNode = e.anchorNode, this.lastAnchorOffset = e.anchorOffset, this.lastFocusNode = e.focusNode, this.lastFocusOffset = e.focusOffset
    }, as.prototype.selectionInEditor = function() {
        var e = this.getSelection();
        if (!e.rangeCount) return !1;
        var t = e.getRangeAt(0).commonAncestorContainer;
        return o(this.div, t)
    }, as.prototype.focus = function() {
        "nocursor" != this.cm.options.readOnly && (this.selectionInEditor() && a() == this.div || this.showSelection(this.prepareSelection(), !0), this.div.focus())
    }, as.prototype.blur = function() {
        this.div.blur()
    }, as.prototype.getField = function() {
        return this.div
    }, as.prototype.supportsTouch = function() {
        return !0
    }, as.prototype.receivedFocus = function() {
        function e() {
            n.cm.state.focused && (n.pollSelection(), n.polling.set(n.cm.options.pollInterval, e))
        }
        var t = this,
            n = this;
        this.selectionInEditor() ? setTimeout((function() {
            return t.pollSelection()
        }), 20) : vr(this.cm, (function() {
            return n.cm.curOp.selectionChanged = !0
        })), this.polling.set(this.cm.options.pollInterval, e)
    }, as.prototype.selectionChanged = function() {
        var e = this.getSelection();
        return e.anchorNode != this.lastAnchorNode || e.anchorOffset != this.lastAnchorOffset || e.focusNode != this.lastFocusNode || e.focusOffset != this.lastFocusOffset
    }, as.prototype.pollSelection = function() {
        if (null == this.readDOMTimeout && !this.gracePeriod && this.selectionChanged()) {
            var e = this.getSelection(),
                t = this.cm;
            if (Ea && Ta && this.cm.display.gutterSpecs.length && ca(e.anchorNode)) return this.cm.triggerOnKeyDown({
                type: "keydown",
                keyCode: 8,
                preventDefault: Math.abs
            }), this.blur(), void this.focus();
            if (!this.composing) {
                this.rememberSelection();
                var n = fa(t, e.anchorNode, e.anchorOffset),
                    r = fa(t, e.focusNode, e.focusOffset);
                n && r && vr(t, (function() {
                    wi(t.doc, Rr(n, r), Ya), (n.bad || r.bad) && (t.curOp.selectionChanged = !0)
                }))
            }
        }
    }, as.prototype.pollContent = function() {
        null != this.readDOMTimeout && (clearTimeout(this.readDOMTimeout), this.readDOMTimeout = null);
        var e, t, n, r = this.cm,
            i = r.display,
            o = r.doc.sel.primary(),
            a = o.from(),
            l = o.to();
        if (0 == a.ch && a.line > r.firstLine() && (a = le(a.line - 1, J(r.doc, a.line - 1).length)), l.ch == J(r.doc, l.line).text.length && l.line < r.lastLine() && (l = le(l.line + 1, 0)), a.line < i.viewFrom || l.line > i.viewTo - 1) return !1;
        a.line == i.viewFrom || 0 == (e = Tn(r, a.line)) ? (t = re(i.view[0].line), n = i.view[0].node) : (t = re(i.view[e].line), n = i.view[e - 1].node.nextSibling);
        var s, c, u = Tn(r, l.line);
        if (u == i.view.length - 1 ? (s = i.viewTo - 1, c = i.lineDiv.lastChild) : (s = re(i.view[u + 1].line) - 1, c = i.view[u + 1].node.previousSibling), !n) return !1;
        for (var d = r.doc.splitLines(da(r, n, c, t, s)), f = ee(r.doc, le(t, 0), le(s, J(r.doc, s).text.length)); d.length > 1 && f.length > 1;)
            if (m(d) == m(f)) d.pop(), f.pop(), s--;
            else {
                if (d[0] != f[0]) break;
                d.shift(), f.shift(), t++
            }
        for (var h = 0, p = 0, g = d[0], v = f[0], y = Math.min(g.length, v.length); h < y && g.charCodeAt(h) == v.charCodeAt(h);) ++h;
        for (var b = m(d), k = m(f), x = Math.min(b.length - (1 == d.length ? h : 0), k.length - (1 == f.length ? h : 0)); p < x && b.charCodeAt(b.length - p - 1) == k.charCodeAt(k.length - p - 1);) ++p;
        if (1 == d.length && 1 == f.length && t == a.line)
            for (; h && h > a.ch && b.charCodeAt(b.length - p - 1) == k.charCodeAt(k.length - p - 1);) h--, p++;
        d[d.length - 1] = b.slice(0, b.length - p).replace(/^\u200b+/, ""), d[0] = d[0].slice(h).replace(/\u200b+$/, "");
        var w = le(t, h),
            C = le(s, f.length ? m(f).length - p : 0);
        return d.length > 1 || d[0] || se(w, C) ? (Bi(r.doc, d, w, C, "+input"), !0) : void 0
    }, as.prototype.ensurePolled = function() {
        this.forceCompositionEnd()
    }, as.prototype.reset = function() {
        this.forceCompositionEnd()
    }, as.prototype.forceCompositionEnd = function() {
        this.composing && (clearTimeout(this.readDOMTimeout), this.composing = null, this.updateFromDOM(), this.div.blur(), this.div.focus())
    }, as.prototype.readFromDOMSoon = function() {
        var e = this;
        null == this.readDOMTimeout && (this.readDOMTimeout = setTimeout((function() {
            if (e.readDOMTimeout = null, e.composing) {
                if (!e.composing.done) return;
                e.composing = null
            }
            e.updateFromDOM()
        }), 80))
    }, as.prototype.updateFromDOM = function() {
        var e = this;
        !this.cm.isReadOnly() && this.pollContent() || vr(this.cm, (function() {
            return Mn(e.cm)
        }))
    }, as.prototype.setUneditable = function(e) {
        e.contentEditable = "false"
    }, as.prototype.onKeyPress = function(e) {
        0 == e.charCode || this.composing || (e.preventDefault(), this.cm.isReadOnly() || yr(this.cm, Jo)(this.cm, String.fromCharCode(null == e.charCode ? e.keyCode : e.charCode), 0))
    }, as.prototype.readOnlyChanged = function(e) {
        this.div.contentEditable = String("nocursor" != e)
    }, as.prototype.onContextMenu = function() {}, as.prototype.resetPosition = function() {}, as.prototype.needsContentAttribute = !0;
    var ls = function(e) {
        this.cm = e, this.prevInput = "", this.pollingFast = !1, this.polling = new qa, this.hasSelection = !1, this.composing = null
    };
    ls.prototype.init = function(e) {
        function t(e) {
            if (!E(i, e)) {
                if (i.somethingSelected()) Qo({
                    lineWise: !1,
                    text: i.getSelections()
                });
                else {
                    if (!i.options.lineWiseCopyCut) return;
                    var t = na(i);
                    Qo({
                        lineWise: !0,
                        text: t.text
                    }), "cut" == e.type ? i.setSelections(t.ranges, null, Ya) : (r.prevInput = "", o.value = t.text.join("\n"), Ra(o))
                }
                "cut" == e.type && (i.state.cutIncoming = +new Date)
            }
        }
        var n = this,
            r = this,
            i = this.cm;
        this.createField(e);
        var o = this.textarea;
        e.wrapper.insertBefore(this.wrapper, e.wrapper.firstChild), Fa && (o.style.width = "0px"), il(o, "input", (function() {
            wa && Ca >= 9 && n.hasSelection && (n.hasSelection = null), r.poll()
        })), il(o, "paste", (function(e) {
            E(i, e) || ea(e, i) || (i.state.pasteIncoming = +new Date, r.fastPoll())
        })), il(o, "cut", t), il(o, "copy", t), il(e.scroller, "paste", (function(t) {
            if (!Pt(e, t) && !E(i, t)) {
                if (!o.dispatchEvent) return i.state.pasteIncoming = +new Date, void r.focus();
                var n = new Event("paste");
                n.clipboardData = t.clipboardData, o.dispatchEvent(n)
            }
        })), il(e.lineSpace, "selectstart", (function(t) {
            Pt(e, t) || I(t)
        })), il(o, "compositionstart", (function() {
            var e = i.getCursor("from");
            r.composing && r.composing.range.clear(), r.composing = {
                start: e,
                range: i.markText(e, i.getCursor("to"), {
                    className: "CodeMirror-composing"
                })
            }
        })), il(o, "compositionend", (function() {
            r.composing && (r.poll(), r.composing.range.clear(), r.composing = null)
        }))
    }, ls.prototype.createField = function() {
        this.wrapper = ia(), this.textarea = this.wrapper.firstChild
    }, ls.prototype.screenReaderLabelChanged = function(e) {
        e ? this.textarea.setAttribute("aria-label", e) : this.textarea.removeAttribute("aria-label")
    }, ls.prototype.prepareSelection = function() {
        var e = this.cm,
            t = e.display,
            n = e.doc,
            r = Dn(e);
        if (e.options.moveInputWithCursor) {
            var i = cn(e, n.sel.primary().head, "div"),
                o = t.wrapper.getBoundingClientRect(),
                a = t.lineDiv.getBoundingClientRect();
            r.teTop = Math.max(0, Math.min(t.wrapper.clientHeight - 10, i.top + a.top - o.top)), r.teLeft = Math.max(0, Math.min(t.wrapper.clientWidth - 10, i.left + a.left - o.left))
        }
        return r
    }, ls.prototype.showSelection = function(e) {
        var t = this.cm.display;
        n(t.cursorDiv, e.cursors), n(t.selectionDiv, e.selection), null != e.teTop && (this.wrapper.style.top = e.teTop + "px", this.wrapper.style.left = e.teLeft + "px")
    }, ls.prototype.reset = function(e) {
        if (!this.contextMenuPending && !this.composing) {
            var t = this.cm;
            if (t.somethingSelected()) {
                this.prevInput = "";
                var n = t.getSelection();
                this.textarea.value = n, t.state.focused && Ra(this.textarea), wa && Ca >= 9 && (this.hasSelection = n)
            } else e || (this.prevInput = this.textarea.value = "", wa && Ca >= 9 && (this.hasSelection = null))
        }
    }, ls.prototype.getField = function() {
        return this.textarea
    }, ls.prototype.supportsTouch = function() {
        return !1
    }, ls.prototype.focus = function() {
        if ("nocursor" != this.cm.options.readOnly && (!Na || a() != this.textarea)) try {
            this.textarea.focus()
        } catch (e) {}
    }, ls.prototype.blur = function() {
        this.textarea.blur()
    }, ls.prototype.resetPosition = function() {
        this.wrapper.style.top = this.wrapper.style.left = 0
    }, ls.prototype.receivedFocus = function() {
        this.slowPoll()
    }, ls.prototype.slowPoll = function() {
        var e = this;
        this.pollingFast || this.polling.set(this.cm.options.pollInterval, (function() {
            e.poll(), e.cm.state.focused && e.slowPoll()
        }))
    }, ls.prototype.fastPoll = function() {
        function e() {
            n.poll() || t ? (n.pollingFast = !1, n.slowPoll()) : (t = !0, n.polling.set(60, e))
        }
        var t = !1,
            n = this;
        n.pollingFast = !0, n.polling.set(20, e)
    }, ls.prototype.poll = function() {
        var e = this,
            t = this.cm,
            n = this.textarea,
            r = this.prevInput;
        if (this.contextMenuPending || !t.state.focused || ll(n) && !r && !this.composing || t.isReadOnly() || t.options.disableInput || t.state.keySeq) return !1;
        var i = n.value;
        if (i == r && !t.somethingSelected()) return !1;
        if (wa && Ca >= 9 && this.hasSelection === i || Da && /[\uf700-\uf7ff]/.test(i)) return t.display.input.reset(), !1;
        if (t.doc.sel == t.display.selForContextMenu) {
            var o = i.charCodeAt(0);
            if (8203 != o || r || (r = "\u200b"), 8666 == o) return this.reset(), this.cm.execCommand("undo")
        }
        for (var a = 0, l = Math.min(r.length, i.length); a < l && r.charCodeAt(a) == i.charCodeAt(a);) ++a;
        return vr(t, (function() {
            Jo(t, i.slice(a), r.length - a, null, e.composing ? "*compose" : null), i.length > 1e3 || i.indexOf("\n") > -1 ? n.value = e.prevInput = "" : e.prevInput = i, e.composing && (e.composing.range.clear(), e.composing.range = t.markText(e.composing.start, t.getCursor("to"), {
                className: "CodeMirror-composing"
            }))
        })), !0
    }, ls.prototype.ensurePolled = function() {
        this.pollingFast && this.poll() && (this.pollingFast = !1)
    }, ls.prototype.onKeyPress = function() {
        wa && Ca >= 9 && (this.hasSelection = null), this.fastPoll()
    }, ls.prototype.onContextMenu = function(e) {
        function t() {
            if (null != a.selectionStart) {
                var e = i.somethingSelected(),
                    t = "\u200b" + (e ? a.value : "");
                a.value = "\u21da", a.value = t, r.prevInput = e ? "" : "\u200b", a.selectionStart = 1, a.selectionEnd = t.length, o.selForContextMenu = i.doc.sel
            }
        }

        function n() {
            if (r.contextMenuPending == n && (r.contextMenuPending = !1, r.wrapper.style.cssText = d, a.style.cssText = u, wa && Ca < 9 && o.scrollbars.setScrollTop(o.scroller.scrollTop = s), null != a.selectionStart)) {
                (!wa || wa && Ca < 9) && t();
                var e = 0,
                    l = function() {
                        o.selForContextMenu == i.doc.sel && 0 == a.selectionStart && a.selectionEnd > 0 && "\u200b" == r.prevInput ? yr(i, Oi)(i) : e++ < 10 ? o.detectingSelectAll = setTimeout(l, 500) : (o.selForContextMenu = null, o.input.reset())
                    };
                o.detectingSelectAll = setTimeout(l, 200)
            }
        }
        var r = this,
            i = r.cm,
            o = i.display,
            a = r.textarea;
        r.contextMenuPending && r.contextMenuPending();
        var l = Ln(i, e),
            s = o.scroller.scrollTop;
        if (l && !Ma) {
            i.options.resetSelectionOnContextMenu && -1 == i.doc.sel.contains(l) && yr(i, wi)(i.doc, Rr(l), Ya);
            var c, u = a.style.cssText,
                d = r.wrapper.style.cssText,
                f = r.wrapper.offsetParent.getBoundingClientRect();
            if (r.wrapper.style.cssText = "position: static", a.style.cssText = "position: absolute; width: 30px; height: 30px;\n      top: " + (e.clientY - f.top - 5) + "px; left: " + (e.clientX - f.left - 5) + "px;\n      z-index: 1000; background: " + (wa ? "rgba(255, 255, 255, .05)" : "transparent") + ";\n      outline: none; border-width: 0; outline: none; overflow: hidden; opacity: .05; filter: alpha(opacity=5);", Sa && (c = window.scrollY), o.input.focus(), Sa && window.scrollTo(null, c), o.input.reset(), i.somethingSelected() || (a.value = r.prevInput = " "), r.contextMenuPending = n, o.selForContextMenu = i.doc.sel, clearTimeout(o.detectingSelectAll), wa && Ca >= 9 && t(), Ha) {
                W(e);
                var h = function() {
                    O(window, "mouseup", h), setTimeout(n, 20)
                };
                il(window, "mouseup", h)
            } else setTimeout(n, 50)
        }
    }, ls.prototype.readOnlyChanged = function(e) {
        e || this.reset(), this.textarea.disabled = "nocursor" == e, this.textarea.readOnly = !!e
    }, ls.prototype.setUneditable = function() {}, ls.prototype.needsContentAttribute = !1, Ko(Yo), oa(Yo);
    var ss = "iter insert remove copy getEditor constructor".split(" ");
    for (var cs in Hl.prototype) Hl.prototype.hasOwnProperty(cs) && f(ss, cs) < 0 && (Yo.prototype[cs] = function(e) {
        return function() {
            return e.apply(this.doc, arguments)
        }
    }(Hl.prototype[cs]));
    return P(Hl), Yo.inputStyles = {
        textarea: ls,
        contenteditable: as
    }, Yo.defineMode = function(e) {
        Yo.defaults.mode || "null" == e || (Yo.defaults.mode = e), $.apply(this, arguments)
    }, Yo.defineMIME = K, Yo.defineMode("null", (function() {
        return {
            token: function(e) {
                return e.skipToEnd()
            }
        }
    })), Yo.defineMIME("text/plain", "null"), Yo.defineExtension = function(e, t) {
        Yo.prototype[e] = t
    }, Yo.defineDocExtension = function(e, t) {
        Hl.prototype[e] = t
    }, Yo.fromTextArea = pa, ma(Yo), Yo.version = "5.65.2", Yo
})),
function(e) {
    "object" == typeof exports && "object" == typeof module ? e(require("../../lib/codemirror")) : "function" == typeof define && define.amd ? define(["../../lib/codemirror"], e) : e(CodeMirror)
}((function(e) {
    "use strict";

    function t(e) {
        var t = e.search(r);
        return -1 == t ? 0 : t
    }
    var n = {},
        r = /[^\s\u00a0]/,
        i = e.Pos;
    e.commands.toggleComment = function(e) {
        e.toggleComment()
    }, e.defineExtension("toggleComment", (function(e) {
        e || (e = n);
        for (var t = this, r = 1 / 0, o = this.listSelections(), a = null, l = o.length - 1; l >= 0; l--) {
            var s = o[l].from(),
                c = o[l].to();
            s.line >= r || (c.line >= r && (c = i(r, 0)), r = s.line, null == a ? t.uncomment(s, c, e) ? a = "un" : (t.lineComment(s, c, e), a = "line") : "un" == a ? t.uncomment(s, c, e) : t.lineComment(s, c, e))
        }
    })), e.defineExtension("toggleBlockComment", (function(e) {
        e || (e = n);
        for (var t = this, r = 1 / 0, o = this.listSelections(), a = null, l = o.length - 1; l >= 0; l--) {
            var s = o[l].from(),
                c = o[l].to();
            s.line >= r || (c.line >= r && (c = i(r, 0)), r = s.line, null == a ? t.uncomment(s, c, e) ? a = "un" : (t.blockComment(s, c, e), a = "block") : "un" == a ? t.uncomment(s, c, e) : t.blockComment(s, c, e))
        }
    })), e.defineExtension("lineComment", (function(e, o, a) {
        a || (a = n);
        var l = this,
            s = l.getModeAt(e),
            c = a.lineComment || s.lineComment;
        if (c) {
            if (null != l.getLine(e.line)) {
                var u = Math.min(0 != o.ch || o.line == e.line ? o.line + 1 : o.line, l.lastLine() + 1),
                    d = null == a.padding ? " " : a.padding,
                    f = a.commentBlankLines || e.line == o.line;
                l.operation((function() {
                    if (a.indent) {
                        for (var n = null, o = e.line; o < u; ++o) {
                            var s = (h = l.getLine(o)).slice(0, t(h));
                            (null == n || n.length > s.length) && (n = s)
                        }
                        for (o = e.line; o < u; ++o) {
                            var h = l.getLine(o),
                                p = n.length;
                            (f || r.test(h)) && (h.slice(0, p) != n && (p = t(h)), l.replaceRange(n + c + d, i(o, 0), i(o, p)))
                        }
                    } else
                        for (o = e.line; o < u; ++o)(f || r.test(l.getLine(o))) && l.replaceRange(c + d, i(o, 0))
                }))
            }
        } else(a.blockCommentStart || s.blockCommentStart) && (a.fullLines = !0, l.blockComment(e, o, a))
    })), e.defineExtension("blockComment", (function(e, t, o) {
        o || (o = n);
        var a = this,
            l = a.getModeAt(e),
            s = o.blockCommentStart || l.blockCommentStart,
            c = o.blockCommentEnd || l.blockCommentEnd,
            u = o.blockCommentIndent || !1,
            d = u && a.getLine(e.line).match(/[^ ]/);
        if (u && a.indentSelection("add"), d && a.indentLine(e.line, "subtract"), s && c) {
            var f = null == o.padding ? " " : o.padding,
                h = Math.min(t.line, a.lastLine());
            h != e.line && 0 == t.ch && r.test(a.getLine(h)) && --h, e.line > h || a.operation((function() {
                if (0 != o.fullLines) {
                    var n = r.test(a.getLine(h));
                    " " !== c && a.replaceRange(f + c, i(h)), a.replaceRange(s + f, i(e.line, 0));
                    var u = o.blockCommentLead || l.blockCommentLead;
                    if (null != u)
                        for (var d = e.line + 1; d <= h; ++d)(d != h || n) && a.replaceRange(u + f, i(d, 0))
                } else a.replaceRange(f + c, t), a.replaceRange(s + f, e)
            }))
        } else(o.lineComment || l.lineComment) && 0 != o.fullLines && a.lineComment(e, t, o)
    })), e.defineExtension("uncomment", (function(e, t, o) {
        function a() {
            y && s.indentSelection("subtract")
        }
        o || (o = n);
        var l, s = this,
            c = s.getModeAt(e),
            u = Math.min(0 != t.ch || t.line == e.line ? t.line : t.line - 1, s.lastLine()),
            d = Math.min(e.line, u),
            f = o.blockCommentIndent || !1,
            h = f && e.line !== t.line,
            p = o.lineComment || c.lineComment,
            m = [],
            g = o.blockCommentStart,
            v = null == o.padding ? " " : o.padding,
            y = !1;
        e: if (p) {
            for (var b = d; b <= u; ++b) {
                var k = s.getLine(b),
                    x = f ? k.indexOf(g) : -1;
                if (x > -1 && (y = !0), -1 == x && (x = k.indexOf(p)), x > -1 && !/comment/.test(s.getTokenTypeAt(i(b, x + 1))) && (x = -1), -1 == x && (b != u || b == d) && r.test(k)) break e;
                if (x > -1 && r.test(k.slice(0, x))) break e;
                m.push(k)
            }
            if (s.operation((function() {
                    for (var e = d; e <= u; ++e) {
                        var t = y ? g : p,
                            n = m[e - d],
                            r = n.indexOf(t),
                            o = r + t.length;
                        r < 0 || (n.slice(o, o + v.length) == v && (o += v.length), l = !0, s.replaceRange("", i(e, r), i(e, o)))
                    }
                })), a(), l) return !0
        }
        var w = o.blockCommentStart || c.blockCommentStart,
            C = o.blockCommentEnd || c.blockCommentEnd,
            S = w && " " === C;
        if (!w || !C) return !1;
        var L = o.blockCommentLead || c.blockCommentLead,
            T = s.getLine(d),
            M = u == d ? T : s.getLine(u),
            A = T.indexOf(w),
            z = h ? M.length : M.lastIndexOf(C);
        if (-1 == z && d != u && (M = s.getLine(--u), z = M.lastIndexOf(C)), a(), -1 == A || !S && -1 == z || !/comment/.test(s.getTokenTypeAt(i(d, A + 1))) || !S && !/comment/.test(s.getTokenTypeAt(i(u, z + 1)))) return !1;
        var O = T.lastIndexOf(w, e.ch),
            F = -1 == O ? -1 : T.slice(0, e.ch).indexOf(C, O + w.length);
        if (-1 != O && -1 != F && F + C.length != e.ch) return !1;
        F = M.indexOf(C, t.ch);
        var E = M.slice(t.ch).lastIndexOf(w, F - t.ch);
        return O = -1 == F || -1 == E ? -1 : t.ch + E, (-1 == F || -1 == O || O == t.ch) && (s.operation((function() {
            var e = h ? 0 : C.length;
            s.replaceRange("", i(u, z - (v && M.slice(z - v.length, z) == v ? v.length : 0)), i(u, z + e));
            var t = A + w.length;
            if (v && T.slice(t, t + v.length) == v && (t += v.length), s.replaceRange("", i(d, A), i(d, t)), L)
                for (var n = d + 1; n <= u; ++n) {
                    var o = s.getLine(n),
                        a = o.indexOf(L);
                    if (-1 != a && !r.test(o.slice(0, a))) {
                        var l = a + L.length;
                        v && o.slice(l, l + v.length) == v && (l += v.length), s.replaceRange("", i(n, a), i(n, l))
                    }
                }
        })), !0)
    }))
})),
function(e) {
    "object" == typeof exports && "object" == typeof module ? e(require("../../lib/codemirror")) : "function" == typeof define && define.amd ? define(["../../lib/codemirror"], e) : e(CodeMirror)
}((function(e) {
    function t(t, n, r) {
        var i, o = t.getWrapperElement();
        return (i = o.appendChild(document.createElement("div"))).className = r ? "CodeMirror-dialog CodeMirror-dialog-bottom" : "CodeMirror-dialog CodeMirror-dialog-top", "string" == typeof n ? i.innerHTML = n : i.appendChild(n), e.addClass(o, "dialog-opened"), i
    }

    function n(e, t) {
        e.state.currentNotificationClose && e.state.currentNotificationClose(), e.state.currentNotificationClose = t
    }
    e.defineExtension("openDialog", (function(r, i, o) {
        function a(t) {
            if ("string" == typeof t) d.value = t;
            else {
                if (c) return;
                c = !0, e.rmClass(s.parentNode, "dialog-opened"), s.parentNode.removeChild(s), u.focus(), o.onClose && o.onClose(s)
            }
        }
        o || (o = {}), n(this, null);
        var l, s = t(this, r, o.bottom),
            c = !1,
            u = this,
            d = s.getElementsByTagName("input")[0];
        return d ? (d.focus(), o.value && (d.value = o.value, !1 !== o.selectValueOnOpen && d.select()), o.onInput && e.on(d, "input", (function(e) {
            o.onInput(e, d.value, a)
        })), o.onKeyUp && e.on(d, "keyup", (function(e) {
            o.onKeyUp(e, d.value, a)
        })), e.on(d, "keydown", (function(t) {
            o && o.onKeyDown && o.onKeyDown(t, d.value, a) || ((27 == t.keyCode || !1 !== o.closeOnEnter && 13 == t.keyCode) && (d.blur(), e.e_stop(t), a()), 13 == t.keyCode && i(d.value, t))
        })), !1 !== o.closeOnBlur && e.on(s, "focusout", (function(e) {
            null !== e.relatedTarget && a()
        }))) : (l = s.getElementsByTagName("button")[0]) && (e.on(l, "click", (function() {
            a(), u.focus()
        })), !1 !== o.closeOnBlur && e.on(l, "blur", a), l.focus()), a
    })), e.defineExtension("openConfirm", (function(r, i, o) {
        function a() {
            c || (c = !0, e.rmClass(l.parentNode, "dialog-opened"), l.parentNode.removeChild(l), u.focus())
        }
        n(this, null);
        var l = t(this, r, o && o.bottom),
            s = l.getElementsByTagName("button"),
            c = !1,
            u = this,
            d = 1;
        s[0].focus();
        for (var f = 0; f < s.length; ++f) {
            var h = s[f];
            ! function(t) {
                e.on(h, "click", (function(n) {
                    e.e_preventDefault(n), a(), t && t(u)
                }))
            }(i[f]), e.on(h, "blur", (function() {
                --d, setTimeout((function() {
                    d <= 0 && a()
                }), 200)
            })), e.on(h, "focus", (function() {
                ++d
            }))
        }
    })), e.defineExtension("openNotification", (function(r, i) {
        function o() {
            s || (s = !0, clearTimeout(a), e.rmClass(l.parentNode, "dialog-opened"), l.parentNode.removeChild(l))
        }
        n(this, o);
        var a, l = t(this, r, i && i.bottom),
            s = !1,
            c = i && void 0 !== i.duration ? i.duration : 5e3;
        return e.on(l, "click", (function(t) {
            e.e_preventDefault(t), o()
        })), c && (a = setTimeout(o, c)), o
    }))
})),
function(e) {
    "object" == typeof exports && "object" == typeof module ? e(require("../../lib/codemirror")) : "function" == typeof define && define.amd ? define(["../../lib/codemirror"], e) : e(CodeMirror)
}((function(e) {
    function t(e, t) {
        return "pairs" == t && "string" == typeof e ? e : "object" == typeof e && null != e[t] ? e[t] : f[t]
    }

    function n(e) {
        for (var t = 0; t < e.length; t++) {
            var n = e.charAt(t),
                i = "'" + n + "'";
            p[i] || (p[i] = r(n))
        }
    }

    function r(e) {
        return function(t) {
            return c(t, e)
        }
    }

    function i(e) {
        var t = e.state.closeBrackets;
        return !t || t.override ? t : e.getModeAt(e.getCursor()).closeBrackets || t
    }

    function o(n) {
        var r = i(n);
        if (!r || n.getOption("disableInput")) return e.Pass;
        for (var o = t(r, "pairs"), a = n.listSelections(), l = 0; l < a.length; l++) {
            if (!a[l].empty()) return e.Pass;
            var s = u(n, a[l].head);
            if (!s || o.indexOf(s) % 2 != 0) return e.Pass
        }
        for (l = a.length - 1; l >= 0; l--) {
            var c = a[l].head;
            n.replaceRange("", h(c.line, c.ch - 1), h(c.line, c.ch + 1), "+delete")
        }
    }

    function a(n) {
        var r = i(n),
            o = r && t(r, "explode");
        if (!o || n.getOption("disableInput")) return e.Pass;
        for (var a = n.listSelections(), s = 0; s < a.length; s++) {
            if (!a[s].empty()) return e.Pass;
            var c = u(n, a[s].head);
            if (!c || o.indexOf(c) % 2 != 0) return e.Pass
        }
        n.operation((function() {
            var e = n.lineSeparator() || "\n";
            n.replaceSelection(e + e, null), l(n, -1), a = n.listSelections();
            for (var t = 0; t < a.length; t++) {
                var r = a[t].head.line;
                n.indentLine(r, null, !0), n.indentLine(r + 1, null, !0)
            }
        }))
    }

    function l(e, t) {
        for (var n = [], r = e.listSelections(), i = 0, o = 0; o < r.length; o++) {
            var a = r[o];
            a.head == e.getCursor() && (i = o);
            var l = a.head.ch || t > 0 ? {
                line: a.head.line,
                ch: a.head.ch + t
            } : {
                line: a.head.line - 1
            };
            n.push({
                anchor: l,
                head: l
            })
        }
        e.setSelections(n, i)
    }

    function s(t) {
        var n = e.cmpPos(t.anchor, t.head) > 0;
        return {
            anchor: new h(t.anchor.line, t.anchor.ch + (n ? -1 : 1)),
            head: new h(t.head.line, t.head.ch + (n ? 1 : -1))
        }
    }

    function c(n, r) {
        var o = i(n);
        if (!o || n.getOption("disableInput")) return e.Pass;
        var a = t(o, "pairs"),
            c = a.indexOf(r);
        if (-1 == c) return e.Pass;
        for (var u, f = t(o, "closeBefore"), p = t(o, "triples"), m = a.charAt(c + 1) == r, g = n.listSelections(), v = c % 2 == 0, y = 0; y < g.length; y++) {
            var b, k = g[y],
                x = k.head,
                w = n.getRange(x, h(x.line, x.ch + 1));
            if (v && !k.empty()) b = "surround";
            else if (!m && v || w != r)
                if (m && x.ch > 1 && p.indexOf(r) >= 0 && n.getRange(h(x.line, x.ch - 2), x) == r + r) {
                    if (x.ch > 2 && /\bstring/.test(n.getTokenTypeAt(h(x.line, x.ch - 2)))) return e.Pass;
                    b = "addFour"
                } else if (m) {
                var C = 0 == x.ch ? " " : n.getRange(h(x.line, x.ch - 1), x);
                if (e.isWordChar(w) || C == r || e.isWordChar(C)) return e.Pass;
                b = "both"
            } else {
                if (!v || !(0 === w.length || /\s/.test(w) || f.indexOf(w) > -1)) return e.Pass;
                b = "both"
            } else b = m && d(n, x) ? "both" : p.indexOf(r) >= 0 && n.getRange(x, h(x.line, x.ch + 3)) == r + r + r ? "skipThree" : "skip";
            if (u) {
                if (u != b) return e.Pass
            } else u = b
        }
        var S = c % 2 ? a.charAt(c - 1) : r,
            L = c % 2 ? r : a.charAt(c + 1);
        n.operation((function() {
            if ("skip" == u) l(n, 1);
            else if ("skipThree" == u) l(n, 3);
            else if ("surround" == u) {
                for (var e = n.getSelections(), t = 0; t < e.length; t++) e[t] = S + e[t] + L;
                n.replaceSelections(e, "around"), e = n.listSelections().slice();
                for (t = 0; t < e.length; t++) e[t] = s(e[t]);
                n.setSelections(e)
            } else "both" == u ? (n.replaceSelection(S + L, null), n.triggerElectric(S + L), l(n, -1)) : "addFour" == u && (n.replaceSelection(S + S + S + S, "before"), l(n, 1))
        }))
    }

    function u(e, t) {
        var n = e.getRange(h(t.line, t.ch - 1), h(t.line, t.ch + 1));
        return 2 == n.length ? n : null
    }

    function d(e, t) {
        var n = e.getTokenAt(h(t.line, t.ch + 1));
        return /\bstring/.test(n.type) && n.start == t.ch && (0 == t.ch || !/\bstring/.test(e.getTokenTypeAt(t)))
    }
    var f = {
            pairs: "()[]{}''\"\"",
            closeBefore: ")]}'\":;>",
            triples: "",
            explode: "[]{}"
        },
        h = e.Pos;
    e.defineOption("autoCloseBrackets", !1, (function(r, i, o) {
        o && o != e.Init && (r.removeKeyMap(p), r.state.closeBrackets = null), i && (n(t(i, "pairs")), r.state.closeBrackets = i, r.addKeyMap(p))
    }));
    var p = {
        Backspace: o,
        Enter: a
    };
    n(f.pairs + "`")
})),
function(e) {
    "object" == typeof exports && "object" == typeof module ? e(require("../../lib/codemirror"), require("../fold/xml-fold")) : "function" == typeof define && define.amd ? define(["../../lib/codemirror", "../fold/xml-fold"], e) : e(CodeMirror)
}((function(e) {
    function t(t) {
        if (t.getOption("disableInput")) return e.Pass;
        for (var n = t.listSelections(), r = [], s = t.getOption("autoCloseTags"), c = 0; c < n.length; c++) {
            if (!n[c].empty()) return e.Pass;
            var u = n[c].head,
                d = t.getTokenAt(u),
                f = e.innerMode(t.getMode(), d.state),
                h = f.state,
                p = f.mode.xmlCurrentTag && f.mode.xmlCurrentTag(h),
                m = p && p.name;
            if (!m) return e.Pass;
            var g = "html" == f.mode.configuration,
                v = "object" == typeof s && s.dontCloseTags || g && a,
                y = "object" == typeof s && s.indentTags || g && l;
            d.end > u.ch && (m = m.slice(0, m.length - d.end + u.ch));
            var b = m.toLowerCase();
            if (!m || "string" == d.type && (d.end != u.ch || !/[\"\']/.test(d.string.charAt(d.string.length - 1)) || 1 == d.string.length) || "tag" == d.type && p.close || d.string.indexOf("/") == u.ch - d.start - 1 || v && i(v, b) > -1 || o(t, f.mode.xmlCurrentContext && f.mode.xmlCurrentContext(h) || [], m, u, !0)) return e.Pass;
            var k = "object" == typeof s && s.emptyTags;
            if (k && i(k, m) > -1) r[c] = {
                text: "/>",
                newPos: e.Pos(u.line, u.ch + 2)
            };
            else {
                var x = y && i(y, b) > -1;
                r[c] = {
                    indent: x,
                    text: ">" + (x ? "\n\n" : "") + "</" + m + ">",
                    newPos: x ? e.Pos(u.line + 1, 0) : e.Pos(u.line, u.ch + 1)
                }
            }
        }
        var w = "object" == typeof s && s.dontIndentOnAutoClose;
        for (c = n.length - 1; c >= 0; c--) {
            var C = r[c];
            t.replaceRange(C.text, n[c].head, n[c].anchor, "+insert");
            var S = t.listSelections().slice(0);
            S[c] = {
                head: C.newPos,
                anchor: C.newPos
            }, t.setSelections(S), !w && C.indent && (t.indentLine(C.newPos.line, null, !0), t.indentLine(C.newPos.line + 1, null, !0))
        }
    }

    function n(t, n) {
        for (var r = t.listSelections(), i = [], a = n ? "/" : "</", l = t.getOption("autoCloseTags"), s = "object" == typeof l && l.dontIndentOnSlash, c = 0; c < r.length; c++) {
            if (!r[c].empty()) return e.Pass;
            var u = r[c].head,
                d = t.getTokenAt(u),
                f = e.innerMode(t.getMode(), d.state),
                h = f.state;
            if (n && ("string" == d.type || "<" != d.string.charAt(0) || d.start != u.ch - 1)) return e.Pass;
            var p, m = "xml" != f.mode.name && "htmlmixed" == t.getMode().name;
            if (m && "javascript" == f.mode.name) p = a + "script";
            else if (m && "css" == f.mode.name) p = a + "style";
            else {
                var g = f.mode.xmlCurrentContext && f.mode.xmlCurrentContext(h),
                    v = g.length ? g[g.length - 1] : "";
                if (!g || g.length && o(t, g, v, u)) return e.Pass;
                p = a + v
            }
            ">" != t.getLine(u.line).charAt(d.end) && (p += ">"), i[c] = p
        }
        if (t.replaceSelections(i), r = t.listSelections(), !s)
            for (c = 0; c < r.length; c++)(c == r.length - 1 || r[c].head.line < r[c + 1].head.line) && t.indentLine(r[c].head.line)
    }

    function r(t) {
        return t.getOption("disableInput") ? e.Pass : n(t, !0)
    }

    function i(e, t) {
        if (e.indexOf) return e.indexOf(t);
        for (var n = 0, r = e.length; n < r; ++n)
            if (e[n] == t) return n;
        return -1
    }

    function o(t, n, r, i, o) {
        if (!e.scanForClosingTag) return !1;
        var a = Math.min(t.lastLine() + 1, i.line + 500),
            l = e.scanForClosingTag(t, i, null, a);
        if (!l || l.tag != r) return !1;
        for (var s = o ? 1 : 0, c = n.length - 1; c >= 0 && n[c] == r; c--) ++s;
        i = l.to;
        for (c = 1; c < s; c++) {
            var u = e.scanForClosingTag(t, i, null, a);
            if (!u || u.tag != r) return !1;
            i = u.to
        }
        return !0
    }
    e.defineOption("autoCloseTags", !1, (function(n, i, o) {
        if (o != e.Init && o && n.removeKeyMap("autoCloseTags"), i) {
            var a = {
                name: "autoCloseTags"
            };
            "object" == typeof i && !1 === i.whenClosing || (a["'/'"] = function(e) {
                return r(e)
            }), "object" == typeof i && !1 === i.whenOpening || (a["'>'"] = function(e) {
                return t(e)
            }), n.addKeyMap(a)
        }
    }));
    var a = ["area", "base", "br", "col", "command", "embed", "hr", "img", "input", "keygen", "link", "meta", "param", "source", "track", "wbr"],
        l = ["applet", "blockquote", "body", "button", "div", "dl", "fieldset", "form", "frameset", "h1", "h2", "h3", "h4", "h5", "h6", "head", "html", "iframe", "layer", "legend", "object", "ol", "p", "select", "table", "ul"];
    e.commands.closeTag = function(e) {
        return n(e)
    }
})),
function(e) {
    "object" == typeof exports && "object" == typeof module ? e(require("../../lib/codemirror")) : "function" == typeof define && define.amd ? define(["../../lib/codemirror"], e) : e(CodeMirror)
}((function(e) {
    function t(e) {
        return e && e.bracketRegex || /[(){}[\]]/
    }

    function n(e, n, i) {
        var o = e.getLineHandle(n.line),
            a = n.ch - 1,
            l = i && i.afterCursor;
        null == l && (l = /(^| )cm-fat-cursor($| )/.test(e.getWrapperElement().className));
        var u = t(i),
            d = !l && a >= 0 && u.test(o.text.charAt(a)) && c[o.text.charAt(a)] || u.test(o.text.charAt(a + 1)) && c[o.text.charAt(++a)];
        if (!d) return null;
        var f = ">" == d.charAt(1) ? 1 : -1;
        if (i && i.strict && f > 0 != (a == n.ch)) return null;
        var h = e.getTokenTypeAt(s(n.line, a + 1)),
            p = r(e, s(n.line, a + (f > 0 ? 1 : 0)), f, h, i);
        return null == p ? null : {
            from: s(n.line, a),
            to: p && p.pos,
            match: p && p.ch == d.charAt(0),
            forward: f > 0
        }
    }

    function r(e, n, r, i, o) {
        for (var a = o && o.maxScanLineLength || 1e4, l = o && o.maxScanLines || 1e3, u = [], d = t(o), f = r > 0 ? Math.min(n.line + l, e.lastLine() + 1) : Math.max(e.firstLine() - 1, n.line - l), h = n.line; h != f; h += r) {
            var p = e.getLine(h);
            if (p) {
                var m = r > 0 ? 0 : p.length - 1,
                    g = r > 0 ? p.length : -1;
                if (!(p.length > a))
                    for (h == n.line && (m = n.ch - (r < 0 ? 1 : 0)); m != g; m += r) {
                        var v = p.charAt(m);
                        if (d.test(v) && (void 0 === i || (e.getTokenTypeAt(s(h, m + 1)) || "") == (i || ""))) {
                            var y = c[v];
                            if (y && ">" == y.charAt(1) == r > 0) u.push(v);
                            else {
                                if (!u.length) return {
                                    pos: s(h, m),
                                    ch: v
                                };
                                u.pop()
                            }
                        }
                    }
            }
        }
        return h - r != (r > 0 ? e.lastLine() : e.firstLine()) && null
    }

    function i(e, t, r) {
        for (var i = e.state.matchBrackets.maxHighlightLineLength || 1e3, o = r && r.highlightNonMatching, a = [], c = e.listSelections(), u = 0; u < c.length; u++) {
            var d = c[u].empty() && n(e, c[u].head, r);
            if (d && (d.match || !1 !== o) && e.getLine(d.from.line).length <= i) {
                var f = d.match ? "CodeMirror-matchingbracket" : "CodeMirror-nonmatchingbracket";
                a.push(e.markText(d.from, s(d.from.line, d.from.ch + 1), {
                    className: f
                })), d.to && e.getLine(d.to.line).length <= i && a.push(e.markText(d.to, s(d.to.line, d.to.ch + 1), {
                    className: f
                }))
            }
        }
        if (a.length) {
            l && e.state.focused && e.focus();
            var h = function() {
                e.operation((function() {
                    for (var e = 0; e < a.length; e++) a[e].clear()
                }))
            };
            if (!t) return h;
            setTimeout(h, 800)
        }
    }

    function o(e) {
        e.operation((function() {
            e.state.matchBrackets.currentlyHighlighted && (e.state.matchBrackets.currentlyHighlighted(), e.state.matchBrackets.currentlyHighlighted = null), e.state.matchBrackets.currentlyHighlighted = i(e, !1, e.state.matchBrackets)
        }))
    }

    function a(e) {
        e.state.matchBrackets && e.state.matchBrackets.currentlyHighlighted && (e.state.matchBrackets.currentlyHighlighted(), e.state.matchBrackets.currentlyHighlighted = null)
    }
    var l = /MSIE \d/.test(navigator.userAgent) && (null == document.documentMode || document.documentMode < 8),
        s = e.Pos,
        c = {
            "(": ")>",
            ")": "(<",
            "[": "]>",
            "]": "[<",
            "{": "}>",
            "}": "{<",
            "<": ">>",
            ">": "<<"
        };
    e.defineOption("matchBrackets", !1, (function(t, n, r) {
        r && r != e.Init && (t.off("cursorActivity", o), t.off("focus", o), t.off("blur", a), a(t)), n && (t.state.matchBrackets = "object" == typeof n ? n : {}, t.on("cursorActivity", o), t.on("focus", o), t.on("blur", a))
    })), e.defineExtension("matchBrackets", (function() {
        i(this, !0)
    })), e.defineExtension("findMatchingBracket", (function(e, t, r) {
        return (r || "boolean" == typeof t) && (r ? (r.strict = t, t = r) : t = t ? {
            strict: !0
        } : null), n(this, e, t)
    })), e.defineExtension("scanForBracket", (function(e, t, n, i) {
        return r(this, e, t, n, i)
    }))
})),
function(e) {
    "object" == typeof exports && "object" == typeof module ? e(require("../../lib/codemirror"), require("../fold/xml-fold")) : "function" == typeof define && define.amd ? define(["../../lib/codemirror", "../fold/xml-fold"], e) : e(CodeMirror)
}((function(e) {
    "use strict";

    function t(e) {
        e.state.tagHit && e.state.tagHit.clear(), e.state.tagOther && e.state.tagOther.clear(), e.state.tagHit = e.state.tagOther = null
    }

    function n(n) {
        n.state.failedTagMatch = !1, n.operation((function() {
            if (t(n), !n.somethingSelected()) {
                var r = n.getCursor(),
                    i = n.getViewport();
                i.from = Math.min(i.from, r.line), i.to = Math.max(r.line + 1, i.to);
                var o = e.findMatchingTag(n, r, i);
                if (o) {
                    if (n.state.matchBothTags) {
                        var a = "open" == o.at ? o.open : o.close;
                        a && (n.state.tagHit = n.markText(a.from, a.to, {
                            className: "CodeMirror-matchingtag"
                        }))
                    }
                    var l = "close" == o.at ? o.open : o.close;
                    l ? n.state.tagOther = n.markText(l.from, l.to, {
                        className: "CodeMirror-matchingtag"
                    }) : n.state.failedTagMatch = !0
                }
            }
        }))
    }

    function r(e) {
        e.state.failedTagMatch && n(e)
    }
    e.defineOption("matchTags", !1, (function(i, o, a) {
        a && a != e.Init && (i.off("cursorActivity", n), i.off("viewportChange", r), t(i)), o && (i.state.matchBothTags = "object" == typeof o && o.bothTags, i.on("cursorActivity", n), i.on("viewportChange", r), n(i))
    })), e.commands.toMatchingTag = function(t) {
        var n = e.findMatchingTag(t, t.getCursor());
        if (n) {
            var r = "close" == n.at ? n.open : n.close;
            r && t.extendSelection(r.to, r.from)
        }
    }
})),
function(e) {
    "object" == typeof exports && "object" == typeof module ? e(require("../../lib/codemirror")) : "function" == typeof define && define.amd ? define(["../../lib/codemirror"], e) : e(CodeMirror)
}((function(e) {
    "use strict";
    e.commands.tabAndIndentMarkdownList = function(e) {
        var t = e.listSelections()[0].head;
        if (!1 !== e.getStateAfter(t.line).list) e.execCommand("indentMore");
        else if (e.options.indentWithTabs) e.execCommand("insertTab");
        else {
            var n = Array(e.options.tabSize + 1).join(" ");
            e.replaceSelection(n)
        }
    }, e.commands.shiftTabAndUnindentMarkdownList = function(e) {
        var t = e.listSelections()[0].head;
        if (!1 !== e.getStateAfter(t.line).list) e.execCommand("indentLess");
        else if (e.options.indentWithTabs) e.execCommand("insertTab");
        else {
            var n = Array(e.options.tabSize + 1).join(" ");
            e.replaceSelection(n)
        }
    }
})),
function(e) {
    "object" == typeof exports && "object" == typeof module ? e(require("../../lib/codemirror")) : "function" == typeof define && define.amd ? define(["../../lib/codemirror"], e) : e(CodeMirror)
}((function(e) {
    "use strict";

    function t(t) {
        return function(n, r) {
            function i(t) {
                for (var i, o = r.ch, s = 0;;) {
                    var c = o <= 0 ? -1 : l.lastIndexOf(t[0], o - 1);
                    if (-1 != c) {
                        if (1 == s && c < r.ch) break;
                        if (i = n.getTokenTypeAt(e.Pos(a, c + 1)), !/^(comment|string)/.test(i)) return {
                            ch: c + 1,
                            tokenType: i,
                            pair: t
                        };
                        o = c - 1
                    } else {
                        if (1 == s) break;
                        s = 1, o = l.length
                    }
                }
            }

            function o(t) {
                var r, i, o = 1,
                    l = n.lastLine(),
                    s = t.ch;
                e: for (var c = a; c <= l; ++c)
                    for (var u = n.getLine(c), d = c == a ? s : 0;;) {
                        var f = u.indexOf(t.pair[0], d),
                            h = u.indexOf(t.pair[1], d);
                        if (f < 0 && (f = u.length), h < 0 && (h = u.length), (d = Math.min(f, h)) == u.length) break;
                        if (n.getTokenTypeAt(e.Pos(c, d + 1)) == t.tokenType)
                            if (d == f) ++o;
                            else if (!--o) {
                            r = c, i = d;
                            break e
                        }++d
                    }
                return null == r || a == r ? null : {
                    from: e.Pos(a, s),
                    to: e.Pos(r, i)
                }
            }
            for (var a = r.line, l = n.getLine(a), s = [], c = 0; c < t.length; c++) {
                var u = i(t[c]);
                u && s.push(u)
            }
            s.sort((function(e, t) {
                return e.ch - t.ch
            }));
            for (c = 0; c < s.length; c++) {
                var d = o(s[c]);
                if (d) return d
            }
            return null
        }
    }
    e.registerHelper("fold", "brace", t([
        ["{", "}"],
        ["[", "]"]
    ])), e.registerHelper("fold", "brace-paren", t([
        ["{", "}"],
        ["[", "]"],
        ["(", ")"]
    ])), e.registerHelper("fold", "import", (function(t, n) {
        function r(n) {
            if (n < t.firstLine() || n > t.lastLine()) return null;
            var r = t.getTokenAt(e.Pos(n, 1));
            if (/\S/.test(r.string) || (r = t.getTokenAt(e.Pos(n, r.end + 1))), "keyword" != r.type || "import" != r.string) return null;
            for (var i = n, o = Math.min(t.lastLine(), n + 10); i <= o; ++i) {
                var a = t.getLine(i).indexOf(";");
                if (-1 != a) return {
                    startCh: r.end,
                    end: e.Pos(i, a)
                }
            }
        }
        var i, o = n.line,
            a = r(o);
        if (!a || r(o - 1) || (i = r(o - 2)) && i.end.line == o - 1) return null;
        for (var l = a.end;;) {
            var s = r(l.line + 1);
            if (null == s) break;
            l = s.end
        }
        return {
            from: t.clipPos(e.Pos(o, a.startCh + 1)),
            to: l
        }
    })), e.registerHelper("fold", "include", (function(t, n) {
        function r(n) {
            if (n < t.firstLine() || n > t.lastLine()) return null;
            var r = t.getTokenAt(e.Pos(n, 1));
            return /\S/.test(r.string) || (r = t.getTokenAt(e.Pos(n, r.end + 1))), "meta" == r.type && "#include" == r.string.slice(0, 8) ? r.start + 8 : void 0
        }
        var i = n.line,
            o = r(i);
        if (null == o || null != r(i - 1)) return null;
        for (var a = i;;) {
            if (null == r(a + 1)) break;
            ++a
        }
        return {
            from: e.Pos(i, o + 1),
            to: t.clipPos(e.Pos(a))
        }
    }))
})),
function(e) {
    "object" == typeof exports && "object" == typeof module ? e(require("../../lib/codemirror")) : "function" == typeof define && define.amd ? define(["../../lib/codemirror"], e) : e(CodeMirror)
}((function(e) {
    "use strict";
    e.registerGlobalHelper("fold", "comment", (function(e) {
        return e.blockCommentStart && e.blockCommentEnd
    }), (function(t, n) {
        var r = t.getModeAt(n),
            i = r.blockCommentStart,
            o = r.blockCommentEnd;
        if (i && o) {
            for (var a, l = n.line, s = t.getLine(l), c = n.ch, u = 0;;) {
                var d = c <= 0 ? -1 : s.lastIndexOf(i, c - 1);
                if (-1 != d) {
                    if (1 == u && d < n.ch) return;
                    if (/comment/.test(t.getTokenTypeAt(e.Pos(l, d + 1))) && (0 == d || s.slice(d - o.length, d) == o || !/comment/.test(t.getTokenTypeAt(e.Pos(l, d))))) {
                        a = d + i.length;
                        break
                    }
                    c = d - 1
                } else {
                    if (1 == u) return;
                    u = 1, c = s.length
                }
            }
            var f, h, p = 1,
                m = t.lastLine();
            e: for (var g = l; g <= m; ++g)
                for (var v = t.getLine(g), y = g == l ? a : 0;;) {
                    var b = v.indexOf(i, y),
                        k = v.indexOf(o, y);
                    if (b < 0 && (b = v.length), k < 0 && (k = v.length), (y = Math.min(b, k)) == v.length) break;
                    if (y == b) ++p;
                    else if (!--p) {
                        f = g, h = y;
                        break e
                    }++y
                }
            if (null != f && (l != f || h != a)) return {
                from: e.Pos(l, a),
                to: e.Pos(f, h)
            }
        }
    }))
})),
function(e) {
    "object" == typeof exports && "object" == typeof module ? e(require("../../lib/codemirror")) : "function" == typeof define && define.amd ? define(["../../lib/codemirror"], e) : e(CodeMirror)
}((function(e) {
    "use strict";

    function t(t, i, o, a) {
        function l(e) {
            var n = s(t, i);
            if (!n || n.to.line - n.from.line < c) return null;
            if ("fold" === a) return n;
            for (var r = t.findMarksAt(n.from), o = 0; o < r.length; ++o)
                if (r[o].__isFold) {
                    if (!e) return null;
                    n.cleared = !0, r[o].clear()
                }
            return n
        }
        if (o && o.call) {
            var s = o;
            o = null
        } else s = r(t, o, "rangeFinder");
        "number" == typeof i && (i = e.Pos(i, 0));
        var c = r(t, o, "minFoldSize"),
            u = l(!0);
        if (r(t, o, "scanUp"))
            for (; !u && i.line > t.firstLine();) i = e.Pos(i.line - 1, 0), u = l(!1);
        if (u && !u.cleared && "unfold" !== a) {
            var d = n(t, o, u);
            e.on(d, "mousedown", (function(t) {
                f.clear(), e.e_preventDefault(t)
            }));
            var f = t.markText(u.from, u.to, {
                replacedWith: d,
                clearOnEnter: r(t, o, "clearOnEnter"),
                __isFold: !0
            });
            f.on("clear", (function(n, r) {
                e.signal(t, "unfold", t, n, r)
            })), e.signal(t, "fold", t, u.from, u.to)
        }
    }

    function n(e, t, n) {
        var i = r(e, t, "widget");
        if ("function" == typeof i && (i = i(n.from, n.to)), "string" == typeof i) {
            var o = document.createTextNode(i);
            (i = document.createElement("span")).appendChild(o), i.className = "CodeMirror-foldmarker"
        } else i && (i = i.cloneNode(!0));
        return i
    }

    function r(e, t, n) {
        if (t && void 0 !== t[n]) return t[n];
        var r = e.options.foldOptions;
        return r && void 0 !== r[n] ? r[n] : i[n]
    }
    e.newFoldFunction = function(e, n) {
        return function(r, i) {
            t(r, i, {
                rangeFinder: e,
                widget: n
            })
        }
    }, e.defineExtension("foldCode", (function(e, n, r) {
        t(this, e, n, r)
    })), e.defineExtension("isFolded", (function(e) {
        for (var t = this.findMarksAt(e), n = 0; n < t.length; ++n)
            if (t[n].__isFold) return !0
    })), e.commands.toggleFold = function(e) {
        e.foldCode(e.getCursor())
    }, e.commands.fold = function(e) {
        e.foldCode(e.getCursor(), null, "fold")
    }, e.commands.unfold = function(e) {
        e.foldCode(e.getCursor(), {
            scanUp: !1
        }, "unfold")
    }, e.commands.foldAll = function(t) {
        t.operation((function() {
            for (var n = t.firstLine(), r = t.lastLine(); n <= r; n++) t.foldCode(e.Pos(n, 0), {
                scanUp: !1
            }, "fold")
        }))
    }, e.commands.unfoldAll = function(t) {
        t.operation((function() {
            for (var n = t.firstLine(), r = t.lastLine(); n <= r; n++) t.foldCode(e.Pos(n, 0), {
                scanUp: !1
            }, "unfold")
        }))
    }, e.registerHelper("fold", "combine", (function() {
        var e = Array.prototype.slice.call(arguments, 0);
        return function(t, n) {
            for (var r = 0; r < e.length; ++r) {
                var i = e[r](t, n);
                if (i) return i
            }
        }
    })), e.registerHelper("fold", "auto", (function(e, t) {
        for (var n = e.getHelpers(t, "fold"), r = 0; r < n.length; r++) {
            var i = n[r](e, t);
            if (i) return i
        }
    }));
    var i = {
        rangeFinder: e.fold.auto,
        widget: "\u2194",
        minFoldSize: 0,
        scanUp: !1,
        clearOnEnter: !0
    };
    e.defineOption("foldOptions", null), e.defineExtension("foldOption", (function(e, t) {
        return r(this, e, t)
    }))
})),
function(e) {
    "object" == typeof exports && "object" == typeof module ? e(require("../../lib/codemirror"), require("./foldcode")) : "function" == typeof define && define.amd ? define(["../../lib/codemirror", "./foldcode"], e) : e(CodeMirror)
}((function(e) {
    "use strict";

    function t(e) {
        this.options = e, this.from = this.to = 0
    }

    function n(e) {
        return !0 === e && (e = {}), null == e.gutter && (e.gutter = "CodeMirror-foldgutter"), null == e.indicatorOpen && (e.indicatorOpen = "CodeMirror-foldgutter-open"), null == e.indicatorFolded && (e.indicatorFolded = "CodeMirror-foldgutter-folded"), e
    }

    function r(e, t) {
        for (var n = e.findMarks(f(t, 0), f(t + 1, 0)), r = 0; r < n.length; ++r)
            if (n[r].__isFold) {
                var i = n[r].find(-1);
                if (i && i.line === t) return n[r]
            }
    }

    function i(e) {
        if ("string" == typeof e) {
            var t = document.createElement("div");
            return t.className = e + " CodeMirror-guttermarker-subtle", t
        }
        return e.cloneNode(!0)
    }

    function o(e, t, n) {
        var o = e.state.foldGutter.options,
            l = t - 1,
            s = e.foldOption(o, "minFoldSize"),
            c = e.foldOption(o, "rangeFinder"),
            u = "string" == typeof o.indicatorFolded && a(o.indicatorFolded),
            d = "string" == typeof o.indicatorOpen && a(o.indicatorOpen);
        e.eachLine(t, n, (function(t) {
            ++l;
            var n = null,
                a = t.gutterMarkers;
            if (a && (a = a[o.gutter]), r(e, l)) {
                if (u && a && u.test(a.className)) return;
                n = i(o.indicatorFolded)
            } else {
                var h = f(l, 0),
                    p = c && c(e, h);
                if (p && p.to.line - p.from.line >= s) {
                    if (d && a && d.test(a.className)) return;
                    n = i(o.indicatorOpen)
                }
            }(n || a) && e.setGutterMarker(t, o.gutter, n)
        }))
    }

    function a(e) {
        return new RegExp("(^|\\s)" + e + "(?:$|\\s)\\s*")
    }

    function l(e) {
        var t = e.getViewport(),
            n = e.state.foldGutter;
        n && (e.operation((function() {
            o(e, t.from, t.to)
        })), n.from = t.from, n.to = t.to)
    }

    function s(e, t, n) {
        var i = e.state.foldGutter;
        if (i) {
            var o = i.options;
            if (n == o.gutter) {
                var a = r(e, t);
                a ? a.clear() : e.foldCode(f(t, 0), o)
            }
        }
    }

    function c(e) {
        var t = e.state.foldGutter;
        if (t) {
            var n = t.options;
            t.from = t.to = 0, clearTimeout(t.changeUpdate), t.changeUpdate = setTimeout((function() {
                l(e)
            }), n.foldOnChangeTimeSpan || 600)
        }
    }

    function u(e) {
        var t = e.state.foldGutter;
        if (t) {
            var n = t.options;
            clearTimeout(t.changeUpdate), t.changeUpdate = setTimeout((function() {
                var n = e.getViewport();
                t.from == t.to || n.from - t.to > 20 || t.from - n.to > 20 ? l(e) : e.operation((function() {
                    n.from < t.from && (o(e, n.from, t.from), t.from = n.from), n.to > t.to && (o(e, t.to, n.to), t.to = n.to)
                }))
            }), n.updateViewportTimeSpan || 400)
        }
    }

    function d(e, t) {
        var n = e.state.foldGutter;
        if (n) {
            var r = t.line;
            r >= n.from && r < n.to && o(e, r, r + 1)
        }
    }
    e.defineOption("foldGutter", !1, (function(r, i, o) {
        o && o != e.Init && (r.clearGutter(r.state.foldGutter.options.gutter), r.state.foldGutter = null, r.off("gutterClick", s), r.off("changes", c), r.off("viewportChange", u), r.off("fold", d), r.off("unfold", d), r.off("swapDoc", c)), i && (r.state.foldGutter = new t(n(i)), l(r), r.on("gutterClick", s), r.on("changes", c), r.on("viewportChange", u), r.on("fold", d), r.on("unfold", d), r.on("swapDoc", c))
    }));
    var f = e.Pos
})),
function(e) {
    "object" == typeof exports && "object" == typeof module ? e(require("../../lib/codemirror")) : "function" == typeof define && define.amd ? define(["../../lib/codemirror"], e) : e(CodeMirror)
}((function(e) {
    "use strict";

    function t(t, n) {
        var r = t.getLine(n),
            i = r.search(/\S/);
        return -1 == i || /\bcomment\b/.test(t.getTokenTypeAt(e.Pos(n, i + 1))) ? -1 : e.countColumn(r, null, t.getOption("tabSize"))
    }
    e.registerHelper("fold", "indent", (function(n, r) {
        var i = t(n, r.line);
        if (!(i < 0)) {
            for (var o = null, a = r.line + 1, l = n.lastLine(); a <= l; ++a) {
                var s = t(n, a);
                if (-1 == s);
                else {
                    if (!(s > i)) break;
                    o = a
                }
            }
            return o ? {
                from: e.Pos(r.line, n.getLine(r.line).length),
                to: e.Pos(o, n.getLine(o).length)
            } : void 0
        }
    }))
})),
function(e) {
    "object" == typeof exports && "object" == typeof module ? e(require("../../lib/codemirror")) : "function" == typeof define && define.amd ? define(["../../lib/codemirror"], e) : e(CodeMirror)
}((function(e) {
    "use strict";
    e.registerHelper("fold", "markdown", (function(t, n) {
        function r(n) {
            var r = t.getTokenTypeAt(e.Pos(n, 0));
            return r && /\bheader\b/.test(r)
        }

        function i(e, t, n) {
            var i = t && t.match(/^#+/);
            return i && r(e) ? i[0].length : (i = n && n.match(/^[=\-]+\s*$/)) && r(e + 1) ? "=" == n[0] ? 1 : 2 : o
        }
        var o = 100,
            a = t.getLine(n.line),
            l = t.getLine(n.line + 1),
            s = i(n.line, a, l);
        if (s !== o) {
            for (var c = t.lastLine(), u = n.line, d = t.getLine(u + 2); u < c && !(i(u + 1, l, d) <= s);) ++u, l = d, d = t.getLine(u + 2);
            return {
                from: e.Pos(n.line, a.length),
                to: e.Pos(u, t.getLine(u).length)
            }
        }
    }))
})),
function(e) {
    "object" == typeof exports && "object" == typeof module ? e(require("../../lib/codemirror")) : "function" == typeof define && define.amd ? define(["../../lib/codemirror"], e) : e(CodeMirror)
}((function(e) {
    "use strict";

    function t(e, t) {
        return e.line - t.line || e.ch - t.ch
    }

    function n(e, t, n, r) {
        this.line = t, this.ch = n, this.cm = e, this.text = e.getLine(t), this.min = r ? Math.max(r.from, e.firstLine()) : e.firstLine(), this.max = r ? Math.min(r.to - 1, e.lastLine()) : e.lastLine()
    }

    function r(e, t) {
        var n = e.cm.getTokenTypeAt(f(e.line, t));
        return n && /\btag\b/.test(n)
    }

    function i(e) {
        if (!(e.line >= e.max)) return e.ch = 0, e.text = e.cm.getLine(++e.line), !0
    }

    function o(e) {
        if (!(e.line <= e.min)) return e.text = e.cm.getLine(--e.line), e.ch = e.text.length, !0
    }

    function a(e) {
        for (;;) {
            var t = e.text.indexOf(">", e.ch);
            if (-1 == t) {
                if (i(e)) continue;
                return
            }
            if (r(e, t + 1)) {
                var n = e.text.lastIndexOf("/", t),
                    o = n > -1 && !/\S/.test(e.text.slice(n + 1, t));
                return e.ch = t + 1, o ? "selfClose" : "regular"
            }
            e.ch = t + 1
        }
    }

    function l(e) {
        for (;;) {
            var t = e.ch ? e.text.lastIndexOf("<", e.ch - 1) : -1;
            if (-1 == t) {
                if (o(e)) continue;
                return
            }
            if (r(e, t + 1)) {
                p.lastIndex = t, e.ch = t;
                var n = p.exec(e.text);
                if (n && n.index == t) return n
            } else e.ch = t
        }
    }

    function s(e) {
        for (;;) {
            p.lastIndex = e.ch;
            var t = p.exec(e.text);
            if (!t) {
                if (i(e)) continue;
                return
            }
            if (r(e, t.index + 1)) return e.ch = t.index + t[0].length, t;
            e.ch = t.index + 1
        }
    }

    function c(e) {
        for (;;) {
            var t = e.ch ? e.text.lastIndexOf(">", e.ch - 1) : -1;
            if (-1 == t) {
                if (o(e)) continue;
                return
            }
            if (r(e, t + 1)) {
                var n = e.text.lastIndexOf("/", t),
                    i = n > -1 && !/\S/.test(e.text.slice(n + 1, t));
                return e.ch = t + 1, i ? "selfClose" : "regular"
            }
            e.ch = t
        }
    }

    function u(e, t) {
        for (var n = [];;) {
            var r, i = s(e),
                o = e.line,
                l = e.ch - (i ? i[0].length : 0);
            if (!i || !(r = a(e))) return;
            if ("selfClose" != r)
                if (i[1]) {
                    for (var c = n.length - 1; c >= 0; --c)
                        if (n[c] == i[2]) {
                            n.length = c;
                            break
                        }
                    if (c < 0 && (!t || t == i[2])) return {
                        tag: i[2],
                        from: f(o, l),
                        to: f(e.line, e.ch)
                    }
                } else n.push(i[2])
        }
    }

    function d(e, t) {
        for (var n = [];;) {
            var r = c(e);
            if (!r) return;
            if ("selfClose" != r) {
                var i = e.line,
                    o = e.ch,
                    a = l(e);
                if (!a) return;
                if (a[1]) n.push(a[2]);
                else {
                    for (var s = n.length - 1; s >= 0; --s)
                        if (n[s] == a[2]) {
                            n.length = s;
                            break
                        }
                    if (s < 0 && (!t || t == a[2])) return {
                        tag: a[2],
                        from: f(e.line, e.ch),
                        to: f(i, o)
                    }
                }
            } else l(e)
        }
    }
    var f = e.Pos,
        h = "A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD",
        p = new RegExp("<(/?)([" + h + "][" + (h + "-:.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040") + "]*)", "g");
    e.registerHelper("fold", "xml", (function(e, r) {
        for (var i = new n(e, r.line, 0);;) {
            var o = s(i);
            if (!o || i.line != r.line) return;
            var l = a(i);
            if (!l) return;
            if (!o[1] && "selfClose" != l) {
                var c = f(i.line, i.ch),
                    d = u(i, o[2]);
                return d && t(d.from, c) > 0 ? {
                    from: c,
                    to: d.from
                } : null
            }
        }
    })), e.findMatchingTag = function(e, r, i) {
        var o = new n(e, r.line, r.ch, i);
        if (-1 != o.text.indexOf(">") || -1 != o.text.indexOf("<")) {
            var s = a(o),
                c = s && f(o.line, o.ch),
                h = s && l(o);
            if (s && h && !(t(o, r) > 0)) {
                var p = {
                    from: f(o.line, o.ch),
                    to: c,
                    tag: h[2]
                };
                return "selfClose" == s ? {
                    open: p,
                    close: null,
                    at: "open"
                } : h[1] ? {
                    open: d(o, h[2]),
                    close: p,
                    at: "close"
                } : {
                    open: p,
                    close: u(o = new n(e, c.line, c.ch, i), h[2]),
                    at: "open"
                }
            }
        }
    }, e.findEnclosingTag = function(e, t, r, i) {
        for (var o = new n(e, t.line, t.ch, r);;) {
            var a = d(o, i);
            if (!a) break;
            var l = u(new n(e, t.line, t.ch, r), a.tag);
            if (l) return {
                open: a,
                close: l
            }
        }
    }, e.scanForClosingTag = function(e, t, r, i) {
        return u(new n(e, t.line, t.ch, i ? {
            from: 0,
            to: i
        } : null), r)
    }
})),
function(e) {
    "object" == typeof exports && "object" == typeof module ? e(require("../../lib/codemirror"), require("../../mode/css/css")) : "function" == typeof define && define.amd ? define(["../../lib/codemirror", "../../mode/css/css"], e) : e(CodeMirror)
}((function(e) {
    "use strict";
    var t = {
        active: 1,
        after: 1,
        before: 1,
        checked: 1,
        default: 1,
        disabled: 1,
        empty: 1,
        enabled: 1,
        "first-child": 1,
        "first-letter": 1,
        "first-line": 1,
        "first-of-type": 1,
        focus: 1,
        hover: 1,
        "in-range": 1,
        indeterminate: 1,
        invalid: 1,
        lang: 1,
        "last-child": 1,
        "last-of-type": 1,
        link: 1,
        not: 1,
        "nth-child": 1,
        "nth-last-child": 1,
        "nth-last-of-type": 1,
        "nth-of-type": 1,
        "only-of-type": 1,
        "only-child": 1,
        optional: 1,
        "out-of-range": 1,
        placeholder: 1,
        "read-only": 1,
        "read-write": 1,
        required: 1,
        root: 1,
        selection: 1,
        target: 1,
        valid: 1,
        visited: 1
    };
    e.registerHelper("hint", "css", (function(n) {
        function r(e) {
            for (var t in e) c && 0 != t.lastIndexOf(c, 0) || d.push(t)
        }
        var i = n.getCursor(),
            o = n.getTokenAt(i),
            a = e.innerMode(n.getMode(), o.state);
        if ("css" == a.mode.name) {
            if ("keyword" == o.type && 0 == "!important".indexOf(o.string)) return {
                list: ["!important"],
                from: e.Pos(i.line, o.start),
                to: e.Pos(i.line, o.end)
            };
            var l = o.start,
                s = i.ch,
                c = o.string.slice(0, s - l);
            /[^\w$_-]/.test(c) && (c = "", l = s = i.ch);
            var u = e.resolveMode("text/css"),
                d = [],
                f = a.state.state;
            return "pseudo" == f || "variable-3" == o.type ? r(t) : "block" == f || "maybeprop" == f ? r(u.propertyKeywords) : "prop" == f || "parens" == f || "at" == f || "params" == f ? (r(u.valueKeywords), r(u.colorKeywords)) : "media" != f && "media_parens" != f || (r(u.mediaTypes), r(u.mediaFeatures)), d.length ? {
                list: d,
                from: e.Pos(i.line, l),
                to: e.Pos(i.line, s)
            } : void 0
        }
    }))
})),
function(e) {
    "object" == typeof exports && "object" == typeof module ? e(require("../../lib/codemirror"), require("./xml-hint")) : "function" == typeof define && define.amd ? define(["../../lib/codemirror", "./xml-hint"], e) : e(CodeMirror)
}((function(e) {
    "use strict";

    function t(e) {
        for (var t in d) d.hasOwnProperty(t) && (e.attrs[t] = d[t])
    }

    function n(t, n) {
        var r = {
            schemaInfo: u
        };
        if (n)
            for (var i in n) r[i] = n[i];
        return e.hint.xml(t, r)
    }
    var r = "ab aa af ak sq am ar an hy as av ae ay az bm ba eu be bn bh bi bs br bg my ca ch ce ny zh cv kw co cr hr cs da dv nl dz en eo et ee fo fj fi fr ff gl ka de el gn gu ht ha he hz hi ho hu ia id ie ga ig ik io is it iu ja jv kl kn kr ks kk km ki rw ky kv kg ko ku kj la lb lg li ln lo lt lu lv gv mk mg ms ml mt mi mr mh mn na nv nb nd ne ng nn no ii nr oc oj cu om or os pa pi fa pl ps pt qu rm rn ro ru sa sc sd se sm sg sr gd sn si sk sl so st es su sw ss sv ta te tg th ti bo tk tl tn to tr ts tt tw ty ug uk ur uz ve vi vo wa cy wo fy xh yi yo za zu".split(" "),
        i = ["_blank", "_self", "_top", "_parent"],
        o = ["ascii", "utf-8", "utf-16", "latin1", "latin1"],
        a = ["get", "post", "put", "delete"],
        l = ["application/x-www-form-urlencoded", "multipart/form-data", "text/plain"],
        s = ["all", "screen", "print", "embossed", "braille", "handheld", "print", "projection", "screen", "tty", "tv", "speech", "3d-glasses", "resolution [>][<][=] [X]", "device-aspect-ratio: X/Y", "orientation:portrait", "orientation:landscape", "device-height: [X]", "device-width: [X]"],
        c = {
            attrs: {}
        },
        u = {
            a: {
                attrs: {
                    href: null,
                    ping: null,
                    type: null,
                    media: s,
                    target: i,
                    hreflang: r
                }
            },
            abbr: c,
            acronym: c,
            address: c,
            applet: c,
            area: {
                attrs: {
                    alt: null,
                    coords: null,
                    href: null,
                    target: null,
                    ping: null,
                    media: s,
                    hreflang: r,
                    type: null,
                    shape: ["default", "rect", "circle", "poly"]
                }
            },
            article: c,
            aside: c,
            audio: {
                attrs: {
                    src: null,
                    mediagroup: null,
                    crossorigin: ["anonymous", "use-credentials"],
                    preload: ["none", "metadata", "auto"],
                    autoplay: ["", "autoplay"],
                    loop: ["", "loop"],
                    controls: ["", "controls"]
                }
            },
            b: c,
            base: {
                attrs: {
                    href: null,
                    target: i
                }
            },
            basefont: c,
            bdi: c,
            bdo: c,
            big: c,
            blockquote: {
                attrs: {
                    cite: null
                }
            },
            body: c,
            br: c,
            button: {
                attrs: {
                    form: null,
                    formaction: null,
                    name: null,
                    value: null,
                    autofocus: ["", "autofocus"],
                    disabled: ["", "autofocus"],
                    formenctype: l,
                    formmethod: a,
                    formnovalidate: ["", "novalidate"],
                    formtarget: i,
                    type: ["submit", "reset", "button"]
                }
            },
            canvas: {
                attrs: {
                    width: null,
                    height: null
                }
            },
            caption: c,
            center: c,
            cite: c,
            code: c,
            col: {
                attrs: {
                    span: null
                }
            },
            colgroup: {
                attrs: {
                    span: null
                }
            },
            command: {
                attrs: {
                    type: ["command", "checkbox", "radio"],
                    label: null,
                    icon: null,
                    radiogroup: null,
                    command: null,
                    title: null,
                    disabled: ["", "disabled"],
                    checked: ["", "checked"]
                }
            },
            data: {
                attrs: {
                    value: null
                }
            },
            datagrid: {
                attrs: {
                    disabled: ["", "disabled"],
                    multiple: ["", "multiple"]
                }
            },
            datalist: {
                attrs: {
                    data: null
                }
            },
            dd: c,
            del: {
                attrs: {
                    cite: null,
                    datetime: null
                }
            },
            details: {
                attrs: {
                    open: ["", "open"]
                }
            },
            dfn: c,
            dir: c,
            div: c,
            dialog: {
                attrs: {
                    open: null
                }
            },
            dl: c,
            dt: c,
            em: c,
            embed: {
                attrs: {
                    src: null,
                    type: null,
                    width: null,
                    height: null
                }
            },
            eventsource: {
                attrs: {
                    src: null
                }
            },
            fieldset: {
                attrs: {
                    disabled: ["", "disabled"],
                    form: null,
                    name: null
                }
            },
            figcaption: c,
            figure: c,
            font: c,
            footer: c,
            form: {
                attrs: {
                    action: null,
                    name: null,
                    "accept-charset": o,
                    autocomplete: ["on", "off"],
                    enctype: l,
                    method: a,
                    novalidate: ["", "novalidate"],
                    target: i
                }
            },
            frame: c,
            frameset: c,
            h1: c,
            h2: c,
            h3: c,
            h4: c,
            h5: c,
            h6: c,
            head: {
                attrs: {},
                children: ["title", "base", "link", "style", "meta", "script", "noscript", "command"]
            },
            header: c,
            hgroup: c,
            hr: c,
            html: {
                attrs: {
                    manifest: null
                },
                children: ["head", "body"]
            },
            i: c,
            iframe: {
                attrs: {
                    src: null,
                    srcdoc: null,
                    name: null,
                    width: null,
                    height: null,
                    sandbox: ["allow-top-navigation", "allow-same-origin", "allow-forms", "allow-scripts"],
                    seamless: ["", "seamless"]
                }
            },
            img: {
                attrs: {
                    alt: null,
                    src: null,
                    ismap: null,
                    usemap: null,
                    width: null,
                    height: null,
                    crossorigin: ["anonymous", "use-credentials"]
                }
            },
            input: {
                attrs: {
                    alt: null,
                    dirname: null,
                    form: null,
                    formaction: null,
                    height: null,
                    list: null,
                    max: null,
                    maxlength: null,
                    min: null,
                    name: null,
                    pattern: null,
                    placeholder: null,
                    size: null,
                    src: null,
                    step: null,
                    value: null,
                    width: null,
                    accept: ["audio/*", "video/*", "image/*"],
                    autocomplete: ["on", "off"],
                    autofocus: ["", "autofocus"],
                    checked: ["", "checked"],
                    disabled: ["", "disabled"],
                    formenctype: l,
                    formmethod: a,
                    formnovalidate: ["", "novalidate"],
                    formtarget: i,
                    multiple: ["", "multiple"],
                    readonly: ["", "readonly"],
                    required: ["", "required"],
                    type: ["hidden", "text", "search", "tel", "url", "email", "password", "datetime", "date", "month", "week", "time", "datetime-local", "number", "range", "color", "checkbox", "radio", "file", "submit", "image", "reset", "button"]
                }
            },
            ins: {
                attrs: {
                    cite: null,
                    datetime: null
                }
            },
            kbd: c,
            keygen: {
                attrs: {
                    challenge: null,
                    form: null,
                    name: null,
                    autofocus: ["", "autofocus"],
                    disabled: ["", "disabled"],
                    keytype: ["RSA"]
                }
            },
            label: {
                attrs: {
                    for: null,
                    form: null
                }
            },
            legend: c,
            li: {
                attrs: {
                    value: null
                }
            },
            link: {
                attrs: {
                    href: null,
                    type: null,
                    hreflang: r,
                    media: s,
                    sizes: ["all", "16x16", "16x16 32x32", "16x16 32x32 64x64"]
                }
            },
            map: {
                attrs: {
                    name: null
                }
            },
            mark: c,
            menu: {
                attrs: {
                    label: null,
                    type: ["list", "context", "toolbar"]
                }
            },
            meta: {
                attrs: {
                    content: null,
                    charset: o,
                    name: ["viewport", "application-name", "author", "description", "generator", "keywords"],
                    "http-equiv": ["content-language", "content-type", "default-style", "refresh"]
                }
            },
            meter: {
                attrs: {
                    value: null,
                    min: null,
                    low: null,
                    high: null,
                    max: null,
                    optimum: null
                }
            },
            nav: c,
            noframes: c,
            noscript: c,
            object: {
                attrs: {
                    data: null,
                    type: null,
                    name: null,
                    usemap: null,
                    form: null,
                    width: null,
                    height: null,
                    typemustmatch: ["", "typemustmatch"]
                }
            },
            ol: {
                attrs: {
                    reversed: ["", "reversed"],
                    start: null,
                    type: ["1", "a", "A", "i", "I"]
                }
            },
            optgroup: {
                attrs: {
                    disabled: ["", "disabled"],
                    label: null
                }
            },
            option: {
                attrs: {
                    disabled: ["", "disabled"],
                    label: null,
                    selected: ["", "selected"],
                    value: null
                }
            },
            output: {
                attrs: {
                    for: null,
                    form: null,
                    name: null
                }
            },
            p: c,
            param: {
                attrs: {
                    name: null,
                    value: null
                }
            },
            pre: c,
            progress: {
                attrs: {
                    value: null,
                    max: null
                }
            },
            q: {
                attrs: {
                    cite: null
                }
            },
            rp: c,
            rt: c,
            ruby: c,
            s: c,
            samp: c,
            script: {
                attrs: {
                    type: ["text/javascript"],
                    src: null,
                    async: ["", "async"],
                    defer: ["", "defer"],
                    charset: o
                }
            },
            section: c,
            select: {
                attrs: {
                    form: null,
                    name: null,
                    size: null,
                    autofocus: ["", "autofocus"],
                    disabled: ["", "disabled"],
                    multiple: ["", "multiple"]
                }
            },
            small: c,
            source: {
                attrs: {
                    src: null,
                    type: null,
                    media: null
                }
            },
            span: c,
            strike: c,
            strong: c,
            style: {
                attrs: {
                    type: ["text/css"],
                    media: s,
                    scoped: null
                }
            },
            sub: c,
            summary: c,
            sup: c,
            table: c,
            tbody: c,
            td: {
                attrs: {
                    colspan: null,
                    rowspan: null,
                    headers: null
                }
            },
            textarea: {
                attrs: {
                    dirname: null,
                    form: null,
                    maxlength: null,
                    name: null,
                    placeholder: null,
                    rows: null,
                    cols: null,
                    autofocus: ["", "autofocus"],
                    disabled: ["", "disabled"],
                    readonly: ["", "readonly"],
                    required: ["", "required"],
                    wrap: ["soft", "hard"]
                }
            },
            tfoot: c,
            th: {
                attrs: {
                    colspan: null,
                    rowspan: null,
                    headers: null,
                    scope: ["row", "col", "rowgroup", "colgroup"]
                }
            },
            thead: c,
            time: {
                attrs: {
                    datetime: null
                }
            },
            title: c,
            tr: c,
            track: {
                attrs: {
                    src: null,
                    label: null,
                    default: null,
                    kind: ["subtitles", "captions", "descriptions", "chapters", "metadata"],
                    srclang: r
                }
            },
            tt: c,
            u: c,
            ul: c,
            var: c,
            video: {
                attrs: {
                    src: null,
                    poster: null,
                    width: null,
                    height: null,
                    crossorigin: ["anonymous", "use-credentials"],
                    preload: ["auto", "metadata", "none"],
                    autoplay: ["", "autoplay"],
                    mediagroup: ["movie"],
                    muted: ["", "muted"],
                    controls: ["", "controls"]
                }
            },
            wbr: c
        },
        d = {
            accesskey: ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
            class: null,
            contenteditable: ["true", "false"],
            contextmenu: null,
            dir: ["ltr", "rtl", "auto"],
            draggable: ["true", "false", "auto"],
            dropzone: ["copy", "move", "link", "string:", "file:"],
            hidden: ["hidden"],
            id: null,
            inert: ["inert"],
            itemid: null,
            itemprop: null,
            itemref: null,
            itemscope: ["itemscope"],
            itemtype: null,
            lang: ["en", "es"],
            spellcheck: ["true", "false"],
            autocorrect: ["true", "false"],
            autocapitalize: ["true", "false"],
            style: null,
            tabindex: ["1", "2", "3", "4", "5", "6", "7", "8", "9"],
            title: null,
            translate: ["yes", "no"],
            onclick: null,
            rel: ["stylesheet", "alternate", "author", "bookmark", "help", "license", "next", "nofollow", "noreferrer", "prefetch", "prev", "search", "tag"]
        };
    for (var f in t(c), u) u.hasOwnProperty(f) && u[f] != c && t(u[f]);
    e.htmlSchema = u, e.registerHelper("hint", "html", n)
})),
function(e) {
    "object" == typeof exports && "object" == typeof module ? e(require("../../lib/codemirror")) : "function" == typeof define && define.amd ? define(["../../lib/codemirror"], e) : e(CodeMirror)
}((function(e) {
    function t(e, t) {
        for (var n = 0, r = e.length; n < r; ++n) t(e[n])
    }

    function n(e, t) {
        if (!Array.prototype.indexOf) {
            for (var n = e.length; n--;)
                if (e[n] === t) return !0;
            return !1
        }
        return -1 != e.indexOf(t)
    }

    function r(t, n, r, i) {
        var o = t.getCursor(),
            a = r(t, o);
        if (!/\b(?:string|comment)\b/.test(a.type)) {
            var l = e.innerMode(t.getMode(), a.state);
            if ("json" !== l.mode.helperType) {
                a.state = l.state, /^[\w$_]*$/.test(a.string) ? a.end > o.ch && (a.end = o.ch, a.string = a.string.slice(0, o.ch - a.start)) : a = {
                    start: o.ch,
                    end: o.ch,
                    string: "",
                    state: a.state,
                    type: "." == a.string ? "property" : null
                };
                for (var u = a;
                    "property" == u.type;) {
                    if ("." != (u = r(t, c(o.line, u.start))).string) return;
                    if (u = r(t, c(o.line, u.start)), !d) var d = [];
                    d.push(u)
                }
                return {
                    list: s(a, d, n, i),
                    from: c(o.line, a.start),
                    to: c(o.line, a.end)
                }
            }
        }
    }

    function i(e, t) {
        return r(e, h, (function(e, t) {
            return e.getTokenAt(t)
        }), t)
    }

    function o(e, t) {
        var n = e.getTokenAt(t);
        return t.ch == n.start + 1 && "." == n.string.charAt(0) ? (n.end = n.start, n.string = ".", n.type = "property") : /^\.[\w$_]*$/.test(n.string) && (n.type = "property", n.start++, n.string = n.string.replace(/\./, "")), n
    }

    function a(e, t) {
        return r(e, p, o, t)
    }

    function l(e, t) {
        if (Object.getOwnPropertyNames && Object.getPrototypeOf)
            for (var n = e; n; n = Object.getPrototypeOf(n)) Object.getOwnPropertyNames(n).forEach(t);
        else
            for (var r in e) t(r)
    }

    function s(e, r, i, o) {
        function a(e) {
            0 != e.lastIndexOf(h, 0) || n(c, e) || c.push(e)
        }

        function s(e) {
            "string" == typeof e ? t(u, a) : e instanceof Array ? t(d, a) : e instanceof Function && t(f, a), l(e, a)
        }
        var c = [],
            h = e.string,
            p = o && o.globalScope || window;
        if (r && r.length) {
            var m, g = r.pop();
            for (g.type && 0 === g.type.indexOf("variable") ? (o && o.additionalContext && (m = o.additionalContext[g.string]), o && !1 === o.useGlobalScope || (m = m || p[g.string])) : "string" == g.type ? m = "" : "atom" == g.type ? m = 1 : "function" == g.type && (null == p.jQuery || "$" != g.string && "jQuery" != g.string || "function" != typeof p.jQuery ? null != p._ && "_" == g.string && "function" == typeof p._ && (m = p._()) : m = p.jQuery()); null != m && r.length;) m = m[r.pop().string];
            null != m && s(m)
        } else {
            for (var v = e.state.localVars; v; v = v.next) a(v.name);
            for (var y = e.state.context; y; y = y.prev)
                for (v = y.vars; v; v = v.next) a(v.name);
            for (v = e.state.globalVars; v; v = v.next) a(v.name);
            if (o && null != o.additionalContext)
                for (var b in o.additionalContext) a(b);
            o && !1 === o.useGlobalScope || s(p), t(i, a)
        }
        return c
    }
    var c = e.Pos;
    e.registerHelper("hint", "javascript", i), e.registerHelper("hint", "coffeescript", a);
    var u = "charAt charCodeAt indexOf lastIndexOf substring substr slice trim trimLeft trimRight toUpperCase toLowerCase split concat match replace search".split(" "),
        d = "length concat join splice push pop shift unshift slice reverse sort indexOf lastIndexOf every some filter forEach map reduce reduceRight ".split(" "),
        f = "prototype apply call bind".split(" "),
        h = "break case catch class const continue debugger default delete do else export extends false finally for function if in import instanceof new null return super switch this throw true try typeof var void while with yield".split(" "),
        p = "and break catch class continue delete do else extends false finally for if in instanceof isnt new no not null of off on or return switch then throw true try typeof until void while with yes".split(" ")
})),
function(e) {
    "object" == typeof exports && "object" == typeof module ? e(require("../../lib/codemirror")) : "function" == typeof define && define.amd ? define(["../../lib/codemirror"], e) : e(CodeMirror)
}((function(e) {
    "use strict";

    function t(e, t) {
        if (this.cm = e, this.options = t, this.widget = null, this.debounce = 0, this.tick = 0, this.startPos = this.cm.getCursor("start"), this.startLen = this.cm.getLine(this.startPos.line).length - this.cm.getSelection().length, this.options.updateOnCursorActivity) {
            var n = this;
            e.on("cursorActivity", this.activityFunc = function() {
                n.cursorActivity()
            })
        }
    }

    function n(e, t, n) {
        var r = e.options.hintOptions,
            i = {};
        for (var o in p) i[o] = p[o];
        if (r)
            for (var o in r) void 0 !== r[o] && (i[o] = r[o]);
        if (n)
            for (var o in n) void 0 !== n[o] && (i[o] = n[o]);
        return i.hint.resolve && (i.hint = i.hint.resolve(e, t)), i
    }

    function r(e) {
        return "string" == typeof e ? e : e.text
    }

    function i(e, t) {
        function n(e, n) {
            var i;
            i = "string" != typeof n ? function(e) {
                return n(e, t)
            } : r.hasOwnProperty(n) ? r[n] : n, o[e] = i
        }
        var r = {
            Up: function() {
                t.moveFocus(-1)
            },
            Down: function() {
                t.moveFocus(1)
            },
            PageUp: function() {
                t.moveFocus(1 - t.menuSize(), !0)
            },
            PageDown: function() {
                t.moveFocus(t.menuSize() - 1, !0)
            },
            Home: function() {
                t.setFocus(0)
            },
            End: function() {
                t.setFocus(t.length - 1)
            },
            Enter: t.pick,
            Tab: t.pick,
            Esc: t.close
        };
        /Mac/.test(navigator.platform) && (r["Ctrl-P"] = function() {
            t.moveFocus(-1)
        }, r["Ctrl-N"] = function() {
            t.moveFocus(1)
        });
        var i = e.options.customKeys,
            o = i ? {} : r;
        if (i)
            for (var a in i) i.hasOwnProperty(a) && n(a, i[a]);
        var l = e.options.extraKeys;
        if (l)
            for (var a in l) l.hasOwnProperty(a) && n(a, l[a]);
        return o
    }

    function o(e, t) {
        for (; t && t != e;) {
            if ("LI" === t.nodeName.toUpperCase() && t.parentNode == e) return t;
            t = t.parentNode
        }
    }

    function a(t, n) {
        this.id = "cm-complete-" + Math.floor(Math.random(1e6)), this.completion = t, this.data = n, this.picked = !1;
        var a = this,
            l = t.cm,
            s = l.getInputField().ownerDocument,
            c = s.defaultView || s.parentWindow,
            f = this.hints = s.createElement("ul");
        f.setAttribute("role", "listbox"), f.setAttribute("aria-expanded", "true"), f.id = this.id;
        var h = t.cm.options.theme;
        f.className = "CodeMirror-hints " + h, this.selectedHint = n.selectedHint || 0;
        for (var p = n.list, m = 0; m < p.length; ++m) {
            var g = f.appendChild(s.createElement("li")),
                v = p[m],
                y = u + (m != this.selectedHint ? "" : " " + d);
            null != v.className && (y = v.className + " " + y), g.className = y, m == this.selectedHint && g.setAttribute("aria-selected", "true"), g.id = this.id + "-" + m, g.setAttribute("role", "option"), v.render ? v.render(g, n, v) : g.appendChild(s.createTextNode(v.displayText || r(v))), g.hintId = m
        }
        var b = t.options.container || s.body,
            k = l.cursorCoords(t.options.alignWithWord ? n.from : null),
            x = k.left,
            w = k.bottom,
            C = !0,
            S = 0,
            L = 0;
        if (b !== s.body) {
            var T = -1 !== ["absolute", "relative", "fixed"].indexOf(c.getComputedStyle(b).position) ? b : b.offsetParent,
                M = T.getBoundingClientRect(),
                A = s.body.getBoundingClientRect();
            S = M.left - A.left - T.scrollLeft, L = M.top - A.top - T.scrollTop
        }
        f.style.left = x - S + "px", f.style.top = w - L + "px";
        var z = c.innerWidth || Math.max(s.body.offsetWidth, s.documentElement.offsetWidth),
            O = c.innerHeight || Math.max(s.body.offsetHeight, s.documentElement.offsetHeight);
        b.appendChild(f), l.getInputField().setAttribute("aria-autocomplete", "list"), l.getInputField().setAttribute("aria-owns", this.id), l.getInputField().setAttribute("aria-activedescendant", this.id + "-" + this.selectedHint);
        var F, E = t.options.moveOnOverlap ? f.getBoundingClientRect() : new DOMRect,
            N = !!t.options.paddingForScrollbar && f.scrollHeight > f.clientHeight + 1;
        if (setTimeout((function() {
                F = l.getScrollInfo()
            })), E.bottom - O > 0) {
            var D = E.bottom - E.top;
            if (k.top - (k.bottom - E.top) - D > 0) f.style.top = (w = k.top - D - L) + "px", C = !1;
            else if (D > O) {
                f.style.height = O - 5 + "px", f.style.top = (w = k.bottom - E.top - L) + "px";
                var P = l.getCursor();
                n.from.ch != P.ch && (k = l.cursorCoords(P), f.style.left = (x = k.left - S) + "px", E = f.getBoundingClientRect())
            }
        }
        var I, j = E.right - z;
        if (N && (j += l.display.nativeBarWidth), j > 0 && (E.right - E.left > z && (f.style.width = z - 5 + "px", j -= E.right - E.left - z), f.style.left = (x = k.left - j - S) + "px"), N)
            for (var B = f.firstChild; B; B = B.nextSibling) B.style.paddingRight = l.display.nativeBarWidth + "px";
        (l.addKeyMap(this.keyMap = i(t, {
            moveFocus: function(e, t) {
                a.changeActive(a.selectedHint + e, t)
            },
            setFocus: function(e) {
                a.changeActive(e)
            },
            menuSize: function() {
                return a.screenAmount()
            },
            length: p.length,
            close: function() {
                t.close()
            },
            pick: function() {
                a.pick()
            },
            data: n
        })), t.options.closeOnUnfocus) && (l.on("blur", this.onBlur = function() {
            I = setTimeout((function() {
                t.close()
            }), 100)
        }), l.on("focus", this.onFocus = function() {
            clearTimeout(I)
        }));
        l.on("scroll", this.onScroll = function() {
            var e = l.getScrollInfo(),
                n = l.getWrapperElement().getBoundingClientRect();
            F || (F = l.getScrollInfo());
            var r = w + F.top - e.top,
                i = r - (c.pageYOffset || (s.documentElement || s.body).scrollTop);
            if (C || (i += f.offsetHeight), i <= n.top || i >= n.bottom) return t.close();
            f.style.top = r + "px", f.style.left = x + F.left - e.left + "px"
        }), e.on(f, "dblclick", (function(e) {
            var t = o(f, e.target || e.srcElement);
            t && null != t.hintId && (a.changeActive(t.hintId), a.pick())
        })), e.on(f, "click", (function(e) {
            var n = o(f, e.target || e.srcElement);
            n && null != n.hintId && (a.changeActive(n.hintId), t.options.completeOnSingleClick && a.pick())
        })), e.on(f, "mousedown", (function() {
            setTimeout((function() {
                l.focus()
            }), 20)
        }));
        var W = this.getSelectedHintRange();
        return 0 === W.from && 0 === W.to || this.scrollToActive(), e.signal(n, "select", p[this.selectedHint], f.childNodes[this.selectedHint]), !0
    }

    function l(e, t) {
        if (!e.somethingSelected()) return t;
        for (var n = [], r = 0; r < t.length; r++) t[r].supportsSelection && n.push(t[r]);
        return n
    }

    function s(e, t, n, r) {
        if (e.async) e(t, r, n);
        else {
            var i = e(t, n);
            i && i.then ? i.then(r) : r(i)
        }
    }

    function c(t, n) {
        var r, i = t.getHelpers(n, "hint");
        if (i.length) {
            var o = function(e, t, n) {
                function r(i) {
                    if (i == o.length) return t(null);
                    s(o[i], e, n, (function(e) {
                        e && e.list.length > 0 ? t(e) : r(i + 1)
                    }))
                }
                var o = l(e, i);
                r(0)
            };
            return o.async = !0, o.supportsSelection = !0, o
        }
        return (r = t.getHelper(t.getCursor(), "hintWords")) ? function(t) {
            return e.hint.fromList(t, {
                words: r
            })
        } : e.hint.anyword ? function(t, n) {
            return e.hint.anyword(t, n)
        } : function() {}
    }
    var u = "CodeMirror-hint",
        d = "CodeMirror-hint-active";
    e.showHint = function(e, t, n) {
        if (!t) return e.showHint(n);
        n && n.async && (t.async = !0);
        var r = {
            hint: t
        };
        if (n)
            for (var i in n) r[i] = n[i];
        return e.showHint(r)
    }, e.defineExtension("showHint", (function(r) {
        r = n(this, this.getCursor("start"), r);
        var i = this.listSelections();
        if (!(i.length > 1)) {
            if (this.somethingSelected()) {
                if (!r.hint.supportsSelection) return;
                for (var o = 0; o < i.length; o++)
                    if (i[o].head.line != i[o].anchor.line) return
            }
            this.state.completionActive && this.state.completionActive.close();
            var a = this.state.completionActive = new t(this, r);
            a.options.hint && (e.signal(this, "startCompletion", this), a.update(!0))
        }
    })), e.defineExtension("closeHint", (function() {
        this.state.completionActive && this.state.completionActive.close()
    }));
    var f = window.requestAnimationFrame || function(e) {
            return setTimeout(e, 1e3 / 60)
        },
        h = window.cancelAnimationFrame || clearTimeout;
    t.prototype = {
        close: function() {
            this.active() && (this.cm.state.completionActive = null, this.tick = null, this.options.updateOnCursorActivity && this.cm.off("cursorActivity", this.activityFunc), this.widget && this.data && e.signal(this.data, "close"), this.widget && this.widget.close(), e.signal(this.cm, "endCompletion", this.cm))
        },
        active: function() {
            return this.cm.state.completionActive == this
        },
        pick: function(t, n) {
            var i = t.list[n],
                o = this;
            this.cm.operation((function() {
                i.hint ? i.hint(o.cm, t, i) : o.cm.replaceRange(r(i), i.from || t.from, i.to || t.to, "complete"), e.signal(t, "pick", i), o.cm.scrollIntoView()
            })), this.options.closeOnPick && this.close()
        },
        cursorActivity: function() {
            this.debounce && (h(this.debounce), this.debounce = 0);
            var e = this.startPos;
            this.data && (e = this.data.from);
            var t = this.cm.getCursor(),
                n = this.cm.getLine(t.line);
            if (t.line != this.startPos.line || n.length - t.ch != this.startLen - this.startPos.ch || t.ch < e.ch || this.cm.somethingSelected() || !t.ch || this.options.closeCharacters.test(n.charAt(t.ch - 1))) this.close();
            else {
                var r = this;
                this.debounce = f((function() {
                    r.update()
                })), this.widget && this.widget.disable()
            }
        },
        update: function(e) {
            if (null != this.tick) {
                var t = this,
                    n = ++this.tick;
                s(this.options.hint, this.cm, this.options, (function(r) {
                    t.tick == n && t.finishUpdate(r, e)
                }))
            }
        },
        finishUpdate: function(t, n) {
            this.data && e.signal(this.data, "update");
            var r = this.widget && this.widget.picked || n && this.options.completeSingle;
            this.widget && this.widget.close(), this.data = t, t && t.list.length && (r && 1 == t.list.length ? this.pick(t, 0) : (this.widget = new a(this, t), e.signal(t, "shown")))
        }
    }, a.prototype = {
        close: function() {
            if (this.completion.widget == this) {
                this.completion.widget = null, this.hints.parentNode && this.hints.parentNode.removeChild(this.hints), this.completion.cm.removeKeyMap(this.keyMap);
                var e = this.completion.cm.getInputField();
                e.removeAttribute("aria-activedescendant"), e.removeAttribute("aria-owns");
                var t = this.completion.cm;
                this.completion.options.closeOnUnfocus && (t.off("blur", this.onBlur), t.off("focus", this.onFocus)), t.off("scroll", this.onScroll)
            }
        },
        disable: function() {
            this.completion.cm.removeKeyMap(this.keyMap);
            var e = this;
            this.keyMap = {
                Enter: function() {
                    e.picked = !0
                }
            }, this.completion.cm.addKeyMap(this.keyMap)
        },
        pick: function() {
            this.completion.pick(this.data, this.selectedHint)
        },
        changeActive: function(t, n) {
            if (t >= this.data.list.length ? t = n ? this.data.list.length - 1 : 0 : t < 0 && (t = n ? 0 : this.data.list.length - 1), this.selectedHint != t) {
                var r = this.hints.childNodes[this.selectedHint];
                r && (r.className = r.className.replace(" " + d, ""), r.removeAttribute("aria-selected")), (r = this.hints.childNodes[this.selectedHint = t]).className += " " + d, r.setAttribute("aria-selected", "true"), this.completion.cm.getInputField().setAttribute("aria-activedescendant", r.id), this.scrollToActive(), e.signal(this.data, "select", this.data.list[this.selectedHint], r)
            }
        },
        scrollToActive: function() {
            var e = this.getSelectedHintRange(),
                t = this.hints.childNodes[e.from],
                n = this.hints.childNodes[e.to],
                r = this.hints.firstChild;
            t.offsetTop < this.hints.scrollTop ? this.hints.scrollTop = t.offsetTop - r.offsetTop : n.offsetTop + n.offsetHeight > this.hints.scrollTop + this.hints.clientHeight && (this.hints.scrollTop = n.offsetTop + n.offsetHeight - this.hints.clientHeight + r.offsetTop)
        },
        screenAmount: function() {
            return Math.floor(this.hints.clientHeight / this.hints.firstChild.offsetHeight) || 1
        },
        getSelectedHintRange: function() {
            var e = this.completion.options.scrollMargin || 0;
            return {
                from: Math.max(0, this.selectedHint - e),
                to: Math.min(this.data.list.length - 1, this.selectedHint + e)
            }
        }
    }, e.registerHelper("hint", "auto", {
        resolve: c
    }), e.registerHelper("hint", "fromList", (function(t, n) {
        var r, i = t.getCursor(),
            o = t.getTokenAt(i),
            a = e.Pos(i.line, o.start),
            l = i;
        o.start < i.ch && /\w/.test(o.string.charAt(i.ch - o.start - 1)) ? r = o.string.substr(0, i.ch - o.start) : (r = "", a = i);
        for (var s = [], c = 0; c < n.words.length; c++) {
            var u = n.words[c];
            u.slice(0, r.length) == r && s.push(u)
        }
        if (s.length) return {
            list: s,
            from: a,
            to: l
        }
    })), e.commands.autocomplete = e.showHint;
    var p = {
        hint: e.hint.auto,
        completeSingle: !0,
        alignWithWord: !0,
        closeCharacters: /[\s()\[\]{};:>,]/,
        closeOnPick: !0,
        closeOnUnfocus: !0,
        updateOnCursorActivity: !0,
        completeOnSingleClick: !0,
        container: null,
        customKeys: null,
        extraKeys: null,
        paddingForScrollbar: !0,
        moveOnOverlap: !0
    };
    e.defineOption("hintOptions", null)
})),
function(e) {
    "object" == typeof exports && "object" == typeof module ? e(require("../../lib/codemirror")) : "function" == typeof define && define.amd ? define(["../../lib/codemirror"], e) : e(CodeMirror)
}((function(e) {
    "use strict";

    function t(e, t, n) {
        return n ? e.indexOf(t) >= 0 : 0 == e.lastIndexOf(t, 0)
    }

    function n(n, i) {
        function o() {
            return {
                list: h,
                from: p ? r(c.line, null == f ? u.start : f) : c,
                to: p ? r(c.line, u.end) : c
            }
        }
        var a = i && i.schemaInfo,
            l = i && i.quoteChar || '"',
            s = i && i.matchInMiddle;
        if (a) {
            var c = n.getCursor(),
                u = n.getTokenAt(c);
            if (u.end > c.ch && (u.end = c.ch, u.string = u.string.slice(0, c.ch - u.start)), (k = e.innerMode(n.getMode(), u.state)).mode.xmlCurrentTag) {
                var d, f, h = [],
                    p = !1,
                    m = /\btag\b/.test(u.type) && !/>$/.test(u.string),
                    g = m && /^\w/.test(u.string);
                if (g) {
                    var v = n.getLine(c.line).slice(Math.max(0, u.start - 2), u.start),
                        y = /<\/$/.test(v) ? "close" : /<$/.test(v) ? "open" : null;
                    y && (f = u.start - ("close" == y ? 2 : 1))
                } else m && "<" == u.string ? y = "open" : m && "</" == u.string && (y = "close");
                var b = k.mode.xmlCurrentTag(k.state);
                if (!m && !b || y) {
                    g && (d = u.string), p = y;
                    var k, x = k.mode.xmlCurrentContext ? k.mode.xmlCurrentContext(k.state) : [],
                        w = (k = x.length && x[x.length - 1]) && a[k],
                        C = k ? w && w.children : a["!top"];
                    if (C && "close" != y)
                        for (var S = 0; S < C.length; ++S) d && !t(C[S], d, s) || h.push("<" + C[S]);
                    else if ("close" != y)
                        for (var L in a) !a.hasOwnProperty(L) || "!top" == L || "!attrs" == L || d && !t(L, d, s) || h.push("<" + L);
                    k && (!d || "close" == y && t(k, d, s)) && h.push("</" + k + ">")
                } else {
                    var T = (w = b && a[b.name]) && w.attrs,
                        M = a["!attrs"];
                    if (!T && !M) return;
                    if (T) {
                        if (M) {
                            var A = {};
                            for (var z in M) M.hasOwnProperty(z) && (A[z] = M[z]);
                            for (var z in T) T.hasOwnProperty(z) && (A[z] = T[z]);
                            T = A
                        }
                    } else T = M;
                    if ("string" == u.type || "=" == u.string) {
                        var O, F = (v = n.getRange(r(c.line, Math.max(0, c.ch - 60)), r(c.line, "string" == u.type ? u.start : u.end))).match(/([^\s\u00a0=<>\"\']+)=$/);
                        if (!F || !T.hasOwnProperty(F[1]) || !(O = T[F[1]])) return;
                        if ("function" == typeof O && (O = O.call(this, n)), "string" == u.type) {
                            d = u.string;
                            var E = 0;
                            /['"]/.test(u.string.charAt(0)) && (l = u.string.charAt(0), d = u.string.slice(1), E++);
                            var N = u.string.length;
                            if (/['"]/.test(u.string.charAt(N - 1)) && (l = u.string.charAt(N - 1), d = u.string.substr(E, N - 2)), E) {
                                var D = n.getLine(c.line);
                                D.length > u.end && D.charAt(u.end) == l && u.end++
                            }
                            p = !0
                        }
                        var P = function(e) {
                            if (e)
                                for (var n = 0; n < e.length; ++n) d && !t(e[n], d, s) || h.push(l + e[n] + l);
                            return o()
                        };
                        return O && O.then ? O.then(P) : P(O)
                    }
                    for (var I in "attribute" == u.type && (d = u.string, p = !0), T) !T.hasOwnProperty(I) || d && !t(I, d, s) || h.push(I)
                }
                return o()
            }
        }
    }
    var r = e.Pos;
    e.registerHelper("hint", "xml", n)
})),
function(e) {
    "object" == typeof exports && "object" == typeof module ? e(require("../../lib/codemirror")) : "function" == typeof define && define.amd ? define(["../../lib/codemirror"], e) : e(CodeMirror)
}((function(e) {
    "use strict";
    e.overlayMode = function(t, n, r) {
        return {
            startState: function() {
                return {
                    base: e.startState(t),
                    overlay: e.startState(n),
                    basePos: 0,
                    baseCur: null,
                    overlayPos: 0,
                    overlayCur: null,
                    streamSeen: null
                }
            },
            copyState: function(r) {
                return {
                    base: e.copyState(t, r.base),
                    overlay: e.copyState(n, r.overlay),
                    basePos: r.basePos,
                    baseCur: null,
                    overlayPos: r.overlayPos,
                    overlayCur: null
                }
            },
            token: function(e, i) {
                return (e != i.streamSeen || Math.min(i.basePos, i.overlayPos) < e.start) && (i.streamSeen = e, i.basePos = i.overlayPos = e.start), e.start == i.basePos && (i.baseCur = t.token(e, i.base), i.basePos = e.pos), e.start == i.overlayPos && (e.pos = e.start, i.overlayCur = n.token(e, i.overlay), i.overlayPos = e.pos), e.pos = Math.min(i.basePos, i.overlayPos), null == i.overlayCur ? i.baseCur : null != i.baseCur && i.overlay.combineTokens || r && null == i.overlay.combineTokens ? i.baseCur + " " + i.overlayCur : i.overlayCur
            },
            indent: t.indent && function(e, n, r) {
                return t.indent(e.base, n, r)
            },
            electricChars: t.electricChars,
            innerMode: function(e) {
                return {
                    state: e.base,
                    mode: t
                }
            },
            blankLine: function(e) {
                var i, o;
                return t.blankLine && (i = t.blankLine(e.base)), n.blankLine && (o = n.blankLine(e.overlay)), null == o ? i : r && null != i ? i + " " + o : o
            }
        }
    }
})),
function(e) {
    "object" == typeof exports && "object" == typeof module ? e(require("../../lib/codemirror")) : "function" == typeof define && define.amd ? define(["../../lib/codemirror"], e) : e(CodeMirror)
}((function(e) {
    "use strict";
    e.runMode = function(t, n, r, i) {
        var o = e.getMode(e.defaults, n),
            a = i && i.tabSize || e.defaults.tabSize;
        if (r.appendChild) {
            var l = /MSIE \d/.test(navigator.userAgent) && (null == document.documentMode || document.documentMode < 9),
                s = r,
                c = 0;
            s.innerHTML = "", r = function(e, t) {
                if ("\n" == e) return s.appendChild(document.createTextNode(l ? "\r" : e)), void(c = 0);
                for (var n = "", r = 0;;) {
                    var i = e.indexOf("\t", r);
                    if (-1 == i) {
                        n += e.slice(r), c += e.length - r;
                        break
                    }
                    c += i - r, n += e.slice(r, i);
                    var o = a - c % a;
                    c += o;
                    for (var u = 0; u < o; ++u) n += " ";
                    r = i + 1
                }
                if (t) {
                    var d = s.appendChild(document.createElement("span"));
                    d.className = "cm-" + t.replace(/ +/g, " cm-"), d.appendChild(document.createTextNode(n))
                } else s.appendChild(document.createTextNode(n))
            }
        }
        for (var u = e.splitLines(t), d = i && i.state || e.startState(o), f = 0, h = u.length; f < h; ++f) {
            f && r("\n");
            var p = new e.StringStream(u[f], null, {
                lookAhead: function(e) {
                    return u[f + e]
                },
                baseToken: function() {}
            });
            for (!p.string && o.blankLine && o.blankLine(d); !p.eol();) {
                var m = o.token(p, d);
                r(p.current(), m, f, p.start, d, o), p.start = p.pos
            }
        }
    }
})),
function(e) {
    "object" == typeof exports && "object" == typeof module ? e(require("../../lib/codemirror")) : "function" == typeof define && define.amd ? define(["../../lib/codemirror"], e) : e(CodeMirror)
}((function(e) {
    "use strict";

    function t(t, r) {
        e.changeEnd(r).line == t.lastLine() && n(t)
    }

    function n(e) {
        var t = "";
        e.lineCount() > 1 && (t = e.display.scroller.clientHeight - 30 - e.getLineHandle(e.lastLine()).height + "px");
        e.state.scrollPastEndPadding != t && (e.state.scrollPastEndPadding = t, e.display.lineSpace.parentNode.style.paddingBottom = t, e.off("refresh", n), e.setSize(), e.on("refresh", n))
    }
    e.defineOption("scrollPastEnd", !1, (function(r, i, o) {
        o && o != e.Init && (r.off("change", t), r.off("refresh", n), r.display.lineSpace.parentNode.style.paddingBottom = "", r.state.scrollPastEndPadding = null), i && (r.on("change", t), r.on("refresh", n), n(r))
    }))
})),
function(e) {
    "object" == typeof exports && "object" == typeof module ? e(require("../../lib/codemirror")) : "function" == typeof define && define.amd ? define(["../../lib/codemirror"], e) : e(CodeMirror)
}((function(e) {
    "use strict";

    function t(t, n, r) {
        function i(t) {
            var n = e.wheelEventPixels(t)["horizontal" == o.orientation ? "x" : "y"],
                r = o.pos;
            o.moveTo(o.pos + n), o.pos != r && e.e_preventDefault(t)
        }
        this.orientation = n, this.scroll = r, this.screen = this.total = this.size = 1, this.pos = 0, this.node = document.createElement("div"), this.node.className = t + "-" + n, this.inner = this.node.appendChild(document.createElement("div"));
        var o = this;
        e.on(this.inner, "mousedown", (function(t) {
            function n() {
                e.off(document, "mousemove", r), e.off(document, "mouseup", n)
            }

            function r(e) {
                if (1 != e.which) return n();
                o.moveTo(l + (e[i] - a) * (o.total / o.size))
            }
            if (1 == t.which) {
                e.e_preventDefault(t);
                var i = "horizontal" == o.orientation ? "pageX" : "pageY",
                    a = t[i],
                    l = o.pos;
                e.on(document, "mousemove", r), e.on(document, "mouseup", n)
            }
        })), e.on(this.node, "click", (function(t) {
            e.e_preventDefault(t);
            var n, r = o.inner.getBoundingClientRect();
            n = "horizontal" == o.orientation ? t.clientX < r.left ? -1 : t.clientX > r.right ? 1 : 0 : t.clientY < r.top ? -1 : t.clientY > r.bottom ? 1 : 0, o.moveTo(o.pos + n * o.screen)
        })), e.on(this.node, "mousewheel", i), e.on(this.node, "DOMMouseScroll", i)
    }

    function n(e, n, r) {
        this.addClass = e, this.horiz = new t(e, "horizontal", r), n(this.horiz.node), this.vert = new t(e, "vertical", r), n(this.vert.node), this.width = null
    }
    t.prototype.setPos = function(e, t) {
        return e < 0 && (e = 0), e > this.total - this.screen && (e = this.total - this.screen), !(!t && e == this.pos) && (this.pos = e, this.inner.style["horizontal" == this.orientation ? "left" : "top"] = e * (this.size / this.total) + "px", !0)
    }, t.prototype.moveTo = function(e) {
        this.setPos(e) && this.scroll(e, this.orientation)
    };
    var r = 10;
    t.prototype.update = function(e, t, n) {
        var i = this.screen != t || this.total != e || this.size != n;
        i && (this.screen = t, this.total = e, this.size = n);
        var o = this.screen * (this.size / this.total);
        o < r && (this.size -= r - o, o = r), this.inner.style["horizontal" == this.orientation ? "width" : "height"] = o + "px", this.setPos(this.pos, i)
    }, n.prototype.update = function(e) {
        if (null == this.width) {
            var t = window.getComputedStyle ? window.getComputedStyle(this.horiz.node) : this.horiz.node.currentStyle;
            t && (this.width = parseInt(t.height))
        }
        var n = this.width || 0,
            r = e.scrollWidth > e.clientWidth + 1,
            i = e.scrollHeight > e.clientHeight + 1;
        return this.vert.node.style.display = i ? "block" : "none", this.horiz.node.style.display = r ? "block" : "none", i && (this.vert.update(e.scrollHeight, e.clientHeight, e.viewHeight - (r ? n : 0)), this.vert.node.style.bottom = r ? n + "px" : "0"), r && (this.horiz.update(e.scrollWidth, e.clientWidth, e.viewWidth - (i ? n : 0) - e.barLeft), this.horiz.node.style.right = i ? n + "px" : "0", this.horiz.node.style.left = e.barLeft + "px"), {
            right: i ? n : 0,
            bottom: r ? n : 0
        }
    }, n.prototype.setScrollTop = function(e) {
        this.vert.setPos(e)
    }, n.prototype.setScrollLeft = function(e) {
        this.horiz.setPos(e)
    }, n.prototype.clear = function() {
        var e = this.horiz.node.parentNode;
        e.removeChild(this.horiz.node), e.removeChild(this.vert.node)
    }, e.scrollbarModel.simple = function(e, t) {
        return new n("CodeMirror-simplescroll", e, t)
    }, e.scrollbarModel.overlay = function(e, t) {
        return new n("CodeMirror-overlayscroll", e, t)
    }
})),
function(e) {
    "object" == typeof exports && "object" == typeof module ? e(require("../../lib/codemirror"), require("../dialog/dialog")) : "function" == typeof define && define.amd ? define(["../../lib/codemirror", "../dialog/dialog"], e) : e(CodeMirror)
}((function(e) {
    "use strict";

    function t(e, t, n, r, i) {
        e.openDialog ? e.openDialog(t, i, {
            value: r,
            selectValueOnOpen: !0,
            bottom: e.options.search.bottom
        }) : i(prompt(n, r))
    }

    function n(e) {
        return e.phrase("Jump to line:") + ' <input type="text" style="width: 10em" class="CodeMirror-search-field"/> <span style="color: #888" class="CodeMirror-search-hint">' + e.phrase("(Use line:column or scroll% syntax)") + "</span>"
    }

    function r(e, t) {
        var n = Number(t);
        return /^[-+]/.test(t) ? e.getCursor().line + n : n - 1
    }
    e.defineOption("search", {
        bottom: !1
    }), e.commands.jumpToLine = function(e) {
        var i = e.getCursor();
        t(e, n(e), e.phrase("Jump to line:"), i.line + 1 + ":" + i.ch, (function(t) {
            var n;
            if (t)
                if (n = /^\s*([\+\-]?\d+)\s*\:\s*(\d+)\s*$/.exec(t)) e.setCursor(r(e, n[1]), Number(n[2]));
                else if (n = /^\s*([\+\-]?\d+(\.\d+)?)\%\s*/.exec(t)) {
                var o = Math.round(e.lineCount() * Number(n[1]) / 100);
                /^[-+]/.test(n[1]) && (o = i.line + o + 1), e.setCursor(o - 1, i.ch)
            } else(n = /^\s*\:?\s*([\+\-]?\d+)\s*/.exec(t)) && e.setCursor(r(e, n[1]), i.ch)
        }))
    }, e.keyMap.default["Alt-G"] = "jumpToLine"
})),
function(e) {
    "object" == typeof exports && "object" == typeof module ? e(require("../../lib/codemirror"), require("./searchcursor"), require("../dialog/dialog")) : "function" == typeof define && define.amd ? define(["../../lib/codemirror", "./searchcursor", "../dialog/dialog"], e) : e(CodeMirror)
}((function(e) {
    "use strict";

    function t(e, t) {
        return "string" == typeof e ? e = new RegExp(e.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&"), t ? "gi" : "g") : e.global || (e = new RegExp(e.source, e.ignoreCase ? "gi" : "g")), {
            token: function(t) {
                e.lastIndex = t.pos;
                var n = e.exec(t.string);
                if (n && n.index == t.pos) return t.pos += n[0].length || 1, "searching";
                n ? t.pos = n.index : t.skipToEnd()
            }
        }
    }

    function n() {
        this.posFrom = this.posTo = this.lastQuery = this.query = null, this.overlay = null
    }

    function r(e) {
        return e.state.search || (e.state.search = new n)
    }

    function i(e) {
        return "string" == typeof e && e == e.toLowerCase()
    }

    function o(e, t, n) {
        return e.getSearchCursor(t, n, {
            caseFold: i(t),
            multiline: !0
        })
    }

    function a(e, t, n, r, i) {
        e.openDialog(t, r, {
            value: n,
            selectValueOnOpen: !0,
            closeOnEnter: !1,
            onClose: function() {
                p(e)
            },
            onKeyDown: i,
            bottom: e.options.search.bottom
        })
    }

    function l(e, t, n, r, i) {
        e.openDialog ? e.openDialog(t, i, {
            value: r,
            selectValueOnOpen: !0,
            bottom: e.options.search.bottom
        }) : i(prompt(n, r))
    }

    function s(e, t, n, r) {
        e.openConfirm ? e.openConfirm(t, r) : confirm(n) && r[0]()
    }

    function c(e) {
        return e.replace(/\\([nrt\\])/g, (function(e, t) {
            return "n" == t ? "\n" : "r" == t ? "\r" : "t" == t ? "\t" : "\\" == t ? "\\" : e
        }))
    }

    function u(e) {
        var t = e.match(/^\/(.*)\/([a-z]*)$/);
        if (t) try {
            e = new RegExp(t[1], -1 == t[2].indexOf("i") ? "" : "i")
        } catch (e) {} else e = c(e);
        return ("string" == typeof e ? "" == e : e.test("")) && (e = /x^/), e
    }

    function d(e, n, r) {
        n.queryText = r, n.query = u(r), e.removeOverlay(n.overlay, i(n.query)), n.overlay = t(n.query, i(n.query)), e.addOverlay(n.overlay), e.showMatchesOnScrollbar && (n.annotate && (n.annotate.clear(), n.annotate = null), n.annotate = e.showMatchesOnScrollbar(n.query, i(n.query)))
    }

    function f(t, n, i, o) {
        var s = r(t);
        if (s.query) return h(t, n);
        var c = t.getSelection() || s.lastQuery;
        if (c instanceof RegExp && "x^" == c.source && (c = null), i && t.openDialog) {
            var u = null,
                f = function(n, r) {
                    e.e_stop(r), n && (n != s.queryText && (d(t, s, n), s.posFrom = s.posTo = t.getCursor()), u && (u.style.opacity = 1), h(t, r.shiftKey, (function(e, n) {
                        var r;
                        n.line < 3 && document.querySelector && (r = t.display.wrapper.querySelector(".CodeMirror-dialog")) && r.getBoundingClientRect().bottom - 4 > t.cursorCoords(n, "window").top && ((u = r).style.opacity = .4)
                    })))
                };
            a(t, g(t), c, f, (function(n, i) {
                var o = e.keyName(n),
                    a = t.getOption("extraKeys"),
                    l = a && a[o] || e.keyMap[t.getOption("keyMap")][o];
                "findNext" == l || "findPrev" == l || "findPersistentNext" == l || "findPersistentPrev" == l ? (e.e_stop(n), d(t, r(t), i), t.execCommand(l)) : "find" != l && "findPersistent" != l || (e.e_stop(n), f(i, n))
            })), o && c && (d(t, s, c), h(t, n))
        } else l(t, g(t), "Search for:", c, (function(e) {
            e && !s.query && t.operation((function() {
                d(t, s, e), s.posFrom = s.posTo = t.getCursor(), h(t, n)
            }))
        }))
    }

    function h(t, n, i) {
        t.operation((function() {
            var a = r(t),
                l = o(t, a.query, n ? a.posFrom : a.posTo);
            (l.find(n) || (l = o(t, a.query, n ? e.Pos(t.lastLine()) : e.Pos(t.firstLine(), 0))).find(n)) && (t.setSelection(l.from(), l.to()), t.scrollIntoView({
                from: l.from(),
                to: l.to()
            }, 20), a.posFrom = l.from(), a.posTo = l.to(), i && i(l.from(), l.to()))
        }))
    }

    function p(e) {
        e.operation((function() {
            var t = r(e);
            t.lastQuery = t.query, t.query && (t.query = t.queryText = null, e.removeOverlay(t.overlay), t.annotate && (t.annotate.clear(), t.annotate = null))
        }))
    }

    function m(e, t) {
        var n = e ? document.createElement(e) : document.createDocumentFragment();
        for (var r in t) n[r] = t[r];
        for (var i = 2; i < arguments.length; i++) {
            var o = arguments[i];
            n.appendChild("string" == typeof o ? document.createTextNode(o) : o)
        }
        return n
    }

    function g(e) {
        return m("", null, m("span", {
            className: "CodeMirror-search-label"
        }, e.phrase("Search:")), " ", m("input", {
            type: "text",
            style: "width: 10em",
            className: "CodeMirror-search-field"
        }), " ", m("span", {
            style: "color: #888",
            className: "CodeMirror-search-hint"
        }, e.phrase("(Use /re/ syntax for regexp search)")))
    }

    function v(e) {
        return m("", null, " ", m("input", {
            type: "text",
            style: "width: 10em",
            className: "CodeMirror-search-field"
        }), " ", m("span", {
            style: "color: #888",
            className: "CodeMirror-search-hint"
        }, e.phrase("(Use /re/ syntax for regexp search)")))
    }

    function y(e) {
        return m("", null, m("span", {
            className: "CodeMirror-search-label"
        }, e.phrase("With:")), " ", m("input", {
            type: "text",
            style: "width: 10em",
            className: "CodeMirror-search-field"
        }))
    }

    function b(e) {
        return m("", null, m("span", {
            className: "CodeMirror-search-label"
        }, e.phrase("Replace?")), " ", m("button", {}, e.phrase("Yes")), " ", m("button", {}, e.phrase("No")), " ", m("button", {}, e.phrase("All")), " ", m("button", {}, e.phrase("Stop")))
    }

    function k(e, t, n) {
        e.operation((function() {
            for (var r = o(e, t); r.findNext();)
                if ("string" != typeof t) {
                    var i = e.getRange(r.from(), r.to()).match(t);
                    r.replace(n.replace(/\$(\d)/g, (function(e, t) {
                        return i[t]
                    })))
                } else r.replace(n)
        }))
    }

    function x(e, t) {
        if (!e.getOption("readOnly")) {
            var n = e.getSelection() || r(e).lastQuery,
                i = t ? e.phrase("Replace all:") : e.phrase("Replace:"),
                a = m("", null, m("span", {
                    className: "CodeMirror-search-label"
                }, i), v(e));
            l(e, a, i, n, (function(n) {
                n && (n = u(n), l(e, y(e), e.phrase("Replace with:"), "", (function(r) {
                    if (r = c(r), t) k(e, n, r);
                    else {
                        p(e);
                        var i = o(e, n, e.getCursor("from")),
                            a = function() {
                                var t, c = i.from();
                                !(t = i.findNext()) && (i = o(e, n), !(t = i.findNext()) || c && i.from().line == c.line && i.from().ch == c.ch) || (e.setSelection(i.from(), i.to()), e.scrollIntoView({
                                    from: i.from(),
                                    to: i.to()
                                }), s(e, b(e), e.phrase("Replace?"), [function() {
                                    l(t)
                                }, a, function() {
                                    k(e, n, r)
                                }]))
                            },
                            l = function(e) {
                                i.replace("string" == typeof n ? r : r.replace(/\$(\d)/g, (function(t, n) {
                                    return e[n]
                                }))), a()
                            };
                        a()
                    }
                })))
            }))
        }
    }
    e.defineOption("search", {
        bottom: !1
    }), e.commands.find = function(e) {
        p(e), f(e)
    }, e.commands.findPersistent = function(e) {
        p(e), f(e, !1, !0)
    }, e.commands.findPersistentNext = function(e) {
        f(e, !1, !0, !0)
    }, e.commands.findPersistentPrev = function(e) {
        f(e, !0, !0, !0)
    }, e.commands.findNext = f, e.commands.findPrev = function(e) {
        f(e, !0)
    }, e.commands.clearSearch = p, e.commands.replace = x, e.commands.replaceAll = function(e) {
        x(e, !0)
    }
})),
function(e) {
    "object" == typeof exports && "object" == typeof module ? e(require("../../lib/codemirror")) : "function" == typeof define && define.amd ? define(["../../lib/codemirror"], e) : e(CodeMirror)
}((function(e) {
    "use strict";

    function t(e) {
        var t = e.flags;
        return null != t ? t : (e.ignoreCase ? "i" : "") + (e.global ? "g" : "") + (e.multiline ? "m" : "")
    }

    function n(e, n) {
        for (var r = t(e), i = r, o = 0; o < n.length; o++) - 1 == i.indexOf(n.charAt(o)) && (i += n.charAt(o));
        return r == i ? e : new RegExp(e.source, i)
    }

    function r(e) {
        return /\\s|\\n|\n|\\W|\\D|\[\^/.test(e.source)
    }

    function i(e, t, r) {
        t = n(t, "g");
        for (var i = r.line, o = r.ch, a = e.lastLine(); i <= a; i++, o = 0) {
            t.lastIndex = o;
            var l = e.getLine(i),
                s = t.exec(l);
            if (s) return {
                from: m(i, s.index),
                to: m(i, s.index + s[0].length),
                match: s
            }
        }
    }

    function o(e, t, o) {
        if (!r(t)) return i(e, t, o);
        t = n(t, "gm");
        for (var a, l = 1, s = o.line, c = e.lastLine(); s <= c;) {
            for (var u = 0; u < l && !(s > c); u++) {
                var d = e.getLine(s++);
                a = null == a ? d : a + "\n" + d
            }
            l *= 2, t.lastIndex = o.ch;
            var f = t.exec(a);
            if (f) {
                var h = a.slice(0, f.index).split("\n"),
                    p = f[0].split("\n"),
                    g = o.line + h.length - 1,
                    v = h[h.length - 1].length;
                return {
                    from: m(g, v),
                    to: m(g + p.length - 1, 1 == p.length ? v + p[0].length : p[p.length - 1].length),
                    match: f
                }
            }
        }
    }

    function a(e, t, n) {
        for (var r, i = 0; i <= e.length;) {
            t.lastIndex = i;
            var o = t.exec(e);
            if (!o) break;
            var a = o.index + o[0].length;
            if (a > e.length - n) break;
            (!r || a > r.index + r[0].length) && (r = o), i = o.index + 1
        }
        return r
    }

    function l(e, t, r) {
        t = n(t, "g");
        for (var i = r.line, o = r.ch, l = e.firstLine(); i >= l; i--, o = -1) {
            var s = e.getLine(i),
                c = a(s, t, o < 0 ? 0 : s.length - o);
            if (c) return {
                from: m(i, c.index),
                to: m(i, c.index + c[0].length),
                match: c
            }
        }
    }

    function s(e, t, i) {
        if (!r(t)) return l(e, t, i);
        t = n(t, "gm");
        for (var o, s = 1, c = e.getLine(i.line).length - i.ch, u = i.line, d = e.firstLine(); u >= d;) {
            for (var f = 0; f < s && u >= d; f++) {
                var h = e.getLine(u--);
                o = null == o ? h : h + "\n" + o
            }
            s *= 2;
            var p = a(o, t, c);
            if (p) {
                var g = o.slice(0, p.index).split("\n"),
                    v = p[0].split("\n"),
                    y = u + g.length,
                    b = g[g.length - 1].length;
                return {
                    from: m(y, b),
                    to: m(y + v.length - 1, 1 == v.length ? b + v[0].length : v[v.length - 1].length),
                    match: p
                }
            }
        }
    }

    function c(e, t, n, r) {
        if (e.length == t.length) return n;
        for (var i = 0, o = n + Math.max(0, e.length - t.length);;) {
            if (i == o) return i;
            var a = i + o >> 1,
                l = r(e.slice(0, a)).length;
            if (l == n) return a;
            l > n ? o = a : i = a + 1
        }
    }

    function u(e, t, n, r) {
        if (!t.length) return null;
        var i = r ? h : p,
            o = i(t).split(/\r|\n\r?/);
        e: for (var a = n.line, l = n.ch, s = e.lastLine() + 1 - o.length; a <= s; a++, l = 0) {
            var u = e.getLine(a).slice(l),
                d = i(u);
            if (1 == o.length) {
                var f = d.indexOf(o[0]);
                if (-1 == f) continue e;
                n = c(u, d, f, i) + l;
                return {
                    from: m(a, c(u, d, f, i) + l),
                    to: m(a, c(u, d, f + o[0].length, i) + l)
                }
            }
            var g = d.length - o[0].length;
            if (d.slice(g) == o[0]) {
                for (var v = 1; v < o.length - 1; v++)
                    if (i(e.getLine(a + v)) != o[v]) continue e;
                var y = e.getLine(a + o.length - 1),
                    b = i(y),
                    k = o[o.length - 1];
                if (b.slice(0, k.length) == k) return {
                    from: m(a, c(u, d, g, i) + l),
                    to: m(a + o.length - 1, c(y, b, k.length, i))
                }
            }
        }
    }

    function d(e, t, n, r) {
        if (!t.length) return null;
        var i = r ? h : p,
            o = i(t).split(/\r|\n\r?/);
        e: for (var a = n.line, l = n.ch, s = e.firstLine() - 1 + o.length; a >= s; a--, l = -1) {
            var u = e.getLine(a);
            l > -1 && (u = u.slice(0, l));
            var d = i(u);
            if (1 == o.length) {
                var f = d.lastIndexOf(o[0]);
                if (-1 == f) continue e;
                return {
                    from: m(a, c(u, d, f, i)),
                    to: m(a, c(u, d, f + o[0].length, i))
                }
            }
            var g = o[o.length - 1];
            if (d.slice(0, g.length) == g) {
                var v = 1;
                for (n = a - o.length + 1; v < o.length - 1; v++)
                    if (i(e.getLine(n + v)) != o[v]) continue e;
                var y = e.getLine(a + 1 - o.length),
                    b = i(y);
                if (b.slice(b.length - o[0].length) == o[0]) return {
                    from: m(a + 1 - o.length, c(y, b, y.length - o[0].length, i)),
                    to: m(a, c(u, d, g.length, i))
                }
            }
        }
    }

    function f(e, t, r, a) {
        var c;
        this.atOccurrence = !1, this.afterEmptyMatch = !1, this.doc = e, r = r ? e.clipPos(r) : m(0, 0), this.pos = {
            from: r,
            to: r
        }, "object" == typeof a ? c = a.caseFold : (c = a, a = null), "string" == typeof t ? (null == c && (c = !1), this.matches = function(n, r) {
            return (n ? d : u)(e, t, r, c)
        }) : (t = n(t, "gm"), a && !1 === a.multiline ? this.matches = function(n, r) {
            return (n ? l : i)(e, t, r)
        } : this.matches = function(n, r) {
            return (n ? s : o)(e, t, r)
        })
    }
    var h, p, m = e.Pos;
    String.prototype.normalize ? (h = function(e) {
        return e.normalize("NFD").toLowerCase()
    }, p = function(e) {
        return e.normalize("NFD")
    }) : (h = function(e) {
        return e.toLowerCase()
    }, p = function(e) {
        return e
    }), f.prototype = {
        findNext: function() {
            return this.find(!1)
        },
        findPrevious: function() {
            return this.find(!0)
        },
        find: function(t) {
            var n = this.doc.clipPos(t ? this.pos.from : this.pos.to);
            if (this.afterEmptyMatch && this.atOccurrence && (n = m(n.line, n.ch), t ? (n.ch--, n.ch < 0 && (n.line--, n.ch = (this.doc.getLine(n.line) || "").length)) : (n.ch++, n.ch > (this.doc.getLine(n.line) || "").length && (n.ch = 0, n.line++)), 0 != e.cmpPos(n, this.doc.clipPos(n)))) return this.atOccurrence = !1;
            var r = this.matches(t, n);
            if (this.afterEmptyMatch = r && 0 == e.cmpPos(r.from, r.to), r) return this.pos = r, this.atOccurrence = !0, this.pos.match || !0;
            var i = m(t ? this.doc.firstLine() : this.doc.lastLine() + 1, 0);
            return this.pos = {
                from: i,
                to: i
            }, this.atOccurrence = !1
        },
        from: function() {
            if (this.atOccurrence) return this.pos.from
        },
        to: function() {
            if (this.atOccurrence) return this.pos.to
        },
        replace: function(t, n) {
            if (this.atOccurrence) {
                var r = e.splitLines(t);
                this.doc.replaceRange(r, this.pos.from, this.pos.to, n), this.pos.to = m(this.pos.from.line + r.length - 1, r[r.length - 1].length + (1 == r.length ? this.pos.from.ch : 0))
            }
        }
    }, e.defineExtension("getSearchCursor", (function(e, t, n) {
        return new f(this.doc, e, t, n)
    })), e.defineDocExtension("getSearchCursor", (function(e, t, n) {
        return new f(this, e, t, n)
    })), e.defineExtension("selectMatches", (function(t, n) {
        for (var r = [], i = this.getSearchCursor(t, this.getCursor("from"), n); i.findNext() && !(e.cmpPos(i.to(), this.getCursor("to")) > 0);) r.push({
            anchor: i.from(),
            head: i.to()
        });
        r.length && this.setSelections(r, 0)
    }))
})),
function(e) {
    "object" == typeof exports && "object" == typeof module ? e(require("../../lib/codemirror")) : "function" == typeof define && define.amd ? define(["../../lib/codemirror"], e) : e(CodeMirror)
}((function(e) {
    "use strict";

    function t(e, t, n) {
        for (var r = n.paragraphStart || e.getHelper(t, "paragraphStart"), i = t.line, o = e.firstLine(); i > o; --i) {
            var a = e.getLine(i);
            if (r && r.test(a)) break;
            if (!/\S/.test(a)) {
                ++i;
                break
            }
        }
        for (var l = n.paragraphEnd || e.getHelper(t, "paragraphEnd"), s = t.line + 1, c = e.lastLine(); s <= c; ++s) {
            a = e.getLine(s);
            if (l && l.test(a)) {
                ++s;
                break
            }
            if (!/\S/.test(a)) break
        }
        return {
            from: i,
            to: s
        }
    }

    function n(e, t, n, r, i) {
        for (var o = t; o < e.length && " " == e.charAt(o);) o++;
        for (; o > 0 && !n.test(e.slice(o - 1, o + 1)); --o);
        if (!i && o <= e.match(/^[ \t]*/)[0].length)
            for (o = t + 1; o < e.length - 1 && !n.test(e.slice(o - 1, o + 1)); ++o);
        for (var a = !0;; a = !1) {
            var l = o;
            if (r)
                for (;
                    " " == e.charAt(l - 1);) --l;
            if (0 != l || !a) return {
                from: l,
                to: o
            };
            o = t
        }
    }

    function r(t, r, o, a) {
        r = t.clipPos(r), o = t.clipPos(o);
        var l = a.column || 80,
            s = a.wrapOn || /\s\S|-[^\.\d]/,
            c = !1 !== a.forceBreak,
            u = !1 !== a.killTrailingSpace,
            d = [],
            f = "",
            h = r.line,
            p = t.getRange(r, o, !1);
        if (!p.length) return null;
        var m = p[0].match(/^[ \t]*/)[0];
        m.length >= l && (l = m.length + 1);
        for (var g = 0; g < p.length; ++g) {
            var v = p[g],
                y = f.length,
                b = 0;
            f && v && !s.test(f.charAt(f.length - 1) + v.charAt(0)) && (f += " ", b = 1);
            var k = "";
            if (g && (k = v.match(/^\s*/)[0], v = v.slice(k.length)), f += v, g) {
                var x = f.length > l && m == k && n(f, l, s, u, c);
                x && x.from == y && x.to == y + b ? (f = m + v, ++h) : d.push({
                    text: [b ? " " : ""],
                    from: i(h, y),
                    to: i(h + 1, k.length)
                })
            }
            for (; f.length > l;) {
                var w = n(f, l, s, u, c);
                if (!(w.from != w.to || c && m !== f.slice(0, w.to))) break;
                d.push({
                    text: ["", m],
                    from: i(h, w.from),
                    to: i(h, w.to)
                }), f = m + f.slice(w.to), ++h
            }
        }
        return d.length && t.operation((function() {
            for (var n = 0; n < d.length; ++n) {
                var r = d[n];
                (r.text || e.cmpPos(r.from, r.to)) && t.replaceRange(r.text, r.from, r.to)
            }
        })), d.length ? {
            from: d[0].from,
            to: e.changeEnd(d[d.length - 1])
        } : null
    }
    var i = e.Pos;
    e.defineExtension("wrapParagraph", (function(e, n) {
        n = n || {}, e || (e = this.getCursor());
        var o = t(this, e, n);
        return r(this, i(o.from, 0), i(o.to - 1), n)
    })), e.commands.wrapLines = function(e) {
        e.operation((function() {
            for (var n = e.listSelections(), o = e.lastLine() + 1, a = n.length - 1; a >= 0; a--) {
                var l, s = n[a];
                if (s.empty()) {
                    var c = t(e, s.head, {});
                    l = {
                        from: i(c.from, 0),
                        to: i(c.to - 1)
                    }
                } else l = {
                    from: s.from(),
                    to: s.to()
                };
                l.to.line >= o || (o = l.from.line, r(e, l.from, l.to, {}))
            }
        }))
    }, e.defineExtension("wrapRange", (function(e, t, n) {
        return r(this, e, t, n || {})
    })), e.defineExtension("wrapParagraphsInRange", (function(e, n, o) {
        o = o || {};
        for (var a = this, l = [], s = e.line; s <= n.line;) {
            var c = t(a, i(s, 0), o);
            l.push(c), s = c.to
        }
        var u = !1;
        return l.length && a.operation((function() {
            for (var e = l.length - 1; e >= 0; --e) u = u || r(a, i(l[e].from, 0), i(l[e].to - 1), o)
        })), u
    }))
})),
function(e) {
    "object" == typeof exports && "object" == typeof module ? e(require("../lib/codemirror")) : "function" == typeof define && define.amd ? define(["../lib/codemirror"], e) : e(CodeMirror)
}((function(e) {
    "use strict";

    function t(e) {
        l = e.getModeAt({
            line: 0,
            ch: 0
        }), s = l.helperType || l.name, c = u.cmModeToType(s)
    }

    function n(e) {
        var t = i(),
            n = o(),
            r = {
                indent: !0,
                lineComment: t,
                blockCommentStart: n.start,
                blockCommentEnd: n.end
            };
        e.toggleComment(r)
    }

    function r(e) {
        var t = o(),
            n = i(),
            r = a(),
            l = {
                fullLines: !(t.end && " " !== t.end),
                lineComment: n,
                blockCommentStart: t.start,
                blockCommentEnd: t.end,
                blockCommentIndent: r
            };
        e.toggleBlockComment(l)
    }

    function i() {
        var e = l.lineComment || null;
        switch (c) {
            case "html":
                switch (s) {
                    case "slim":
                        return "/";
                    case "haml":
                        return "-#";
                    case "pug":
                        return "//-"
                }
                break;
            case "css":
                switch (s) {
                    case "scss":
                    case "sass":
                    case "less":
                    case "stylus":
                        return "//"
                }
                break;
            case "js":
                switch (s) {
                    case "coffeescript":
                    case "livescript":
                        return "#";
                    default:
                        return "//"
                }
        }
        return e
    }

    function o() {
        var e = l.blockCommentStart || "/*",
            t = l.blockCommentEnd || "*/";
        switch (c) {
            case "html":
                switch (s) {
                    case "slim":
                        return {
                            start: "/! ",
                            end: " "
                        };
                    case "haml":
                        return {
                            start: "/ ",
                            end: " "
                        };
                    case "pug":
                        return {
                            start: "// ",
                            end: " "
                        };
                    default:
                        return {
                            start: "<!--",
                            end: "-->"
                        }
                }
            case "js":
                if ("coffeescript" === s) return {
                    start: "###",
                    end: "###"
                }
        }
        return {
            start: e,
            end: t
        }
    }

    function a() {
        if ("html" !== c) return !1;
        switch (s) {
            case "slim":
            case "haml":
            case "pug":
                return !0;
            default:
                return !1
        }
    }
    var l, s, c, u = {
            _HTML_TYPES: ["html", "xml", "haml", "markdown", "slim", "pug", "application/x-slim"],
            _CSS_TYPES: ["css", "less", "scss", "sass", "stylus", "text/css", "text/x-sass", "text/x-scss", "text/x-less", "text/x-styl"],
            _JS_TYPES: ["javascript", "coffeescript", "livescript", "typescript", "dart", "application/dart", "text/x-vue", "text/javascript", "text/x-coffeescript", "text/x-livescript", "text/typescript"],
            cmModeToType: function(e) {
                var t = this._getSafeInputMode(e);
                return this._getType(t)
            },
            _getSafeInputMode: function(e) {
                return ("string" == typeof e ? e : e.name).toLowerCase()
            },
            _getType: function(e) {
                return -1 !== this._HTML_TYPES.indexOf(e) ? "html" : -1 !== this._CSS_TYPES.indexOf(e) ? "css" : -1 !== this._JS_TYPES.indexOf(e) ? "js" : "unknown"
            }
        },
        d = e.commands;
    d.toggleCommentIndented = function(e) {
        t(e), n(e)
    }, d.toggleBlockComment = function(e) {
        t(e), r(e)
    };
    var f = e.keyMap;
    f.macExtendedBase = {
        "Cmd-Alt-/": "toggleBlockComment",
        "Cmd-/": "toggleCommentIndented",
        fallthrough: "macDefault"
    }, e.normalizeKeyMap(f.macExtendedBase), f.pcExtendedBase = {
        "Ctrl-Alt-/": "toggleBlockComment",
        "Ctrl-/": "toggleCommentIndented",
        fallthrough: "pcDefault"
    }, e.normalizeKeyMap(f.pcExtendedBase);
    var h = f.default == f.macDefault;
    f.extendedBase = h ? f.macExtendedBase : f.pcExtendedBase
})),
function(e) {
    "object" == typeof exports && "object" == typeof module ? e(require("../lib/codemirror"), require("../addon/search/searchcursor"), require("../addon/edit/matchbrackets")) : "function" == typeof define && define.amd ? define(["../lib/codemirror", "../addon/search/searchcursor", "../addon/edit/matchbrackets"], e) : e(CodeMirror)
}((function(e) {
    "use strict";

    function t(t, n, r) {
        if (r < 0 && 0 == n.ch) return t.clipPos(p(n.line - 1));
        var i = t.getLine(n.line);
        if (r > 0 && n.ch >= i.length) return t.clipPos(p(n.line + 1, 0));
        for (var o, a = "start", l = n.ch, s = l, c = r < 0 ? 0 : i.length, u = 0; s != c; s += r, u++) {
            var d = i.charAt(r < 0 ? s - 1 : s),
                f = "_" != d && e.isWordChar(d) ? "w" : "o";
            if ("w" == f && d.toUpperCase() == d && (f = "W"), "start" == a) "o" != f ? (a = "in", o = f) : l = s + r;
            else if ("in" == a && o != f) {
                if ("w" == o && "W" == f && r < 0 && s--, "W" == o && "w" == f && r > 0) {
                    if (s == l + 1) {
                        o = "w";
                        continue
                    }
                    s--
                }
                break
            }
        }
        return p(n.line, s)
    }

    function n(e, n) {
        e.extendSelectionsBy((function(r) {
            return e.display.shift || e.doc.extend || r.empty() ? t(e.doc, r.head, n) : n < 0 ? r.from() : r.to()
        }))
    }

    function r(t, n) {
        if (t.isReadOnly()) return e.Pass;
        t.operation((function() {
            for (var e = t.listSelections().length, r = [], i = -1, o = 0; o < e; o++) {
                var a = t.listSelections()[o].head;
                if (!(a.line <= i)) {
                    var l = p(a.line + (n ? 0 : 1), 0);
                    t.replaceRange("\n", l, null, "+insertLine"), t.indentLine(l.line, null, !0), r.push({
                        head: l,
                        anchor: l
                    }), i = a.line + 1
                }
            }
            t.setSelections(r)
        })), t.execCommand("indentAuto")
    }

    function i(t, n) {
        for (var r = n.ch, i = r, o = t.getLine(n.line); r && e.isWordChar(o.charAt(r - 1));) --r;
        for (; i < o.length && e.isWordChar(o.charAt(i));) ++i;
        return {
            from: p(n.line, r),
            to: p(n.line, i),
            word: o.slice(r, i)
        }
    }

    function o(e, t) {
        for (var n = e.listSelections(), r = [], i = 0; i < n.length; i++) {
            var o = n[i],
                a = e.findPosV(o.anchor, t, "line", o.anchor.goalColumn),
                l = e.findPosV(o.head, t, "line", o.head.goalColumn);
            a.goalColumn = null != o.anchor.goalColumn ? o.anchor.goalColumn : e.cursorCoords(o.anchor, "div").left, l.goalColumn = null != o.head.goalColumn ? o.head.goalColumn : e.cursorCoords(o.head, "div").left;
            var s = {
                anchor: a,
                head: l
            };
            r.push(o), r.push(s)
        }
        e.setSelections(r)
    }

    function a(t, n, r) {
        for (var i = 0; i < t.length; i++)
            if (0 == e.cmpPos(t[i].from(), n) && 0 == e.cmpPos(t[i].to(), r)) return !0;
        return !1
    }

    function l(t) {
        for (var n = t.listSelections(), r = [], i = 0; i < n.length; i++) {
            var o = n[i],
                a = o.head,
                l = t.scanForBracket(a, -1);
            if (!l) return !1;
            for (;;) {
                var s = t.scanForBracket(a, 1);
                if (!s) return !1;
                if (s.ch == m.charAt(m.indexOf(l.ch) + 1)) {
                    var c = p(l.pos.line, l.pos.ch + 1);
                    if (0 != e.cmpPos(c, o.from()) || 0 != e.cmpPos(s.pos, o.to())) {
                        r.push({
                            anchor: c,
                            head: s.pos
                        });
                        break
                    }
                    if (!(l = t.scanForBracket(l.pos, -1))) return !1
                }
                a = p(s.pos.line, s.pos.ch + 1)
            }
        }
        return t.setSelections(r), !0
    }

    function s(e) {
        return e ? /\bpunctuation\b/.test(e) ? e : void 0 : null
    }

    function c(t, n, r) {
        if (t.isReadOnly()) return e.Pass;
        for (var i, o = t.listSelections(), a = [], l = 0; l < o.length; l++) {
            var s = o[l];
            if (!s.empty()) {
                for (var c = s.from().line, u = s.to().line; l < o.length - 1 && o[l + 1].from().line == u;) u = o[++l].to().line;
                o[l].to().ch || u--, a.push(c, u)
            }
        }
        a.length ? i = !0 : a.push(t.firstLine(), t.lastLine()), t.operation((function() {
            for (var e = [], o = 0; o < a.length; o += 2) {
                var l = a[o],
                    s = a[o + 1],
                    c = p(l, 0),
                    u = p(s),
                    d = t.getRange(c, u, !1);
                n ? d.sort((function(e, t) {
                    return e < t ? -r : e == t ? 0 : r
                })) : d.sort((function(e, t) {
                    var n = e.toUpperCase(),
                        i = t.toUpperCase();
                    return n != i && (e = n, t = i), e < t ? -r : e == t ? 0 : r
                })), t.replaceRange(d, c, u), i && e.push({
                    anchor: c,
                    head: p(s + 1, 0)
                })
            }
            i && t.setSelections(e, 0)
        }))
    }

    function u(t, n) {
        t.operation((function() {
            for (var r = t.listSelections(), o = [], a = [], l = 0; l < r.length; l++) {
                (c = r[l]).empty() ? (o.push(l), a.push("")) : a.push(n(t.getRange(c.from(), c.to())))
            }
            t.replaceSelections(a, "around", "case");
            var s;
            for (l = o.length - 1; l >= 0; l--) {
                var c = r[o[l]];
                if (!(s && e.cmpPos(c.head, s) > 0)) {
                    var u = i(t, c.head);
                    s = u.from, t.replaceRange(n(u.word), u.from, u.to)
                }
            }
        }))
    }

    function d(t) {
        var n = t.getCursor("from"),
            r = t.getCursor("to");
        if (0 == e.cmpPos(n, r)) {
            var o = i(t, n);
            if (!o.word) return;
            n = o.from, r = o.to
        }
        return {
            from: n,
            to: r,
            query: t.getRange(n, r),
            word: o
        }
    }

    function f(e, t) {
        var n = d(e);
        if (n) {
            var r = n.query,
                i = e.getSearchCursor(r, t ? n.to : n.from);
            (t ? i.findNext() : i.findPrevious()) ? e.setSelection(i.from(), i.to()): (i = e.getSearchCursor(r, t ? p(e.firstLine(), 0) : e.clipPos(p(e.lastLine()))), (t ? i.findNext() : i.findPrevious()) ? e.setSelection(i.from(), i.to()) : n.word && e.setSelection(n.from, n.to))
        }
    }
    var h = e.commands,
        p = e.Pos;
    h.goSubwordLeft = function(e) {
        n(e, -1)
    }, h.goSubwordRight = function(e) {
        n(e, 1)
    }, h.scrollLineUp = function(e) {
        var t = e.getScrollInfo();
        if (!e.somethingSelected()) {
            var n = e.lineAtHeight(t.top + t.clientHeight, "local");
            e.getCursor().line >= n && e.execCommand("goLineUp")
        }
        e.scrollTo(null, t.top - e.defaultTextHeight())
    }, h.scrollLineDown = function(e) {
        var t = e.getScrollInfo();
        if (!e.somethingSelected()) {
            var n = e.lineAtHeight(t.top, "local") + 1;
            e.getCursor().line <= n && e.execCommand("goLineDown")
        }
        e.scrollTo(null, t.top + e.defaultTextHeight())
    }, h.splitSelectionByLine = function(e) {
        for (var t = e.listSelections(), n = [], r = 0; r < t.length; r++)
            for (var i = t[r].from(), o = t[r].to(), a = i.line; a <= o.line; ++a) o.line > i.line && a == o.line && 0 == o.ch || n.push({
                anchor: a == i.line ? i : p(a, 0),
                head: a == o.line ? o : p(a)
            });
        e.setSelections(n, 0)
    }, h.singleSelectionTop = function(e) {
        var t = e.listSelections()[0];
        e.setSelection(t.anchor, t.head, {
            scroll: !1
        })
    }, h.selectLine = function(e) {
        for (var t = e.listSelections(), n = [], r = 0; r < t.length; r++) {
            var i = t[r];
            n.push({
                anchor: p(i.from().line, 0),
                head: p(i.to().line + 1, 0)
            })
        }
        e.setSelections(n)
    }, h.insertLineAfter = function(e) {
        return r(e, !1)
    }, h.insertLineBefore = function(e) {
        return r(e, !0)
    }, h.selectNextOccurrence = function(t) {
        var n = t.getCursor("from"),
            r = t.getCursor("to"),
            o = t.state.sublimeFindFullWord == t.doc.sel;
        if (0 == e.cmpPos(n, r)) {
            var l = i(t, n);
            if (!l.word) return;
            t.setSelection(l.from, l.to), o = !0
        } else {
            var s = t.getRange(n, r),
                c = o ? new RegExp("\\b" + s + "\\b") : s,
                u = t.getSearchCursor(c, r),
                d = u.findNext();
            if (d || (d = (u = t.getSearchCursor(c, p(t.firstLine(), 0))).findNext()), !d || a(t.listSelections(), u.from(), u.to())) return;
            t.addSelection(u.from(), u.to())
        }
        o && (t.state.sublimeFindFullWord = t.doc.sel)
    }, h.skipAndSelectNextOccurrence = function(t) {
        var n = t.getCursor("anchor"),
            r = t.getCursor("head");
        h.selectNextOccurrence(t), 0 != e.cmpPos(n, r) && t.doc.setSelections(t.doc.listSelections().filter((function(e) {
            return e.anchor != n || e.head != r
        })))
    }, h.addCursorToPrevLine = function(e) {
        o(e, -1)
    }, h.addCursorToNextLine = function(e) {
        o(e, 1)
    };
    var m = "(){}[]";
    h.selectScope = function(e) {
        l(e) || e.execCommand("selectAll")
    }, h.selectBetweenBrackets = function(t) {
        if (!l(t)) return e.Pass
    }, h.goToBracket = function(t) {
        t.extendSelectionsBy((function(n) {
            var r = t.scanForBracket(n.head, 1, s(t.getTokenTypeAt(n.head)));
            if (r && 0 != e.cmpPos(r.pos, n.head)) return r.pos;
            var i = t.scanForBracket(n.head, -1, s(t.getTokenTypeAt(p(n.head.line, n.head.ch + 1))));
            return i && p(i.pos.line, i.pos.ch + 1) || n.head
        }))
    }, h.swapLineUp = function(t) {
        if (t.isReadOnly()) return e.Pass;
        for (var n = t.listSelections(), r = [], i = t.firstLine() - 1, o = [], a = 0; a < n.length; a++) {
            var l = n[a],
                s = l.from().line - 1,
                c = l.to().line;
            o.push({
                anchor: p(l.anchor.line - 1, l.anchor.ch),
                head: p(l.head.line - 1, l.head.ch)
            }), 0 != l.to().ch || l.empty() || --c, s > i ? r.push(s, c) : r.length && (r[r.length - 1] = c), i = c
        }
        t.operation((function() {
            for (var e = 0; e < r.length; e += 2) {
                var n = r[e],
                    i = r[e + 1],
                    a = t.getLine(n);
                t.replaceRange("", p(n, 0), p(n + 1, 0), "+swapLine"), i > t.lastLine() ? t.replaceRange("\n" + a, p(t.lastLine()), null, "+swapLine") : t.replaceRange(a + "\n", p(i, 0), null, "+swapLine")
            }
            t.setSelections(o), t.scrollIntoView()
        }))
    }, h.swapLineDown = function(t) {
        if (t.isReadOnly()) return e.Pass;
        for (var n = t.listSelections(), r = [], i = t.lastLine() + 1, o = n.length - 1; o >= 0; o--) {
            var a = n[o],
                l = a.to().line + 1,
                s = a.from().line;
            0 != a.to().ch || a.empty() || l--, l < i ? r.push(l, s) : r.length && (r[r.length - 1] = s), i = s
        }
        t.operation((function() {
            for (var e = r.length - 2; e >= 0; e -= 2) {
                var n = r[e],
                    i = r[e + 1],
                    o = t.getLine(n);
                n == t.lastLine() ? t.replaceRange("", p(n - 1), p(n), "+swapLine") : t.replaceRange("", p(n, 0), p(n + 1, 0), "+swapLine"), t.replaceRange(o + "\n", p(i, 0), null, "+swapLine")
            }
            t.scrollIntoView()
        }))
    }, h.joinLines = function(e) {
        for (var t = e.listSelections(), n = [], r = 0; r < t.length; r++) {
            for (var i = t[r], o = i.from(), a = o.line, l = i.to().line; r < t.length - 1 && t[r + 1].from().line == l;) l = t[++r].to().line;
            n.push({
                start: a,
                end: l,
                anchor: !i.empty() && o
            })
        }
        e.operation((function() {
            for (var t = 0, r = [], i = 0; i < n.length; i++) {
                for (var o, a = n[i], l = a.anchor && p(a.anchor.line - t, a.anchor.ch), s = a.start; s <= a.end; s++) {
                    var c = s - t;
                    s == a.end && (o = p(c, e.getLine(c).length + 1)), c < e.lastLine() && (e.replaceRange(" ", p(c), p(c + 1, /^\s*/.exec(e.getLine(c + 1))[0].length)), ++t)
                }
                r.push({
                    anchor: l || o,
                    head: o
                })
            }
            e.setSelections(r, 0)
        }))
    }, h.duplicateLine = function(e) {
        e.operation((function() {
            for (var t = e.listSelections().length, n = 0; n < t; n++) {
                var r = e.listSelections()[n];
                r.empty() ? e.replaceRange(e.getLine(r.head.line) + "\n", p(r.head.line, 0)) : e.replaceRange(e.getRange(r.from(), r.to()), r.from())
            }
            e.scrollIntoView()
        }))
    }, h.sortLines = function(e) {
        c(e, !0, 1)
    }, h.reverseSortLines = function(e) {
        c(e, !0, -1)
    }, h.sortLinesInsensitive = function(e) {
        c(e, !1, 1)
    }, h.reverseSortLinesInsensitive = function(e) {
        c(e, !1, -1)
    }, h.nextBookmark = function(e) {
        var t = e.state.sublimeBookmarks;
        if (t)
            for (; t.length;) {
                var n = t.shift(),
                    r = n.find();
                if (r) return t.push(n), e.setSelection(r.from, r.to)
            }
    }, h.prevBookmark = function(e) {
        var t = e.state.sublimeBookmarks;
        if (t)
            for (; t.length;) {
                t.unshift(t.pop());
                var n = t[t.length - 1].find();
                if (n) return e.setSelection(n.from, n.to);
                t.pop()
            }
    }, h.toggleBookmark = function(e) {
        for (var t = e.listSelections(), n = e.state.sublimeBookmarks || (e.state.sublimeBookmarks = []), r = 0; r < t.length; r++) {
            for (var i = t[r].from(), o = t[r].to(), a = t[r].empty() ? e.findMarksAt(i) : e.findMarks(i, o), l = 0; l < a.length; l++)
                if (a[l].sublimeBookmark) {
                    a[l].clear();
                    for (var s = 0; s < n.length; s++) n[s] == a[l] && n.splice(s--, 1);
                    break
                }
            l == a.length && n.push(e.markText(i, o, {
                sublimeBookmark: !0,
                clearWhenEmpty: !1
            }))
        }
    }, h.clearBookmarks = function(e) {
        var t = e.state.sublimeBookmarks;
        if (t)
            for (var n = 0; n < t.length; n++) t[n].clear();
        t.length = 0
    }, h.selectBookmarks = function(e) {
        var t = e.state.sublimeBookmarks,
            n = [];
        if (t)
            for (var r = 0; r < t.length; r++) {
                var i = t[r].find();
                i ? n.push({
                    anchor: i.from,
                    head: i.to
                }) : t.splice(r--, 0)
            }
        n.length && e.setSelections(n, 0)
    }, h.smartBackspace = function(t) {
        if (t.somethingSelected()) return e.Pass;
        t.operation((function() {
            for (var n = t.listSelections(), r = t.getOption("indentUnit"), i = n.length - 1; i >= 0; i--) {
                var o = n[i].head,
                    a = t.getRange({
                        line: o.line,
                        ch: 0
                    }, o),
                    l = e.countColumn(a, null, t.getOption("tabSize")),
                    s = t.findPosH(o, -1, "char", !1);
                if (a && !/\S/.test(a) && l % r == 0) {
                    var c = new p(o.line, e.findColumn(a, l - r, r));
                    c.ch != o.ch && (s = c)
                }
                t.replaceRange("", s, o, "+delete")
            }
        }))
    }, h.delLineRight = function(e) {
        e.operation((function() {
            for (var t = e.listSelections(), n = t.length - 1; n >= 0; n--) e.replaceRange("", t[n].anchor, p(t[n].to().line), "+delete");
            e.scrollIntoView()
        }))
    }, h.upcaseAtCursor = function(e) {
        u(e, (function(e) {
            return e.toUpperCase()
        }))
    }, h.downcaseAtCursor = function(e) {
        u(e, (function(e) {
            return e.toLowerCase()
        }))
    }, h.setSublimeMark = function(e) {
        e.state.sublimeMark && e.state.sublimeMark.clear(), e.state.sublimeMark = e.setBookmark(e.getCursor())
    }, h.selectToSublimeMark = function(e) {
        var t = e.state.sublimeMark && e.state.sublimeMark.find();
        t && e.setSelection(e.getCursor(), t)
    }, h.deleteToSublimeMark = function(t) {
        var n = t.state.sublimeMark && t.state.sublimeMark.find();
        if (n) {
            var r = t.getCursor(),
                i = n;
            if (e.cmpPos(r, i) > 0) {
                var o = i;
                i = r, r = o
            }
            t.state.sublimeKilled = t.getRange(r, i), t.replaceRange("", r, i)
        }
    }, h.swapWithSublimeMark = function(e) {
        var t = e.state.sublimeMark && e.state.sublimeMark.find();
        t && (e.state.sublimeMark.clear(), e.state.sublimeMark = e.setBookmark(e.getCursor()), e.setCursor(t))
    }, h.sublimeYank = function(e) {
        null != e.state.sublimeKilled && e.replaceSelection(e.state.sublimeKilled, null, "paste")
    }, h.showInCenter = function(e) {
        var t = e.cursorCoords(null, "local");
        e.scrollTo(null, (t.top + t.bottom) / 2 - e.getScrollInfo().clientHeight / 2)
    }, h.findUnder = function(e) {
        f(e, !0)
    }, h.findUnderPrevious = function(e) {
        f(e, !1)
    }, h.findAllUnder = function(e) {
        var t = d(e);
        if (t) {
            for (var n = e.getSearchCursor(t.query), r = [], i = -1; n.findNext();) r.push({
                anchor: n.from(),
                head: n.to()
            }), n.from().line <= t.from.line && n.from().ch <= t.from.ch && i++;
            e.setSelections(r, i)
        }
    };
    var g = e.keyMap;
    g.macSublime = {
        "Cmd-Left": "goLineStartSmart",
        "Shift-Tab": "indentLess",
        "Shift-Ctrl-K": "deleteLine",
        "Alt-Q": "wrapLines",
        "Ctrl-Left": "goSubwordLeft",
        "Ctrl-Right": "goSubwordRight",
        "Ctrl-Alt-Up": "scrollLineUp",
        "Ctrl-Alt-Down": "scrollLineDown",
        "Cmd-L": "selectLine",
        "Shift-Cmd-L": "splitSelectionByLine",
        Esc: "singleSelectionTop",
        "Cmd-Enter": "insertLineAfter",
        "Shift-Cmd-Enter": "insertLineBefore",
        "Cmd-D": "selectNextOccurrence",
        "Shift-Cmd-Space": "selectScope",
        "Shift-Cmd-M": "selectBetweenBrackets",
        "Cmd-M": "goToBracket",
        "Cmd-Ctrl-Up": "swapLineUp",
        "Cmd-Ctrl-Down": "swapLineDown",
        "Cmd-J": "joinLines",
        "Shift-Cmd-D": "duplicateLine",
        F5: "sortLines",
        "Shift-F5": "reverseSortLines",
        "Cmd-F5": "sortLinesInsensitive",
        "Shift-Cmd-F5": "reverseSortLinesInsensitive",
        F2: "nextBookmark",
        "Shift-F2": "prevBookmark",
        "Cmd-F2": "toggleBookmark",
        "Shift-Cmd-F2": "clearBookmarks",
        "Alt-F2": "selectBookmarks",
        Backspace: "smartBackspace",
        "Cmd-K Cmd-D": "skipAndSelectNextOccurrence",
        "Cmd-K Cmd-K": "delLineRight",
        "Cmd-K Cmd-U": "upcaseAtCursor",
        "Cmd-K Cmd-L": "downcaseAtCursor",
        "Cmd-K Cmd-Space": "setSublimeMark",
        "Cmd-K Cmd-A": "selectToSublimeMark",
        "Cmd-K Cmd-W": "deleteToSublimeMark",
        "Cmd-K Cmd-X": "swapWithSublimeMark",
        "Cmd-K Cmd-Y": "sublimeYank",
        "Cmd-K Cmd-C": "showInCenter",
        "Cmd-K Cmd-G": "clearBookmarks",
        "Cmd-K Cmd-Backspace": "delLineLeft",
        "Cmd-K Cmd-1": "foldAll",
        "Cmd-K Cmd-0": "unfoldAll",
        "Cmd-K Cmd-J": "unfoldAll",
        "Ctrl-Shift-Up": "addCursorToPrevLine",
        "Ctrl-Shift-Down": "addCursorToNextLine",
        "Cmd-F3": "findUnder",
        "Shift-Cmd-F3": "findUnderPrevious",
        "Alt-F3": "findAllUnder",
        "Shift-Cmd-[": "fold",
        "Shift-Cmd-]": "unfold",
        "Cmd-I": "findIncremental",
        "Shift-Cmd-I": "findIncrementalReverse",
        "Cmd-H": "replace",
        F3: "findNext",
        "Shift-F3": "findPrev",
        fallthrough: "macExtendedBase"
    }, e.normalizeKeyMap(g.macSublime), g.pcSublime = {
        "Shift-Tab": "indentLess",
        "Shift-Ctrl-K": "deleteLine",
        "Alt-Q": "wrapLines",
        "Ctrl-T": "transposeChars",
        "Alt-Left": "goSubwordLeft",
        "Alt-Right": "goSubwordRight",
        "Ctrl-Up": "scrollLineUp",
        "Ctrl-Down": "scrollLineDown",
        "Ctrl-L": "selectLine",
        "Shift-Ctrl-L": "splitSelectionByLine",
        Esc: "singleSelectionTop",
        "Ctrl-Enter": "insertLineAfter",
        "Shift-Ctrl-Enter": "insertLineBefore",
        "Ctrl-D": "selectNextOccurrence",
        "Shift-Ctrl-Space": "selectScope",
        "Shift-Ctrl-M": "selectBetweenBrackets",
        "Ctrl-M": "goToBracket",
        "Shift-Ctrl-Up": "swapLineUp",
        "Shift-Ctrl-Down": "swapLineDown",
        "Ctrl-J": "joinLines",
        "Shift-Ctrl-D": "duplicateLine",
        F9: "sortLines",
        "Shift-F9": "reverseSortLines",
        "Ctrl-F9": "sortLinesInsensitive",
        "Shift-Ctrl-F9": "reverseSortLinesInsensitive",
        F2: "nextBookmark",
        "Shift-F2": "prevBookmark",
        "Ctrl-F2": "toggleBookmark",
        "Shift-Ctrl-F2": "clearBookmarks",
        "Alt-F2": "selectBookmarks",
        Backspace: "smartBackspace",
        "Ctrl-K Ctrl-D": "skipAndSelectNextOccurrence",
        "Ctrl-K Ctrl-K": "delLineRight",
        "Ctrl-K Ctrl-U": "upcaseAtCursor",
        "Ctrl-K Ctrl-L": "downcaseAtCursor",
        "Ctrl-K Ctrl-Space": "setSublimeMark",
        "Ctrl-K Ctrl-A": "selectToSublimeMark",
        "Ctrl-K Ctrl-W": "deleteToSublimeMark",
        "Ctrl-K Ctrl-X": "swapWithSublimeMark",
        "Ctrl-K Ctrl-Y": "sublimeYank",
        "Ctrl-K Ctrl-C": "showInCenter",
        "Ctrl-K Ctrl-G": "clearBookmarks",
        "Ctrl-K Ctrl-Backspace": "delLineLeft",
        "Ctrl-K Ctrl-1": "foldAll",
        "Ctrl-K Ctrl-0": "unfoldAll",
        "Ctrl-K Ctrl-J": "unfoldAll",
        "Ctrl-Alt-Up": "addCursorToPrevLine",
        "Ctrl-Alt-Down": "addCursorToNextLine",
        "Ctrl-F3": "findUnder",
        "Shift-Ctrl-F3": "findUnderPrevious",
        "Alt-F3": "findAllUnder",
        "Shift-Ctrl-[": "fold",
        "Shift-Ctrl-]": "unfold",
        "Ctrl-I": "findIncremental",
        "Shift-Ctrl-I": "findIncrementalReverse",
        "Ctrl-H": "replace",
        F3: "findNext",
        "Shift-F3": "findPrev",
        fallthrough: "pcExtendedBase"
    }, e.normalizeKeyMap(g.pcSublime);
    var v = g.default == g.macDefault;
    g.sublime = v ? g.macSublime : g.pcSublime
})),
function(e) {
    "object" == typeof exports && "object" == typeof module ? e(require("../../lib/codemirror")) : "function" == typeof define && define.amd ? define(["../../lib/codemirror"], e) : e(CodeMirror)
}((function(e) {
    "use strict";

    function t(e, t, n, r, i, o) {
        this.indented = e, this.column = t, this.type = n, this.info = r, this.align = i, this.prev = o
    }

    function n(e, n, r, i) {
        var o = e.indented;
        return e.context && "statement" == e.context.type && "statement" != r && (o = e.context.indented), e.context = new t(o, n, r, i, null, e.context)
    }

    function r(e) {
        var t = e.context.type;
        return ")" != t && "]" != t && "}" != t || (e.indented = e.context.indented), e.context = e.context.prev
    }

    function i(e, t, n) {
        return "variable" == t.prevToken || "type" == t.prevToken || (!!/\S(?:[^- ]>|[*\]])\s*$|\*$/.test(e.string.slice(0, n)) || (!(!t.typeAtEndOfLine || e.column() != e.indentation()) || void 0))
    }

    function o(e) {
        for (;;) {
            if (!e || "top" == e.type) return !0;
            if ("}" == e.type && "namespace" != e.prev.info) return !1;
            e = e.prev
        }
    }

    function a(e) {
        for (var t = {}, n = e.split(" "), r = 0; r < n.length; ++r) t[n[r]] = !0;
        return t
    }

    function l(e, t) {
        return "function" == typeof e ? e(t) : e.propertyIsEnumerable(t)
    }

    function s(e) {
        return l(M, e) || /.+_t$/.test(e)
    }

    function c(e) {
        return s(e) || l(A, e)
    }

    function u(e, t) {
        if (!t.startOfLine) return !1;
        for (var n, r = null; n = e.peek();) {
            if ("\\" == n && e.match(/^.$/)) {
                r = u;
                break
            }
            if ("/" == n && e.match(/^\/[\/\*]/, !1)) break;
            e.next()
        }
        return t.tokenize = r, "meta"
    }

    function d(e, t) {
        return "type" == t.prevToken && "type"
    }

    function f(e) {
        return !(!e || e.length < 2) && ("_" == e[0] && ("_" == e[1] || e[1] !== e[1].toLowerCase()))
    }

    function h(e) {
        return e.eatWhile(/[\w\.']/), "number"
    }

    function p(e, t) {
        if (e.backUp(1), e.match(/^(?:R|u8R|uR|UR|LR)/)) {
            var n = e.match(/^"([^\s\\()]{0,16})\(/);
            return !!n && (t.cpp11RawStringDelim = n[1], t.tokenize = v, v(e, t))
        }
        return e.match(/^(?:u8|u|U|L)/) ? !!e.match(/^["']/, !1) && "string" : (e.next(), !1)
    }

    function m(e) {
        var t = /(\w+)::~?(\w+)$/.exec(e);
        return t && t[1] == t[2]
    }

    function g(e, t) {
        for (var n; null != (n = e.next());)
            if ('"' == n && !e.eat('"')) {
                t.tokenize = null;
                break
            }
        return "string"
    }

    function v(e, t) {
        var n = t.cpp11RawStringDelim.replace(/[^\w\s]/g, "\\$&");
        return e.match(new RegExp(".*?\\)" + n + '"')) ? t.tokenize = null : e.skipToEnd(), "string"
    }

    function y(t, n) {
        function r(e) {
            if (e)
                for (var t in e) e.hasOwnProperty(t) && i.push(t)
        }
        "string" == typeof t && (t = [t]);
        var i = [];
        r(n.keywords), r(n.types), r(n.builtin), r(n.atoms), i.length && (n.helperType = t[0], e.registerHelper("hintWords", t[0], i));
        for (var o = 0; o < t.length; ++o) e.defineMIME(t[o], n)
    }

    function b(e, t) {
        for (var n = !1; !e.eol();) {
            if (!n && e.match('"""')) {
                t.tokenize = null;
                break
            }
            n = "\\" == e.next() && !n
        }
        return "string"
    }

    function k(e) {
        return function(t, n) {
            for (var r; r = t.next();) {
                if ("*" == r && t.eat("/")) {
                    if (1 == e) {
                        n.tokenize = null;
                        break
                    }
                    return n.tokenize = k(e - 1), n.tokenize(t, n)
                }
                if ("/" == r && t.eat("*")) return n.tokenize = k(e + 1), n.tokenize(t, n)
            }
            return "comment"
        }
    }

    function x(e) {
        return function(t, n) {
            for (var r, i = !1, o = !1; !t.eol();) {
                if (!e && !i && t.match('"')) {
                    o = !0;
                    break
                }
                if (e && t.match('"""')) {
                    o = !0;
                    break
                }
                r = t.next(), !i && "$" == r && t.match("{") && t.skipTo("}"), i = !i && "\\" == r && !e
            }
            return !o && e || (n.tokenize = null), "string"
        }
    }

    function w(e) {
        return function(t, n) {
            for (var r, i = !1, o = !1; !t.eol();) {
                if (!i && t.match('"') && ("single" == e || t.match('""'))) {
                    o = !0;
                    break
                }
                if (!i && t.match("``")) {
                    F = w(e), o = !0;
                    break
                }
                r = t.next(), i = "single" == e && !i && "\\" == r
            }
            return o && (n.tokenize = null), "string"
        }
    }
    e.defineMode("clike", (function(a, s) {
        function c(e, t) {
            var n = e.next();
            if (S[n]) {
                var r = S[n](e, t);
                if (!1 !== r) return r
            }
            if ('"' == n || "'" == n) return t.tokenize = u(n), t.tokenize(e, t);
            if (O.test(n)) {
                if (e.backUp(1), e.match(F)) return "number";
                e.next()
            }
            if (z.test(n)) return h = n, null;
            if ("/" == n) {
                if (e.eat("*")) return t.tokenize = d, d(e, t);
                if (e.eat("/")) return e.skipToEnd(), "comment"
            }
            if (E.test(n)) {
                for (; !e.match(/^\/[\/*]/, !1) && e.eat(E););
                return "operator"
            }
            if (e.eatWhile(N), A)
                for (; e.match(A);) e.eatWhile(N);
            var i = e.current();
            return l(y, i) ? (l(x, i) && (h = "newstatement"), l(w, i) && (p = !0), "keyword") : l(b, i) ? "type" : l(k, i) || D && D(i) ? (l(x, i) && (h = "newstatement"), "builtin") : l(C, i) ? "atom" : "variable"
        }

        function u(e) {
            return function(t, n) {
                for (var r, i = !1, o = !1; null != (r = t.next());) {
                    if (r == e && !i) {
                        o = !0;
                        break
                    }
                    i = !i && "\\" == r
                }
                return (o || !i && !L) && (n.tokenize = null), "string"
            }
        }

        function d(e, t) {
            for (var n, r = !1; n = e.next();) {
                if ("/" == n && r) {
                    t.tokenize = null;
                    break
                }
                r = "*" == n
            }
            return "comment"
        }

        function f(e, t) {
            s.typeFirstDefinitions && e.eol() && o(t.context) && (t.typeAtEndOfLine = i(e, t, e.pos))
        }
        var h, p, m = a.indentUnit,
            g = s.statementIndentUnit || m,
            v = s.dontAlignCalls,
            y = s.keywords || {},
            b = s.types || {},
            k = s.builtin || {},
            x = s.blockKeywords || {},
            w = s.defKeywords || {},
            C = s.atoms || {},
            S = s.hooks || {},
            L = s.multiLineStrings,
            T = !1 !== s.indentStatements,
            M = !1 !== s.indentSwitch,
            A = s.namespaceSeparator,
            z = s.isPunctuationChar || /[\[\]{}\(\),;\:\.]/,
            O = s.numberStart || /[\d\.]/,
            F = s.number || /^(?:0x[a-f\d]+|0b[01]+|(?:\d+\.?\d*|\.\d+)(?:e[-+]?\d+)?)(u|ll?|l|f)?/i,
            E = s.isOperatorChar || /[+\-*&%=<>!?|\/]/,
            N = s.isIdentifierChar || /[\w\$_\xa1-\uffff]/,
            D = s.isReservedIdentifier || !1;
        return {
            startState: function(e) {
                return {
                    tokenize: null,
                    context: new t((e || 0) - m, 0, "top", null, !1),
                    indented: 0,
                    startOfLine: !0,
                    prevToken: null
                }
            },
            token: function(e, t) {
                var a = t.context;
                if (e.sol() && (null == a.align && (a.align = !1), t.indented = e.indentation(), t.startOfLine = !0), e.eatSpace()) return f(e, t), null;
                h = p = null;
                var l = (t.tokenize || c)(e, t);
                if ("comment" == l || "meta" == l) return l;
                if (null == a.align && (a.align = !0), ";" == h || ":" == h || "," == h && e.match(/^\s*(?:\/\/.*)?$/, !1))
                    for (;
                        "statement" == t.context.type;) r(t);
                else if ("{" == h) n(t, e.column(), "}");
                else if ("[" == h) n(t, e.column(), "]");
                else if ("(" == h) n(t, e.column(), ")");
                else if ("}" == h) {
                    for (;
                        "statement" == a.type;) a = r(t);
                    for ("}" == a.type && (a = r(t));
                        "statement" == a.type;) a = r(t)
                } else h == a.type ? r(t) : T && (("}" == a.type || "top" == a.type) && ";" != h || "statement" == a.type && "newstatement" == h) && n(t, e.column(), "statement", e.current());
                if ("variable" == l && ("def" == t.prevToken || s.typeFirstDefinitions && i(e, t, e.start) && o(t.context) && e.match(/^\s*\(/, !1)) && (l = "def"), S.token) {
                    var u = S.token(e, t, l);
                    void 0 !== u && (l = u)
                }
                return "def" == l && !1 === s.styleDefs && (l = "variable"), t.startOfLine = !1, t.prevToken = p ? "def" : l || h, f(e, t), l
            },
            indent: function(t, n) {
                if (t.tokenize != c && null != t.tokenize || t.typeAtEndOfLine) return e.Pass;
                var r = t.context,
                    i = n && n.charAt(0),
                    o = i == r.type;
                if ("statement" == r.type && "}" == i && (r = r.prev), s.dontIndentStatements)
                    for (;
                        "statement" == r.type && s.dontIndentStatements.test(r.info);) r = r.prev;
                if (S.indent) {
                    var a = S.indent(t, r, n, m);
                    if ("number" == typeof a) return a
                }
                var l = r.prev && "switch" == r.prev.info;
                if (s.allmanIndentation && /[{(]/.test(i)) {
                    for (;
                        "top" != r.type && "}" != r.type;) r = r.prev;
                    return r.indented
                }
                return "statement" == r.type ? r.indented + ("{" == i ? 0 : g) : !r.align || v && ")" == r.type ? ")" != r.type || o ? r.indented + (o ? 0 : m) + (o || !l || /^(?:case|default)\b/.test(n) ? 0 : m) : r.indented + g : r.column + (o ? 0 : 1)
            },
            electricInput: M ? /^\s*(?:case .*?:|default:|\{\}?|\})$/ : /^\s*[{}]$/,
            blockCommentStart: "/*",
            blockCommentEnd: "*/",
            blockCommentContinue: " * ",
            lineComment: "//",
            fold: "brace"
        }
    }));
    var C = "auto if break case register continue return default do sizeof static else struct switch extern typedef union for goto while enum const volatile inline restrict asm fortran",
        S = "alignas alignof and and_eq audit axiom bitand bitor catch class compl concept constexpr const_cast decltype delete dynamic_cast explicit export final friend import module mutable namespace new noexcept not not_eq operator or or_eq override private protected public reinterpret_cast requires static_assert static_cast template this thread_local throw try typeid typename using virtual xor xor_eq",
        L = "bycopy byref in inout oneway out self super atomic nonatomic retain copy readwrite readonly strong weak assign typeof nullable nonnull null_resettable _cmd @interface @implementation @end @protocol @encode @property @synthesize @dynamic @class @public @package @private @protected @required @optional @try @catch @finally @import @selector @encode @defs @synchronized @autoreleasepool @compatibility_alias @available",
        T = "FOUNDATION_EXPORT FOUNDATION_EXTERN NS_INLINE NS_FORMAT_FUNCTION  NS_RETURNS_RETAINEDNS_ERROR_ENUM NS_RETURNS_NOT_RETAINED NS_RETURNS_INNER_POINTER NS_DESIGNATED_INITIALIZER NS_ENUM NS_OPTIONS NS_REQUIRES_NIL_TERMINATION NS_ASSUME_NONNULL_BEGIN NS_ASSUME_NONNULL_END NS_SWIFT_NAME NS_REFINED_FOR_SWIFT",
        M = a("int long char short double float unsigned signed void bool"),
        A = a("SEL instancetype id Class Protocol BOOL"),
        z = "case do else for if switch while struct enum union",
        O = "struct enum union";
    y(["text/x-csrc", "text/x-c", "text/x-chdr"], {
        name: "clike",
        keywords: a(C),
        types: s,
        blockKeywords: a(z),
        defKeywords: a(O),
        typeFirstDefinitions: !0,
        atoms: a("NULL true false"),
        isReservedIdentifier: f,
        hooks: {
            "#": u,
            "*": d
        },
        modeProps: {
            fold: ["brace", "include"]
        }
    }), y(["text/x-c++src", "text/x-c++hdr"], {
        name: "clike",
        keywords: a(C + " " + S),
        types: s,
        blockKeywords: a(z + " class try catch"),
        defKeywords: a(O + " class namespace"),
        typeFirstDefinitions: !0,
        atoms: a("true false NULL nullptr"),
        dontIndentStatements: /^template$/,
        isIdentifierChar: /[\w\$_~\xa1-\uffff]/,
        isReservedIdentifier: f,
        hooks: {
            "#": u,
            "*": d,
            u: p,
            U: p,
            L: p,
            R: p,
            0: h,
            1: h,
            2: h,
            3: h,
            4: h,
            5: h,
            6: h,
            7: h,
            8: h,
            9: h,
            token: function(e, t, n) {
                if ("variable" == n && "(" == e.peek() && (";" == t.prevToken || null == t.prevToken || "}" == t.prevToken) && m(e.current())) return "def"
            }
        },
        namespaceSeparator: "::",
        modeProps: {
            fold: ["brace", "include"]
        }
    }), y("text/x-java", {
        name: "clike",
        keywords: a("abstract assert break case catch class const continue default do else enum extends final finally for goto if implements import instanceof interface native new package private protected public return static strictfp super switch synchronized this throw throws transient try volatile while @interface"),
        types: a("var byte short int long float double boolean char void Boolean Byte Character Double Float Integer Long Number Object Short String StringBuffer StringBuilder Void"),
        blockKeywords: a("catch class do else finally for if switch try while"),
        defKeywords: a("class interface enum @interface"),
        typeFirstDefinitions: !0,
        atoms: a("true false null"),
        number: /^(?:0x[a-f\d_]+|0b[01_]+|(?:[\d_]+\.?\d*|\.\d+)(?:e[-+]?[\d_]+)?)(u|ll?|l|f)?/i,
        hooks: {
            "@": function(e) {
                return !e.match("interface", !1) && (e.eatWhile(/[\w\$_]/), "meta")
            },
            '"': function(e, t) {
                return !!e.match('""\n') && (t.tokenize = b, t.tokenize(e, t))
            }
        },
        modeProps: {
            fold: ["brace", "import"]
        }
    }), y("text/x-csharp", {
        name: "clike",
        keywords: a("abstract as async await base break case catch checked class const continue default delegate do else enum event explicit extern finally fixed for foreach goto if implicit in interface internal is lock namespace new operator out override params private protected public readonly ref return sealed sizeof stackalloc static struct switch this throw try typeof unchecked unsafe using virtual void volatile while add alias ascending descending dynamic from get global group into join let orderby partial remove select set value var yield"),
        types: a("Action Boolean Byte Char DateTime DateTimeOffset Decimal Double Func Guid Int16 Int32 Int64 Object SByte Single String Task TimeSpan UInt16 UInt32 UInt64 bool byte char decimal double short int long object sbyte float string ushort uint ulong"),
        blockKeywords: a("catch class do else finally for foreach if struct switch try while"),
        defKeywords: a("class interface namespace struct var"),
        typeFirstDefinitions: !0,
        atoms: a("true false null"),
        hooks: {
            "@": function(e, t) {
                return e.eat('"') ? (t.tokenize = g, g(e, t)) : (e.eatWhile(/[\w\$_]/), "meta")
            }
        }
    }), y("text/x-scala", {
        name: "clike",
        keywords: a("abstract case catch class def do else extends final finally for forSome if implicit import lazy match new null object override package private protected return sealed super this throw trait try type val var while with yield _ assert assume require print println printf readLine readBoolean readByte readShort readChar readInt readLong readFloat readDouble"),
        types: a("AnyVal App Application Array BufferedIterator BigDecimal BigInt Char Console Either Enumeration Equiv Error Exception Fractional Function IndexedSeq Int Integral Iterable Iterator List Map Numeric Nil NotNull Option Ordered Ordering PartialFunction PartialOrdering Product Proxy Range Responder Seq Serializable Set Specializable Stream StringBuilder StringContext Symbol Throwable Traversable TraversableOnce Tuple Unit Vector Boolean Byte Character CharSequence Class ClassLoader Cloneable Comparable Compiler Double Exception Float Integer Long Math Number Object Package Pair Process Runtime Runnable SecurityManager Short StackTraceElement StrictMath String StringBuffer System Thread ThreadGroup ThreadLocal Throwable Triple Void"),
        multiLineStrings: !0,
        blockKeywords: a("catch class enum do else finally for forSome if match switch try while"),
        defKeywords: a("class enum def object package trait type val var"),
        atoms: a("true false null"),
        indentStatements: !1,
        indentSwitch: !1,
        isOperatorChar: /[+\-*&%=<>!?|\/#:@]/,
        hooks: {
            "@": function(e) {
                return e.eatWhile(/[\w\$_]/), "meta"
            },
            '"': function(e, t) {
                return !!e.match('""') && (t.tokenize = b, t.tokenize(e, t))
            },
            "'": function(e) {
                return e.eatWhile(/[\w\$_\xa1-\uffff]/), "atom"
            },
            "=": function(e, n) {
                var r = n.context;
                return !("}" != r.type || !r.align || !e.eat(">")) && (n.context = new t(r.indented, r.column, r.type, r.info, null, r.prev), "operator")
            },
            "/": function(e, t) {
                return !!e.eat("*") && (t.tokenize = k(1), t.tokenize(e, t))
            }
        },
        modeProps: {
            closeBrackets: {
                pairs: '()[]{}""',
                triples: '"'
            }
        }
    }), y("text/x-kotlin", {
        name: "clike",
        keywords: a("package as typealias class interface this super val operator var fun for is in This throw return annotation break continue object if else while do try when !in !is as? file import where by get set abstract enum open inner override private public internal protected catch finally out final vararg reified dynamic companion constructor init sealed field property receiver param sparam lateinit data inline noinline tailrec external annotation crossinline const operator infix suspend actual expect setparam value"),
        types: a("Boolean Byte Character CharSequence Class ClassLoader Cloneable Comparable Compiler Double Exception Float Integer Long Math Number Object Package Pair Process Runtime Runnable SecurityManager Short StackTraceElement StrictMath String StringBuffer System Thread ThreadGroup ThreadLocal Throwable Triple Void Annotation Any BooleanArray ByteArray Char CharArray DeprecationLevel DoubleArray Enum FloatArray Function Int IntArray Lazy LazyThreadSafetyMode LongArray Nothing ShortArray Unit"),
        intendSwitch: !1,
        indentStatements: !1,
        multiLineStrings: !0,
        number: /^(?:0x[a-f\d_]+|0b[01_]+|(?:[\d_]+(\.\d+)?|\.\d+)(?:e[-+]?[\d_]+)?)(u|ll?|l|f)?/i,
        blockKeywords: a("catch class do else finally for if where try while enum"),
        defKeywords: a("class val var object interface fun"),
        atoms: a("true false null this"),
        hooks: {
            "@": function(e) {
                return e.eatWhile(/[\w\$_]/), "meta"
            },
            "*": function(e, t) {
                return "." == t.prevToken ? "variable" : "operator"
            },
            '"': function(e, t) {
                return t.tokenize = x(e.match('""')), t.tokenize(e, t)
            },
            "/": function(e, t) {
                return !!e.eat("*") && (t.tokenize = k(1), t.tokenize(e, t))
            },
            indent: function(e, t, n, r) {
                var i = n && n.charAt(0);
                return "}" != e.prevToken && ")" != e.prevToken || "" != n ? "operator" == e.prevToken && "}" != n && "}" != e.context.type || "variable" == e.prevToken && "." == i || ("}" == e.prevToken || ")" == e.prevToken) && "." == i ? 2 * r + t.indented : t.align && "}" == t.type ? t.indented + (e.context.type == (n || "").charAt(0) ? 0 : r) : void 0 : e.indented
            }
        },
        modeProps: {
            closeBrackets: {
                triples: '"'
            }
        }
    }), y(["x-shader/x-vertex", "x-shader/x-fragment"], {
        name: "clike",
        keywords: a("sampler1D sampler2D sampler3D samplerCube sampler1DShadow sampler2DShadow const attribute uniform varying break continue discard return for while do if else struct in out inout"),
        types: a("float int bool void vec2 vec3 vec4 ivec2 ivec3 ivec4 bvec2 bvec3 bvec4 mat2 mat3 mat4"),
        blockKeywords: a("for while do if else struct"),
        builtin: a("radians degrees sin cos tan asin acos atan pow exp log exp2 sqrt inversesqrt abs sign floor ceil fract mod min max clamp mix step smoothstep length distance dot cross normalize ftransform faceforward reflect refract matrixCompMult lessThan lessThanEqual greaterThan greaterThanEqual equal notEqual any all not texture1D texture1DProj texture1DLod texture1DProjLod texture2D texture2DProj texture2DLod texture2DProjLod texture3D texture3DProj texture3DLod texture3DProjLod textureCube textureCubeLod shadow1D shadow2D shadow1DProj shadow2DProj shadow1DLod shadow2DLod shadow1DProjLod shadow2DProjLod dFdx dFdy fwidth noise1 noise2 noise3 noise4"),
        atoms: a("true false gl_FragColor gl_SecondaryColor gl_Normal gl_Vertex gl_MultiTexCoord0 gl_MultiTexCoord1 gl_MultiTexCoord2 gl_MultiTexCoord3 gl_MultiTexCoord4 gl_MultiTexCoord5 gl_MultiTexCoord6 gl_MultiTexCoord7 gl_FogCoord gl_PointCoord gl_Position gl_PointSize gl_ClipVertex gl_FrontColor gl_BackColor gl_FrontSecondaryColor gl_BackSecondaryColor gl_TexCoord gl_FogFragCoord gl_FragCoord gl_FrontFacing gl_FragData gl_FragDepth gl_ModelViewMatrix gl_ProjectionMatrix gl_ModelViewProjectionMatrix gl_TextureMatrix gl_NormalMatrix gl_ModelViewMatrixInverse gl_ProjectionMatrixInverse gl_ModelViewProjectionMatrixInverse gl_TextureMatrixTranspose gl_ModelViewMatrixInverseTranspose gl_ProjectionMatrixInverseTranspose gl_ModelViewProjectionMatrixInverseTranspose gl_TextureMatrixInverseTranspose gl_NormalScale gl_DepthRange gl_ClipPlane gl_Point gl_FrontMaterial gl_BackMaterial gl_LightSource gl_LightModel gl_FrontLightModelProduct gl_BackLightModelProduct gl_TextureColor gl_EyePlaneS gl_EyePlaneT gl_EyePlaneR gl_EyePlaneQ gl_FogParameters gl_MaxLights gl_MaxClipPlanes gl_MaxTextureUnits gl_MaxTextureCoords gl_MaxVertexAttribs gl_MaxVertexUniformComponents gl_MaxVaryingFloats gl_MaxVertexTextureImageUnits gl_MaxTextureImageUnits gl_MaxFragmentUniformComponents gl_MaxCombineTextureImageUnits gl_MaxDrawBuffers"),
        indentSwitch: !1,
        hooks: {
            "#": u
        },
        modeProps: {
            fold: ["brace", "include"]
        }
    }), y("text/x-nesc", {
        name: "clike",
        keywords: a(C + " as atomic async call command component components configuration event generic implementation includes interface module new norace nx_struct nx_union post provides signal task uses abstract extends"),
        types: s,
        blockKeywords: a(z),
        atoms: a("null true false"),
        hooks: {
            "#": u
        },
        modeProps: {
            fold: ["brace", "include"]
        }
    }), y("text/x-objectivec", {
        name: "clike",
        keywords: a(C + " " + L),
        types: c,
        builtin: a(T),
        blockKeywords: a(z + " @synthesize @try @catch @finally @autoreleasepool @synchronized"),
        defKeywords: a(O + " @interface @implementation @protocol @class"),
        dontIndentStatements: /^@.*$/,
        typeFirstDefinitions: !0,
        atoms: a("YES NO NULL Nil nil true false nullptr"),
        isReservedIdentifier: f,
        hooks: {
            "#": u,
            "*": d
        },
        modeProps: {
            fold: ["brace", "include"]
        }
    }), y("text/x-objectivec++", {
        name: "clike",
        keywords: a(C + " " + L + " " + S),
        types: c,
        builtin: a(T),
        blockKeywords: a(z + " @synthesize @try @catch @finally @autoreleasepool @synchronized class try catch"),
        defKeywords: a(O + " @interface @implementation @protocol @class class namespace"),
        dontIndentStatements: /^@.*$|^template$/,
        typeFirstDefinitions: !0,
        atoms: a("YES NO NULL Nil nil true false nullptr"),
        isReservedIdentifier: f,
        hooks: {
            "#": u,
            "*": d,
            u: p,
            U: p,
            L: p,
            R: p,
            0: h,
            1: h,
            2: h,
            3: h,
            4: h,
            5: h,
            6: h,
            7: h,
            8: h,
            9: h,
            token: function(e, t, n) {
                if ("variable" == n && "(" == e.peek() && (";" == t.prevToken || null == t.prevToken || "}" == t.prevToken) && m(e.current())) return "def"
            }
        },
        namespaceSeparator: "::",
        modeProps: {
            fold: ["brace", "include"]
        }
    }), y("text/x-squirrel", {
        name: "clike",
        keywords: a("base break clone continue const default delete enum extends function in class foreach local resume return this throw typeof yield constructor instanceof static"),
        types: s,
        blockKeywords: a("case catch class else for foreach if switch try while"),
        defKeywords: a("function local class"),
        typeFirstDefinitions: !0,
        atoms: a("true false null"),
        hooks: {
            "#": u
        },
        modeProps: {
            fold: ["brace", "include"]
        }
    });
    var F = null;
    y("text/x-ceylon", {
        name: "clike",
        keywords: a("abstracts alias assembly assert assign break case catch class continue dynamic else exists extends finally for function given if import in interface is let module new nonempty object of out outer package return satisfies super switch then this throw try value void while"),
        types: function(e) {
            var t = e.charAt(0);
            return t === t.toUpperCase() && t !== t.toLowerCase()
        },
        blockKeywords: a("case catch class dynamic else finally for function if interface module new object switch try while"),
        defKeywords: a("class dynamic function interface module object package value"),
        builtin: a("abstract actual aliased annotation by default deprecated doc final formal late license native optional sealed see serializable shared suppressWarnings tagged throws variable"),
        isPunctuationChar: /[\[\]{}\(\),;\:\.`]/,
        isOperatorChar: /[+\-*&%=<>!?|^~:\/]/,
        numberStart: /[\d#$]/,
        number: /^(?:#[\da-fA-F_]+|\$[01_]+|[\d_]+[kMGTPmunpf]?|[\d_]+\.[\d_]+(?:[eE][-+]?\d+|[kMGTPmunpf]|)|)/i,
        multiLineStrings: !0,
        typeFirstDefinitions: !0,
        atoms: a("true false null larger smaller equal empty finished"),
        indentSwitch: !1,
        styleDefs: !1,
        hooks: {
            "@": function(e) {
                return e.eatWhile(/[\w\$_]/), "meta"
            },
            '"': function(e, t) {
                return t.tokenize = w(e.match('""') ? "triple" : "single"), t.tokenize(e, t)
            },
            "`": function(e, t) {
                return !(!F || !e.match("`")) && (t.tokenize = F, F = null, t.tokenize(e, t))
            },
            "'": function(e) {
                return e.eatWhile(/[\w\$_\xa1-\uffff]/), "atom"
            },
            token: function(e, t, n) {
                if (("variable" == n || "type" == n) && "." == t.prevToken) return "variable-2"
            }
        },
        modeProps: {
            fold: ["brace", "import"],
            closeBrackets: {
                triples: '"'
            }
        }
    })
})),
function(e) {
    "object" == typeof exports && "object" == typeof module ? e(require("../../lib/codemirror")) : "function" == typeof define && define.amd ? define(["../../lib/codemirror"], e) : e(CodeMirror)
}((function(e) {
    "use strict";
    e.defineMode("coffeescript", (function(e, t) {
        function n(e) {
            return new RegExp("^((" + e.join(")|(") + "))\\b")
        }

        function r(e, t) {
            if (e.sol()) {
                null === t.scope.align && (t.scope.align = !1);
                var n = t.scope.offset;
                if (e.eatSpace()) {
                    var r = e.indentation();
                    return r > n && "coffee" == t.scope.type ? "indent" : r < n ? "dedent" : null
                }
                n > 0 && l(e, t)
            }
            if (e.eatSpace()) return null;
            var a = e.peek();
            if (e.match("####")) return e.skipToEnd(), "comment";
            if (e.match("###")) return t.tokenize = o, t.tokenize(e, t);
            if ("#" === a) return e.skipToEnd(), "comment";
            if (e.match(/^-?[0-9\.]/, !1)) {
                var s = !1;
                if (e.match(/^-?\d*\.\d+(e[\+\-]?\d+)?/i) && (s = !0), e.match(/^-?\d+\.\d*/) && (s = !0), e.match(/^-?\.\d+/) && (s = !0), s) return "." == e.peek() && e.backUp(1), "number";
                var m = !1;
                if (e.match(/^-?0x[0-9a-f]+/i) && (m = !0), e.match(/^-?[1-9]\d*(e[\+\-]?\d+)?/) && (m = !0), e.match(/^-?0(?![\dx])/i) && (m = !0), m) return "number"
            }
            if (e.match(y)) return t.tokenize = i(e.current(), !1, "string"), t.tokenize(e, t);
            if (e.match(b)) {
                if ("/" != e.current() || e.match(/^.*\//, !1)) return t.tokenize = i(e.current(), !0, "string-2"), t.tokenize(e, t);
                e.backUp(1)
            }
            return e.match(u) || e.match(p) ? "operator" : e.match(d) ? "punctuation" : e.match(k) ? "atom" : e.match(h) || t.prop && e.match(f) ? "property" : e.match(v) ? "keyword" : e.match(f) ? "variable" : (e.next(), c)
        }

        function i(e, n, i) {
            return function(o, a) {
                for (; !o.eol();)
                    if (o.eatWhile(/[^'"\/\\]/), o.eat("\\")) {
                        if (o.next(), n && o.eol()) return i
                    } else {
                        if (o.match(e)) return a.tokenize = r, i;
                        o.eat(/['"\/]/)
                    }
                return n && (t.singleLineStringErrors ? i = c : a.tokenize = r), i
            }
        }

        function o(e, t) {
            for (; !e.eol();) {
                if (e.eatWhile(/[^#]/), e.match("###")) {
                    t.tokenize = r;
                    break
                }
                e.eatWhile("#")
            }
            return "comment"
        }

        function a(t, n, r) {
            r = r || "coffee";
            for (var i = 0, o = !1, a = null, l = n.scope; l; l = l.prev)
                if ("coffee" === l.type || "}" == l.type) {
                    i = l.offset + e.indentUnit;
                    break
                }
            "coffee" !== r ? (o = null, a = t.column() + t.current().length) : n.scope.align && (n.scope.align = !1), n.scope = {
                offset: i,
                type: r,
                prev: n.scope,
                align: o,
                alignOffset: a
            }
        }

        function l(e, t) {
            if (t.scope.prev) {
                if ("coffee" === t.scope.type) {
                    for (var n = e.indentation(), r = !1, i = t.scope; i; i = i.prev)
                        if (n === i.offset) {
                            r = !0;
                            break
                        }
                    if (!r) return !0;
                    for (; t.scope.prev && t.scope.offset !== n;) t.scope = t.scope.prev;
                    return !1
                }
                return t.scope = t.scope.prev, !1
            }
        }

        function s(e, t) {
            var n = t.tokenize(e, t),
                r = e.current();
            "return" === r && (t.dedent = !0), (("->" === r || "=>" === r) && e.eol() || "indent" === n) && a(e, t);
            var i = "[({".indexOf(r);
            if (-1 !== i && a(e, t, "])}".slice(i, i + 1)), m.exec(r) && a(e, t), "then" == r && l(e, t), "dedent" === n && l(e, t)) return c;
            if (-1 !== (i = "])}".indexOf(r))) {
                for (;
                    "coffee" == t.scope.type && t.scope.prev;) t.scope = t.scope.prev;
                t.scope.type == r && (t.scope = t.scope.prev)
            }
            return t.dedent && e.eol() && ("coffee" == t.scope.type && t.scope.prev && (t.scope = t.scope.prev), t.dedent = !1), n
        }
        var c = "error",
            u = /^(?:->|=>|\+[+=]?|-[\-=]?|\*[\*=]?|\/[\/=]?|[=!]=|<[><]?=?|>>?=?|%=?|&=?|\|=?|\^=?|\~|!|\?|(or|and|\|\||&&|\?)=)/,
            d = /^(?:[()\[\]{},:`=;]|\.\.?\.?)/,
            f = /^[_A-Za-z$][_A-Za-z$0-9]*/,
            h = /^@[_A-Za-z$][_A-Za-z$0-9]*/,
            p = n(["and", "or", "not", "is", "isnt", "in", "instanceof", "typeof"]),
            m = ["for", "while", "loop", "if", "unless", "else", "switch", "try", "catch", "finally", "class"],
            g = ["break", "by", "continue", "debugger", "delete", "do", "in", "of", "new", "return", "then", "this", "@", "throw", "when", "until", "extends"],
            v = n(m.concat(g));
        m = n(m);
        var y = /^('{3}|\"{3}|['\"])/,
            b = /^(\/{3}|\/)/,
            k = n(["Infinity", "NaN", "undefined", "null", "true", "false", "on", "off", "yes", "no"]);
        return {
            startState: function(e) {
                return {
                    tokenize: r,
                    scope: {
                        offset: e || 0,
                        type: "coffee",
                        prev: null,
                        align: !1
                    },
                    prop: !1,
                    dedent: 0
                }
            },
            token: function(e, t) {
                var n = null === t.scope.align && t.scope;
                n && e.sol() && (n.align = !1);
                var r = s(e, t);
                return r && "comment" != r && (n && (n.align = !0), t.prop = "punctuation" == r && "." == e.current()), r
            },
            indent: function(e, t) {
                if (e.tokenize != r) return 0;
                var n = e.scope,
                    i = t && "])}".indexOf(t.charAt(0)) > -1;
                if (i)
                    for (;
                        "coffee" == n.type && n.prev;) n = n.prev;
                var o = i && n.type === t.charAt(0);
                return n.align ? n.alignOffset - (o ? 1 : 0) : (o ? n.prev : n).offset
            },
            lineComment: "#",
            fold: "indent"
        }
    })), e.defineMIME("application/vnd.coffeescript", "coffeescript"), e.defineMIME("text/x-coffeescript", "coffeescript"), e.defineMIME("text/coffeescript", "coffeescript")
})),
function(e) {
    "object" == typeof exports && "object" == typeof module ? e(require("../../lib/codemirror")) : "function" == typeof define && define.amd ? define(["../../lib/codemirror"], e) : e(CodeMirror)
}((function(e) {
    "use strict";

    function t(e) {
        for (var t = {}, n = 0; n < e.length; ++n) t[e[n].toLowerCase()] = !0;
        return t
    }

    function n(e, t) {
        for (var n, r = !1; null != (n = e.next());) {
            if (r && "/" == n) {
                t.tokenize = null;
                break
            }
            r = "*" == n
        }
        return ["comment", "comment"]
    }
    e.defineMode("css", (function(t, n) {
        function r(e, t) {
            return p = t, e
        }

        function i(e, t) {
            var n = e.next();
            if (v[n]) {
                var i = v[n](e, t);
                if (!1 !== i) return i
            }
            return "@" == n ? (e.eatWhile(/[\w\\\-]/), r("def", e.current())) : "=" == n || ("~" == n || "|" == n) && e.eat("=") ? r(null, "compare") : '"' == n || "'" == n ? (t.tokenize = o(n), t.tokenize(e, t)) : "#" == n ? (e.eatWhile(/[\w\\\-]/), r("atom", "hash")) : "!" == n ? (e.match(/^\s*\w*/), r("keyword", "important")) : /\d/.test(n) || "." == n && e.eat(/\d/) ? (e.eatWhile(/[\w.%]/), r("number", "unit")) : "-" !== n ? /[,+>*\/]/.test(n) ? r(null, "select-op") : "." == n && e.match(/^-?[_a-z][_a-z0-9-]*/i) ? r("qualifier", "qualifier") : /[:;{}\[\]\(\)]/.test(n) ? r(null, n) : e.match(/^[\w-.]+(?=\()/) ? (/^(url(-prefix)?|domain|regexp)$/i.test(e.current()) && (t.tokenize = a), r("variable callee", "variable")) : /[\w\\\-]/.test(n) ? (e.eatWhile(/[\w\\\-]/), r("property", "word")) : r(null, null) : /[\d.]/.test(e.peek()) ? (e.eatWhile(/[\w.%]/), r("number", "unit")) : e.match(/^-[\w\\\-]*/) ? (e.eatWhile(/[\w\\\-]/), e.match(/^\s*:/, !1) ? r("variable-2", "variable-definition") : r("variable-2", "variable")) : e.match(/^\w+-/) ? r("meta", "meta") : void 0
        }

        function o(e) {
            return function(t, n) {
                for (var i, o = !1; null != (i = t.next());) {
                    if (i == e && !o) {
                        ")" == e && t.backUp(1);
                        break
                    }
                    o = !o && "\\" == i
                }
                return (i == e || !o && ")" != e) && (n.tokenize = null), r("string", "string")
            }
        }

        function a(e, t) {
            return e.next(), e.match(/^\s*[\"\')]/, !1) ? t.tokenize = null : t.tokenize = o(")"), r(null, "(")
        }

        function l(e, t, n) {
            this.type = e, this.indent = t, this.prev = n
        }

        function s(e, t, n, r) {
            return e.context = new l(n, t.indentation() + (!1 === r ? 0 : g), e.context), n
        }

        function c(e) {
            return e.context.prev && (e.context = e.context.prev), e.context.type
        }

        function u(e, t, n) {
            return E[n.context.type](e, t, n)
        }

        function d(e, t, n, r) {
            for (var i = r || 1; i > 0; i--) n.context = n.context.prev;
            return u(e, t, n)
        }

        function f(e) {
            var t = e.current().toLowerCase();
            m = M.hasOwnProperty(t) ? "atom" : T.hasOwnProperty(t) ? "keyword" : "variable"
        }
        var h = n.inline;
        n.propertyKeywords || (n = e.resolveMode("text/css"));
        var p, m, g = t.indentUnit,
            v = n.tokenHooks,
            y = n.documentTypes || {},
            b = n.mediaTypes || {},
            k = n.mediaFeatures || {},
            x = n.mediaValueKeywords || {},
            w = n.propertyKeywords || {},
            C = n.nonStandardPropertyKeywords || {},
            S = n.fontProperties || {},
            L = n.counterDescriptors || {},
            T = n.colorKeywords || {},
            M = n.valueKeywords || {},
            A = n.allowNested,
            z = n.lineComment,
            O = !0 === n.supportsAtComponent,
            F = !1 !== t.highlightNonStandardPropertyKeywords,
            E = {
                top: function(e, t, n) {
                    if ("{" == e) return s(n, t, "block");
                    if ("}" == e && n.context.prev) return c(n);
                    if (O && /@component/i.test(e)) return s(n, t, "atComponentBlock");
                    if (/^@(-moz-)?document$/i.test(e)) return s(n, t, "documentTypes");
                    if (/^@(media|supports|(-moz-)?document|import)$/i.test(e)) return s(n, t, "atBlock");
                    if (/^@(font-face|counter-style)/i.test(e)) return n.stateArg = e, "restricted_atBlock_before";
                    if (/^@(-(moz|ms|o|webkit)-)?keyframes$/i.test(e)) return "keyframes";
                    if (e && "@" == e.charAt(0)) return s(n, t, "at");
                    if ("hash" == e) m = "builtin";
                    else if ("word" == e) m = "tag";
                    else {
                        if ("variable-definition" == e) return "maybeprop";
                        if ("interpolation" == e) return s(n, t, "interpolation");
                        if (":" == e) return "pseudo";
                        if (A && "(" == e) return s(n, t, "parens")
                    }
                    return n.context.type
                },
                block: function(e, t, n) {
                    if ("word" == e) {
                        var r = t.current().toLowerCase();
                        return w.hasOwnProperty(r) ? (m = "property", "maybeprop") : C.hasOwnProperty(r) ? (m = F ? "string-2" : "property", "maybeprop") : A ? (m = t.match(/^\s*:(?:\s|$)/, !1) ? "property" : "tag", "block") : (m += " error", "maybeprop")
                    }
                    return "meta" == e ? "block" : A || "hash" != e && "qualifier" != e ? E.top(e, t, n) : (m = "error", "block")
                },
                maybeprop: function(e, t, n) {
                    return ":" == e ? s(n, t, "prop") : u(e, t, n)
                },
                prop: function(e, t, n) {
                    if (";" == e) return c(n);
                    if ("{" == e && A) return s(n, t, "propBlock");
                    if ("}" == e || "{" == e) return d(e, t, n);
                    if ("(" == e) return s(n, t, "parens");
                    if ("hash" != e || /^#([0-9a-fA-f]{3,4}|[0-9a-fA-f]{6}|[0-9a-fA-f]{8})$/.test(t.current())) {
                        if ("word" == e) f(t);
                        else if ("interpolation" == e) return s(n, t, "interpolation")
                    } else m += " error";
                    return "prop"
                },
                propBlock: function(e, t, n) {
                    return "}" == e ? c(n) : "word" == e ? (m = "property", "maybeprop") : n.context.type
                },
                parens: function(e, t, n) {
                    return "{" == e || "}" == e ? d(e, t, n) : ")" == e ? c(n) : "(" == e ? s(n, t, "parens") : "interpolation" == e ? s(n, t, "interpolation") : ("word" == e && f(t), "parens")
                },
                pseudo: function(e, t, n) {
                    return "meta" == e ? "pseudo" : "word" == e ? (m = "variable-3", n.context.type) : u(e, t, n)
                },
                documentTypes: function(e, t, n) {
                    return "word" == e && y.hasOwnProperty(t.current()) ? (m = "tag", n.context.type) : E.atBlock(e, t, n)
                },
                atBlock: function(e, t, n) {
                    if ("(" == e) return s(n, t, "atBlock_parens");
                    if ("}" == e || ";" == e) return d(e, t, n);
                    if ("{" == e) return c(n) && s(n, t, A ? "block" : "top");
                    if ("interpolation" == e) return s(n, t, "interpolation");
                    if ("word" == e) {
                        var r = t.current().toLowerCase();
                        m = "only" == r || "not" == r || "and" == r || "or" == r ? "keyword" : b.hasOwnProperty(r) ? "attribute" : k.hasOwnProperty(r) ? "property" : x.hasOwnProperty(r) ? "keyword" : w.hasOwnProperty(r) ? "property" : C.hasOwnProperty(r) ? F ? "string-2" : "property" : M.hasOwnProperty(r) ? "atom" : T.hasOwnProperty(r) ? "keyword" : "error"
                    }
                    return n.context.type
                },
                atComponentBlock: function(e, t, n) {
                    return "}" == e ? d(e, t, n) : "{" == e ? c(n) && s(n, t, A ? "block" : "top", !1) : ("word" == e && (m = "error"), n.context.type)
                },
                atBlock_parens: function(e, t, n) {
                    return ")" == e ? c(n) : "{" == e || "}" == e ? d(e, t, n, 2) : E.atBlock(e, t, n)
                },
                restricted_atBlock_before: function(e, t, n) {
                    return "{" == e ? s(n, t, "restricted_atBlock") : "word" == e && "@counter-style" == n.stateArg ? (m = "variable", "restricted_atBlock_before") : u(e, t, n)
                },
                restricted_atBlock: function(e, t, n) {
                    return "}" == e ? (n.stateArg = null, c(n)) : "word" == e ? (m = "@font-face" == n.stateArg && !S.hasOwnProperty(t.current().toLowerCase()) || "@counter-style" == n.stateArg && !L.hasOwnProperty(t.current().toLowerCase()) ? "error" : "property", "maybeprop") : "restricted_atBlock"
                },
                keyframes: function(e, t, n) {
                    return "word" == e ? (m = "variable", "keyframes") : "{" == e ? s(n, t, "top") : u(e, t, n)
                },
                at: function(e, t, n) {
                    return ";" == e ? c(n) : "{" == e || "}" == e ? d(e, t, n) : ("word" == e ? m = "tag" : "hash" == e && (m = "builtin"), "at")
                },
                interpolation: function(e, t, n) {
                    return "}" == e ? c(n) : "{" == e || ";" == e ? d(e, t, n) : ("word" == e ? m = "variable" : "variable" != e && "(" != e && ")" != e && (m = "error"), "interpolation")
                }
            };
        return {
            startState: function(e) {
                return {
                    tokenize: null,
                    state: h ? "block" : "top",
                    stateArg: null,
                    context: new l(h ? "block" : "top", e || 0, null)
                }
            },
            token: function(e, t) {
                if (!t.tokenize && e.eatSpace()) return null;
                var n = (t.tokenize || i)(e, t);
                return n && "object" == typeof n && (p = n[1], n = n[0]), m = n, "comment" != p && (t.state = E[t.state](p, e, t)), m
            },
            indent: function(e, t) {
                var n = e.context,
                    r = t && t.charAt(0),
                    i = n.indent;
                return "prop" != n.type || "}" != r && ")" != r || (n = n.prev), n.prev && ("}" != r || "block" != n.type && "top" != n.type && "interpolation" != n.type && "restricted_atBlock" != n.type ? (")" != r || "parens" != n.type && "atBlock_parens" != n.type) && ("{" != r || "at" != n.type && "atBlock" != n.type) || (i = Math.max(0, n.indent - g)) : i = (n = n.prev).indent), i
            },
            electricChars: "}",
            blockCommentStart: "/*",
            blockCommentEnd: "*/",
            blockCommentContinue: " * ",
            lineComment: z,
            fold: "brace"
        }
    }));
    var r = ["domain", "regexp", "url", "url-prefix"],
        i = t(r),
        o = ["all", "aural", "braille", "handheld", "print", "projection", "screen", "tty", "tv", "embossed"],
        a = t(o),
        l = ["width", "min-width", "max-width", "height", "min-height", "max-height", "device-width", "min-device-width", "max-device-width", "device-height", "min-device-height", "max-device-height", "aspect-ratio", "min-aspect-ratio", "max-aspect-ratio", "device-aspect-ratio", "min-device-aspect-ratio", "max-device-aspect-ratio", "color", "min-color", "max-color", "color-index", "min-color-index", "max-color-index", "monochrome", "min-monochrome", "max-monochrome", "resolution", "min-resolution", "max-resolution", "scan", "grid", "orientation", "device-pixel-ratio", "min-device-pixel-ratio", "max-device-pixel-ratio", "pointer", "any-pointer", "hover", "any-hover", "prefers-color-scheme", "dynamic-range", "video-dynamic-range"],
        s = t(l),
        c = ["landscape", "portrait", "none", "coarse", "fine", "on-demand", "hover", "interlace", "progressive", "dark", "light", "standard", "high"],
        u = t(c),
        d = ["align-content", "align-items", "align-self", "alignment-adjust", "alignment-baseline", "all", "anchor-point", "animation", "animation-delay", "animation-direction", "animation-duration", "animation-fill-mode", "animation-iteration-count", "animation-name", "animation-play-state", "animation-timing-function", "appearance", "azimuth", "backdrop-filter", "backface-visibility", "background", "background-attachment", "background-blend-mode", "background-clip", "background-color", "background-image", "background-origin", "background-position", "background-position-x", "background-position-y", "background-repeat", "background-size", "baseline-shift", "binding", "bleed", "block-size", "bookmark-label", "bookmark-level", "bookmark-state", "bookmark-target", "border", "border-bottom", "border-bottom-color", "border-bottom-left-radius", "border-bottom-right-radius", "border-bottom-style", "border-bottom-width", "border-collapse", "border-color", "border-image", "border-image-outset", "border-image-repeat", "border-image-slice", "border-image-source", "border-image-width", "border-left", "border-left-color", "border-left-style", "border-left-width", "border-radius", "border-right", "border-right-color", "border-right-style", "border-right-width", "border-spacing", "border-style", "border-top", "border-top-color", "border-top-left-radius", "border-top-right-radius", "border-top-style", "border-top-width", "border-width", "bottom", "box-decoration-break", "box-shadow", "box-sizing", "break-after", "break-before", "break-inside", "caption-side", "caret-color", "clear", "clip", "color", "color-profile", "column-count", "column-fill", "column-gap", "column-rule", "column-rule-color", "column-rule-style", "column-rule-width", "column-span", "column-width", "columns", "contain", "content", "counter-increment", "counter-reset", "crop", "cue", "cue-after", "cue-before", "cursor", "direction", "display", "dominant-baseline", "drop-initial-after-adjust", "drop-initial-after-align", "drop-initial-before-adjust", "drop-initial-before-align", "drop-initial-size", "drop-initial-value", "elevation", "empty-cells", "fit", "fit-content", "fit-position", "flex", "flex-basis", "flex-direction", "flex-flow", "flex-grow", "flex-shrink", "flex-wrap", "float", "float-offset", "flow-from", "flow-into", "font", "font-family", "font-feature-settings", "font-kerning", "font-language-override", "font-optical-sizing", "font-size", "font-size-adjust", "font-stretch", "font-style", "font-synthesis", "font-variant", "font-variant-alternates", "font-variant-caps", "font-variant-east-asian", "font-variant-ligatures", "font-variant-numeric", "font-variant-position", "font-variation-settings", "font-weight", "gap", "grid", "grid-area", "grid-auto-columns", "grid-auto-flow", "grid-auto-rows", "grid-column", "grid-column-end", "grid-column-gap", "grid-column-start", "grid-gap", "grid-row", "grid-row-end", "grid-row-gap", "grid-row-start", "grid-template", "grid-template-areas", "grid-template-columns", "grid-template-rows", "hanging-punctuation", "height", "hyphens", "icon", "image-orientation", "image-rendering", "image-resolution", "inline-box-align", "inset", "inset-block", "inset-block-end", "inset-block-start", "inset-inline", "inset-inline-end", "inset-inline-start", "isolation", "justify-content", "justify-items", "justify-self", "left", "letter-spacing", "line-break", "line-height", "line-height-step", "line-stacking", "line-stacking-ruby", "line-stacking-shift", "line-stacking-strategy", "list-style", "list-style-image", "list-style-position", "list-style-type", "margin", "margin-bottom", "margin-left", "margin-right", "margin-top", "marks", "marquee-direction", "marquee-loop", "marquee-play-count", "marquee-speed", "marquee-style", "mask-clip", "mask-composite", "mask-image", "mask-mode", "mask-origin", "mask-position", "mask-repeat", "mask-size", "mask-type", "max-block-size", "max-height", "max-inline-size", "max-width", "min-block-size", "min-height", "min-inline-size", "min-width", "mix-blend-mode", "move-to", "nav-down", "nav-index", "nav-left", "nav-right", "nav-up", "object-fit", "object-position", "offset", "offset-anchor", "offset-distance", "offset-path", "offset-position", "offset-rotate", "opacity", "order", "orphans", "outline", "outline-color", "outline-offset", "outline-style", "outline-width", "overflow", "overflow-style", "overflow-wrap", "overflow-x", "overflow-y", "padding", "padding-bottom", "padding-left", "padding-right", "padding-top", "page", "page-break-after", "page-break-before", "page-break-inside", "page-policy", "pause", "pause-after", "pause-before", "perspective", "perspective-origin", "pitch", "pitch-range", "place-content", "place-items", "place-self", "play-during", "position", "presentation-level", "punctuation-trim", "quotes", "region-break-after", "region-break-before", "region-break-inside", "region-fragment", "rendering-intent", "resize", "rest", "rest-after", "rest-before", "richness", "right", "rotate", "rotation", "rotation-point", "row-gap", "ruby-align", "ruby-overhang", "ruby-position", "ruby-span", "scale", "scroll-behavior", "scroll-margin", "scroll-margin-block", "scroll-margin-block-end", "scroll-margin-block-start", "scroll-margin-bottom", "scroll-margin-inline", "scroll-margin-inline-end", "scroll-margin-inline-start", "scroll-margin-left", "scroll-margin-right", "scroll-margin-top", "scroll-padding", "scroll-padding-block", "scroll-padding-block-end", "scroll-padding-block-start", "scroll-padding-bottom", "scroll-padding-inline", "scroll-padding-inline-end", "scroll-padding-inline-start", "scroll-padding-left", "scroll-padding-right", "scroll-padding-top", "scroll-snap-align", "scroll-snap-type", "shape-image-threshold", "shape-inside", "shape-margin", "shape-outside", "size", "speak", "speak-as", "speak-header", "speak-numeral", "speak-punctuation", "speech-rate", "stress", "string-set", "tab-size", "table-layout", "target", "target-name", "target-new", "target-position", "text-align", "text-align-last", "text-combine-upright", "text-decoration", "text-decoration-color", "text-decoration-line", "text-decoration-skip", "text-decoration-skip-ink", "text-decoration-style", "text-emphasis", "text-emphasis-color", "text-emphasis-position", "text-emphasis-style", "text-height", "text-indent", "text-justify", "text-orientation", "text-outline", "text-overflow", "text-rendering", "text-shadow", "text-size-adjust", "text-space-collapse", "text-transform", "text-underline-position", "text-wrap", "top", "touch-action", "transform", "transform-origin", "transform-style", "transition", "transition-delay", "transition-duration", "transition-property", "transition-timing-function", "translate", "unicode-bidi", "user-select", "vertical-align", "visibility", "voice-balance", "voice-duration", "voice-family", "voice-pitch", "voice-range", "voice-rate", "voice-stress", "voice-volume", "volume", "white-space", "widows", "width", "will-change", "word-break", "word-spacing", "word-wrap", "writing-mode", "z-index", "clip-path", "clip-rule", "mask", "enable-background", "filter", "flood-color", "flood-opacity", "lighting-color", "stop-color", "stop-opacity", "pointer-events", "color-interpolation", "color-interpolation-filters", "color-rendering", "fill", "fill-opacity", "fill-rule", "image-rendering", "marker", "marker-end", "marker-mid", "marker-start", "paint-order", "shape-rendering", "stroke", "stroke-dasharray", "stroke-dashoffset", "stroke-linecap", "stroke-linejoin", "stroke-miterlimit", "stroke-opacity", "stroke-width", "text-rendering", "baseline-shift", "dominant-baseline", "glyph-orientation-horizontal", "glyph-orientation-vertical", "text-anchor", "writing-mode"],
        f = t(d),
        h = ["accent-color", "aspect-ratio", "border-block", "border-block-color", "border-block-end", "border-block-end-color", "border-block-end-style", "border-block-end-width", "border-block-start", "border-block-start-color", "border-block-start-style", "border-block-start-width", "border-block-style", "border-block-width", "border-inline", "border-inline-color", "border-inline-end", "border-inline-end-color", "border-inline-end-style", "border-inline-end-width", "border-inline-start", "border-inline-start-color", "border-inline-start-style", "border-inline-start-width", "border-inline-style", "border-inline-width", "content-visibility", "margin-block", "margin-block-end", "margin-block-start", "margin-inline", "margin-inline-end", "margin-inline-start", "overflow-anchor", "overscroll-behavior", "padding-block", "padding-block-end", "padding-block-start", "padding-inline", "padding-inline-end", "padding-inline-start", "scroll-snap-stop", "scrollbar-3d-light-color", "scrollbar-arrow-color", "scrollbar-base-color", "scrollbar-dark-shadow-color", "scrollbar-face-color", "scrollbar-highlight-color", "scrollbar-shadow-color", "scrollbar-track-color", "searchfield-cancel-button", "searchfield-decoration", "searchfield-results-button", "searchfield-results-decoration", "shape-inside", "zoom"],
        p = t(h),
        m = t(["font-display", "font-family", "src", "unicode-range", "font-variant", "font-feature-settings", "font-stretch", "font-weight", "font-style"]),
        g = t(["additive-symbols", "fallback", "negative", "pad", "prefix", "range", "speak-as", "suffix", "symbols", "system"]),
        v = ["aliceblue", "antiquewhite", "aqua", "aquamarine", "azure", "beige", "bisque", "black", "blanchedalmond", "blue", "blueviolet", "brown", "burlywood", "cadetblue", "chartreuse", "chocolate", "coral", "cornflowerblue", "cornsilk", "crimson", "cyan", "darkblue", "darkcyan", "darkgoldenrod", "darkgray", "darkgreen", "darkgrey", "darkkhaki", "darkmagenta", "darkolivegreen", "darkorange", "darkorchid", "darkred", "darksalmon", "darkseagreen", "darkslateblue", "darkslategray", "darkslategrey", "darkturquoise", "darkviolet", "deeppink", "deepskyblue", "dimgray", "dimgrey", "dodgerblue", "firebrick", "floralwhite", "forestgreen", "fuchsia", "gainsboro", "ghostwhite", "gold", "goldenrod", "gray", "grey", "green", "greenyellow", "honeydew", "hotpink", "indianred", "indigo", "ivory", "khaki", "lavender", "lavenderblush", "lawngreen", "lemonchiffon", "lightblue", "lightcoral", "lightcyan", "lightgoldenrodyellow", "lightgray", "lightgreen", "lightgrey", "lightpink", "lightsalmon", "lightseagreen", "lightskyblue", "lightslategray", "lightslategrey", "lightsteelblue", "lightyellow", "lime", "limegreen", "linen", "magenta", "maroon", "mediumaquamarine", "mediumblue", "mediumorchid", "mediumpurple", "mediumseagreen", "mediumslateblue", "mediumspringgreen", "mediumturquoise", "mediumvioletred", "midnightblue", "mintcream", "mistyrose", "moccasin", "navajowhite", "navy", "oldlace", "olive", "olivedrab", "orange", "orangered", "orchid", "palegoldenrod", "palegreen", "paleturquoise", "palevioletred", "papayawhip", "peachpuff", "peru", "pink", "plum", "powderblue", "purple", "rebeccapurple", "red", "rosybrown", "royalblue", "saddlebrown", "salmon", "sandybrown", "seagreen", "seashell", "sienna", "silver", "skyblue", "slateblue", "slategray", "slategrey", "snow", "springgreen", "steelblue", "tan", "teal", "thistle", "tomato", "turquoise", "violet", "wheat", "white", "whitesmoke", "yellow", "yellowgreen"],
        y = t(v),
        b = ["above", "absolute", "activeborder", "additive", "activecaption", "afar", "after-white-space", "ahead", "alias", "all", "all-scroll", "alphabetic", "alternate", "always", "amharic", "amharic-abegede", "antialiased", "appworkspace", "arabic-indic", "armenian", "asterisks", "attr", "auto", "auto-flow", "avoid", "avoid-column", "avoid-page", "avoid-region", "axis-pan", "background", "backwards", "baseline", "below", "bidi-override", "binary", "bengali", "blink", "block", "block-axis", "blur", "bold", "bolder", "border", "border-box", "both", "bottom", "break", "break-all", "break-word", "brightness", "bullets", "button", "button-bevel", "buttonface", "buttonhighlight", "buttonshadow", "buttontext", "calc", "cambodian", "capitalize", "caps-lock-indicator", "caption", "captiontext", "caret", "cell", "center", "checkbox", "circle", "cjk-decimal", "cjk-earthly-branch", "cjk-heavenly-stem", "cjk-ideographic", "clear", "clip", "close-quote", "col-resize", "collapse", "color", "color-burn", "color-dodge", "column", "column-reverse", "compact", "condensed", "conic-gradient", "contain", "content", "contents", "content-box", "context-menu", "continuous", "contrast", "copy", "counter", "counters", "cover", "crop", "cross", "crosshair", "cubic-bezier", "currentcolor", "cursive", "cyclic", "darken", "dashed", "decimal", "decimal-leading-zero", "default", "default-button", "dense", "destination-atop", "destination-in", "destination-out", "destination-over", "devanagari", "difference", "disc", "discard", "disclosure-closed", "disclosure-open", "document", "dot-dash", "dot-dot-dash", "dotted", "double", "down", "drop-shadow", "e-resize", "ease", "ease-in", "ease-in-out", "ease-out", "element", "ellipse", "ellipsis", "embed", "end", "ethiopic", "ethiopic-abegede", "ethiopic-abegede-am-et", "ethiopic-abegede-gez", "ethiopic-abegede-ti-er", "ethiopic-abegede-ti-et", "ethiopic-halehame-aa-er", "ethiopic-halehame-aa-et", "ethiopic-halehame-am-et", "ethiopic-halehame-gez", "ethiopic-halehame-om-et", "ethiopic-halehame-sid-et", "ethiopic-halehame-so-et", "ethiopic-halehame-ti-er", "ethiopic-halehame-ti-et", "ethiopic-halehame-tig", "ethiopic-numeric", "ew-resize", "exclusion", "expanded", "extends", "extra-condensed", "extra-expanded", "fantasy", "fast", "fill", "fill-box", "fixed", "flat", "flex", "flex-end", "flex-start", "footnotes", "forwards", "from", "geometricPrecision", "georgian", "grayscale", "graytext", "grid", "groove", "gujarati", "gurmukhi", "hand", "hangul", "hangul-consonant", "hard-light", "hebrew", "help", "hidden", "hide", "higher", "highlight", "highlighttext", "hiragana", "hiragana-iroha", "horizontal", "hsl", "hsla", "hue", "hue-rotate", "icon", "ignore", "inactiveborder", "inactivecaption", "inactivecaptiontext", "infinite", "infobackground", "infotext", "inherit", "initial", "inline", "inline-axis", "inline-block", "inline-flex", "inline-grid", "inline-table", "inset", "inside", "intrinsic", "invert", "italic", "japanese-formal", "japanese-informal", "justify", "kannada", "katakana", "katakana-iroha", "keep-all", "khmer", "korean-hangul-formal", "korean-hanja-formal", "korean-hanja-informal", "landscape", "lao", "large", "larger", "left", "level", "lighter", "lighten", "line-through", "linear", "linear-gradient", "lines", "list-item", "listbox", "listitem", "local", "logical", "loud", "lower", "lower-alpha", "lower-armenian", "lower-greek", "lower-hexadecimal", "lower-latin", "lower-norwegian", "lower-roman", "lowercase", "ltr", "luminosity", "malayalam", "manipulation", "match", "matrix", "matrix3d", "media-controls-background", "media-current-time-display", "media-fullscreen-button", "media-mute-button", "media-play-button", "media-return-to-realtime-button", "media-rewind-button", "media-seek-back-button", "media-seek-forward-button", "media-slider", "media-sliderthumb", "media-time-remaining-display", "media-volume-slider", "media-volume-slider-container", "media-volume-sliderthumb", "medium", "menu", "menulist", "menulist-button", "menulist-text", "menulist-textfield", "menutext", "message-box", "middle", "min-intrinsic", "mix", "mongolian", "monospace", "move", "multiple", "multiple_mask_images", "multiply", "myanmar", "n-resize", "narrower", "ne-resize", "nesw-resize", "no-close-quote", "no-drop", "no-open-quote", "no-repeat", "none", "normal", "not-allowed", "nowrap", "ns-resize", "numbers", "numeric", "nw-resize", "nwse-resize", "oblique", "octal", "opacity", "open-quote", "optimizeLegibility", "optimizeSpeed", "oriya", "oromo", "outset", "outside", "outside-shape", "overlay", "overline", "padding", "padding-box", "painted", "page", "paused", "persian", "perspective", "pinch-zoom", "plus-darker", "plus-lighter", "pointer", "polygon", "portrait", "pre", "pre-line", "pre-wrap", "preserve-3d", "progress", "push-button", "radial-gradient", "radio", "read-only", "read-write", "read-write-plaintext-only", "rectangle", "region", "relative", "repeat", "repeating-linear-gradient", "repeating-radial-gradient", "repeating-conic-gradient", "repeat-x", "repeat-y", "reset", "reverse", "rgb", "rgba", "ridge", "right", "rotate", "rotate3d", "rotateX", "rotateY", "rotateZ", "round", "row", "row-resize", "row-reverse", "rtl", "run-in", "running", "s-resize", "sans-serif", "saturate", "saturation", "scale", "scale3d", "scaleX", "scaleY", "scaleZ", "screen", "scroll", "scrollbar", "scroll-position", "se-resize", "searchfield", "searchfield-cancel-button", "searchfield-decoration", "searchfield-results-button", "searchfield-results-decoration", "self-start", "self-end", "semi-condensed", "semi-expanded", "separate", "sepia", "serif", "show", "sidama", "simp-chinese-formal", "simp-chinese-informal", "single", "skew", "skewX", "skewY", "skip-white-space", "slide", "slider-horizontal", "slider-vertical", "sliderthumb-horizontal", "sliderthumb-vertical", "slow", "small", "small-caps", "small-caption", "smaller", "soft-light", "solid", "somali", "source-atop", "source-in", "source-out", "source-over", "space", "space-around", "space-between", "space-evenly", "spell-out", "square", "square-button", "start", "static", "status-bar", "stretch", "stroke", "stroke-box", "sub", "subpixel-antialiased", "svg_masks", "super", "sw-resize", "symbolic", "symbols", "system-ui", "table", "table-caption", "table-cell", "table-column", "table-column-group", "table-footer-group", "table-header-group", "table-row", "table-row-group", "tamil", "telugu", "text", "text-bottom", "text-top", "textarea", "textfield", "thai", "thick", "thin", "threeddarkshadow", "threedface", "threedhighlight", "threedlightshadow", "threedshadow", "tibetan", "tigre", "tigrinya-er", "tigrinya-er-abegede", "tigrinya-et", "tigrinya-et-abegede", "to", "top", "trad-chinese-formal", "trad-chinese-informal", "transform", "translate", "translate3d", "translateX", "translateY", "translateZ", "transparent", "ultra-condensed", "ultra-expanded", "underline", "unidirectional-pan", "unset", "up", "upper-alpha", "upper-armenian", "upper-greek", "upper-hexadecimal", "upper-latin", "upper-norwegian", "upper-roman", "uppercase", "urdu", "url", "var", "vertical", "vertical-text", "view-box", "visible", "visibleFill", "visiblePainted", "visibleStroke", "visual", "w-resize", "wait", "wave", "wider", "window", "windowframe", "windowtext", "words", "wrap", "wrap-reverse", "x-large", "x-small", "xor", "xx-large", "xx-small"],
        k = t(b),
        x = r.concat(o).concat(l).concat(c).concat(d).concat(h).concat(v).concat(b);
    e.registerHelper("hintWords", "css", x), e.defineMIME("text/css", {
        documentTypes: i,
        mediaTypes: a,
        mediaFeatures: s,
        mediaValueKeywords: u,
        propertyKeywords: f,
        nonStandardPropertyKeywords: p,
        fontProperties: m,
        counterDescriptors: g,
        colorKeywords: y,
        valueKeywords: k,
        tokenHooks: {
            "/": function(e, t) {
                return !!e.eat("*") && (t.tokenize = n, n(e, t))
            }
        },
        name: "css"
    }), e.defineMIME("text/x-scss", {
        mediaTypes: a,
        mediaFeatures: s,
        mediaValueKeywords: u,
        propertyKeywords: f,
        nonStandardPropertyKeywords: p,
        colorKeywords: y,
        valueKeywords: k,
        fontProperties: m,
        allowNested: !0,
        lineComment: "//",
        tokenHooks: {
            "/": function(e, t) {
                return e.eat("/") ? (e.skipToEnd(), ["comment", "comment"]) : e.eat("*") ? (t.tokenize = n, n(e, t)) : ["operator", "operator"]
            },
            ":": function(e) {
                return !!e.match(/^\s*\{/, !1) && [null, null]
            },
            $: function(e) {
                return e.match(/^[\w-]+/), e.match(/^\s*:/, !1) ? ["variable-2", "variable-definition"] : ["variable-2", "variable"]
            },
            "#": function(e) {
                return !!e.eat("{") && [null, "interpolation"]
            }
        },
        name: "css",
        helperType: "scss"
    }), e.defineMIME("text/x-less", {
        mediaTypes: a,
        mediaFeatures: s,
        mediaValueKeywords: u,
        propertyKeywords: f,
        nonStandardPropertyKeywords: p,
        colorKeywords: y,
        valueKeywords: k,
        fontProperties: m,
        allowNested: !0,
        lineComment: "//",
        tokenHooks: {
            "/": function(e, t) {
                return e.eat("/") ? (e.skipToEnd(), ["comment", "comment"]) : e.eat("*") ? (t.tokenize = n, n(e, t)) : ["operator", "operator"]
            },
            "@": function(e) {
                return e.eat("{") ? [null, "interpolation"] : !e.match(/^(charset|document|font-face|import|(-(moz|ms|o|webkit)-)?keyframes|media|namespace|page|supports)\b/i, !1) && (e.eatWhile(/[\w\\\-]/), e.match(/^\s*:/, !1) ? ["variable-2", "variable-definition"] : ["variable-2", "variable"])
            },
            "&": function() {
                return ["atom", "atom"]
            }
        },
        name: "css",
        helperType: "less"
    }), e.defineMIME("text/x-gss", {
        documentTypes: i,
        mediaTypes: a,
        mediaFeatures: s,
        propertyKeywords: f,
        nonStandardPropertyKeywords: p,
        fontProperties: m,
        counterDescriptors: g,
        colorKeywords: y,
        valueKeywords: k,
        supportsAtComponent: !0,
        tokenHooks: {
            "/": function(e, t) {
                return !!e.eat("*") && (t.tokenize = n, n(e, t))
            }
        },
        name: "css",
        helperType: "gss"
    })
})),
function(e) {
    "object" == typeof exports && "object" == typeof module ? e(require("../../lib/codemirror"), require("../clike/clike")) : "function" == typeof define && define.amd ? define(["../../lib/codemirror", "../clike/clike"], e) : e(CodeMirror)
}((function(e) {
    "use strict";

    function t(e) {
        for (var t = {}, n = 0; n < e.length; ++n) t[e[n]] = !0;
        return t
    }

    function n(e) {
        (e.interpolationStack || (e.interpolationStack = [])).push(e.tokenize)
    }

    function r(e) {
        return (e.interpolationStack || (e.interpolationStack = [])).pop()
    }

    function i(e) {
        return e.interpolationStack ? e.interpolationStack.length : 0
    }

    function o(e, t, r, i) {
        function o(t, r) {
            for (var o = !1; !t.eol();) {
                if (!i && !o && "$" == t.peek()) return n(r), r.tokenize = a, "string";
                var s = t.next();
                if (s == e && !o && (!l || t.match(e + e))) {
                    r.tokenize = null;
                    break
                }
                o = !i && !o && "\\" == s
            }
            return "string"
        }
        var l = !1;
        if (t.eat(e)) {
            if (!t.eat(e)) return "string";
            l = !0
        }
        return r.tokenize = o, o(t, r)
    }

    function a(e, t) {
        return e.eat("$"), e.eat("{") ? t.tokenize = null : t.tokenize = l, null
    }

    function l(e, t) {
        return e.eatWhile(/[\w_]/), t.tokenize = r(t), "variable"
    }

    function s(e) {
        return function(t, n) {
            for (var r; r = t.next();) {
                if ("*" == r && t.eat("/")) {
                    if (1 == e) {
                        n.tokenize = null;
                        break
                    }
                    return n.tokenize = s(e - 1), n.tokenize(t, n)
                }
                if ("/" == r && t.eat("*")) return n.tokenize = s(e + 1), n.tokenize(t, n)
            }
            return "comment"
        }
    }
    var c = "this super static final const abstract class extends external factory implements mixin get native set typedef with enum throw rethrow assert break case continue default in return new deferred async await covariant try catch finally do else for if switch while import library export part of show hide is as extension on yield late required".split(" "),
        u = "try catch finally do else for if switch while".split(" "),
        d = "true false null".split(" "),
        f = "void bool num int double dynamic var String Null Never".split(" ");
    e.defineMIME("application/dart", {
        name: "clike",
        keywords: t(c),
        blockKeywords: t(u),
        builtin: t(f),
        atoms: t(d),
        hooks: {
            "@": function(e) {
                return e.eatWhile(/[\w\$_\.]/), "meta"
            },
            "'": function(e, t) {
                return o("'", e, t, !1)
            },
            '"': function(e, t) {
                return o('"', e, t, !1)
            },
            r: function(e, t) {
                var n = e.peek();
                return ("'" == n || '"' == n) && o(e.next(), e, t, !0)
            },
            "}": function(e, t) {
                return i(t) > 0 && (t.tokenize = r(t), null)
            },
            "/": function(e, t) {
                return !!e.eat("*") && (t.tokenize = s(1), t.tokenize(e, t))
            },
            token: function(e, t, n) {
                if ("variable" == n && RegExp("^[_$]*[A-Z][a-zA-Z0-9_$]*$", "g").test(e.current())) return "variable-2"
            }
        }
    }), e.registerHelper("hintWords", "application/dart", c.concat(d).concat(f)), e.defineMode("dart", (function(t) {
        return e.getMode(t, "application/dart")
    }), "clike")
})),
function(e) {
    "object" == typeof exports && "object" == typeof module ? e(require("../../lib/codemirror"), require("../htmlmixed/htmlmixed"), require("../ruby/ruby")) : "function" == typeof define && define.amd ? define(["../../lib/codemirror", "../htmlmixed/htmlmixed", "../ruby/ruby"], e) : e(CodeMirror)
}((function(e) {
    "use strict";
    e.defineMode("haml", (function(t) {
        function n(e) {
            return function(t, n) {
                return t.peek() == e && 1 == n.rubyState.tokenize.length ? (t.next(), n.tokenize = i, "closeAttributeTag") : r(t, n)
            }
        }

        function r(e, t) {
            return e.match("-#") ? (e.skipToEnd(), "comment") : a.token(e, t.rubyState)
        }

        function i(e, t) {
            var i = e.peek();
            if ("comment" == t.previousToken.style && t.indented > t.previousToken.indented) return e.skipToEnd(), "commentLine";
            if (t.startOfLine) {
                if ("!" == i && e.match("!!")) return e.skipToEnd(), "tag";
                if (e.match(/^%[\w:#\.]+=/)) return t.tokenize = r, "hamlTag";
                if (e.match(/^%[\w:]+/)) return "hamlTag";
                if ("/" == i) return e.skipToEnd(), "comment"
            }
            if ((t.startOfLine || "hamlTag" == t.previousToken.style) && ("#" == i || "." == i)) return e.match(/[\w-#\.]*/), "hamlAttribute";
            if (t.startOfLine && !e.match("-->", !1) && ("=" == i || "-" == i)) return t.tokenize = r, t.tokenize(e, t);
            if ("hamlTag" == t.previousToken.style || "closeAttributeTag" == t.previousToken.style || "hamlAttribute" == t.previousToken.style) {
                if ("(" == i) return t.tokenize = n(")"), t.tokenize(e, t);
                if ("{" == i && !e.match(/^\{%.*/)) return t.tokenize = n("}"), t.tokenize(e, t)
            }
            return o.token(e, t.htmlState)
        }
        var o = e.getMode(t, {
                name: "htmlmixed"
            }),
            a = e.getMode(t, "ruby");
        return {
            startState: function() {
                return {
                    htmlState: e.startState(o),
                    rubyState: e.startState(a),
                    indented: 0,
                    previousToken: {
                        style: null,
                        indented: 0
                    },
                    tokenize: i
                }
            },
            copyState: function(t) {
                return {
                    htmlState: e.copyState(o, t.htmlState),
                    rubyState: e.copyState(a, t.rubyState),
                    indented: t.indented,
                    previousToken: t.previousToken,
                    tokenize: t.tokenize
                }
            },
            token: function(e, t) {
                if (e.sol() && (t.indented = e.indentation(), t.startOfLine = !0), e.eatSpace()) return null;
                var n = t.tokenize(e, t);
                if (t.startOfLine = !1, n && "commentLine" != n && (t.previousToken = {
                        style: n,
                        indented: t.indented
                    }), e.eol() && t.tokenize == r) {
                    e.backUp(1);
                    var o = e.peek();
                    e.next(), o && "," != o && (t.tokenize = i)
                }
                return "hamlTag" == n ? n = "tag" : "commentLine" == n ? n = "comment" : "hamlAttribute" == n ? n = "attribute" : "closeAttributeTag" == n && (n = null), n
            }
        }
    }), "htmlmixed", "ruby"), e.defineMIME("text/x-haml", "haml")
})),
function(e) {
    "object" == typeof exports && "object" == typeof module ? e(require("../../lib/codemirror"), require("../xml/xml"), require("../javascript/javascript"), require("../css/css")) : "function" == typeof define && define.amd ? define(["../../lib/codemirror", "../xml/xml", "../javascript/javascript", "../css/css"], e) : e(CodeMirror)
}((function(e) {
    "use strict";

    function t(e, t, n) {
        var r = e.current(),
            i = r.search(t);
        return i > -1 ? e.backUp(r.length - i) : r.match(/<\/?$/) && (e.backUp(r.length), e.match(t, !1) || e.match(r)), n
    }

    function n(e) {
        var t = s[e];
        return t || (s[e] = new RegExp("\\s+" + e + "\\s*=\\s*('|\")?([^'\"]+)('|\")?\\s*"))
    }

    function r(e, t) {
        var r = e.match(n(t));
        return r ? /^\s*(.*?)\s*$/.exec(r[2])[1] : ""
    }

    function i(e, t) {
        return new RegExp((t ? "^" : "") + "</\\s*" + e + "\\s*>", "i")
    }

    function o(e, t) {
        for (var n in e)
            for (var r = t[n] || (t[n] = []), i = e[n], o = i.length - 1; o >= 0; o--) r.unshift(i[o])
    }

    function a(e, t) {
        for (var n = 0; n < e.length; n++) {
            var i = e[n];
            if (!i[0] || i[1].test(r(t, i[0]))) return i[2]
        }
    }
    var l = {
            script: [
                ["lang", /(javascript|babel)/i, "javascript"],
                ["type", /^(?:text|application)\/(?:x-)?(?:java|ecma)script$|^module$|^$/i, "javascript"],
                ["type", /./, "text/plain"],
                [null, null, "javascript"]
            ],
            style: [
                ["lang", /^css$/i, "css"],
                ["type", /^(text\/)?(x-)?(stylesheet|css)$/i, "css"],
                ["type", /./, "text/plain"],
                [null, null, "css"]
            ]
        },
        s = {};
    e.defineMode("htmlmixed", (function(n, r) {
        function s(r, o) {
            var l, d = c.token(r, o.htmlState),
                f = /\btag\b/.test(d);
            if (f && !/[<>\s\/]/.test(r.current()) && (l = o.htmlState.tagName && o.htmlState.tagName.toLowerCase()) && u.hasOwnProperty(l)) o.inTag = l + " ";
            else if (o.inTag && f && />$/.test(r.current())) {
                var h = /^([\S]+) (.*)/.exec(o.inTag);
                o.inTag = null;
                var p = ">" == r.current() && a(u[h[1]], h[2]),
                    m = e.getMode(n, p),
                    g = i(h[1], !0),
                    v = i(h[1], !1);
                o.token = function(e, n) {
                    return e.match(g, !1) ? (n.token = s, n.localState = n.localMode = null, null) : t(e, v, n.localMode.token(e, n.localState))
                }, o.localMode = m, o.localState = e.startState(m, c.indent(o.htmlState, "", ""))
            } else o.inTag && (o.inTag += r.current(), r.eol() && (o.inTag += " "));
            return d
        }
        var c = e.getMode(n, {
                name: "xml",
                htmlMode: !0,
                multilineTagIndentFactor: r.multilineTagIndentFactor,
                multilineTagIndentPastTag: r.multilineTagIndentPastTag,
                allowMissingTagName: r.allowMissingTagName
            }),
            u = {},
            d = r && r.tags,
            f = r && r.scriptTypes;
        if (o(l, u), d && o(d, u), f)
            for (var h = f.length - 1; h >= 0; h--) u.script.unshift(["type", f[h].matches, f[h].mode]);
        return {
            startState: function() {
                return {
                    token: s,
                    inTag: null,
                    localMode: null,
                    localState: null,
                    htmlState: e.startState(c)
                }
            },
            copyState: function(t) {
                var n;
                return t.localState && (n = e.copyState(t.localMode, t.localState)), {
                    token: t.token,
                    inTag: t.inTag,
                    localMode: t.localMode,
                    localState: n,
                    htmlState: e.copyState(c, t.htmlState)
                }
            },
            token: function(e, t) {
                return t.token(e, t)
            },
            indent: function(t, n, r) {
                return !t.localMode || /^\s*<\//.test(n) ? c.indent(t.htmlState, n, r) : t.localMode.indent ? t.localMode.indent(t.localState, n, r) : e.Pass
            },
            innerMode: function(e) {
                return {
                    state: e.localState || e.htmlState,
                    mode: e.localMode || c
                }
            }
        }
    }), "xml", "javascript", "css"), e.defineMIME("text/html", "htmlmixed")
})),
function(e) {
    "object" == typeof exports && "object" == typeof module ? e(require("../../lib/codemirror")) : "function" == typeof define && define.amd ? define(["../../lib/codemirror"], e) : e(CodeMirror)
}((function(e) {
    "use strict";
    e.defineMode("javascript", (function(t, n) {
        function r(e) {
            for (var t, n = !1, r = !1; null != (t = e.next());) {
                if (!n) {
                    if ("/" == t && !r) return;
                    "[" == t ? r = !0 : r && "]" == t && (r = !1)
                }
                n = !n && "\\" == t
            }
        }

        function i(e, t, n) {
            return qe = e, Ue = n, t
        }

        function o(e, t) {
            var n = e.next();
            if ('"' == n || "'" == n) return t.tokenize = a(n), t.tokenize(e, t);
            if ("." == n && e.match(/^\d[\d_]*(?:[eE][+\-]?[\d_]+)?/)) return i("number", "number");
            if ("." == n && e.match("..")) return i("spread", "meta");
            if (/[\[\]{}\(\),;\:\.]/.test(n)) return i(n);
            if ("=" == n && e.eat(">")) return i("=>", "operator");
            if ("0" == n && e.match(/^(?:x[\dA-Fa-f_]+|o[0-7_]+|b[01_]+)n?/)) return i("number", "number");
            if (/\d/.test(n)) return e.match(/^[\d_]*(?:n|(?:\.[\d_]*)?(?:[eE][+\-]?[\d_]+)?)?/), i("number", "number");
            if ("/" == n) return e.eat("*") ? (t.tokenize = l, l(e, t)) : e.eat("/") ? (e.skipToEnd(), i("comment", "comment")) : Re(e, t, 1) ? (r(e), e.match(/^\b(([gimyus])(?![gimyus]*\2))+\b/), i("regexp", "string-2")) : (e.eat("="), i("operator", "operator", e.current()));
            if ("`" == n) return t.tokenize = s, s(e, t);
            if ("#" == n && "!" == e.peek()) return e.skipToEnd(), i("meta", "meta");
            if ("#" == n && e.eatWhile(Ze)) return i("variable", "property");
            if ("<" == n && e.match("!--") || "-" == n && e.match("->") && !/\S/.test(e.string.slice(0, e.start))) return e.skipToEnd(), i("comment", "comment");
            if (Je.test(n)) return ">" == n && t.lexical && ">" == t.lexical.type || (e.eat("=") ? "!" != n && "=" != n || e.eat("=") : /[<>*+\-|&?]/.test(n) && (e.eat(n), ">" == n && e.eat(n))), "?" == n && e.eat(".") ? i(".") : i("operator", "operator", e.current());
            if (Ze.test(n)) {
                e.eatWhile(Ze);
                var o = e.current();
                if ("." != t.lastType) {
                    if (Qe.propertyIsEnumerable(o)) {
                        var c = Qe[o];
                        return i(c.type, c.style, o)
                    }
                    if ("async" == o && e.match(/^(\s|\/\*([^*]|\*(?!\/))*?\*\/)*[\[\(\w]/, !1)) return i("async", "keyword", o)
                }
                return i("variable", "variable", o)
            }
        }

        function a(e) {
            return function(t, n) {
                var r, a = !1;
                if (Ve && "@" == t.peek() && t.match(et)) return n.tokenize = o, i("jsonld-keyword", "meta");
                for (; null != (r = t.next()) && (r != e || a);) a = !a && "\\" == r;
                return a || (n.tokenize = o), i("string", "string")
            }
        }

        function l(e, t) {
            for (var n, r = !1; n = e.next();) {
                if ("/" == n && r) {
                    t.tokenize = o;
                    break
                }
                r = "*" == n
            }
            return i("comment", "comment")
        }

        function s(e, t) {
            for (var n, r = !1; null != (n = e.next());) {
                if (!r && ("`" == n || "$" == n && e.eat("{"))) {
                    t.tokenize = o;
                    break
                }
                r = !r && "\\" == n
            }
            return i("quasi", "string-2", e.current())
        }

        function c(e, t) {
            t.fatArrowAt && (t.fatArrowAt = null);
            var n = e.string.indexOf("=>", e.start);
            if (!(n < 0)) {
                if (Xe) {
                    var r = /:\s*(?:\w+(?:<[^>]*>|\[\])?|\{[^}]*\})\s*$/.exec(e.string.slice(e.start, n));
                    r && (n = r.index)
                }
                for (var i = 0, o = !1, a = n - 1; a >= 0; --a) {
                    var l = e.string.charAt(a),
                        s = tt.indexOf(l);
                    if (s >= 0 && s < 3) {
                        if (!i) {
                            ++a;
                            break
                        }
                        if (0 == --i) {
                            "(" == l && (o = !0);
                            break
                        }
                    } else if (s >= 3 && s < 6) ++i;
                    else if (Ze.test(l)) o = !0;
                    else if (/["'\/`]/.test(l))
                        for (;; --a) {
                            if (0 == a) return;
                            if (e.string.charAt(a - 1) == l && "\\" != e.string.charAt(a - 2)) {
                                a--;
                                break
                            }
                        } else if (o && !i) {
                            ++a;
                            break
                        }
                }
                o && !i && (t.fatArrowAt = a)
            }
        }

        function u(e, t, n, r, i, o) {
            this.indented = e, this.column = t, this.type = n, this.prev = i, this.info = o, null != r && (this.align = r)
        }

        function d(e, t) {
            if (!Ye) return !1;
            for (var n = e.localVars; n; n = n.next)
                if (n.name == t) return !0;
            for (var r = e.context; r; r = r.prev)
                for (n = r.vars; n; n = n.next)
                    if (n.name == t) return !0
        }

        function f(e, t, n, r, i) {
            var o = e.cc;
            for (rt.state = e, rt.stream = i, rt.marked = null, rt.cc = o, rt.style = t, e.lexical.hasOwnProperty("align") || (e.lexical.align = !0);;) {
                if ((o.length ? o.pop() : Ge ? z : M)(n, r)) {
                    for (; o.length && o[o.length - 1].lex;) o.pop()();
                    return rt.marked ? rt.marked : "variable" == n && d(e, r) ? "variable-2" : t
                }
            }
        }

        function h() {
            for (var e = arguments.length - 1; e >= 0; e--) rt.cc.push(arguments[e])
        }

        function p() {
            return h.apply(null, arguments), !0
        }

        function m(e, t) {
            for (var n = t; n; n = n.next)
                if (n.name == e) return !0;
            return !1
        }

        function g(e) {
            var t = rt.state;
            if (rt.marked = "def", Ye) {
                if (t.context)
                    if ("var" == t.lexical.info && t.context && t.context.block) {
                        var r = v(e, t.context);
                        if (null != r) return void(t.context = r)
                    } else if (!m(e, t.localVars)) return void(t.localVars = new k(e, t.localVars));
                n.globalVars && !m(e, t.globalVars) && (t.globalVars = new k(e, t.globalVars))
            }
        }

        function v(e, t) {
            if (t) {
                if (t.block) {
                    var n = v(e, t.prev);
                    return n ? n == t.prev ? t : new b(n, t.vars, !0) : null
                }
                return m(e, t.vars) ? t : new b(t.prev, new k(e, t.vars), !1)
            }
            return null
        }

        function y(e) {
            return "public" == e || "private" == e || "protected" == e || "abstract" == e || "readonly" == e
        }

        function b(e, t, n) {
            this.prev = e, this.vars = t, this.block = n
        }

        function k(e, t) {
            this.name = e, this.next = t
        }

        function x() {
            rt.state.context = new b(rt.state.context, rt.state.localVars, !1), rt.state.localVars = it
        }

        function w() {
            rt.state.context = new b(rt.state.context, rt.state.localVars, !0), rt.state.localVars = null
        }

        function C() {
            rt.state.localVars = rt.state.context.vars, rt.state.context = rt.state.context.prev
        }

        function S(e, t) {
            var n = function() {
                var n = rt.state,
                    r = n.indented;
                if ("stat" == n.lexical.type) r = n.lexical.indented;
                else
                    for (var i = n.lexical; i && ")" == i.type && i.align; i = i.prev) r = i.indented;
                n.lexical = new u(r, rt.stream.column(), e, null, n.lexical, t)
            };
            return n.lex = !0, n
        }

        function L() {
            var e = rt.state;
            e.lexical.prev && (")" == e.lexical.type && (e.indented = e.lexical.indented), e.lexical = e.lexical.prev)
        }

        function T(e) {
            function t(n) {
                return n == e ? p() : ";" == e || "}" == n || ")" == n || "]" == n ? h() : p(t)
            }
            return t
        }

        function M(e, t) {
            return "var" == e ? p(S("vardef", t), fe, T(";"), L) : "keyword a" == e ? p(S("form"), F, M, L) : "keyword b" == e ? p(S("form"), M, L) : "keyword d" == e ? rt.stream.match(/^\s*$/, !1) ? p() : p(S("stat"), N, T(";"), L) : "debugger" == e ? p(T(";")) : "{" == e ? p(S("}"), w, X, L, C) : ";" == e ? p() : "if" == e ? ("else" == rt.state.lexical.info && rt.state.cc[rt.state.cc.length - 1] == L && rt.state.cc.pop()(), p(S("form"), F, M, L, ye)) : "function" == e ? p(we) : "for" == e ? p(S("form"), w, be, M, C, L) : "class" == e || Xe && "interface" == t ? (rt.marked = "keyword", p(S("form", "class" == e ? e : t), Me, L)) : "variable" == e ? Xe && "declare" == t ? (rt.marked = "keyword", p(M)) : Xe && ("module" == t || "enum" == t || "type" == t) && rt.stream.match(/^\s*\w/, !1) ? (rt.marked = "keyword", "enum" == t ? p(We) : "type" == t ? p(Se, T("operator"), te, T(";")) : p(S("form"), he, T("{"), S("}"), X, L, L)) : Xe && "namespace" == t ? (rt.marked = "keyword", p(S("form"), z, M, L)) : Xe && "abstract" == t ? (rt.marked = "keyword", p(M)) : p(S("stat"), q) : "switch" == e ? p(S("form"), F, T("{"), S("}", "switch"), w, X, L, L, C) : "case" == e ? p(z, T(":")) : "default" == e ? p(T(":")) : "catch" == e ? p(S("form"), x, A, M, L, C) : "export" == e ? p(S("stat"), Fe, L) : "import" == e ? p(S("stat"), Ne, L) : "async" == e ? p(M) : "@" == t ? p(z, M) : h(S("stat"), z, T(";"), L)
        }

        function A(e) {
            if ("(" == e) return p(Le, T(")"))
        }

        function z(e, t) {
            return E(e, t, !1)
        }

        function O(e, t) {
            return E(e, t, !0)
        }

        function F(e) {
            return "(" != e ? h() : p(S(")"), N, T(")"), L)
        }

        function E(e, t, n) {
            if (rt.state.fatArrowAt == rt.stream.start) {
                var r = n ? W : B;
                if ("(" == e) return p(x, S(")"), G(Le, ")"), L, T("=>"), r, C);
                if ("variable" == e) return h(x, he, T("=>"), r, C)
            }
            var i = n ? P : D;
            return nt.hasOwnProperty(e) ? p(i) : "function" == e ? p(we, i) : "class" == e || Xe && "interface" == t ? (rt.marked = "keyword", p(S("form"), Te, L)) : "keyword c" == e || "async" == e ? p(n ? O : z) : "(" == e ? p(S(")"), N, T(")"), L, i) : "operator" == e || "spread" == e ? p(n ? O : z) : "[" == e ? p(S("]"), Be, L, i) : "{" == e ? Y($, "}", null, i) : "quasi" == e ? h(I, i) : "new" == e ? p(H(n)) : p()
        }

        function N(e) {
            return e.match(/[;\}\)\],]/) ? h() : h(z)
        }

        function D(e, t) {
            return "," == e ? p(N) : P(e, t, !1)
        }

        function P(e, t, n) {
            var r = 0 == n ? D : P,
                i = 0 == n ? z : O;
            return "=>" == e ? p(x, n ? W : B, C) : "operator" == e ? /\+\+|--/.test(t) || Xe && "!" == t ? p(r) : Xe && "<" == t && rt.stream.match(/^([^<>]|<[^<>]*>)*>\s*\(/, !1) ? p(S(">"), G(te, ">"), L, r) : "?" == t ? p(z, T(":"), i) : p(i) : "quasi" == e ? h(I, r) : ";" != e ? "(" == e ? Y(O, ")", "call", r) : "." == e ? p(U, r) : "[" == e ? p(S("]"), N, T("]"), L, r) : Xe && "as" == t ? (rt.marked = "keyword", p(te, r)) : "regexp" == e ? (rt.state.lastType = rt.marked = "operator", rt.stream.backUp(rt.stream.pos - rt.stream.start - 1), p(i)) : void 0 : void 0
        }

        function I(e, t) {
            return "quasi" != e ? h() : "${" != t.slice(t.length - 2) ? p(I) : p(N, j)
        }

        function j(e) {
            if ("}" == e) return rt.marked = "string-2", rt.state.tokenize = s, p(I)
        }

        function B(e) {
            return c(rt.stream, rt.state), h("{" == e ? M : z)
        }

        function W(e) {
            return c(rt.stream, rt.state), h("{" == e ? M : O)
        }

        function H(e) {
            return function(t) {
                return "." == t ? p(e ? R : _) : "variable" == t && Xe ? p(ce, e ? P : D) : h(e ? O : z)
            }
        }

        function _(e, t) {
            if ("target" == t) return rt.marked = "keyword", p(D)
        }

        function R(e, t) {
            if ("target" == t) return rt.marked = "keyword", p(P)
        }

        function q(e) {
            return ":" == e ? p(L, M) : h(D, T(";"), L)
        }

        function U(e) {
            if ("variable" == e) return rt.marked = "property", p()
        }

        function $(e, t) {
            return "async" == e ? (rt.marked = "property", p($)) : "variable" == e || "keyword" == rt.style ? (rt.marked = "property", "get" == t || "set" == t ? p(K) : (Xe && rt.state.fatArrowAt == rt.stream.start && (n = rt.stream.match(/^\s*:\s*/, !1)) && (rt.state.fatArrowAt = rt.stream.pos + n[0].length), p(V))) : "number" == e || "string" == e ? (rt.marked = Ve ? "property" : rt.style + " property", p(V)) : "jsonld-keyword" == e ? p(V) : Xe && y(t) ? (rt.marked = "keyword", p($)) : "[" == e ? p(z, Z, T("]"), V) : "spread" == e ? p(O, V) : "*" == t ? (rt.marked = "keyword", p($)) : ":" == e ? h(V) : void 0;
            var n
        }

        function K(e) {
            return "variable" != e ? h(V) : (rt.marked = "property", p(we))
        }

        function V(e) {
            return ":" == e ? p(O) : "(" == e ? h(we) : void 0
        }

        function G(e, t, n) {
            function r(i, o) {
                if (n ? n.indexOf(i) > -1 : "," == i) {
                    var a = rt.state.lexical;
                    return "call" == a.info && (a.pos = (a.pos || 0) + 1), p((function(n, r) {
                        return n == t || r == t ? h() : h(e)
                    }), r)
                }
                return i == t || o == t ? p() : n && n.indexOf(";") > -1 ? h(e) : p(T(t))
            }
            return function(n, i) {
                return n == t || i == t ? p() : h(e, r)
            }
        }

        function Y(e, t, n) {
            for (var r = 3; r < arguments.length; r++) rt.cc.push(arguments[r]);
            return p(S(t, n), G(e, t), L)
        }

        function X(e) {
            return "}" == e ? p() : h(M, X)
        }

        function Z(e, t) {
            if (Xe) {
                if (":" == e) return p(te);
                if ("?" == t) return p(Z)
            }
        }

        function Q(e, t) {
            if (Xe && (":" == e || "in" == t)) return p(te)
        }

        function J(e) {
            if (Xe && ":" == e) return rt.stream.match(/^\s*\w+\s+is\b/, !1) ? p(z, ee, te) : p(te)
        }

        function ee(e, t) {
            if ("is" == t) return rt.marked = "keyword", p()
        }

        function te(e, t) {
            return "keyof" == t || "typeof" == t || "infer" == t || "readonly" == t ? (rt.marked = "keyword", p("typeof" == t ? O : te)) : "variable" == e || "void" == t ? (rt.marked = "type", p(se)) : "|" == t || "&" == t ? p(te) : "string" == e || "number" == e || "atom" == e ? p(se) : "[" == e ? p(S("]"), G(te, "]", ","), L, se) : "{" == e ? p(S("}"), re, L, se) : "(" == e ? p(G(le, ")"), ne, se) : "<" == e ? p(G(te, ">"), te) : "quasi" == e ? h(oe, se) : void 0
        }

        function ne(e) {
            if ("=>" == e) return p(te)
        }

        function re(e) {
            return e.match(/[\}\)\]]/) ? p() : "," == e || ";" == e ? p(re) : h(ie, re)
        }

        function ie(e, t) {
            return "variable" == e || "keyword" == rt.style ? (rt.marked = "property", p(ie)) : "?" == t || "number" == e || "string" == e ? p(ie) : ":" == e ? p(te) : "[" == e ? p(T("variable"), Q, T("]"), ie) : "(" == e ? h(Ce, ie) : e.match(/[;\}\)\],]/) ? void 0 : p()
        }

        function oe(e, t) {
            return "quasi" != e ? h() : "${" != t.slice(t.length - 2) ? p(oe) : p(te, ae)
        }

        function ae(e) {
            if ("}" == e) return rt.marked = "string-2", rt.state.tokenize = s, p(oe)
        }

        function le(e, t) {
            return "variable" == e && rt.stream.match(/^\s*[?:]/, !1) || "?" == t ? p(le) : ":" == e ? p(te) : "spread" == e ? p(le) : h(te)
        }

        function se(e, t) {
            return "<" == t ? p(S(">"), G(te, ">"), L, se) : "|" == t || "." == e || "&" == t ? p(te) : "[" == e ? p(te, T("]"), se) : "extends" == t || "implements" == t ? (rt.marked = "keyword", p(te)) : "?" == t ? p(te, T(":"), te) : void 0
        }

        function ce(e, t) {
            if ("<" == t) return p(S(">"), G(te, ">"), L, se)
        }

        function ue() {
            return h(te, de)
        }

        function de(e, t) {
            if ("=" == t) return p(te)
        }

        function fe(e, t) {
            return "enum" == t ? (rt.marked = "keyword", p(We)) : h(he, Z, ge, ve)
        }

        function he(e, t) {
            return Xe && y(t) ? (rt.marked = "keyword", p(he)) : "variable" == e ? (g(t), p()) : "spread" == e ? p(he) : "[" == e ? Y(me, "]") : "{" == e ? Y(pe, "}") : void 0
        }

        function pe(e, t) {
            return "variable" != e || rt.stream.match(/^\s*:/, !1) ? ("variable" == e && (rt.marked = "property"), "spread" == e ? p(he) : "}" == e ? h() : "[" == e ? p(z, T("]"), T(":"), pe) : p(T(":"), he, ge)) : (g(t), p(ge))
        }

        function me() {
            return h(he, ge)
        }

        function ge(e, t) {
            if ("=" == t) return p(O)
        }

        function ve(e) {
            if ("," == e) return p(fe)
        }

        function ye(e, t) {
            if ("keyword b" == e && "else" == t) return p(S("form", "else"), M, L)
        }

        function be(e, t) {
            return "await" == t ? p(be) : "(" == e ? p(S(")"), ke, L) : void 0
        }

        function ke(e) {
            return "var" == e ? p(fe, xe) : "variable" == e ? p(xe) : h(xe)
        }

        function xe(e, t) {
            return ")" == e ? p() : ";" == e ? p(xe) : "in" == t || "of" == t ? (rt.marked = "keyword", p(z, xe)) : h(z, xe)
        }

        function we(e, t) {
            return "*" == t ? (rt.marked = "keyword", p(we)) : "variable" == e ? (g(t), p(we)) : "(" == e ? p(x, S(")"), G(Le, ")"), L, J, M, C) : Xe && "<" == t ? p(S(">"), G(ue, ">"), L, we) : void 0
        }

        function Ce(e, t) {
            return "*" == t ? (rt.marked = "keyword", p(Ce)) : "variable" == e ? (g(t), p(Ce)) : "(" == e ? p(x, S(")"), G(Le, ")"), L, J, C) : Xe && "<" == t ? p(S(">"), G(ue, ">"), L, Ce) : void 0
        }

        function Se(e, t) {
            return "keyword" == e || "variable" == e ? (rt.marked = "type", p(Se)) : "<" == t ? p(S(">"), G(ue, ">"), L) : void 0
        }

        function Le(e, t) {
            return "@" == t && p(z, Le), "spread" == e ? p(Le) : Xe && y(t) ? (rt.marked = "keyword", p(Le)) : Xe && "this" == e ? p(Z, ge) : h(he, Z, ge)
        }

        function Te(e, t) {
            return "variable" == e ? Me(e, t) : Ae(e, t)
        }

        function Me(e, t) {
            if ("variable" == e) return g(t), p(Ae)
        }

        function Ae(e, t) {
            return "<" == t ? p(S(">"), G(ue, ">"), L, Ae) : "extends" == t || "implements" == t || Xe && "," == e ? ("implements" == t && (rt.marked = "keyword"), p(Xe ? te : z, Ae)) : "{" == e ? p(S("}"), ze, L) : void 0
        }

        function ze(e, t) {
            return "async" == e || "variable" == e && ("static" == t || "get" == t || "set" == t || Xe && y(t)) && rt.stream.match(/^\s+[\w$\xa1-\uffff]/, !1) ? (rt.marked = "keyword", p(ze)) : "variable" == e || "keyword" == rt.style ? (rt.marked = "property", p(Oe, ze)) : "number" == e || "string" == e ? p(Oe, ze) : "[" == e ? p(z, Z, T("]"), Oe, ze) : "*" == t ? (rt.marked = "keyword", p(ze)) : Xe && "(" == e ? h(Ce, ze) : ";" == e || "," == e ? p(ze) : "}" == e ? p() : "@" == t ? p(z, ze) : void 0
        }

        function Oe(e, t) {
            if ("!" == t) return p(Oe);
            if ("?" == t) return p(Oe);
            if (":" == e) return p(te, ge);
            if ("=" == t) return p(O);
            var n = rt.state.lexical.prev;
            return h(n && "interface" == n.info ? Ce : we)
        }

        function Fe(e, t) {
            return "*" == t ? (rt.marked = "keyword", p(je, T(";"))) : "default" == t ? (rt.marked = "keyword", p(z, T(";"))) : "{" == e ? p(G(Ee, "}"), je, T(";")) : h(M)
        }

        function Ee(e, t) {
            return "as" == t ? (rt.marked = "keyword", p(T("variable"))) : "variable" == e ? h(O, Ee) : void 0
        }

        function Ne(e) {
            return "string" == e ? p() : "(" == e ? h(z) : "." == e ? h(D) : h(De, Pe, je)
        }

        function De(e, t) {
            return "{" == e ? Y(De, "}") : ("variable" == e && g(t), "*" == t && (rt.marked = "keyword"), p(Ie))
        }

        function Pe(e) {
            if ("," == e) return p(De, Pe)
        }

        function Ie(e, t) {
            if ("as" == t) return rt.marked = "keyword", p(De)
        }

        function je(e, t) {
            if ("from" == t) return rt.marked = "keyword", p(z)
        }

        function Be(e) {
            return "]" == e ? p() : h(G(O, "]"))
        }

        function We() {
            return h(S("form"), he, T("{"), S("}"), G(He, "}"), L, L)
        }

        function He() {
            return h(he, ge)
        }

        function _e(e, t) {
            return "operator" == e.lastType || "," == e.lastType || Je.test(t.charAt(0)) || /[,.]/.test(t.charAt(0))
        }

        function Re(e, t, n) {
            return t.tokenize == o && /^(?:operator|sof|keyword [bcd]|case|new|export|default|spread|[\[{}\(,;:]|=>)$/.test(t.lastType) || "quasi" == t.lastType && /\{\s*$/.test(e.string.slice(0, e.pos - (n || 0)))
        }
        var qe, Ue, $e = t.indentUnit,
            Ke = n.statementIndent,
            Ve = n.jsonld,
            Ge = n.json || Ve,
            Ye = !1 !== n.trackScope,
            Xe = n.typescript,
            Ze = n.wordCharacters || /[\w$\xa1-\uffff]/,
            Qe = function() {
                function e(e) {
                    return {
                        type: e,
                        style: "keyword"
                    }
                }
                var t = e("keyword a"),
                    n = e("keyword b"),
                    r = e("keyword c"),
                    i = e("keyword d"),
                    o = e("operator"),
                    a = {
                        type: "atom",
                        style: "atom"
                    };
                return {
                    if: e("if"),
                    while: t,
                    with: t,
                    else: n,
                    do: n,
                    try: n,
                    finally: n,
                    return: i,
                    break: i,
                    continue: i,
                    new: e("new"),
                    delete: r,
                    void: r,
                    throw: r,
                    debugger: e("debugger"),
                    var: e("var"),
                    const: e("var"),
                    let: e("var"),
                    function: e("function"),
                    catch: e("catch"),
                    for: e("for"),
                    switch: e("switch"),
                    case: e("case"),
                    default: e("default"),
                    in: o,
                    typeof: o,
                    instanceof: o,
                    true: a,
                    false: a,
                    null: a,
                    undefined: a,
                    NaN: a,
                    Infinity: a,
                    this: e("this"),
                    class: e("class"),
                    super: e("atom"),
                    yield: r,
                    export: e("export"),
                    import: e("import"),
                    extends: r,
                    await: r
                }
            }(),
            Je = /[+\-*&%=<>!?|~^@]/,
            et = /^@(context|id|value|language|type|container|list|set|reverse|index|base|vocab|graph)"/,
            tt = "([{}])",
            nt = {
                atom: !0,
                number: !0,
                variable: !0,
                string: !0,
                regexp: !0,
                this: !0,
                import: !0,
                "jsonld-keyword": !0
            },
            rt = {
                state: null,
                column: null,
                marked: null,
                cc: null
            },
            it = new k("this", new k("arguments", null));
        return x.lex = w.lex = !0, C.lex = !0, L.lex = !0, {
            startState: function(e) {
                var t = {
                    tokenize: o,
                    lastType: "sof",
                    cc: [],
                    lexical: new u((e || 0) - $e, 0, "block", !1),
                    localVars: n.localVars,
                    context: n.localVars && new b(null, null, !1),
                    indented: e || 0
                };
                return n.globalVars && "object" == typeof n.globalVars && (t.globalVars = n.globalVars), t
            },
            token: function(e, t) {
                if (e.sol() && (t.lexical.hasOwnProperty("align") || (t.lexical.align = !1), t.indented = e.indentation(), c(e, t)), t.tokenize != l && e.eatSpace()) return null;
                var n = t.tokenize(e, t);
                return "comment" == qe ? n : (t.lastType = "operator" != qe || "++" != Ue && "--" != Ue ? qe : "incdec", f(t, n, qe, Ue, e))
            },
            indent: function(t, r) {
                if (t.tokenize == l || t.tokenize == s) return e.Pass;
                if (t.tokenize != o) return 0;
                var i, a = r && r.charAt(0),
                    c = t.lexical;
                if (!/^\s*else\b/.test(r))
                    for (var u = t.cc.length - 1; u >= 0; --u) {
                        var d = t.cc[u];
                        if (d == L) c = c.prev;
                        else if (d != ye && d != C) break
                    }
                for (;
                    ("stat" == c.type || "form" == c.type) && ("}" == a || (i = t.cc[t.cc.length - 1]) && (i == D || i == P) && !/^[,\.=+\-*:?[\(]/.test(r));) c = c.prev;
                Ke && ")" == c.type && "stat" == c.prev.type && (c = c.prev);
                var f = c.type,
                    h = a == f;
                return "vardef" == f ? c.indented + ("operator" == t.lastType || "," == t.lastType ? c.info.length + 1 : 0) : "form" == f && "{" == a ? c.indented : "form" == f ? c.indented + $e : "stat" == f ? c.indented + (_e(t, r) ? Ke || $e : 0) : "switch" != c.info || h || 0 == n.doubleIndentSwitch ? c.align ? c.column + (h ? 0 : 1) : c.indented + (h ? 0 : $e) : c.indented + (/^(?:case|default)\b/.test(r) ? $e : 2 * $e)
            },
            electricInput: /^\s*(?:case .*?:|default:|\{|\})$/,
            blockCommentStart: Ge ? null : "/*",
            blockCommentEnd: Ge ? null : "*/",
            blockCommentContinue: Ge ? null : " * ",
            lineComment: Ge ? null : "//",
            fold: "brace",
            closeBrackets: "()[]{}''\"\"``",
            helperType: Ge ? "json" : "javascript",
            jsonldMode: Ve,
            jsonMode: Ge,
            expressionAllowed: Re,
            skipExpression: function(t) {
                f(t, "atom", "atom", "true", new e.StringStream("", 2, null))
            }
        }
    })), e.registerHelper("wordChars", "javascript", /[\w$]/), e.defineMIME("text/javascript", "javascript"), e.defineMIME("text/ecmascript", "javascript"), e.defineMIME("application/javascript", "javascript"), e.defineMIME("application/x-javascript", "javascript"), e.defineMIME("application/ecmascript", "javascript"), e.defineMIME("application/json", {
        name: "javascript",
        json: !0
    }), e.defineMIME("application/x-json", {
        name: "javascript",
        json: !0
    }), e.defineMIME("application/manifest+json", {
        name: "javascript",
        json: !0
    }), e.defineMIME("application/ld+json", {
        name: "javascript",
        jsonld: !0
    }), e.defineMIME("text/typescript", {
        name: "javascript",
        typescript: !0
    }), e.defineMIME("application/typescript", {
        name: "javascript",
        typescript: !0
    })
})),
function(e) {
    "object" == typeof exports && "object" == typeof module ? e(require("../../lib/codemirror"), require("../xml/xml"), require("../javascript/javascript")) : "function" == typeof define && define.amd ? define(["../../lib/codemirror", "../xml/xml", "../javascript/javascript"], e) : e(CodeMirror)
}((function(e) {
    "use strict";

    function t(e, t, n, r) {
        this.state = e, this.mode = t, this.depth = n, this.prev = r
    }

    function n(r) {
        return new t(e.copyState(r.mode, r.state), r.mode, r.depth, r.prev && n(r.prev))
    }
    e.defineMode("jsx", (function(r, i) {
        function o(e) {
            var t = e.tagName;
            e.tagName = null;
            var n = c.indent(e, "", "");
            return e.tagName = t, n
        }

        function a(e, t) {
            return t.context.mode == c ? l(e, t, t.context) : s(e, t, t.context)
        }

        function l(n, i, l) {
            if (2 == l.depth) return n.match(/^.*?\*\//) ? l.depth = 1 : n.skipToEnd(), "comment";
            if ("{" == n.peek()) {
                c.skipAttribute(l.state);
                var s = o(l.state),
                    d = l.state.context;
                if (d && n.match(/^[^>]*>\s*$/, !1)) {
                    for (; d.prev && !d.startOfLine;) d = d.prev;
                    d.startOfLine ? s -= r.indentUnit : l.prev.state.lexical && (s = l.prev.state.lexical.indented)
                } else 1 == l.depth && (s += r.indentUnit);
                return i.context = new t(e.startState(u, s), u, 0, i.context), null
            }
            if (1 == l.depth) {
                if ("<" == n.peek()) return c.skipAttribute(l.state), i.context = new t(e.startState(c, o(l.state)), c, 0, i.context), null;
                if (n.match("//")) return n.skipToEnd(), "comment";
                if (n.match("/*")) return l.depth = 2, a(n, i)
            }
            var f, h = c.token(n, l.state),
                p = n.current();
            return /\btag\b/.test(h) ? />$/.test(p) ? l.state.context ? l.depth = 0 : i.context = i.context.prev : /^</.test(p) && (l.depth = 1) : !h && (f = p.indexOf("{")) > -1 && n.backUp(p.length - f), h
        }

        function s(n, r, i) {
            if ("<" == n.peek() && u.expressionAllowed(n, i.state)) return r.context = new t(e.startState(c, u.indent(i.state, "", "")), c, 0, r.context), u.skipExpression(i.state), null;
            var o = u.token(n, i.state);
            if (!o && null != i.depth) {
                var a = n.current();
                "{" == a ? i.depth++ : "}" == a && 0 == --i.depth && (r.context = r.context.prev)
            }
            return o
        }
        var c = e.getMode(r, {
                name: "xml",
                allowMissing: !0,
                multilineTagIndentPastTag: !1,
                allowMissingTagName: !0
            }),
            u = e.getMode(r, i && i.base || "javascript");
        return {
            startState: function() {
                return {
                    context: new t(e.startState(u), u)
                }
            },
            copyState: function(e) {
                return {
                    context: n(e.context)
                }
            },
            token: a,
            indent: function(e, t, n) {
                return e.context.mode.indent(e.context.state, t, n)
            },
            innerMode: function(e) {
                return e.context
            }
        }
    }), "xml", "javascript"), e.defineMIME("text/jsx", "jsx"), e.defineMIME("text/typescript-jsx", {
        name: "jsx",
        base: {
            name: "javascript",
            typescript: !0
        }
    })
})),
function(e) {
    "object" == typeof exports && "object" == typeof module ? e(require("../../lib/codemirror")) : "function" == typeof define && define.amd ? define(["../../lib/codemirror"], e) : e(CodeMirror)
}((function(e) {
    "use strict";
    e.defineMode("livescript", (function() {
        var e = function(e, t) {
            var n = t.next || "start";
            if (n) {
                t.next = t.next;
                var r = o[n];
                if (r.splice) {
                    for (var i = 0; i < r.length; ++i) {
                        var a = r[i];
                        if (a.regex && e.match(a.regex)) return t.next = a.next || t.next, a.token
                    }
                    return e.next(), "error"
                }
                if (e.match(a = o[n])) return a.regex && e.match(a.regex) ? (t.next = a.next, a.token) : (e.next(), "error")
            }
            return e.next(), "error"
        };
        return {
            startState: function() {
                return {
                    next: "start",
                    lastToken: {
                        style: null,
                        indent: 0,
                        content: ""
                    }
                }
            },
            token: function(t, n) {
                for (; t.pos == t.start;) var r = e(t, n);
                return n.lastToken = {
                    style: r,
                    indent: t.indentation(),
                    content: t.current()
                }, r.replace(/\./g, " ")
            },
            indent: function(e) {
                var t = e.lastToken.indent;
                return e.lastToken.content.match(n) && (t += 2), t
            }
        }
    }));
    var t = "(?![\\d\\s])[$\\w\\xAA-\\uFFDC](?:(?!\\s)[$\\w\\xAA-\\uFFDC]|-[A-Za-z])*",
        n = RegExp("(?:[({[=:]|[-~]>|\\b(?:e(?:lse|xport)|d(?:o|efault)|t(?:ry|hen)|finally|import(?:\\s*all)?|const|var|let|new|catch(?:\\s*" + t + ")?))\\s*$"),
        r = "(?![$\\w]|-[A-Za-z]|\\s*:(?![:=]))",
        i = {
            token: "string",
            regex: ".+"
        },
        o = {
            start: [{
                token: "comment.doc",
                regex: "/\\*",
                next: "comment"
            }, {
                token: "comment",
                regex: "#.*"
            }, {
                token: "keyword",
                regex: "(?:t(?:h(?:is|row|en)|ry|ypeof!?)|c(?:on(?:tinue|st)|a(?:se|tch)|lass)|i(?:n(?:stanceof)?|mp(?:ort(?:\\s+all)?|lements)|[fs])|d(?:e(?:fault|lete|bugger)|o)|f(?:or(?:\\s+own)?|inally|unction)|s(?:uper|witch)|e(?:lse|x(?:tends|port)|val)|a(?:nd|rguments)|n(?:ew|ot)|un(?:less|til)|w(?:hile|ith)|o[fr]|return|break|let|var|loop)" + r
            }, {
                token: "constant.language",
                regex: "(?:true|false|yes|no|on|off|null|void|undefined)" + r
            }, {
                token: "invalid.illegal",
                regex: "(?:p(?:ackage|r(?:ivate|otected)|ublic)|i(?:mplements|nterface)|enum|static|yield)" + r
            }, {
                token: "language.support.class",
                regex: "(?:R(?:e(?:gExp|ferenceError)|angeError)|S(?:tring|yntaxError)|E(?:rror|valError)|Array|Boolean|Date|Function|Number|Object|TypeError|URIError)" + r
            }, {
                token: "language.support.function",
                regex: "(?:is(?:NaN|Finite)|parse(?:Int|Float)|Math|JSON|(?:en|de)codeURI(?:Component)?)" + r
            }, {
                token: "variable.language",
                regex: "(?:t(?:hat|il|o)|f(?:rom|allthrough)|it|by|e)" + r
            }, {
                token: "identifier",
                regex: t + "\\s*:(?![:=])"
            }, {
                token: "variable",
                regex: t
            }, {
                token: "keyword.operator",
                regex: "(?:\\.{3}|\\s+\\?)"
            }, {
                token: "keyword.variable",
                regex: "(?:@+|::|\\.\\.)",
                next: "key"
            }, {
                token: "keyword.operator",
                regex: "\\.\\s*",
                next: "key"
            }, {
                token: "string",
                regex: "\\\\\\S[^\\s,;)}\\]]*"
            }, {
                token: "string.doc",
                regex: "'''",
                next: "qdoc"
            }, {
                token: "string.doc",
                regex: '"""',
                next: "qqdoc"
            }, {
                token: "string",
                regex: "'",
                next: "qstring"
            }, {
                token: "string",
                regex: '"',
                next: "qqstring"
            }, {
                token: "string",
                regex: "`",
                next: "js"
            }, {
                token: "string",
                regex: "<\\[",
                next: "words"
            }, {
                token: "string.regex",
                regex: "//",
                next: "heregex"
            }, {
                token: "string.regex",
                regex: "\\/(?:[^[\\/\\n\\\\]*(?:(?:\\\\.|\\[[^\\]\\n\\\\]*(?:\\\\.[^\\]\\n\\\\]*)*\\])[^[\\/\\n\\\\]*)*)\\/[gimy$]{0,4}",
                next: "key"
            }, {
                token: "constant.numeric",
                regex: "(?:0x[\\da-fA-F][\\da-fA-F_]*|(?:[2-9]|[12]\\d|3[0-6])r[\\da-zA-Z][\\da-zA-Z_]*|(?:\\d[\\d_]*(?:\\.\\d[\\d_]*)?|\\.\\d[\\d_]*)(?:e[+-]?\\d[\\d_]*)?[\\w$]*)"
            }, {
                token: "lparen",
                regex: "[({[]"
            }, {
                token: "rparen",
                regex: "[)}\\]]",
                next: "key"
            }, {
                token: "keyword.operator",
                regex: "\\S+"
            }, {
                token: "text",
                regex: "\\s+"
            }],
            heregex: [{
                token: "string.regex",
                regex: ".*?//[gimy$?]{0,4}",
                next: "start"
            }, {
                token: "string.regex",
                regex: "\\s*#{"
            }, {
                token: "comment.regex",
                regex: "\\s+(?:#.*)?"
            }, {
                token: "string.regex",
                regex: "\\S+"
            }],
            key: [{
                token: "keyword.operator",
                regex: "[.?@!]+"
            }, {
                token: "identifier",
                regex: t,
                next: "start"
            }, {
                token: "text",
                regex: "",
                next: "start"
            }],
            comment: [{
                token: "comment.doc",
                regex: ".*?\\*/",
                next: "start"
            }, {
                token: "comment.doc",
                regex: ".+"
            }],
            qdoc: [{
                token: "string",
                regex: ".*?'''",
                next: "key"
            }, i],
            qqdoc: [{
                token: "string",
                regex: '.*?"""',
                next: "key"
            }, i],
            qstring: [{
                token: "string",
                regex: "[^\\\\']*(?:\\\\.[^\\\\']*)*'",
                next: "key"
            }, i],
            qqstring: [{
                token: "string",
                regex: '[^\\\\"]*(?:\\\\.[^\\\\"]*)*"',
                next: "key"
            }, i],
            js: [{
                token: "string",
                regex: "[^\\\\`]*(?:\\\\.[^\\\\`]*)*`",
                next: "key"
            }, i],
            words: [{
                token: "string",
                regex: ".*?\\]>",
                next: "key"
            }, i]
        };
    for (var a in o) {
        var l = o[a];
        if (l.splice)
            for (var s = 0, c = l.length; s < c; ++s) {
                var u = l[s];
                "string" == typeof u.regex && (o[a][s].regex = new RegExp("^" + u.regex))
            } else "string" == typeof u.regex && (o[a].regex = new RegExp("^" + l.regex))
    }
    e.defineMIME("text/x-livescript", "livescript")
})),
function(e) {
    "object" == typeof exports && "object" == typeof module ? e(require("../../lib/codemirror"), require("../xml/xml"), require("../meta")) : "function" == typeof define && define.amd ? define(["../../lib/codemirror", "../xml/xml", "../meta"], e) : e(CodeMirror)
}((function(e) {
    "use strict";
    e.defineMode("markdown", (function(t, n) {
        function r(n) {
            if (e.findModeByName) {
                var r = e.findModeByName(n);
                r && (n = r.mime || r.mimes[0])
            }
            var i = e.getMode(t, n);
            return "null" == i.name ? null : i
        }

        function i(e, t, n) {
            return t.f = t.inline = n, n(e, t)
        }

        function o(e, t, n) {
            return t.f = t.block = n, n(e, t)
        }

        function a(e) {
            return !e || !/\S/.test(e.string)
        }

        function l(t) {
            if (t.linkTitle = !1, t.linkHref = !1, t.linkText = !1, t.em = !1, t.strong = !1, t.strikethrough = !1, t.quote = 0, t.indentedCode = !1, t.f == c) {
                var n = x;
                if (!n) {
                    var r = e.innerMode(k, t.htmlState);
                    n = "xml" == r.mode.name && null === r.state.tagStart && !r.state.context && r.state.tokenize.isInText
                }
                n && (t.f = h, t.block = s, t.htmlState = null)
            }
            return t.trailingSpace = 0, t.trailingSpaceNewLine = !1, t.prevLine = t.thisLine, t.thisLine = {
                stream: null
            }, null
        }

        function s(t, o) {
            var l = t.column() === o.indentation,
                s = a(o.prevLine.stream),
                c = o.indentedCode,
                f = o.prevLine.hr,
                h = !1 !== o.list,
                p = (o.listStack[o.listStack.length - 1] || 0) + 3;
            o.indentedCode = !1;
            var m = o.indentation;
            if (null === o.indentationDiff && (o.indentationDiff = o.indentation, h)) {
                for (o.list = null; m < o.listStack[o.listStack.length - 1];) o.listStack.pop(), o.listStack.length ? o.indentation = o.listStack[o.listStack.length - 1] : o.list = !1;
                !1 !== o.list && (o.indentationDiff = m - o.listStack[o.listStack.length - 1])
            }
            var g = !(s || f || o.prevLine.header || h && c || o.prevLine.fencedCodeEnd),
                y = (!1 === o.list || f || s) && o.indentation <= p && t.match(S),
                b = null;
            if (o.indentationDiff >= 4 && (c || o.prevLine.fencedCodeEnd || o.prevLine.header || s)) return t.skipToEnd(), o.indentedCode = !0, w.code;
            if (t.eatSpace()) return null;
            if (l && o.indentation <= p && (b = t.match(M)) && b[1].length <= 6) return o.quote = 0, o.header = b[1].length, o.thisLine.header = !0, n.highlightFormatting && (o.formatting = "header"), o.f = o.inline, d(o);
            if (o.indentation <= p && t.eat(">")) return o.quote = l ? 1 : o.quote + 1, n.highlightFormatting && (o.formatting = "quote"), t.eatSpace(), d(o);
            if (!y && !o.setext && l && o.indentation <= p && (b = t.match(L))) {
                var k = b[1] ? "ol" : "ul";
                return o.indentation = m + t.current().length, o.list = !0, o.quote = 0, o.listStack.push(o.indentation), o.em = !1, o.strong = !1, o.code = !1, o.strikethrough = !1, n.taskLists && t.match(T, !1) && (o.taskList = !0), o.f = o.inline, n.highlightFormatting && (o.formatting = ["list", "list-" + k]), d(o)
            }
            return l && o.indentation <= p && (b = t.match(O, !0)) ? (o.quote = 0, o.fencedEndRE = new RegExp(b[1] + "+ *$"), o.localMode = n.fencedCodeBlockHighlighting && r(b[2] || n.fencedCodeBlockDefaultMode), o.localMode && (o.localState = e.startState(o.localMode)), o.f = o.block = u, n.highlightFormatting && (o.formatting = "code-block"), o.code = -1, d(o)) : o.setext || !(g && h || o.quote || !1 !== o.list || o.code || y || F.test(t.string)) && (b = t.lookAhead(1)) && (b = b.match(A)) ? (o.setext ? (o.header = o.setext, o.setext = 0, t.skipToEnd(), n.highlightFormatting && (o.formatting = "header")) : (o.header = "=" == b[0].charAt(0) ? 1 : 2, o.setext = o.header), o.thisLine.header = !0, o.f = o.inline, d(o)) : y ? (t.skipToEnd(), o.hr = !0, o.thisLine.hr = !0, w.hr) : "[" === t.peek() ? i(t, o, v) : i(t, o, o.inline)
        }

        function c(t, n) {
            var r = k.token(t, n.htmlState);
            if (!x) {
                var i = e.innerMode(k, n.htmlState);
                ("xml" == i.mode.name && null === i.state.tagStart && !i.state.context && i.state.tokenize.isInText || n.md_inside && t.current().indexOf(">") > -1) && (n.f = h, n.block = s, n.htmlState = null)
            }
            return r
        }

        function u(e, t) {
            var r, i = t.listStack[t.listStack.length - 1] || 0,
                a = t.indentation < i,
                l = i + 3;
            return t.fencedEndRE && t.indentation <= l && (a || e.match(t.fencedEndRE)) ? (n.highlightFormatting && (t.formatting = "code-block"), a || (r = d(t)), t.localMode = t.localState = null, t.block = s, t.f = h, t.fencedEndRE = null, t.code = 0, t.thisLine.fencedCodeEnd = !0, a ? o(e, t, t.block) : r) : t.localMode ? t.localMode.token(e, t.localState) : (e.skipToEnd(), w.code)
        }

        function d(e) {
            var t = [];
            if (e.formatting) {
                t.push(w.formatting), "string" == typeof e.formatting && (e.formatting = [e.formatting]);
                for (var r = 0; r < e.formatting.length; r++) t.push(w.formatting + "-" + e.formatting[r]), "header" === e.formatting[r] && t.push(w.formatting + "-" + e.formatting[r] + "-" + e.header), "quote" === e.formatting[r] && (!n.maxBlockquoteDepth || n.maxBlockquoteDepth >= e.quote ? t.push(w.formatting + "-" + e.formatting[r] + "-" + e.quote) : t.push("error"))
            }
            if (e.taskOpen) return t.push("meta"), t.length ? t.join(" ") : null;
            if (e.taskClosed) return t.push("property"), t.length ? t.join(" ") : null;
            if (e.linkHref ? t.push(w.linkHref, "url") : (e.strong && t.push(w.strong), e.em && t.push(w.em), e.strikethrough && t.push(w.strikethrough), e.emoji && t.push(w.emoji), e.linkText && t.push(w.linkText), e.code && t.push(w.code), e.image && t.push(w.image), e.imageAltText && t.push(w.imageAltText, "link"), e.imageMarker && t.push(w.imageMarker)), e.header && t.push(w.header, w.header + "-" + e.header), e.quote && (t.push(w.quote), !n.maxBlockquoteDepth || n.maxBlockquoteDepth >= e.quote ? t.push(w.quote + "-" + e.quote) : t.push(w.quote + "-" + n.maxBlockquoteDepth)), !1 !== e.list) {
                var i = (e.listStack.length - 1) % 3;
                i ? 1 === i ? t.push(w.list2) : t.push(w.list3) : t.push(w.list1)
            }
            return e.trailingSpaceNewLine ? t.push("trailing-space-new-line") : e.trailingSpace && t.push("trailing-space-" + (e.trailingSpace % 2 ? "a" : "b")), t.length ? t.join(" ") : null
        }

        function f(e, t) {
            if (e.match(z, !0)) return d(t)
        }

        function h(t, r) {
            var i = r.text(t, r);
            if (void 0 !== i) return i;
            if (r.list) return r.list = null, d(r);
            if (r.taskList) return " " === t.match(T, !0)[1] ? r.taskOpen = !0 : r.taskClosed = !0, n.highlightFormatting && (r.formatting = "task"), r.taskList = !1, d(r);
            if (r.taskOpen = !1, r.taskClosed = !1, r.header && t.match(/^#+$/, !0)) return n.highlightFormatting && (r.formatting = "header"), d(r);
            var a = t.next();
            if (r.linkTitle) {
                r.linkTitle = !1;
                var l = a;
                "(" === a && (l = ")");
                var s = "^\\s*(?:[^" + (l = (l + "").replace(/([.?*+^\[\]\\(){}|-])/g, "\\$1")) + "\\\\]+|\\\\\\\\|\\\\.)" + l;
                if (t.match(new RegExp(s), !0)) return w.linkHref
            }
            if ("`" === a) {
                var u = r.formatting;
                n.highlightFormatting && (r.formatting = "code"), t.eatWhile("`");
                var f = t.current().length;
                if (0 != r.code || r.quote && 1 != f) {
                    if (f == r.code) {
                        var g = d(r);
                        return r.code = 0, g
                    }
                    return r.formatting = u, d(r)
                }
                return r.code = f, d(r)
            }
            if (r.code) return d(r);
            if ("\\" === a && (t.next(), n.highlightFormatting)) {
                var v = d(r),
                    y = w.formatting + "-escape";
                return v ? v + " " + y : y
            }
            if ("!" === a && t.match(/\[[^\]]*\] ?(?:\(|\[)/, !1)) return r.imageMarker = !0, r.image = !0, n.highlightFormatting && (r.formatting = "image"), d(r);
            if ("[" === a && r.imageMarker && t.match(/[^\]]*\](\(.*?\)| ?\[.*?\])/, !1)) return r.imageMarker = !1, r.imageAltText = !0, n.highlightFormatting && (r.formatting = "image"), d(r);
            if ("]" === a && r.imageAltText) {
                n.highlightFormatting && (r.formatting = "image");
                var v = d(r);
                return r.imageAltText = !1, r.image = !1, r.inline = r.f = m, v
            }
            if ("[" === a && !r.image) return r.linkText && t.match(/^.*?\]/) || (r.linkText = !0, n.highlightFormatting && (r.formatting = "link")), d(r);
            if ("]" === a && r.linkText) {
                n.highlightFormatting && (r.formatting = "link");
                var v = d(r);
                return r.linkText = !1, r.inline = r.f = t.match(/\(.*?\)| ?\[.*?\]/, !1) ? m : h, v
            }
            if ("<" === a && t.match(/^(https?|ftps?):\/\/(?:[^\\>]|\\.)+>/, !1)) return r.f = r.inline = p, n.highlightFormatting && (r.formatting = "link"), (v = d(r)) ? v += " " : v = "", v + w.linkInline;
            if ("<" === a && t.match(/^[^> \\]+@(?:[^\\>]|\\.)+>/, !1)) return r.f = r.inline = p, n.highlightFormatting && (r.formatting = "link"), (v = d(r)) ? v += " " : v = "", v + w.linkEmail;
            if (n.xml && "<" === a && t.match(/^(!--|\?|!\[CDATA\[|[a-z][a-z0-9-]*(?:\s+[a-z_:.\-]+(?:\s*=\s*[^>]+)?)*\s*(?:>|$))/i, !1)) {
                var b = t.string.indexOf(">", t.pos);
                if (-1 != b) {
                    var x = t.string.substring(t.start, b);
                    /markdown\s*=\s*('|"){0,1}1('|"){0,1}/.test(x) && (r.md_inside = !0)
                }
                return t.backUp(1), r.htmlState = e.startState(k), o(t, r, c)
            }
            if (n.xml && "<" === a && t.match(/^\/\w*?>/)) return r.md_inside = !1, "tag";
            if ("*" === a || "_" === a) {
                for (var C = 1, S = 1 == t.pos ? " " : t.string.charAt(t.pos - 2); C < 3 && t.eat(a);) C++;
                var L = t.peek() || " ",
                    M = !/\s/.test(L) && (!E.test(L) || /\s/.test(S) || E.test(S)),
                    A = !/\s/.test(S) && (!E.test(S) || /\s/.test(L) || E.test(L)),
                    z = null,
                    O = null;
                if (C % 2 && (r.em || !M || "*" !== a && A && !E.test(S) ? r.em != a || !A || "*" !== a && M && !E.test(L) || (z = !1) : z = !0), C > 1 && (r.strong || !M || "*" !== a && A && !E.test(S) ? r.strong != a || !A || "*" !== a && M && !E.test(L) || (O = !1) : O = !0), null != O || null != z) {
                    n.highlightFormatting && (r.formatting = null == z ? "strong" : null == O ? "em" : "strong em"), !0 === z && (r.em = a), !0 === O && (r.strong = a);
                    g = d(r);
                    return !1 === z && (r.em = !1), !1 === O && (r.strong = !1), g
                }
            } else if (" " === a && (t.eat("*") || t.eat("_"))) {
                if (" " === t.peek()) return d(r);
                t.backUp(1)
            }
            if (n.strikethrough)
                if ("~" === a && t.eatWhile(a)) {
                    if (r.strikethrough) {
                        n.highlightFormatting && (r.formatting = "strikethrough");
                        g = d(r);
                        return r.strikethrough = !1, g
                    }
                    if (t.match(/^[^\s]/, !1)) return r.strikethrough = !0, n.highlightFormatting && (r.formatting = "strikethrough"), d(r)
                } else if (" " === a && t.match("~~", !0)) {
                if (" " === t.peek()) return d(r);
                t.backUp(2)
            }
            if (n.emoji && ":" === a && t.match(/^(?:[a-z_\d+][a-z_\d+-]*|\-[a-z_\d+][a-z_\d+-]*):/)) {
                r.emoji = !0, n.highlightFormatting && (r.formatting = "emoji");
                var F = d(r);
                return r.emoji = !1, F
            }
            return " " === a && (t.match(/^ +$/, !1) ? r.trailingSpace++ : r.trailingSpace && (r.trailingSpaceNewLine = !0)), d(r)
        }

        function p(e, t) {
            if (">" === e.next()) {
                t.f = t.inline = h, n.highlightFormatting && (t.formatting = "link");
                var r = d(t);
                return r ? r += " " : r = "", r + w.linkInline
            }
            return e.match(/^[^>]+/, !0), w.linkInline
        }

        function m(e, t) {
            if (e.eatSpace()) return null;
            var r = e.next();
            return "(" === r || "[" === r ? (t.f = t.inline = g("(" === r ? ")" : "]"), n.highlightFormatting && (t.formatting = "link-string"), t.linkHref = !0, d(t)) : "error"
        }

        function g(e) {
            return function(t, r) {
                if (t.next() === e) {
                    r.f = r.inline = h, n.highlightFormatting && (r.formatting = "link-string");
                    var i = d(r);
                    return r.linkHref = !1, i
                }
                return t.match(D[e]), r.linkHref = !0, d(r)
            }
        }

        function v(e, t) {
            return e.match(/^([^\]\\]|\\.)*\]:/, !1) ? (t.f = y, e.next(), n.highlightFormatting && (t.formatting = "link"), t.linkText = !0, d(t)) : i(e, t, h)
        }

        function y(e, t) {
            if (e.match("]:", !0)) {
                t.f = t.inline = b, n.highlightFormatting && (t.formatting = "link");
                var r = d(t);
                return t.linkText = !1, r
            }
            return e.match(/^([^\]\\]|\\.)+/, !0), w.linkText
        }

        function b(e, t) {
            return e.eatSpace() ? null : (e.match(/^[^\s]+/, !0), void 0 === e.peek() ? t.linkTitle = !0 : e.match(/^(?:\s+(?:"(?:[^"\\]|\\.)+"|'(?:[^'\\]|\\.)+'|\((?:[^)\\]|\\.)+\)))?/, !0), t.f = t.inline = h, w.linkHref + " url")
        }
        var k = e.getMode(t, "text/html"),
            x = "null" == k.name;
        void 0 === n.highlightFormatting && (n.highlightFormatting = !1), void 0 === n.maxBlockquoteDepth && (n.maxBlockquoteDepth = 0), void 0 === n.taskLists && (n.taskLists = !1), void 0 === n.strikethrough && (n.strikethrough = !1), void 0 === n.emoji && (n.emoji = !1), void 0 === n.fencedCodeBlockHighlighting && (n.fencedCodeBlockHighlighting = !0), void 0 === n.fencedCodeBlockDefaultMode && (n.fencedCodeBlockDefaultMode = "text/plain"), void 0 === n.xml && (n.xml = !0), void 0 === n.tokenTypeOverrides && (n.tokenTypeOverrides = {});
        var w = {
            header: "header",
            code: "comment",
            quote: "quote",
            list1: "variable-2",
            list2: "variable-3",
            list3: "keyword",
            hr: "hr",
            image: "image",
            imageAltText: "image-alt-text",
            imageMarker: "image-marker",
            formatting: "formatting",
            linkInline: "link",
            linkEmail: "link",
            linkText: "link",
            linkHref: "string",
            em: "em",
            strong: "strong",
            strikethrough: "strikethrough",
            emoji: "builtin"
        };
        for (var C in w) w.hasOwnProperty(C) && n.tokenTypeOverrides[C] && (w[C] = n.tokenTypeOverrides[C]);
        var S = /^([*\-_])(?:\s*\1){2,}\s*$/,
            L = /^(?:[*\-+]|^[0-9]+([.)]))\s+/,
            T = /^\[(x| )\](?=\s)/i,
            M = n.allowAtxHeaderWithoutSpace ? /^(#+)/ : /^(#+)(?: |$)/,
            A = /^ {0,3}(?:\={1,}|-{2,})\s*$/,
            z = /^[^#!\[\]*_\\<>` "'(~:]+/,
            O = /^(~~~+|```+)[ \t]*([\w\/+#-]*)[^\n`]*$/,
            F = /^\s*\[[^\]]+?\]:.*$/,
            E = /[!"#$%&'()*+,\-.\/:;<=>?@\[\\\]^_`{|}~\xA1\xA7\xAB\xB6\xB7\xBB\xBF\u037E\u0387\u055A-\u055F\u0589\u058A\u05BE\u05C0\u05C3\u05C6\u05F3\u05F4\u0609\u060A\u060C\u060D\u061B\u061E\u061F\u066A-\u066D\u06D4\u0700-\u070D\u07F7-\u07F9\u0830-\u083E\u085E\u0964\u0965\u0970\u0AF0\u0DF4\u0E4F\u0E5A\u0E5B\u0F04-\u0F12\u0F14\u0F3A-\u0F3D\u0F85\u0FD0-\u0FD4\u0FD9\u0FDA\u104A-\u104F\u10FB\u1360-\u1368\u1400\u166D\u166E\u169B\u169C\u16EB-\u16ED\u1735\u1736\u17D4-\u17D6\u17D8-\u17DA\u1800-\u180A\u1944\u1945\u1A1E\u1A1F\u1AA0-\u1AA6\u1AA8-\u1AAD\u1B5A-\u1B60\u1BFC-\u1BFF\u1C3B-\u1C3F\u1C7E\u1C7F\u1CC0-\u1CC7\u1CD3\u2010-\u2027\u2030-\u2043\u2045-\u2051\u2053-\u205E\u207D\u207E\u208D\u208E\u2308-\u230B\u2329\u232A\u2768-\u2775\u27C5\u27C6\u27E6-\u27EF\u2983-\u2998\u29D8-\u29DB\u29FC\u29FD\u2CF9-\u2CFC\u2CFE\u2CFF\u2D70\u2E00-\u2E2E\u2E30-\u2E42\u3001-\u3003\u3008-\u3011\u3014-\u301F\u3030\u303D\u30A0\u30FB\uA4FE\uA4FF\uA60D-\uA60F\uA673\uA67E\uA6F2-\uA6F7\uA874-\uA877\uA8CE\uA8CF\uA8F8-\uA8FA\uA8FC\uA92E\uA92F\uA95F\uA9C1-\uA9CD\uA9DE\uA9DF\uAA5C-\uAA5F\uAADE\uAADF\uAAF0\uAAF1\uABEB\uFD3E\uFD3F\uFE10-\uFE19\uFE30-\uFE52\uFE54-\uFE61\uFE63\uFE68\uFE6A\uFE6B\uFF01-\uFF03\uFF05-\uFF0A\uFF0C-\uFF0F\uFF1A\uFF1B\uFF1F\uFF20\uFF3B-\uFF3D\uFF3F\uFF5B\uFF5D\uFF5F-\uFF65]|\uD800[\uDD00-\uDD02\uDF9F\uDFD0]|\uD801\uDD6F|\uD802[\uDC57\uDD1F\uDD3F\uDE50-\uDE58\uDE7F\uDEF0-\uDEF6\uDF39-\uDF3F\uDF99-\uDF9C]|\uD804[\uDC47-\uDC4D\uDCBB\uDCBC\uDCBE-\uDCC1\uDD40-\uDD43\uDD74\uDD75\uDDC5-\uDDC9\uDDCD\uDDDB\uDDDD-\uDDDF\uDE38-\uDE3D\uDEA9]|\uD805[\uDCC6\uDDC1-\uDDD7\uDE41-\uDE43\uDF3C-\uDF3E]|\uD809[\uDC70-\uDC74]|\uD81A[\uDE6E\uDE6F\uDEF5\uDF37-\uDF3B\uDF44]|\uD82F\uDC9F|\uD836[\uDE87-\uDE8B]/,
            N = "    ",
            D = {
                ")": /^(?:[^\\\(\)]|\\.|\((?:[^\\\(\)]|\\.)*\))*?(?=\))/,
                "]": /^(?:[^\\\[\]]|\\.|\[(?:[^\\\[\]]|\\.)*\])*?(?=\])/
            },
            P = {
                startState: function() {
                    return {
                        f: s,
                        prevLine: {
                            stream: null
                        },
                        thisLine: {
                            stream: null
                        },
                        block: s,
                        htmlState: null,
                        indentation: 0,
                        inline: h,
                        text: f,
                        formatting: !1,
                        linkText: !1,
                        linkHref: !1,
                        linkTitle: !1,
                        code: 0,
                        em: !1,
                        strong: !1,
                        header: 0,
                        setext: 0,
                        hr: !1,
                        taskList: !1,
                        list: !1,
                        listStack: [],
                        quote: 0,
                        trailingSpace: 0,
                        trailingSpaceNewLine: !1,
                        strikethrough: !1,
                        emoji: !1,
                        fencedEndRE: null
                    }
                },
                copyState: function(t) {
                    return {
                        f: t.f,
                        prevLine: t.prevLine,
                        thisLine: t.thisLine,
                        block: t.block,
                        htmlState: t.htmlState && e.copyState(k, t.htmlState),
                        indentation: t.indentation,
                        localMode: t.localMode,
                        localState: t.localMode ? e.copyState(t.localMode, t.localState) : null,
                        inline: t.inline,
                        text: t.text,
                        formatting: !1,
                        linkText: t.linkText,
                        linkTitle: t.linkTitle,
                        linkHref: t.linkHref,
                        code: t.code,
                        em: t.em,
                        strong: t.strong,
                        strikethrough: t.strikethrough,
                        emoji: t.emoji,
                        header: t.header,
                        setext: t.setext,
                        hr: t.hr,
                        taskList: t.taskList,
                        list: t.list,
                        listStack: t.listStack.slice(0),
                        quote: t.quote,
                        indentedCode: t.indentedCode,
                        trailingSpace: t.trailingSpace,
                        trailingSpaceNewLine: t.trailingSpaceNewLine,
                        md_inside: t.md_inside,
                        fencedEndRE: t.fencedEndRE
                    }
                },
                token: function(e, t) {
                    if (t.formatting = !1, e != t.thisLine.stream) {
                        if (t.header = 0, t.hr = !1, e.match(/^\s*$/, !0)) return l(t), null;
                        if (t.prevLine = t.thisLine, t.thisLine = {
                                stream: e
                            }, t.taskList = !1, t.trailingSpace = 0, t.trailingSpaceNewLine = !1, !t.localState && (t.f = t.block, t.f != c)) {
                            var n = e.match(/^\s*/, !0)[0].replace(/\t/g, N).length;
                            if (t.indentation = n, t.indentationDiff = null, n > 0) return null
                        }
                    }
                    return t.f(e, t)
                },
                innerMode: function(e) {
                    return e.block == c ? {
                        state: e.htmlState,
                        mode: k
                    } : e.localState ? {
                        state: e.localState,
                        mode: e.localMode
                    } : {
                        state: e,
                        mode: P
                    }
                },
                indent: function(t, n, r) {
                    return t.block == c && k.indent ? k.indent(t.htmlState, n, r) : t.localState && t.localMode.indent ? t.localMode.indent(t.localState, n, r) : e.Pass
                },
                blankLine: l,
                getType: d,
                blockCommentStart: "<!--",
                blockCommentEnd: "-->",
                closeBrackets: "()[]{}''\"\"``",
                fold: "markdown"
            };
        return P
    }), "xml"), e.defineMIME("text/markdown", "markdown"), e.defineMIME("text/x-markdown", "markdown")
})),
function(e) {
    "object" == typeof exports && "object" == typeof module ? e(require("../../lib/codemirror"), require("../javascript/javascript"), require("../css/css"), require("../htmlmixed/htmlmixed")) : "function" == typeof define && define.amd ? define(["../../lib/codemirror", "../javascript/javascript", "../css/css", "../htmlmixed/htmlmixed"], e) : e(CodeMirror)
}((function(e) {
    "use strict";
    e.defineMode("pug", (function(t) {
        function n() {
            this.javaScriptLine = !1, this.javaScriptLineExcludesColon = !1, this.javaScriptArguments = !1, this.javaScriptArgumentsDepth = 0, this.isInterpolating = !1, this.interpolationNesting = 0, this.jsState = e.startState(Z), this.restOfLine = "", this.isIncludeFiltered = !1, this.isEach = !1, this.lastTag = "", this.scriptType = "", this.isAttrs = !1, this.attrsNest = [], this.inAttributeName = !0, this.attributeIsType = !1, this.attrValue = "", this.indentOf = 1 / 0, this.indentToken = "", this.innerMode = null, this.innerState = null, this.innerModeForLine = !1
        }

        function r(e, t) {
            if (e.sol() && (t.javaScriptLine = !1, t.javaScriptLineExcludesColon = !1), t.javaScriptLine) {
                if (t.javaScriptLineExcludesColon && ":" === e.peek()) return t.javaScriptLine = !1, void(t.javaScriptLineExcludesColon = !1);
                var n = Z.token(e, t.jsState);
                return e.eol() && (t.javaScriptLine = !1), n || !0
            }
        }

        function i(e, t) {
            if (t.javaScriptArguments) return 0 === t.javaScriptArgumentsDepth && "(" !== e.peek() ? void(t.javaScriptArguments = !1) : ("(" === e.peek() ? t.javaScriptArgumentsDepth++ : ")" === e.peek() && t.javaScriptArgumentsDepth--, 0 === t.javaScriptArgumentsDepth ? void(t.javaScriptArguments = !1) : Z.token(e, t.jsState) || !0)
        }

        function o(e) {
            if (e.match(/^yield\b/)) return "keyword"
        }

        function a(e) {
            if (e.match(/^(?:doctype) *([^\n]+)?/)) return V
        }

        function l(e, t) {
            if (e.match("#{")) return t.isInterpolating = !0, t.interpolationNesting = 0, "punctuation"
        }

        function s(e, t) {
            if (t.isInterpolating) {
                if ("}" === e.peek()) {
                    if (t.interpolationNesting--, t.interpolationNesting < 0) return e.next(), t.isInterpolating = !1, "punctuation"
                } else "{" === e.peek() && t.interpolationNesting++;
                return Z.token(e, t.jsState) || !0
            }
        }

        function c(e, t) {
            if (e.match(/^case\b/)) return t.javaScriptLine = !0, K
        }

        function u(e, t) {
            if (e.match(/^when\b/)) return t.javaScriptLine = !0, t.javaScriptLineExcludesColon = !0, K
        }

        function d(e) {
            if (e.match(/^default\b/)) return K
        }

        function f(e, t) {
            if (e.match(/^extends?\b/)) return t.restOfLine = "string", K
        }

        function h(e, t) {
            if (e.match(/^append\b/)) return t.restOfLine = "variable", K
        }

        function p(e, t) {
            if (e.match(/^prepend\b/)) return t.restOfLine = "variable", K
        }

        function m(e, t) {
            if (e.match(/^block\b *(?:(prepend|append)\b)?/)) return t.restOfLine = "variable", K
        }

        function g(e, t) {
            if (e.match(/^include\b/)) return t.restOfLine = "string", K
        }

        function v(e, t) {
            if (e.match(/^include:([a-zA-Z0-9\-]+)/, !1) && e.match("include")) return t.isIncludeFiltered = !0, K
        }

        function y(e, t) {
            if (t.isIncludeFiltered) {
                var n = M(e, t);
                return t.isIncludeFiltered = !1, t.restOfLine = "string", n
            }
        }

        function b(e, t) {
            if (e.match(/^mixin\b/)) return t.javaScriptLine = !0, K
        }

        function k(e, t) {
            return e.match(/^\+([-\w]+)/) ? (e.match(/^\( *[-\w]+ *=/, !1) || (t.javaScriptArguments = !0, t.javaScriptArgumentsDepth = 0), "variable") : e.match("+#{", !1) ? (e.next(), t.mixinCallAfter = !0, l(e, t)) : void 0
        }

        function x(e, t) {
            if (t.mixinCallAfter) return t.mixinCallAfter = !1, e.match(/^\( *[-\w]+ *=/, !1) || (t.javaScriptArguments = !0, t.javaScriptArgumentsDepth = 0), !0
        }

        function w(e, t) {
            if (e.match(/^(if|unless|else if|else)\b/)) return t.javaScriptLine = !0, K
        }

        function C(e, t) {
            if (e.match(/^(- *)?(each|for)\b/)) return t.isEach = !0, K
        }

        function S(e, t) {
            if (t.isEach) {
                if (e.match(/^ in\b/)) return t.javaScriptLine = !0, t.isEach = !1, K;
                if (e.sol() || e.eol()) t.isEach = !1;
                else if (e.next()) {
                    for (; !e.match(/^ in\b/, !1) && e.next(););
                    return "variable"
                }
            }
        }

        function L(e, t) {
            if (e.match(/^while\b/)) return t.javaScriptLine = !0, K
        }

        function T(e, t) {
            var n;
            if (n = e.match(/^(\w(?:[-:\w]*\w)?)\/?/)) return t.lastTag = n[1].toLowerCase(), "script" === t.lastTag && (t.scriptType = "application/javascript"), "tag"
        }

        function M(n, r) {
            var i;
            if (n.match(/^:([\w\-]+)/)) return t && t.innerModes && (i = t.innerModes(n.current().substring(1))), i || (i = n.current().substring(1)), "string" == typeof i && (i = e.getMode(t, i)), H(n, r, i), "atom"
        }

        function A(e, t) {
            if (e.match(/^(!?=|-)/)) return t.javaScriptLine = !0, "punctuation"
        }

        function z(e) {
            if (e.match(/^#([\w-]+)/)) return G
        }

        function O(e) {
            if (e.match(/^\.([\w-]+)/)) return Y
        }

        function F(e, t) {
            if ("(" == e.peek()) return e.next(), t.isAttrs = !0, t.attrsNest = [], t.inAttributeName = !0, t.attrValue = "", t.attributeIsType = !1, "punctuation"
        }

        function E(t, n) {
            if (n.isAttrs) {
                if (X[t.peek()] && n.attrsNest.push(X[t.peek()]), n.attrsNest[n.attrsNest.length - 1] === t.peek()) n.attrsNest.pop();
                else if (t.eat(")")) return n.isAttrs = !1, "punctuation";
                if (n.inAttributeName && t.match(/^[^=,\)!]+/)) return "=" !== t.peek() && "!" !== t.peek() || (n.inAttributeName = !1, n.jsState = e.startState(Z), "script" === n.lastTag && "type" === t.current().trim().toLowerCase() ? n.attributeIsType = !0 : n.attributeIsType = !1), "attribute";
                var r = Z.token(t, n.jsState);
                if (n.attributeIsType && "string" === r && (n.scriptType = t.current().toString()), 0 === n.attrsNest.length && ("string" === r || "variable" === r || "keyword" === r)) try {
                    return Function("", "var x " + n.attrValue.replace(/,\s*$/, "").replace(/^!/, "")), n.inAttributeName = !0, n.attrValue = "", t.backUp(t.current().length), E(t, n)
                } catch (e) {}
                return n.attrValue += t.current(), r || !0
            }
        }

        function N(e, t) {
            if (e.match(/^&attributes\b/)) return t.javaScriptArguments = !0, t.javaScriptArgumentsDepth = 0, "keyword"
        }

        function D(e) {
            if (e.sol() && e.eatSpace()) return "indent"
        }

        function P(e, t) {
            if (e.match(/^ *\/\/(-)?([^\n]*)/)) return t.indentOf = e.indentation(), t.indentToken = "comment", "comment"
        }

        function I(e) {
            if (e.match(/^: */)) return "colon"
        }

        function j(e, t) {
            return e.match(/^(?:\| ?| )([^\n]+)/) ? "string" : e.match(/^(<[^\n]*)/, !1) ? (H(e, t, "htmlmixed"), t.innerModeForLine = !0, _(e, t, !0)) : void 0
        }

        function B(e, t) {
            if (e.eat(".")) {
                var n = null;
                return "script" === t.lastTag && -1 != t.scriptType.toLowerCase().indexOf("javascript") ? n = t.scriptType.toLowerCase().replace(/"|'/g, "") : "style" === t.lastTag && (n = "css"), H(e, t, n), "dot"
            }
        }

        function W(e) {
            return e.next(), null
        }

        function H(n, r, i) {
            i = e.mimeModes[i] || i, i = t.innerModes && t.innerModes(i) || i, i = e.mimeModes[i] || i, i = e.getMode(t, i), r.indentOf = n.indentation(), i && "null" !== i.name ? r.innerMode = i : r.indentToken = "string"
        }

        function _(t, n, r) {
            if (t.indentation() > n.indentOf || n.innerModeForLine && !t.sol() || r) return n.innerMode ? (n.innerState || (n.innerState = n.innerMode.startState ? e.startState(n.innerMode, t.indentation()) : {}), t.hideFirstChars(n.indentOf + 2, (function() {
                return n.innerMode.token(t, n.innerState) || !0
            }))) : (t.skipToEnd(), n.indentToken);
            t.sol() && (n.indentOf = 1 / 0, n.indentToken = null, n.innerMode = null, n.innerState = null)
        }

        function R(e, t) {
            if (e.sol() && (t.restOfLine = ""), t.restOfLine) {
                e.skipToEnd();
                var n = t.restOfLine;
                return t.restOfLine = "", n
            }
        }

        function q() {
            return new n
        }

        function U(e) {
            return e.copy()
        }

        function $(e, t) {
            var n = _(e, t) || R(e, t) || s(e, t) || y(e, t) || S(e, t) || E(e, t) || r(e, t) || i(e, t) || x(e, t) || o(e) || a(e) || l(e, t) || c(e, t) || u(e, t) || d(e) || f(e, t) || h(e, t) || p(e, t) || m(e, t) || g(e, t) || v(e, t) || b(e, t) || k(e, t) || w(e, t) || C(e, t) || L(e, t) || T(e, t) || M(e, t) || A(e, t) || z(e) || O(e) || F(e, t) || N(e, t) || D(e) || j(e, t) || P(e, t) || I(e) || B(e, t) || W(e);
            return !0 === n ? null : n
        }
        var K = "keyword",
            V = "meta",
            G = "builtin",
            Y = "qualifier",
            X = {
                "{": "}",
                "(": ")",
                "[": "]"
            },
            Z = e.getMode(t, "javascript");
        return n.prototype.copy = function() {
            var t = new n;
            return t.javaScriptLine = this.javaScriptLine, t.javaScriptLineExcludesColon = this.javaScriptLineExcludesColon, t.javaScriptArguments = this.javaScriptArguments, t.javaScriptArgumentsDepth = this.javaScriptArgumentsDepth, t.isInterpolating = this.isInterpolating, t.interpolationNesting = this.interpolationNesting, t.jsState = e.copyState(Z, this.jsState), t.innerMode = this.innerMode, this.innerMode && this.innerState && (t.innerState = e.copyState(this.innerMode, this.innerState)), t.restOfLine = this.restOfLine, t.isIncludeFiltered = this.isIncludeFiltered, t.isEach = this.isEach, t.lastTag = this.lastTag, t.scriptType = this.scriptType, t.isAttrs = this.isAttrs, t.attrsNest = this.attrsNest.slice(), t.inAttributeName = this.inAttributeName, t.attributeIsType = this.attributeIsType, t.attrValue = this.attrValue, t.indentOf = this.indentOf, t.indentToken = this.indentToken, t.innerModeForLine = this.innerModeForLine, t
        }, {
            startState: q,
            copyState: U,
            token: $
        }
    }), "javascript", "css", "htmlmixed"), e.defineMIME("text/x-pug", "pug"), e.defineMIME("text/x-jade", "pug")
})),
function(e) {
    "object" == typeof exports && "object" == typeof module ? e(require("../../lib/codemirror"), require("../css/css")) : "function" == typeof define && define.amd ? define(["../../lib/codemirror", "../css/css"], e) : e(CodeMirror)
}((function(e) {
    "use strict";
    e.defineMode("sass", (function(t) {
        function n(e) {
            return new RegExp("^" + e.join("|"))
        }

        function r(e) {
            return !e.peek() || e.match(/\s+$/, !1)
        }

        function i(e, t) {
            var n = e.peek();
            return ")" === n ? (e.next(), t.tokenizer = u, "operator") : "(" === n ? (e.next(), e.eatSpace(), "operator") : "'" === n || '"' === n ? (t.tokenizer = a(e.next()), "string") : (t.tokenizer = a(")", !1), "string")
        }

        function o(e, t) {
            return function(n, r) {
                return n.sol() && n.indentation() <= e ? (r.tokenizer = u, u(n, r)) : (t && n.skipTo("*/") ? (n.next(), n.next(), r.tokenizer = u) : n.skipToEnd(), "comment")
            }
        }

        function a(e, t) {
            function n(i, o) {
                var a = i.next(),
                    s = i.peek(),
                    c = i.string.charAt(i.pos - 2);
                return "\\" !== a && s === e || a === e && "\\" !== c ? (a !== e && t && i.next(), r(i) && (o.cursorHalf = 0), o.tokenizer = u, "string") : "#" === a && "{" === s ? (o.tokenizer = l(n), i.next(), "operator") : "string"
            }
            return null == t && (t = !0), n
        }

        function l(e) {
            return function(t, n) {
                return "}" === t.peek() ? (t.next(), n.tokenizer = e, "operator") : u(t, n)
            }
        }

        function s(e) {
            if (0 == e.indentCount) {
                e.indentCount++;
                var n = e.scopes[0].offset + t.indentUnit;
                e.scopes.unshift({
                    offset: n
                })
            }
        }

        function c(e) {
            1 != e.scopes.length && e.scopes.shift()
        }

        function u(e, t) {
            var n = e.peek();
            if (e.match("/*")) return t.tokenizer = o(e.indentation(), !0), t.tokenizer(e, t);
            if (e.match("//")) return t.tokenizer = o(e.indentation(), !1), t.tokenizer(e, t);
            if (e.match("#{")) return t.tokenizer = l(u), "operator";
            if ('"' === n || "'" === n) return e.next(), t.tokenizer = a(n), "string";
            if (t.cursorHalf) {
                if ("#" === n && (e.next(), e.match(/[0-9a-fA-F]{6}|[0-9a-fA-F]{3}/))) return r(e) && (t.cursorHalf = 0), "number";
                if (e.match(/^-?[0-9\.]+/)) return r(e) && (t.cursorHalf = 0), "number";
                if (e.match(/^(px|em|in)\b/)) return r(e) && (t.cursorHalf = 0), "unit";
                if (e.match(y)) return r(e) && (t.cursorHalf = 0), "keyword";
                if (e.match(/^url/) && "(" === e.peek()) return t.tokenizer = i, r(e) && (t.cursorHalf = 0), "atom";
                if ("$" === n) return e.next(), e.eatWhile(/[\w-]/), r(e) && (t.cursorHalf = 0), "variable-2";
                if ("!" === n) return e.next(), t.cursorHalf = 0, e.match(/^[\w]+/) ? "keyword" : "operator";
                if (e.match(b)) return r(e) && (t.cursorHalf = 0), "operator";
                if (e.eatWhile(/[\w-]/)) return r(e) && (t.cursorHalf = 0), f = e.current().toLowerCase(), g.hasOwnProperty(f) ? "atom" : m.hasOwnProperty(f) ? "keyword" : p.hasOwnProperty(f) ? (t.prevProp = e.current().toLowerCase(), "property") : "tag";
                if (r(e)) return t.cursorHalf = 0, null
            } else {
                if ("-" === n && e.match(/^-\w+-/)) return "meta";
                if ("." === n) {
                    if (e.next(), e.match(/^[\w-]+/)) return s(t), "qualifier";
                    if ("#" === e.peek()) return s(t), "tag"
                }
                if ("#" === n) {
                    if (e.next(), e.match(/^[\w-]+/)) return s(t), "builtin";
                    if ("#" === e.peek()) return s(t), "tag"
                }
                if ("$" === n) return e.next(), e.eatWhile(/[\w-]/), "variable-2";
                if (e.match(/^-?[0-9\.]+/)) return "number";
                if (e.match(/^(px|em|in)\b/)) return "unit";
                if (e.match(y)) return "keyword";
                if (e.match(/^url/) && "(" === e.peek()) return t.tokenizer = i, "atom";
                if ("=" === n && e.match(/^=[\w-]+/)) return s(t), "meta";
                if ("+" === n && e.match(/^\+[\w-]+/)) return "variable-3";
                if ("@" === n && e.match("@extend") && (e.match(/\s*[\w]/) || c(t)), e.match(/^@(else if|if|media|else|for|each|while|mixin|function)/)) return s(t), "def";
                if ("@" === n) return e.next(), e.eatWhile(/[\w-]/), "def";
                if (e.eatWhile(/[\w-]/)) {
                    if (e.match(/ *: *[\w-\+\$#!\("']/, !1)) {
                        f = e.current().toLowerCase();
                        var d = t.prevProp + "-" + f;
                        return p.hasOwnProperty(d) ? "property" : p.hasOwnProperty(f) ? (t.prevProp = f, "property") : v.hasOwnProperty(f) ? "property" : "tag"
                    }
                    return e.match(/ *:/, !1) ? (s(t), t.cursorHalf = 1, t.prevProp = e.current().toLowerCase(), "property") : (e.match(/ *,/, !1) || s(t), "tag")
                }
                if (":" === n) return e.match(k) ? "variable-3" : (e.next(), t.cursorHalf = 1, "operator")
            }
            return e.match(b) ? "operator" : (e.next(), null)
        }

        function d(e, n) {
            e.sol() && (n.indentCount = 0);
            var r = n.tokenizer(e, n),
                i = e.current();
            if ("@return" !== i && "}" !== i || c(n), null !== r) {
                for (var o = e.pos - i.length + t.indentUnit * n.indentCount, a = [], l = 0; l < n.scopes.length; l++) {
                    var s = n.scopes[l];
                    s.offset <= o && a.push(s)
                }
                n.scopes = a
            }
            return r
        }
        var f, h = e.mimeModes["text/css"],
            p = h.propertyKeywords || {},
            m = h.colorKeywords || {},
            g = h.valueKeywords || {},
            v = h.fontProperties || {},
            y = new RegExp("^" + ["true", "false", "null", "auto"].join("|")),
            b = n(["\\(", "\\)", "=", ">", "<", "==", ">=", "<=", "\\+", "-", "\\!=", "/", "\\*", "%", "and", "or", "not", ";", "\\{", "\\}", ":"]),
            k = /^::?[a-zA-Z_][\w\-]*/;
        return {
            startState: function() {
                return {
                    tokenizer: u,
                    scopes: [{
                        offset: 0,
                        type: "sass"
                    }],
                    indentCount: 0,
                    cursorHalf: 0,
                    definedVars: [],
                    definedMixins: []
                }
            },
            token: function(e, t) {
                var n = d(e, t);
                return t.lastToken = {
                    style: n,
                    content: e.current()
                }, n
            },
            indent: function(e) {
                return e.scopes[0].offset
            },
            blockCommentStart: "/*",
            blockCommentEnd: "*/",
            lineComment: "//",
            fold: "indent"
        }
    }), "css"), e.defineMIME("text/x-sass", "sass")
})),
function(e) {
    "object" == typeof exports && "object" == typeof module ? e(require("../../lib/codemirror")) : "function" == typeof define && define.amd ? define(["../../lib/codemirror"], e) : e(CodeMirror)
}((function(e) {
    "use strict";

    function t(e) {
        for (var t = {}, n = 0, r = e.length; n < r; ++n) t[e[n]] = !0;
        return t
    }
    var n = ["alias", "and", "BEGIN", "begin", "break", "case", "class", "def", "defined?", "do", "else", "elsif", "END", "end", "ensure", "false", "for", "if", "in", "module", "next", "not", "or", "redo", "rescue", "retry", "return", "self", "super", "then", "true", "undef", "unless", "until", "when", "while", "yield", "nil", "raise", "throw", "catch", "fail", "loop", "callcc", "caller", "lambda", "proc", "public", "protected", "private", "require", "load", "require_relative", "extend", "autoload", "__END__", "__FILE__", "__LINE__", "__dir__"],
        r = t(n),
        i = t(["def", "class", "case", "for", "while", "until", "module", "then", "catch", "loop", "proc", "begin"]),
        o = t(["end", "until"]),
        a = {
            "[": "]",
            "{": "}",
            "(": ")"
        },
        l = {
            "]": "[",
            "}": "{",
            ")": "("
        };
    e.defineMode("ruby", (function(t) {
        function n(e, t, n) {
            return n.tokenize.push(e), e(t, n)
        }

        function s(e, t) {
            if (e.sol() && e.match("=begin") && e.eol()) return t.tokenize.push(p), "comment";
            if (e.eatSpace()) return null;
            var r, i = e.next();
            if ("`" == i || "'" == i || '"' == i) return n(f(i, "string", '"' == i || "`" == i), e, t);
            if ("/" == i) return c(e) ? n(f(i, "string-2", !0), e, t) : "operator";
            if ("%" == i) {
                var o = "string",
                    l = !0;
                e.eat("s") ? o = "atom" : e.eat(/[WQ]/) ? o = "string" : e.eat(/[r]/) ? o = "string-2" : e.eat(/[wxq]/) && (o = "string", l = !1);
                var s = e.eat(/[^\w\s=]/);
                return s ? (a.propertyIsEnumerable(s) && (s = a[s]), n(f(s, o, l, !0), e, t)) : "operator"
            }
            if ("#" == i) return e.skipToEnd(), "comment";
            if ("<" == i && (r = e.match(/^<([-~])[\`\"\']?([a-zA-Z_?]\w*)[\`\"\']?(?:;|$)/))) return n(h(r[2], r[1]), e, t);
            if ("0" == i) return e.eat("x") ? e.eatWhile(/[\da-fA-F]/) : e.eat("b") ? e.eatWhile(/[01]/) : e.eatWhile(/[0-7]/), "number";
            if (/\d/.test(i)) return e.match(/^[\d_]*(?:\.[\d_]+)?(?:[eE][+\-]?[\d_]+)?/), "number";
            if ("?" == i) {
                for (; e.match(/^\\[CM]-/););
                return e.eat("\\") ? e.eatWhile(/\w/) : e.next(), "string"
            }
            if (":" == i) return e.eat("'") ? n(f("'", "atom", !1), e, t) : e.eat('"') ? n(f('"', "atom", !0), e, t) : e.eat(/[\<\>]/) ? (e.eat(/[\<\>]/), "atom") : e.eat(/[\+\-\*\/\&\|\:\!]/) ? "atom" : e.eat(/[a-zA-Z$@_\xa1-\uffff]/) ? (e.eatWhile(/[\w$\xa1-\uffff]/), e.eat(/[\?\!\=]/), "atom") : "operator";
            if ("@" == i && e.match(/^@?[a-zA-Z_\xa1-\uffff]/)) return e.eat("@"), e.eatWhile(/[\w\xa1-\uffff]/), "variable-2";
            if ("$" == i) return e.eat(/[a-zA-Z_]/) ? e.eatWhile(/[\w]/) : e.eat(/\d/) ? e.eat(/\d/) : e.next(), "variable-3";
            if (/[a-zA-Z_\xa1-\uffff]/.test(i)) return e.eatWhile(/[\w\xa1-\uffff]/), e.eat(/[\?\!]/), e.eat(":") ? "atom" : "ident";
            if ("|" != i || !t.varList && "{" != t.lastTok && "do" != t.lastTok) {
                if (/[\(\)\[\]{}\\;]/.test(i)) return m = i, null;
                if ("-" == i && e.eat(">")) return "arrow";
                if (/[=+\-\/*:\.^%<>~|]/.test(i)) {
                    var u = e.eatWhile(/[=+\-\/*:\.^%<>~|]/);
                    return "." != i || u || (m = "."), "operator"
                }
                return null
            }
            return m = "|", null
        }

        function c(e) {
            for (var t, n = e.pos, r = 0, i = !1, o = !1; null != (t = e.next());)
                if (o) o = !1;
                else {
                    if ("[{(".indexOf(t) > -1) r++;
                    else if ("]})".indexOf(t) > -1) {
                        if (--r < 0) break
                    } else if ("/" == t && 0 == r) {
                        i = !0;
                        break
                    }
                    o = "\\" == t
                }
            return e.backUp(e.pos - n), i
        }

        function u(e) {
            return e || (e = 1),
                function(t, n) {
                    if ("}" == t.peek()) {
                        if (1 == e) return n.tokenize.pop(), n.tokenize[n.tokenize.length - 1](t, n);
                        n.tokenize[n.tokenize.length - 1] = u(e - 1)
                    } else "{" == t.peek() && (n.tokenize[n.tokenize.length - 1] = u(e + 1));
                    return s(t, n)
                }
        }

        function d() {
            var e = !1;
            return function(t, n) {
                return e ? (n.tokenize.pop(), n.tokenize[n.tokenize.length - 1](t, n)) : (e = !0, s(t, n))
            }
        }

        function f(e, t, n, r) {
            return function(i, o) {
                var a, l = !1;
                for ("read-quoted-paused" === o.context.type && (o.context = o.context.prev, i.eat("}")); null != (a = i.next());) {
                    if (a == e && (r || !l)) {
                        o.tokenize.pop();
                        break
                    }
                    if (n && "#" == a && !l) {
                        if (i.eat("{")) {
                            "}" == e && (o.context = {
                                prev: o.context,
                                type: "read-quoted-paused"
                            }), o.tokenize.push(u());
                            break
                        }
                        if (/[@\$]/.test(i.peek())) {
                            o.tokenize.push(d());
                            break
                        }
                    }
                    l = !l && "\\" == a
                }
                return t
            }
        }

        function h(e, t) {
            return function(n, r) {
                return t && n.eatSpace(), n.match(e) ? r.tokenize.pop() : n.skipToEnd(), "string"
            }
        }

        function p(e, t) {
            return e.sol() && e.match("=end") && e.eol() && t.tokenize.pop(), e.skipToEnd(), "comment"
        }
        var m;
        return {
            startState: function() {
                return {
                    tokenize: [s],
                    indented: 0,
                    context: {
                        type: "top",
                        indented: -t.indentUnit
                    },
                    continuedLine: !1,
                    lastTok: null,
                    varList: !1
                }
            },
            token: function(e, t) {
                m = null, e.sol() && (t.indented = e.indentation());
                var n, a = t.tokenize[t.tokenize.length - 1](e, t),
                    l = m;
                if ("ident" == a) {
                    var s = e.current();
                    "keyword" == (a = "." == t.lastTok ? "property" : r.propertyIsEnumerable(e.current()) ? "keyword" : /^[A-Z]/.test(s) ? "tag" : "def" == t.lastTok || "class" == t.lastTok || t.varList ? "def" : "variable") && (l = s, i.propertyIsEnumerable(s) ? n = "indent" : o.propertyIsEnumerable(s) ? n = "dedent" : "if" != s && "unless" != s || e.column() != e.indentation() ? "do" == s && t.context.indented < t.indented && (n = "indent") : n = "indent")
                }
                return (m || a && "comment" != a) && (t.lastTok = l), "|" == m && (t.varList = !t.varList), "indent" == n || /[\(\[\{]/.test(m) ? t.context = {
                    prev: t.context,
                    type: m || a,
                    indented: t.indented
                } : ("dedent" == n || /[\)\]\}]/.test(m)) && t.context.prev && (t.context = t.context.prev), e.eol() && (t.continuedLine = "\\" == m || "operator" == a), a
            },
            indent: function(n, r) {
                if (n.tokenize[n.tokenize.length - 1] != s) return e.Pass;
                var i = r && r.charAt(0),
                    o = n.context,
                    a = o.type == l[i] || "keyword" == o.type && /^(?:end|until|else|elsif|when|rescue)\b/.test(r);
                return o.indented + (a ? 0 : t.indentUnit) + (n.continuedLine ? t.indentUnit : 0)
            },
            electricInput: /^\s*(?:end|rescue|elsif|else|\})$/,
            lineComment: "#",
            fold: "indent"
        }
    })), e.defineMIME("text/x-ruby", "ruby"), e.registerHelper("hintWords", "ruby", n)
})),
function(e) {
    "object" == typeof exports && "object" == typeof module ? e(require("../../lib/codemirror"), require("../htmlmixed/htmlmixed"), require("../ruby/ruby")) : "function" == typeof define && define.amd ? define(["../../lib/codemirror", "../htmlmixed/htmlmixed", "../ruby/ruby"], e) : e(CodeMirror)
}((function(e) {
    "use strict";
    e.defineMode("slim", (function(t) {
        function n(e, t, n) {
            var r = function(r, i) {
                return i.tokenize = t, r.pos < e ? (r.pos = e, n) : i.tokenize(r, i)
            };
            return function(e, n) {
                return n.tokenize = r, t(e, n)
            }
        }

        function r(e, t, r, i, o) {
            var a = e.current(),
                l = a.search(r);
            return l > -1 && (t.tokenize = n(e.pos, t.tokenize, o), e.backUp(a.length - l - i)), o
        }

        function i(e, t) {
            e.stack = {
                parent: e.stack,
                style: "continuation",
                indented: t,
                tokenize: e.line
            }, e.line = e.tokenize
        }

        function o(e) {
            e.line == e.tokenize && (e.line = e.stack.tokenize, e.stack = e.stack.parent)
        }

        function a(e, t) {
            return function(n, r) {
                if (o(r), n.match(/^\\$/)) return i(r, e), "lineContinuation";
                var a = t(n, r);
                return n.eol() && n.current().match(/(?:^|[^\\])(?:\\\\)*\\$/) && n.backUp(1), a
            }
        }

        function l(e, t) {
            return function(n, r) {
                o(r);
                var a = t(n, r);
                return n.eol() && n.current().match(/,$/) && i(r, e), a
            }
        }

        function s(e, t) {
            return function(n, r) {
                return n.peek() == e && 1 == r.rubyState.tokenize.length ? (n.next(), r.tokenize = t, "closeAttributeTag") : u(n, r)
            }
        }

        function c(t) {
            var n, r = function(e, r) {
                if (1 == r.rubyState.tokenize.length && !r.rubyState.context.prev) {
                    if (e.backUp(1), e.eatSpace()) return r.rubyState = n, r.tokenize = t, t(e, r);
                    e.next()
                }
                return u(e, r)
            };
            return function(t, i) {
                return n = i.rubyState, i.rubyState = e.startState(W), i.tokenize = r, u(t, i)
            }
        }

        function u(e, t) {
            return W.token(e, t.rubyState)
        }

        function d(e, t) {
            return e.match(/^\\$/) ? "lineContinuation" : f(e, t)
        }

        function f(e, t) {
            return e.match(/^#\{/) ? (t.tokenize = s("}", t.tokenize), null) : r(e, t, /[^\\]#\{/, 1, B.token(e, t.htmlState))
        }

        function h(e) {
            return function(t, n) {
                var r = d(t, n);
                return t.eol() && (n.tokenize = e), r
            }
        }

        function p(e, t, n) {
            return t.stack = {
                parent: t.stack,
                style: "html",
                indented: e.column() + n,
                tokenize: t.line
            }, t.line = t.tokenize = f, null
        }

        function m(e, t) {
            return e.skipToEnd(), t.stack.style
        }

        function g(e, t) {
            return t.stack = {
                parent: t.stack,
                style: "comment",
                indented: t.indented + 1,
                tokenize: t.line
            }, t.line = m, m(e, t)
        }

        function v(e, t) {
            return e.eat(t.stack.endQuote) ? (t.line = t.stack.line, t.tokenize = t.stack.tokenize, t.stack = t.stack.parent, null) : e.match(Y) ? (t.tokenize = y, "slimAttribute") : (e.next(), null)
        }

        function y(e, t) {
            return e.match(/^==?/) ? (t.tokenize = b, null) : v(e, t)
        }

        function b(e, t) {
            var n = e.peek();
            return '"' == n || "'" == n ? (t.tokenize = I(n, "string", !0, !1, v), e.next(), t.tokenize(e, t)) : "[" == n ? c(v)(e, t) : e.match(/^(true|false|nil)\b/) ? (t.tokenize = v, "keyword") : c(v)(e, t)
        }

        function k(e, t, n) {
            return e.stack = {
                parent: e.stack,
                style: "wrapper",
                indented: e.indented + 1,
                tokenize: n,
                line: e.line,
                endQuote: t
            }, e.line = e.tokenize = v, null
        }

        function x(t, n) {
            if (t.match(/^#\{/)) return n.tokenize = s("}", n.tokenize), null;
            var r = new e.StringStream(t.string.slice(n.stack.indented), t.tabSize);
            r.pos = t.pos - n.stack.indented, r.start = t.start - n.stack.indented, r.lastColumnPos = t.lastColumnPos - n.stack.indented, r.lastColumnValue = t.lastColumnValue - n.stack.indented;
            var i = n.subMode.token(r, n.subState);
            return t.pos = r.pos + n.stack.indented, i
        }

        function w(e, t) {
            return t.stack.indented = e.column(), t.line = t.tokenize = x, t.tokenize(e, t)
        }

        function C(n) {
            var r = _[n],
                i = e.mimeModes[r];
            if (i) return e.getMode(t, i);
            var o = e.modes[r];
            return o ? o(t, {
                name: r
            }) : e.getMode(t, "null")
        }

        function S(e) {
            return H.hasOwnProperty(e) ? H[e] : H[e] = C(e)
        }

        function L(t, n) {
            var r = S(t),
                i = e.startState(r);
            return n.subMode = r, n.subState = i, n.stack = {
                parent: n.stack,
                style: "sub",
                indented: n.indented + 1,
                tokenize: n.line
            }, n.line = n.tokenize = w, "slimSubmode"
        }

        function T(e) {
            return e.skipToEnd(), "slimDoctype"
        }

        function M(e, t) {
            if ("<" == e.peek()) return (t.tokenize = h(t.tokenize))(e, t);
            if (e.match(/^[|']/)) return p(e, t, 1);
            if (e.match(/^\/(!|\[\w+])?/)) return g(e, t);
            if (e.match(/^(-|==?[<>]?)/)) return t.tokenize = a(e.column(), l(e.column(), u)), "slimSwitch";
            if (e.match(/^doctype\b/)) return t.tokenize = T, "keyword";
            var n = e.match(R);
            return n ? L(n[1], t) : z(e, t)
        }

        function A(e, t) {
            return t.startOfLine ? M(e, t) : z(e, t)
        }

        function z(e, t) {
            return e.eat("*") ? (t.tokenize = c(O), null) : e.match(V) ? (t.tokenize = O, "slimTag") : F(e, t)
        }

        function O(e, t) {
            return e.match(/^(<>?|><?)/) ? (t.tokenize = F, null) : F(e, t)
        }

        function F(e, t) {
            return e.match(Z) ? (t.tokenize = F, "slimId") : e.match(X) ? (t.tokenize = F, "slimClass") : E(e, t)
        }

        function E(e, t) {
            return e.match(/^([\[\{\(])/) ? k(t, U[RegExp.$1], E) : e.match(G) ? (t.tokenize = N, "slimAttribute") : "*" == e.peek() ? (e.next(), t.tokenize = c(j), null) : j(e, t)
        }

        function N(e, t) {
            return e.match(/^==?/) ? (t.tokenize = D, null) : E(e, t)
        }

        function D(e, t) {
            var n = e.peek();
            return '"' == n || "'" == n ? (t.tokenize = I(n, "string", !0, !1, E), e.next(), t.tokenize(e, t)) : "[" == n ? c(E)(e, t) : ":" == n ? c(P)(e, t) : e.match(/^(true|false|nil)\b/) ? (t.tokenize = E, "keyword") : c(E)(e, t)
        }

        function P(e, t) {
            return e.backUp(1), e.match(/^[^\s],(?=:)/) ? (t.tokenize = c(P), null) : (e.next(), E(e, t))
        }

        function I(e, t, n, r, a) {
            return function(l, c) {
                o(c);
                var u = 0 == l.current().length;
                if (l.match(/^\\$/, u)) return u ? (i(c, c.indented), "lineContinuation") : t;
                if (l.match(/^#\{/, u)) return u ? (c.tokenize = s("}", c.tokenize), null) : t;
                for (var d, f = !1; null != (d = l.next());) {
                    if (d == e && (r || !f)) {
                        c.tokenize = a;
                        break
                    }
                    if (n && "#" == d && !f && l.eat("{")) {
                        l.backUp(2);
                        break
                    }
                    f = !f && "\\" == d
                }
                return l.eol() && f && l.backUp(1), t
            }
        }

        function j(e, t) {
            return e.match(/^==?/) ? (t.tokenize = u, "slimSwitch") : e.match(/^\/$/) ? (t.tokenize = A, null) : e.match(/^:/) ? (t.tokenize = z, "slimSwitch") : (p(e, t, 0), t.tokenize(e, t))
        }
        var B = e.getMode(t, {
                name: "htmlmixed"
            }),
            W = e.getMode(t, "ruby"),
            H = {
                html: B,
                ruby: W
            },
            _ = {
                ruby: "ruby",
                javascript: "javascript",
                css: "text/css",
                sass: "text/x-sass",
                scss: "text/x-scss",
                less: "text/x-less",
                styl: "text/x-styl",
                coffee: "coffeescript",
                asciidoc: "text/x-asciidoc",
                markdown: "text/x-markdown",
                textile: "text/x-textile",
                creole: "text/x-creole",
                wiki: "text/x-wiki",
                mediawiki: "text/x-mediawiki",
                rdoc: "text/x-rdoc",
                builder: "text/x-builder",
                nokogiri: "text/x-nokogiri",
                erb: "application/x-erb"
            },
            R = function(e) {
                var t = [];
                for (var n in e) t.push(n);
                return new RegExp("^(" + t.join("|") + "):")
            }(_),
            q = {
                commentLine: "comment",
                slimSwitch: "operator special",
                slimTag: "tag",
                slimId: "attribute def",
                slimClass: "attribute qualifier",
                slimAttribute: "attribute",
                slimSubmode: "keyword special",
                closeAttributeTag: null,
                slimDoctype: null,
                lineContinuation: null
            },
            U = {
                "{": "}",
                "[": "]",
                "(": ")"
            },
            $ = "_a-zA-Z\xc0-\xd6\xd8-\xf6\xf8-\u02ff\u0370-\u037d\u037f-\u1fff\u200c-\u200d\u2070-\u218f\u2c00-\u2fef\u3001-\ud7ff\uf900-\ufdcf\ufdf0-\ufffd",
            K = $ + "\\-0-9\xb7\u0300-\u036f\u203f-\u2040",
            V = new RegExp("^[:" + $ + "](?::[" + K + "]|[" + K + "]*)"),
            G = new RegExp("^[:" + $ + "][:\\." + K + "]*(?=\\s*=)"),
            Y = new RegExp("^[:" + $ + "][:\\." + K + "]*"),
            X = /^\.-?[_a-zA-Z]+[\w\-]*/,
            Z = /^#[_a-zA-Z]+[\w\-]*/,
            Q = {
                startState: function() {
                    return {
                        htmlState: e.startState(B),
                        rubyState: e.startState(W),
                        stack: null,
                        last: null,
                        tokenize: A,
                        line: A,
                        indented: 0
                    }
                },
                copyState: function(t) {
                    return {
                        htmlState: e.copyState(B, t.htmlState),
                        rubyState: e.copyState(W, t.rubyState),
                        subMode: t.subMode,
                        subState: t.subMode && e.copyState(t.subMode, t.subState),
                        stack: t.stack,
                        last: t.last,
                        tokenize: t.tokenize,
                        line: t.line
                    }
                },
                token: function(e, t) {
                    if (e.sol())
                        for (t.indented = e.indentation(), t.startOfLine = !0, t.tokenize = t.line; t.stack && t.stack.indented > t.indented && "slimSubmode" != t.last;) t.line = t.tokenize = t.stack.tokenize, t.stack = t.stack.parent, t.subMode = null, t.subState = null;
                    if (e.eatSpace()) return null;
                    var n = t.tokenize(e, t);
                    return t.startOfLine = !1, n && (t.last = n), q.hasOwnProperty(n) ? q[n] : n
                },
                blankLine: function(e) {
                    if (e.subMode && e.subMode.blankLine) return e.subMode.blankLine(e.subState)
                },
                innerMode: function(e) {
                    return e.subMode ? {
                        state: e.subState,
                        mode: e.subMode
                    } : {
                        state: e,
                        mode: Q
                    }
                }
            };
        return Q
    }), "htmlmixed", "ruby"), e.defineMIME("text/x-slim", "slim"), e.defineMIME("application/x-slim", "slim")
})),
function(e) {
    "object" == typeof exports && "object" == typeof module ? e(require("../../lib/codemirror")) : "function" == typeof define && define.amd ? define(["../../lib/codemirror"], e) : e(CodeMirror)
}((function(e) {
    "use strict";

    function t(e) {
        return e = e.sort((function(e, t) {
            return t > e
        })), new RegExp("^((" + e.join(")|(") + "))\\b")
    }

    function n(e) {
        for (var t = {}, n = 0; n < e.length; ++n) t[e[n]] = !0;
        return t
    }

    function r(e) {
        return e.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&")
    }
    e.defineMode("stylus", (function(e) {
        function g(e, t) {
            if (ie = e.string.match(/(^[\w-]+\s*=\s*$)|(^\s*[\w-]+\s*=\s*[\w-])|(^\s*(\.|#|@|\$|\&|\[|\d|\+|::?|\{|\>|~|\/)?\s*[\w-]*([a-z0-9-]|\*|\/\*)(\(|,)?)/), t.context.line.firstWord = ie ? ie[0].replace(/^\s*/, "") : "", t.context.line.indent = e.indentation(), I = e.peek(), e.match("//")) return e.skipToEnd(), ["comment", "comment"];
            if (e.match("/*")) return t.tokenize = v, v(e, t);
            if ('"' == I || "'" == I) return e.next(), t.tokenize = y(I), t.tokenize(e, t);
            if ("@" == I) return e.next(), e.eatWhile(/[\w\\-]/), ["def", e.current()];
            if ("#" == I) {
                if (e.next(), e.match(/^[0-9a-f]{3}([0-9a-f]([0-9a-f]{2}){0,2})?\b(?!-)/i)) return ["atom", "atom"];
                if (e.match(/^[a-z][\w-]*/i)) return ["builtin", "hash"]
            }
            return e.match(ne) ? ["meta", "vendor-prefixes"] : e.match(/^-?[0-9]?\.?[0-9]/) ? (e.eatWhile(/[a-z%]/i), ["number", "unit"]) : "!" == I ? (e.next(), [e.match(/^(important|optional)/i) ? "keyword" : "operator", "important"]) : "." == I && e.match(/^\.[a-z][\w-]*/i) ? ["qualifier", "qualifier"] : e.match(Y) ? ("(" == e.peek() && (t.tokenize = b), ["property", "word"]) : e.match(/^[a-z][\w-]*\(/i) ? (e.backUp(1), ["keyword", "mixin"]) : e.match(/^(\+|-)[a-z][\w-]*\(/i) ? (e.backUp(1), ["keyword", "block-mixin"]) : e.string.match(/^\s*&/) && e.match(/^[-_]+[a-z][\w-]*/) ? ["qualifier", "qualifier"] : e.match(/^(\/|&)(-|_|:|\.|#|[a-z])/) ? (e.backUp(1), ["variable-3", "reference"]) : e.match(/^&{1}\s*$/) ? ["variable-3", "reference"] : e.match(ee) ? ["operator", "operator"] : e.match(/^\$?[-_]*[a-z0-9]+[\w-]*/i) ? e.match(/^(\.|\[)[\w-\'\"\]]+/i, !1) && !L(e.current()) ? (e.match("."), ["variable-2", "variable-name"]) : ["variable-2", "word"] : e.match(J) ? ["operator", e.current()] : /[:;,{}\[\]\(\)]/.test(I) ? (e.next(), [null, I]) : (e.next(), [null, null])
        }

        function v(e, t) {
            for (var n, r = !1; null != (n = e.next());) {
                if (r && "/" == n) {
                    t.tokenize = null;
                    break
                }
                r = "*" == n
            }
            return ["comment", "comment"]
        }

        function y(e) {
            return function(t, n) {
                for (var r, i = !1; null != (r = t.next());) {
                    if (r == e && !i) {
                        ")" == e && t.backUp(1);
                        break
                    }
                    i = !i && "\\" == r
                }
                return (r == e || !i && ")" != e) && (n.tokenize = null), ["string", "string"]
            }
        }

        function b(e, t) {
            return e.next(), e.match(/\s*[\"\')]/, !1) ? t.tokenize = null : t.tokenize = y(")"), [null, "("]
        }

        function k(e, t, n, r) {
            this.type = e, this.indent = t, this.prev = n, this.line = r || {
                firstWord: "",
                indent: 0
            }
        }

        function x(e, t, n, r) {
            return r = r >= 0 ? r : H, e.context = new k(n, t.indentation() + r, e.context), n
        }

        function w(e, t) {
            var n = e.context.indent - H;
            return t = t || !1, e.context = e.context.prev, t && (e.context.indent = n), e.context.type
        }

        function C(e, t, n) {
            return oe[n.context.type](e, t, n)
        }

        function S(e, t, n, r) {
            for (var i = r || 1; i > 0; i--) n.context = n.context.prev;
            return C(e, t, n)
        }

        function L(e) {
            return e.toLowerCase() in R
        }

        function T(e) {
            return (e = e.toLowerCase()) in U || e in Q
        }

        function M(e) {
            return e.toLowerCase() in te
        }

        function A(e) {
            return e.toLowerCase().match(ne)
        }

        function z(e) {
            var t = e.toLowerCase(),
                n = "variable-2";
            return L(e) ? n = "tag" : M(e) ? n = "block-keyword" : T(e) ? n = "property" : t in K || t in re ? n = "atom" : "return" == t || t in V ? n = "keyword" : e.match(/^[A-Z]/) && (n = "string"), n
        }

        function O(e, t) {
            return D(t) && ("{" == e || "]" == e || "hash" == e || "qualifier" == e) || "block-mixin" == e
        }

        function F(e, t) {
            return "{" == e && t.match(/^\s*\$?[\w-]+/i, !1)
        }

        function E(e, t) {
            return ":" == e && t.match(/^[a-z-]+/, !1)
        }

        function N(e) {
            return e.sol() || e.string.match(new RegExp("^\\s*" + r(e.current())))
        }

        function D(e) {
            return e.eol() || e.match(/^\s*$/, !1)
        }

        function P(e) {
            var t = /^\s*[-_]*[a-z0-9]+[\w-]*/i,
                n = "string" == typeof e ? e.match(t) : e.string.match(t);
            return n ? n[0].replace(/^\s*/, "") : ""
        }
        for (var I, j, B, W, H = e.indentUnit, _ = "", R = n(i), q = /^(a|b|i|s|col|em)$/i, U = n(s), $ = n(c), K = n(f), V = n(d), G = n(o), Y = t(o), X = n(l), Z = n(a), Q = n(u), J = /^\s*([.]{2,3}|&&|\|\||\*\*|[?!=:]?=|[-+*\/%<>]=?|\?:|\~)/, ee = t(h), te = n(p), ne = new RegExp(/^\-(moz|ms|o|webkit)-/i), re = n(m), ie = "", oe = {}; _.length < H;) _ += " ";
        return oe.block = function(e, t, n) {
            if ("comment" == e && N(t) || "," == e && D(t) || "mixin" == e) return x(n, t, "block", 0);
            if (F(e, t)) return x(n, t, "interpolation");
            if (D(t) && "]" == e && !/^\s*(\.|#|:|\[|\*|&)/.test(t.string) && !L(P(t))) return x(n, t, "block", 0);
            if (O(e, t)) return x(n, t, "block");
            if ("}" == e && D(t)) return x(n, t, "block", 0);
            if ("variable-name" == e) return t.string.match(/^\s?\$[\w-\.\[\]\'\"]+$/) || M(P(t)) ? x(n, t, "variableName") : x(n, t, "variableName", 0);
            if ("=" == e) return D(t) || M(P(t)) ? x(n, t, "block") : x(n, t, "block", 0);
            if ("*" == e && (D(t) || t.match(/\s*(,|\.|#|\[|:|{)/, !1))) return W = "tag", x(n, t, "block");
            if (E(e, t)) return x(n, t, "pseudo");
            if (/@(font-face|media|supports|(-moz-)?document)/.test(e)) return x(n, t, D(t) ? "block" : "atBlock");
            if (/@(-(moz|ms|o|webkit)-)?keyframes$/.test(e)) return x(n, t, "keyframes");
            if (/@extends?/.test(e)) return x(n, t, "extend", 0);
            if (e && "@" == e.charAt(0)) return t.indentation() > 0 && T(t.current().slice(1)) ? (W = "variable-2", "block") : /(@import|@require|@charset)/.test(e) ? x(n, t, "block", 0) : x(n, t, "block");
            if ("reference" == e && D(t)) return x(n, t, "block");
            if ("(" == e) return x(n, t, "parens");
            if ("vendor-prefixes" == e) return x(n, t, "vendorPrefixes");
            if ("word" == e) {
                var r = t.current();
                if ("property" == (W = z(r))) return N(t) ? x(n, t, "block", 0) : (W = "atom", "block");
                if ("tag" == W) {
                    if (/embed|menu|pre|progress|sub|table/.test(r) && T(P(t))) return W = "atom", "block";
                    if (t.string.match(new RegExp("\\[\\s*" + r + "|" + r + "\\s*\\]"))) return W = "atom", "block";
                    if (q.test(r) && (N(t) && t.string.match(/=/) || !N(t) && !t.string.match(/^(\s*\.|#|\&|\[|\/|>|\*)/) && !L(P(t)))) return W = "variable-2", M(P(t)) ? "block" : x(n, t, "block", 0);
                    if (D(t)) return x(n, t, "block")
                }
                if ("block-keyword" == W) return W = "keyword", t.current(/(if|unless)/) && !N(t) ? "block" : x(n, t, "block");
                if ("return" == r) return x(n, t, "block", 0);
                if ("variable-2" == W && t.string.match(/^\s?\$[\w-\.\[\]\'\"]+$/)) return x(n, t, "block")
            }
            return n.context.type
        }, oe.parens = function(e, t, n) {
            if ("(" == e) return x(n, t, "parens");
            if (")" == e) return "parens" == n.context.prev.type ? w(n) : t.string.match(/^[a-z][\w-]*\(/i) && D(t) || M(P(t)) || /(\.|#|:|\[|\*|&|>|~|\+|\/)/.test(P(t)) || !t.string.match(/^-?[a-z][\w-\.\[\]\'\"]*\s*=/) && L(P(t)) ? x(n, t, "block") : t.string.match(/^[\$-]?[a-z][\w-\.\[\]\'\"]*\s*=/) || t.string.match(/^\s*(\(|\)|[0-9])/) || t.string.match(/^\s+[a-z][\w-]*\(/i) || t.string.match(/^\s+[\$-]?[a-z]/i) ? x(n, t, "block", 0) : D(t) ? x(n, t, "block") : x(n, t, "block", 0);
            if (e && "@" == e.charAt(0) && T(t.current().slice(1)) && (W = "variable-2"), "word" == e) {
                var r = t.current();
                "tag" == (W = z(r)) && q.test(r) && (W = "variable-2"), "property" != W && "to" != r || (W = "atom")
            }
            return "variable-name" == e ? x(n, t, "variableName") : E(e, t) ? x(n, t, "pseudo") : n.context.type
        }, oe.vendorPrefixes = function(e, t, n) {
            return "word" == e ? (W = "property", x(n, t, "block", 0)) : w(n)
        }, oe.pseudo = function(e, t, n) {
            return T(P(t.string)) ? S(e, t, n) : (t.match(/^[a-z-]+/), W = "variable-3", D(t) ? x(n, t, "block") : w(n))
        }, oe.atBlock = function(e, t, n) {
            if ("(" == e) return x(n, t, "atBlock_parens");
            if (O(e, t)) return x(n, t, "block");
            if (F(e, t)) return x(n, t, "interpolation");
            if ("word" == e) {
                var r = t.current().toLowerCase();
                if ("tag" == (W = /^(only|not|and|or)$/.test(r) ? "keyword" : G.hasOwnProperty(r) ? "tag" : Z.hasOwnProperty(r) ? "attribute" : X.hasOwnProperty(r) ? "property" : $.hasOwnProperty(r) ? "string-2" : z(t.current())) && D(t)) return x(n, t, "block")
            }
            return "operator" == e && /^(not|and|or)$/.test(t.current()) && (W = "keyword"), n.context.type
        }, oe.atBlock_parens = function(e, t, n) {
            if ("{" == e || "}" == e) return n.context.type;
            if (")" == e) return D(t) ? x(n, t, "block") : x(n, t, "atBlock");
            if ("word" == e) {
                var r = t.current().toLowerCase();
                return W = z(r), /^(max|min)/.test(r) && (W = "property"), "tag" == W && (W = q.test(r) ? "variable-2" : "atom"), n.context.type
            }
            return oe.atBlock(e, t, n)
        }, oe.keyframes = function(e, t, n) {
            return "0" == t.indentation() && ("}" == e && N(t) || "]" == e || "hash" == e || "qualifier" == e || L(t.current())) ? S(e, t, n) : "{" == e ? x(n, t, "keyframes") : "}" == e ? N(t) ? w(n, !0) : x(n, t, "keyframes") : "unit" == e && /^[0-9]+\%$/.test(t.current()) ? x(n, t, "keyframes") : "word" == e && "block-keyword" == (W = z(t.current())) ? (W = "keyword", x(n, t, "keyframes")) : /@(font-face|media|supports|(-moz-)?document)/.test(e) ? x(n, t, D(t) ? "block" : "atBlock") : "mixin" == e ? x(n, t, "block", 0) : n.context.type
        }, oe.interpolation = function(e, t, n) {
            return "{" == e && w(n) && x(n, t, "block"), "}" == e ? t.string.match(/^\s*(\.|#|:|\[|\*|&|>|~|\+|\/)/i) || t.string.match(/^\s*[a-z]/i) && L(P(t)) ? x(n, t, "block") : !t.string.match(/^(\{|\s*\&)/) || t.match(/\s*[\w-]/, !1) ? x(n, t, "block", 0) : x(n, t, "block") : "variable-name" == e ? x(n, t, "variableName", 0) : ("word" == e && "tag" == (W = z(t.current())) && (W = "atom"), n.context.type)
        }, oe.extend = function(e, t, n) {
            return "[" == e || "=" == e ? "extend" : "]" == e ? w(n) : "word" == e ? (W = z(t.current()), "extend") : w(n)
        }, oe.variableName = function(e, t, n) {
            return "string" == e || "[" == e || "]" == e || t.current().match(/^(\.|\$)/) ? (t.current().match(/^\.[\w-]+/i) && (W = "variable-2"), "variableName") : S(e, t, n)
        }, {
            startState: function(e) {
                return {
                    tokenize: null,
                    state: "block",
                    context: new k("block", e || 0, null)
                }
            },
            token: function(e, t) {
                return !t.tokenize && e.eatSpace() ? null : ((j = (t.tokenize || g)(e, t)) && "object" == typeof j && (B = j[1], j = j[0]), W = j, t.state = oe[t.state](B, e, t), W)
            },
            indent: function(e, t, n) {
                var r = e.context,
                    i = t && t.charAt(0),
                    o = r.indent,
                    a = P(t),
                    l = n.match(/^\s*/)[0].replace(/\t/g, _).length,
                    s = e.context.prev ? e.context.prev.line.firstWord : "",
                    c = e.context.prev ? e.context.prev.line.indent : l;
                return r.prev && ("}" == i && ("block" == r.type || "atBlock" == r.type || "keyframes" == r.type) || ")" == i && ("parens" == r.type || "atBlock_parens" == r.type) || "{" == i && "at" == r.type) ? o = r.indent - H : /(\})/.test(i) || (/@|\$|\d/.test(i) || /^\{/.test(t) || /^\s*\/(\/|\*)/.test(t) || /^\s*\/\*/.test(s) || /^\s*[\w-\.\[\]\'\"]+\s*(\?|:|\+)?=/i.test(t) || /^(\+|-)?[a-z][\w-]*\(/i.test(t) || /^return/.test(t) || M(a) ? o = l : /(\.|#|:|\[|\*|&|>|~|\+|\/)/.test(i) || L(a) ? o = /\,\s*$/.test(s) ? c : /^\s+/.test(n) && (/(\.|#|:|\[|\*|&|>|~|\+|\/)/.test(s) || L(s)) ? l <= c ? c : c + H : l : /,\s*$/.test(n) || !A(a) && !T(a) || (o = M(s) ? l <= c ? c : c + H : /^\{/.test(s) ? l <= c ? l : c + H : A(s) || T(s) ? l >= c ? c : l : /^(\.|#|:|\[|\*|&|@|\+|\-|>|~|\/)/.test(s) || /=\s*$/.test(s) || L(s) || /^\$[\w-\.\[\]\'\"]/.test(s) ? c + H : l)), o
            },
            electricChars: "}",
            blockCommentStart: "/*",
            blockCommentEnd: "*/",
            blockCommentContinue: " * ",
            lineComment: "//",
            fold: "indent"
        }
    }));
    var i = ["a", "abbr", "address", "area", "article", "aside", "audio", "b", "base", "bdi", "bdo", "bgsound", "blockquote", "body", "br", "button", "canvas", "caption", "cite", "code", "col", "colgroup", "data", "datalist", "dd", "del", "details", "dfn", "div", "dl", "dt", "em", "embed", "fieldset", "figcaption", "figure", "footer", "form", "h1", "h2", "h3", "h4", "h5", "h6", "head", "header", "hgroup", "hr", "html", "i", "iframe", "img", "input", "ins", "kbd", "keygen", "label", "legend", "li", "link", "main", "map", "mark", "marquee", "menu", "menuitem", "meta", "meter", "nav", "nobr", "noframes", "noscript", "object", "ol", "optgroup", "option", "output", "p", "param", "pre", "progress", "q", "rp", "rt", "ruby", "s", "samp", "script", "section", "select", "small", "source", "span", "strong", "style", "sub", "summary", "sup", "table", "tbody", "td", "textarea", "tfoot", "th", "thead", "time", "tr", "track", "u", "ul", "var", "video"],
        o = ["domain", "regexp", "url-prefix", "url"],
        a = ["all", "aural", "braille", "handheld", "print", "projection", "screen", "tty", "tv", "embossed"],
        l = ["width", "min-width", "max-width", "height", "min-height", "max-height", "device-width", "min-device-width", "max-device-width", "device-height", "min-device-height", "max-device-height", "aspect-ratio", "min-aspect-ratio", "max-aspect-ratio", "device-aspect-ratio", "min-device-aspect-ratio", "max-device-aspect-ratio", "color", "min-color", "max-color", "color-index", "min-color-index", "max-color-index", "monochrome", "min-monochrome", "max-monochrome", "resolution", "min-resolution", "max-resolution", "scan", "grid", "dynamic-range", "video-dynamic-range"],
        s = ["align-content", "align-items", "align-self", "alignment-adjust", "alignment-baseline", "anchor-point", "animation", "animation-delay", "animation-direction", "animation-duration", "animation-fill-mode", "animation-iteration-count", "animation-name", "animation-play-state", "animation-timing-function", "appearance", "azimuth", "backface-visibility", "background", "background-attachment", "background-clip", "background-color", "background-image", "background-origin", "background-position", "background-repeat", "background-size", "baseline-shift", "binding", "bleed", "bookmark-label", "bookmark-level", "bookmark-state", "bookmark-target", "border", "border-bottom", "border-bottom-color", "border-bottom-left-radius", "border-bottom-right-radius", "border-bottom-style", "border-bottom-width", "border-collapse", "border-color", "border-image", "border-image-outset", "border-image-repeat", "border-image-slice", "border-image-source", "border-image-width", "border-left", "border-left-color", "border-left-style", "border-left-width", "border-radius", "border-right", "border-right-color", "border-right-style", "border-right-width", "border-spacing", "border-style", "border-top", "border-top-color", "border-top-left-radius", "border-top-right-radius", "border-top-style", "border-top-width", "border-width", "bottom", "box-decoration-break", "box-shadow", "box-sizing", "break-after", "break-before", "break-inside", "caption-side", "clear", "clip", "color", "color-profile", "column-count", "column-fill", "column-gap", "column-rule", "column-rule-color", "column-rule-style", "column-rule-width", "column-span", "column-width", "columns", "content", "counter-increment", "counter-reset", "crop", "cue", "cue-after", "cue-before", "cursor", "direction", "display", "dominant-baseline", "drop-initial-after-adjust", "drop-initial-after-align", "drop-initial-before-adjust", "drop-initial-before-align", "drop-initial-size", "drop-initial-value", "elevation", "empty-cells", "fit", "fit-position", "flex", "flex-basis", "flex-direction", "flex-flow", "flex-grow", "flex-shrink", "flex-wrap", "float", "float-offset", "flow-from", "flow-into", "font", "font-feature-settings", "font-family", "font-kerning", "font-language-override", "font-size", "font-size-adjust", "font-stretch", "font-style", "font-synthesis", "font-variant", "font-variant-alternates", "font-variant-caps", "font-variant-east-asian", "font-variant-ligatures", "font-variant-numeric", "font-variant-position", "font-weight", "grid", "grid-area", "grid-auto-columns", "grid-auto-flow", "grid-auto-position", "grid-auto-rows", "grid-column", "grid-column-end", "grid-column-start", "grid-row", "grid-row-end", "grid-row-start", "grid-template", "grid-template-areas", "grid-template-columns", "grid-template-rows", "hanging-punctuation", "height", "hyphens", "icon", "image-orientation", "image-rendering", "image-resolution", "inline-box-align", "justify-content", "left", "letter-spacing", "line-break", "line-height", "line-stacking", "line-stacking-ruby", "line-stacking-shift", "line-stacking-strategy", "list-style", "list-style-image", "list-style-position", "list-style-type", "margin", "margin-bottom", "margin-left", "margin-right", "margin-top", "marker-offset", "marks", "marquee-direction", "marquee-loop", "marquee-play-count", "marquee-speed", "marquee-style", "max-height", "max-width", "min-height", "min-width", "move-to", "nav-down", "nav-index", "nav-left", "nav-right", "nav-up", "object-fit", "object-position", "opacity", "order", "orphans", "outline", "outline-color", "outline-offset", "outline-style", "outline-width", "overflow", "overflow-style", "overflow-wrap", "overflow-x", "overflow-y", "padding", "padding-bottom", "padding-left", "padding-right", "padding-top", "page", "page-break-after", "page-break-before", "page-break-inside", "page-policy", "pause", "pause-after", "pause-before", "perspective", "perspective-origin", "pitch", "pitch-range", "play-during", "position", "presentation-level", "punctuation-trim", "quotes", "region-break-after", "region-break-before", "region-break-inside", "region-fragment", "rendering-intent", "resize", "rest", "rest-after", "rest-before", "richness", "right", "rotation", "rotation-point", "ruby-align", "ruby-overhang", "ruby-position", "ruby-span", "shape-image-threshold", "shape-inside", "shape-margin", "shape-outside", "size", "speak", "speak-as", "speak-header", "speak-numeral", "speak-punctuation", "speech-rate", "stress", "string-set", "tab-size", "table-layout", "target", "target-name", "target-new", "target-position", "text-align", "text-align-last", "text-decoration", "text-decoration-color", "text-decoration-line", "text-decoration-skip", "text-decoration-style", "text-emphasis", "text-emphasis-color", "text-emphasis-position", "text-emphasis-style", "text-height", "text-indent", "text-justify", "text-outline", "text-overflow", "text-shadow", "text-size-adjust", "text-space-collapse", "text-transform", "text-underline-position", "text-wrap", "top", "transform", "transform-origin", "transform-style", "transition", "transition-delay", "transition-duration", "transition-property", "transition-timing-function", "unicode-bidi", "vertical-align", "visibility", "voice-balance", "voice-duration", "voice-family", "voice-pitch", "voice-range", "voice-rate", "voice-stress", "voice-volume", "volume", "white-space", "widows", "width", "will-change", "word-break", "word-spacing", "word-wrap", "z-index", "clip-path", "clip-rule", "mask", "enable-background", "filter", "flood-color", "flood-opacity", "lighting-color", "stop-color", "stop-opacity", "pointer-events", "color-interpolation", "color-interpolation-filters", "color-rendering", "fill", "fill-opacity", "fill-rule", "image-rendering", "marker", "marker-end", "marker-mid", "marker-start", "shape-rendering", "stroke", "stroke-dasharray", "stroke-dashoffset", "stroke-linecap", "stroke-linejoin", "stroke-miterlimit", "stroke-opacity", "stroke-width", "text-rendering", "baseline-shift", "dominant-baseline", "glyph-orientation-horizontal", "glyph-orientation-vertical", "text-anchor", "writing-mode", "font-smoothing", "osx-font-smoothing"],
        c = ["scrollbar-arrow-color", "scrollbar-base-color", "scrollbar-dark-shadow-color", "scrollbar-face-color", "scrollbar-highlight-color", "scrollbar-shadow-color", "scrollbar-3d-light-color", "scrollbar-track-color", "shape-inside", "searchfield-cancel-button", "searchfield-decoration", "searchfield-results-button", "searchfield-results-decoration", "zoom"],
        u = ["font-family", "src", "unicode-range", "font-variant", "font-feature-settings", "font-stretch", "font-weight", "font-style"],
        d = ["aliceblue", "antiquewhite", "aqua", "aquamarine", "azure", "beige", "bisque", "black", "blanchedalmond", "blue", "blueviolet", "brown", "burlywood", "cadetblue", "chartreuse", "chocolate", "coral", "cornflowerblue", "cornsilk", "crimson", "cyan", "darkblue", "darkcyan", "darkgoldenrod", "darkgray", "darkgreen", "darkkhaki", "darkmagenta", "darkolivegreen", "darkorange", "darkorchid", "darkred", "darksalmon", "darkseagreen", "darkslateblue", "darkslategray", "darkturquoise", "darkviolet", "deeppink", "deepskyblue", "dimgray", "dodgerblue", "firebrick", "floralwhite", "forestgreen", "fuchsia", "gainsboro", "ghostwhite", "gold", "goldenrod", "gray", "grey", "green", "greenyellow", "honeydew", "hotpink", "indianred", "indigo", "ivory", "khaki", "lavender", "lavenderblush", "lawngreen", "lemonchiffon", "lightblue", "lightcoral", "lightcyan", "lightgoldenrodyellow", "lightgray", "lightgreen", "lightpink", "lightsalmon", "lightseagreen", "lightskyblue", "lightslategray", "lightsteelblue", "lightyellow", "lime", "limegreen", "linen", "magenta", "maroon", "mediumaquamarine", "mediumblue", "mediumorchid", "mediumpurple", "mediumseagreen", "mediumslateblue", "mediumspringgreen", "mediumturquoise", "mediumvioletred", "midnightblue", "mintcream", "mistyrose", "moccasin", "navajowhite", "navy", "oldlace", "olive", "olivedrab", "orange", "orangered", "orchid", "palegoldenrod", "palegreen", "paleturquoise", "palevioletred", "papayawhip", "peachpuff", "peru", "pink", "plum", "powderblue", "purple", "rebeccapurple", "red", "rosybrown", "royalblue", "saddlebrown", "salmon", "sandybrown", "seagreen", "seashell", "sienna", "silver", "skyblue", "slateblue", "slategray", "snow", "springgreen", "steelblue", "tan", "teal", "thistle", "tomato", "turquoise", "violet", "wheat", "white", "whitesmoke", "yellow", "yellowgreen"],
        f = ["above", "absolute", "activeborder", "additive", "activecaption", "afar", "after-white-space", "ahead", "alias", "all", "all-scroll", "alphabetic", "alternate", "always", "amharic", "amharic-abegede", "antialiased", "appworkspace", "arabic-indic", "armenian", "asterisks", "attr", "auto", "avoid", "avoid-column", "avoid-page", "avoid-region", "background", "backwards", "baseline", "below", "bidi-override", "binary", "bengali", "blink", "block", "block-axis", "bold", "bolder", "border", "border-box", "both", "bottom", "break", "break-all", "break-word", "bullets", "button", "button-bevel", "buttonface", "buttonhighlight", "buttonshadow", "buttontext", "calc", "cambodian", "capitalize", "caps-lock-indicator", "caption", "captiontext", "caret", "cell", "center", "checkbox", "circle", "cjk-decimal", "cjk-earthly-branch", "cjk-heavenly-stem", "cjk-ideographic", "clear", "clip", "close-quote", "col-resize", "collapse", "column", "compact", "condensed", "conic-gradient", "contain", "content", "contents", "content-box", "context-menu", "continuous", "copy", "counter", "counters", "cover", "crop", "cross", "crosshair", "currentcolor", "cursive", "cyclic", "dashed", "decimal", "decimal-leading-zero", "default", "default-button", "destination-atop", "destination-in", "destination-out", "destination-over", "devanagari", "disc", "discard", "disclosure-closed", "disclosure-open", "document", "dot-dash", "dot-dot-dash", "dotted", "double", "down", "e-resize", "ease", "ease-in", "ease-in-out", "ease-out", "element", "ellipse", "ellipsis", "embed", "end", "ethiopic", "ethiopic-abegede", "ethiopic-abegede-am-et", "ethiopic-abegede-gez", "ethiopic-abegede-ti-er", "ethiopic-abegede-ti-et", "ethiopic-halehame-aa-er", "ethiopic-halehame-aa-et", "ethiopic-halehame-am-et", "ethiopic-halehame-gez", "ethiopic-halehame-om-et", "ethiopic-halehame-sid-et", "ethiopic-halehame-so-et", "ethiopic-halehame-ti-er", "ethiopic-halehame-ti-et", "ethiopic-halehame-tig", "ethiopic-numeric", "ew-resize", "expanded", "extends", "extra-condensed", "extra-expanded", "fantasy", "fast", "fill", "fixed", "flat", "flex", "footnotes", "forwards", "from", "geometricPrecision", "georgian", "graytext", "groove", "gujarati", "gurmukhi", "hand", "hangul", "hangul-consonant", "hebrew", "help", "hidden", "hide", "high", "higher", "highlight", "highlighttext", "hiragana", "hiragana-iroha", "horizontal", "hsl", "hsla", "icon", "ignore", "inactiveborder", "inactivecaption", "inactivecaptiontext", "infinite", "infobackground", "infotext", "inherit", "initial", "inline", "inline-axis", "inline-block", "inline-flex", "inline-table", "inset", "inside", "intrinsic", "invert", "italic", "japanese-formal", "japanese-informal", "justify", "kannada", "katakana", "katakana-iroha", "keep-all", "khmer", "korean-hangul-formal", "korean-hanja-formal", "korean-hanja-informal", "landscape", "lao", "large", "larger", "left", "level", "lighter", "line-through", "linear", "linear-gradient", "lines", "list-item", "listbox", "listitem", "local", "logical", "loud", "lower", "lower-alpha", "lower-armenian", "lower-greek", "lower-hexadecimal", "lower-latin", "lower-norwegian", "lower-roman", "lowercase", "ltr", "malayalam", "match", "matrix", "matrix3d", "media-controls-background", "media-current-time-display", "media-fullscreen-button", "media-mute-button", "media-play-button", "media-return-to-realtime-button", "media-rewind-button", "media-seek-back-button", "media-seek-forward-button", "media-slider", "media-sliderthumb", "media-time-remaining-display", "media-volume-slider", "media-volume-slider-container", "media-volume-sliderthumb", "medium", "menu", "menulist", "menulist-button", "menulist-text", "menulist-textfield", "menutext", "message-box", "middle", "min-intrinsic", "mix", "mongolian", "monospace", "move", "multiple", "myanmar", "n-resize", "narrower", "ne-resize", "nesw-resize", "no-close-quote", "no-drop", "no-open-quote", "no-repeat", "none", "normal", "not-allowed", "nowrap", "ns-resize", "numbers", "numeric", "nw-resize", "nwse-resize", "oblique", "octal", "open-quote", "optimizeLegibility", "optimizeSpeed", "oriya", "oromo", "outset", "outside", "outside-shape", "overlay", "overline", "padding", "padding-box", "painted", "page", "paused", "persian", "perspective", "plus-darker", "plus-lighter", "pointer", "polygon", "portrait", "pre", "pre-line", "pre-wrap", "preserve-3d", "progress", "push-button", "radial-gradient", "radio", "read-only", "read-write", "read-write-plaintext-only", "rectangle", "region", "relative", "repeat", "repeating-linear-gradient", "repeating-radial-gradient", "repeating-conic-gradient", "repeat-x", "repeat-y", "reset", "reverse", "rgb", "rgba", "ridge", "right", "rotate", "rotate3d", "rotateX", "rotateY", "rotateZ", "round", "row-resize", "rtl", "run-in", "running", "s-resize", "sans-serif", "scale", "scale3d", "scaleX", "scaleY", "scaleZ", "scroll", "scrollbar", "scroll-position", "se-resize", "searchfield", "searchfield-cancel-button", "searchfield-decoration", "searchfield-results-button", "searchfield-results-decoration", "semi-condensed", "semi-expanded", "separate", "serif", "show", "sidama", "simp-chinese-formal", "simp-chinese-informal", "single", "skew", "skewX", "skewY", "skip-white-space", "slide", "slider-horizontal", "slider-vertical", "sliderthumb-horizontal", "sliderthumb-vertical", "slow", "small", "small-caps", "small-caption", "smaller", "solid", "somali", "source-atop", "source-in", "source-out", "source-over", "space", "spell-out", "square", "square-button", "standard", "start", "static", "status-bar", "stretch", "stroke", "sub", "subpixel-antialiased", "super", "sw-resize", "symbolic", "symbols", "table", "table-caption", "table-cell", "table-column", "table-column-group", "table-footer-group", "table-header-group", "table-row", "table-row-group", "tamil", "telugu", "text", "text-bottom", "text-top", "textarea", "textfield", "thai", "thick", "thin", "threeddarkshadow", "threedface", "threedhighlight", "threedlightshadow", "threedshadow", "tibetan", "tigre", "tigrinya-er", "tigrinya-er-abegede", "tigrinya-et", "tigrinya-et-abegede", "to", "top", "trad-chinese-formal", "trad-chinese-informal", "translate", "translate3d", "translateX", "translateY", "translateZ", "transparent", "ultra-condensed", "ultra-expanded", "underline", "up", "upper-alpha", "upper-armenian", "upper-greek", "upper-hexadecimal", "upper-latin", "upper-norwegian", "upper-roman", "uppercase", "urdu", "url", "var", "vertical", "vertical-text", "visible", "visibleFill", "visiblePainted", "visibleStroke", "visual", "w-resize", "wait", "wave", "wider", "window", "windowframe", "windowtext", "words", "x-large", "x-small", "xor", "xx-large", "xx-small", "bicubic", "optimizespeed", "grayscale", "row", "row-reverse", "wrap", "wrap-reverse", "column-reverse", "flex-start", "flex-end", "space-between", "space-around", "unset"],
        h = ["in", "and", "or", "not", "is not", "is a", "is", "isnt", "defined", "if unless"],
        p = ["for", "if", "else", "unless", "from", "to"],
        m = ["null", "true", "false", "href", "title", "type", "not-allowed", "readonly", "disabled"],
        g = ["@font-face", "@keyframes", "@media", "@viewport", "@page", "@host", "@supports", "@block", "@css"],
        v = i.concat(o, a, l, s, c, d, f, u, h, p, m, g);
    e.registerHelper("hintWords", "stylus", v), e.defineMIME("text/x-styl", "stylus")
})),
function(e) {
    "use strict";
    "object" == typeof exports && "object" == typeof module ? e(require("../../lib/codemirror"), require("../../addon/mode/overlay"), require("../xml/xml"), require("../javascript/javascript"), require("../coffeescript/coffeescript"), require("../css/css"), require("../sass/sass"), require("../stylus/stylus"), require("../pug/pug"), require("../handlebars/handlebars")) : "function" == typeof define && define.amd ? define(["../../lib/codemirror", "../../addon/mode/overlay", "../xml/xml", "../javascript/javascript", "../coffeescript/coffeescript", "../css/css", "../sass/sass", "../stylus/stylus", "../pug/pug", "../handlebars/handlebars"], e) : e(CodeMirror)
}((function(e) {
    var t = {
        script: [
            ["lang", /coffee(script)?/, "coffeescript"],
            ["type", /^(?:text|application)\/(?:x-)?coffee(?:script)?$/, "coffeescript"],
            ["lang", /^babel$/, "javascript"],
            ["type", /^text\/babel$/, "javascript"],
            ["type", /^text\/ecmascript-\d+$/, "javascript"]
        ],
        style: [
            ["lang", /^stylus$/i, "stylus"],
            ["lang", /^sass$/i, "sass"],
            ["lang", /^less$/i, "text/x-less"],
            ["lang", /^scss$/i, "text/x-scss"],
            ["type", /^(text\/)?(x-)?styl(us)?$/i, "stylus"],
            ["type", /^text\/sass/i, "sass"],
            ["type", /^(text\/)?(x-)?scss$/i, "text/x-scss"],
            ["type", /^(text\/)?(x-)?less$/i, "text/x-less"]
        ],
        template: [
            ["lang", /^vue-template$/i, "vue"],
            ["lang", /^pug$/i, "pug"],
            ["lang", /^handlebars$/i, "handlebars"],
            ["type", /^(text\/)?(x-)?pug$/i, "pug"],
            ["type", /^text\/x-handlebars-template$/i, "handlebars"],
            [null, null, "vue-template"]
        ]
    };
    e.defineMode("vue-template", (function(t, n) {
        var r = {
            token: function(e) {
                if (e.match(/^\{\{.*?\}\}/)) return "meta mustache";
                for (; e.next() && !e.match("{{", !1););
                return null
            }
        };
        return e.overlayMode(e.getMode(t, n.backdrop || "text/html"), r)
    })), e.defineMode("vue", (function(n) {
        return e.getMode(n, {
            name: "htmlmixed",
            tags: t
        })
    }), "htmlmixed", "xml", "javascript", "coffeescript", "css", "sass", "stylus", "pug", "handlebars"), e.defineMIME("script/x-vue", "vue"), e.defineMIME("text/x-vue", "vue")
})),
function(e) {
    "object" == typeof exports && "object" == typeof module ? e(require("../../lib/codemirror")) : "function" == typeof define && define.amd ? define(["../../lib/codemirror"], e) : e(CodeMirror)
}((function(e) {
    "use strict";
    var t = {
            autoSelfClosers: {
                area: !0,
                base: !0,
                br: !0,
                col: !0,
                command: !0,
                embed: !0,
                frame: !0,
                hr: !0,
                img: !0,
                input: !0,
                keygen: !0,
                link: !0,
                meta: !0,
                param: !0,
                source: !0,
                track: !0,
                wbr: !0,
                menuitem: !0
            },
            implicitlyClosed: {
                dd: !0,
                li: !0,
                optgroup: !0,
                option: !0,
                p: !0,
                rp: !0,
                rt: !0,
                tbody: !0,
                td: !0,
                tfoot: !0,
                th: !0,
                tr: !0
            },
            contextGrabbers: {
                dd: {
                    dd: !0,
                    dt: !0
                },
                dt: {
                    dd: !0,
                    dt: !0
                },
                li: {
                    li: !0
                },
                option: {
                    option: !0,
                    optgroup: !0
                },
                optgroup: {
                    optgroup: !0
                },
                p: {
                    address: !0,
                    article: !0,
                    aside: !0,
                    blockquote: !0,
                    dir: !0,
                    div: !0,
                    dl: !0,
                    fieldset: !0,
                    footer: !0,
                    form: !0,
                    h1: !0,
                    h2: !0,
                    h3: !0,
                    h4: !0,
                    h5: !0,
                    h6: !0,
                    header: !0,
                    hgroup: !0,
                    hr: !0,
                    menu: !0,
                    nav: !0,
                    ol: !0,
                    p: !0,
                    pre: !0,
                    section: !0,
                    table: !0,
                    ul: !0
                },
                rp: {
                    rp: !0,
                    rt: !0
                },
                rt: {
                    rp: !0,
                    rt: !0
                },
                tbody: {
                    tbody: !0,
                    tfoot: !0
                },
                td: {
                    td: !0,
                    th: !0
                },
                tfoot: {
                    tbody: !0
                },
                th: {
                    td: !0,
                    th: !0
                },
                thead: {
                    tbody: !0,
                    tfoot: !0
                },
                tr: {
                    tr: !0
                }
            },
            doNotIndent: {
                pre: !0
            },
            allowUnquoted: !0,
            allowMissing: !0,
            caseFold: !0
        },
        n = {
            autoSelfClosers: {},
            implicitlyClosed: {},
            contextGrabbers: {},
            doNotIndent: {},
            allowUnquoted: !1,
            allowMissing: !1,
            allowMissingTagName: !1,
            caseFold: !1
        };
    e.defineMode("xml", (function(r, i) {
        function o(e, t) {
            function n(n) {
                return t.tokenize = n, n(e, t)
            }
            var r = e.next();
            return "<" == r ? e.eat("!") ? e.eat("[") ? e.match("CDATA[") ? n(s("atom", "]]>")) : null : e.match("--") ? n(s("comment", "-->")) : e.match("DOCTYPE", !0, !0) ? (e.eatWhile(/[\w\._\-]/), n(c(1))) : null : e.eat("?") ? (e.eatWhile(/[\w\._\-]/), t.tokenize = s("meta", "?>"), "meta") : (C = e.eat("/") ? "closeTag" : "openTag", t.tokenize = a, "tag bracket") : "&" == r ? (e.eat("#") ? e.eat("x") ? e.eatWhile(/[a-fA-F\d]/) && e.eat(";") : e.eatWhile(/[\d]/) && e.eat(";") : e.eatWhile(/[\w\.\-:]/) && e.eat(";")) ? "atom" : "error" : (e.eatWhile(/[^&<]/), null)
        }

        function a(e, t) {
            var n = e.next();
            if (">" == n || "/" == n && e.eat(">")) return t.tokenize = o, C = ">" == n ? "endTag" : "selfcloseTag", "tag bracket";
            if ("=" == n) return C = "equals", null;
            if ("<" == n) {
                t.tokenize = o, t.state = p, t.tagName = t.tagStart = null;
                var r = t.tokenize(e, t);
                return r ? r + " tag error" : "tag error"
            }
            return /[\'\"]/.test(n) ? (t.tokenize = l(n), t.stringStartCol = e.column(), t.tokenize(e, t)) : (e.match(/^[^\s\u00a0=<>\"\']*[^\s\u00a0=<>\"\'\/]/), "word")
        }

        function l(e) {
            var t = function(t, n) {
                for (; !t.eol();)
                    if (t.next() == e) {
                        n.tokenize = a;
                        break
                    }
                return "string"
            };
            return t.isInAttribute = !0, t
        }

        function s(e, t) {
            return function(n, r) {
                for (; !n.eol();) {
                    if (n.match(t)) {
                        r.tokenize = o;
                        break
                    }
                    n.next()
                }
                return e
            }
        }

        function c(e) {
            return function(t, n) {
                for (var r; null != (r = t.next());) {
                    if ("<" == r) return n.tokenize = c(e + 1), n.tokenize(t, n);
                    if (">" == r) {
                        if (1 == e) {
                            n.tokenize = o;
                            break
                        }
                        return n.tokenize = c(e - 1), n.tokenize(t, n)
                    }
                }
                return "meta"
            }
        }

        function u(e) {
            return e && e.toLowerCase()
        }

        function d(e, t, n) {
            this.prev = e.context, this.tagName = t || "", this.indent = e.indented, this.startOfLine = n, (T.doNotIndent.hasOwnProperty(t) || e.context && e.context.noIndent) && (this.noIndent = !0)
        }

        function f(e) {
            e.context && (e.context = e.context.prev)
        }

        function h(e, t) {
            for (var n;;) {
                if (!e.context) return;
                if (n = e.context.tagName, !T.contextGrabbers.hasOwnProperty(u(n)) || !T.contextGrabbers[u(n)].hasOwnProperty(u(t))) return;
                f(e)
            }
        }

        function p(e, t, n) {
            return "openTag" == e ? (n.tagStart = t.column(), m) : "closeTag" == e ? g : p
        }

        function m(e, t, n) {
            return "word" == e ? (n.tagName = t.current(), S = "tag", b) : T.allowMissingTagName && "endTag" == e ? (S = "tag bracket", b(e, t, n)) : (S = "error", m)
        }

        function g(e, t, n) {
            if ("word" == e) {
                var r = t.current();
                return n.context && n.context.tagName != r && T.implicitlyClosed.hasOwnProperty(u(n.context.tagName)) && f(n), n.context && n.context.tagName == r || !1 === T.matchClosing ? (S = "tag", v) : (S = "tag error", y)
            }
            return T.allowMissingTagName && "endTag" == e ? (S = "tag bracket", v(e, t, n)) : (S = "error", y)
        }

        function v(e, t, n) {
            return "endTag" != e ? (S = "error", v) : (f(n), p)
        }

        function y(e, t, n) {
            return S = "error", v(e, t, n)
        }

        function b(e, t, n) {
            if ("word" == e) return S = "attribute", k;
            if ("endTag" == e || "selfcloseTag" == e) {
                var r = n.tagName,
                    i = n.tagStart;
                return n.tagName = n.tagStart = null, "selfcloseTag" == e || T.autoSelfClosers.hasOwnProperty(u(r)) ? h(n, r) : (h(n, r), n.context = new d(n, r, i == n.indented)), p
            }
            return S = "error", b
        }

        function k(e, t, n) {
            return "equals" == e ? x : (T.allowMissing || (S = "error"), b(e, t, n))
        }

        function x(e, t, n) {
            return "string" == e ? w : "word" == e && T.allowUnquoted ? (S = "string", b) : (S = "error", b(e, t, n))
        }

        function w(e, t, n) {
            return "string" == e ? w : b(e, t, n)
        }
        var C, S, L = r.indentUnit,
            T = {},
            M = i.htmlMode ? t : n;
        for (var A in M) T[A] = M[A];
        for (var A in i) T[A] = i[A];
        return o.isInText = !0, {
            startState: function(e) {
                var t = {
                    tokenize: o,
                    state: p,
                    indented: e || 0,
                    tagName: null,
                    tagStart: null,
                    context: null
                };
                return null != e && (t.baseIndent = e), t
            },
            token: function(e, t) {
                if (!t.tagName && e.sol() && (t.indented = e.indentation()), e.eatSpace()) return null;
                C = null;
                var n = t.tokenize(e, t);
                return (n || C) && "comment" != n && (S = null, t.state = t.state(C || n, e, t), S && (n = "error" == S ? n + " error" : S)), n
            },
            indent: function(t, n, r) {
                var i = t.context;
                if (t.tokenize.isInAttribute) return t.tagStart == t.indented ? t.stringStartCol + 1 : t.indented + L;
                if (i && i.noIndent) return e.Pass;
                if (t.tokenize != a && t.tokenize != o) return r ? r.match(/^(\s*)/)[0].length : 0;
                if (t.tagName) return !1 !== T.multilineTagIndentPastTag ? t.tagStart + t.tagName.length + 2 : t.tagStart + L * (T.multilineTagIndentFactor || 1);
                if (T.alignCDATA && /<!\[CDATA\[/.test(n)) return 0;
                var l = n && /^<(\/)?([\w_:\.-]*)/.exec(n);
                if (l && l[1])
                    for (; i;) {
                        if (i.tagName == l[2]) {
                            i = i.prev;
                            break
                        }
                        if (!T.implicitlyClosed.hasOwnProperty(u(i.tagName))) break;
                        i = i.prev
                    } else if (l)
                        for (; i;) {
                            var s = T.contextGrabbers[u(i.tagName)];
                            if (!s || !s.hasOwnProperty(u(l[2]))) break;
                            i = i.prev
                        }
                for (; i && i.prev && !i.startOfLine;) i = i.prev;
                return i ? i.indent + L : t.baseIndent || 0
            },
            electricInput: /<\/[\s\w:]+>$/,
            blockCommentStart: "<!--",
            blockCommentEnd: "-->",
            configuration: T.htmlMode ? "html" : "xml",
            helperType: T.htmlMode ? "html" : "xml",
            skipAttribute: function(e) {
                e.state == x && (e.state = b)
            },
            xmlCurrentTag: function(e) {
                return e.tagName ? {
                    name: e.tagName,
                    close: "closeTag" == e.type
                } : null
            },
            xmlCurrentContext: function(e) {
                for (var t = [], n = e.context; n; n = n.prev) t.push(n.tagName);
                return t.reverse()
            }
        }
    })), e.defineMIME("text/xml", "xml"), e.defineMIME("application/xml", "xml"), e.mimeModes.hasOwnProperty("text/html") || e.defineMIME("text/html", {
        name: "xml",
        htmlMode: !0
    })
})), CodeMirror.commands.respectfulTab = function(e) {
    return e.getOption("indentWithTabs") ? e.execCommand("defaultTab") : e.somethingSelected() ? e.indentSelection("add") : e.execCommand("insertSoftTab"), !0
};