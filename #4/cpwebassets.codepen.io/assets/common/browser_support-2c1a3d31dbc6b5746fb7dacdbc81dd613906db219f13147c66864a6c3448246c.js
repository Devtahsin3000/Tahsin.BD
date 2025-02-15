! function() {
    function s(s) {
        return "string" == typeof s && /^([[{])/.test(s)
    }
    const e = document.querySelector("#init-data");
    if (e) try {
        const n = e.value;
        if (s(n)) {
            const e = JSON.parse(n);
            for (const n of Object.keys(e)) window[n] = s(e[n]) ? JSON.parse(e[n]) : e[n]
        }
    } catch (s) {
        console.error(`Error parsing 'init-data': ${s.message}`)
    }
}();
var NastyBrowserSniffing = {
    init: function() {
        NastyBrowserSniffing.isIE11OrLess() && NastyBrowserSniffing.addIEclasses(), NastyBrowserSniffing._hasClassList() && (document.documentElement.classList.add(__browser.platform), document.documentElement.classList.add(this.getBrowserClassname()))
    },
    _hasClassList: function() {
        return document.documentElement && document.documentElement.classList
    },
    isIE11OrLess: function() {
        return "ie" === __browser.name && 1 * __browser.version <= 11
    },
    getBrowserClassname: function() {
        return __browser.name + __browser.version
    },
    addIEclasses: function() {
        document.documentElement.className += " " + this.getBrowserClassname()
    }
};
try {
    NastyBrowserSniffing.init()
} catch {}