/*! Cheers © 2026. All Rights Reserved. Proprietary & Confidential. */
(function () {
    // Anti-DevTools: block keyboard shortcuts
    document.addEventListener('contextmenu', function (e) { e.preventDefault(); });
    document.addEventListener('keydown', function (e) {
        var k = e.key.toLowerCase();
        var c = e.ctrlKey || e.metaKey;
        var s = e.shiftKey;
        var a = e.altKey;
        if (k === 'f12') { e.preventDefault(); return false; }
        if (c && s && (k === 'i' || k === 'j' || k === 'c' || k === 'k')) { e.preventDefault(); return false; }
        if (c && (k === 'u')) { e.preventDefault(); return false; }
        if (c && a && (k === 'i' || k === 'j' || k === 'u')) { e.preventDefault(); return false; }
    }, true);
})();
