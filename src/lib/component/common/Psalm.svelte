<script lang="ts">
  import type { Psalm } from "../../model/common";

  export let psalm: Psalm;
</script>

<h1>{psalm.title}</h1>

<ol>
  <li class="first_line">
    {#each psalm.firstLine as syllable}
      <span class:omitted={syllable.omitted} class:accent={syllable.type === "accent"}>{syllable.text}{#if syllable.appendix !== undefined}{syllable.appendix}{/if}</span>
    {/each}
  </li>
  {#each psalm.otherLines as line}
    <li>
      {@html line}
    </li>
  {/each}
</ol>

<style>
  .omitted {
    color: gainsboro;
  }

  .accent {
    font-weight: bold;
  }
</style>
