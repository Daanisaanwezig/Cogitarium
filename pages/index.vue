<script setup lang="ts">
import { buttonSize, buttonColor } from '~/types/button';

import Input from '~/components/atoms/Input.vue'
import Textarea from '~/components/atoms/Textarea.vue';
import Button from '~/components/atoms/Button.vue';

async function submitForm() {
    const form = document.getElementById('newEntry')
    if (!form) return
    if (!(form instanceof HTMLFormElement)) return

    const formData = new FormData(form)
    const response = await fetch('', {
        method: 'post',
        body: formData
    })
    if (! response.ok) return
    const result = response.json()

    // TODO:
    // Move this page to its own "add new" page
    // Move API logic to composable
    // Create API
}
</script>
<template>
    <div class="container">
        <h4>Home</h4>
    </div>
</template>