// Initialize medium zoom.
$(document).ready(function () {
  medium_zoom = mediumZoom("[data-zoomable]", {
    background: getComputedStyle(document.documentElement).getPropertyValue("--global-bg-color") + "ee", // + 'ee' for trasparency.
  });

  const triggers = document.querySelectorAll(".publication-video-trigger");
  if (!triggers.length) return;

  const dialog = document.createElement("dialog");
  dialog.className = "publication-video-dialog";
  dialog.setAttribute("aria-label", "Expanded publication video");
  const close = document.createElement("button");
  close.type = "button";
  close.textContent = "×";
  close.setAttribute("aria-label", "Close expanded video");
  const video = document.createElement("video");
  video.controls = true;
  video.loop = true;
  video.muted = true;
  video.playsInline = true;
  dialog.append(close, video);
  document.body.append(dialog);

  let preview;
  let resumePreview = false;
  triggers.forEach((trigger) => {
    trigger.addEventListener("click", () => {
      preview = trigger.querySelector("video");
      resumePreview = !preview.paused;
      preview.pause();
      video.poster = preview.poster;
      video.src = preview.currentSrc || preview.src;
      video.currentTime = preview.currentTime;
      dialog.showModal();
      video.play().catch(() => {});
    });
  });
  close.addEventListener("click", () => dialog.close());
  dialog.addEventListener("click", (event) => {
    if (event.target !== dialog) return;
    const bounds = dialog.getBoundingClientRect();
    if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) {
      dialog.close();
    }
  });
  dialog.addEventListener("close", () => {
    video.pause();
    video.removeAttribute("src");
    video.load();
    if (resumePreview) preview.play().catch(() => {});
  });
});
