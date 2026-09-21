/*
 * Tollkit "Connect to your AI" picker.
 *
 * One file, used by every page on tollkit.dev. Any element with
 *   data-connect                     opens it as a dialog
 *   data-connect-url="https://…/mcp" which server to connect (default: extract)
 *   data-connect-name="tollkit-sms"  the name the app will show it under
 * and an element with data-connect-inline renders the same picker in place.
 *
 * No third-party code, no storage, no tracking. Logos: Simple Icons (CC0 data;
 * trademarks belong to their owners, shown only to say "works with"). OpenAI
 * and Microsoft asked Simple Icons to remove theirs, so those two tiles use a
 * plain generic icon rather than a redrawn logo.
 */
(function () {
  'use strict';

  var DEFAULT_URL = 'https://extract.tollkit.dev/mcp';
  var DEFAULT_NAME = 'tollkit';

  // Filled at build time from simple-icons (24x24 paths) plus two generic glyphs.
  var ICON = {"claude":{"d":"m4.7144 15.9555 4.7174-2.6471.079-.2307-.079-.1275h-.2307l-.7893-.0486-2.6956-.0729-2.3375-.0971-2.2646-.1214-.5707-.1215-.5343-.7042.0546-.3522.4797-.3218.686.0608 1.5179.1032 2.2767.1578 1.6514.0972 2.4468.255h.3886l.0546-.1579-.1336-.0971-.1032-.0972L6.973 9.8356l-2.55-1.6879-1.3356-.9714-.7225-.4918-.3643-.4614-.1578-1.0078.6557-.7225.8803.0607.2246.0607.8925.686 1.9064 1.4754 2.4893 1.8336.3643.3035.1457-.1032.0182-.0728-.164-.2733-1.3539-2.4467-1.445-2.4893-.6435-1.032-.17-.6194c-.0607-.255-.1032-.4674-.1032-.7285L6.287.1335 6.6997 0l.9957.1336.419.3642.6192 1.4147 1.0018 2.2282 1.5543 3.0296.4553.8985.2429.8318.091.255h.1579v-.1457l.1275-1.706.2368-2.0947.2307-2.6957.0789-.7589.3764-.9107.7468-.4918.5828.2793.4797.686-.0668.4433-.2853 1.8517-.5586 2.9021-.3643 1.9429h.2125l.2429-.2429.9835-1.3053 1.6514-2.0643.7286-.8196.85-.9046.5464-.4311h1.0321l.759 1.1293-.34 1.1657-1.0625 1.3478-.8804 1.1414-1.2628 1.7-.7893 1.36.0729.1093.1882-.0183 2.8535-.607 1.5421-.2794 1.8396-.3157.8318.3886.091.3946-.3278.8075-1.967.4857-2.3072.4614-3.4364.8136-.0425.0304.0486.0607 1.5482.1457.6618.0364h1.621l3.0175.2247.7892.522.4736.6376-.079.4857-1.2142.6193-1.6393-.3886-3.825-.9107-1.3113-.3279h-.1822v.1093l1.0929 1.0686 2.0035 1.8092 2.5075 2.3314.1275.5768-.3218.4554-.34-.0486-2.2039-1.6575-.85-.7468-1.9246-1.621h-.1275v.17l.4432.6496 2.3436 3.5214.1214 1.0807-.17.3521-.6071.2125-.6679-.1214-1.3721-1.9246L14.38 17.959l-1.1414-1.9428-.1397.079-.674 7.2552-.3156.3703-.7286.2793-.6071-.4614-.3218-.7468.3218-1.4753.3886-1.9246.3157-1.53.2853-1.9004.17-.6314-.0121-.0425-.1397.0182-1.4328 1.9672-2.1796 2.9446-1.7243 1.8456-.4128.164-.7164-.3704.0667-.6618.4008-.5889 2.386-3.0357 1.4389-1.882.929-1.0868-.0062-.1579h-.0546l-6.3385 4.1164-1.1293.1457-.4857-.4554.0608-.7467.2307-.2429 1.9064-1.3114Z"},"cursor":{"d":"M11.503.131 1.891 5.678a.84.84 0 0 0-.42.726v11.188c0 .3.162.575.42.724l9.609 5.55a1 1 0 0 0 .998 0l9.61-5.55a.84.84 0 0 0 .42-.724V6.404a.84.84 0 0 0-.42-.726L12.497.131a1.01 1.01 0 0 0-.996 0M2.657 6.338h18.55c.263 0 .43.287.297.515L12.23 22.918c-.062.107-.229.064-.229-.06V12.335a.59.59 0 0 0-.295-.51l-9.11-5.257c-.109-.063-.064-.23.061-.23"},"copilot":{"d":"M23.922 16.997C23.061 18.492 18.063 22.02 12 22.02 5.937 22.02.939 18.492.078 16.997A.641.641 0 0 1 0 16.741v-2.869a.883.883 0 0 1 .053-.22c.372-.935 1.347-2.292 2.605-2.656.167-.429.414-1.055.644-1.517a10.098 10.098 0 0 1-.052-1.086c0-1.331.282-2.499 1.132-3.368.397-.406.89-.717 1.474-.952C7.255 2.937 9.248 1.98 11.978 1.98c2.731 0 4.767.957 6.166 2.093.584.235 1.077.546 1.474.952.85.869 1.132 2.037 1.132 3.368 0 .368-.014.733-.052 1.086.23.462.477 1.088.644 1.517 1.258.364 2.233 1.721 2.605 2.656a.841.841 0 0 1 .053.22v2.869a.641.641 0 0 1-.078.256Zm-11.75-5.992h-.344a4.359 4.359 0 0 1-.355.508c-.77.947-1.918 1.492-3.508 1.492-1.725 0-2.989-.359-3.782-1.259a2.137 2.137 0 0 1-.085-.104L4 11.746v6.585c1.435.779 4.514 2.179 8 2.179 3.486 0 6.565-1.4 8-2.179v-6.585l-.098-.104s-.033.045-.085.104c-.793.9-2.057 1.259-3.782 1.259-1.59 0-2.738-.545-3.508-1.492a4.359 4.359 0 0 1-.355-.508Zm2.328 3.25c.549 0 1 .451 1 1v2c0 .549-.451 1-1 1-.549 0-1-.451-1-1v-2c0-.549.451-1 1-1Zm-5 0c.549 0 1 .451 1 1v2c0 .549-.451 1-1 1-.549 0-1-.451-1-1v-2c0-.549.451-1 1-1Zm3.313-6.185c.136 1.057.403 1.913.878 2.497.442.544 1.134.938 2.344.938 1.573 0 2.292-.337 2.657-.751.384-.435.558-1.15.558-2.361 0-1.14-.243-1.847-.705-2.319-.477-.488-1.319-.862-2.824-1.025-1.487-.161-2.192.138-2.533.529-.269.307-.437.808-.438 1.578v.021c0 .265.021.562.063.893Zm-1.626 0c.042-.331.063-.628.063-.894v-.02c-.001-.77-.169-1.271-.438-1.578-.341-.391-1.046-.69-2.533-.529-1.505.163-2.347.537-2.824 1.025-.462.472-.705 1.179-.705 2.319 0 1.211.175 1.926.558 2.361.365.414 1.084.751 2.657.751 1.21 0 1.902-.394 2.344-.938.475-.584.742-1.44.878-2.497Z"},"gemini":{"d":"M11.04 19.32Q12 21.51 12 24q0-2.49.93-4.68.96-2.19 2.58-3.81t3.81-2.55Q21.51 12 24 12q-2.49 0-4.68-.93a12.3 12.3 0 0 1-3.81-2.58 12.3 12.3 0 0 1-2.58-3.81Q12 2.49 12 0q0 2.49-.96 4.68-.93 2.19-2.55 3.81a12.3 12.3 0 0 1-3.81 2.58Q2.49 12 0 12q2.49 0 4.68.96 2.19.93 3.81 2.55t2.55 3.81"},"terminal":{"rule":"evenodd","d":"M3 4h18a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2zM3 6v12h18V6zM5.3 8.7l1.4-1.4 4.7 4.7-4.7 4.7-1.4-1.4 3.3-3.3zM12 15h6v2h-6z"},"chat":{"rule":"evenodd","d":"M4 3h16a3 3 0 0 1 3 3v9a3 3 0 0 1-3 3h-8l-5 4v-4H4a3 3 0 0 1-3-3V6a3 3 0 0 1 3-3zM4 5a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h5v2l2.5-2H20a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1zM7 9.5h2v2H7zM11 9.5h2v2h-2zM15 9.5h2v2h-2z"}};

  function svg(key) {
    var i = ICON[key];
    return '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path fill="currentColor"' +
      (i.rule ? ' fill-rule="' + i.rule + '"' : '') + ' d="' + i.d + '"/></svg>';
  }
  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function b64(s) {
    try { return btoa(unescape(encodeURIComponent(s))); } catch (e) { return btoa(s); }
  }
  function code(id, text) {
    return '<div class="tkc-cmd"><pre id="' + id + '">' + esc(text) + '</pre>' +
      '<button type="button" class="tkc-btn tkc-btn2" data-tkc-copy="' + id + '">Copy</button></div>';
  }

  // Every step below was checked against that app's own documentation on
  // 2026-09-21. Change them only with a source.
  var APPS = [
    {
      id: 'claude', name: 'Claude', sub: 'Web & desktop app', icon: 'claude',
      body: function (u, n) {
        return '<ol class="tkc-steps">' +
          '<li>Open <b>Customize</b>, then <b>Connectors</b>.</li>' +
          '<li>Click <b>+</b>, then <b>Add custom connector</b>.</li>' +
          '<li>Paste this address, leave <b>Advanced settings</b> empty, and click <b>Add</b>:</li></ol>' +
          code('tkc-u-claude', u) +
          '<p class="tkc-note">Turn it on in a chat with the <b>+</b> button, bottom left, then <b>Connectors</b>. Free plans can add one connector like this. On Team or Enterprise, an owner adds it under <b>Organization settings → Connectors</b> first.</p>';
      }
    },
    {
      id: 'chatgpt', name: 'ChatGPT', sub: 'Business, Enterprise, Edu', icon: 'chat',
      body: function (u, n) {
        return '<ol class="tkc-steps">' +
          '<li>Open <b>Settings → Apps → Advanced settings</b> and turn on <b>Developer mode</b>. On Enterprise and Edu an admin has to allow it first.</li>' +
          '<li>Create a new app and give it this address as its MCP server:</li></ol>' +
          code('tkc-u-chatgpt', u) +
          '<ol class="tkc-steps" start="3"><li>Your workspace admin may need to approve it before it shows in chats.</li></ol>' +
          '<p class="tkc-warn">Custom connectors in ChatGPT need a Business, Enterprise or Edu plan and work on the web. Pro can connect read-only. OpenAI changes these menus often; <a href="https://help.openai.com/en/articles/12584461-developer-mode-and-mcp-apps-in-chatgpt" target="_blank" rel="noopener">their guide</a> is the current word.</p>';
      }
    },
    {
      id: 'cursor', name: 'Cursor', sub: 'One click', icon: 'cursor',
      body: function (u, n) {
        var link = 'cursor://anysphere.cursor-deeplink/mcp/install?name=' + encodeURIComponent(n) +
          '&config=' + encodeURIComponent(b64(JSON.stringify({ url: u })));
        var json = '{\n  "mcpServers": {\n    "' + n + '": { "url": "' + u + '" }\n  }\n}';
        return '<p><a class="tkc-btn tkc-btn1" href="' + esc(link) + '">Add to Cursor</a></p>' +
          '<p class="tkc-note">Needs Cursor installed on this computer. Or add it by hand to <span class="tkc-kbd">~/.cursor/mcp.json</span>:</p>' +
          code('tkc-j-cursor', json);
      }
    },
    {
      id: 'vscode', name: 'VS Code', sub: 'With GitHub Copilot', icon: 'copilot',
      body: function (u, n) {
        var json = '{\n  "servers": {\n    "' + n + '": { "type": "http", "url": "' + u + '" }\n  }\n}';
        return '<ol class="tkc-steps">' +
          '<li>In your project, open or create <span class="tkc-kbd">.vscode/mcp.json</span>.</li>' +
          '<li>Put this in it, or add the <code>' + esc(n) + '</code> entry to what’s there:</li></ol>' +
          code('tkc-j-vscode', json) +
          '<p class="tkc-note">VS Code uses <code>"servers"</code>, not <code>"mcpServers"</code> — the usual reason a copied snippet silently doesn’t load. Prefer menus? Run <b>MCP: Add Server</b> from the Command Palette and give it the address.</p>';
      }
    },
    {
      id: 'claude-code', name: 'Claude Code', sub: 'Terminal', icon: 'claude',
      body: function (u, n) {
        return '<p>Paste into your terminal:</p>' +
          code('tkc-c-cc', 'claude mcp add --transport http --scope user ' + n + ' ' + u) +
          '<p class="tkc-note"><code>--scope user</code> makes it available in every project, not just this folder.</p>';
      }
    },
    {
      id: 'codex', name: 'Codex', sub: 'OpenAI’s terminal agent', icon: 'terminal',
      body: function (u, n) {
        return '<p>Paste into your terminal:</p>' + code('tkc-c-codex', 'codex mcp add ' + n + ' --url ' + u);
      }
    },
    {
      id: 'gemini', name: 'Gemini CLI', sub: 'Terminal', icon: 'gemini',
      body: function (u, n) {
        return '<p>Paste into your terminal:</p>' + code('tkc-c-gemini', 'gemini mcp add --transport http ' + n + ' ' + u);
      }
    }
  ];

  var CSS = [
    '.tkc{--tkc-bg:#111;--tkc-bg2:#151515;--tkc-line:#262626;--tkc-text:#e5e5e5;--tkc-muted:#8a8a8a;--tkc-dim:#707070;--tkc-acc:#4a8eff;--tkc-acc2:#2f5fb0;color:var(--tkc-text);font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif;line-height:1.55}',
    '.tkc *{box-sizing:border-box}',
    '.tkc h3{margin:0 0 .15rem;font-size:1.15rem;letter-spacing:-.01em}',
    '.tkc .tkc-lead{margin:0 0 1rem;color:var(--tkc-muted);font-size:.9rem}',
    '.tkc-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(132px,1fr));gap:.55rem}',
    '.tkc-app{display:flex;flex-direction:column;align-items:center;gap:.45rem;padding:1rem .6rem .85rem;background:var(--tkc-bg2);border:1px solid var(--tkc-line);border-radius:12px;color:var(--tkc-text);cursor:pointer;font:inherit;text-align:center;transition:border-color .12s,transform .12s}',
    '.tkc-app:hover,.tkc-app:focus-visible{border-color:var(--tkc-acc);outline:none;transform:translateY(-1px)}',
    '.tkc-app svg{width:30px;height:30px}',
    '.tkc-app b{font-size:.92rem;font-weight:600}',
    '.tkc-app small{font-size:.72rem;color:var(--tkc-dim);line-height:1.25}',
    '.tkc-head{display:flex;align-items:center;gap:.7rem;margin-bottom:.9rem}',
    '.tkc-head svg{width:28px;height:28px;flex:none}',
    '.tkc-back{background:none;border:0;color:var(--tkc-muted);cursor:pointer;font:inherit;font-size:.85rem;padding:.2rem 0;margin-bottom:.6rem}',
    '.tkc-back:hover{color:var(--tkc-text)}',
    '.tkc-steps{margin:0 0 .4rem;padding-left:1.25rem}',
    '.tkc-steps li{margin:.4rem 0}',
    '.tkc b{color:#fff}',
    '.tkc code{font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;font-size:.88em;color:#cfe0ff}',
    '.tkc-kbd{font-family:ui-monospace,monospace;font-size:.85em;background:#1a1a1a;border:1px solid var(--tkc-line);border-radius:5px;padding:.05rem .35rem}',
    '.tkc-cmd{display:flex;gap:.5rem;align-items:flex-start;background:#08090c;border:1px solid var(--tkc-line);border-radius:10px;padding:.55rem .55rem .55rem .85rem;margin:.55rem 0}',
    '.tkc-cmd pre{flex:1;margin:0;font:.8rem/1.5 ui-monospace,SFMono-Regular,Menlo,monospace;color:#cdd6e4;white-space:pre-wrap;word-break:break-all}',
    '.tkc-btn{display:inline-flex;align-items:center;border-radius:8px;padding:.45rem .85rem;font:600 .85rem/1.2 inherit;cursor:pointer;border:1px solid transparent;white-space:nowrap;text-decoration:none}',
    '.tkc-btn1{background:var(--tkc-acc);color:#05070d}',
    '.tkc-btn1:hover{background:#63a0ff;text-decoration:none}',
    '.tkc-btn2{background:transparent;color:var(--tkc-text);border-color:var(--tkc-line)}',
    '.tkc-btn2:hover{border-color:#3a3a3a}',
    '.tkc-note{font-size:.83rem;color:var(--tkc-muted);border-left:2px solid var(--tkc-line);padding-left:.75rem;margin:.8rem 0 0}',
    '.tkc-warn{font-size:.83rem;color:#e6d3a8;background:#1a1408;border:1px solid #3a2f14;border-radius:8px;padding:.55rem .75rem;margin:.8rem 0 0}',
    '.tkc a{color:var(--tkc-acc)}',
    '.tkc-done{margin-top:1.1rem;padding-top:.9rem;border-top:1px solid var(--tkc-line);font-size:.86rem;color:var(--tkc-muted)}',
    '.tkc-done b{color:var(--tkc-text)}',
    '.tkc-overlay{position:fixed;inset:0;background:rgba(0,0,0,.72);display:flex;align-items:flex-start;justify-content:center;padding:6vh 16px 16px;z-index:1000;overflow-y:auto}',
    '.tkc-dialog{position:relative;width:100%;max-width:620px;background:var(--tkc-bg);border:1px solid var(--tkc-line);border-radius:16px;padding:1.4rem 1.4rem 1.2rem;box-shadow:0 24px 80px rgba(0,0,0,.6)}',
    '.tkc-x{position:absolute;top:.7rem;right:.7rem;width:34px;height:34px;border-radius:8px;background:none;border:1px solid transparent;color:var(--tkc-muted);font-size:1.3rem;line-height:1;cursor:pointer}',
    '.tkc-x:hover{border-color:var(--tkc-line);color:var(--tkc-text)}',
    '@media (max-width:480px){.tkc-grid{grid-template-columns:repeat(2,1fr)}.tkc-dialog{padding:1.2rem 1rem 1rem}}'
  ].join('\n');

  function injectCss() {
    if (document.getElementById('tkc-css')) return;
    var s = document.createElement('style');
    s.id = 'tkc-css';
    s.textContent = CSS;
    document.head.appendChild(s);
  }

  // One renderer for both the dialog and the inline picker.
  function Picker(root, opts) {
    this.root = root;
    this.url = opts.url || DEFAULT_URL;
    this.name = opts.name || DEFAULT_NAME;
    this.onPick = opts.onPick || function () {};
  }
  Picker.prototype.grid = function () {
    var h = '<h3>Where do you want to use Tollkit?</h3>' +
      '<p class="tkc-lead">Pick your app. No account, no API key.</p><div class="tkc-grid">';
    APPS.forEach(function (a) {
      h += '<button type="button" class="tkc-app" data-tkc-app="' + a.id + '">' + svg(a.icon) +
        '<b>' + esc(a.name) + '</b><small>' + esc(a.sub) + '</small></button>';
    });
    this.root.innerHTML = h + '</div>';
    var first = this.root.querySelector('.tkc-app');
    return first;
  };
  Picker.prototype.show = function (id) {
    var a = APPS.filter(function (x) { return x.id === id; })[0];
    if (!a) return this.grid();
    var check = this.url === DEFAULT_URL
      ? 'Ask it: <b>“Use Tollkit’s try_it_free tool.”</b> It’s free and returns a real result.'
      : 'Ask it: <b>“What Tollkit tools can you see?”</b> It should list them.';
    this.root.innerHTML =
      '<button type="button" class="tkc-back" data-tkc-back>← All apps</button>' +
      '<div class="tkc-head">' + svg(a.icon) + '<div><h3>' + esc(a.name) + '</h3></div></div>' +
      a.body(this.url, this.name) +
      '<div class="tkc-done"><b>Check it worked.</b> ' + check +
      ' Free tools work straight away; paid ones need an agent with its own wallet — <a href="/fund">set one up</a>.</div>';
    this.onPick(id);
    return this.root.querySelector('.tkc-back');
  };
  Picker.prototype.wire = function () {
    var self = this;
    this.root.addEventListener('click', function (e) {
      var t = e.target.closest('button,a');
      if (!t || !self.root.contains(t)) return;
      if (t.hasAttribute('data-tkc-app')) { var f = self.show(t.getAttribute('data-tkc-app')); if (f) f.focus(); }
      else if (t.hasAttribute('data-tkc-back')) { self.onPick(null); var g = self.grid(); if (g) g.focus(); }
      else if (t.hasAttribute('data-tkc-copy')) {
        var el = document.getElementById(t.getAttribute('data-tkc-copy'));
        copy(el ? el.textContent : '', t);
      }
    });
  };

  function copy(text, btn) {
    var done = function () {
      var old = btn.textContent; btn.textContent = 'Copied';
      setTimeout(function () { btn.textContent = old; }, 1600);
    };
    if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(text).then(done, done);
    else {
      var ta = document.createElement('textarea'); ta.value = text; document.body.appendChild(ta); ta.select();
      try { document.execCommand('copy'); } catch (e) {}
      document.body.removeChild(ta); done();
    }
  }

  // ── Dialog ──────────────────────────────────────────────────────────────
  var overlay = null, lastFocus = null;
  function openDialog(opts) {
    injectCss();
    closeDialog();
    lastFocus = document.activeElement;
    overlay = document.createElement('div');
    overlay.className = 'tkc tkc-overlay';
    overlay.innerHTML = '<div class="tkc-dialog" role="dialog" aria-modal="true" aria-label="Connect Tollkit to your AI">' +
      '<button type="button" class="tkc-x" aria-label="Close">×</button><div class="tkc-body"></div></div>';
    document.body.appendChild(overlay);
    document.body.style.overflow = 'hidden';
    var p = new Picker(overlay.querySelector('.tkc-body'), opts);
    p.wire();
    var first = opts.app ? p.show(opts.app) : p.grid();
    overlay.querySelector('.tkc-x').onclick = closeDialog;
    overlay.addEventListener('mousedown', function (e) { if (e.target === overlay) closeDialog(); });
    if (first) first.focus();
  }
  function closeDialog() {
    if (!overlay) return;
    overlay.remove(); overlay = null;
    document.body.style.overflow = '';
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }
  document.addEventListener('keydown', function (e) {
    if (!overlay) return;
    if (e.key === 'Escape') { closeDialog(); return; }
    if (e.key === 'Tab') {   // keep focus inside the dialog
      var f = overlay.querySelectorAll('button,a[href],[tabindex]:not([tabindex="-1"])');
      if (!f.length) return;
      var a = f[0], z = f[f.length - 1];
      if (e.shiftKey && document.activeElement === a) { z.focus(); e.preventDefault(); }
      else if (!e.shiftKey && document.activeElement === z) { a.focus(); e.preventDefault(); }
    }
  });
  document.addEventListener('click', function (e) {
    var t = e.target.closest('[data-connect]');
    if (!t) return;
    e.preventDefault();
    openDialog({
      url: t.getAttribute('data-connect-url') || DEFAULT_URL,
      name: t.getAttribute('data-connect-name') || DEFAULT_NAME,
      app: t.getAttribute('data-connect-app') || null
    });
  });

  // ── Inline ──────────────────────────────────────────────────────────────
  function initInline() {
    var els = document.querySelectorAll('[data-connect-inline]');
    if (!els.length) return;
    injectCss();
    els.forEach(function (el) {
      el.classList.add('tkc');
      var p = new Picker(el, {
        url: el.getAttribute('data-connect-url') || DEFAULT_URL,
        name: el.getAttribute('data-connect-name') || DEFAULT_NAME,
        onPick: function (id) {
          if (history.replaceState) history.replaceState(null, '', id ? '#' + id : location.pathname);
        }
      });
      p.wire();
      var fromHash = function () {
        var h = (location.hash || '').slice(1);
        if (h && APPS.some(function (a) { return a.id === h; })) p.show(h); else p.grid();
      };
      fromHash();
      window.addEventListener('hashchange', fromHash);
    });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initInline);
  else initInline();

  window.TollkitConnect = { open: openDialog, close: closeDialog };
})();
