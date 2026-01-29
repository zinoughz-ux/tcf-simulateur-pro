(async function autoPaste() {

  const wait = setInterval(async () => {

    const box =
      document.querySelector("div[contenteditable='true']") ||
      document.querySelector("textarea");

    if (!box) return;

    clearInterval(wait);

    try {
      const text = await navigator.clipboard.readText();

      box.focus();
      box.innerHTML = "";
      document.execCommand("insertText", false, text);
      box.dispatchEvent(new Event("input", { bubbles: true }));

      console.log("✅ Texte collé automatiquement dans ChatGPT");

    } catch (e) {
      console.error("❌ Erreur collage :", e);
    }

  }, 500);

})();










