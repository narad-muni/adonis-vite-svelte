<script>
    import { 
        Alert,
        Button
    } from 'flowbite-svelte';

    let x = 1;
</script>

<div class="p-8">
    <Alert>
        <span class="font-medium">Info alert!</span>
        Change a few things up and try submitting again.
    </Alert>
</div>

<Button class="bg-green-300" on:click={()=>x++}>
    {x}
</Button>