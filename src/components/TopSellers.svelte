<script>
  import { onMount } from 'svelte'
  export let grid;

  let prodsArr = [
    {
    "title": "Happy Ninja",
    "product_id": 37,
    "quantity": 1,
    "_links": {
      "about": [
        {
          "href": "https://example.com/wp-json/wc/v3/reports"
        }
      ],
      "product": [
        {
          "href": "https://example.com/wp-json/wc/v3/products/37"
        }
      ]
    }
  },
  {
    "title": "Woo Album #4",
    "product_id": 96,
    "quantity": 1,
    "_links": {
      "about": [
        {
          "href": "https://example.com/wp-json/wc/v3/reports"
        }
      ],
      "product": [
        {
          "href": "https://example.com/wp-json/wc/v3/products/96"
        }
      ]
    }
  }
  ]

  const handler = async () =>
    await fetch("/.netlify/functions/topSellers", { headers: { accept: "Accept: application/json" } })
    .then((x) => x.json())
    .then((res) => {
      // prodsArr = res.msg
    })

    onMount(() => {
      handler();
    });
</script>

<div class="component" style="grid-area: { grid };">
  <h2>Best Sellers</h2>
  {#each prodsArr as prod}
    <div class="prod">
      <h3>{ prod.title }: <span>{ prod.quantity } sold</span></h3>
    </div>
  {/each}
</div>