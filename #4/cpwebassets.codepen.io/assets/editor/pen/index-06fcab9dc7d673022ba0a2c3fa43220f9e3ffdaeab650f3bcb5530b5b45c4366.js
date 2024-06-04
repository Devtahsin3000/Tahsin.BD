function BarDragger(e) {
    this.handles = [e], this.bindHandles()
}
window.URLBuilder = {
        getViewURLSimple: function(e, t, n) {
            return `https://${document.location.host}${t}/${e}/${n}`
        }
    }, window.LocalDataLoader = {
        latestObject: function(e, t, n) {
            if (!n) return e;
            if ("undefined" === n) return e;
            var i = $.parseJSON(n);
            return this._localStorageObjNewer(e, t, i) ? i : e
        },
        _localStorageObjNewer: function(e, t, n) {
            return this._getComparableClientTime(n, t) > t
        },
        _getComparableClientTime: function(e, t) {
            var n = t + "";
            return +(e.last_updated + "").slice(0, n.length)
        }
    }, $.fn.serializeObject = function() {
        var e = {},
            t = this.serializeArray();
        return $.each(t, (function() {
            e[this.name] ? (e[this.name].push || (e[this.name] = [e[this.name]]), e[this.name].push(this.value || "")) : e[this.name] = this.value || ""
        })), e
    }, window.User = Class.extend({
        init: function() {
            this._extendThis(__user)
        },
        isUserLoggedIn: function() {
            return +this.id > 1
        },
        ownsItem: function(e) {
            return e.id && this.id === e.user_id && this.current_team_id === e.team_id
        },
        updateUser: function(e) {
            this._extendThis(e)
        },
        _extendThis: function(e) {
            for (const t of Object.keys(e)) this[t] = e[t]
        }
    }), window.Hub = window.Hub || {
        sub: function(e, t) {
            if ("function" != typeof t) throw "fn MUST be a function";
            const n = e => t(e, e.detail.data);
            return window.addEventListener(e, n),
                function() {
                    window.removeEventListener(e, n)
                }
        },
        pub: function(e, t) {
            var n = new CustomEvent(e, {
                detail: {
                    data: t
                }
            });
            window.dispatchEvent(n)
        },
        unsub: function(e, t) {
            window.removeEventListener(e, t)
        }
    },
    function() {
        function e() {
            a.on("click", t)
        }

        function t(e) {
            var t = $(e.target),
                i = t.closest(".is-dropdown");
            if (!(0 === t.closest(".new-pen-from-template-label").length && i.length > 0)) {
                var o = t.closest("[data-dropdown]");
                o.length > 0 ? n(e, o) : s()
            }
        }

        function n(e, t) {
            e.preventDefault();
            var n = t.data("dropdown"),
                s = $(n);
            s.hasClass("open") ? (t.attr("aria-expanded", !1), s.removeClass("open")) : (t.attr("aria-expanded", !0), i(s, t), s.addClass("open")), $(".is-dropdown").not(s[0]).removeClass("open")
        }

        function i(e, t) {
            if ("css" !== e.data("dropdown-position")) {
                var n, i = t.offset(),
                    s = "right" === e.data("dropdown-position"),
                    o = s ? "right" : "left";
                n = s ? document.body.offsetWidth - i.left - t.outerWidth() : i.left - e.outerWidth() / 2 + 25, n = Math.max(10, n);
                var r = {};
                r[o] = n, e.css(r)
            }
        }

        function s() {
            $(".is-dropdown").removeClass("open"), $("[data-dropdown][aria-expanded]").attr("aria-expanded", !1)
        }

        function o() {
            Hub.sub(HUB_EVENTS.KEY_PRESS, r), Hub.sub(HUB_EVENTS.POPUP_OPEN, s), Hub.sub(HUB_EVENTS.POPUP_CLOSE, s)
        }

        function r(e, t) {
            "esc" === t.key && s()
        }
        CP.Dropdowns = {};
        var a = $("body");
        CP.Dropdowns.init = function() {
            e(), o()
        }, CP.Dropdowns.init()
    }(), window.ERRORS = {
        PROCESSING: "PROCESSING"
    }, window.LEVELS = {
        ERROR: "ERROR",
        WARNING: "WARNING"
    }, window.WARNINGS = {},
    function() {
        const e = 30,
            t = ["css_pre_processor", "css_prefix", "css_starter", "description", "head", "html_classes", "html_pre_processor", "js_pre_processor", "js_library", "resources", "title"],
            n = {
                DEPENDENCIES: "DEPENDENCIES",
                IMPORTS: "IMPORTS"
            },
            i = ["css_pre_processor", "css_prefix", "css_starter", "css", "description", "editor_settings", "head", "html_classes", "html_pre_processor", "html", "id", "js_pre_processor", "js_library", "js", "newTags", "parent_id", "private", "resources", "slug_hash_private", "slug_hash", "tags", "team_id", "template", "title", "user_id"],
            s = ["css_pre_processor", "css_prefix", "css_starter", "css", "head", "html_classes", "html_pre_processor", "html", "js_pre_processor", "js_library", "js", "resources"],
            o = ["html", "css", "js"],
            r = "INLINE_PEN_STYLESHEET_ID",
            a = 50;
        window.PEN_CONSTANTS = {
            CANONICAL_IMPORTS: n,
            COLLAB_SYNC_ATTRIBUTES: t,
            DATA_ATTRIBUTES: i,
            INLINE_PEN_STYLESHEET_ID: r,
            MAX_DEPENDENCIES: e,
            MAX_PACKAGE_VERSIONS: a,
            PREVIEW_ATTRIBUTES: s,
            TYPES: o
        }
    }(), window.CMEditorSettings = {
        getDefaultEditorConfig: function(e, t, n) {
            return {
                value: e,
                showCursorWhenSelecting: !0,
                cursorScrollMargin: 30,
                scrollbarStyle: this._getScrollbars(n),
                tabSize: this.getTabSize(t),
                indentUnit: this.getTabSize(t),
                indentWithTabs: this.getIndentWithTabs(t),
                lineNumbers: t.line_numbers,
                matchBrackets: t.match_brackets,
                matchTags: t.match_brackets,
                autocomplete: t.autocomplete,
                autoCloseBrackets: t.match_brackets,
                lineWrapping: t.line_wrapping,
                gutters: this._getGutters(t),
                foldGutter: t.code_folding,
                scrollPastEnd: !0,
                emmet_active: t.emmet_active,
                emmet: this.getEmmetConfig(t),
                markTagPairs: !0,
                autoRenameTags: !0
            }
        },
        _getScrollbars: function(e) {
            return e ? null : "simple"
        },
        getTabSize: function(e) {
            return parseInt(e.tab_size, 10)
        },
        getIndentWithTabs: function(e) {
            return "tabs" === e.indent_with
        },
        getEmmetConfig: function(e) {
            return {
                markTagPairs: e.match_brackets,
                autoRenameTags: e.match_brackets,
                preview: ["markup"],
                config: this.getEmmetSnippets(e)
            }
        },
        getEmmetSnippets: function(e) {
            var t = e.snippets;
            return t ? (t.markupSnippets = this.unescapeSnippet(t.markupSnippets), t.stylesheetSnippets = this.unescapeSnippet(t.stylesheetSnippets), {
                markup: {
                    snippets: t.markupSnippets
                },
                stylesheet: {
                    snippets: t.stylesheetSnippets
                }
            }) : {
                markup: {},
                stylesheet: {}
            }
        },
        unescapeSnippet: function(e) {
            var t = e,
                n = Object.keys(t);
            for (const e of n) t[e] = t[e].replace(/\\n/g, "\n").replace(/\\t/g, "\t");
            return t
        },
        _getGutters: function(e) {
            return !0 === e.code_folding ? ["CodeMirror-linenumbers", "CodeMirror-foldgutter"] : [""]
        }
    }, window.BaseEditorKeyBindingsMixin = {
        _onCmUpdateKeyBindings: function(e) {
            switch (e.key_bindings) {
                case "vim":
                    window.__browser.mobile || this.editor.setOption("vimMode", !0);
                    break;
                case "subl":
                    this.editor.setOption("keyMap", "sublime");
                    break;
                default:
                    this.editor.setOption("keyMap", "extendedBase")
            }
        },
        _canAdjustRenderedLine: function(e) {
            return "html" === EditorModes.cmModeToType(e.getOption("mode")) && (void 0 !== CP.pen && "tabs" !== CP.pen.editor_settings.indent_with)
        },
        _indentWrappedLines: function() {
            var e = this.editor.defaultCharWidth(),
                t = 2;
            this.editor.on("renderLine", ((n, i, s) => {
                if (this._canAdjustRenderedLine(n)) {
                    var o = n.getOption("tabSize"),
                        r = CodeMirror.countColumn(i.text, null, o) * e;
                    s.style.textIndent = "-" + r + "px", s.style.paddingLeft = t + r + "px"
                }
            }))
        }
    };
const LINE_HIGHLIGHT_CLASS = "line-highlight";
window.BaseEditorErrorMixin = {
    errorData: {
        lines: [],
        solution: null,
        widgets: []
    },
    _storeErrorData: function(e, t) {
        this.errorData.widgets.push(t), this.errorData.lines.push(e.line)
    },
    _addInlineEditorWidget: function(e, t) {
        var n = $(this._getInlineErrorWidgetHTML(t))[0],
            i = parseInt(t.line - 1, 10);
        return e.addLineClass(i, "background", LINE_HIGHLIGHT_CLASS), e.addLineWidget(i, n, {
            coverGutter: !0,
            noHScroll: !0
        })
    },
    _getInlineErrorWidgetHTML: function(e) {
        return `\n    <div class="inline-editor-error inline-editor-${e.level.toLowerCase()} inline-error-hidden">\n      <div class="inline-error-message">${this._formatErrorMessage(e)}</div>\n    </div>\n  `
    },
    _formatErrorMessage: function(e) {
        let t = e.message;
        return e.internalAllowDangerousHTML || (t = _htmlEntities(t).replace(/\n/g, "<br />")), e.link && (t += ` <a href="${e.link.target}" target="_blank" rel="noopener noreferrer">${e.link.value}</a>`), t
    },
    showError: function(e) {
        var t = this._addInlineEditorWidget(this.editor, e);
        this._storeErrorData(e, t)
    },
    clearErrors: function() {
        this.editor.eachLine((e => {
            this.editor.removeLineClass(e, "background", LINE_HIGHLIGHT_CLASS)
        }));
        const e = this.errorData.widgets;
        for (const t of e) t.clear();
        this.editor.refresh(), this.errorData.widgets = [], this.errorData.lines = []
    },
    _getErrorLineNumberToScrollTo: e => e - 2 > 0 ? e - 2 : 0,
    jumpToFirstError: function() {
        var e = this.errorData.lines,
            t = this._getErrorLineNumberToScrollTo(e[0]);
        this.editor.scrollIntoView(t)
    }
}, window.BaseEditorFindMixin = {
    _getSearchCursor(e) {
        return this.editor.getSearchCursor(e)
    },
    _formatMatch(e) {
        if (!e) return;
        let t = e.pos.from,
            n = e.pos.to;
        return {
            value: this.editor.getRange(t, n),
            startLineNumber: t.line,
            startColumn: e.pos.from.ch,
            endLineNumber: e.pos.to.line,
            endColumn: e.pos.to.ch
        }
    },
    findMatch(e) {
        const t = this._getSearchCursor(e).findNext();
        return t ? [this._formatMatch(t)] : []
    },
    findMatches(e) {
        const t = this._getSearchCursor(e),
            n = [];
        for (; t.findNext();) n.push(this._formatMatch(t));
        return n
    }
}, window.BaseEditorFoldingMixin = {
    foldAll() {
        CodeMirror.commands.foldAll(this.editor), Hub.pub(HUB_EVENTS.PEN_EDITOR_CODE_FOLD)
    },
    unfoldAll() {
        CodeMirror.commands.unfoldAll(this.editor), Hub.pub(HUB_EVENTS.PEN_EDITOR_CODE_FOLD)
    },
    foldCode(e) {
        this.editor.foldCode(e)
    },
    getEditorCodeFoldingState() {
        const e = this.editor.getDoc(),
            t = _makeSafe(e.getAllMarks(), []),
            n = {
                marks: []
            };
        for (const e of t) e.collapsed && "range" === e.type && n.marks.push(e.find().from);
        return n
    },
    _bindToFoldingEvents() {
        Hub.sub(HUB_EVENTS.PEN_EDITOR_LOADED, this._bindFoldingToDOM.bind(this))
    },
    _bindFoldingToDOM() {
        this.editor.on("gutterClick", (() => {
            Hub.pub(HUB_EVENTS.PEN_EDITOR_CODE_FOLD)
        }))
    }
}, window.BaseEditor = Class.extend({
    editor: "",
    _viewingSource: !1,
    _canDrive: !0,
    type: "",
    value: "",
    init: function(e, t) {
        this.type = e, this.value = t, this.pageType = window.__pageType, _.extend(this, BaseEditorErrorMixin), _.extend(this, BaseEditorFindMixin), _.extend(this, BaseEditorFoldingMixin), _.extend(this, BaseEditorKeyBindingsMixin), _.extend(this, BaseEditorViewSourceMixin), this._baseBindToHub(), this._buildEditor()
    },
    _baseBindToHub: function() {
        this._bindToViewSourceEvents(), this._bindToFoldingEvents(), Hub.sub(HUB_EVENTS.PEN_EDITOR_LOADED, this._onPageLoadingDone.bind(this)), Hub.sub(HUB_EVENTS.PEN_EDITOR_REFRESH_REQUEST, this.refresh.bind(this)), Hub.sub(HUB_EVENTS.KEY_PRESS, this._onKey.bind(this)), Hub.sub(HUB_EVENTS.PEN_EDITOR_LOADED, this._onCMUpdateKeybindingsEvent.bind(this)), Hub.sub(HUB_EVENTS.PEN_CHANGE, this._onBasePenChange.bind(this)), "professor" === window.__pageType && this._baseBindToHubProfessorMode()
    },
    _baseBindToHubProfessorMode: function() {
        Hub.sub(HUB_EVENTS.PEN_EDITOR_UI_DISABLE, this._disableUserFromDriving.bind(this)), Hub.sub(HUB_EVENTS.PEN_EDITOR_UI_ENABLE, this._enableUserToDrive.bind(this))
    },
    _onCMUpdateKeybindingsEvent: function() {
        this._onCmUpdateKeyBindings(window.__item.editor_settings)
    },
    _onKey: function(e, t) {
        "esc" === t.key && (this.editor.execCommand("clearSearch"), this.runRefresh(200))
    },
    _onBasePenChange: function(e, t) {
        ObjectUtil.hasNestedValue(t, "pen.editor_settings.indent_with") && this.editor.setOption("indentWithTabs", CMEditorSettings.getIndentWithTabs(t.pen.editor_settings)), ObjectUtil.hasNestedValue(t, "pen.editor_settings.tab_size") && (this.editor.setOption("tabSize", CMEditorSettings.getTabSize(t.pen.editor_settings)), this.editor.setOption("indentUnit", CMEditorSettings.getTabSize(t.pen.editor_settings)))
    },
    _onPageLoadingDone: function() {
        this._indentWrappedLines(), this.runRefresh(200)
    },
    _buildEditor: function() {
        this.editor = this._buildCMEditor(this._getEditorConfig()), this._throttledRefresh = _.throttle((() => this.editor.refresh()), 300), this._setMode(), this._bindToHub(), this._setEditorTypeSpecificOptions(this._getEditorConfig()), this.bindToOnChange(), this._bindAutoComplete(), this._syncEditorWithFirepad(), performance.mark("editor-built")
    },
    _syncEditorWithFirepad: function() {
        "collab" === window.__pageType && this._syncWithCollab(), "professor" === window.__pageType && this._syncWithProfessor()
    },
    _syncWithCollab: function() {
        this.firepad = Firepad.fromCodeMirror(CP.collabRoom.getFirebaseEditorRef(this.type), this.editor, {
            richTextShortcuts: !1,
            richTextToolbar: !1,
            defaultText: null,
            userId: CP.collabRoom.rtData.user.id
        }), this.firepad.on("ready", (() => CP.collabRoom.onFirepadReady(this.type, this.firepad, this.value))), this.firepad.on("synced", (function(e) {
            CP.collabRoom.onFirepadSynced(e)
        }))
    },
    _syncWithProfessor: function() {
        this.firepad = Firepad.fromCodeMirror(ProfessorRoom.getFirebaseEditorRef(this.type), this.editor, {
            richTextShortcuts: !1,
            richTextToolbar: !1,
            defaultText: this.value,
            userId: CP.user.hashid,
            disablePublishEditorChanges: "professor" !== window.__rtData.user.role
        })
    },
    _getEditorConfig: function() {
        var e = _.extend(CMEditorSettings.getDefaultEditorConfig(this._getEditorConfigDefaultValue(), CP.pen.editor_settings), this._getEditorTypeSpecificConfig(CP.pen.editor_settings));
        return e.extraKeys = {
            Tab: "respectfulTab",
            Enter: "emmetInsertLineBreak",
            "Ctrl-Up": "emmetIncrementNumber1",
            "Alt-Shift-Up": "emmetIncrementNumber01",
            "Ctrl-Alt-Up": "emmetIncrementNumber10",
            "Ctrl-Down": "emmetDecrementNumber1",
            "Alt-Shift-Down": "emmetDecrementNumber01",
            "Ctrl-Alt-Down": "emmetDecrementNumber10",
            "Alt-Up": "swapLineUp",
            "Alt-Down": "swapLineDown"
        }, "mac" === __browser.platform ? e.extraKeys["Shift-Cmd-A"] = "emmetWrapWithAbbreviation" : e.extraKeys["Shift-Ctrl-A"] = "emmetWrapWithAbbreviation", !0 === e.emmet_active && (e.extraKeys.Tab = function(e) {
            var t = e.execCommand("emmetExpandAbbreviation");
            const n = e.getCursor();
            e.getLine(n.line).includes("<img") && window.CodePenTracking.trackEvent({
                eventName: "Emmet Expanded Image Tag"
            }), void 0 !== t && e.execCommand("respectfulTab")
        }), e
    },
    _getEditorConfigDefaultValue: function() {
        return "collab" === window.__pageType || "professor" === window.__pageType ? "" : this.value
    },
    _buildCMEditor: function(e) {
        var t = this._getTextAreaElementToReplaceWithCodeMirror();
        return CodeMirror((function(e) {
            t.parentNode.replaceChild(e, t)
        }), e)
    },
    _getTextAreaElementToReplaceWithCodeMirror: function() {
        return $(".code-wrap #" + this.type)[0]
    },
    _bindAutoComplete: function() {
        var e = this._getEditorConfig();
        !0 === e.autocomplete && "html" !== e.syntax && this.editor.on("inputRead", (function(e, t) {
            !e.state.completionActive && "+input" === t.origin && 1 === t.text.length && /^[A-Za-z]+$/.test(t.text[0]) && CodeMirror.commands.autocomplete(e, null, {
                completeSingle: !1
            })
        }))
    },
    _disableUserFromDriving: function() {
        this._canDrive = !1, this.editor.setOption("readOnly", !0)
    },
    _enableUserToDrive: function() {
        this._canDrive = !0, this.editor.setOption("readOnly", !1)
    },
    _preProcessorChanged: function(e) {
        this._turnOffReadOnlyView(), this._changeMode(e)
    },
    _turnOffReadOnlyView: function() {
        this._viewingSource && this.showSourceCode()
    },
    unbindOnChange: function() {
        this.editor.off("change", this._onEditorChange.bind(this))
    },
    bindToOnChange: function() {
        this.editor.on("change", this._onEditorChange.bind(this))
    },
    toggleReadOnly: function(e, t) {
        this.editor.setOption("readOnly", e), e ? $("#box-" + this.type).attr("data-read-only", t || !0) : $("#box-" + this.type).removeAttr("data-read-only")
    },
    _onEditorChange: function(e) {
        if (!this.editor.getOption("readOnly")) {
            var t = {
                origin: "client",
                pen: {}
            };
            t.pen[this.type] = e.getValue(), CP.pen.setItemValue(t)
        }
    },
    getValue: function() {
        return this.editor.getValue()
    },
    setValue: function(e) {
        this.editor.setValue(e)
    },
    setEditorValue: function(e) {
        const t = this.editor.getScrollInfo(),
            n = this.editor.getCursor();
        this.unbindOnChange(), this.editor.setValue(e), this.bindToOnChange(), this.editor.setCursor(n), this.editor.scrollTo(t.left, t.top)
    },
    getPreProcessor: function() {
        var e = this._getBasicType();
        return CP.pen[e + "_pre_processor"]
    },
    _setMode: function() {
        var e = this.getPreProcessor();
        this._changeMode(e)
    },
    getMode: function() {
        var e = this._getBasicType(),
            t = this.getPreProcessor();
        return EditorModes.getCMMode(t, e)
    },
    _changeMode: function(e) {
        this.editor.setOption("mode", EditorModes.getCMMode(e, this._getBasicType()))
    },
    _getBasicType: function() {
        throw "Implement in subclass"
    },
    hasFocus: function() {
        return this.editor.hasFocus()
    },
    getSelection: function() {
        return this.editor.getSelection()
    },
    hasSelection: function() {
        return this.editor.somethingSelected()
    },
    clearSelection: function() {
        var e = this.editor.getCursor();
        return this.editor.setCursor(e)
    },
    showCommands: function() {},
    refresh: function(e, t) {
        this.runRefresh(t.delay)
    },
    runRefresh: function(e) {
        e > 0 ? setTimeout(this.runRefresh.bind(this), e) : this._throttledRefresh()
    }
});
const BEAR_WITH_US_DELAY = 10;
window.BaseEditorViewSourceMixin = {
        _bindToViewSourceEvents: function() {
            this.showingProcessed = !1, this.showSourceSetEditorValueTimeoutId = 0, this.processedBody = null, Hub.sub(HUB_EVENTS.PROCESSING_START, this._handleProcessingStarted.bind(this)), Hub.sub(HUB_EVENTS.PROCESSING_FINISH, this._handleProcessingCompleted.bind(this))
        },
        _handleProcessingStarted: function(e, t) {
            const {
                type: n
            } = t;
            this.type === n && (this.processedBody = null)
        },
        _handleProcessingCompleted: function(e, t) {
            const {
                body: n,
                type: i
            } = t;
            this.type === i && (clearTimeout(this.showSourceSetEditorValueTimeoutId), this.processedBody = n, this.showingProcessed && this._setShowSourceEditorValue(n))
        },
        showProcessedCode: function() {
            CP.ensureProcessingRunOnce(), this.showingProcessed = !0, CP.clearEditorErrors(this.type), this.unbindOnChange(), this._makeEditorReadOnly(), this._changeModeOnShowSource(), void 0 === this.processedBody || null === this.processedBody ? this.showSourceSetEditorValueTimeoutId = setTimeout((() => {
                const e = `\ud83d\udc3b Bear with us while we compile your code to ${this.type}`;
                this._setShowSourceEditorValue(e)
            }), BEAR_WITH_US_DELAY) : this._setShowSourceEditorValue(this.processedBody)
        },
        _setShowSourceEditorValue: function(e) {
            "collab" !== window.__pageType && "professor" !== window.__pageType && (this.setEditorValue(e), this._removeEventFromEditorUndoHistory())
        },
        _changeModeOnShowSource: function() {
            this._changeMode("none")
        },
        _makeEditorReadOnly: function() {
            this.toggleReadOnly(!0, "view-compiled"), $("#viewsource-" + this.type).attr("title", Copy.returnToSource)
        },
        showSourceCode: function() {
            this.showingProcessed = !1, this._showSourceCode(), this._changeModeOnShowOriginalCode(), this._makeEditable(), this.bindToOnChange(), this._removeEventFromEditorUndoHistory()
        },
        _changeModeOnShowOriginalCode: function() {
            this._changeMode(CP.pen[this.type + "_pre_processor"])
        },
        _removeEventFromEditorUndoHistory: function() {
            var e = this.editor.getHistory();
            e.done.pop(), e.done.pop(), this.editor.setHistory(e)
        },
        _showSourceCode: function() {
            "collab" !== window.__pageType && "professor" !== window.__pageType && this.setEditorValue(CP.pen[this.type])
        },
        _makeEditable: function() {
            $("#box-" + this.type).removeClass("view-preproc-errors"), $("#viewsource-" + this.type).attr("title", Copy.viewSource), this._canDrive && this.toggleReadOnly(!1)
        }
    },
    function() {
        function e() {
            n(), i(), s()
        }

        function t(e) {
            "clear" === e.function ? m() : _(e)
        }

        function n() {
            N = $(".console-entries"), O = $(".console-command-line-input"), H = $(".console-clear-button"), x = O.get(0)
        }

        function i() {
            O.on("keydown", o), O.on("keyup propertychange input", v), H.on("click", C), O.one("focus", b)
        }

        function s() {
            Hub.sub(HUB_EVENTS.PEN_EDITOR_UI_DISABLE, T), Hub.sub(HUB_EVENTS.PEN_EDITOR_UI_ENABLE, y), Hub.sub(HUB_EVENTS.CONSOLE_OPENED, S), Hub.sub(HUB_EVENTS.CONSOLE_CLOSED, P), Hub.sub(HUB_EVENTS.CONSOLE_SERVER_CHANGE, w), Hub.sub(HUB_EVENTS.PEN_LOGS, a)
        }

        function o(e) {
            if (v(), e.keyCode && !0 !== A) {
                switch (e.keyCode) {
                    case 13:
                        if (!e.shiftKey) return e.preventDefault(), void c();
                        break;
                    case 38:
                        u(1);
                        break;
                    case 40:
                        u(-1)
                }
                "professor" === G && (clearTimeout(J), J = setTimeout((function() {
                    r()
                }), K))
            }
        }

        function r(e) {
            var t = {
                console: {
                    consoleData: O.val()
                }
            };
            e ? (t.console.command = e, Hub.pub(HUB_EVENTS.CONSOLE_CHANGE, t)) : Hub.pub(HUB_EVENTS.CONSOLE_CHANGE, t)
        }

        function a(e, t) {
            for (const e of t.logs) _({
                function: e.type,
                arguments: ["Line " + e.line + " " + e.type.toUpperCase() + ": " + e.message],
                complexity: 1
            })
        }

        function c() {
            var e = O.val();
            "" !== e && (/clear\(\)/.test(e) ? m() : (l(e), O.val(""), g(e), p(e), "professor" === G && (clearTimeout(J), r(e)), v()))
        }

        function u(e) {
            1 === e && 0 === D && (V = O.val()), (D += e) < 0 && (D = 0), D > I.length && (D = I.length), 0 === D ? O.val(V) : O.val(I[D - 1]), setTimeout(d, 0)
        }

        function d() {
            if (x.setSelectionRange) {
                var e = 2 * O.val().length;
                x.setSelectionRange(e, e)
            }
        }

        function l(e) {
            D = 0, I.unshift(e), I.length > U && I.pop()
        }

        function h() {
            var e = $(".console-message");
            e.length > U && e.slice(0, e.length - U).remove(), N.scrollTop(N.get(0).scrollHeight)
        }

        function p(e) {
            const t = {
                topic: HUB_EVENTS.CONSOLE_RUN_COMMAND,
                data: {
                    command: e
                }
            };
            $(".result-iframe").get(0).contentWindow.postMessage(t, "*")
        }

        function _(e) {
            e.arguments && (e.arguments.join(" ").length > F && (e = z), !1 === M ? (L.push(e), L.length > B && (L.shift(), j = !0)) : f(e))
        }

        function f(e) {
            var t = $(R);
            e.function && t.addClass(e.function);
            var n = e.arguments,
                i = e.complexity,
                s = n.join(" ");
            if (i > 1) {
                N.append(t);
                var o = CodeMirror(t.get(0), {
                    value: s,
                    foldGutter: !0,
                    readOnly: !0,
                    cursorBlinkRate: -1,
                    gutters: ["CodeMirror-foldgutter"],
                    mode: 3 === i ? "htmlmixed" : "javascript",
                    lineWrapping: !0,
                    scrollbarStyle: null,
                    scrollPastEnd: !1
                });
                if (s.includes(": function"))
                    for (var r = o.firstLine(), a = o.lastLine(); r <= a; r++) o.foldCode(CodeMirror.Pos(r, 0), null, "fold")
            } else t.hasClass("error") ? t.text(s) : CodeMirror.runMode(s, {
                name: "javascript",
                json: !0
            }, t.get(0)), N.append(t);
            h()
        }

        function g(e) {
            var t = $(R);
            t.addClass("echo"), t.text(e), N.append(t), h()
        }

        function m() {
            C(), O.val(""), L = [], j = !1, setTimeout(v, 0)
        }

        function E() {
            $(".console-message .CodeMirror").each((function(e, t) {
                t.CodeMirror.refresh()
            })), h()
        }

        function C() {
            $(".console-message").remove()
        }

        function b() {
            var e = x.value;
            x.value = "", k = x.scrollHeight, x.value = e
        }

        function v() {
            if ("" === $(x).val()) x.rows = 1;
            else {
                var e, t = Math.trunc(x.dataset.minRows);
                x.rows = t, e = Math.ceil((x.scrollHeight - k) / 15), x.rows = t + e
            }
        }

        function S() {
            O.focus(), M = !0, !0 === j && (f(W), j = !1);
            for (const e of L) f(e);
            L = [], setTimeout(E, 1)
        }

        function P() {
            M = !1
        }

        function T() {
            O.addClass("disabled"), A = !0
        }

        function y() {
            O.removeClass("disabled"), A = !1
        }

        function w(e, t) {
            O.val(t.console.consoleData), t.console.command && (g(t.console.command), p(t.console.command))
        }
        CP.ConsoleEditor = {};
        var N, O, H, x, R = "<pre class='console-message CodeMirror-line'></pre>",
            I = [],
            U = 100,
            D = -1,
            V = "",
            A = !1,
            k = 15,
            M = !1,
            L = [],
            B = 11,
            j = !1,
            F = 5e3,
            z = {
                function: "error",
                arguments: ["Log Skipped: Sorry, this log was too large for our console. You might need to use the browser console instead."],
                complexity: 1
            },
            W = {
                function: "error",
                arguments: ["Logs Trimmed: To keep things fast we only stored the last " + (B - 1) + " messages while the CodePen console was closed, the others will be in the browser console."],
                complexity: 1
            },
            G = window.__pageType,
            J = null,
            K = 250;
        CP.ConsoleEditor = {
            init: e,
            showIFrameConsoleMessages: t
        }
    }(), window.CSSEditor = BaseEditor.extend({
        _getBasicType: function() {
            return "css"
        },
        _bindToHub: function() {
            Hub.sub(HUB_EVENTS.PEN_CHANGE, $.proxy(this._onPenChange, this)), Hub.sub(HUB_EVENTS.PEN_EDITOR_LOADED, $.proxy(this._onPageLoadingDone, this))
        },
        _onPenChange: function(e, t) {
            ObjectUtil.hasNestedValue(t, "pen.css_pre_processor") && this._preProcessorChanged(t.pen.css_pre_processor)
        },
        _onPageLoadingDone: function() {
            this.mobile && setTimeout($.proxy((function() {
                this.editor.focus()
            }), this), 400)
        },
        _getEditorTypeSpecificConfig: function() {
            return {
                mode: this.getMode(),
                syntax: "css",
                screenReaderLabel: "CSS Code Editor"
            }
        },
        _setEditorTypeSpecificOptions: function(e) {
            var t = {};
            e.extraKeys && (t = e.extraKeys), t["Ctrl-Space"] = "autocomplete", this.editor.setOption("extraKeys", CodeMirror.normalizeKeyMap(t))
        }
    }),
    function() {
        function e() {
            for (var e = $(".editor-dropdown"), n = 0; n < e.length; n++) t(e.eq(n))
        }

        function t(e) {
            var t = e.data("dropdown-type");
            $(".maximize-button", e).click((function() {
                Hub.pub(HUB_EVENTS.PEN_EDITOR_EXPAND, t), Hub.pub(HUB_EVENTS.POPUP_CLOSE)
            })), $(".minimize-button", e).click((function() {
                Hub.pub(HUB_EVENTS.PEN_EDITOR_CLOSE, t), Hub.pub(HUB_EVENTS.POPUP_CLOSE)
            })), $(".fold-all-button", e).on("click", (function(e) {
                "collab" === window.__pageType ? CP.editorsCodeFolding.foldAll(e, t) : Hub.pub(HUB_EVENTS.PEN_EDITOR_FOLD_ALL, t)
            })), $(".unfold-all-button", e).on("click", (function(e) {
                "collab" === window.__pageType ? CP.editorsCodeFolding.unfoldAll(e, t) : Hub.pub(HUB_EVENTS.PEN_EDITOR_UNFOLD_ALL, t)
            }))
        }
        CP.editorDropDowns = {}, CP.editorDropDowns.init = function() {
            e()
        }
    }();
const TEXT_JAVASCRIPT = "text/javascript";
window.EditorModes = {
        htmlModes: {
            text: "text",
            none: {
                name: "htmlmixed",
                htmlMode: !0,
                tags: {
                    script: [
                        ["type", /^text\/x-template$/, "htmlmixed"],
                        ["type", /^x-shader\/x-vertex$/, "text/typescript"],
                        ["type", /^text\/x-handlebars-template$/, "htmlmixed"],
                        ["type", /^text\/paperscript$/, TEXT_JAVASCRIPT],
                        [null, null, TEXT_JAVASCRIPT]
                    ]
                }
            },
            html: {
                name: "htmlmixed",
                htmlMode: !0,
                tags: {
                    script: [
                        ["type", /^text\/x-template$/, "htmlmixed"],
                        ["type", /^x-shader\/x-vertex$/, "text/typescript"],
                        ["type", /^text\/x-handlebars-template$/, "htmlmixed"],
                        ["type", /^x-text\/paperscript$/, TEXT_JAVASCRIPT],
                        [null, null, TEXT_JAVASCRIPT]
                    ]
                }
            },
            haml: "haml",
            slim: "application/x-slim",
            markdown: "markdown",
            pug: "pug"
        },
        htmlLoaderModes: {
            text: "text",
            none: "xml",
            html: "xml",
            haml: "haml",
            slim: "application/x-slim",
            markdown: "markdown",
            pug: "pug"
        },
        cssModes: {
            none: "text/css",
            css: "text/css",
            postcss: "text/css",
            scss: "text/x-scss",
            stylus: "text/x-styl",
            less: "text/x-less",
            sass: "text/x-sass"
        },
        jsModes: {
            none: TEXT_JAVASCRIPT,
            js: TEXT_JAVASCRIPT,
            babel: "text/jsx",
            coffeescript: "text/x-coffeescript",
            dart: "application/dart",
            flutter: "application/dart",
            vue: "text/x-vue",
            livescript: "text/x-livescript",
            typescript: "text/typescript"
        },
        getLoaderMode: function(e, t) {
            switch (t) {
                case "html":
                    return e in this.htmlLoaderModes ? "mode_" + this.htmlLoaderModes[e] : "mode_text";
                case "css":
                    return e in this.cssModes ? "mode_" + this.cssModes[e] : "mode_text";
                case "js":
                    return e in this.jsModes ? "mode_" + this.jsModes[e] : "mode_text"
            }
        },
        getCMMode: function(e, t) {
            switch (t) {
                case "html":
                    return e in this.htmlModes ? this.htmlModes[e] : "text";
                case "css":
                    return e in this.cssModes ? this.cssModes[e] : "text";
                case "js":
                    return e in this.jsModes ? {
                        name: this.jsModes[e],
                        globalVars: !0
                    } : "text"
            }
        },
        _HTML_TYPES: ["html", "xml", "haml", "markdown", "slim", "pug", "application/x-slim"],
        _CSS_TYPES: ["css", "less", "scss", "sass", "stylus", "postcss", "text/css", "text/x-sass", "text/x-scss", "text/x-less", "text/x-styl"],
        _JS_TYPES: ["js", "javascript", "coffeescript", "livescript", "typescript", "babel", "text/javascript", "text/x-coffeescript", "text/x-livescript", "text/typescript", "application/dart", "text/x-vue"],
        _CUSTOM_EDITOR_TYPES: {
            vue: "js",
            flutter: "js"
        },
        cmModeToType: function(e) {
            var t = this._getSafeInputMode(e);
            return this._getType(t)
        },
        _getSafeInputMode: function(e) {
            return ("string" == typeof e ? e : e.name).toLowerCase()
        },
        syntaxToType: function(e) {
            return this._getType(e)
        },
        _getType: function(e) {
            return this._HTML_TYPES.includes(e) ? "html" : this._CSS_TYPES.includes(e) ? "css" : this._JS_TYPES.includes(e) ? "js" : this._CUSTOM_EDITOR_TYPES[e] ? this._CUSTOM_EDITOR_TYPES[e] : "unknown"
        }
    }, window.HTMLEditor = BaseEditor.extend({
        _getBasicType: function() {
            return "html"
        },
        _bindToHub: function() {
            Hub.sub(HUB_EVENTS.PEN_CHANGE, $.proxy(this._onPenChange, this))
        },
        _onPenChange: function(e, t) {
            ObjectUtil.hasNestedValue(t, "pen.html_pre_processor") && this._preProcessorChanged(t.pen.html_pre_processor)
        },
        _getEditorTypeSpecificConfig: function() {
            const e = "embed" !== window.__pageType;
            return {
                mode: this.getMode(),
                syntax: "html",
                profile: "xhtml",
                autofocus: e,
                screenReaderLabel: "HTML Code Editor"
            }
        },
        _completeAfter: function(e, t) {
            return t && !t() || setTimeout((function() {
                e.state.completionActive || e.showHint({
                    completeSingle: !1
                })
            }), 100), CodeMirror.Pass
        },
        _completeIfAfterLt: function(e) {
            return this._completeAfter(e, (function() {
                var t = e.getCursor();
                return "<" === e.getRange(CodeMirror.Pos(t.line, t.ch - 1), t)
            }))
        },
        _completeIfInTag: function(e) {
            return this._completeAfter(e, (function() {
                var t = e.getTokenAt(e.getCursor());
                return !!("string" !== t.type || /["']/.test(t.string.charAt(t.string.length - 1)) && 1 !== t.string.length) && CodeMirror.innerMode(e.getMode(), t.state).state.tagName
            }))
        },
        _setEditorTypeSpecificOptions: function(e) {
            var t = {};
            e.extraKeys && (t = e.extraKeys), t = CodeMirror.normalizeKeyMap(t), !0 === e.autocomplete && (t["Ctrl-Space"] = "autocomplete", t["'<'"] = this._completeAfter.bind(this), t["'/'"] = this._completeIfAfterLt.bind(this), t["' '"] = this._completeIfInTag.bind(this), t["'='"] = this._completeIfInTag.bind(this)), this.editor.setOption("extraKeys", t)
        }
    }), window.JSEditor = BaseEditor.extend({
        _getBasicType: function() {
            return "js"
        },
        _bindToHub: function() {
            Hub.sub(HUB_EVENTS.PEN_CHANGE, $.proxy(this._onPenChange, this))
        },
        _onPenChange: function(e, t) {
            ObjectUtil.hasNestedValue(t, "pen.js_pre_processor") && this._preProcessorChanged(t.pen.js_pre_processor)
        },
        _getEditorTypeSpecificConfig: function(e) {
            return e = e || {}, {
                mode: this.getMode(),
                autocomplete: "vue" !== __editor_config.id && e.autocomplete,
                screenReaderLabel: "JavaScript Code Editor"
            }
        },
        _setEditorTypeSpecificOptions: function() {
            var e = this.editor.getOption("extraKeys");
            this.editor.setOption("extraKeys", Object.assign(CodeMirror.normalizeKeyMap({
                "Ctrl-Space": "autocomplete"
            }), e))
        }
    }), CP.codeEditorResizeController = {
        init: function() {
            this.model = CP.CodeEditorResizeModel, this.events = CP.CodeEditorsResizeEvents, this.view = CP.CodeEditorsResizeView, this.model.init(), this.events.init(this), this.view.init(this.model)
        },
        toggle: function(e) {
            this.model.toggle(e)
        },
        open: function(e) {
            this.model.open(e)
        },
        close: function(e) {
            this.model.close(e)
        },
        expand: function(e) {
            this.model.expand(e)
        },
        resetSizes: function() {
            this.model.resetSizes()
        },
        syncWithServer: function(e) {
            this.model.syncWithServer(e)
        },
        updateEditorSizes: function(e) {
            this.model.updateEditorSizes(e)
        },
        getOpenEditorCount: function() {
            return this.model.getOpenEditorCount()
        },
        getEditorPositions: function() {
            return this.model.getEditorPositions()
        },
        onWindowResize: function() {
            this.view.onWindowResize()
        }
    }, window.EnableDisableDriver = {
        _canDrive: !0,
        bindToEnableDisableHubEvents: function() {
            Hub.sub(HUB_EVENTS.PEN_EDITOR_UI_DISABLE, $.proxy(this._disableUserFromDriving, this)), Hub.sub(HUB_EVENTS.PEN_EDITOR_UI_ENABLE, $.proxy(this._enableUserToDrive, this))
        },
        _disableUserFromDriving: function() {
            this._canDrive = !1, this._disableUIElements()
        },
        _disableUIElements: function() {
            this._getAllUIElements && this._disableAllElements(this._getAllUIElements())
        },
        _disableAllElements: function(e) {
            for (const t of e) t && t.attr("disabled", !0)
        },
        _enableUserToDrive: function() {
            this._canDrive = !0, this._enableUIElements()
        },
        _enableUIElements: function() {
            this._getAllUIElements && this._enableAllElements(this._getAllUIElements())
        },
        _enableAllElements: function(e) {
            for (const t of e) t && t.attr("disabled", !1)
        }
    },
    function() {
        function e() {
            Hub.sub(HUB_EVENTS.PEN_EDITOR_UI_CHANGE_SERVER, t), Hub.sub(HUB_EVENTS.PEN_EDITOR_UI_CHANGE, n), Hub.sub(HUB_EVENTS.PEN_EDITOR_SIZES_CHANGE, o), Hub.sub(HUB_EVENTS.PEN_EDITOR_EXPAND, s), Hub.sub(HUB_EVENTS.PEN_EDITOR_CLOSE, c), Hub.sub(HUB_EVENTS.PEN_EDITOR_RESET_SIZES, r)
        }

        function t(e, t) {
            "editorSizes" in t.ui && l.syncWithServer(t)
        }

        function n(e, t) {
            t.ui && t.ui.editorSizes && i()
        }

        function i() {
            if (CP.CodeEditorsResizeEvents._canDrive)
                for (const i of CP.editorTypes) {
                    var e = $("#box-" + i),
                        t = CP.ui.editorSizes[i],
                        n = 0 === t;
                    e.find(".editor-actions-right button").not(".close-editor-button").attr("disabled", n), n = 0 === t || 1 === t, e.find(".close-editor-button").attr("disabled", n)
                }
        }

        function s(e, t) {
            CP.CodeEditorsResizeEvents._canDrive && l.expand(t)
        }

        function o(e, t) {
            l.updateEditorSizes(t)
        }

        function r() {
            CP.CodeEditorsResizeEvents._canDrive && l.resetSizes()
        }

        function a() {
            $(window).on("resize", u)
        }

        function c(e, t) {
            CP.CodeEditorsResizeEvents._canDrive && l.close(t)
        }

        function u() {
            clearTimeout(h), h = setTimeout(d, 100)
        }

        function d() {
            l.onWindowResize()
        }
        var l, h;
        CP.CodeEditorsResizeEvents = {
            _canDrive: !0
        };
        var p = $(".top-boxes .close-editor-button");
        _.extend(CP.CodeEditorsResizeEvents, EnableDisableDriver), CP.CodeEditorsResizeEvents._getAllUIElements = function() {
            return [p]
        }, CP.CodeEditorsResizeEvents.init = function(t) {
            l = t, this.bindToEnableDisableHubEvents(), a(), e(), i()
        }
    }(),
    function() {
        function e(e) {
            if (!CP.editorTypes.includes(e)) throw "Bad editor type: '" + e + "'"
        }

        function t() {
            var e = {
                ui: {
                    editorSizes: CP.ui.editorSizes
                }
            };
            Hub.pub(HUB_EVENTS.PEN_EDITOR_UI_CHANGE, e)
        }

        function n() {
            var e = 0;
            for (const t of CP.editorTypes) {
                e += 0 !== CP.ui.editorSizes[t] ? 1 : 0
            }
            return e
        }
        const i = [];
        for (const e of __editor_config.editors) i.push(e.id);
        CP.CodeEditorResizeModel = {
            TOP_TYPES: i,
            INITIAL_CONSOLE_SIZES: {
                0: "closed",
                1: 1 / 3,
                2: 1
            },
            init: function() {
                var e = CodeEditorsUtil.getQueryString("editors");
                if (e && "111" !== e && "1110" !== e) {
                    "000" === e.slice(0, 3) && (e = "111" + e.charAt(3));
                    var t = [...e.slice(0, 3)],
                        n = 0;
                    for (const e of t) n += parseInt(e, 10);
                    for (const [t, i] of CP.editorTypes.entries()) CP.ui.editorSizes[i] = e[t] / n;
                    var i = e.slice(3, 4),
                        s = this.INITIAL_CONSOLE_SIZES[i] || "closed";
                    CP.ui.editorSizes.console = s
                }
            },
            toggle: function(t) {
                e(t), this[0 === CP.ui.editorSizes[t] ? "open" : "close"](t)
            },
            close: function(n) {
                e(n);
                var i = CP.ui.editorSizes[n];
                if (0 !== i && 1 !== i) {
                    CP.ui.editorSizes[n] = 0;
                    var s = 0;
                    for (const e of CP.editorTypes) {
                        s += CP.ui.editorSizes[e]
                    }
                    for (const e of CP.editorTypes) CP.ui.editorSizes[e] = CP.ui.editorSizes[e] / s;
                    t()
                }
            },
            open: function(i) {
                if (e(i), 0 === CP.ui.editorSizes[i]) {
                    var s = 1 / (n() + 1);
                    for (const e of CP.editorTypes) {
                        var o = e === i;
                        CP.ui.editorSizes[e] = o ? s : CP.ui.editorSizes[e] * (1 - s)
                    }
                    t()
                }
            },
            expand: function(n) {
                e(n);
                for (const e of CP.editorTypes) CP.ui.editorSizes[e] = e === n ? 1 : 0;
                t()
            },
            syncWithServer: function(e) {
                this.updateEditorSizes(e.ui.editorSizes)
            },
            updateEditorSizes: function(e) {
                for (var n in e) CP.ui.editorSizes[n] = e[n];
                t(), CP.CodeEditorsSizeStorage.saveEditorSizes()
            },
            getEditorPositions: function() {
                var e = [],
                    t = 0;
                for (const n of CP.editorTypes) {
                    e.push(t), t += CP.ui.editorSizes[n]
                }
                return e
            },
            resetSizes: function() {
                var e = {},
                    t = CP.editorTypes.length;
                for (const n of CP.editorTypes) e[n] = 1 / t;
                this.updateEditorSizes(e)
            }
        }
    }(), BarDragger.prototype = Object.create(Unidragger.prototype), BarDragger.prototype.staticClick = function(e, t) {
        this.emitEvent("staticClick", [e, t]), this.didFirstClick ? (this.emitEvent("doubleClick", [e, t]), delete this.didFirstClick, clearTimeout(this.doubleClickTimeout)) : (this.didFirstClick = !0, this.doubleClickTimeout = setTimeout(function() {
            delete this.didFirstClick
        }.bind(this), BarDragger.DOUBLE_CLICK_TIME))
    }, BarDragger.DOUBLE_CLICK_TIME = 350,
    function(e) {
        "use strict";

        function t(e) {
            if (e) {
                if ("string" == typeof i[e]) return e;
                var t;
                e = e.charAt(0).toUpperCase() + e.slice(1);
                for (var s = 0, o = n.length; s < o; s++)
                    if (t = n[s] + e, "string" == typeof i[t]) return t
            }
        }
        var n = "Webkit Moz ms Ms O".split(" "),
            i = document.documentElement.style;
        "function" == typeof define && define.amd ? define((function() {
            return t
        })) : "object" == typeof exports ? module.exports = t : e.getStyleProperty = t
    }(window),
    function() {
        function e(e, r, a, c) {
            var u = !1;
            for (var d in r)
                if (o.style[d] = r[d], !(u = e.style[d] === o.style[d])) break;
            if (!u) {
                var l = [];
                for (d in r) l.push(d);
                e.style[n] = l.join(""), e.style[i] = a || "0.4s", e.addEventListener(s, (function(e) {
                    t(e, c)
                }), !1);
                e.offsetHeight;
                for (d in r) e.style[d] = r[d]
            }
        }

        function t(e, o) {
            e.target.style[n] = null, e.target.style[i] = null, e.target.removeEventListener(s, t, !1), o && o()
        }
        var n = getStyleProperty("transitionProperty"),
            i = getStyleProperty("transitionDuration"),
            s = {
                WebkitTransitionProperty: "webkitTransitionEnd",
                MozTransitionProperty: "transitionend",
                OTransitionProperty: "otransitionend",
                transitionProperty: "transitionend"
            }[n],
            o = document.createElement("div");
        window.triggerTransition = e
    }(),
    function() {
        function e() {
            R.each((function(e, t) {
                var n = $(t).find(".box-title").clone();
                n.addClass("box-title--resizer"), I.eq(e).append(n)
            }))
        }

        function t() {
            n(), I.each(i), R.find(".powers-drag-handle").each(i)
        }

        function n() {
            v = I.width(), S = I.outerHeight(), P = D.outerHeight()
        }

        function i(e, t) {
            var n = new BarDragger(t);
            n.index = e, n.on("doubleClick", a), e > 0 && (n.on("dragStart", s), n.on("dragMove", o), n.on("dragEnd", r))
        }

        function s() {
            h(this)
        }

        function o(e, t, n) {
            _(this, n)
        }

        function r() {
            f(this)
        }

        function a() {
            g(this)
        }

        function c() {
            Hub.sub(HUB_EVENTS.PEN_EDITOR_UI_CHANGE, u)
        }

        function u(e, t) {
            t.ui && (t.ui.editorSizes && d(e, t), t.ui.layout && l())
        }

        function d(e, t) {
            CP.CodeEditorsResizeView.setEditorSizes(t.ui.editorSizes, !0), C(), Hub.pub(HUB_EVENTS.PEN_EDITOR_REFRESH_REQUEST, {
                delay: 10
            })
        }

        function l() {
            R.width("").height(""), H.width("").height(""), n(), CP.CodeEditorsResizeView.setEditorSizes(CP.ui.editorSizes, !1)
        }

        function h(e) {
            CP.codeEditorResizeController.events && (CP.codeEditorResizeController.events._canDrive && !w && (T = b.getEditorPositions(), y = T[e.index], w = e, p()))
        }

        function p() {
            O = "top" === CP.ui.layout ? H.innerWidth() - v * V : H.innerHeight() - (S + P) * V
        }

        function _(e, t) {
            if (CP.codeEditorResizeController.events._canDrive && e === w) {
                var n = "top" === CP.ui.layout ? "x" : "y",
                    i = y + t[n] / O;
                i = Math.max(0, Math.min(1, i)), T[e.index] = i;
                for (const [t, n] of T.entries()) t < e.index ? T[t] = Math.min(n, i) : t > e.index && (T[t] = Math.max(n, i));
                var s = {};
                for (const [e, t] of T.entries()) {
                    var o = T[e + 1],
                        r = (o = void 0 === o ? 1 : o) - t;
                    s[CP.editorTypes[e]] = r
                }
                N = s, CP.CodeEditorsResizeView.setEditorSizes(s, !1)
            }
        }

        function f(e) {
            CP.codeEditorResizeController.events._canDrive && e === w && (Hub.pub(HUB_EVENTS.PEN_EDITOR_SIZES_CHANGE, N), Hub.pub(HUB_EVENTS.PEN_EDITOR_REFRESH_REQUEST, {
                delay: 0
            }), w = null, N = null)
        }

        function g(e) {
            var t = CP.editorTypes[e.index];
            1 === CP.ui.editorSizes[t] ? Hub.pub(HUB_EVENTS.PEN_EDITOR_RESET_SIZES) : Hub.pub(HUB_EVENTS.PEN_EDITOR_EXPAND, t)
        }

        function m(e, t) {
            var n = H.innerWidth();
            e.editor && H.height(e.editor * (x.height() - U.height()));
            var i = 1 - v * V / n;
            for (const [u, d] of CP.editorTypes.entries()) {
                var s = e[d],
                    o = R[u],
                    r = {
                        width: 100 * (s *= i) + "%"
                    };
                t ? triggerTransition(o, r) : $(o).css(r);
                var a = I[u],
                    c = s * n < 150;
                $(a)[c ? "addClass" : "removeClass"]("is-horiz-skinny")
            }
        }

        function E(e, t) {
            var n = S + P;
            e.editor && H.width(e.editor * window.innerWidth);
            for (const [r, a] of CP.editorTypes.entries()) {
                var i = e[a],
                    s = R[r],
                    o = {
                        height: "calc((100% - (" + __editor_config.editors.length + " * " + n + "px)) * " + i + " + " + P + "px)"
                    };
                t ? triggerTransition(s, o) : $(s).css(o)
            }
        }

        function C() {
            var e = CP.editorTypes.map((function(e) {
                return CP.ui.editorSizes[e] > 0 ? "1" : "0"
            }));
            e = e.join("");
            var t = A[CP.ui.editorSizes.console];
            void 0 === t && (t = "1"), e += t;
            var n = window.location,
                i = n.protocol + "//" + n.host + n.pathname + ("1110" === e ? "" : "?editors=" + e);
            history.replaceState("", "", i)
        }
        CP.CodeEditorsResizeView = {};
        var b, v, S, P, T, y, w, N, O, H = $(".top-boxes"),
            x = $(".page-wrap"),
            R = H.find(".box"),
            I = $(".editor-resizer"),
            U = $("#resizer"),
            D = $(".box .powers"),
            V = R.length;
        CP.CodeEditorsResizeView.init = function(n) {
            if (e(), CP.editorTypes.length < 2) return;
            b = n;
            let i = CP.CodeEditorsSizeStorage.getEditorSizes();
            i && 0 !== CP.pen.id && (CP.ui.editorSizes = JSON.parse(i)), t(), CP.CodeEditorsResizeView.setEditorSizes(CP.ui.editorSizes, !1), c()
        }, CP.CodeEditorsResizeView.setEditorSizes = function(e, t) {
            "top" === CP.ui.layout ? m(e, t) : E(e, t)
        };
        var A = {
            closed: "0",
            1: "2"
        };
        CP.CodeEditorsResizeView.onWindowResize = function() {
            "top" === CP.ui.layout && CP.CodeEditorsResizeView.setEditorSizes(CP.ui.editorSizes, !1)
        }
    }(),
    function() {
        function e() {
            n() && (CP.ui.editorSizes.time = Date.now(), CPLocalStorage.setItem(`${__item.slug_hash}-editor`, JSON.stringify(CP.ui.editorSizes)))
        }

        function t() {
            if (__item) return CPLocalStorage.getItem(__item.slug_hash + "-editor")
        }

        function n() {
            return __user && __item && __user.id > 1 && __user.id === __item.user_id
        }
        CP.CodeEditorsSizeStorage = {
            saveEditorSizes: e,
            getEditorSizes: t
        }
    }(),
    function() {
        function e(e, r, a) {
            var c = !1;
            for (var u in r)
                if (o.style[u] = r[u], !(c = e.style[u] === o.style[u])) break;
            if (!c) {
                var d = [];
                for (u in r) d.push(u);
                e.style[n] = d.join(""), e.style[i] = a || "0.4s", e.addEventListener(s, t, !1);
                e.offsetHeight;
                for (u in r) e.style[u] = r[u]
            }
        }

        function t(e) {
            e.target.style[n] = null, e.target.style[i] = null, e.target.removeEventListener(s, t, !1)
        }
        var n = getStyleProperty("transitionProperty"),
            i = getStyleProperty("transitionDuration"),
            s = {
                WebkitTransitionProperty: "webkitTransitionEnd",
                MozTransitionProperty: "transitionend",
                OTransitionProperty: "otransitionend",
                transitionProperty: "transitionend"
            }[n],
            o = document.createElement("div");
        window.triggerTransition = e
    }(),
    function() {
        async function e(e) {
            Hub.pub(HUB_EVENTS.FORMAT_START);
            return n(CP.pen[`${e}_pre_processor`], e)
        }

        function t(e) {
            Hub.pub(HUB_EVENTS.FORMAT_ERROR, e), "development" === a && console.error("Error formatting request", e)
        }
        async function n(e, n) {
            try {
                const t = "none" === e ? n : e;
                if (c.has(t)) {
                    const e = CodeEditorsUtil.getEditorByType(n);
                    e.showingProcessed && await e.showSourceCode(), e.toggleReadOnly(!0, "formatting");
                    const s = await i(t, n);
                    e.toggleReadOnly(!1), s && e.setEditorValue(s)
                }
            } catch (e) {
                t(e)
            }
            Hub.pub(HUB_EVENTS.FORMAT_FINISH)
        }
        async function i(e, n) {
            try {
                const i = CP.pen[n].trim();
                if (!i) return i;
                const r = o(e, i, n),
                    a = await simpleServerPostAsync({
                        url: "/cpe/process",
                        params: r
                    }),
                    {
                        errors: c,
                        textOutput: u
                    } = s(a, n);
                for (const e of c) t(e);
                return u
            } catch (e) {
                t(e)
            }
        }

        function s(e, t) {
            let {
                data: n,
                errors: i
            } = e;
            n = window._makeSafe(n, []);
            const s = n[0] || {
                errors: []
            };
            return {
                errors: [...i, ...s.errors],
                textOutput: s.textOutput || CP.pen[t]
            }
        }

        function o(e, t, n) {
            return [{
                id: n,
                options: {
                    indentWith: CP.pen.editor_settings.indent_with,
                    tabSize: r()
                },
                processors: ["format-1"],
                syntax: e,
                textInput: t
            }]
        }

        function r() {
            return "tabs" === CP.pen.editor_settings.indent_with ? 1 : parseInt(CP.pen.editor_settings.tab_size, 10)
        }
        const {
            environment: a
        } = window.__CPDATA, c = new Set(["html", "markdown", "pug", "flutter", "css", "scss", "sass", "less", "stylus", "js", "typescript", "babel", "vue"]);
        window.CP.formatter = {
            formatType: e
        }
    }(), window.CodeEditorsTidyController = Class.extend({
        init: function() {
            this.model = new CodeEditorTidyModel, this.events = new CodeEditorsTidyEvents(this), this.view = new CodeEditorsTidyView(this.model)
        },
        format: function(e) {
            CP.formatter.formatType(e)
        },
        disable: function(e, t) {
            this.view.disable(e, t)
        }
    }), window.CodeEditorsTidyEvents = Class.extend({
        $tidyCodeButtons: $(".tidy-code-button"),
        init: function(e) {
            this.controller = e, this.editors = CP.editorConfig.config.editors.map((e => e.id)), this._bindToDOM()
        },
        _bindToDOM: function() {
            this.$tidyCodeButtons._on("click", this._onTidyClick, this)
        },
        _onTidyClick: function(e, t) {
            this.controller.format(t.data("editor-type")), Hub.pub(HUB_EVENTS.POPUP_CLOSE), window.CodePenTracking.trackEvent({
                eventName: "Format Code",
                eventTrigger: "Pen Editor - " + t.data("editor-type")
            })
        }
    }), window.CodeEditorTidyModel = Class.extend({
        init: function() {}
    }), window.CodeEditorsTidyView = Class.extend({
        $tidyButtons: $(".tidy-code-button"),
        init: function(e) {
            this.data = e, _.extend(this, EnableDisableDriver), this.bindToEnableDisableHubEvents(), this._bindToHub(), this._syncStateOfTidyButtons(CP.pen)
        },
        _bindToHub: function() {
            Hub.sub(HUB_EVENTS.PEN_CHANGE, ((e, t) => this._syncStateOfTidyButtons(t.pen)))
        },
        _syncStateOfTidyButtons: function(e) {
            for (const t of __editor_config.editors)
                if (ObjectUtil.hasNestedValue(e, `${t.id}_pre_processor`)) {
                    const n = t.actions.find((e => "tidy_code" === e.type));
                    if (n && n.disabled_processors) {
                        const i = $(`.tidy-code-button[data-editor-type=${t.id}]`);
                        this._hideShowTidyButton(e[`${t.id}_pre_processor`], n.disabled_processors, i)
                    }
                }
        },
        _hideShowTidyButton: function(e, t, n) {
            _.include(t, e) ? n.addClass("hide") : n.removeClass("hide")
        },
        _getAllUIElements: function() {
            return [this.$htmlTidyButton, this.$cssTidyButton, this.$jsTidyButton]
        },
        disable: function(e, t) {
            var n = $(`.tidy-code-button[data-editor-type=${e}]`);
            t ? n.addClass("disabled") : n.removeClass("disabled")
        }
    }), window.TransitionsUtil = Class.extend({
        _transitionEl: document.createElement("fakeelement"),
        _transitions: {
            transition: "transitionend",
            OTransition: "oTransitionEnd",
            MozTransition: "transitionend",
            WebkitTransition: "webkitTransitionEnd"
        },
        getBrowserTransitionEventName: function() {
            for (var e in this._transitions)
                if (void 0 !== this._transitionEl.style[e]) return this._transitions[e]
        }
    }), window.CodeEditorsCSSTransitionHandler = Class.extend({
        init: function() {
            this._bindToDOM()
        },
        _bindToDOM: function() {
            var e = _.throttle((function() {
                Hub.pub(HUB_EVENTS.PEN_EDITOR_REFRESH_REQUEST, {
                    delay: 10
                })
            }), 300);
            $("#box-html, #box-css #box-js").on(this._getBrowserTransitionEventName(), e)
        },
        _getBrowserTransitionEventName: function() {
            return (new TransitionsUtil).getBrowserTransitionEventName()
        }
    }), window.CodeEditorsUtil = {
        getEditorByType: function(e) {
            return "html" === e ? CP.editors.html : "css" === e ? CP.editors.css : CP.editors.js
        },
        getQueryString: function(e) {
            var t = window.location.search;
            if (t)
                for (var n = t.slice(1).split("&"), i = 0, s = n.length; i < s; i++) {
                    var o = n[i].split("=");
                    if (o[0] === e) return o[1]
                }
        }
    }, window.CodeEditorsViewSourceController = Class.extend({
        init: function() {
            this.model = new CodeEditorsViewSourceModel, this.events = new CodeEditorsViewSourceEvents(this), this.view = new CodeEditorsViewSourceView
        },
        toggleViewSource: function(e) {
            this.model.toggleViewSource(e)
        },
        setViewSourceToFalse: function(e) {
            this.model.setViewSourceToFalse(e)
        },
        syncWithServer: function(e) {
            this.model.syncWithServer(e)
        }
    }), window.CodeEditorsViewSourceEvents = Class.extend({
        _canDrive: !0,
        init: function(e) {
            this.controller = e, this._bindToDOM(), this._bindToHub()
        },
        _bindToDOM: function() {
            $(".view-compiled-button")._on("click", this._toggleShowProcessed, this)
        },
        _bindToHub: function() {
            Hub.sub(HUB_EVENTS.PEN_EDITOR_UI_DISABLE, $.proxy(this._disableUserFromDriving, this)), Hub.sub(HUB_EVENTS.PEN_EDITOR_UI_ENABLE, $.proxy(this._enableUserToDrive, this)), Hub.sub(HUB_EVENTS.PEN_CHANGE, $.proxy(this._onPenChange, this)), Hub.sub(HUB_EVENTS.PEN_EDITOR_UI_CHANGE_SERVER, $.proxy(this._onServerUIChange, this)), Hub.sub(HUB_EVENTS.PEN_LIVE_CHANGE, $.proxy(this._penProcessed, this))
        },
        _disableUserFromDriving: function() {
            this._canDrive = !1
        },
        _enableUserToDrive: function() {
            this._canDrive = !0
        },
        _onServerUIChange: function(e, t) {
            "editorViewSource" in t.ui && this.controller.syncWithServer(t)
        },
        _toggleShowProcessed: function(e, t) {
            this._canDrive && this.controller.toggleViewSource({
                type: this._getType(t)
            })
        },
        _getType: function(e) {
            return $(e).data("editor-type").toLowerCase()
        },
        _onPenChange: function(e, t) {
            ObjectUtil.hasNestedValue(t, "pen.html_pre_processor") && this.controller.setViewSourceToFalse({
                type: "html"
            }), ObjectUtil.hasNestedValue(t, "pen.css_pre_processor") && this.controller.setViewSourceToFalse({
                type: "css"
            }), ObjectUtil.hasNestedValue(t, "pen.js_pre_processor") && this.controller.setViewSourceToFalse({
                type: "js"
            })
        },
        _penProcessed: function() {
            for (const e of CP.editorTypes) CP.ui.editorViewSource[e] && (this.controller.toggleViewSource({
                type: e
            }), this.controller.toggleViewSource({
                type: e
            }))
        }
    }), window.CodeEditorsViewSourceModel = Class.extend({
        init: function() {},
        toggleViewSource: function(e) {
            var t = !this._getSource(e.type);
            this._setSource(e.type, t), this._publishChangeEvent(e)
        },
        setViewSourceToFalse: function(e) {
            this._setSource(e.type, !1), this._publishChangeEvent(e)
        },
        _getSource: function(e) {
            return CP.ui.editorViewSource[e]
        },
        _setSource: function(e, t) {
            CP.ui.editorViewSource[e] = t
        },
        syncWithServer: function(e) {
            for (var t in e.ui.editorViewSource) CP.ui.editorViewSource[t] = e.ui.editorViewSource[t], this._publishChangeEvent({
                type: t
            })
        },
        _publishChangeEvent: function(e) {
            var t = {
                ui: {
                    editorViewSource: {}
                }
            };
            t.ui.editorViewSource[e.type] = this._getSource(e.type), Hub.pub(HUB_EVENTS.PEN_EDITOR_UI_CHANGE, t)
        }
    }), window.CodeEditorsViewSourceView = Class.extend({
        init: function() {
            this._bindToHub(), this._syncStateOfButtons(null, {
                pen: CP.pen
            }), _.extend(this, EnableDisableDriver), this.bindToEnableDisableHubEvents()
        },
        _bindToHub: function() {
            Hub.sub(HUB_EVENTS.PEN_EDITOR_UI_CHANGE, $.proxy(this._onUIChange, this)), Hub.sub(HUB_EVENTS.PEN_CHANGE, $.proxy(this._syncStateOfButtons, this)), Hub.sub(HUB_EVENTS.PEN_CHANGE, $.proxy(this._syncPrefixes, this))
        },
        _onUIChange: function(e, t) {
            if (t.ui && t.ui.editorViewSource)
                for (var n in t.ui.editorViewSource) this._toggleShowProcessed(n, t.ui.editorViewSource[n], t)
        },
        _getViewCompiledButton: e => $(`.view-compiled-button[data-editor-type=${e}]`),
        _syncStateOfButtons: function(e, t) {
            const n = t.pen;
            for (const e of __editor_config.editors)
                if (ObjectUtil.hasNestedValue(n, `${e.id}_pre_processor`)) {
                    const t = e.actions.find((e => "view_compiled" === e.type));
                    t && t.disabled_processors && this._hideShowButton(n[`${e.id}_pre_processor`], t.disabled_processors, this._getViewCompiledButton(e.id))
                }
        },
        _syncPrefixes: function() {},
        _checkPrefixes: function(e) {
            for (const t of __editor_config.editors)
                if (e && e[`${t.id}_prefix`] && "none" === CP.pen[`${t.id}_pre_processor`]) {
                    const n = t.actions.find((e => "view_compiled" === e.type));
                    this._hideShowButton(e[`${t.id}_prefix`], n.disabled_prefixes, this._getViewCompiledButton(t.id)), this._showSourceCodeInEditor(t.id)
                }
        },
        _hideShowButton: function(e, t, n) {
            _.include(t, e) ? n.addClass("hide") : n.removeClass("hide")
        },
        _toggleShowProcessed: function(e, t) {
            t ? this._showProcessedCodeInEditor(e) : this._showSourceCodeInEditor(e)
        },
        _showProcessedCodeInEditor: function(e) {
            CodeEditorsUtil.getEditorByType(e).showProcessedCode();
            var t = this._getViewCompiledButton(e),
                n = t.closest(".box").data("preprocessor");
            t.text("View Uncompiled " + ("None" !== n ? n : "")), t.addClass("active"), CP.codeEditorTidyController.disable(e, !0)
        },
        _showSourceCodeInEditor: function(e) {
            CodeEditorsUtil.getEditorByType(e).showSourceCode();
            const t = this._getViewCompiledButton(e);
            t.text("View Compiled " + e.toUpperCase()), t.removeClass("active"), CP.codeEditorTidyController.disable(e, !1)
        },
        _getAllUIElements: function() {
            return [$(".view-compiled-button")]
        }
    }), window.Profiled = Class.extend({
        init: function() {
            _.extend(this, __profiled)
        },
        isUserProfiled: function(e) {
            return "team" !== this.type && e.username === this.username
        }
    }), window.UI = {
        buildDefaultUIData: function() {
            return {
                info: "closed",
                layout: window.__layoutType || "top",
                editorViewSource: {
                    html: !1,
                    css: !1,
                    js: !1
                },
                editorSizes: {
                    html: 1 / 3,
                    css: 1 / 3,
                    js: 1 / 3,
                    console: "closed"
                },
                settings: {
                    pane: "closed",
                    tab: "details",
                    css: {
                        addons: "closed"
                    }
                }
            }
        }
    },
    function() {
        const e = {
                actions: [],
                formatters: [],
                isInvalidEditor: !0,
                linters: [],
                settings: []
            },
            t = {};
        class n {
            constructor(e) {
                this.config = e
            }
            get id() {
                return this.config.id
            }
            get preview() {
                return this.config.preview
            }
            isValidEditorType(e) {
                return !this.getConfigByType(e, !1).isInvalidEditor
            }
            getLinterById(e) {
                return this.config.linters.find((t => t.id === e))
            }
            getProcessor(e, t) {
                const n = this.config.editors;
                let i = null;
                for (const s of n) {
                    const n = s.processors;
                    for (const o of n)
                        if (i || s.type !== t || (i = o), o.id === e) return o
                }
                if (i) return i;
                throw new Error(`Unknown Processor: ${e}`)
            }
            getPenAttributeDefaults() {
                const e = {
                    css_prefix: {
                        values: ["autoprefixer", "prefixfree", "neither"],
                        defaultValue: "neither"
                    },
                    css_starter: {
                        values: ["normalize", "neither", "reset"],
                        defaultValue: "neither"
                    }
                };
                return __editor_config.editors.map((t => {
                    const n = `${t.type}_pre_processor`;
                    e[t.type] || (e[n] = {
                        values: [],
                        defaultValue: "none"
                    });
                    for (const i of t.processors) e[n].values.push(i.id)
                })), {
                    enums: e,
                    types: {
                        css_pre_processor: "none",
                        css_prefix: "",
                        css_starter: "none",
                        css: "",
                        description: "",
                        head: "",
                        html_classes: "",
                        html_pre_processor: "none",
                        html: "",
                        js_pre_processor: "none",
                        js: "",
                        parent_id: 0,
                        private: !1,
                        scripts: [],
                        slug_hash: "",
                        styles: [],
                        template: !1,
                        title: ""
                    }
                }
            }
            getPrettyProcessorName(e, t) {
                const n = this.getConfigByType(e).processors.find((e => e.id === t));
                return _makeSafe(n, {}).name
            }
            getConfigByType(n, i = !0) {
                return t[n] || (t[n] = this.config.editors.find((e => e.id === n)), t[n] || (t[n] = Object.assign({}, e), i && console.error(`Invalid configOfType: ${n}`))), t[n]
            }
        }
        "object" != typeof window.CP && (window.CP = {}), CP.editorConfig = new n(window.__editor_config)
    }(),
    function() {
        function e(e, t) {
            CP.editors[t].foldAll()
        }

        function t(e, t) {
            CP.editors[t].unfoldAll()
        }

        function n() {
            i() && s(), o()
        }

        function i() {
            return "professor" !== window.__pageType && "collab" !== window.__pageType && CP.user.ownsItem(CP.pen)
        }

        function s() {
            const e = CPLocalStorage.getItem(r());
            if (!e) return;
            const t = JSON.parse(e);
            for (const e of Object.keys(t)) {
                const n = CP.editors[e];
                if (!n) continue;
                const i = _makeSafe(t[e].marks, []);
                for (const e of i.reverse()) n.foldCode(e)
            }
        }

        function o() {
            i() && Hub.sub(HUB_EVENTS.PEN_EDITOR_CODE_FOLD, a), Hub.sub(HUB_EVENTS.PEN_EDITOR_FOLD_ALL, e), Hub.sub(HUB_EVENTS.PEN_EDITOR_UNFOLD_ALL, t)
        }

        function r() {
            return `${__item.slug_hash}-editor-folding`
        }

        function a() {
            const e = JSON.stringify(c());
            CPLocalStorage.setItem(r(), e)
        }

        function c() {
            return CP.editorTypes.reduce(((e, t) => {
                const n = CP.editors[t];
                return e[t] = n.getEditorCodeFoldingState(), e
            }), {})
        }
        CP.editorsCodeFolding = {
            foldAll: e,
            unfoldAll: t
        }, Hub.sub(HUB_EVENTS.PEN_EDITOR_LOADED, n)
    }(),
    function() {
        function e(e, i) {
            $.hideModal(), t(e), n(i), CP.pen.save()
        }

        function t(e) {
            $("meta[name='csrf-token']").attr("content", e)
        }

        function n(e) {
            window.__user = e, CP.user.updateUser(e)
        }

        function i(e) {
            return !!e.origin.match(window.__CPDATA.host) && "logged-into-codepen" === e.data.type
        }

        function s() {
            $.showModal(_fullURL("/accounts/anon/"), "modal-signup")
        }
        window.addEventListener("message", (function(t) {
            i(t) && e(t.data.csrf, t.data.user)
        })), window.CP.loginHandler = {
            showAnonymousUserSignupModal: s
        }
    }();
const MAX_PEN_SIZE = 1e6;
window.Pen = Class.extend({
        id: "",
        css_pre_processor: "none",
        css_prefix: "neither",
        css_starter: "neither",
        css: "",
        description: "",
        editor_settings: {},
        head: "",
        html_classes: "",
        html_pre_processor: "none",
        html: "",
        js_pre_processor: "none",
        js_library: null,
        js: "",
        newTags: [],
        parent_id: 0,
        private: !1,
        resources: [],
        slug_hash: "",
        tags: [],
        template: !1,
        title: "",
        canonicalImports: PEN_CONSTANTS.CANONICAL_IMPORTS.IMPORTS,
        autosavingNow: !1,
        errorCode: "",
        last_updated: "",
        lastSavedPen: {},
        lintErrors: [],
        MAX_SAVE_ATTEMPTS: 4,
        SAVE_ATTEMPT_TIMEOUT: 1e4,
        saveAttempts: 0,
        updated_at: "",
        init: function() {
            _.extend(this, AJAXUtil), _.extend(this, PenResourcesData), this._initializePenData()
        },
        _initializePenData: function() {
            Object.assign(this, this._makePenSafe(__item)), this._ensureResourcesValid(), this._makePenSafe(this), this.lastSavedPen = this.getSaveableCopyOfPen()
        },
        _makePenSafe: function(e) {
            const {
                enums: t,
                types: n
            } = CP.editorConfig.getPenAttributeDefaults();
            for (const t of Object.keys(n)) {
                const i = n[t];
                e[t] = _makeSafe(e[t], i)
            }
            for (const n of Object.keys(t)) {
                const {
                    defaultValue: i,
                    values: s
                } = t[n];
                s.includes(e[n]) || (e[n] = i)
            }
            return e
        },
        setItemValue: function(e) {
            const t = _cloneDeep(e);
            for (var n in t.item && (t.pen = t.item), t.pen) "js" === n && (this.canonicalImports = PEN_CONSTANTS.CANONICAL_IMPORTS.IMPORTS), this._setValue(n, t.pen[n]);
            Hub.pub(HUB_EVENTS.PEN_CHANGE, _cloneDeep(t))
        },
        _setValue: function(e, t) {
            if ("object" != typeof t || Array.isArray(t)) this[e] = "tags" === e || "newTags" === e ? this._validTags(t) : t;
            else
                for (var n in t) this[e][n] = t[n];
            this._updateLastUpdated()
        },
        setLintErrors: function(e) {
            this.lintErrors = Array.isArray(e) ? e : []
        },
        _updateLastUpdated: function() {
            this.last_updated = Date.now()
        },
        getLastUpdatedAt: function() {
            return this.last_updated || new Date(this.updated_at).getTime()
        },
        getActiveSlugHash: function() {
            const e = this.private ? this.slug_hash_private : this.slug_hash;
            return _makeSafe(e, "")
        },
        getTags: function() {
            return [...this.tags, ...this.newTags]
        },
        _validTags: function(e) {
            const t = e.map((e => _stripHTMLTags(e.toLowerCase().replace(/[^\w-]+/g, "").trim()))).map((e => e.length > 1 ? e : null)).reduce(((e, t) => (e[t] = t, e)), {});
            return Object.values(t)
        },
        save: function() {
            CP.user.anon ? window.CP.loginHandler.showAnonymousUserSignupModal() : this._canSave() ? this._shouldForkPen() ? this._forkPen() : this._savePenToDB() : Hub.pub(HUB_EVENTS.PEN_ERRORS, this.errorCode)
        },
        forkPenInCurrentState: function(e) {
            CP.user.anon ? window.CP.loginHandler.showAnonymousUserSignupModal() : (this._openForkInNewTab = e, this._canSave() ? (e ? window.CodePenTracking.trackEvent({
                eventName: "Forked Pen \u2014 New Tab",
                eventTrigger: "Pen Editor Footer Fork Button"
            }) : window.CodePenTracking.trackEvent({
                eventName: "Forked Pen \u2014 Same Tab",
                eventTrigger: "Pen Editor Footer Fork Button"
            }), this._forkPen(!0)) : Hub.pub(HUB_EVENTS.PEN_ERRORS, this.errorCode))
        },
        _shouldForkPen: function() {
            return this._isPenOwnedByAnotherUser()
        },
        saveAsPrivate: function() {
            this._canSave() ? (this.private = !0, this._savePenToDB()) : Hub.pub(HUB_EVENTS.PEN_ERRORS, this.errorCode)
        },
        _canSave: function() {
            if (!CP.user.isUserLoggedIn() && this._isProfessorOrCollabSession()) return this.errorCode = "anon-cannot-save-during-rt-session", !1;
            return !(JSON.stringify(this.getSaveableCopyOfPen()).length > MAX_PEN_SIZE) || (this.errorCode = "pen-too-large", !1)
        },
        _isProfessorOrCollabSession: function() {
            return "professor" === window.__pageType || "collab" === window.__pageType
        },
        _forkPen: function(e) {
            if (e || this._shouldSavePenToDB()) {
                const e = this.getCopyOfSaveablePen();
                e.fork = !0, this.post("/pen/save", {
                    pen: JSON.stringify(e)
                }, this.doneSave, this.failedSave, this.erroredSave)
            } else this.sendPseudoSavedSignal()
        },
        _savePenToDB: async function() {
            await this._formatPriorToSave(), this._shouldSavePenToDB() ? this.post("/pen/save", {
                pen: this._getSaveablePen()
            }, this.doneSave, this.failedSave, this.erroredSave) : this.sendPseudoSavedSignal()
        },
        _formatPriorToSave: async function() {
            if (!this.editor_settings.format_on_save || "collab" === window.__pageType || this.autosavingNow) return;
            const e = Object.keys(CP.editors).map((e => CP.formatter.formatType(CP.editors[e].type)));
            await Promise.all(e)
        },
        _getSaveablePen: function() {
            return JSON.stringify(this.getCopyOfSaveablePen())
        },
        getPenCopy: function() {
            return _cloneDeep(this)
        },
        getProcessablePenCopy: function() {
            const e = this.getPenCopy(),
                t = {
                    canonicalImports: this.canonicalImports
                };
            return PEN_CONSTANTS.DATA_ATTRIBUTES.reduce(((t, n) => (t[n] = e[n], t)), t)
        },
        getCopyOfSaveablePen: function() {
            return this._updateSaveableTagsPriorToSave(), this.getSaveableCopyOfPen()
        },
        _shouldSavePenToDB: function() {
            return this.hasPenChanged() || this._isBlankNewPen() || this._isPenOwnedByAnotherUser()
        },
        _isBlankNewPen: function() {
            return "" === this.slug_hash
        },
        _updateSaveableTagsPriorToSave: function() {
            this.tags = this.getTags(), this.newTags = []
        },
        sendPseudoSavedSignal: function() {
            Hub.pub(HUB_EVENTS.PEN_SAVED, {})
        },
        doneSave: function(e) {
            const t = this._shouldRedirect(this.lastSavedPen, e);
            if (this.saveAttempts = 0, this.lastSavedPen = this.getSaveableCopyOfPen(), t) {
                const t = this._getRedirectUrl(e);
                if (this._openForkInNewTab) {
                    const e = "fork";
                    $.dismissMessage(e), setTimeout((() => {
                        $.showMessage(`Pen Forked! <a href="${t}" rel="noreferrer"  target="_blank">View Fork</a>`, "super-slow", "success", e)
                    }), 400), window.open(t, "_blank")
                } else window.location = t
            } else this._publishPenSaved();
            this._openForkInNewTab = !1
        },
        _publishPenSaved: function() {
            const e = this._diffPen(this, this.lastSavedPen);
            Hub.pub(HUB_EVENTS.PEN_SAVED, {
                pen: e
            })
        },
        _shouldRedirect: function(e, t) {
            return !this._isProfessorOrCollabSession() && e.id !== t.id
        },
        _getRedirectUrl: function(e) {
            const t = new URLSearchParams(document.location.search);
            t.delete("template");
            let n = t.toString();
            return n && (n = `?${n}`), `${e.redirect_url}${n}`
        },
        _penForked: function(e, t) {
            if (!e.id) return !1;
            if (e.id !== t.id) return !0;
            let n = !1;
            for (const i of ["user_id", "team_id"]) e[i] !== t[i] && (n = !0);
            return n
        },
        failedSave: function(e) {
            this.showStandardErrorMessage(e)
        },
        erroredSave: function(e, t) {
            if (this.saveAttempts < this.MAX_SAVE_ATTEMPTS) {
                var n = _.template(Copy.errors["unable-to-save-try-again"], {
                    time: TimeUtil.countToString(this.saveAttempts + 1)
                });
                $.showMessage(n, "super-slow", "error"), this.saveAttempts += 1, setTimeout($.proxy(this._savePenToDB, this), this.SAVE_ATTEMPT_TIMEOUT)
            } else this.saveAttempts = 0, this.showStandardErrorMessage(e, t)
        },
        processingDisabled: function() {
            return this.lintErrors.length > 0
        },
        isUserPenOwner: function() {
            return "" === this.slug_hash || ("team" === CP.profiled.type ? CP.profiled.hashid === CP.user.current_team_hashid : CP.profiled.id === CP.user.id)
        },
        _isPenOwnedByAnotherUser: function() {
            return !this.isUserPenOwner()
        },
        hasPenChanged: function() {
            const e = Object.keys(this._diffPen(this, this.lastSavedPen));
            if (e.includes("editor_settings") && 1 === e.length) {
                const e = Object.keys(this._diffPen(this.editor_settings, this.lastSavedPen.editor_settings));
                if (e.includes("snippets") && 1 === e.length) return !1
            }
            return e.length > 0
        },
        hasPenContentChanged: function() {
            var e = this._diffPen(this, this.lastSavedPen);
            return delete e.editor_settings, Object.keys(e).length > 0
        },
        _diffPen: function(e, t) {
            return _diffObjects(t, e)
        },
        getSaveableCopyOfPen: function() {
            return _cloneDeep(PEN_CONSTANTS.DATA_ATTRIBUTES.reduce(((e, t) => (e[t] = this[t], e)), {}))
        }
    }), window.PenUnsavedMessage = Class.extend({
        $el: $("<div />", {
            class: "unsaved-editor-message"
        }).html(' unsaved changes <span class="dismiss"><svg class="icon-x" viewBox="0 0 100 100"><path d="M96.8 83.7L63.1 50l33.7-33.7c3.6-3.6 3.6-9.4 0-13.1s-9.5-3.6-13.1 0L50 36.9 16.3 3.2C12.7-.4 6.9-.4 3.2 3.2s-3.6 9.5 0 13.1L36.9 50 3.2 83.7c-3.6 3.6-3.6 9.4 0 13.1s9.5 3.6 13.1 0L50 63.1l33.7 33.7c3.6 3.6 9.4 3.6 13.1 0s3.6-9.5 0-13.1z"/></svg></span>'),
        $count: $("<b>0</b>"),
        currentCount: 0,
        countDismissedAt: 0,
        messageId: null,
        init: function() {
            this.show = $.proxy(this.show, this), this.hide = $.proxy(this.hide, this), this.update = $.proxy(this.update, this), this.$el.click(this.hide).prepend(this.$count), this._move = $.proxy(this._move, this), $("body").on("focusin", ".top-boxes .box", null, this._move)
        },
        update: function(e) {
            this.currentCount = e, e || (this.countDismissedAt = 0), (e - this.countDismissedAt) % 5 == 0 && this.show(), this.$count.text(e < 100 ? e : "100+")
        },
        show: function() {
            this.$el.delay(100).addClass("visible")
        },
        hide: function() {
            this.countDismissedAt = this.currentCount, this.$el.removeClass("visible")
        },
        _move: function(e) {
            var t = $(e.target ? ? ".CodeMirror-focused").closest(".box").find(".editor-actions-left");
            this.$el.parent().is(t) || t.delay(100).append(this.$el)
        }
    }), window.PenAutosave = Class.extend({
        autoSaveFunc: null,
        AUTOSAVE_TIMER: 2e4,
        _showedUserAutoSaveOnMessage: !1,
        _hasUserEverSaved: !1,
        _mobile: !1,
        liveChangesWOSave: 0,
        init: function() {
            this.autoSaveFunc = _.debounce(this._saveViaAutoSave, this.AUTOSAVE_TIMER, {
                leading: !1,
                trailing: !0
            }), this.unsavedMessage = new window.PenUnsavedMessage, this._bindToHub(), this._startAutoSave()
        },
        _bindToHub: function() {
            Hub.sub(HUB_EVENTS.PEN_LIVE_CHANGE, $.proxy(this._onLiveChange, this)), Hub.sub(HUB_EVENTS.PEN_SAVED, $.proxy(this._onSaved, this))
        },
        _startAutoSave: function() {
            this._penCanBeAutosaved() && this._conditionallyShowAutosavingNowMessage()
        },
        _onLiveChange: function() {
            this._penCanBeAutosaved() ? this._handleAutoSave() : this._handleNonAutoSave()
        },
        _handleAutoSave: function() {
            this.autoSaveFunc()
        },
        _saveViaAutoSave: function() {
            this._autoSavePenRightNow() && (CP.pen.autosavingNow = !0, CP.pen.save())
        },
        _autoSavePenRightNow: function() {
            return !$(".history").hasClass("active") && !CP.settingsController.settingsPaneVisible()
        },
        _handleNonAutoSave: function() {
            if (!CP.pen.isUserPenOwner()) return !1;
            this.liveChangesWOSave += 1, this.unsavedMessage.update(this.liveChangesWOSave);
            const e = $("#save, #update");
            this.liveChangesWOSave % 2 == 0 && e.removeClass("unsaved-wobble unsaved-grow"), (this.liveChangesWOSave + 10) % 20 == 0 && e.addClass("unsaved-wobble"), this.liveChangesWOSave % 20 == 0 && e.addClass("unsaved-grow"), (this.liveChangesWOSave + 15) % 30 == 0 && $.showMessage("There have been " + this.liveChangesWOSave + " changes without a save. Remember to save your work!", "slow")
        },
        _onSaved: function() {
            this.liveChangesWOSave = 0, this._hasUserEverSaved = !0, this._showPenSavedMessage(), this._conditionallyShowAutosavingNowMessage(), this.unsavedMessage.hide()
        },
        _showPenSavedMessage: function() {
            CP.pen.autosavingNow || (this.messageId && $.dismissMessage(this.messageId), this.messageId = $.showMessage(Copy.penUpdated, null, "success")), CP.pen.autosavingNow = !1
        },
        _conditionallyShowAutosavingNowMessage: function() {
            this._showedUserAutoSaveOnMessage || this._penCanBeAutosaved() && this._showAutoSaveOnMessage()
        },
        _showAutoSaveOnMessage: function() {
            this._showedUserAutoSaveOnMessage = !0, setTimeout((function() {
                $.showMessage(Copy.autoSavingNow, "slow")
            }), 1500)
        },
        _penCanBeAutosaved: function() {
            return !!this._userInitiatedSavePreviously() && (CP.user.isUserLoggedIn() && CP.pen.editor_settings.auto_save && CP.pen.getActiveSlugHash().length > 0 && !this._mobile)
        },
        _userInitiatedSavePreviously: function() {
            return this._referredFromNewPen() || this._hasUserEverSaved
        },
        _referredFromNewPen: function() {
            return !!document.referrer.match(/\/pen(\/)?$/)
        }
    }), window.PenResourcesData = {
        MIN_RESOURCES: 2,
        setResource: function(e, t) {
            this._setResourceURL(_.find(this.resources, {
                view_id: e
            }), t), this._postResourceChange()
        },
        updateResourcesOrder: function(e, t) {
            this._updateResourcesOrder(e, t), this._postResourceChange()
        },
        addEmptyResource: function(e) {
            this._addNewResource(e, ""), this._postResourceChange()
        },
        quickAddResource: function(e, t) {
            this._quickAddResource(e, t), this._postResourceChange(!0)
        },
        deleteResource: function(e) {
            this._deleteResource(e), this._postResourceChange()
        },
        getResourcesByType: function(e) {
            return _.select(this.resources, {
                resource_type: e
            })
        },
        setPenResources: function(e) {
            this.resources = e.pen.resources, this._postResourceChange()
        },
        _ensureResourcesValid: function() {
            this._ensureMinNumberOfResourcesForEachType(), this._storeResourcesByOrder(), this._ensureResourcesHaveViewIDs(), this._ensureResourcesHaveActions()
        },
        _ensureMinNumberOfResourcesForEachType: function() {
            this._ensureMinNumberOfResourcesForType("css"), this._ensureMinNumberOfResourcesForType("js")
        },
        _ensureMinNumberOfResourcesForType: function(e) {
            for (var t = this.MIN_RESOURCES - this.getResourcesByType(e).length, n = 0; n < t; n++) this.resources.push({
                resource_type: e,
                order: this.getNextMaxOrder(e),
                url: ""
            })
        },
        _ensureResourcesHaveViewIDs: function() {
            for (const e of this.resources) _.isUndefined(e.view_id) && (e.view_id = IDGenerator.generate())
        },
        _ensureResourcesHaveActions: function() {
            for (const e of this.resources) _.isUndefined(e.action) && (e.action = "include_" + e.resource_type + "_url")
        },
        _postResourceChange: function(e) {
            this._updateLastUpdated(), this._ensureResourcesValid(), this._publishResourcePenChange(e)
        },
        _quickAddResource: function(e, t) {
            var n = _.find(this.getResourcesByType(e), {
                url: ""
            });
            n ? this._setResourceURL(n, t) : this._addNewResource(e, t)
        },
        _setResourceURL: function(e, t) {
            e.url = t.replace(/\s+/, "")
        },
        _updateResourcesOrder: function(e, t) {
            for (var n = 0, i = this.resources.length; n < i; n++) this.resources[n].resource_type === e && (this.resources[n].order = t[this.resources[n].view_id]);
            this._storeResourcesByOrder()
        },
        _storeResourcesByOrder: function() {
            this.resources = _.sortBy(this.resources, "order")
        },
        _addNewResource: function(e, t) {
            this.resources.push({
                resource_type: e,
                order: this.getNextMaxOrder(e),
                url: t || "",
                view_id: IDGenerator.generate(),
                action: "include_" + e + "_url"
            })
        },
        getNextMaxOrder: function(e) {
            for (var t = 0, n = 0; n < this.resources.length; n++) {
                var i = this.resources[n];
                e === i.resource_type && t <= i.order && (t = i.order + 1)
            }
            return t
        },
        _deleteResource: function(e) {
            var t = _.findIndex(this.resources, {
                view_id: e
            });
            this.resources.splice(t, 1)
        },
        _publishResourcePenChange: function(e) {
            Hub.pub(HUB_EVENTS.PEN_CHANGE, {
                origin: "client",
                rebind: e,
                pen: {
                    resources: _cloneDeep(this.resources)
                }
            })
        }
    }, window.PenSaver = Class.extend({
        init: function() {
            this.pageType = window.__pageType, this._bindWarnAboutLostChanges = this._bindWarnAboutLostChanges.bind(this), window.addEventListener("keydown", this._bindWarnAboutLostChanges), window.addEventListener("click", this._bindWarnAboutLostChanges)
        },
        potentialLostWork: function() {
            return this._shouldWarnAboutLostWork()
        },
        _bindWarnAboutLostChanges: function() {
            window.addEventListener("beforeunload", $.proxy((function(e) {
                if (!this.skipWarning) return this._shouldWarnAboutLostWork() ? (e.preventDefault(), Copy.youHaveUnsavedChanges) : void 0
            }), this)), window.removeEventListener("keydown", this._bindWarnAboutLostChanges), window.removeEventListener("click", this._bindWarnAboutLostChanges)
        },
        _shouldWarnAboutLostWork: function() {
            const e = CP.pen.hasPenContentChanged();
            return "professor" === this.pageType ? e && this._isProfessorInProfessorRoom() : "collab" === this.pageType ? e && this._isPenOwnerInCollabRoom() : e
        },
        _isProfessorInProfessorRoom: function() {
            var e = !1;
            return "professor" === this.pageType && void 0 !== CP.professor && (e = !0), e
        },
        _isPenOwnerInCollabRoom: function() {
            return "collab" === this.pageType && CP.pen.isUserPenOwner()
        }
    }),
    function() {
        function e(e) {
            r($(e.target).closest("div.box").data("type"))
        }

        function t(e) {
            $("#error-bar-" + e.type).show()
        }

        function n(e, t) {
            const {
                errors: n
            } = t;
            a(), i("all"), o(n)
        }

        function i(e) {
            const t = u.includes(e) ? [e] : u;
            for (const e of t) s(e)
        }

        function s(e) {
            const t = CodeEditorsUtil.getEditorByType(e) || {};
            t && t.clearErrors && t.clearErrors()
        }

        function o(e) {
            const n = {};
            for (const i of e) {
                CodeEditorsUtil.getEditorByType(i.type).showError(i), t(i), i.show && (n[i.type] = !0)
            }
            for (const e of Object.keys(n)) r(e)
        }

        function r(e) {
            $("#box-" + e + " .inline-editor-error").removeClass("inline-error-hidden"), CodeEditorsUtil.getEditorByType(e).jumpToFirstError(), a(e), Hub.pub(HUB_EVENTS.PEN_EDITOR_REFRESH_REQUEST, {
                delay: 0
            })
        }

        function a(e) {
            e ? $("#error-bar-" + e).hide() : $(".error-bar").hide()
        }

        function c(e, t) {
            for (const e of Object.keys(CP.editors)) t[`${e}_pre_processor`] && i(e)
        }
        const {
            TYPES: u
        } = PEN_CONSTANTS;
        $(".error-icon").on("click", e), Hub.sub(HUB_EVENTS.PEN_EDITOR_ERRORS, n), Hub.sub(HUB_EVENTS.PEN_CHANGE, c), window.CP.clearEditorErrors = i
    }(),
    function() {
        function e(e) {
            try {
                const i = t(e),
                    {
                        topic: s,
                        data: o
                    } = i;
                switch (s) {
                    case HUB_EVENTS.PEN_ERROR_INFINITE_LOOP:
                        n(o);
                        break;
                    case HUB_EVENTS.CONSOLE_EVENT:
                        CP.ConsoleEditor.showIFrameConsoleMessages(o);
                        break;
                    case HUB_EVENTS.PEN_ERROR_RUNTIME:
                        r(o)
                }
            } catch {}
        }

        function t(e) {
            return "object" == typeof e.data && e.data.topic ? e.data : {}
        }

        function n(e) {
            const t = (e ? .line ? ? -1) >= 0 ? i(e.line) : -1,
                n = [{
                    level: LEVELS.ERROR,
                    line: t,
                    message: o(t),
                    syntax: CP.pen.js_pre_processor,
                    type: "js"
                }];
            window.CodePenTracking.trackEvent({
                eventName: "Infinite Loop Detected",
                eventTrigger: "Pen Editor Rendering"
            }), Hub.pub(HUB_EVENTS.PEN_EDITOR_ERRORS, {
                errors: n
            })
        }

        function i(e) {
            var t = s(e);
            t = t.replace(/\s+/g, "");
            return CP.pen.js.split(/\r\n?|\n/).map((e => e.replace(/\s+/g, ""))).indexOf(t) + 1
        }

        function s(e) {
            const t = a();
            let n = e;
            for (; n > -1 && t[n].match(/(break;|shouldStopExecution)/);) n -= 1;
            return t[n]
        }

        function o(e) {
            return e >= 0 ? "Infinite loop found around line " + e + ". The line number is approximated so look carefully. More details and workarounds at https://blog.codepen.io/2016/06/08/can-adjust-infinite-loop-protection-timing/" : "Infinite loop detected. Look carefully around your find possible problems. More details and workarounds at https://blog.codepen.io/2016/06/08/can-adjust-infinite-loop-protection-timing/"
        }

        function r(e) {
            const t = {
                errors: [{
                    level: LEVELS.ERROR,
                    line: e.line,
                    message: e.message,
                    type: "js"
                }]
            };
            Hub.pub(HUB_EVENTS.PEN_EDITOR_ERRORS, t), CP.ConsoleEditor.showIFrameConsoleMessages({
                function: "error",
                arguments: [`${e.message} \n at ${e.filename}:${e.line}`],
                complexity: 1
            })
        }

        function a() {
            const e = CP.getIFrameHTML();
            return window._splitOnNewLine(e)
        }
        window.addEventListener("message", e)
    }(), window.BunkerBox = {
        makeHeadSafe: function(e, t) {
            return e = e || "", "public" === (t = this._getSafeSandboxType(t)) && (e = e.replace(/<script.+/gim, "")), e = this.makeHTMLSafe(e, t)
        },
        makeHTMLSafe: function(e, t) {
            return e = e || "", t = this._getSafeSandboxType(t), e = (e = (e = (e = e.replace(/(<.*?\s)(autofocus=("|')autofocus("|')|autofocus)/g, "$1")).replace(/iframe.+src=.+(&#)/gim, "")).replace(/autoplay=true/gim, "autoPlay=false")).replace(/http-equiv="refresh"/gim, ""), e = this.makeJSSafe(e, t)
        },
        makeJSSafe: function(e, t) {
            return e = e || "", t = this._getSafeSandboxType(t), e = (e = e.replace(/location\.replace\s*\(\s*\)/gim, "location.removedByCodePen()")).replace(/location\.reload\s*\(\s*\)/gim, "location.removedByCodePen()"), "public" === t && (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = e.replace("beforeunloadreplacedbycodepen")).replace(/debugger(\s+)?;/gim, "")).replace(/console\.(\S+)\(([\S\s]*?)\);/gim, "")).replace(/(alert|confirm|prompt)\(([\S\s]*?)\);/gim, "")).replace(/geolocation/gim, "")).replace(/audiocontext/gim, "")).replace(/getusermedia/gim, "")).replace(/initmouseevent/gim, "")).replace(/download/gim, "")).replace(/\.click\(/gim, "")).replace(/yt.player/gim, "YT.CodePenRemovedPlayer")), this._isSandboxSupported() || (e = (e = (e = (e = (e = e.replace(/window(\s+)?\[(\s+)?(")l/gim, "")).replace(/self(\s+)?\[(\s+)?(")loc/gim, "")).replace(/\.submit\(\)/gim, "")).replace(/fromcharcode/gim, "")).replace(/\blocation(\s+)?=/gim, "")), e
        },
        _getSafeSandboxType: function(e) {
            return void 0 === e || "public" === e ? "public" : "personal"
        },
        _sandboxSupported: null,
        _isSandboxSupported: function() {
            return null === this._sandboxSupported && (this._sandboxSupported = this._determineIfSandboxIsSupported()), this._sandboxSupported
        },
        _determineIfSandboxIsSupported: function() {
            try {
                return "sandbox" in document.createElement("iframe")
            } catch {
                return !1
            }
        }
    },
    function() {
        function e(e) {
            const n = generateGuid(),
                i = o(e, n);
            return {
                html: t(e, i, n),
                js: i
            }
        }

        function t(e, t, i) {
            let o = "";
            if (t.content) {
                o = `<script ${r(t.content)?' type="module"':""} src="${t.url}" crossorigin></script>`
            }
            const u = "index.html",
                d = `${u}-${i}`,
                l = n(u, d);
            return {
                content: `\n<!DOCTYPE html>\n<html lang='en' class='${e.html_classes}'>\n\n<head>\n\n  <meta charset='UTF-8'>\n  <title>CodePen Demo</title>\n\n  <meta name="robots" content="noindex">\n\n  <link rel="shortcut icon" type="image/x-icon" href="${__favicon_shortcut_icon}">\n  <link rel="mask-icon" href="${__favicon_mask_icon}" color="#111">\n  <link rel="canonical" href="${document.location.href}">\n\n  ${e.head}\n  ${s(e.styles)}\n\n  <style id="${c}">\n    ${e.css}\n  </style>\n\n  ${a(e.scriptsForHead)}\n</head>\n\n<body>\n  ${BunkerBox.makeHTMLSafe(e.html,"personal")}\n  ${a(e.scripts)}\n  ${o}\n</body>\n\n</html>\n`.trim(),
                key: d,
                url: l
            }
        }

        function n(e, t) {
            const n = i(t),
                s = document.location.hash;
            return `${u.serve_url}/${e}${n}${s}`
        }

        function i(e) {
            return /\?/.test(document.location.search) ? `${document.location.search}&key=${e}` : `?key=${e}`
        }

        function s(e) {
            return e.reduce(((e, t) => (t.url ? e += `\n<link rel="stylesheet" href="${t.url}">` : t.content && (e += `\n<style>\n${t.content}\n</style>`), e)), "")
        }

        function o(e, t) {
            const n = "pen.js",
                i = `${n}-${t}`;
            return {
                content: BunkerBox.makeJSSafe(e.js, "personal"),
                key: i,
                url: `${u.serve_url}/${n}?key=${i}`
            }
        }

        function r(e) {
            return !(!e.includes("import") && !e.includes("export")) && (d.test(e) || l.test(e))
        }

        function a(e) {
            return e.reduce(((e, t) => (t.url ? e += `\n<script src="${t.url}"></script>` : t.content && (e += `\n<script>${t.content}</script>`), e)), "")
        }
        const {
            INLINE_PEN_STYLESHEET_ID: c
        } = PEN_CONSTANTS, u = window.__boomboom, d = /(?:import\s+(?:[^"'`]*from\s+)?["'`][^\n"'`]+["'`])/m, l = /export\s+(?:{|\*|let|const|default|function|class)/;
        window.CP.buildIFrameURL = n, window.CP.buildClassicPenHTML = e
    }(),
    function() {
        function e(e) {
            const n = "index.html",
                i = `${n}-${generateGuid()}`;
            return {
                html: {
                    content: t(e),
                    key: i,
                    url: window.CP.buildIFrameURL(n, i)
                }
            }
        }

        function t(e) {
            return `\n<!DOCTYPE html>\n<html lang='en' class='${e.html_classes}'>\n<head>\n  <meta charset="utf-8">\n  <title>Flutter Demo</title>\n\n  <meta name="robots" content="noindex">\n\n  <link rel="shortcut icon" type="image/x-icon" href="${__favicon_shortcut_icon}">\n  <link rel="mask-icon" href="${__favicon_mask_icon}" color="#111">\n  <link rel="canonical" href="${document.location.href}">\n\n  <style>\n      body {\n          font-size: 12pt;\n          margin: 0;\n          padding: 0;\n      }\n\n      h1, h2, h3, h4, h5, h6, p, label {\n          color: #FFFFFF;\n      }\n\n      h2 {\n          margin-top: 0;\n      }\n  </style>\n  <script>\n  /**\n * Copyright (c) 2021, the Dart project authors.  Please see the AUTHORS file\n * for details. All rights reserved. Use of this source code is governed by a\n * BSD-style license that can be found in the LICENSE file.\n */\n\nreplaceJavaScript = function (value) {\n    // Remove the old node.\n    var oldNode = document.getElementById('compiledJsScript');\n    if (oldNode && oldNode.parentNode) {\n        oldNode.parentNode.removeChild(oldNode);\n    }\n\n    // Create a new node.\n    var scriptNode = document.createElement('script');\n    scriptNode.setAttribute('id', 'compiledJsScript');\n    scriptNode.async = false;\n    scriptNode.text = value;\n    document.head.appendChild(scriptNode);\n};\n\n/**\n * Adds a script tag, with url as "src" and id as "id", unless a script tag with\n * that id already exists.\n *\n * Executes onload after the script has loaded, if the script did not already\n * exist, and executes onload immediately otherwise.\n */\naddScript = function (id, url, onload) {\n    let existingScript = document.getElementById(id);\n    if (existingScript && existingScript.parentNode) {\n        if (onload !== undefined) {\n            onload();\n        }\n        return;\n    }\n\n    let scriptNode = document.createElement('script');\n    scriptNode.setAttribute('id', id);\n    scriptNode.async = false;\n    if (onload !== undefined) {\n        scriptNode.onload = onload;\n    }\n    scriptNode.setAttribute('src', url);\n    document.head.appendChild(scriptNode);\n}\n\nremoveCanvaskit = function () {\n    var scripts = document.head.querySelectorAll('script');\n    for (var i = 0; i < scripts.length; i++) {\n        var script = scripts[i];\n        if (script.src.includes('canvaskit.js')) {\n            script.parentNode.removeChild(script);\n            return;\n        }\n    }\n}\n\n/**\n * Executes userJs, a user script, after first loading RequireJS.\n */\nexecuteWithRequireJs = function (userJs) {\n    addScript('require', 'require.js', function () {\n        // User script must be added after RequireJS loads.\n        replaceJavaScript(userJs);\n    });\n}\n\n/**\n * Handles any incoming messages.\n *\n * In particular, understands the following commands on e: 'setCss', 'setHtml',\n * and 'execute'.\n */\nmessageHandler = function (e) {\n    var obj = e.data;\n    var command = obj.command;\n    var body = document.body;\n\n    if (command === 'setCss') {\n        document.getElementById('styleId').innerHTML = obj.css;\n    } else if (command === 'setHtml') {\n        body.innerHTML = obj.html;\n    } else if (command === 'execute') {\n        // Replace HTML, CSS, possible Firebase JS, RequireJS, and app.\n        body.innerHTML = obj.html;\n        document.getElementById('styleId').innerHTML = obj.css;\n        if (obj.addRequireJs) {\n            executeWithRequireJs(obj.js);\n        } else {\n            replaceJavaScript(obj.js);\n        }\n    }\n};\n\nwindow.addEventListener('load', function () {\n    window.addEventListener('message', messageHandler, false);\n    parent.postMessage({ 'sender': 'frame', 'type': 'ready' }, '*');\n});\n  </script>\n\n  <style id="styleId"></style>\n\n  <script src="https://cdnjs.cloudflare.com/ajax/libs/require.js/2.3.6/require.min.js"></script>\n\n  <script id="compiledJsScript">\n    ${e.js}\n  </script>\n\n</head>\n\n<body></body>\n\n</html>`.trim()
        }
        window.CP.buildFlutterPenHTML = e
    }(),
    function() {
        function e(e) {
            const i = generateGuid(),
                s = n(e, i);
            return {
                html: t(e, s, i),
                js: s
            }
        }

        function t(e, t, n) {
            const r = "index.html",
                u = `${r}-${n}`,
                d = window.CP.buildIFrameURL(r, u);
            return {
                content: `<!DOCTYPE html>\n<html lang='en' class='${e.html_classes}'>\n\n<head>\n\n  <meta charset="utf-8">\n  <title>${e.title}</title>\n\n  <meta name="robots" content="noindex">\n\n  <link rel="shortcut icon" type="image/x-icon" href="${__favicon_shortcut_icon}">\n  <link rel="mask-icon" href="${__favicon_mask_icon}" color="#111">\n  <link rel="canonical" href="${document.location.href}">\n\n  ${e.head}\n  ${s(e.styles)}\n\n  ${o(e.scriptsForHead)}\n\n  </head>\n\n  <body>\n\n  <div id="${c}"></div>\n\n  ${o(e.scripts)}\n\n  <script type="module">\n    import ${a} from "${t.url}";\n\n    if ( !${a} ) {\n      throw new Error('Error compiling Vue component.');\n    }\n\n    ${i(e)}\n  </script>\n\n</body>\n</html>\n`.trim(),
                key: u,
                url: d
            }
        }

        function n(e, t) {
            const n = "pen.js",
                i = `${n}-${t}`;
            return {
                content: BunkerBox.makeJSSafe(e.js, "personal"),
                key: i,
                url: `${r.serve_url}/${n}?key=${i}`
            }
        }

        function i(e) {
            return "3" === e.js_library ? `var app = Vue.createApp(${a}).mount('#${c}');` : `var app = new Vue(${a}).$mount('#${c}');\n  Vue.config.devtools = true; /* Ensuring Dev Tools is enabled. */`
        }

        function s(e) {
            return e.reduce(((e, t) => (t.url ? e += `\n<link rel="stylesheet" href="${t.url}">` : t.content && (e += `\n<style>\n${t.content}\n</style>`), e)), "")
        }

        function o(e) {
            return e.reduce(((e, t) => (t.url ? e += `\n<script src="${t.url}"></script>` : t.content && (e += `\n<script>${t.content}</script>`), e)), "")
        }
        const r = window.__boomboom,
            a = "CodePenVueComponent",
            c = "app";
        window.CP.buildVuePenHTML = e
    }(),
    function() {
        function e(e) {
            return "flutter" === CP.editorConfig.id ? CP.buildFlutterPenHTML(e) : "vue" === CP.editorConfig.id ? CP.buildVuePenHTML(e) : CP.buildClassicPenHTML(e)
        }
        window.CP.buildPenHTML = e
    }(),
    function() {
        function e() {
            return Math.floor(65536 * (1 + Math.random())).toString(16).slice(1)
        }

        function t() {
            return e() + e() + "-" + e() + "-" + e() + "-" + e() + "-" + e() + e() + e()
        }
        window.generateGuid = t
    }(),
    function() {
        function e(e, n) {
            return t(e, n) ? e : n
        }

        function t(e, t) {
            return Array.isArray(t) ? Array.isArray(e) : null != e && typeof e == typeof t
        }

        function n(t, n, s) {
            const r = {
                    credentials: i,
                    headers: {
                        "Content-Type": "application/json",
                        "X-CSRF-Token": o(),
                        "X-Requested-With": "XMLHttpRequest"
                    },
                    method: t,
                    mode: i,
                    redirect: "follow",
                    referrerPolicy: i
                },
                a = e(s, {});
            if ("GET" === t) {
                n = `${n}?${new URLSearchParams(a).toString()}`.replace(/\?$/, "")
            } else r.body = JSON.stringify(a);
            return fetch(n, r)
        }
        const i = "same-origin",
            s = async e => {
                const {
                    params: t,
                    url: i
                } = e;
                return (await n("POST", i, t)).json()
            },
            o = () => document.querySelector('meta[name="csrf-token"]').getAttribute("content");
        window.simpleServerPostAsync = s
    }(),
    function() {
        function e() {
            $("#loading-text").remove()
        }

        function t(e, t) {
            for (var n = e.children("iframe"), i = 0, s = n.length; i < s; i++) n[i].id !== t && $(n[i]).remove();
            $("#" + t).removeClass("iframe-visual-update")
        }

        function n(n, i) {
            t(n, i), e()
        }

        function i(e, t) {
            e.prepend(o(t)), s(e, t)
        }

        function s(e, t) {
            let i = !1;
            const {
                key: s
            } = t.html;
            let o = setTimeout((function() {
                i || (n(e, s), i = !0)
            }), c);
            $("#" + s).load((function() {
                clearTimeout(o), i || (n(e, s), i = !0)
            }))
        }

        function o(e) {
            const {
                key: t,
                url: n
            } = e.html;
            return `<iframe id="${t}" src="${n}" ${l}></iframe>`
        }
        async function r(e) {
            const t = {
                data: {
                    files: Object.values(e)
                }
            };
            return simpleServerPostAsync({
                url: u.store_url,
                params: t
            })
        }
        async function a(e, t) {
            return await r(t), i(e, t), t.html.url
        }
        const c = 300,
            u = window.__boomboom,
            d = {
                allow: window.__CPDATA.iframe_allow,
                allowfullscreen: "true",
                allowpaymentrequest: "true",
                allowTransparency: "true",
                sandbox: window.__CPDATA.iframe_sandbox,
                class: "result-iframe iframe-visual-update",
                name: "CodePen",
                loading: "lazy"
            },
            l = Object.keys(d).map((e => `${e}="${d[e]}"`)).join(" ");
        window.IFrameRender = {
            updateIFramePreview: a
        }
    }(),
    function() {
        function e(e, i) {
            if (null === f) return f = _cloneDeep(e, !0), void a(e);
            if (n(e, i)) try {
                r(e)
            } catch {
                a(e)
            } else a(e);
            t()
        }

        function t() {
            h = Date.now()
        }

        function n(e, t) {
            if (t) return !1;
            if (i(e)) return !1;
            if (e.fullRefresh) return !1;
            var n = o(e, f);
            return f = _cloneDeep(e, !0), n
        }

        function i(e) {
            return !!s(e) || (e.css || "").match(/(keyframes|:target|animation|cp_dofullrefresh)/gi)
        }

        function s(e) {
            var t = e.html || "",
                n = e.css || "";
            return t.match(/svg/i) && n.match(/background/)
        }

        function o(e, t) {
            if (null === t) return !1;
            var n = _diffObjects(e, t);
            return delete n.css, delete n.fullRefresh, 0 === Object.keys(n).length
        }

        function r(e) {
            var t = document.querySelectorAll(".result-iframe");
            for (const n of t) {
                const t = {
                    action: HUB_EVENTS.IFRAME_PREVIEW_RELOAD_CSS,
                    css: e.css,
                    head: e.head
                };
                Hub.pub(HUB_EVENTS.IFRAME_PREVIEW_RELOAD_CSS, t), n.contentWindow.postMessage(t, "*")
            }
        }

        function a(e) {
            clearTimeout(_), _ = setTimeout((function() {
                c(e)
            }), p)
        }
        async function c(e) {
            const n = CP.buildPenHTML(e);
            window.CP.getIFrameHTML = () => n.html.content, l = await IFrameRender.updateIFramePreview(u, n);
            const i = {
                action: HUB_EVENTS.IFRAME_PREVIEW_URL_CHANGE,
                data: {
                    url: l,
                    head: e.head
                }
            };
            Hub.pub(HUB_EVENTS.IFRAME_PREVIEW_URL_CHANGE, i), t()
        }
        let u = $("#result_div, #result-box"),
            d = "",
            l = "",
            h = 0;
        const p = 700;
        let _ = 0,
            f = null;
        window.CP.getIFrameHTML = () => d, window.CP.getPenPreviewInfo = () => {
            let e = l;
            return e || (e = document.querySelectorAll("iframe")[0].src), {
                html: d,
                updatedAt: h,
                url: e
            }
        }, window.CP.updatePenEditorIFrame = e
    }(), window.PenActions = Class.extend({
        init: function() {
            this._bindToDOM()
        },
        _bindToDOM: function() {
            var e = $("body");
            e.on("click", "#save, #update, #save-details, #top-save-details", this._savePen), e.on("click", "#save-as-private", this._savePenAsPrivate), e.on("click", "#run", this._runPen), $("#pen-details-form")._on("submit", this._savePen, this), e.on("click", "#live-view-popout-button", this._liveViewPopout)
        },
        _savePen: function() {
            CP.pen.save()
        },
        _savePenAsPrivate: function() {
            CP.pen.saveAsPrivate()
        },
        _runPen: function() {
            CP.renderPen(!0)
        },
        _liveViewPopout: function() {
            window.open($("#live-link").attr("href")), Hub.pub(HUB_EVENTS.PEN_EDITOR_SIZES_CHANGE, {
                editor: "1"
            })
        }
    }),
    function() {
        function e() {
            t(), n(), r(), u()
        }

        function t() {
            "vim" === CP.pen.editor_settings.key_bindings && (CodeMirror.commands.save = function() {
                CP.pen.save()
            })
        }

        function n() {
            $("body").on("click", ".keyboard-commands-button", i), l.on("click", o)
        }

        function i(e) {
            e && e.preventDefault(), h ? o() : s()
        }

        function s() {
            h || 0 === d.length || (d.show(), CP.showPopupOverlay(), h = !0, Hub.pub(HUB_EVENTS.POPUP_OPEN, p))
        }

        function o() {
            h && 0 !== d.length && (d.hide(), CP.hidePopupOverlay(), h = !1, Hub.pub(HUB_EVENTS.POPUP_CLOSE, p))
        }

        function r() {
            Hub.sub(HUB_EVENTS.KEY_PRESS, a), Hub.sub(HUB_EVENTS.POPUP_OPEN, c)
        }

        function a(e, t) {
            "esc" === t.key && o()
        }

        function c(e, t) {
            t !== p && o()
        }

        function u() {
            function e(e, t) {
                let n;
                if ("classic" === CP.editorConfig.config.id) n = CP.editors[e];
                else {
                    let e = Object.keys(CP.editors);
                    n = CP.editors[e[t]]
                }
                return n && n.editor
            }
            Keytrap.bind("comctrl+s", (function() {
                if ("collab" !== window.__pageType && "professor" !== window.__pageType || CP.pen.isUserPenOwner()) {
                    var e = $(".inline-title-input");
                    e.is(":focus") ? e.trigger("blur") : CP.pen.save()
                }
            }), !0), Keytrap.bind("comctrl+shift+s", (function() {
                CP.pen.saveAsPrivate()
            }), !0), Keytrap.bind("comctrl+p", (function() {
                window.location = "/pen"
            }), !0), Keytrap.bind("comctrl+shift+7", (function() {
                CP.renderPen(!0)
            }), !0), Keytrap.bind("comctrl+shift+0", (function() {
                if (CP.pen.hashid) {
                    var e = document.location.href.replace("/pen/", "/debug/");
                    window.open(e)
                }
            }), !0), Keytrap.bind("comctrl+alt+1", (() => {
                let t = e("html", 0);
                t && t.focus()
            }), !0), Keytrap.bind("comctrl+alt+2", (() => {
                let t = e("css", 1);
                t && t.focus()
            }), !0), Keytrap.bind("comctrl+alt+3", (() => {
                let t = e("js", 2);
                t && t.focus()
            }), !0), Keytrap.bind("comctrl+alt+4", (() => {
                CP.EditorLayout.toggleConsole(), $(".console-command-line-input").focus()
            }), !0), Keytrap.bind("comctrl+alt+0", (() => {
                $(".result-iframe").focus()
            }), !0), "vim" !== CP.pen.editor_settings.key_bindings && Keytrap.bind("esc", (() => {
                for (var e in CP.editors)
                    if (CP.editors[e].hasFocus()) {
                        CP.editors[e].hasSelection() ? CP.editors[e].clearSelection() : $("#settings-pane-" + CP.editors[e].type).focus();
                        break
                    }
            }), !0), Keytrap.bind("comctrl+shift+f", (e => {
                for (var t in CP.editors)
                    if (CP.editors[t].hasFocus()) {
                        e.preventDefault(), CP.formatter.formatType(CP.editors[t].type);
                        break
                    }
            }), !0), Keytrap.bind("comctrl+shift+p", (e => {
                for (var t in CP.editors)
                    if (CP.editors[t].hasFocus()) {
                        e.preventDefault(), CP.editors[t].showCommands();
                        break
                    }
            }), !0), Keytrap.bind("comctrl+shift+9", $.proxy((function() {
                i()
            }), this), !0), Keytrap.bind("comctrl+i", (function() {
                CP.settingsController.toggleSettingsPane()
            }), !0), Keytrap.bind("comctrl+shift+.", (function() {
                CP.editors.html && CP.editors.html.hasFocus() && CP.editors.html.editor.execCommand("closeTag")
            }), !0)
        }
        Hub.sub(HUB_EVENTS.PEN_EDITOR_LOADED, e);
        var d = $("#keycommands"),
            l = $("#popup-overlay"),
            h = !1,
            p = "keyCommands"
    }(),
    function() {
        async function e(e, n) {
            const i = CP.pen[`${n}_pre_processor`];
            if (await CP.ensureProcessingRunOnce(), window.CP.getHasErrorsThatPreventDisplayState()) {
                const e = r(i, n);
                return void $.showMessage(`Unable to analyze ${e}. Fix errors and try again.`, a, "error")
            }
            Hub.pub(HUB_EVENTS.LINTER_START), CP.clearEditorErrors(n);
            const u = await t(i, n);
            if (CP.pen.setLintErrors(u), 0 === u.length && e === c) return o(i, n), void Hub.pub(HUB_EVENTS.LINTER_FINISH);
            const d = s(u, i, n);
            Hub.pub(HUB_EVENTS.PEN_EDITOR_ERRORS, {
                errors: d
            }), Hub.pub(HUB_EVENTS.LINTER_FINISH)
        }
        async function t(e, t) {
            try {
                const s = [{
                    id: t,
                    syntax: "none" === e ? t : e,
                    textInput: await n(e, t),
                    processors: ["lint-1"]
                }];
                return i(await simpleServerPostAsync({
                    url: "/cpe/process",
                    params: s
                }))
            } catch (e) {
                return console.error(e), []
            }
        }
        async function n(e, t) {
            return "flutter" === e ? CP.pen.js : CP.getProcessedBodyByType(t)
        }

        function i(e) {
            let {
                data: t,
                errors: n
            } = e;
            t = window._makeSafe(t, []);
            return [...n, ...(t[0] || {
                errors: []
            }).errors]
        }

        function s(e, t, n) {
            return e.map((e => {
                const i = 1 * e.line,
                    s = "boolean" != typeof e.show || e.show;
                return {
                    level: LEVELS.ERROR,
                    line: Number.isInteger(i) ? i : 0,
                    message: e.message,
                    show: s,
                    syntax: t,
                    type: n
                }
            }))
        }

        function o(e, t) {
            const n = r(e, t);
            $.showMessage(`We couldn't find any errors in your ${n}. Rejoice!`, a, "success")
        }

        function r(e, t) {
            const n = CP.editorConfig.getProcessor(e, t);
            return "none" === e ? t.toUpperCase() : n.name
        }
        const a = 1500,
            c = "demand";
        window.CP.linter = {
            lintType: e
        }
    }(),
    function() {
        function e() {
            const e = CP.editorConfig.getLinterById(CP.editorConfig.id);
            for (const i of e.runOn) "demand" === i.eventType ? t() : "change" === i.eventType && n(i)
        }

        function t() {
            for (const e of CP.editorTypes) $(`#analyze-${e}`).on("click", (() => s(c, e))), $(document).on("click", `#clear-${e}-errors`, (t => o(t, e)))
        }

        function n(e) {
            const t = _.debounce(i, e.intervalMS, {
                leading: !1,
                maxWait: e.intervalMaxWaitMS
            });
            Hub.sub(HUB_EVENTS.PEN_CHANGE, t)
        }

        function i(e, t) {
            "js" in t.pen && s(a, "js")
        }

        function s(e, t) {
            r(), CP.linter.lintType(e, t)
        }

        function o(e, t) {
            e.preventDefault(), CP.clearEditorErrors(t), r()
        }

        function r() {
            $.hideMessage(), Hub.pub(HUB_EVENTS.POPUP_CLOSE)
        }
        Hub.sub(HUB_EVENTS.PEN_EDITOR_LOADED, e);
        const a = "change",
            c = "demand"
    }(),
    function() {
        function e(e, s, o) {
            return {
                css: o.css.textOutput,
                head: s.head,
                html_classes: s.html_classes,
                html: o.html.textOutput,
                js: o.js.textOutput,
                scripts: n(e, s),
                scriptsForHead: t(s),
                styles: i(e, s)
            }
        }

        function t(e) {
            const t = [{
                resource_type: "js",
                order: 0,
                url: window.__user ? .cohorts ? .includes("infinite_loop_heartbeat") ? __path_to_infinite_loop_detection : __path_to_stop_execution_on_timeout
            }, {
                resource_type: "js",
                order: 1,
                url: __path_to_iframe_console_runner
            }, {
                resource_type: "js",
                order: 2,
                url: __path_to_iframe_refresh_css
            }, {
                resource_type: "js",
                order: 3,
                url: __path_to_iframe_runtime_errors
            }];
            return "prefixfree" === e.css_prefix && t.push({
                resource_type: "js",
                order: t.length,
                url: __pen_prefix_free_url
            }), t
        }

        function n(e, t) {
            return s("js", t.resources, e.js)
        }

        function i(e, t) {
            const n = s("css", t.resources, e.css);
            return "normalize" === t.css_starter ? n.push({
                action: "include_css_url",
                order: n.length,
                resource_type: "css",
                url: __pen_normalize_css_url
            }) : "reset" === t.css_starter && n.push({
                action: "include_css_url",
                order: n.length,
                resource_type: "css",
                url: __pen_reset_css_url
            }), n
        }

        function s(e, t, n) {
            const i = [...r(e, t, n), ...a(e, n)];
            return i.sort(o), i
        }

        function o(e, t) {
            return e.order - t.order
        }

        function r(e, t, n) {
            return t.filter((t => t.resource_type === e && !n[t.url] && t.url)).map((e => ({
                order: e.order,
                type: e.resource_type,
                url: e.url
            })))
        }

        function a(e, t) {
            return Object.values(t).filter((e => !e.par)).map((t => ({
                order: t.order,
                type: e,
                url: t.source.body
            })))
        }
        window.CP.buildClassicDisplayPen = e
    }(),
    function() {
        function e(e, n, i) {
            return {
                css: "",
                head: "",
                html_classes: "",
                html: "",
                js: t(i),
                scripts: [],
                scriptsForHead: [],
                styles: []
            }
        }

        function t(e) {
            const {
                metadata: t,
                textOutput: o
            } = e.js;
            return `\n${n()}\n${i(t.modulesBaseUrl)}\n${o}\n${s()}\n    `.trim()
        }

        function n() {
            return "\n  // POST MESSAGE PRINT\n  var testKey = '__TESTRESULT__';\n\n\nfunction dartPrint(message) {\n  if (message.startsWith(testKey)) {\n    var resultMsg = JSON.parse(message.substring(testKey.length));\n    resultMsg.sender = 'frame';\n    resultMsg.type = 'testResult';\n    parent.postMessage(resultMsg, '*');\n  } else {\n    parent.postMessage(\n      {'sender': 'frame', 'type': 'stdout', 'message': message.toString()}, '*');\n  }\n}\n// Unload previous version.\nrequire.undef('dartpad_main');\n\n  // ExceptionHandler\nvar _thrownDartMainRunner = false;\n\nwindow.onerror = function(message, url, lineNumber, colno, error) {\n  if (!_thrownDartMainRunner) {\n    var errorMessage = '';\n    if (error != null) {\n      errorMessage = 'Error: ' + error;\n    }\n    parent.postMessage(\n      {'sender': 'frame', 'type': 'stderr', 'message': message + errorMessage}, '*');\n  }\n  _thrownDartMainRunner = false;\n};\n    ".trim()
        }

        function i(e) {
            return `\nrequire.config({\n  "baseUrl": "${e}",\n  "waitSeconds": 60\n});\n    `.trim()
        }

        function s() {
            return '\n    require([\'dart_sdk\'],\n    function(sdk) {\n      \'use strict\';\n      sdk.developer._extensions.clear();\n      sdk.dart.hotRestart();\n  });\n\n  require(["dartpad_main", "dart_sdk"], function(dartpad_main, dart_sdk) {\n      // SDK initialization.\n      dart_sdk.dart.setStartAsyncSynchronously(true);\n      dart_sdk._isolate_helper.startRootIsolate(() => {}, []);\n\n      // TODO: simplify this once we are firmly in a post Flutter 1.24 world.\n      for (var prop in dartpad_main) {\n            if (prop.endsWith("bootstrap")) {\n              dartpad_main[prop].main();\n            }\n      }});\n    '
        }
        window.CP.buildFlutterDisplayPen = e
    }(),
    function() {
        function e(e, n, i) {
            const s = CP.buildClassicDisplayPen(e, n, i);
            return Object.assign(s, {
                html: "",
                css: "",
                js: i.js.textOutput,
                js_library: n.js_library,
                scriptsForHead: t(s.scriptsForHead, n)
            })
        }

        function t(e = [], t) {
            let n = "https://unpkg.com/vue@2/dist/vue.js";
            return "3" === t.js_library && (n = "https://unpkg.com/vue@3/dist/vue.runtime.global.js"), e.push({
                resource_type: "js",
                order: 9999,
                url: n
            }), e
        }
        window.CP.buildVueDisplayPen = e
    }(),
    function() {
        function e(e, t, n) {
            return "flutter" === CP.editorConfig.id ? CP.buildFlutterDisplayPen(e, t, n) : "vue" === CP.editorConfig.id ? CP.buildVueDisplayPen(e, t, n) : CP.buildClassicDisplayPen(e, t, n)
        }
        window.CP.buildDisplayPen = e
    }(),
    function() {
        function e(e) {
            return (e || "").match(/(\[{3}\S+\..{2,10}\/\S+\/pen\/(\S{5,})]{3})/gm) || []
        }

        function t(e, t) {
            return t.reduce(((t, s) => (s.par && "html" === s.source.type && (t = t.replace(n(s), i(e, s))), t)), e)
        }

        function n(e) {
            const t = e.id.replace(/\//g, "\\/").replace(/\[/g, "\\[").replace(/]/g, "\\]");
            return new RegExp(t, "g")
        }

        function i(e, t) {
            const n = s(e, t.id);
            return n ? (t.source.body || "").split(/\r|\n/).join(n) : t.source.body
        }

        function s(e, t) {
            const n = "(\\s+)?" + t.replace(/\[/g, "\\[").replace(/\//g, "\\/").replace(/]/g, "\\]"),
                i = new RegExp(n, "mg").exec(e);
            return i ? i[1] : ""
        }
        window.PARTemplates = {
            findTemplates: e,
            renderTemplates: t
        }
    }(),
    function() {
        async function e(e) {
            return t(await n(e), r(e))
        }

        function t(e, t) {
            const n = {
                html: {},
                css: {},
                js: {}
            };
            for (const t of e) n[t.source.type][t.id] = t;
            for (const e of t) n[e.source.type][e.id] || (n[e.source.type][e.id] = e);
            return n
        }
        async function n(e) {
            const t = i(e);
            if (t.pen.pars.length > 0) {
                return (await AJAXUtil.postAsync("/pens_as_resources", {
                    data: JSON.stringify(t)
                })).pars
            }
            return []
        }

        function i(e) {
            const t = [...s(e), ...o(e)];
            return {
                pen: {
                    html_pre_processor: e.html_pre_processor,
                    css_pre_processor: e.css_pre_processor,
                    js_pre_processor: e.js_pre_processor,
                    pars: t
                }
            }
        }

        function s(e) {
            return PARTemplates.findTemplates(e.html).map((e => ({
                id: e,
                order: 0,
                input: {
                    body: e,
                    type: "html"
                }
            })))
        }

        function o(e) {
            return e.resources.filter((t => !c(e, t) && (u(t.url) || d(t.url)))).map((e => ({
                id: e.url,
                order: e.order,
                input: {
                    body: e.url,
                    type: e.resource_type
                }
            })))
        }

        function r(e) {
            return e.resources.filter((e => u(e.url))).map((e => ({
                id: e.url,
                order: e.order,
                par: !1,
                source: {
                    body: a(e.url, e.resource_type),
                    syntax: e.resource_type,
                    type: e.resource_type
                }
            })))
        }

        function a(e, t) {
            return `${(e||"").split("?").shift().replace(/\/$/,"").replace(/\..{2,10}$/,"")}.${t}`
        }

        function c(e, t) {
            const {
                resource_type: n
            } = t;
            return "none" === e[`${n}_pre_processor`]
        }

        function u(e) {
            return /\S+\..{2,10}\/\S+\/pen\/(\w{5,})/i.test(e)
        }

        function d(e) {
            if (!e || !CP.editorConfig.isValidEditorType("css")) return !1;
            const t = CP.editorConfig.getConfigByType("css");
            if (!t.parSuffixes) return !1;
            const n = e.split(".").pop();
            return t.parSuffixes.includes(n)
        }
        window.CP.processPARs = e
    }(),
    function() {
        async function e(e) {
            const n = await CP.processPARs(e),
                s = r(e, n),
                a = t(s),
                c = await CP.processPenRequest(s, a);
            return {
                errors: i(c, e),
                logs: o(c),
                parsHash: n,
                processedPen: c
            }
        }

        function t(e) {
            const t = {};
            for (const i of _) {
                const s = e[i];
                n(s) && (t[i] = s)
            }
            return t
        }

        function n(e) {
            return "babel" === e.syntax || !!e.textInput && ("none" !== e.syntax || Object.keys(e.options).length > 0)
        }

        function i(e, t) {
            return [...Object.values(e).reduce(((e, n) => {
                const i = n.id,
                    s = _makeSafe(n.errors, []);
                for (const n of s) {
                    const s = n.info || {};
                    e.push({
                        code: n.code || ERRORS.ERROR,
                        level: s.level || LEVELS.ERROR,
                        line: n.line || s.line || 1,
                        message: n.message,
                        syntax: t[`${i}_pre_processor`],
                        type: i,
                        info: s
                    })
                }
                return e
            }), []), ...s(t)]
        }

        function s(e) {
            return f.map((t => t(e))).filter(Boolean).flat()
        }

        function o(e) {
            return Object.values(e).reduce(((e, t) => {
                const n = t.id;
                return [...e, ..._makeSafe(t.logs, []).map((e => Object.assign({}, e, {
                    type: n
                })))]
            }), [])
        }

        function r(e, t) {
            return {
                html: a(e, t),
                css: c(e, t),
                js: d(e, t)
            }
        }

        function a(e, t) {
            const n = PARTemplates.renderTemplates(e.html, Object.values(t.html));
            return Object.assign({}, p(e, "html"), {
                textInput: n
            })
        }

        function c(e, t) {
            const n = p(e, "css"),
                i = l("css", t.css);
            return n.textInput = `${i}${e.css}`, "scss" !== n.syntax && "sass" !== n.syntax || (n.version = u(n.textInput)), "autoprefixer" === e.css_prefix && (n.options[e.css_prefix] = !0), n
        }

        function u(e) {
            var t = "string" == typeof e ? e : "";
            return /@import\s+('|")?compass('|")?/i.test(t) ? g : "default"
        }

        function d(e, t) {
            const n = p(e, "js"),
                i = l("js", t.js);
            return n.textInput = `${i}${e.js}`, n.options = {
                detectInfiniteLoops: !0
            }, "vue" === n.syntax && e.js_library && (n.version = e.js_library), n
        }

        function l(e, t) {
            const n = Object.values(t).filter((t => t.par && t.source.type === e));
            return n.sort(h), n.map((e => e.source.body)).join("\n")
        }

        function h(e, t) {
            return e.order - t.order
        }

        function p(e, t) {
            return {
                contentType: t,
                id: t,
                options: {},
                syntax: e[`${t}_pre_processor`],
                version: "default"
            }
        }
        const {
            TYPES: _
        } = PEN_CONSTANTS;
        CP.processPen = e, Hub.sub(HUB_EVENTS.PEN_EDITOR_LOADED, (function() {
            if (CP.user.ownsItem(CP.pen)) {
                const e = CP.pen.getProcessablePenCopy(),
                    t = _makeSafe(s(e), []);
                if (t.length > 0) return Hub.pub(HUB_EVENTS.PEN_EDITOR_ERRORS, {
                    errors: t
                }), {
                    errors: t,
                    logs: []
                }
            }
        }));
        const f = [function(e) {
                const t = _makeSafe(e.html, "");
                if (/^<!doctype/i.test(t)) return {
                    code: "",
                    info: "",
                    level: LEVELS.WARNING,
                    line: 0,
                    message: "Just HTML that goes in the <body> goes here.",
                    link: {
                        target: "https://blog.codepen.io/documentation/features/preview-template/",
                        value: "Learn more"
                    },
                    syntax: e.html_pre_processor,
                    type: "html"
                }
            }],
            g = "3.4.22"
    }(),
    function() {
        async function e(e, n) {
            a(n);
            const i = r(e, await t(n));
            return c(n, i), i
        }
        async function t(e) {
            const t = n(e),
                {
                    cached: r,
                    uncached: a
                } = i(t, e),
                c = await s(a);
            return o(t, c), Object.assign({}, r, c)
        }

        function n(e) {
            return Object.values(e).reduce(((e, t) => (e[t.id] = ProcessorRouter.hashObject(t), e)), {})
        }

        function i(e, t) {
            const n = {},
                i = {};
            for (const s of Object.keys(e)) {
                const o = e[s].key;
                d[o] ? n[s] = JSON.parse(d[o]) : i[s] = t[s]
            }
            return {
                cached: n,
                uncached: i
            }
        }
        async function s(e) {
            if (0 === Object.keys(e).length) return e;
            const {
                payload: t
            } = await ProcessorRouter.process(e);
            return t
        }

        function o(e, t) {
            for (const n of Object.values(t)) {
                const t = e[n.id].key;
                d[t] = JSON.stringify(n), l.unshift(t)
            }
            l.length < h || (l = l.slice(0, h / 2), d = l.reduce(((e, t) => (e[t] = d[t], e)), {}))
        }

        function r(e, t) {
            const n = {};
            for (const i of u) t[i] ? n[i] = t[i] : n[i] = {
                contentType: i,
                errors: [],
                id: i,
                logs: [],
                metadata: {},
                syntax: e[i].syntax,
                textOutput: e[i].textInput
            };
            return n
        }

        function a(e) {
            for (const t of Object.keys(e)) Hub.pub(HUB_EVENTS.PROCESSING_START, {
                type: t
            })
        }

        function c(e, t) {
            for (const n of Object.keys(e)) {
                const e = t[n];
                Hub.pub(HUB_EVENTS.PROCESSING_FINISH, {
                    body: e.textOutput,
                    type: n
                })
            }
        }
        const {
            TYPES: u
        } = PEN_CONSTANTS;
        let d = {},
            l = [];
        const h = 50;
        CP.processPenRequest = e
    }(),
    function() {
        async function e(e) {
            if (CP.pen.processingDisabled()) return;
            l = !1;
            const i = CP.pen.getProcessablePenCopy(),
                s = await CP.processPen(i),
                {
                    errors: o,
                    logs: r,
                    parsHash: a,
                    processedPen: c
                } = s;
            l = n(o), l || (t(a, i, c, e), d = c), Hub.pub(HUB_EVENTS.PEN_EDITOR_ERRORS, {
                errors: o
            }), Hub.pub(HUB_EVENTS.PEN_LOGS, {
                logs: r
            })
        }

        function t(e, t, n, i) {
            Hub.pub(HUB_EVENTS.PEN_PREVIEW_START);
            const s = CP.buildDisplayPen(e, t, n);
            Hub.pub(HUB_EVENTS.PEN_LIVE_CHANGE, s), CP.updatePenEditorIFrame(s, i), setTimeout((() => {
                Hub.pub(HUB_EVENTS.PEN_PREVIEW_FINISH)
            }), h)
        }

        function n(e) {
            return Object.values(e).find((e => e.level === LEVELS.ERROR))
        }

        function i(e, t) {
            CP.pen.editor_settings.auto_run && s(t.pen) && u()
        }

        function s(e) {
            return Object.keys(e).filter((e => PEN_CONSTANTS.PREVIEW_ATTRIBUTES.indexOf(e))).length > 0
        }

        function o() {
            return 1 === window.__item.user_id || !window.__item.hashid && (CP.pen.html || CP.pen.css || CP.pen.js)
        }
        async function r(t) {
            return "none" === CP.pen[`${t}_pre_processor`] ? CP.pen[t] : (null === d && await e(), d ? (d[t] || {
                textOutput: ""
            }).textOutput : "")
        }
        async function a() {
            null === d && await e()
        }
        async function c() {
            o() && await e()
        }
        let u, d = null,
            l = !1;
        const h = 1200;
        window.CP.renderPen = u = _.debounce(e, CP.editorConfig.preview.intervalMS, {
            leading: !1,
            maxWait: CP.editorConfig.preview.intervalMaxWaitMS
        }), window.CP.ensureProcessingRunOnce = a, window.CP.getProcessedBodyByType = r, window.CP.getHasErrorsThatPreventDisplayState = () => l, Hub.sub(HUB_EVENTS.PEN_CHANGE, i), Hub.sub(HUB_EVENTS.CONSOLE_OPENED, u), Hub.sub(HUB_EVENTS.PEN_EDITOR_LOADED, c)
    }(), window.BaseSettingsController = Class.extend({
        setItemValue: function(e) {
            this.pen.setItemValue(e)
        },
        syncWithServer: function(e) {
            this.model.syncWithServer(e)
        }
    }), window.BaseSettingsEvents = Class.extend({
        type: "",
        _canDrive: !0,
        init: function(e) {
            this.controller = e, _.extend(this, EnableDisableDriver), this.bindToEnableDisableHubEvents()
        },
        _setItemValue: function(e) {
            this.controller.setItemValue(this._buildBasicData(e))
        },
        _setItemValueFromServer: function(e) {
            this.controller.setItemValue(e)
        },
        _onServerPenChange: function(e, t) {
            this.controller.setItemValue(t)
        },
        _buildBasicData: function(e) {
            return {
                origin: "client",
                pen: e
            }
        }
    }), window.BehaviorController = BaseSettingsController.extend({
        init: function(e) {
            this.pen = e, this.events = new BehaviorEvents(this), this.view = new BehaviorView(e)
        }
    }), window.BehaviorEvents = BaseSettingsEvents.extend({
        $autoSave: $("#auto-save"),
        $autoRun: $("#auto-run"),
        $tabSize: $("#tab-size"),
        $indentWith: $("input[name='indent-with']"),
        $formatOnSave: $("#format_on_save"),
        init: function(e) {
            this._super(e), _.extend(this, EnableDisableDriver), this.bindToEnableDisableHubEvents(), this._bindToDOM(), this._bindToHub()
        },
        _bindToDOM: function() {
            this.$autoSave._on("click", this._setAutoSave, this, !0), this.$formatOnSave._on("click", this._setFormatOnSave, this, !0), this.$autoRun._on("click", this._setAutoRun, this, !0), this.$tabSize._on("change", this._onTabSizeChange, this), this.$indentWith._on("click", this._setIndentWith, this, !0)
        },
        _bindToHub: function() {
            Hub.sub(HUB_EVENTS.PEN_CHANGE_SERVER, $.proxy(this._onServerPenChange, this))
        },
        _onServerPenChange: function(e, t) {
            ObjectUtil.hasNestedValue(t, "pen.editor_settings") && this._setItemValueFromServer(t)
        },
        _setItemValueAndUI: function(e) {
            Hub.pub(HUB_EVENTS.PEN_EDITOR_UI_CHANGE, e), this._setItemValue(e)
        },
        _setAutoSave: function(e, t) {
            this._canDrive && this._setItemValueAndUI(this._buildSettingsPenData("auto_save", t.is(":checked")))
        },
        _setFormatOnSave: function(e, t) {
            this._canDrive && this._setItemValueAndUI(this._buildSettingsPenData("format_on_save", t.is(":checked")))
        },
        _setAutoRun: function(e, t) {
            this._canDrive && this._setItemValue(this._buildSettingsPenData("auto_run", t.is(":checked")))
        },
        _setIndentWith: function() {
            this._canDrive && this._setItemValue(this._buildSettingsPenData("indent_with", $("input[name='indent-with']:checked").val()))
        },
        _onTabSizeChange: function(e, t) {
            this._canDrive && this._setItemValue(this._buildSettingsPenData("tab_size", this._validTabSize(t.val())))
        },
        _validTabSize: function(e) {
            var t = 1 * e;
            return t < 0 || t > 6 ? "1" : e
        },
        _buildSettingsPenData: function(e, t) {
            var n = {
                editor_settings: {}
            };
            return n.editor_settings[e] = t, n
        },
        _getAllUIElements: function() {
            return [this.$autoSave, this.$autoRun, this.$tabSize, this.$indentWith]
        }
    }), window.BehaviorView = Class.extend({
        $body: $("body"),
        $autoSave: $("#auto-save"),
        $formatOnSave: $("#format_on_save"),
        $autoRun: $("#auto-run"),
        $tabSize: $("#tab-size"),
        $indentWithTypeSpaces: $("#indent-with-spaces"),
        $indentWithTypeTabs: $("#indent-with-tabs"),
        init: function(e) {
            this._bindToHub(), this._handlePenChange(e)
        },
        _bindToHub: function() {
            Hub.sub(HUB_EVENTS.PEN_CHANGE, $.proxy(this._onPenChange, this)), Hub.sub(HUB_EVENTS.PEN_EDITOR_UI_CHANGE, $.proxy(this._onPenChange, this))
        },
        _onPenChange: function(e, t) {
            this._handlePenChange(t.pen)
        },
        _handlePenChange: function(e) {
            ObjectUtil.hasNestedValue(e, "editor_settings.auto_run") && this._setAutoRun(e.editor_settings.auto_run), ObjectUtil.hasNestedValue(e, "editor_settings.auto_save") && this._setAutoSave(e.editor_settings.auto_save), ObjectUtil.hasNestedValue(e, "editor_settings.format_on_save") && this._setFormatOnSave(e.editor_settings.format_on_save), ObjectUtil.hasNestedValue(e, "editor_settings.indent_with") && this._setIndentWithType(e.editor_settings.indent_with), ObjectUtil.hasNestedValue(e, "editor_settings.tab_size") && this._setTabSize(e.editor_settings.tab_size)
        },
        _setAutoRun: function(e) {
            e ? (this.$autoRun.prop("checked", !0), this.$body.removeClass("show-run-button")) : (this.$autoRun.prop("checked", !1), this.$body.addClass("show-run-button"))
        },
        _setFormatOnSave: function(e) {
            this.$formatOnSave.prop("checked", e)
        },
        _setAutoSave: function(e) {
            this.$autoSave.prop("checked", e)
        },
        _setIndentWithType: function(e) {
            "tabs" === e ? (this.$indentWithTypeTabs.prop("checked", !0), this.$indentWithTypeSpaces.prop("checked", !1)) : (this.$indentWithTypeTabs.prop("checked", !1), this.$indentWithTypeSpaces.prop("checked", !0))
        },
        _setTabSize: function(e) {
            this.$tabSize.val(e)
        }
    }), window.CSSSettingsController = BaseSettingsController.extend({
        init: function(e) {
            CP.editorConfig.isValidEditorType("css") && (this.pen = e, this.events = new CSSSettingsEvents(this), this.model = new CSSSettingsModel, this.view = new CSSSettingsView(e), this.resourcesController = new ResourcesController("css"))
        },
        showAddons: function(e) {
            this.model.showAddons(e)
        },
        hideAddons: function(e) {
            this.model.hideAddons(e)
        },
        syncWithServer: function(e) {
            this.model.syncWithServer(e)
        }
    }), window.CSSSettingsEvents = BaseSettingsEvents.extend({
        type: "css",
        $cssPreProcessor: $("#css-preprocessor"),
        $starterCSS: $("input[name='startercss']"),
        $cssPrefix: $("input[name='prefix']"),
        $cssNeedAnAddon: $("#css-need-an-addon-button"),
        init: function(e) {
            this._super(e), _.extend(this, EnableDisableDriver), this.bindToEnableDisableHubEvents(), this._bindToDOM(), this._bindToHub()
        },
        _bindToDOM: function() {
            this.$cssPreProcessor._on("change", this._selectPreProcessor, this, !0), this.$starterCSS._on("click", this._selectStartCSS, this, !0), this.$cssPrefix._on("click", this._selectCSSPrefix, this, !0), this.$cssNeedAnAddon._on("click", this._onClickNeedAnAddonButton, this)
        },
        _bindToHub: function() {
            Hub.sub(HUB_EVENTS.PEN_EDITOR_UI_CHANGE_SERVER, $.proxy(this._onServerUIChange, this)), Hub.sub(HUB_EVENTS.PEN_CHANGE_SERVER, $.proxy(this._onServerPenChange, this))
        },
        _onServerUIChange: function(e, t) {
            ObjectUtil.hasNestedValue(t, "ui.settings.css.addons") && this.controller.syncWithServer(t)
        },
        _onServerPenChange: function(e, t) {
            (ObjectUtil.hasNestedValue(t, "pen.css_pre_processor") || ObjectUtil.hasNestedValue(t, "pen.css_prefix") || ObjectUtil.hasNestedValue(t, "pen.css_starter")) && this._setItemValueFromServer(t)
        },
        _selectPreProcessor: function(e, t) {
            this._canDrive && (this._setItemValue({
                css_pre_processor: t.val()
            }), this.controller.hideAddons({
                origin: "client"
            }))
        },
        _selectStartCSS: function(e, t) {
            this._canDrive && this._setItemValue({
                css_starter: t.val()
            })
        },
        _selectCSSPrefix: function(e, t) {
            this._canDrive && this._setItemValue({
                css_prefix: t.val()
            })
        },
        _getAllUIElements: function() {
            return [this.$cssPreProcessor, this.$starterCSS, this.$cssPrefix, this.$cssNeedAnAddon]
        },
        _onClickNeedAnAddonButton: function() {
            this._canDrive && ("open" === CP.ui.settings.css.addons ? this.controller.hideAddons({
                origin: "client"
            }) : this.controller.showAddons({
                origin: "client"
            }))
        }
    }), window.CSSSettingsModel = Class.extend({
        type: "css",
        showAddons: function(e) {
            CP.ui.settings.css.addons = "open", this._pubUIChange(e)
        },
        hideAddons: function(e) {
            CP.ui.settings.css.addons = "closed", this._pubUIChange(e)
        },
        syncWithServer: function(e) {
            CP.ui.settings.css.addons = e.ui.settings.css.addons, this._pubUIChange(e)
        },
        _pubUIChange: function(e) {
            Hub.pub(HUB_EVENTS.PEN_EDITOR_UI_CHANGE, {
                origin: e.origin,
                ui: {
                    settings: {
                        css: {
                            addons: CP.ui.settings.css.addons
                        }
                    }
                }
            })
        }
    }), window.CSSSettingsView = Class.extend({
        $boxCSSEl: $("#box-css"),
        $cssPreprocessor: $("#css-preprocessor"),
        $needAnAddon: $("#need-an-addon"),
        $addOns: $("#add-ons"),
        type: "css",
        _canDrive: !0,
        init: function(e) {
            this._bindToHub(), this._updateUI(e)
        },
        _bindToHub: function() {
            Hub.sub(HUB_EVENTS.PEN_CHANGE, $.proxy(this._onPenChange, this)), Hub.sub(HUB_EVENTS.PEN_EDITOR_UI_CHANGE, $.proxy(this._onUIChange, this))
        },
        _onPenChange: function(e, t) {
            this._updateUI(t.pen)
        },
        _updateUI: function(e) {
            ObjectUtil.hasNestedValue(e, "css_pre_processor") && this._setPreProcessor(e), ObjectUtil.hasNestedValue(e, "css_starter") && this._selectCSSStarter(e), ObjectUtil.hasNestedValue(e, "css_prefix") && this._selectCSSPrefix(e)
        },
        _onUIChange: function(e, t) {
            ObjectUtil.hasNestedValue(t, "ui.settings.css.addons") && this._updateAddons(t.ui.settings.css.addons)
        },
        _setPreProcessor: function(e) {
            this.$cssPreprocessor.val(e.css_pre_processor), this._addClassesToBoxCSS(e.css_pre_processor), this._toggleNeedAddons(e.css_pre_processor)
        },
        _addClassesToBoxCSS: function(e) {
            const t = CP.editorConfig.getPrettyProcessorName("css", e);
            this.$boxCSSEl.data("preprocessor", t);
            const n = "none" !== e ? `(${t})` : "";
            $(".css-editor-title").find(".box-title-preprocessor-name").text(n)
        },
        _toggleNeedAddons: function(e) {
            "none" !== e && "less" !== e ? CacheGet.find({
                key: `/editor/constants/addons/${e}`,
                url: `/editor/constants/addons/${e}`,
                dataType: "json",
                onSuccess: e => {
                    this.$addOns.html(e.html), CP.HelpFlyouts.init(), this.$needAnAddon.removeClass("hide"), this._bindToAddOnsDOM()
                }
            }) : this.$needAnAddon.addClass("hide")
        },
        _bindToAddOnsDOM: function() {
            this.$addOnFilter = $("#css-add-ons-filter"), this.$addOnFilter._on("keyup", this._filterAddOns, this), this.$addOnFilterClear = $("#css-clear-addon-filter"), this.$addOnFilterClear._on("click", this._clearAddOnsFilter, this), this.$addOnItems = $("#css-add-ons-list").find("li"), this.$addOnItems.find(".add-add-on")._on("click", this._insertAddOnCode, this)
        },
        _insertAddOnCode: function(e, t) {
            e.preventDefault();
            var n = CP.editors.css.editor.getValue(),
                i = t.parent().find(".add-on-code").html() + "\n" + n;
            CP.editors.css.editor.setValue(i), $.showMessage("Preprocessor Add-On Added!", null, "success")
        },
        _updateAddons: function(e) {
            "open" === e ? this.$addOns.removeClass("hide") : this.$addOns.addClass("hide")
        },
        _selectCSSStarter: function(e) {
            $("#startercss-options-form input[value='" + e.css_starter + "']").prop("checked", !0)
        },
        _selectCSSPrefix: function(e) {
            $("#prefix-options-form input[value='" + e.css_prefix + "']").prop("checked", !0)
        },
        _filterAddOns: function() {
            var e = this.$addOnFilter.val();
            if ("" !== e) {
                this.$addOnItems.hide(), this.$addOnFilterClear.show();
                for (var t = 0; t < this.$addOnItems.length; t++)
                    if (this.$addOnItems[t].innerHTML.includes(e) && ($(this.$addOnItems[t]).show(), $(this.$addOnItems[t]).hasClass("depends-on")))
                        for (var n = t; n >= 0; n--)
                            if (!$(this.$addOnItems[n]).hasClass("depends-on")) {
                                $(this.$addOnItems[n]).show();
                                break
                            }
            } else this.$addOnFilterClear.hide(), this.$addOnItems.show()
        },
        _clearAddOnsFilter: function() {
            this.$addOnFilter.val(""), this.$addOnItems.show(), this.$addOnFilterClear.hide()
        }
    }), window.HTMLSettingsController = BaseSettingsController.extend({
        init: function(e) {
            CP.editorConfig.isValidEditorType("html") && (this.pen = e, this.events = new HTMLSettingsEvents(this), this.model = new HTMLSettingsModel(this), this.view = new HTMLSettingsView(e))
        }
    }), window.HTMLSettingsEvents = BaseSettingsEvents.extend({
        type: "html",
        $htmlPreProcessor: $("#html-preprocessor"),
        $headContent: $("#head-content"),
        $htmlClasses: $("#html-classes"),
        $metaTagInsert: $("#meta-tag-insert"),
        init: function(e) {
            this._super(e), _.extend(this, EnableDisableDriver), this.bindToEnableDisableHubEvents(), this._bindToDOM(), this._bindToHub()
        },
        _bindToDOM: function() {
            this.$htmlPreProcessor._on("change", this._selectPreProcessor, this, !0), this.$headContent._on("keyup change", this._setHead, this, !0), this.$htmlClasses._on("keyup change", this._setHTMLClasses, this, !0), this.$metaTagInsert._on("click", this._addCommonMetaTag, this, !1)
        },
        _bindToHub: function() {
            Hub.sub(HUB_EVENTS.PEN_CHANGE_SERVER, $.proxy(this._onServerPenChange, this))
        },
        _onServerPenChange: function(e, t) {
            (ObjectUtil.hasNestedValue(t, "pen.html_pre_processor") || ObjectUtil.hasNestedValue(t, "pen.head") || ObjectUtil.hasNestedValue(t, "pen.html_classes")) && this._setItemValueFromServer(t)
        },
        _selectPreProcessor: function(e, t) {
            this._canDrive && this._setItemValue({
                html_pre_processor: t.val()
            })
        },
        _setHead: function(e, t) {
            this._canDrive && this._setItemValue({
                head: t.val()
            })
        },
        _setHTMLClasses: function(e, t) {
            this._canDrive && this._setItemValue({
                html_classes: t.val()
            })
        },
        _addCommonMetaTag: function() {
            this._canDrive && this._setItemValue({
                head: this._getHeadWithMetaTag()
            })
        },
        _getHeadWithMetaTag: function() {
            return $.trim($("#head-content").val() + '\n<meta name="viewport" content="width=device-width, initial-scale=1">')
        },
        _getAllUIElements: function() {
            return [this.$htmlPreProcessor, this.$headContent, this.$htmlClasses, this.$metaTagInsert]
        }
    }), window.HTMLSettingsModel = Class.extend({
        type: "html"
    }), window.HTMLSettingsView = Class.extend({
        $boxHTML: $("#box-html"),
        $htmlPreprocessor: $("#html-preprocessor"),
        $htmlClasses: $("#html-classes"),
        $headWrapper: $(".head-content-wrapper"),
        $head: $("#head-content"),
        type: "html",
        _canDrive: !0,
        init: function(e) {
            this._bindToHub(), this._updateUI(e)
        },
        _bindToHub: function() {
            Hub.sub(HUB_EVENTS.PEN_CHANGE, $.proxy(this._onPenChange, this))
        },
        _onPenChange: function(e, t) {
            this._updateUI(t.pen)
        },
        _updateUI: function(e) {
            ObjectUtil.hasNestedValue(e, "html_pre_processor") && this._setPreProcessor(e.html_pre_processor), ObjectUtil.hasNestedValue(e, "head") && this._setHead(e.head), ObjectUtil.hasNestedValue(e, "html_classes") && this._setHTMLClasses(e.html_classes)
        },
        _setHead: function(e) {
            this.$head.val() !== e && this.$head.val(e), e.includes("http://") ? this.$headWrapper.addClass("insecure-resource") : this.$headWrapper.removeClass("insecure-resource")
        },
        _setHTMLClasses: function(e) {
            this.$htmlClasses.val() !== e && this.$htmlClasses.val(e)
        },
        _setPreProcessor: function(e) {
            this._addClassBoxHTML(e), this._selectPreProcessor(e)
        },
        _selectPreProcessor: function(e) {
            this.$htmlPreprocessor.val(e)
        },
        _addClassBoxHTML: function(e) {
            const t = CP.editorConfig.getPrettyProcessorName("html", e);
            this.$boxHTML.data("preprocessor", t);
            const n = "none" !== e ? `(${t})` : "";
            $(".html-editor-title").find(".box-title-preprocessor-name").text(n)
        }
    }), window.InfoController = Class.extend({
        init: function() {
            this.events = new InfoEvents, this.view = new InfoView
        }
    }), window.InfoEvents = Class.extend({
        $title: $("#item-details-title"),
        $description: $("#item-details-description"),
        $privateCkbx: $("#item-details-private, #item-details-private-footer"),
        $templateCkbx: $("#item-details-template"),
        $templateCopyURLButton: $("#template-url-input-btn"),
        init: function(e) {
            this.controller = e, this._bindToDOM()
        },
        _bindToDOM: function() {
            this.$title.on("keyup", $.proxy(this._setTitle, this)), this.$description.on("keyup", $.proxy(this._setDescription, this)), this.$privateCkbx._on("click", this._setPrivacy, this, !0), this.$templateCkbx._on("click", this._setTemplate, this, !0), this.$templateCopyURLButton.on("click", this._handleTemplateCopyURL)
        },
        _handleTemplateCopyURL: function(e) {
            e.preventDefault(), window.getSelection().removeAllRanges();
            var t = document.createRange();
            t.selectNode(window["template-url-input"]), window.getSelection().addRange(t), document.execCommand("copy"), $.showMessage("Template URL Copied.", null, "success")
        },
        _setTitle: function() {
            CP.pen.setItemValue({
                origin: "client",
                pen: {
                    title: this.$title.val()
                }
            })
        },
        _setDescription: function() {
            CP.pen.setItemValue({
                origin: "client",
                pen: {
                    description: this.$description.val()
                }
            })
        },
        _setItemValueAndUI: function(e) {
            Hub.pub(HUB_EVENTS.PEN_EDITOR_UI_CHANGE, e), CP.pen.setItemValue(e)
        },
        _setPrivacy: function(e) {
            const t = $(e.target).is(":checked");
            this.$privateCkbx.prop("checked", t), this._setItemValueAndUI({
                origin: "client",
                pen: {
                    private: t
                }
            })
        },
        _setTemplate: function() {
            this._setItemValueAndUI({
                origin: "client",
                pen: {
                    template: this.$templateCkbx.is(":checked")
                }
            })
        }
    }), window.InfoView = Class.extend({
        $body: $("body"),
        $templateCkbx: $("#item-details-template"),
        $privateCkbx: $("#item-details-private, #item-details-private-footer"),
        init: function() {
            this.pageType = window.__pageType, this._bindToHub(), this._updateHasUnsavedChangesUI()
        },
        _bindToHub: function() {
            Hub.sub(HUB_EVENTS.PEN_EDITOR_UI_CHANGE, $.proxy(this._onPenEditorUIChange, this)), Hub.sub(HUB_EVENTS.PEN_CHANGE, $.proxy(this._onPenChange, this)), Hub.sub(HUB_EVENTS.PEN_ERRORS, $.proxy(this._onPenErrors, this)), Hub.sub(HUB_EVENTS.PEN_SAVED, $.proxy(this._updateHasUnsavedChangesUI, this))
        },
        _onPenChange: function(e, t) {
            this._updateHasUnsavedChangesUI(), ObjectUtil.hasNestedValue(t, "pen.title") && this._updateTitle(t), ObjectUtil.hasNestedValue(t, "pen.private") && this.$privateCkbx.prop("checked", t.pen.private), ObjectUtil.hasNestedValue(t, "pen.template") && this._updateTemplate(t)
        },
        _onPenEditorUIChange: function(e, t) {
            ObjectUtil.hasNestedValue(t, "pen.template") && this._updateTemplate(t)
        },
        _updateTitle: function(e) {
            $("#item-details-title").val(e.pen.title), $("#editable-title-span").text(e.pen.title)
        },
        _updateTemplate: function(e) {
            this.$templateCkbx.is(":checked") !== e.pen.template && this.$templateCkbx.prop("checked", e.pen.template)
        },
        _onPenErrors: function(e, t) {
            $.showMessage(Copy.errors[t], "slow", "error")
        },
        _doneWithSignupOrLogin: function(e) {
            CP.user.updateUser(e.user), CP.pen.save()
        },
        _updateHasUnsavedChangesUI: function() {
            CP.pen.hasPenChanged() ? this.$body.addClass("unsaved") : this.$body.removeClass("unsaved")
        }
    }), window.JSSettingsController = BaseSettingsController.extend({
        type: "js",
        init: function(e) {
            this.pen = e, this.events = new JSSettingsEvents(this), this.model = new JSSettingsModel(this), this.view = new JSSettingsView(e), this.resourcesController = new ResourcesController("js")
        }
    }), window.JSSettingsEvents = BaseSettingsEvents.extend({
        type: "js",
        $jsPreProcessor: $("#js-preprocessor"),
        $jsLibrary: $("#js-library"),
        init: function(e) {
            this._super(e), _.extend(this, EnableDisableDriver), this.bindToEnableDisableHubEvents(), this._bindToDOM(), this._bindToHub()
        },
        _bindToDOM: function() {
            this.$jsPreProcessor._on("change", this._selectPreProcessor, this, !0), this.$jsLibrary._on("change", this._selectLibrary, this, !0)
        },
        _bindToHub: function() {
            Hub.sub(HUB_EVENTS.PEN_CHANGE_SERVER, $.proxy(this._onServerPenChange, this))
        },
        _onServerPenChange: function(e, t) {
            ObjectUtil.hasNestedValue(t, "pen.js_pre_processor") && this._setItemValueFromServer(t)
        },
        _selectPreProcessor: function(e, t) {
            this._canDrive && this._setItemValue({
                js_pre_processor: t.val()
            })
        },
        _selectLibrary: function(e, t) {
            this._canDrive && this._setItemValue({
                js_library: t.val()
            })
        },
        _getAllUIElements: function() {
            return [this.$jsPreProcessor, this.$jsLibrary, $(".resource-search-bar"), $(".external-resource-wrapper")]
        }
    }), window.JSSettingsModel = Class.extend({
        type: "js"
    }), window.JSSettingsView = Class.extend({
        $boxJS: $("#box-js"),
        $jsPreprocessor: $("#js-preprocessor"),
        $jsLibrary: $("#js-library"),
        type: "js",
        _canDrive: !0,
        init: function(e) {
            this._bindToHub(), this._updateUI(e)
        },
        _bindToHub: function() {
            Hub.sub(HUB_EVENTS.PEN_CHANGE, $.proxy(this._onPenChange, this))
        },
        _onPenChange: function(e, t) {
            this._updateUI(t.pen)
        },
        _updateUI: function(e) {
            ObjectUtil.hasNestedValue(e, "js_pre_processor") && this._setPreProcessor(e.js_pre_processor), ObjectUtil.hasNestedValue(e, "js_library") && this._setLibrary(e.js_library)
        },
        _setPreProcessor: function(e) {
            this._addProcessorClassBoxJS(e), this._selectPreProcessor(e)
        },
        _selectPreProcessor: function(e) {
            this.$jsPreprocessor.val(e)
        },
        _setLibrary: function(e) {
            e && this.$jsLibrary.val(e)
        },
        _addProcessorClassBoxJS: function(e) {
            const t = CP.editorConfig.getPrettyProcessorName("js", e);
            this.$boxJS.data("preprocessor", t);
            const n = "none" !== e ? `(${t})` : "";
            $(".js-editor-title").find(".box-title-preprocessor-name").text(n)
        }
    }), window.packagesSettingsController = BaseSettingsController.extend({
        type: "packages",
        init: function(e) {
            this.pen = e, this.events = new packagesSettingsEvents(this), this.model = new packagesSettingsModel(this), this.view = new packagesSettingsView(e)
        }
    }),
    function() {
        function e(e) {
            return e.toLowerCase().replace(/[^\dA-Za-z]+(.)/g, ((e, t) => t.toUpperCase()))
        }

        function t(e) {
            return e.split(/\r?\n/)
        }

        function n(e) {
            let t = null;
            for (const [n, i] of e.entries()) i.startsWith("import") && (t = n);
            return t
        }

        function i(t) {
            return `import ${r[t.name]||e(t.name)} from "${o}/${t.name}";`
        }
        async function s(e, s) {
            const o = t(e),
                r = n(o),
                a = null === r ? 0 : r + 1;
            let c = i(s);
            return o.splice(a, 0, c), o.join("\n")
        }
        const o = "https://esm.sh",
            r = {
                react: "React",
                "react-dom": "ReactDOM",
                vue: "Vue",
                "pixi.js": "PIXI",
                three: "THREE",
                jquery: "$"
            };
        window.PackageImports = {
            generateImportStatement: i,
            injectPackage: s
        }
    }(), window.packagesSettingsEvents = BaseSettingsEvents.extend({
        type: "packages",
        init: function(e) {
            this._super(e), _.extend(this, EnableDisableDriver), this.bindToEnableDisableHubEvents(), this._bindToDOM(), this._setUpSearch()
        },
        _bindToDOM: function() {
            this.$packages = $("#packages")
        },
        _setUpSearch: function() {
            $("#packages-search").autocomplete({
                hint: !1
            }, [{
                source: $.fn.autocomplete.sources.hits(window.algolia.npm_Index, {
                    hitsPerPage: 8,
                    attributesToRetrieve: ["name", "version", "versions", "description"]
                }),
                displayKey: "name",
                templates: {
                    suggestion: function(e) {
                        return "<div class='package-title'>" + $.fn.autocomplete.escapeHighlightedString(e._highlightResult.name.value) + "</div><div class='package-description'>" + $.fn.autocomplete.escapeHighlightedString(e.description) + "</div><div class='package-version'>" + $.fn.autocomplete.escapeHighlightedString(e.version) + "</div>"
                    },
                    empty: '<div class="package-empty">No results.</div>'
                }
            }]).on("autocomplete:selected", ((e, t) => {
                this._addSuggestedPackage(t), $("#packages-search").autocomplete("val", "")
            }))
        },
        async _addSuggestedPackage(e) {
            const t = CodeEditorsUtil.getEditorByType("js"),
                n = t.getValue(),
                i = await window.PackageImports.injectPackage(n, e);
            t.setValue(i), $.showMessage(`Added <a href="https://npmjs.com/package/${e.name}">${e.name}</a> import`, 5e3, "success")
        }
    }), window.packagesSettingsModel = Class.extend({
        type: "packages",
        init: function() {}
    }), window.packagesSettingsView = Class.extend({
        type: "packages",
        init: function() {
            this._bindToHub()
        },
        _bindToHub: function() {}
    }),
    function() {
        function e(e, t, n) {
            for (const [i, s] of e.entries())
                if (s && s[t] && s[t] === n) return i;
            return -1
        }

        function t() {
            var e = CPLocalStorage.getItem(a);
            e && (o = JSON.parse(e))
        }

        function n(t, n, s) {
            if (("css" === t || "js" === t) && void 0 !== s) {
                var a = e(o[t], "name", s);
                a > -1 ? (o[t].splice(a, 1), o[t].unshift({
                    name: s,
                    url: n
                })) : o[t].unshift({
                    name: s,
                    url: n
                }), o[t].length > r && (o[t].length = r), i()
            }
        }

        function i() {
            CPLocalStorage.setItem(a, JSON.stringify(o))
        }

        function s(e) {
            return o[e]
        }
        var o = {
                css: [],
                js: []
            },
            r = 6,
            a = "CP_recent_pen_resources";
        t(), CP.PenRecentResourcesManager = {
            addNewPenResource: n,
            getRecentPenResources: s
        }
    }(), window.ResourcesController = Class.extend({
        init: function(e) {
            this.type = e, this.events = new ResourcesEvents(this, e), this.view = new ResourcesView(this, e)
        },
        setItemValueFromServer: function(e) {
            CP.pen.setPenResources(e)
        },
        addEmptyResource: function(e) {
            CP.pen.addEmptyResource(e)
        },
        quickAddResource: function(e, t, n) {
            CP.pen.quickAddResource(e, t), CP.PenRecentResourcesManager.addNewPenResource(e, t, n)
        },
        deleteResource: function(e) {
            CP.pen.deleteResource(e)
        },
        setResource: function(e, t) {
            CP.pen.setResource(e, t)
        },
        updateResourcesOrder: function(e, t) {
            CP.pen.updateResourcesOrder(e, t)
        }
    }), window.ResourcesEvents = Class.extend({
        init: function(e, t) {
            this.controller = e, this.type = t, _.extend(this, EnableDisableDriver), this.bindToEnableDisableHubEvents(), this._bindToDOM(), this._bindToHub(), this.setUpAlgoliaSearch()
        },
        _bindToDOM: function() {
            $("#add-" + this.type + "-resource")._on("click", this._onAddResourceClick, this), $("#" + this.type + "-external-resources").on("click", ".remove-external-url", $.proxy(this._onDeleteResource, this)).on("keydown", this._getResourcesSelector(), $.proxy(this._onChangeResource, this)).on("change", this._getResourcesSelector(), $.proxy(this._onChangeResource, this)), this._makeResourcesSortable(), this.$searchInput = $("#external-" + this.type + "-search")
        },
        _getResourcesSelector: function() {
            return "input." + this.type + "-resource[name='external-" + this.type + "']"
        },
        _bindToHub: function() {
            Hub.sub(HUB_EVENTS.PEN_CHANGE_SERVER, $.proxy(this._onServerPenChange, this)), Hub.sub(HUB_EVENTS.PEN_EDITOR_LOADED, $.proxy(this.checkAllResources, this))
        },
        _onServerPenChange: function(e, t) {
            ObjectUtil.hasNestedValue(t, "pen.resources") && this.controller.setItemValueFromServer(t)
        },
        _makeResourcesSortable: function() {
            $("#" + this.type + "-external-resources").sortable({
                handle: ".move-external-url",
                axis: "y",
                update: () => {
                    this._updateResourcesOrder()
                }
            })
        },
        _updateResourcesOrder: function() {
            this._canDrive && this.controller.updateResourcesOrder(this.type, this._getViewIDsToOrders())
        },
        _checkResourcesSecurity: function(e) {
            var t = $("#external-resource-input-" + e),
                n = t.closest(".external-resource-url-row");
            "http:" === t.val().slice(0, 5) ? n.addClass("insecure-resource") : n.removeClass("insecure-resource"), CP.HelpFlyouts.init()
        },
        _checkURLExtension: function(e) {
            var t = $("#external-resource-input-" + e),
                n = t.closest(".external-resource-url-row");
            !t.val().startsWith("https://" + __CPDATA.host) || t.val().endsWith(".css") || t.val().endsWith(".sass") || t.val().endsWith(".scss") || t.val().endsWith(".less") || t.val().endsWith(".styl") || t.val().endsWith(".js") ? n.removeClass("not-using-url-extension") : n.addClass("not-using-url-extension")
        },
        checkAllResources: function() {
            $("#" + this.type + "-external-resources > div").each(((e, t) => {
                this._checkURLExtension(this._getElementViewID(t))
            }))
        },
        _getViewIDsToOrders: function() {
            return _.reduce(this._getInputsByType(), (function(e, t, n) {
                return e[this._getElementViewID(t)] = n, e
            }), {}, this)
        },
        _getInputsByType: function() {
            return _.select($("#" + this.type + "-external-resources input"), (function(e) {
                return $(e).attr("id")
            }))
        },
        _onChangeResource: function(e) {
            if (this._canDrive) {
                var t = this._getElementViewID(e.target);
                this.controller.setResource(t, $(e.target).val()), $(".open-external-url[data-view-id=" + t + "]").attr("href", $(e.target).val()), this._updateResourcesOrder(), setTimeout((() => {
                    this._checkResourcesSecurity(t), this._checkURLExtension(t)
                }), 0)
            }
        },
        _onAddResourceClick: function() {
            this._canDrive && this.controller.addEmptyResource(this.type)
        },
        _onDeleteResource: function(e) {
            return e.preventDefault(), this._canDrive && (this.controller.deleteResource(this._getElementViewID(e.target)), this._updateResourcesOrder()), !1
        },
        _getElementViewID: function(e) {
            return $(e).attr("data-view-id")
        },
        _getAllUIElements: function() {
            return [$("#add-" + this.type + "-resource"), $("#" + this.type + "-quick-add"), $(this._getResourcesSelector())]
        },
        setUpAlgoliaSearch: function() {
            let e = {
                    source: $.fn.autocomplete.sources.hits(window.algolia.cdnJS_Index, {
                        hitsPerPage: 8,
                        attributesToRetrieve: ["fileType", "filename", "_highlightResult", "version", "name", "description", "CodePen_Override_Display_Name", "CodePen_Override_URL"],
                        filters: "fileType:" + this.type
                    }),
                    displayKey: "name",
                    templates: {
                        suggestion: this.handleSuggestion,
                        empty: '<div class="typeahead-no-results">No results.</div>'
                    }
                },
                t = {
                    source: $.fn.autocomplete.sources.hits(window.algolia.cdnJS_JS_AddOns_Index, {
                        hitsPerPage: 8,
                        attributesToRetrieve: ["fileType", "filename", "_highlightResult", "version", "name", "description", "CodePen_Override_Display_Name", "CodePen_Override_URL"]
                    }),
                    displayKey: "name",
                    templates: {
                        suggestion: this.handleSuggestion
                    }
                },
                n = {
                    source: $.fn.autocomplete.sources.hits(window.algolia.cdnJS_CSS_AddOns_Index, {
                        hitsPerPage: 8,
                        attributesToRetrieve: ["fileType", "filename", "_highlightResult", "version", "name", "description", "CodePen_Override_Display_Name", "CodePen_Override_URL"]
                    }),
                    displayKey: "name",
                    templates: {
                        suggestion: this.handleSuggestion
                    }
                },
                i = [];
            "css" === this.type ? i.push(n) : i.push(t), i.push(e), $("#external-" + this.type + "-search").autocomplete({
                hint: !1
            }, i).on("autocomplete:selected", ((e, t) => {
                let n;
                t.CodePen_Override_URL ? n = t.CodePen_Override_URL : (n = "https://cdnjs.cloudflare.com/ajax/libs/", n += t.name + "/", n += t.version + "/", n += t.filename), this.controller.quickAddResource(this.type, n, t.name), this._updateResourcesOrder(), $("#external-" + this.type + "-search").autocomplete("val", "")
            }))
        },
        handleSuggestion: function(e) {
            let t = e._highlightResult.name.value;
            e._highlightResult.CodePen_Override_Display_Name && (t = e._highlightResult.CodePen_Override_Display_Name.value);
            return `<div class='package-title'>\n        ${window._stripHTMLTags(t)}\n        </div>\n        <div class='package-description'>\n        ${window._stripHTMLTags(e.description.slice(0,200))}\n        </div>\n        <div class='package-version'>\n        ${window._stripHTMLTags(e.version)}\n        </div>`
        }
    }), window.ResourcesView = Class.extend({
        $resources: null,
        init: function(e, t) {
            this.controller = e, this.type = t, this._initDOM(), this._bindToHub()
        },
        _initDOM: function() {
            this.$resources = $("#" + this.type + "-external-resources"), this._syncExternalInputs(CP.pen.getResourcesByType(this.type))
        },
        _bindToHub: function() {
            Hub.sub(HUB_EVENTS.PEN_CHANGE, $.proxy(this._onPenChange, this))
        },
        _onPenChange: function(e, t) {
            if (ObjectUtil.hasNestedValue(t, "pen.resources")) {
                var n = CP.pen.getResourcesByType(this.type);
                this._syncExternalInputs(n, t.rebind), this._ensureOneEmptyInput(n)
            }
        },
        _syncExternalInputs: function(e) {
            this._syncNumberOfDOMElementsWithResources(e), this._syncTheDOMValuesWithResources(e)
        },
        _syncNumberOfDOMElementsWithResources: function(e) {
            var t = this._getExistingExternalsDivs(),
                n = e.length - t.length;
            if (n > 0)
                for (; n--;) {
                    var i = e.length - 1 - n;
                    this._appendResourcesToUI(e[i], i)
                } else if (n < 0)
                    for (n *= -1; n--;) $(t.last()).remove()
        },
        _syncTheDOMValuesWithResources: function(e) {
            for (const [i, s] of this._getExistingExternalsDivs().toArray().entries()) {
                const o = $(s);
                var t = e[i];
                if (t.view_id === o.attr("data-view-id")) {
                    $("#external-resource-input-view-link-" + t.view_id).attr("href", t.url);
                    var n = $("#external-resource-input-" + t.view_id);
                    t.url !== n.val() && n.val(t.url)
                } else o.replaceWith(this._divHTML(t))
            }
        },
        _getExistingExternalsDivs: function() {
            return $("#" + this.type + "-external-resources > div")
        },
        _appendResourcesToUI: function(e, t) {
            var n = $(this._divHTML(e, t));
            this.$resources.append(n), CP.HelpFlyouts.init()
        },
        _ensureOneEmptyInput: function(e) {
            0 === e.reduce((function(e, t) {
                var n = (t.url || "").replace(/\s/g, "");
                return "" === n && e.push(n), e
            }), []).length && this.controller.addEmptyResource(this.type)
        },
        _divHTML: function(e, t) {
            return _.template(this._getTemplate(), {
                url: e.url,
                insecure_resource: "http:" === e.url.slice(0, 5) ? "insecure-resource" : "",
                view_id: e.view_id,
                placeholder: this._getPlaceholderForInput(e.resource_type, t)
            })
        },
        _template: "",
        _getTemplate: function() {
            return "" === this._template && (this._template = $("#" + this.type + "-external-resources-template").html()), this._template
        },
        _getPlaceholderForInput: function(e, t) {
            return t % 2 == 0 ? "css" === e ? "https://yourwebsite.com/style.css" : "https://yourwebsite.com/script.js" : "https://codepen.io/username/pen/aBcDef.css"
        }
    }),
    function() {
        function e() {
            $("iframe#result").css("pointer-events", "none")
        }

        function t() {
            $("iframe#result").css("pointer-events", "")
        }

        function n(n) {
            n.preventDefault();
            const s = Object.assign({}, c, {
                disableStorageKey: !0,
                fromSources: ["local_file_system"],
                uploadInBackground: !1,
                onClose: t,
                onFileSelected: e => {
                    const t = e.filename.split(".").pop() || "png";
                    return Object.assign({}, e, {
                        filename: `${CP.pen.hashid}.custom.${t}`
                    })
                },
                onFileUploadFinished: i,
                imageMax: [1280, 720],
                transformations: {
                    circle: !1,
                    crop: {
                        aspectRatio: 16 / 9,
                        force: !0
                    }
                }
            });
            u.picker(s).open(), e()
        }

        function i(e) {
            const t = {
                id: CP.pen.hashid,
                token: CP.pen.slug_hash_private,
                filename: e.filename
            };
            AJAXUtil.post("/custom_screenshot", t, (e => {
                $.showMessage("Custom Screenshot Successfully Uploaded!", "slow", "success"), $("#settings-screenshot-wrap").html(e.html)
            }))
        }

        function s(e) {
            e.preventDefault(), AJAXUtil.del(`/custom_screenshot/${CP.pen.hashid}`, {}, (e => {
                $.showMessage("Custom Screenshot Successfully Deleted!", "slow", "success"), $("#settings-screenshot-wrap").html(e.html)
            }))
        }
        const o = window.__fileUploadOptions || {},
            {
                apiKey: r,
                filestackOptions: a,
                filestackPickerOptions: c
            } = o;
        let u;
        window.__fileUploadOptions && window.filestack && ($("body").on("click", "#upload-custom-screenshot", n), $("body").on("click", "#delete-screenshot", s), u = filestack.init(r, a))
    }(), window.SettingsController = Class.extend({
        popupName: "penSettings",
        init: function() {
            CP.SettingsEvents.init(this), this.model = CP.SettingsModel, this.model.init(this), CP.SettingsView.init(this.model)
        },
        syncWithServer: function(e) {
            this.model.syncWithServer(e)
        },
        toggleSettingsPane: function() {
            this.model.toggleSettingsPane()
        },
        hideSettingsPane: function() {
            this.model.hideSettingsPane()
        },
        selectSettingsTab: function(e) {
            this.model.selectSettingsTab(e)
        },
        settingsPaneVisible: function() {
            return this.model.settingsPaneVisible()
        }
    }),
    function() {
        function e() {
            h._on("click", t, window), $("body").on("click", "#edit-settings", (function() {
                window.CodePenTracking.trackEvent({
                    eventName: "Opened Pen Settings",
                    eventTrigger: "Header Settings Button"
                }), n()
            })), $("#item-settings-modal .tabs > nav a").unbind(), p._on("click", i, window), $("body")._on("click", s, window, !0), f._on("click", o, window), $(".resource-search-bar").on("click", (function(e) {
                return e.preventDefault(), !1
            }))
        }

        function t(e, t) {
            CP.SettingsEvents._canDrive && (n(t.data("type")), window.CodePenTracking.trackEvent({
                eventName: "Opened Pen Settings",
                eventTrigger: `Editor Nub Settings Button: ${t.data("type")}`
            }))
        }

        function n(e) {
            CP.SettingsEvents._canDrive && (l.toggleSettingsPane(), e && l.selectSettingsTab(e), "html" === e && $("#html-preprocessor").focus(), "css" === e && $("#css-preprocessor").focus(), "js" === e && $("#js-preprocessor").focus())
        }

        function i(e) {
            if (CP.SettingsEvents._canDrive) {
                var t = $(e.target).data("type");
                t && l.selectSettingsTab(t)
            }
        }

        function s(e) {
            window.tourActive || m.length > 0 && ([m, "#edit-settings", ".fsp-picker"].some((t => {
                var n = $(t);
                if (n.length > 0) return n[0].contains(e.target)
            })) || l.hideSettingsPane())
        }

        function o() {
            CP.SettingsEvents._canDrive && l.hideSettingsPane()
        }

        function r() {
            Hub.sub(HUB_EVENTS.KEY_PRESS, u), Hub.sub(HUB_EVENTS.PEN_SAVED, c), Hub.sub(HUB_EVENTS.PEN_EDITOR_UI_CHANGE_SERVER, a), Hub.sub(HUB_EVENTS.POPUP_OPEN, d)
        }

        function a(e, t) {
            (ObjectUtil.hasNestedValue(t, "ui.settings.pane") || ObjectUtil.hasNestedValue(t, "ui.settings.tab")) && l.syncWithServer(t)
        }

        function c() {
            l.hideSettingsPane()
        }

        function u(e, t) {
            "esc" === t.key && l.hideSettingsPane()
        }

        function d(e, t) {
            t !== l.popupName && l.hideSettingsPane()
        }
        var l, h = $("button.settings-nub"),
            p = $("#settings-tabs"),
            f = $("#close-settings, #top-close-settings"),
            g = $("#popup-overlay"),
            m = $("#item-settings-modal");
        CP.SettingsEvents = {}, _.extend(CP.SettingsEvents, EnableDisableDriver), CP.SettingsEvents._getAllUIElements = function() {
            return [h, $("#edit-settings"), p, g, f]
        }, CP.SettingsEvents.init = function(t) {
            l = t, this.bindToEnableDisableHubEvents(), e(), r()
        }, CP.SettingsEvents.toggleSettingsPane = function(e) {
            n(e)
        }
    }(),
    function() {
        function e() {
            Hub.pub(HUB_EVENTS.PEN_EDITOR_UI_CHANGE, CP.SettingsModel.getState())
        }

        function t(t) {
            CP.ui && CP.ui.settings.pane !== t && (CP.ui.settings.pane = t, e(), Hub.pub("open" === t ? HUB_EVENTS.POPUP_OPEN : HUB_EVENTS.POPUP_CLOSE, n.popupName))
        }
        var n;
        CP.SettingsModel = {
            init: function(e) {
                n = e
            },
            syncWithServer: function(t) {
                CP.ui.settings.tab = t.ui.settings.tab, CP.ui.settings.pane = t.ui.settings.pane, e()
            },
            toggleSettingsPane: function() {
                t(this.settingsPaneVisible() ? "closed" : "open")
            },
            hideSettingsPane: function() {
                t("closed")
            },
            openSettingsPane: function() {
                t("open")
            },
            selectSettingsTab: function(t) {
                CP.ui.settings.tab = t, e()
            },
            getState: function() {
                return {
                    ui: {
                        settings: {
                            pane: CP.ui.settings.pane,
                            tab: CP.ui.settings.tab
                        }
                    }
                }
            },
            settingsPaneVisible: function() {
                return "open" === CP.ui.settings.pane
            }
        }
    }(),
    function() {
        function e() {
            Hub.sub(HUB_EVENTS.PEN_EDITOR_UI_CHANGE, t)
        }

        function t(e, t) {
            ObjectUtil.hasNestedValue(t, "ui.settings.pane") && n(t.ui.settings.pane), ObjectUtil.hasNestedValue(t, "ui.settings.tab") && ("details" === t.ui.settings.tab && 0 === $(".settings-tab-details").length && (t.ui.settings.tab = "html", document.body.classList.contains("student") && (t.ui.settings.tab = "")), r(t.ui.settings))
        }

        function n(e) {
            "open" === e ? i() : s()
        }

        function i() {
            a || (c.addClass("open"), CP.showPopupOverlay(), o(), a = !0)
        }

        function s() {
            a && (c.removeClass("open"), CP.hidePopupOverlay(), a = !1)
        }

        function o() {
            setTimeout((function() {
                l.focus()
            }), 500)
        }

        function r(e) {
            u.removeClass("active"), d.removeClass("active"), $("#settings-" + e.tab + "-tab").addClass("active"), $("#settings-" + e.tab).addClass("active").scrollTop(0)
        }
        var a = !1,
            c = $("#item-settings-modal"),
            u = $("#settings-tabs a"),
            d = $("div.settings"),
            l = $("#item-details-title");
        CP.SettingsView = {}, CP.SettingsView.init = function(n) {
            t(null, n.getState()), e()
        }
    }(), window.PenTagsController = Class.extend({
        init: function() {
            this.model = new PenTagsModel, this.events = new PenTagsEvents(this), this.view = new PenTagsView(this.model)
        },
        addNewTags: function(e) {
            this.model.addNewTags(e)
        },
        deleteTag: function(e) {
            this.model.deleteTag(e)
        }
    }), window.PenTagsEvents = Class.extend({
        $body: $("body"),
        $penTags: $("#pen-tags"),
        init: function(e) {
            this.controller = e, this._bindToDOM()
        },
        _bindToDOM: function() {
            this.$body.on("click", "#active-tags span span.tag-x", $.proxy(this._handleTagDelete, this)), this.$penTags._on("keyup", this._onTagChange, this)
        },
        _onTagChange: function() {
            this.controller.addNewTags(this.$penTags.val())
        },
        _handleTagDelete: function(e) {
            return e.preventDefault(), this.controller.deleteTag(this._getTagToDelete(e)), !1
        },
        _getTagToDelete: function(e) {
            return $(e.target).closest(".tag").find(".tag-name").html().trim()
        }
    }), window.PenTagsModel = Class.extend({
        init: function() {},
        getTags: function() {
            return CP.pen.getTags()
        },
        addNewTags: function(e) {
            const t = (e || "").split(",");
            CP.pen.setItemValue({
                origin: "client",
                pen: {
                    newTags: t
                }
            })
        },
        deleteTag: function(e) {
            CP.pen.setItemValue({
                origin: "client",
                action: "delete-tag",
                pen: {
                    tags: this._withoutTag(CP.pen.tags, e)
                }
            }), CP.pen.setItemValue({
                origin: "client",
                action: "delete-tag",
                pen: {
                    newTags: this._withoutTag(CP.pen.newTags, e)
                }
            })
        },
        _withoutTag: function(e, t) {
            return e.filter((e => e !== t))
        }
    }), window.PenTagsView = Class.extend({
        MAX_TAGS: 5,
        $activeTags: $("#active-tags"),
        $maxTagsLabel: $("#max-tags-label"),
        $penTags: $("#pen-tags"),
        init: function(e) {
            this.model = e, this._initiateView(), this._bindToHub()
        },
        _initiateView: function() {
            this._updateActiveTagsHTML(this.model.getTags())
        },
        _bindToHub: function() {
            Hub.sub(HUB_EVENTS.PEN_CHANGE, $.proxy(this._onPenChange, this)), Hub.sub(HUB_EVENTS.PEN_SAVED, $.proxy(this._onPenSaved, this))
        },
        _onPenSaved: function() {
            this.$penTags.val("")
        },
        _onPenChange: function(e, t) {
            "pen" in t && ("tags" in t.pen && this._updateActiveTagsHTML(this.model.getTags()), "newTags" in t.pen && (this._updatePenTagsVal(t), this._updateActiveTagsHTML(this.model.getTags())))
        },
        _updateActiveTagsHTML: function(e) {
            this.$activeTags.html(this._getTagsHTML(e)), this._warnAboutTooManyTags(e)
        },
        _getTagsHTML: function(e) {
            var t = "";
            for (const n of e) n && (t += "<span class='tag'>", t += "<span class='tag-x' style='cursor:pointer;'>", t += "<span class='tag-x'>\xd7</span>&nbsp;", t += "<span class='tag-name'>" + n + "</span> ", t += "</span> ", t += "</span>");
            return t
        },
        _updatePenTagsVal: function(e) {
            "delete-tag" === e.action && this.$penTags.val(e.pen.newTags.join(","))
        },
        _warnAboutTooManyTags: function(e) {
            e.length >= this.MAX_TAGS ? this.$maxTagsLabel.addClass("at-capacity") : this.$maxTagsLabel.removeClass("at-capacity")
        }
    }), window.ProjectTagsController = Class.extend({
        init: function() {
            this.model = new ProjectTagsModel, this.events = new ProjectTagsEvents(this), this.view = new ProjectTagsView(this.model)
        },
        addNewTags: function(e) {
            this.model.addNewTags(e), this.view.updateTags()
        },
        deleteTag: function(e) {
            this.model.deleteTag(e)
        }
    }), window.ProjectTagsEvents = Class.extend({
        $body: $("body"),
        $projectTags: $("#project-tags"),
        init: function(e) {
            this.controller = e, this._bindToDOM()
        },
        _bindToDOM: function() {
            this.$body.on("click", "#active-tags span span.tag-x", $.proxy(this._handleTagDelete, this)), this.$projectTags._on("keyup", this._onTagChange, this)
        },
        _onTagChange: function() {
            this.controller.addNewTags(this.$projectTags.val())
        },
        _handleTagDelete: function(e) {
            return e.preventDefault(), this.controller.deleteTag(this._getTagToDelete(e)), !1
        },
        _getTagToDelete: function(e) {
            var t = $(e.target);
            return $.trim(t.next().html())
        }
    }), window.ProjectTagsModel = Class.extend({
        init: function() {},
        getTags: function() {
            return CP.item.getTags()
        },
        addNewTags: function(e) {
            CP.item.setItemValue({
                origin: "client",
                item: {
                    newTags: this._validNewTags(e)
                }
            })
        },
        _validNewTags: function(e) {
            return _.uniq(_.map(e.split(","), (function(e) {
                return _stripHTMLTags($.trim(e).toLowerCase()).replace("&", "")
            })))
        },
        deleteTag: function(e) {
            CP.item.setItemValue({
                origin: "client",
                action: "delete-tag",
                item: {
                    tags: _.without(CP.item.tags, e)
                }
            }), CP.item.setItemValue({
                origin: "client",
                action: "delete-tag",
                item: {
                    newTags: _.without(CP.item.newTags, e)
                }
            })
        }
    }), window.ProjectTagsView = Class.extend({
        MAX_TAGS: 5,
        $activeTags: $("#active-tags"),
        $maxTagsLabel: $("#max-tags-label"),
        $projectTags: $("#project-tags"),
        init: function(e) {
            this.model = e, this._initiateView()
        },
        _initiateView: function() {
            this._updateActiveTagsHTML(this.model.getTags())
        },
        _onProjectSaved: function() {
            this.$projectTags.val("")
        },
        updateTags: function() {
            this._updateActiveTagsHTML(this.model.getTags()), this._updateProjectTagsVal(CP.item.newTags), this._updateActiveTagsHTML(this.model.getTags())
        },
        _updateActiveTagsHTML: function(e) {
            this.$activeTags.html(this._getTagsHTML(e)), this._warnAboutTooManyTags(e)
        },
        _getTagsHTML: function(e) {
            var t = "";
            for (const n of e) n && (t += '<span class="tag">', t += '<span class="tag-x" style="cursor:pointer;">', t += '<span class="tag-x">\xd7</span>&nbsp;', t += '<span class="tag-name">' + n + "</span> ", t += "</span> ", t += "</span>");
            return t
        },
        _updateProjectTagsVal: function(e) {
            "delete-tag" === e.action && this.$projectTags.val(e.project.newTags.join(","))
        },
        _warnAboutTooManyTags: function(e) {
            e.length >= this.MAX_TAGS ? this.$maxTagsLabel.addClass("at-capacity") : this.$maxTagsLabel.removeClass("at-capacity")
        }
    }), window.ShareGist = Class.extend({
        WAITING_MSG_TIMEOUT: 1e4,
        GIST_MSG_TIMEOUT: 7e3,
        init: function(e) {
            _.extend(this, AJAXUtil), this._shareView = e, this._bindToDOM()
        },
        _bindToDOM: function() {
            $("body").on("click", "#share-gist", $.proxy(this._createGist, this))
        },
        _createGist: function() {
            $.showMessage(Copy.waitingForGist, this.WAITING_MSG_TIMEOUT, "loading"), window.CodePenTracking.trackEvent({
                eventName: "Export - Gist",
                itemType: "Pen"
            }), this.post("/share/gist.json", {
                data: JSON.stringify(CP.pen)
            }, this._doneCreateGist)
        },
        _doneCreateGist: function(e) {
            if (e.reauth && $.showModal("/ajax/reauthenticate_github", "modal-error", (function() {
                    $("#cancel-reauth")._on("click", (function() {
                        $.hideModal()
                    }))
                })), e.url) {
                var t = _.template(Copy.gistCreated, {
                    url: e.url
                });
                $.showMessage(t, this.GIST_MSG_TIMEOUT, "success"), window.open(e.url)
            }
        }
    }), window.ShareView = Class.extend({
        init: function() {
            this.shareGist = new ShareGist(this)
        }
    }),
    function() {
        var e = algoliasearch("2QWLVLXZB6", "2663c73014d2e4d6d1778cc8ad9fd010"),
            t = algoliasearch("ZBX58NY9U9", "6a47cf22c8472e2881147714b1de28fa"),
            n = algoliasearch("OFCNCOG2CU", "8d75223955d5e0d6c5d1bcdcd86afaab");
        window.algolia = {
            cdnJS_Index: e.initIndex("libraries"),
            cdnJS_CSS_AddOns_Index: t.initIndex("add_to_cdnjs_css_results"),
            cdnJS_JS_AddOns_Index: t.initIndex("add_to_cdnjs_js_results"),
            npm_Index: n.initIndex("npm-search")
        }
    }(), window.Copy = {
        autoSavingNow: "Autosave enabled. <a href='https://blog.codepen.io/documentation/editor/autosave/' target='_blank'>?</a>",
        penUpdated: "Pen saved.",
        penForked: "We forked this Pen. It's saved to your account.",
        waitingForGist: "Creating GitHub Gist. Please be patient and stay awesome.",
        gistCreated: "Thanks for staying awesome. <a href='<%= url %>' target='_blank'> Here's a link to your Gist.</a>",
        youHaveUnsavedChanges: "You have NOT saved your Pen. Stop and save if you want to keep your Pen.",
        youHaveUnsavedSettings: "You have unsaved settings changes, are you sure you want to leave without saving?",
        collectionSavedPenAdded: "Your Collection '<%= name %>' was created and this Pen was added to it. <a href='<%= url %>'>View Collection</a>.",
        penAddToCollection: "This Pen was added to the '<%= name %>' Collection. <a href='<%= url %>'>View Collection</a>.",
        studentWatching: "Student Watching",
        studentsWatching: "Students Watching",
        unsubcribedFromCommentNotifications: "You've been unsubscribed from comments for this Pen",
        subscribedToCommentNotifications: "You've been subscribed to comments for this Pen",
        deletingPen: "Deleting this Pen. Buckle up!",
        viewSource: "View Source",
        returnToSource: "Return to Source",
        errors: {
            "anon-cannot-save-during-rt-session": "Please login to save this Pen.",
            "unable-to-save-try-again": "Unable to save Pen (<%= time %> attempt). Please wait while we try again...",
            "unable-to-save-ever": "Unable to save pen. Please contact support@codepen.io.",
            "disabled-cookies": "You will not be able to see live changes to a Pen while cookies are disabled",
            "pen-too-large": "This Pen is larger than the 1 megabyte limit. Try removing data from this Pen and trying again."
        }
    }, window.CPFactory = {
        buildDataObjects: function() {
            CP.profiled = new Profiled, CP.user = new User, CP.item = window.__item, CP.pen = new Pen, CP.item = CP.pen, CP.penSaver = new PenSaver, CP.penAutosave = new PenAutosave, CP.ui = UI.buildDefaultUIData()
        },
        buildEditorObjects: function() {
            this.buildCodeEditors(), this.buildCommonEditorSettingsObjects(), this._buildSettingsObjects()
        },
        buildCodeEditors: function() {
            const {
                editors: e
            } = window.__editor_config;
            CP.editors || (CP.editors = e.reduce(((e, t) => (this._isBuildableEditor(t.type) && (e[t.id] = this._buildEditorByType(t.type)), e)), {})), CP.editorTypes = Object.keys(CP.editors), CP.ConsoleEditor && CP.ConsoleEditor.init()
        },
        _isBuildableEditor: function(e) {
            return $(".code-wrap #" + e).length > 0
        },
        _buildEditorByType: function(e) {
            switch (e) {
                case "html":
                    return new HTMLEditor("html", CP.pen.html);
                case "css":
                    return new CSSEditor("css", CP.pen.css);
                case "js":
                    return new JSEditor("js", CP.pen.js)
            }
            throw `Invalid Editor Type: ${e}`
        },
        buildCommonEditorSettingsObjects: function() {
            CP.shareView = new ShareView, CP.settingsController = new SettingsController, CP.penActions = new PenActions, CP.infoController = new InfoController, CP.tagsController = new PenTagsController
        },
        _buildSettingsObjects: function() {
            CP.htmlSettingsController = new HTMLSettingsController(CP.pen), CP.cssSettingsController = new CSSSettingsController(CP.pen), CP.jsSettingsController = new JSSettingsController(CP.pen), CP.behaviorController = new BehaviorController(CP.pen), CP.packagesSettingsController = new packagesSettingsController(CP.pen)
        },
        buildDesktopViewEditorObjects: function() {
            CP.codeEditorResizeController.init(), CP.editorDropDowns.init(), CP.codeEditorTidyController = new CodeEditorsTidyController, CP.codeEditorsCSSTransitionHandler = new CodeEditorsCSSTransitionHandler, CP.codeEditorsViewSourceController = new CodeEditorsViewSourceController
        }
    },
    function() {
        function e() {
            var e = document.location.href.replace(/&?prefill_data_id=[^=]+/, "").replace(/\?$/, "");
            window.history.replaceState(e, "", e)
        }
        window.CP.cleanEditorURL = e
    }(), window.HandleIFrameClicks = {
        init: function(e) {
            this.pen = e, this._bindToDOM()
        },
        _bindToDOM: function() {
            window.addEventListener("message", $.proxy(this.handleIFrameClickEvent, this))
        },
        handleIFrameClickEvent: function(e) {
            if (this._allowedToOpenWindows()) {
                var t = this._cleanURL(this._getURLFromEvent(e));
                t.match(/^https?:\/\/\S+$/) && window.open(t)
            }
        },
        _allowedToOpenWindows: function() {
            return this.pen.user_id > 1
        },
        _getURLFromEvent: function(e) {
            return "string" == typeof e.data ? e.data : ""
        },
        _cleanURL: function(e) {
            var t = this._getIFrameURLRemoved(e);
            return t = (t = (t = (t = this._sanitizeURL(t)).replace(/(java|vb)?script/gim, "")).replace(/eval/gim, "")).split("?")[0]
        },
        _getIFrameURLRemoved: function(e) {
            return e.replace(/http(s)?:\/\/(s\.)?codepen\.(dev|io)\/(boomerang\/\S+|\S+\/fullpage)\/\w+(\.html)?/m, "")
        },
        _sanitizeURL: function(e) {
            return e.replace(/[^\w!#%&()+,./:;=?@|~-]/, "")
        }
    }, window.TimeUtil = {
        countToString: function(e) {
            var t = {
                1: "first",
                2: "second",
                3: "third",
                4: "fourth",
                5: "fifth"
            };
            return e in t ? t[e] : e
        }
    },
    function() {
        function e() {
            Ee = $(window), Ce = $("body"), L = $("#result_div"), B = $("#resizer"), j = $("#editor-drag-cover"), F = $("#width-readout"), z = $(".boxes"), W = $(".top-boxes"), G = $("#html-toggle"), J = $("#css-toggle"), K = $("#js-toggle"), Y = $("#result-toggle"), q = $("#box-html"), X = $("#box-css"), Z = $("#box-js"), Q = "html", ee = !0, ne = $(".output-sizer"), te = $(".box-console"), se = $(".page-wrap"), oe = $('meta[name="viewport"]'), ie = te.find(".close-editor-button")
        }

        function t() {
            Ee.on("resize", i);
            var e = new BarDragger(B[0]);
            e.on("pointerDown", C), e.on("pointerUp", b), e.on("dragStart", v), e.on("dragMove", y), e.on("dragEnd", H), n($(".editor-resizer-console")[0]), n($(".box-console .powers")[0]), ie.on("click", s)
        }

        function n(e) {
            if (e) {
                var t = new BarDragger(e);
                t.on("pointerDown", C), t.on("pointerUp", b), t.on("dragStart", x), t.on("dragMove", R), t.on("dragEnd", U), t.on("doubleClick", D)
            }
        }

        function i() {
            V()
        }

        function s(e) {
            e.preventDefault(), CP.EditorLayout.closeConsole()
        }

        function o() {
            G.on("click", (() => {
                d("html")
            })), J.on("click", (() => {
                d("css")
            })), K.on("click", (() => {
                d("js")
            })), Y.on("click", (() => {
                h()
            }))
        }

        function r() {
            function e() {
                oe.attr("content", n)
            }

            function t() {
                oe.attr("content", n + ", maximum-scale=1.0")
            }
            var n = oe.attr("content");
            Ce.on("touchend", "input, select, textarea", (function() {
                t(), setTimeout(e, 200)
            }));
            var i = "touchstart";
            ["htmlEditor", "cssEditor", "jsEditor"].map((n => {
                CP[n] && CP[n].editor && CP[n].editor.on(i, (function() {
                    t(), Ce.one("touchcancel touchend", e)
                }))
            }))
        }

        function a() {
            Hub.sub(HUB_EVENTS.PEN_EDITOR_UI_CHANGE, c), Hub.sub(HUB_EVENTS.PEN_EDITOR_LOADED, k)
        }

        function c(e, t) {
            var n = t.ui && t.ui.editorSizes && t.ui.editorSizes.console;
            void 0 !== n && p(n)
        }

        function u() {
            var e = CodeEditorsUtil.getQueryString("editors");
            if (!e) return;
            const t = [...e];
            for (var n = 0, i = t.length; n < i; n++) {
                if (1 === t[n] && CP.editorTypes[n]) {
                    d(CP.editorTypes[n]);
                    break
                }
            }
            1 === t[3] && f()
        }

        function d(e) {
            if (l(), e === Q) return z.addClass("mobile-hide-code"), Q = "", void h();
            switch ("" === Q && (z.removeClass("mobile-hide-code"), h()), e) {
                case "html":
                    q.removeClass(M), Q = "html", G.addClass("selected");
                    break;
                case "css":
                    X.removeClass(M), Q = "css", J.addClass("selected");
                    break;
                case "js":
                    Z.removeClass(M), Q = "js", K.addClass("selected");
                    break;
                default:
                    q.removeClass(M), G.addClass("selected")
            }
        }

        function l() {
            q.addClass(M), G.removeClass("selected"), X.addClass(M), J.removeClass("selected"), Z.addClass(M), K.removeClass("selected")
        }

        function h(e) {
            (ee = void 0 !== e ? e : !ee) || "" === Q ? (ee = !0, Y.addClass("selected"), z.removeClass("mobile-hide-result")) : (Y.removeClass("selected"), z.addClass("mobile-hide-result"))
        }

        function p(e) {
            if ("closed" !== e) {
                if (0 !== he) {
                    f();
                    var t = fe / he,
                        n = e * (1 - t) + t;
                    te.height(100 * n + "%"), Te = e
                }
            } else g()
        }

        function f() {
            Se || (Hub.pub(HUB_EVENTS.CONSOLE_OPENED), te.show(), h(!0), T(), Se = !0)
        }

        function g() {
            Se && (Hub.pub(HUB_EVENTS.CONSOLE_CLOSED), te.hide(), Se = !1)
        }

        function m(e) {
            Hub.pub(HUB_EVENTS.PEN_EDITOR_SIZES_CHANGE, {
                console: e
            })
        }

        function E() {
            var e = CP.ui.editorSizes.console;
            "closed" !== e && (f(), p(e))
        }

        function C() {
            j.show()
        }

        function b() {
            j.hide()
        }

        function v() {
            var e = "top" === CP.ui.layout ? S : P;
            Reflect.apply(e, this, arguments)
        }

        function S() {
            ce = W.height(), re = z.height(), ae = B.outerHeight(), ve = parseInt(W.css("minHeight"), 10), Se && T()
        }

        function P() {
            le = W.width(), ue = z.width(), de = B.outerWidth()
        }

        function T() {
            he = me = ne.height(), _e = te.height(), ge = ce = W.height(), pe = _e, fe || (fe = te.find(".editor-resizer").outerHeight() + te.find(".powers").outerHeight())
        }

        function y() {
            var e = "top" === CP.ui.layout ? w : O;
            Reflect.apply(e, this, arguments)
        }

        function w(e, t, n) {
            var i = ce + n.y;
            i = Math.max(0, i);
            var s = re - ae;
            s -= Se ? fe : 0, i = Math.min(s, i), i = Math.max(ve, i), W.height(i), he = re - i - ae, N()
        }

        function N() {
            if (Se) {
                var e = (_e - fe) / (he - fe);
                e = Math.min(1, e), _e = Math.min(he, _e), p(e)
            }
        }

        function O(e, t, n) {
            var i = n.x * ("right" === CP.ui.layout ? -1 : 1),
                s = le + i;
            s = Math.max(0, s);
            var o = ue - de;
            s = Math.min(o, s), W.width(s), V()
        }

        function H() {
            "function" == typeof Comment.tweakCommentsSize && Comment.tweakCommentsSize(), Hub.pub(HUB_EVENTS.PEN_EDITOR_REFRESH_REQUEST, {
                delay: 0
            });
            var e = {
                editor: "top" === CP.ui.layout ? W.height() / (se.height() - ae) : W.width() / window.innerWidth
            };
            Se && (e.console = Te), Hub.pub(HUB_EVENTS.PEN_EDITOR_SIZES_CHANGE, e)
        }

        function x() {
            CP.EditorLayout._canDrive && T()
        }

        function R(e, t, n) {
            if (CP.EditorLayout._canDrive) {
                var i = pe - n.y;
                i = Math.max(fe, i), p(((i = Math.min(he, i)) - fe) / (he - fe)), I(n)
            }
        }

        function I(e) {
            if ("top" === CP.ui.layout) {
                var t = me + e.y - _e;
                t >= 0 || (ge = Math.min(ce + t, ge), W.height(ge), he = Math.max(he, me - t))
            }
        }

        function U() {
            CP.EditorLayout._canDrive && Hub.pub(HUB_EVENTS.PEN_EDITOR_SIZES_CHANGE, {
                console: Te
            })
        }

        function D() {
            CP.EditorLayout._canDrive && m(1 === Te ? Pe : 1)
        }

        function V() {
            clearTimeout(be), F.addClass("visible"), F.text(L.width() + "px"), be = setTimeout((function() {
                F.removeClass("visible")
            }), 1e3)
        }

        function A() {
            "top" === CP.ui.layout && (!!navigator.userAgent.match(/(iPad)/g) && $("head").append("<meta name='viewport' content='width=device-width, initial-scale=1, maximum-scale=1.0, user-scalable=no'>"))
        }

        function k() {
            Ce.removeClass("prelayout"), "complete" === document.readyState ? Ce.removeClass("preload") : Ee.on("load", (function() {
                Ce.removeClass("preload")
            }))
        }
        CP.EditorLayout = {};
        const M = "switch-off";
        var L, B, j, F, z, W, G, J, K, Y, q, X, Z, Q, ee, te, ne, ie, se, oe, re, ae, ce, ue, de, le, he, pe, _e, fe, ge, me, Ee = $(window),
            Ce = $("body"),
            be = 0,
            ve = 0,
            Se = !1,
            Pe = 1 / 3,
            Te = Pe;
        CP.EditorLayout.init = function() {
            e(), t(), a(), r(), this.bindToEnableDisableHubEvents(), E(), A(), o(), u()
        }, CP.EditorLayout.setConsoleSize = p, CP.EditorLayout.openConsole = function() {
            m(Te)
        }, CP.EditorLayout.closeConsole = function() {
            m("closed")
        }, CP.EditorLayout.toggleConsole = function() {
            "closed" === CP.ui.editorSizes.console ? this.openConsole() : this.closeConsole()
        }, _.extend(CP.EditorLayout, EnableDisableDriver), CP.EditorLayout._getAllUIElements = function() {
            return [ie, $(".console-toggle-button")]
        }
    }(), window.ViewSwitcher = {
        TYPES: ["top", "left", "right"],
        init: function() {
            this.$body = $("body"), this._bindToDOM(), this._bindToHub(), this.saveLayoutToSession(window.__layoutType)
        },
        _bindToDOM: function() {
            this.$body.on("click", "[data-layout-type]", this.onLayoutTypeButtonClick)
        },
        onLayoutTypeButtonClick: function(e) {
            e.preventDefault();
            var t = $(e.currentTarget).attr("data-layout-type");
            window.ViewSwitcher.changeLayout(t)
        },
        _bindToHub: function() {
            Hub.sub(HUB_EVENTS.PEN_EDITOR_UI_CHANGE_SERVER, $.proxy(this._onServerUIChange, this))
        },
        _onServerUIChange: function(e, t) {
            t.ui && t.ui.layout && this.changeUILayout(t.ui.layout)
        },
        changeLayout: function(e) {
            this.changeUILayout(e), this.saveLayoutToSession(e)
        },
        saveLayoutToSession: function(e) {
            $.cookie && $.cookie("__editor_layout", e, {
                expires: 30,
                path: "/",
                samesite: "Lax"
            })
        },
        changeUILayout: function(e) {
            this.validateLayoutType(e), this.$body.removeClass("layout-" + CP.ui.layout);
            var t = "left" === e || "right" === e;
            this.$body[t ? "addClass" : "removeClass"]("layout-side"), this.$body.addClass("layout-" + e), CP.ui.layout = e, Hub.pub(HUB_EVENTS.PEN_EDITOR_UI_CHANGE, {
                ui: {
                    layout: e
                }
            }), Hub.pub(HUB_EVENTS.PEN_EDITOR_REFRESH_REQUEST, {
                delay: 0
            })
        },
        validateLayoutType: function(e) {
            if (!this.TYPES.includes(e)) throw "Invalid layout type: " + e
        }
    }, window.ViewSwitcher.init(), window.TeamRoomNotifications = Class.extend({
        init: function(e, t) {
            this.user = e, this.rtData = t, this._debouncedCanCollabOnTeam = _.debounce(this._showCanCollabOnTeamPenMessage, 2500), this._debouncedCanCollabSingle = _.debounce(this._showCanCollabOnSingleUserMessage, 2500), this._shouldJoinRoom(t)
        },
        _shouldJoinRoom: function(e) {
            return "editor" === e.role && e.pen.slugHash && (this.user.current_team_id > 0 || !0 === this.user.paid)
        },
        _onConnect: function() {
            this._subscribeToServerEvents(), this._publishCanCollabOnTeamPen()
        },
        _subscribeToServerEvents: function() {},
        _onCanCollabOnTeamPen: function(e) {
            this.user.id !== e.data.user.id ? this._debouncedCanCollabOnTeam(e) : this._debouncedCanCollabSingle(e)
        },
        _showCanCollabOnTeamPenMessage: function(e) {
            var t = "<%= name %> is also working on this pen. Try Collab Mode with your team member <a href='<%= url %>' target='_blank'>here</a>.",
                n = document.location.href.replace(/\/pen\//, "/collab/"),
                i = _.template(t, {
                    name: e.data.user.name,
                    url: n
                });
            $.showMessage(i, "until-dismiss")
        },
        _showCanCollabOnSingleUserMessage: function(e) {
            var t = "Looks like this Pen is open in another window. You can use <a href='<%= url %>' target='_blank'>Collab mode</a> to make sure you don't override your work.",
                n = document.location.href.replace(/\/pen\//, "/collab/"),
                i = _.template(t, {
                    name: e.data.user.name,
                    url: n
                });
            $.showMessage(i, "until-dismiss")
        },
        _publishCanCollabOnTeamPen: function() {}
    }),
    function() {
        function e() {
            if ("pres" !== window.__pageType) return;
            t();
            const e = CPLocalStorage.getItem(l);
            e && (o(), s(e), $("#pres-font-size").get(0).value = e), window.CodePenTracking.trackEvent({
                eventName: "Used Presentation Mode",
                proFeature: "Presentation Mode"
            })
        }

        function t() {
            $("#pres-font-size")._on("change", n, this), $("#pres-theme")._on("change", r, this), $("#display-url-button")._on("click", i, this), d._on("click", u, this)
        }

        function n(e, t) {
            o(), s(t.val()), CPLocalStorage.setItem(l, t.val())
        }

        function i() {
            let e = `cdpn.io/${CP.pen.hashid}`;
            CP.pen.private && (e += `/${CP.pen.slug_hash_private}`), $.showModal(`<h2>${e}</h2>\n        <p>\n          <a href='#0' class='button button-mini close-button'>Close</a>\n        </p>`, "modal-show-url modal-good")
        }

        function s(e) {
            $("<style />", {
                id: "cm-font-size",
                html: ".CodeMirror, .console-command-line-input, .console-message {font-size: " + e + "}"
            }).appendTo("head")
        }

        function o() {
            $("#cm-font-size").remove()
        }

        function r(e, t) {
            a(), c(t.val())
        }

        function a() {
            $("#cm-theme").remove()
        }

        function c(e) {
            $("<link />", {
                id: "cm-theme",
                rel: "stylesheet",
                href: window["__theme_url_" + e]
            }).appendTo("head")
        }

        function u(e, t) {
            d.removeClass("active"), t.addClass("active"), $("#result_div").attr("data-zoom", t.attr("data-zoom"))
        }
        const d = $(".mobile-preview-size-button"),
            l = "CP_Presentation_Mode_Font_Size";
        Hub.sub(HUB_EVENTS.PEN_EDITOR_LOADED, e)
    }(), CPFactory.buildDataObjects(), CPFactory.buildEditorObjects(), CPFactory.buildDesktopViewEditorObjects(), CP.EditorLayout.init(), CP.cleanEditorURL(), Hub.pub(HUB_EVENTS.PEN_EDITOR_LOADED);