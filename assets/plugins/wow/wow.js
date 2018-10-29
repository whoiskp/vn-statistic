(function () {
  var t, e, n, i = function (t, e) {
      return function () {
        return t.apply(e, arguments)
      }
    },
    o = [].indexOf || function (t) {
      for (var e = 0, n = this.length; e < n; e++)
        if (e in this && this[e] === t) return e;
      return -1
    };
  e = function () {
    function t() {}
    return t.prototype.extend = function (t, e) {
      var n, i;
      for (n in e) i = e[n], null == t[n] && (t[n] = i);
      return t
    }, t.prototype.isMobile = function (t) {
      return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(t)
    }, t
  }(), n = this.WeakMap || this.MozWeakMap || (n = function () {
    function t() {
      this.keys = [], this.values = []
    }
    return t.prototype.get = function (t) {
      var e, n, i, o;
      for (e = n = 0, i = (o = this.keys).length; n < i; e = ++n)
        if (o[e] === t) return this.values[e]
    }, t.prototype.set = function (t, e) {
      var n, i, o, s;
      for (n = i = 0, o = (s = this.keys).length; i < o; n = ++i)
        if (s[n] === t) return void(this.values[n] = e);
      return this.keys.push(t), this.values.push(e)
    }, t
  }()), t = this.MutationObserver || this.WebkitMutationObserver || this.MozMutationObserver || (t = function () {
    function t() {
      console.warn("MutationObserver is not supported by your browser."), console.warn("WOW.js cannot detect dom mutations, please call .sync() after loading new content.")
    }
    return t.notSupported = !0, t.prototype.observe = function () {}, t
  }()), this.WOW = function () {
    function s(t) {
      null == t && (t = {}), this.scrollCallback = i(this.scrollCallback, this), this.scrollHandler = i(this.scrollHandler, this), this.start = i(this.start, this), this.scrolled = !0, this.config = this.util().extend(t, this.defaults), this.animationNameCache = new n
    }
    return s.prototype.defaults = {
      boxClass: "wow",
      animateClass: "animated",
      offset: 0,
      mobile: !0,
      live: !0
    }, s.prototype.init = function () {
      var t;
      return this.element = window.document.documentElement, "interactive" === (t = document.readyState) || "complete" === t ? this.start() : document.addEventListener("DOMContentLoaded", this.start), this.finished = []
    }, s.prototype.start = function () {
      var e, n, i, o, s;
      if (this.stopped = !1, this.boxes = function () {
          var t, n, i, o;
          for (o = [], t = 0, n = (i = this.element.getElementsByClassName(this.config.boxClass)).length; t < n; t++) e = i[t], o.push(e);
          return o
        }.call(this), this.all = function () {
          var t, n, i, o;
          for (o = [], t = 0, n = (i = this.boxes).length; t < n; t++) e = i[t], o.push(e);
          return o
        }.call(this), this.boxes.length)
        if (this.disabled()) this.resetStyle();
        else {
          for (n = 0, i = (o = this.boxes).length; n < i; n++) e = o[n], this.applyStyle(e, !0);
          window.addEventListener("scroll", this.scrollHandler, !1), window.addEventListener("resize", this.scrollHandler, !1), this.interval = setInterval(this.scrollCallback, 50)
        } if (this.config.live) return new t((s = this, function (t) {
        var e, n, i, o, r;
        for (r = [], i = 0, o = t.length; i < o; i++) n = t[i], r.push(function () {
          var t, i, o, s;
          for (s = [], t = 0, i = (o = n.addedNodes || []).length; t < i; t++) e = o[t], s.push(this.doSync(e));
          return s
        }.call(s));
        return r
      })).observe(document.body, {
        childList: !0,
        subtree: !0
      })
    }, s.prototype.stop = function () {
      if (this.stopped = !0, window.removeEventListener("scroll", this.scrollHandler, !1), window.removeEventListener("resize", this.scrollHandler, !1), null != this.interval) return clearInterval(this.interval)
    }, s.prototype.sync = function (e) {
      if (t.notSupported) return this.doSync(this.element)
    }, s.prototype.doSync = function (t) {
      var e, n, i, s, r;
      if (!this.stopped) {
        if (null == t && (t = this.element), 1 !== t.nodeType) return;
        for (r = [], n = 0, i = (s = (t = t.parentNode || t).getElementsByClassName(this.config.boxClass)).length; n < i; n++) e = s[n], o.call(this.all, e) < 0 ? (this.applyStyle(e, !0), this.boxes.push(e), this.all.push(e), r.push(this.scrolled = !0)) : r.push(void 0);
        return r
      }
    }, s.prototype.show = function (t) {
      return this.applyStyle(t), t.className = t.className + " " + this.config.animateClass
    }, s.prototype.applyStyle = function (t, e) {
      var n, i, o, s;
      return i = t.getAttribute("data-wow-duration"), n = t.getAttribute("data-wow-delay"), o = t.getAttribute("data-wow-iteration"), this.animate((s = this, function () {
        return s.customStyle(t, e, i, n, o)
      }))
    }, s.prototype.animate = "requestAnimationFrame" in window ? function (t) {
      return window.requestAnimationFrame(t)
    } : function (t) {
      return t()
    }, s.prototype.resetStyle = function () {
      var t, e, n, i, o;
      for (o = [], e = 0, n = (i = this.boxes).length; e < n; e++) t = i[e], o.push(t.setAttribute("style", "visibility: visible;"));
      return o
    }, s.prototype.customStyle = function (t, e, n, i, o) {
      return e && this.cacheAnimationName(t), t.style.visibility = e ? "hidden" : "visible", n && this.vendorSet(t.style, {
        animationDuration: n
      }), i && this.vendorSet(t.style, {
        animationDelay: i
      }), o && this.vendorSet(t.style, {
        animationIterationCount: o
      }), this.vendorSet(t.style, {
        animationName: e ? "none" : this.cachedAnimationName(t)
      }), t
    }, s.prototype.vendors = ["moz", "webkit"], s.prototype.vendorSet = function (t, e) {
      var n, i, o, s;
      for (n in s = [], e) i = e[n], t["" + n] = i, s.push(function () {
        var e, s, r, a;
        for (a = [], e = 0, s = (r = this.vendors).length; e < s; e++) o = r[e], a.push(t["" + o + n.charAt(0).toUpperCase() + n.substr(1)] = i);
        return a
      }.call(this));
      return s
    }, s.prototype.vendorCSS = function (t, e) {
      var n, i, o, s, r, a;
      for (n = (i = window.getComputedStyle(t)).getPropertyCSSValue(e), s = 0, r = (a = this.vendors).length; s < r; s++) o = a[s], n = n || i.getPropertyCSSValue("-" + o + "-" + e);
      return n
    }, s.prototype.animationName = function (t) {
      var e;
      try {
        e = this.vendorCSS(t, "animation-name").cssText
      } catch (n) {
        e = window.getComputedStyle(t).getPropertyValue("animation-name")
      }
      return "none" === e ? "" : e
    }, s.prototype.cacheAnimationName = function (t) {
      return this.animationNameCache.set(t, this.animationName(t))
    }, s.prototype.cachedAnimationName = function (t) {
      return this.animationNameCache.get(t)
    }, s.prototype.scrollHandler = function () {
      return this.scrolled = !0
    }, s.prototype.scrollCallback = function () {
      var t;
      if (this.scrolled && (this.scrolled = !1, this.boxes = function () {
          var e, n, i, o;
          for (o = [], e = 0, n = (i = this.boxes).length; e < n; e++)(t = i[e]) && (this.isVisible(t) ? this.show(t) : o.push(t));
          return o
        }.call(this), !this.boxes.length && !this.config.live)) return this.stop()
    }, s.prototype.offsetTop = function (t) {
      for (var e; void 0 === t.offsetTop;) t = t.parentNode;
      for (e = t.offsetTop; t = t.offsetParent;) e += t.offsetTop;
      return e
    }, s.prototype.isVisible = function (t) {
      var e, n, i, o, s;
      return n = t.getAttribute("data-wow-offset") || this.config.offset, o = (s = window.pageYOffset) + Math.min(this.element.clientHeight, innerHeight) - n, e = (i = this.offsetTop(t)) + t.clientHeight, i <= o && e >= s
    }, s.prototype.util = function () {
      return null != this._util ? this._util : this._util = new e
    }, s.prototype.disabled = function () {
      return !this.config.mobile && this.util().isMobile(navigator.userAgent)
    }, s
  }()
}).call(this);
