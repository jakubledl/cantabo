<script lang="ts">
  import {
    Container,
    Col,
    Row,
    Styles,
  } from "@sveltestrap/sveltestrap";
  import Psalm from "./lib/component/common/Psalm.svelte";
  import { RemoteRepository, RepositoryPsalmService } from "./lib/model/common";

  const svc = new RepositoryPsalmService(new RemoteRepository(globalThis.fetch.bind(globalThis), "/repository"));

  const promise = svc.getPsalm("109", "7c2", "gloria", "di xit do mi nus");
</script>

<Styles icons={false} />

<Container>
  <Row>
    <Col xxl={{ size: 6, offset: 3 }}>
    {#await promise}
      waiting
    {:then psalm}
      {#if psalm}
        <Psalm {psalm} />
      {/if}
    {/await}
    </Col>
  </Row>
</Container>

<style src="./app.css"></style>
