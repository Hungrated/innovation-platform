/**
 * Created by Administrator on 2017/10/14 0014.
 */
"use strict";

var addComment = {
    moveForm: function (t, e, i, o) {
        // t = target place  e = comment id  i = response  o = 78012
        var a, n, s, r, c = this, l = c.I(t), d = c.I(i), u = c.I("cancel-comment-reply-link"),
            m = c.I("comment_parent"), h = c.I("comment_post_ID"), v = d.getElementsByTagName("form")[0];
        if (l && d && u && m && v) {
            c.respondId = i, o = o || !1, c.I("wp-temp-form-div") ||
            (a = document.createElement("div"), a.id = "wp-temp-form-div", a.style.display = "none",
                d.parentNode.insertBefore(a, d)), l.parentNode.insertBefore(d, l.nextSibling), h && o && (h.value = o),
                m.value = e, u.style.display = "", u.onclick = function () {
                var t = addComment, e = t.I("wp-temp-form-div"), i = t.I(t.respondId);
                if (e && i)return t.I("comment_parent").value = "0", e.parentNode.insertBefore(i, e), e.parentNode.removeChild(e),
                    this.style.display = "none", this.onclick = null, !1
            };
            try {
                for (var p = 0; p < v.elements.length; p++)if (n = v.elements[p], r = !1,
                        "getComputedStyle" in window ? s = window.getComputedStyle(n) : document.documentElement.currentStyle && (s = n.currentStyle),
                    (n.offsetWidth <= 0 && n.offsetHeight <= 0 || "hidden" === s.visibility) && (r = !0), "hidden" !== n.type && !n.disabled && !r) {
                    n.focus();
                    break
                }
            } catch (t) {
            }
            return !1
        }
    },
    I: function (t) {
        return document.getElementById(t)
    }
};