<script>
  import { onMount, setContext } from 'svelte'

  export let grid

  let baseUrl
  let wpVersion
  let wpLatest
  let wpLatestDownload
  let themeName
  let themeVersion
  let themeLatest


  const handler = async () =>
    await fetch("/.netlify/functions/systemStatus", { headers: { accept: "Accept: application/json" } })
    .then((x) => x.json())
    .then((res) => {
      baseUrl = res.msg.environment.site_url
      wpVersion = res.msg.environment.wp_version
      themeName = res.msg.theme.name
      themeVersion = res.msg.theme.version
      themeLatest = res.msg.theme.version_latest
    })

  const fetchWPLatest = async () => 
    await fetch("https://api.wordpress.org/core/version-check/1.7/")
    .then((x) => x.json())
    .then((res) => {
      wpLatest = res.offers[0].current
      wpLatestDownload = res.offers[0].download
    })

  setContext( baseUrl );
    
  onMount(() => {
    handler();
    fetchWPLatest();
  });
</script>

<div class="component" style="grid-area: { grid };">
  <div class="elem">
    <h4>WordPress</h4>
    {#if wpVersion !== wpLatest}
      <h4 class="warn">Version: <span>{ wpVersion }</span></h4>
      <p>consider updating your WordPress instance.</p>
      <p>Get the latest verison <a href="{wpLatestDownload}">here.</a></p>
    {:else}
      <h4 class="ok">Version: <span>{ wpVersion }</span></h4>
    {/if}
  </div>
  <div class="elem">
    <h4>Current Theme: { themeName }</h4>
    {#if themeVersion !== themeLatest}
      <h4 class="warn">Version: <span>{ themeVersion }</span></h4>
      <p>consider updating your theme to keep your shop running smoothly!</p>
    {:else}
      <h4 class="ok">Version: <span>{ wpVersion }</span></h4>
    {/if}
  </div>
</div>

<style>
  .elem {
    margin: .5rem;
  }
  a:hover {
    cursor: pointer;
  }
</style>