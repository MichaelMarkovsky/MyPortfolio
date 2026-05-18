<script>
  import { slide } from "svelte/transition";

  export let groups = [];

  let openIndex = 0;

  function toggle(i) {
    openIndex = openIndex === i ? -1 : i;
  }

  const iconMap = {
    Security: "🔒",
    Automation: "⚙️",
    Lifestyle: "✨",
    Linux: "🐧",
    Projects: "📦",
    "Game Development": "🎮",
  };

  function getIcon(cat) {
    return iconMap[cat] ?? "📁";
  }

  function handleKeydown(e, i) {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggle(i);
    }
  }
</script>

<style>
  .acc-wrap {
    display: flex;
    flex-direction: column;
    gap: 8px;
    font-family: "JetBrainsMono", "ComicShannsMono", ui-monospace, monospace;
  }

  .acc-card {
    border-radius: 8px;
    border: 1px solid #27272a;
    background: #111113;
    transition: border-color 0.15s;
  }

  .acc-card:hover {
    border-color: #3f3f46;
  }

  .acc-card.is-open {
    border-color: #4ade80;
  }

  .acc-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12px 16px;
    cursor: pointer;
    border-radius: 8px;
    transition: background 0.15s;
    user-select: none;
  }

  .acc-header:hover {
    background: #18181b;
  }

  .acc-card.is-open .acc-header {
    border-radius: 8px 8px 0 0;
  }

  .acc-left {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .acc-prompt {
    font-size: 11px;
    color: #4ade80;
    letter-spacing: 0.05em;
  }

  .acc-icon {
    font-size: 13px;
    line-height: 1;
  }

  .acc-title {
    font-size: 13px;
    font-weight: 600;
    color: #e4e4e7;
    letter-spacing: 0.03em;
  }

  .acc-badge {
    font-size: 10px;
    color: #52525b;
    background: #09090b;
    border: 1px solid #27272a;
    border-radius: 999px;
    padding: 1px 7px;
  }

  .acc-card.is-open .acc-badge {
    color: #4ade80;
    border-color: #4ade80;
  }

  .acc-chevron {
    font-size: 10px;
    color: #52525b;
    transition: transform 0.2s;
    display: inline-block;
  }

  .acc-card.is-open .acc-chevron {
    transform: rotate(180deg);
    color: #4ade80;
  }

  .acc-body {
    border-top: 1px solid #27272a;
    padding: 12px;
    border-radius: 0 0 8px 8px;
  }

  .proj-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
    gap: 8px;
  }

  .proj-card {
    display: flex;
    flex-direction: column;
    border-radius: 6px;
    border: 1px solid #27272a;
    background: #09090b;
    text-decoration: none;
    transition:
      border-color 0.15s,
      background 0.15s;
    overflow: hidden;
    position: relative;
  }

  .proj-card:hover {
    border-color: #4ade80;
    background: #0f1a10;
  }

  .proj-banner {
    width: 100%;
    aspect-ratio: 16 / 9;
    background-size: cover;
    background-position: center;
    opacity: 0.7;
    transition: opacity 0.15s;
  }

  .proj-card:hover .proj-banner {
    opacity: 1;
  }

  .proj-body {
    padding: 10px 12px 12px;
    display: flex;
    flex-direction: column;
    gap: 4px;
    flex: 1;
  }

  .proj-title {
    font-size: 12px;
    font-weight: 600;
    color: #e4e4e7;
    letter-spacing: 0.02em;
  }

  .proj-card:hover .proj-title {
    color: #4ade80;
  }

  .proj-desc {
    font-size: 11px;
    color: #71717a;
    line-height: 1.5;
    flex: 1;
  }

  .proj-open {
    font-size: 10px;
    color: #3f3f46;
    margin-top: 6px;
    transition: color 0.15s;
    letter-spacing: 0.05em;
    text-transform: uppercase;
  }

  .proj-card:hover .proj-open {
    color: #4ade80;
  }
</style>

<div class="acc-wrap">
  {#each groups as group, i}
    <div class="acc-card {openIndex === i ? 'is-open' : ''}">
      <div
        role="button"
        tabindex="0"
        class="acc-header"
        aria-expanded={openIndex === i}
        aria-label={`Toggle ${group.category}`}
        on:click={() => toggle(i)}
        on:keydown={(e) => handleKeydown(e, i)}
      >
        <div class="acc-left">
          <span class="acc-prompt">
            {openIndex === i ? "▸" : "$"}
          </span>

          <span class="acc-icon">
            {getIcon(group.category)}
          </span>

          <span class="acc-title">
            {group.category}
          </span>

          <span class="acc-badge">
            {group.projects.length}
          </span>
        </div>

        <span class="acc-chevron">▼</span>
      </div>

      {#if openIndex === i}
        <div class="acc-body" transition:slide={{ duration: 200 }}>
          <div class="proj-grid">
            {#each group.projects as project}
              <a
                class="proj-card"
                href={project.data.link || "#"}
                target="_blank"
                rel="noopener noreferrer"
              >
                {#if project.data.banner}
                  <div
                    class="proj-banner"
                    style={`background-image: url(${project.data.banner})`}
                  ></div>
                {/if}

                <div class="proj-body">
                  <span class="proj-title">
                    {project.data.title}
                  </span>

                  <span class="proj-desc">
                    {project.data.description}
                  </span>

                  <span class="proj-open">
                    open →
                  </span>
                </div>
              </a>
            {/each}
          </div>
        </div>
      {/if}
    </div>
  {/each}
</div>
